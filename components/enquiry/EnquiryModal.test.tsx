import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, vi } from "vitest";

import { EnquiryProvider, useEnquiry } from "./EnquiryProvider";

function Trigger({ context = "South India" }: { context?: string }) {
  const { openEnquiry } = useEnquiry();
  return <button onClick={() => openEnquiry(context)}>Plan this trip</button>;
}

function renderEnquiry(context?: string) {
  return render(
    <EnquiryProvider>
      <Trigger context={context} />
    </EnquiryProvider>,
  );
}

afterEach(() => {
  document.body.style.overflow = "";
  vi.restoreAllMocks();
});

describe("EnquiryModal", () => {
  it("opens with context, labelled fields, initial focus, and scroll lock", async () => {
    const user = userEvent.setup();
    renderEnquiry("South India");

    await user.click(screen.getByRole("button", { name: "Plan this trip" }));

    expect(screen.getByRole("dialog", { name: "Plan your journey" })).toBeVisible();
    expect(screen.getByText("Enquiring about South India")).toBeVisible();
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Phone")).toBeRequired();
    expect(screen.getByLabelText("Email (optional)")).not.toBeRequired();
    expect(screen.getByLabelText("Message")).toBeRequired();
    expect(screen.getByLabelText("Message")).toHaveValue(
      "I'd like to plan a trip for South India.",
    );
    await waitFor(() => expect(screen.getByLabelText("Name")).toHaveFocus());
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("traps forward and reverse focus inside the dialog", async () => {
    const user = userEvent.setup();
    renderEnquiry();
    await user.click(screen.getByRole("button", { name: "Plan this trip" }));

    const close = screen.getByRole("button", { name: "Close enquiry" });
    const submit = screen.getByRole("button", { name: "Continue on WhatsApp" });

    submit.focus();
    await user.keyboard("{Tab}");
    expect(close).toHaveFocus();

    close.focus();
    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(submit).toHaveFocus();
  });

  it("closes with Escape and restores focus to the trigger", async () => {
    const user = userEvent.setup();
    renderEnquiry();
    const trigger = screen.getByRole("button", { name: "Plan this trip" });
    await user.click(trigger);

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes from the overlay but not from a click inside the dialog", async () => {
    const user = userEvent.setup();
    renderEnquiry();
    await user.click(screen.getByRole("button", { name: "Plan this trip" }));

    await user.click(screen.getByRole("dialog", { name: "Plan your journey" }));
    expect(screen.getByRole("dialog", { name: "Plan your journey" })).toBeVisible();

    await user.click(screen.getByTestId("enquiry-overlay"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes from its close button", async () => {
    const user = userEvent.setup();
    renderEnquiry();
    await user.click(screen.getByRole("button", { name: "Plan this trip" }));

    await user.click(screen.getByRole("button", { name: "Close enquiry" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the formatted WhatsApp URL on valid submit", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    renderEnquiry("Hotel Booking");
    await user.click(screen.getByRole("button", { name: "Plan this trip" }));

    await user.type(screen.getByLabelText("Name"), "Asha & Ravi");
    await user.type(screen.getByLabelText("Phone"), "+91 90000 00000");
    await user.type(screen.getByLabelText("Email (optional)"), "hello@example.com");
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Five nights, please ✨" },
    });
    await user.click(screen.getByRole("button", { name: "Continue on WhatsApp" }));

    expect(open).toHaveBeenCalledOnce();
    const [url, target, features] = open.mock.calls[0];
    expect(target).toBe("_blank");
    expect(features).toBe("noopener,noreferrer");
    const decoded = new URL(String(url)).searchParams.get("text");
    expect(decoded).toContain("Interested in: Hotel Booking");
    expect(decoded).toContain("Name: Asha & Ravi");
    expect(decoded).toContain("Message: Five nights, please ✨");
  });
});

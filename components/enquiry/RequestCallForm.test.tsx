import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, vi } from "vitest";

import { RequestCallForm } from "./RequestCallForm";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("RequestCallForm", () => {
  it("labels the required telephone field for autofill", () => {
    render(<RequestCallForm />);

    const input = screen.getByLabelText("Phone number for callback");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("type", "tel");
    expect(input).toHaveAttribute("autocomplete", "tel");
  });

  it("does not open WhatsApp when the required phone is blank", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<RequestCallForm />);

    await user.click(screen.getByRole("button", { name: "Request a Call" }));

    expect(open).not.toHaveBeenCalled();
  });

  it("opens a formatted callback request for a valid phone", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<RequestCallForm />);

    await user.type(
      screen.getByLabelText("Phone number for callback"),
      "+91 90000 00000",
    );
    await user.click(screen.getByRole("button", { name: "Request a Call" }));

    expect(open).toHaveBeenCalledOnce();
    const [url, target, features] = open.mock.calls[0];
    expect(target).toBe("_blank");
    expect(features).toBe("noopener,noreferrer");
    expect(new URL(String(url)).searchParams.get("text")).toBe(
      "Hi Gamya Sanchari! Please call me back on +91 90000 00000.",
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Opening WhatsApp with your callback request",
    );
  });
});

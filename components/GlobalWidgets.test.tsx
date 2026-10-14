import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, vi } from "vitest";

import { EnquiryProvider } from "./enquiry/EnquiryProvider";
import GlobalWidgets from "./GlobalWidgets";

const reducedMotion = vi.hoisted(() => ({ value: false }));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => reducedMotion.value };
});

function setReducedMotion(matches: boolean) {
  reducedMotion.value = matches;
}

function renderWidgets() {
  return render(
    <EnquiryProvider>
      <GlobalWidgets />
    </EnquiryProvider>,
  );
}

afterEach(() => {
  vi.restoreAllMocks();
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
});

describe("GlobalWidgets", () => {
  it("renders real WhatsApp, enquiry, and contact actions", async () => {
    const user = userEvent.setup();
    setReducedMotion(false);
    renderWidgets();

    expect(screen.getByRole("link", { name: "Chat on WhatsApp" })).toHaveAttribute(
      "href",
      "https://wa.me/918073254766",
    );
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
      "href",
      "https://wa.me/918073254766",
    );
    expect(screen.getByRole("link", { name: "Contact Us" })).toHaveAttribute(
      "href",
      "#contact",
    );

    await user.click(screen.getByRole("button", { name: "Enquire Now" }));
    expect(screen.getByRole("dialog", { name: "Plan your journey" })).toBeVisible();
  });

  it("shows back-to-top only after scrolling beyond 300 pixels", () => {
    setReducedMotion(false);
    renderWidgets();
    expect(screen.queryByRole("button", { name: "Back to top" })).not.toBeInTheDocument();

    Object.defineProperty(window, "scrollY", { configurable: true, value: 301 });
    fireEvent.scroll(window);
    expect(screen.getByRole("button", { name: "Back to top" })).toBeVisible();
  });

  it("uses instant scrolling when reduced motion is requested", async () => {
    const user = userEvent.setup();
    setReducedMotion(true);
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    renderWidgets();
    Object.defineProperty(window, "scrollY", { configurable: true, value: 500 });
    fireEvent.scroll(window);

    await user.click(screen.getByRole("button", { name: "Back to top" }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });
});

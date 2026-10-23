import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the bilingual lockup and exact route links", () => {
    render(<Navbar />);

    expect(screen.getByText("Gamya Sanchari")).toBeVisible();
    expect(screen.getByText("ಗಮ್ಯ ಸಂಚಾರಿ · Travel Planners")).toBeVisible();

    const expected = [
      ["Karnataka & India", "/destinations/"],
      ["Packages", "/packages/"],
      ["Experiences", "/experiences/"],
      ["Plan My Trip", "/plan-my-trip/"],
      ["About", "/about/"],
      ["Contact", "/contact/"],
    ];
    for (const [name, href] of expected) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
  });

  it("opens and closes the mobile menu from its 44px control", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: "Open navigation" });

    expect(menuButton).toHaveClass("min-h-11", "min-w-11");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();

    const aboutLink = screen
      .getByRole("navigation", { name: "Mobile navigation" })
      .querySelector('a[href="/about/"]')!;
    aboutLink.addEventListener("click", (event) => event.preventDefault());
    await user.click(aboutLink);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes with Escape and returns focus to the menu control", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: "Open navigation" });
    await user.click(menuButton);

    await user.keyboard("{Escape}");

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menuButton).toHaveFocus();
  });
});

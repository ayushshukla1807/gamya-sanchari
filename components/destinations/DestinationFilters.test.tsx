import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DestinationFilters from "@/components/destinations/DestinationFilters";
import { DESTINATIONS } from "@/constants/travel";

describe("DestinationFilters", () => {
  it("announces accurate result counts and supports keyboard scope selection", async () => {
    const user = userEvent.setup();
    render(<DestinationFilters destinations={DESTINATIONS} />);

    expect(screen.getByLabelText("Region")).toBeVisible();
    expect(screen.getByLabelText("Season")).toBeVisible();
    expect(screen.getByLabelText("Travel style")).toBeVisible();
    expect(
      screen.getByText(`${DESTINATIONS.length} destinations found`),
    ).toHaveAttribute(
      "aria-live",
      "polite",
    );

    const international = screen.getByRole("button", {
      name: "Beyond India",
    });
    international.focus();
    await user.keyboard("{Enter}");

    expect(international).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(
        `${DESTINATIONS.filter(({ scope }) => scope === "international").length} destinations found`,
      ),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: /Explore Bali/i })).toHaveAttribute(
      "href",
      "/destinations/bali/",
    );
  });

  it("keeps controls usable and offers reset and planning paths for zero results", async () => {
    const user = userEvent.setup();
    render(<DestinationFilters destinations={DESTINATIONS} />);

    await user.click(screen.getByRole("button", { name: "Beyond India" }));
    await user.selectOptions(screen.getByLabelText("Region"), "North India");

    expect(screen.getByText("0 destinations found")).toBeVisible();
    expect(
      screen.getByText(/No destinations match that combination/i),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Plan My Trip" })).toHaveAttribute(
      "href",
      "/plan-my-trip/",
    );

    await user.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(
      screen.getByText(`${DESTINATIONS.length} destinations found`),
    ).toBeVisible();
  });
});

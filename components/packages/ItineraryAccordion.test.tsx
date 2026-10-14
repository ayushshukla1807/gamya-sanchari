import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ItineraryAccordion from "@/components/packages/ItineraryAccordion";
import { JOURNEYS } from "@/constants/travel";

describe("ItineraryAccordion", () => {
  it("exposes day state and toggles from the keyboard", async () => {
    const user = userEvent.setup();
    const days = JOURNEYS[0].days.slice(0, 2);
    render(<ItineraryAccordion days={days} />);

    const first = screen.getByRole("button", { name: /Day 1.*Arrive in Kochi/i });
    const second = screen.getByRole("button", { name: /Day 2.*Into the hills/i });
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-controls", "itinerary-day-1");
    expect(screen.getByText(/Settle in and explore/i)).toBeVisible();
    expect(second).toHaveAttribute("aria-expanded", "false");

    second.focus();
    await user.keyboard("{Enter}");
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(/Travel to Munnar/i)).toBeVisible();
  });
});

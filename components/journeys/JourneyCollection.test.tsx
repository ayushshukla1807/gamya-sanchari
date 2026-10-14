import { render, screen } from "@testing-library/react";

import { getJourneysByCategory } from "@/lib/travel-content";

import JourneyCollection from "./JourneyCollection";

describe("JourneyCollection", () => {
  it("renders every journey with an honest next-departure action", () => {
    const journeys = getJourneysByCategory("spiritual");
    render(<JourneyCollection headingLevel={2} journeys={journeys} />);

    for (const journey of journeys) {
      expect(
        screen.getByRole("heading", { level: 2, name: journey.title }),
      ).toBeVisible();
    }
    expect(
      screen.getAllByRole("link", { name: "Ask for the next departure" }),
    ).toHaveLength(journeys.length);
  });
});

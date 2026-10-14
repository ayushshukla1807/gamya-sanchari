import { render, screen } from "@testing-library/react";

import { getJourney } from "@/lib/travel-content";

import JourneyJsonLd, { buildJourneySchema } from "./JourneyJsonLd";

describe("JourneyJsonLd", () => {
  it("describes a historical journey without publishing an offer", () => {
    const journey = getJourney("puri-jagannath-konark")!;
    const schema = buildJourneySchema(journey);
    const serialized = JSON.stringify(schema);

    expect(schema["@type"]).toBe("TouristTrip");
    expect(schema.name).toBe(journey.title);
    expect(serialized).toContain(journey.route.join(" → "));
    for (const unsupported of ["offers", "price", "priceCurrency", "availability", "startDate", "endDate"]) {
      expect(serialized).not.toContain(`"${unsupported}"`);
    }
  });

  it("renders repository-owned journey data as application JSON", () => {
    const journey = getJourney("kedarnath-yatra")!;
    render(<JourneyJsonLd journey={journey} />);

    const script = screen.getByTestId("journey-json-ld");
    expect(script).toHaveAttribute("type", "application/ld+json");
    expect(script.textContent).toContain(journey.title);
    expect(script.textContent).not.toContain("offers");
  });
});

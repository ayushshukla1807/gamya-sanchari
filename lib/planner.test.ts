import { describe, expect, test } from "vitest";

import {
  EMPTY_PLANNER_DRAFT,
  buildPlannerSummary,
  normalizePlannerDraft,
  readPlannerContext,
} from "@/lib/planner";

describe("normalizePlannerDraft", () => {
  test("returns a fresh empty draft for absent or invalid stored values", () => {
    const absent = normalizePlannerDraft(null);
    const invalid = normalizePlannerDraft("{not json");

    expect(absent).toEqual(EMPTY_PLANNER_DRAFT);
    expect(invalid).toEqual(EMPTY_PLANNER_DRAFT);
    expect(absent).not.toBe(EMPTY_PLANNER_DRAFT);
  });

  test("drops unknown fields and stale content slugs", () => {
    const result = normalizePlannerDraft({
      destinationSlug: "mars",
      journeySlug: "missing-journey",
      name: "  Asha  ",
      unknown: "ignored",
    });

    expect(result.destinationSlug).toBe("");
    expect(result.journeySlug).toBe("");
    expect(result.name).toBe("Asha");
    expect(result).not.toHaveProperty("unknown");
  });

  test("bounds traveller counts and normalizes optional values", () => {
    const result = normalizePlannerDraft({
      adults: 99,
      children: -3,
      email: "  asha+ravi@example.com ",
      interests: [" culture ", "", 42, "wellness"],
      flexibleDates: "yes",
    });

    expect(result.adults).toBe(20);
    expect(result.children).toBe(0);
    expect(result.email).toBe("asha+ravi@example.com");
    expect(result.interests).toEqual(["culture", "wellness"]);
    expect(result.flexibleDates).toBe(false);
  });
});

describe("planner summaries and context", () => {
  test("builds a readable preference summary in a stable order", () => {
    const summary = buildPlannerSummary(
      normalizePlannerDraft({
        destinationSlug: "bali",
        journeySlug: "bali-beautifully-unhurried",
        adults: 2,
        children: 1,
        partyType: "Couple and child",
        travelMonth: "September",
        duration: "6 days",
        flexibleDates: true,
        interests: ["wellness", "culture"],
        pace: "relaxed",
        accommodation: "Boutique comfort",
        budget: "Comfort",
        notes: "Beach + hills 🌴\nQuiet mornings, please.",
      }),
    );

    expect(summary).toBe(
      [
        "Personalized trip request",
        "Destination: Bali",
        "Starting journey: Bali, beautifully unhurried",
        "Travellers: 2 adults, 1 child",
        "Travel party: Couple and child",
        "Timing: September · 6 days · Dates flexible",
        "Interests: wellness, culture",
        "Pace: relaxed",
        "Accommodation: Boutique comfort",
        "Budget comfort: Comfort",
        "Notes: Beach + hills 🌴\nQuiet mornings, please.",
      ].join("\n"),
    );
  });

  test("omits blank optional summary lines", () => {
    const summary = buildPlannerSummary(EMPTY_PLANNER_DRAFT);
    expect(summary).not.toContain("Budget comfort:");
    expect(summary).not.toContain("Notes:");
    expect(summary).not.toContain("Starting journey:");
  });

  test("reads only valid destination or journey query context", () => {
    expect(readPlannerContext(new URLSearchParams("destination=kerala"))).toEqual({
      destinationSlug: "kerala",
      scope: "domestic",
    });
    expect(
      readPlannerContext(
        new URLSearchParams("journey=kashmir-valley-moments&destination=mars"),
      ),
    ).toEqual({
      journeySlug: "kashmir-valley-moments",
      destinationSlug: "kashmir",
      scope: "domestic",
    });
  });
});

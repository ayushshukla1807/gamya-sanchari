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
        experienceSlug: "women-only",
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
        "Experience: Women-only travel",
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
    expect(summary).not.toContain("Experience:");
  });

  test("reads only valid destination or journey query context", () => {
    expect(readPlannerContext(new URLSearchParams("destination=kerala"))).toEqual({
      journeySlug: "",
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

  test("retains valid experience context for the review and WhatsApp handoff", () => {
    const context = readPlannerContext(
      new URLSearchParams("experience=women-only"),
    );

    expect(context).toEqual({ experienceSlug: "women-only" });
    expect(buildPlannerSummary(normalizePlannerDraft(context))).toContain(
      "Experience: Women-only travel",
    );
  });

  test("clears a restored journey when an explicit destination or scope is requested", () => {
    const stored = normalizePlannerDraft({
      destinationSlug: "bali",
      journeySlug: "bali-beautifully-unhurried",
    });

    const destinationContext = readPlannerContext(
      new URLSearchParams("destination=kerala"),
    );
    expect(
      normalizePlannerDraft({ ...stored, ...destinationContext }),
    ).toMatchObject({ destinationSlug: "kerala", journeySlug: "" });

    const scopeContext = readPlannerContext(
      new URLSearchParams("scope=domestic"),
    );
    expect(normalizePlannerDraft({ ...stored, ...scopeContext })).toMatchObject({
      destinationSlug: "",
      journeySlug: "",
      scope: "domestic",
    });
  });

  test("carries safe home-preview party and month context into the planner", () => {
    expect(
      readPlannerContext(
        new URLSearchParams(
          "destination=kerala&party=Family&month=December&ignored=anything",
        ),
      ),
    ).toEqual({
      journeySlug: "",
      destinationSlug: "kerala",
      scope: "domestic",
      partyType: "Family",
      travelMonth: "December",
    });
  });
});

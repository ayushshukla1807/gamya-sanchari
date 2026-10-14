import { describe, expect, test } from "vitest";

import {
  DESTINATIONS,
  EXPERIENCES,
  JOURNAL_ARTICLES,
  JOURNEYS,
} from "@/constants/travel";
import {
  assertUniqueTravelSlugs,
  getArticle,
  getDestination,
  getJourney,
  getRelatedJourneys,
} from "@/lib/travel-content";

const expectedDestinationSlugs = [
  "kerala",
  "kashmir",
  "rajasthan",
  "dubai",
  "bali",
];

const expectedJourneySlugs = [
  "kerala-easy-pace",
  "kashmir-valley-moments",
  "dubai-first-timer-favourites",
  "bali-beautifully-unhurried",
];

describe("travel content contracts", () => {
  test("publishes unique non-empty slugs for every collection", () => {
    expect(() => assertUniqueTravelSlugs()).not.toThrow();

    for (const collection of [
      DESTINATIONS,
      JOURNEYS,
      EXPERIENCES,
      JOURNAL_ARTICLES,
    ]) {
      const slugs = collection.map((item) => item.slug);
      expect(slugs.every((slug) => slug.trim().length > 0)).toBe(true);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  test("publishes the approved destination and sample journey slugs", () => {
    expect(DESTINATIONS.map(({ slug }) => slug)).toEqual(
      expect.arrayContaining(expectedDestinationSlugs),
    );
    expect(JOURNEYS.map(({ slug }) => slug)).toEqual(expectedJourneySlugs);
    expect(JOURNEYS.every(({ isSample }) => isSample)).toBe(true);
  });

  test("publishes six experience categories and three journal entries", () => {
    expect(EXPERIENCES).toHaveLength(6);
    expect(JOURNAL_ARTICLES).toHaveLength(3);
  });

  test("keeps every journey and article relation resolvable", () => {
    const destinationSlugs = new Set(DESTINATIONS.map(({ slug }) => slug));
    const experienceSlugs = new Set(EXPERIENCES.map(({ slug }) => slug));

    for (const journey of JOURNEYS) {
      expect(
        journey.destinationSlugs.every((slug) => destinationSlugs.has(slug)),
      ).toBe(true);
      expect(
        journey.experienceSlugs.every((slug) => experienceSlugs.has(slug)),
      ).toBe(true);
    }

    for (const article of JOURNAL_ARTICLES) {
      expect(
        article.relatedDestinationSlugs.every((slug) =>
          destinationSlugs.has(slug),
        ),
      ).toBe(true);
    }
  });
});

describe("travel content lookups", () => {
  test("finds approved records without cloning them", () => {
    expect(getDestination("kerala")).toBe(
      DESTINATIONS.find(({ slug }) => slug === "kerala"),
    );
    expect(getJourney("kashmir-valley-moments")).toBe(
      JOURNEYS.find(({ slug }) => slug === "kashmir-valley-moments"),
    );
    expect(getArticle(JOURNAL_ARTICLES[0].slug)).toBe(JOURNAL_ARTICLES[0]);
  });

  test("returns undefined for unknown content slugs", () => {
    expect(getDestination("not-a-destination")).toBeUndefined();
    expect(getJourney("not-a-journey")).toBeUndefined();
    expect(getArticle("not-an-article")).toBeUndefined();
  });

  test("returns only journeys related to the requested destination", () => {
    expect(getRelatedJourneys("bali").map(({ slug }) => slug)).toEqual([
      "bali-beautifully-unhurried",
    ]);
    expect(getRelatedJourneys("not-a-destination")).toEqual([]);
  });
});

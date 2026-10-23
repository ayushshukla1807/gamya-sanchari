import { describe, expect, test } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";

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
  getJourneysByCategory,
  getRelatedJourneys,
} from "@/lib/travel-content";

const expectedDestinationSlugs = [
  "hampi",
  "kerala",
  "kashmir",
  "rajasthan",
  "dubai",
  "bali",
  "odisha-puri",
  "tirupati",
  "ujjain",
  "varanasi-ayodhya-prayagraj",
  "uttarakhand-yatra",
  "shirdi",
  "andaman",
  "ooty-mysuru",
];

const originalJourneySlugs = [
  "kerala-easy-pace",
  "kashmir-valley-moments",
  "dubai-first-timer-favourites",
  "bali-beautifully-unhurried",
];

const instagramGroundedJourneySlugs = [
  "puri-jagannath-konark",
  "tirupati-darshan",
  "ujjain-mahakaleshwar",
  "varanasi-ayodhya-prayagraj",
  "char-dham-yatra",
  "kedarnath-yatra",
  "shirdi-sai-darshan",
  "andaman-island-escape",
  "ooty-mysuru-short-break",
  "canton-fair-business-visit",
];

const expectedDestinationImages = {
  hampi: "/images/destinations/hampi.webp",
  kerala: "/images/destinations/kerala.webp",
  kashmir: "/images/destinations/kashmir.webp",
  rajasthan: "/images/destinations/rajasthan.webp",
  dubai: "/images/destinations/dubai.webp",
  bali: "/images/destinations/bali.webp",
  "odisha-puri": "/images/destinations/puri-odisha.webp",
  tirupati: "/images/destinations/tirupati.webp",
  ujjain: "/images/destinations/ujjain.webp",
  "varanasi-ayodhya-prayagraj":
    "/images/destinations/varanasi-ayodhya-prayagraj.webp",
  "uttarakhand-yatra": "/images/destinations/char-dham-yatra.webp",
  shirdi: "/images/destinations/shirdi.webp",
  andaman: "/images/destinations/andaman.webp",
  "ooty-mysuru": "/images/destinations/ooty-mysuru.webp",
  "guangzhou-business": "/images/destinations/guangzhou-business.webp",
};

const expectedJourneyImages = {
  "kerala-easy-pace": "/images/destinations/kerala.webp",
  "kashmir-valley-moments": "/images/destinations/kashmir.webp",
  "dubai-first-timer-favourites": "/images/destinations/dubai.webp",
  "bali-beautifully-unhurried": "/images/destinations/bali.webp",
  "puri-jagannath-konark": "/images/destinations/puri-odisha.webp",
  "tirupati-darshan": "/images/destinations/tirupati.webp",
  "ujjain-mahakaleshwar": "/images/destinations/ujjain.webp",
  "varanasi-ayodhya-prayagraj":
    "/images/destinations/varanasi-ayodhya-prayagraj.webp",
  "char-dham-yatra": "/images/destinations/char-dham-yatra.webp",
  "kedarnath-yatra": "/images/destinations/kedarnath-yatra.webp",
  "shirdi-sai-darshan": "/images/destinations/shirdi.webp",
  "andaman-island-escape": "/images/destinations/andaman.webp",
  "ooty-mysuru-short-break": "/images/destinations/ooty-mysuru.webp",
  "canton-fair-business-visit":
    "/images/destinations/guangzhou-business.webp",
};

describe("travel content contracts", () => {
  test("leads destination discovery with Hampi in South India", () => {
    expect(DESTINATIONS[0]).toMatchObject({
      slug: "hampi",
      region: "South India",
      scope: "domestic",
    });
    expect(DESTINATIONS[0].sampleRoute).toEqual([
      "Bengaluru",
      "Hampi",
      "Badami",
    ]);
  });

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

  test("publishes the approved destination and Instagram-grounded journey slugs", () => {
    expect(DESTINATIONS.map(({ slug }) => slug)).toEqual(
      expect.arrayContaining(expectedDestinationSlugs),
    );
    expect(JOURNEYS.map(({ slug }) => slug)).toEqual(
      expect.arrayContaining([
        ...originalJourneySlugs,
        ...instagramGroundedJourneySlugs,
      ]),
    );
  });

  test("publishes the specialist experience categories and three journal entries", () => {
    expect(EXPERIENCES.map(({ slug }) => slug)).toEqual(
      expect.arrayContaining([
        "spiritual",
        "group-departures",
        "short-trips",
        "women-only",
        "island-escapes",
        "business-travel",
      ]),
    );
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

  test("gives every destination and journey authentic, dedicated imagery", () => {
    const destinationImages = DESTINATIONS.map(({ image }) => image);
    const journeyImages = JOURNEYS.map(({ heroImage }) => heroImage);

    expect(
      Object.fromEntries(DESTINATIONS.map(({ slug, image }) => [slug, image])),
    ).toEqual(expectedDestinationImages);
    expect(
      Object.fromEntries(
        JOURNEYS.map(({ slug, heroImage }) => [slug, heroImage]),
      ),
    ).toEqual(expectedJourneyImages);

    expect(new Set(destinationImages).size).toBe(DESTINATIONS.length);
    expect(new Set(journeyImages).size).toBe(JOURNEYS.length);

    for (const image of [...destinationImages, ...journeyImages]) {
      expect(image).toMatch(/^\/images\/destinations\/[a-z0-9-]+\.webp$/);
      expect(existsSync(join(process.cwd(), "public", image))).toBe(true);
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

  test("returns only journeys in the requested audited category", () => {
    expect(getJourneysByCategory("business").map(({ slug }) => slug)).toEqual([
      "canton-fair-business-visit",
    ]);
    expect(
      getJourneysByCategory("spiritual").map(({ slug }) => slug),
    ).toEqual(
      expect.arrayContaining([
        "puri-jagannath-konark",
        "tirupati-darshan",
        "char-dham-yatra",
      ]),
    );
  });
});

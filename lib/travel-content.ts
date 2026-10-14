import {
  DESTINATIONS,
  EXPERIENCES,
  JOURNAL_ARTICLES,
  JOURNEYS,
} from "@/constants/travel";

function assertCollectionSlugs(
  name: string,
  collection: readonly { readonly slug: string }[],
) {
  const seen = new Set<string>();

  for (const item of collection) {
    const slug = item.slug.trim();
    if (!slug) {
      throw new Error(`${name} contains an empty slug`);
    }
    if (seen.has(slug)) {
      throw new Error(`${name} contains duplicate slug: ${slug}`);
    }
    seen.add(slug);
  }
}

export function assertUniqueTravelSlugs() {
  assertCollectionSlugs("destinations", DESTINATIONS);
  assertCollectionSlugs("journeys", JOURNEYS);
  assertCollectionSlugs("experiences", EXPERIENCES);
  assertCollectionSlugs("journal articles", JOURNAL_ARTICLES);
}

export function getDestination(slug: string) {
  return DESTINATIONS.find((destination) => destination.slug === slug);
}

export function getJourney(slug: string) {
  return JOURNEYS.find((journey) => journey.slug === slug);
}

export function getArticle(slug: string) {
  return JOURNAL_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedJourneys(destinationSlug: string) {
  return JOURNEYS.filter((journey) =>
    journey.destinationSlugs.includes(
      destinationSlug as (typeof journey.destinationSlugs)[number],
    ),
  );
}

assertUniqueTravelSlugs();

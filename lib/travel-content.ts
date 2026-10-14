import {
  DESTINATIONS,
  EXPERIENCES,
  JOURNAL_ARTICLES,
  JOURNEYS,
} from "@/constants/travel";
import type { Journey, JourneyCategory } from "@/types/travel";

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

export function getJourney(slug: string): Journey | undefined {
  return (JOURNEYS as readonly Journey[]).find(
    (journey) => journey.slug === slug,
  );
}

export function getArticle(slug: string) {
  return JOURNAL_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedJourneys(destinationSlug: string) {
  return JOURNEYS.filter((journey) =>
    (journey.destinationSlugs as readonly string[]).includes(destinationSlug),
  );
}

export function getJourneysByCategory(category: JourneyCategory) {
  return JOURNEYS.filter((journey) =>
    (journey.categorySlugs as readonly JourneyCategory[]).includes(category),
  );
}

assertUniqueTravelSlugs();

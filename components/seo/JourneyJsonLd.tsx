import { BRAND } from "@/constants/brand";
import type { Journey } from "@/types/travel";

export function buildJourneySchema(journey: Journey) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: journey.title,
    description: journey.summary,
    url: `${BRAND.siteUrl}/packages/${journey.slug}/`,
    touristType: journey.audience,
    itinerary: journey.route.join(" → "),
    provider: {
      "@type": "TravelAgency",
      "@id": `${BRAND.siteUrl}/#travel-agency`,
      name: BRAND.name,
      url: BRAND.siteUrl,
    },
  } as const;
}

export default function JourneyJsonLd({ journey }: { journey: Journey }) {
  const json = JSON.stringify(buildJourneySchema(journey)).replace(/</g, "\\u003c");

  return (
    <script
      data-testid="journey-json-ld"
      dangerouslySetInnerHTML={{ __html: json }}
      suppressHydrationWarning
      type="application/ld+json"
    />
  );
}

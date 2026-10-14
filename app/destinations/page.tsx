import DestinationFilters from "@/components/destinations/DestinationFilters";
import EditorialHero from "@/components/ui/EditorialHero";
import { DESTINATIONS } from "@/constants/travel";
import { metadataForPath } from "@/lib/metadata";

export const metadata = metadataForPath("/destinations/");

export default function DestinationsPage() {
  return (
    <main>
      <EditorialHero eyebrow="Destination atlas" title="Find your direction" summary="Browse places by region, season and travel style. Every idea is a starting point—we shape the final journey around you." primary={{ href: "/plan-my-trip/", label: "Plan My Trip" }} secondary={{ href: "/packages/", label: "See Sample Journeys" }} />
      <section className="section-shell"><DestinationFilters destinations={DESTINATIONS} /></section>
    </main>
  );
}

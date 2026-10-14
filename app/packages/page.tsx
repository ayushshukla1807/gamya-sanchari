import PackageFilters from "@/components/packages/PackageFilters";
import EditorialHero from "@/components/ui/EditorialHero";
import { JOURNEYS } from "@/constants/travel";
import { metadataForPath } from "@/lib/metadata";

export const metadata = metadataForPath("/packages/");

export default function PackagesPage() {
  return <main><EditorialHero eyebrow="Curated starting points" title="Journeys to make your own" summary="These sample journeys show what thoughtful pacing can feel like. Every route, stay and experience can be shaped around you." primary={{ href: "/plan-my-trip/", label: "Build My Trip" }} secondary={{ href: "/destinations/", label: "Explore Destinations" }} /><section className="section-shell"><PackageFilters journeys={JOURNEYS} /></section></main>;
}

import DestinationFilters from "@/components/destinations/DestinationFilters";
import EditorialHero from "@/components/ui/EditorialHero";
import { DESTINATIONS } from "@/constants/travel";
import { metadataForPath } from "@/lib/metadata";

export const metadata = metadataForPath("/destinations/");

export default function DestinationsPage() {
  return (
    <main>
      <EditorialHero eyebrow="Karnataka first · India beyond" title="Begin with Karnataka, then discover India" summary="Start with Hampi, Mysuru, Coorg and the Western Ghats, then connect the India journey that suits your season, interests and pace." primary={{ href: "/plan-my-trip/?destination=hampi", label: "Plan Hampi & Karnataka" }} secondary={{ href: "/packages/", label: "See India Journeys" }} />
      <section className="section-shell"><DestinationFilters destinations={DESTINATIONS} /></section>
    </main>
  );
}

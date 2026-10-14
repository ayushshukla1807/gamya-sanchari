import ExperiencePortal from "@/components/experiences/ExperiencePortal";
import EditorialHero from "@/components/ui/EditorialHero";
import { EXPERIENCES } from "@/constants/travel";
import { metadataForPath } from "@/lib/metadata";

export const metadata = metadataForPath("/experiences/");

export default function ExperiencesPage() {
  return <main><EditorialHero eyebrow="Travel by feeling" title="Start with how you want to feel" summary="A great destination is only half the answer. Begin with the people, pace and moments that will make the journey yours." primary={{ href: "/plan-my-trip/", label: "Find My Fit" }} secondary={{ href: "/packages/", label: "Browse Journeys" }} /><section className="section-shell"><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{EXPERIENCES.map((experience, index) => <ExperiencePortal experience={experience} index={index} key={experience.slug} />)}</div></section></main>;
}

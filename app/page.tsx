import Hero from "@/components/Hero";
import ConfidenceClose from "@/components/home/ConfidenceClose";
import ExperienceShowcase from "@/components/home/ExperienceShowcase";
import FeaturedJourneys from "@/components/home/FeaturedJourneys";
import PlannerPreview from "@/components/home/PlannerPreview";
import PlanningRoute from "@/components/home/PlanningRoute";
import RegionExplorer from "@/components/home/RegionExplorer";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <RegionExplorer />
      <ExperienceShowcase />
      <FeaturedJourneys />
      <PlanningRoute />
      <PlannerPreview />
      <ConfidenceClose />
    </main>
  );
}

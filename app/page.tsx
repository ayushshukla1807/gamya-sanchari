import Hero from "@/components/Hero";
import ConfidenceClose from "@/components/home/ConfidenceClose";
import ExperienceShowcase from "@/components/home/ExperienceShowcase";
import FeaturedJourneys from "@/components/home/FeaturedJourneys";
import HandledInclusions from "@/components/home/HandledInclusions";
import KarnatakaGateway from "@/components/home/KarnatakaGateway";
import PlannerPreview from "@/components/home/PlannerPreview";
import PlanningRoute from "@/components/home/PlanningRoute";
import PreviousDepartures from "@/components/home/PreviousDepartures";
import TravelDesk from "@/components/home/TravelDesk";
import ScrollProgress from "@/components/motion/ScrollProgress";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <ScrollProgress />
      <Hero />
      <KarnatakaGateway />
      <ExperienceShowcase />
      <FeaturedJourneys />
      <HandledInclusions />
      <PreviousDepartures />
      <TravelDesk />
      <PlanningRoute />
      <PlannerPreview />
      <ConfidenceClose />
    </main>
  );
}

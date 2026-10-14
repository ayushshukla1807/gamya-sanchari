import TripPlanner from "@/components/planner/TripPlanner";
import EditorialHero from "@/components/ui/EditorialHero";

export const metadata = { title: "Plan My Trip | Gamya Sanchari", description: "Shape a personalized travel brief in a few calm steps, then continue the conversation in WhatsApp." };

export default function PlanMyTripPage() {
  return <main><EditorialHero eyebrow="Your journey, shaped around you" title="Let’s build the right trip" summary="A few thoughtful choices give our planners the context to listen well and start with ideas that genuinely fit." primary={{ href: "#trip-planner", label: "Start Planning" }} secondary={{ href: "/packages/", label: "See Sample Journeys" }} /><section className="section-shell" id="trip-planner"><div className="mx-auto max-w-4xl"><TripPlanner /></div></section></main>;
}

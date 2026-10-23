import RouteLine from "@/components/ui/RouteLine";
import KineticText from "@/components/motion/KineticText";

const details = [
  ["We listen", "People, priorities, pace and budget come before a destination checklist."],
  ["We shape", "Routes, stays and experiences are brought together into one coherent rhythm."],
  ["We refine", "You see the logic, ask questions and adjust the plan until it feels right."],
  ["We support", "One familiar point of contact helps the journey feel clear before and during travel."],
] as const;

export default function PlanningRoute() {
  return <section className="section-atmosphere bg-[#27372c] text-white" data-material="premium-section"><div className="section-shell"><p className="eyebrow text-[#f5ad56]">From idea to itinerary</p><KineticText as="h2" className="mt-4 max-w-4xl text-4xl font-extrabold sm:text-6xl" text="How we shape your journey" /><p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">A calm planning process turns scattered travel decisions into one journey that makes sense.</p><div className="premium-surface mt-12 rounded-[2rem] bg-white p-6 sm:p-9"><RouteLine stops={["Listen", "Shape", "Refine", "Support"]} /></div><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{details.map(([title, description]) => <article className="premium-card rounded-[1.5rem] border-white/10 bg-white/5 p-6" data-material="premium-card" key={title}><h3 className="text-xl font-extrabold">{title}</h3><p className="mt-3 text-sm leading-7 text-white/65">{description}</p></article>)}</div></div></section>;
}

import MotionReveal from "@/components/MotionReveal";
import KineticText from "@/components/motion/KineticText";

const ITEMS = [
  ["Transport", "Flights, rail, road and local movement connected around the route."],
  ["Stays", "Options chosen for location, comfort and the people travelling."],
  ["Applicable meals", "Clear meal inclusions when they belong to the confirmed plan."],
  ["Sightseeing", "Highlights sequenced at a pace the group can realistically enjoy."],
  ["Local coordination", "Practical help between arrival, check-in and each experience."],
  ["Tour-manager or guide support", "Human assistance where the confirmed journey includes it."],
] as const;

export default function HandledInclusions() {
  return (
    <section className="section-atmosphere bg-[#f2e8d8]" data-material="premium-section">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div><p className="eyebrow text-[#a63d24]">Details, connected</p><KineticText as="h2" className="mt-4 text-4xl font-extrabold text-[#3f2a20] sm:text-6xl" text="What we can coordinate" /></div>
          <p className="max-w-2xl text-lg leading-8 text-[#6a594b]">Every inclusion is confirmed for your journey. Nothing is assumed from an old poster or an earlier departure.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ITEMS.map(([title, description], index) => <MotionReveal delay={index * 0.05} direction="scale" hoverLift key={title}><article className="premium-card rounded-[1.5rem] bg-white p-6" data-material="premium-card"><h3 className="text-xl font-extrabold text-[#3f2a20]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6a594b]">{description}</p></article></MotionReveal>)}
        </div>
      </div>
    </section>
  );
}

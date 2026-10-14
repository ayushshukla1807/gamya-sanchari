import MotionReveal from "@/components/MotionReveal";

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
    <section className="bg-[#eaf0f6]">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div><p className="eyebrow text-[#1844ef]">Details, connected</p><h2 className="mt-4 text-4xl font-extrabold text-[#0b1633] sm:text-6xl">What we can coordinate</h2></div>
          <p className="max-w-2xl text-lg leading-8 text-[#566073]">Every inclusion is confirmed for your journey. Nothing is assumed from an old poster or an earlier departure.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ITEMS.map(([title, description], index) => <MotionReveal delay={index * 0.05} direction="scale" hoverLift key={title}><article className="rounded-[1.5rem] bg-white p-6 shadow-sm"><h3 className="text-xl font-extrabold text-[#0b1633]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#566073]">{description}</p></article></MotionReveal>)}
        </div>
      </div>
    </section>
  );
}

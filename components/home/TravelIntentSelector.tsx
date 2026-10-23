import MotionReveal from "@/components/MotionReveal";
import KineticText from "@/components/motion/KineticText";
import { TRAVEL_INTENTS } from "@/constants/travel";

export default function TravelIntentSelector() {
  return (
    <section className="section-atmosphere bg-[#fffaf0]" data-material="premium-section">
      <div className="section-shell">
        <MotionReveal direction="left"><p className="eyebrow text-[#f06619]">Begin with your reason to travel</p></MotionReveal>
        <MotionReveal delay={0.06}><KineticText as="h2" className="mt-4 max-w-4xl text-4xl font-extrabold text-[#3f2a20] sm:text-6xl" text="What kind of journey are you looking for?" /></MotionReveal>
        <MotionReveal delay={0.1}><p className="mt-5 max-w-3xl text-lg leading-8 text-[#6a594b]">Choose the feeling or format first. We will help connect the right route, pace and support.</p></MotionReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {TRAVEL_INTENTS.map((intent, index) => (
            <MotionReveal delay={index * 0.055} direction={index % 2 === 0 ? "left" : "right"} hoverLift key={intent.slug}>
            <a className="premium-card group block h-full rounded-[1.75rem] bg-white p-7" data-material="premium-card" href={intent.href}>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f06619]">0{index + 1}</span>
              <h3 className="mt-5 text-2xl font-extrabold text-[#3f2a20]">{intent.title}</h3>
              <p className="mt-3 leading-7 text-[#6a594b]">{intent.summary}</p>
              <span className="mt-6 inline-flex font-extrabold text-[#a63d24]">Explore →</span>
            </a>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

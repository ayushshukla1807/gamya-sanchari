import MotionReveal from "@/components/MotionReveal";
import KineticText from "@/components/motion/KineticText";
import PackageCard from "@/components/packages/PackageCard";
import { JOURNEYS } from "@/constants/travel";

const FEATURED_SLUGS = ["kerala-easy-pace", "kashmir-valley-moments", "andaman-island-escape", "varanasi-ayodhya-prayagraj", "ooty-mysuru-short-break"] as const;

export default function FeaturedJourneys() {
  const journeys = JOURNEYS.filter((journey) => (FEATURED_SLUGS as readonly string[]).includes(journey.slug));
  return <section className="section-atmosphere bg-white" data-material="premium-section"><div className="section-shell"><MotionReveal><div className="grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="eyebrow text-[#f06619]">Across India, shaped around you</p><KineticText as="h2" className="mt-4 text-4xl font-extrabold text-[#3f2a20] sm:text-6xl" text="Journeys with a real story behind them" /></div><p className="max-w-xl text-lg leading-8">Use these routes as thoughtful starting points. We refine the pace, stays and experiences around your arrival city, interests and time in India.</p></div></MotionReveal><div className="mt-10 grid gap-7 lg:grid-cols-2">{journeys.map((journey, index) => <MotionReveal delay={index * 0.06} direction={index % 2 === 0 ? "left" : "right"} key={journey.slug}><PackageCard journey={journey} /></MotionReveal>)}</div><MotionReveal direction="scale"><a className="premium-button mt-8 inline-flex min-h-12 items-center rounded-full bg-[#27372c] px-6 font-extrabold text-white" href="/packages/">Explore journeys across India →</a></MotionReveal></div></section>;
}

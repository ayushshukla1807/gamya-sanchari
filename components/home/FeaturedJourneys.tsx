import PackageCard from "@/components/packages/PackageCard";
import { JOURNEYS } from "@/constants/travel";

const FEATURED_SLUGS = ["puri-jagannath-konark", "tirupati-darshan", "char-dham-yatra", "andaman-island-escape", "varanasi-ayodhya-prayagraj"] as const;

export default function FeaturedJourneys() {
  const journeys = JOURNEYS.filter((journey) => (FEATURED_SLUGS as readonly string[]).includes(journey.slug));
  return <section className="bg-white"><div className="section-shell"><div className="grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="eyebrow text-[#f06619]">Grounded in routes we know</p><h2 className="mt-4 text-4xl font-extrabold text-[#0b1633] sm:text-6xl">Journeys with a real story behind them</h2></div><p className="max-w-xl text-lg leading-8">Real route history, clearly labelled. Ask us to verify the next date or reshape the journey around your people.</p></div><div className="mt-10 grid gap-7 lg:grid-cols-2">{journeys.map((journey) => <PackageCard journey={journey} key={journey.slug} />)}</div><a className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#081329] px-6 font-extrabold text-white" href="/packages/">Browse every journey →</a></div></section>;
}

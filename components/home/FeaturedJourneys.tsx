import PackageCard from "@/components/packages/PackageCard";
import { JOURNEYS } from "@/constants/travel";

export default function FeaturedJourneys() {
  return <section className="bg-white"><div className="section-shell"><div className="grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="eyebrow text-[#f06619]">Postcards from a possible journey</p><h2 className="mt-4 text-4xl font-extrabold text-[#0b1633] sm:text-6xl">See a journey take shape</h2></div><p className="max-w-xl text-lg leading-8">Use these routes as inspiration, never as a rigid package. Every sample can be slowed down, expanded or reimagined.</p></div><div className="mt-10 grid gap-7 lg:grid-cols-2">{JOURNEYS.map((journey) => <PackageCard journey={journey} key={journey.slug} />)}</div><a className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#081329] px-6 font-extrabold text-white" href="/packages/">Browse all sample journeys →</a></div></section>;
}

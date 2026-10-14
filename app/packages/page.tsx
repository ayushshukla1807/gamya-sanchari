import PackageFilters from "@/components/packages/PackageFilters";
import EditorialHero from "@/components/ui/EditorialHero";
import { JOURNEYS } from "@/constants/travel";
import { metadataForPath } from "@/lib/metadata";

export const metadata = metadataForPath("/packages/");

export default function PackagesPage() {
  return <main><EditorialHero eyebrow="Curated starting points" title="Journeys to make your own" summary="Explore customisable ideas, routes available on request and proof from previous departures—always labelled so you know what is current." primary={{ href: "/plan-my-trip/", label: "Build My Trip" }} secondary={{ href: "/destinations/", label: "Explore Destinations" }} /><section className="section-shell pb-0"><div className="rounded-[2rem] bg-[#081329] p-7 text-white sm:p-9"><h2 className="text-3xl font-extrabold">How availability works</h2><div className="mt-6 grid gap-5 md:grid-cols-3"><div><p className="font-extrabold text-[#f5ad56]">Enquire now</p><p className="mt-2 text-sm leading-6 text-white/70">A flexible journey idea we can shape around your dates and people.</p></div><div><p className="font-extrabold text-[#f5ad56]">Next departure on request</p><p className="mt-2 text-sm leading-6 text-white/70">A route we know; ask us to confirm the next verified group date.</p></div><div><p className="font-extrabold text-[#f5ad56]">Previous departure</p><p className="mt-2 text-sm leading-6 text-white/70">Evidence of an earlier campaign, never a claim that its date or price is still open.</p></div></div></div></section><section className="section-shell"><PackageFilters journeys={JOURNEYS} /></section></main>;
}

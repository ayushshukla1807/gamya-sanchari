import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ItineraryAccordion from "@/components/packages/ItineraryAccordion";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import RouteLine from "@/components/ui/RouteLine";
import Stamp from "@/components/ui/Stamp";
import { DESTINATIONS, JOURNEYS } from "@/constants/travel";
import { getJourney } from "@/lib/travel-content";
import { metadataForPath } from "@/lib/metadata";

export function generateStaticParams() { return JOURNEYS.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const journey = getJourney(params.slug);
  if (!journey) return { title: "Journey not found | Gamya Sanchari" };
  return metadataForPath(`/packages/${journey.slug}/`);
}

export default function JourneyPage({ params }: { params: { slug: string } }) {
  const journey = getJourney(params.slug);
  if (!journey) notFound();
  const destinations = DESTINATIONS.filter(({ slug }) => (journey.destinationSlugs as readonly string[]).includes(slug));
  const plannerHref = `/plan-my-trip/?journey=${journey.slug}`;
  return <><main className="pb-24 lg:pb-0"><section className="relative isolate overflow-hidden bg-[#081329] pb-20 pt-32 text-white sm:pt-40"><Image alt="" className="-z-20 object-cover opacity-45" fill priority sizes="100vw" src={journey.heroImage} /><div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#081329] via-[#081329]/80 to-transparent" /><div className="mx-auto grid max-w-[1440px] gap-6 px-5 sm:px-8 lg:px-12"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Packages", href: "/packages/" }, { label: journey.title }]} /><Stamp>Sample journey—customizable</Stamp><h1 className="max-w-4xl text-4xl font-extrabold sm:text-7xl">{journey.title}</h1><p className="max-w-2xl text-lg leading-8 text-white/75">{journey.summary}</p><a className="inline-flex min-h-12 w-fit items-center rounded-full bg-[#f06619] px-6 font-extrabold" href={plannerHref}>Customize This Trip</a></div></section><section className="section-shell grid gap-12 lg:grid-cols-[1fr_20rem]"><div><p className="eyebrow text-[#1844ef]">The route</p><div className="mt-7"><RouteLine stops={journey.route} /></div><h2 className="mt-16 text-3xl font-extrabold text-[#0b1633] sm:text-5xl">Day by day</h2><p className="mt-3 max-w-2xl leading-7">A flexible outline to refine around your pace, dates and interests.</p><div className="mt-8"><ItineraryAccordion days={journey.days} /></div>{destinations.length ? <div className="mt-14"><h2 className="text-3xl font-extrabold text-[#0b1633]">Related destinations</h2><div className="mt-5 flex flex-wrap gap-3">{destinations.map((destination) => <a className="inline-flex min-h-11 items-center rounded-full border border-[#0b1633]/15 bg-white px-5 font-extrabold text-[#1844ef]" href={`/destinations/${destination.slug}/`} key={destination.slug}>Explore {destination.title}</a>)}</div></div> : null}</div><aside className="h-fit rounded-[2rem] bg-[#fffaf0] p-7 shadow-[var(--shadow-soft)] lg:sticky lg:top-28"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f06619]">At a glance</p><dl className="mt-5 grid gap-5"><div><dt className="text-sm text-[#697386]">Duration</dt><dd className="font-extrabold text-[#0b1633]">{journey.duration}</dd></div><div><dt className="text-sm text-[#697386]">Best for</dt><dd className="font-extrabold text-[#0b1633]">{journey.audience}</dd></div><div><dt className="text-sm text-[#697386]">Style</dt><dd className="font-extrabold text-[#0b1633]">{journey.theme}</dd></div></dl><a className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1844ef] px-5 font-extrabold text-white" href={plannerHref}>Customize This Trip</a></aside></section><div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#0b1633]/10 bg-white/95 p-3 backdrop-blur lg:hidden"><a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-full bg-[#1844ef] px-6 font-extrabold text-white" href={plannerHref}>Customize This Trip</a></div></main><BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Packages", path: "/packages/" }, { name: journey.title, path: `/packages/${journey.slug}/` }]} /></>;
}

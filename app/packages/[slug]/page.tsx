import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import JourneyEnquiryLink from "@/components/journeys/JourneyEnquiryLink";
import JourneyStatusBadge from "@/components/journeys/JourneyStatusBadge";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ItineraryAccordion from "@/components/packages/ItineraryAccordion";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import JourneyJsonLd from "@/components/seo/JourneyJsonLd";
import RouteLine from "@/components/ui/RouteLine";
import { DESTINATIONS, JOURNEYS } from "@/constants/travel";
import { getJourney } from "@/lib/travel-content";
import { metadataForPath } from "@/lib/metadata";
import type { Journey } from "@/types/travel";

export function generateStaticParams() {
  return JOURNEYS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const journey = getJourney(params.slug);
  if (!journey) return { title: "Journey not found | Gamya Sanchari" };
  return metadataForPath(`/packages/${journey.slug}/`);
}

function JourneyAction({ journey, className }: { journey: Journey; className: string }) {
  if (journey.departureStatus !== "enquire") {
    return <JourneyEnquiryLink className={className} journey={journey} />;
  }
  return <a className={className} href={`/plan-my-trip/?journey=${journey.slug}`}>Customize This Trip</a>;
}

export default function JourneyPage({ params }: { params: { slug: string } }) {
  const journey = getJourney(params.slug);
  if (!journey) notFound();
  const destinations = DESTINATIONS.filter(({ slug }) => journey.destinationSlugs.includes(slug));
  const hasItinerary = Boolean(journey.days?.length);
  const buttonClass = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#a63d24] px-6 font-extrabold text-white transition hover:bg-[#f06619]";

  return (
    <>
      <main className="pb-24 lg:pb-0">
        <section className="relative isolate overflow-hidden bg-[#27372c] pb-20 pt-32 text-white sm:pt-40">
          <Image alt="" className="-z-20 object-cover opacity-45" fill priority sizes="100vw" src={journey.heroImage} />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#27372c] via-[#27372c]/80 to-transparent" />
          <div className="mx-auto grid max-w-[1440px] gap-6 px-5 sm:px-8 lg:px-12">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Packages", href: "/packages/" }, { label: journey.title }]} />
            <div className="w-fit"><JourneyStatusBadge status={journey.departureStatus} /></div>
            <h1 className="max-w-4xl text-4xl font-extrabold sm:text-7xl">{journey.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-white/75">{journey.summary}</p>
            <JourneyAction className={`${buttonClass} w-fit bg-[#f06619] hover:bg-[#a63d24]`} journey={journey} />
          </div>
        </section>

        <section className="section-shell grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div>
            <p className="eyebrow text-[#a63d24]">The route</p>
            <div className="mt-7"><RouteLine stops={journey.route} /></div>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <section className="rounded-[2rem] bg-white p-7 shadow-[var(--shadow-soft)]">
                <h2 className="text-2xl font-extrabold text-[#3f2a20]">Route highlights</h2>
                <ul className="mt-5 grid gap-3 leading-7 text-[#6a594b]">{journey.routeHighlights.map((highlight) => <li className="flex gap-3" key={highlight}><span aria-hidden="true" className="text-[#f06619]">✦</span>{highlight}</li>)}</ul>
              </section>
              <section className="rounded-[2rem] bg-[#fffaf0] p-7 shadow-[var(--shadow-soft)]">
                <h2 className="text-2xl font-extrabold text-[#3f2a20]">What can be coordinated</h2>
                <ul className="mt-5 grid gap-3 leading-7 text-[#6a594b]">{journey.inclusions.map((inclusion) => <li className="flex gap-3" key={inclusion}><span aria-hidden="true" className="text-[#a63d24]">✓</span>{inclusion}</li>)}</ul>
              </section>
            </div>

            {hasItinerary ? <section className="mt-16"><h2 className="text-3xl font-extrabold text-[#3f2a20] sm:text-5xl">Day by day</h2><p className="mt-3 max-w-2xl leading-7">A flexible outline to refine around your pace, dates and interests.</p><div className="mt-8"><ItineraryAccordion days={journey.days!} /></div></section> : null}

            {destinations.length ? <section className="mt-14"><h2 className="text-3xl font-extrabold text-[#3f2a20]">Related destinations</h2><div className="mt-5 flex flex-wrap gap-3">{destinations.map((destination) => <a className="inline-flex min-h-11 items-center rounded-full border border-[#3f2a20]/15 bg-white px-5 font-extrabold text-[#a63d24]" href={`/destinations/${destination.slug}/`} key={destination.slug}>Explore {destination.title}</a>)}</div></section> : null}
          </div>

          <aside className="h-fit rounded-[2rem] bg-[#fffaf0] p-7 shadow-[var(--shadow-soft)] lg:sticky lg:top-28">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f06619]">At a glance</p>
            <dl className="mt-5 grid gap-5"><div><dt className="text-sm text-[#756455]">Duration</dt><dd className="font-extrabold text-[#3f2a20]">{journey.durationLabel}</dd></div><div><dt className="text-sm text-[#756455]">Best for</dt><dd className="font-extrabold text-[#3f2a20]">{journey.audience}</dd></div><div><dt className="text-sm text-[#756455]">Style</dt><dd className="font-extrabold text-[#3f2a20]">{journey.theme}</dd></div></dl>
            <JourneyAction className={`${buttonClass} mt-7 w-full`} journey={journey} />
          </aside>
        </section>
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#3f2a20]/10 bg-white/95 p-3 backdrop-blur lg:hidden"><JourneyAction className={`${buttonClass} mx-auto flex max-w-md`} journey={journey} /></div>
      </main>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Packages", path: "/packages/" }, { name: journey.title, path: `/packages/${journey.slug}/` }]} />
      <JourneyJsonLd journey={journey} />
    </>
  );
}

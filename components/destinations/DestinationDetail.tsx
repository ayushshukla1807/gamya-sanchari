import Image from "next/image";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaGroup from "@/components/ui/CtaGroup";
import RouteLine from "@/components/ui/RouteLine";
import Stamp from "@/components/ui/Stamp";
import { BRAND } from "@/constants/brand";
import type { DestinationDetail as Destination, Journey } from "@/types/travel";

export default function DestinationDetail({ destination, relatedJourneys }: { destination: Destination; relatedJourneys: readonly Journey[] }) {
  return (
    <main>
      <section className="relative isolate min-h-[72svh] overflow-hidden bg-[#081329] pb-16 pt-32 text-white sm:pt-40">
        <Image alt={destination.alt} className="-z-20 object-cover" fill priority sizes="100vw" src={destination.image} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#081329] via-[#081329]/75 to-[#081329]/20" />
        <div className="mx-auto grid max-w-[1440px] gap-7 px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations/" }, { label: destination.title }]} />
          <Stamp>{destination.eyebrow}</Stamp>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-none sm:text-7xl">{destination.title}</h1>
          <p className="max-w-2xl text-lg leading-8 text-white/80">{destination.summary}</p>
          <CtaGroup primary={{ href: `/plan-my-trip/?destination=${destination.slug}`, label: "Plan This Destination" }} secondary={{ href: BRAND.whatsappHref, label: "Ask on WhatsApp" }} />
        </div>
      </section>

      <section className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-[#f06619]">At a glance</p>
          <dl className="mt-6 grid gap-5 rounded-[2rem] bg-white p-7 shadow-[var(--shadow-soft)]">
            <div><dt className="text-xs font-extrabold uppercase tracking-wider text-[#697386]">Ideal months</dt><dd className="mt-2 font-extrabold text-[#0b1633]">{destination.bestMonths.join(" · ")}</dd></div>
            <div><dt className="text-xs font-extrabold uppercase tracking-wider text-[#697386]">Suggested duration</dt><dd className="mt-2 font-extrabold text-[#0b1633]">{destination.suggestedDuration}</dd></div>
            <div><dt className="text-xs font-extrabold uppercase tracking-wider text-[#697386]">Travel styles</dt><dd className="mt-2 capitalize text-[#0b1633]">{destination.styleSlugs.join(" · ")}</dd></div>
          </dl>
        </div>
        <div>
          <p className="eyebrow text-[#1844ef]">Why it stays with you</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">{destination.highlights.map((highlight) => <article className="rounded-[1.5rem] border border-[#0b1633]/10 bg-[#fffaf0] p-6" key={highlight.title}><h2 className="text-xl font-extrabold text-[#0b1633]">{highlight.title}</h2><p className="mt-3 leading-7">{highlight.description}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-[#eaf0f6]"><div className="section-shell"><p className="eyebrow text-[#1844ef]">Sample route</p><h2 className="mt-4 max-w-3xl text-3xl font-extrabold text-[#0b1633] sm:text-5xl">A journey with room around the moments</h2><div className="mt-10"><RouteLine stops={destination.sampleRoute} /></div><ul className="mt-10 grid gap-3 text-[#566073]">{destination.planningNotes.map((note) => <li className="flex gap-3" key={note}><span aria-hidden="true" className="text-[#f06619]">✦</span>{note}</li>)}</ul></div></section>

      {relatedJourneys.length ? <section className="section-shell"><p className="eyebrow text-[#f06619]">Journey inspiration</p><h2 className="mt-4 text-3xl font-extrabold text-[#0b1633] sm:text-5xl">Start with a sample, then make it yours</h2><div className="mt-8 grid gap-5 md:grid-cols-2">{relatedJourneys.map((journey) => <article className="rounded-[2rem] bg-[#081329] p-7 text-white" key={journey.slug}><Stamp>Sample journey</Stamp><h3 className="mt-5 text-2xl font-extrabold">{journey.title}</h3><p className="mt-3 text-white/70">{journey.duration} · {journey.route.join(" → ")}</p><a className="mt-6 inline-flex min-h-11 items-center font-extrabold text-[#f5ad56]" href={`/packages/${journey.slug}/`}>View the journey →</a></article>)}</div></section> : null}
    </main>
  );
}

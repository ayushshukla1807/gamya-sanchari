import JourneyEnquiryLink from "@/components/journeys/JourneyEnquiryLink";
import JourneyStatusBadge from "@/components/journeys/JourneyStatusBadge";
import { JOURNEYS } from "@/constants/travel";
import type { Journey } from "@/types/travel";

const PROOF_SLUGS = ["puri-jagannath-konark", "tirupati-darshan", "varanasi-ayodhya-prayagraj"] as const;

export default function PreviousDepartures() {
  const journeys = (JOURNEYS as readonly Journey[]).filter((journey) =>
    (PROOF_SLUGS as readonly string[]).includes(journey.slug),
  );

  return (
    <section className="bg-[#081329] text-white">
      <div className="section-shell">
        <p className="eyebrow text-[#f5ad56]">Proof, with the date kept honest</p>
        <h2 className="mt-4 max-w-4xl text-4xl font-extrabold sm:text-6xl">Previous departures, thoughtfully continued</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">Completed-tour moments such as Tiranga Darshan show how shared journeys can come together. They are operating proof—not a claim that an old date, fare or seat is still available.</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {journeys.map((journey) => <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6" key={journey.slug}><div className="flex flex-wrap items-center gap-3"><JourneyStatusBadge status={journey.departureStatus} /><span className="text-xs font-bold uppercase tracking-wider text-white/55">{journey.historicalContext?.sourcePeriod}</span></div><h3 className="mt-5 text-2xl font-extrabold">{journey.title}</h3><p className="mt-3 text-sm leading-7 text-white/65">{journey.historicalContext?.note}</p><JourneyEnquiryLink className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#f06619] px-5 text-sm font-extrabold text-white" journey={journey} /></article>)}
        </div>
      </div>
    </section>
  );
}

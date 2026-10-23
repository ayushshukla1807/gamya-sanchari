import Image from "next/image";

import JourneyEnquiryLink from "@/components/journeys/JourneyEnquiryLink";
import JourneyStatusBadge from "@/components/journeys/JourneyStatusBadge";
import type { Journey } from "@/types/travel";

export default function JourneyCollection({
  journeys,
  headingLevel,
}: {
  journeys: readonly Journey[];
  headingLevel: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {journeys.map((journey) => (
        <article
          className="overflow-hidden rounded-[2rem] border border-[#3f2a20]/10 bg-white shadow-[var(--shadow-soft)]"
          key={journey.slug}
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              alt=""
              className="object-cover transition duration-700 hover:scale-105 motion-reduce:transition-none"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={journey.heroImage}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#27372c]/75 to-transparent" />
            <div className="absolute bottom-5 left-5"><JourneyStatusBadge status={journey.departureStatus} /></div>
          </div>
          <div className="grid gap-4 p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#f06619]">{journey.durationLabel} · {journey.theme}</p>
            <Heading className="text-2xl font-extrabold text-[#3f2a20]">{journey.title}</Heading>
            <p className="leading-7 text-[#6a594b]">{journey.summary}</p>
            <p className="text-sm font-bold text-[#3f2a20]">{journey.route.join(" → ")}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a className="inline-flex min-h-11 items-center font-extrabold text-[#a63d24]" href={`/packages/${journey.slug}/`}>View journey →</a>
              <JourneyEnquiryLink journey={journey} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

import Image from "next/image";

import Stamp from "@/components/ui/Stamp";
import type { DestinationDetail } from "@/types/travel";

export default function DestinationCard({ destination }: { destination: DestinationDetail }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[#0b1633]/10 bg-white shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          alt={destination.alt}
          className="object-cover transition duration-700 ease-[var(--ease-travel)] group-hover:scale-105 group-focus-within:scale-105 motion-reduce:transition-none"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={destination.image}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#081329]/90 via-transparent to-transparent" />
        <div className="absolute inset-x-5 bottom-5 text-white">
          <Stamp>{destination.scope}</Stamp>
        </div>
      </div>
      <div className="grid gap-4 p-6 sm:p-7">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f06619]">{destination.region}</p>
          <h2 className="mt-2 text-2xl font-extrabold text-[#0b1633]">{destination.title}</h2>
        </div>
        <p className="line-clamp-3 leading-7 text-[#566073]">{destination.summary}</p>
        <div className="flex flex-wrap gap-2" aria-label={`Travel styles for ${destination.title}`}>
          {destination.styleSlugs.slice(0, 3).map((style) => <span className="rounded-full bg-[#eaf0f6] px-3 py-1 text-xs font-bold capitalize text-[#0b1633]" key={style}>{style}</span>)}
        </div>
        <a className="inline-flex min-h-11 items-center font-extrabold text-[#1844ef] transition group-hover:text-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href={`/destinations/${destination.slug}/`}>
          Explore {destination.title} <span aria-hidden="true" className="ml-2">→</span>
        </a>
      </div>
    </article>
  );
}

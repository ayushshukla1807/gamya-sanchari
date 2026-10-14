import Image from "next/image";

import Stamp from "@/components/ui/Stamp";
import type { Journey } from "@/types/travel";

export default function PackageCard({ journey }: { journey: Journey }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[#0b1633]/10 bg-white shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image alt="" className="object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none" fill sizes="(min-width: 1024px) 50vw, 100vw" src={journey.heroImage} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#081329]/80 to-transparent" />
        <div className="absolute bottom-5 left-5 text-white"><Stamp>Sample journey—customizable</Stamp></div>
      </div>
      <div className="grid gap-4 p-6 sm:p-8">
        <div><p className="text-xs font-extrabold uppercase tracking-[0.17em] text-[#f06619]">{journey.duration} · {journey.audience}</p><h2 className="mt-2 text-2xl font-extrabold text-[#0b1633]">{journey.title}</h2></div>
        <p className="leading-7 text-[#566073]">{journey.summary}</p>
        <p className="text-sm font-bold text-[#0b1633]">{journey.route.join(" → ")}</p>
        <div className="flex flex-wrap gap-2">{journey.experienceSlugs.map((tag) => <span className="rounded-full bg-[#eaf0f6] px-3 py-1 text-xs font-bold capitalize text-[#0b1633]" key={tag}>{tag}</span>)}</div>
        <a className="inline-flex min-h-11 items-center font-extrabold text-[#1844ef] transition hover:text-[#f06619]" href={`/packages/${journey.slug}/`}>View {journey.title} →</a>
      </div>
    </article>
  );
}

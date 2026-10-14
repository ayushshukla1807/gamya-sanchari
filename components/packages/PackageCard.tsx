"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { useMotionPolicy } from "@/components/motion/MotionProvider";
import JourneyEnquiryLink from "@/components/journeys/JourneyEnquiryLink";
import JourneyStatusBadge from "@/components/journeys/JourneyStatusBadge";
import type { Journey } from "@/types/travel";

export default function PackageCard({ journey }: { journey: Journey }) {
  const policy = useMotionPolicy();
  const canReveal = !policy.reduced && typeof IntersectionObserver !== "undefined";
  return (
    <motion.article
      className="premium-card group overflow-hidden rounded-[2rem] bg-white shadow-[var(--shadow-soft)]"
      data-material="premium-card"
      data-motion="journey-card"
      data-motion-engine="framer-motion"
      initial={canReveal ? { opacity: 0, y: 24, scale: 0.985 } : false}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.18, once: true }}
      whileHover={policy.reduced ? undefined : { y: -8, scale: 1.008 }}
      whileInView={canReveal ? { opacity: 1, y: 0, scale: 1 } : undefined}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image alt="" className="object-cover transition duration-1000 ease-[var(--ease-travel)] motion-safe:group-hover:scale-[1.065] motion-reduce:transform-none motion-reduce:transition-none" fill sizes="(min-width: 1024px) 50vw, 100vw" src={journey.heroImage} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#081329]/80 to-transparent" />
        <div className="absolute bottom-5 left-5">
          <JourneyStatusBadge status={journey.departureStatus} />
        </div>
      </div>
      <div className="grid gap-4 p-6 sm:p-8">
        <div><p className="text-xs font-extrabold uppercase tracking-[0.17em] text-[#f06619]">{journey.durationLabel} · {journey.audience}</p><h2 className="mt-2 text-2xl font-extrabold text-[#0b1633]">{journey.title}</h2></div>
        <p className="leading-7 text-[#566073]">{journey.summary}</p>
        <p className="text-sm font-bold text-[#0b1633]">{journey.route.join(" → ")}</p>
        <div className="flex flex-wrap gap-2">{journey.experienceSlugs.map((tag) => <span className="rounded-full bg-[#eaf0f6] px-3 py-1 text-xs font-bold capitalize text-[#0b1633]" key={tag}>{tag}</span>)}</div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a aria-label={`View ${journey.title}`} className="inline-flex min-h-11 items-center font-extrabold text-[#1844ef] transition hover:text-[#f06619]" href={`/packages/${journey.slug}/`}>View {journey.title} →</a>
          <JourneyEnquiryLink journey={journey} />
        </div>
      </div>
    </motion.article>
  );
}

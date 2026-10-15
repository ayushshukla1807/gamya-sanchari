import type { Metadata } from "next";
import Image from "next/image";

import EditorialHero from "@/components/ui/EditorialHero";
import { BRAND } from "@/constants/brand";
import { metadataForPath } from "@/lib/metadata";

export const metadata: Metadata = metadataForPath("/about/");

const METHOD = [
  { title: "Listen", copy: "We begin with your people, priorities, pace and the feeling you want from the journey." },
  { title: "Shape", copy: "We connect the right places into a route with sensible transfers and room to enjoy them." },
  { title: "Refine", copy: "We tune stays, experiences and daily rhythm with you until the plan feels unmistakably yours." },
  { title: "Support", copy: "We stay reachable as the journey approaches, helping you travel with clarity and confidence." },
] as const;

export default function AboutPage() {
  return (
    <main>
      <EditorialHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="The people behind the plan"
        primary={{ href: "/plan-my-trip/", label: "Plan My Trip" }}
        secondary={{ href: "/contact/", label: "Talk to Us" }}
        summary="We are Bengaluru-based travel planners who believe a memorable journey begins by understanding the traveller—not by filling a template."
        title={BRAND.promise}
      />

      <section className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#dce3f8] shadow-[var(--shadow-soft)] sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            alt="Tea-covered hills in Munnar, Kerala"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            src="/images/about.webp"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#081329]/55 via-transparent to-transparent"
          />
          <p className="absolute inset-x-6 bottom-6 text-2xl font-extrabold leading-tight text-white sm:inset-x-8 sm:bottom-8 sm:text-3xl">
            Your people. Your pace. Your journey.
          </p>
        </div>
        <div>
          <p className="eyebrow text-[#f06619]">Why Gamya Sanchari</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0b1633] sm:text-5xl">Travel planning with a human point of view</h2>
          <div className="mt-7 grid gap-6 text-lg leading-8 text-[#566073]">
            <p>Every group carries its own rhythm: early risers and slow starters, first-time explorers and seasoned travellers, celebration plans and quiet escapes. We design around that reality.</p>
            <p>Our role is to turn many possibilities into a clear, comfortable journey—one that makes practical sense while still leaving space for discovery.</p>
            <blockquote className="rounded-[2rem] bg-[#fffaf0] p-7 font-bold text-[#0b1633]">“{BRAND.blessing}”</blockquote>
          </div>
        </div>
      </section>

      <section className="bg-[#eaf0f6]">
        <div className="section-shell">
          <p className="eyebrow text-[#1844ef]">Our planning method</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold text-[#0b1633] sm:text-5xl">Four thoughtful stages, one journey that fits</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {METHOD.map((step, index) => (
              <article className="rounded-[2rem] bg-white p-7" key={step.title}>
                <span className="grid size-11 place-items-center rounded-full bg-[#1844ef] font-extrabold text-white">{index + 1}</span>
                <h3 className="mt-6 text-2xl font-extrabold text-[#0b1633]">{step.title}</h3>
                <p className="mt-3 leading-7">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

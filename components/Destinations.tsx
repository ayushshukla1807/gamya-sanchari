"use client";

import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";

import { DESTINATIONS, SAMPLE_JOURNEYS } from "@/constants/content";

import MotionReveal from "./MotionReveal";
import SectionHeading from "./SectionHeading";
import { useEnquiry } from "./enquiry/EnquiryProvider";

export default function Destinations() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="scroll-mt-20 bg-white py-20 sm:py-28" id="destinations">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          align="center"
          description="From nearby hill country to faraway shores, choose a direction and we'll shape the details around you."
          eyebrow="Where would you like to go?"
          title="Destinations for every kind of traveller"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {DESTINATIONS.map((destination, index) => (
            <MotionReveal
              className={`group ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
              delay={index * 0.04}
              key={destination.title}
            >
              <button
                aria-label={`Enquire about ${destination.title}`}
                className="relative min-h-[25rem] w-full overflow-hidden rounded-[2rem] text-left text-white shadow-lg transition duration-500 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#a63d24]"
                onClick={() => openEnquiry(destination.title)}
                type="button"
              >
                <Image
                  alt={destination.alt}
                  className="object-cover transition duration-700 group-hover:scale-105 group-focus-within:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 34vw"
                  src={destination.image}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#27372c]/95 via-[#27372c]/25 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 block p-6 sm:p-7">
                  <span className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-extrabold">{destination.title}</h3>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-md">
                      <ArrowUpRight aria-hidden="true" size={20} />
                    </span>
                  </span>
                  <span className="flex flex-wrap gap-2">
                    {destination.places.map((place) => (
                      <span
                        className="rounded-full border border-white/20 bg-[#27372c]/20 px-3 py-1 text-xs font-bold backdrop-blur-sm"
                        key={place}
                      >
                        {place}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            </MotionReveal>
          ))}
        </div>

        <div className="mt-20 border-t border-[#3f2a20]/10 pt-14 sm:mt-24 sm:pt-16">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#f06619]">A clearer place to begin</p>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-[-0.035em] text-[#3f2a20] sm:text-4xl">
                Popular journeys, shaped around you
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#6a594b] sm:text-base">
              These are sample starting points, not fixed packages. We adjust the pace,
              stays and experiences after listening to how you want to travel.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SAMPLE_JOURNEYS.map((journey, index) => (
              <MotionReveal delay={index * 0.05} key={journey.title}>
                <article className="group flex h-full flex-col rounded-[1.75rem] border border-[#3f2a20]/10 bg-[#fffaf0] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#a63d24]/30 hover:bg-white hover:shadow-xl">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#a63d24]/10 px-3 py-1.5 text-xs font-extrabold text-[#a63d24]">
                      <CalendarDays aria-hidden="true" size={15} />
                      {journey.duration} · Sample itinerary
                    </span>
                    <span className="text-sm font-extrabold text-[#f06619]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold leading-tight text-[#3f2a20]">
                    {journey.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#6a594b]">{journey.theme}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-bold text-[#3f2a20]">
                    {journey.route.map((stop, stopIndex) => (
                      <span className="inline-flex items-center gap-2" key={stop}>
                        {stopIndex === 0 ? (
                          <MapPin aria-hidden="true" className="text-[#f06619]" size={16} />
                        ) : (
                          <ArrowRight aria-hidden="true" className="text-[#a63d24]" size={14} />
                        )}
                        {stop}
                      </span>
                    ))}
                  </div>
                  <button
                    aria-label={`Plan ${journey.title}`}
                    className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#3f2a20] px-5 py-2.5 text-sm font-extrabold text-white transition group-hover:bg-[#a63d24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a63d24]"
                    onClick={() => openEnquiry(journey.title)}
                    type="button"
                  >
                    Shape this journey
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </button>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

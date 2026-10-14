"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { DESTINATIONS } from "@/constants/content";

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
                className="relative min-h-[25rem] w-full overflow-hidden rounded-[2rem] text-left text-white shadow-lg transition duration-500 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#1844ef]"
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
                <span className="absolute inset-0 bg-gradient-to-t from-[#071027]/95 via-[#071027]/25 to-transparent" />
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
                        className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-bold backdrop-blur-sm"
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
      </div>
    </section>
  );
}

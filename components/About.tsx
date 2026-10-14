import Image from "next/image";

import MotionReveal from "./MotionReveal";
import SectionHeading from "./SectionHeading";

const introduction =
  "Gamya Sanchari, which means 'destination traveller' in Kannada, is a travel planning service built around one idea: a good trip should fit the people taking it. Whether you want a quiet weekend in the hills, a family holiday, a honeymoon or a group tour, we listen first and then put together flights, stays, transfers and sightseeing that match your pace and budget. You get one point of contact, clear costs and support when you need it.";

export default function About() {
  return (
    <section className="section-shell scroll-mt-20" id="about">
      <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <MotionReveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#dce3f8] shadow-2xl shadow-[#1844ef]/10 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              alt="Lush tea plantations rolling across the hills of Munnar"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/about.webp"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081126]/65 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 text-2xl font-extrabold leading-tight text-white sm:bottom-8 sm:left-8 sm:text-3xl">
              Your people. Your pace. Your journey.
            </p>
          </div>
          <div className="absolute -bottom-5 -right-2 max-w-[15rem] rounded-3xl bg-[#1844ef] p-5 text-white shadow-xl sm:right-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/70">
              Our promise
            </p>
            <p className="mt-2 text-lg font-extrabold">We listen first, then plan.</p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <SectionHeading eyebrow="Meet your travel planner" title="Welcome to Gamya Sanchari" />
          <p className="mt-7 text-base leading-8 text-[#656565] sm:text-lg">{introduction}</p>
          <p className="mt-7 border-l-4 border-[#f06619] pl-5 text-xl font-bold leading-8 text-[#212121]">
            Travel with confidence, comfort and a plan made for you.
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}

import { Quote } from "lucide-react";

import { TRAVELLER_STORIES } from "@/constants/content";

import MotionReveal from "./MotionReveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section className="section-shell">
      <SectionHeading
        align="center"
        description="Illustrative stories showing the kind of thoughtful, well-paced holidays we love to plan."
        eyebrow="Traveller stories"
        title="The journey should feel like yours"
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {TRAVELLER_STORIES.map((story, index) => (
          <MotionReveal
            className="flex min-h-80 flex-col rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-8"
            delay={index * 0.05}
            key={`${story.name}-${story.trip}`}
          >
            <div className="flex items-start justify-between gap-5">
              <Quote aria-hidden="true" className="text-[#1844ef]" size={34} />
              <span className="rounded-full bg-[#f06619]/10 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#c84600]">
                Sample traveller story
              </span>
            </div>
            <blockquote className="mt-8 text-lg font-semibold leading-8 text-[#3f3f3f]">
              “{story.quote}”
            </blockquote>
            <p className="mt-auto pt-8 text-sm font-extrabold text-[#212121]">
              {story.name} · {story.trip}
            </p>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

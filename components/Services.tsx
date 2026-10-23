"use client";

import {
  BadgeCheck,
  BriefcaseMedical,
  Heart,
  Hotel,
  Map,
  Plane,
  Ticket,
  Users,
  type LucideIcon,
} from "lucide-react";

import { SERVICES } from "@/constants/content";
import type { IconName } from "@/types/content";

import MotionReveal from "./MotionReveal";
import SectionHeading from "./SectionHeading";
import { useEnquiry } from "./enquiry/EnquiryProvider";

const icons: Partial<Record<IconName, LucideIcon>> = {
  "badge-check": BadgeCheck,
  "briefcase-medical": BriefcaseMedical,
  heart: Heart,
  hotel: Hotel,
  map: Map,
  plane: Plane,
  ticket: Ticket,
  users: Users,
};

export default function Services() {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="section-shell scroll-mt-20" id="services">
      <SectionHeading
        description="The moving parts of a holiday, brought together through one thoughtful point of contact."
        eyebrow="Everything in one plan"
        title="Travel services made personal"
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, index) => {
          const Icon = icons[service.icon] ?? Plane;
          return (
            <MotionReveal delay={index * 0.035} key={service.title}>
              <button
                aria-label={`Enquire about ${service.title}`}
                className="group flex min-h-64 w-full flex-col items-start rounded-[1.75rem] border border-[#3f2a20]/5 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#a63d24]/20 hover:shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#a63d24]"
                onClick={() => openEnquiry(service.title)}
                type="button"
              >
                <span className="grid size-13 place-items-center rounded-2xl bg-[#a63d24]/10 text-[#a63d24] transition group-hover:bg-[#f06619] group-hover:text-white">
                  <Icon aria-hidden="true" size={24} strokeWidth={2} />
                </span>
                <h3 className="mt-8 text-xl font-extrabold text-[#3f2a20]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6a594b]">
                  {service.description}
                </p>
                <span className="mt-auto pt-6 text-sm font-extrabold text-[#a63d24] transition group-hover:text-[#f06619]">
                  Plan this →
                </span>
              </button>
            </MotionReveal>
          );
        })}
      </div>
    </section>
  );
}

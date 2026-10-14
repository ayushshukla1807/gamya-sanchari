import {
  BedDouble,
  Compass,
  Route,
  ShieldCheck,
  Sparkles,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

import { BENEFITS } from "@/constants/content";
import type { IconName } from "@/types/content";

import MotionReveal from "./MotionReveal";
import SectionHeading from "./SectionHeading";

const icons: Partial<Record<IconName, LucideIcon>> = {
  "bed-double": BedDouble,
  compass: Compass,
  route: Route,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  "wallet-cards": WalletCards,
};

export default function WhyUs() {
  return (
    <section className="scroll-mt-20 bg-[#101a35] py-20 text-white sm:py-28" id="why-us">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <SectionHeading
              description="A good trip is not a template. It is a series of considered choices made around the people taking it."
              eyebrow="Why Gamya Sanchari"
              inverse
              title="Planning that feels calm from the first conversation"
            />
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.17em] text-[#ffad7d]">
                Our way of working
              </p>
              <p className="mt-3 text-2xl font-extrabold">We listen first, then plan.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit, index) => {
              const Icon = icons[benefit.icon] ?? Sparkles;
              return (
                <MotionReveal
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 transition hover:bg-white/[0.1]"
                  delay={index * 0.04}
                  key={benefit.title}
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#f06619] text-white">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    {benefit.description}
                  </p>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { JourneyDay } from "@/types/travel";

export default function ItineraryAccordion({ days }: { days: readonly JourneyDay[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="grid gap-3">
      {days.map((day, index) => {
        const expanded = openIndex === index;
        const panelId = `itinerary-day-${index + 1}`;
        return <div className="overflow-hidden rounded-2xl border border-[#3f2a20]/10 bg-white" key={`${day.title}-${index}`}><h3><button aria-controls={panelId} aria-expanded={expanded} className="flex min-h-14 w-full items-center justify-between gap-4 p-5 text-left font-extrabold text-[#3f2a20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#a63d24]" onClick={() => setOpenIndex(expanded ? -1 : index)} type="button"><span>Day {index + 1} · {day.title}</span><ChevronDown aria-hidden="true" className={`shrink-0 transition ${expanded ? "rotate-180" : ""}`} /></button></h3>{expanded ? <div aria-labelledby={`${panelId}-trigger`} className="border-t border-[#3f2a20]/10 px-5 py-5 leading-7 text-[#6a594b]" id={panelId} role="region">{day.description}</div> : null}</div>;
      })}
    </div>
  );
}

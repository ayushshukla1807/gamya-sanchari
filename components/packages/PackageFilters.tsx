"use client";

import { useMemo, useState } from "react";

import PackageCard from "@/components/packages/PackageCard";
import { DESTINATIONS, EXPERIENCES } from "@/constants/travel";
import type { Journey, JourneyCategory } from "@/types/travel";

export interface PackageFilterState {
  scope: string;
  duration: string;
  experience: string;
  destination: string;
  category: string;
}

const EMPTY_FILTERS: PackageFilterState = { scope: "all", duration: "all", experience: "all", destination: "all", category: "all" };

const CATEGORY_OPTIONS: readonly {
  value: JourneyCategory;
  label: string;
}[] = [
  { value: "spiritual", label: "Spiritual" },
  { value: "group", label: "Group departures" },
  { value: "short-break", label: "Short breaks" },
  { value: "women-only", label: "Women-only" },
  { value: "leisure", label: "Leisure" },
  { value: "business", label: "Business" },
];

export default function PackageFilters({ journeys }: { journeys: readonly Journey[] }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const update = (key: keyof PackageFilterState, value: string) => setFilters((current) => ({ ...current, [key]: value }));
  const scopeFor = (journey: Journey) => DESTINATIONS.find(({ slug }) => slug === journey.destinationSlugs[0])?.scope;
  const daysFor = (journey: Journey) => Number.parseInt(journey.durationLabel, 10);
  const results = useMemo(() => journeys.filter((journey) => {
    const scopeMatches = filters.scope === "all" || scopeFor(journey) === filters.scope;
    const durationMatches = filters.duration === "all" || (filters.duration === "short" ? daysFor(journey) <= 5 : daysFor(journey) >= 6);
    const experienceMatches = filters.experience === "all" || (journey.experienceSlugs as readonly string[]).includes(filters.experience);
    const destinationMatches = filters.destination === "all" || (journey.destinationSlugs as readonly string[]).includes(filters.destination);
    const categoryMatches = filters.category === "all" || (journey.categorySlugs as readonly string[]).includes(filters.category);
    return scopeMatches && durationMatches && experienceMatches && destinationMatches && categoryMatches;
  }), [filters, journeys]);

  return (
    <div>
      <div className="rounded-[2rem] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-7">
        <div aria-label="Journey scope" className="flex flex-wrap gap-2">{[{ label: "All", value: "all" }, { label: "Domestic", value: "domestic" }, { label: "International", value: "international" }].map(({ label, value }) => <button aria-pressed={filters.scope === value} className="min-h-11 rounded-full border border-[#0b1633]/10 px-5 text-sm font-extrabold aria-pressed:bg-[#1844ef] aria-pressed:text-white" key={value} onClick={() => update("scope", value)} type="button">{label}</button>)}</div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-2 text-sm font-extrabold text-[#0b1633]">Duration<select className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3 font-medium" onChange={(event) => update("duration", event.target.value)} value={filters.duration}><option value="all">Any duration</option><option value="short">Up to 5 days</option><option value="long">6 days or more</option></select></label>
          <label className="grid gap-2 text-sm font-extrabold text-[#0b1633]">Experience<select className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3 font-medium" onChange={(event) => update("experience", event.target.value)} value={filters.experience}><option value="all">All experiences</option>{EXPERIENCES.map(({ slug, title }) => <option key={slug} value={slug}>{title}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-extrabold text-[#0b1633]">Destination<select className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3 font-medium" onChange={(event) => update("destination", event.target.value)} value={filters.destination}><option value="all">All destinations</option>{DESTINATIONS.map(({ slug, title }) => <option key={slug} value={slug}>{title}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-extrabold text-[#0b1633]">Category<select className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3 font-medium" onChange={(event) => update("category", event.target.value)} value={filters.category}><option value="all">All categories</option>{CATEGORY_OPTIONS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</select></label>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between"><p aria-live="polite" className="font-extrabold text-[#0b1633]">{results.length} sample {results.length === 1 ? "journey" : "journeys"} found</p>{results.length > 0 && filters !== EMPTY_FILTERS ? <button className="min-h-11 px-3 font-extrabold text-[#1844ef]" onClick={() => setFilters(EMPTY_FILTERS)} type="button">Reset filters</button> : null}</div>
      {results.length ? <div className="mt-7 grid gap-7 lg:grid-cols-2">{results.map((journey) => <PackageCard journey={journey} key={journey.slug} />)}</div> : <div className="mt-7 rounded-[2rem] border border-dashed border-[#0b1633]/20 bg-[#fffaf0] p-10 text-center"><h2 className="text-2xl font-extrabold text-[#0b1633]">No sample journeys match those choices</h2><p className="mt-3">Reset the filters or build a journey around exactly what matters to you.</p><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button className="min-h-12 rounded-full bg-[#1844ef] px-6 font-extrabold text-white" onClick={() => setFilters(EMPTY_FILTERS)} type="button">Reset filters</button><a className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f06619] px-6 font-extrabold text-white" href="/plan-my-trip/">Build My Trip</a></div></div>}
    </div>
  );
}

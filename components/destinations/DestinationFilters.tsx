"use client";

import { useMemo, useState } from "react";

import DestinationCard from "@/components/destinations/DestinationCard";
import type { DestinationDetail } from "@/types/travel";

export interface DestinationFilterState {
  scope: string;
  region: string;
  season: string;
  style: string;
}

const EMPTY_FILTERS: DestinationFilterState = {
  scope: "all",
  region: "all",
  season: "all",
  style: "all",
};

export default function DestinationFilters({ destinations }: { destinations: readonly DestinationDetail[] }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const regions = Array.from(new Set(destinations.map(({ region }) => region))).sort();
  const seasons = Array.from(new Set(destinations.flatMap(({ bestMonths }) => bestMonths))).sort();
  const styles = Array.from(new Set(destinations.flatMap(({ styleSlugs }) => styleSlugs))).sort();

  const results = useMemo(
    () =>
      destinations.filter((destination) => {
        const scopeMatches = filters.scope === "all" || destination.scope === filters.scope;
        const regionMatches = filters.region === "all" || destination.region === filters.region;
        const seasonMatches = filters.season === "all" || (destination.bestMonths as readonly string[]).includes(filters.season);
        const styleMatches = filters.style === "all" || (destination.styleSlugs as readonly string[]).includes(filters.style);
        return scopeMatches && regionMatches && seasonMatches && styleMatches;
      }),
    [destinations, filters],
  );

  const update = (key: keyof DestinationFilterState, value: string) =>
    setFilters((current) => ({ ...current, [key]: value }));

  return (
    <div>
      <div className="rounded-[2rem] border border-[#3f2a20]/10 bg-white p-5 shadow-[var(--shadow-soft)] sm:p-7">
        <div aria-label="Destination scope" className="flex flex-wrap gap-2">
          {[{ label: "All", value: "all" }, { label: "Karnataka & India", value: "domestic" }, { label: "Beyond India", value: "international" }].map(({ label, value }) => (
            <button aria-pressed={filters.scope === value} className="min-h-11 rounded-full border border-[#3f2a20]/10 px-5 text-sm font-extrabold text-[#3f2a20] transition hover:border-[#a63d24] aria-pressed:border-[#a63d24] aria-pressed:bg-[#a63d24] aria-pressed:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a63d24]" key={value} onClick={() => update("scope", value)} type="button">{label}</button>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-extrabold text-[#3f2a20]">Region<select className="min-h-12 rounded-xl border border-[#3f2a20]/15 bg-white px-3 font-medium" onChange={(event) => update("region", event.target.value)} value={filters.region}><option value="all">All regions</option>{regions.map((region) => <option key={region}>{region}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-extrabold text-[#3f2a20]">Season<select className="min-h-12 rounded-xl border border-[#3f2a20]/15 bg-white px-3 font-medium" onChange={(event) => update("season", event.target.value)} value={filters.season}><option value="all">Any season</option>{seasons.map((season) => <option key={season}>{season}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-extrabold text-[#3f2a20]">Travel style<select className="min-h-12 rounded-xl border border-[#3f2a20]/15 bg-white px-3 font-medium capitalize" onChange={(event) => update("style", event.target.value)} value={filters.style}><option value="all">All styles</option>{styles.map((style) => <option key={style} value={style}>{style}</option>)}</select></label>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p aria-live="polite" className="font-extrabold text-[#3f2a20]">{results.length} {results.length === 1 ? "destination" : "destinations"} found</p>
        {filters !== EMPTY_FILTERS && results.length > 0 ? <button className="min-h-11 rounded-full px-4 text-sm font-extrabold text-[#a63d24] underline-offset-4 hover:underline" onClick={() => setFilters(EMPTY_FILTERS)} type="button">Reset filters</button> : null}
      </div>

      {results.length ? (
        <div className="mt-7 grid gap-7 md:grid-cols-2 xl:grid-cols-3">{results.map((destination) => <DestinationCard destination={destination} key={destination.slug} />)}</div>
      ) : (
        <div className="mt-7 rounded-[2rem] border border-dashed border-[#3f2a20]/20 bg-[#fffaf0] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-extrabold text-[#3f2a20]">No destinations match that combination</h2>
          <p className="mx-auto mt-3 max-w-xl leading-7">Reset the filters or tell us what you have in mind and we will help shape the direction.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button className="min-h-12 rounded-full bg-[#a63d24] px-6 font-extrabold text-white" onClick={() => setFilters(EMPTY_FILTERS)} type="button">Reset filters</button><a className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f06619] px-6 font-extrabold text-white" href="/plan-my-trip/">Plan My Trip</a></div>
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { DESTINATIONS } from "@/constants/travel";

export default function PlannerPreview() {
  const [destination, setDestination] = useState("");
  const [party, setParty] = useState("");
  const [month, setMonth] = useState("");
  const href = useMemo(() => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (party) params.set("party", party);
    if (month.trim()) params.set("month", month.trim());
    const query = params.toString();
    return `/plan-my-trip/${query ? `?${query}` : ""}`;
  }, [destination, month, party]);

  return <section className="bg-[#fffaf0]"><div className="section-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"><div className="relative mx-auto min-h-80 w-full max-w-md"><Image alt="" className="object-contain object-bottom" fill sizes="(min-width: 1024px) 35vw, 80vw" src="/images/travel-host.webp" /></div><div><p className="eyebrow text-[#f06619]">Your host is ready</p><h2 className="mt-4 text-4xl font-extrabold text-[#0b1633] sm:text-6xl">Start with three simple choices</h2><p className="mt-5 max-w-2xl text-lg leading-8">No need to know every answer. Give us a direction and continue with the full planner when you are ready.</p><div className="mt-8 grid gap-4 rounded-[2rem] bg-white p-6 shadow-[var(--shadow-soft)] sm:grid-cols-3 sm:p-8"><label className="grid gap-2 text-sm font-extrabold text-[#0b1633]">Preview destination<select aria-label="Preview destination" className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3 font-medium" onChange={(event) => setDestination(event.target.value)} value={destination}><option value="">Help me choose</option>{DESTINATIONS.map(({ slug, title }) => <option key={slug} value={slug}>{title}</option>)}</select></label><label className="grid gap-2 text-sm font-extrabold text-[#0b1633]">Preview travel party<select aria-label="Preview travel party" className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3 font-medium" onChange={(event) => setParty(event.target.value)} value={party}><option value="">Who is going?</option><option>Solo</option><option>Couple</option><option>Family</option><option>Friends</option></select></label><label className="grid gap-2 text-sm font-extrabold text-[#0b1633]">Preview month<input aria-label="Preview month" className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3 font-medium" onChange={(event) => setMonth(event.target.value)} placeholder="Approximate month" value={month} /></label><a className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1844ef] px-6 font-extrabold text-white sm:col-span-3" href={href}>Continue to My Trip</a></div></div></div></section>;
}

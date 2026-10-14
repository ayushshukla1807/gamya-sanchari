"use client";

import { useEffect, useState } from "react";

import PlannerProgress from "@/components/planner/PlannerProgress";
import PlannerReview from "@/components/planner/PlannerReview";
import PlannerStep from "@/components/planner/PlannerStep";
import { DESTINATIONS } from "@/constants/travel";
import { buildPlannerSummary, EMPTY_PLANNER_DRAFT, normalizePlannerDraft, readPlannerContext } from "@/lib/planner";
import { getDestination, getJourney } from "@/lib/travel-content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { PlannerDraft } from "@/types/travel";

const STORAGE_KEY = "gamya-sanchari-planner";
const INTERESTS = ["culture", "nature", "food", "wellness", "adventure", "family time"];

export default function TripPlanner() {
  const [draft, setDraft] = useState<PlannerDraft>({ ...EMPTY_PLANNER_DRAFT });
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = normalizePlannerDraft(sessionStorage.getItem(STORAGE_KEY));
    const context = readPlannerContext(new URLSearchParams(window.location.search));
    setDraft(normalizePlannerDraft({ ...stored, ...context }));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft, hydrated]);

  const setField = <K extends keyof PlannerDraft>(key: K, value: PlannerDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const focus = (id: string) => document.getElementById(id)?.focus();

  const validate = () => {
    if (step === 0 && !draft.destinationSlug && !draft.scope) return ["Choose a destination or tell us the direction you prefer.", "destination"] as const;
    if (step === 1 && !draft.partyType) return ["Choose who is travelling.", "party-type"] as const;
    if (step === 2 && (!draft.travelMonth || !draft.duration)) return ["Add an approximate month and duration.", !draft.travelMonth ? "travel-month" : "duration"] as const;
    if (step === 3 && (!draft.interests.length || !draft.pace || !draft.accommodation)) return ["Choose at least one interest, a pace and a stay preference.", !draft.interests.length ? "interest-culture" : !draft.pace ? "pace" : "accommodation"] as const;
    if (step === 4 && (!draft.name || !draft.phone)) return ["Add your name and phone number.", !draft.name ? "planner-name" : "planner-phone"] as const;
    return null;
  };

  const next = () => {
    const problem = validate();
    if (problem) {
      setError(problem[0]);
      focus(problem[1]);
      return;
    }
    setError("");
    setStep((current) => Math.min(5, current + 1));
  };

  const submit = () => {
    const url = buildWhatsAppUrl({ name: draft.name, phone: draft.phone, email: draft.email, context: "Personalized trip planner", message: buildPlannerSummary(draft) });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const stepContent = [
    <PlannerStep description="Choose a place, or leave the destination open and begin with a broad direction." key="where" title="Where would you like to go?">
      <label className="grid gap-2 font-extrabold text-[#0b1633]">Destination<select className="min-h-12 rounded-xl border border-[#0b1633]/15 bg-white px-3 font-medium" id="destination" onChange={(event) => { const destination = getDestination(event.target.value); setDraft((current) => { const journeyDestinations = getJourney(current.journeySlug)?.destinationSlugs as readonly string[] | undefined; return { ...current, destinationSlug: destination?.slug ?? "", journeySlug: destination && journeyDestinations?.includes(destination.slug) ? current.journeySlug : "", scope: destination?.scope ?? current.scope }; }); setError(""); }} value={draft.destinationSlug}><option value="">Help me choose a destination</option>{DESTINATIONS.map(({ slug, title }) => <option key={slug} value={slug}>{title}</option>)}</select></label>
      <label className="grid gap-2 font-extrabold text-[#0b1633]">Trip scope<select className="min-h-12 rounded-xl border border-[#0b1633]/15 bg-white px-3 font-medium" onChange={(event) => setField("scope", event.target.value as PlannerDraft["scope"])} value={draft.scope}><option value="">Choose a direction</option><option value="domestic">Domestic</option><option value="international">International</option><option value="help-me-choose">Help me choose</option></select></label>
    </PlannerStep>,
    <PlannerStep description="A few practical details help us suggest the right pace, stays and transfers." key="who" title="Who is travelling?">
      <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 font-extrabold text-[#0b1633]">Adults<input className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3" max={20} min={1} onChange={(event) => setField("adults", Number(event.target.value))} type="number" value={draft.adults} /></label><label className="grid gap-2 font-extrabold text-[#0b1633]">Children<input className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3" max={20} min={0} onChange={(event) => setField("children", Number(event.target.value))} type="number" value={draft.children} /></label></div>
      <label className="grid gap-2 font-extrabold text-[#0b1633]">Travel party<select className="min-h-12 rounded-xl border border-[#0b1633]/15 bg-white px-3 font-medium" id="party-type" onChange={(event) => setField("partyType", event.target.value)} value={draft.partyType}><option value="">Choose one</option><option>Solo</option><option>Couple</option><option>Family</option><option>Friends</option><option>Multi-generational family</option></select></label>
    </PlannerStep>,
    <PlannerStep description="Approximate is absolutely fine. Flexibility often creates better options." key="when" title="When are you thinking?">
      <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 font-extrabold text-[#0b1633]">Approximate month<input className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3" id="travel-month" onChange={(event) => setField("travelMonth", event.target.value)} placeholder="For example, September" value={draft.travelMonth} /></label><label className="grid gap-2 font-extrabold text-[#0b1633]">Duration<input className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3" id="duration" onChange={(event) => setField("duration", event.target.value)} placeholder="For example, 6 days" value={draft.duration} /></label></div>
      <label className="flex min-h-11 items-center gap-3 font-bold text-[#0b1633]"><input checked={draft.flexibleDates} className="size-5" onChange={(event) => setField("flexibleDates", event.target.checked)} type="checkbox" />My dates are flexible</label>
    </PlannerStep>,
    <PlannerStep description="Tell us what should shape the itinerary—not just what fits on a checklist." key="matters" title="What matters most?">
      <fieldset><legend className="font-extrabold text-[#0b1633]">Interests</legend><div className="mt-3 flex flex-wrap gap-2">{INTERESTS.map((interest) => <label className="cursor-pointer" key={interest}><input checked={draft.interests.includes(interest)} className="peer sr-only" id={`interest-${interest.split(" ")[0]}`} onChange={(event) => setField("interests", event.target.checked ? [...draft.interests, interest] : draft.interests.filter((item) => item !== interest))} type="checkbox" /><span className="inline-flex min-h-11 items-center rounded-full border border-[#0b1633]/15 bg-white px-4 font-bold capitalize peer-checked:border-[#1844ef] peer-checked:bg-[#1844ef] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">{interest}</span></label>)}</div></fieldset>
      <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 font-extrabold text-[#0b1633]">Pace<select className="min-h-12 rounded-xl border border-[#0b1633]/15 bg-white px-3 font-medium" id="pace" onChange={(event) => setField("pace", event.target.value as PlannerDraft["pace"])} value={draft.pace}><option value="">Choose a pace</option><option value="relaxed">Relaxed</option><option value="balanced">Balanced</option><option value="full">Full days</option></select></label><label className="grid gap-2 font-extrabold text-[#0b1633]">Accommodation<select className="min-h-12 rounded-xl border border-[#0b1633]/15 bg-white px-3 font-medium" id="accommodation" onChange={(event) => setField("accommodation", event.target.value)} value={draft.accommodation}><option value="">Choose a preference</option><option>Smart and practical</option><option>Boutique comfort</option><option>Premium stays</option><option>Open to guidance</option></select></label></div>
      <label className="grid gap-2 font-extrabold text-[#0b1633]">Budget comfort (optional)<select className="min-h-12 rounded-xl border border-[#0b1633]/15 bg-white px-3 font-medium" onChange={(event) => setField("budget", event.target.value)} value={draft.budget}><option value="">Prefer not to say yet</option><option>Value-conscious</option><option>Comfort</option><option>Premium</option></select></label>
    </PlannerStep>,
    <PlannerStep description="We use these details only to prepare the WhatsApp conversation you choose to start." key="contact" title="How should we reach you?">
      <label className="grid gap-2 font-extrabold text-[#0b1633]">Name<input autoComplete="name" className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3" id="planner-name" onChange={(event) => setField("name", event.target.value)} value={draft.name} /></label>
      <label className="grid gap-2 font-extrabold text-[#0b1633]">Phone<input autoComplete="tel" className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3" id="planner-phone" inputMode="tel" onChange={(event) => setField("phone", event.target.value)} value={draft.phone} /></label>
      <label className="grid gap-2 font-extrabold text-[#0b1633]">Email (optional)<input autoComplete="email" className="min-h-12 rounded-xl border border-[#0b1633]/15 px-3" onChange={(event) => setField("email", event.target.value)} type="email" value={draft.email} /></label>
      <label className="grid gap-2 font-extrabold text-[#0b1633]">Anything else? (optional)<textarea className="min-h-28 rounded-xl border border-[#0b1633]/15 p-3" onChange={(event) => setField("notes", event.target.value)} value={draft.notes} /></label>
    </PlannerStep>,
    <PlannerStep description="Review everything before you choose to continue. You can edit any section." key="review" title="Your journey brief"><PlannerReview draft={draft} onEdit={setStep} /><p className="rounded-xl bg-[#fffaf0] p-4 text-sm leading-6 text-[#566073]">Nothing is sent or stored by this website. Continue in WhatsApp only when you are ready.</p></PlannerStep>,
  ];

  return <div className="rounded-[2rem] border border-[#0b1633]/10 bg-white p-5 shadow-[var(--shadow-soft)] sm:p-9"><PlannerProgress step={step} /><form className="mt-9" onSubmit={(event) => event.preventDefault()}>{stepContent[step]}{error ? <p aria-live="assertive" className="mt-6 rounded-xl bg-red-50 p-4 font-bold text-red-700">{error}</p> : null}<div className="mt-9 flex flex-col-reverse gap-3 border-t border-[#0b1633]/10 pt-6 sm:flex-row sm:justify-between">{step > 0 ? <button className="min-h-12 rounded-full border border-[#0b1633]/15 px-6 font-extrabold text-[#0b1633]" onClick={() => { setError(""); setStep((current) => current - 1); }} type="button">Back</button> : <span />}{step < 5 ? <button className="min-h-12 rounded-full bg-[#1844ef] px-7 font-extrabold text-white" onClick={next} type="button">Continue</button> : <button className="min-h-12 rounded-full bg-[#25d366] px-7 font-extrabold text-white" onClick={submit} type="button">Continue in WhatsApp</button>}</div></form><noscript><div className="mt-8 rounded-xl bg-[#fffaf0] p-5"><h2 className="font-extrabold text-[#0b1633]">Plan your trip without JavaScript</h2><p className="mt-2 leading-7">Share your destination, travellers, dates, interests, pace, stay preference and contact details directly in WhatsApp.</p><a className="mt-4 inline-flex min-h-11 items-center font-extrabold text-[#1844ef]" href="https://wa.me/918073254766">Open WhatsApp</a></div></noscript></div>;
}

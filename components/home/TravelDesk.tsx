import MotionReveal from "@/components/MotionReveal";
import KineticText from "@/components/motion/KineticText";
import { BRAND } from "@/constants/brand";
import { TRAVEL_DESK_NOTES } from "@/constants/travel";

export default function TravelDesk() {
  return (
    <section className="section-atmosphere bg-white" data-material="premium-section">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div><p className="eyebrow text-[#f06619]">Useful before you book</p><KineticText as="h2" className="mt-4 text-4xl font-extrabold text-[#3f2a20] sm:text-6xl" text="At the travel desk" /></div>
          <div><p className="text-lg leading-8 text-[#6a594b]">Practical notes from the planning conversation—made for the web, while active campaigns and real trip moments continue on Instagram.</p><a className="mt-5 inline-flex min-h-11 items-center font-extrabold text-[#a63d24]" href={BRAND.instagram} rel="noreferrer" target="_blank">Active campaigns and trip moments →</a></div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">{TRAVEL_DESK_NOTES.map((note, index) => <MotionReveal delay={index * 0.06} direction={index % 2 === 0 ? "left" : "right"} hoverLift key={note.title}><a className="premium-card block rounded-[1.5rem] bg-[#fffaf0] p-7" data-material="premium-card" href={note.href}><h3 className="text-xl font-extrabold text-[#3f2a20]">{note.title}</h3><p className="mt-3 leading-7 text-[#6a594b]">{note.summary}</p><span className="mt-5 inline-flex font-extrabold text-[#a63d24]">Read the note →</span></a></MotionReveal>)}</div>
      </div>
    </section>
  );
}

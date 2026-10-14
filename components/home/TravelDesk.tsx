import MotionReveal from "@/components/MotionReveal";
import { BRAND } from "@/constants/brand";
import { TRAVEL_DESK_NOTES } from "@/constants/travel";

export default function TravelDesk() {
  return (
    <section className="bg-white">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div><p className="eyebrow text-[#f06619]">Useful before you book</p><h2 className="mt-4 text-4xl font-extrabold text-[#0b1633] sm:text-6xl">At the travel desk</h2></div>
          <div><p className="text-lg leading-8 text-[#566073]">Practical notes from the planning conversation—made for the web, while active campaigns and real trip moments continue on Instagram.</p><a className="mt-5 inline-flex min-h-11 items-center font-extrabold text-[#1844ef]" href={BRAND.instagram} rel="noreferrer" target="_blank">Active campaigns and trip moments →</a></div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">{TRAVEL_DESK_NOTES.map((note, index) => <MotionReveal delay={index * 0.06} direction={index % 2 === 0 ? "left" : "right"} hoverLift key={note.title}><a className="block rounded-[1.5rem] border border-[#0b1633]/10 bg-[#fffaf0] p-7 transition hover:border-[#f06619]/50" href={note.href}><h3 className="text-xl font-extrabold text-[#0b1633]">{note.title}</h3><p className="mt-3 leading-7 text-[#566073]">{note.summary}</p><span className="mt-5 inline-flex font-extrabold text-[#1844ef]">Read the note →</span></a></MotionReveal>)}</div>
      </div>
    </section>
  );
}

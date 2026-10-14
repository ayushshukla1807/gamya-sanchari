import ExperiencePortal from "@/components/experiences/ExperiencePortal";
import { EXPERIENCES } from "@/constants/travel";

export default function ExperienceShowcase() {
  return <section className="bg-[#eaf0f6]"><div className="section-shell"><div className="max-w-3xl"><p className="eyebrow text-[#1844ef]">Travel by feeling</p><h2 className="mt-4 text-4xl font-extrabold text-[#0b1633] sm:text-6xl">Travel by feeling</h2><p className="mt-5 text-lg leading-8">The same destination can become a completely different journey depending on who is travelling and what they need from it.</p></div><div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{EXPERIENCES.map((experience, index) => <ExperiencePortal experience={experience} index={index} key={experience.slug} />)}</div></div></section>;
}

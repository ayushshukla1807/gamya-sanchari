import type { Experience } from "@/types/travel";

export default function ExperiencePortal({ experience, index }: { experience: Experience; index: number }) {
  return (
    <article className={`relative overflow-hidden rounded-[2rem] p-7 sm:p-9 ${index % 3 === 0 ? "bg-[#27372c] text-white" : index % 3 === 1 ? "bg-[#fffaf0] text-[#3f2a20]" : "bg-[#a63d24] text-white"}`}>
      <span aria-hidden="true" className="absolute right-5 top-2 text-7xl font-extrabold opacity-10">0{index + 1}</span>
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] opacity-65">Travel by feeling</p>
      <h2 className="mt-4 text-3xl font-extrabold">{experience.title}</h2>
      <p className="mt-4 leading-7 opacity-80">{experience.summary}</p>
      <dl className="mt-7 grid gap-4 border-t border-current/15 pt-6 text-sm leading-6"><div><dt className="font-extrabold">Best fit</dt><dd className="mt-1 opacity-75">{experience.fit}</dd></div><div><dt className="font-extrabold">A better pace</dt><dd className="mt-1 opacity-75">{experience.pacing}</dd></div></dl>
      <a className="mt-7 inline-flex min-h-11 items-center rounded-full bg-white px-5 font-extrabold text-[#3f2a20]" href={`/plan-my-trip/?experience=${experience.slug}`}>Plan this experience →</a>
    </article>
  );
}

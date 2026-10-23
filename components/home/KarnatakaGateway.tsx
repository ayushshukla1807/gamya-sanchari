import Image from "next/image";

import MotionReveal from "@/components/MotionReveal";
import KineticText from "@/components/motion/KineticText";

const LOCAL_CONFIDENCE = [
  [
    "Hampi, unhurried",
    "Temple complexes, river landscapes and boulder-country light paced across meaningful days—not compressed into a checklist.",
  ],
  [
    "Bengaluru arrivals",
    "A Karnataka-based travel desk connects your arrival, private transfers, stays and onward route from one familiar point of contact.",
  ],
  [
    "Beyond the icons",
    "Pair Hampi with Mysuru, Coorg, the Western Ghats or Karnataka's heritage towns around your interests and available time.",
  ],
] as const;

export default function KarnatakaGateway() {
  return (
    <section
      className="section-atmosphere bg-[#fff8ec]"
      data-material="premium-section"
      id="karnataka"
    >
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <MotionReveal direction="left">
            <p className="eyebrow text-[#a63d24]">
              Local knowledge, thoughtfully translated
            </p>
            <KineticText
              as="h2"
              className="mt-4 max-w-4xl text-4xl font-extrabold text-[#3f2a20] sm:text-6xl"
              text="Karnataka is your first chapter"
            />
          </MotionReveal>
          <MotionReveal direction="right">
            <p className="max-w-2xl text-lg leading-8 text-[#6a594b]">
              From our Bengaluru base, we help international travellers enter
              India with context, calm logistics and enough time to feel each
              place—not simply pass through it.
            </p>
          </MotionReveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <MotionReveal direction="scale">
            <a
              className="premium-card group relative block min-h-[34rem] overflow-hidden rounded-[2.25rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3f2a20]"
              data-material="premium-card"
              href="/destinations/hampi/"
            >
              <Image
                alt="Stone Chariot at Hampi's Vittala Temple in warm sunrise light"
                className="object-cover transition duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                fill
                sizes="(min-width: 1024px) 62vw, 100vw"
                src="/images/destinations/hampi.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#27372c]/95 via-[#27372c]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                <p className="eyebrow text-[#f4c56a]">Karnataka · UNESCO heritage</p>
                <h3 className="mt-3 text-4xl font-extrabold sm:text-5xl">Hampi</h3>
                <p className="mt-3 max-w-xl text-base leading-7 text-white/80">
                  Stone stories, open skies and a landscape unlike anywhere else
                  in India.
                </p>
                <span className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#a63d24] px-5 font-extrabold text-white">
                  Explore Hampi →
                </span>
              </div>
            </a>
          </MotionReveal>

          <div className="grid gap-4">
            {LOCAL_CONFIDENCE.map(([title, description], index) => (
              <MotionReveal delay={index * 0.06} direction="right" key={title}>
                <article
                  className="premium-card h-full rounded-[1.75rem] bg-white p-6 sm:p-7"
                  data-material="premium-card"
                >
                  <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#a63d24]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 text-2xl font-extrabold text-[#3f2a20]">
                    {title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#6a594b]">{description}</p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

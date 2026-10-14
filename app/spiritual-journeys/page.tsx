import JourneyCollection from "@/components/journeys/JourneyCollection";
import EditorialHero from "@/components/ui/EditorialHero";
import { getJourneysByCategory } from "@/lib/travel-content";

const FAQS = [
  { question: "What physical demands should we expect?", answer: "We explain likely walking, climbs, altitude and transfer length before you commit, then help you judge whether the pace suits your group." },
  { question: "Which documents should we carry?", answer: "Requirements vary by route and traveller. We share a current preparation checklist, while you remain responsible for valid identity, permits and medical documents." },
  { question: "How does weather affect a yatra?", answer: "Mountain weather and local conditions can change quickly. Routes, access and timing may be adjusted for safety and official guidance." },
  { question: "Is darshan confirmed?", answer: "Darshan timing and access depend on temple authorities, local conditions and queues; darshan cannot be guaranteed by a travel organiser." },
] as const;

export default function SpiritualJourneysPage() {
  const journeys = getJourneysByCategory("spiritual");

  return (
    <main>
      <EditorialHero
        eyebrow="Travel with devotion"
        title="Spiritual journeys, supported with care"
        summary="Pilgrimage planning that respects the purpose of the journey while staying honest about access, conditions and physical demands. ನಿಮ್ಮ ಪ್ರಯಾಣಕ್ಕೆ ನಮ್ಮ ಜೊತೆ — thoughtful support in Kannada and English."
        primary={{ href: "/contact/", label: "Speak to a yatra planner" }}
        secondary={{ href: "/packages/", label: "Browse all journeys" }}
      />
      <section className="section-shell">
        <p className="eyebrow text-[#f06619]">Audited journey history</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-extrabold text-[#0b1633] sm:text-6xl">Routes we understand, dates we verify</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#566073]">Previous departures show experience, not current availability. Ask us to confirm the next supported date for your people.</p>
        <div className="mt-10"><JourneyCollection headingLevel={2} journeys={journeys} /></div>
      </section>
      <section className="bg-[#fff5e7]"><div className="section-shell">
        <p className="eyebrow text-[#f06619]">Prepared, not pressured</p>
        <h2 className="mt-4 text-4xl font-extrabold text-[#0b1633] sm:text-5xl">How we support your yatra</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {["Route and rest rhythm", "Stay and transport coordination", "Practical pre-travel guidance"].map((item) => <div className="rounded-[1.5rem] bg-white p-6 font-extrabold text-[#0b1633] shadow-sm" key={item}>{item}</div>)}
        </div>
        <div className="mt-10 grid gap-4">{FAQS.map((faq) => <details className="rounded-2xl border border-[#0b1633]/10 bg-white p-5" key={faq.question}><summary className="cursor-pointer font-extrabold text-[#0b1633]">{faq.question}</summary><p className="mt-3 max-w-3xl leading-7 text-[#566073]">{faq.answer}</p></details>)}</div>
      </div></section>
    </main>
  );
}

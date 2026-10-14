import JourneyCollection from "@/components/journeys/JourneyCollection";
import EditorialHero from "@/components/ui/EditorialHero";
import { getJourneysByCategory } from "@/lib/travel-content";

const SUPPORT = [
  ["Transport", "Coordinated movement shaped around the route and group."],
  ["Stays", "Practical accommodation options matched to the journey."],
  ["Applicable meals", "Clear meal inclusions where a departure supports them."],
  ["Sightseeing", "A realistic sequence with enough time for the people travelling."],
  ["Local coordination", "On-ground connections for the details between stops."],
  ["Tour-manager or guide support", "Human support when the confirmed departure includes it."],
] as const;

export default function GroupDeparturesPage() {
  const journeys = getJourneysByCategory("group");

  return (
    <main>
      <EditorialHero
        eyebrow="Go together, travel thoughtfully"
        title="Group departures with the details connected"
        summary="Explore routes we have promoted or supported, then ask us to verify the next date, operating format and inclusions before you book."
        primary={{ href: "/contact/", label: "Talk to our travel desk" }}
        secondary={{ href: "/plan-my-trip/", label: "Plan a private group" }}
      />
      <section className="section-shell pb-0">
        <h2 className="text-3xl font-extrabold text-[#0b1633]">Understand availability at a glance</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Enquire now", "A flexible journey we can shape around your group."],
            ["Next departure on request", "Ask us to confirm a newly verified date and operating plan."],
            ["Previous departure", "Proof of an earlier campaign, not a promise that old dates or prices remain open."],
          ].map(([title, copy]) => <div className="rounded-[1.5rem] bg-[#081329] p-6 text-white" key={title}><p className="font-extrabold text-[#f5ad56]">{title}</p><p className="mt-2 text-sm leading-6 text-white/70">{copy}</p></div>)}
        </div>
      </section>
      <section aria-labelledby="coordination-heading" className="bg-[#fff5e7]" role="region"><div className="section-shell">
        <h2 className="text-4xl font-extrabold text-[#0b1633]" id="coordination-heading">What coordination can include</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{SUPPORT.map(([title, copy]) => <article className="rounded-[1.5rem] bg-white p-6 shadow-sm" key={title}><h3 className="text-xl font-extrabold text-[#0b1633]">{title}</h3><p className="mt-2 leading-7 text-[#566073]">{copy}</p></article>)}</div>
      </div></section>
      <section className="section-shell">
        <p className="eyebrow text-[#1844ef]">Travel together</p>
        <h2 className="mt-4 text-4xl font-extrabold text-[#0b1633] sm:text-6xl">Group-capable journeys</h2>
        <div className="mt-10"><JourneyCollection headingLevel={2} journeys={journeys} /></div>
        <a className="mt-10 inline-flex min-h-12 items-center rounded-full border border-[#0b1633]/15 px-6 font-extrabold text-[#1844ef]" href="/contact/">Talk to our travel desk</a>
      </section>
    </main>
  );
}

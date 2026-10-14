import { TRAVEL_INTENTS } from "@/constants/travel";

export default function TravelIntentSelector() {
  return (
    <section className="bg-[#fffaf0]">
      <div className="section-shell">
        <p className="eyebrow text-[#f06619]">Begin with your reason to travel</p>
        <h2 className="mt-4 max-w-4xl text-4xl font-extrabold text-[#0b1633] sm:text-6xl">What kind of journey are you looking for?</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#566073]">Choose the feeling or format first. We will help connect the right route, pace and support.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {TRAVEL_INTENTS.map((intent, index) => (
            <a className="group rounded-[1.75rem] border border-[#0b1633]/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#1844ef]/30 hover:shadow-xl" href={intent.href} key={intent.slug}>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f06619]">0{index + 1}</span>
              <h3 className="mt-5 text-2xl font-extrabold text-[#0b1633]">{intent.title}</h3>
              <p className="mt-3 leading-7 text-[#566073]">{intent.summary}</p>
              <span className="mt-6 inline-flex font-extrabold text-[#1844ef]">Explore →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

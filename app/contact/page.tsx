import type { Metadata } from "next";

import ContactOptions from "@/components/contact/ContactOptions";
import { RequestCallForm } from "@/components/enquiry/RequestCallForm";
import EditorialHero from "@/components/ui/EditorialHero";

export const metadata: Metadata = {
  title: "Contact Our Travel Planners | Gamya Sanchari",
  description: "Call, email or message Gamya Sanchari to begin planning a personalized journey.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <main>
      <EditorialHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="A real conversation starts here"
        primary={{ href: "/plan-my-trip/", label: "Plan My Trip" }}
        summary="Tell us what you are imagining—or simply where you are stuck. We will help you find a practical next step."
        title="Let’s plan something worth remembering"
      />
      <section className="section-shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="eyebrow text-[#f06619]">Choose your channel</p>
          <h2 className="mt-4 text-3xl font-extrabold text-[#0b1633] sm:text-5xl">Reach us in the way that feels easiest</h2>
          <div className="mt-8"><ContactOptions /></div>
        </div>
        <aside className="rounded-[2rem] bg-[#081329] p-7 text-white sm:p-9">
          <p className="eyebrow text-[#f5ad56]">Prefer a callback?</p>
          <h2 className="mt-4 text-3xl font-extrabold">Send the number through WhatsApp</h2>
          <p className="mt-4 leading-7 text-white/70">This opens WhatsApp with a prepared callback message. Nothing is submitted to or stored on this website.</p>
          <div className="mt-7"><RequestCallForm /></div>
        </aside>
      </section>
    </main>
  );
}

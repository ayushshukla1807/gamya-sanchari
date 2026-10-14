import type { Metadata } from "next";

import ArticleCard from "@/components/journal/ArticleCard";
import EditorialHero from "@/components/ui/EditorialHero";
import { JOURNAL_ARTICLES } from "@/constants/travel";

export const metadata: Metadata = {
  title: "Travel Journal | Gamya Sanchari",
  description: "Evergreen, practical guides for planning better-paced journeys in India and beyond.",
  alternates: { canonical: "/journal/" },
};

export default function JournalPage() {
  return (
    <main>
      <EditorialHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
        eyebrow="Field notes for thoughtful travellers"
        primary={{ href: "/plan-my-trip/", label: "Plan My Trip" }}
        secondary={{ href: "/destinations/", label: "Explore Destinations" }}
        summary="Practical guidance for choosing a route, finding the right pace and making more room for the moments that matter."
        title="Travel notes for better journeys"
      />
      <section className="section-shell">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {JOURNAL_ARTICLES.map((article) => <ArticleCard article={article} key={article.slug} />)}
        </div>
      </section>
    </main>
  );
}

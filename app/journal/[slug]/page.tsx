import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaGroup from "@/components/ui/CtaGroup";
import Stamp from "@/components/ui/Stamp";
import { JOURNAL_ARTICLES } from "@/constants/travel";
import { getArticle, getDestination } from "@/lib/travel-content";

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) return { title: "Guide not found | Gamya Sanchari" };
  return {
    title: `${article.title} | Gamya Sanchari`,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}/` },
    openGraph: { title: article.title, description: article.excerpt, images: [{ url: article.image }] },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const destinations = article.relatedDestinationSlugs
    .map((slug) => getDestination(slug))
    .filter((destination): destination is NonNullable<typeof destination> => Boolean(destination));
  const primaryDestination = destinations[0];

  return (
    <main>
      <article>
        <header className="relative isolate overflow-hidden bg-[#081329] pb-16 pt-32 text-white sm:pb-24 sm:pt-40">
          <Image alt={article.alt} className="-z-20 object-cover opacity-45" fill priority sizes="100vw" src={article.image} />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#081329] via-[#081329]/90 to-[#081329]/45" />
          <div className="mx-auto grid max-w-[1000px] gap-7 px-5 sm:px-8">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/journal/" }, { label: article.title }]} />
            <Stamp>{article.readingTime}</Stamp>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.04] sm:text-6xl">{article.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-white/75">{article.excerpt}</p>
          </div>
        </header>
        <div className="mx-auto grid max-w-[820px] gap-10 px-5 py-20 sm:px-8 sm:py-28">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-3xl font-extrabold text-[#0b1633]">{section.heading}</h2>
              <div className="mt-5 grid gap-5 text-lg leading-8 text-[#566073]">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
      </article>

      {primaryDestination ? (
        <section className="bg-[#eaf0f6]">
          <div className="section-shell grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-[#1844ef]">Continue exploring</p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0b1633] sm:text-5xl">Take the next step with {primaryDestination.title}</h2>
            </div>
            <CtaGroup
              primary={{ href: `/plan-my-trip/?destination=${primaryDestination.slug}`, label: `Plan a ${primaryDestination.title} Trip` }}
              secondary={{ href: `/destinations/${primaryDestination.slug}/`, label: `Explore ${primaryDestination.title}` }}
            />
          </div>
        </section>
      ) : null}
    </main>
  );
}

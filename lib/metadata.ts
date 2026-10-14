import type { Metadata } from "next";

import { BRAND } from "@/constants/brand";
import { DESTINATIONS, JOURNAL_ARTICLES, JOURNEYS } from "@/constants/travel";

export interface PublishedPage {
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly image?: string;
  readonly changeFrequency?: "weekly" | "monthly" | "yearly";
  readonly priority?: number;
}

export const SITE_DESCRIPTION =
  "Personalized domestic and international travel planning from Bengaluru, shaped around your people, pace and priorities.";

const STATIC_PAGES: readonly PublishedPage[] = [
  { path: "/", title: "Gamya Sanchari | Your Journey Awaits", description: SITE_DESCRIPTION, image: "/images/og-image.jpg", priority: 1 },
  { path: "/destinations/", title: "Thoughtful Travel Destinations | Gamya Sanchari", description: "Explore domestic and international destinations by region, season and travel style, then shape one around your pace.", priority: 0.9 },
  { path: "/spiritual-journeys/", title: "Supported Spiritual Journeys & Yatras | Gamya Sanchari", description: "Explore spiritual journeys and pilgrimage routes with responsible pacing, practical yatra preparation and current departure verification.", priority: 0.9 },
  { path: "/group-departures/", title: "Supported Group Departures | Gamya Sanchari", description: "Explore group departure routes with coordinated transport, stays, applicable inclusions and honest, request-based availability.", priority: 0.9 },
  { path: "/packages/", title: "Customizable Sample Journeys | Gamya Sanchari", description: "Browse flexible sample journeys across India and abroad, designed as thoughtful starting points rather than fixed packages.", priority: 0.9 },
  { path: "/experiences/", title: "Travel Experiences for Every Rhythm | Gamya Sanchari", description: "Find family, honeymoon, cultural, adventure, wellness and reflective journeys by the feeling and pace they need.", priority: 0.8 },
  { path: "/plan-my-trip/", title: "Plan Your Personalized Trip | Gamya Sanchari", description: "Build a private travel brief in six calm steps, then choose whether to continue the conversation in WhatsApp.", priority: 0.95 },
  { path: "/about/", title: "About Our Human Travel Planning | Gamya Sanchari", description: "Meet the Bengaluru travel planners and the Listen, Shape, Refine and Support method behind every personalized journey.", priority: 0.7 },
  { path: "/contact/", title: "Contact Gamya Sanchari Travel Planners", description: "Call, email, Instagram or WhatsApp our Bengaluru travel planners and choose the easiest way to begin your journey.", priority: 0.7 },
  { path: "/journal/", title: "Practical Travel Journal | Gamya Sanchari", description: "Read evergreen, practical guides for choosing routes, finding a comfortable pace and planning more thoughtful journeys.", priority: 0.7 },
];

export function getPublishedPages(): readonly PublishedPage[] {
  return [
    ...STATIC_PAGES,
    ...DESTINATIONS.map((destination) => ({ path: `/destinations/${destination.slug}/`, title: `${destination.title} Personalized Travel Planning | Gamya Sanchari`, description: destination.summary, image: destination.image, priority: 0.8 as const })),
    ...JOURNEYS.map((journey) => ({ path: `/packages/${journey.slug}/`, title: `${journey.title} Sample Journey | Gamya Sanchari`, description: journey.summary, image: journey.heroImage, priority: 0.75 as const })),
    ...JOURNAL_ARTICLES.map((article) => ({ path: `/journal/${article.slug}/`, title: `${article.title} | Gamya Sanchari Journal`, description: article.excerpt, image: article.image, priority: 0.6 as const })),
  ];
}

export function buildPageMetadata(page: PublishedPage): Metadata {
  const canonical = `${BRAND.siteUrl}${page.path === "/" ? "/" : page.path}`;
  const image = page.image ?? "/images/og-image.jpg";
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    openGraph: { type: "website", locale: "en_IN", siteName: BRAND.name, title: page.title, description: page.description, url: canonical, images: [{ url: `${BRAND.siteUrl}${image}` }] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [`${BRAND.siteUrl}${image}`] },
  };
}

export function metadataForPath(path: string): Metadata {
  const page = getPublishedPages().find((candidate) => candidate.path === path);
  if (!page) throw new Error(`No published metadata for ${path}`);
  return buildPageMetadata(page);
}

export function buildBreadcrumbSchema(items: readonly { readonly name: string; readonly path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${BRAND.siteUrl}${item.path}` })),
  } as const;
}

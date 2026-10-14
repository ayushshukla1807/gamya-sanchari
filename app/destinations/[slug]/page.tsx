import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DestinationDetail from "@/components/destinations/DestinationDetail";
import { DESTINATIONS } from "@/constants/travel";
import { getDestination, getRelatedJourneys } from "@/lib/travel-content";

export function generateStaticParams() {
  return DESTINATIONS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const destination = getDestination(params.slug);
  if (!destination) return { title: "Destination not found | Gamya Sanchari" };
  return {
    title: `${destination.title} Travel Planning | Gamya Sanchari`,
    description: destination.summary,
    alternates: { canonical: `/destinations/${destination.slug}/` },
    openGraph: { title: `${destination.title} | Gamya Sanchari`, description: destination.summary, images: [{ url: destination.image }] },
  };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = getDestination(params.slug);
  if (!destination) notFound();
  return <DestinationDetail destination={destination} relatedJourneys={getRelatedJourneys(destination.slug)} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DestinationDetail from "@/components/destinations/DestinationDetail";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { DESTINATIONS } from "@/constants/travel";
import { getDestination, getRelatedJourneys } from "@/lib/travel-content";
import { metadataForPath } from "@/lib/metadata";

export function generateStaticParams() {
  return DESTINATIONS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const destination = getDestination(params.slug);
  if (!destination) return { title: "Destination not found | Gamya Sanchari" };
  return metadataForPath(`/destinations/${destination.slug}/`);
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = getDestination(params.slug);
  if (!destination) notFound();
  return <><DestinationDetail destination={destination} relatedJourneys={getRelatedJourneys(destination.slug)} /><BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations/" }, { name: destination.title, path: `/destinations/${destination.slug}/` }]} /></>;
}

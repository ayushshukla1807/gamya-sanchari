import type { Metadata } from "next";

import { BRAND } from "@/constants/brand";
import { metadataForPath, SITE_DESCRIPTION } from "@/lib/metadata";

const description = SITE_DESCRIPTION;
const homeMetadata = metadataForPath("/");

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  ...homeMetadata,
  description,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name, url: BRAND.siteUrl }],
  creator: BRAND.name,
  publisher: BRAND.name,
  keywords: [
    "travel planner Bengaluru",
    "India holiday packages",
    "international trips",
    "honeymoon planning",
    "group tours",
    "spiritual journeys India",
    "pilgrimage tours from Bengaluru",
    "group departures from Bengaluru",
    "Gamya Sanchari",
  ],
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/images/brand/gamya-sanchari-icon-192.png",
    apple: "/images/brand/gamya-sanchari-icon-512.png",
  },
};

export const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${BRAND.siteUrl}/#travel-agency`,
  name: BRAND.name,
  alternateName: BRAND.nameKannada,
  url: BRAND.siteUrl,
  telephone: "+918073254766",
  email: BRAND.email,
  description,
  slogan: "Your Journey Awaits",
  logo: `${BRAND.siteUrl}/images/brand/gamya-sanchari-lockup.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [BRAND.instagram],
} as const;

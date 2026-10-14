import type { Metadata } from "next";

import { BRAND } from "@/constants/brand";

const description =
  "Personalised domestic and international travel planning from Bengaluru. Flights, stays, transfers and experiences designed around your pace and budget.";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: "Gamya Sanchari | Your Journey Awaits",
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
    "Gamya Sanchari",
  ],
  alternates: { canonical: BRAND.siteUrl },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    title: "Gamya Sanchari | Your Journey Awaits",
    description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gamya Sanchari — Your Journey Awaits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gamya Sanchari | Your Journey Awaits",
    description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
  },
};

export const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: BRAND.name,
  alternateName: BRAND.nameKannada,
  url: BRAND.siteUrl,
  telephone: "+918073254766",
  email: BRAND.email,
  description,
  slogan: "Your Journey Awaits",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [BRAND.instagram],
} as const;

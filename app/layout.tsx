import type { Viewport } from "next";
import { Libre_Franklin } from "next/font/google";

import GlobalWidgets from "@/components/GlobalWidgets";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SkipLink from "@/components/a11y/SkipLink";
import MotionProvider from "@/components/motion/MotionProvider";

import "./globals.css";
import { metadata, travelAgencySchema } from "./siteMetadata";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "optional",
  variable: "--font-libre-franklin",
});

export { metadata };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#33483a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          as="image"
          fetchPriority="high"
          href="/images/hero-poster.webp"
          rel="preload"
          type="image/webp"
        />
      </head>
      <body className={libreFranklin.variable}>
        <MotionProvider>
          <SkipLink />
          <EnquiryProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <GlobalWidgets />
          </EnquiryProvider>
        </MotionProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(travelAgencySchema).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}

import type { Viewport } from "next";
import { Libre_Franklin } from "next/font/google";

import Footer from "@/components/Footer";
import GlobalWidgets from "@/components/GlobalWidgets";
import Navbar from "@/components/Navbar";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";

import "./globals.css";
import { metadata, travelAgencySchema } from "./siteMetadata";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-libre-franklin",
});

export { metadata };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101a35",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={libreFranklin.variable}>
        <EnquiryProvider>
          <Navbar />
          {children}
          <Footer />
          <GlobalWidgets />
        </EnquiryProvider>
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

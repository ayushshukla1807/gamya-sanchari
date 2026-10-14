import type { MetadataRoute } from "next";

import { BRAND } from "@/constants/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BRAND.siteUrl}/sitemap.xml`,
  };
}

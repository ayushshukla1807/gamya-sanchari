import type { MetadataRoute } from "next";

import { BRAND } from "@/constants/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BRAND.siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

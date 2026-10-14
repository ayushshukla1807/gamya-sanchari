import type { MetadataRoute } from "next";

import { BRAND } from "@/constants/brand";
import { getPublishedPages } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return getPublishedPages().map((page) => ({
    url: `${BRAND.siteUrl}${page.path}`,
    changeFrequency: page.changeFrequency ?? "monthly",
    priority: page.priority ?? 0.7,
  }));
}

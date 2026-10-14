import sitemap from "@/app/sitemap";
import { metadata, travelAgencySchema } from "@/app/siteMetadata";
import { BRAND } from "@/constants/brand";
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  getPublishedPages,
  metadataForPath,
} from "@/lib/metadata";

describe("published metadata", () => {
  test("uses the official identity for browser and social branding", () => {
    expect(metadata.icons).toEqual({
      icon: "/images/brand/gamya-sanchari-icon-192.png",
      apple: "/images/brand/gamya-sanchari-icon-512.png",
    });
    expect(travelAgencySchema.logo).toBe(
      `${BRAND.siteUrl}/images/brand/gamya-sanchari-lockup.png`,
    );
    expect(metadata.openGraph?.images).toEqual([
      { url: `${BRAND.siteUrl}/images/brand/gamya-sanchari-social.png` },
    ]);
  });

  test("every route has unique complete metadata and one canonical origin", () => {
    const pages = getPublishedPages();
    const metadata = pages.map(buildPageMetadata);

    expect(new Set(pages.map(({ path }) => path)).size).toBe(pages.length);
    expect(new Set(metadata.map(({ title }) => title)).size).toBe(pages.length);
    expect(new Set(metadata.map(({ description }) => description)).size).toBe(pages.length);
    expect(new Set(metadata.map(({ alternates }) => alternates?.canonical)).size).toBe(pages.length);

    for (const entry of metadata) {
      expect(String(entry.alternates?.canonical)).toMatch(new RegExp(`^${BRAND.siteUrl}`));
      expect(entry.openGraph?.title).toBeTruthy();
      expect(entry.openGraph?.description).toBeTruthy();
      expect(entry.openGraph?.url).toBe(entry.alternates?.canonical);
    }
  });

  test("sitemap includes every published route with a trailing slash", () => {
    const expected = getPublishedPages().map(({ path }) => `${BRAND.siteUrl}${path}`);
    const urls = sitemap().map(({ url }) => url);
    expect(urls).toEqual(expected);
    expect(urls.every((url) => url.endsWith("/"))).toBe(true);
  });

  test("publishes distinct spiritual and group discovery metadata", () => {
    const spiritual = metadataForPath("/spiritual-journeys/");
    const groups = metadataForPath("/group-departures/");

    expect(spiritual.alternates?.canonical).toBe(`${BRAND.siteUrl}/spiritual-journeys/`);
    expect(groups.alternates?.canonical).toBe(`${BRAND.siteUrl}/group-departures/`);
    expect(spiritual.alternates?.canonical).not.toBe(groups.alternates?.canonical);
    expect(spiritual.description).toMatch(/spiritual|yatra|pilgrimage/i);
    expect(groups.description).toMatch(/group|departure/i);

    const urls = sitemap().map(({ url }) => url);
    expect(urls).toContain(`${BRAND.siteUrl}/spiritual-journeys/`);
    expect(urls).toContain(`${BRAND.siteUrl}/group-departures/`);
  });

  test("structured data contains only supported organization and breadcrumb facts", () => {
    expect(travelAgencySchema["@type"]).toBe("TravelAgency");
    expect(travelAgencySchema.url).toBe(BRAND.siteUrl);
    const serializedAgency = JSON.stringify(travelAgencySchema);
    for (const unsupported of ["aggregateRating", "ratingValue", "priceRange", "offers", "availability"]) {
      expect(serializedAgency).not.toContain(unsupported);
    }

    const breadcrumbs = buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Destinations", path: "/destinations/" },
      { name: "Kerala", path: "/destinations/kerala/" },
    ]);
    expect(breadcrumbs["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbs.itemListElement.at(-1)?.item).toBe(
      `${BRAND.siteUrl}/destinations/kerala/`,
    );
  });
});

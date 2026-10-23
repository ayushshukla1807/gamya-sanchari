import { render, screen } from "@testing-library/react";

import DestinationDetail from "@/components/destinations/DestinationDetail";
import { DESTINATIONS } from "@/constants/travel";
import { getDestination, getRelatedJourneys } from "@/lib/travel-content";

import DestinationsPage from "./page";
import {
  generateMetadata,
  generateStaticParams,
} from "./[slug]/page";

describe("destination routes", () => {
  it("introduces the destination explorer and links every published destination", () => {
    render(<DestinationsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /begin with Karnataka, then discover India/i,
      }),
    ).toBeVisible();
    for (const destination of DESTINATIONS) {
      expect(
        screen.getByRole("link", { name: `Explore ${destination.title}` }),
      ).toHaveAttribute("href", `/destinations/${destination.slug}/`);
    }
  });

  it("statically generates all five destinations with unique metadata", async () => {
    expect(generateStaticParams()).toEqual(
      DESTINATIONS.map(({ slug }) => ({ slug })),
    );

    const titles = await Promise.all(
      DESTINATIONS.map(async ({ slug }) => {
        const metadata = await generateMetadata({ params: { slug } });
        return metadata.title;
      }),
    );
    expect(new Set(titles).size).toBe(DESTINATIONS.length);
  });

  it("renders destination facts, sample route, related journey and planner context", () => {
    const destination = getDestination("kerala")!;
    render(
      <DestinationDetail
        destination={destination}
        relatedJourneys={getRelatedJourneys(destination.slug)}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeVisible();
    expect(screen.getByText("Sample route")).toBeVisible();
    expect(screen.getByText("Kochi")).toBeVisible();
    expect(screen.getByText("Kerala at an easy pace")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Plan This Destination" }),
    ).toHaveAttribute("href", "/plan-my-trip?destination=kerala");
  });
});

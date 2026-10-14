import { render, screen } from "@testing-library/react";

import { EXPERIENCES, JOURNEYS } from "@/constants/travel";
import { getJourney } from "@/lib/travel-content";

import ExperiencesPage from "../experiences/page";
import PackagesPage from "./page";
import JourneyPage, {
  generateMetadata,
  generateStaticParams,
} from "./[slug]/page";

describe("package routes", () => {
  it("labels every journey with its honest availability status", () => {
    const { container } = render(<PackagesPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /journeys to make your own/i }),
    ).toBeVisible();
    expect(container.querySelectorAll("[data-departure-status]")).toHaveLength(
      JOURNEYS.length,
    );
  });

  it("statically generates all journey details with unique metadata", async () => {
    expect(generateStaticParams()).toEqual(JOURNEYS.map(({ slug }) => ({ slug })));
    const titles = await Promise.all(
      JOURNEYS.map(async ({ slug }) =>
        (await generateMetadata({ params: { slug } })).title,
      ),
    );
    expect(new Set(titles).size).toBe(JOURNEYS.length);
  });

  it("renders a day-by-day journey with a contextual customization action", () => {
    const journey = getJourney("kerala-easy-pace")!;
    render(<JourneyPage params={{ slug: journey.slug }} />);

    expect(screen.getByText("Sample journey—customizable")).toBeVisible();
    expect(screen.getByRole("heading", { name: journey.title })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Day by day" })).toBeVisible();
    expect(
      screen.getAllByRole("link", { name: "Customize This Trip" })[0],
    ).toHaveAttribute("href", `/plan-my-trip/?journey=${journey.slug}`);
    expect(screen.getByRole("link", { name: "Explore Kerala" })).toHaveAttribute(
      "href",
      "/destinations/kerala/",
    );
  });
});

describe("experience route", () => {
  it("presents six distinct experience portals with fit and pacing guidance", () => {
    render(<ExperiencesPage />);

    for (const experience of EXPERIENCES) {
      const heading = screen.getByRole("heading", { name: experience.title });
      expect(heading).toBeVisible();
      expect(screen.getByText(experience.fit)).toBeVisible();
      expect(screen.getByText(experience.pacing)).toBeVisible();
    }
  });
});

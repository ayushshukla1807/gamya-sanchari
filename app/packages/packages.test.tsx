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
    expect(
      screen.getByRole("heading", { name: "How availability works" }),
    ).toBeVisible();
    for (const status of [
      "Enquire now",
      "Next departure on request",
      "Previous departure",
    ]) {
      expect(screen.getAllByText(status).length).toBeGreaterThan(0);
    }
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

    expect(screen.getByText("Enquire now")).toBeVisible();
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

  it("renders audited proof, inclusions and highlights without an empty itinerary", () => {
    const journey = getJourney("puri-jagannath-konark")!;
    render(<JourneyPage params={{ slug: journey.slug }} />);

    expect(screen.getByText("Previous departure")).toBeVisible();
    expect(screen.getByText("Jagannath Temple")).toBeVisible();
    expect(screen.getByText("Coordinated transport")).toBeVisible();
    expect(
      screen.getAllByRole("link", { name: "Ask for the next departure" })[0],
    ).toHaveAttribute("target", "_blank");
    expect(
      screen.queryByRole("heading", { name: "Day by day" }),
    ).not.toBeInTheDocument();
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

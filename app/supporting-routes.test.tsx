import { render, screen } from "@testing-library/react";

import { BRAND } from "@/constants/brand";
import { JOURNAL_ARTICLES } from "@/constants/travel";

import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import JournalPage from "./journal/page";
import ArticlePage, {
  generateMetadata,
  generateStaticParams,
} from "./journal/[slug]/page";

describe("supporting routes", () => {
  it("explains the brand promise and complete planning method", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: BRAND.promise }),
    ).toBeVisible();
    for (const step of ["Listen", "Shape", "Refine", "Support"]) {
      expect(screen.getByRole("heading", { name: step })).toBeVisible();
    }
  });

  it("offers transparent contact choices without claiming to store a submission", () => {
    render(<ContactPage />);

    expect(screen.getByRole("link", { name: new RegExp(BRAND.phoneDisplay.replace("+", "\\+")) })).toHaveAttribute(
      "href", BRAND.phoneHref,
    );
    expect(screen.getByRole("link", { name: new RegExp(BRAND.email) })).toHaveAttribute(
      "href",
      BRAND.emailHref,
    );
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute(
      "href",
      BRAND.instagram,
    );
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      BRAND.whatsappHref,
    );
    expect(screen.getByText(BRAND.location)).toBeVisible();
    expect(screen.getByRole("button", { name: "Request a Call" })).toBeVisible();
    expect(screen.getByText(/opens whatsapp/i)).toBeVisible();
    expect(screen.queryByText(/submission (?:was )?received/i)).not.toBeInTheDocument();
  });

  it("lists every published journal guide", () => {
    render(<JournalPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /travel notes for better journeys/i }),
    ).toBeVisible();
    for (const article of JOURNAL_ARTICLES) {
      expect(screen.getByRole("link", { name: article.title })).toHaveAttribute(
        "href", `/journal/${article.slug}`,
      );
    }
  });

  it("statically generates complete article pages with contextual next steps", async () => {
    expect(generateStaticParams()).toEqual(
      JOURNAL_ARTICLES.map(({ slug }) => ({ slug })),
    );

    const article = JOURNAL_ARTICLES[0];
    const metadata = await generateMetadata({ params: { slug: article.slug } });
    expect(metadata.title).toContain(article.title);
    expect(metadata.alternates?.canonical).toBe(
      `https://gamya-sanchari.vercel.app/journal/${article.slug}/`,
    );

    render(<ArticlePage params={{ slug: article.slug }} />);

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 1, name: article.title })).toBeVisible();
    expect(screen.getByRole("link", { name: "Explore Kerala" })).toHaveAttribute(
      "href",
      "/destinations/kerala",
    );
    expect(screen.getByRole("link", { name: "Plan a Kerala Trip" })).toHaveAttribute(
      "href",
      "/plan-my-trip?destination=kerala",
    );
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { metadata, travelAgencySchema } from "@/app/siteMetadata";
import { BRAND } from "@/constants/brand";
import { BENEFITS, DESTINATIONS, SERVICES, TRAVELLER_STORIES } from "@/constants/content";

import About from "./About";
import Destinations from "./Destinations";
import Footer from "./Footer";
import Services from "./Services";
import Testimonials from "./Testimonials";
import WhyUs from "./WhyUs";
import { EnquiryProvider } from "./enquiry/EnquiryProvider";

describe("marketing sections", () => {
  it("renders the exact introduction and confidence statement", () => {
    render(<About />);

    expect(
      screen.getByText(
        "Gamya Sanchari, which means 'destination traveller' in Kannada, is a travel planning service built around one idea: a good trip should fit the people taking it. Whether you want a quiet weekend in the hills, a family holiday, a honeymoon or a group tour, we listen first and then put together flights, stays, transfers and sightseeing that match your pace and budget. You get one point of contact, clear costs and support when you need it.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText("Travel with confidence, comfort and a plan made for you."),
    ).toHaveClass("font-bold");
  });

  it("renders all destination groups and opens their exact enquiry context", async () => {
    const user = userEvent.setup();
    render(
      <EnquiryProvider>
        <Destinations />
      </EnquiryProvider>,
    );

    for (const destination of DESTINATIONS) {
      expect(screen.getByRole("heading", { name: destination.title })).toBeVisible();
      for (const place of destination.places) {
        expect(screen.getByText(place)).toBeVisible();
      }
    }
    await user.click(screen.getByRole("button", { name: "Enquire about South India" }));
    expect(screen.getByText("Enquiring about South India")).toBeVisible();
  });

  it("renders all services and opens their exact enquiry context", async () => {
    const user = userEvent.setup();
    render(
      <EnquiryProvider>
        <Services />
      </EnquiryProvider>,
    );

    expect(
      SERVICES.every((service) =>
        Boolean(screen.getByRole("heading", { name: service.title })),
      ),
    ).toBe(true);
    await user.click(
      screen.getByRole("button", { name: "Enquire about Visa Assistance" }),
    );
    expect(screen.getByText("Enquiring about Visa Assistance")).toBeVisible();
  });

  it("renders six benefits and three clearly marked sample stories", () => {
    const { rerender } = render(<WhyUs />);
    expect(
      BENEFITS.every((benefit) =>
        Boolean(screen.getByRole("heading", { name: benefit.title })),
      ),
    ).toBe(true);

    rerender(<Testimonials />);
    expect(screen.getAllByText("Sample traveller story")).toHaveLength(3);
    for (const story of TRAVELLER_STORIES) {
      expect(screen.getByText(`${story.name} · ${story.trip}`)).toBeVisible();
    }
  });

  it("renders the exact footer contact links", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: BRAND.phoneDisplay })).toHaveAttribute(
      "href",
      BRAND.phoneHref,
    );
    expect(screen.getByRole("link", { name: BRAND.email })).toHaveAttribute(
      "href",
      BRAND.emailHref,
    );
    expect(screen.getByText(BRAND.location)).toBeVisible();
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      BRAND.instagram,
    );
  });
});

describe("SEO metadata", () => {
  it("publishes the exact Open Graph title and canonical URL", () => {
    expect(metadata.openGraph).toMatchObject({
      title: "Gamya Sanchari | Your Journey Awaits",
      url: "https://gamya-sanchari.vercel.app",
    });
    expect(metadata.alternates).toMatchObject({
      canonical: "https://gamya-sanchari.vercel.app",
    });
  });

  it("uses exact contact data without invented business claims", () => {
    expect(travelAgencySchema).toMatchObject({
      "@type": "TravelAgency",
      telephone: "+918073254766",
      email: BRAND.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    });
    const serialized = JSON.stringify(travelAgencySchema);
    expect(serialized).not.toMatch(
      /streetAddress|aggregateRating|priceRange|openingHours/,
    );
  });
});

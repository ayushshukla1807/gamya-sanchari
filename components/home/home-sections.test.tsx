import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import PlannerPreview from "@/components/home/PlannerPreview";
import { BRAND } from "@/constants/brand";

import Home from "@/app/page";

describe("guided home journey", () => {
  it("orders discovery around intent, real journeys, proof and the travel desk", () => {
    render(<EnquiryProvider><Home /></EnquiryProvider>);

    const headings = screen.getAllByRole("heading", { level: 2 });
    const names = headings.map((heading) => heading.textContent);
    const narrative = [
      "What kind of journey are you looking for?",
      "Journeys with a real story behind them",
      "What we can coordinate",
      "Previous departures, thoughtfully continued",
      "At the travel desk",
      "How we shape your journey",
    ];
    for (let index = 0; index < narrative.length - 1; index += 1) {
      expect(names.indexOf(narrative[index])).toBeLessThan(
        names.indexOf(narrative[index + 1]),
      );
    }
  });

  it("shows intent links, concrete coordination, historical proof and community", () => {
    const { container } = render(<EnquiryProvider><Home /></EnquiryProvider>);

    for (const intent of ["Spiritual Journeys", "Group Departures", "Short Trips", "Island Escapes", "Women-only Travel", "Business Travel"]) {
      expect(screen.getByRole("heading", { name: intent })).toBeVisible();
    }
    expect(
      screen.getByRole("link", { name: /Spiritual Journeys/ }),
    ).toHaveClass("block", "h-full");
    for (const inclusion of ["Transport", "Stays", "Applicable meals", "Sightseeing", "Local coordination", "Tour-manager or guide support"]) {
      expect(screen.getByText(inclusion)).toBeVisible();
    }
    expect(container.querySelectorAll('[data-departure-status="previous"]').length).toBeGreaterThanOrEqual(3);
    expect(screen.getByText(/Tiranga Darshan/i)).toBeVisible();
    expect(screen.getByRole("link", { name: /active campaigns and trip moments/i })).toHaveAttribute("href", BRAND.instagram);
    expect(
      container.querySelectorAll('[data-motion^="reveal-"]').length,
    ).toBeGreaterThanOrEqual(12);
  });
});

describe("PlannerPreview", () => {
  it("builds a contextual planner link from three simple choices", async () => {
    const user = userEvent.setup();
    render(<PlannerPreview />);

    await user.selectOptions(screen.getByLabelText("Preview destination"), "kerala");
    await user.selectOptions(screen.getByLabelText("Preview travel party"), "Family");
    await user.type(screen.getByLabelText("Preview month"), "December");

    expect(
      screen.getByRole("link", { name: "Continue to My Trip" }),
    ).toHaveAttribute(
      "href",
      "/plan-my-trip/?destination=kerala&party=Family&month=December",
    );
  });
});

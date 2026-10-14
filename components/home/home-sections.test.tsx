import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import PlannerPreview from "@/components/home/PlannerPreview";
import { DESTINATIONS, EXPERIENCES, JOURNEYS } from "@/constants/travel";

import Home from "@/app/page";

describe("guided home journey", () => {
  it("orders the discovery narrative and links to real destination pages", () => {
    render(<EnquiryProvider><Home /></EnquiryProvider>);

    const headings = screen.getAllByRole("heading", { level: 2 });
    const names = headings.map((heading) => heading.textContent);
    expect(names.indexOf("Choose a direction")).toBeLessThan(
      names.indexOf("Travel by feeling"),
    );
    expect(names.indexOf("Travel by feeling")).toBeLessThan(
      names.indexOf("See a journey take shape"),
    );
    expect(names.indexOf("See a journey take shape")).toBeLessThan(
      names.indexOf("How we shape your journey"),
    );

    for (const destination of DESTINATIONS) {
      expect(
        screen.getByRole("link", {
          name: new RegExp(`Discover ${destination.title}`, "i"),
        }),
      ).toHaveAttribute("href", `/destinations/${destination.slug}/`);
    }
  });

  it("shows specialist experience portals, honest journey statuses and the planning method", () => {
    const { container } = render(<EnquiryProvider><Home /></EnquiryProvider>);

    for (const experience of EXPERIENCES) {
      expect(screen.getByRole("heading", { name: experience.title })).toBeVisible();
    }
    expect(container.querySelectorAll("[data-departure-status]")).toHaveLength(
      JOURNEYS.length,
    );
    for (const step of ["Listen", "Shape", "Refine", "Support"]) {
      expect(screen.getByText(step)).toBeVisible();
    }
    expect(
      screen.getByRole("heading", { name: "Travel, with someone listening" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Talk to a Planner" })).toHaveAttribute(
      "href",
      "/contact/",
    );
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

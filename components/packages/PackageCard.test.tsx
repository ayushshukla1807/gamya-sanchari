import { render, screen } from "@testing-library/react";

import PackageCard from "@/components/packages/PackageCard";
import { JOURNEYS } from "@/constants/travel";

describe("PackageCard availability", () => {
  it("presents previous campaigns as proof with a next-departure enquiry", () => {
    const journey = JOURNEYS.find(
      ({ slug }) => slug === "puri-jagannath-konark",
    )!;

    const { container } = render(<PackageCard journey={journey} />);

    expect(container.firstElementChild).toHaveAttribute(
      "data-motion",
      "journey-card",
    );
    expect(container.firstElementChild).toHaveAttribute(
      "data-motion-engine",
      "framer-motion",
    );

    expect(screen.getByText("Previous departure")).toBeVisible();
    const enquiry = screen.getByRole("link", {
      name: "Ask for the next departure",
    });
    expect(enquiry).toHaveAttribute("target", "_blank");
    expect(enquiry).toHaveAttribute("rel", "noreferrer");
    expect(
      new URL(enquiry.getAttribute("href")!).searchParams.get("text"),
    ).toContain(journey.enquiryTopic);

    const content = document.body.textContent ?? "";
    for (const staleValue of [
      "₹29,990",
      "₹33,999",
      "28 August",
      "9 August",
      "8 September 2026",
    ]) {
      expect(content).not.toContain(staleValue);
    }
  });

  it("keeps an internal detail route beside the contextual enquiry", () => {
    const journey = JOURNEYS.find(
      ({ slug }) => slug === "andaman-island-escape",
    )!;

    render(<PackageCard journey={journey} />);

    expect(
      screen.getByRole("link", { name: `View ${journey.title}` }),
    ).toHaveAttribute("href", `/packages/${journey.slug}/`);
  });
});

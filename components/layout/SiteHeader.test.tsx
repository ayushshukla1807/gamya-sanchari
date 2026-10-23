import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SiteHeader from "@/components/layout/SiteHeader";
import RouteLine from "@/components/ui/RouteLine";

const expectedLinks = [
  ["Karnataka & India", "/destinations/"],
  ["Packages", "/packages/"],
  ["Experiences", "/experiences/"],
  ["Spiritual Journeys", "/spiritual-journeys/"],
  ["Group Departures", "/group-departures/"],
  ["Plan My Trip", "/plan-my-trip/"],
  ["About", "/about/"],
  ["Contact", "/contact/"],
] as const;

describe("SiteHeader", () => {
  test("links every primary destination and emphasizes the trip planner", () => {
    const { container } = render(<SiteHeader />);

    const desktop = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    const emblem = container.querySelector(
      'img[src*="gamya-sanchari-emblem"]',
    );
    expect(emblem).toHaveAttribute("alt", "");
    for (const [label, href] of expectedLinks) {
      expect(within(desktop).getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href,
      );
    }
    expect(within(desktop).getByRole("link", { name: "Plan My Trip" })).toHaveAttribute(
      "data-primary-action",
      "true",
    );
    expect(within(desktop).getAllByRole("link").filter((link) => link.hasAttribute("data-primary-action"))).toHaveLength(1);
  });

  test("closes the mobile menu with Escape and restores trigger focus", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const trigger = screen.getByRole("button", { name: "Open navigation" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  test("closes the mobile menu after route selection", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const mobile = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });
    for (const [label, href] of expectedLinks) {
      expect(within(mobile).getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
    const spiritualLink = within(mobile).getByRole("link", { name: "Spiritual Journeys" });
    spiritualLink.addEventListener("click", (event) => event.preventDefault());
    await user.click(spiritualLink);

    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
  });
});

describe("shared editorial navigation primitives", () => {
  test("renders a labelled breadcrumb trail with a current page", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destinations/" },
          { label: "Kerala" },
        ]}
      />,
    );

    const breadcrumb = screen.getByRole("navigation", {
      name: "Breadcrumb",
    });
    expect(within(breadcrumb).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(within(breadcrumb).getByText("Kerala")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("keeps route labels readable independently of animation", () => {
    render(<RouteLine stops={["Listen", "Shape", "Refine", "Support"]} />);

    expect(screen.getByTestId("route-progress")).toHaveAttribute(
      "data-motion-engine",
      "framer-motion",
    );
    expect(screen.getByTestId("route-progress")).toHaveAttribute(
      "data-motion-trigger",
      "while-in-view",
    );
    for (const stop of ["Listen", "Shape", "Refine", "Support"]) {
      expect(screen.getByText(stop)).toBeVisible();
    }
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PackageFilters from "@/components/packages/PackageFilters";
import { JOURNEYS } from "@/constants/travel";

describe("PackageFilters", () => {
  it("filters journeys by destination and announces the result", async () => {
    const user = userEvent.setup();
    render(<PackageFilters journeys={JOURNEYS} />);

    expect(
      screen.getByText(`${JOURNEYS.length} sample journeys found`),
    ).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(screen.getByLabelText("Duration")).toBeVisible();
    expect(screen.getByLabelText("Experience")).toBeVisible();
    expect(screen.getByLabelText("Destination")).toBeVisible();

    await user.selectOptions(screen.getByLabelText("Destination"), "kashmir");
    expect(screen.getByText("1 sample journey found")).toBeVisible();
    expect(
      screen.getByRole("link", { name: /View Kashmir valley moments/i }),
    ).toHaveAttribute("href", "/packages/kashmir-valley-moments/");
  });

  it("offers a useful reset and planner path when no journey matches", async () => {
    const user = userEvent.setup();
    render(<PackageFilters journeys={JOURNEYS} />);

    await user.selectOptions(screen.getByLabelText("Destination"), "rajasthan");
    expect(screen.getByText("0 sample journeys found")).toBeVisible();
    expect(screen.getByText(/No sample journeys match/i)).toBeVisible();
    expect(screen.getByRole("link", { name: "Build My Trip" })).toHaveAttribute(
      "href",
      "/plan-my-trip/",
    );
    await user.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(
      screen.getByText(`${JOURNEYS.length} sample journeys found`),
    ).toBeVisible();
  });

  it("filters audited journeys by spiritual, women-only and business category", async () => {
    const user = userEvent.setup();
    render(<PackageFilters journeys={JOURNEYS} />);

    const category = screen.getByLabelText("Category");
    await user.selectOptions(category, "spiritual");
    expect(screen.getByText("7 sample journeys found")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "View Puri, Jagannath & Konark" }),
    ).toBeVisible();

    await user.selectOptions(category, "women-only");
    expect(screen.getByText("1 sample journey found")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "View Andaman Island Escape" }),
    ).toBeVisible();

    await user.selectOptions(category, "business");
    expect(screen.getByText("1 sample journey found")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "View Canton Fair Business Visit" }),
    ).toBeVisible();
  });
});

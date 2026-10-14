import { render, screen, within } from "@testing-library/react";

import GroupDeparturesPage from "./page";

describe("Group Departures page", () => {
  it("explains coordinated support and honest availability", () => {
    render(<GroupDeparturesPage />);

    const supportRegion = screen.getByRole("region", {
      name: "What coordination can include",
    });
    for (const support of [
      /transport/i,
      /stays/i,
      /applicable meals/i,
      /sightseeing/i,
      /local coordination/i,
      /tour-manager or guide support/i,
    ]) {
      expect(within(supportRegion).getByText(support)).toBeVisible();
    }

    for (const status of [
      "Enquire now",
      "Next departure on request",
      "Previous departure",
    ]) {
      expect(screen.getAllByText(status).length).toBeGreaterThan(0);
    }

    expect(
      screen
        .getAllByRole("link", { name: "Talk to our travel desk" })
        .some((link) => link.getAttribute("href")?.startsWith("/contact")),
    ).toBe(true);
    expect(
      screen.getAllByRole("link", { name: "Ask for the next departure" })
        .length,
    ).toBeGreaterThan(0);
  });
});

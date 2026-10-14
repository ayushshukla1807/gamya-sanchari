import { render, screen } from "@testing-library/react";

import SpiritualJourneysPage from "./page";

describe("Spiritual Journeys page", () => {
  it("presents every audited pilgrimage route with responsible preparation guidance", () => {
    render(<SpiritualJourneysPage />);

    for (const title of [
      "Puri, Jagannath & Konark",
      "Tirupati Darshan from Bengaluru",
      "Ujjain & Mahakaleshwar",
      "Varanasi, Ayodhya & Prayagraj",
      "Char Dham Yatra",
      "Kedarnath Yatra",
      "Shirdi Sai Darshan",
    ]) {
      expect(screen.getByRole("heading", { name: title })).toBeVisible();
    }

    expect(
      screen.getByRole("heading", { name: "How we support your yatra" }),
    ).toBeVisible();
    expect(screen.getByText("What physical demands should we expect?")).toBeVisible();
    expect(screen.getByText("Which documents should we carry?")).toBeVisible();
    expect(screen.getByText("How does weather affect a yatra?")).toBeVisible();
    expect(screen.getByText(/darshan.*cannot be guaranteed/i)).toBeInTheDocument();
    expect(screen.getByText(/ನಿಮ್ಮ ಪ್ರಯಾಣಕ್ಕೆ ನಮ್ಮ ಜೊತೆ/i)).toBeVisible();
  });
});

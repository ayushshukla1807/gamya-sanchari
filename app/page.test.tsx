import { render, screen } from "@testing-library/react";

import Footer from "@/components/Footer";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import { NAV_LINKS } from "@/constants/content";

import Home from "./page";

describe("Home", () => {
  it("renders one main landmark and every primary route link", () => {
    render(
      <EnquiryProvider>
        <Home />
        <Footer />
      </EnquiryProvider>,
    );

    expect(screen.getAllByRole("main")).toHaveLength(1);
    for (const link of NAV_LINKS) {
      const href = screen
        .getAllByRole("link", { name: link.label })[0]
        .getAttribute("href");

      expect([link.href, link.href.replace(/\/$/, "")]).toContain(href);
    }
  });

  it("contains no account or membership interface", () => {
    render(
      <EnquiryProvider>
        <Home />
        <Footer />
      </EnquiryProvider>,
    );

    expect(screen.queryByText(/log[ -]?in|sign[ -]?up|membership/i)).not.toBeInTheDocument();
  });

  it("features audited routes rather than a generic package wall", () => {
    render(<EnquiryProvider><Home /></EnquiryProvider>);

    for (const journey of [
      "Puri, Jagannath & Konark",
      "Tirupati Darshan from Bengaluru",
      "Char Dham Yatra",
      "Andaman Island Escape",
      "Varanasi, Ayodhya & Prayagraj",
    ]) {
      expect(screen.getAllByRole("heading", { name: journey })[0]).toBeVisible();
    }
  });
});

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
      expect(screen.getAllByRole("link", { name: link.label })[0]).toHaveAttribute(
        "href",
        link.href.replace(/\/$/, ""),
      );
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
});

import { render, screen } from "@testing-library/react";

import Footer from "@/components/Footer";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import { NAV_LINKS } from "@/constants/content";

import Home from "./page";

describe("Home", () => {
  it("renders one main landmark and every navigation target", () => {
    const { container } = render(
      <EnquiryProvider>
        <Home />
        <Footer />
      </EnquiryProvider>,
    );

    expect(screen.getAllByRole("main")).toHaveLength(1);
    for (const link of NAV_LINKS) {
      expect(container.querySelector(link.href)).not.toBeNull();
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

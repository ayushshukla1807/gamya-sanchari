import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("Home", () => {
  it("renders exactly one main landmark", () => {
    render(<Home />);

    expect(screen.getAllByRole("main")).toHaveLength(1);
  });
});

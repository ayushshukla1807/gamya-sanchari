import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import MotionReveal from "@/components/MotionReveal";
import MotionProvider from "@/components/motion/MotionProvider";
import PageTransition from "@/components/motion/PageTransition";

const reducedMotion = vi.hoisted(() => ({ value: false }));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => reducedMotion.value };
});

describe("shared motion choreography", () => {
  test("marks page and reveal choreography as Framer Motion powered", () => {
    reducedMotion.value = false;
    render(
      <MotionProvider>
        <PageTransition>
          <MotionReveal>
            <p>Journey content</p>
          </MotionReveal>
        </PageTransition>
      </MotionProvider>,
    );

    expect(screen.getByTestId("page-transition")).toHaveAttribute(
      "data-motion-enabled",
      "true",
    );
    expect(screen.getByTestId("page-transition")).not.toHaveStyle({
      filter: "blur(0px)",
    });
    expect(screen.getByTestId("page-transition")).not.toHaveStyle({ opacity: 0 });
    expect(screen.getByTestId("page-transition")).not.toHaveStyle({
      transform: "translateY(0px)",
    });
    expect(screen.getByText("Journey content").parentElement).toHaveAttribute(
      "data-motion",
      "reveal-up",
    );
  });

  test("keeps every motion wrapper immediately readable with reduced motion", () => {
    reducedMotion.value = true;
    render(
      <MotionProvider>
        <PageTransition>
          <MotionReveal>
            <p>Reduced journey content</p>
          </MotionReveal>
        </PageTransition>
      </MotionProvider>,
    );

    expect(screen.getByTestId("page-transition")).toHaveAttribute(
      "data-motion-enabled",
      "false",
    );
    expect(screen.getByText("Reduced journey content").parentElement).toHaveAttribute(
      "data-motion-enabled",
      "false",
    );
    reducedMotion.value = false;
  });
});

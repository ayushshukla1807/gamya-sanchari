import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import MotionReveal from "@/components/MotionReveal";
import KineticText from "@/components/motion/KineticText";
import MotionProvider from "@/components/motion/MotionProvider";
import PageTransition from "@/components/motion/PageTransition";
import ScrollProgress from "@/components/motion/ScrollProgress";

const reducedMotion = vi.hoisted(() => ({ value: false }));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => reducedMotion.value };
});

describe("shared motion choreography", () => {
  test("kinetic text keeps one accessible heading while its words animate decoratively", () => {
    reducedMotion.value = false;
    const { container } = render(
      <MotionProvider>
        <KineticText
          accentWords={["awaits"]}
          as="h2"
          text="Your journey awaits"
        />
      </MotionProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Your journey awaits" }),
    ).toHaveAttribute("data-motion", "kinetic-text");
    expect(container.querySelectorAll('[data-motion="kinetic-word"]')).toHaveLength(
      3,
    );
    expect(container.querySelector('[data-accent="true"]')).toHaveTextContent(
      "awaits",
    );
  });

  test("reduced motion keeps kinetic copy static and removes decorative scroll progress", () => {
    reducedMotion.value = true;
    render(
      <MotionProvider>
        <KineticText as="h2" text="Travel without distraction" />
        <ScrollProgress />
      </MotionProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Travel without distraction" }),
    ).toHaveAttribute("data-motion-enabled", "false");
    expect(screen.queryByTestId("scroll-progress")).not.toBeInTheDocument();
    reducedMotion.value = false;
  });

  test("shows a decorative scroll progress indicator when motion is enabled", () => {
    reducedMotion.value = false;
    render(
      <MotionProvider>
        <ScrollProgress />
      </MotionProvider>,
    );

    expect(screen.getByTestId("scroll-progress")).toHaveAttribute(
      "data-motion-enabled",
      "true",
    );
    expect(screen.getByTestId("scroll-progress")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

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

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import MotionProvider, { getMotionPolicy, useMotionPolicy } from "./MotionProvider";

const reducedMotion = vi.hoisted(() => ({ value: false }));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => reducedMotion.value };
});

function PolicyProbe() {
  const policy = useMotionPolicy();
  return <output>{JSON.stringify(policy)}</output>;
}

describe("central motion policy", () => {
  test("disables every non-essential motion family when reduced motion is requested", () => {
    expect(getMotionPolicy(true)).toEqual({
      reduced: true,
      pageTransition: false,
      revealOffset: 0,
      parallax: false,
      smoothScroll: false,
      routeDrawing: false,
      autoAnnouncements: false,
      kineticText: false,
      scrollProgress: false,
    });
  });

  test("allows only the approved normal-motion enhancements", () => {
    expect(getMotionPolicy(false)).toEqual({
      reduced: false,
      pageTransition: true,
      revealOffset: 24,
      parallax: true,
      smoothScroll: true,
      routeDrawing: true,
      autoAnnouncements: true,
      kineticText: true,
      scrollProgress: true,
    });
  });

  test("provides the operating-system preference to every descendant", () => {
    reducedMotion.value = true;
    render(<MotionProvider><PolicyProbe /></MotionProvider>);

    expect(screen.getByRole("status")).toHaveTextContent('"reduced":true');
    reducedMotion.value = false;
  });
});

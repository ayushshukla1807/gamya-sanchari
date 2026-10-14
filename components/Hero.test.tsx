import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

import Hero from "./Hero";

const reducedMotion = vi.hoisted(() => ({ value: false }));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => reducedMotion.value };
});

function setReducedMotion(matches: boolean) {
  reducedMotion.value = matches;
}

beforeEach(() => setReducedMotion(false));
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("Hero", () => {
  it("renders a metadata-preloaded inline muted video over a persistent poster", () => {
    const { container } = render(<Hero />);
    const video = container.querySelector("video");

    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("poster", "/images/hero-poster.webp");
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveProperty("muted", true);
    expect(screen.getByTestId("hero-media")).toHaveStyle({
      backgroundImage: 'url("/images/hero-poster.webp")',
    });
  });

  it("keeps final fallback content and the exact calls to action in static markup", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        name: "Enjoy your holidays with GAMYA SANCHARI",
      }),
    ).toBeVisible();
    expect(screen.getByText("Domestic | International | Experiences")).toBeVisible();
    expect(screen.getByRole("link", { name: "Explore Destinations" })).toHaveAttribute(
      "href",
      "#destinations",
    );
    expect(screen.getByRole("link", { name: "Enquire on WhatsApp" })).toHaveAttribute(
      "href",
      "https://wa.me/918073254766?text=Hi%20Gamya%20Sanchari!%20I%20want%20to%20plan%20a%20trip.",
    );
  });

  it("plays the three captain messages before settling on the final state", () => {
    vi.useFakeTimers();
    render(<Hero />);

    expect(screen.getByTestId("announcement-message")).toHaveTextContent(
      "Ladies and gentlemen, this is your captain speaking",
    );

    act(() => vi.advanceTimersByTime(2200));
    expect(screen.getByTestId("announcement-message")).toHaveTextContent(
      "beginning our descent into your dream destination",
    );

    act(() => vi.advanceTimersByTime(2200));
    expect(screen.getByTestId("announcement-message")).toHaveTextContent(
      "ಗಮ್ಯ ಸಂಚಾರಿ — Your Journey Awaits",
    );

    act(() => vi.advanceTimersByTime(2200));
    expect(screen.queryByTestId("announcement-message")).not.toBeInTheDocument();
  });

  it("shows the final state immediately for reduced-motion users", () => {
    setReducedMotion(true);
    render(<Hero />);

    expect(screen.queryByTestId("announcement-message")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Enjoy your holidays with GAMYA SANCHARI",
      }),
    ).toBeVisible();
  });

  it("hides a failed video while retaining the poster and readable content", () => {
    const { container } = render(<Hero />);
    const video = container.querySelector("video")!;

    fireEvent.error(video);

    expect(video).toHaveClass("hidden");
    expect(screen.getByTestId("hero-media")).toHaveStyle({
      backgroundImage: 'url("/images/hero-poster.webp")',
    });
    expect(
      screen.getByRole("heading", {
        name: "Enjoy your holidays with GAMYA SANCHARI",
      }),
    ).toBeVisible();
  });
});

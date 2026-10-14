import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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

beforeEach(() => {
  setReducedMotion(false);
  vi.spyOn(window.HTMLMediaElement.prototype, "pause").mockImplementation(
    () => undefined,
  );
  vi.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(
    () => new Promise(() => undefined),
  );
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  window.sessionStorage.clear();
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
    expect(video?.querySelector("source")).toHaveAttribute(
      "media",
      "(min-width: 640px)",
    );
    expect(screen.getByTestId("hero-media")).toHaveStyle({
      backgroundImage: 'url("/images/hero-poster.webp")',
    });
  });

  it("keeps final fallback content and the exact calls to action in static markup", () => {
    const { container } = render(<Hero />);

    const heading =
      screen.getByRole("heading", {
        name: "Enjoy your holidays with GAMYA SANCHARI",
      });
    expect(heading).toBeVisible();
    expect(heading).toHaveAttribute("data-motion", "kinetic-text");
    expect(container.querySelector('[data-material="hero-stage"]')).toBeVisible();
    expect(screen.getByText("Domestic | International | Experiences")).toBeVisible();
    expect(screen.getByRole("link", { name: "Explore Destinations" })).toHaveAttribute(
      "href",
      "/destinations/",
    );
    expect(screen.getByRole("link", { name: "Plan My Trip" })).toHaveAttribute(
      "href",
      "/plan-my-trip/",
    );
    expect(screen.getByRole("link", { name: "Plan My Trip" })).toHaveClass(
      "premium-button",
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
    expect(screen.getByTestId("travel-host")).toBeInTheDocument();
    expect(screen.getByTestId("travel-host-caption")).toHaveTextContent(
      "Namaskara, and welcome to Gamya Sanchari",
    );
  });

  it("shows the final state immediately for reduced-motion users", () => {
    setReducedMotion(true);
    const { container } = render(<Hero />);
    const video = container.querySelector("video");

    expect(screen.queryByTestId("announcement-message")).not.toBeInTheDocument();
    expect(screen.getByTestId("travel-host")).toBeInTheDocument();
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).not.toHaveAttribute("loop");
    expect(
      screen.getByRole("heading", {
        name: "Enjoy your holidays with GAMYA SANCHARI",
      }),
    ).toBeVisible();
  });

  it("stops the background video when reduced motion is enabled while mounted", () => {
    const pause = vi
      .spyOn(window.HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => undefined);
    const { rerender } = render(<Hero />);

    setReducedMotion(true);
    rerender(<Hero />);

    expect(pause).toHaveBeenCalledTimes(1);
  });

  it("starts local ambient music and the recorded welcome when the host appears", async () => {
    setReducedMotion(true);
    const play = vi.mocked(window.HTMLMediaElement.prototype.play);
    play.mockResolvedValue(undefined);

    render(<Hero />);

    expect(screen.getByTestId("welcome-sound")).toBeVisible();
    expect(screen.getByTestId("ambient-music-audio")).toHaveAttribute(
      "src",
      "/audio/gamya-ambient-journey.mp3",
    );
    expect(screen.getByTestId("host-introduction-audio")).toHaveAttribute(
      "src",
      "/audio/gamya-host-introduction.mp3",
    );
    await waitFor(() => expect(play).toHaveBeenCalledTimes(2));
    expect(screen.getByRole("button", { name: "Mute sound" })).toBeVisible();
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

  it("keeps the exact written introduction available when recorded audio fails", async () => {
    setReducedMotion(true);

    render(<Hero />);
    fireEvent.error(screen.getByTestId("host-introduction-audio"));

    expect(screen.getByText("Spoken welcome unavailable")).toBeVisible();
    expect(screen.getByTestId("travel-host-caption")).toHaveTextContent(
      "Namaskara, and welcome to Gamya Sanchari. Tell us how you dream of travelling. We'll thoughtfully bring together your flights, stays, transfers, and experiences, so your journey feels truly yours.",
    );
  });

  it("marks the host portrait as removable on very narrow screens", () => {
    setReducedMotion(true);
    render(<Hero />);
    expect(screen.getByTestId("travel-host-portrait")).toHaveClass(
      "max-[380px]:hidden",
    );
  });
});

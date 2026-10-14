import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    expect(video?.querySelector("source")).toHaveAttribute(
      "media",
      "(min-width: 640px)",
    );
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
      "/destinations/",
    );
    expect(screen.getByRole("link", { name: "Plan My Trip" })).toHaveAttribute(
      "href",
      "/plan-my-trip/",
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
    render(<Hero />);

    expect(screen.queryByTestId("announcement-message")).not.toBeInTheDocument();
    expect(screen.getByTestId("travel-host")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Enjoy your holidays with GAMYA SANCHARI",
      }),
    ).toBeVisible();
  });

  it("loads, plays and stops the recorded host introduction only after a visitor asks", async () => {
    setReducedMotion(true);
    const play = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockResolvedValue();
    vi.spyOn(window.HTMLMediaElement.prototype, "load").mockImplementation(() => undefined);
    const pause = vi
      .spyOn(window.HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => undefined);

    render(<Hero />);

    const audio = screen.getByTestId("host-introduction-audio");
    expect(audio).toHaveAttribute(
      "src",
      "/audio/gamya-host-introduction.mp3",
    );
    expect(audio).toHaveAttribute("preload", "none");

    fireEvent.click(screen.getByRole("button", { name: "Hear the host" }));
    expect(screen.getByRole("button", { name: "Loading introduction" })).toBeDisabled();
    expect(play).not.toHaveBeenCalled();

    fireEvent.canPlay(audio);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
    expect(
      screen.getByRole("button", { name: "Stop introduction" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Stop introduction" }));
    expect(pause).toHaveBeenCalledTimes(1);
    expect(audio).toHaveProperty("currentTime", 0);
    expect(
      screen.getByRole("button", { name: "Hear the host" }),
    ).toBeInTheDocument();
  });

  it("offers replay after playback ends and resets only when replay begins", async () => {
    setReducedMotion(true);
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(window.HTMLMediaElement.prototype, "load").mockImplementation(() => undefined);
    vi.spyOn(window.HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);

    const { unmount } = render(<Hero />);
    const audio = screen.getByTestId("host-introduction-audio");

    fireEvent.click(screen.getByRole("button", { name: "Hear the host" }));
    fireEvent.canPlay(audio);
    await screen.findByRole("button", { name: "Stop introduction" });
    fireEvent.ended(audio);

    expect(
      screen.getByRole("button", { name: "Replay introduction" }),
    ).toBeInTheDocument();
    audio.currentTime = 7;
    fireEvent.click(screen.getByRole("button", { name: "Replay introduction" }));
    expect(audio).toHaveProperty("currentTime", 0);
    expect(screen.getByRole("button", { name: "Loading introduction" })).toBeDisabled();
    unmount();
  });

  it("shows the transcript and a clear fallback when recorded playback is rejected", async () => {
    setReducedMotion(true);
    vi.spyOn(window.HTMLMediaElement.prototype, "load").mockImplementation(() => undefined);
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockRejectedValue(new Error("blocked"));

    render(<Hero />);
    const audio = screen.getByTestId("host-introduction-audio");
    fireEvent.click(screen.getByRole("button", { name: "Hear the host" }));
    fireEvent.canPlay(audio);

    expect(await screen.findByText("Audio introduction unavailable")).toBeVisible();
    expect(screen.getByTestId("travel-host-caption")).toHaveTextContent("Namaskara, and welcome to Gamya Sanchari");
  });

  it("pauses active audio during cleanup while leaving the written introduction available", async () => {
    setReducedMotion(true);
    vi.spyOn(window.HTMLMediaElement.prototype, "load").mockImplementation(() => undefined);
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockResolvedValue();
    const pause = vi.spyOn(window.HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);

    const { unmount } = render(<Hero />);
    const audio = screen.getByTestId("host-introduction-audio");
    fireEvent.click(screen.getByRole("button", { name: "Hear the host" }));
    fireEvent.canPlay(audio);
    await screen.findByRole("button", { name: "Stop introduction" });
    expect(screen.getByTestId("travel-host-caption")).toBeVisible();

    unmount();
    expect(pause).toHaveBeenCalledTimes(1);
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

  it("keeps the written introduction available when recorded audio fails", () => {
    setReducedMotion(true);

    render(<Hero />);
    fireEvent.error(screen.getByTestId("host-introduction-audio"));

    expect(screen.queryByRole("button", { name: "Hear the host" })).not.toBeInTheDocument();
    expect(screen.getByText("Audio introduction unavailable")).toBeVisible();
    expect(screen.getByTestId("travel-host-caption")).toBeVisible();
  });

  it("marks the host portrait as removable on very narrow screens", () => {
    setReducedMotion(true);
    render(<Hero />);
    expect(screen.getByTestId("travel-host-portrait")).toHaveClass(
      "max-[380px]:hidden",
    );
  });
});

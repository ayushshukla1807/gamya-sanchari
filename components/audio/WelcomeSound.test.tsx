import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import WelcomeSound from "./WelcomeSound";

function mediaName(media: HTMLMediaElement) {
  return media.dataset.testid;
}

beforeEach(() => {
  window.sessionStorage.clear();
  vi.spyOn(window.HTMLMediaElement.prototype, "pause").mockImplementation(
    () => undefined,
  );
});

afterEach(async () => {
  cleanup();
  await Promise.resolve();
  vi.restoreAllMocks();
  window.sessionStorage.clear();
});

describe("WelcomeSound", () => {
  it("starts the soft music and spoken welcome when the host becomes active", async () => {
    const started: string[] = [];
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(
      function play(this: HTMLMediaElement) {
        started.push(mediaName(this) ?? "unknown");
        return Promise.resolve();
      },
    );

    render(<WelcomeSound active />);

    await waitFor(() =>
      expect(started).toEqual([
        "ambient-music-audio",
        "host-introduction-audio",
      ]),
    );
    const music = screen.getByTestId("ambient-music-audio");
    const narration = screen.getByTestId("host-introduction-audio");
    expect(music).toHaveAttribute("src", "/audio/gamya-ambient-journey.mp3");
    expect(music).toHaveAttribute("loop");
    expect(music).toHaveProperty("volume", 0.035);
    expect(narration).toHaveAttribute(
      "src",
      "/audio/gamya-host-introduction.mp3",
    );
    expect(screen.getByRole("button", { name: "Mute sound" })).toBeVisible();
  });

  it("recovers blocked autoplay on the first visitor gesture outside its controls", async () => {
    const blocked = new DOMException("Autoplay blocked", "NotAllowedError");
    const play = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockRejectedValueOnce(blocked)
      .mockRejectedValueOnce(blocked);

    render(
      <>
        <WelcomeSound active />
        <button type="button">Explore trips</button>
      </>,
    );

    expect(
      await screen.findByRole("button", { name: "Tap to hear welcome" }),
    ).toBeVisible();
    expect(
      screen.getByText("Sound is ready — tap once to hear your welcome."),
    ).toBeVisible();
    play.mockResolvedValue(undefined);
    fireEvent.click(screen.getByRole("button", { name: "Explore trips" }));

    await waitFor(() => expect(play).toHaveBeenCalledTimes(4));
    expect(screen.getByRole("button", { name: "Mute sound" })).toBeVisible();
  });

  it("keeps permission rejection recoverable across more than one gesture", async () => {
    const blocked = new DOMException("Autoplay blocked", "NotAllowedError");
    const play = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockRejectedValue(blocked);

    render(
      <>
        <WelcomeSound active />
        <button type="button">Explore trips</button>
      </>,
    );

    await screen.findByRole("button", { name: "Tap to hear welcome" });
    fireEvent.click(screen.getByRole("button", { name: "Explore trips" }));
    await waitFor(() => expect(play).toHaveBeenCalledTimes(4));
    expect(
      screen.getByRole("button", { name: "Tap to hear welcome" }),
    ).toBeVisible();

    play.mockResolvedValue(undefined);
    fireEvent.click(
      screen.getByRole("button", { name: "Tap to hear welcome" }),
    );
    await waitFor(() => expect(play).toHaveBeenCalledTimes(6));
    expect(screen.getByRole("button", { name: "Mute sound" })).toBeVisible();
  });

  it("allows immediate mute when one channel starts and the other keeps buffering", async () => {
    let resolveNarration: (() => void) | undefined;
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(
      function play(this: HTMLMediaElement) {
        if (mediaName(this) === "ambient-music-audio") return Promise.resolve();
        return new Promise<void>((resolve) => {
          resolveNarration = resolve;
        });
      },
    );

    render(<WelcomeSound active />);

    const mute = await screen.findByRole("button", { name: "Mute sound" });
    fireEvent.click(mute);
    expect(screen.getByRole("button", { name: "Turn sound on" })).toBeVisible();
    expect(sessionStorage.getItem("gamya-sanchari-sound")).toBe("muted");

    resolveNarration?.();
    await Promise.resolve();
    expect(screen.getByRole("button", { name: "Turn sound on" })).toBeVisible();
    expect(sessionStorage.getItem("gamya-sanchari-welcome-played")).toBeNull();
  });

  it("survives Strict Mode effect replay without overlapping or labelling paused media active", async () => {
    const playing = new Map<string, boolean>();
    let overlapped = false;
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(
      function play(this: HTMLMediaElement) {
        const name = mediaName(this) ?? "unknown";
        if (playing.get(name)) overlapped = true;
        playing.set(name, true);
        return Promise.resolve();
      },
    );
    vi.mocked(window.HTMLMediaElement.prototype.pause).mockImplementation(
      function pause(this: HTMLMediaElement) {
        playing.set(mediaName(this) ?? "unknown", false);
      },
    );

    render(
      <StrictMode>
        <WelcomeSound active />
      </StrictMode>,
    );

    await screen.findByRole("button", { name: "Mute sound" });
    expect(overlapped).toBe(false);
    expect(playing.get("ambient-music-audio")).toBe(true);
    expect(playing.get("host-introduction-audio")).toBe(true);
    expect(
      sessionStorage.getItem("gamya-sanchari-welcome-played"),
    ).toBeNull();
  });

  it("retries an interrupted welcome instead of recording it as heard", async () => {
    const started: string[] = [];
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(
      function play(this: HTMLMediaElement) {
        started.push(mediaName(this) ?? "unknown");
        return Promise.resolve();
      },
    );

    const first = render(<WelcomeSound active />);
    await waitFor(() => expect(started).toHaveLength(2));
    expect(
      sessionStorage.getItem("gamya-sanchari-welcome-played"),
    ).toBeNull();

    first.unmount();
    started.length = 0;
    render(<WelcomeSound active />);

    await waitFor(() =>
      expect(started).toEqual([
        "ambient-music-audio",
        "host-introduction-audio",
      ]),
    );
  });

  it("plays the narration only once per session while allowing music to resume", async () => {
    const started: string[] = [];
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(
      function play(this: HTMLMediaElement) {
        started.push(mediaName(this) ?? "unknown");
        return Promise.resolve();
      },
    );

    const first = render(<WelcomeSound active />);
    await waitFor(() => expect(started).toHaveLength(2));
    fireEvent.ended(screen.getByTestId("host-introduction-audio"));
    first.unmount();
    started.length = 0;

    render(<WelcomeSound active />);
    await waitFor(() => expect(started).toEqual(["ambient-music-audio"]));
    expect(
      screen.getByRole("button", { name: "Replay welcome" }),
    ).toBeVisible();
  });

  it("respects a visitor's mute choice for the rest of the session", async () => {
    const play = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockResolvedValue();
    const pause = vi.mocked(window.HTMLMediaElement.prototype.pause);

    const first = render(<WelcomeSound active />);
    await screen.findByRole("button", { name: "Mute sound" });
    fireEvent.click(screen.getByRole("button", { name: "Mute sound" }));
    expect(pause).toHaveBeenCalledTimes(2);
    first.unmount();
    play.mockClear();

    render(<WelcomeSound active />);
    expect(
      screen.getByRole("button", { name: "Turn sound on" }),
    ).toBeVisible();
    await Promise.resolve();
    expect(play).not.toHaveBeenCalled();
  });

  it("raises the music after narration and lets the welcome be replayed", async () => {
    const play = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockResolvedValue();

    render(<WelcomeSound active />);
    await screen.findByRole("button", { name: "Mute sound" });
    const music = screen.getByTestId("ambient-music-audio");
    const narration = screen.getByTestId("host-introduction-audio");

    fireEvent.ended(narration);
    expect(music).toHaveProperty("volume", 0.09);
    const replay = screen.getByRole("button", { name: "Replay welcome" });
    narration.currentTime = 8;
    fireEvent.click(replay);

    await waitFor(() => expect(play).toHaveBeenCalledTimes(3));
    expect(narration).toHaveProperty("currentTime", 0);
    expect(music).toHaveProperty("volume", 0.035);
  });

  it("keeps whichever audio channel remains available and reports spoken failure", async () => {
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockResolvedValue();

    render(<WelcomeSound active />);
    await screen.findByRole("button", { name: "Mute sound" });
    fireEvent.error(screen.getByTestId("host-introduction-audio"));

    expect(screen.getByText("Spoken welcome unavailable")).toBeVisible();
    expect(screen.getByRole("button", { name: "Mute sound" })).toBeVisible();
    fireEvent.error(screen.getByTestId("ambient-music-audio"));
    expect(screen.getByText("Audio unavailable")).toBeVisible();
  });

  it("does not start while inactive and pauses both tracks during cleanup", async () => {
    const play = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockResolvedValue();
    const pause = vi.mocked(window.HTMLMediaElement.prototype.pause);

    const { rerender, unmount } = render(<WelcomeSound active={false} />);
    await Promise.resolve();
    expect(play).not.toHaveBeenCalled();

    rerender(<WelcomeSound active />);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(2));
    pause.mockClear();
    unmount();
    await waitFor(() => expect(pause).toHaveBeenCalledTimes(2));
  });
});

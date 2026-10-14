import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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

afterEach(() => {
  cleanup();
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
      await screen.findByRole("button", { name: "Start sound" }),
    ).toBeVisible();
    play.mockResolvedValue(undefined);
    fireEvent.click(screen.getByRole("button", { name: "Explore trips" }));

    await waitFor(() => expect(play).toHaveBeenCalledTimes(4));
    expect(screen.getByRole("button", { name: "Mute sound" })).toBeVisible();
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
    expect(pause).toHaveBeenCalledTimes(2);
  });
});

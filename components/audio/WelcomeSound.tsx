"use client";

import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const AMBIENT_AUDIO = "/audio/gamya-ambient-journey.mp3";
const HOST_AUDIO = "/audio/gamya-host-introduction.mp3";
const INTRO_PLAYED_KEY = "gamya-sanchari-welcome-played";
const SOUND_PREFERENCE_KEY = "gamya-sanchari-sound";
const DUCKED_MUSIC_VOLUME = 0.035;
const RESTING_MUSIC_VOLUME = 0.09;

type SoundState =
  | "idle"
  | "starting"
  | "playing"
  | "blocked"
  | "muted"
  | "error";

type IntroductionState = "pending" | "playing" | "played" | "error";

export type WelcomeSoundProps = {
  active: boolean;
  className?: string;
};

function readSession(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Private browsing and storage policies must not disable audio controls.
  }
}

function removeSession(key: string) {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // The in-memory state still reflects the visitor's choice.
  }
}

export default function WelcomeSound({
  active,
  className = "",
}: WelcomeSoundProps) {
  const musicRef = useRef<HTMLAudioElement>(null);
  const narrationRef = useRef<HTMLAudioElement>(null);
  const attemptedRef = useRef(false);
  const startingRef = useRef(false);
  const musicFailedRef = useRef(false);
  const narrationFailedRef = useRef(false);
  const [soundState, setSoundState] = useState<SoundState>("idle");
  const [introductionState, setIntroductionState] =
    useState<IntroductionState>("pending");

  const startExperience = useCallback(async (userInitiated = false) => {
    const music = musicRef.current;
    const narration = narrationRef.current;
    if (!music || !narration || startingRef.current) return;

    startingRef.current = true;
    setSoundState("starting");
    const introductionPlayed = readSession(INTRO_PLAYED_KEY) === "played";
    if (introductionPlayed) setIntroductionState("played");

    music.volume = introductionPlayed
      ? RESTING_MUSIC_VOLUME
      : DUCKED_MUSIC_VOLUME;
    narration.volume = 1;

    const channels: Array<{
      kind: "music" | "narration";
      media: HTMLAudioElement;
      promise: Promise<void>;
    }> = [];

    if (!musicFailedRef.current) {
      channels.push({ kind: "music", media: music, promise: music.play() });
    }
    if (!introductionPlayed && !narrationFailedRef.current) {
      narration.currentTime = 0;
      channels.push({
        kind: "narration",
        media: narration,
        promise: narration.play(),
      });
    }

    const results = await Promise.allSettled(
      channels.map(({ promise }) => promise),
    );
    const rejected = results.some((result) => result.status === "rejected");

    if (rejected && !userInitiated) {
      channels.forEach(({ media }) => media.pause());
      setSoundState("blocked");
      startingRef.current = false;
      return;
    }

    results.forEach((result, index) => {
      const channel = channels[index];
      if (result.status === "fulfilled" && channel.kind === "narration") {
        writeSession(INTRO_PLAYED_KEY, "played");
        setIntroductionState("playing");
      }
      if (result.status === "rejected" && channel.kind === "music") {
        musicFailedRef.current = true;
      }
      if (result.status === "rejected" && channel.kind === "narration") {
        narrationFailedRef.current = true;
        setIntroductionState("error");
      }
    });

    setSoundState(
      musicFailedRef.current && narrationFailedRef.current ? "error" : "playing",
    );
    startingRef.current = false;
  }, []);

  useEffect(() => {
    if (!active || attemptedRef.current) return;
    attemptedRef.current = true;

    if (readSession(SOUND_PREFERENCE_KEY) === "muted") {
      if (readSession(INTRO_PLAYED_KEY) === "played") {
        setIntroductionState("played");
      }
      setSoundState("muted");
      return;
    }

    void startExperience();
  }, [active, startExperience]);

  useEffect(() => {
    if (soundState !== "blocked") return;

    const retry = (event: MouseEvent | KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("[data-sound-control]")
      ) {
        return;
      }
      void startExperience(true);
    };

    document.addEventListener("click", retry, { once: true });
    document.addEventListener("keydown", retry, { once: true });
    return () => {
      document.removeEventListener("click", retry);
      document.removeEventListener("keydown", retry);
    };
  }, [soundState, startExperience]);

  useEffect(() => {
    const music = musicRef.current;
    const narration = narrationRef.current;
    return () => {
      music?.pause();
      narration?.pause();
    };
  }, []);

  function toggleSound() {
    const music = musicRef.current;
    const narration = narrationRef.current;
    if (!music || !narration || soundState === "starting") return;

    if (soundState === "playing") {
      music.pause();
      narration.pause();
      writeSession(SOUND_PREFERENCE_KEY, "muted");
      setSoundState("muted");
      return;
    }

    removeSession(SOUND_PREFERENCE_KEY);
    void startExperience(true);
  }

  async function replayIntroduction() {
    const music = musicRef.current;
    const narration = narrationRef.current;
    if (!music || !narration || narrationFailedRef.current) return;

    removeSession(SOUND_PREFERENCE_KEY);
    music.volume = DUCKED_MUSIC_VOLUME;
    narration.currentTime = 0;
    setSoundState("starting");
    const results = await Promise.allSettled([
      musicFailedRef.current || soundState === "playing"
        ? Promise.resolve()
        : music.play(),
      narration.play(),
    ]);
    if (results[1].status === "rejected") {
      narrationFailedRef.current = true;
      setIntroductionState("error");
      setSoundState(musicFailedRef.current ? "error" : "playing");
      return;
    }

    writeSession(INTRO_PLAYED_KEY, "played");
    setIntroductionState("playing");
    setSoundState("playing");
  }

  function handleNarrationEnded() {
    setIntroductionState("played");
    if (musicRef.current) musicRef.current.volume = RESTING_MUSIC_VOLUME;
  }

  function handleNarrationError() {
    narrationFailedRef.current = true;
    setIntroductionState("error");
    if (musicRef.current) musicRef.current.volume = RESTING_MUSIC_VOLUME;
    if (musicFailedRef.current) setSoundState("error");
  }

  function handleMusicError() {
    musicFailedRef.current = true;
    if (narrationFailedRef.current) setSoundState("error");
  }

  const buttonLabel =
    soundState === "blocked"
      ? "Start sound"
      : soundState === "muted" || soundState === "idle"
        ? "Turn sound on"
        : soundState === "starting"
          ? "Starting sound"
          : "Mute sound";

  return (
    <div className={`mt-3 ${className}`.trim()} data-testid="welcome-sound">
      <audio
        data-testid="ambient-music-audio"
        loop
        onError={handleMusicError}
        preload="auto"
        ref={musicRef}
        src={AMBIENT_AUDIO}
      />
      <audio
        data-testid="host-introduction-audio"
        onEnded={handleNarrationEnded}
        onError={handleNarrationError}
        preload="auto"
        ref={narrationRef}
        src={HOST_AUDIO}
      />

      {soundState === "error" ? (
        <p className="text-xs font-bold text-[#5b6476]" role="status">
          Audio unavailable
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <button
            aria-label={buttonLabel}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1844ef] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1844ef] disabled:cursor-wait disabled:opacity-70"
            data-sound-control
            disabled={soundState === "starting"}
            onClick={toggleSound}
            type="button"
          >
            {soundState === "playing" ? (
              <VolumeX aria-hidden="true" size={17} />
            ) : (
              <Volume2 aria-hidden="true" size={17} />
            )}
            {buttonLabel}
          </button>
          {introductionState === "played" ? (
            <button
              aria-label="Replay welcome"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#1844ef]/20 px-4 py-2 text-sm font-extrabold text-[#1844ef] transition hover:border-[#f06619] hover:text-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1844ef]"
              data-sound-control
              onClick={() => void replayIntroduction()}
              type="button"
            >
              <RotateCcw aria-hidden="true" size={16} />
              Replay welcome
            </button>
          ) : null}
        </div>
      )}

      {soundState === "blocked" ? (
        <p className="mt-2 text-xs font-semibold text-[#5b6476]" role="status">
          Your browser paused the welcome. Tap or press any key to begin.
        </p>
      ) : null}
      {introductionState === "error" ? (
        <p className="mt-2 text-xs font-semibold text-[#5b6476]" role="status">
          Spoken welcome unavailable
        </p>
      ) : null}
    </div>
  );
}

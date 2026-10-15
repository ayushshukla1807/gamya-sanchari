"use client";

import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  const attemptRef = useRef(0);
  const lifecycleRef = useRef(0);
  const musicFailedRef = useRef(false);
  const narrationFailedRef = useRef(false);
  const soundStateRef = useRef<SoundState>("idle");
  const introductionStateRef = useRef<IntroductionState>("pending");
  const [soundState, setSoundState] = useState<SoundState>("idle");
  const [introductionState, setIntroductionState] =
    useState<IntroductionState>("pending");

  const transitionSound = useCallback((next: SoundState) => {
    soundStateRef.current = next;
    setSoundState(next);
  }, []);

  const transitionIntroduction = useCallback((next: IntroductionState) => {
    introductionStateRef.current = next;
    setIntroductionState(next);
  }, []);

  const startExperience = useCallback(
    ({ forceNarration = false }: { forceNarration?: boolean } = {}) => {
      const music = musicRef.current;
      const narration = narrationRef.current;
      if (!music || !narration) return;

      const attempt = ++attemptRef.current;
      const introductionPlayed =
        !forceNarration && readSession(INTRO_PLAYED_KEY) === "played";
      const shouldNarrate =
        !introductionPlayed && !narrationFailedRef.current;
      const shouldStartMusic =
        !musicFailedRef.current && soundStateRef.current !== "playing";

      if (introductionPlayed) transitionIntroduction("played");
      music.volume = shouldNarrate
        ? DUCKED_MUSIC_VOLUME
        : RESTING_MUSIC_VOLUME;
      narration.volume = 1;
      transitionSound("starting");

      const blockAttempt = () => {
        if (attempt !== attemptRef.current) return;
        attemptRef.current += 1;
        music.pause();
        narration.pause();
        if (introductionStateRef.current === "playing") {
          removeSession(INTRO_PLAYED_KEY);
          transitionIntroduction("pending");
        }
        transitionSound("blocked");
      };

      const startChannel = (
        kind: "music" | "narration",
        media: HTMLMediaElement,
      ) => {
        let playback: Promise<void>;
        try {
          playback = Promise.resolve(media.play());
        } catch {
          blockAttempt();
          return;
        }

        void playback
          .then(() => {
            if (attempt !== attemptRef.current) return;
            if (kind === "narration") {
              transitionIntroduction("playing");
            }
            transitionSound("playing");
          })
          .catch(() => {
            if (attempt !== attemptRef.current) return;
            const hasMediaError =
              kind === "music"
                ? musicFailedRef.current
                : narrationFailedRef.current;
            if (hasMediaError) {
              if (musicFailedRef.current && narrationFailedRef.current) {
                transitionSound("error");
              }
              return;
            }
            blockAttempt();
          });
      };

      let channelCount = 0;
      if (shouldStartMusic) {
        channelCount += 1;
        startChannel("music", music);
      }
      if (shouldNarrate) {
        channelCount += 1;
        startChannel("narration", narration);
      }
      if (channelCount === 0) {
        transitionSound(
          musicFailedRef.current && narrationFailedRef.current
            ? "error"
            : "playing",
        );
      }
    },
    [transitionIntroduction, transitionSound],
  );

  useEffect(() => {
    if (!active) return;
    lifecycleRef.current += 1;

    if (readSession(SOUND_PREFERENCE_KEY) === "muted") {
      if (readSession(INTRO_PLAYED_KEY) === "played") {
        transitionIntroduction("played");
      }
      transitionSound("muted");
      return;
    }

    const music = musicRef.current;
    const narration = narrationRef.current;
    if (soundStateRef.current !== "starting") startExperience();
    return () => {
      const cleanupLifecycle = ++lifecycleRef.current;
      queueMicrotask(() => {
        if (lifecycleRef.current !== cleanupLifecycle) return;
        attemptRef.current += 1;
        music?.pause();
        narration?.pause();
      });
    };
  }, [active, startExperience, transitionIntroduction, transitionSound]);

  function toggleSound() {
    const music = musicRef.current;
    const narration = narrationRef.current;
    if (!music || !narration) return;

    if (soundState === "playing" || soundState === "starting") {
      attemptRef.current += 1;
      music.pause();
      narration.pause();
      writeSession(SOUND_PREFERENCE_KEY, "muted");
      if (introductionStateRef.current === "playing") {
        removeSession(INTRO_PLAYED_KEY);
        transitionIntroduction("pending");
      }
      transitionSound("muted");
      return;
    }

    removeSession(SOUND_PREFERENCE_KEY);
    startExperience();
  }

  function replayIntroduction() {
    const narration = narrationRef.current;
    if (!narration || narrationFailedRef.current) return;

    removeSession(SOUND_PREFERENCE_KEY);
    narration.currentTime = 0;
    removeSession(INTRO_PLAYED_KEY);
    transitionIntroduction("pending");
    startExperience({ forceNarration: true });
  }

  function handleNarrationEnded() {
    transitionIntroduction("played");
    writeSession(INTRO_PLAYED_KEY, "played");
    if (musicRef.current) musicRef.current.volume = RESTING_MUSIC_VOLUME;
  }

  function handleNarrationError() {
    narrationFailedRef.current = true;
    transitionIntroduction("error");
    if (musicRef.current) musicRef.current.volume = RESTING_MUSIC_VOLUME;
    if (musicFailedRef.current) transitionSound("error");
  }

  function handleMusicError() {
    musicFailedRef.current = true;
    if (narrationFailedRef.current) transitionSound("error");
  }

  const buttonLabel =
    soundState === "blocked"
      ? "Enter with sound"
      : soundState === "muted" || soundState === "idle"
        ? "Turn sound on"
        : "Mute sound";

  const soundControls =
    soundState === "error" ? (
      <p className="text-xs font-bold text-[#5b6476]" role="status">
        Audio unavailable
      </p>
    ) : (
      <div className="flex flex-wrap items-center gap-2">
        <button
          aria-label={buttonLabel}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1844ef] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1844ef] disabled:cursor-wait disabled:opacity-70"
          data-sound-control
          onClick={toggleSound}
          type="button"
        >
          {soundState === "playing" || soundState === "starting" ? (
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
            onClick={replayIntroduction}
            type="button"
          >
            <RotateCcw aria-hidden="true" size={16} />
            Replay welcome
          </button>
        ) : null}
      </div>
    );

  const soundDock = (
    <div
      className={
        soundState === "blocked"
          ? "fixed inset-x-4 bottom-5 z-[90] mx-auto max-w-sm rounded-[1.5rem] border border-white/40 bg-white/95 p-3 shadow-[0_24px_80px_rgba(7,16,39,0.34)] backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:mx-0"
          : "fixed bottom-5 right-4 z-[90] rounded-full border border-white/40 bg-white/95 p-2 shadow-[0_18px_56px_rgba(7,16,39,0.28)] backdrop-blur-xl sm:right-6"
      }
      data-testid="sound-dock"
    >
      {soundControls}
      {soundState === "blocked" ? (
        <p
          aria-live="assertive"
          className="mt-2 text-xs font-semibold text-[#5b6476]"
          role="status"
        >
          Begin with the spoken welcome and soft ambient music.
        </p>
      ) : null}
    </div>
  );

  return (
    <div
      className={`mt-3 ${className}`.trim()}
      data-testid="welcome-sound"
    >
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

      {active &&
      soundState !== "idle" &&
      soundState !== "error" &&
      typeof document !== "undefined"
        ? createPortal(soundDock, document.body)
        : soundState === "error"
          ? soundControls
          : null}
      {introductionState === "error" ? (
        <p className="mt-2 text-xs font-semibold text-[#5b6476]" role="status">
          Spoken welcome unavailable
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Map, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { BRAND } from "@/constants/brand";
import { useMotionPolicy } from "@/components/motion/MotionProvider";

const ANNOUNCEMENTS = [
  "✈️ Ladies and gentlemen, this is your captain speaking…",
  "We are now beginning our descent into your dream destination.",
  "ಗಮ್ಯ ಸಂಚಾರಿ — Your Journey Awaits.",
] as const;

const WHATSAPP_CTA =
  "https://wa.me/918073254766?text=Hi%20Gamya%20Sanchari!%20I%20want%20to%20plan%20a%20trip.";

const HOST_INTRODUCTION =
  "Namaskara, and welcome to Gamya Sanchari. Tell us how you dream of travelling. We'll thoughtfully bring together your flights, stays, transfers, and experiences, so your journey feels truly yours.";

const HOST_AUDIO = "/audio/gamya-host-introduction.mp3";

function AnnouncementSequence({
  onComplete,
}: {
  onComplete: (visible: boolean) => void;
}) {
  const policy = useMotionPolicy();
  const [announcement, setAnnouncement] = useState<number | null>(0);

  useEffect(() => {
    if (!policy.autoAnnouncements) {
      setAnnouncement(null);
      onComplete(true);
      return;
    }

    setAnnouncement(0);
    onComplete(false);
    const timers = ANNOUNCEMENTS.map((_, index) =>
      window.setTimeout(
        () => {
          setAnnouncement(
            index + 1 < ANNOUNCEMENTS.length ? index + 1 : null,
          );
          if (index + 1 === ANNOUNCEMENTS.length) onComplete(true);
        },
        (index + 1) * 2200,
      ),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [onComplete, policy.autoAnnouncements]);

  if (announcement === null) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-24 z-[60] flex justify-center px-5 sm:top-28 sm:px-8">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl rounded-full border border-white/15 bg-[#071027]/70 px-5 py-3 text-center shadow-2xl backdrop-blur-md sm:px-8 sm:py-4"
        data-testid="announcement-message"
        initial={{ opacity: 0, y: 18 }}
        key={announcement}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <p className="text-balance text-sm font-bold leading-tight sm:text-xl lg:text-2xl">
          {ANNOUNCEMENTS[announcement]}
        </p>
      </motion.div>
    </div>
  );
}

function TravelHost() {
  const policy = useMotionPolicy();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio && !audio.paused) audio.pause();
    };
  }, []);

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio || audioFailed) return;

    if (isSpeaking) {
      audio.pause();
      audio.currentTime = 0;
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    void audio.play().catch(() => {
      setAudioFailed(true);
      setIsSpeaking(false);
    });
  }

  return (
    <motion.aside
      animate={{ opacity: 1, x: 0 }}
      aria-label="Gamya Sanchari travel host"
      className="absolute inset-x-0 bottom-0 z-20 grid min-h-56 grid-cols-[minmax(108px,0.42fr)_minmax(0,1fr)] items-end overflow-hidden rounded-[2rem] border border-white/15 bg-[#071027]/90 shadow-2xl backdrop-blur-md sm:min-h-64 sm:grid-cols-[minmax(160px,0.45fr)_minmax(0,1fr)] lg:relative lg:inset-auto lg:z-auto lg:mt-0 lg:block lg:min-h-[64svh] lg:overflow-visible lg:border-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-none"
      data-testid="travel-host"
      initial={policy.reduced ? false : { opacity: 0, x: 120 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative h-full min-h-52 max-[380px]:hidden sm:min-h-64 lg:absolute lg:inset-y-0 lg:left-[38%] lg:right-0 lg:min-h-0" data-testid="travel-host-portrait">
        <Image
          alt=""
          className="object-contain object-bottom"
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 42vw"
          src="/images/travel-host.webp"
        />
      </div>

      <div className="relative z-10 m-3 ml-0 rounded-3xl border border-white/15 bg-white/95 p-4 text-[#212121] shadow-2xl sm:m-5 sm:ml-0 sm:p-5 lg:absolute lg:left-0 lg:top-[17%] lg:m-0 lg:w-[62%]">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1844ef]">
          Your personal travel host
        </p>
        <p
          className="mt-2 text-sm font-semibold leading-6 sm:text-base"
          data-testid="travel-host-caption"
        >
          {HOST_INTRODUCTION}
        </p>
        <audio
          data-testid="host-introduction-audio"
          onEnded={() => setIsSpeaking(false)}
          onError={() => {
            setAudioFailed(true);
            setIsSpeaking(false);
          }}
          preload="none"
          ref={audioRef}
          src={HOST_AUDIO}
        />
        {!audioFailed ? (
          <button
            aria-label={isSpeaking ? "Stop introduction" : "Hear the host"}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1844ef] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1844ef]"
            onClick={toggleAudio}
            type="button"
          >
            {isSpeaking ? (
              <VolumeX aria-hidden="true" size={17} />
            ) : (
              <Volume2 aria-hidden="true" size={17} />
            )}
            {isSpeaking ? "Stop" : "Hear the host"}
          </button>
        ) : (
          <p className="mt-3 text-xs font-bold text-[#5b6476]">
            Audio introduction unavailable
          </p>
        )}
        <a
          className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full border border-[#1844ef]/20 px-4 py-2 text-sm font-extrabold text-[#1844ef] transition hover:border-[#f06619] hover:text-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1844ef]"
          href={WHATSAPP_CTA}
          rel="noreferrer"
          target="_blank"
        >
          Plan with me
        </a>
      </div>
    </motion.aside>
  );
}

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [showHost, setShowHost] = useState(false);

  return (
    <>
      <section
        className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#10182a] text-white"
        id="home"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          data-testid="hero-media"
          style={{ backgroundImage: 'url("/images/hero-poster.webp")' }}
        >
          <video
            aria-hidden="true"
            autoPlay
            className={`h-full w-full object-cover ${videoFailed ? "hidden" : "hidden sm:block"}`}
            loop
            muted
            onError={() => setVideoFailed(true)}
            playsInline
            poster="/images/hero-poster.webp"
            preload="metadata"
          >
            <source
              media="(min-width: 640px)"
              src="/videos/hero.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,20,0.25)_0%,rgba(3,8,20,0.52)_44%,rgba(3,8,20,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(240,102,25,0.22),transparent_38%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-end gap-8 px-5 pb-14 pt-36 sm:px-8 sm:pb-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(390px,0.92fr)] lg:px-12 lg:pb-6 lg:pt-28">
          <div className="max-w-4xl lg:pb-8">
            <p className="mb-5 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.22em] text-white/75">
              <span className="h-px w-10 bg-[#f06619]" />
              {BRAND.nameKannada} · Bengaluru
            </p>
            <h1 className="text-balance text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-6xl xl:text-7xl">
              Enjoy your holidays with{" "}
              <span className="text-[#f9a36f]">GAMYA SANCHARI</span>
            </h1>
            <p className="mt-6 text-base font-bold uppercase tracking-[0.18em] text-white/80 sm:text-lg">
              Domestic | International | Experiences
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              We listen first, then plan—bringing flights, stays, transfers and
              experiences together around the way you want to travel.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1844ef] px-7 py-3 font-extrabold text-white shadow-xl shadow-[#1844ef]/20 transition hover:bg-[#f06619] focus-visible:bg-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                href="/plan-my-trip/"
              >
                Plan My Trip
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 font-extrabold text-white backdrop-blur-md transition hover:border-[#f06619] hover:bg-[#f06619] focus-visible:bg-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                href="/destinations/"
              >
                <Map aria-hidden="true" size={19} />
                Explore Destinations
              </a>
            </div>
          </div>
          {showHost ? <TravelHost /> : null}
        </div>
      </section>
      <AnnouncementSequence onComplete={setShowHost} />
    </>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { BRAND } from "@/constants/brand";

const ANNOUNCEMENTS = [
  "✈️ Ladies and gentlemen, this is your captain speaking…",
  "We are now beginning our descent into your dream destination.",
  "ಗಮ್ಯ ಸಂಚಾರಿ — Your Journey Awaits.",
] as const;

const WHATSAPP_CTA =
  "https://wa.me/918073254766?text=Hi%20Gamya%20Sanchari!%20I%20want%20to%20plan%20a%20trip.";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [announcement, setAnnouncement] = useState<number | null>(0);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setAnnouncement(null);
      return;
    }

    setAnnouncement(0);
    const timers = ANNOUNCEMENTS.map((_, index) =>
      window.setTimeout(
        () =>
          setAnnouncement(
            index + 1 < ANNOUNCEMENTS.length ? index + 1 : null,
          ),
        (index + 1) * 2200,
      ),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduceMotion]);

  return (
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
          className={`h-full w-full object-cover ${videoFailed ? "hidden" : ""}`}
          loop
          muted
          onError={() => setVideoFailed(true)}
          playsInline
          poster="/images/hero-poster.webp"
          preload="metadata"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,20,0.25)_0%,rgba(3,8,20,0.52)_44%,rgba(3,8,20,0.94)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(240,102,25,0.22),transparent_38%)]" />

      {announcement !== null ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute inset-0 z-20 grid place-items-center bg-[#071027]/35 px-6 text-center backdrop-blur-[2px]"
          data-testid="announcement-message"
          initial={{ opacity: 0, y: 18 }}
          key={announcement}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="max-w-4xl text-balance text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {ANNOUNCEMENTS[announcement]}
          </p>
        </motion.div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-14 pt-36 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="max-w-4xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.22em] text-white/75">
            <span className="h-px w-10 bg-[#f06619]" />
            {BRAND.nameKannada} · Bengaluru
          </p>
          <h1 className="text-balance text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
            Enjoy your holidays with <span className="text-[#f9a36f]">GAMYA SANCHARI</span>
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
              href="#destinations"
            >
              Explore Destinations
              <ArrowDown aria-hidden="true" size={18} />
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 font-extrabold text-white backdrop-blur-md transition hover:border-[#f06619] hover:bg-[#f06619] focus-visible:bg-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href={WHATSAPP_CTA}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" size={19} />
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

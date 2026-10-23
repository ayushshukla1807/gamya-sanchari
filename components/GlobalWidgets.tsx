"use client";

import { ArrowUp, Mail, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";

import { BRAND } from "@/constants/brand";
import { useMotionPolicy } from "@/components/motion/MotionProvider";

import { useEnquiry } from "./enquiry/EnquiryProvider";

export default function GlobalWidgets() {
  const { openEnquiry } = useEnquiry();
  const motionPolicy = useMotionPolicy();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [quietRoute, setQuietRoute] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setQuietRoute(
      ["/plan-my-trip", "/plan-my-trip/", "/contact", "/contact/"].includes(
        window.location.pathname,
      ),
    );
  }, []);

  return (
    <>
      <a
        aria-label="Chat on WhatsApp"
        className={`fixed bottom-5 left-5 z-40 grid min-h-12 min-w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-xl shadow-[#3f2a20]/20 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366] ${quietRoute ? "opacity-55" : ""}`}
        href={BRAND.whatsappHref}
        rel="noreferrer"
        target="_blank"
      >
        <MessageCircle aria-hidden="true" size={25} />
      </a>

      <aside
        aria-label="Quick enquiry actions"
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 overflow-hidden rounded-l-2xl border border-white/15 bg-[#33483a]/95 text-white shadow-2xl backdrop-blur-md sm:block"
      >
        <button
          className="flex min-h-11 w-full items-center gap-2 border-b border-white/10 px-4 py-3 text-sm font-bold transition hover:bg-[#f06619] focus-visible:bg-[#f06619] focus-visible:outline-none"
          onClick={() => openEnquiry()}
          type="button"
        >
          <Send aria-hidden="true" size={16} /> Enquire Now
        </button>
        <a
          className="flex min-h-11 items-center gap-2 border-b border-white/10 px-4 py-3 text-sm font-bold transition hover:bg-[#25d366] focus-visible:bg-[#25d366] focus-visible:outline-none"
          href={BRAND.whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircle aria-hidden="true" size={16} /> WhatsApp
        </a>
        <a
          className="flex min-h-11 items-center gap-2 px-4 py-3 text-sm font-bold transition hover:bg-[#a63d24] focus-visible:bg-[#a63d24] focus-visible:outline-none"
        href="/contact/"
        >
          <Mail aria-hidden="true" size={16} /> Contact Us
        </a>
      </aside>

      {showBackToTop ? (
        <button
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 grid min-h-11 min-w-11 place-items-center rounded-full bg-[#3f2a20] text-white shadow-xl transition hover:bg-[#a63d24] focus-visible:bg-[#a63d24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a63d24]"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: motionPolicy.smoothScroll ? "smooth" : "auto" })
          }
          type="button"
        >
          <ArrowUp aria-hidden="true" size={20} />
        </button>
      ) : null}
    </>
  );
}

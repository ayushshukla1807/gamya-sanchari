"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BRAND } from "@/constants/brand";
import { NAV_LINKS } from "@/constants/content";
import { useMotionPolicy } from "@/components/motion/MotionProvider";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const policy = useMotionPolicy();
  const canAnimateMenu =
    !policy.reduced && typeof IntersectionObserver !== "undefined";

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const links = NAV_LINKS.map((link) => {
    const primary = link.href === "/plan-my-trip/";
    const compact = link.href === "/group-departures/";
    return (
      <motion.li key={link.href} whileHover={policy.reduced ? undefined : { y: -2 }}>
        <a
          className={
            primary
              ? "inline-flex min-h-11 items-center rounded-full bg-[#f06619] px-5 text-sm font-extrabold text-white shadow-lg shadow-[#f06619]/20 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0b1633] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              : `inline-flex min-h-11 items-center rounded-full font-bold text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f5ad56] ${compact ? "px-3 text-xs" : "px-4 text-sm"}`
          }
          data-primary-action={primary ? "true" : undefined}
          href={link.href}
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </a>
      </motion.li>
    );
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#081329]/80 text-white shadow-lg shadow-black/5 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12"
      >
        <Link
          className="flex min-h-11 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5ad56]"
          href="/"
        >
          <motion.span
            className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1 shadow-lg shadow-[#1844ef]/20"
            whileHover={policy.reduced ? undefined : { rotate: -4, scale: 1.06 }}
          >
            <Image
              alt="Gamya Sanchari"
              height={48}
              priority
              src="/images/brand/gamya-sanchari-emblem.png"
              width={52}
            />
          </motion.span>
          <span className="grid leading-tight">
            <span className="text-sm font-extrabold tracking-wide sm:text-base">
              {BRAND.name}
            </span>
            <span className="text-[0.65rem] font-semibold text-white/65 sm:text-xs">
              {BRAND.nameKannada} · {BRAND.descriptor}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">{links}</ul>

        <motion.button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="grid min-h-11 min-w-11 place-items-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5ad56] xl:hidden"
          onClick={() => setIsOpen((current) => !current)}
          ref={menuButtonRef}
          type="button"
          whileTap={policy.reduced ? undefined : { scale: 0.9 }}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </motion.button>
      </nav>

      {isOpen ? (
        <motion.nav
          animate={{ opacity: 1, y: 0 }}
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-[#081329]/98 px-5 pb-5 pt-3 backdrop-blur-xl xl:hidden"
          id="mobile-navigation"
          initial={canAnimateMenu ? { opacity: 0, y: -10 } : false}
          transition={{ duration: 0.22 }}
        >
          <ul className="mx-auto grid max-w-[1440px] gap-1">{links}</ul>
        </motion.nav>
      ) : null}
    </header>
  );
}

"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BRAND } from "@/constants/brand";
import { NAV_LINKS } from "@/constants/content";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0d1730]/70 text-white shadow-lg shadow-black/5 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
      >
        <a
          className="flex min-h-11 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f06619]"
          href="#home"
        >
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-[#1844ef] text-sm font-extrabold shadow-lg shadow-[#1844ef]/30"
          >
            GS
          </span>
          <span className="grid leading-tight">
            <span className="text-sm font-extrabold tracking-wide sm:text-base">
              {BRAND.name}
            </span>
            <span className="text-[0.65rem] font-semibold text-white/70 sm:text-xs">
              {BRAND.nameKannada} · {BRAND.descriptor}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f06619]"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="grid min-h-11 min-w-11 place-items-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f06619] lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          ref={menuButtonRef}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {isOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-[#0d1730]/95 px-5 pb-5 pt-3 backdrop-blur-xl lg:hidden"
          id="mobile-navigation"
        >
          <ul className="mx-auto grid max-w-[1440px] gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  className="flex min-h-11 items-center rounded-xl px-4 font-bold text-white/85 transition hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f06619]"
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

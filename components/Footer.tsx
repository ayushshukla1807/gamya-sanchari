import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { BRAND } from "@/constants/brand";
import { NAV_LINKS } from "@/constants/content";

import { RequestCallForm } from "./enquiry/RequestCallForm";

export default function Footer() {
  return (
    <footer className="scroll-mt-20 bg-[#0b1226] text-white" id="contact">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.25fr_0.7fr_0.8fr_1.05fr]">
          <div>
            <a className="inline-flex items-center gap-3" href="#home">
              <span className="grid size-12 place-items-center rounded-full bg-[#1844ef] font-extrabold">
                GS
              </span>
              <span className="grid leading-tight">
                <span className="font-extrabold">{BRAND.name}</span>
                <span className="text-xs text-white/60">
                  {BRAND.nameKannada} · {BRAND.descriptor}
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
              Bengaluru-based travel planning for holidays that fit your people,
              pace and budget. One point of contact, clear costs and support when
              you need it.
            </p>
            <p className="mt-5 max-w-sm font-bold leading-7 text-white/85">
              {BRAND.blessing}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                aria-label="Instagram"
                className="grid min-h-11 min-w-11 place-items-center rounded-full border border-white/15 transition hover:border-[#f06619] hover:bg-[#f06619] focus-visible:bg-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href={BRAND.instagram}
                rel="noreferrer"
                target="_blank"
              >
                <Instagram aria-hidden="true" size={19} />
              </a>
              <a
                aria-label="WhatsApp"
                className="grid min-h-11 min-w-11 place-items-center rounded-full border border-white/15 transition hover:border-[#25d366] hover:bg-[#25d366] focus-visible:bg-[#25d366] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href={BRAND.whatsappHref}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" size={19} />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/45">
              Quick Links
            </h2>
            <ul className="mt-5 grid gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    className="inline-flex min-h-11 items-center text-sm font-bold text-white/75 transition hover:text-[#ffad7d] focus-visible:text-[#ffad7d] focus-visible:outline-none"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/45">
              Contact
            </h2>
            <ul className="mt-5 grid gap-4 text-sm text-white/75">
              <li>
                <a className="flex min-h-11 items-center gap-3 hover:text-white" href={BRAND.phoneHref}>
                  <Phone aria-hidden="true" className="shrink-0 text-[#ffad7d]" size={18} />
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li>
                <a className="flex min-h-11 items-center gap-3 break-all hover:text-white" href={BRAND.emailHref}>
                  <Mail aria-hidden="true" className="shrink-0 text-[#ffad7d]" size={18} />
                  {BRAND.email}
                </a>
              </li>
              <li className="flex min-h-11 items-start gap-3 pt-3">
                <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-[#ffad7d]" size={18} />
                {BRAND.location}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/45">
              Request a Call
            </h2>
            <p className="mt-5 text-sm leading-6 text-white/65">
              Leave your number and continue on WhatsApp with a callback request
              ready to send.
            </p>
            <div className="mt-5">
              <RequestCallForm />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Gamya Sanchari. All rights reserved.</p>
          <p>Made with care in Bengaluru, Karnataka, India.</p>
        </div>
      </div>
    </footer>
  );
}

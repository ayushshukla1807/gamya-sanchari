import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { RequestCallForm } from "@/components/enquiry/RequestCallForm";
import { BRAND } from "@/constants/brand";
import { NAV_LINKS } from "@/constants/content";

export default function SiteFooter() {
  return (
    <footer className="bg-[#071126] text-white" id="contact">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_0.75fr_0.8fr_1.05fr]">
          <div>
            <Link className="inline-flex items-center gap-3" href="/">
              <span className="grid size-12 place-items-center rounded-full bg-[#1844ef] font-extrabold">GS</span>
              <span className="grid leading-tight"><span className="font-extrabold">{BRAND.name}</span><span className="text-xs text-white/60">{BRAND.nameKannada} · {BRAND.descriptor}</span></span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">Bengaluru-based travel planning for journeys that fit your people, pace and priorities.</p>
            <p className="mt-5 max-w-sm font-bold leading-7 text-white/85">{BRAND.blessing}</p>
            <div className="mt-6 flex gap-3">
              <a aria-label="Active campaigns & trip moments" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-bold transition hover:bg-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" href={BRAND.instagram} rel="noreferrer" target="_blank"><Instagram aria-hidden="true" size={19} />Instagram</a>
              <a aria-label="WhatsApp" className="grid min-h-11 min-w-11 place-items-center rounded-full border border-white/15 transition hover:bg-[#25d366] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" href={BRAND.whatsappHref} rel="noreferrer" target="_blank"><MessageCircle aria-hidden="true" size={19} /></a>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/45">Explore</h2>
            <ul className="mt-5 grid gap-1">{NAV_LINKS.map((link) => <li key={link.href}><Link className="inline-flex min-h-11 items-center text-sm font-bold text-white/75 transition hover:text-[#f5ad56]" href={link.href}>{link.label}</Link></li>)}</ul>
            <Link className="inline-flex min-h-11 items-center text-sm font-bold text-white/75 transition hover:text-[#f5ad56]" href="/journal/">Travel Journal</Link>
          </div>
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/45">Contact</h2>
            <ul className="mt-5 grid gap-4 text-sm text-white/75">
              <li><a className="flex min-h-11 items-center gap-3 hover:text-white" href={BRAND.phoneHref}><Phone aria-hidden="true" className="text-[#f5ad56]" size={18} />{BRAND.phoneDisplay}</a></li>
              <li><a className="flex min-h-11 items-center gap-3 break-all hover:text-white" href={BRAND.emailHref}><Mail aria-hidden="true" className="text-[#f5ad56]" size={18} />{BRAND.email}</a></li>
              <li className="flex min-h-11 items-start gap-3 pt-3"><MapPin aria-hidden="true" className="mt-0.5 text-[#f5ad56]" size={18} />{BRAND.location}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/45">Request a Call</h2>
            <p className="mt-5 text-sm leading-6 text-white/65">Prepare a callback request and continue securely in WhatsApp.</p>
            <div className="mt-5"><RequestCallForm /></div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs text-white/45 sm:flex-row sm:justify-between"><p>© 2026 Gamya Sanchari. All rights reserved.</p><p>Made with care in Bengaluru, Karnataka, India.</p></div>
      </div>
    </footer>
  );
}

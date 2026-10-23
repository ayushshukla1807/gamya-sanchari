import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { BRAND } from "@/constants/brand";

const optionClass =
  "group flex min-h-24 items-center gap-4 rounded-[1.5rem] border border-[#3f2a20]/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a63d24]";

export default function ContactOptions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <a className={optionClass} href={BRAND.phoneHref}>
        <Phone aria-hidden="true" className="text-[#f06619]" />
        <span><strong className="block text-[#3f2a20]">Call us</strong>{BRAND.phoneDisplay}</span>
      </a>
      <a className={optionClass} href={BRAND.emailHref}>
        <Mail aria-hidden="true" className="text-[#f06619]" />
        <span className="min-w-0"><strong className="block text-[#3f2a20]">Email us</strong><span className="break-all">{BRAND.email}</span></span>
      </a>
      <a className={optionClass} href={BRAND.whatsappHref} rel="noreferrer" target="_blank">
        <MessageCircle aria-hidden="true" className="text-[#25a85a]" />
        <span><strong className="block text-[#3f2a20]">WhatsApp</strong>Start a conversation</span>
      </a>
      <a className={optionClass} href={BRAND.instagram} rel="noreferrer" target="_blank">
        <Instagram aria-hidden="true" className="text-[#a63d24]" />
        <span><strong className="block text-[#3f2a20]">Instagram</strong>Follow our travel notes</span>
      </a>
      <div className="flex min-h-24 items-center gap-4 rounded-[1.5rem] bg-[#fffaf0] p-5 sm:col-span-2">
        <MapPin aria-hidden="true" className="shrink-0 text-[#f06619]" />
        <span><strong className="block text-[#3f2a20]">Based in Bengaluru</strong>{BRAND.location}</span>
      </div>
    </div>
  );
}

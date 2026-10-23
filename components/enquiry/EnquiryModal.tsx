"use client";

import { X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface EnquiryModalProps {
  context?: string;
  isOpen: boolean;
  onClose(): void;
}

const fieldClass =
  "min-h-12 w-full rounded-2xl border border-[#3f2a20]/10 bg-white px-4 py-3 text-[#3f2a20] outline-none transition focus:border-[#a63d24] focus:ring-4 focus:ring-[#a63d24]/10";

export function EnquiryModal({
  context,
  isOpen,
  onClose,
}: EnquiryModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setMessage(
      context
        ? `I'd like to plan a trip for ${context}.`
        : "I'd like to plan a trip.",
    );
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]',
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [context, isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = buildWhatsAppUrl({ name, phone, email, message, context });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#27372c]/75 p-4 backdrop-blur-sm"
      data-testid="enquiry-overlay"
      onMouseDown={onClose}
    >
      <div
        aria-labelledby="enquiry-title"
        aria-modal="true"
        className="relative my-auto w-full max-w-xl rounded-[2rem] bg-[#f3f3f3] p-6 shadow-2xl sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <button
          aria-label="Close enquiry"
          className="absolute right-4 top-4 grid min-h-11 min-w-11 place-items-center rounded-full text-[#3f2a20] transition hover:bg-[#27372c]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a63d24]"
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" size={22} />
        </button>

        <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#f06619]">
          {context ? `Enquiring about ${context}` : "Start a conversation"}
        </p>
        <h2 className="pr-12 text-3xl font-extrabold text-[#3f2a20]" id="enquiry-title">
          Plan your journey
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#6a594b]">
          Share a few details. We&apos;ll open WhatsApp with your message ready
          to send—nothing is stored here.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-bold text-[#3f2a20]">
            Name
            <input
              autoComplete="name"
              className={fieldClass}
              onChange={(event) => setName(event.target.value)}
              ref={nameRef}
              required
              type="text"
              value={name}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-[#3f2a20]">
            Phone
            <input
              autoComplete="tel"
              className={fieldClass}
              inputMode="tel"
              onChange={(event) => setPhone(event.target.value)}
              required
              type="tel"
              value={phone}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-[#3f2a20]">
            Email (optional)
            <input
              autoComplete="email"
              className={fieldClass}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-[#3f2a20]">
            Message
            <textarea
              className={`${fieldClass} min-h-28 resize-y`}
              onChange={(event) => setMessage(event.target.value)}
              required
              value={message}
            />
          </label>
          <button
            className="mt-2 min-h-12 rounded-full bg-[#a63d24] px-6 py-3 font-extrabold text-white transition hover:bg-[#f06619] focus-visible:bg-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f06619]"
            type="submit"
          >
            Continue on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

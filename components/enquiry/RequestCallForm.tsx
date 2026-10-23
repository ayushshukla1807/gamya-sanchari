"use client";

import { FormEvent, useState } from "react";

import { buildRequestCallUrl } from "@/lib/whatsapp";

export function RequestCallForm() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Opening WhatsApp with your callback request…");
    window.open(
      buildRequestCallUrl(phone),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-sm font-bold text-white">
        Phone number for callback
        <input
          autoComplete="tel"
          className="min-h-12 w-full rounded-full border border-white/20 bg-white/10 px-5 text-white outline-none placeholder:text-white/60 focus:border-white focus:ring-4 focus:ring-white/10"
          inputMode="tel"
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+91 98765 43210"
          required
          type="tel"
          value={phone}
        />
      </label>
      <button
        className="min-h-12 rounded-full bg-[#a63d24] px-5 font-extrabold text-white transition hover:bg-[#f06619] focus-visible:bg-[#f06619] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        type="submit"
      >
        Request a Call
      </button>
      <p className="min-h-5 text-xs leading-5 text-white/70" role="status">
        {status}
      </p>
    </form>
  );
}

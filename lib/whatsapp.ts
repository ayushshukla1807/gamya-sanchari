import { BRAND } from "@/constants/brand";
import type { WhatsAppEnquiry } from "@/types/content";

function withMessage(message: string): string {
  const params = new URLSearchParams({ text: message });
  return `${BRAND.whatsappHref}?${params.toString()}`;
}

export function buildWhatsAppUrl(input: WhatsAppEnquiry): string {
  const lines = [
    "Hi Gamya Sanchari!",
    "",
    `Name: ${input.name.trim()}`,
    `Phone: ${input.phone.trim()}`,
  ];

  if (input.email?.trim()) {
    lines.push(`Email: ${input.email.trim()}`);
  }

  if (input.context?.trim()) {
    lines.push(`Interested in: ${input.context.trim()}`);
  }

  lines.push(`Message: ${input.message.trim()}`);
  return withMessage(lines.join("\n"));
}

export function buildRequestCallUrl(phone: string): string {
  return withMessage(
    `Hi Gamya Sanchari! Please call me back on ${phone.trim()}.`,
  );
}

export function buildJourneyWhatsAppUrl(
  topic: string,
  intent: string,
): string {
  return withMessage(
    `Hi Gamya Sanchari! I’m interested in ${topic.trim()}. ${intent.trim()}.`,
  );
}

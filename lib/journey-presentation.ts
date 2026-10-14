import type { DepartureStatus } from "@/types/travel";

const PRESENTATION = {
  enquire: {
    badge: "Enquire now",
    cta: "Enquire now",
    enquiryIntent: "I’d like to plan this journey",
  },
  "next-on-request": {
    badge: "Next departure on request",
    cta: "Ask for the next departure",
    enquiryIntent: "Please share the next departure",
  },
  previous: {
    badge: "Previous departure",
    cta: "Ask for the next departure",
    enquiryIntent: "Please share the next departure",
  },
} as const satisfies Record<
  DepartureStatus,
  { badge: string; cta: string; enquiryIntent: string }
>;

export function getJourneyPresentation(status: DepartureStatus) {
  return PRESENTATION[status];
}

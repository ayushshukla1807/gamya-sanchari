import { DESTINATIONS, JOURNEYS } from "@/constants/travel";
import { getDestination, getJourney } from "@/lib/travel-content";
import type { PlannerDraft, TravelPace, TravelScope } from "@/types/travel";

export const EMPTY_PLANNER_DRAFT: PlannerDraft = {
  destinationSlug: "",
  journeySlug: "",
  scope: "",
  adults: 2,
  children: 0,
  partyType: "",
  travelMonth: "",
  duration: "",
  flexibleDates: false,
  interests: [],
  pace: "",
  accommodation: "",
  budget: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

function readObject(value: unknown): Record<string, unknown> {
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function text(value: unknown, maxLength = 300) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function count(value: unknown, fallback: number, minimum: number) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(20, Math.max(minimum, Math.trunc(parsed)));
}

export function normalizePlannerDraft(value: unknown): PlannerDraft {
  const source = readObject(value);
  const storedDestination = getDestination(text(source.destinationSlug));
  const storedJourney = getJourney(text(source.journeySlug));
  const destination = storedJourney
    ? getDestination(storedJourney.destinationSlugs[0])
    : storedDestination;
  const validScopes = new Set<PlannerDraft["scope"]>([
    "",
    "domestic",
    "international",
    "help-me-choose",
  ]);
  const scopeCandidate = text(source.scope) as PlannerDraft["scope"];
  const validPaces = new Set<PlannerDraft["pace"]>([
    "",
    "relaxed",
    "balanced",
    "full",
  ]);
  const paceCandidate = text(source.pace) as PlannerDraft["pace"];
  const interests = Array.isArray(source.interests)
    ? Array.from(
        new Set(
          source.interests
            .filter((item): item is string => typeof item === "string")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      ).slice(0, 8)
    : [];

  return {
    destinationSlug: destination?.slug ?? "",
    journeySlug: storedJourney?.slug ?? "",
    scope: destination?.scope ?? (validScopes.has(scopeCandidate) ? scopeCandidate : ""),
    adults: count(source.adults, 2, 1),
    children: count(source.children, 0, 0),
    partyType: text(source.partyType, 80),
    travelMonth: text(source.travelMonth, 40),
    duration: text(source.duration, 40),
    flexibleDates: source.flexibleDates === true,
    interests,
    pace: validPaces.has(paceCandidate) ? paceCandidate : "",
    accommodation: text(source.accommodation, 80),
    budget: text(source.budget, 80),
    name: text(source.name, 100),
    phone: text(source.phone, 40),
    email: text(source.email, 160),
    notes: text(source.notes, 600),
  };
}

function plural(countValue: number, singular: string, pluralForm: string) {
  return `${countValue} ${countValue === 1 ? singular : pluralForm}`;
}

export function buildPlannerSummary(draft: PlannerDraft): string {
  const destination = getDestination(draft.destinationSlug);
  const journey = getJourney(draft.journeySlug);
  const lines = [
    "Personalized trip request",
    `Destination: ${destination?.title ?? (draft.scope === "help-me-choose" ? "Help me choose" : "Open to ideas")}`,
  ];

  if (journey) lines.push(`Starting journey: ${journey.title}`);
  lines.push(
    `Travellers: ${plural(draft.adults, "adult", "adults")}, ${plural(draft.children, "child", "children")}`,
  );
  if (draft.partyType) lines.push(`Travel party: ${draft.partyType}`);

  const timing = [draft.travelMonth, draft.duration, draft.flexibleDates ? "Dates flexible" : ""]
    .filter(Boolean)
    .join(" · ");
  if (timing) lines.push(`Timing: ${timing}`);
  if (draft.interests.length) lines.push(`Interests: ${draft.interests.join(", ")}`);
  if (draft.pace) lines.push(`Pace: ${draft.pace}`);
  if (draft.accommodation) lines.push(`Accommodation: ${draft.accommodation}`);
  if (draft.budget) lines.push(`Budget comfort: ${draft.budget}`);
  if (draft.notes) lines.push(`Notes: ${draft.notes}`);
  return lines.join("\n");
}

export function readPlannerContext(searchParams: URLSearchParams): Partial<PlannerDraft> {
  const journey = getJourney(searchParams.get("journey") ?? "");
  if (journey) {
    const destination = getDestination(journey.destinationSlugs[0]);
    return {
      journeySlug: journey.slug,
      destinationSlug: destination?.slug ?? "",
      scope: destination?.scope ?? "",
    };
  }

  const destination = getDestination(searchParams.get("destination") ?? "");
  if (destination) {
    return { destinationSlug: destination.slug, scope: destination.scope };
  }

  const scope = searchParams.get("scope");
  if (scope === "domestic" || scope === "international") {
    return { scope: scope as TravelScope };
  }
  return {};
}

export const PLANNER_DESTINATIONS = DESTINATIONS;
export const PLANNER_JOURNEYS = JOURNEYS;
export const PLANNER_PACES: readonly TravelPace[] = ["relaxed", "balanced", "full"];

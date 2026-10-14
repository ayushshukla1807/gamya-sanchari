export type TravelScope = "domestic" | "international";

export type TravelPace = "relaxed" | "balanced" | "full";

export type DepartureStatus = "enquire" | "next-on-request" | "previous";

export type JourneyCategory =
  | "spiritual"
  | "group"
  | "short-break"
  | "women-only"
  | "leisure"
  | "business";

export interface DestinationHighlight {
  readonly title: string;
  readonly description: string;
}

export interface DestinationDetail {
  readonly slug: string;
  readonly title: string;
  readonly region: string;
  readonly scope: TravelScope;
  readonly eyebrow: string;
  readonly summary: string;
  readonly image: string;
  readonly alt: string;
  readonly bestMonths: readonly string[];
  readonly suggestedDuration: string;
  readonly styleSlugs: readonly string[];
  readonly highlights: readonly DestinationHighlight[];
  readonly sampleRoute: readonly string[];
  readonly planningNotes: readonly string[];
}

export interface JourneyDay {
  readonly title: string;
  readonly description: string;
}

export interface Journey {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly durationLabel: string;
  readonly route: readonly string[];
  readonly routeHighlights: readonly string[];
  readonly inclusions: readonly string[];
  readonly theme: string;
  readonly audience: string;
  readonly heroImage: string;
  readonly destinationSlugs: readonly string[];
  readonly experienceSlugs: readonly string[];
  readonly categorySlugs: readonly JourneyCategory[];
  readonly departureStatus: DepartureStatus;
  readonly featured: boolean;
  readonly enquiryTopic: string;
  readonly historicalContext?: {
    readonly sourcePeriod: string;
    readonly note: string;
  };
  readonly sourceUrl?: string;
  readonly days?: readonly JourneyDay[];
  readonly isSample?: true;
}

export interface Experience {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly fit: string;
  readonly pacing: string;
  readonly destinationSlugs: readonly string[];
  readonly journeySlugs: readonly string[];
}

export interface TravelIntent {
  readonly slug: JourneyCategory;
  readonly title: string;
  readonly summary: string;
  readonly href: string;
}

export interface TravelDeskNote {
  readonly title: string;
  readonly summary: string;
  readonly href: string;
}

export interface JournalSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface JournalArticle {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly readingTime: string;
  readonly image: string;
  readonly alt: string;
  readonly sections: readonly JournalSection[];
  readonly relatedDestinationSlugs: readonly string[];
}

export interface PlannerDraft {
  readonly destinationSlug: string;
  readonly journeySlug: string;
  readonly experienceSlug: string;
  readonly scope: "" | TravelScope | "help-me-choose";
  readonly adults: number;
  readonly children: number;
  readonly partyType: string;
  readonly travelMonth: string;
  readonly duration: string;
  readonly flexibleDates: boolean;
  readonly interests: readonly string[];
  readonly pace: "" | TravelPace;
  readonly accommodation: string;
  readonly budget: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly notes: string;
}

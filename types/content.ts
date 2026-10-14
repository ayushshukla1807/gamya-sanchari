export type IconName =
  | "badge-check"
  | "bed-double"
  | "briefcase-medical"
  | "building-2"
  | "compass"
  | "heart"
  | "hotel"
  | "landmark"
  | "map"
  | "plane"
  | "route"
  | "shield-check"
  | "sparkles"
  | "ticket"
  | "users"
  | "wallet-cards";

export interface NavigationLink {
  href: `/${string}`;
  label: string;
}

export interface Destination {
  title: string;
  places: string[];
  image: string;
  alt: string;
}

export interface SampleJourney {
  title: string;
  duration: string;
  route: string[];
  theme: string;
}

export interface Service {
  title: string;
  description: string;
  icon: IconName;
}

export interface Benefit {
  title: string;
  description: string;
  icon: IconName;
}

export interface TravellerStory {
  name: string;
  trip: string;
  quote: string;
}

export interface WhatsAppEnquiry {
  name: string;
  phone: string;
  email?: string;
  message: string;
  context?: string;
}

export type { PlannerDraft } from "@/types/travel";

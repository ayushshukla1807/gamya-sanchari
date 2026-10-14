import type {
  Benefit,
  Destination,
  NavigationLink,
  SampleJourney,
  Service,
  TravellerStory,
} from "@/types/content";
import { JOURNEYS } from "@/constants/travel";

export const NAV_LINKS: NavigationLink[] = [
  { href: "/destinations/", label: "Destinations" },
  { href: "/spiritual-journeys/", label: "Spiritual Journeys" },
  { href: "/group-departures/", label: "Group Departures" },
  { href: "/packages/", label: "Packages" },
  { href: "/experiences/", label: "Experiences" },
  { href: "/plan-my-trip/", label: "Plan My Trip" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export const DESTINATIONS: Destination[] = [
  {
    title: "South India",
    places: ["Kerala", "Coorg", "Chikmagalur", "Mysuru"],
    image: "/images/destinations/south-india.webp",
    alt: "Tea-covered hills and misty valleys in South India",
  },
  {
    title: "West India",
    places: ["Goa", "Rajasthan", "Gujarat", "Maharashtra"],
    image: "/images/destinations/west-india.webp",
    alt: "Ornate sandstone architecture in Rajasthan",
  },
  {
    title: "North India",
    places: ["Kashmir", "Himachal", "Ladakh", "Uttarakhand"],
    image: "/images/destinations/north-india.webp",
    alt: "Snowy Himalayan mountains in North India",
  },
  {
    title: "East India",
    places: ["Darjeeling", "Sikkim", "Odisha", "Northeast"],
    image: "/images/destinations/east-india.webp",
    alt: "Green mountain landscape in Northeast India",
  },
  {
    title: "International",
    places: ["Dubai", "Thailand", "Singapore", "Bali", "Maldives"],
    image: "/images/destinations/international.webp",
    alt: "Tropical island resort surrounded by clear blue water",
  },
];

export const SAMPLE_JOURNEYS: SampleJourney[] = JOURNEYS.map(
  ({ title, durationLabel, route, theme }) => ({
    title,
    duration: durationLabel,
    route: [...route],
    theme,
  }),
);

export const SERVICES: Service[] = [
  {
    title: "International Trips",
    description: "Thoughtful itineraries that make exploring abroad feel simple.",
    icon: "plane",
  },
  {
    title: "Domestic Trips",
    description: "India journeys shaped around your time, pace and interests.",
    icon: "map",
  },
  {
    title: "Air Tickets",
    description: "Practical flight options with clear timing and fare guidance.",
    icon: "ticket",
  },
  {
    title: "Visa Assistance",
    description: "Clear guidance through the documents and application process.",
    icon: "badge-check",
  },
  {
    title: "Group Tours",
    description: "Well-paced plans that keep friends, families and teams together.",
    icon: "users",
  },
  {
    title: "Honeymoon Trips",
    description: "Private, memorable escapes planned around the two of you.",
    icon: "heart",
  },
  {
    title: "Hotel Booking",
    description: "Comfortable stays selected for location, fit and value.",
    icon: "hotel",
  },
  {
    title: "Travel Insurance",
    description: "Suitable cover options for greater confidence while travelling.",
    icon: "briefcase-medical",
  },
];

export const BENEFITS: Benefit[] = [
  {
    title: "Personalised Planning",
    description: "Your trip begins with your people, preferences, pace and budget.",
    icon: "sparkles",
  },
  {
    title: "Expert Guidance",
    description: "Practical recommendations help you make each choice confidently.",
    icon: "compass",
  },
  {
    title: "Comfortable Stays",
    description: "Hotels are selected for comfort, convenience and the right fit.",
    icon: "bed-double",
  },
  {
    title: "Memorable Experiences",
    description: "Each itinerary leaves room for the moments you will remember.",
    icon: "route",
  },
  {
    title: "Safety & Support",
    description: "One familiar point of contact is available when you need help.",
    icon: "shield-check",
  },
  {
    title: "Clear, Fair Pricing",
    description: "Straightforward costs help you understand what your plan includes.",
    icon: "wallet-cards",
  },
];

export const TRAVELLER_STORIES: TravellerStory[] = [
  {
    name: "Ananya",
    trip: "Coorg honeymoon",
    quote:
      "The days felt relaxed, the stay was lovely and every transfer arrived when we needed it. We could simply enjoy being together.",
  },
  {
    name: "Rohan",
    trip: "Kashmir family holiday",
    quote:
      "Our plan worked for grandparents and children alike. The pacing and one-point support made a big family trip feel easy.",
  },
  {
    name: "Meera",
    trip: "Bali friends' escape",
    quote:
      "We had the right mix of experiences and free time, with clear costs before we travelled. It felt made for our group.",
  },
];

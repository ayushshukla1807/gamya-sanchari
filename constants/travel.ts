import type {
  DestinationDetail,
  Experience,
  JournalArticle,
  Journey,
} from "@/types/travel";

export const DESTINATIONS = [
  {
    slug: "kerala",
    title: "Kerala",
    region: "South India",
    scope: "domestic",
    eyebrow: "Backwaters, tea country and an easier rhythm",
    summary:
      "Move from Kochi's layered history to Munnar's green hills and the quiet waterways of Kerala at a pace that leaves room to breathe.",
    image: "/images/destinations/south-india.webp",
    alt: "Tea-covered hills and misty valleys in Kerala",
    bestMonths: ["October", "November", "December", "January", "February"],
    suggestedDuration: "5–8 days",
    styleSlugs: ["family", "honeymoon", "wellness", "culture"],
    highlights: [
      {
        title: "Hill-country mornings",
        description: "Slow starts, tea gardens and cool-air viewpoints around Munnar.",
      },
      {
        title: "Backwater pauses",
        description: "A gentler day on Kerala's waterways with time for local life and food.",
      },
      {
        title: "Coastal character",
        description: "Heritage streets, cafés and harbour light create a warm first or final chapter.",
      },
    ],
    sampleRoute: ["Kochi", "Munnar", "Thekkady"],
    planningNotes: [
      "Keep transfer days light when combining the hills and coast.",
      "Choose stays around the pace and mobility needs of your group.",
    ],
  },
  {
    slug: "kashmir",
    title: "Kashmir",
    region: "North India",
    scope: "domestic",
    eyebrow: "Valley light, mountain air and unhurried views",
    summary:
      "Balance Srinagar's lakeside calm with mountain days in Gulmarg and Pahalgam, shaped around the season and your preferred pace.",
    image: "/images/destinations/north-india.webp",
    alt: "Snowy Himalayan mountains in Kashmir",
    bestMonths: ["April", "May", "June", "September", "October"],
    suggestedDuration: "5–7 days",
    styleSlugs: ["family", "honeymoon", "adventure"],
    highlights: [
      {
        title: "Srinagar at water level",
        description: "Gardens, neighbourhoods and a quiet lake experience anchor the journey.",
      },
      {
        title: "Mountain-day flexibility",
        description: "Build weather-aware room around Gulmarg and Pahalgam rather than overpacking each day.",
      },
      {
        title: "A season-led plan",
        description: "The valley changes character through the year, so the itinerary follows the experience you want.",
      },
    ],
    sampleRoute: ["Srinagar", "Gulmarg", "Pahalgam"],
    planningNotes: [
      "Allow flexibility for mountain conditions and local travel times.",
      "Discuss cold-weather comfort and walking preferences before choosing activities.",
    ],
  },
  {
    slug: "rajasthan",
    title: "Rajasthan",
    region: "West India",
    scope: "domestic",
    eyebrow: "Fort cities, desert colour and living craft",
    summary:
      "Pair architectural scale with small human details across Rajasthan, choosing fewer cities for a richer and more comfortable journey.",
    image: "/images/destinations/west-india.webp",
    alt: "Ornate sandstone architecture in Rajasthan",
    bestMonths: ["October", "November", "December", "January", "February"],
    suggestedDuration: "6–10 days",
    styleSlugs: ["family", "culture", "honeymoon"],
    highlights: [
      {
        title: "Cities with distinct character",
        description: "Jaipur, Jodhpur and Udaipur each reward time beyond their headline monuments.",
      },
      {
        title: "Craft and cuisine",
        description: "Local workshops and food experiences add texture between major sights.",
      },
      {
        title: "Desert-scale evenings",
        description: "A well-timed sunset or rural stay creates contrast without rushing long transfers.",
      },
    ],
    sampleRoute: ["Jaipur", "Jodhpur", "Udaipur"],
    planningNotes: [
      "Fewer bases usually produce a calmer journey than changing cities every night.",
      "Plan outdoor sightseeing around the season and midday heat.",
    ],
  },
  {
    slug: "dubai",
    title: "Dubai",
    region: "International",
    scope: "international",
    eyebrow: "Future-facing energy with older neighbourhood stories",
    summary:
      "See Dubai beyond a checklist by balancing landmark architecture, the creek-side city and one spacious desert experience.",
    image: "/images/destinations/international.webp",
    alt: "A bright coastal cityscape representing Dubai",
    bestMonths: ["November", "December", "January", "February", "March"],
    suggestedDuration: "4–6 days",
    styleSlugs: ["family", "honeymoon", "adventure"],
    highlights: [
      {
        title: "Old and new together",
        description: "Creek-side neighbourhoods make a rewarding counterpoint to the modern skyline.",
      },
      {
        title: "A considered desert day",
        description: "Choose the pace and activity level before selecting the right desert experience.",
      },
      {
        title: "Neighbourhood-smart stays",
        description: "The right base reduces transfers and keeps the trip aligned with your priorities.",
      },
    ],
    sampleRoute: ["Old Dubai", "Downtown", "Desert"],
    planningNotes: [
      "Confirm current entry requirements from official sources before travel.",
      "Group attractions by neighbourhood to reduce time in transit.",
    ],
  },
  {
    slug: "bali",
    title: "Bali",
    region: "International",
    scope: "international",
    eyebrow: "Green interiors, coastal days and space to reset",
    summary:
      "Shape Bali around two complementary bases, with enough time for culture, landscape and restorative unplanned hours.",
    image: "/images/destinations/international.webp",
    alt: "Tropical island coastline representing Bali",
    bestMonths: ["April", "May", "June", "September"],
    suggestedDuration: "6–9 days",
    styleSlugs: ["honeymoon", "wellness", "culture", "adventure"],
    highlights: [
      {
        title: "Ubud's green interior",
        description: "Culture, craft and landscape make a thoughtful first base when given unhurried time.",
      },
      {
        title: "A coast that fits you",
        description: "Choose the southern coast by atmosphere and priorities rather than popularity alone.",
      },
      {
        title: "Room between plans",
        description: "Bali works best when transfers and activities do not consume every day.",
      },
    ],
    sampleRoute: ["Ubud", "Seminyak", "Nusa Dua"],
    planningNotes: [
      "Use two well-chosen bases instead of changing hotels repeatedly.",
      "Confirm current entry requirements from official sources before travel.",
    ],
  },
] as const satisfies readonly DestinationDetail[];

export const JOURNEYS = [
  {
    slug: "kerala-easy-pace",
    title: "Kerala at an easy pace",
    summary: "A gentle introduction to Kerala's heritage, hills and nature.",
    duration: "5 days",
    route: ["Kochi", "Munnar", "Thekkady"],
    theme: "Hills · nature · family time",
    audience: "Families and first-time Kerala travellers",
    heroImage: "/images/destinations/south-india.webp",
    destinationSlugs: ["kerala"],
    experienceSlugs: ["family", "wellness", "culture"],
    days: [
      { title: "Arrive in Kochi", description: "Settle in and explore at an easy pace." },
      { title: "Into the hills", description: "Travel to Munnar with time for scenic pauses." },
      { title: "Munnar slowly", description: "Choose viewpoints and tea-country experiences to suit the group." },
      { title: "Nature and spice", description: "Continue to Thekkady for a softer nature-focused day." },
      { title: "A comfortable close", description: "Return with practical timing around the onward journey." },
    ],
    isSample: true,
  },
  {
    slug: "kashmir-valley-moments",
    title: "Kashmir valley moments",
    summary: "A scenery-led valley journey with breathing room around mountain days.",
    duration: "6 days",
    route: ["Srinagar", "Gulmarg", "Pahalgam"],
    theme: "Scenery · snow · slow travel",
    audience: "Couples and multi-generational families",
    heroImage: "/images/destinations/north-india.webp",
    destinationSlugs: ["kashmir"],
    experienceSlugs: ["family", "honeymoon", "adventure"],
    days: [
      { title: "Srinagar welcome", description: "Arrive, settle in and keep the first evening gentle." },
      { title: "Gardens and lake", description: "See Srinagar through its landscape and neighbourhoods." },
      { title: "Gulmarg mountain day", description: "Shape the day around season, comfort and conditions." },
      { title: "Travel to Pahalgam", description: "Let the valley journey be part of the experience." },
      { title: "Pahalgam at your pace", description: "Choose a scenic or active day around the group." },
      { title: "Return well-timed", description: "Close with sensible transfer time for the onward journey." },
    ],
    isSample: true,
  },
  {
    slug: "dubai-first-timer-favourites",
    title: "Dubai first-timer favourites",
    summary: "A balanced first Dubai trip across the creek, skyline and desert.",
    duration: "5 days",
    route: ["Old Dubai", "Downtown", "Desert"],
    theme: "City · culture · adventure",
    audience: "First-time international travellers and families",
    heroImage: "/images/destinations/international.webp",
    destinationSlugs: ["dubai"],
    experienceSlugs: ["family", "culture", "adventure"],
    days: [
      { title: "Arrive and orient", description: "Settle into a location matched to the trip priorities." },
      { title: "Creek-side Dubai", description: "Explore older neighbourhoods, markets and waterfront character." },
      { title: "Modern landmarks", description: "Group downtown highlights into one well-paced city day." },
      { title: "Desert contrast", description: "Choose an experience aligned with the group's activity level." },
      { title: "A flexible finale", description: "Use the final hours for a favourite interest before departure." },
    ],
    isSample: true,
  },
  {
    slug: "bali-beautifully-unhurried",
    title: "Bali, beautifully unhurried",
    summary: "Two complementary bases with culture, coast and restorative free time.",
    duration: "6 days",
    route: ["Ubud", "Seminyak", "Nusa Dua"],
    theme: "Wellness · coast · honeymoon",
    audience: "Couples, friends and slower-travel explorers",
    heroImage: "/images/destinations/international.webp",
    destinationSlugs: ["bali"],
    experienceSlugs: ["honeymoon", "wellness", "culture"],
    days: [
      { title: "Arrive in Ubud", description: "Transfer once, settle in and leave the evening open." },
      { title: "Culture and landscape", description: "Choose a thoughtful mix of craft, food and green scenery." },
      { title: "An unplanned half-day", description: "Keep room for rest or a spontaneous local discovery." },
      { title: "Move to the coast", description: "Change atmosphere with one considered transfer." },
      { title: "Your kind of coast", description: "Build the day around wellness, beach time or exploration." },
      { title: "A calm departure", description: "Protect enough time for a comfortable onward journey." },
    ],
    isSample: true,
  },
] as const satisfies readonly Journey[];

export const EXPERIENCES = [
  {
    slug: "family",
    title: "Family journeys",
    summary: "Comfortable days shaped around different ages, energy levels and shared moments.",
    fit: "Families who value clarity, sensible transfers and activities everyone can enjoy.",
    pacing: "Fewer hotel changes, flexible starts and one clear anchor experience per day.",
    destinationSlugs: ["kerala", "kashmir", "rajasthan", "dubai"],
    journeySlugs: ["kerala-easy-pace", "kashmir-valley-moments", "dubai-first-timer-favourites"],
  },
  {
    slug: "honeymoon",
    title: "Honeymoon escapes",
    summary: "Private, beautiful journeys with space for the two of you rather than a crowded checklist.",
    fit: "Couples looking for atmosphere, thoughtful stays and unhurried shared experiences.",
    pacing: "A balanced rhythm of signature moments, free time and comfortable transfers.",
    destinationSlugs: ["kerala", "kashmir", "rajasthan", "bali", "dubai"],
    journeySlugs: ["kashmir-valley-moments", "bali-beautifully-unhurried"],
  },
  {
    slug: "culture",
    title: "Culture and heritage",
    summary: "Places understood through their neighbourhoods, food, craft and living stories.",
    fit: "Curious travellers who want context and local texture alongside major sights.",
    pacing: "Time to notice detail, with fewer rushed monuments and more meaningful pauses.",
    destinationSlugs: ["kerala", "rajasthan", "dubai", "bali"],
    journeySlugs: ["kerala-easy-pace", "dubai-first-timer-favourites", "bali-beautifully-unhurried"],
  },
  {
    slug: "adventure",
    title: "Adventure and outdoors",
    summary: "Active experiences calibrated to your confidence, comfort and the conditions.",
    fit: "Travellers who want movement and landscape without sacrificing responsible pacing.",
    pacing: "High-energy anchors balanced with recovery time and weather-aware flexibility.",
    destinationSlugs: ["kashmir", "dubai", "bali"],
    journeySlugs: ["kashmir-valley-moments", "dubai-first-timer-favourites"],
  },
  {
    slug: "wellness",
    title: "Wellness and slow travel",
    summary: "Restorative journeys with quieter stays, nature and genuine unscheduled time.",
    fit: "Travellers who want to return refreshed instead of needing a holiday from the holiday.",
    pacing: "Longer stays, softer mornings and space between planned experiences.",
    destinationSlugs: ["kerala", "bali"],
    journeySlugs: ["kerala-easy-pace", "bali-beautifully-unhurried"],
  },
  {
    slug: "pilgrimage",
    title: "Pilgrimage and reflection",
    summary: "Purposeful travel planned around comfort, timing and the meaning of the journey.",
    fit: "Individuals and families seeking a respectful, well-supported spiritual journey.",
    pacing: "Realistic travel days, accessible stays and room for personal observance.",
    destinationSlugs: ["rajasthan"],
    journeySlugs: [],
  },
] as const satisfies readonly Experience[];

export const JOURNAL_ARTICLES = [
  {
    slug: "how-to-pace-a-kerala-trip",
    title: "How to pace a Kerala trip without rushing it",
    excerpt: "A practical way to balance the coast, hills and backwaters with comfortable travel days.",
    readingTime: "5 min read",
    image: "/images/destinations/south-india.webp",
    alt: "Green hills in Kerala",
    sections: [
      {
        heading: "Choose fewer transitions",
        paragraphs: ["Kerala rewards time in place. Two or three complementary bases usually feel richer than changing hotels every night."],
      },
      {
        heading: "Make transfer days part of the plan",
        paragraphs: ["Hill roads and scenic stops can turn a transfer into a meaningful day when the schedule leaves room for them."],
      },
    ],
    relatedDestinationSlugs: ["kerala"],
  },
  {
    slug: "planning-kashmir-for-a-family",
    title: "Planning Kashmir for a multi-generational family",
    excerpt: "Build around comfort, changing conditions and the different rhythms inside one family group.",
    readingTime: "6 min read",
    image: "/images/destinations/north-india.webp",
    alt: "Mountain landscape in Kashmir",
    sections: [
      {
        heading: "Start with the group's comfort",
        paragraphs: ["Walking preferences, cold tolerance and rest needs should shape the day before individual attractions do."],
      },
      {
        heading: "Protect flexibility",
        paragraphs: ["Mountain conditions can change. A plan with options is more useful than an overfilled fixed checklist."],
      },
    ],
    relatedDestinationSlugs: ["kashmir"],
  },
  {
    slug: "choosing-the-right-bali-base",
    title: "Choosing the right Bali bases for your travel style",
    excerpt: "Match Ubud and the coast to the atmosphere you want, then reduce unnecessary hotel changes.",
    readingTime: "5 min read",
    image: "/images/destinations/international.webp",
    alt: "Tropical coast in Bali",
    sections: [
      {
        heading: "Decide by atmosphere",
        paragraphs: ["Start with the kind of mornings, evenings and nearby experiences you want rather than choosing only by fame."],
      },
      {
        heading: "Use two bases well",
        paragraphs: ["A considered inland-and-coast pairing creates contrast while keeping packing and transfer time under control."],
      },
    ],
    relatedDestinationSlugs: ["bali"],
  },
] as const satisfies readonly JournalArticle[];

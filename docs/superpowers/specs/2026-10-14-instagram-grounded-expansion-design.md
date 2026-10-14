# Gamya Sanchari Instagram-Grounded Expansion Design

**Date:** 2026-10-14
**Status:** Ready for review
**Project:** Gamya Sanchari public website

## 1. Purpose

Evolve the current polished but largely generic travel website into a credible, conversion-focused expression of the travel business visible on Gamya Sanchari's Instagram account. The site should communicate real operating experience, make the strongest trip categories easy to discover, and turn historical campaign material into durable proof without presenting expired dates or prices as current offers.

This design also incorporates the already approved recorded host introduction, replacing the browser-generated voice used by the “Hear the host” experience.

## 2. Source of truth and content policy

The authenticated Instagram profile review found a profile count of 27 posts; Instagram's desktop grid exposed 24 retrievable posts/reels during the audit. Those visible items are sufficient to establish the business's recurring categories, route knowledge, inclusions, languages, and campaign style, but not to infer that any dated package remains available.

The website will follow these rules:

- Treat the Instagram account as evidence of experience and historical campaigns, not as a live inventory feed.
- Do not advertise an Instagram date or price as current unless it is independently confirmed after 2026-10-14.
- Present expired campaigns as “Previous departure” or “Previously operated,” paired with an “Ask for the next departure” action.
- Preserve accurate historical facts such as route, duration, and advertised inclusions, while clearly separating them from current availability.
- Use the site's existing contact details consistently: +91 80732 54766 and reach@gamyasanchari.com.
- Link visitors to Instagram as the live campaign/community channel, without relying on fragile embedded feeds or scraping.

## 3. Audited business signals

The Instagram audit supports the following durable product pillars:

1. **Spiritual journeys:** Puri–Jagannath/Konark, Tirupati, Ujjain/Mahakaleshwar, Varanasi–Ayodhya–Prayagraj, Char Dham, Kedarnath, and Shirdi.
2. **Curated group departures:** escorted departures with transport, accommodation, meals, sightseeing, and tour-manager support.
3. **Short trips from Bengaluru:** especially Tirupati and Ooty/Mysuru formats.
4. **Island and leisure travel:** Andaman packages for families, couples, and women-only groups.
5. **Women-only travel:** a distinct trust- and community-led proposition.
6. **Business travel:** Canton Fair support demonstrates a useful corporate/business-travel capability.
7. **Regional relevance:** Kannada and English content, Bengaluru departures, devotional travel, and culturally specific guidance.
8. **Social proof:** completed-tour material such as Tiranga Darshan and recurring travel-desk/community posts.

Representative historical campaigns include:

- Puri 3N/4D group trips covering Jagannath Temple, Konark, Puri Beach, Swargadwar, and Chilika.
- Char Dham with Yamunotri, Gangotri, Kedarnath, and Badrinath.
- One-day Tirupati formats with overnight Bengaluru transport and structured darshan support.
- Varanasi–Ayodhya–Prayagraj 3D/2N, Ujjain 3N/4D, Kedarnath 6D/5N, and Shirdi campaigns.
- Andaman 4D/3N women-only and family/couple travel.
- Ooty/Mysuru 2D/1N short-break material.

Any historical prices found in those posts remain internal reference material and will not be surfaced as present-day pricing.

## 4. Information architecture

### 4.1 Global navigation

Keep navigation concise and route visitors by intent:

- Home
- Destinations
- Packages
- Spiritual Journeys
- Experiences
- About
- Contact

“Group Departures” is a prominent navigation or header action when viewport space allows; otherwise it appears as the leading Packages filter and mobile-menu action. The existing Plan My Trip/WhatsApp conversion action remains visually dominant.

### 4.2 Home page

The home page becomes a guided story rather than a catalogue dump:

1. **Hero and host:** retain the plane-arrival concept and use the approved natural recorded introduction. Playback must remain user-initiated and captioned/transcribed.
2. **Travel intent selector:** Spiritual Journeys, Group Departures, Short Trips, Island Escapes, Women-only, and Business Travel.
3. **Real journeys:** feature Puri, Tirupati, Char Dham, Andaman, and Varanasi as representative routes.
4. **What is handled:** concrete service inclusions—transport, accommodation, meals where applicable, sightseeing, local coordination, and tour-manager/guide support.
5. **Previous departures:** a compact trust section showing historical campaigns with an explicit past-departure label.
6. **From our travel desk:** editorial cards inspired by Instagram themes—pilgrimage preparation, route notes, festival context, and traveller tips—using native site cards rather than an embedded social grid.
7. **Community channel:** invite visitors to follow Instagram for active campaigns and trip moments.
8. **Conversion close:** WhatsApp and enquiry actions prefilled with the selected trip/category.

### 4.3 Spiritual Journeys page

Create a dedicated `/spiritual-journeys/` route with:

- A respectful, premium introduction focused on coordination, comfort, and cultural understanding.
- Journey cards for Puri, Tirupati, Ujjain, Varanasi–Ayodhya–Prayagraj, Char Dham, Kedarnath, and Shirdi.
- Route highlights and indicative duration where historically evidenced.
- A “How we support your yatra” section covering transport, stays, meals, local movement, darshan/logistics guidance, and human assistance without making guaranteed-access claims.
- An “Ask for the next departure” action on every historical route.
- Relevant FAQ content about senior travellers, physical demands, documents, weather, and custom departures.

### 4.4 Packages and group departures

The Packages experience will distinguish availability status instead of implying that every card is bookable:

- **Enquire now:** undated, customisable package concepts.
- **Next departure on request:** routes previously promoted but without a newly verified date.
- **Previous departure:** historical proof cards.

Filters cover Spiritual, Group, Short Break, Women-only, Leisure, and Business. A dedicated `/group-departures/` landing page may share the same underlying data and components, providing a focused campaign destination without duplicating content maintenance.

### 4.5 Destinations and experiences

Expand destination coverage to match the operating evidence, while keeping route pages useful rather than thin:

- Odisha/Puri, Andhra Pradesh/Tirupati, Madhya Pradesh/Ujjain, Uttar Pradesh/Varanasi–Ayodhya–Prayagraj, Uttarakhand/Char Dham–Kedarnath, Maharashtra/Shirdi, Andaman, and Karnataka/Tamil Nadu short breaks.
- Experience pages or filters for Spiritual, Women-only, Short Trips from Bengaluru, Guided Groups, Island Escapes, and Business Travel.

Business Travel remains a concise capability page or experience section at this stage; it does not require a full corporate booking portal.

## 5. Content and data design

### 5.1 Journey model

Extend the current static travel data with structured fields sufficient for reuse across cards and route pages:

- `slug`, `title`, `region`, and `summary`
- `category` and `experienceTypes`
- `durationLabel`
- `routeHighlights`
- `inclusions`
- `departureStatus`: `enquire`, `next-on-request`, or `previous`
- `historicalContext` for source/date notes that must not render as current inventory
- `featured` and presentation metadata
- optional `sourceUrl` for a relevant Instagram post
- WhatsApp enquiry topic/message

Dates and prices are deliberately excluded from the primary reusable model until there is a verified operational source for current departures. If live departures are added later, they should use a separate time-bounded departure entity with start/end dates and an explicit publication status.

### 5.2 Copy system

Copy should sound experienced, calm, and specific:

- Prefer “We coordinate the details around your journey” to vague luxury claims.
- State inclusions as capabilities or historical inclusions; do not universalise details that vary by trip.
- Use selective Kannada microcopy in high-emotion moments—welcome, yatra reassurance, and community—paired with equivalent English text for accessibility and broader reach.
- Avoid copying Instagram flyer copy verbatim. Convert it into concise, web-native language.
- Use “Ask for the next departure” rather than “Book now” where availability is unverified.

## 6. Visual and media direction

The site remains cinematic and premium, but becomes more grounded in actual products:

- Use the existing design system and motion language for continuity.
- Create route-led visual groupings, map/itinerary cues, inclusion icons, and status badges.
- Keep spiritual pages serene and editorial rather than flyer-like.
- Use restrained saffron/gold accents for spiritual content while retaining the core blue/green brand palette.
- Do not hotlink Instagram media or depend on Instagram embeds.
- Do not use screenshots of social posters as the primary website imagery.
- If original campaign photography owned by Gamya Sanchari is later supplied, optimise and store approved derivatives locally with attribution/source records.
- All decorative motion observes `prefers-reduced-motion`; essential information never depends on animation or audio.

## 7. Host voice experience

The approved host update is part of this release:

- Use the bundled natural Indian-English recording rather than browser speech synthesis.
- Keep playback user-initiated; never autoplay audio.
- Provide visible play/pause/replay state, a transcript, and a clear duration/loading state.
- Ensure stopping/unmounting the component stops playback cleanly.
- Treat the audio as an enhancement: the full proposition and actions remain available without it.

## 8. Conversion design

Every major journey and category should lead to a context-aware enquiry:

- Prefill WhatsApp with the route/category name and “next departure” intent.
- Offer a non-WhatsApp contact path through the existing enquiry form and email.
- Preserve user context when moving from a card to the planner.
- On previous-departure cards, make historical status visually unambiguous before the CTA.
- Repeat contact confidence cues near high-intent actions: Bengaluru origin, phone number, human trip support, and response-oriented wording.

No unsupported response-time promise, seat count, discount, departure date, or price should be introduced.

## 9. Accessibility, performance, and SEO

- Maintain keyboard navigation, visible focus, semantic headings, labelled controls, colour contrast, alt text, and reduced-motion support.
- Lazy-load non-critical imagery and keep responsive assets appropriately sized.
- Avoid third-party Instagram widgets that block rendering or introduce tracking/performance risk.
- Add page metadata, canonical URLs, Open Graph content, and descriptive titles for new routes.
- Extend the sitemap for new public pages.
- Use appropriate structured data—`TravelAgency`, `TouristTrip`/`Trip` where supported, breadcrumbs, and FAQs—without marking historical prices or dates as active offers.
- Ensure the natural-host audio does not become a large render-blocking resource.

## 10. Testing and verification

Implementation will use test-driven changes for new behaviour and data rules.

Required automated coverage:

- Journey/departure status renders the correct label and CTA.
- Historical campaigns cannot render as a current dated/priced offer.
- WhatsApp links contain the selected journey context and valid encoding.
- New navigation routes resolve and mobile navigation remains usable.
- Spiritual Journeys content and accessibility landmarks render correctly.
- Host audio controls support play/pause/replay, loading/error handling, transcript access, and cleanup.
- No browser speech-synthesis dependency remains.
- Sitemap and metadata include new pages.
- Existing route and component tests continue to pass.

Required release checks:

- Unit/component test suite.
- Lint and production build.
- Route crawl for broken internal links and missing assets.
- Responsive browser checks at mobile, tablet, and desktop sizes.
- Keyboard and reduced-motion checks.
- Public smoke test after deployment for the canonical Vercel domain.

## 11. Rollout

1. Implement content/data foundations and tests.
2. Add shared status, journey, inclusion, and enquiry components.
3. Build Spiritual Journeys and Group Departures surfaces.
4. Integrate the refreshed home sections and the approved host audio.
5. Expand destinations/experiences and complete metadata/sitemap work.
6. Run the full verification suite and visual review.
7. Open a pull request, review the production diff, merge, and deploy.
8. Verify the live domain, navigation, audio, enquiry links, and historical-status language.

The release is reversible through the normal Git/Vercel deployment history. No live data migration is required because the content remains repository-managed.

## 12. Non-goals

- Automated Instagram scraping or live-feed synchronisation.
- A CMS, booking engine, payment flow, or seat-inventory system.
- Publishing unverified October 2026 availability, prices, discounts, or departure dates.
- Recreating every Instagram greeting or sports/community post on the website.
- Copying the visual density of social-media flyers.
- Guaranteeing darshan times, access, weather, or itinerary outcomes.

## 13. Risks and mitigations

- **Stale campaign data:** status is explicit, dated offers are excluded, and CTAs request the next departure.
- **Content overgrowth:** journeys share a structured model and reusable route templates.
- **Spiritual-travel overpromising:** copy describes coordination and guidance, not guaranteed access or outcomes.
- **Media rights/quality:** only approved owned originals or licensed site assets become primary imagery.
- **Language accessibility:** Kannada microcopy is paired with English meaning and never carries unique essential instructions.
- **Performance regression:** avoid social widgets, lazy-load media, and validate production bundles.
- **Audio usability:** user-initiated playback, transcript fallback, error handling, and reduced dependence on sound.

## 14. Acceptance criteria

The expansion is ready to merge when:

- Visitors can discover the real Instagram-evidenced journey categories from the home page and navigation.
- Puri, Tirupati, Ujjain, Varanasi–Ayodhya–Prayagraj, Char Dham, Kedarnath, Shirdi, Andaman, and Ooty/Mysuru are represented accurately.
- Historical offers are clearly labelled and no expired price/date appears as current inventory.
- Spiritual Journeys and Group Departures have purposeful landing experiences and context-aware enquiry actions.
- Women-only, Bengaluru short trips, and business travel are visible without overwhelming the core journey story.
- Instagram is presented as the active community/campaign channel without a brittle embedded feed.
- The natural recorded host experience is accessible and replaces synthetic browser speech.
- All automated and release checks in Section 10 pass.
- The deployed site is verified at `https://gamya-sanchari.vercel.app/` after merge.

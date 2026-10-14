# Instagram-Grounded Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Gamya Sanchari website into an accurate, conversion-focused reflection of its Instagram-evidenced spiritual, group, short-break, women-only, leisure, and business-travel capabilities without publishing expired offers as current.

**Architecture:** Extend the repository-managed travel model with explicit journey categories and departure status, then reuse small status/enquiry components across package cards, route pages, two new landing pages, and the home page. Keep Instagram as an outbound community/source channel—not a runtime dependency—and preserve the existing static Next.js architecture so every route remains build-time testable and deployable through the current Vercel pipeline.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript 5.7, Tailwind CSS 3.4, Framer Motion 11, Vitest/Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-14-instagram-grounded-expansion-design.md`

## Global Constraints

- Treat Instagram campaigns as historical evidence, never as live inventory.
- Do not render an Instagram date, price, discount, seat count, or availability claim as current unless independently verified after 2026-10-14.
- Historical journeys use “Previous departure” or “Next departure on request” and the action “Ask for the next departure.”
- Keep the canonical contact details `+91 80732 54766`, `reach@gamyasanchari.com`, and `https://www.instagram.com/gamya_sanchari/`.
- Do not hotlink Instagram media, embed a social feed, or add a runtime Instagram API/scraper dependency.
- Essential information must remain available without animation or audio; all decorative motion respects `prefers-reduced-motion`.
- Kannada microcopy must have adjacent English meaning and cannot carry unique essential instructions.
- Use original site assets already in `public/`; add campaign photography only after owned originals are supplied and approved.
- Preserve trailing-slash routes, static generation, keyboard navigation, responsive layouts, and the existing planner/contact fallbacks.
- Write each behavior test first, observe the intended failure, add the smallest implementation, rerun the focused test, then commit.

## Review Focus

- A historical journey with no current departure must never display stale price/date copy; Task 2 pins this in `PackageCard.test.tsx` and Task 3 pins it on the detail route.
- WhatsApp context containing Kannada, punctuation, ampersands, or line breaks must round-trip safely; Task 2 adds an encoded journey-context test.
- A journey without a day-by-day itinerary must render route highlights instead of an empty accordion or crashing; Task 3 owns this case.
- New navigation must remain operable at 360px and close/focus correctly on mobile; Task 6 extends the header unit and Playwright tests.
- Audio rejection, slow loading, end-of-playback, and component unmount must leave the host control usable and written copy visible; Task 7 owns these states.

---

## File Structure

### Travel domain

- `types/travel.ts` — canonical journey category/status/content interfaces.
- `constants/travel.ts` — repository-managed destinations, journeys, experiences, travel intents, and travel-desk content.
- `lib/travel-content.ts` — collection validation and category/status lookups.
- `lib/journey-presentation.ts` — pure mapping from departure status to badge, CTA label, and enquiry intent.
- `lib/whatsapp.ts` — encoded context-aware WhatsApp URLs.

### Shared presentation

- `components/journeys/JourneyStatusBadge.tsx` — one accessible status badge.
- `components/journeys/JourneyEnquiryLink.tsx` — one status-aware WhatsApp action.
- `components/journeys/JourneyCollection.tsx` — reusable filtered journey grid for landing pages.
- `components/packages/PackageCard.tsx` and `components/packages/PackageFilters.tsx` — package discovery using the new domain fields.

### Routes and home storytelling

- `app/spiritual-journeys/page.tsx` — spiritual-yatra landing page.
- `app/group-departures/page.tsx` — group-departure landing page.
- `components/home/TravelIntentSelector.tsx` — six intent entry points.
- `components/home/HandledInclusions.tsx` — concrete trip-support capabilities.
- `components/home/PreviousDepartures.tsx` — clearly historical proof.
- `components/home/TravelDesk.tsx` — web-native editorial cards and Instagram community link.
- `app/page.tsx` — assembles the revised home narrative.
- `app/experiences/page.tsx`, `constants/content.ts`, `components/layout/SiteHeader.tsx`, and `components/layout/SiteFooter.tsx` — discovery and global navigation.

### Media, SEO, and verification

- `components/Hero.tsx` — recorded host loading/play/pause/replay/error lifecycle.
- `components/seo/JourneyJsonLd.tsx` — non-offer trip structured data.
- `lib/metadata.ts`, `app/sitemap.ts`, and route pages — canonical metadata and discoverability.
- Existing Vitest suites plus focused new tests; `e2e/site.spec.ts` — production-path behavior.

---

### Task 1: Define the Instagram-grounded travel domain

**Files:**
- Modify: `types/travel.ts`
- Modify: `constants/travel.ts`
- Modify: `lib/travel-content.ts`
- Modify: `lib/travel-content.test.ts`
- Create: `lib/journey-presentation.ts`
- Create: `lib/journey-presentation.test.ts`

**Interfaces:**
- Consumes: existing `DestinationDetail`, `Journey`, and `Experience` collections.
- Produces: `DepartureStatus = "enquire" | "next-on-request" | "previous"`; `JourneyCategory = "spiritual" | "group" | "short-break" | "women-only" | "leisure" | "business"`; `getJourneysByCategory(category: JourneyCategory): readonly Journey[]`; `getJourneyPresentation(status: DepartureStatus): { badge: string; cta: string; enquiryIntent: string }`.

- [ ] **Step 1: Write failing domain tests**

  Add assertions that destination coverage includes `odisha-puri`, `tirupati`, `ujjain`, `varanasi-ayodhya-prayagraj`, `uttarakhand-yatra`, `shirdi`, `andaman`, and `ooty-mysuru`; journey coverage includes `puri-jagannath-konark`, `tirupati-darshan`, `ujjain-mahakaleshwar`, `varanasi-ayodhya-prayagraj`, `char-dham-yatra`, `kedarnath-yatra`, `shirdi-sai-darshan`, `andaman-island-escape`, `ooty-mysuru-short-break`, and `canton-fair-business-visit`; and every relation resolves.

- [ ] **Step 2: Run the focused tests and confirm the new contracts fail**

  Run: `npm test -- lib/travel-content.test.ts lib/journey-presentation.test.ts --run`

  Expected: FAIL because the new types, records, category lookup, and status mapper do not exist.

- [ ] **Step 3: Add the exact domain fields and status mapping**

  Change `Journey` to use `durationLabel`, `categorySlugs`, `routeHighlights`, `inclusions`, `departureStatus`, optional `historicalContext`, optional `sourceUrl`, `featured`, `enquiryTopic`, and optional `days`. Preserve existing sample journeys as `enquire`; add audited routes with `previous` or `next-on-request`. Map status copy exactly to `Enquire now`, `Next departure on request`, and `Previous departure`, with both non-current states using `Ask for the next departure`.

- [ ] **Step 4: Add audited destinations, journeys, experiences, and selectors**

  Add experience records for Spiritual Journeys, Group Departures, Short Trips from Bengaluru, Women-only Travel, Island Escapes, and Business Travel. Update existing records to use `durationLabel` and resolvable relation slugs; do not add live price/date fields.

- [ ] **Step 5: Run the focused domain tests**

  Run: `npm test -- lib/travel-content.test.ts lib/journey-presentation.test.ts --run`

  Expected: PASS with unique slugs, all relations resolvable, the ten audited journeys present, and deterministic status copy.

- [ ] **Step 6: Commit the domain foundation**

  ```bash
  git add types/travel.ts constants/travel.ts lib/travel-content.ts lib/travel-content.test.ts lib/journey-presentation.ts lib/journey-presentation.test.ts
  git commit -m "feat: model Instagram-grounded journeys"
  ```

### Task 2: Build status-aware journey cards and contextual enquiries

**Files:**
- Create: `components/journeys/JourneyStatusBadge.tsx`
- Create: `components/journeys/JourneyEnquiryLink.tsx`
- Create: `components/packages/PackageCard.test.tsx`
- Modify: `components/packages/PackageCard.tsx`
- Modify: `components/packages/PackageFilters.tsx`
- Modify: `components/packages/PackageFilters.test.tsx`
- Modify: `lib/whatsapp.ts`
- Modify: `lib/whatsapp.test.ts`

**Interfaces:**
- Consumes: `getJourneyPresentation(status)` and `Journey.enquiryTopic` from Task 1.
- Produces: `buildJourneyWhatsAppUrl(topic: string, intent: string): string`; `<JourneyStatusBadge status />`; `<JourneyEnquiryLink journey className? />`.

- [ ] **Step 1: Write failing status, safety, filtering, and encoding tests**

  Assert that a `previous` card says “Previous departure” and “Ask for the next departure,” never renders `₹29,990`, `₹33,999`, `28 August`, `9 August`, or `8 September 2026`, and links to a decoded WhatsApp message containing its `enquiryTopic`. Add category filter assertions for `spiritual`, `women-only`, and `business`, plus a Kannada/reserved-character round-trip assertion for `buildJourneyWhatsAppUrl`.

- [ ] **Step 2: Run the focused tests and observe failure**

  Run: `npm test -- components/packages/PackageCard.test.tsx components/packages/PackageFilters.test.tsx lib/whatsapp.test.ts --run`

  Expected: FAIL because status UI, category filtering, and journey-specific enquiry URLs do not exist.

- [ ] **Step 3: Implement shared status and enquiry primitives**

  Render status as visible text, not colour alone. Build WhatsApp text as `Hi Gamya Sanchari! I’m interested in <topic>. <intent>.` using `URLSearchParams`; keep `rel="noreferrer"` and `target="_blank"` on outbound links.

- [ ] **Step 4: Migrate package cards and filters**

  Replace the universal “Sample journey—customizable” stamp with the status badge, keep an internal detail-page link, add the status-aware enquiry action, and add a Category select while preserving scope, duration, experience, destination, empty, reset, and `aria-live` behavior.

- [ ] **Step 5: Run the focused tests**

  Run: `npm test -- components/packages/PackageCard.test.tsx components/packages/PackageFilters.test.tsx lib/whatsapp.test.ts --run`

  Expected: PASS, including safe absence of stale campaign values.

- [ ] **Step 6: Commit the reusable journey UI**

  ```bash
  git add components/journeys components/packages/PackageCard.tsx components/packages/PackageCard.test.tsx components/packages/PackageFilters.tsx components/packages/PackageFilters.test.tsx lib/whatsapp.ts lib/whatsapp.test.ts
  git commit -m "feat: add status-aware journey enquiries"
  ```

### Task 3: Upgrade packages and journey detail routes

**Files:**
- Modify: `app/packages/page.tsx`
- Modify: `app/packages/[slug]/page.tsx`
- Modify: `app/packages/packages.test.tsx`
- Modify: `components/packages/ItineraryAccordion.tsx`

**Interfaces:**
- Consumes: status badge/link components and optional `Journey.days` from Tasks 1–2.
- Produces: package pages that support both custom samples and audited historical routes without inventing itineraries.

- [ ] **Step 1: Write failing route tests**

  Assert that the packages page explains all three statuses; a previous Puri route shows its badge, inclusions, route highlights, and next-departure enquiry; a journey with `days` retains its itinerary; and a journey without `days` renders no empty “Day by day” accordion.

- [ ] **Step 2: Run the package route tests and confirm failure**

  Run: `npm test -- app/packages/packages.test.tsx --run`

  Expected: FAIL because audited statuses and optional itineraries are not handled.

- [ ] **Step 3: Implement status-aware package listing and detail rendering**

  Keep breadcrumbs, static params, metadata, route line, destination links, and sticky mobile action. Render `routeHighlights` and `inclusions` for every journey; render `ItineraryAccordion` only when `days?.length` is truthy; use `JourneyEnquiryLink` for unverified departures and the planner for custom `enquire` journeys.

- [ ] **Step 4: Run package route and accordion tests**

  Run: `npm test -- app/packages/packages.test.tsx components/packages/ItineraryAccordion.test.tsx --run`

  Expected: PASS for both itinerary-bearing and route-highlight-only journeys.

- [ ] **Step 5: Commit package-route behavior**

  ```bash
  git add app/packages components/packages/ItineraryAccordion.tsx
  git commit -m "feat: present real journeys without stale offers"
  ```

### Task 4: Add Spiritual Journeys and Group Departures landing pages

**Files:**
- Create: `components/journeys/JourneyCollection.tsx`
- Create: `components/journeys/JourneyCollection.test.tsx`
- Create: `app/spiritual-journeys/page.tsx`
- Create: `app/spiritual-journeys/page.test.tsx`
- Create: `app/group-departures/page.tsx`
- Create: `app/group-departures/page.test.tsx`

**Interfaces:**
- Consumes: `getJourneysByCategory`, `JourneyStatusBadge`, and `JourneyEnquiryLink`.
- Produces: `<JourneyCollection journeys headingLevel={2} />`; static `/spiritual-journeys/` and `/group-departures/` routes.

- [ ] **Step 1: Write failing collection and route tests**

  Assert that the spiritual page contains Puri, Tirupati, Ujjain, Varanasi–Ayodhya–Prayagraj, Char Dham, Kedarnath, and Shirdi; includes “How we support your yatra”; provides physical-demand/documents/weather FAQs without guaranteeing darshan; and that the group page shows transport, stays, applicable meals, sightseeing, local coordination, and tour-manager/guide support. Every non-current card must expose “Ask for the next departure.”

- [ ] **Step 2: Run the new page tests and verify missing-module failures**

  Run: `npm test -- components/journeys/JourneyCollection.test.tsx app/spiritual-journeys/page.test.tsx app/group-departures/page.test.tsx --run`

  Expected: FAIL because the collection and routes do not exist.

- [ ] **Step 3: Implement the reusable collection and Spiritual Journeys page**

  Use `EditorialHero`, shared journey cards, inclusion blocks, an accessible native `<details>` FAQ set, restrained saffron accents, and Kannada reassurance paired with English text.

- [ ] **Step 4: Implement the Group Departures page**

  Explain the three availability statuses, show group-capable journeys, and offer both contextual WhatsApp and `/contact/` paths without claiming current seats or dates.

- [ ] **Step 5: Run the focused route tests**

  Run: `npm test -- components/journeys/JourneyCollection.test.tsx app/spiritual-journeys/page.test.tsx app/group-departures/page.test.tsx --run`

  Expected: PASS with all required routes, support language, and status actions visible.

- [ ] **Step 6: Commit both landing experiences**

  ```bash
  git add components/journeys app/spiritual-journeys app/group-departures
  git commit -m "feat: add spiritual and group journey pages"
  ```

### Task 5: Rebuild the home page around real travel intent and proof

**Files:**
- Create: `components/home/TravelIntentSelector.tsx`
- Create: `components/home/HandledInclusions.tsx`
- Create: `components/home/PreviousDepartures.tsx`
- Create: `components/home/TravelDesk.tsx`
- Modify: `components/home/FeaturedJourneys.tsx`
- Modify: `components/home/ExperienceShowcase.tsx`
- Modify: `components/home/home-sections.test.tsx`
- Modify: `app/page.tsx`
- Modify: `app/page.test.tsx`

**Interfaces:**
- Consumes: travel intent/desk constants and status-aware journey cards.
- Produces: a home narrative ordered Hero → intents → real journeys → handled inclusions → previous departures → travel desk/community → planning close.

- [ ] **Step 1: Write failing home narrative tests**

  Assert the six intent labels (Spiritual Journeys, Group Departures, Short Trips, Island Escapes, Women-only Travel, Business Travel), featured Puri/Tirupati/Char Dham/Andaman/Varanasi journeys, the concrete inclusion labels, at least three “Previous departure” badges, completed-tour proof language inspired by Tiranga Darshan, an Instagram link to `BRAND.instagram`, and heading order matching the specified narrative.

- [ ] **Step 2: Run the home tests and confirm failure**

  Run: `npm test -- components/home/home-sections.test.tsx app/page.test.tsx --run`

  Expected: FAIL because the intent, proof, inclusion, and travel-desk sections are absent.

- [ ] **Step 3: Implement intent, inclusion, and historical-proof sections**

  Use semantic links/cards and existing imagery. Keep historical status adjacent to each journey title and provide context-prefilled enquiries.

- [ ] **Step 4: Implement the travel-desk/community section and reassemble the page**

  Add web-native cards for pilgrimage preparation, route notes, festival context, and traveller tips; link outward to Instagram for active campaigns and trip moments; do not embed or hotlink its grid.

- [ ] **Step 5: Run all home tests**

  Run: `npm test -- components/home/home-sections.test.tsx app/page.test.tsx --run`

  Expected: PASS with the new order, real route names, safe statuses, and community link.

- [ ] **Step 6: Commit the home-page expansion**

  ```bash
  git add components/home app/page.tsx app/page.test.tsx
  git commit -m "feat: ground home page in real journeys"
  ```

### Task 6: Integrate discovery, experiences, and global navigation

**Files:**
- Modify: `constants/content.ts`
- Modify: `components/layout/SiteHeader.tsx`
- Modify: `components/layout/SiteHeader.test.tsx`
- Modify: `components/layout/SiteFooter.tsx`
- Modify: `app/experiences/page.tsx`
- Modify: `app/packages/packages.test.tsx`
- Modify: `app/supporting-routes.test.tsx`

**Interfaces:**
- Consumes: new route URLs and expanded `EXPERIENCES` from Tasks 1 and 4.
- Produces: global discovery links for Spiritual Journeys and Group Departures plus visible specialist experiences.

- [ ] **Step 1: Write failing navigation and experience tests**

  Assert desktop/mobile navigation exposes `/spiritual-journeys/` and `/group-departures/`, still emphasizes `/plan-my-trip/`, closes after selection, and restores focus on Escape. Assert the experiences page exposes Spiritual, Women-only, Short Trips from Bengaluru, Island Escapes, Group Departures, and Business Travel with English descriptions beside any Kannada microcopy.

- [ ] **Step 2: Run focused navigation and route tests**

  Run: `npm test -- components/layout/SiteHeader.test.tsx app/packages/packages.test.tsx app/supporting-routes.test.tsx --run`

  Expected: FAIL because the new discovery routes are not globally linked.

- [ ] **Step 3: Update navigation, footer, and experiences**

  Keep the desktop header within its current breakpoint by treating Group Departures as a compact high-intent link and Plan My Trip as the sole primary button. Ensure mobile lists every route and the footer includes Instagram as “Active campaigns & trip moments.”

- [ ] **Step 4: Run focused tests**

  Run: `npm test -- components/layout/SiteHeader.test.tsx app/packages/packages.test.tsx app/supporting-routes.test.tsx --run`

  Expected: PASS for desktop/mobile navigation, route selection, and specialist experience copy.

- [ ] **Step 5: Commit discovery integration**

  ```bash
  git add constants/content.ts components/layout app/experiences/page.tsx app/packages/packages.test.tsx app/supporting-routes.test.tsx
  git commit -m "feat: expose specialist travel across navigation"
  ```

### Task 7: Complete the natural host audio experience

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/Hero.test.tsx`
- Verify: `public/audio/gamya-host-introduction.mp3`

**Interfaces:**
- Consumes: bundled `/audio/gamya-host-introduction.mp3` already present on the branch.
- Produces: host state `idle | loading | playing | error` with user-initiated play, stop, replay, transcript, and cleanup.

- [ ] **Step 1: Add failing lifecycle tests**

  Assert first click says “Loading introduction” until `canplay`, successful play says “Stop introduction,” `ended` returns “Replay introduction,” a rejected `play()` shows the existing transcript and “Audio introduction unavailable,” and unmount pauses active audio without erasing the transcript.

- [ ] **Step 2: Run the host tests and confirm loading/replay failures**

  Run: `npm test -- components/Hero.test.tsx --run`

  Expected: FAIL because the current Boolean state has no loading or replay distinction.

- [ ] **Step 3: Implement the explicit audio state machine**

  Replace `isSpeaking`/`audioFailed` with one discriminated state; keep `preload="none"`, user initiation, visible written introduction, and no dependency on Web Speech APIs. Reset `currentTime` only when the user stops or replays from the ended state.

- [ ] **Step 4: Validate the audio asset and run tests**

  Run: `node scripts/verify-assets.mjs && npm test -- components/Hero.test.tsx --run`

  Expected: asset verifier exits 0 and all host lifecycle/fallback tests PASS.

- [ ] **Step 5: Commit the host polish**

  ```bash
  git add components/Hero.tsx components/Hero.test.tsx public/audio/gamya-host-introduction.mp3
  git commit -m "feat: polish natural host audio controls"
  ```

### Task 8: Publish complete metadata, sitemap, and safe structured data

**Files:**
- Modify: `lib/metadata.ts`
- Modify: `lib/metadata.test.ts`
- Modify: `app/siteMetadata.ts`
- Create: `components/seo/JourneyJsonLd.tsx`
- Create: `components/seo/JourneyJsonLd.test.tsx`
- Modify: `app/packages/[slug]/page.tsx`
- Modify: `app/spiritual-journeys/page.tsx`
- Modify: `app/group-departures/page.tsx`
- Verify: `app/sitemap.ts`

**Interfaces:**
- Consumes: published journey/status data and existing `metadataForPath`/`getPublishedPages`.
- Produces: metadata for both new routes and `buildJourneySchema(journey: Journey)` that emits descriptive trip data but no `Offer`, price, availability, or departure date.

- [ ] **Step 1: Write failing metadata and JSON-LD tests**

  Assert unique canonical metadata for `/spiritual-journeys/` and `/group-departures/`; sitemap inclusion with trailing slashes; spiritual/group keywords in page descriptions; and serialized historical journey schema contains neither `offers`, `price`, `priceCurrency`, `availability`, `startDate`, nor `endDate`.

- [ ] **Step 2: Run focused SEO tests**

  Run: `npm test -- lib/metadata.test.ts components/seo/JourneyJsonLd.test.tsx --run`

  Expected: FAIL because the routes and journey schema are not registered.

- [ ] **Step 3: Register metadata and implement safe journey JSON-LD**

  Use `TouristTrip` with name, description, itinerary/route description, provider reference, and audience where appropriate. Render JSON-LD only from repository content and never serialize `historicalContext` as an active offer.

- [ ] **Step 4: Run SEO tests**

  Run: `npm test -- lib/metadata.test.ts components/seo/JourneyJsonLd.test.tsx --run`

  Expected: PASS with unique canonicals, complete sitemap coverage, and no offer vocabulary.

- [ ] **Step 5: Commit SEO coverage**

  ```bash
  git add lib/metadata.ts lib/metadata.test.ts app/siteMetadata.ts app/sitemap.ts components/seo 'app/packages/[slug]/page.tsx' app/spiritual-journeys/page.tsx app/group-departures/page.tsx
  git commit -m "feat: add safe journey discovery metadata"
  ```

### Task 9: Run full regression, responsive, accessibility, and deployment verification

**Files:**
- Modify: `e2e/site.spec.ts`
- Modify: `scripts/verify-assets.mjs` only if the new route/media inventory requires it.
- Modify: `docs/media-credits.md` only if new owned/licensed media was added.

**Interfaces:**
- Consumes: the complete feature branch.
- Produces: release evidence for unit, lint, build, routes, 360px layout, keyboard, reduced motion, audio fallback, and deployed smoke behavior.

- [ ] **Step 1: Extend Playwright coverage before final implementation fixes**

  Add direct-route assertions for `/spiritual-journeys/` and `/group-departures/`; keyboard navigation to both; status text and next-departure WhatsApp context; 360px overflow checks for both routes; reduced-motion host visibility; and recorded-audio fallback that no longer references `speechSynthesis`.

- [ ] **Step 2: Run the complete unit suite**

  Run: `npm test -- --run`

  Expected: all Vitest tests PASS with zero unhandled errors.

- [ ] **Step 3: Run static and production checks**

  Run: `node scripts/verify-assets.mjs && npm run lint && npm run build`

  Expected: asset verification exits 0, ESLint reports zero warnings/errors, and Next.js statically generates every destination, journey, journal, spiritual, and group route.

- [ ] **Step 4: Run browser regression checks**

  Run: `npm run test:e2e`

  Expected: all configured desktop and `mobile-360` Playwright projects PASS, with no horizontal overflow and reachable sticky actions.

- [ ] **Step 5: Review the branch diff for stale claims and external media**

  Run: `git diff main...HEAD --check && git diff main...HEAD | rg '₹|August|September|8th|9th|28th|instagram\.com/.+/(p|reel)/|cdninstagram'`

  Expected: `git diff --check` is clean; any matches are limited to tests, source references, or explicitly historical documentation—never current-offer UI—and there are no Instagram CDN hotlinks.

- [ ] **Step 6: Commit final browser coverage**

  ```bash
  git add e2e/site.spec.ts scripts/verify-assets.mjs docs/media-credits.md
  git commit -m "test: cover Instagram-grounded travel release"
  ```

- [ ] **Step 7: Follow the branch-finishing workflow**

  Invoke `superpowers:requesting-code-review`, resolve validated findings, rerun the full checks above, then invoke `superpowers:finishing-a-development-branch`. Push the branch, open and attach the pull request, merge only after checks pass, deploy through the existing Vercel integration, and verify `https://gamya-sanchari.vercel.app/`, both new routes, host audio, navigation, and enquiry links on the public deployment.

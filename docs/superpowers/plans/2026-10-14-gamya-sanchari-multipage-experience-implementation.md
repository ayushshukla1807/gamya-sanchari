# Gamya Sanchari Multi-Page Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the shipped Gamya Sanchari one-page site into a cinematic, playful, premium multi-page travel discovery experience whose primary conversion is a personalized WhatsApp trip enquiry.

**Architecture:** Keep the Next.js 14 static-export foundation and move destination, package, experience, and journal content into typed data modules consumed by statically generated index/detail routes. Server components own durable content and metadata; small client islands own filtering, motion, navigation, accordions, and a session-persisted trip planner that hands a structured summary to the existing WhatsApp builder.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest, Testing Library, Playwright, Lighthouse.

**Spec:** `docs/superpowers/specs/2026-10-14-gamya-sanchari-multipage-experience-design.md`

## Global Constraints

- Preserve `output: "export"`, `trailingSlash: true`, the current Vercel URL, and compatibility with fully static hosting.
- Keep exact business details from `constants/brand.ts`, including WhatsApp number `918073254766`, phone `+91 80732 54766`, email `reach@gamyasanchari.com`, Instagram, and Bengaluru location.
- Preserve the existing blue/orange identity and hero plane/host concept; extend it with midnight navy, warm ivory, sand, mist, and restrained gold tokens.
- Keep the current host speech opt-in only. Do not add auto-playing audio, an always-listening assistant, or a persistent character overlay.
- Label journeys and stories as samples. Do not invent prices, ratings, discounts, inventory, guarantees, certifications, customer counts, or live regulatory advice.
- No authentication, payments, backend lead storage, CMS, server actions, or new environment variables.
- Use semantic landmarks, ordered headings, visible focus, at least 44px targets, readable contrast, and no horizontal overflow at 360 CSS pixels.
- Every motion-dependent composition needs a complete `prefers-reduced-motion` and no-JavaScript-readable state.
- Keep media local, optimized, dimensioned, and credited in `docs/media-credits.md`; do not copy proprietary assets or content from another travel business.
- Preserve existing enquiry-modal behavior and WhatsApp URL encoding while introducing the planner.
- Production release requires zero-warning lint, passing unit/e2e tests, successful asset verification and static build, representative Lighthouse checks, and live-route smoke tests.

## Review Focus

- An unknown, malformed, or duplicate slug must produce a deterministic static-build failure or the not-found state rather than silently showing the wrong trip; Task 1 and Task 3 pin slug uniqueness and lookup behavior.
- Filter combinations yielding zero results must announce the count, retain usable controls, and offer a reset path; Task 3 and Task 4 pin empty states and keyboard operation.
- Planner state loaded from `sessionStorage` may be missing, stale, or invalid JSON; Task 5 pins safe schema normalization and fallback to empty state.
- A visitor who moves backward or edits an earlier planner step must keep still-compatible later answers and get one correctly encoded WhatsApp message; Task 5 pins edit retention and one-pass encoding.
- Reduced motion, video failure, disabled speech synthesis, narrow screens, and direct navigation to nested routes must preserve content and primary actions; Tasks 2, 6, 8, and 9 pin these fallbacks.

---

### Task 1: Establish the Typed Travel Content Domain

**Files:**
- Create: `types/travel.ts`
- Create: `constants/travel.ts`
- Create: `lib/travel-content.ts`
- Create: `lib/travel-content.test.ts`
- Modify: `types/content.ts`
- Modify: `constants/content.ts`

**Interfaces:**
- Consumes: current `Destination`, `SampleJourney`, and brand content.
- Produces: `DestinationDetail`, `Journey`, `Experience`, `JournalArticle`, `PlannerDraft`; `DESTINATIONS`, `JOURNEYS`, `EXPERIENCES`, `JOURNAL_ARTICLES`; `getDestination(slug: string)`, `getJourney(slug: string)`, `getArticle(slug: string)`, `getRelatedJourneys(destinationSlug: string)`, and `assertUniqueTravelSlugs(): void`.

- [ ] **Step 1: Write failing content-contract tests**

Add tests asserting unique non-empty slugs, valid relation keys, four journey slugs (`kerala-easy-pace`, `kashmir-valley-moments`, `dubai-first-timer-favourites`, `bali-beautifully-unhurried`), at least five detailed destination slugs (`kerala`, `kashmir`, `rajasthan`, `dubai`, `bali`), six experience categories, three journal entries, explicit `isSample: true` on journeys, and `undefined` for unknown lookups.

- [ ] **Step 2: Run the focused test and verify the red state**

Run: `npm test -- --run lib/travel-content.test.ts`

Expected: FAIL because the travel content module does not exist.

- [ ] **Step 3: Define the domain types and normalized content**

Use readonly-friendly interfaces with exact relation fields: `DestinationDetail.slug`, `Journey.destinationSlugs`, `Journey.experienceSlugs`, `Experience.slug`, and `JournalArticle.relatedDestinationSlugs`. Move existing sample journeys into `JOURNEYS`, retain all existing region cards, and add only defensible editorial copy.

- [ ] **Step 4: Implement typed lookup and relation helpers**

All helpers return immutable source objects without mutating or duplicating content. `assertUniqueTravelSlugs()` throws a message naming the duplicated collection and slug.

- [ ] **Step 5: Run focused and existing content tests**

Run: `npm test -- --run lib/travel-content.test.ts components/sections.test.tsx`

Expected: PASS with no regressions to current page content.

- [ ] **Step 6: Commit**

```bash
git add types constants lib
git commit -m "feat: define typed travel content domain"
```

### Task 2: Build the Multi-Page Shell and Design System

**Files:**
- Create: `components/layout/SiteHeader.tsx`
- Create: `components/layout/SiteHeader.test.tsx`
- Create: `components/layout/SiteFooter.tsx`
- Create: `components/layout/Breadcrumbs.tsx`
- Create: `components/ui/EditorialHero.tsx`
- Create: `components/ui/RouteLine.tsx`
- Create: `components/ui/Stamp.tsx`
- Create: `components/ui/CtaGroup.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `components/GlobalWidgets.tsx`
- Replace after tests pass: `components/Navbar.tsx`, `components/Footer.tsx`

**Interfaces:**
- Consumes: `BRAND`, route-aware navigation data, existing `EnquiryProvider` and `GlobalWidgets`.
- Produces: one shared shell for every route; `BreadcrumbItem { label: string; href?: string }`; presentation primitives with reduced-motion-safe output.

- [ ] **Step 1: Write failing shell tests**

Assert that desktop and mobile navigation expose `/destinations/`, `/packages/`, `/experiences/`, `/plan-my-trip/`, `/about/`, and `/contact/`; mobile Escape closes and restores focus; the planner link is visually identified as the primary action; breadcrumbs use a labelled `nav`; and route primitives remain readable when reduced motion is active.

- [ ] **Step 2: Run the shell tests**

Run: `npm test -- --run components/layout/SiteHeader.test.tsx`

Expected: FAIL because the route-aware shell does not exist.

- [ ] **Step 3: Add design and motion tokens**

Define CSS variables for midnight, ivory, sand, mist, restrained gold, surface elevation, route strokes, focus ring, motion durations, easings, and reduced-motion overrides. Preserve existing brand variables for compatibility.

- [ ] **Step 4: Implement the shared shell and primitives**

Keep editorial primitives server-renderable. Limit client boundaries to the mobile menu and motion-enhanced route line. Suppress the global WhatsApp control’s visual prominence on `/plan-my-trip/` and `/contact/` without removing access.

- [ ] **Step 5: Integrate the shell in `app/layout.tsx` and migrate existing tests**

Replace anchor-only navigation with route links while keeping genuine same-page hero actions intact. Update old navbar/footer tests to assert the new shared behavior, then delete superseded components only after imports are migrated.

- [ ] **Step 6: Verify shell behavior**

Run: `npm test -- --run components/layout components/GlobalWidgets.test.tsx app/page.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add app components tailwind.config.ts
git commit -m "feat: add multipage shell and editorial design system"
```

### Task 3: Build Destination Discovery and Detail Routes

**Files:**
- Create: `app/destinations/page.tsx`
- Create: `app/destinations/[slug]/page.tsx`
- Create: `components/destinations/DestinationFilters.tsx`
- Create: `components/destinations/DestinationFilters.test.tsx`
- Create: `components/destinations/DestinationCard.tsx`
- Create: `components/destinations/DestinationDetail.tsx`
- Create: `app/destinations/destinations.test.tsx`
- Add: `public/images/destinations/{kerala,kashmir,rajasthan,dubai,bali}-hero.webp`
- Modify: `docs/media-credits.md`

**Interfaces:**
- Consumes: `DESTINATIONS`, `getDestination`, `getRelatedJourneys`, shared shell/primitives.
- Produces: static destination index and detail paths; `DestinationFilterState { scope: string; region: string; season: string; style: string }`; accessible result filtering.

- [ ] **Step 1: Write failing destination route tests**

Assert page title/heading, all filter labels, accurate live result count, keyboard-selectable chips, a reset control after a zero-result combination, destination-card links, five `generateStaticParams()` entries, unique metadata, labelled sample route, related journeys, breadcrumbs, and Plan This Destination links carrying `?destination=<slug>`.

- [ ] **Step 2: Run the route tests**

Run: `npm test -- --run app/destinations components/destinations`

Expected: FAIL because the destination routes do not exist.

- [ ] **Step 3: Implement the filter island and reusable card**

Filtering stays client-side over server-rendered content. The result count uses `aria-live="polite"`; filters remain ordinary buttons/controls; the empty state includes Reset filters and Plan My Trip actions.

- [ ] **Step 4: Implement static destination detail generation**

Export `generateStaticParams` and `generateMetadata`; call `notFound()` for an unknown slug; render facts, highlights, route, planning notes, related journeys, and contextual planner/WhatsApp actions from typed content.

- [ ] **Step 5: Add optimized local destination media and credits**

Use original/generated or clearly licensed imagery, record source/license per file, reserve intrinsic dimensions, and keep each hero image within the agreed asset budget from `scripts/verify-assets.mjs`.

- [ ] **Step 6: Run destination tests and asset verification**

Run: `npm test -- --run app/destinations components/destinations && node scripts/verify-assets.mjs`

Expected: PASS with no missing or oversized assets.

- [ ] **Step 7: Commit**

```bash
git add app/destinations components/destinations public/images/destinations docs/media-credits.md
git commit -m "feat: add destination discovery and detail journeys"
```

### Task 4: Build Packages and Experience Discovery

**Files:**
- Create: `app/packages/page.tsx`
- Create: `app/packages/[slug]/page.tsx`
- Create: `app/experiences/page.tsx`
- Create: `components/packages/PackageFilters.tsx`
- Create: `components/packages/PackageFilters.test.tsx`
- Create: `components/packages/PackageCard.tsx`
- Create: `components/packages/ItineraryAccordion.tsx`
- Create: `components/packages/ItineraryAccordion.test.tsx`
- Create: `components/experiences/ExperiencePortal.tsx`
- Create: `app/packages/packages.test.tsx`

**Interfaces:**
- Consumes: `JOURNEYS`, `EXPERIENCES`, `getJourney`, destination relations, shared cards/primitives.
- Produces: package index/detail routes, experience index, `PackageFilterState { scope: string; duration: string; experience: string; destination: string }`, semantic itinerary accordion.

- [ ] **Step 1: Write failing package and experience tests**

Assert explicit “Sample journey—customizable” labelling, filter result counts and reset state, four static journey params, contextual `/plan-my-trip/?journey=<slug>` links, day controls with correct `aria-expanded`/`aria-controls`, keyboard activation, related content, and six distinct experience portals that explain fit rather than repeat package copy.

- [ ] **Step 2: Run focused tests**

Run: `npm test -- --run app/packages components/packages app/experiences`

Expected: FAIL because the routes/components do not exist.

- [ ] **Step 3: Implement package filtering and cards**

Use the same filter accessibility contract as destinations. Show duration, route, audience, and experience tags, never price or availability.

- [ ] **Step 4: Implement detail generation and itinerary accordion**

Export static params/metadata, not-found behavior, readable all-days markup, progressive accordion enhancement, related destinations/journeys, sticky desktop summary, and safe-area-aware mobile action bar.

- [ ] **Step 5: Implement the Experiences page**

Each portal explains who the experience suits, ideal pacing, and linked destinations/journeys; its primary action enters discovery or the planner with context.

- [ ] **Step 6: Run package/experience and accessibility tests**

Run: `npm test -- --run app/packages components/packages app/experiences`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add app/packages app/experiences components/packages components/experiences
git commit -m "feat: add packages and experience discovery"
```

### Task 5: Build the Personalized Trip Planner

**Files:**
- Create: `app/plan-my-trip/page.tsx`
- Create: `components/planner/TripPlanner.tsx`
- Create: `components/planner/TripPlanner.test.tsx`
- Create: `components/planner/PlannerProgress.tsx`
- Create: `components/planner/PlannerStep.tsx`
- Create: `components/planner/PlannerReview.tsx`
- Create: `lib/planner.ts`
- Create: `lib/planner.test.ts`
- Modify: `lib/whatsapp.ts`
- Modify: `lib/whatsapp.test.ts`

**Interfaces:**
- Consumes: `PlannerDraft`, destination/journey lookups, `buildWhatsAppUrl(input: WhatsAppEnquiry): string`.
- Produces: `EMPTY_PLANNER_DRAFT`; `normalizePlannerDraft(value: unknown): PlannerDraft`; `buildPlannerSummary(draft: PlannerDraft): string`; `readPlannerContext(searchParams): Partial<PlannerDraft>`; six-step accessible planner.

- [ ] **Step 1: Write failing planner-domain tests**

Assert safe handling of absent storage, invalid JSON, unknown fields, stale destination/journey slugs, numeric bounds for travellers, normalization of optional fields, exact readable summary order, and single-pass encoding of `+`, `&`, emoji, and line breaks.

- [ ] **Step 2: Write failing planner interaction tests**

Assert Where/Who/When/What matters/Contact/Review steps, step-specific validation and focus, progress semantics, next/back/edit behavior, retention of compatible later answers, query prefill from `destination` or `journey`, session persistence, optional budget and email behavior, review summary, and explicit WhatsApp-only disclosure.

- [ ] **Step 3: Run planner tests**

Run: `npm test -- --run lib/planner.test.ts components/planner lib/whatsapp.test.ts`

Expected: FAIL because planner domain and UI do not exist.

- [ ] **Step 4: Implement planner normalization, context, and summary helpers**

Treat storage and URL values as untrusted. Keep normalization pure and deterministic; never mutate `EMPTY_PLANNER_DRAFT`; omit blank optional fields from the summary.

- [ ] **Step 5: Implement the progressive planner UI**

Render all field labels and a readable fallback form in initial markup, enhance into six steps after hydration, save validated draft state to `sessionStorage`, and announce validation/progress changes. Do not send or persist data outside the current tab.

- [ ] **Step 6: Connect the review action to WhatsApp**

Generate one summary string, pass it once to the existing builder, and open WhatsApp only from the explicit Continue in WhatsApp action.

- [ ] **Step 7: Run planner and existing enquiry tests**

Run: `npm test -- --run lib/planner.test.ts components/planner lib/whatsapp.test.ts components/enquiry`

Expected: PASS with no encoding or modal regressions.

- [ ] **Step 8: Commit**

```bash
git add app/plan-my-trip components/planner lib types
git commit -m "feat: add personalized WhatsApp trip planner"
```

### Task 6: Recompose the Home Page as a Guided Journey

**Files:**
- Create: `components/home/RegionExplorer.tsx`
- Create: `components/home/ExperienceShowcase.tsx`
- Create: `components/home/FeaturedJourneys.tsx`
- Create: `components/home/PlanningRoute.tsx`
- Create: `components/home/PlannerPreview.tsx`
- Create: `components/home/home-sections.test.tsx`
- Modify: `app/page.tsx`
- Modify: `app/page.test.tsx`
- Modify: `components/Hero.tsx`
- Modify: `components/Hero.test.tsx`
- Modify or replace: `components/Destinations.tsx`, `components/Services.tsx`, `components/WhyUs.tsx`, `components/Testimonials.tsx`

**Interfaces:**
- Consumes: typed travel content, shared shell/primitives, existing hero host, planner query contract.
- Produces: narrative home sequence—Arrival, Direction, Feeling, Journey, Planning Method, Planner Preview, Confidence.

- [ ] **Step 1: Write failing narrative-page tests**

Assert ordered landmark headings, destination links rather than modal-only cards, experience portals, four sample journey cards, Listen/Shape/Refine/Support steps, planner-preview context links, final trust/contact area, no unsupported claims, and one `main` landmark.

- [ ] **Step 2: Extend hero fallback tests**

Pin immediate primary actions, video-error poster behavior, opt-in speech only, missing `speechSynthesis` behavior, host visibility rules on 360px, and reduced-motion final-state rendering.

- [ ] **Step 3: Run home tests**

Run: `npm test -- --run app/page.test.tsx components/home components/Hero.test.tsx`

Expected: FAIL because the new narrative sections do not exist.

- [ ] **Step 4: Implement the server-rendered narrative sections**

Use CSS/SVG route decoration with complete text equivalents. Keep only Region Explorer selection and Planner Preview inputs as client islands. Reuse the host once near planner guidance without auto-speaking or persistent positioning.

- [ ] **Step 5: Recompose `app/page.tsx` and migrate legacy sections**

Preserve useful copy/services while removing duplicate cards and modal-only navigation patterns. Ensure every home action lands on a real route or opens an intentional enquiry action.

- [ ] **Step 6: Add disciplined section motion**

Assign one narrative purpose per section—route draw, mask reveal, depth shift, or stagger. Use transform/opacity only, central tokens, and static reduced-motion states.

- [ ] **Step 7: Verify home behavior**

Run: `npm test -- --run app/page.test.tsx components/home components/Hero.test.tsx components/sections.test.tsx`

Expected: PASS after updating legacy assertions to the approved multi-page architecture.

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx components
git commit -m "feat: recompose home into a guided travel journey"
```

### Task 7: Add About, Journal, and Contact Routes

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `app/journal/page.tsx`
- Create: `app/journal/[slug]/page.tsx`
- Create: `components/journal/ArticleCard.tsx`
- Create: `components/contact/ContactOptions.tsx`
- Create: `app/supporting-routes.test.tsx`
- Modify: `components/enquiry/RequestCallForm.tsx`

**Interfaces:**
- Consumes: `JOURNAL_ARTICLES`, `getArticle`, brand data, request-call form, shared detail primitives.
- Produces: brand/service method page, three static journal articles, and complete contact-choice page.

- [ ] **Step 1: Write failing supporting-route tests**

Assert the About page contains the existing “We listen first, then plan” promise and Listen/Shape/Refine/Support method; Contact exposes phone, email, Instagram, WhatsApp, location, request-call form, and no stored-submission claim; Journal lists three articles; article pages generate static params, metadata, breadcrumbs, related destinations, and planner actions.

- [ ] **Step 2: Run focused tests**

Run: `npm test -- --run app/supporting-routes.test.tsx`

Expected: FAIL because the supporting routes do not exist.

- [ ] **Step 3: Implement About and Contact**

Reuse approved business copy and shared primitives. Explain that request-call and planning actions open WhatsApp; do not add a backend form.

- [ ] **Step 4: Implement Journal index/detail generation**

Publish only three substantive guides from typed content. Keep advice evergreen, clearly scoped, and free of current visa/weather/regulatory claims that would require live verification.

- [ ] **Step 5: Verify routes and contact regression**

Run: `npm test -- --run app/supporting-routes.test.tsx components/enquiry/RequestCallForm.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/about app/contact app/journal components/journal components/contact components/enquiry/RequestCallForm.tsx
git commit -m "feat: add brand journal and contact routes"
```

### Task 8: Add Route-Aware Motion, Responsive Polish, and Accessibility Guards

**Files:**
- Create: `components/motion/MotionProvider.tsx`
- Create: `components/motion/PageTransition.tsx`
- Create: `components/motion/MotionProvider.test.tsx`
- Create: `components/a11y/SkipLink.tsx`
- Modify: `components/MotionReveal.tsx`
- Modify: `app/globals.css`
- Modify: all new route/card/planner components as findings require
- Modify: `e2e/site.spec.ts`

**Interfaces:**
- Consumes: motion tokens and all completed routes.
- Produces: route-aware animation policy, consistent reduced-motion behavior, skip navigation, mobile safe-area/sticky behavior, and broad browser coverage.

- [ ] **Step 1: Write failing motion-policy tests**

Assert reduced motion disables page transitions, parallax transforms, smooth scroll, route drawing, and auto-advancing hero announcements while preserving all content; normal motion exposes only the approved variants and never delays focusable content.

- [ ] **Step 2: Add failing browser journeys**

Cover direct nested-route navigation, desktop/mobile menus, keyboard destination/package filters including empty/reset state, itinerary accordion, full planner forward/back/edit and WhatsApp handoff, skip link, video failure, speech-synthesis absence, and 360px overflow/sticky-action safety.

- [ ] **Step 3: Run focused unit/e2e tests and record failures**

Run: `npm test -- --run components/motion && npm run test:e2e`

Expected: FAIL for the new policy and journeys before integration.

- [ ] **Step 4: Implement the centralized motion policy and skip navigation**

Wrap motion behavior once at layout level, preserve immediate server content, and use route transitions only as non-blocking visual enhancement.

- [ ] **Step 5: Resolve responsive and keyboard findings route by route**

At 360px verify no clipped controls, covered copy, off-canvas overflow, inaccessible filter sheet, or planner action collision. Preserve equivalent focus/hover information.

- [ ] **Step 6: Run unit and Playwright suites**

Run: `npm test -- --run && npm run test:e2e`

Expected: all tests PASS; the only allowed skip is an explicitly documented redundant real-timer animation pass.

- [ ] **Step 7: Commit**

```bash
git add app components e2e
git commit -m "feat: polish motion responsive behavior and accessibility"
```

### Task 9: Complete Metadata, Static Export, and Production Release

**Files:**
- Create: `lib/metadata.ts`
- Create: `lib/metadata.test.ts`
- Modify: `app/siteMetadata.ts`
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts`
- Modify: route `page.tsx` metadata exports
- Modify: `scripts/verify-assets.mjs`
- Modify: `README.md`
- Modify: `docs/media-credits.md`

**Interfaces:**
- Consumes: all typed content collections and completed routes.
- Produces: unique canonical metadata, complete static sitemap, supported structured data, release documentation, and verified live deployment.

- [ ] **Step 1: Write failing metadata and sitemap tests**

Assert unique title/description/canonical/Open Graph values for every published route, sitemap inclusion of every static slug with trailing slash, one canonical TravelAgency entity, valid breadcrumb data for detail pages, and absence of unsupported rating/price/availability fields.

- [ ] **Step 2: Run metadata tests**

Run: `npm test -- --run lib/metadata.test.ts`

Expected: FAIL until metadata is centralized and the sitemap is expanded.

- [ ] **Step 3: Implement metadata helpers and route exports**

Generate values from typed content, keep the canonical origin `https://gamya-sanchari.vercel.app`, and add schema only where source data supports it.

- [ ] **Step 4: Expand asset and content verification**

Make `scripts/verify-assets.mjs` fail for missing referenced media, excessive image/video size, uncredited new media, dead `#` links, inconsistent contact details, placeholder text, fabricated price/rating markers, or a static route missing from the sitemap.

- [ ] **Step 5: Update project documentation**

Document the new route map, content architecture, trip-planner privacy model, motion/reduced-motion policy, static build, test commands, media credits, and deployment workflow.

- [ ] **Step 6: Run the complete release gate**

Run: `npm run lint && npm test -- --run && node scripts/verify-assets.mjs && npm run build && npm run test:e2e`

Expected: every command exits 0 with no lint/build warnings, broken routes, missing assets, or unexpected test skips.

- [ ] **Step 7: Perform representative Lighthouse and visual QA**

Check `/`, `/destinations/`, one destination, `/packages/`, one package, `/plan-my-trip/`, and one journal article at desktop and 360px. Targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+. Save reports under ignored `work/lighthouse/` and fix material regressions before release.

- [ ] **Step 8: Commit the verified release state**

```bash
git add app lib scripts README.md docs package-lock.json
git commit -m "release: complete multipage Gamya Sanchari experience"
```

- [ ] **Step 9: Push and deploy only the verified commit**

Push `main`, deploy through the existing Vercel project, re-alias `https://gamya-sanchari.vercel.app` if required, and record the commit SHA and deployment ID.

- [ ] **Step 10: Smoke-test the public deployment**

Verify HTTP 200 and primary navigation for every sitemap route, load representative media, complete the planner through the outbound WhatsApp URL without sending a message, and confirm the deployed commit matches the verified local commit.

## Self-Review Record

- **Spec coverage:** All information-architecture, home narrative, destination, package, experience, planner, supporting-route, visual, motion, accessibility, performance, SEO, responsive, verification, and release requirements map to Tasks 1–9.
- **Step scan:** Each task owns one independently reviewable vertical slice and follows red/green/commit sequencing; implementation directions define interfaces and constraints without transcribing component bodies.
- **Type consistency:** `DestinationDetail`, `Journey`, `Experience`, `JournalArticle`, `PlannerDraft`, lookup helpers, filter state, and planner helper names are introduced once and consumed consistently by later tasks.
- **Review focus:** Unique slugs, empty filters, hostile session data, planner edit/encoding, and degraded-motion/media/device conditions each have named tests in their owning tasks.
- **Proportion:** The plan stays below code-level detail while being specific about routes, files, contracts, checks, and release criteria.

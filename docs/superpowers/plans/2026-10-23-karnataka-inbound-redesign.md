# Karnataka-first Inbound Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Gamya Sanchari a warm, Karnataka-first inbound India travel website for international visitors.

**Architecture:** Extend the existing typed destination registry with Hampi, introduce one focused homepage chapter, and reuse the current routing/planner system. Apply one consistent warm token mapping across existing Tailwind arbitrary colours rather than adding a second styling layer.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-23-karnataka-inbound-redesign-design.md`

## Global Constraints

- Preserve the official logo colours and licensed hero montage.
- Preserve all current routes and enquiry behaviour.
- Add no runtime dependency and invent no prices, dates, testimonials or guarantees.
- Reduced-motion and 360 px layouts must remain operable.

## Review Focus

- Hampi must be resolvable through the destination registry, route generator and planner.
- Inbound positioning must appear in visible hero copy and metadata, not only decorative sections.
- Old blue/navy theme values must not remain in production UI source, except official raster brand assets.
- Warm foreground/background combinations must retain readable contrast and visible focus states.
- Existing outbound journeys must remain browsable as a secondary offering.

---

### Task 1: Pin the inbound content and palette contract

**Files:**
- Modify: `lib/travel-content.test.ts`
- Modify: `lib/metadata.test.ts`
- Modify: `components/Hero.test.tsx`
- Modify: `components/home/home-sections.test.tsx`
- Modify: `scripts/verify-assets.mjs`

- [ ] Write failing tests for a first-position Hampi destination, Karnataka-led hero and homepage chapter, inbound metadata, and absence of old theme hex values.
- [ ] Run the focused tests and asset verifier; confirm failures describe the missing redesign.

### Task 2: Add Hampi and the Karnataka gateway

**Files:**
- Create: `public/images/destinations/hampi.webp`
- Create: `components/home/KarnatakaGateway.tsx`
- Modify: `constants/travel.ts`
- Modify: `app/page.tsx`
- Modify: `docs/media-credits.md`

- [ ] Optimize the generated Hampi artwork into a locally hosted WebP and credit it.
- [ ] Add the typed Hampi destination and a homepage section linking Hampi plus Karnataka highlights.
- [ ] Run travel-content and homepage tests until green.

### Task 3: Reposition the visitor journey

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `constants/content.ts`
- Modify: `components/home/FeaturedJourneys.tsx`
- Modify: `components/home/PlannerPreview.tsx`
- Modify: `components/planner/TripPlanner.tsx`
- Modify: `components/layout/SiteFooter.tsx`
- Modify: `app/siteMetadata.ts`
- Modify: `lib/metadata.ts`

- [ ] Lead with inbound Karnataka/India copy, relabel primary navigation, and surface Hampi in discovery and planning.
- [ ] Keep outbound international journeys accessible as secondary content.
- [ ] Run focused component and metadata tests until green.

### Task 4: Replace the old visual system across every page

**Files:**
- Modify: `app/globals.css`, `tailwind.config.ts`, and production `.tsx` files under `app/` and `components/` containing old theme values.

- [ ] Replace the old blue/navy/near-black palette with terracotta, forest, sandstone, ivory and gold equivalents.
- [ ] Run the asset/theme verifier and lint; resolve every remaining production-theme violation.

### Task 5: Verify, review and release

**Files:**
- Modify: `e2e/site.spec.ts`

- [ ] Add browser coverage for the Karnataka chapter, Hampi route and mobile layout.
- [ ] Run unit tests, lint, asset verifier, production build and Playwright desktop/mobile suites.
- [ ] Request independent code review and resolve Critical/Important findings.
- [ ] Merge to `main`, deploy to Vercel, alias `gamya-sanchari.vercel.app`, and verify live assets and routes.

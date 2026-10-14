# Premium Motion System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Gamya Sanchari a coherent premium motion and material system across its landing experience while preserving accessibility, speed, and conversion behavior.

**Architecture:** Extend the existing centralized motion policy with reusable kinetic-text and scroll-progress primitives. Establish premium CSS material tokens/classes, then compose those primitives into the hero and landing sections without changing page content or data contracts.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion 11, Vitest, Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-15-premium-motion-system.md`

## Global Constraints

- Preserve semantic text, keyboard behavior, focus visibility, routes, and enquiry flows.
- Respect `prefers-reduced-motion` and keep content readable without IntersectionObserver.
- Animate primarily `transform` and `opacity`; do not hijack scrolling.
- Keep mobile layouts usable from 320px upward and do not make hover essential.
- Retain the established Gamya Sanchari palette and brand assets.

## Review Focus

- Reduced-motion users must receive static content, no transform choreography, and no decorative progress animation.
- Server-rendered and no-IntersectionObserver environments must not leave text or content hidden.
- Kinetic headings must expose one readable accessible name, without duplicated words for screen readers.
- Decorative gloss/grain layers must not intercept clicks, obscure focus, or create horizontal overflow.
- Repeated card effects must stay compositor-friendly and usable on touch/mobile devices.

---

### Task 1: Accessible motion primitives

**Files:**
- Create: `components/motion/KineticText.tsx`
- Create: `components/motion/ScrollProgress.tsx`
- Modify: `components/motion/MotionProvider.tsx`
- Modify: `components/motion/MotionComponents.test.tsx`

**Interfaces:**
- Produces: `KineticText({ text, as, className, accentWords })` and `ScrollProgress()` governed by `useMotionPolicy()`.
- Produces: motion policy flags for kinetic text and decorative scroll progress.

- [ ] Write tests asserting accessible text, word choreography markers, scroll-progress markers, and static reduced-motion output.
- [ ] Run the focused motion tests and verify they fail because the new primitives do not exist.
- [ ] Implement the primitives and policy flags with transform/opacity-only choreography.
- [ ] Run the focused tests and full unit suite; verify they pass.
- [ ] Commit the task.

### Task 2: Premium material and typography system

**Files:**
- Modify: `app/globals.css`
- Modify: `components/SectionHeading.tsx`
- Modify: `components/sections.test.tsx`

**Interfaces:**
- Consumes: `KineticText` from Task 1.
- Produces: `.premium-surface`, `.premium-card`, `.premium-button`, `.section-atmosphere`, `.text-shimmer`, and shared heading choreography.

- [ ] Write tests asserting shared headings expose the kinetic marker and premium material hooks.
- [ ] Run the focused section tests and verify they fail on the missing hooks.
- [ ] Add material tokens/classes, focus-safe interactive effects, reduced-motion overrides, and the upgraded `SectionHeading`.
- [ ] Run focused tests, lint, and the full unit suite; verify they pass.
- [ ] Commit the task.

### Task 3: Landing-page cinematic choreography

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/home/TravelIntentSelector.tsx`
- Modify: `components/home/FeaturedJourneys.tsx`
- Modify: `components/home/HandledInclusions.tsx`
- Modify: `components/home/PreviousDepartures.tsx`
- Modify: `components/home/TravelDesk.tsx`
- Modify: `components/home/PlanningRoute.tsx`
- Modify: `components/home/PlannerPreview.tsx`
- Modify: `components/home/ConfidenceClose.tsx`
- Modify: `components/packages/PackageCard.tsx`
- Modify: `app/page.tsx`
- Modify: `components/Hero.test.tsx`
- Modify: `components/home/home-sections.test.tsx`

**Interfaces:**
- Consumes: Tasks 1–2 motion primitives and material classes.
- Produces: premium hero, scroll progress, atmospheric section transitions, glossy cards, and coordinated microinteractions across the landing narrative.

- [ ] Write tests asserting the hero kinetic treatment, landing scroll progress, premium section/card hooks, and preserved content order.
- [ ] Run focused tests and verify failure on the missing choreography hooks.
- [ ] Integrate the shared system across the hero and landing-page components without changing content contracts.
- [ ] Run focused tests, full unit suite, lint, production build, and Playwright suite; verify all pass.
- [ ] Commit the task.

### Task 4: Visual and accessibility verification

**Files:**
- Modify only if verification reveals a defect in the files above.

**Interfaces:**
- Consumes: complete landing experience from Task 3.
- Produces: browser-verified desktop, mobile, keyboard, reduced-motion, and overflow behavior.

- [ ] Run the site locally and inspect hero, sections, navigation, enquiry, and planner at desktop and 360px mobile sizes.
- [ ] Verify reduced-motion behavior, focus visibility, text accessibility, click targets, and horizontal overflow.
- [ ] If a defect is found, add a failing regression test, fix it, and rerun the relevant suite.
- [ ] Run final unit, lint, build, and Playwright evidence commands.
- [ ] Commit any verification fixes and prepare the branch review package.

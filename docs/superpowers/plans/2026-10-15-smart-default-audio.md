# Smart Default Audio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a default-on, browser-compatible ambient music and spoken welcome experience to the landing-page travel host.

**Architecture:** A focused `WelcomeSound` client component owns both media elements, session preference, autoplay recovery, music ducking, and accessible controls. `Hero` continues to own the cinematic host reveal and embeds the component only when the host is present. Media remains local so production has no runtime third-party dependency.

**Tech Stack:** React 18, TypeScript, Next.js 14 static export, Vitest/Testing Library, Playwright, HTMLMediaElement.

**Spec:** `docs/superpowers/specs/2026-10-15-smart-default-audio.md`

## Global Constraints

- The spoken copy must remain exactly: “Namaskara, and welcome to Gamya Sanchari. Tell us how you dream of travelling. We'll thoughtfully bring together your flights, stays, transfers, and experiences, so your journey feels truly yours.”
- Sound is enabled by default for each new browser session.
- Audible autoplay rejection must fall back to the first intentional visitor interaction.
- Written content and navigation must remain usable when either media asset fails.
- All audio is local and compatible with the static export.

## Review Focus

- Browser rejects initial playback: the UI must expose “Start sound” and a later visitor gesture must retry.
- React mounts effects more than once: narration must not overlap or start twice.
- Visitor muted in this session: remounting must not restart either track.
- Narration fails while music works: written copy and music control must remain usable.
- Mobile 360 px layout: sound controls must wrap without horizontal overflow.

---

### Task 1: Build the welcome-sound controller

**Files:**
- Create: `components/audio/WelcomeSound.tsx`
- Create: `components/audio/WelcomeSound.test.tsx`

**Interfaces:**
- Consumes: `active: boolean`, `className?: string`
- Produces: `WelcomeSound({ active, className }: WelcomeSoundProps): JSX.Element`

- [ ] **Step 1: Write failing component tests**

Cover default playback of both local tracks, blocked-autoplay recovery through a non-control gesture, once-per-session narration, session-scoped mute, narration ducking/recovery, replay, independent media errors, and cleanup.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- components/audio/WelcomeSound.test.tsx --run`

Expected: FAIL because `WelcomeSound` does not exist.

- [ ] **Step 3: Implement `WelcomeSound`**

Use two native audio elements, guarded effects, sessionStorage with safe fallbacks, explicit volume levels, a document-level first-interaction retry that ignores its own controls, and accessible status/control copy.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- components/audio/WelcomeSound.test.tsx --run`

Expected: PASS.

- [ ] **Step 5: Commit**

Commit: `feat: add smart default welcome audio`

### Task 2: Integrate the experience and ship the original ambient asset

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/Hero.test.tsx`
- Modify: `e2e/site.spec.ts`
- Create: `public/audio/gamya-ambient-journey.mp3`
- Modify: `docs/media-credits.md`

**Interfaces:**
- Consumes: `WelcomeSound({ active: true })`
- Produces: landing-page host with default-on welcome audio and visible controls

- [ ] **Step 1: Update Hero and browser tests first**

Assert that the host embeds the sound experience after reveal, preserves the exact transcript and fallback content, exposes controls at 360 px, and uses local audio assets.

- [ ] **Step 2: Run the affected tests and verify RED**

Run: `npm test -- components/Hero.test.tsx --run`

Expected: FAIL because Hero still owns the old click-only audio implementation.

- [ ] **Step 3: Integrate `WelcomeSound` and generate the ambient track**

Replace the old host audio state with `WelcomeSound`, generate a quiet original instrumental MP3 locally, and document its provenance.

- [ ] **Step 4: Run affected tests and verify GREEN**

Run: `npm test -- components/Hero.test.tsx components/audio/WelcomeSound.test.tsx --run`

Expected: PASS.

- [ ] **Step 5: Run the complete release checks**

Run unit tests, lint, production build, and the full Playwright suite.

Expected: all checks exit 0.

- [ ] **Step 6: Commit**

Commit: `feat: integrate ambient landing-page welcome`


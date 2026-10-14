# Gamya Sanchari Marketing Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, publish, and deploy the static Gamya Sanchari marketing website with accessible WhatsApp-only enquiry flows.

**Architecture:** Import the component structure of `adrianhajdin/travel_ui_ux` into the existing repository history, upgrade it to Next.js 14, and replace its UI with focused server-rendered content sections plus a small client-side interaction layer. Centralized brand/content data and one enquiry provider keep every business detail and WhatsApp path consistent; the output is a static export deployed to Vercel.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest, Testing Library, Playwright, Lighthouse.

**Spec:** `docs/superpowers/specs/2026-10-14-gamya-sanchari-design.md`

## Global Constraints

- Preserve recognizable component-oriented patterns from `https://github.com/adrianhajdin/travel_ui_ux` and credit that base.
- Use Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, and Libre Franklin weights 400–800 through `next/font/google`.
- Configure `output: "export"`; use no database, CMS, auth, server actions, stored enquiries, or environment variables.
- Use exact business values: `https://wa.me/918073254766`, `tel:+918073254766`, `+91 80732 54766`, `reach@gamyasanchari.com`, `https://www.instagram.com/gamya_sanchari/`, and `Bengaluru, Karnataka, India`.
- Use exact brand colors `#1844ef`, `#f06619`, `#212121`, `#656565`, `#f3f3f3`, with blue buttons changing to orange on hover/focus.
- Preserve supplied section copy, labels, destinations, services, benefits, and taglines; do not invent business claims.
- No placeholder copy, dead `#` hrefs, login/signup/membership UI, dummy contact data, or uncredited media.
- Maintain semantic HTML, visible focus, reduced-motion behavior, 44px targets, and no horizontal overflow at 360px.
- Keep the local hero MP4 below 6 MB with poster fallback, `muted`, `playsInline`, `loop`, `autoPlay`, and `preload="metadata"`.

## Review Focus

- WhatsApp input containing `+`, spaces, `&`, emoji, or line breaks must be encoded once and remain readable after URL decoding; Task 2 pins this behavior.
- Empty optional email must not produce an `Email:` line or the string `undefined`; Task 2 pins this behavior.
- A modal opened by keyboard must trap focus, close on Escape/overlay/close button, and restore focus to its trigger; Task 3 pins these paths.
- Reduced-motion users and browsers where video playback fails must immediately retain readable final hero content over the poster; Task 4 pins both conditions.
- At 360px, fixed widgets, the mobile menu, and modal must remain operable without horizontal overflow or covered controls; Task 7 pins this in browser tests.

---

### Task 1: Import the Base and Establish a Reproducible Next.js 14 Test Harness

**Files:**
- Import/modify: `app/**`, `components/**`, `constants/**`, `public/**`, `.gitignore`, `package.json`, `package-lock.json`, `postcss.config.js`, `tailwind.config.ts`, `tsconfig.json`
- Delete after import: `next.config.js`
- Create: `next.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`
- Preserve: `docs/superpowers/**`

**Interfaces:**
- Consumes: upstream `adrianhajdin/travel_ui_ux` component layout and assets.
- Produces: `npm run lint`, `npm test`, `npm run build`, and `npm run test:e2e` commands; static-export Next.js shell used by every later task.

- [ ] **Step 1: Import the upstream base without replacing this repository's Git history**

Add the upstream repository as `upstream`, fetch `main`, and check out its project files into this working tree while preserving `docs/superpowers`. Record the upstream commit SHA in the eventual README.

- [ ] **Step 2: Replace dependency and configuration inputs**

Set Next.js to the latest compatible 14.2.x patch, React 18, Tailwind CSS, Framer Motion, Lucide React, ESLint, Vitest/jsdom, Testing Library/user-event/jest-dom, Playwright, and Lighthouse. Configure `next.config.mjs` with `output: "export"`, unoptimized static images, strict React mode, and trailing slashes. Configure scripts `dev`, `lint`, `test`, `test:watch`, `test:e2e`, `build`, and `lighthouse`.

- [ ] **Step 3: Install from the declared dependencies**

Run: `npm install`
Expected: lockfile created/updated and install exits 0 without unresolved peer-dependency errors.

- [ ] **Step 4: Add a failing smoke test for the imported shell**

Create `app/page.test.tsx` asserting the root page renders a `main` landmark and has no duplicate `main` landmarks.

- [ ] **Step 5: Verify the harness recognizes the test**

Run: `npm test -- --run app/page.test.tsx`
Expected: FAIL if the imported root lacks a single accessible `main`; otherwise temporarily change the expected role to prove the test can fail, restore it, and continue.

- [ ] **Step 6: Make the smoke test pass**

Add or normalize the imported page's single `main` landmark without beginning the brand redesign.

Run: `npm test -- --run app/page.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "chore: import travel base and configure Next.js 14"
```

### Task 2: Centralize Brand Content and WhatsApp URL Construction

**Files:**
- Create: `constants/brand.ts`, `constants/content.ts`, `lib/whatsapp.ts`, `lib/whatsapp.test.ts`, `types/content.ts`

**Interfaces:**
- Consumes: exact data and copy in the design spec.
- Produces: `BRAND`, `NAV_LINKS`, `DESTINATIONS`, `SERVICES`, `BENEFITS`, `TRAVELLER_STORIES`; `buildWhatsAppUrl(input: WhatsAppEnquiry): string`; `buildRequestCallUrl(phone: string): string`.

- [ ] **Step 1: Write failing WhatsApp formatting tests**

Test that the base number is `918073254766`, reserved characters and Kannada/emoji round-trip through `URLSearchParams`, destination/service context appears in the message, blank optional email omits the email line, and request-call phone input is normalized without mutating its displayed value.

- [ ] **Step 2: Run the focused test**

Run: `npm test -- --run lib/whatsapp.test.ts`
Expected: FAIL because `buildWhatsAppUrl` and `buildRequestCallUrl` do not exist.

- [ ] **Step 3: Implement typed brand/content constants and URL builders**

Use a `WhatsAppEnquiry` interface with `name`, `phone`, optional `email`, `message`, and optional `context`. Generate the full `https://wa.me/918073254766?text=...` URL through `URLSearchParams` exactly once.

- [ ] **Step 4: Run the focused tests**

Run: `npm test -- --run lib/whatsapp.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add constants lib types
git commit -m "feat: centralize travel content and enquiry links"
```

### Task 3: Build the Accessible Shared Enquiry System

**Files:**
- Create: `components/enquiry/EnquiryProvider.tsx`, `components/enquiry/EnquiryModal.tsx`, `components/enquiry/RequestCallForm.tsx`, `components/enquiry/EnquiryModal.test.tsx`, `components/enquiry/RequestCallForm.test.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppUrl`, `buildRequestCallUrl` from Task 2.
- Produces: `useEnquiry(): { openEnquiry(context?: string): void; closeEnquiry(): void }`; `<EnquiryProvider>`; `<EnquiryModal>`; `<RequestCallForm>`.

- [ ] **Step 1: Write failing modal interaction tests**

Assert context prefill, visible labels, required name/phone/message fields, optional email, initial focus, Tab/Shift+Tab trapping, Escape close, overlay close, inside-click retention, body-scroll lock, trigger-focus restoration, and a submission URL with no stored/network request.

- [ ] **Step 2: Write failing request-call tests**

Assert the phone input has an accessible label and autocomplete, blocks blank submission through required validation, and opens the formatted WhatsApp URL for a valid phone.

- [ ] **Step 3: Run focused tests**

Run: `npm test -- --run components/enquiry`
Expected: FAIL because the provider and form components do not exist.

- [ ] **Step 4: Implement the provider, modal, and request-call form**

Use a portal-free fixed dialog inside the provider so static export is deterministic. Keep trigger references in a ref, manage body overflow in an effect, and call `window.open(url, "_blank", "noopener,noreferrer")` only from explicit submits/actions.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- --run components/enquiry`
Expected: PASS with no React act warnings.

- [ ] **Step 6: Commit**

```bash
git add components/enquiry
git commit -m "feat: add accessible WhatsApp enquiry flow"
```

### Task 4: Build Navigation, Hero, and Global Controls

**Files:**
- Create: `components/Navbar.tsx`, `components/Hero.tsx`, `components/MotionReveal.tsx`, `components/GlobalWidgets.tsx`, `components/Navbar.test.tsx`, `components/Hero.test.tsx`, `components/GlobalWidgets.test.tsx`

**Interfaces:**
- Consumes: `NAV_LINKS`, `BRAND`, and `useEnquiry` from Tasks 2–3.
- Produces: responsive navigation, announcement hero, floating WhatsApp control, enquiry rail, and back-to-top control.

- [ ] **Step 1: Write failing navigation tests**

Assert exact link labels and real section IDs, 44px menu button class, correct `aria-expanded`, close-on-link, Escape close, and focus return.

- [ ] **Step 2: Write failing hero and widget tests**

Assert video attributes and poster, final fallback text in static markup, the three timed messages in normal motion, immediate final state under reduced motion, persistent poster after a video error, exact WhatsApp CTA, 300px back-to-top threshold, and reduced-motion scroll behavior.

- [ ] **Step 3: Run focused tests**

Run: `npm test -- --run components/Navbar.test.tsx components/Hero.test.tsx components/GlobalWidgets.test.tsx`
Expected: FAIL because the components do not exist.

- [ ] **Step 4: Implement navigation, motion wrapper, hero, and widgets**

Keep hero final copy in server-visible markup and enhance its sequence client-side. Use Framer Motion's reduced-motion hook and CSS fallbacks; fixed widgets must collapse to compact controls below the tablet breakpoint.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- --run components/Navbar.test.tsx components/Hero.test.tsx components/GlobalWidgets.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components
git commit -m "feat: create cinematic hero and global navigation"
```

### Task 5: Assemble Marketing Sections, Metadata, and Structured Data

**Files:**
- Create: `components/About.tsx`, `components/Destinations.tsx`, `components/Services.tsx`, `components/WhyUs.tsx`, `components/Testimonials.tsx`, `components/Footer.tsx`, `components/sections.test.tsx`, `app/robots.ts`, `public/site.webmanifest`
- Modify: `app/page.tsx`, `app/page.test.tsx`, `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`

**Interfaces:**
- Consumes: content constants, `MotionReveal`, `useEnquiry`, `RequestCallForm`, global navigation/hero/widgets.
- Produces: complete one-page site, section IDs, static metadata, `TravelAgency` JSON-LD, and all brand styling.

- [ ] **Step 1: Write failing section and page tests**

Assert the exact About paragraph and bold close, five destination groups, eight services, six benefits, three clearly marked sample traveller stories, card-to-modal contexts, footer contact links, every navigation target, one `main`, and absence of account/membership language.

- [ ] **Step 2: Add failing metadata/JSON-LD assertions**

Assert Open Graph title `Gamya Sanchari | Your Journey Awaits`, exact contact fields, the intended canonical URL `https://gamya-sanchari.vercel.app`, and no invented street, rating, pricing, or hours fields. Task 8 must reconcile this value if Vercel assigns a different production hostname.

- [ ] **Step 3: Run page and section tests**

Run: `npm test -- --run app/page.test.tsx components/sections.test.tsx`
Expected: FAIL because the Gamya Sanchari page is not assembled.

- [ ] **Step 4: Implement all server sections and the page composition**

Use focused components, semantic sections, responsive grids, stable image aspect ratios, descriptive alt text, and client wrappers only around animated/interactable elements. All card activations call `openEnquiry` with the exact destination or service title.

- [ ] **Step 5: Implement layout metadata, JSON-LD, manifest, and global design tokens**

Configure Libre Franklin through `next/font/google`, inject schema as serialized trusted constants, and define global overflow, focus, motion, button, container, and section styles using the specified palette.

- [ ] **Step 6: Run unit tests and lint**

Run: `npm test -- --run && npm run lint`
Expected: all tests PASS; lint exits 0 with zero warnings.

- [ ] **Step 7: Commit**

```bash
git add app components public/site.webmanifest tailwind.config.ts
git commit -m "feat: assemble Gamya Sanchari marketing site"
```

### Task 6: Source, Optimize, and Credit Production Media

**Files:**
- Create: `public/videos/hero.mp4`, `public/images/hero-poster.webp`, `public/images/about.webp`, `public/images/destinations/*.webp`, `public/images/og-image.jpg`, `public/favicon.ico`, `docs/media-credits.md`, `scripts/verify-assets.mjs`
- Modify: media paths in content/components as needed.

**Interfaces:**
- Consumes: exact asset slots and aspect ratios declared in Tasks 4–5.
- Produces: deterministic local, free-license visual assets with documented source URLs and licenses.

- [ ] **Step 1: Select verifiable free-license sources**

Record provider, creator where available, source page URL, license URL, and intended local filename before downloading. Prefer Pexels/Coverr for the airplane video and Unsplash/Pexels for region imagery.

- [ ] **Step 2: Download and optimize assets**

Use `ffmpeg` to create an H.264/AAC-free hero MP4 below 6 MB and extract/resize the poster; use WebP/JPEG derivatives sized to their display slots. Do not retain unnecessary original downloads in the repository.

- [ ] **Step 3: Verify media constraints**

Run: `du -h public/videos/hero.mp4 && ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 public/videos/hero.mp4`
Expected: valid duration and size below 6,000,000 bytes.

- [ ] **Step 4: Verify all referenced media exists**

Implement and run `node scripts/verify-assets.mjs`; it parses local `/images/` and `/videos/` references and asserts each referenced file exists and is non-empty.
Expected: PASS with no missing asset paths.

- [ ] **Step 5: Commit**

```bash
git add public docs/media-credits.md constants components
git commit -m "assets: add optimized licensed travel media"
```

### Task 7: Cross-Browser Interaction and Responsive QA

**Files:**
- Create: `e2e/site.spec.ts`
- Modify: components/styles only for observed failures.

**Interfaces:**
- Consumes: complete local site from Tasks 1–6.
- Produces: browser-level proof of navigation, modal, form, video fallback, widgets, and 360px layout behavior.

- [ ] **Step 1: Write end-to-end tests for desktop and 360px mobile**

Cover section-link scrolling, menu open/close/Escape, every destination/service card opening the correct context, all modal close paths, a WhatsApp submission popup URL, request-call URL, fixed controls, back-to-top appearance, keyboard traversal, video-error fallback, reduced motion, and `document.documentElement.scrollWidth <= innerWidth`.

- [ ] **Step 2: Run the tests to expose integration defects**

Run: `npm run build && npm run test:e2e`
Expected: FAIL only for concrete behavior/layout defects, not setup errors.

- [ ] **Step 3: Repair observed integration defects**

Change only the owning component or style for each failing assertion; add a focused unit regression when the defect is logic rather than layout.

- [ ] **Step 4: Re-run the browser suite**

Run: `npm run test:e2e`
Expected: PASS on configured desktop and mobile projects.

- [ ] **Step 5: Commit**

```bash
git add e2e app components
git commit -m "test: verify responsive enquiry journeys"
```

### Task 8: Production Audit, Documentation, GitHub, and Vercel

**Files:**
- Create: `README.md`, `LICENSE`, `public/images/site-preview.webp`
- Modify: metadata canonical/Open Graph URLs after deployment if necessary.

**Interfaces:**
- Consumes: production-ready static export.
- Produces: verified clean repository, public GitHub URL, Vercel URL, production screenshot, and measured Lighthouse report.

- [ ] **Step 1: Run the prohibited-content and contact-consistency audit**

Use `rg` across tracked source files to reject lorem ipsum, `yourdomain.com`, `href="#"`, dummy phone/email values, Hilink/base copy, and login/signup/membership UI. Separately enumerate all `wa.me`, `tel:`, email, Instagram, and location instances and confirm exact values.
Expected: no prohibited matches; all business-data matches are canonical.

- [ ] **Step 2: Run the complete verification suite from clean inputs**

Run: `npm ci && npm test -- --run && npm run lint && npm run build && npm run test:e2e`
Expected: every command exits 0 with no errors or warnings.

- [ ] **Step 3: Run Lighthouse against the production-mode local build**

Measure mobile and desktop Performance, Accessibility, Best Practices, and SEO. Iterate on measured bottlenecks until the required minimums are 90/95/95/95, then save reports under ignored `work/lighthouse/`.

- [ ] **Step 4: Capture the real production preview and finish documentation**

Create `public/images/site-preview.webp` from the verified site. Document setup, env-free architecture, scripts, project structure, base-project credit and SHA, media credits, WhatsApp privacy behavior, and MIT license in README; add `LICENSE`.

- [ ] **Step 5: Perform the final verification-before-completion pass**

Re-run build/lint/tests/source scans after documentation and screenshot changes, inspect `git diff --check`, and confirm `git status` contains only intended files.

- [ ] **Step 6: Commit and push the public GitHub repository**

Rename the branch to `main`, then run `gh repo create gamya-sanchari --public --source=. --push`. If the exact repository already exists under the authenticated owner, verify ownership and attach it as `origin` rather than overwriting unrelated content.
Expected: `gh repo view --json url,visibility` reports the expected URL and `PUBLIC`.

- [ ] **Step 7: Deploy with Vercel**

Run: `vercel --prod`
Expected: a successful production deployment URL. If authentication alone is missing, pause for the user's Vercel token and resume the same step.

- [ ] **Step 8: Verify production and update canonical metadata if needed**

Check the live URL, critical links, page source, static assets, JSON-LD, and HTTPS response. If the production hostname differs from configured metadata, update it, rebuild, redeploy, and reverify.

- [ ] **Step 9: Commit and push final deployment metadata if changed**

```bash
git add README.md LICENSE app public/images/site-preview.webp
git commit -m "docs: finalize production release"
git push origin main
```

# Gamya Sanchari Marketing Website Design

## Purpose

Build and deploy a polished, fully static marketing website for Gamya Sanchari, a Bengaluru-based travel-planning brand. The site should turn visitors into qualified WhatsApp enquiries while presenting the business as warm, personal, trustworthy, and premium without feeling exclusive or corporate.

The public deliverables are a GitHub repository named `gamya-sanchari` and a production Vercel deployment. There is no account system, database, CMS, or server-side enquiry storage.

## Source and Technical Foundation

- Start from the open-source `adrianhajdin/travel_ui_ux` project and retain its useful component-oriented Next.js structure and responsive patterns.
- Use Next.js 14 App Router, TypeScript, and Tailwind CSS.
- Use Framer Motion for hero sequencing and scroll reveals.
- Use `next/font/google` with Libre Franklin weights 400 through 800.
- Configure `output: "export"`; every feature must work in a static deployment.
- Use no environment variables and no backend services.
- Preserve attribution to the source project in the README.

## Brand System

- Primary blue: `#1844ef`.
- Accent orange: `#f06619`.
- Dark: `#212121`.
- Body text: `#656565`.
- Page background: `#f3f3f3`.
- Primary buttons begin blue and transition to orange on hover/focus.
- Display the bilingual lockup `Gamya Sanchari / ಗಮ್ಯ ಸಂಚಾರಿ · Travel Planners` in the navigation and use Kannada in the hero.
- Voice: warm, direct, and reassuring. The planning promise is “We listen first, then plan.”

## Information Architecture

The one-page route contains these ordered landmarks:

1. Sticky glass navigation with desktop links and an accessible mobile menu.
2. Full-viewport cinematic hero.
3. About introduction.
4. Destination collection.
5. Services grid.
6. “Why Gamya Sanchari” value grid.
7. Traveller-story testimonials.
8. Footer with contact details and request-a-call flow.

Global UI includes the enquiry modal, floating WhatsApp button, right-side enquiry rail, and a back-to-top control.

## Hero Experience

The hero fills `100svh` and uses a local, free-license airplane-landing video at golden hour. The optimized MP4 target is less than 6 MB and has a local poster image. The video uses `muted`, `autoPlay`, `loop`, `playsInline`, `preload="metadata"`, explicit sizing, and a poster. A dark gradient makes all foreground copy legible.

The announcement progresses through three approximately 2.2-second messages and then settles on the persistent final state:

1. “✈️ Ladies and gentlemen, this is your captain speaking…”
2. “We are now beginning our descent into your dream destination.”
3. “ಗಮ್ಯ ಸಂಚಾರಿ — Your Journey Awaits.”
4. “Enjoy your holidays with GAMYA SANCHARI” with “Domestic | International | Experiences” and the two required calls to action.

“Explore Destinations” scrolls to the destination section. “Enquire on WhatsApp” opens the exact supplied WhatsApp URL. If media playback fails or JavaScript is unavailable, the poster and meaningful final content remain visible. Under reduced-motion preferences, animated transitions are suppressed and the final message is shown directly.

## Content Sections

### About

Use the supplied “Welcome to Gamya Sanchari” copy verbatim, including the bold closing statement. The split composition combines travel imagery with a layered editorial card and remains linear and readable on mobile.

### Destinations

Render five image-led cards with the exact supplied regions and destination lists. Each card uses accessible text, a restrained hover/focus zoom, and a visual overlay. Activating a card opens the enquiry modal with that region prefilled.

Images must be sourced from a reputable free-license provider, stored locally where practical for deterministic static output, credited in project documentation, and supplied with descriptive alternative text. Decorative images use empty alternative text.

### Services

Render the eight supplied services as reusable cards with a consistent icon system. Each card opens the same modal with its service context prefilled.

### Why Us

Render the six supplied value propositions as concise icon cards. Supporting copy should reinforce listening, clarity, comfort, safety, and responsive support without inventing certifications, guarantees, or business claims.

### Traveller Stories

Render three clearly labelled sample traveller stories. Use fictional first-name-and-trip labels such as “Ananya · Coorg honeymoon” and avoid implying that the samples are verified reviews or real customers.

### Footer

Include the brand summary, quick links, useful links, exact phone, email, Bengaluru address, Instagram link, and WhatsApp link. The “Request a Call” mini-form accepts a phone number and opens a formatted WhatsApp message; it does not submit or store data.

## Enquiry Interaction Model

A single client-side modal serves destination cards, service cards, the side rail, and generic enquiry buttons. Its fields are name, phone, optional email, and message. A contextual title/message is filled when launched from a destination or service.

Submitting constructs a URL-encoded message and opens `https://wa.me/918073254766`. No network request is made by the application and no data is retained. The form uses visible labels, appropriate input types and autocomplete tokens, basic client-side required-field validation, and a clear explanation that submission opens WhatsApp.

The modal traps focus, places initial focus predictably, restores focus to its trigger, closes via Escape, close control, or overlay click, and prevents accidental close for clicks inside the dialog. Page scrolling is locked only while the dialog is open.

## Global Navigation and Controls

- Anchor links point to real section IDs; no empty or `#`-only links are allowed.
- The mobile menu button has an accessible name, communicates expanded state, is at least 44 by 44 CSS pixels, closes after link activation, and responds to Escape.
- The left floating WhatsApp control uses `#25d366` and has an accessible label.
- The right-side tab exposes “Enquire Now,” “WhatsApp,” and “Contact Us” actions without covering critical content on narrow screens.
- The back-to-top control appears after 300 pixels of scrolling, uses a real button, and honors reduced-motion preferences.

## Business Data

All instances use these exact values:

- WhatsApp: `https://wa.me/918073254766`
- Telephone target: `tel:+918073254766`
- Display telephone: `+91 80732 54766`
- Email: `reach@gamyasanchari.com`
- Instagram: `https://www.instagram.com/gamya_sanchari/`
- Location: `Bengaluru, Karnataka, India`
- Taglines: “Your Journey Awaits ✨” and “May every journey be safe, joyful and blessed with beautiful destinations.”

## Accessibility and Responsive Behavior

- Use semantic landmarks, ordered heading levels, visible keyboard focus, labelled controls, and WCAG-conscious contrast.
- Preserve usable layouts without horizontal overflow at 360 CSS pixels.
- Interactive targets are at least 44 CSS pixels in both dimensions wherever physically possible.
- Keyboard and screen-reader users can operate navigation, cards, modal, forms, and global controls.
- Motion respects `prefers-reduced-motion`; functionality never depends on animation.
- Images reserve space to prevent layout shift.

## Performance and Reliability

- The hero video must not be treated as the LCP content; preload only metadata and prioritize the poster/foreground content.
- Optimize local imagery and use responsive image sizing.
- Avoid unnecessary client components. Only interactive sections hydrate.
- Handle video errors by retaining the poster presentation.
- External destinations opened in a new tab use safe `rel` attributes.
- The static export must work without runtime APIs.

## SEO and Structured Data

Provide a descriptive title and summary, canonical metadata, viewport/theme metadata, favicon, robots directives, Open Graph, and Twitter metadata. Open Graph title is exactly `Gamya Sanchari | Your Journey Awaits`.

Embed valid `TravelAgency` JSON-LD with the supplied name, phone, email, Instagram URL, and Bengaluru postal address at locality/region/country granularity. Do not invent street-level details, ratings, prices, or opening hours.

## Verification

The work is complete only when all applicable checks succeed:

- Dependency installation is reproducible from the lockfile.
- Lint reports no errors or warnings.
- Production static build succeeds with no errors or warnings.
- Automated tests cover WhatsApp URL formatting, enquiry context, modal keyboard/close behavior, navigation behavior, and reduced-motion hero behavior.
- Source scans find no lorem ipsum, placeholder domains, dead `#` links, dummy contact data, login/signup/membership UI, or inconsistent business details.
- Browser QA covers desktop and 360-pixel mobile layouts, all navigation links, every modal launch path, form submission, menu behavior, video/poster behavior, and back-to-top visibility.
- Lighthouse targets are Performance 90 or higher, Accessibility 95 or higher, Best Practices 95 or higher, and SEO 95 or higher. Report measured scores rather than estimates.

## Repository and Deployment

- Supply a clean README with local setup, build/export steps, project structure, contact architecture, media credits, an actual production screenshot, base-project credit, and an MIT-style license note. This resolves the brief's request for a screenshot placeholder in favor of its stricter prohibition on placeholder content.
- Supply `.gitignore` and a clean Git history.
- Create and push a public GitHub repository named `gamya-sanchari`.
- Deploy the production build with Vercel and verify the resulting URL.
- If Vercel requires authentication not already available, pause only to request the token.

## Out of Scope

Authentication, accounts, memberships, databases, CMS integration, server actions, email delivery, stored form submissions, payments, dashboards, and administrator tools are explicitly excluded.

## Acceptance Result

The final response provides the public source URL, the live Vercel URL, a concise feature summary, and the measured Lighthouse scores. Both URLs must resolve successfully at delivery time.

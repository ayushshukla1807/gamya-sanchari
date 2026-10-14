# Gamya Sanchari Multi-Page Experience Design

## Status

Approved by the product owner on 2026-10-14. This document extends the shipped one-page marketing site without invalidating its existing brand, contact, accessibility, static-export, or deployment requirements.

## Product Intent

Evolve Gamya Sanchari from a polished brochure into a memorable travel-planning experience that feels cinematic, playful, and premium while remaining fast, clear, trustworthy, and conversion-focused.

The primary user journey is:

1. Feel the emotional possibility of travel.
2. Explore destinations, experiences, and sample journeys with low friction.
3. Shape a personalized trip through a guided planner.
4. Continue the qualified conversation in WhatsApp.

The visual ambition is high, but animation must always clarify hierarchy, place, progression, or feedback. The site must not become an animation showcase that delays content or obscures calls to action.

## Experience Principles

- **Cinematic:** Atmospheric imagery, spatial transitions, and an unfolding travel narrative create emotional impact.
- **Playful:** Route lines, passport stamps, map markers, postcards, and tactile controls reward exploration.
- **Premium:** Editorial typography, generous spacing, refined pacing, restrained color, and clear service details establish confidence.
- **Human:** The travel host appears at meaningful moments as a warm guide, never as a persistent interruption.
- **Useful:** Every page answers a visitor question and provides a relevant next action.
- **Honest:** Package and testimonial examples remain explicitly identified as samples until verified business content replaces them.

## Information Architecture

The production site expands into the following static routes:

| Route | Purpose | Primary action |
| --- | --- | --- |
| `/` | Emotional introduction and curated overview | Start planning |
| `/destinations/` | Browse regions and places | Explore a destination |
| `/destinations/[slug]/` | Understand a destination and possible trip shape | Plan this destination |
| `/packages/` | Filter sample journeys by fit | View a journey |
| `/packages/[slug]/` | Review itinerary, inclusions, and customization | Customize this trip |
| `/experiences/` | Browse by travel intent | Find matching journeys |
| `/plan-my-trip/` | Create a qualified personalized request | Continue in WhatsApp |
| `/about/` | Understand the brand, method, and service promise | Talk to a planner |
| `/journal/` | Discover practical travel guidance | Read an article |
| `/journal/[slug]/` | Read an editorial destination guide | Plan a related trip |
| `/contact/` | Choose the easiest contact channel | Send an enquiry |

The top navigation prioritizes Destinations, Packages, Experiences, Plan My Trip, About, and Contact. Journal remains accessible from contextual links and the footer. On mobile, the planner action stays visually prominent without covering content.

All dynamic-looking collections use statically generated data and routes. No database, account system, payment flow, or CMS is added in this phase.

## Home-Page Narrative

The home page behaves like a guided journey rather than a stack of unrelated sections:

1. **Arrival:** The existing plane and travel-host sequence establishes the welcome. The final state immediately exposes Explore and Plan My Trip actions.
2. **Choose a direction:** A tactile region explorer uses a stylized India/world route canvas with accessible destination controls and a non-animated fallback.
3. **Travel by feeling:** Experience categories appear as editorial portals—romance, family, culture, adventure, wellness, and pilgrimage.
4. **See a journey take shape:** Featured packages unfold as layered postcards with route, duration, highlights, and an explicit “sample journey” label.
5. **Understand the planning method:** A scroll-linked route explains Listen, Shape, Refine, and Support.
6. **Build a trip:** A concise planner preview lets visitors begin with destination, travel party, and timing before continuing to the dedicated planner.
7. **Gain confidence:** Service promises, traveller-story samples, and contact options close the journey without unsupported claims.

Each transition uses a shared motion vocabulary. The host may reappear once beside the planner preview, but does not follow the cursor, auto-play speech, or cover content.

## Destination Experience

The destination index provides filter chips for Domestic, International, region, season, and travel style. Filtering must be keyboard accessible and reflected in visible result counts. Cards expose the destination name, a short sensory summary, best-fit travel styles, and a direct planning action.

Destination detail pages use a reusable template:

- Immersive hero with breadcrumb and concise positioning.
- At-a-glance facts: ideal months, suggested duration, travel styles, and starting city context when known.
- Editorial highlights with image-led storytelling.
- A sample route visual and optional day outline.
- Related packages and experiences.
- Practical planning notes without presenting unverified regulations as current facts.
- Contextual Plan This Destination and WhatsApp actions.

Initial detail routes should be created only for destinations with sufficient approved sample content and local media. Remaining cards may direct into the planner with destination context rather than publish thin pages.

## Packages and Experiences

The packages index presents sample journeys as inspiration, not fixed-price inventory. Filters cover destination, duration band, travel style, and domestic/international scope. Query state may be represented in the URL where compatible with static export; otherwise it remains client-side and progressively enhanced.

Package detail pages include:

- A prominent “Sample itinerary—customizable” disclosure.
- Route, duration, suggested audience, and experience tags.
- Day-by-day accordion with semantic controls.
- Included and not-included lists only where approved data exists.
- Gallery, related destinations, and alternative journey cards.
- A sticky desktop summary and unobtrusive mobile action bar.
- Customize This Trip action that pre-populates the planner.

The Experiences page groups journeys by intent. It is not a duplicate package grid: each experience explains who it suits, what good pacing looks like, and which destinations naturally support it.

No fabricated prices, discounts, limited-time counters, ratings, inventory, guarantees, certifications, or customer counts are permitted.

## Personalized Trip Planner

`/plan-my-trip/` is the primary conversion surface. It is a short, reassuring wizard rather than a long form.

### Steps

1. **Where:** destination or “help me choose,” domestic/international preference.
2. **Who:** traveller count and travel-party type.
3. **When:** approximate dates or month, duration flexibility.
4. **What matters:** interests, pace, accommodation preference, optional budget comfort band.
5. **Contact:** name, phone, optional email, and extra notes.
6. **Review:** readable summary and explicit Continue in WhatsApp action.

Progress is preserved while navigating between steps in the same session. Back and edit controls never erase later answers unnecessarily. Validation is inline, specific, and announced accessibly. The final action uses the existing WhatsApp URL builder, encoding the structured summary exactly once. No form data is stored or sent anywhere before the visitor explicitly continues to WhatsApp.

The planner works as a single readable form when JavaScript is unavailable or motion is reduced. Mobile users can comfortably complete it with one hand, and input types/autocomplete attributes match their data.

## Visual System

The current blue and orange remain recognizable anchors, extended with:

- Midnight navy for cinematic surfaces.
- Warm ivory for editorial sections.
- Soft sand and mist neutrals for depth.
- Restrained gold used only as a premium detail, not as body text.

Typography pairs an expressive editorial display face for major moments with the existing highly readable sans serif for interface and body content. If adding a font materially harms performance or licensing clarity, the hierarchy is created with the existing type family instead.

Layout alternates immersive full-width moments with disciplined content grids. Rounded travel cards, fine route strokes, paper texture, and stamp motifs are used as one coherent material language. Decorative marks never reduce contrast or compete with essential text.

Photography remains destination-led, locally optimized, credited, and treated consistently through crop, color, and overlay rules. New media requires an explicit source/license record.

## Motion and Interaction System

Motion is organized into four levels:

1. **Page:** a brief route transition or shared visual handoff; content remains available immediately.
2. **Section:** one reveal pattern selected by narrative purpose—mask, route draw, depth shift, or stagger—not the same fade everywhere.
3. **Component:** hover/focus elevation, card depth, image crop, and button feedback.
4. **Feedback:** planner progress, validation, filter changes, and successful handoff confirmation.

Motion tokens define duration, easing, distance, stagger, and spring settings. Most interface feedback stays under 250 ms; narrative motion may be longer but must not block reading. Scroll-linked effects use transforms and opacity rather than layout properties and are disabled or simplified on constrained mobile devices.

`prefers-reduced-motion` removes parallax, route drawing, auto-advancing announcements, smooth scrolling, and page transitions while preserving every piece of content and action. Keyboard focus produces the same information as hover. No interaction relies on dragging alone.

## Shared Product Architecture

Content moves into typed data modules that power indexes, detail pages, metadata, related-content logic, filters, and planner prefill. Reusable templates prevent destination and package pages from diverging.

Recommended component boundaries:

- Global shell: navigation, footer, enquiry provider, WhatsApp control, transition layer.
- Editorial primitives: section heading, media frame, route line, stamp, stat row, CTA group.
- Discovery: filter bar, destination card, package card, experience portal, related content.
- Detail templates: destination, package, and journal article.
- Planner: step shell, field groups, progress indicator, review summary, persistence adapter.

Server components render durable content and metadata. Client components are reserved for filters, the planner, motion orchestration, menus, and enquiry controls. The existing static export and trailing-slash routing remain intact.

## Navigation and Continuity

Internal links replace home-page-only anchors where a dedicated route exists. Hash links remain only for genuine same-page targets. Breadcrumbs appear on all detail pages. Cards are links when they navigate and buttons only when they perform an action.

The global WhatsApp control remains available but becomes visually quieter on planner and contact routes. Context flows through navigation: a destination or package selected before opening the planner appears in the planner summary and final WhatsApp message.

## Accessibility, Performance, and Reliability

- Preserve semantic landmarks, ordered headings, visible focus, descriptive labels, and WCAG-conscious contrast.
- Maintain at least 44px touch targets and prevent horizontal overflow at 360 CSS pixels.
- Every animated or map-like presentation has a readable document-order equivalent.
- Reserve media dimensions, lazy-load below-fold imagery, and avoid shipping animation code to pages that do not use it.
- Keep the hero poster and meaningful copy as the fast initial state; video and host effects remain enhancements.
- Use optimized local WebP/AVIF imagery where supported by the current static pipeline.
- Avoid hydration for purely decorative or editorial sections.
- Provide loading and error-safe states for client interactions even though all core content is local.

The build must retain the current quality gates: lint with no warnings, unit tests, static production build, asset verification, representative Playwright journeys, and performance/accessibility checks. Lighthouse goals remain Performance 90+, Accessibility 95+, Best Practices 95+, and SEO 95+ on representative routes.

## SEO and Content Integrity

Each route receives unique title, description, canonical URL, Open Graph metadata, and breadcrumb structure. Destination, package, and article pages use appropriate schema only where all required facts are supported; the existing TravelAgency entity remains the canonical business identity.

The sitemap includes every published static route. Journal articles should answer real planning questions and connect naturally to destinations or the planner. Thin, duplicated, or keyword-stuffed pages are not published.

Sample content is clearly labelled. The build must not imply that illustrative itineraries are live inventory or that fictional traveller stories are verified reviews.

## Responsive Behavior

Mobile is a first-class composition rather than a reduced desktop canvas:

- Parallax becomes layered static framing or short entrance motion.
- Maps become swipe-free horizontally safe lists with an optional compact visual.
- Sticky desktop summaries become bottom action bars that respect safe areas.
- Filters use an accessible disclosure/sheet with a persistent result count.
- Planner steps place one decision group at a time within thumb reach.
- Host imagery is reduced or removed when it competes with the primary action.

Desktop layouts use greater depth and spatial storytelling without making reading dependent on scroll position.

## Verification Scenarios

Automated coverage must include:

- Every navigation and footer route resolves in the static export.
- Destination/package slugs and generated metadata are valid and unique.
- Filters work by keyboard and produce accurate empty/result states.
- Package accordions expose correct expanded state.
- Planner forward/back/edit, validation, session persistence, context prefill, and WhatsApp encoding.
- Reduced-motion rendering across the hero, page transitions, route visuals, and planner feedback.
- No fabricated claims, prices, ratings, dead links, placeholder content, or inconsistent business details.
- Desktop and 360px browser journeys from discovery through WhatsApp handoff.

Visual QA covers representative home, index, detail, planner, and article pages at desktop, tablet, and mobile sizes.

## Delivery Sequence

Implementation should proceed in safe vertical slices:

1. Extend tokens, typed content models, and the global multi-page shell.
2. Build destination and package indexes with reusable cards and filters.
3. Build detail templates and initial high-quality static routes.
4. Build and thoroughly test the personalized trip planner.
5. Recompose the home page around the new discovery and planning journeys.
6. Add Experiences, About, Journal, and Contact routes.
7. Add the disciplined motion layer, responsive refinements, metadata, and route transitions.
8. Complete full regression, visual, accessibility, performance, static-export, and live-deployment verification.

The live site should be updated only after the complete experience passes its release checks. The existing production experience remains the fallback throughout development.

## Out of Scope

- Authentication or traveller accounts.
- Online payments or booking confirmation.
- Live pricing, availability, or third-party inventory.
- Backend lead storage, email delivery, or analytics requiring new consent behavior.
- A CMS or admin dashboard.
- Unsupervised conversational AI or an always-listening voice assistant.
- Copying another travel site’s proprietary content, imagery, or distinctive interaction implementation.

## Acceptance Standard

The finished product must feel like one intentional system across all routes. A visitor should be able to discover inspiration, understand the service, shape a trip, and enter WhatsApp with useful context without confusion or repeated data entry. The cinematic, playful, and luxury qualities are successful only when they reinforce this journey while preserving accessibility, speed, truthfulness, and maintainability.

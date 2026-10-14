# Premium Motion and Material System

## Intent

Elevate the existing Gamya Sanchari site into a cinematic, editorial travel experience without changing its information architecture, brand story, or conversion paths.

## Approved direction

- Add kinetic but readable headline choreography and restrained content reveals.
- Introduce premium glass, luminous borders, fine grain, layered gradients, and reflective hover treatments.
- Improve section-to-section scroll rhythm, hero timing, cards, buttons, navigation feedback, and route storytelling.
- Use one coherent motion language across the landing page and shared UI rather than unrelated effects.

## Constraints

- Preserve semantic text, keyboard behavior, focus visibility, and all existing routes and enquiry flows.
- Respect `prefers-reduced-motion`: no parallax, large transforms, autoplay video, or automatic announcement sequence.
- Keep server-rendered content immediately readable when JavaScript or IntersectionObserver is unavailable.
- Animate primarily `transform` and `opacity`; avoid scroll hijacking and layout-affecting animation.
- Touch interactions must not depend on hover and mobile widths from 320px upward must remain usable.
- Retain the current blue, orange, midnight, ivory, and mist brand palette.

## Acceptance

- Shared kinetic text, scroll progress, reveal, and material primitives have automated reduced-motion coverage.
- The hero and principal landing-page sections use the new system consistently.
- Existing unit, lint, production-build, and Playwright suites remain green.
- Browser review covers desktop, mobile, reduced motion, keyboard focus, overflow, and core conversion controls.

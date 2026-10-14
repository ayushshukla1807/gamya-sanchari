# Gamya Sanchari

An accessible, cinematic one-page travel website for Gamya Sanchari, a Bengaluru-based travel planning service. The site is statically exported, uses no database or environment variables, and sends every enquiry through an explicit WhatsApp action.

![Gamya Sanchari website preview](public/images/site-preview.webp)

## Highlights

- Responsive destination and service discovery from 360 px upward
- Local, optimized hero video with poster fallback and a poster-first mobile experience
- Timed plane-to-host welcome with captions, opt-in browser speech, and reduced-motion handling
- Customisable sample journeys with durations, route ideas, and contextual enquiry actions
- Accessible enquiry modal with focus trapping, Escape/overlay close, and trigger-focus restoration
- WhatsApp-only enquiry and callback flows; form values are never stored or submitted to this site
- Reduced-motion support, keyboard navigation, semantic landmarks, metadata, sitemap, robots, manifest, and `TravelAgency` JSON-LD
- Static Next.js export suitable for CDN hosting

## Local development

Requires Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. No `.env` file or external service is required.

## Quality commands

```bash
npm test -- --run   # Vitest unit and component tests
npm run lint        # ESLint
npm run build       # Static export to out/
npm run test:e2e    # Playwright desktop and 360 px journeys
```

The release audit also uses Lighthouse against the compressed static export. The verified scores were:

| Profile | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Mobile | 96 | 96 | 100 | 100 |
| Desktop | 100 | 96 | 100 | 100 |

## Architecture

```text
app/                 App Router layout, metadata, page, robots, sitemap
components/          Marketing sections and interactive client components
components/enquiry/  Shared accessible enquiry provider, modal, and callback form
constants/           Canonical brand details and page content
lib/                 WhatsApp URL construction
e2e/                 Playwright browser journeys
public/              Licensed, optimized local media and web manifest
scripts/             Release asset verification
```

`next.config.mjs` uses `output: "export"` and unoptimized local images, so the deployed artifact contains only HTML, CSS, JavaScript, fonts, and media. There are no Server Actions, API routes, middleware, authentication, remote image optimization, or persistent data stores.

### Privacy

Enquiry fields remain in browser memory only. Submitting a form constructs a prefilled `https://wa.me/918073254766` URL and opens WhatsApp in a new tab; the website does not transmit, log, or retain the entered details.

### Dependency scope

The implementation intentionally uses Next.js 14.2.35. Current npm advisories include server-runtime paths in Next.js 14; this project deploys only the static `out/` artifact and does not ship the affected Next.js server, image optimizer, middleware, rewrites, or Server Actions. A future framework-major upgrade should still be scheduled when the Next.js 14 requirement is lifted.

## Credits

The initial component-oriented base was imported from [`adrianhajdin/travel_ui_ux`](https://github.com/adrianhajdin/travel_ui_ux) at commit [`1e9952d`](https://github.com/adrianhajdin/travel_ui_ux/commit/1e9952d316c7da1f592c62b95e3c6b4ed3f8ec50), then fully redesigned and rebuilt for Gamya Sanchari.

Photography and video sources are listed in [`docs/media-credits.md`](docs/media-credits.md). All original media derivatives are stored locally in `public/`.

## License

Project code is available under the [MIT License](LICENSE). Third-party media remains subject to the licenses identified in the media credits.

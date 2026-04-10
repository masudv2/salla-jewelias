# Current status — salla-noor

_Last updated: 2026-04-10_

## Product snapshot

- **Theme name (marketplace):** Noor (`twilight.json` / `package.json`).
- **Stack:** Salla Twilight, Twig, Webpack 5, Tailwind 3, SCSS (modular partials), Lenis, pnpm.
- **Design reference:** [Eurus Whiff](https://eurus-whiff.myshopify.com/)
- **Design spec:** `docs/superpowers/specs/2026-04-10-noor-theme-design.md`

## Completed

- SCSS token foundation: `00-tokens/` (variables, typography, reset)
- Base layer: `01-base/` (body, links, images with skeleton shimmer)
- Component styles: `02-components/` (buttons, cards, forms, badges, marquee, carousel)
- Utility styles: `04-utilities/` (animations, helpers)
- `app.scss` rewritten as modular import hub
- Tailwind config updated with `nr-*` tokens (Cormorant + Jost, forest green palette)
- `app.js` rebranded, Lenis + scroll reveal integrated
- `master.twig` updated (Google Fonts, body class)
- `twilight.json` renamed to Noor, components array cleared
- Old Jewelias home sections, Glow docs, and preview mocks deleted

## In progress / gaps

- **No homepage sections built yet** — 15 sections planned (see spec)
- **No section SCSS** in `03-sections/` — all commented out in `app.scss`
- **No Twig home components** — `src/views/components/home/` is empty
- **`twilight.json` components array is empty** — sections added as Twig files are built
- **Header/footer** not yet restyled to Noor design
- **JS section modules** not yet written (hero-slideshow, marquee, tabs, carousel)

## Next recommended tasks (ordered)

1. **Phase 1 completion:** Build `preview/noor-design-system.html` to validate tokens + components visually
2. **Phase 2:** Build `preview/noor-home.html` with all 15 sections
3. **Phase 3:** Port sections to Salla Twig + twilight.json schema

## Blockers / open questions

- None — spec approved, plan in place.

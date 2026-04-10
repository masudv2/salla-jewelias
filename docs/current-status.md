# Current status — salla-noor

_Last updated: 2026-04-10_

## Product snapshot

- **Theme name (marketplace):** Noor (`twilight.json` / `package.json`).
- **Stack:** Salla Twilight, Twig, Webpack 5, Tailwind 3, SCSS (modular partials), Lenis, pnpm.
- **Design reference:** [Eurus Whiff](https://eurus-whiff.myshopify.com/)
- **Design spec:** `docs/superpowers/specs/2026-04-10-noor-theme-design.md`

## Completed

### Phase 1 — Foundation
- SCSS token foundation: `00-tokens/` (variables, typography, reset)
- Base layer: `01-base/` (body, links, images with skeleton shimmer)
- Component styles: `02-components/` (buttons, cards, forms, badges, marquee, carousel)
- Section styles: `03-sections/` (announcement, header, hero, collections, products, editorial, social-proof, newsletter, footer)
- Utility styles: `04-utilities/` (animations, helpers)
- `app.scss` rewritten as modular import hub
- Tailwind config updated with `nr-*` tokens (Cormorant + Jost, forest green palette)
- `app.js` rebranded, Lenis + scroll reveal integrated
- `master.twig` updated (Google Fonts, body class)

### Phase 2 — Section SCSS + JS modules
- JS modules: `hero-slideshow.js`, `marquee.js`, `tabs.js`, `carousel.js`
- `home.js` imports all section modules

### Phase 3 — Salla Twig port
- **24 home components** ported to Twig in `src/views/components/home/`
- **24 matching `twilight.json` component entries** with merchant-configurable schema
- Header restyled with Noor announcement bar (marquee/slider modes, countdown, social, CTA)
- Footer restyled with `nr-footer` classes
- No `|raw` on merchant-editable component fields (security pass)
- Production build passes (`pnpm run production`)

## In progress / gaps

- **Inner pages** (product, cart, customer, blog) not yet audited
- **RTL pass** — basic check done (logical properties used), full audit pending
- **Lighthouse audit** not yet run
- **Preview HTML pages** (`preview/noor-design-system.html`, `preview/noor-home.html`) not yet built

## Next recommended tasks

1. Build preview HTML pages for visual sign-off
2. Inner pages audit and restyle
3. Full RTL pass on all sections
4. Lighthouse + marketplace checklist

## Blockers / open questions

- None.

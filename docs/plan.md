# Implementation plan — Noor (Salla theme)

_Design reference: [Eurus Whiff](https://eurus-whiff.myshopify.com/). Full spec: `docs/superpowers/specs/2026-04-10-noor-theme-design.md`._

## Quality gates (must pass before submission)

| Gate | Check |
|------|--------|
| **Schema integrity** | Every `twilight.json` `home.*` path has matching Twig file |
| **Build** | `pnpm run production` completes without errors |
| **Theme size** | Package <= 1MB |
| **Lighthouse** | Performance >= 60, Accessibility >= 90 |
| **RTL** | All sections verified with `dir="rtl"` |
| **Security** | No `\|raw` on merchant-editable strings |
| **Docs** | `docs/handoff.md` updated after each session |

## Phase 1 — Foundation (complete)

- [x] SCSS token system (`00-tokens/`)
- [x] Base layer (`01-base/`)
- [x] Component styles (`02-components/`)
- [x] Animation + utility styles (`04-utilities/`)
- [x] Tailwind config with `nr-*` tokens
- [x] `app.js` with Lenis + scroll reveal
- [x] `master.twig` Cormorant + Jost fonts
- [x] `twilight.json` renamed to Noor

## Phase 2 — Section SCSS + JS modules (complete)

- [x] Section SCSS in `03-sections/` (9 partials)
- [x] JS modules: hero-slideshow, marquee, tabs, carousel

## Phase 3 — Salla Twig port (complete)

- [x] Port 24 sections to `src/views/components/home/<name>.twig`
- [x] Add `twilight.json` component entries with merchant-configurable schema
- [x] Fix collection fields (prefixed IDs, minLength/maxLength, item_label, value)
- [x] Add 35 missing nr-* CSS class definitions
- [x] Restyle header (announcement bar + nav)
- [x] Restyle footer (`nr-footer` classes)
- [x] Security pass (no `|raw` on merchant fields)
- [x] Production build passes

## Phase 4 — Section polish (current)

See `docs/handoff.md` for detailed per-section work plan (Tier 1/2/3).

- [ ] Tier 1: 12 core Noor sections (hero, announcement, split-collection, tabs, editorial, cta, testimonials, promos, marquee, instagram, newsletter, trust)
- [ ] Tier 2: 13 standard Salla sections (featured-products variants, fixed-banner, fixed-products, latest-products, parallax, sliders, square-photos, store-features, youtube)
- [ ] Tier 3: Inner pages, RTL pass, Lighthouse, CSS optimization

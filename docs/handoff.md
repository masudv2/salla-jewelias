# Handoff — continue from here

_Last updated: 2026-04-10_

## How to resume

```
# Read this file, then start working
Read docs/handoff.md and continue from the work plan below.
```

## Latest completed work

- **All 3 phases complete for homepage.** 24 Twig home components with matching `twilight.json` schema entries.
- **Header** restyled with Noor announcement bar (marquee/slider, countdown, social links, CTA button, close).
- **Footer** restyled with `nr-footer` classes and Salla web components.
- **twilight.json collection fields fixed**: all 7 collection fields now have `required`, `minLength`, `maxLength`, `item_label`, prefixed sub-field IDs (`slides.image` not `image`), and default `value` arrays. This fixes the disabled "add" button in Salla's section editor.
- **35 missing CSS classes added** across section SCSS partials.
- **Build:** `pnpm run production` passes cleanly (size warnings only).
- **Demo MVP** is working on Salla preview. User will configure demo content manually.

## Dev workflow

```bash
# Terminal 1: auto-rebuild CSS/JS on save (no commit needed)
pnpm run watch

# Terminal 2: Salla live preview
salla theme preview

# CSS/JS changes reflect on reload (served from localhost)
# Twig/JSON changes sync via ThemeWatcher automatically
# Only need git commit+push to START a new preview session
```

## Git remotes

- `origin` = `masudv2/salla-jewelias` (source repo)
- `noor` = `masudv2/salla-noor` (Salla Partners theme — this is what Salla pulls from)
- Always push to both: `git push noor main && git push origin main`

## What changed (files)

- **Created:** 24 Twig files in `src/views/components/home/`, 4 JS modules in `src/assets/js/modules/`, 9 SCSS partials in `03-sections/`
- **Rewritten:** `header.twig` (announcement + nav), `footer.twig` (nr-footer), `twilight.json` (24 component entries + settings), `home.js`
- **Updated:** 7 SCSS partials (added 35 missing nr-* class definitions), `twilight.json` (fixed collection field structure)

## Home components (24)

hero-slideshow, marquee-ticker, split-collection, tabbed-collection, editorial-statement, featured-products, featured-products-style1/2/3, cta-banner, trust-strip, testimonials, image-promos, instagram-feed, newsletter, fixed-banner, fixed-products, latest-products, parallax-background, photos-slider, products-slider, square-photos, store-features, youtube

## Work plan — Section polish (Phase 4)

Work one section at a time. For each: fix styles, add missing settings to twilight.json, test. One commit per section.

### Tier 1 — Core Noor sections (custom-built, need most work)

| # | Section | File | Status | What to do |
|---|---------|------|--------|------------|
| 1 | hero-slideshow | home/hero-slideshow.twig | TODO | Ken Burns polish, overlay controls, mobile responsive, transition timing, slide content alignment |
| 2 | announcement bar | header/header.twig | TODO | Slider JS refinement, countdown timer JS, close/dismiss persistence, mobile layout |
| 3 | split-collection | home/split-collection.twig | TODO | Image hover effects, reverse layout option, mobile stack order, typography |
| 4 | tabbed-collection | home/tabbed-collection.twig | TODO | Tab animation, product grid spacing, loading states, empty state |
| 5 | editorial-statement | home/editorial-statement.twig | TODO | Background pattern/texture options, font size setting, padding controls |
| 6 | cta-banner | home/cta-banner.twig | TODO | Countdown JS, overlay opacity setting, content position, responsive image |
| 7 | testimonials | home/testimonials.twig | TODO | Carousel JS (auto-play, swipe), card styling, star color, mobile swipe |
| 8 | image-promos | home/image-promos.twig | TODO | Column count, overlay styles, hover animations, aspect ratio control |
| 9 | marquee-ticker | home/marquee-ticker.twig | TODO | Speed setting, pause on hover, separator style, font controls |
| 10 | instagram-feed | home/instagram-feed.twig | TODO | Column count, hover overlay, gap control, link behavior |
| 11 | newsletter | home/newsletter.twig | TODO | Form validation styling, success state, divider toggle, background options |
| 12 | trust-strip | home/trust-strip.twig | TODO | Icon size, layout direction, background toggle, border options |

### Tier 2 — Standard Salla sections (use platform web components, lighter pass)

| # | Section | File | Status | What to do |
|---|---------|------|--------|------------|
| 13 | featured-products | home/featured-products.twig | TODO | More settings (bg color, columns, spacing), Noor typography overrides |
| 14 | featured-products-style1 | home/featured-products-style1.twig | TODO | Add settings, consistent section header |
| 15 | featured-products-style2 | home/featured-products-style2.twig | TODO | Add settings, consistent section header |
| 16 | featured-products-style3 | home/featured-products-style3.twig | TODO | Add settings, consistent section header |
| 17 | fixed-banner | home/fixed-banner.twig | TODO | Add settings, styling |
| 18 | fixed-products | home/fixed-products.twig | TODO | Add settings, Noor card overrides |
| 19 | latest-products | home/latest-products.twig | TODO | Add settings, Noor card overrides |
| 20 | parallax-background | home/parallax-background.twig | TODO | Add settings (height, overlay, text) |
| 21 | photos-slider | home/photos-slider.twig | TODO | Add settings, transition style |
| 22 | products-slider | home/products-slider.twig | TODO | Add settings, Noor card overrides |
| 23 | square-photos | home/square-photos.twig | TODO | Add settings, hover effects |
| 24 | store-features | home/store-features.twig | TODO | Add settings (icon style, columns, bg) |
| 25 | youtube | home/youtube.twig | TODO | Add settings (aspect ratio, autoplay) |

### Tier 3 — Global polish (after all sections)

| # | Task | Status |
|---|------|--------|
| 26 | Inner pages audit (product, cart, customer, blog) | TODO |
| 27 | Full RTL pass on all sections | TODO |
| 28 | Lighthouse + marketplace checklist | TODO |
| 29 | CSS bundle size optimization (currently 473 KiB) | TODO |

## Warnings

- Do not add `home.*` in `twilight.json` without a matching Twig file.
- Section styles go in `03-sections/`, not in component files.
- Components in `02-components/` must be section-agnostic.
- No `|raw` on merchant-editable text fields in Twig components.
- Collection sub-field IDs must be prefixed: `slides.image`, not `image`.
- Collection fields need `required`, `minLength`, `maxLength`, `item_label`, `value`.
- Always push to both remotes: `noor` and `origin`.

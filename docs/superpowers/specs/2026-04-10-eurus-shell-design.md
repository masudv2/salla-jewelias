# Eurus-style preview shell — design spec

**Date:** 2026-04-10  
**Status:** Implemented in `preview/shell.html` + `preview/css/*` + `preview/js/shell.js`

## Goal

Align announcement bar, navigation, and hero with [Eurus Puff](https://eurus-puff.myshopify.com/) density and patterns: dual top bars, sticky header, full-bleed slideshow, skeleton image shimmer, and Alpine-style quick-view hooks for Salla porting.

## Decisions

- **Typography:** Cormorant Garamond (display) + DM Sans (body/nav) for storefront chrome; keep Instrument/Inter/Space Grotesk for `design-system-v3.html` kit until merged.
- **CSS:** Split files per section for copy-paste into `app.scss` / Twig.
- **Images:** Large Unsplash URLs with `srcset` on first hero slide; shimmer until `load`.
- **Quick view:** `CustomEvent('eurus:quick-view', { detail: { handle, sectionId } })` — no Alpine in static preview.

## Out of scope (this iteration)

- Refactoring `home.html` to import the same CSS (optional follow-up).
- Lenis on `shell.html` (hero-only page; optional).

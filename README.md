# Jewelias — Salla marketplace theme

Premium jewelry and luxury accessories storefront theme for **[Salla](https://salla.sa/)**, built on the **Twilight** engine (Twig + Webpack + Tailwind + SCSS). This repo targets **marketplace submission**: maintainable code, editor safety, performance, accessibility, and SEO-conscious templates.

> **Operator / AI guide:** Read [`AGENTS.md`](./AGENTS.md) first, then [`docs/current-status.md`](./docs/current-status.md).

## Theme objective

- Deliver a **cohesive Jewelias** visual and UX system (`jw-*` design language).
- Stay **compatible with Salla** conventions: fixed `src/views/pages/*` filenames, web components, `twilight.json` schema.
- **Parallel research:** Health & Beauty “Glow” specs and HTML mocks (`docs/GLOW-*.md`, `preview/`) inform tokens and patterns; shipped product naming remains **Jewelias** unless we record a merge in `docs/decisions.md`.

## Marketplace goals

- Package size, Lighthouse, and accessibility targets per [`SALLA-THEME-REFERENCE.md`](./SALLA-THEME-REFERENCE.md) §8.
- Merchant-customizable sections via `twilight.json` **without** breaking layouts or introducing XSS (`|raw` discipline — see `AGENTS.md`).
- Clear documentation for reviewers and future maintainers.

## Prerequisites

- Node.js + **pnpm** (enforced via `preinstall`)
- [Salla CLI](https://www.npmjs.com/package/@salla.sa/cli) for `salla theme preview`
- Basic Twig + Salla theme concepts ([Salla docs](https://docs.salla.dev/))

## Setup

```bash
pnpm install
pnpm run development   # or: pnpm run production
```

Preview on a demo store (from theme root):

```bash
salla theme preview
# or: salla theme p
```

### Static design HTML (Glow mocks)

Not part of the Webpack build. From repo root:

```bash
cd preview && python3 -m http.server 8765
```

Open http://127.0.0.1:8765/shell.html (announcement + nav + hero, modular CSS), http://127.0.0.1:8765/home.html (full homepage), http://127.0.0.1:8765/design-system-v3.html (tokens), or `/announcement-bar-v2.html` — **the server working directory must be `preview/`**. See `preview/PORTING.md` for Salla mapping.

## Architecture summary

| Area | Location |
|------|-----------|
| Layout | `src/views/layouts/master.twig` |
| Pages (fixed names) | `src/views/pages/**` |
| Home sections | `src/views/components/home/*.twig` |
| Header / footer | `src/views/components/header/`, `footer/` |
| Global styles | `src/assets/styles/app.scss` (+ `01-settings/`) |
| JS entries | `webpack.config.js` → `src/assets/js/*` |
| Theme manifest | `twilight.json` |
| Tailwind | `tailwind.config.js` |
| Locales | `src/locales/en.json`, `ar.json` |
| Build output | `public/` |

**Critical rule:** Every `twilight.json` component with `"path": "home.something"` must have `src/views/components/home/something.twig`. See `docs/current-status.md` for current gaps.

## Coding standards (short)

- **CSS:** Hybrid **Tailwind + scoped SCSS**; canonical prefix **`jw-*`**. Details: [`AGENTS.md`](./AGENTS.md).
- **Twig:** Semantic HTML; minimal `|raw`; one `h1` policy per page type.
- **JS:** Stable selectors; correct Webpack entry; avoid Raed-era naming when you touch logging.
- **Docs:** After meaningful work, update `docs/current-status.md` + `docs/handoff.md` (see `AGENTS.md`).

## SEO, accessibility, performance

- **SEO:** Heading hierarchy, meaningful `alt`, internal links via Salla helpers — see `AGENTS.md` and `docs/review-checklist.md`.
- **A11y:** Landmarks, labels for icon buttons, keyboard/focus — checklist before merge.
- **Perf:** Lazy images, bundle discipline, theme size — `docs/plan.md` quality gates.

## Documentation index

| File | Purpose |
|------|---------|
| [`AGENTS.md`](./AGENTS.md) | Rules for humans and AI; doc workflow |
| [`SALLA-THEME-REFERENCE.md`](./SALLA-THEME-REFERENCE.md) | Salla Twig variables, hooks, schema notes |
| [`docs/current-status.md`](./docs/current-status.md) | Live snapshot of done / gaps / next |
| [`docs/plan.md`](./docs/plan.md) | Phased roadmap and quality gates |
| [`docs/decisions.md`](./docs/decisions.md) | Architecture decisions (ADR-style) |
| [`docs/handoff.md`](./docs/handoff.md) | Session-to-session continuity |
| [`docs/review-checklist.md`](./docs/review-checklist.md) | Pre-merge checklist |
| [`docs/GLOW-IMPLEMENTATION-PLAN.md`](./docs/GLOW-IMPLEMENTATION-PLAN.md) | Parallel Glow (H&B) deep implementation plan |
| [`docs/GLOW-DESIGN-SYSTEM.md`](./docs/GLOW-DESIGN-SYSTEM.md) | Glow tokens and patterns |

## Contributing

- Follow [`AGENTS.md`](./AGENTS.md) and [`docs/review-checklist.md`](./docs/review-checklist.md).
- Use conventional commits when possible (`feat:`, `fix:`, `docs:`).
- Do not commit secrets; use env / Salla partner settings for store credentials.

## License

MIT — see [LICENSE.md](./LICENSE.md) if present in the tree.

## Credits

- Based on Salla **Theme Raed** / Twilight toolchain.
- Maintained as **Jewelias** for marketplace.

# AGENTS.md — Operating rules for this repository

## Mission

Build and maintain **Noor**: a **marketplace-grade Salla Twilight theme** (Twig + Webpack + Tailwind + SCSS). Design reference: [Eurus Whiff](https://eurus-whiff.myshopify.com/). Work must prioritize **maintainability, consistency, and merchant/editor safety** over speed or one-off hacks.

## Required reading before substantive work

1. This file (`AGENTS.md`)
2. `SALLA-THEME-REFERENCE.md` — Salla APIs, Twig, hooks, schema rules
3. `docs/current-status.md` — what is true *today*
4. `docs/plan.md` — phased roadmap and quality gates
5. `docs/decisions.md` — constraints already chosen
6. For styling direction: `docs/superpowers/specs/2026-04-10-noor-theme-design.md` (design spec) + `preview/*.html` (visual reference)

## Engineering standards

### Theme architecture

- **Fixed paths:** Do not rename files under `src/views/pages/` (Salla engine contract). See `SALLA-THEME-REFERENCE.md`.
- **Home sections:** One Twig file per custom component under `src/views/components/home/`. Its `twilight.json` entry must use `path`: `home.<filename-without-extension>` matching that file.
- **Integrity rule:** Every `components[].path` in `twilight.json` that points at `home.*` **must** resolve to an existing `src/views/components/home/<name>.twig`. Missing files break the theme editor and are **P0**.
- **Reuse:** Shared UI belongs in partials, base classes, or shared snippets — not copy-pasted across sections.

### CSS methodology (hybrid — locked)

1. **Design tokens** live in SCSS partials under `src/assets/styles/00-tokens/`. Prefix **`nr-`** is the **canonical theme namespace** for Noor implementation.
2. **Tailwind** for layout utilities, responsive spacing, and alignment with `@salla.sa/twilight-tailwind-theme`. Use **`theme.extend`** in `tailwind.config.js` for token-backed utilities (`nr-*` colors, etc.).
3. **Component CSS** in `02-components/` partials under clear section comments. Use **single class + BEM-like elements** where helpful: `.nr-hero`, `.nr-hero__title` (optional) — **stay consistent** with existing `.nr-*` blocks.
4. **Specificity:** Avoid `!important` except overriding third-party. Prefer low-specificity single classes.
5. **RTL:** Use `[dir="rtl"]` or logical properties where possible; mirror placement for absolute-positioned controls.

### Class naming

| Use | Rule |
|-----|------|
| Theme blocks | `nr-<block>`, `nr-<block>-<element>` (kebab-case) |
| State / JS | `nr-is-open`, `nr-vis` (after reveal), `is-*` only when aligned with existing patterns |
| Utilities | Tailwind classes in Twig; avoid ad-hoc `style=""` except **schema-driven** merchant colors (document if repeated) |
| JS hooks | Prefer `data-nr-*` or stable classes documented as "JS hooks" — **do not** select on Tailwind utility strings |

### JavaScript

- **Entry points** are defined in `webpack.config.js` — new page-level behavior needs a deliberate entry or reuse `app.js` / `home.js`.
- **Global app** extends `AppHelpers` in `app.js`; keep **DOM queries scoped** (container root per feature).
- **Selectors:** Stable `id`/`data-*` or `nr-*` classes — not structural assumptions that break when merchants reorder components.
- **When not to use JS:** Prefer CSS for hover/focus, simple show/hide with details/summary where viable, and Salla web components for cart/menu/product lists.
- **Branding:** Log messages should say **Noor** (or neutral `ThemeApp`), not "Raed" — update when touching that code.

### Twig / HTML

- **Semantic landmarks:** `header`, `main`, `footer`, `nav`, `section` with optional `aria-labelledby` tied to visible headings.
- **One `<h1>` per page** where Salla allows; homepage sections below hero should use **`h2`/`h3`** in descending order — never multiple unscoped `h1`s for SEO.
- **`|raw`:** Only for **trusted** HTML (e.g. platform-controlled or strictly sanitized fields). **Never** `|raw` on arbitrary merchant text fields. If italic/emphasis in titles is required, prefer **structured fields** or a documented allowlist (see `docs/decisions.md` when changing).
- **Images:** Meaningful `alt`; decorative images `alt=""` + `role="presentation"` if needed.
- **External links:** `rel="noopener"` (and `noreferrer` if policy requires).

### Performance (marketplace)

- **Theme size** target <= 1MB package; avoid huge inline assets in Twig.
- **Images:** `loading="lazy"` below the fold; explicit dimensions where possible to reduce CLS.
- **Scripts:** `defer` (already pattern in layout); avoid blocking inline unless required by Salla.
- **CSS:** Single extracted bundle from `app.scss`; avoid duplicate token definitions across files.

### Accessibility baseline

- Keyboard operability for custom toggles/menus; visible **focus** styles (do not remove outlines without replacement).
- **aria-label** on icon-only controls; **aria-expanded** on collapsible regions.
- Color contrast for text on `theme.color` / custom backgrounds — test when merchants change colors.

### SEO (implementation-level)

- Correct heading hierarchy per template type.
- **Structured data:** Prefer Salla/hook-injected JSON-LD; do not duplicate conflicting schemas in theme unless specified.
- **URLs:** Use `link()` / product URLs from objects — no hardcoded domains.

## Documentation workflow (mandatory)

After **every meaningful change**, update docs so the next session (human or AI) can continue without archaeology.

**Meaningful change includes:** new/removed section or component, refactor touching architecture, bug fix that changes behavior or constraints, style system or token change, schema/settings change, perf/a11y/SEO behavior change, discovered platform limitation, failed experiment with a lesson learned.

| Trigger | Update |
|---------|--------|
| Any meaningful change | `docs/current-status.md` + `docs/handoff.md` |
| Architectural or product choice | `docs/decisions.md` (new entry with date) |
| Setup, structure, or global rules changed | `README.md` + this file if rules change |

**Conciseness:** Bullet facts, dates, and "next step" — not essays.

**Avoid drift:** If code contradicts a doc, **fix the doc in the same PR/commit** or file an explicit "known drift" in `docs/current-status.md` with owner and deadline.

## End-of-task output (for AI agents)

After each meaningful task, output a short structured wrap-up:

1. **Code:** Files changed (high level).
2. **Issues found:** Bugs, risks, or mismatches (e.g. schema vs Twig).
3. **Decisions:** Anything that belongs in `docs/decisions.md` (and whether you added it).
4. **Docs:** Which of `current-status`, `handoff`, `decisions`, `README`, `AGENTS` were updated.
5. **Next:** Single most important recommended task.

## Anti-patterns (do not do)

- Adding `twilight.json` `home.*` paths without a real Twig file.
- Sprinkling `|raw` on component fields for "convenience."
- Selecting DOM with Tailwind utility class strings.
- Duplicating the same token hex in `app.scss`, `tailwind.config.js`, and Twig without a single source of truth.
- Leaving `console.log` / debug markup in production paths.
- Implementing a second naming convention (`foo-bar__baz`) alongside `nr-*` without a migration plan in `docs/decisions.md`.

## Review before merge

Use `docs/review-checklist.md` for every section/component or significant change.

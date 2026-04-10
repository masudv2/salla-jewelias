# Implementation review checklist

_Use before considering a section, component, or significant change **done**._

## Architecture & files

- [ ] Follows `SALLA-THEME-REFERENCE.md` fixed page paths; no forbidden renames under `src/views/pages/`
- [ ] New home component: `src/views/components/home/<name>.twig` exists and `twilight.json` uses `path`: `home.<name>` (matching name)
- [ ] No orphan `twilight.json` `home.*` entries without Twig
- [ ] Shared markup/CSS extracted instead of duplicated when pattern repeats

## Naming

- [ ] Theme classes use **`jw-*`** (or documented exception in `docs/decisions.md`)
- [ ] JS uses stable **`data-*` or `jw-*` hooks**, not Tailwind utility strings as selectors
- [ ] New tokens added in **one source** (`:root` / SCSS) and mirrored in `tailwind.config.js` if needed for utilities

## CSS

- [ ] Section styles live under a clear **`app.scss` block** (or approved partial)
- [ ] No unnecessary `!important`; specificity stays low
- [ ] RTL considered for absolute positioning, arrows, padding start/end

## Twig / HTML

- [ ] Semantic structure (`section`, `nav`, headings) appropriate to content
- [ ] **Heading hierarchy** sane for SEO (one primary `h1` policy per page type)
- [ ] **No unjustified `|raw`** on merchant fields; exceptions documented
- [ ] External links: `rel="noopener"` where `target="_blank"`
- [ ] Images: **`alt`** present and meaningful (or empty + decorative handling)

## JavaScript

- [ ] Behavior in correct **Webpack entry** (or justified addition)
- [ ] Listeners attached to **scoped** roots; cleanup considered for SPA-like re-renders if applicable
- [ ] No reliance on brittle DOM structure

## Schema / settings

- [ ] Field IDs consistent and readable; labels per project rules (Arabic plain strings where required by marketplace notes)
- [ ] Defaults sensible; optional sections degrade gracefully when data missing

## Accessibility

- [ ] Icon-only controls have **accessible names** (`aria-label` or visible text)
- [ ] Keyboard: focusable elements reachable; focus visible
- [ ] Interactive widgets use appropriate **ARIA** when native semantics insufficient

## Performance

- [ ] Below-fold images **lazy** where appropriate
- [ ] No huge inline assets; images optimized or CDN-backed
- [ ] New deps justified (bundle size / theme package limit)

## SEO (implementation)

- [ ] Section order / headings don’t imply multiple unrelated main topics as `h1`
- [ ] No hidden keyword stuffing; visible text matches metadata intent

## Documentation

- [ ] `docs/current-status.md` updated
- [ ] `docs/handoff.md` updated
- [ ] `docs/decisions.md` if a new constraint or choice was made
- [ ] `README.md` / `AGENTS.md` if setup or global rules changed

## If work is partial

- [ ] **Next step** noted in `docs/handoff.md` and checkbox left open in `docs/plan.md` if relevant

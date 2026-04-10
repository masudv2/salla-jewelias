# Implementation plan — Noor (Salla theme)

_Design reference: [Eurus Whiff](https://eurus-whiff.myshopify.com/). Full spec: `docs/superpowers/specs/2026-04-10-noor-theme-design.md`._

## Quality gates (must pass before submission)

| Gate | Check |
|------|--------|
| **Schema integrity** | Every `twilight.json` `home.*` path has matching Twig file |
| **Build** | `pnpm run production` completes without errors |
| **Theme size** | Package ≤ 1MB |
| **Lighthouse** | Performance ≥ 60, Accessibility ≥ 90 |
| **RTL** | All sections verified with `dir="rtl"` |
| **Security** | No `\|raw` on merchant-editable strings |
| **Docs** | `docs/current-status.md` and `docs/handoff.md` updated |

## Phase 1 — Foundation (complete)

- [x] SCSS token system (`00-tokens/`)
- [x] Base layer (`01-base/`)
- [x] Component styles (`02-components/`)
- [x] Animation + utility styles (`04-utilities/`)
- [x] Tailwind config with `nr-*` tokens
- [x] `app.js` with Lenis + scroll reveal
- [x] `master.twig` Cormorant + Jost fonts
- [x] `twilight.json` renamed to Noor
- [ ] Design system preview HTML (`preview/noor-design-system.html`)

## Phase 2 — Section previews (HTML)

- [ ] Build `preview/noor-home.html` with all 15 homepage sections
- [ ] All animations working (Ken Burns, scroll reveal, marquee, carousel)

## Phase 3 — Salla Twig port

- [ ] Port each section to `src/views/components/home/<name>.twig`
- [ ] Add `twilight.json` component entries with merchant-configurable schema
- [ ] Restyle header and footer
- [ ] Inner pages audit (product, cart, customer, blog)
- [ ] RTL pass on all sections
- [ ] Lighthouse + marketplace checklist

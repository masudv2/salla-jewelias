# Architecture decisions — salla-noor

_A living log. Add a new entry for any decision that affects structure, security, or workflow._

---

## 2026-04-10 — Documentation ownership & agent workflow

- **Decision:** Introduce `AGENTS.md`, `docs/plan.md`, `docs/current-status.md`, `docs/handoff.md`, `docs/review-checklist.md`, and rewrite `README.md` for Jewelias. Mandatory post-task updates for meaningful changes (see `AGENTS.md`).
- **Context:** Multiple contributors and AI sessions; prior state mixed Raed README, Glow plans, and Jewelias code without a single status source.
- **Options considered:** (a) Single long README only; (b) distributed docs with roles — **chosen (b)**.
- **Why:** Separates *how we work* (AGENTS), *what is true now* (current-status), *roadmap* (plan), *why* (decisions), *session handoff* (handoff).
- **Implications:** Every meaningful PR should touch `docs/handoff.md` + `docs/current-status.md` at minimum.

## 2026-04-10 — CSS methodology: hybrid Tailwind + scoped SCSS

- **Decision:** **Hybrid:** Tailwind for utilities + **component blocks** in SCSS partials under `nr-*` namespace; tokens in `00-tokens/` with Tailwind `theme.extend` mirroring colors.
- **Context:** Salla ships Tailwind integration; theme already uses large `app.scss` sections.
- **Options considered:** Utility-only; BEM-only separate CSS; hybrid — **chosen hybrid**.
- **Why:** Matches existing codebase, keeps Twilight utilities, allows complex components (hero, announcement) without utility soup.
- **Implications:** New sections get a **`nr-<section>`** block in SCSS; use Tailwind inside Twig for layout when it improves readability.

## 2026-04-10 — Canonical class prefix: `nr-`

- **Decision:** **Noor implementation prefix `nr-`** for theme-authored BEM-like blocks.
- **Context:** Theme rebranded from Jewelias (`jw-*`) to Noor (`nr-*`). All old prefixes removed.
- **Options considered:** Keep `jw-*`; migrate to `nr-*` — **chosen `nr-*`**.
- **Why:** Package and `twilight.json` brand is Noor; prefix should match identity.
- **Implications:** All theme classes use `nr-*`. No legacy prefixes remain.

## 2026-04-10 — Static HTML previews live in `preview/`

- **Decision:** Authoritative static mocks live in `preview/`. Server **cwd must be `preview/`** when using `python3 -m http.server`.
- **Context:** Files were moved from `.superpowers/brainstorm/...`; stale servers caused 404s.
- **Why:** Predictable path for humans and agents.
- **Implications:** Do not assume `.superpowers/` for handoff; always reference `preview/`.

## 2026-04-10 — Theme rebrand: Jewelias -> Noor

- **Decision:** Rebrand theme from Jewelias (jewelry) to Noor (luxury/editorial lifestyle). New design system based on Eurus Whiff. CSS prefix `jw-*` -> `nr-*`. Fresh codebase — all old home sections, Glow docs, preview mocks removed.
- **Context:** Jewelias was a test project. Noor is the production theme targeting Salla marketplace.
- **Options considered:** (a) Iterate on Jewelias; (b) Start fresh with new identity — **chosen (b)**.
- **Why:** Clean break avoids carrying forward dual-token mess (jw-*/glow-*), broken schema references, and unclear design direction. Eurus Whiff provides a concrete, proven reference.
- **Implications:** All code, docs, and configs now reference Noor/nr-*. Old Jewelias patterns are gone from the codebase.

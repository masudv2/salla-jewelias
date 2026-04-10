# Noor Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Salla theme as "Noor" — a luxury/editorial theme matching Eurus Whiff's design language, with preview-first workflow (HTML design system → HTML homepage → Salla Twig port).

**Architecture:** Three-phase build: (1) Clean old Jewelias code, establish SCSS token foundation + Tailwind config, build HTML design system preview. (2) Build all 15 homepage sections as static HTML preview with animations. (3) Port each section to Salla Twig + twilight.json schema. CSS/JS written in phases 1-2 is production code — only HTML changes in phase 3.

**Tech Stack:** Salla Twilight (Twig), Webpack 5, Tailwind 3, SCSS, Lenis, vanilla ES modules, pnpm.

**Spec:** `docs/superpowers/specs/2026-04-10-noor-theme-design.md`

---

## File Structure

### New files to create

```
src/assets/styles/
├── 00-tokens/_variables.scss       # --nr-* CSS custom properties (single source of truth)
├── 00-tokens/_typography.scss      # Google Fonts import, type scale, heading defaults
├── 00-tokens/_reset.scss           # Minimal box-sizing, margin reset
├── 01-base/_body.scss              # html/body defaults, scrollbar, font-smoothing
├── 01-base/_links.scss             # Base link styles
├── 01-base/_images.scss            # Responsive images, lazy skeleton shimmer
├── 02-components/_buttons.scss     # .nr-btn-solid, .nr-btn-outline, .nr-btn-text
├── 02-components/_cards.scss       # .nr-card (product), .nr-card-collection
├── 02-components/_forms.scss       # Input, select, label styles
├── 02-components/_badges.scss      # Sale, new, stock badges
├── 02-components/_marquee.scss     # Scrolling ticker
├── 02-components/_carousel.scss    # Shared carousel/slideshow logic
├── 03-sections/_announcement.scss  # .nr-announcement
├── 03-sections/_header.scss        # .nr-header
├── 03-sections/_hero.scss          # .nr-hero
├── 03-sections/_collections.scss   # Split banner, tabbed collections
├── 03-sections/_products.scss      # Featured grid, bundle builder
├── 03-sections/_editorial.scss     # Statement block, CTA banner
├── 03-sections/_social-proof.scss  # Testimonials, trust strip, instagram
├── 03-sections/_newsletter.scss    # .nr-newsletter
├── 03-sections/_footer.scss        # .nr-footer
├── 04-utilities/_animations.scss   # Keyframes: nr-ken-burns, nr-scrollX, nr-reveal
├── 04-utilities/_helpers.scss      # .nr-container, .nr-reveal, .nr-sr-only

src/assets/js/
├── modules/lenis.js                # Lenis smooth scroll init + RAF
├── modules/scroll-reveal.js        # IntersectionObserver for .nr-reveal
├── modules/hero-slideshow.js       # Ken Burns slides, arrows, dots, autoplay
├── modules/marquee.js              # Infinite scroll ticker
├── modules/tabs.js                 # Tab switching with fade
├── modules/carousel.js             # Testimonial carousel

preview/
├── noor-design-system.html         # Phase 1 visual sign-off
├── noor-home.html                  # Phase 2 full homepage preview
```

### Files to modify

```
src/assets/styles/app.scss          # Gut all jw-*/glow-* content, replace with @use imports
tailwind.config.js                  # Replace jw-* colors/fonts with nr-* tokens
src/assets/js/app.js                # Remove jw-* methods, add Lenis + scroll reveal imports
src/assets/js/home.js               # Remove jw-* scroll reveal, import new section modules
src/views/layouts/master.twig       # Update Google Fonts link, body class, branding
package.json                        # Rename to salla-noor, update description
twilight.json                       # Rename theme, clear old components (rebuilt in Phase 3)
AGENTS.md                           # Update prefix references jw-* → nr-*
docs/current-status.md              # Reflect Noor rebuild
docs/plan.md                        # Replace with Noor roadmap
docs/decisions.md                   # Add Noor rebrand decision
docs/handoff.md                     # Update for Noor
```

### Files to delete

```
src/views/components/home/hero-slideshow.twig
src/views/components/home/features-bar.twig
src/views/components/home/categories.twig
src/views/components/home/cta-banner.twig
src/views/components/home/newsletter.twig
src/views/components/home/featured-products.twig
src/views/components/home/featured-products-style2.twig
src/views/components/home/latest-products.twig
src/views/components/home/testimonials.twig
src/assets/styles/01-settings/fonts.scss
preview/home.html
preview/shell.html
preview/design-system-v3.html
preview/announcement-bar-v2.html
preview/PORTING.md
preview/css/ (entire directory)
preview/js/ (entire directory)
docs/GLOW-DESIGN-SYSTEM.md
docs/GLOW-IMPLEMENTATION-PLAN.md
```

---

## Phase 1: Cleanup + Design System Foundation

### Task 1: Delete old Jewelias home sections and preview files

**Files:**
- Delete: `src/views/components/home/hero-slideshow.twig`
- Delete: `src/views/components/home/features-bar.twig`
- Delete: `src/views/components/home/categories.twig`
- Delete: `src/views/components/home/cta-banner.twig`
- Delete: `src/views/components/home/newsletter.twig`
- Delete: `src/views/components/home/featured-products.twig`
- Delete: `src/views/components/home/featured-products-style2.twig`
- Delete: `src/views/components/home/latest-products.twig`
- Delete: `src/views/components/home/testimonials.twig`
- Delete: `preview/home.html`
- Delete: `preview/shell.html`
- Delete: `preview/design-system-v3.html`
- Delete: `preview/announcement-bar-v2.html`
- Delete: `preview/PORTING.md`
- Delete: `preview/css/` (directory)
- Delete: `preview/js/` (directory)
- Delete: `docs/GLOW-DESIGN-SYSTEM.md`
- Delete: `docs/GLOW-IMPLEMENTATION-PLAN.md`
- Delete: `src/assets/styles/01-settings/fonts.scss`

- [ ] **Step 1: Delete old home Twig sections**

```bash
rm src/views/components/home/hero-slideshow.twig \
   src/views/components/home/features-bar.twig \
   src/views/components/home/categories.twig \
   src/views/components/home/cta-banner.twig \
   src/views/components/home/newsletter.twig \
   src/views/components/home/featured-products.twig \
   src/views/components/home/featured-products-style2.twig \
   src/views/components/home/latest-products.twig \
   src/views/components/home/testimonials.twig
```

- [ ] **Step 2: Delete old preview files and Glow docs**

```bash
rm preview/home.html preview/shell.html preview/design-system-v3.html \
   preview/announcement-bar-v2.html preview/PORTING.md
rm -rf preview/css preview/js
rm docs/GLOW-DESIGN-SYSTEM.md docs/GLOW-IMPLEMENTATION-PLAN.md
rm src/assets/styles/01-settings/fonts.scss
```

- [ ] **Step 3: Verify clean state**

```bash
ls src/views/components/home/
# Expected: empty directory (or directory not found)
ls preview/
# Expected: empty directory
ls docs/GLOW-*
# Expected: No such file or directory
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove Jewelias home sections, Glow docs, and old preview files

Clean slate for Noor theme rebuild. Removed 9 custom home Twig sections,
all preview HTML mocks, Glow design system docs, and old font settings."
```

---

### Task 2: Create SCSS token foundation

**Files:**
- Create: `src/assets/styles/00-tokens/_variables.scss`
- Create: `src/assets/styles/00-tokens/_typography.scss`
- Create: `src/assets/styles/00-tokens/_reset.scss`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p src/assets/styles/00-tokens
mkdir -p src/assets/styles/01-base
mkdir -p src/assets/styles/02-components
mkdir -p src/assets/styles/03-sections
mkdir -p src/assets/styles/04-utilities
```

- [ ] **Step 2: Create `_variables.scss`**

Write to `src/assets/styles/00-tokens/_variables.scss`:

```scss
:root {
  // Colors
  --nr-primary: #263D30;
  --nr-primary-hover: #1a2d22;
  --nr-text: #1f1f1f;
  --nr-text-light: #747474;
  --nr-bg: #ffffff;
  --nr-bg-warm: #f8f2ea;
  --nr-bg-footer: #f1eee4;
  --nr-border: #e3e3e3;
  --nr-sale: #702424;
  --nr-dark-bg: #1f1f1f;
  --nr-dark-text: #ffffff;

  // Typography
  --nr-font-display: 'Cormorant', serif;
  --nr-font-body: 'Jost', sans-serif;

  // Type scale — desktop
  --nr-h1: 3.825rem;
  --nr-h2: 2.55rem;
  --nr-h3: 1.7rem;
  --nr-h4: 1.35rem;
  --nr-body: 1rem;
  --nr-small: 0.875rem;
  --nr-label: 0.75rem;

  // Spacing
  --nr-space-xs: 0.25rem;
  --nr-space-sm: 0.5rem;
  --nr-space-md: 1rem;
  --nr-space-lg: 2rem;
  --nr-space-xl: 4rem;
  --nr-space-2xl: 6rem;

  // Layout
  --nr-max-width: 1600px;
  --nr-card-ratio: 133%;
  --nr-radius: 0;

  // Motion
  --nr-transition: 400ms ease;
  --nr-transition-slow: 500ms ease;
  --nr-ease: cubic-bezier(0.25, 0.8, 0.25, 1);
}

@media (max-width: 768px) {
  :root {
    --nr-h1: 1.9125rem;
    --nr-h2: 1.525rem;
    --nr-h3: 1.275rem;
    --nr-h4: 1.125rem;
  }
}
```

- [ ] **Step 3: Create `_typography.scss`**

Write to `src/assets/styles/00-tokens/_typography.scss`:

```scss
h1, .nr-h1 {
  font-family: var(--nr-font-display);
  font-size: var(--nr-h1);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

h2, .nr-h2 {
  font-family: var(--nr-font-display);
  font-size: var(--nr-h2);
  font-weight: 500;
  line-height: 1.15;
}

h3, .nr-h3 {
  font-family: var(--nr-font-display);
  font-size: var(--nr-h3);
  font-weight: 500;
  line-height: 1.25;
}

h4, .nr-h4 {
  font-family: var(--nr-font-display);
  font-size: var(--nr-h4);
  font-weight: 500;
  line-height: 1.3;
}

.nr-body {
  font-size: var(--nr-body);
  line-height: 1.7;
}

.nr-small {
  font-size: var(--nr-small);
  line-height: 1.5;
}

.nr-label {
  font-family: var(--nr-font-body);
  font-size: var(--nr-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

- [ ] **Step 4: Create `_reset.scss`**

Write to `src/assets/styles/00-tokens/_reset.scss`:

```scss
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
}

img, picture, video, svg {
  display: block;
  max-width: 100%;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

input, textarea, select {
  font-family: inherit;
  font-size: inherit;
}

a {
  text-decoration: none;
  color: inherit;
}

ul, ol {
  list-style: none;
}
```

- [ ] **Step 5: Commit**

```bash
git add src/assets/styles/00-tokens/
git commit -m "feat(noor): add design token foundation

CSS custom properties for colors, typography, spacing, motion.
Responsive type scale. Minimal reset. Cormorant + Jost font system."
```

---

### Task 3: Create base layer styles

**Files:**
- Create: `src/assets/styles/01-base/_body.scss`
- Create: `src/assets/styles/01-base/_links.scss`
- Create: `src/assets/styles/01-base/_images.scss`

- [ ] **Step 1: Create `_body.scss`**

Write to `src/assets/styles/01-base/_body.scss`:

```scss
html {
  scroll-behavior: smooth;
}

// When Lenis is active, it handles smooth scroll
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto;
}

body {
  font-family: var(--nr-font-body);
  font-weight: 400;
  font-size: var(--nr-body);
  color: var(--nr-text);
  background: var(--nr-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

// Custom scrollbar (Whiff-style)
::-webkit-scrollbar {
  width: 6px;
  height: 3px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--nr-text-light);
  border-radius: 3px;
}
```

- [ ] **Step 2: Create `_links.scss`**

Write to `src/assets/styles/01-base/_links.scss`:

```scss
a {
  color: var(--nr-primary);
  transition: color var(--nr-transition);

  &:hover {
    color: var(--nr-primary-hover);
  }
}

// Animated underline link
.nr-link-underline {
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: currentColor;
    transition: width 400ms var(--nr-ease);
  }

  &:hover::after {
    width: 100%;
  }
}
```

- [ ] **Step 3: Create `_images.scss`**

Write to `src/assets/styles/01-base/_images.scss`:

```scss
img {
  height: auto;
}

// Skeleton shimmer for lazy-loaded images
.nr-skeleton {
  position: relative;
  overflow: hidden;
  background: var(--nr-bg-warm);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    animation: nr-shimmer 1.5s ease-in-out infinite;
  }

  &.nr-loaded::after {
    display: none;
  }
}

@keyframes nr-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/assets/styles/01-base/
git commit -m "feat(noor): add base layer — body, links, images

Lenis-ready body, custom scrollbar, animated underline links,
skeleton shimmer for lazy images."
```

---

### Task 4: Create component styles — buttons, cards, forms, badges

**Files:**
- Create: `src/assets/styles/02-components/_buttons.scss`
- Create: `src/assets/styles/02-components/_cards.scss`
- Create: `src/assets/styles/02-components/_forms.scss`
- Create: `src/assets/styles/02-components/_badges.scss`

- [ ] **Step 1: Create `_buttons.scss`**

Write to `src/assets/styles/02-components/_buttons.scss`:

```scss
// Shared button base
.nr-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--nr-font-body);
  font-weight: 400;
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: var(--nr-radius);
  cursor: pointer;
  transition: background-color var(--nr-transition), color var(--nr-transition), border-color var(--nr-transition);
}

// Solid — forest green bg, white text
.nr-btn-solid {
  @extend .nr-btn;
  background-color: var(--nr-primary);
  color: var(--nr-dark-text);

  &:hover {
    background-color: var(--nr-primary-hover);
  }
}

// Outline — transparent bg, primary border
.nr-btn-outline {
  @extend .nr-btn;
  background: transparent;
  color: var(--nr-primary);
  border: 1px solid var(--nr-primary);

  &:hover {
    background-color: var(--nr-primary);
    color: var(--nr-dark-text);
  }
}

// Text — no bg, animated underline
.nr-btn-text {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--nr-font-body);
  font-weight: 400;
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  color: var(--nr-primary);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: currentColor;
    transition: width 400ms var(--nr-ease);
  }

  &:hover::after {
    width: 100%;
  }
}
```

- [ ] **Step 2: Create `_cards.scss`**

Write to `src/assets/styles/02-components/_cards.scss`:

```scss
// Product card
.nr-card {
  display: block;
  color: inherit;
  text-align: left;

  [dir="rtl"] & {
    text-align: right;
  }
}

.nr-card__media {
  position: relative;
  overflow: hidden;
  padding-top: var(--nr-card-ratio);
  background: var(--nr-bg-warm);
  border-radius: var(--nr-radius);
}

.nr-card__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--nr-transition-slow);
}

.nr-card:hover .nr-card__img {
  transform: scale(1.1);
}

.nr-card__info {
  padding: var(--nr-space-md) 0;

  @media (min-width: 769px) {
    padding: 1.25rem;
  }
}

.nr-card__title {
  font-family: var(--nr-font-display);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.35;
  margin-bottom: var(--nr-space-xs);
}

.nr-card__price {
  font-family: var(--nr-font-body);
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--nr-text);
}

.nr-card__price-was {
  color: var(--nr-text-light);
  text-decoration: line-through;
  margin-inline-start: 0.5rem;
}

.nr-card__price-sale {
  color: var(--nr-sale);
}

.nr-card__swatches {
  display: flex;
  gap: 0.375rem;
  margin-top: var(--nr-space-sm);
}

.nr-card__swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--nr-border);
  cursor: pointer;
  transition: border-color var(--nr-transition);

  &:hover,
  &.is-active {
    border-color: var(--nr-primary);
  }

  @media (min-width: 769px) {
    width: 34px;
    height: 34px;
  }
}

// Collection card
.nr-card-collection {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: var(--nr-radius);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--nr-transition-slow);
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.nr-card-collection__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--nr-space-lg);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent 60%);
}

.nr-card-collection__title {
  font-family: var(--nr-font-display);
  font-size: var(--nr-h3);
  color: var(--nr-dark-text);
}

.nr-card-collection__subtitle {
  font-family: var(--nr-font-body);
  font-size: var(--nr-small);
  color: rgba(255, 255, 255, 0.7);
  margin-top: var(--nr-space-xs);
}
```

- [ ] **Step 3: Create `_forms.scss`**

Write to `src/assets/styles/02-components/_forms.scss`:

```scss
.nr-input {
  width: 100%;
  padding: 0.5rem 1rem;
  font-family: var(--nr-font-body);
  font-size: var(--nr-body);
  color: var(--nr-text);
  background: var(--nr-bg);
  border: 1px solid var(--nr-border);
  border-radius: var(--nr-radius);
  transition: border-color var(--nr-transition);

  &:focus {
    outline: none;
    border-color: var(--nr-primary);
    box-shadow: 0 0 0 1px var(--nr-primary);
  }

  &::placeholder {
    color: var(--nr-text-light);
  }
}

.nr-label {
  display: block;
  font-family: var(--nr-font-body);
  font-size: var(--nr-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--nr-text);
  margin-bottom: var(--nr-space-xs);
}

.nr-select {
  @extend .nr-input;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23747474' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;

  [dir="rtl"] & {
    background-position: left 1rem center;
    padding-right: 1rem;
    padding-left: 2.5rem;
  }
}
```

- [ ] **Step 4: Create `_badges.scss`**

Write to `src/assets/styles/02-components/_badges.scss`:

```scss
.nr-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--nr-font-body);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border-radius: var(--nr-radius);
}

.nr-badge-sale {
  @extend .nr-badge;
  background: var(--nr-sale);
  color: var(--nr-dark-text);
}

.nr-badge-new {
  @extend .nr-badge;
  background: var(--nr-primary);
  color: var(--nr-dark-text);
}

.nr-stock-low {
  font-size: var(--nr-small);
  color: rgba(165, 8, 8, 1);
}

.nr-stock-in {
  font-size: var(--nr-small);
  color: var(--nr-primary);
}
```

- [ ] **Step 5: Commit**

```bash
git add src/assets/styles/02-components/
git commit -m "feat(noor): add component styles — buttons, cards, forms, badges

Whiff-aligned components: solid/outline/text buttons, product + collection
cards with hover zoom, form inputs, sale/new badges. All use nr-* tokens."
```

---

### Task 5: Create component styles — marquee and carousel

**Files:**
- Create: `src/assets/styles/02-components/_marquee.scss`
- Create: `src/assets/styles/02-components/_carousel.scss`

- [ ] **Step 1: Create `_marquee.scss`**

Write to `src/assets/styles/02-components/_marquee.scss`:

```scss
.nr-marquee {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;

  &:hover .nr-marquee__track {
    animation-play-state: paused;
  }
}

.nr-marquee__track {
  display: flex;
  gap: var(--nr-space-xl);
  animation: nr-scrollX var(--nr-marquee-duration, 20s) linear infinite;

  [dir="rtl"] & {
    animation-name: nr-scrollX-rtl;
  }
}

.nr-marquee__item {
  flex-shrink: 0;
  font-family: var(--nr-font-body);
  font-size: var(--nr-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: var(--nr-space-lg);
}

.nr-marquee__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.4;
  flex-shrink: 0;
}
```

- [ ] **Step 2: Create `_carousel.scss`**

Write to `src/assets/styles/02-components/_carousel.scss`:

```scss
.nr-carousel {
  position: relative;
  overflow: hidden;
}

.nr-carousel__track {
  display: flex;
  transition: transform var(--nr-transition-slow);
}

.nr-carousel__slide {
  flex: 0 0 100%;
  min-width: 0;

  @media (min-width: 769px) {
    flex: 0 0 calc(100% / 3);
  }
}

.nr-carousel__arrows {
  display: flex;
  gap: var(--nr-space-sm);
}

.nr-carousel__arrow {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--nr-border);
  border-radius: var(--nr-radius);
  color: var(--nr-text);
  transition: background-color var(--nr-transition), color var(--nr-transition);

  &:hover {
    background: var(--nr-primary);
    border-color: var(--nr-primary);
    color: var(--nr-dark-text);
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

.nr-carousel__dots {
  display: flex;
  justify-content: center;
  gap: var(--nr-space-sm);
  margin-top: var(--nr-space-lg);
}

.nr-carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--nr-border);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color var(--nr-transition);

  &.is-active {
    background: var(--nr-primary);
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/assets/styles/02-components/_marquee.scss src/assets/styles/02-components/_carousel.scss
git commit -m "feat(noor): add marquee and carousel component styles

Infinite scroll ticker with pause-on-hover, RTL support.
Carousel with track, arrows, dots, responsive slide sizing."
```

---

### Task 6: Create utility styles — animations and helpers

**Files:**
- Create: `src/assets/styles/04-utilities/_animations.scss`
- Create: `src/assets/styles/04-utilities/_helpers.scss`

- [ ] **Step 1: Create `_animations.scss`**

Write to `src/assets/styles/04-utilities/_animations.scss`:

```scss
// Marquee scroll
@keyframes nr-scrollX {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes nr-scrollX-rtl {
  from { transform: translateX(0); }
  to { transform: translateX(50%); }
}

// Ken Burns (hero slideshow)
@keyframes nr-ken-burns {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}

@keyframes nr-ken-burns-alt {
  0% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

// Scroll reveal
.nr-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 400ms ease, transform 400ms ease;
}

.nr-reveal.nr-visible {
  opacity: 1;
  transform: translateY(0);
}

.nr-reveal-delay-1 { transition-delay: 100ms; }
.nr-reveal-delay-2 { transition-delay: 200ms; }
.nr-reveal-delay-3 { transition-delay: 300ms; }
.nr-reveal-delay-4 { transition-delay: 400ms; }

// Fade in (general purpose)
@keyframes nr-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

// Slide up (hero text)
@keyframes nr-slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 2: Create `_helpers.scss`**

Write to `src/assets/styles/04-utilities/_helpers.scss`:

```scss
// Page container
.nr-container {
  max-width: var(--nr-max-width);
  margin: 0 auto;
  padding: 0 3rem;

  @media (max-width: 768px) {
    padding: 0 1.25rem;
  }
}

// Section spacing
.nr-section {
  padding: var(--nr-space-2xl) 0;

  @media (max-width: 768px) {
    padding: var(--nr-space-xl) 0;
  }
}

// Section header (title + view-all link)
.nr-section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--nr-space-xl);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--nr-space-md);
    margin-bottom: var(--nr-space-lg);
  }
}

// Screen-reader only
.nr-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/assets/styles/04-utilities/
git commit -m "feat(noor): add animation keyframes and utility helpers

Ken Burns, marquee scroll (LTR/RTL), scroll reveal with stagger delays,
container, section spacing, screen-reader-only class."
```

---

### Task 7: Rewrite `app.scss` as import hub

**Files:**
- Modify: `src/assets/styles/app.scss`

- [ ] **Step 1: Replace entire `app.scss` with imports**

The file currently has ~1169 lines of `jw-*` / `glow-*` CSS. Replace the entire content with:

```scss
// Noor Theme — Main stylesheet
// Single entry point. All styles via partials.

// Salla Tailwind base
@import './01-settings/tailwind';

// 00 — Tokens
@import './00-tokens/reset';
@import './00-tokens/variables';
@import './00-tokens/typography';

// 01 — Base
@import './01-base/body';
@import './01-base/links';
@import './01-base/images';

// 02 — Components
@import './02-components/buttons';
@import './02-components/cards';
@import './02-components/forms';
@import './02-components/badges';
@import './02-components/marquee';
@import './02-components/carousel';

// 03 — Sections (added as built)
// @import './03-sections/announcement';
// @import './03-sections/header';
// @import './03-sections/hero';
// @import './03-sections/collections';
// @import './03-sections/products';
// @import './03-sections/editorial';
// @import './03-sections/social-proof';
// @import './03-sections/newsletter';
// @import './03-sections/footer';

// 04 — Utilities
@import './04-utilities/animations';
@import './04-utilities/helpers';
```

- [ ] **Step 2: Verify `01-settings/tailwind.scss` still exists**

```bash
cat src/assets/styles/01-settings/tailwind.scss
```

Expected: Tailwind directives (`@tailwind base;` etc.)

- [ ] **Step 3: Commit**

```bash
git add src/assets/styles/app.scss
git commit -m "refactor(noor): rewrite app.scss as modular import hub

Replaced 1100+ lines of jw-*/glow-* CSS with clean partial imports.
Section imports commented out — uncommented as each section is built."
```

---

### Task 8: Update Tailwind config with Noor tokens

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Replace `tailwind.config.js` content**

```js
module.exports = {
    important: false,
    content: [
        "src/views/**/*.twig",
        "src/assets/js/**/*.js",
        'node_modules/@salla.sa/twilight-tailwind-theme/safe-list-css.txt',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: '10px',
            screens: {
                '2xl': '1600px'
            }
        },
        fontFamily: {
            sans: ['Jost', 'var(--font-main)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            serif: ['Cormorant', 'serif'],
            display: ['Cormorant', 'serif'],
            body: ['Jost', 'sans-serif'],
            primary: 'var(--font-main)',
        },
        extend: {
            colors: {
                nr: {
                    primary: '#263D30',
                    'primary-hover': '#1a2d22',
                    text: '#1f1f1f',
                    'text-light': '#747474',
                    'bg-warm': '#f8f2ea',
                    'bg-footer': '#f1eee4',
                    border: '#e3e3e3',
                    sale: '#702424',
                    dark: '#1f1f1f',
                },
                'dark': '#1D1F1F',
                'darker': '#0E0F0F',
                'danger': '#AE0A0A',
                'primary-dark': 'var(--color-primary-dark)',
            },
            maxWidth: {
                page: '1600px',
            },
            borderRadius: {
                DEFAULT: '0',
            },
            transitionDuration: {
                DEFAULT: '400ms',
                slow: '500ms',
            },
            screens: {
                'xs': '480px',
            },
        },
    },
    corePlugins: {
        outline: false,
    },
    plugins: [
        require('@salla.sa/twilight-tailwind-theme'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
    ],
};
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.js
git commit -m "feat(noor): update Tailwind config with Noor tokens

Cormorant + Jost fonts, nr-* color palette, 0 border-radius,
1600px max-width, 400ms default transitions."
```

---

### Task 9: Update `master.twig` for Noor fonts and branding

**Files:**
- Modify: `src/views/layouts/master.twig`

- [ ] **Step 1: Replace Google Fonts link (line 82)**

Change:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@200;300;400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
```

To:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Update body class (line 99)**

Change:
```html
<body id="app" class="theme-jewelias overflow-x-hidden {% hook 'body:classes' %}
```

To:
```html
<body id="app" class="theme-noor overflow-x-hidden {% hook 'body:classes' %}
```

- [ ] **Step 3: Commit**

```bash
git add src/views/layouts/master.twig
git commit -m "feat(noor): update master.twig — Cormorant + Jost fonts, theme-noor class"
```

---

### Task 10: Install Lenis and update JS entry points

**Files:**
- Create: `src/assets/js/modules/lenis.js`
- Create: `src/assets/js/modules/scroll-reveal.js`
- Modify: `src/assets/js/app.js`
- Modify: `src/assets/js/home.js`

- [ ] **Step 1: Install Lenis**

```bash
cd /Users/masud/Sites/personal/salla-jewelias && pnpm add lenis
```

- [ ] **Step 2: Create modules directory and `lenis.js`**

```bash
mkdir -p src/assets/js/modules
```

Write to `src/assets/js/modules/lenis.js`:

```js
import Lenis from 'lenis';

let lenis = null;

export function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return lenis;
}

export function getLenis() {
  return lenis;
}
```

- [ ] **Step 3: Create `scroll-reveal.js`**

Write to `src/assets/js/modules/scroll-reveal.js`:

```js
export function initScrollReveal() {
  const targets = document.querySelectorAll('.nr-reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('nr-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}
```

- [ ] **Step 4: Update `app.js` — remove old Jewelias methods, add Noor imports**

Replace `src/assets/js/app.js` with:

```js
import MobileMenu from 'mmenu-light';
import Swal from 'sweetalert2';
import Anime from './partials/anime';
import initTootTip from './partials/tooltip';
import AppHelpers from "./app-helpers";
import { initLenis } from './modules/lenis';
import { initScrollReveal } from './modules/scroll-reveal';

class App extends AppHelpers {
  constructor() {
    super();
    window.app = this;
  }

  loadTheApp() {
    this.commonThings();
    this.initiateNotifier();
    this.initiateMobileMenu();
    this.initAddToCart();
    this.initiateDropdowns();
    this.initiateModals();
    this.initiateCollapse();

    initTootTip();
    this.loadModalImgOnclick();
    initLenis();
    initScrollReveal();

    salla.comment.event.onAdded(() => window.location.reload());

    this.status = 'ready';
    document.dispatchEvent(new CustomEvent('theme::ready'));
    this.log('Theme Loaded');
  }

  log(message) {
    salla.log(`Noor::${message}`);
    return this;
  }

  changeMenuDirection() {
    setTimeout(() => {
      app.all('.root-level.has-children', item => {
        if (item.classList.contains('change-menu-dir')) return;
        app.on('mouseover', item, () => {
          let allSubMenus = item.querySelectorAll('.sub-menu');
          allSubMenus.forEach((submenu, idx) => {
            if (idx === 0) return;
            let rect = submenu.getBoundingClientRect();
            if (rect.left < 10 || rect.right > window.innerWidth - 10) {
              app.addClass(item, 'change-menu-dir');
            }
          });
        });
      });
    }, 1000);
  }

  loadModalImgOnclick() {
    document.querySelectorAll('.load-img-onclick').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        let modal = document.querySelector('#' + link.dataset.modalId),
          img = modal.querySelector('img'),
          imgSrc = img.dataset.src;
        modal.open();

        if (img.classList.contains('loaded')) return;

        img.src = imgSrc;
        img.classList.add('loaded');
      })
    })
  }

  commonThings() {
    this.cleanContentArticles('.content-entry');
  }

  cleanContentArticles(elementsSelector) {
    let articleElements = document.querySelectorAll(elementsSelector);
    if (articleElements.length) {
      articleElements.forEach(article => {
        article.innerHTML = article.innerHTML.replace(/\&nbsp;/g, ' ')
      })
    }
  }

  isElementLoaded(selector) {
    return new Promise((resolve => {
      const interval = setInterval(() => {
        if (document.querySelector(selector)) {
          clearInterval(interval)
          return resolve(document.querySelector(selector))
        }
      }, 160)
    }))
  }

  copyToClipboard(event) {
    event.preventDefault();
    let aux = document.createElement("input"),
      btn = event.currentTarget;
    aux.setAttribute("value", btn.dataset.content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    this.toggleElementClassIf(btn, 'copied', 'code-to-copy', () => true);
    setTimeout(() => {
      this.toggleElementClassIf(btn, 'code-to-copy', 'copied', () => true)
    }, 1000);
  }

  initiateNotifier() {
    salla.notify.setNotifier(function (message, type, data) {
      if (window.enable_add_product_toast && data?.data?.googleTags?.event === "addToCart") {
        return;
      }
      if (typeof message == 'object') {
        return Swal.fire(message).then(type);
      }

      return Swal.mixin({
        toast: true,
        position: salla.config.get('theme.is_rtl') ? 'top-start' : 'top-end',
        showConfirmButton: false,
        timer: 2000,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }).fire({
        icon: type,
        title: message,
        showCloseButton: true,
        timerProgressBar: true
      })
    });
  }

  initiateMobileMenu() {
    this.isElementLoaded('#mobile-menu').then((menu) => {
      const mobileMenu = new MobileMenu(menu, "(max-width: 1024px)", "( slidingSubmenus: false)");

      salla.lang.onLoaded(() => {
        mobileMenu.navigation({ title: salla.lang.get('blocks.header.main_menu') });
      });
      const drawer = mobileMenu.offcanvas({ position: salla.config.get('theme.is_rtl') ? "right" : 'left' });

      this.onClick("a[href='#mobile-menu']", event => {
        document.body.classList.add('menu-opened');
        event.preventDefault() || drawer.close() || drawer.open()
      });
      this.onClick(".close-mobile-menu", event => {
        document.body.classList.remove('menu-opened');
        event.preventDefault() || drawer.close()
      });
    });
  }

  initiateDropdowns() {
    this.onClick('.dropdown__trigger', ({ target: btn }) => {
      btn.parentElement.classList.toggle('is-opened');
      document.body.classList.toggle('dropdown--is-opened');
      window.addEventListener('click', ({ target: element }) => {
        if (!element.closest('.dropdown__menu') && element !== btn || element.classList.contains('dropdown__close')) {
          btn.parentElement.classList.remove('is-opened');
          document.body.classList.remove('dropdown--is-opened');
        }
      });
    });
  }

  initiateModals() {
    this.onClick('[data-modal-trigger]', e => {
      let id = '#' + e.target.dataset.modalTrigger;
      this.removeClass(id, 'hidden');
      setTimeout(() => this.toggleModal(id, true));
    });
    salla.event.document.onClick("[data-close-modal]", e => this.toggleModal('#' + e.target.dataset.closeModal, false));
  }

  toggleModal(id, isOpen) {
    this.toggleClassIf(`${id} .s-salla-modal-overlay`, 'ease-out duration-300 opacity-100', 'opacity-0', () => isOpen)
      .toggleClassIf(`${id} .s-salla-modal-body`,
        'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100',
        'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
        () => isOpen)
      .toggleElementClassIf(document.body, 'modal-is-open', 'modal-is-closed', () => isOpen);
    if (!isOpen) {
      setTimeout(() => this.addClass(id, 'hidden'), 350);
    }
  }

  initiateCollapse() {
    document.querySelectorAll('.btn--collapse')
      .forEach((trigger) => {
        const content = document.querySelector('#' + trigger.dataset.show);
        if (!content) return;

        const state = { isOpen: false }

        const toggleState = (isOpen) => {
          state.isOpen = !isOpen;
          this.toggleElementClassIf([content, trigger], 'is-closed', 'is-opened', () => isOpen);
        }

        trigger.addEventListener('click', () => {
          const { isOpen } = state;
          toggleState(isOpen);
        });
      });
  }

  anime(selector, options = null) {
    let anime = new Anime(selector, options);
    return options === false ? anime : anime.play();
  }

  initAddToCart() {
    salla.cart.event.onUpdated(summary => {
      document.querySelectorAll('[data-cart-total]').forEach(el => el.innerHTML = salla.money(summary.total));
      document.querySelectorAll('[data-cart-count]').forEach(el => el.innerText = salla.helpers.number(summary.count));
    });

    salla.cart.event.onItemAdded((response, prodId) => {
      app.element('salla-cart-summary').animateToCart(app.element(`#product-${prodId} img`));
    });
  }
}

salla.onReady(() => (new App).loadTheApp());
```

- [ ] **Step 5: Update `home.js`**

Replace `src/assets/js/home.js` with:

```js
import BasePage from "./base-page";

class Home extends BasePage {
  onReady() {
    // Section modules imported as built in Phase 2
  }
}

Home.initiateWhenReady(['index']);
```

- [ ] **Step 6: Commit**

```bash
git add src/assets/js/ pnpm-lock.yaml package.json
git commit -m "feat(noor): add Lenis smooth scroll, scroll reveal, rebrand app.js

Lenis init in app.js, IntersectionObserver scroll reveal for .nr-reveal,
removed all jw-* announcement/header methods, rebranded log to Noor."
```

---

### Task 11: Update `twilight.json` — rename theme and clear old components

**Files:**
- Modify: `twilight.json`

- [ ] **Step 1: Update theme name and description (lines 2-11)**

Change the `name` and `description` fields:

```json
"name": {
    "ar": "نور",
    "en": "Noor"
},
```

```json
"description": {
    "en": "Premium luxury & editorial lifestyle theme for Salla, inspired by Eurus Whiff.",
    "ar": "قالب فاخر وأنيق لمنصة سلة، مستوحى من تصميم Eurus Whiff."
},
```

- [ ] **Step 2: Remove all existing `home.*` component entries from `components` array**

Find the `"components": [` section (line 245) and replace the entire array with an empty array:

```json
"components": []
```

This clears all 14 broken `home.*` references. Components will be re-added one-by-one in Phase 3 as each section is ported to Twig.

- [ ] **Step 3: Update `package.json` name and description**

Change in `package.json`:
- `"name": "salla-jewelias"` → `"name": "salla-noor"`
- `"description"` → `"Noor - Premium luxury & editorial lifestyle theme for Salla"`

- [ ] **Step 4: Validate JSON**

```bash
python3 -m json.tool twilight.json > /dev/null
# Expected: no output (valid JSON)
```

- [ ] **Step 5: Commit**

```bash
git add twilight.json package.json
git commit -m "feat(noor): rename theme to Noor, clear old home components

twilight.json: name → Noor, empty components array (rebuilt per section).
package.json: salla-noor with updated description."
```

---

### Task 12: Update documentation for Noor

**Files:**
- Modify: `AGENTS.md`
- Modify: `docs/current-status.md`
- Modify: `docs/plan.md`
- Modify: `docs/decisions.md`
- Modify: `docs/handoff.md`

- [ ] **Step 1: Update `AGENTS.md` — replace all `jw-*` references with `nr-*`**

Global replacements in `AGENTS.md`:
- `Jewelias` → `Noor` (theme name references)
- `jw-*` → `nr-*` (CSS prefix references)
- `jw-` → `nr-` (in class naming table and examples)
- `glow-*` / `glow-` → remove references (no longer relevant)
- Update mission statement to reference Noor and Eurus Whiff

- [ ] **Step 2: Rewrite `docs/current-status.md`**

```markdown
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
```

- [ ] **Step 3: Rewrite `docs/plan.md`**

```markdown
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
- [ ] Sections: announcement, header, hero, marquee, split collection, editorial, featured products, CTA banner, bundle tabs, trust strip, testimonials, image promos, Instagram, newsletter, footer
- [ ] All animations working (Ken Burns, scroll reveal, marquee, carousel)

## Phase 3 — Salla Twig port

- [ ] Port each section to `src/views/components/home/<name>.twig`
- [ ] Add `twilight.json` component entries with merchant-configurable schema
- [ ] Restyle header (`src/views/components/header/`)
- [ ] Restyle footer (`src/views/components/footer/`)
- [ ] Inner pages audit (product, cart, customer, blog)
- [ ] RTL pass on all sections
- [ ] Lighthouse + marketplace checklist

## Dependencies

- Phase 2 requires Phase 1 complete (tokens + components must exist)
- Phase 3 requires Phase 2 approved (visual sign-off before Twig work)
```

- [ ] **Step 4: Add decision entry to `docs/decisions.md`**

Append to `docs/decisions.md`:

```markdown
## 2026-04-10 — Theme rebrand: Jewelias → Noor

- **Decision:** Rebrand theme from Jewelias (jewelry) to Noor (luxury/editorial lifestyle). New design system based on Eurus Whiff. CSS prefix `jw-*` → `nr-*`. Fresh codebase — all old home sections, Glow docs, preview mocks removed.
- **Context:** Jewelias was a test project. Noor is the production theme targeting Salla marketplace.
- **Options considered:** (a) Iterate on Jewelias; (b) Start fresh with new identity — **chosen (b)**.
- **Why:** Clean break avoids carrying forward dual-token mess (jw-*/glow-*), broken schema references, and unclear design direction. Eurus Whiff provides a concrete, proven reference.
- **Implications:** All code, docs, and configs now reference Noor/nr-*. Old Jewelias patterns are gone from the codebase.
```

- [ ] **Step 5: Rewrite `docs/handoff.md`**

```markdown
# Handoff — continue from here

_Last updated: 2026-04-10_

## Latest completed work

- **Theme rebranded to Noor** — Jewelias identity removed, Eurus Whiff design reference adopted.
- **SCSS architecture established:** `00-tokens/`, `01-base/`, `02-components/`, `04-utilities/` all written. `app.scss` is a clean import hub.
- **Tailwind config** updated with `nr-*` color tokens, Cormorant + Jost fonts.
- **JS modernized:** Lenis smooth scroll + IntersectionObserver scroll reveal in `app.js`. Old `jw-*` announcement/header JS removed.
- **Clean slate:** All old home Twig sections deleted, `twilight.json` components cleared, Glow docs removed, preview mocks removed.

## What changed (files)

- **Deleted:** 9 home Twig sections, preview/* (old mocks), docs/GLOW-*.md, 01-settings/fonts.scss
- **Created:** 00-tokens/, 01-base/, 02-components/, 04-utilities/ (all SCSS partials), js/modules/lenis.js, js/modules/scroll-reveal.js
- **Rewritten:** app.scss, tailwind.config.js, app.js, home.js, master.twig, twilight.json, package.json
- **Updated:** AGENTS.md, docs/current-status.md, docs/plan.md, docs/decisions.md, this file

## Known issues

1. **No homepage sections yet** — `03-sections/` is empty, `twilight.json` components array is empty.
2. **Header/footer** still have old Theme Raed markup — needs Noor restyling.
3. **Preview HTML** not yet created — needed for visual sign-off before Twig port.

## Exact next step

**Build `preview/noor-design-system.html`** — a standalone HTML page loading the compiled CSS that renders all tokens (colors, type scale, spacing), components (buttons, cards, forms, badges), and animations (reveal, hover zoom). This is the visual sign-off page before building homepage sections.

## Warnings

- Do not add `home.*` in `twilight.json` without a matching Twig file.
- Section styles go in `03-sections/`, not in component files.
- Components in `02-components/` must be section-agnostic.
```

- [ ] **Step 6: Commit**

```bash
git add AGENTS.md docs/
git commit -m "docs(noor): update all documentation for Noor rebrand

AGENTS.md, current-status, plan, decisions, handoff — all updated
to reflect Noor identity, nr-* prefix, Eurus Whiff reference."
```

---

### Task 13: Build CSS and verify no errors

**Files:** None (verification only)

- [ ] **Step 1: Run development build**

```bash
cd /Users/masud/Sites/personal/salla-jewelias && pnpm run development
```

Expected: Build completes without errors. `public/app.css` contains all `nr-*` styles.

- [ ] **Step 2: Verify compiled CSS contains Noor tokens**

```bash
grep 'nr-primary' public/app.css | head -5
```

Expected: Lines containing `--nr-primary` and `.nr-btn-solid` etc.

- [ ] **Step 3: If build fails, debug and fix**

Common issues:
- Missing `01-settings/tailwind.scss` → verify it exists
- SCSS import path errors → check relative paths in `app.scss`
- Lenis import error → verify `pnpm add lenis` succeeded

---

### Task 14: Build `preview/noor-design-system.html`

**Files:**
- Create: `preview/noor-design-system.html`

- [ ] **Step 1: Create the design system preview page**

Write to `preview/noor-design-system.html` — a self-contained HTML page that:

1. Links to Google Fonts (Cormorant + Jost)
2. Links to compiled `../public/app.css` (the same production CSS)
3. Renders sections for:
   - **Color palette:** Swatches for all `--nr-*` colors with hex labels
   - **Typography:** H1–H4 headings, body, small, label — showing font, size, weight
   - **Spacing:** Visual boxes showing xs through 2xl
   - **Buttons:** `.nr-btn-solid`, `.nr-btn-outline`, `.nr-btn-text` in default and hover states
   - **Product card:** `.nr-card` with placeholder image, title, price, swatches, badge
   - **Collection card:** `.nr-card-collection` with overlay text
   - **Form inputs:** Text input, select, with labels
   - **Badges:** Sale, new, stock indicators
   - **Marquee:** Scrolling ticker with sample text
   - **Scroll reveal:** Elements with `.nr-reveal` that animate on scroll
   - **Skeleton shimmer:** `.nr-skeleton` loading state

The page should use `nr-container`, `nr-section`, `nr-section-header` for layout.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Noor — Design System</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../public/app.css">
  <style>
    /* Preview-only helpers — NOT production code */
    .ds-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 1rem; }
    .ds-swatch { height: 80px; display: flex; align-items: flex-end; padding: 0.5rem; font-size: 0.7rem; color: #fff; }
    .ds-swatch--light { color: #1f1f1f; }
    .ds-type-row { margin-bottom: 1.5rem; }
    .ds-type-meta { font-size: 0.75rem; color: var(--nr-text-light); margin-top: 0.25rem; }
    .ds-space-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
    .ds-space-box { background: var(--nr-primary); height: 1.5rem; }
    .ds-space-label { font-size: 0.75rem; color: var(--nr-text-light); min-width: 120px; }
    .ds-btn-row { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem; }
    .ds-card-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
    .ds-placeholder { background: var(--nr-bg-warm); width: 100%; aspect-ratio: 3/4; }
    .ds-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 600px; }
    .ds-badge-row { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
    hr.ds-divider { border: none; border-top: 1px solid var(--nr-border); margin: 3rem 0; }
    @media (max-width: 768px) {
      .ds-card-grid { grid-template-columns: 1fr 1fr; }
      .ds-form-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <div class="nr-container" style="padding-top: var(--nr-space-xl); padding-bottom: var(--nr-space-2xl);">

    <h1 style="margin-bottom: var(--nr-space-xs);">Noor Design System</h1>
    <p class="nr-small" style="color: var(--nr-text-light); margin-bottom: var(--nr-space-2xl);">
      Visual reference — Eurus Whiff. Prefix: nr-*. Fonts: Cormorant + Jost.
    </p>

    <!-- COLORS -->
    <section class="nr-section" style="padding-top: 0;">
      <div class="nr-section-header">
        <h2>Color Palette</h2>
      </div>
      <div class="ds-grid">
        <div class="ds-swatch" style="background: var(--nr-primary);">--nr-primary<br>#263D30</div>
        <div class="ds-swatch" style="background: var(--nr-primary-hover);">--nr-primary-hover<br>#1a2d22</div>
        <div class="ds-swatch" style="background: var(--nr-text);">--nr-text<br>#1f1f1f</div>
        <div class="ds-swatch" style="background: var(--nr-text-light);">--nr-text-light<br>#747474</div>
        <div class="ds-swatch ds-swatch--light" style="background: var(--nr-bg); border: 1px solid var(--nr-border);">--nr-bg<br>#ffffff</div>
        <div class="ds-swatch ds-swatch--light" style="background: var(--nr-bg-warm);">--nr-bg-warm<br>#f8f2ea</div>
        <div class="ds-swatch ds-swatch--light" style="background: var(--nr-bg-footer);">--nr-bg-footer<br>#f1eee4</div>
        <div class="ds-swatch ds-swatch--light" style="background: var(--nr-border);">--nr-border<br>#e3e3e3</div>
        <div class="ds-swatch" style="background: var(--nr-sale);">--nr-sale<br>#702424</div>
        <div class="ds-swatch" style="background: var(--nr-dark-bg);">--nr-dark-bg<br>#1f1f1f</div>
      </div>
    </section>

    <hr class="ds-divider">

    <!-- TYPOGRAPHY -->
    <section class="nr-section" style="padding-top: 0;">
      <div class="nr-section-header">
        <h2>Typography</h2>
      </div>
      <div class="ds-type-row">
        <h1>Heading 1 — The Art of Light</h1>
        <p class="ds-type-meta">Cormorant 500 · var(--nr-h1) · 3.825rem / 1.9125rem mobile</p>
      </div>
      <div class="ds-type-row">
        <h2>Heading 2 — Curated Collections</h2>
        <p class="ds-type-meta">Cormorant 500 · var(--nr-h2) · 2.55rem / 1.525rem mobile</p>
      </div>
      <div class="ds-type-row">
        <h3>Heading 3 — Featured Pieces</h3>
        <p class="ds-type-meta">Cormorant 500 · var(--nr-h3) · 1.7rem / 1.275rem mobile</p>
      </div>
      <div class="ds-type-row">
        <h4>Heading 4 — New Arrivals</h4>
        <p class="ds-type-meta">Cormorant 500 · var(--nr-h4) · 1.35rem / 1.125rem mobile</p>
      </div>
      <div class="ds-type-row">
        <p class="nr-body">Body text — Discover our carefully curated selection of luxury pieces, each crafted with exceptional attention to detail and timeless elegance.</p>
        <p class="ds-type-meta">Jost 400 · 1rem · line-height 1.7</p>
      </div>
      <div class="ds-type-row">
        <p class="nr-small">Small text — Free shipping on orders over $100</p>
        <p class="ds-type-meta">Jost 400 · 0.875rem</p>
      </div>
      <div class="ds-type-row">
        <span class="nr-label">Label text — new collection</span>
        <p class="ds-type-meta">Jost 500 · 0.75rem · uppercase · tracking 0.08em</p>
      </div>
    </section>

    <hr class="ds-divider">

    <!-- SPACING -->
    <section class="nr-section" style="padding-top: 0;">
      <div class="nr-section-header">
        <h2>Spacing Scale</h2>
      </div>
      <div class="ds-space-row"><span class="ds-space-label">xs — 0.25rem (4px)</span><div class="ds-space-box" style="width: 0.25rem;"></div></div>
      <div class="ds-space-row"><span class="ds-space-label">sm — 0.5rem (8px)</span><div class="ds-space-box" style="width: 0.5rem;"></div></div>
      <div class="ds-space-row"><span class="ds-space-label">md — 1rem (16px)</span><div class="ds-space-box" style="width: 1rem;"></div></div>
      <div class="ds-space-row"><span class="ds-space-label">lg — 2rem (32px)</span><div class="ds-space-box" style="width: 2rem;"></div></div>
      <div class="ds-space-row"><span class="ds-space-label">xl — 4rem (64px)</span><div class="ds-space-box" style="width: 4rem;"></div></div>
      <div class="ds-space-row"><span class="ds-space-label">2xl — 6rem (96px)</span><div class="ds-space-box" style="width: 6rem;"></div></div>
    </section>

    <hr class="ds-divider">

    <!-- BUTTONS -->
    <section class="nr-section" style="padding-top: 0;">
      <div class="nr-section-header">
        <h2>Buttons</h2>
      </div>
      <div class="ds-btn-row">
        <button class="nr-btn-solid">Shop Now</button>
        <button class="nr-btn-outline">View Collection</button>
        <button class="nr-btn-text">Learn More</button>
      </div>
      <div class="ds-btn-row">
        <button class="nr-btn-solid" style="font-size: 0.75rem; padding: 0.625rem 1.5rem;">Small Solid</button>
        <button class="nr-btn-outline" style="font-size: 0.75rem; padding: 0.625rem 1.5rem;">Small Outline</button>
      </div>
    </section>

    <hr class="ds-divider">

    <!-- PRODUCT CARDS -->
    <section class="nr-section" style="padding-top: 0;">
      <div class="nr-section-header">
        <h2>Product Cards</h2>
        <a href="#" class="nr-btn-text">View All</a>
      </div>
      <div class="ds-card-grid">
        <a href="#" class="nr-card">
          <div class="nr-card__media">
            <div class="ds-placeholder nr-card__img" style="position: absolute;"></div>
            <span class="nr-badge-new" style="position: absolute; top: 12px; left: 12px;">New</span>
          </div>
          <div class="nr-card__info">
            <div class="nr-card__title">Luna Gold Ring</div>
            <div class="nr-card__price">SAR 1,200</div>
          </div>
        </a>
        <a href="#" class="nr-card">
          <div class="nr-card__media">
            <div class="ds-placeholder nr-card__img" style="position: absolute;"></div>
            <span class="nr-badge-sale" style="position: absolute; top: 12px; left: 12px;">Sale</span>
          </div>
          <div class="nr-card__info">
            <div class="nr-card__title">Pearl Drop Earrings</div>
            <div class="nr-card__price"><span class="nr-card__price-sale">SAR 890</span> <span class="nr-card__price-was">SAR 1,100</span></div>
          </div>
        </a>
        <a href="#" class="nr-card">
          <div class="nr-card__media">
            <div class="ds-placeholder nr-card__img" style="position: absolute;"></div>
          </div>
          <div class="nr-card__info">
            <div class="nr-card__title">Emerald Pendant Necklace</div>
            <div class="nr-card__price">SAR 2,450</div>
            <div class="nr-card__swatches">
              <span class="nr-card__swatch" style="background: #c4a35a;"></span>
              <span class="nr-card__swatch is-active" style="background: #e8e0d4;"></span>
              <span class="nr-card__swatch" style="background: #1f1f1f;"></span>
            </div>
          </div>
        </a>
        <a href="#" class="nr-card">
          <div class="nr-card__media">
            <div class="ds-placeholder nr-card__img" style="position: absolute;"></div>
          </div>
          <div class="nr-card__info">
            <div class="nr-card__title">Diamond Tennis Bracelet</div>
            <div class="nr-card__price">SAR 4,800</div>
          </div>
        </a>
      </div>
    </section>

    <hr class="ds-divider">

    <!-- FORMS -->
    <section class="nr-section" style="padding-top: 0;">
      <div class="nr-section-header">
        <h2>Form Elements</h2>
      </div>
      <div class="ds-form-grid">
        <div>
          <label class="nr-label" for="ds-name">Full Name</label>
          <input class="nr-input" id="ds-name" type="text" placeholder="Enter your name">
        </div>
        <div>
          <label class="nr-label" for="ds-email">Email Address</label>
          <input class="nr-input" id="ds-email" type="email" placeholder="you@example.com">
        </div>
        <div>
          <label class="nr-label" for="ds-country">Country</label>
          <select class="nr-select" id="ds-country">
            <option>Saudi Arabia</option>
            <option>UAE</option>
            <option>Kuwait</option>
          </select>
        </div>
      </div>
    </section>

    <hr class="ds-divider">

    <!-- BADGES -->
    <section class="nr-section" style="padding-top: 0;">
      <div class="nr-section-header">
        <h2>Badges &amp; Stock</h2>
      </div>
      <div class="ds-badge-row">
        <span class="nr-badge-sale">Sale</span>
        <span class="nr-badge-new">New</span>
        <span class="nr-stock-in">In Stock</span>
        <span class="nr-stock-low">Low Stock — 3 left</span>
      </div>
    </section>

    <hr class="ds-divider">

    <!-- MARQUEE -->
    <section class="nr-section" style="padding-top: 0;">
      <div class="nr-section-header">
        <h2>Marquee Ticker</h2>
      </div>
    </section>
  </div>

  <div class="nr-marquee" style="padding: var(--nr-space-md) 0; background: var(--nr-bg-warm);">
    <div class="nr-marquee__track">
      <span class="nr-marquee__item">Free Shipping Worldwide</span>
      <span class="nr-marquee__dot"></span>
      <span class="nr-marquee__item">Lifetime Warranty</span>
      <span class="nr-marquee__dot"></span>
      <span class="nr-marquee__item">Handcrafted With Love</span>
      <span class="nr-marquee__dot"></span>
      <span class="nr-marquee__item">Ethically Sourced</span>
      <span class="nr-marquee__dot"></span>
      <span class="nr-marquee__item">Free Shipping Worldwide</span>
      <span class="nr-marquee__dot"></span>
      <span class="nr-marquee__item">Lifetime Warranty</span>
      <span class="nr-marquee__dot"></span>
      <span class="nr-marquee__item">Handcrafted With Love</span>
      <span class="nr-marquee__dot"></span>
      <span class="nr-marquee__item">Ethically Sourced</span>
      <span class="nr-marquee__dot"></span>
    </div>
  </div>

  <div class="nr-container">

    <hr class="ds-divider">

    <!-- SKELETON SHIMMER -->
    <section class="nr-section" style="padding-top: 0;">
      <div class="nr-section-header">
        <h2>Loading State</h2>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
        <div>
          <div class="nr-skeleton" style="padding-top: var(--nr-card-ratio);"></div>
          <div class="nr-skeleton" style="height: 1rem; width: 70%; margin-top: 1rem;"></div>
          <div class="nr-skeleton" style="height: 0.875rem; width: 40%; margin-top: 0.5rem;"></div>
        </div>
        <div>
          <div class="nr-skeleton" style="padding-top: var(--nr-card-ratio);"></div>
          <div class="nr-skeleton" style="height: 1rem; width: 60%; margin-top: 1rem;"></div>
          <div class="nr-skeleton" style="height: 0.875rem; width: 35%; margin-top: 0.5rem;"></div>
        </div>
        <div>
          <div class="nr-skeleton" style="padding-top: var(--nr-card-ratio);"></div>
          <div class="nr-skeleton" style="height: 1rem; width: 80%; margin-top: 1rem;"></div>
          <div class="nr-skeleton" style="height: 0.875rem; width: 45%; margin-top: 0.5rem;"></div>
        </div>
        <div>
          <div class="nr-skeleton" style="padding-top: var(--nr-card-ratio);"></div>
          <div class="nr-skeleton" style="height: 1rem; width: 65%; margin-top: 1rem;"></div>
          <div class="nr-skeleton" style="height: 0.875rem; width: 38%; margin-top: 0.5rem;"></div>
        </div>
      </div>
    </section>

    <hr class="ds-divider">

    <!-- SCROLL REVEAL -->
    <section class="nr-section" style="padding-top: 0;">
      <div class="nr-section-header">
        <h2>Scroll Reveal</h2>
      </div>
      <p class="nr-small" style="color: var(--nr-text-light); margin-bottom: var(--nr-space-lg);">Scroll down to see elements animate in</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
        <div class="nr-reveal" style="background: var(--nr-bg-warm); padding: var(--nr-space-lg); text-align: center;">
          <h3>Reveal 1</h3>
          <p class="nr-small" style="color: var(--nr-text-light); margin-top: var(--nr-space-sm);">Default delay</p>
        </div>
        <div class="nr-reveal nr-reveal-delay-1" style="background: var(--nr-bg-warm); padding: var(--nr-space-lg); text-align: center;">
          <h3>Reveal 2</h3>
          <p class="nr-small" style="color: var(--nr-text-light); margin-top: var(--nr-space-sm);">100ms delay</p>
        </div>
        <div class="nr-reveal nr-reveal-delay-2" style="background: var(--nr-bg-warm); padding: var(--nr-space-lg); text-align: center;">
          <h3>Reveal 3</h3>
          <p class="nr-small" style="color: var(--nr-text-light); margin-top: var(--nr-space-sm);">200ms delay</p>
        </div>
      </div>
    </section>

  </div>

  <!-- Scroll reveal JS (inline for preview — production uses compiled module) -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const targets = document.querySelectorAll('.nr-reveal');
      if (!targets.length) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('nr-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      targets.forEach(el => observer.observe(el));
    });
  </script>

</body>
</html>
```

- [ ] **Step 2: Build CSS and verify preview**

```bash
cd /Users/masud/Sites/personal/salla-jewelias && pnpm run development
```

Then open in browser:
```bash
open preview/noor-design-system.html
```

Verify: all color swatches render, typography shows Cormorant headings + Jost body, buttons have correct styles, cards layout properly, marquee scrolls, skeleton shimmers, scroll reveal animates on scroll.

- [ ] **Step 3: Commit**

```bash
git add preview/noor-design-system.html
git commit -m "feat(noor): add design system preview page

Visual sign-off page rendering all tokens, typography, buttons, cards,
forms, badges, marquee, skeleton, and scroll reveal against compiled CSS."
```

---

## Phase 2: Homepage Section Previews

> Phase 2 builds `preview/noor-home.html` and all section SCSS in `03-sections/`. This is a large body of work — each section gets its own task with full SCSS and HTML. Sections are added to `app.scss` imports as built.

### Task 15: Announcement bar section

**Files:**
- Create: `src/assets/styles/03-sections/_announcement.scss`
- Modify: `src/assets/styles/app.scss` (uncomment announcement import)

- [ ] **Step 1: Create `_announcement.scss`**

Write to `src/assets/styles/03-sections/_announcement.scss`:

```scss
.nr-announcement {
  display: flex;
  align-items: center;
  background: var(--nr-dark-bg);
  color: var(--nr-dark-text);
  font-family: var(--nr-font-body);
  font-size: var(--nr-label);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  min-height: 40px;
  position: relative;
}

.nr-announcement__social {
  display: flex;
  gap: 0.625rem;
  align-items: center;
  padding: 0 1rem;
  flex-shrink: 0;

  a {
    color: inherit;
    opacity: 0.7;
    transition: opacity 200ms ease;

    &:hover { opacity: 1; }
  }

  svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
  }
}

.nr-announcement__center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-width: 0;
}

.nr-announcement__right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  flex-shrink: 0;
}

.nr-announcement__close {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: inherit;
  opacity: 0.6;
  padding: 4px;
  z-index: 2;
  transition: opacity 200ms ease;

  &:hover { opacity: 1; }

  [dir="rtl"] & {
    left: auto;
    right: 0.75rem;
  }
}

.nr-announcement__locale-btn {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: inherit;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: opacity 200ms ease;

  &:hover { opacity: 1; }
}

@media (max-width: 768px) {
  .nr-announcement__social,
  .nr-announcement__right,
  .nr-announcement__close {
    display: none;
  }

  .nr-announcement__center {
    padding: 0 0.75rem;
  }
}
```

- [ ] **Step 2: Uncomment announcement import in `app.scss`**

In `app.scss`, change:
```scss
// @import './03-sections/announcement';
```
To:
```scss
@import './03-sections/announcement';
```

- [ ] **Step 3: Commit**

```bash
git add src/assets/styles/03-sections/_announcement.scss src/assets/styles/app.scss
git commit -m "feat(noor): add announcement bar section styles

Dark bg, social links, centered content, locale button, close control,
RTL-aware, hides secondary elements on mobile."
```

---

### Task 16: Header section

**Files:**
- Create: `src/assets/styles/03-sections/_header.scss`
- Modify: `src/assets/styles/app.scss` (uncomment header import)

- [ ] **Step 1: Create `_header.scss`**

Write to `src/assets/styles/03-sections/_header.scss`:

```scss
.nr-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--nr-bg);
  border-bottom: 1px solid var(--nr-border);
  transition: box-shadow var(--nr-transition), border-color var(--nr-transition), transform 380ms ease;
}

.nr-header.is-elevated {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
  border-bottom-color: transparent;
}

.nr-header.is-hidden {
  transform: translateY(-100%);
  pointer-events: none;
}

.nr-header__inner {
  max-width: var(--nr-max-width);
  margin: 0 auto;
  padding: 0 3rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 72px;
  gap: 1rem;
}

.nr-header__left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.nr-header__nav {
  min-width: 0;
  display: flex;
  align-items: center;
}

.nr-header__logo {
  justify-self: center;
  text-align: center;
  font-family: var(--nr-font-display);
  font-size: 1.75rem;
  font-weight: 500;
  color: var(--nr-text);
  letter-spacing: 0.02em;
  line-height: 1;

  img {
    height: 36px;
    width: auto;
    margin: 0 auto;
  }
}

.nr-header__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
}

.nr-header__icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  color: var(--nr-text);
  transition: color var(--nr-transition);

  &:hover {
    color: var(--nr-primary);
  }

  svg, i {
    font-size: 20px;
  }
}

.nr-header__badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  background: var(--nr-primary);
  border-radius: 50%;
  font-size: 0.55rem;
  color: var(--nr-dark-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  padding: 0 4px;
}

// Desktop nav
@media (min-width: 1024px) {
  .nr-header__nav-list {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nr-header__nav-link {
    font-family: var(--nr-font-body);
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.04em;
    color: var(--nr-text-light);
    padding: 0.625rem 0;
    display: inline-flex;
    align-items: center;
    position: relative;
    transition: color var(--nr-transition);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--nr-primary);
      transition: width 400ms var(--nr-ease);
    }

    &:hover {
      color: var(--nr-primary);

      &::after {
        width: 100%;
      }
    }
  }

  .nr-header__menu-toggle {
    display: none;
  }
}

@media (max-width: 1023px) {
  .nr-header__nav {
    display: none;
  }

  .nr-header__menu-toggle {
    display: inline-flex;
  }

  .nr-header__inner {
    grid-template-columns: auto 1fr auto;
    padding: 0 1rem;
    min-height: 60px;
  }

  .nr-header__logo {
    font-size: 1.35rem;
  }
}
```

- [ ] **Step 2: Uncomment header import in `app.scss`**

In `app.scss`, change:
```scss
// @import './03-sections/header';
```
To:
```scss
@import './03-sections/header';
```

- [ ] **Step 3: Commit**

```bash
git add src/assets/styles/03-sections/_header.scss src/assets/styles/app.scss
git commit -m "feat(noor): add header section styles

Sticky header, smart show/hide, logo-center grid, nav underline hover,
icon actions with badge, responsive collapse to hamburger."
```

---

### Task 17: Hero slideshow section

**Files:**
- Create: `src/assets/styles/03-sections/_hero.scss`
- Modify: `src/assets/styles/app.scss` (uncomment hero import)

- [ ] **Step 1: Create `_hero.scss`**

Write to `src/assets/styles/03-sections/_hero.scss`:

```scss
.nr-hero {
  position: relative;
  width: 100%;
  min-height: 90vh;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 60vh;
  }
}

.nr-hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity var(--nr-transition-slow);

  &.is-active {
    opacity: 1;
    z-index: 1;
  }
}

.nr-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nr-hero__slide.is-active .nr-hero__img {
  animation: nr-ken-burns 8s ease forwards;
}

.nr-hero__slide:nth-child(even).is-active .nr-hero__img {
  animation-name: nr-ken-burns-alt;
}

.nr-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 100%
  );
  z-index: 2;

  [dir="rtl"] & {
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      transparent 100%
    );
  }
}

.nr-hero__content {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8%;
  max-width: 650px;

  @media (max-width: 768px) {
    padding: 0 1.25rem;
    max-width: 100%;
  }
}

.nr-hero__subtitle {
  font-family: var(--nr-font-body);
  font-size: var(--nr-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--nr-space-md);
  opacity: 0;
  animation: nr-slide-up 600ms ease 300ms forwards;
}

.nr-hero__title {
  font-family: var(--nr-font-display);
  font-size: var(--nr-h1);
  font-weight: 500;
  color: var(--nr-dark-text);
  line-height: 1.08;
  margin-bottom: var(--nr-space-lg);
  opacity: 0;
  animation: nr-slide-up 800ms ease 500ms forwards;
}

.nr-hero__actions {
  display: flex;
  gap: var(--nr-space-md);
  opacity: 0;
  animation: nr-slide-up 800ms ease 700ms forwards;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

// Hero navigation
.nr-hero__arrows {
  position: absolute;
  bottom: var(--nr-space-xl);
  right: 8%;
  z-index: 4;
  display: flex;
  gap: var(--nr-space-sm);

  [dir="rtl"] & {
    right: auto;
    left: 8%;
  }

  @media (max-width: 768px) {
    bottom: var(--nr-space-lg);
    right: var(--nr-space-md);

    [dir="rtl"] & {
      right: auto;
      left: var(--nr-space-md);
    }
  }
}

.nr-hero__arrow {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: var(--nr-dark-text);
  transition: background-color var(--nr-transition), border-color var(--nr-transition);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.7);
  }

  svg {
    width: 18px;
    height: 18px;
  }
}

.nr-hero__dots {
  position: absolute;
  bottom: var(--nr-space-xl);
  left: 8%;
  z-index: 4;
  display: flex;
  gap: var(--nr-space-sm);

  [dir="rtl"] & {
    left: auto;
    right: 8%;
  }

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    bottom: var(--nr-space-md);

    [dir="rtl"] & {
      left: 50%;
      right: auto;
    }
  }
}

.nr-hero__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color var(--nr-transition);

  &.is-active {
    background: var(--nr-dark-text);
  }
}
```

- [ ] **Step 2: Uncomment hero import in `app.scss`**

In `app.scss`, change:
```scss
// @import './03-sections/hero';
```
To:
```scss
@import './03-sections/hero';
```

- [ ] **Step 3: Commit**

```bash
git add src/assets/styles/03-sections/_hero.scss src/assets/styles/app.scss
git commit -m "feat(noor): add hero slideshow section styles

Full-bleed with Ken Burns, gradient overlay (RTL-aware), slide-up text
animation, arrow + dot navigation, responsive."
```

---

### Task 18: Remaining section styles (collections, products, editorial, social-proof, newsletter, footer)

**Files:**
- Create: `src/assets/styles/03-sections/_collections.scss`
- Create: `src/assets/styles/03-sections/_products.scss`
- Create: `src/assets/styles/03-sections/_editorial.scss`
- Create: `src/assets/styles/03-sections/_social-proof.scss`
- Create: `src/assets/styles/03-sections/_newsletter.scss`
- Create: `src/assets/styles/03-sections/_footer.scss`
- Modify: `src/assets/styles/app.scss` (uncomment all section imports)

- [ ] **Step 1: Create `_collections.scss`**

Write to `src/assets/styles/03-sections/_collections.scss`:

```scss
// Split collection banner — 50/50 layout
.nr-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

.nr-split__media {
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--nr-transition-slow);
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.nr-split__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--nr-space-2xl);

  @media (max-width: 768px) {
    padding: var(--nr-space-xl) var(--nr-space-md);
  }
}

.nr-split__title {
  font-family: var(--nr-font-display);
  font-size: var(--nr-h2);
  font-weight: 500;
  margin-bottom: var(--nr-space-md);
}

.nr-split__desc {
  color: var(--nr-text-light);
  line-height: 1.7;
  margin-bottom: var(--nr-space-lg);
  max-width: 440px;
}

// Tabbed collection
.nr-tabs {
  display: flex;
  gap: var(--nr-space-lg);
  border-bottom: 1px solid var(--nr-border);
  margin-bottom: var(--nr-space-xl);

  @media (max-width: 768px) {
    gap: var(--nr-space-md);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.nr-tabs__tab {
  font-family: var(--nr-font-body);
  font-size: var(--nr-small);
  font-weight: 400;
  color: var(--nr-text-light);
  padding: var(--nr-space-sm) 0;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  transition: color var(--nr-transition), border-color var(--nr-transition);

  &:hover,
  &.is-active {
    color: var(--nr-primary);
    border-bottom-color: var(--nr-primary);
  }
}

.nr-tabs__panel {
  display: none;
  opacity: 0;
  transition: opacity 300ms ease;

  &.is-active {
    display: block;
    opacity: 1;
  }
}
```

- [ ] **Step 2: Create `_products.scss`**

Write to `src/assets/styles/03-sections/_products.scss`:

```scss
// Product grid
.nr-product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}

// Trust / award icon strip
.nr-trust-strip {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--nr-space-xl);
  padding: var(--nr-space-xl) 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: var(--nr-space-lg);
  }
}

.nr-trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--nr-space-sm);
  text-align: center;

  svg, img {
    width: 32px;
    height: 32px;
    opacity: 0.7;
  }

  span {
    font-size: var(--nr-label);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--nr-text-light);
  }
}
```

- [ ] **Step 3: Create `_editorial.scss`**

Write to `src/assets/styles/03-sections/_editorial.scss`:

```scss
// Statement block
.nr-statement {
  background: var(--nr-bg-warm);
  text-align: center;
  padding: var(--nr-space-2xl) var(--nr-space-lg);
}

.nr-statement__text {
  font-family: var(--nr-font-display);
  font-size: var(--nr-h2);
  font-weight: 400;
  font-style: italic;
  line-height: 1.4;
  max-width: 800px;
  margin: 0 auto;
  color: var(--nr-text);
}

// CTA Banner
.nr-cta {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 320px;
  }
}

.nr-cta__bg {
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
  }
}

.nr-cta__content {
  position: relative;
  z-index: 2;
  padding: var(--nr-space-2xl);
  max-width: 550px;

  @media (max-width: 768px) {
    padding: var(--nr-space-xl) var(--nr-space-md);
  }
}

.nr-cta__title {
  font-family: var(--nr-font-display);
  font-size: var(--nr-h2);
  color: var(--nr-dark-text);
  line-height: 1.15;
  margin-bottom: var(--nr-space-md);
}

.nr-cta__desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: var(--nr-space-lg);
}

// Countdown
.nr-countdown {
  display: flex;
  align-items: center;
  gap: var(--nr-space-sm);
  font-variant-numeric: tabular-nums;
}

.nr-countdown__unit {
  text-align: center;
}

.nr-countdown__num {
  font-family: var(--nr-font-body);
  font-size: 1.5rem;
  font-weight: 500;
}

.nr-countdown__label {
  font-size: var(--nr-label);
  color: var(--nr-text-light);
  text-transform: uppercase;
}

.nr-countdown__sep {
  font-size: 1.25rem;
  opacity: 0.5;
}
```

- [ ] **Step 4: Create `_social-proof.scss`**

Write to `src/assets/styles/03-sections/_social-proof.scss`:

```scss
// Testimonials section
.nr-testimonials {
  background: var(--nr-bg-warm);
}

.nr-testimonial-card {
  padding: var(--nr-space-lg);
}

.nr-testimonial-card__stars {
  display: flex;
  gap: 2px;
  margin-bottom: var(--nr-space-md);
  color: var(--nr-primary);
  font-size: 1rem;
}

.nr-testimonial-card__text {
  font-family: var(--nr-font-display);
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--nr-text);
  margin-bottom: var(--nr-space-lg);
}

.nr-testimonial-card__author {
  font-family: var(--nr-font-body);
  font-weight: 500;
  font-size: var(--nr-small);
}

.nr-testimonial-card__location {
  font-size: var(--nr-label);
  color: var(--nr-text-light);
  margin-top: var(--nr-space-xs);
}

// Image promos (3-up grid)
.nr-promos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

.nr-promo {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  display: block;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--nr-transition-slow);
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.nr-promo__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--nr-space-lg);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent 50%);
}

.nr-promo__title {
  font-family: var(--nr-font-display);
  font-size: var(--nr-h3);
  color: var(--nr-dark-text);
}

.nr-promo__link {
  font-size: var(--nr-small);
  color: rgba(255, 255, 255, 0.8);
  margin-top: var(--nr-space-xs);
}

// Instagram grid
.nr-instagram {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.nr-instagram__item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  display: block;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--nr-transition-slow);
  }

  &:hover img {
    transform: scale(1.08);
  }
}

.nr-instagram__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity var(--nr-transition);

  svg {
    width: 24px;
    height: 24px;
    color: var(--nr-dark-text);
  }
}

.nr-instagram__item:hover .nr-instagram__overlay {
  opacity: 1;
}
```

- [ ] **Step 5: Create `_newsletter.scss`**

Write to `src/assets/styles/03-sections/_newsletter.scss`:

```scss
.nr-newsletter {
  text-align: center;
  padding: var(--nr-space-2xl) var(--nr-space-lg);
}

.nr-newsletter__title {
  font-family: var(--nr-font-display);
  font-size: var(--nr-h2);
  font-weight: 500;
  margin-bottom: var(--nr-space-sm);
}

.nr-newsletter__desc {
  color: var(--nr-text-light);
  margin-bottom: var(--nr-space-lg);
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
}

.nr-newsletter__form {
  max-width: 460px;
  margin: 0 auto;
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--nr-space-sm);
  }
}

.nr-newsletter__input {
  flex: 1;
  padding: 0.875rem 1rem;
  font-family: var(--nr-font-body);
  font-size: var(--nr-body);
  color: var(--nr-text);
  border: 1px solid var(--nr-border);
  border-right: none;
  border-radius: var(--nr-radius);

  &:focus {
    outline: none;
    border-color: var(--nr-primary);
  }

  [dir="rtl"] & {
    border-right: 1px solid var(--nr-border);
    border-left: none;
  }

  @media (max-width: 768px) {
    border-right: 1px solid var(--nr-border);

    [dir="rtl"] & {
      border-left: 1px solid var(--nr-border);
    }
  }
}

.nr-newsletter__btn {
  @extend .nr-btn-solid;
  white-space: nowrap;

  @media (max-width: 768px) {
    width: 100%;
  }
}
```

- [ ] **Step 6: Create `_footer.scss`**

Write to `src/assets/styles/03-sections/_footer.scss`:

```scss
.nr-footer {
  background: var(--nr-bg-footer);
  padding: var(--nr-space-2xl) 0 var(--nr-space-lg);
}

.nr-footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--nr-space-xl);
  margin-bottom: var(--nr-space-2xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--nr-space-lg);
  }
}

.nr-footer__brand {
  font-family: var(--nr-font-display);
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: var(--nr-space-md);
}

.nr-footer__about {
  color: var(--nr-text-light);
  font-size: var(--nr-small);
  line-height: 1.7;
  max-width: 320px;
}

.nr-footer__heading {
  font-family: var(--nr-font-body);
  font-size: var(--nr-small);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: var(--nr-space-md);
}

.nr-footer__links {
  display: flex;
  flex-direction: column;
  gap: var(--nr-space-sm);

  a {
    font-size: var(--nr-small);
    color: var(--nr-text-light);
    transition: color var(--nr-transition);

    &:hover {
      color: var(--nr-primary);
    }
  }
}

.nr-footer__bottom {
  border-top: 1px solid var(--nr-border);
  padding-top: var(--nr-space-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--nr-space-md);
    text-align: center;
  }
}

.nr-footer__copy {
  font-size: var(--nr-small);
  color: var(--nr-text-light);
}

.nr-footer__payments {
  display: flex;
  gap: var(--nr-space-sm);
  align-items: center;

  img, svg {
    height: 24px;
    width: auto;
    opacity: 0.6;
  }
}
```

- [ ] **Step 7: Uncomment all section imports in `app.scss`**

In `app.scss`, uncomment all remaining section lines:

```scss
@import './03-sections/collections';
@import './03-sections/products';
@import './03-sections/editorial';
@import './03-sections/social-proof';
@import './03-sections/newsletter';
@import './03-sections/footer';
```

- [ ] **Step 8: Build and verify**

```bash
cd /Users/masud/Sites/personal/salla-jewelias && pnpm run development
```

Expected: Build succeeds with no errors.

- [ ] **Step 9: Commit**

```bash
git add src/assets/styles/03-sections/ src/assets/styles/app.scss
git commit -m "feat(noor): add all remaining section styles

Collections (split, tabs), products (grid, trust strip), editorial
(statement, CTA, countdown), social proof (testimonials, promos,
instagram), newsletter, footer. All imports active in app.scss."
```

---

### Task 19: Create JS section modules

**Files:**
- Create: `src/assets/js/modules/hero-slideshow.js`
- Create: `src/assets/js/modules/marquee.js`
- Create: `src/assets/js/modules/tabs.js`
- Create: `src/assets/js/modules/carousel.js`

- [ ] **Step 1: Create `hero-slideshow.js`**

Write to `src/assets/js/modules/hero-slideshow.js`:

```js
export function initHeroSlideshow() {
  const hero = document.querySelector('[data-nr-hero]');
  if (!hero) return;

  const slides = hero.querySelectorAll('[data-nr-slide]');
  const dots = hero.querySelectorAll('[data-nr-dot]');
  const prevBtn = hero.querySelector('[data-nr-prev]');
  const nextBtn = hero.querySelector('[data-nr-next]');
  const autoplaySpeed = parseInt(hero.dataset.nrAutoplay, 10) || 5000;

  if (slides.length < 2) return;

  let current = 0;
  let autoplayId = null;

  function goTo(index) {
    slides[current].classList.remove('is-active');
    if (dots[current]) dots[current].classList.remove('is-active');

    current = ((index % slides.length) + slides.length) % slides.length;

    slides[current].classList.add('is-active');
    if (dots[current]) dots[current].classList.add('is-active');
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(() => goTo(current + 1), autoplaySpeed);
  }

  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
  });

  hero.addEventListener('mouseenter', stopAutoplay);
  hero.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}
```

- [ ] **Step 2: Create `marquee.js`**

Write to `src/assets/js/modules/marquee.js`:

```js
export function initMarquees() {
  document.querySelectorAll('[data-nr-marquee]').forEach((marquee) => {
    const track = marquee.querySelector('.nr-marquee__track');
    if (!track) return;

    // Duplicate content for seamless loop
    if (!track.dataset.nrCloned) {
      track.innerHTML += track.innerHTML;
      track.dataset.nrCloned = 'true';
    }
  });
}
```

- [ ] **Step 3: Create `tabs.js`**

Write to `src/assets/js/modules/tabs.js`:

```js
export function initTabs() {
  document.querySelectorAll('[data-nr-tabs]').forEach((container) => {
    const tabs = container.querySelectorAll('[data-nr-tab]');
    const panels = container.querySelectorAll('[data-nr-panel]');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.nrTab;

        tabs.forEach((t) => t.classList.remove('is-active'));
        panels.forEach((p) => p.classList.remove('is-active'));

        tab.classList.add('is-active');
        const panel = container.querySelector(`[data-nr-panel="${target}"]`);
        if (panel) panel.classList.add('is-active');
      });
    });
  });
}
```

- [ ] **Step 4: Create `carousel.js`**

Write to `src/assets/js/modules/carousel.js`:

```js
export function initCarousels() {
  document.querySelectorAll('[data-nr-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.nr-carousel__track');
    const slides = carousel.querySelectorAll('.nr-carousel__slide');
    const prevBtn = carousel.querySelector('[data-nr-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-nr-carousel-next]');
    const dots = carousel.querySelectorAll('[data-nr-carousel-dot]');
    const autoplaySpeed = parseInt(carousel.dataset.nrCarousel, 10) || 5000;

    if (!track || slides.length === 0) return;

    let current = 0;
    let autoplayId = null;
    let slidesPerView = window.innerWidth >= 769 ? 3 : 1;

    function getMaxIndex() {
      return Math.max(0, slides.length - slidesPerView);
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, getMaxIndex()));
      const offset = -(current * (100 / slidesPerView));
      track.style.transform = `translateX(${offset}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
      });
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayId = setInterval(() => {
        goTo(current >= getMaxIndex() ? 0 : current + 1);
      }, autoplaySpeed);
    }

    function stopAutoplay() {
      if (autoplayId) clearInterval(autoplayId);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    window.addEventListener('resize', () => {
      slidesPerView = window.innerWidth >= 769 ? 3 : 1;
      goTo(current);
    });

    startAutoplay();
  });
}
```

- [ ] **Step 5: Update `home.js` to import all modules**

Replace `src/assets/js/home.js` with:

```js
import BasePage from "./base-page";
import { initHeroSlideshow } from "./modules/hero-slideshow";
import { initMarquees } from "./modules/marquee";
import { initTabs } from "./modules/tabs";
import { initCarousels } from "./modules/carousel";

class Home extends BasePage {
  onReady() {
    initHeroSlideshow();
    initMarquees();
    initTabs();
    initCarousels();
  }
}

Home.initiateWhenReady(['index']);
```

- [ ] **Step 6: Build and verify**

```bash
cd /Users/masud/Sites/personal/salla-jewelias && pnpm run development
```

Expected: Build succeeds. JS bundles include all modules.

- [ ] **Step 7: Commit**

```bash
git add src/assets/js/
git commit -m "feat(noor): add JS section modules — hero, marquee, tabs, carousel

Vanilla ES modules for hero slideshow (Ken Burns, arrows, dots, autoplay),
marquee (seamless clone), tabs (fade switch), carousel (translateX, autoplay).
All imported in home.js."
```

---

### Task 20: Build `preview/noor-home.html`

**Files:**
- Create: `preview/noor-home.html`

- [ ] **Step 1: Build CSS**

```bash
cd /Users/masud/Sites/personal/salla-jewelias && pnpm run development
```

- [ ] **Step 2: Create `preview/noor-home.html`**

Write to `preview/noor-home.html` — a complete homepage preview that renders all 15 sections with placeholder images (Unsplash or solid color blocks), demo text, and all `nr-*` classes. The page should:

1. Link to `../public/app.css` (production CSS)
2. Link to Google Fonts (Cormorant + Jost)
3. Include inline `<script>` at bottom loading the same module logic (or simplified versions) for:
   - Hero slideshow (Ken Burns, autoplay, arrows, dots)
   - Marquee (clone for seamless loop)
   - Tabs (panel switching)
   - Carousel (testimonials)
   - Scroll reveal (IntersectionObserver)
   - Lenis (via CDN for preview: `https://cdn.jsdelivr.net/npm/lenis@latest`)
4. Use `data-nr-*` attributes for JS hooks

The HTML structure for each section should use the exact same classes and markup pattern that will later be ported to Twig. Use Unsplash placeholder images (e.g., `https://images.unsplash.com/photo-...?w=1200&q=80`).

This is a large file. Include all 15 sections in order:
1. Announcement bar
2. Header (sticky)
3. Hero slideshow (3 slides with Ken Burns)
4. Marquee ticker
5. Split collection banner
6. Editorial statement
7. Featured products grid (4 cards)
8. CTA banner with countdown
9. Tabbed collection (3 tabs)
10. Trust/award strip
11. Testimonials carousel (5 cards, 3 visible desktop)
12. Image promos (3-up)
13. Instagram grid (6 images)
14. Newsletter
15. Footer

- [ ] **Step 3: Open in browser and verify**

```bash
open preview/noor-home.html
```

Verify:
- All 15 sections render in correct order
- Typography shows Cormorant headings, Jost body
- Color palette matches (forest green buttons, warm cream backgrounds)
- Hero Ken Burns animation works with slide transitions
- Marquee scrolls seamlessly
- Tabs switch panels
- Testimonial carousel auto-advances
- Scroll reveal animates elements on scroll
- Lenis smooth scroll is active
- Responsive: test at 768px and 480px breakpoints

- [ ] **Step 4: Commit**

```bash
git add preview/noor-home.html
git commit -m "feat(noor): add full homepage preview with all 15 sections

Visual sign-off page: announcement, header, hero slideshow, marquee,
split collection, editorial, products, CTA, tabs, trust, testimonials,
promos, Instagram, newsletter, footer. All animations active."
```

---

## Phase 3: Salla Twig Port

> Phase 3 ports each approved HTML section to Salla Twig templates with `twilight.json` schema entries. Each task creates one Twig file and its corresponding schema entry. Phase 3 tasks are outlined but code is not fully specified here — the HTML preview from Phase 2 serves as the exact visual spec, and the Twig port adapts the static HTML to use Salla template variables, web components, and schema-driven settings.

### Task 21: Port hero slideshow to Twig

- [ ] Create `src/views/components/home/hero-slideshow.twig`
- [ ] Add `home.hero-slideshow` component entry in `twilight.json` with fields: slides (image, title, subtitle, button_text, button_link), autoplay, speed
- [ ] Test with `salla theme preview`
- [ ] Commit

### Task 22: Port announcement bar to Twig (header component)

- [ ] Update `src/views/components/header/header.twig` with Noor announcement + header markup
- [ ] Add `twilight.json` settings for announcement bar (text, bg color, show/hide)
- [ ] Test sticky behavior and announcement close
- [ ] Commit

### Task 23: Port marquee ticker to Twig

- [ ] Create `src/views/components/home/marquee-ticker.twig`
- [ ] Add `home.marquee-ticker` component in `twilight.json` with fields: items (text), speed
- [ ] Commit

### Task 24: Port remaining sections to Twig (one task per section)

For each section, repeat the pattern:
1. Create `src/views/components/home/<section-name>.twig`
2. Add `twilight.json` component entry with merchant-configurable fields
3. Verify no `|raw` on merchant text fields
4. Test with `salla theme preview`
5. Commit

Sections to port:
- `split-collection`
- `editorial-statement`
- `featured-products`
- `cta-banner`
- `tabbed-collection`
- `trust-strip`
- `testimonials`
- `image-promos`
- `instagram-feed`
- `newsletter`

### Task 25: Restyle footer

- [ ] Update `src/views/components/footer/footer.twig` with Noor footer markup
- [ ] Apply `nr-footer` classes
- [ ] Commit

### Task 26: Final verification and docs update

- [ ] Run `pnpm run production` — verify clean build
- [ ] Verify all `twilight.json` `home.*` paths have matching Twig files
- [ ] Run `python3 -m json.tool twilight.json` — valid JSON
- [ ] RTL spot-check on key sections
- [ ] Update `docs/current-status.md` and `docs/handoff.md`
- [ ] Commit

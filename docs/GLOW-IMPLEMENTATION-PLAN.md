# Glow Theme — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a marketplace-ready Salla theme for Health & Beauty with 12-15 homepage sections, dark/light mode, parallax, pro-level schema (30-40 editable fields per section), and full RTL support.

**Architecture:** Fresh theme folder (`~/sites/personal/theme-glow`), cloned from theme-raed for Salla engine compatibility, stripped to bare bones, rebuilt with custom design system. Each phase produces a working, testable theme. Local HTML preview for each section before Salla conversion.

**Tech Stack:** Salla CLI, Twig, TailwindCSS, SCSS, Webpack, Lenis (smooth scroll), IntersectionObserver (scroll reveals), Salla Web Components, pnpm

**Design System:** See `docs/GLOW-DESIGN-SYSTEM.md` for all tokens, patterns, and specs.

---

## Phase Overview

| Phase | Scope | Deliverable |
|-------|-------|-------------|
| **Phase 1** | Foundation | Fresh repo, design tokens, base layout, dark/light mode, fonts, CSS reset |
| **Phase 2** | Header + Footer | Announcement bar, sticky header, nav, mobile menu, full footer |
| **Phase 3** | Homepage Sections (1-5) | Hero, Features Bar, Categories, Featured Products, Skincare Steps |
| **Phase 4** | Homepage Sections (6-10) | CTA Banner, Testimonials, Bundle Builder, Blog/Tips, Newsletter |
| **Phase 5** | Homepage Sections (11-13) | Brand Marquee, Instagram/Social Feed, Before/After Slider |
| **Phase 6** | Inner Pages | Product listing, Product detail, Cart, Blog, Customer pages |
| **Phase 7** | Polish & Marketplace | RTL audit, Lighthouse optimization, screenshots, demo store, submission |

---

## Phase 1: Foundation

### Task 1.1: Create fresh project

**Files:**
- Create: `~/sites/personal/theme-glow/` (full directory)

- [ ] **Step 1:** Clone theme-raed as base
```bash
cd ~/sites/personal
git clone https://github.com/SallaApp/theme-raed.git theme-glow
cd theme-glow
rm -rf .git
git init
```

- [ ] **Step 2:** Install dependencies
```bash
pnpm install
```

- [ ] **Step 3:** Update `package.json` name to `theme-glow`

- [ ] **Step 4:** Create GitHub repo and push
```bash
git add -A && git commit -m "feat: init glow theme from raed base"
gh repo create mranav2/theme-glow --private --source=. --push
```

---

### Task 1.2: Strip Raed components

**Files:**
- Modify: `twilight.json` — remove all Raed components, keep only engine config
- Modify: `src/assets/styles/app.scss` — remove all Raed custom styles
- Modify: `src/assets/js/home.js` — remove Raed-specific init code
- Delete: all files in `src/views/components/home/` except keep directory
- Keep: `src/views/components/header/`, `footer/`, `product/` (will rewrite later)

- [ ] **Step 1:** Clear `twilight.json` components array (keep features, global settings)
- [ ] **Step 2:** Remove all Raed homepage component twig files
- [ ] **Step 3:** Strip `app.scss` to only Tailwind imports and base reset
- [ ] **Step 4:** Strip `home.js` to empty class extending BasePage
- [ ] **Step 5:** Build to confirm no errors: `pnpm dev`
- [ ] **Step 6:** Commit: `feat: strip raed components to bare engine`

---

### Task 1.3: Design system foundation — CSS tokens

**Files:**
- Create: `src/assets/styles/00-tokens/_variables.scss`
- Create: `src/assets/styles/00-tokens/_dark-mode.scss`
- Create: `src/assets/styles/00-tokens/_animations.scss`
- Modify: `src/assets/styles/app.scss` — import token files
- Modify: `src/views/layouts/master.twig` — add Google Fonts, dark mode attribute
- Modify: `tailwind.config.js` — extend with Glow design tokens

- [ ] **Step 1:** Create `_variables.scss` with all CSS custom properties from design system (colors, spacing, radius, easing, typography)
- [ ] **Step 2:** Create `_dark-mode.scss` with `[data-theme="dark"]` overrides for all neutral tokens
- [ ] **Step 3:** Create `_animations.scss` with scroll reveal classes (`.rv`, `.rv-scale`, `.rv-d1`–`.rv-d6`), marquee keyframe, button fill/arrow transitions
- [ ] **Step 4:** Update `app.scss` imports: tokens → tailwind → base → components
- [ ] **Step 5:** Update `master.twig`:
  - Add Google Fonts link (Instrument Serif, Inter, Space Grotesk)
  - Add `data-theme` attribute from `theme.settings.get('dark_mode')`
  - Add `:root` CSS variables for Salla's primary color mapping
- [ ] **Step 6:** Update `tailwind.config.js`:
  - Font families (sans → Inter, serif → Instrument Serif, accent → Space Grotesk)
  - Color palette (all glow-* tokens)
  - Border radius scale
  - Add `darkMode: 'class'` with `[data-theme="dark"]` selector
- [ ] **Step 7:** Build and verify: `pnpm dev`
- [ ] **Step 8:** Commit: `feat: add glow design system tokens`

---

### Task 1.4: Base JS — smooth scroll + scroll reveal + parallax

**Files:**
- Modify: `src/assets/js/app.js` — Lenis init, scroll reveal observer, parallax handler, theme toggle
- Modify: `package.json` — add lenis dependency

- [ ] **Step 1:** Install Lenis: `pnpm add lenis`
- [ ] **Step 2:** Add to `app.js`:
  - Lenis smooth scroll init (duration 1.2, exponential easing)
  - IntersectionObserver for `.rv` / `.rv-scale` elements
  - Parallax handler for `[data-plx-speed]` elements
  - Theme toggle function (`setTheme(mode)`) that sets `data-theme` on `<html>`
  - NO magnetic button code
- [ ] **Step 3:** Build and test smooth scrolling works
- [ ] **Step 4:** Commit: `feat: add smooth scroll, reveal, parallax systems`

---

### Task 1.5: Global twilight.json settings

**Files:**
- Modify: `twilight.json` — add global theme settings for dark mode, colors, typography overrides

- [ ] **Step 1:** Add global settings fields:
  - `dark_mode` (boolean switch, default false)
  - `primary_color` (color picker, default #C4836A)
  - `announcement_text` (text, multilanguage)
  - `announcement_bg` (color, default #1A1A1A)
  - `logo_height` (number, default 36, min 24, max 80)
- [ ] **Step 2:** Validate JSON: `cat twilight.json | python3 -m json.tool`
- [ ] **Step 3:** Commit: `feat: add global theme settings schema`

---

## Phase 2: Header + Footer

### Task 2.1: Design header locally (HTML preview)

**Files:**
- Create: `preview/header.html` — local preview file

- [ ] **Step 1:** Build local HTML file with:
  - Announcement bar (marquee with dot separators)
  - Main header (logo center, nav left, icons right)
  - Mobile hamburger menu
  - Sticky behavior on scroll-up
  - Dark mode compatible
- [ ] **Step 2:** Verify visually in browser
- [ ] **Step 3:** Get user approval

---

### Task 2.2: Convert header to Salla Twig

**Files:**
- Modify: `src/views/components/header/header.twig`
- Add twilight.json component for announcement bar settings

- [ ] **Step 1:** Convert HTML to Twig with Salla web components (`<salla-menu>`, `<salla-cart-summary>`, `<salla-user-menu>`, `<salla-search>`)
- [ ] **Step 2:** Add header CSS to `app.scss`
- [ ] **Step 3:** Add header JS (sticky, mobile menu) to `app.js`
- [ ] **Step 4:** Build and test
- [ ] **Step 5:** Commit: `feat: add glow header with announcement bar`

---

### Task 2.3: Design + convert footer

**Files:**
- Modify: `src/views/components/footer/footer.twig`

- [ ] **Step 1:** Build footer with:
  - 4-column layout (brand/desc, menu, contacts, newsletter)
  - Social links (`<salla-social>`)
  - Payment icons (`<salla-payments>`)
  - Copyright (`{% hook copyright %}`)
  - Dark background (ink in light mode, elevated in dark mode)
- [ ] **Step 2:** Add footer CSS
- [ ] **Step 3:** Build and test
- [ ] **Step 4:** Commit: `feat: add glow footer`

---

## Phase 3: Homepage Sections 1-5

> **Pattern for each section:**
> 1. Design as local HTML → show user → get approval
> 2. Convert to Salla Twig with schema
> 3. Add CSS to app.scss
> 4. Add twilight.json component with 30-40 fields
> 5. Build → test → commit

### Task 3.1: Hero Section
- Full-viewport hero with parallax background image
- Tag line + display-xl heading with italic accent + description + 2 CTA buttons
- Floating trust badge (optional)
- Gradient orbs for visual depth
- Schema: background image, tag text, title (with `<em>` support), description, 2× button text/link/color, trust badge text, overlay opacity, min-height, text alignment
- Parallax speed control in schema

### Task 3.2: Features Bar
- Horizontal strip with 4-6 icon + text pairs
- Scrollable marquee option OR static grid
- Schema: collection of items (icon class, title, description), background color, layout mode (grid vs marquee), border top/bottom toggle

### Task 3.3: Categories Grid
- 4-column grid of category cards (image + overlay name + count)
- Hover: zoom + name shift + count reveal + arrow
- Schema: collection of categories (image, title, link, product count), columns (2/3/4), aspect ratio, overlay opacity, heading text

### Task 3.4: Featured Products
- Product grid using `<salla-products-slider>` or `<salla-products-list>`
- Tab filters (All / Category 1 / Category 2 / etc.)
- Schema: section title, tab labels, products source, columns, show price/badge/quick-add toggles, card style (standard vs minimal)

### Task 3.5: Skincare Steps / How-To
- Numbered step cards (STEP 1, STEP 2, etc.) with image + text + CTA
- Eurus Puff reference: vertical timeline layout
- Schema: collection of steps (number, title, description, image, CTA text/link), layout (horizontal vs vertical), show numbers toggle

---

## Phase 4: Homepage Sections 6-10

### Task 4.1: CTA Banner (Parallax)
- Full-width parallax image with overlay text
- Tag line + heading + subtext + CTA button
- Floating decorative circles
- Schema: background image, tag, title, description, button text/link, overlay color/opacity, parallax speed, min-height

### Task 4.2: Testimonials
- Slider/carousel of customer review cards
- Star rating + quote + customer name + avatar
- Schema: collection of testimonials (stars, quote, name, role, avatar image), autoplay toggle, speed, columns

### Task 4.3: Bundle Builder / Offer Section
- Tabbed product selection (Step 1: Prep, Step 2: Treat, Step 3: Lock)
- Product cards within each tab
- Savings callout
- Schema: collection of steps with title + product IDs, discount text, background, heading

### Task 4.4: Blog / Tips Section
- 3-column blog card grid with image + category tag + title + excerpt
- Schema: heading, subtext, number of posts, category filter, layout (grid vs slider), show date/author toggles

### Task 4.5: Newsletter Section
- Split layout: text left + form right (or full-width centered)
- Uses `<salla-newsletter>` component
- Background: pearl or custom color
- Schema: heading, description, background color/image, layout (split vs centered), button text

---

## Phase 5: Homepage Sections 11-13

### Task 5.1: Brand Marquee
- Horizontal auto-scrolling brand logo strip
- Schema: collection of brand logos (image), speed, background color, padding, grayscale toggle

### Task 5.2: Instagram / Social Feed
- Grid of images with hover overlay (icon + caption)
- Schema: collection of images (image, link, caption), columns, gap, heading, Instagram handle

### Task 5.3: Before/After Slider
- Interactive comparison slider (drag to reveal)
- Schema: before image, after image, heading, description, default slider position, labels

---

## Phase 6: Inner Pages

### Task 6.1: Product listing page
- Modify: `src/views/pages/product/index.twig`
- Grid with `<salla-filters>` sidebar, sort dropdown, product cards
- Responsive: 4→3→2→1 columns

### Task 6.2: Product detail page
- Modify: `src/views/pages/product/single.twig`
- Image gallery + product info + add to cart + tabs (description, reviews)
- Salla web components for options, quantity, add-to-cart

### Task 6.3: Cart page
- Modify: `src/views/pages/cart.twig`
- Clean cart layout with product rows + summary sidebar

### Task 6.4: Blog pages
- Modify: `src/views/pages/blog/index.twig` and `single.twig`
- Blog grid + single post with rich typography

### Task 6.5: Customer pages
- Modify: profile, orders, wishlist, notifications
- Clean dashboard layout with Salla web components

---

## Phase 7: Polish & Marketplace Prep

### Task 7.1: RTL Audit
- Test every section in Arabic (dir="rtl")
- Fix all directional CSS (margins, paddings, transforms, icons)
- Verify marquee direction, parallax, dropdowns

### Task 7.2: Lighthouse Optimization
- Run Lighthouse on desktop + mobile
- Target: Performance ≥ 70, Accessibility ≥ 90
- Optimize: image lazy loading, font subsetting, CSS purging, JS defer
- Minimize DOM depth, remove unused styles

### Task 7.3: Dark Mode Testing
- Verify every page/section in dark mode
- Check contrast ratios meet WCAG AA
- Test toggle persistence

### Task 7.4: Localization
- All user-facing strings through `trans()` function
- Complete `en.json` and `ar.json` locale files
- No hardcoded text in templates

### Task 7.5: Screenshots & Submission
- Capture 3+ screenshots at 1366×768
- Setup demo store
- Write changelog
- Package theme (< 1MB)
- Submit to Salla marketplace

---

## Execution Strategy

### For each section, the workflow is:

```
1. LOCAL PREVIEW
   └─ Build section as standalone HTML/CSS
   └─ Include all animations, dark mode, responsive
   └─ Show user for approval

2. SALLA CONVERSION
   └─ Convert HTML → Twig with Salla variables/components
   └─ Add CSS to app.scss under section comment block
   └─ Add JS if needed (scroll triggers, interactions)

3. SCHEMA
   └─ Add twilight.json component with UUID key
   └─ 30-40 editable fields per section
   └─ Include: text, images, colors, toggles, spacing, layout options
   └─ All labels in plain Arabic
   └─ Default demo content/images for every field

4. TEST
   └─ pnpm dev → verify build
   └─ salla theme preview → verify in editor
   └─ Test add/remove/reorder in Salla editor
   └─ Verify dark mode + RTL

5. COMMIT
   └─ Descriptive commit: "feat: add hero section with parallax + schema"
```

### Review Checkpoints
- **After Phase 1:** Foundation review — build works, tokens correct, smooth scroll functional
- **After Phase 3:** First 5 sections — user reviews full homepage flow
- **After Phase 5:** All sections complete — full homepage review
- **After Phase 6:** Inner pages — complete store review
- **After Phase 7:** Final — marketplace readiness check

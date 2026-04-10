# Noor Theme — Design Specification

> **Theme:** Noor
> **Platform:** Salla (Marketplace-ready)
> **Design reference:** [Eurus Whiff](https://eurus-whiff.myshopify.com/)
> **CSS prefix:** `nr-*`
> **Status:** Approved — ready for implementation planning

---

## 1. Theme Identity

- **Name:** Noor ("light" in Arabic)
- **Positioning:** Luxury / editorial lifestyle (jewelry, beauty, fashion)
- **Visual DNA:** Sharp edges (0 border-radius), serif + geometric sans pairing, warm neutrals + forest green accent, generous whitespace, slow deliberate transitions

---

## 2. Cleanup Scope (from existing Jewelias)

**Remove:**
- All `jw-*` CSS blocks from `app.scss`
- All 9 custom home Twig sections in `src/views/components/home/`
- All `home.*` component entries from `twilight.json`
- `preview/` contents (old Glow/Puff mocks)
- `--glow-*` CSS variables
- `docs/GLOW-DESIGN-SYSTEM.md`, `docs/GLOW-IMPLEMENTATION-PLAN.md`

**Keep intact:**
- `src/views/layouts/master.twig`, `src/views/pages/*` (Salla contract)
- `src/views/components/header/`, `footer/` (restyle, don't delete)
- Webpack, Tailwind, PostCSS config (update tokens)
- `package.json`, `pnpm-lock.yaml`, locales
- Doc system (`AGENTS.md`, `docs/plan.md`, `docs/decisions.md`, etc.) — update content
- `src/assets/js/app.js`, `home.js` (gut and rebuild internals)

---

## 3. Design Tokens

### Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display/Headings | Cormorant | 400, 500, 600, italic | Hero headlines, section titles, product names |
| Body/UI | Jost | 300, 400, 500, 700 | Body, nav, buttons, labels, prices |

### Type Scale

| Token | Desktop | Mobile | Font |
|-------|---------|--------|------|
| `--nr-h1` | 3.825rem | 1.9125rem | Cormorant 500 |
| `--nr-h2` | 2.55rem | 1.525rem | Cormorant 500 |
| `--nr-h3` | 1.7rem | 1.275rem | Cormorant 500 |
| `--nr-h4` | 1.35rem | 1.125rem | Cormorant 500 |
| `--nr-body` | 1rem | 1rem | Jost 400 |
| `--nr-small` | 0.875rem | 0.875rem | Jost 400 |
| `--nr-label` | 0.75rem | 0.75rem | Jost 500, uppercase |

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--nr-primary` | `#263D30` | Buttons, links, accents (forest green) |
| `--nr-primary-hover` | `#1a2d22` | Button hover state |
| `--nr-text` | `#1f1f1f` | Primary text (dark charcoal) |
| `--nr-text-light` | `#747474` | Secondary text, metadata |
| `--nr-bg` | `#ffffff` | Page background |
| `--nr-bg-warm` | `#f8f2ea` | Section alternate background (warm cream) |
| `--nr-bg-footer` | `#f1eee4` | Footer background (light tan) |
| `--nr-border` | `#e3e3e3` | Dividers, card borders |
| `--nr-sale` | `#702424` | Sale price (muted burgundy) |
| `--nr-dark-bg` | `#1f1f1f` | Announcement bar, dark sections |
| `--nr-dark-text` | `#ffffff` | Text on dark backgrounds |

### Spacing (8px base grid)

| Token | Value |
|-------|-------|
| `--nr-space-xs` | 0.25rem (4px) |
| `--nr-space-sm` | 0.5rem (8px) |
| `--nr-space-md` | 1rem (16px) |
| `--nr-space-lg` | 2rem (32px) |
| `--nr-space-xl` | 4rem (64px) |
| `--nr-space-2xl` | 6rem (96px) |

### Other Tokens

| Token | Value |
|-------|-------|
| `--nr-radius` | `0` |
| `--nr-transition` | `400ms ease` |
| `--nr-transition-slow` | `500ms ease` |
| `--nr-max-width` | `1600px` |
| `--nr-card-ratio` | `133%` |

---

## 4. Base Components

### Buttons

| Variant | Style |
|---------|-------|
| `.nr-btn-solid` | `--nr-primary` bg, white text, no radius, Jost 400. Hover: `--nr-primary-hover`, 400ms |
| `.nr-btn-outline` | Transparent bg, `--nr-primary` border + text. Hover: fills primary, text white |
| `.nr-btn-text` | No bg/border, `--nr-primary` text. Animated underline from left on hover (`::after`, cubic-bezier(0.25, 0.8, 0.25, 1)) |

### Product Card (`.nr-card`)

- Portrait image container (133% ratio), `position: absolute` image fill
- Image hover: `scale(1.1)` over 500ms
- Card padding: 5px mobile, 20px desktop
- Below image: title (Cormorant), price (Jost), variant swatches (28-38px circles)
- Optional sale badge, stock indicator
- Left-aligned text, no border/shadow

### Collection Card

- Full-bleed image with text overlay (bottom or centered)
- Title in Cormorant, optional subtitle in Jost
- Hover: subtle image zoom

### Form Inputs

- 1px solid `--nr-border`, no radius, padding `0.5rem 1rem`
- Focus: 2px solid `--nr-primary`
- Labels: Jost 500 uppercase 0.75rem

### Badges/Labels

- Sale: `--nr-sale` bg, white text, uppercase Jost
- New/featured: `--nr-primary` bg, white text
- Stock low: `rgba(165,8,8)` text. Stock in: `--nr-primary` text

### Marquee/Ticker

- Full-width seamless scroll, `animation: scrollX linear infinite`
- `--duration` variable for speed
- Jost uppercase with separator dots/pipes

---

## 5. Homepage Sections (top to bottom)

### 1. Announcement Bar
- Dark bg (`--nr-dark-bg`), full-width
- Left: social icon links. Right: language/currency selector
- Optional: marquee promo text, countdown timer
- Dismissible with close button (RTL-aware)

### 2. Sticky Header
- White bg, sticky on scroll with subtle shadow
- Layout: logo left, primary nav center, search/account/cart icons right
- Nav links: Jost 400, animated underline on hover
- Mobile: hamburger → slide-out drawer

### 3. Hero Slideshow
- Full-bleed images, Ken Burns animation (slow zoom + pan, 8s)
- Gradient overlay for text readability
- Content: Cormorant headline, Jost subtitle, 1-2 CTA buttons
- Navigation: arrows + dot pagination
- Auto-advance with pause on hover
- Schema: merchant controls slides (image, title, subtitle, button text/link)

### 4. Marquee Ticker
- Full-width scrolling text strip
- Uppercase Jost, separator icons between items
- Configurable speed and direction

### 5. Split Collection Banner
- Two-column (50/50) image + text/products
- Collection title (Cormorant), description (Jost)
- Thumbnail product switcher below

### 6. Editorial Statement Block
- Full-width warm bg (`--nr-bg-warm`)
- Large centered Cormorant quote/statement
- Text only, generous vertical padding

### 7. Featured Products Grid
- Section title (Cormorant h2) + "View all" link
- 4-column desktop, 2-column mobile
- Uses `.nr-card` component
- Optional tab filtering by collection

### 8. CTA Banner (Promotional)
- Full-bleed image background with overlay
- Centered text + button
- Countdown timer variant

### 9. Bundle Builder / Tabbed Collection
- Tab row (collection names) at top
- Product grid swaps on tab change
- Fade transition between tabs (300ms)

### 10. Trust/Award Icon Strip
- Horizontal row of icons with labels
- Light bg, centered, compact spacing

### 11. Testimonials Carousel
- Warm bg (`--nr-bg-warm`)
- 3 cards visible desktop, 1 mobile
- Star rating, reviewer name, review text
- Auto-play (5s) + arrow navigation

### 12. Image Promos (3-up)
- 3-column grid, full-image cards with overlay text
- Hover: subtle zoom
- Link to collection/page

### 13. Instagram Grid
- 6-column image grid (square crops)
- Hover: overlay with Instagram icon
- Optional: link to profile

### 14. Newsletter
- Centered layout, Cormorant heading, Jost body
- Email input + `.nr-btn-solid` submit
- Warm or white background

### 15. Footer
- `--nr-bg-footer` background
- Multi-column: about, quick links, customer service, contact
- Bottom bar: copyright, payment icons
- Link hover: animated underline

---

## 6. Animations & Interactions

### Scroll Reveal
- `.nr-reveal`: starts `opacity: 0; transform: translateY(20px)`
- IntersectionObserver adds `.nr-visible` → fade in + slide up, 400ms
- Stagger: `.nr-reveal-delay-1` through `-4` (100ms increments)

### Hero Ken Burns
- Active slide: `animation: nr-ken-burns 8s ease forwards`
- Alternates zoom-in / zoom-out + pan
- Slide transition: 500ms crossfade

### Image Hover Zoom
- `.nr-card` images: `transition: transform var(--nr-transition-slow)`
- Card hover: `transform: scale(1.1)`
- Container `overflow: hidden` clips

### Button Underline
- `.nr-btn-text::after`: `height: 1px`, `background: currentColor`
- Default: `width: 0; left: 0`
- Hover: `width: 100%`, `cubic-bezier(0.25, 0.8, 0.25, 1)`

### Marquee
- `@keyframes nr-scrollX { from { translateX(0) } to { translateX(-50%) } }`
- Duplicated content for seamless loop
- `animation: nr-scrollX var(--duration, 20s) linear infinite`
- Pauses on hover

### Tabs
- Active tab: bottom border `--nr-primary`
- Panel swap: opacity 0→1 over 300ms

### Carousel
- Auto-advance every 5s
- Arrow click: JS translateX with CSS transition
- Active dot fills with `--nr-primary`

### Smooth Scroll
- Lenis library for page-level smooth scrolling
- Installed via `pnpm add lenis` (~15KB gzipped)
- Initialized in `app.js`, RAF loop

---

## 7. SCSS Architecture

```
src/assets/styles/
├── app.scss                    # Main entry — imports everything
├── 00-tokens/
│   ├── _variables.scss         # All --nr-* CSS custom properties
│   ├── _typography.scss        # Font imports, type scale, heading styles
│   └── _reset.scss             # Minimal reset / normalize
├── 01-base/
│   ├── _body.scss              # html, body, smooth scroll, scrollbar
│   ├── _links.scss             # Base link styles
│   └── _images.scss            # Responsive images, lazy/skeleton
├── 02-components/
│   ├── _buttons.scss           # .nr-btn-solid, -outline, -text
│   ├── _cards.scss             # .nr-card (product), .nr-card-collection
│   ├── _forms.scss             # Inputs, labels, selects
│   ├── _badges.scss            # Sale, new, stock indicators
│   ├── _marquee.scss           # Scrolling ticker
│   └── _carousel.scss          # Testimonial/slideshow shared logic
├── 03-sections/
│   ├── _announcement.scss      # .nr-announcement
│   ├── _header.scss            # .nr-header
│   ├── _hero.scss              # .nr-hero
│   ├── _collections.scss       # Split banner, tabbed collections
│   ├── _products.scss          # Featured grid, bundle builder
│   ├── _editorial.scss         # Statement block, CTA banner
│   ├── _social-proof.scss      # Testimonials, trust strip, instagram
│   ├── _newsletter.scss        # .nr-newsletter
│   └── _footer.scss            # .nr-footer
├── 04-utilities/
│   ├── _animations.scss        # Keyframes: ken-burns, scrollX, reveal
│   └── _helpers.scss           # .nr-container, .nr-reveal, .nr-sr-only
```

- `00-tokens/_variables.scss` is the single source of truth
- Tailwind `theme.extend` mirrors these values
- Components (02) are section-agnostic — reusable anywhere
- Sections (03) compose components, never redefine them
- Preview HTML loads the same compiled CSS

---

## 8. JS Architecture

```
src/assets/js/
├── app.js                  # Entry: Lenis init, scroll reveal, global handlers
├── home.js                 # Entry: hero slideshow, marquee, tabs, carousel
├── modules/
│   ├── lenis.js            # Lenis smooth scroll setup + RAF loop
│   ├── scroll-reveal.js    # IntersectionObserver for .nr-reveal
│   ├── hero-slideshow.js   # Ken Burns slides, arrows, dots, autoplay
│   ├── marquee.js          # Infinite scroll ticker (pause on hover)
│   ├── tabs.js             # Tab switching with fade transition
│   └── carousel.js         # Testimonial carousel (snap/translate, autoplay, dots)
```

- `app.js` imports `lenis.js` + `scroll-reveal.js` — every page
- `home.js` imports section modules — homepage only
- Each module exports `init()`, self-contained DOM queries using `nr-*` / `data-nr-*`
- Vanilla JS, ES modules, Webpack bundled
- No jQuery, no Alpine

---

## 9. Tailwind Config

```js
theme: {
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
      }
    },
    fontFamily: {
      display: ['Cormorant', 'serif'],
      body: ['Jost', 'sans-serif'],
    },
    maxWidth: {
      page: '1600px',
    },
    borderRadius: {
      none: '0',
    },
    transitionDuration: {
      DEFAULT: '400ms',
      slow: '500ms',
    }
  }
}
```

Tailwind for layout utilities. `nr-*` component classes for styled blocks.

---

## 10. Build Flow

**Phase 1 — Design system + component preview**
Build `preview/noor-design-system.html` rendering all tokens, typography, buttons, cards, forms, badges. Visual sign-off page.

**Phase 2 — Section previews**
Build `preview/noor-home.html` with all 15 homepage sections. Full page layout, animations, responsiveness. Browser review before Salla work.

**Phase 3 — Salla port (section by section)**
Port each approved section to Twig + `twilight.json` schema. HTML preview becomes the visual spec. CSS is already production-ready from Phase 1-2.

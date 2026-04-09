# Glow — Design System Specification

> **Theme Name:** Glow
> **Industry:** Health & Beauty
> **Platform:** Salla (Marketplace-ready)
> **Design Reference:** [Eurus Puff](https://eurus-puff.myshopify.com/)
> **Status:** Approved — ready for implementation

---

## 1. Typography — 3-Font System

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **Display** | Instrument Serif | 400, 400i | Hero titles, section headings, product names in featured areas, decorative text |
| **Body** | Inter | 300, 400, 500, 600 | Body copy, product descriptions, form labels, navigation links, metadata |
| **Accent / UI** | Space Grotesk | 400, 500, 600 | Buttons, badges, tags, labels, uppercase tracking elements, navigation items, price display |

### Type Scale

| Token | Size | Font | Weight | Line Height | Letter Spacing | Use Case |
|-------|------|------|--------|-------------|----------------|----------|
| `display-xl` | clamp(3.2rem, 9vw, 7.5rem) | Display | 400 | 1.02 | -0.035em | Hero headline only |
| `display-lg` | 3rem | Display | 400 | 1.08 | -0.02em | Section headings |
| `display-md` | 1.8rem | Display | 400 | 1.2 | — | Card headings, sub-sections |
| `body` | 1rem | Body | 400 | 1.7 | — | Paragraphs, descriptions |
| `small` | 0.82rem | Body | 300 | 1.6 | — | Captions, meta text |
| `tag` | 0.6rem | Accent | 500 | — | 0.28em | Section tags, labels (uppercase) |
| `italic` | 2.2rem | Display | 400i | 1.3 | — | Decorative accents |
| `ui` | 0.7rem | Accent | 500 | — | 0.1em | Buttons, badges (uppercase) |

---

## 2. Color Palette

### Neutral Scale (adapts in dark mode)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--bg` | #FFFFFF | #0E0E0E | Page background |
| `--bg-alt` | #F5F3F0 | #161616 | Section alternate background |
| `--bg-card` | #FFFFFF | #1A1A1A | Card surfaces |
| `--bg-elevated` | #FFFFFF | #222222 | Dropdowns, modals, floating UI |
| `--ink` | #1A1A1A | #F0ECE8 | Primary text |
| `--charcoal` | #3D3D3D | #CCCCCC | Secondary text |
| `--stone` | #7A7A7A | #888888 | Tertiary / muted text |
| `--mist` | #B8B8B8 | #555555 | Disabled / placeholder |
| `--cloud` | #EBEBEB | #2A2A2A | Borders (light) |
| `--pearl` | #F5F3F0 | #1E1E1E | Subtle backgrounds |
| `--cream` | #F0E6D8 | #2A2218 | Warm highlight |
| `--blush` | #F2E0D6 | #2D221E | Rose-tinted highlight |

### Brand Colors (constant across modes)

| Token | Hex | Usage |
|-------|-----|-------|
| `--glow-rose` | #C4836A | Primary accent — CTAs, tags, price, active states |
| `--glow-rose-soft` | #D9A892 | Hover state, secondary accent |
| `--glow-sage` | #8FA68C | Secondary accent — badges, eco/organic markers |
| `--glow-danger` | #C04040 | Sale badges, errors, destructive actions |

### Shadow Scale

| Token | Light | Dark |
|-------|-------|------|
| `--shadow-sm` | 0 2px 8px rgba(0,0,0,0.04) | 0 2px 8px rgba(0,0,0,0.2) |
| `--shadow-md` | 0 8px 24px rgba(0,0,0,0.06) | 0 8px 24px rgba(0,0,0,0.3) |
| `--shadow-lg` | 0 20px 60px rgba(0,0,0,0.08) | 0 20px 60px rgba(0,0,0,0.4) |
| `--shadow-xl` | 0 32px 80px rgba(0,0,0,0.12) | 0 32px 80px rgba(0,0,0,0.5) |

---

## 3. Spacing Scale (8px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-1` | 4px | Tight gaps (badge padding, tag spacing) |
| `--sp-2` | 8px | Inner padding, icon gaps |
| `--sp-3` | 12px | Small element spacing |
| `--sp-4` | 16px | Card inner padding, form spacing |
| `--sp-5` | 24px | Grid gaps, section sub-spacing |
| `--sp-6` | 32px | Between card groups |
| `--sp-7` | 48px | Section sub-padding |
| `--sp-8` | 64px | Section heading to content |
| `--sp-9` | 80px | Between major sections |
| `--sp-10` | 100px | Large section padding |
| `--sp-11` | 120px | Hero / CTA section padding |

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--r-sm` | 6px | Small chips, tags |
| `--r-md` | 12px | Cards, product images, inputs |
| `--r-lg` | 20px | Product cards, image containers |
| `--r-xl` | 32px | Category cards, section backgrounds |
| `--r-pill` | 100px | Buttons, badges, search bar |
| `--r-full` | 50% | Avatars, icon circles |

---

## 5. Animation System

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | General transitions |
| `--ease-spring` | cubic-bezier(0.34, 1.56, 0.64, 1) | Bouncy micro-interactions (wishlist, badges) |
| `--ease-smooth` | cubic-bezier(0.22, 1, 0.36, 1) | Scroll reveals, page transitions |

### Smooth Scrolling
- **Library:** Lenis (1.2s duration, exponential easing)
- Applies to full page; opt-out via `[data-lenis-prevent]`

### Scroll Reveal Classes
- `.rv` — Fade up (translateY 50px → 0, opacity 0 → 1, 0.9s)
- `.rv-scale` — Scale in (scale 0.9 → 1, 0.9s)
- Stagger delays: `.rv-d1` through `.rv-d6` (0.1s increments)
- Triggered via `IntersectionObserver` at 10% threshold with -50px root margin

### Hover Interactions

| Animation | Target | Effect |
|-----------|--------|--------|
| Hover Lift | Cards, images | translateY(-10px) + shadow-lg |
| Scale Bounce | Icons, wishlist buttons | scale(1.15–1.3) with spring ease |
| Slide Replace | Button text | Text slides up, replacement slides in from below |
| Image Zoom | Product/category images | scale(1.06–1.08) over 0.7–0.8s |
| Underline Draw | Ghost buttons, links | scaleX(0→1) line, origin shifts right→left on hover |
| Fill Sweep | All buttons | Background scaleX(0→1) from left |
| Arrow Shift | CTA buttons | Arrow → moves 5px right on hover |

### Parallax
- Background images: `data-plx-speed="-0.06"` to `"-0.08"` (negative = slower than scroll)
- Decorative elements: `data-plx-speed="0.03"` to `"0.06"` (positive = faster)
- Hero gradient orbs: 3 layers at different speeds
- Implemented via scroll event listener with `{ passive: true }`

### Marquee
- Continuous horizontal scroll, 35s linear infinite
- Dark background bar with display font text + rose dot separators

---

## 6. Component Patterns

### Buttons (NO magnetic movement — fill only)

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | `--ink` | `--bg` | none | Fill sweep from charcoal, shadow-lg |
| Secondary | transparent | `--ink` | 1.5px `--ink` | Fill sweep from ink, text becomes white |
| Accent | `--glow-rose` | white | none | Fill sweep from rose-soft, shadow with rose tint |
| Ghost | transparent | `--ink` | none | Underline draws left-to-right |
| Small | Same as above but 12px/24px padding, 0.62rem font |

All buttons: `font-family: Accent`, `letter-spacing: 0.1em`, `text-transform: uppercase`, `border-radius: pill`

### Product Card
- 3:4 aspect ratio image with `--r-lg` radius
- Badge: top-left pill (ink bg for "New", danger bg for sale %)
- Hover: image zoom + action bar slides up from bottom
- Action bar: "Add to Cart" button (flex:1) + wishlist heart (42px square)
- Brand: accent font, 0.58rem, uppercase, mist color
- Name: body font, 0.95rem, 500 weight
- Price: accent font, 0.88rem, rose color
- Strikethrough price: mist color, line-through

### Category Card
- 4:5 aspect ratio, `--r-xl` radius
- Full-bleed image with gradient overlay (bottom 55% dark)
- Hover: image zoom + name slides up + count fades in + arrow rotates in (top-right)
- Name: display font, 1.5rem, white
- Count: accent font, 0.6rem, 50% white opacity

### Section Heading Pattern
- Tag line: accent font, rose color, 0.6rem uppercase + 32px rose line before
- Heading: display font, 2.8rem
- Optional ghost CTA button aligned right

### Badges
- Pill-shaped, accent font, 0.6rem uppercase
- Variants: dark (ink/bg), sale (danger/white), rose (blush/rose), sage (green-tint/green), outline (border/charcoal)
- Spring scale(1.06) on hover

### Dropdowns
- Trigger: pill-shaped with chevron rotation on open
- Menu: `--r-lg` radius, `--shadow-xl`, `backdrop-filter: blur(20px)`
- Items: `--r-md` hover highlight, selected state with rose bg + checkmark
- Open animation: opacity + translateY(-8px) + scale(0.97) → visible over 0.3s
- Close on outside click
- Multi-select: tag pills with spring animation, X to remove

### Form Inputs
- Pill-shaped, 1.5px border `--border-strong`
- Focus: border becomes rose + 4px rose glow ring
- Placeholder: mist color

---

## 7. Dark Mode

- Toggle mechanism: `data-theme="light|dark"` on `<html>`
- All tokens switch via CSS custom properties
- 0.5s smooth transition on `color`, `background`, `border-color`
- Salla integration: `theme.settings.get('dark_mode', 'false')` schema field
- User can toggle; also respects `prefers-color-scheme` media query

---

## 8. RTL Support

- `dir="{{ user.language.dir }}"` on `<html>`
- Tailwind `rtl:` variants for directional properties
- Arrow icons swap (keyboard_arrow_left ↔ right)
- Marquee direction reverses
- Section tag line flips (line on right side)
- All paddings/margins use logical properties where possible

---

## 9. Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance (desktop) | ≥ 70 |
| Lighthouse Performance (mobile) | ≥ 60 |
| Lighthouse Accessibility | ≥ 90 |
| Theme bundle size | < 1MB |
| Web font load | 3 fonts, subset Latin + Arabic |
| Animation approach | CSS transitions + IntersectionObserver (no heavy JS libs) |
| Image loading | lazy loading on all below-fold images |
| Smooth scroll | Lenis (~5KB gzipped) |

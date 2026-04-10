# Noor Theme — Eurus Parity Design Spec

> **Date:** 2026-04-11
> **Status:** Approved — awaiting implementation
> **Reference:** [Eurus Whiff](https://eurus-whiff.myshopify.com/)
> **Platform:** Salla Twilight

---

## 1. Summary

Rebuild the Noor theme to achieve 1:1 visual and functional parity with the Eurus Whiff Shopify theme. This covers ALL pages (homepage, product, collection, cart, customer, blog), full dark mode, and a new Noor-styled product card web component. Demo content (text, images) from Eurus baked into defaults.

---

## 2. Decisions (locked)

| Decision | Choice |
|----------|--------|
| Homepage sections | 14 Eurus sections in exact order |
| Extra sections | Stay in section picker, not on default homepage |
| Product card | New `noor-product-card` web component |
| Carousels | `salla-slider` (Splide) everywhere |
| Dark mode | Full light/dark via CSS variable switching |
| Logo | Dual: `logo_light` + `logo_dark` |
| Header | Transparent over hero, solid on scroll |
| Demo content | Eurus text, images, and content as defaults |

---

## 3. Dark Mode System

### CSS Variable Switching

All colors defined in `00-tokens/_variables.scss`. Dark mode activated by `[data-theme="dark"]` on `<html>`.

```
Token               Light                Dark
--nr-primary        #263D30              #ffe281
--nr-primary-hover  #1a2d22              #ffd84d
--nr-text           #1f1f1f              #f0f0f0
--nr-text-light     #747474              #a0a0a0
--nr-bg             #ffffff              #1a1a1a
--nr-bg-warm        #f8f2ea              #242424
--nr-bg-footer      #f1eee4              #1e1e1e
--nr-border         #e3e3e3              #3a3a3a
--nr-dark-bg        #1f1f1f              #0d0d0d
--nr-dark-text      #ffffff              #ffffff
--nr-sale           #702424              #ff6b6b
```

### Settings

- `color_mode`: dropdown — "light" (default), "dark", "auto" (follows OS preference)
- `master.twig` applies `data-theme` attribute based on setting
- "auto" uses `prefers-color-scheme` media query + JS toggle

### Logo

- `logo_light`: image — used on light backgrounds (solid header, light mode)
- `logo_dark`: image — used on dark backgrounds (transparent header over hero, dark mode)
- `logo_height`: number — already exists, shared

---

## 4. `noor-product-card` Web Component

### File: `src/assets/js/partials/noor-product-card.js`

### Tag: `<noor-product-card>`

### Attributes:
- `product` (required) — JSON string of product object
- `minimal` — hide footer (add-to-cart)
- `horizontal` — horizontal layout variant

### HTML Output:
```
.nr-card
  .nr-card__media               (portrait, 133% aspect ratio)
    a > img                     (hover: scale 1.1, 500ms)
    .nr-card__badge             (sale/new/preorder/quantity)
    .nr-card__wishlist          (heart icon, salla.wishlist.toggle)
    .nr-card__quick-add         (slides up on card hover)
      salla-add-product-button  (handles all product types)
  .nr-card__info
    a > h4.nr-card__title       (Cormorant, links to product)
    .nr-card__subtitle          (if exists, Jost, muted)
    .nr-card__price             (sale/starting/regular via salla.money)
    .nr-card__rating            (stars if available)
```

### Salla Integration:
- `salla.wishlist.toggle(id)` — wishlist
- `<salla-add-product-button>` — cart (all types: sale, booking, donating, preorder, out-of-stock)
- `salla.money(price)` — price formatting
- `salla.storage.get('salla::wishlist')` — check wishlist state
- `salla.lang.get()` — translations
- `salla.config.get('store.settings.product.fit_type')` — image fit
- Listens to `theme::ready` event

### Styles: `02-components/_cards.scss`
- Uses nr-* CSS variables — dark mode works automatically
- No Tailwind utilities in the component

---

## 5. Header

### Structure:
```
#nr-announcement    (announcement bar)
#nr-header          (navigation — position: fixed, top: 0)
```

### Announcement Bar:
- `salla-slider` (Splide) for slide rotation (replaces custom JS)
- `salla-count-down` for countdown timer (replaces custom JS)
- Social links, locale selector, close button (localStorage persistence)
- Always dark bg in both modes

### Navigation:
- **Transparent state** (`nr-header--transparent`):
  - `background: transparent`, white text/icons
  - Shows `logo_dark`
  - Active when hero is in viewport
- **Solid state** (`nr-header--solid`):
  - `background: var(--nr-bg)`, dark text/icons, subtle shadow
  - Shows `logo_light`
  - Activates when hero leaves viewport
- Transition: 300ms ease on background, color, box-shadow
- JS: IntersectionObserver on `[data-nr-hero]` element
- `header_transparent` (bool) setting — if false, always solid

### Mobile:
- Hamburger menu icon, slide-out drawer
- Colors follow transparent/solid state

### Settings (twilight.json):
- `logo_light`, `logo_dark`, `logo_height` — logo
- `header_transparent` (bool) — enable transparent mode
- `header_is_sticky` (bool) — already exists in Salla
- `announce_*` — existing announcement bar settings (keep)

---

## 6. Homepage Sections (Eurus Order)

All sections use `salla-slider` for carousels, `noor-product-card` for products, `nr-*` classes, and CSS variables for dark mode.

### 6.1 Hero Slideshow
**File:** `home/hero-slideshow.twig`
**Carousel:** `salla-slider` (replaces custom JS)
**Features:**
- Full-viewport height, Ken Burns on images (CSS animation)
- Gradient overlay (configurable color + opacity)
- Staggered text animations: subtitle (200ms) → title (450ms) → desc (650ms) → buttons (800ms)
- Slide counter ("01 / 03") bottom center
- Arrow navigation bottom right
- Auto-advance, pause on hover
**Data:** Collection field `slides` — image, title, subtitle, description, content_position, btn_text, btn_link, btn_color, btn2_text, btn2_link

### 6.2 Highlight Text + Image (Split Collection)
**File:** `home/split-collection.twig`
**Features:**
- 50/50 two-column: image + text
- `reverse` setting to swap sides
- Image hover zoom
- Text side: label, title (Cormorant h2), description, CTA button
- Optional product thumbnails below text
**Data:** image, label, title, description, btn_text, btn_link, reverse (bool)

### 6.3 Collection List
**File:** `home/collection-list.twig` (NEW)
**Features:**
- 4-col grid desktop, 2-col tablet, 1-col mobile
- Cards: full-bleed image, title overlay at bottom, hover zoom
- Two styles: overlay (text on image) or below (text under image)
**Data:** `show_cats` (bool) toggle — if true, uses `component.categories` from Salla; if false, uses custom `links` collection

### 6.4 Collage / Image Grid
**File:** `home/collage-grid.twig` (NEW)
**Features:**
- CSS grid masonry: first item spans 2 rows (featured), 4 smaller items
- Each: image, optional text overlay, link, hover zoom
- Responsive: 2-col on tablet, stack on mobile
**Data:** Collection field `items` — image, title, link

### 6.5 Products Bundle (Featured Products)
**File:** `home/featured-products.twig` (REWRITE)
**Features:**
- Section header: label + title + "View all" link
- `salla-slider` carousel of `noor-product-card` components
- Supports merchant-selected products (`component.products`) 
- Responsive: 4 visible desktop, 2 tablet, 1.15 mobile (Splide breakpoints)
**Data:** title, description, products (Salla product picker), display_all_url (Salla variable-list)

### 6.6 Scrolling Banner (Marquee)
**File:** `home/marquee-ticker.twig`
**Features:**
- Infinite scroll ticker, pause on hover
- Separator dots between items
- Configurable speed, font size, colors
**Data:** Collection field `items` — text per item. Plus speed, bg_color, text_color, separator_style

### 6.7 Collection List Banner
**File:** `home/collection-banner.twig` (NEW — variant of collection-list)
**Features:**
- Wider cards than collection-list (landscape aspect ratio)
- 3-col grid with larger images
- Banner-style: wide images with centered text overlay
**Data:** Same as collection-list but with landscape images

### 6.8 Rich Text (Editorial Statement)
**File:** `home/editorial-statement.twig`
**Features:**
- Full-width warm bg (`--nr-bg-warm`)
- Large centered Cormorant italic quote
- Optional decorative line/diamond divider above
- Generous vertical padding
**Data:** text, show_divider (bool), bg_style (dropdown: warm/transparent/dark)

### 6.9 Shop the Look
**File:** `home/shop-the-look.twig` (NEW)
**Features:**
- Large lifestyle image with positioned pin hotspots
- Click pin → mini product card popup (image, name, price, add-to-cart)
- Pins pulse subtly to draw attention
- Mobile: pins still work, popup docks to bottom
**Data:** image (main), collection field `pins` — x (number), y (number), product_image, product_name, product_price, product_url, product_id

### 6.10 Video with Products
**File:** `home/video-products.twig` (NEW)
**Features:**
- 2-col: video left, scrollable product list right
- YouTube embed (lite-youtube-embed) or MP4
- Products: `noor-product-card` in horizontal mode, or `salla-products-list`
- Layout swappable (video left/right)
**Data:** video_url, video_type (youtube/mp4), layout (left/right), products or source+limit

### 6.11 Multicolumn (Store Features)
**File:** `home/store-features.twig`
**Features:**
- 4-col grid of icon + heading + description
- Icons: Salla icon class or uploaded image
- Centered text, compact spacing
**Data:** Collection field `items` — icon, title, text. Plus columns (3/4), bg_style

### 6.12 Media Gallery
**File:** `home/media-gallery.twig` (NEW)
**Features:**
- Large hero image + thumbnail strip below
- Click thumbnail → swap main image (JS)
- Optional lightbox on main image click
- Smooth fade transition between images
**Data:** Collection field `images` — image, caption. Plus show_lightbox (bool)

### 6.13 Newsletter
**File:** `home/newsletter.twig`
**Features:**
- Centered layout, Cormorant heading, Jost body
- Use `<salla-newsletter>` web component for form
- Optional decorative divider
- Warm or white background
**Data:** title, description, bg_style, show_divider

### 6.14 Footer
**File:** `footer/footer.twig`
**Features:**
- Multi-column: logo + about, link columns (from Salla menu), newsletter
- Bottom bar: copyright, payment icons, social links
- Dark mode switches bg color via variables
- Uses `logo_light` in light mode, `logo_dark` in dark mode

---

## 7. Inner Pages

### 7.1 Product Page
**File:** `pages/product/index.twig`
- Image gallery (main + thumbnails) — left side
- Product info — right side: title (Cormorant), price, description, options (`salla-product-options`), add-to-cart (`salla-add-product-button`), size guide, share
- Reviews section (`salla-reviews`)
- Related products carousel (`salla-slider` + `noor-product-card`)
- Breadcrumb (`salla-breadcrumb`)

### 7.2 Collection/Category Page
**File:** `pages/product/index.twig` (products listing)
- Category header: image banner + title
- Filters sidebar (`salla-filters`)
- Product grid: `noor-product-card` in 3-4 col grid
- Infinite scroll or pagination (`salla-infinite-scroll`)

### 7.3 Cart Page
**File:** `pages/cart.twig`
- Cart items list with quantity controls (`salla-quantity-input`)
- Coupon input (`salla-cart-coupons`)
- Order summary sidebar
- Continue shopping + checkout buttons
- Empty cart state

### 7.4 Customer Pages
**Files:** `pages/customer/*.twig`
- Account dashboard, orders list, order detail, wishlist, settings
- Mostly Salla web components — style with Noor CSS overrides
- `salla-orders`, `salla-order-details`, `salla-user-settings`

### 7.5 Blog
**Files:** `pages/blog/*.twig`
- Post list: card grid (image + title + excerpt + date)
- Single post: full-width hero image, Cormorant title, Jost body, comments (`salla-comments`)

### 7.6 Other Pages
- Thank you page, 404, landing pages
- Minimal styling — Noor typography + colors applied

---

## 8. JS Architecture

```
src/assets/js/
  app.js                    ← Lenis, scroll reveal, header scroll observer, dark mode toggle
  home.js                   ← Homepage section initializers
  modules/
    header-scroll.js        ← IntersectionObserver for transparent→solid header
    dark-mode.js            ← Theme toggle (reads setting, applies data-theme, OS preference)
    shop-the-look.js        ← Pin click → popup toggle
    media-gallery.js        ← Thumbnail click → main image swap, lightbox
    marquee.js              ← Infinite scroll ticker (keep existing)
  partials/
    noor-product-card.js    ← New product card web component
    product-card.js         ← Keep existing (backwards compat for extras)
    main-menu.js            ← Keep existing
    ...                     ← Keep other existing partials
```

Removed custom JS (replaced by Splide):
- `hero-slideshow.js` — replaced by `salla-slider`
- `carousel.js` — replaced by `salla-slider`
- `tabs.js` — replaced by `salla-slider` (tab mode) or kept minimal

---

## 9. SCSS Architecture

No new files. Add to existing partials:

```
00-tokens/_variables.scss    ← Add dark mode block [data-theme="dark"]
02-components/_cards.scss    ← Rewrite for noor-product-card (nr-card__*)
03-sections/_header.scss     ← Add transparent/solid states
03-sections/_hero.scss       ← Already has stagger animations (from agent)
03-sections/_collections.scss ← Add collection-list, collection-banner
03-sections/_products.scss   ← Add shop-the-look styles
03-sections/_editorial.scss  ← Add video-products styles
03-sections/_social-proof.scss ← Add collage, media-gallery styles
03-sections/_newsletter.scss ← Polish, salla-newsletter overrides
03-sections/_footer.scss     ← Dark mode, dual logo
04-utilities/_helpers.scss   ← Already has nr-reveal, nr-section-label
```

New file (only if needed for inner pages):
```
03-sections/_pages.scss      ← Product page, cart, customer, blog styles
```

---

## 10. twilight.json Changes

### Global Settings to Add:
- `color_mode` (dropdown: light/dark/auto)
- `logo_light` (image)
- `logo_dark` (image)
- `header_transparent` (bool)

### New Components to Add:
- `home.collection-list` — collection grid
- `home.collage-grid` — masonry image grid
- `home.collection-banner` — wide collection cards
- `home.shop-the-look` — lifestyle + hotspots
- `home.video-products` — video + product list
- `home.media-gallery` — image gallery with thumbs

### Existing Components to Update:
- `home.hero-slideshow` — add description field, slide counter toggle
- `home.featured-products` — rewrite to use Salla product picker + display_all_url
- `home.split-collection` — add reverse setting
- `home.editorial-statement` — add bg_style, show_divider
- `home.marquee-ticker` — add speed, colors
- `home.store-features` — add columns, bg_style, collection items
- `home.newsletter` — add bg_style, show_divider

### Schema Pattern (all collections):
Every collection field must have: `required`, `minLength`, `maxLength`, `item_label`, `value` (defaults), prefixed sub-field IDs (`slides.image` not `image`).

### Product Picker Pattern (from reference theme):
```json
{
  "type": "items",
  "id": "products",
  "format": "dropdown-list",
  "selected": [],
  "options": [],
  "required": true,
  "multichoice": true,
  "source": "products",
  "searchable": true,
  "maxLength": 16,
  "minLength": 1
}
```

---

## 11. Implementation Phases

### Phase 1: Foundation
- Dark mode CSS variables
- `noor-product-card` web component + card SCSS
- Header upgrade (transparent/solid, dual logo, scroll observer)
- twilight.json global settings

### Phase 2: Homepage Sections
- Hero (Splide, text animations, Ken Burns)
- Split collection (polish, reverse)
- Collection list (new)
- Collage grid (new)
- Featured products (rewrite with noor-product-card + Splide)
- Marquee (polish)
- Collection banner (new)
- Editorial statement (polish)
- Shop the look (new)
- Video products (new)
- Store features (polish)
- Media gallery (new)
- Newsletter (polish, salla-newsletter)
- Footer (polish, dark mode)

### Phase 3: Inner Pages
- Product page
- Collection page
- Cart page
- Customer pages
- Blog pages
- Other pages (404, thank you)

### Phase 4: QA & Polish
- Dark mode full pass
- RTL pass
- Lighthouse audit
- CSS bundle optimization
- Demo content verification
- Build + marketplace checklist

---

## 12. Demo Content

All defaults should use high-quality jewelry/luxury placeholder content matching Eurus's aesthetic. Use public Unsplash URLs for images. All text in English defaults with Arabic translations.

---

## 13. Files Not Touched

These stay as-is:
- `webpack.config.js`
- `tailwind.config.js` (update tokens only)
- `postcss.config.js`
- `package.json` (no new dependencies)
- Locale files
- Salla contract files (`src/views/pages/*` structure)

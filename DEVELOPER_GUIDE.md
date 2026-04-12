# Noor Theme — Developer Guide

A comprehensive guide for developers continuing work on the Noor Salla theme. Covers architecture, conventions, how to add new sections, and common pitfalls.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Directory Structure](#directory-structure)
4. [Getting Started](#getting-started)
5. [How Salla Themes Work](#how-salla-themes-work)
6. [Design System & Tokens](#design-system--tokens)
7. [SCSS Architecture](#scss-architecture)
8. [JavaScript Architecture](#javascript-architecture)
9. [How to Convert an HTML Section to a Salla Component](#how-to-convert-an-html-section-to-a-salla-component)
10. [twilight.json Schema Reference](#twilightjson-schema-reference)
11. [Handling Dropdown Fields (Critical)](#handling-dropdown-fields-critical)
12. [Handling Collection Fields](#handling-collection-fields)
13. [Dark Mode](#dark-mode)
14. [RTL Support](#rtl-support)
15. [Salla Web Components](#salla-web-components)
16. [Common Pitfalls](#common-pitfalls)
17. [Build & Deploy](#build--deploy)
18. [Checklist for New Components](#checklist-for-new-components)

---

## Project Overview

Noor is a premium luxury/editorial Salla theme inspired by the Eurus Whiff Shopify theme. It uses:

- **Design language**: Forest green (#263D30), warm cream (#f8f2ea), gold accents (#DDB87E)
- **Fonts**: Cormorant (display/headings) + Jost (body)
- **CSS class prefix**: `nr-*` (e.g., `nr-hero__title`, `nr-card__media`)
- **Zero border-radius**: Sharp, luxury aesthetic
- **30 homepage components**, full dark mode, RTL support

---

## Tech Stack

| Layer       | Technology                                                |
|-------------|-----------------------------------------------------------|
| Templates   | Twig (Salla Twilight engine)                              |
| Styles      | SCSS → PostCSS → CSS (via webpack)                        |
| JavaScript  | ES6 modules → Babel → webpack bundles                     |
| Build       | webpack 5 + MiniCssExtractPlugin + CssMinimizerPlugin     |
| Platform    | Salla Twilight (template engine, web components, SDK)     |
| UI Library  | Salla Web Components (`salla-*`), custom `noor-product-card` |

---

## Directory Structure

```
salla-noor-theme/
├── twilight.json               # Theme config: settings, components, features
├── webpack.config.js           # Build config with entry points
├── package.json                # Dependencies and scripts
│
├── public/                     # Build output (committed, deployed)
│   ├── app.css                 # Main stylesheet
│   ├── app.js                  # Main JS bundle
│   ├── home.js                 # Homepage JS
│   └── images/                 # Static images
│
└── src/
    ├── assets/
    │   ├── js/
    │   │   ├── app.js          # Main entry: core init, menus, notifications
    │   │   ├── home.js         # Homepage: hero, marquee, tabs, carousels
    │   │   ├── app-helpers.js  # Base utilities (DOM helpers)
    │   │   ├── base-page.js    # Page class base (initiateWhenReady pattern)
    │   │   ├── modules/        # Feature modules (each exports an init fn)
    │   │   │   ├── hero-slideshow.js
    │   │   │   ├── marquee.js
    │   │   │   ├── tabs.js
    │   │   │   ├── carousel.js
    │   │   │   ├── scroll-reveal.js
    │   │   │   ├── dark-mode.js
    │   │   │   ├── header-scroll.js
    │   │   │   ├── announcement.js
    │   │   │   ├── countdown.js
    │   │   │   ├── shop-the-look.js
    │   │   │   ├── media-gallery.js
    │   │   │   └── lenis.js
    │   │   └── partials/       # Web component definitions
    │   │       ├── noor-product-card.js
    │   │       ├── product-card.js
    │   │       └── main-menu.js
    │   │
    │   ├── styles/
    │   │   ├── app.scss            # Main entry: imports all partials
    │   │   ├── 00-tokens/          # Variables, reset, typography
    │   │   ├── 01-base/            # Body, links, images
    │   │   ├── 01-settings/        # Tailwind base import
    │   │   ├── 02-components/      # Buttons, cards, forms, badges, marquee, carousel
    │   │   ├── 03-sections/        # Header, hero, collections, products, etc.
    │   │   └── 04-utilities/       # Animations, helpers (reveal system, hover effects)
    │   │
    │   └── images/                 # Source images (copied to public/images)
    │
    └── views/
        ├── layouts/
        │   ├── master.twig         # Main HTML shell (head, body, scripts)
        │   └── customer.twig       # Customer account layout
        ├── components/
        │   ├── header/
        │   │   └── header.twig     # Announcement bar + header
        │   ├── footer/
        │   │   └── footer.twig
        │   └── home/               # 30 homepage section components
        │       ├── hero-slideshow.twig
        │       ├── marquee-ticker.twig
        │       ├── split-collection.twig
        │       └── ... (30 total)
        └── pages/                  # Page templates
            ├── index.twig          # Homepage (renders components)
            ├── product/
            ├── cart.twig
            ├── blog/
            ├── customer/
            └── ...
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (enforced via `preinstall` script)
- Salla CLI: `npm install -g @salla.sa/cli`

### Setup
```bash
git clone https://github.com/masudv2/salla-noor-theme.git
cd salla-noor-theme
pnpm install
```

### Development
```bash
pnpm watch           # webpack --mode development --watch
salla theme preview  # Opens Salla preview in browser (needs auth)
```

### Production Build
```bash
pnpm production      # webpack --mode production
```

### Deploy
```bash
salla theme push     # Pushes to your Salla store
```

---

## How Salla Themes Work

### The Twilight Engine

Salla uses a custom template engine called **Twilight** built on Twig. Key concepts:

1. **`twilight.json`** — The theme manifest. Defines:
   - Theme metadata (name, description, repository)
   - `features` — Salla features the theme supports (mega-menu, fonts, etc.)
   - `settings` — Global theme settings (colors, toggles, text inputs)
   - `components` — Homepage sections the merchant can add/configure

2. **Layouts** — `master.twig` is the HTML shell. Pages extend it via `{% block content %}`.

3. **Components** — Homepage sections live in `src/views/components/home/`. Each maps to a `components[]` entry in `twilight.json`. Merchants add/remove/reorder these in the Salla theme editor.

4. **Pages** — Each page type (`product/single.twig`, `cart.twig`, etc.) receives specific variables from Salla's backend. The variable tables are documented as comments in each file.

### Data Flow

```
twilight.json (schema)
       ↓
Salla Dashboard (merchant configures values)
       ↓
Twig Template (receives data via `component.*` object)
       ↓
Rendered HTML (served to browser)
```

### Available Global Variables

In every twig template you have access to:

| Variable           | Description                                    |
|--------------------|------------------------------------------------|
| `store`            | Store info (name, logo, url, contacts, social) |
| `store.settings`   | Store settings (auth, cart, product, tax)       |
| `theme`            | Theme info (name, mode, is_rtl, color, font)   |
| `theme.settings`   | Values from `twilight.json` settings section    |
| `theme.color`      | Primary color + helpers (darker, lighter)       |
| `user`             | Current user (type, language, can_access_wallet)|
| `currency`         | Active currency (code, symbol)                  |

Access theme settings:
```twig
{{ theme.settings.get('setting_id', 'fallback_value') }}
```

### Component Variables

Each homepage component receives a `component` object with the field values defined in its `twilight.json` schema. Access them:

```twig
{% set title = component.title|default('Fallback Title') %}
```

---

## Design System & Tokens

All design tokens are CSS custom properties defined in `src/assets/styles/00-tokens/_variables.scss`:

### Colors
```scss
--nr-primary: #263D30;        // Forest green
--nr-primary-hover: #1a2d22;  // Darker green
--nr-text: #1f1f1f;           // Body text
--nr-text-light: #747474;     // Secondary text
--nr-bg: #ffffff;             // Background
--nr-bg-warm: #f8f2ea;        // Warm cream (alt sections)
--nr-border: #e3e3e3;         // Borders
--nr-sale: #702424;           // Sale/discount red
```

### Typography
```scss
--nr-font-display: 'Cormorant', serif;   // Headings, hero titles
--nr-font-body: 'Jost', sans-serif;      // Body text, UI
```

### Type Scale
```scss
--nr-h1: 3.825rem;    // Hero titles
--nr-h2: 2.55rem;     // Section titles
--nr-h3: 1.7rem;      // Subsection titles
--nr-h4: 1.35rem;     // Card titles
--nr-body: 1rem;      // Body text
--nr-small: 0.875rem; // Small text
--nr-label: 0.75rem;  // Labels, eyebrows
```

### Spacing
```scss
--nr-space-xs: 0.25rem;
--nr-space-sm: 0.5rem;
--nr-space-md: 1rem;
--nr-space-lg: 2rem;
--nr-space-xl: 4rem;
--nr-space-2xl: 6rem;
```

### Motion
```scss
--nr-transition: 400ms ease;
--nr-transition-slow: 500ms ease;
--nr-ease: cubic-bezier(0.25, 0.8, 0.25, 1);
```

---

## SCSS Architecture

Follows ITCSS (Inverted Triangle CSS) layers:

```
00-tokens/     → Variables, reset, type scale (no output CSS without usage)
01-base/       → Element defaults (body, a, img)
02-components/ → Reusable UI pieces (buttons, cards, forms, badges)
03-sections/   → Page-level sections (header, hero, footer, products)
04-utilities/  → Animations, helpers, overrides (highest specificity)
```

### BEM Naming Convention

All classes use the `nr-` prefix with BEM:

```
nr-{block}__{element}--{modifier}

nr-hero                     → Block
nr-hero__title              → Element
nr-hero--ken-burns          → Modifier
nr-collection-card--overlay → Modifier
```

### Key Utility Classes

```scss
.nr-container      // Max-width container with padding
.nr-section         // Vertical section padding
.nr-section__header // Flex header with title + action
.nr-section__title  // Section heading (Cormorant, h2 size)
.nr-section-label   // Uppercase eyebrow label
.nr-bg-alt          // Warm cream background
.nr-sr-only         // Screen-reader only
```

### Reveal Animations

Add these classes to elements for scroll-triggered animations:

```html
<div class="nr-reveal">         <!-- Fade up (default) -->
<div class="nr-reveal--up">     <!-- Fade up (explicit) -->
<div class="nr-reveal--left">   <!-- Slide from left -->
<div class="nr-reveal--right">  <!-- Slide from right -->
<div class="nr-reveal--scale">  <!-- Scale up -->
```

Stagger with delay classes:
```html
<div class="nr-reveal nr-reveal-delay-1">  <!-- 100ms delay -->
<div class="nr-reveal nr-reveal-delay-2">  <!-- 200ms delay -->
<div class="nr-reveal nr-reveal-delay-3">  <!-- 300ms delay -->
```

The JS (`modules/scroll-reveal.js`) uses IntersectionObserver to add `.nr-visible` when elements enter the viewport.

---

## JavaScript Architecture

### Entry Points (webpack)

| Entry        | Files                                | Pages     |
|--------------|--------------------------------------|-----------|
| `app`        | app.scss, wishlist.js, app.js, blog.js | All pages |
| `home`       | home.js                              | Homepage  |
| `product`    | product.js, products.js              | PDP, PLP  |
| `checkout`   | cart.js, thankyou.js                 | Cart, Thanks |
| `pages`      | loyalty.js, brands.js               | Loyalty, Brands |

### Module Pattern

Each JS module exports a single `init` function:

```js
// modules/my-feature.js
export function initMyFeature() {
  const targets = document.querySelectorAll('[data-nr-my-feature]');
  if (!targets.length) return;
  // ... setup logic
}
```

Then import and call in the appropriate entry:

```js
// home.js
import { initMyFeature } from './modules/my-feature';

class Home extends BasePage {
  onReady() {
    initMyFeature();
  }
}

Home.initiateWhenReady(['index']);
```

### Page Lifecycle

Salla fires `salla.onReady()` when the platform SDK is loaded. The `BasePage.initiateWhenReady(['page-name'])` pattern ensures page-specific JS only runs on matching pages. Page names correspond to Salla's internal route names: `index`, `product.single`, `cart`, etc.

---

## How to Convert an HTML Section to a Salla Component

This is the complete workflow for taking a static HTML/CSS design and making it a configurable Salla homepage section.

### Step 1: Create the Twig Template

Create `src/views/components/home/my-section.twig`:

```twig
{# My Section — Noor Theme #}
{% set show        = component.show|default(true) %}
{% set label       = component.label|default('Our Work') %}
{% set title       = component.title|default('Section Title') %}
{% set description = component.description|default('Default description text.') %}
{% set image       = component.image|default('https://images.unsplash.com/photo-...?w=800&q=80') %}
{% set btn_text    = component.btn_text|default('Learn More') %}
{% set btn_link    = component.btn_link|default('/products') %}

{# IMPORTANT: For dropdown fields, extract the value from the array #}
{% set layout_raw  = component.layout|default('left') %}
{% set layout      = layout_raw is iterable ? (layout_raw[0].value|default('left')) : layout_raw %}

{% if show %}
<section class="nr-section">
  <div class="nr-container">
    <div class="nr-section__header nr-reveal">
      <div>
        {% if label %}<span class="nr-section-label">{{ label }}</span>{% endif %}
        {% if title %}<h2 class="nr-section__title">{{ title }}</h2>{% endif %}
      </div>
    </div>

    <div class="nr-my-section nr-reveal--up">
      <!-- Your HTML here, using nr-* class names -->
      <img src="{{ image }}" alt="{{ title }}" loading="lazy">
      <p>{{ description }}</p>
      {% if btn_text %}
        <a href="{{ btn_link }}" class="nr-btn-solid">
          {{ btn_text }} <span class="nr-btn__arrow">&rarr;</span>
        </a>
      {% endif %}
    </div>
  </div>
</section>
{% endif %}
```

### Key Rules for Twig Templates

1. **Always wrap in `{% if show %}`** — lets merchants toggle visibility
2. **Always provide `|default()` values** — so the section previews with content
3. **Use `nr-*` BEM classes** — never raw/utility classes for section layout
4. **Add `nr-reveal` / `nr-reveal--up`** — for scroll animations
5. **Use `loading="lazy"`** on images
6. **Dropdown fields return arrays** — always extract `.value` (see [Handling Dropdown Fields](#handling-dropdown-fields-critical))

### Step 2: Add SCSS Styles

Add styles to an existing section file or create a new one. If creating new:

```scss
// src/assets/styles/03-sections/_my-section.scss

.nr-my-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--nr-space-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.nr-my-section__media {
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
```

Then import in `app.scss`:

```scss
// 03 — Sections
@import './03-sections/my-section';
```

### Step 3: Add JavaScript (if needed)

Only if the section needs interactivity (carousels, tabs, toggles):

```js
// src/assets/js/modules/my-section.js
export function initMySection() {
  const els = document.querySelectorAll('[data-nr-my-section]');
  if (!els.length) return;

  els.forEach(el => {
    // Interactive logic here
  });
}
```

Import in `home.js`:

```js
import { initMySection } from './modules/my-section';

// Inside onReady():
initMySection();
```

### Step 4: Register in twilight.json

Add to the `components` array in `twilight.json`:

```json
{
    "key": "unique-uuid-here",
    "path": "home.my-section",
    "fields": [
        {
            "type": "boolean",
            "id": "show",
            "label": { "en": "Show Section", "ar": "إظهار القسم" },
            "format": "switch",
            "value": true,
            "selected": true
        },
        {
            "type": "string",
            "id": "label",
            "label": { "en": "Section Label", "ar": "تسمية القسم" },
            "format": "text",
            "value": "Our Work"
        },
        {
            "type": "string",
            "id": "title",
            "label": { "en": "Title", "ar": "العنوان" },
            "format": "text",
            "value": "Section Title"
        },
        {
            "type": "string",
            "id": "description",
            "label": { "en": "Description", "ar": "الوصف" },
            "format": "textarea",
            "value": ""
        },
        {
            "type": "string",
            "id": "image",
            "label": { "en": "Image", "ar": "الصورة" },
            "format": "image"
        },
        {
            "type": "string",
            "id": "btn_text",
            "label": { "en": "Button Text", "ar": "نص الزر" },
            "format": "text",
            "value": "Learn More"
        },
        {
            "type": "string",
            "id": "btn_link",
            "label": { "en": "Button Link", "ar": "رابط الزر" },
            "format": "text",
            "value": "/products"
        },
        {
            "type": "items",
            "id": "layout",
            "label": { "en": "Layout", "ar": "التخطيط" },
            "format": "dropdown-list",
            "selected": [{ "label": "Left", "value": "left", "key": "layout-left" }],
            "options": [
                { "label": "Left", "value": "left", "key": "layout-left" },
                { "label": "Right", "value": "right", "key": "layout-right" },
                { "label": "Center", "value": "center", "key": "layout-center" }
            ],
            "source": "Manual"
        }
    ],
    "title": { "en": "My Section", "ar": "قسمي" },
    "icon": "sicon-grid"
}
```

### Step 5: Build and Test

```bash
pnpm production
salla theme preview
```

The section will appear in the Salla theme editor under "Add Section".

---

## twilight.json Schema Reference

### Field Types

| `type`     | `format`        | Returns in Twig                          | Use Case              |
|------------|-----------------|------------------------------------------|-----------------------|
| `boolean`  | `switch`        | `true` / `false`                         | Toggles               |
| `string`   | `text`          | `"string value"`                         | Short text inputs     |
| `string`   | `textarea`      | `"longer string"`                        | Multi-line text       |
| `string`   | `image`         | `"https://cdn.salla.sa/..."`            | Image upload          |
| `string`   | `color`         | `"#263D30"`                              | Color picker          |
| `number`   | `number`        | `42`                                     | Numeric input         |
| `items`    | `dropdown-list` | **Array**: `[{label, value, key}]`       | Select dropdown       |
| `collection` | `collection`  | **Array of objects**                     | Repeatable groups     |

### Dropdown Field Structure

```json
{
    "type": "items",
    "id": "height",
    "label": { "en": "Height", "ar": "الارتفاع" },
    "format": "dropdown-list",
    "selected": [{ "label": "Full", "value": "full", "key": "h-full" }],
    "options": [
        { "label": "Full", "value": "full", "key": "h-full" },
        { "label": "Large", "value": "large", "key": "h-large" },
        { "label": "Medium", "value": "medium", "key": "h-medium" }
    ],
    "source": "Manual"
}
```

### Collection Field Structure

```json
{
    "type": "collection",
    "id": "items",
    "label": { "en": "Items", "ar": "العناصر" },
    "format": "collection",
    "fields": [
        {
            "type": "string",
            "id": "items.title",
            "label": { "en": "Title", "ar": "العنوان" },
            "format": "text",
            "value": ""
        },
        {
            "type": "string",
            "id": "items.image",
            "label": { "en": "Image", "ar": "الصورة" },
            "format": "image"
        }
    ],
    "required": true,
    "minLength": 1,
    "maxLength": 20,
    "item_label": "العناصر",
    "value": [{ "items.title": "", "items.image": "" }]
}
```

**Important**: Collection sub-field IDs are prefixed with the parent ID (e.g., `items.title`, `tabs.source`). In twig, access them with bracket notation:

```twig
{% for item in component.items %}
  {{ item['items.title']|default(item.title|default('')) }}
{% endfor %}
```

---

## Handling Dropdown Fields (Critical)

**This is the #1 source of bugs.** Salla dropdown fields return an array of objects, not a plain string.

What you expect: `"full"`
What you get: `[{"label":"Full","value":"full","key":"h-full"}]`

### The Fix Pattern

Always use this pattern for dropdown fields:

```twig
{# 1. Read the raw value #}
{% set height_raw = component.height|default('full') %}

{# 2. Extract the value safely #}
{% set height = height_raw is iterable ? (height_raw[0].value|default('full')) : height_raw %}

{# 3. Now use height as a normal string #}
{% if height == 'full' %}...{% endif %}
```

### Why Both Paths?

- **From Salla dashboard** → `component.height` is `[{label,value,key}]` (iterable)
- **From twig defaults** → `component.height|default('full')` is `"full"` (string)

The `is iterable` check handles both cases.

---

## Handling Collection Fields

Collection fields in the schema use prefixed sub-field IDs.

### Schema Definition
```json
"id": "tabs",
"fields": [
    { "id": "tabs.label", ... },
    { "id": "tabs.source", ... }
]
```

### Twig Access
```twig
{% set tabs = component.tabs|default([]) %}
{% if not tabs|length %}
  {% set tabs = [
    { label: 'New Arrivals', source: 'latest' },
    { label: 'Best Sellers', source: 'best-selling' }
  ] %}
{% endif %}

{% for tab in tabs %}
  {# Handle both prefixed (from Salla) and unprefixed (from defaults) #}
  {% set tab_label = tab['tabs.label']|default(tab.label|default('Tab')) %}
  {% set tab_source_raw = tab['tabs.source']|default(tab.source|default('latest')) %}
  {% set tab_source = tab_source_raw is iterable ? (tab_source_raw[0].value|default('latest')) : tab_source_raw %}
{% endfor %}
```

**Key rule**: Collection sub-fields that are dropdowns need BOTH the prefix handling AND the array extraction.

---

## Dark Mode

### How It Works

1. `twilight.json` has a `color_mode` setting (light / dark / auto)
2. `master.twig` sets `data-theme="{{ theme.settings.get('color_mode', 'light') }}"` on `<html>`
3. `_variables.scss` defines dark overrides under `[data-theme="dark"]` and `[data-theme="auto"]` (with `prefers-color-scheme: dark` media query)
4. `modules/dark-mode.js` handles the `auto` mode, keeping `data-theme="auto"` on the element and setting `data-theme-resolved` for JS that needs to know the actual theme

### Adding Dark Mode to New Styles

Always use CSS custom properties, never hardcoded colors:

```scss
// Good
.nr-my-section { background: var(--nr-bg-warm); color: var(--nr-text); }

// Bad
.nr-my-section { background: #f8f2ea; color: #1f1f1f; }
```

---

## RTL Support

Salla handles base RTL via `dir="rtl"` on `<html>`. For custom styles:

```scss
.nr-my-section__arrow {
  margin-left: var(--nr-space-sm);

  [dir="rtl"] & {
    margin-left: 0;
    margin-right: var(--nr-space-sm);
  }
}
```

Or use logical properties where possible:

```scss
.nr-my-section__arrow {
  margin-inline-start: var(--nr-space-sm);  // auto-flips for RTL
}
```

---

## Salla Web Components

Salla provides pre-built web components you can use in templates:

| Component                | Usage                                           |
|--------------------------|-------------------------------------------------|
| `salla-products-list`    | Renders product cards from a source              |
| `salla-products-slider`  | Product carousel (uses Splide internally)        |
| `salla-product-card`     | Single product card (Salla's default style)     |
| `salla-slider`           | Generic slider (type="fade", "carousel")         |
| `salla-add-product-button` | Add to cart button with loading states        |
| `salla-cart-summary`     | Cart icon with count badge                       |
| `salla-user-menu`        | User avatar/dropdown menu                        |
| `salla-login-modal`      | Login/register modal                             |
| `salla-newsletter`       | Email subscription form                          |
| `salla-social`           | Social media links                               |
| `salla-contacts`         | Store contact info                               |
| `salla-menu`             | Navigation menu (source="header" or "footer")   |
| `salla-search`           | Search modal                                     |
| `salla-rating-stars`     | Star rating display                              |
| `salla-localization-modal` | Language/currency switcher                     |
| `noor-product-card`      | Custom Noor-styled product card (our custom WC) |

### Using salla-products-list with Custom Cards

```twig
<salla-products-list source="latest" limit="8">
  <div slot="product-card" class="nr-card">
    <div class="nr-card__media">
      <a href="{product_url}">
        <img src="{product_image}" alt="{product_name}" loading="lazy">
      </a>
    </div>
    <div class="nr-card__info">
      <a href="{product_url}"><h4 class="nr-card__title">{product_name}</h4></a>
      <div class="nr-card__price">{product_price}</div>
    </div>
  </div>
</salla-products-list>
```

The `{product_*}` placeholders are replaced by Salla's runtime. Available: `{product_id}`, `{product_url}`, `{product_image}`, `{product_name}`, `{product_price}`, `{product_rating}`.

### Product Sources

| Source          | Description              |
|-----------------|--------------------------|
| `latest`        | Latest products          |
| `best-selling`  | Most sold products       |
| `offers`        | Products on sale         |
| `category`      | From specific category   |

---

## Common Pitfalls

### 1. Referencing fields not in twilight.json schema

Twilight throws errors like `Trying to access (twilight_base.my_field), but it's not exist!` if you use `component.my_field` but `my_field` isn't in the component's `fields` array.

**Fix**: Every `component.X` reference must have a matching field with `"id": "X"` in twilight.json.

### 2. Dropdown fields used as strings

Causes `Array to string conversion` errors. See [Handling Dropdown Fields](#handling-dropdown-fields-critical).

### 3. `display:none` hiding Salla web components

`salla-products-list` and similar web components won't initialize if their parent has `display:none`. Use `visibility:hidden; height:0; overflow:hidden` instead:

```scss
.nr-tabs__panel {
  display: block;
  height: 0;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;

  &.is-active {
    height: auto;
    overflow: visible;
    opacity: 1;
    visibility: visible;
  }
}
```

### 4. Collection field prefixes

Schema defines `items.title` but twig needs `item['items.title']`. See [Handling Collection Fields](#handling-collection-fields).

### 5. Forgetting bilingual labels

Every field label needs both `en` and `ar`:
```json
"label": { "en": "Title", "ar": "العنوان" }
```

### 6. Images not loading in production

Use Unsplash or absolute URLs for demo defaults. Relative paths won't work since the template runs on Salla's CDN, not your local server.

### 7. CSS not applying

Remember to:
1. Import your new SCSS file in `app.scss`
2. Run `pnpm production` to rebuild
3. Check that class names in SCSS match the twig template exactly

### 8. JS module not running

1. Export an `initX` function
2. Import it in the correct entry point (`home.js` for homepage, `app.js` for all pages)
3. Call it in the `onReady()` method
4. Rebuild with `pnpm production`

---

## Build & Deploy

### Webpack Entry Points

The webpack config (`webpack.config.js`) maps entry names to source files. Output goes to `public/`:

```js
entry: {
    app:     ['styles/app.scss', 'js/wishlist.js', 'js/app.js', 'js/blog.js'],
    home:    'js/home.js',
    product: ['js/product.js', 'js/products.js'],
    // ...
}
```

### Adding a New Entry Point

If you need JS that only runs on specific pages:

1. Create the JS file (e.g., `src/assets/js/my-page.js`)
2. Add to webpack config:
   ```js
   'my-page': asset('js/my-page.js'),
   ```
3. Load it in `master.twig` or the specific page template:
   ```twig
   <script defer src="{{ 'my-page.js'|asset }}"></script>
   ```

### ThemeWatcher

The `ThemeWatcher` webpack plugin (from `@salla.sa/twilight`) enables hot reload during `salla theme preview`. It watches for file changes and pushes updates.

---

## Checklist for New Components

Before considering a new section complete:

- [ ] Twig template created in `src/views/components/home/`
- [ ] All `component.*` references have matching fields in twilight.json
- [ ] Dropdown fields use the `is iterable` extraction pattern
- [ ] Collection fields handle prefixed sub-field IDs
- [ ] `|default()` values on all fields (so section works without configuration)
- [ ] Demo content (images, text) populated in defaults
- [ ] Wrapped in `{% if show %}` block
- [ ] Uses `nr-*` BEM class names
- [ ] `nr-reveal` or `nr-reveal--up` on animated elements
- [ ] SCSS added and imported in `app.scss`
- [ ] Dark mode works (uses CSS custom properties, not hardcoded colors)
- [ ] Mobile responsive (tested at 768px and 640px breakpoints)
- [ ] RTL doesn't break layout
- [ ] Labels are bilingual (en + ar)
- [ ] `loading="lazy"` on images
- [ ] JS module created and imported (if interactive)
- [ ] `pnpm production` builds without new errors
- [ ] Component appears in Salla theme editor "Add Section" panel
- [ ] Schema fields show in the section settings panel

---

## Quick Reference: Salla CLI Commands

```bash
salla theme preview          # Preview theme in browser
salla theme preview -s NAME  # Preview on specific store
salla theme push             # Deploy to store
salla theme install REPO     # Install theme from git repo
salla login                  # Authenticate with Salla
```

## Git Remotes

| Remote       | URL                                          |
|--------------|----------------------------------------------|
| `origin`     | https://github.com/masudv2/salla-jewelias    |
| `noor`       | https://github.com/masudv2/salla-noor        |
| `noor-theme` | https://github.com/masudv2/salla-noor-theme  |

Push to all:
```bash
git push origin main && git push noor main && git push noor-theme main
```

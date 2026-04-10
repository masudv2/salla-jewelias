# Salla Theme Development Reference — Jewelias

**Process and standards:** See [`AGENTS.md`](./AGENTS.md) for CSS/JS/Twig rules, documentation workflow after changes, and review expectations. Roadmap: [`docs/plan.md`](./docs/plan.md).

## 1. DIRECTORY STRUCTURE (FIXED — cannot change names)

```
preview/                    # Static HTML mocks (Glow) — not part of Salla build
├── home.html               # Full homepage (ecommerce / Shopify-style — convert to Twig next)
├── design-system-v3.html   # Full design system / UI kit (canonical)
└── announcement-bar-v2.html

src/
├── assets/
│   ├── images/
│   ├── js/
│   │   ├── app.js          (global JS, loaded on every page)
│   │   ├── home.js         (homepage only)
│   │   ├── base-page.js    (base class)
│   │   ├── partials/
│   │   │   ├── main-menu.js
│   │   │   ├── product-card.js
│   │   │   └── add-product-toast.js
│   └── styles/
│       └── app.scss         (main stylesheet)
├── locales/
│   ├── ar.json
│   └── en.json
└── views/
    ├── layouts/
    │   └── master.twig      (base layout — ALL pages extend this)
    ├── components/
    │   ├── header/           (header.twig, breadcrumbs.twig)
    │   ├── footer/           (footer.twig)
    │   ├── home/             (homepage sections)
    │   └── product/          (product-card.twig, similar-products.twig, offer.twig)
    └── pages/                (FIXED names — DO NOT rename)
        ├── index.twig        (homepage)
        ├── cart.twig
        ├── thank-you.twig
        ├── loyalty.twig
        ├── page-single.twig  (generic pages)
        ├── blog/
        │   ├── index.twig
        │   └── single.twig
        ├── brands/
        │   ├── index.twig
        │   └── single.twig
        ├── product/
        │   ├── index.twig    (product listing / category page)
        │   └── single.twig  (product detail page)
        └── customer/
            ├── profile.twig
            ├── notifications.twig
            ├── wishlist.twig
            └── orders/
                ├── index.twig
                └── single.twig
```

`preview/` holds static HTML mocks (Glow design system and announcement bar). They are for local browser review only — not part of the Webpack build or the theme package uploaded to Salla.

## 2. GLOBAL TWIG VARIABLES

### Store Object
- `store.name` — Store name
- `store.url` — Store URL
- `store.logo` — Logo URL
- `store.description` — Store description
- `store.scope` — Store branches/scopes
- `store.settings.is_multilingual` — Multi-language enabled
- `store.settings.currencies_enabled` — Multi-currency enabled

### User Object
- `user.type` — "user" or "guest"
- `user.language.code` — "ar" or "en"
- `user.language.dir` — "rtl" or "ltr"
- `user.language.name` — Language display name
- `user.can_access_wallet` — Boolean

### Theme Object
- `theme.font.name` — Selected font name
- `theme.font.path` — Font CDN path
- `theme.color.primary` — Primary color hex
- `theme.color.darker(0.15)` — Darker shade
- `theme.color.lighter(0.15)` — Lighter shade
- `theme.color.reverse_text` — Contrast text color
- `theme.settings.get('setting_id', 'default')` — Get theme setting

### Currency Object
- `currency.symbol` — Currency symbol

### Page Object
- `page.title` — Page title
- `page.slug` — Page slug (e.g., "cat.show")

## 3. PRODUCT OBJECT (on product pages)

- `product.id` — Product ID
- `product.name` — Product name
- `product.url` — Product URL
- `product.description` — HTML description
- `product.has_read_more` — Boolean
- `product.subtitle` — Subtitle
- `product.price` — Current price
- `product.sale_price` — Sale price
- `product.regular_price` — Regular price
- `product.is_on_sale` — Boolean
- `product.is_available` — Boolean
- `product.status` — "sale", "out", "out-and-notify"
- `product.type` — "product", "digital", "service", "donating", "codes", "group_products", "food"
- `product.images` — Array of {url, alt}
- `product.image.url` — Main image
- `product.options` — Customization options array
- `product.brand` — {name, logo}
- `product.rating` — Rating value
- `product.tags` — Array of {name, url}
- `product.promotion_title` — Promotion text
- `product.sold_quantity` — Sold count
- `product.max_quantity` — Max orderable
- `product.can_show_remained_quantity` — Boolean
- `product.notify_availability` — Boolean
- `product.is_hidden_quantity` — Boolean
- `product.can_add_note` — Boolean
- `product.can_upload_file` — Boolean
- `product.has_metadata` — Boolean
- `product.discount_ends` — Discount label

### Product listing pages
- `products` — Array of product objects
- `sort_list` — Available sorting: ourSuggest, bestSell, topRated, priceFromTopToLow, priceFromLowToTop
- `filters` — Boolean
- `category` — {name, url, sub_categories, image}

### Cart page
- `cart.items` — Array of {id, product_name, product_image, price, quantity, total, options, is_available}

## 4. TWIG HELPERS & FILTERS

### Helpers
- `is_current_url(pattern)` — Check if current URL matches
- `is_page()` — Get page name
- `link(path)` — Create internal link
- `page(name)` — Generate page link
- `old(field)` — Keep form input on validation error
- `pluralize(word, count)` — Singular/plural
- `trans(key)` — Translation from locale files

### Filters
- `| asset` — Link to theme asset file
- `| cdn` — Link to CDN resource
- `| money` — Format as currency
- `| raw` — Render as HTML
- `| json_encode` — Convert to JSON
- `| camel_case` — CamelCase conversion

## 5. HOOKS (inject code without modifying core)

### Head
- `{% hook 'head:start' %}`
- `{% hook head %}`
- `{% hook 'head:end' %}`

### Body
- `{% hook 'body:classes' %}`
- `{% hook 'body:start' %}`
- `{% hook 'body:end' %}`

### Product Single
- `{% hook 'product:single.description.start' %}`
- `{% hook 'product:single.description' %}`
- `{% hook 'product:single.description.end' %}`
- `{% hook 'product:single.form.start' %}`
- `{% hook 'product:single.form.end' %}`

### Product Listing
- `{% hook 'product:index.items.start' %}`
- `{% hook 'product:index.items.end' %}`

### Cart
- `{% hook 'cart:items.start' %}`
- `{% hook 'cart:items.end' %}`
- `{% hook 'cart:summary.start' %}`
- `{% hook 'cart:summary.end' %}`

### Customer
- `{% hook 'customer:profile.form.start' %}`
- `{% hook 'customer:profile.form.fields.start' %}`
- `{% hook 'customer:profile.form.fields.end' %}`
- `{% hook 'customer:profile.form.submit.start' %}`
- `{% hook 'customer:profile.form.submit.end' %}`
- `{% hook 'customer:profile.form.end' %}`
- `{% hook 'customer:notifications.items.start' %}`
- `{% hook 'customer:notifications.items.end' %}`

### Footer
- `{% hook copyright %}` — Store copyright

### Components
- `{% component 'header.header' %}`
- `{% component 'header.breadcrumbs' %}`
- `{% component 'footer.footer' %}`
- `{% component 'product.offer' %}`
- `{% component 'product.similar-products' %}`
- `{% component 'comments' %}`
- `{% component home %}` — Render all home components from twilight.json

## 6. WEB COMPONENTS (ready-made Salla UI)

### Essential (used on most pages)
- `<salla-cart-summary>` — Cart icon with badge
- `<salla-search>` — Search modal
- `<salla-menu source="header|footer">` — Navigation menu
- `<salla-login-modal>` — Login form
- `<salla-user-menu>` — User dropdown
- `<salla-breadcrumb>` — Breadcrumb nav
- `<salla-localization-modal>` — Language/currency picker

### Product
- `<salla-add-product-button product-id="" product-status="" product-type="">` — Add to cart
- `<salla-product-availability>` — Notify when available
- `<salla-product-options>` — Product options
- `<salla-product-card>` — Product card display
- `<salla-products-list>` — Product grid with pagination
- `<salla-products-slider>` — Product carousel
- `<salla-quantity-input max="" value="" name="">` — Qty selector
- `<salla-quick-buy>` — Quick checkout
- `<salla-quick-order>` — Quick order
- `<salla-installment>` — Installment options

### Content
- `<salla-slider>` — Image/content slider (Swiper-based)
- `<salla-social>` — Social media links
- `<salla-social-share>` — Share buttons
- `<salla-newsletter>` — Email signup
- `<salla-payments>` — Payment method icons
- `<salla-contacts>` — Store contact info
- `<salla-comments>` — Comments form
- `<salla-reviews>` — Customer reviews
- `<salla-reviews-summary>` — Star rating summary
- `<salla-rating-stars>` — Star rating display
- `<salla-count-down>` — Countdown timer
- `<salla-tabs>` — Tab panels

### UI
- `<salla-filters>` — Product filters sidebar
- `<salla-infinite-scroll>` — Infinite scroll
- `<salla-modal>` — Modal dialog
- `<salla-skeleton>` — Loading skeleton
- `<salla-loading>` — Loading indicator
- `<salla-button>` — Styled button
- `<salla-color-picker>` — Color selection
- `<salla-file-upload>` — File uploader

### Customer
- `<salla-orders>` — Order history table
- `<salla-loyalty>` — Loyalty program
- `<salla-userprofile>` — Profile info
- `<salla-user-settings>` — Account settings
- `<salla-verify>` — OTP verification
- `<salla-scopes>` — Branch selector

### Other
- `<salla-offer-modal>` — Promotional offers
- `<salla-conditional-offer>` — Cart-based offers
- `<salla-gifting>` — Gift options
- `<salla-advertisement>` — Product ads
- `<salla-apps-icons>` — App store links
- `<salla-metadata>` — Product custom fields
- `<salla-add-product-toast>` — Add to cart notification

## 7. TWILIGHT.JSON SCHEMA

### Field Types
- `string` — Text, textarea, image, color, hidden
- `boolean` — Switch toggle
- `number` — Numeric input with min/max
- `items` — Dropdown list
- `collection` — Repeatable group of fields
- `static` — Description/info text

### Field Formats
- `text` — Single line text
- `textarea` — Multi-line text
- `image` — Image upload
- `color` — Color picker
- `switch` — On/off toggle
- `number` — Numeric stepper
- `dropdown-list` — Select dropdown
- `collection` — Repeatable items
- `hidden` — Hidden field
- `description` — Static info text

### Component Structure
```json
{
  "key": "uuid-v4",
  "title": { "en": "Title", "ar": "عنوان" },
  "icon": "sicon-*",
  "path": "home.component-name",
  "fields": [
    {
      "id": "field_name",
      "type": "string",
      "format": "text",
      "label": "وصف بالعربي",
      "value": "default value",
      "multilanguage": true,
      "icon": "sicon-*",
      "required": true
    }
  ]
}
```

### Rules
- Labels: PLAIN ARABIC STRINGS (not {en, ar} objects)
- Component keys: UUID v4 format
- Path: `home.filename` maps to `views/components/home/filename.twig`
- Collection fields: prefix child field IDs with parent ID (e.g., `items.title`)
- Built-in features use `component-` prefix in features array

## 8. MARKETPLACE REQUIREMENTS

### Design
- Must be substantively different from Theme Raed
- Cohesive look across ALL templates
- Distinctive design and inventive art direction
- Industry-focused (Jewelry & Accessories for us)

### Technical
- Theme size ≤ 1MB
- Lighthouse performance ≥ 60 (desktop + mobile)
- Lighthouse accessibility ≥ 90 (desktop + mobile)
- Use localization (trans()) — no hardcoded strings
- Track Theme Raed updates
- Limit network requests per product
- No `|raw` on user-editable content (security)
- No custom HTML input in settings/components (XSS risk)

### Submission
- 3+ screenshots (1366×768)
- Demo store for preview
- Min price: SAR 250
- Support contact info
- Changelog documentation

## 9. SEO CHECKLIST

- All images: `alt` attribute with descriptive text
- Product pages: `<h1>` for product name
- Category pages: `<h1>` for category name
- Semantic HTML: `<main>`, `<article>`, `<section>`, `<nav>`
- Lazy loading: `loading="lazy"` on below-fold images
- Meta tags: handled by `{% hook head %}` (Salla injects)
- Breadcrumbs: `{% component 'header.breadcrumbs' %}`
- Proper heading hierarchy: h1 → h2 → h3

## 10. PERFORMANCE CHECKLIST

- Minimize CSS: single app.scss, no unused rules
- Lazy load images: `loading="lazy"`
- Defer JS: `defer` attribute on scripts
- Minimize DOM depth
- Use CSS animations over JS animations
- Avoid layout shifts: set explicit image dimensions
- Minimize web font weights (only load needed)
- Use `IntersectionObserver` for scroll reveals (not scroll events)
- Avoid excessive `|raw` filter usage
- Product cards: use `<salla-product-card>` or minimal custom markup

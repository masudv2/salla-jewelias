class NoorProductCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.product = this.product || JSON.parse(this.getAttribute('product'));
    if (window.app?.status === 'ready') {
      this.onReady();
    } else {
      document.addEventListener('theme::ready', () => this.onReady());
    }
  }

  onReady() {
    this.fitImageHeight = salla.config.get('store.settings.product.fit_type');
    this.placeholder = salla.url.asset(salla.config.get('theme.settings.placeholder'));
    this.getProps();

    this.source = salla.config.get('page.slug');
    if (this.source === 'landing-page') {
      this.hideAddBtn = true;
      this.showQuantity = window.showQuantity;
    }

    salla.lang.onLoaded(() => {
      this.remained = salla.lang.get('pages.products.remained');
      this.donationAmount = salla.lang.get('pages.products.donation_amount');
      this.startingPrice = salla.lang.get('pages.products.starting_price');
      this.addToCart = salla.lang.get('pages.cart.add_to_cart');
      this.outOfStock = salla.lang.get('pages.products.out_of_stock');
      this.render();
    });

    this.render();
  }

  getProps() {
    this.horizontal = this.hasAttribute('horizontal');
    this.hideAddBtn = this.hasAttribute('hideAddBtn');
    this.minimal = this.hasAttribute('minimal');
    this.showQuantity = this.hasAttribute('showQuantity');
  }

  escapeHTML(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  formatDate(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  getPriceFormat(price) {
    if (!price || price == 0) {
      return salla.config.get('store.settings.product.show_price_as_dash') ? '-' : '';
    }
    return salla.money(price);
  }

  getProductBadge() {
    if (this.product?.preorder?.label) {
      return `<span class="nr-card__badge">${this.product.preorder.label}</span>`;
    }
    if (this.product.promotion_title) {
      return `<span class="nr-card__badge">${this.product.promotion_title}</span>`;
    }
    if (this.showQuantity && this.product?.quantity) {
      return `<span class="nr-card__badge nr-card__badge--qty">${this.remained} ${salla.helpers.number(this.product.quantity)}</span>`;
    }
    if (this.showQuantity && this.product?.is_out_of_stock) {
      return `<span class="nr-card__badge nr-card__badge--out">${this.outOfStock}</span>`;
    }
    return '';
  }

  getProductPrice() {
    if (this.product.is_on_sale) {
      return `<div class="nr-card__price nr-card__price--sale">
        <span class="nr-card__price-current">${this.getPriceFormat(this.product.sale_price)}</span>
        <span class="nr-card__price-was">${this.getPriceFormat(this.product.regular_price)}</span>
      </div>`;
    }
    if (this.product.starting_price) {
      return `<div class="nr-card__price nr-card__price--starting">
        <span class="nr-card__price-from">${this.startingPrice}</span>
        <span class="nr-card__price-current">${this.getPriceFormat(this.product.starting_price)}</span>
      </div>`;
    }
    return `<div class="nr-card__price">
      <span class="nr-card__price-current">${this.getPriceFormat(this.product.price)}</span>
    </div>`;
  }

  getAddButtonLabel() {
    if (this.product.has_preorder_campaign) {
      return salla.lang.get('pages.products.pre_order_now');
    }
    if (this.product.status === 'sale' && this.product.type === 'booking') {
      return salla.lang.get('pages.cart.book_now');
    }
    if (this.product.status === 'sale') {
      return salla.lang.get('pages.cart.add_to_cart');
    }
    if (this.product.type !== 'donating') {
      return salla.lang.get('pages.products.out_of_stock');
    }
    return salla.lang.get('pages.products.donation_exceed');
  }

  render() {
    const p = this.product;
    const imgSrc = p?.image?.url || p?.thumbnail || this.placeholder || '';
    const imgAlt = this.escapeHTML(p?.image?.alt || p.name);
    const isInWishlist = !salla.config.isGuest() && salla.storage.get('salla::wishlist', []).includes(Number(p.id));

    this.classList.add('nr-card');
    if (this.horizontal) this.classList.add('nr-card--horizontal');
    if (this.minimal) this.classList.add('nr-card--minimal');
    if (p?.is_out_of_stock) this.classList.add('nr-card--out');
    this.setAttribute('id', `nr-card-${p.id}`);

    const fitClass = salla.url.is_placeholder(p?.image?.url)
      ? 'nr-card__img--contain'
      : this.fitImageHeight
        ? `nr-card__img--${this.fitImageHeight}`
        : '';

    this.innerHTML = `
      <div class="nr-card__media">
        <a href="${p.url}" aria-label="${imgAlt}">
          <img class="nr-card__img ${fitClass}" src="${imgSrc}" alt="${imgAlt}" loading="lazy">
        </a>
        ${this.getProductBadge()}
        ${!this.horizontal ? `
          <button
            type="button"
            aria-label="Wishlist"
            class="nr-card__wishlist ${isInWishlist ? 'is-active' : ''}"
            onclick="salla.wishlist.toggle(${p.id})"
            data-id="${p.id}">
            <i class="sicon-heart"></i>
          </button>` : ''}
        ${!this.hideAddBtn && !this.minimal ? `
          <div class="nr-card__quick-add">
            <salla-add-product-button
              product-id="${p.id}"
              product-status="${p.status}"
              product-type="${p.type}">
              ${p.status === 'sale' ? `<i class="sicon-${p.type === 'booking' ? 'calendar-time' : 'shopping-bag'}"></i>` : ''}
              <span>${p.add_to_cart_label || this.getAddButtonLabel()}</span>
            </salla-add-product-button>
          </div>` : ''}
      </div>
      <div class="nr-card__info">
        <h3 class="nr-card__title">
          <a href="${p.url}">${p.name}</a>
        </h3>
        ${p?.subtitle && !this.minimal ? `<p class="nr-card__subtitle">${p.subtitle}</p>` : ''}
        ${p?.donation?.can_donate ? '' : this.getProductPrice()}
        ${p?.rating?.stars ? `
          <div class="nr-card__rating">
            <i class="sicon-star2"></i>
            <span>${p.rating.stars}</span>
          </div>` : ''}
        ${p?.donation && !this.minimal ? `
          <salla-progress-bar donation='${JSON.stringify(p.donation)}'></salla-progress-bar>
          ${p.donation.can_donate && p.donation.custom_amount_enabled ? `
            <div class="nr-card__donation">
              <label for="nr-donate-${p.id}">${this.donationAmount} <span>*</span></label>
              <input type="text" id="nr-donate-${p.id}" name="donating_amount" class="nr-card__donation-input" placeholder="${this.donationAmount}">
            </div>` : ''}` : ''}
        ${p.discount_ends ? `<salla-count-down date="${this.formatDate(p.discount_ends)}" end-of-day boxed labeled></salla-count-down>` : ''}
        ${this.horizontal && !this.hideAddBtn ? `
          <div class="nr-card__footer">
            <salla-add-product-button fill="outline" width="wide"
              product-id="${p.id}" product-status="${p.status}" product-type="${p.type}">
              <span>${p.add_to_cart_label || this.getAddButtonLabel()}</span>
            </salla-add-product-button>
          </div>` : ''}
      </div>
    `;

    // Donation input binding
    this.querySelectorAll('[name="donating_amount"]').forEach(el => {
      el.addEventListener('input', e => {
        salla.helpers.inputDigitsOnly(e.target);
        const btn = e.target.closest('.nr-card__info').querySelector('salla-add-product-button');
        if (btn) btn.setAttribute('donating-amount', e.target.value);
      });
    });

    // Wishlist toggle (optimistic UI)
    this.querySelectorAll('.nr-card__wishlist').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('is-active');
      });
    });
  }
}

customElements.define('noor-product-card', NoorProductCard);

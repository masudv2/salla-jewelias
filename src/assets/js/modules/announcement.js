import Splide from '@splidejs/splide';

function pad2(n) {
  return String(n).padStart(2, '0');
}

function getEndMs(el) {
  const type = el.dataset.acdType || 'standard';
  const y = parseInt(el.dataset.acdY || '0', 10);
  const mo = parseInt(el.dataset.acdMo || '1', 10);
  const d = parseInt(el.dataset.acdD || '1', 10);
  const h = parseInt(el.dataset.acdH || '0', 10);
  const mi = parseInt(el.dataset.acdMi || '0', 10);
  const interval = parseInt(el.dataset.acdInterval || '7', 10);
  const unit = el.dataset.acdUnit || 'day';
  const block = el.dataset.acdBlock || '0';

  if (type === 'evergreen') {
    const key = `ann-evergreen-${block}`;
    let start = localStorage.getItem(key);
    if (!start) {
      start = String(Date.now());
      localStorage.setItem(key, start);
    }
    const ms = unit === 'day' ? interval * 86400000 : interval * 3600000;
    return parseInt(start, 10) + ms;
  }

  return new Date(y, mo - 1, d, h, mi, 0).getTime();
}

function tickCountdown(el) {
  const parts = el.querySelectorAll('[data-part]');
  if (!parts.length) return;

  const end = getEndMs(el);
  const tick = () => {
    const diff = Math.max(0, end - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    parts.forEach((p) => {
      const k = p.getAttribute('data-part');
      if (k === 'd') p.textContent = pad2(days);
      if (k === 'h') p.textContent = pad2(hours);
      if (k === 'm') p.textContent = pad2(mins);
      if (k === 's') p.textContent = pad2(secs);
    });
  };
  tick();
  setInterval(tick, 1000);
}

function initSplide(root) {
  const el = document.getElementById('announcement-bar-splide');
  if (!el) return;

  const slides = el.querySelectorAll('.splide__slide');
  if (slides.length <= 1) return;

  const rtl = root.dataset.rtl === '1';
  const autoplay = root.dataset.splideAutoplay === '1';
  const interval = parseInt(root.dataset.splideInterval || '5000', 10);
  const arrows = root.dataset.splideArrows === '1';
  const carouselDesktop = root.dataset.splideCarouselDesktop === '1';

  const opts = {
    type: 'loop',
    speed: 1000,
    pagination: false,
    arrows,
    direction: rtl ? 'rtl' : 'ltr',
    autoplay: autoplay
      ? {
          interval,
          pauseOnHover: true,
        }
      : false,
  };

  if (!carouselDesktop) {
    opts.mediaQuery = 'min';
    opts.breakpoints = {
      768: {
        destroy: true,
      },
    };
  }

  const splide = new Splide(el, opts);
  splide.mount();
}

function initCoupons(root) {
  root.querySelectorAll('[data-coupon-copy]').forEach((btn) => {
    const code = btn.getAttribute('data-coupon-copy') || '';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code);
        btn.classList.add('is-copied');
        setTimeout(() => btn.classList.remove('is-copied'), 2000);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.classList.add('is-copied');
        setTimeout(() => btn.classList.remove('is-copied'), 2000);
      }
    });
  });
}

export function initAnnouncement() {
  const bar = document.getElementById('announcement-bar');
  if (!bar) return;

  const setBarHeight = () => {
    document.documentElement.style.setProperty('--announcement-bar-height', `${bar.offsetHeight}px`);
  };
  setBarHeight();
  window.addEventListener('resize', setBarHeight);

  initSplide(bar);
  bar.querySelectorAll('.announcement-bar__inline-countdown').forEach(tickCountdown);
  initCoupons(bar);

  const closeBtn = document.getElementById('announcement-bar-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      bar.style.display = 'none';
      document.body.classList.add('announcement-bar-hidden');
      const header = document.getElementById('nr-header');
      if (header) header.classList.remove('nr-header--with-announcement');
      document.documentElement.style.removeProperty('--announcement-bar-height');
    });
  }
}

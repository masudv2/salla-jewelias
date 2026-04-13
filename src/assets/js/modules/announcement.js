export function initAnnouncement() {
  const bar = document.getElementById('nr-announcement');
  if (!bar) return;

  // Close button
  const closeBtn = document.getElementById('nr-announcement-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      bar.style.display = 'none';
      document.body.classList.add('nr-announcement-closed');
      const header = document.getElementById('nr-header');
      if (header) header.classList.remove('nr-header--has-announcement');
    });
  }

  // Countdown
  const cdTarget = bar.dataset.cdTarget;
  if (cdTarget) {
    const end = new Date(cdTarget).getTime();
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, end - now);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = (n) => String(n).padStart(2, '0');
      const set = (sel, val) => {
        const el = bar.querySelector(`[data-cd="${sel}"]`);
        if (el) el.textContent = pad(val);
      };
      set('d', d);
      set('h', h);
      set('m', m);
      set('s', s);
    };
    update();
    setInterval(update, 1000);
  }

  // Slider mode
  const slider = document.getElementById('nr-ann-slider');
  const prev = document.getElementById('nr-ann-prev');
  const next = document.getElementById('nr-ann-next');
  if (slider) {
    const slides = slider.querySelectorAll('.nr-announcement__slide');
    if (slides.length <= 1) return;
    let current = 0;
    const show = (i) => {
      current = ((i % slides.length) + slides.length) % slides.length;
      slides.forEach((s, idx) => {
        s.style.display = idx === current ? '' : 'none';
      });
    };
    show(0);
    if (prev) prev.addEventListener('click', () => show(current - 1));
    if (next) next.addEventListener('click', () => show(current + 1));
    setInterval(() => show(current + 1), 5000);
  }
}

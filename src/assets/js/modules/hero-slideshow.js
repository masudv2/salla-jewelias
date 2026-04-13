export function initHeroSlideshow() {
  const hero = document.querySelector('[data-nr-hero]');
  if (!hero) return;

  const slides = hero.querySelectorAll('.nr-hero__slide');
  if (slides.length <= 1) return;

  const counterEl = hero.querySelector('.nr-hero__counter-current');
  const progressBar = document.getElementById('nr-hero-progress');
  const prevBtn = document.getElementById('nr-hero-prev');
  const nextBtn = document.getElementById('nr-hero-next');
  const speed = parseInt(hero.dataset.slideSpeed, 10) || 6000;

  let current = 0;
  let timer = null;
  let progressStart = null;
  let progressRaf = null;

  function animateProgress(ts) {
    if (!progressStart) progressStart = ts;
    const pct = Math.min(((ts - progressStart) / speed) * 100, 100);
    if (progressBar) progressBar.style.width = pct + '%';
    if (pct < 100) progressRaf = requestAnimationFrame(animateProgress);
  }

  function resetProgress() {
    progressStart = null;
    if (progressBar) progressBar.style.width = '0%';
    if (progressRaf) cancelAnimationFrame(progressRaf);
    progressRaf = requestAnimationFrame(animateProgress);
  }

  function goTo(next) {
    next = ((next % slides.length) + slides.length) % slides.length;
    if (next === current) return;
    slides[current].classList.remove('is-active');
    current = next;
    slides[current].classList.add('is-active');
    if (counterEl) counterEl.textContent = String(current + 1).padStart(2, '0');
    resetProgress();
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), speed);
    resetProgress();
  }

  startAuto();

  if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(timer); goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(timer); goTo(current + 1); startAuto(); });

  // Touch swipe
  let touchX = 0;
  hero.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      clearInterval(timer);
      goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }
  }, { passive: true });
}

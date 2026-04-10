export function initHeroSlideshow() {
  const hero = document.querySelector('[data-nr-hero]');
  if (!hero) return;

  const slides = hero.querySelectorAll('[data-nr-slide]');
  const dots = hero.querySelectorAll('[data-nr-dot]');
  const prevBtn = hero.querySelector('[data-nr-prev]');
  const nextBtn = hero.querySelector('[data-nr-next]');
  const autoplaySpeed = parseInt(hero.dataset.nrAutoplay, 10) || 5000;

  if (slides.length < 2) return;

  let current = 0;
  let autoplayId = null;

  function goTo(index) {
    slides[current].classList.remove('is-active');
    if (dots[current]) dots[current].classList.remove('is-active');

    current = ((index % slides.length) + slides.length) % slides.length;

    slides[current].classList.add('is-active');
    if (dots[current]) dots[current].classList.add('is-active');
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(() => goTo(current + 1), autoplaySpeed);
  }

  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
  });

  hero.addEventListener('mouseenter', stopAutoplay);
  hero.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

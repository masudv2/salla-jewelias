export function initHeroSlideshow() {
  const hero = document.querySelector('[data-nr-hero]');
  if (!hero) return;

  const slider = hero.querySelector('#nr-hero-slider');
  const counter = hero.querySelector('.nr-hero__counter-current');
  if (!slider || !counter) return;

  slider.addEventListener('salla-slider::moved', (e) => {
    const index = e.detail?.index ?? 0;
    counter.textContent = String(index + 1).padStart(2, '0');
  });
}

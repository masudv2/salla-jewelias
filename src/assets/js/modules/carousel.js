export function initCarousels() {
  document.querySelectorAll('[data-nr-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.nr-carousel__track');
    const slides = carousel.querySelectorAll('.nr-carousel__slide');
    const prevBtn = carousel.querySelector('[data-nr-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-nr-carousel-next]');
    const dots = carousel.querySelectorAll('[data-nr-carousel-dot]');
    const autoplaySpeed = parseInt(carousel.dataset.nrCarousel, 10) || 5000;

    if (!track || slides.length === 0) return;

    let current = 0;
    let autoplayId = null;
    let slidesPerView = window.innerWidth >= 769 ? 3 : 1;

    function getMaxIndex() {
      return Math.max(0, slides.length - slidesPerView);
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, getMaxIndex()));
      const offset = -(current * (100 / slidesPerView));
      track.style.transform = `translateX(${offset}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
      });
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayId = setInterval(() => {
        goTo(current >= getMaxIndex() ? 0 : current + 1);
      }, autoplaySpeed);
    }

    function stopAutoplay() {
      if (autoplayId) clearInterval(autoplayId);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    window.addEventListener('resize', () => {
      slidesPerView = window.innerWidth >= 769 ? 3 : 1;
      goTo(current);
    });

    startAutoplay();
  });
}

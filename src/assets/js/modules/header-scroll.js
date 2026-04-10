export function initHeaderScroll() {
  const header = document.getElementById('nr-header');
  if (!header || !header.classList.contains('nr-header--transparent')) return;

  const hero = document.querySelector('[data-nr-hero]');
  if (!hero) {
    header.classList.add('nr-header--solid');
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        header.classList.remove('nr-header--solid');
      } else {
        header.classList.add('nr-header--solid');
      }
    },
    { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
  );

  observer.observe(hero);
}

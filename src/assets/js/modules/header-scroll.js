export function initHeaderScroll() {
  const header = document.getElementById('nr-header');
  if (!header) return;

  const announcement = document.getElementById('nr-announcement');

  // Offset transparent header when announcement bar is visible
  if (announcement && header.classList.contains('nr-header--transparent')) {
    header.classList.add('nr-header--has-announcement');
  }

  // If not transparent, no hero-based scroll logic needed
  if (!header.classList.contains('nr-header--transparent')) return;

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

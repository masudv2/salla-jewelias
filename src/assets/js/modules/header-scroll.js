export function initHeaderScroll() {
  const header = document.getElementById('nr-header');
  if (!header) return;

  const announcement = document.getElementById('announcement-bar');

  if (announcement && header.classList.contains('nr-header--transparent')) {
    header.classList.add('nr-header--with-announcement');
    const h = announcement.offsetHeight;
    document.documentElement.style.setProperty('--announcement-bar-height', `${h}px`);
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

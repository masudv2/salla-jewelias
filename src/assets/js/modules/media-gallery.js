export function initMediaGallery() {
  document.querySelectorAll('[data-nr-gallery]').forEach(gallery => {
    const main = gallery.querySelector('[data-nr-gallery-main]');
    const caption = gallery.querySelector('[data-nr-gallery-caption]');
    const thumbs = gallery.querySelectorAll('[data-nr-gallery-thumb]');

    if (!main || !thumbs.length) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('is-active'));
        thumb.classList.add('is-active');

        main.style.opacity = '0';
        setTimeout(() => {
          main.src = thumb.dataset.src;
          if (caption) caption.textContent = thumb.dataset.caption || '';
          main.style.opacity = '1';
        }, 200);
      });
    });
  });
}

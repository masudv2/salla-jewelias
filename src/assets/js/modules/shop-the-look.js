export function initShopTheLook() {
  document.querySelectorAll('[data-nr-shop-look]').forEach(container => {
    const pins = container.querySelectorAll('[data-nr-pin]');
    const popups = container.querySelectorAll('[data-nr-popup]');

    pins.forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = pin.dataset.nrPin;
        const popup = container.querySelector(`[data-nr-popup="${idx}"]`);
        const wasActive = popup.classList.contains('is-active');

        popups.forEach(p => p.classList.remove('is-active'));

        if (!wasActive && popup) {
          popup.style.left = pin.style.left;
          popup.style.top = pin.style.top;
          popup.classList.add('is-active');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-nr-shop-look]')) {
        popups.forEach(p => p.classList.remove('is-active'));
      }
    });
  });
}

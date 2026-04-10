export function initMarquees() {
  document.querySelectorAll('[data-nr-marquee]').forEach((marquee) => {
    const track = marquee.querySelector('.nr-marquee__track');
    if (!track) return;

    if (!track.dataset.nrCloned) {
      track.innerHTML += track.innerHTML;
      track.dataset.nrCloned = 'true';
    }
  });
}

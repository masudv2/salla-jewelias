export function initCountdowns() {
  document.querySelectorAll('[data-nr-countdown]').forEach((el) => {
    const target = el.dataset.nrCountdownTarget;
    if (!target) return;
    const end = new Date(target).getTime();
    const pad = (n) => String(n).padStart(2, '0');

    const update = () => {
      const diff = Math.max(0, end - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const set = (sel, val) => {
        const node = el.querySelector(`[data-nr-${sel}]`);
        if (node) node.textContent = pad(val);
      };
      set('days', d);
      set('hours', h);
      set('minutes', m);
      set('seconds', s);
    };
    update();
    setInterval(update, 1000);
  });
}

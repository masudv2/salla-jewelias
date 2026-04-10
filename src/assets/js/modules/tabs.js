export function initTabs() {
  document.querySelectorAll('[data-nr-tabs]').forEach((container) => {
    const tabs = container.querySelectorAll('[data-nr-tab]');
    const panels = container.querySelectorAll('[data-nr-panel]');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.nrTab;

        tabs.forEach((t) => t.classList.remove('is-active'));
        panels.forEach((p) => p.classList.remove('is-active'));

        tab.classList.add('is-active');
        const panel = container.querySelector(`[data-nr-panel="${target}"]`);
        if (panel) panel.classList.add('is-active');
      });
    });
  });
}

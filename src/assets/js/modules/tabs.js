export function initTabs() {
  document.querySelectorAll('[data-nr-tabs]').forEach((container) => {
    const tabs = Array.from(container.querySelectorAll('[data-nr-tab]'));
    const panels = Array.from(container.querySelectorAll('[data-nr-panel]'));

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('is-active'));
        panels.forEach((p) => p.classList.remove('is-active'));

        tab.classList.add('is-active');

        const target = tab.dataset.nrTab;
        const panel = target
          ? container.querySelector(`[data-nr-panel="${target}"]`)
          : panels[index];
        if (panel) panel.classList.add('is-active');
      });
    });
  });

  // Legacy tab system (data-target/data-component-id pattern)
  document.querySelectorAll('.nr-tab[data-target]').forEach((tab) => {
    tab.addEventListener('click', () => {
      const componentId = tab.dataset.componentId;
      const targetId = tab.dataset.target;
      const wrapper = componentId ? document.getElementById(componentId) : tab.closest('section');
      if (!wrapper) return;

      wrapper.querySelectorAll('.nr-tab').forEach((t) => t.classList.remove('is-active'));
      wrapper.querySelectorAll('.tabs__item').forEach((p) => p.classList.remove('is-active'));

      tab.classList.add('is-active');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('is-active');
    });
  });
}

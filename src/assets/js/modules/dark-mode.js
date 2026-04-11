export function initDarkMode() {
  const html = document.documentElement;
  const mode = html.getAttribute('data-theme');

  if (mode === 'auto') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      html.dataset.themeResolved = mq.matches ? 'dark' : 'light';
    };
    apply();
    mq.addEventListener('change', apply);
  }
}

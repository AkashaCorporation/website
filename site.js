(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-nav');
  if (toggle && menu) {
    toggle.hidden = false;
    document.documentElement.classList.add('has-menu');
    const close = (returnFocus = false) => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => {
      const opening = toggle.getAttribute('aria-expanded') !== 'true';
      menu.hidden = !opening;
      toggle.setAttribute('aria-expanded', String(opening));
    });
    menu.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !menu.hidden) close(true);
    });
    document.addEventListener('click', (event) => {
      if (!menu.hidden && !event.target.closest('.header')) close();
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', (event) => { if (event.matches) close(); });
    window.addEventListener('pageshow', () => close());
    window.addEventListener('hashchange', () => close());
  }

  const copy = document.querySelector('[data-copy-email]');
  const status = document.querySelector('.copy-status');
  if (copy && status && navigator.clipboard?.writeText) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copy.dataset.copyEmail);
        status.textContent = copy.dataset.copied;
      } catch {
        status.textContent = copy.dataset.failed;
      }
    });
  }
})();

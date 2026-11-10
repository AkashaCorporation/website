(() => {
  'use strict';

  const root = document.documentElement;
  let language = root.dataset.defaultLanguage === 'pt' ? 'pt' : 'en';

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'pt' ? 'pt' : 'en';
    root.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-language-copy]').forEach(element => {
      element.hidden = element.dataset.languageCopy !== language;
    });
    document.querySelectorAll('[data-language-option]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.languageOption === language));
    });
    document.querySelectorAll('[data-label-en][data-label-pt]').forEach(element => {
      element.setAttribute('aria-label', language === 'pt' ? element.dataset.labelPt : element.dataset.labelEn);
    });
    document.querySelectorAll('[data-option-en][data-option-pt]').forEach(option => {
      option.textContent = language === 'pt' ? option.dataset.optionPt : option.dataset.optionEn;
    });
    document.querySelectorAll('[data-title-en][data-title-pt]').forEach(element => {
      element.title = language === 'pt' ? element.dataset.titlePt : element.dataset.titleEn;
    });
    if (document.body?.dataset.titleEn) {
      document.title = language === 'pt' ? document.body.dataset.titlePt : document.body.dataset.titleEn;
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = language === 'pt' ? document.body.dataset.descriptionPt : document.body.dataset.descriptionEn;
    }
  }

  document.querySelectorAll('[data-language-option]').forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.languageOption));
  });
  setLanguage(language);

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-nav');
  const closeMenu = (restoreFocus = false) => {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menuToggle.focus();
  };
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
      mobileMenu.hidden = !opening;
      menuToggle.setAttribute('aria-expanded', String(opening));
    });
    mobileMenu.addEventListener('click', event => {
      if (event.target.closest('a,button')) closeMenu();
    });
    document.addEventListener('click', event => {
      if (!mobileMenu.hidden && !event.target.closest('.site-header')) closeMenu();
    });
    window.matchMedia('(min-width: 1041px)').addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
  }

  const dialog = document.querySelector('#access-modal');
  let modalTrigger = null;
  document.querySelectorAll('[data-modal-open]').forEach(button => {
    button.addEventListener('click', () => {
      if (!dialog) return;
      modalTrigger = button;
      dialog.dataset.requestType = button.dataset.modalOpen || 'enterprise';
      dialog.showModal();
      dialog.querySelector('input')?.focus();
    });
  });
  if (dialog) {
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => modalTrigger?.focus());
    dialog.querySelector('.modal-close')?.addEventListener('click', () => dialog.close());
  }

  const accessForm = document.querySelector('[data-access-form]');
  if (accessForm) {
    accessForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!accessForm.reportValidity()) return;
      const values = new FormData(accessForm);
      const requestType = dialog?.dataset.requestType === 'api' ? 'API waitlist' : 'Enterprise early access';
      const subject = `[Akasha ${requestType}] ${values.get('company')}`;
      const body = [
        `Request type: ${requestType}`,
        `Name: ${values.get('name')}`,
        `Company: ${values.get('company')}`,
        `Work email: ${values.get('email')}`,
        `Deployment: ${values.get('deployment')}`,
        '',
        'Technical use case:',
        values.get('useCase'),
      ].join('\n');
      window.location.href = `mailto:lukas@akashacorporation.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = accessForm.querySelector('.form-status');
      if (status) status.textContent = language === 'pt' ? 'Solicitação preparada no seu cliente de e-mail.' : 'Request prepared in your email client.';
    });
  }

  const terminalLines = [...document.querySelectorAll('[data-terminal-line]')];
  const replay = document.querySelector('[data-terminal-replay]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers = [];
  function replayTrace() {
    timers.forEach(timer => window.clearTimeout(timer));
    timers = [];
    terminalLines.forEach(line => line.classList.toggle('line-visible', reducedMotion));
    if (reducedMotion) return;
    terminalLines.forEach((line, index) => {
      timers.push(window.setTimeout(() => line.classList.add('line-visible'), 180 + index * 330));
    });
  }
  replay?.addEventListener('click', replayTrace);
  replayTrace();

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (dialog?.open) dialog.close();
      else closeMenu(true);
    }
  });
  window.addEventListener('pageshow', () => closeMenu());
  window.addEventListener('hashchange', () => closeMenu());
})();

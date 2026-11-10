import { mkdir, writeFile } from 'node:fs/promises';
import { company, content } from './content.mjs';

const root = new URL('../', import.meta.url);
const domain = 'https://akashacorporation.com';
const hexcore = `${company.github}/HikariSystem-HexCore`;
const helix = `${company.github}/HexCore-Helix`;
const souper = `${company.github}/hexcore-souper`;
const bari = `${company.github}/Bari`;

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const clean = value => value.replace(/[ \t]+$/gm, '');
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const external = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const closeIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
const playIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z"/></svg>';

function pair(en, pt, defaultLanguage, options = {}) {
  const tag = options.tag ?? 'span';
  const className = options.className ? ` class="${options.className}"` : '';
  const enText = options.html ? en : escape(en);
  const ptText = options.html ? pt : escape(pt);
  return `<${tag}${className} data-language-copy="en"${defaultLanguage === 'en' ? '' : ' hidden'}>${enText}</${tag}><${tag}${className} data-language-copy="pt"${defaultLanguage === 'pt' ? '' : ' hidden'}>${ptText}</${tag}>`;
}

function head(defaultLanguage, route = '/', options = {}) {
  const c = content[defaultLanguage];
  const canonical = options.canonical ?? route;
  const alternateEn = options.alternateEn ?? '/';
  const alternatePt = options.alternatePt ?? '/pt-br/';
  const title = options.title ?? c.title;
  const description = options.description ?? c.description;
  return `<!doctype html>
<html lang="${c.lang}" data-default-language="${defaultLanguage}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <meta name="theme-color" content="#07090e">
  <meta name="color-scheme" content="dark">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  ${options.noindex ? '<meta name="robots" content="noindex">' : ''}
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests">
  <link rel="canonical" href="${domain}${canonical}">
  <link rel="alternate" hreflang="en" href="${domain}${alternateEn}">
  <link rel="alternate" hreflang="pt-BR" href="${domain}${alternatePt}">
  <link rel="alternate" hreflang="x-default" href="${domain}${alternateEn}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="AkashaCorporation">
  <meta property="og:locale" content="${defaultLanguage === 'pt' ? 'pt_BR' : 'en_US'}">
  <meta property="og:locale:alternate" content="${defaultLanguage === 'pt' ? 'en_US' : 'pt_BR'}">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${domain}${canonical}">
  <meta property="og:image" content="${domain}/Akasha.png">
  <meta property="og:image:alt" content="AkashaCorporation geometric dragon mark">
  <meta name="twitter:card" content="summary">
  <link rel="icon" type="image/png" href="/Akasha.png">
  <link rel="stylesheet" href="/styles.css">
  <script src="/site.js" defer></script>
</head>`;
}

function languageSwitch(defaultLanguage) {
  return `<div class="language-switch" role="group" aria-label="${defaultLanguage === 'pt' ? 'Seletor de idioma' : 'Language selector'}" data-label-en="Language selector" data-label-pt="Seletor de idioma">
    <button type="button" data-language-option="en" aria-pressed="${defaultLanguage === 'en'}">EN</button>
    <span aria-hidden="true">/</span>
    <button type="button" data-language-option="pt" aria-pressed="${defaultLanguage === 'pt'}">PT-BR</button>
  </div>`;
}

function header(defaultLanguage, legal = false) {
  const en = content.en; const pt = content.pt;
  const home = defaultLanguage === 'pt' ? '/pt-br/' : '/';
  const links = ['products', 'sovereign', 'architecture', 'research', 'roadmap'];
  return `<a class="skip-link" href="#main">${pair(en.skip, pt.skip, defaultLanguage)}</a>
<header class="site-header" id="top">
  <div class="shell header-inner">
    <a class="brand" href="${home}" aria-label="${defaultLanguage === 'pt' ? 'Início da AkashaCorporation' : 'AkashaCorporation home'}" data-label-en="AkashaCorporation home" data-label-pt="Início da AkashaCorporation">
      <img src="/Akasha.png" alt="" width="44" height="44">
      <span class="brand-name">AKASHA<span>CORPORATION</span></span>
      <span class="brand-badge">AI &amp; SEC R&amp;D</span>
    </a>
    ${legal ? '' : `<nav class="desktop-nav" aria-label="Primary navigation">${links.map((id, index) => `<a href="#${id}">${pair(en.nav[index], pt.nav[index], defaultLanguage)}</a>`).join('')}</nav>`}
    <div class="header-actions">
      ${languageSwitch(defaultLanguage)}
      <button class="button button-quiet header-console" type="button" data-modal-open="api">${pair(en.api, pt.api, defaultLanguage)}</button>
      ${legal ? '' : `<button class="menu-toggle icon-button" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="${defaultLanguage === 'pt' ? 'Abrir menu' : 'Open menu'}" data-label-en="Open menu" data-label-pt="Abrir menu">${pair(en.menu, pt.menu, defaultLanguage, {className:'sr-only'})}<span aria-hidden="true"><i></i><i></i></span></button>`}
    </div>
  </div>
  ${legal ? '' : `<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>${links.map((id, index) => `<a href="#${id}">${pair(en.nav[index], pt.nav[index], defaultLanguage)}${arrow}</a>`).join('')}<button type="button" data-modal-open="enterprise">${pair(en.enterprise, pt.enterprise, defaultLanguage)}${arrow}</button></nav>`}
</header>`;
}

function hero(defaultLanguage) {
  const en = content.en; const pt = content.pt;
  return `<section class="hero" aria-labelledby="hero-title">
    <div class="shell hero-layout">
      <div class="hero-copy">
        <p class="eyebrow"><span class="live-dot" aria-hidden="true"></span>${pair(en.heroBadge, pt.heroBadge, defaultLanguage)}</p>
        <p class="hero-brand">AKASHA / AI × SECURITY</p>
        <h1 id="hero-title">${pair(en.heroTitle, pt.heroTitle, defaultLanguage)}</h1>
        <p class="hero-intro">${pair(en.heroText, pt.heroText, defaultLanguage)}</p>
        <div class="hero-actions">
          <button class="button button-primary" type="button" data-modal-open="api">${pair(en.primary, pt.primary, defaultLanguage)}${arrow}</button>
          <a class="button button-secondary" href="#architecture">${pair(en.secondary, pt.secondary, defaultLanguage)}${arrow}</a>
        </div>
        <ul class="proof-row">${en.proof.map((item, index) => `<li><span aria-hidden="true">✓</span>${pair(item, pt.proof[index], defaultLanguage)}</li>`).join('')}</ul>
      </div>
      <div class="terminal" aria-label="${defaultLanguage === 'pt' ? 'Trace ilustrativo de análise de segurança' : 'Illustrative security analysis trace'}" data-label-en="Illustrative security analysis trace" data-label-pt="Trace ilustrativo de análise de segurança">
      <div class="terminal-bar"><span class="terminal-lights" aria-hidden="true"><i></i><i></i><i></i></span><span>akasha://research/trace</span><span class="terminal-mode">${pair('READ ONLY','SOMENTE LEITURA',defaultLanguage)}</span></div>
        <div class="terminal-meta"><span>${pair(en.terminal.label, pt.terminal.label, defaultLanguage)}</span><span>${en.terminal.target}</span></div>
        <div class="terminal-command"><span>$</span> bari analyze --engine hexcore --prove lifetime</div>
        <ol class="terminal-lines">${en.terminal.lines.map((line, index) => `<li data-terminal-line><span class="line-index">0${index + 1}</span><strong>${line[0]}</strong><span>${pair(line[1], pt.terminal.lines[index][1], defaultLanguage)}</span><em class="state-${line[2]}">${line[2] === 'ok' ? 'PASS' : 'SAT'}</em></li>`).join('')}</ol>
        <div class="terminal-footer"><span>${pair(en.terminal.footer, pt.terminal.footer, defaultLanguage)}</span><button class="icon-command" type="button" data-terminal-replay title="${defaultLanguage === 'pt' ? 'Repetir trace' : 'Replay trace'}" data-title-en="Replay trace" data-title-pt="Repetir trace">${playIcon}${pair(en.terminal.replay, pt.terminal.replay, defaultLanguage, {className:'sr-only'})}</button></div>
      </div>
    </div>
    <div class="hero-rail shell"><span>AKASHA CORPORATION INOVA SIMPLES</span><span>${pair('PARANÁ · BRAZIL','PARANÁ · BRASIL',defaultLanguage)}</span><span>${pair('PRODUCT STARTUP · AI FIRST','STARTUP DE PRODUTO · AI FIRST',defaultLanguage)}</span></div>
  </section>`;
}

function products(defaultLanguage) {
  const en = content.en; const pt = content.pt;
  const links = [
    {href:'#architecture', external:false},
    {href:hexcore, external:true},
    {href:bari, external:true},
  ];
  return `<section class="section products" id="products" aria-labelledby="products-title"><div class="shell">
    <div class="section-heading"><div><p class="eyebrow">${pair(en.sectionProducts, pt.sectionProducts, defaultLanguage)}</p><h2 id="products-title">${pair(en.productsTitle, pt.productsTitle, defaultLanguage)}</h2></div><p>${pair(en.productsIntro, pt.productsIntro, defaultLanguage)}</p></div>
    <div class="product-grid">${en.products.map((product, index) => { const translated = pt.products[index]; return `<article class="product" id="${product.id}">
      <div class="product-head"><span>${product.index}</span><span class="status-label">${pair(product.status, translated.status, defaultLanguage)}</span></div>
      <h3>${product.name}</h3><p class="product-role">${pair(product.role, translated.role, defaultLanguage)}</p>
      <p class="product-text">${pair(product.text, translated.text, defaultLanguage)}</p>
      <ul class="feature-list">${product.features.map((feature, featureIndex) => `<li><span aria-hidden="true">+</span>${pair(feature, translated.features[featureIndex], defaultLanguage)}</li>`).join('')}</ul>
      <div class="tag-list">${product.tags.map((tag, tagIndex) => `<span>${pair(tag, translated.tags[tagIndex], defaultLanguage)}</span>`).join('')}</div>
      <p class="product-note">${pair(product.note, translated.note, defaultLanguage)}</p>
      ${index === 0 ? `<button class="product-link" type="button" data-modal-open="model">${pair(en.productLinks[index], pt.productLinks[index], defaultLanguage)}${arrow}</button>` : `<a class="product-link" href="${links[index].href}">${pair(en.productLinks[index], pt.productLinks[index], defaultLanguage)}${external}</a>`}
    </article>`; }).join('')}</div>
  </div></section>`;
}

function architecture(defaultLanguage) {
  const en = content.en; const pt = content.pt;
  return `<section class="section architecture" id="architecture" aria-labelledby="architecture-title"><div class="shell">
    <div class="section-heading"><div><p class="eyebrow">${pair(en.architectureLabel, pt.architectureLabel, defaultLanguage)}</p><h2 id="architecture-title">${pair(en.architectureTitle, pt.architectureTitle, defaultLanguage)}</h2></div><p>${pair(en.architectureIntro, pt.architectureIntro, defaultLanguage)}</p></div>
    <ol class="pipeline">${en.pipeline.map((step, index) => { const translated = pt.pipeline[index]; return `<li><div class="pipeline-index">${step.n}</div><div><span class="pipeline-stage">${pair(step.stage, translated.stage, defaultLanguage)}</span><h3>${pair(step.title, translated.title, defaultLanguage)}</h3><p>${pair(step.text, translated.text, defaultLanguage)}</p></div></li>`; }).join('')}</ol>
    <div class="cloud-targets">${en.cloudTargets.map((target, index) => `<div><span>${pair(target[0],pt.cloudTargets[index][0],defaultLanguage)}</span><strong>${pair(target[1],pt.cloudTargets[index][1],defaultLanguage)}</strong></div>`).join('')}</div>
    <p class="architecture-note"><span aria-hidden="true">i</span>${pair(en.architectureNote, pt.architectureNote, defaultLanguage)}</p>
  </div></section>`;
}

function research(defaultLanguage) {
  const en = content.en; const pt = content.pt;
  const refs = [helix, souper, `${company.github}/HikariSystem-HexCore/tree/main/docs`];
  return `<section class="section research" id="research" aria-labelledby="research-title"><div class="shell">
    <div class="section-heading"><div><p class="eyebrow">${pair(en.researchLabel, pt.researchLabel, defaultLanguage)}</p><h2 id="research-title">${pair(en.researchTitle, pt.researchTitle, defaultLanguage)}</h2></div><p>${pair(en.researchIntro, pt.researchIntro, defaultLanguage)}</p></div>
    <div class="research-layout"><article class="security-record"><span class="record-mark">VR / 01</span><h3>${pair(en.securityTitle, pt.securityTitle, defaultLanguage)}</h3><p>${pair(en.securityText, pt.securityText, defaultLanguage)}</p><ul>${en.programs.map(program => `<li><span aria-hidden="true">◇</span>${program}</li>`).join('')}</ul><p class="program-note">${pair(en.programNote, pt.programNote, defaultLanguage)}</p></article>
    <div class="preprints"><h3>${pair(en.preprintTitle, pt.preprintTitle, defaultLanguage)}</h3>${en.preprints.map((preprint, index) => `<a href="${refs[index]}"><span>0${index + 1}</span><div><strong>${preprint[0]}</strong><p>${pair(preprint[1], pt.preprints[index][1], defaultLanguage)}</p></div>${external}</a>`).join('')}</div></div>
  </div></section>`;
}

function roadmap(defaultLanguage) {
  const en = content.en; const pt = content.pt;
  return `<section class="section roadmap" id="roadmap" aria-labelledby="roadmap-title"><div class="shell">
    <div class="section-heading"><div><p class="eyebrow">${pair(en.roadmapLabel, pt.roadmapLabel, defaultLanguage)}</p><h2 id="roadmap-title">${pair(en.roadmapTitle, pt.roadmapTitle, defaultLanguage)}</h2></div><p>${pair(en.roadmapIntro, pt.roadmapIntro, defaultLanguage)}</p></div>
    <ol class="roadmap-list">${en.roadmap.map((item, index) => { const translated = pt.roadmap[index]; return `<li><div class="roadmap-period">${item.period}</div><div class="roadmap-body"><span>${pair(item.status, translated.status, defaultLanguage)}</span><h3>${pair(item.title, translated.title, defaultLanguage)}</h3><p>${pair(item.text, translated.text, defaultLanguage)}</p></div></li>`; }).join('')}</ol>
  </div></section>`;
}

function accessSection(defaultLanguage) {
  const en = content.en; const pt = content.pt;
  return `<section class="access" id="access" aria-labelledby="access-title"><div class="shell access-inner"><div><p class="eyebrow">${pair(en.ctaLabel, pt.ctaLabel, defaultLanguage)}</p><h2 id="access-title">${pair(en.ctaTitle, pt.ctaTitle, defaultLanguage)}</h2></div><div><p>${pair(en.ctaText, pt.ctaText, defaultLanguage)}</p><div class="access-actions"><button class="button button-light" type="button" data-modal-open="enterprise">${pair(en.ctaPrimary, pt.ctaPrimary, defaultLanguage)}${arrow}</button><button class="button button-outline-light" type="button" data-modal-open="api">${pair(en.ctaSecondary, pt.ctaSecondary, defaultLanguage)}</button></div></div></div></section>`;
}

function footer(defaultLanguage) {
  const en = content.en; const pt = content.pt;
  const home = defaultLanguage === 'pt' ? '/pt-br/' : '/';
  const legalPrefix = defaultLanguage === 'pt' ? '/pt-br/' : '/';
  const legalLinks = [`${legalPrefix}privacy.html`,`${legalPrefix}terms.html`,`${legalPrefix}ethical-use.html`];
  return `<footer class="footer"><div class="shell">
    <div class="footer-primary"><div><a class="footer-brand" href="${home}">AKASHA<span>CORPORATION</span></a><p>${pair(en.footerPitch, pt.footerPitch, defaultLanguage)}</p></div><div class="footer-contact"><a href="mailto:${company.email}">${company.email}</a><a href="${company.github}">${pair(en.github, pt.github, defaultLanguage)}${external}</a></div></div>
    <div class="legal-identity"><div><span>LEGAL ENTITY</span><strong>${company.legalName}</strong></div><div><span>CNPJ</span><strong>${company.taxId}</strong></div><div><span>LOCATION</span><strong>${pair(en.legalLocation, pt.legalLocation, defaultLanguage)}</strong></div></div>
    <div class="footer-bottom"><span>© ${new Date().getUTCFullYear()} Akasha Corporation</span><nav>${legalLinks.map((href, index) => `<a href="${href}">${pair(en.footerLinks[index], pt.footerLinks[index], defaultLanguage)}</a>`).join('')}</nav><a href="#top" aria-label="Back to top">↑</a></div>
  </div></footer>`;
}

function modal(defaultLanguage) {
  const en = content.en.modal; const pt = content.pt.modal;
  return `<dialog class="access-modal" id="access-modal" aria-labelledby="modal-title"><form method="dialog" class="modal-shell" data-access-form>
    <button class="modal-close icon-button" value="cancel" aria-label="${escape(en.cancel)}" data-label-en="${escape(en.cancel)}" data-label-pt="${escape(pt.cancel)}">${closeIcon}</button>
    <p class="eyebrow">${pair(en.eyebrow, pt.eyebrow, defaultLanguage)}</p><h2 id="modal-title">${pair(en.title, pt.title, defaultLanguage)}</h2><p class="modal-intro">${pair(en.text, pt.text, defaultLanguage)}</p>
    <div class="form-grid"><label>${pair(en.name, pt.name, defaultLanguage)}<input name="name" autocomplete="name" required></label><label>${pair(en.company, pt.company, defaultLanguage)}<input name="company" autocomplete="organization" required></label><label class="full">${pair(en.email, pt.email, defaultLanguage)}<input name="email" type="email" autocomplete="email" required></label><label class="full">${pair(en.useCase, pt.useCase, defaultLanguage)}<textarea name="useCase" rows="4" required></textarea></label><label class="full">${pair(en.deployment, pt.deployment, defaultLanguage)}<select name="deployment">${en.deploymentOptions.map((option, index) => `<option value="${escape(option)}" data-option-en="${escape(option)}" data-option-pt="${escape(pt.deploymentOptions[index])}">${escape(defaultLanguage === 'pt' ? pt.deploymentOptions[index] : option)}</option>`).join('')}</select></label></div>
    <p class="modal-privacy">${pair(en.privacy, pt.privacy, defaultLanguage)}</p><button class="button button-primary modal-submit" type="submit">${pair(en.submit, pt.submit, defaultLanguage)}${arrow}</button><p class="form-status" role="status" aria-live="polite"></p>
  </form></dialog>`;
}

function home(defaultLanguage, route) {
  const c = content[defaultLanguage];
  return `${head(defaultLanguage, route)}
<body data-title-en="${escape(content.en.title)}" data-title-pt="${escape(content.pt.title)}" data-description-en="${escape(content.en.description)}" data-description-pt="${escape(content.pt.description)}">
${header(defaultLanguage)}<main id="main">${hero(defaultLanguage)}${products(defaultLanguage)}${architecture(defaultLanguage)}${research(defaultLanguage)}${roadmap(defaultLanguage)}${accessSection(defaultLanguage)}</main>${footer(defaultLanguage)}${modal(defaultLanguage)}</body></html>\n`;
}

function legalPage(defaultLanguage, type, route) {
  const en = content.en; const pt = content.pt;
  const titleKey = `${type}Title`; const introKey = `${type}Intro`; const sectionsKey = `${type}Sections`;
  const filename = route.split('/').at(-1);
  const alternateEn = `/${filename}`;
  const alternatePt = `/pt-br/${filename}`;
  const home = defaultLanguage === 'pt' ? '/pt-br/' : '/';
  const enTitle = `${en.legal[titleKey]} | AkashaCorporation`;
  const ptTitle = `${pt.legal[titleKey]} | AkashaCorporation`;
  return `${head(defaultLanguage, route, {title:defaultLanguage === 'pt' ? ptTitle : enTitle, description:content[defaultLanguage].legal[introKey], alternateEn, alternatePt})}
<body data-title-en="${escape(enTitle)}" data-title-pt="${escape(ptTitle)}" data-description-en="${escape(en.legal[introKey])}" data-description-pt="${escape(pt.legal[introKey])}">${header(defaultLanguage, true)}<main id="main" class="legal shell"><a class="back-link" href="${home}">← ${pair(en.legal.home, pt.legal.home, defaultLanguage)}</a><p class="eyebrow">AKASHA / LEGAL</p><h1>${pair(en.legal[titleKey], pt.legal[titleKey], defaultLanguage)}</h1><p class="legal-intro">${pair(en.legal[introKey], pt.legal[introKey], defaultLanguage)}</p>${en.legal[sectionsKey].map((section, index) => `<section><span>0${index + 1}</span><div><h2>${pair(section[0], pt.legal[sectionsKey][index][0], defaultLanguage)}</h2><p>${pair(section[1], pt.legal[sectionsKey][index][1], defaultLanguage)}</p></div></section>`).join('')}</main>${footer(defaultLanguage)}${modal(defaultLanguage)}</body></html>\n`;
}

function aliasPage() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=/"><link rel="canonical" href="${domain}/"><title>AkashaCorporation</title></head><body><p><a href="/">Continue to AkashaCorporation</a></p></body></html>\n`;
}

await mkdir(new URL('pt-br/', root), { recursive: true });
await mkdir(new URL('en/', root), { recursive: true });
await writeFile(new URL('index.html', root), clean(home('en', '/')));
await writeFile(new URL('pt-br/index.html', root), clean(home('pt', '/pt-br/')));
await writeFile(new URL('en/index.html', root), clean(aliasPage()));

const legalRoutes = [['privacy','privacy.html'],['terms','terms.html'],['ethics','ethical-use.html']];
for (const [type, filename] of legalRoutes) {
  await writeFile(new URL(filename, root), clean(legalPage('en', type, `/${filename}`)));
  await writeFile(new URL(`pt-br/${filename}`, root), clean(legalPage('pt', type, `/pt-br/${filename}`)));
}

const urls = ['/', '/pt-br/', '/privacy.html', '/terms.html', '/ethical-use.html', '/pt-br/privacy.html', '/pt-br/terms.html', '/pt-br/ethical-use.html'];
await writeFile(new URL('sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(path => `<url><loc>${domain}${path}</loc></url>`).join('')}</urlset>\n`);
const notFoundTitleEn = 'Page not found | AkashaCorporation';
const notFoundTitlePt = 'Página não encontrada | AkashaCorporation';
const notFoundDescriptionEn = 'The requested address is not part of the current AkashaCorporation website.';
const notFoundDescriptionPt = 'O endereço solicitado não faz parte do site atual da AkashaCorporation.';
await writeFile(new URL('404.html', root), clean(`${head('en', '/404.html', {title:notFoundTitleEn, description:notFoundDescriptionEn, noindex:true})}<body data-title-en="${escape(notFoundTitleEn)}" data-title-pt="${escape(notFoundTitlePt)}" data-description-en="${escape(notFoundDescriptionEn)}" data-description-pt="${escape(notFoundDescriptionPt)}">${header('en', true)}<main id="main" class="legal shell"><p class="eyebrow">404 / AKASHA</p><h1>${pair('Page not found.','Página não encontrada.','en')}</h1><p class="legal-intro">${pair(notFoundDescriptionEn,notFoundDescriptionPt,'en')}</p><a class="button button-primary" href="/">${pair('Return home','Voltar ao início','en')} ${arrow}</a></main>${footer('en')}${modal('en')}</body></html>\n`));

console.log('Built English-default and PT-BR landing pages, legal pages, 404 and sitemap.');

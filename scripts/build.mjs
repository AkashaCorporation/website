import { writeFile, mkdir } from 'node:fs/promises';
import { content } from './content.mjs';

const root = new URL('../', import.meta.url);
const domain = 'https://akashacorporation.com';
const github = 'https://github.com/AkashaCorporation';
const hexcore = `${github}/HikariSystem-HexCore`;
const scylla = `${github}/HikariSystem-Scylla`;
const email = 'support@akashacorporation.com';
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const external = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';
const icons = [
  '<path d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8M5.6 18.4l2.8-2.8m7.2-7.2 2.8-2.8"/><circle cx="12" cy="12" r="5"/>',
  '<path d="m12 3 8 4v6c0 4-8 8-8 8s-8-4-8-8V7l8-4Z"/><path d="m8 12 3 3 5-6"/>',
  '<rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/><path d="M10 10h4v4h-4z"/>'
];
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function head(c, privacy = false) {
  const route = `${c.path}${privacy ? 'privacy.html' : ''}`;
  const title = privacy ? `${c.privacyTitle} | Akasha` : c.title;
  return `<!doctype html>
<html lang="${c.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${escape(c.description)}">
  <meta name="theme-color" content="#09090b">
  <meta name="color-scheme" content="dark light">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'; upgrade-insecure-requests">
  <link rel="canonical" href="${domain}${route}">
  <link rel="alternate" hreflang="pt-BR" href="${domain}/${privacy ? 'privacy.html' : ''}">
  <link rel="alternate" hreflang="en" href="${domain}/en/${privacy ? 'privacy.html' : ''}">
  <link rel="alternate" hreflang="x-default" href="${domain}/${privacy ? 'privacy.html' : ''}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Akasha Corporation">
  <meta property="og:locale" content="${c.lang === 'pt-BR' ? 'pt_BR' : 'en_US'}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${escape(c.description)}">
  <meta property="og:url" content="${domain}${route}">
  <meta property="og:image" content="${domain}/Akasha.png">
  <meta property="og:image:alt" content="Akasha: red geometric dragon">
  <meta name="twitter:card" content="summary">
  <link rel="icon" type="image/png" href="/Akasha.png">
  <link rel="stylesheet" href="/styles.css">
  <script src="/site.js" defer></script>
</head>`;
}

function header(c, privacy = false) {
  const prefix = privacy ? c.path : '';
  return `<a class="skip-link" href="#main">${c.skip}</a>
<header class="header" id="top">
  <div class="container header-inner">
    <a class="brand" href="${c.path}" aria-label="Akasha Corporation">
      <img src="/Akasha.png" alt="" width="44" height="44">
      <span>AKASHA<small>CORPORATION</small></span>
    </a>
    <nav class="nav" aria-label="${c.navLabel}">
      ${['focus', 'technology', 'principles', 'contact'].map((id, i) => `<a href="${prefix}#${id}">${c.nav[i]}</a>`).join('')}
    </nav>
    <div class="header-actions">
      <a class="language" href="${c.switchPath}${privacy ? 'privacy.html' : ''}" lang="${c.switchLang}" hreflang="${c.switchLang}" aria-label="${c.switchLabel}">${c.switchText}</a>
      <a class="header-github" href="${github}">GitHub ${external}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" hidden>${c.menu}<span aria-hidden="true"><i></i><i></i></span></button>
    </div>
  </div>
  <nav class="mobile-nav" id="mobile-nav" aria-label="${c.navLabel}" hidden>
    ${['focus', 'technology', 'principles', 'contact'].map((id, i) => `<a href="${prefix}#${id}">${c.nav[i]} ${arrow}</a>`).join('')}
    <a href="${github}">GitHub ${external}</a>
  </nav>
</header>`;
}

function footer(c) {
  return `<footer class="footer"><div class="container">
    <div class="footer-top"><a href="${c.path}" class="footer-wordmark">AKASHA</a><p>${c.footerLine}</p></div>
    <div class="footer-bottom"><span>© ${new Date().getUTCFullYear()} ${c.rights}</span><div><a href="${c.path}privacy.html">${c.footerPrivacy}</a><a href="${github}">GitHub ${external}</a><a href="#top">${c.backTop} ↑</a></div></div>
  </div></footer>`;
}

function home(c) {
  return `${head(c)}
<body>${header(c)}
<main id="main">
  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow"><span class="signal" aria-hidden="true"></span>${c.eyebrow}</p>
        <h1 id="hero-title">${c.hero[0]}<br><span>${c.hero[1]}</span><br>${c.hero[2]}<br><em>${c.hero[3]}</em></h1>
        <p class="hero-intro">${c.intro}</p>
        <div class="hero-actions"><a class="button button-primary" href="#technology">${c.primary}${arrow}</a><a class="text-link" href="#contact">${c.secondary}${external}</a></div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="art-grid"></div><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div>
        <span class="art-cross cross-one">+</span><span class="art-cross cross-two">+</span>
        <img class="dragon" src="/Akasha.png" alt="" width="1254" height="1254" fetchpriority="high">
        <div class="art-caption"><span>${c.heroCaption}</span><span>AI × SEC</span></div>
      </div>
    </div>
    <div class="container hero-bottom"><span>${c.heroNote}</span><a href="#focus">${c.scroll}<span aria-hidden="true">↓</span></a></div>
  </section>
  <div class="discipline-strip" aria-hidden="true"><div class="container">${c.strip.map(s => `<span>${s}</span>`).join('<i>✳</i>')}</div></div>

  <section class="section focus" id="focus" aria-labelledby="focus-title">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">${c.focusLabel}</p><h2 id="focus-title">${c.focusTitle}</h2></div><p class="section-intro">${c.focusIntro}</p></div>
      <div class="focus-grid">${c.focus.map((f, i) => `<article class="focus-item"><div class="focus-top"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${icons[i]}</svg><span>0${i+1}</span></div><p class="mini-label">${f.label}</p><h3>${f.title}</h3><p>${f.text}</p><ul class="tags">${f.tags.map(t => `<li>${t}</li>`).join('')}</ul></article>`).join('')}</div>
    </div>
  </section>

  <section class="section technology" id="technology" aria-labelledby="technology-title">
    <span id="arsenal" class="anchor-alias"></span><span id="hexcore" class="anchor-alias"></span>
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow">${c.techLabel}</p><h2 id="technology-title">${c.techTitle}</h2></div><p class="section-intro">${c.techIntro}</p></div>
      <div class="product-grid">
        <article class="product-card hexcore-card">
          <div class="product-top"><span class="status"><span aria-hidden="true"></span>${c.hexStatus}</span><span class="product-index">H / 01</span></div>
          <div class="product-symbol hex-symbol" aria-hidden="true"><svg viewBox="0 0 180 150" fill="none"><path d="M90 10 146 42v66l-56 32-56-32V42Z"/><path d="m90 35 34 20v40l-34 20-34-20V55Z"/><path d="M34 42 90 75l56-33M90 75v65M56 55l68 40M124 55 56 95"/></svg><span>HEXCORE</span></div>
          <div class="product-body"><h3>HexCore</h3><p class="product-role">${c.hexRole}</p><p class="product-description">${c.hexText}</p><ul class="feature-list">${c.hexFeatures.map(f => `<li>${f}</li>`).join('')}</ul><p class="product-note">${c.hexNote}</p><div class="product-links"><a class="button button-dark" href="${hexcore}">${c.codeLink}${external}</a><a class="subtle-link" href="${hexcore}/releases">${c.releaseLink} ↗</a></div></div>
        </article>
        <article class="product-card scylla-card">
          <div class="product-top"><span class="status status-preview"><span aria-hidden="true"></span>${c.scyllaStatus}</span><span class="product-index">H / 02</span></div>
          <div class="product-symbol scylla-symbol" aria-hidden="true"><svg viewBox="0 0 180 150" fill="none"><path d="M30 105V45l30-17 30 17 30-17 30 17v60l-30 17-30-17-30 17Z"/><path d="M60 28v94m30-77v60m30-77v94M30 45l30 17 30-17 30 17 30-17M30 105l30-17 30 17 30-17 30 17"/></svg><span>SCYLLA</span></div>
          <div class="product-body"><h3>Scylla</h3><p class="product-role">${c.scyllaRole}</p><p class="product-description">${c.scyllaText}</p><ul class="feature-list">${c.scyllaFeatures.map(f => `<li>${f}</li>`).join('')}</ul><p class="product-note">${c.scyllaNote}</p><div class="product-links"><a class="button button-dark" href="${scylla}">${c.scyllaLink}${external}</a><a class="subtle-link" href="${scylla}#readme">${c.docsLink} ↗</a></div></div>
        </article>
      </div>
      <div class="technology-foot"><p>${c.publicNote}</p><a href="${github}" class="text-link">${c.allRepos}${external}</a></div>
    </div>
  </section>

  <section class="section principles" id="principles" aria-labelledby="principles-title">
    <span id="research" class="anchor-alias"></span><span id="about" class="anchor-alias"></span>
    <div class="container principles-grid"><div class="principles-heading"><p class="eyebrow">${c.principlesLabel}</p><h2 id="principles-title">${c.principlesTitle}</h2><p class="section-intro">${c.principlesIntro}</p><div class="principles-mark" aria-hidden="true">A<span>+</span></div></div>
    <ol class="principles-list">${c.principles.map((p, i) => `<li><span class="principle-number">0${i+1}</span><div><h3>${p[0]}</h3><p>${p[1]}</p></div></li>`).join('')}</ol></div>
  </section>

  <section class="contact" id="contact" aria-labelledby="contact-title"><div class="container contact-inner"><div class="contact-copy"><p class="eyebrow">${c.contactLabel}</p><h2 id="contact-title">${c.contactTitle}</h2><p>${c.contactText}</p></div><div class="contact-actions"><a class="button button-light" href="mailto:${email}">${c.contactButton}${arrow}</a><div class="email-row"><a href="mailto:${email}">${email}</a><button class="copy-email" type="button" data-copy-email="${email}" data-copied="${c.copied}" data-failed="${c.copyFailed}" aria-label="${c.copy}" hidden><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M15 8V4H4v11h4"/></svg></button></div><span class="copy-status" role="status" aria-live="polite"></span><p class="contact-note">${c.contactNote}</p></div></div></section>
</main>
${footer(c)}
</body></html>\n`;
}

function privacy(c) {
  return `${head(c, true)}<body>${header(c, true)}<main id="main" class="legal container"><a class="text-link" href="${c.path}">← ${c.homeLink}</a><p class="eyebrow">${c.privacyLabel}</p><h1>${c.privacyTitle}</h1>${c.privacySections.map(([h,p]) => `<section><h2>${h}</h2><p>${p}</p></section>`).join('')}<a class="text-link" href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">${c.privacyProvider}${external}</a></main>${footer(c)}</body></html>\n`;
}

await mkdir(new URL('en/', root), { recursive: true });
for (const c of Object.values(content)) {
  const folder = c.path === '/' ? '' : 'en/';
  await writeFile(new URL(`${folder}index.html`, root), home(c));
  await writeFile(new URL(`${folder}privacy.html`, root), privacy(c));
}
await writeFile(new URL('sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', '/en/', '/privacy.html', '/en/privacy.html'].map(path => `<url><loc>${domain}${path}</loc></url>`).join('')}</urlset>\n`);
await writeFile(new URL('404.html', root), `${head(content.pt).replace('<link rel="canonical" href="https://akashacorporation.com/">','<meta name="robots" content="noindex">')}<body>${header(content.pt, true)}<main id="main" class="legal container"><p class="eyebrow">404 / AKASHA</p><h1>Página não encontrada.</h1><section><p>O endereço pode ter mudado. Continue pela página inicial.</p><p lang="en">This page could not be found. Explore Akasha from the home page.</p></section><div class="hero-actions"><a class="button button-primary" href="/">Ir ao início ${arrow}</a><a class="text-link" href="/en/" lang="en">English homepage ${arrow}</a></div></main>${footer(content.pt)}</body></html>\n`);
console.log('Built Portuguese and English pages, privacy notices, 404 page and sitemap.');

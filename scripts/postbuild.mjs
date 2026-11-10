import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { company, content } from './content.mjs';

const root = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');
const { render } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url).href);
const domain = 'https://akashacorporation.com';

const routes = [
  { path: '/', file: 'index.html', language: 'en', title: content.en.title, description: content.en.description, alternate: '/' },
  { path: '/pt-br/', file: 'pt-br/index.html', language: 'pt', title: content.pt.title, description: content.pt.description, alternate: '/' },
  { path: '/privacy.html', file: 'privacy.html', language: 'en', legal: 'privacy', alternate: '/privacy.html' },
  { path: '/terms.html', file: 'terms.html', language: 'en', legal: 'terms', alternate: '/terms.html' },
  { path: '/ethical-use.html', file: 'ethical-use.html', language: 'en', legal: 'ethics', alternate: '/ethical-use.html' },
  { path: '/pt-br/privacy.html', file: 'pt-br/privacy.html', language: 'pt', legal: 'privacy', alternate: '/privacy.html' },
  { path: '/pt-br/terms.html', file: 'pt-br/terms.html', language: 'pt', legal: 'terms', alternate: '/terms.html' },
  { path: '/pt-br/ethical-use.html', file: 'pt-br/ethical-use.html', language: 'pt', legal: 'ethics', alternate: '/ethical-use.html' },
];

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function metadata(route) {
  const c = content[route.language];
  const language = route.language === 'pt' ? 'pt-BR' : 'en';
  const titleKey = route.legal ? `${route.legal}Title` : null;
  const introKey = route.legal ? `${route.legal}Intro` : null;
  const title = route.title ?? `${c.legal[titleKey]} | AkashaCorporation`;
  const description = route.description ?? c.legal[introKey];
  const ptPath = route.alternate === '/' ? '/pt-br/' : `/pt-br${route.alternate}`;
  return { language, title, description, enPath: route.alternate, ptPath };
}

function page(route) {
  const meta = metadata(route);
  const app = render(route.path);
  const social = `
    <link rel="canonical" href="${domain}${route.path}">
    <link rel="alternate" hreflang="en" href="${domain}${meta.enPath}">
    <link rel="alternate" hreflang="pt-BR" href="${domain}${meta.ptPath}">
    <link rel="alternate" hreflang="x-default" href="${domain}${meta.enPath}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="AkashaCorporation">
    <meta property="og:locale" content="${route.language === 'pt' ? 'pt_BR' : 'en_US'}">
    <meta property="og:title" content="${esc(meta.title)}">
    <meta property="og:description" content="${esc(meta.description)}">
    <meta property="og:url" content="${domain}${route.path}">
    <meta property="og:image" content="${domain}/assets/akasha-hydra.png">
    <meta name="twitter:card" content="summary">`;
  let html = template
    .replace('<html lang="en">', `<html lang="${meta.language}">`)
    .replace(/<title>.*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(meta.description)}">`)
    .replace('</head>', `${social}\n  </head>`)
    .replace('<!--app-html-->', app);
  if (route.legal) html = html.replace(/\s*<link rel="preload" as="image" href="\/assets\/museum-clouds\.jpg" fetchpriority="high">/, '');
  return html;
}

for (const route of routes) {
  const target = new URL(route.file, dist);
  await mkdir(new URL('./', target), { recursive: true });
  await writeFile(target, page(route));
}

const notFoundPath = '/404.html';
const notFound = template
  .replace(/<title>.*?<\/title>/, '<title>Page not found | AkashaCorporation</title>')
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="The requested address is not part of the current AkashaCorporation website.">')
  .replace('</head>', '    <meta name="robots" content="noindex">\n  </head>')
  .replace('<!--app-html-->', render(notFoundPath));
await writeFile(new URL('404.html', dist), notFound);

await mkdir(new URL('en/', dist), { recursive: true });
await writeFile(new URL('en/index.html', dist), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=/"><link rel="canonical" href="${domain}/"><title>AkashaCorporation</title></head><body><a href="/">Continue to AkashaCorporation</a></body></html>\n`);

const urls = routes.map(route => `<url><loc>${domain}${route.path}</loc></url>`).join('');
await writeFile(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`);
await rm(new URL('../dist-ssr/', import.meta.url), { recursive: true, force: true });
console.log(`Prerendered ${routes.length} Akasha routes plus 404 and legacy redirect.`);

import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { company, content } from './content.mjs';

const root = new URL('../', import.meta.url);
const pages = [
  'index.html', 'pt-br/index.html', 'privacy.html', 'terms.html', 'ethical-use.html',
  'pt-br/privacy.html', 'pt-br/terms.html', 'pt-br/ethical-use.html', '404.html'
];
const read = path => readFile(new URL(path, root), 'utf8');
let assertions = 0;
const check = (condition, message) => { assert.ok(condition, message); assertions++; };

for (const file of pages) {
  const html = await read(file);
  check((html.match(/<h1(?:\s|>)/g) || []).length === 1, `${file}: exactly one h1`);
  check(/<html lang="(?:en|pt-BR)"/.test(html), `${file}: document language`);
  check(/name="viewport"/.test(html), `${file}: viewport metadata`);
  check(/Content-Security-Policy/.test(html), `${file}: CSP`);
  check(!/href="#"/.test(html), `${file}: no placeholder links`);
  check(!/https?:[^"']+\.(?:js|css)["']/.test(html), `${file}: no CDN runtime`);
  check(!/on(?:click|load|error)=|<iframe|<script>(?!\s*<\/script>)/.test(html), `${file}: no inline handlers, scripts or embeds`);
  check(html.includes(company.legalName), `${file}: legal entity visible`);
  check(html.includes(company.taxId), `${file}: CNPJ visible`);
  check(html.includes(company.email), `${file}: official contact visible`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  check(new Set(ids).size === ids.length, `${file}: unique IDs`);
  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    check(/\balt="/.test(image[0]), `${file}: image alt`);
    check(/\bwidth="/.test(image[0]) && /\bheight="/.test(image[0]), `${file}: image dimensions`);
  }
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:https:|mailto:|#)/.test(value)) continue;
    const parsed = new URL(value, `https://akashacorporation.com/${file}`);
    const path = parsed.pathname.endsWith('/') ? `${parsed.pathname}index.html` : parsed.pathname;
    await access(new URL(`.${path}`, root)); assertions++;
  }
  const enCopies = (html.match(/data-language-copy="en"/g) || []).length;
  const ptCopies = (html.match(/data-language-copy="pt"/g) || []).length;
  check(enCopies === ptCopies, `${file}: bilingual copy parity`);
}

const home = await read('index.html');
const portuguese = await read('pt-br/index.html');
const englishPrivacy = await read('privacy.html');
const portuguesePrivacy = await read('pt-br/privacy.html');
check(home.includes('<html lang="en" data-default-language="en">'), 'English is the root default');
check(portuguese.includes('<html lang="pt-BR" data-default-language="pt">'), 'PT-BR route defaults to Portuguese');
check(portuguese.includes('href="/pt-br/privacy.html"'), 'PT-BR footer preserves the localized legal route');
check(portuguesePrivacy.includes('href="/pt-br/"'), 'PT-BR legal page returns to the localized home');
check(englishPrivacy.includes('href="https://akashacorporation.com/privacy.html"') && englishPrivacy.includes('href="https://akashacorporation.com/pt-br/privacy.html"'), 'English legal page publishes paired language alternates');
check(portuguesePrivacy.includes('href="https://akashacorporation.com/privacy.html"') && portuguesePrivacy.includes('href="https://akashacorporation.com/pt-br/privacy.html"'), 'PT-BR legal page publishes paired language alternates');
check(englishPrivacy.includes('id="access-modal"') && portuguesePrivacy.includes('id="access-modal"'), 'legal page access CTAs have a working dialog');
check(!englishPrivacy.includes('class="menu-toggle') && !portuguesePrivacy.includes('class="menu-toggle'), 'legal pages do not expose an orphan mobile menu control');
check(home.includes('data-language-option="en"') && home.includes('data-language-option="pt"'), 'functional language controls are present');
check((home.match(/data-modal-open=/g) || []).length >= 5, 'all primary access CTAs open the modal');
check(home.includes('data-access-form') && home.includes('method="dialog"'), 'early-access dialog is local-only');
check(home.includes('Current qualified engines use LLVM/MLIR 18.1.8'), 'current LLVM/MLIR runtime is explicit');
check(home.includes('LLVM/MLIR 22 is a migration research target'), 'LLVM/MLIR 22 is labeled as target');
check(home.includes('CODENAME PENDING'), 'model codename remains explicitly pending');
check(home.includes('foundation model has been selected'), 'current model program stage is disclosed');
check(!/100% (?:approval|acceptance)|guaranteed approval|NVIDIA Inception member|Google Cloud partner|Alibaba Cloud partner|26B MoE/i.test(home), 'no unsupported program, model or approval claim');
check(home.includes('not partnership or endorsement'), 'vendor-program disclaimer is visible');

assert.deepEqual(Object.keys(content.en), Object.keys(content.pt)); assertions++;
check(content.en.products.length === 3 && content.pt.products.length === 3, 'three translated product pillars');
check(content.en.pipeline.length === 4 && content.pt.pipeline.length === 4, 'four translated pipeline stages');
check(content.en.roadmap.length === 4 && content.pt.roadmap.length === 4, 'four translated roadmap periods');
check(content.en.modal.deploymentOptions.length === content.pt.modal.deploymentOptions.length, 'modal option translation parity');

const script = await read('site.js');
check(script.includes('data-language-option') && script.includes('setLanguage'), 'language state implementation exists');
check(script.includes('data-title-en') && script.includes('data-option-en'), 'language state updates titles and select options');
check(script.includes('showModal') && script.includes('FormData'), 'modal and request composer implementation exists');
check(script.includes('mailto:lukas@akashacorporation.com'), 'request opens official corporate email');
check(script.includes('prefers-reduced-motion'), 'terminal respects reduced motion');
check(!/localStorage|document\.cookie|eval\(|fetch\(/.test(script), 'no storage, eval or network collection');

const css = await read('styles.css');
check(css.includes('prefers-reduced-motion'), 'CSS reduced-motion support');
check(css.includes(':focus-visible'), 'visible keyboard focus');
check(css.replace(/\s+/g, '').includes('[hidden]{display:none!important}'), 'hidden content remains inaccessible');
check(!/radial-gradient|linear-gradient/.test(css), 'no decorative gradient backgrounds');

const pkg = JSON.parse(await read('package.json'));
check(!pkg.dependencies && !pkg.devDependencies, 'site remains dependency-free');
check((await read('CNAME')).trim().toLowerCase() === 'akashacorporation.com', 'custom domain preserved');
check((await read('.nojekyll')).length === 0, 'GitHub Pages remains Jekyll-independent');
check((await read('sitemap.xml')).includes('/pt-br/ethical-use.html'), 'sitemap includes localized legal pages');

console.log(`PASS: ${assertions} checks (pages, links, bilingual state, legal identity, claims, accessibility and privacy).`);

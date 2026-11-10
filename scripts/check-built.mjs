import assert from 'node:assert/strict';
import { access, readFile, readdir, stat } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const files = ['index.html','pt-br/index.html','privacy.html','terms.html','ethical-use.html','pt-br/privacy.html','pt-br/terms.html','pt-br/ethical-use.html','404.html','en/index.html','sitemap.xml','CNAME','.nojekyll'];
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks += 1; };
const read = path => readFile(new URL(path, dist), 'utf8');

for (const file of files) { await access(new URL(file, dist)); checks += 1; }
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = await read(file);
  if (file !== 'en/index.html') {
    check((html.match(/<h1(?:\s|>)/g) || []).length === 1, `${file}: one prerendered h1`);
    check(html.includes('AKASHA CORPORATION INOVA SIMPLES (I.S.)'), `${file}: legal entity`);
    check(html.includes('70.060.002/0001-51'), `${file}: CNPJ`);
    check(html.includes('lukas@akashacorporation.com'), `${file}: contact`);
    check(!html.includes('<!--app-html-->'), `${file}: SSR placeholder replaced`);
    check(/<script[^>]+type="module"/.test(html), `${file}: hydration bundle`);
  }
}

const home = await read('index.html');
const pt = await read('pt-br/index.html');
check(home.includes('<html lang="en">'), 'English root language');
check(pt.includes('<html lang="pt-BR">'), 'Portuguese route language');
check(home.includes('Akasha Sovereign SLM'), 'SLM program visible');
check(home.includes('STABLE · v3.8.4'), 'HexCore maturity is explicit');
check(home.includes('PRE-RELEASE · 3.0 TARGET'), 'Scylla maturity is explicit');
check(home.includes('IN DEVELOPMENT · 0.2'), 'Hypotenuse maturity is explicit');
check(home.includes('BYOK terminal coding-agent harness'), 'Bari is presented as a BYOK harness');
check(home.includes('bari exec &quot;Ask june to inspect this fixture with HexCore; preserve unknowns.&quot;'), 'Bari terminal uses the real headless entry point');
check(home.includes('Akasha-hosted models are a roadmap integration'), 'future Akasha models are not presented as available today');
check(home.includes('/assets/hexcore-mark.png') && home.includes('/assets/scylla-mark.png') && home.includes('/assets/hypotenuse-mark.png'), 'official product marks are used');
check(!/100% (?:approval|acceptance)|guaranteed approval|NVIDIA Inception member|Google Cloud partner|Alibaba Cloud partner|26B MoE/i.test(home), 'unsupported claims absent');
check(home.includes('Program channels are listed as research history, not partnership or endorsement.'), 'program disclaimer visible');
check((home.match(/data-reveal/g) || []).length >= 20, 'scroll reveal surfaces are present');

const assets = await readdir(new URL('assets/', dist));
let assetBytes = 0;
for (const asset of assets.filter(file => /\.(?:png|jpe?g|webp|avif|svg)$/i.test(file))) assetBytes += (await stat(new URL(`assets/${asset}`, dist))).size;
check(assetBytes < 4 * 1024 * 1024, `optimized visual assets remain below 4 MiB (${assetBytes})`);
const jsFiles = (await readdir(new URL('assets/', dist))).filter(file => file.endsWith('.js'));
check(jsFiles.length > 0, 'client bundle emitted');
const sourceCss = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
check(sourceCss.includes('.hero-plate { display: none; }'), 'mobile layout hides the decorative hero plate');
check((await read('CNAME')).trim().toLowerCase() === 'akashacorporation.com', 'custom domain retained');
check((await read('sitemap.xml')).includes('/pt-br/ethical-use.html'), 'localized legal route in sitemap');
console.log(`PASS: ${checks} production build checks.`);

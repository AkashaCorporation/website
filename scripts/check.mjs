import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createContext, runInContext } from 'node:vm';
import { content } from './content.mjs';

const root = new URL('../', import.meta.url);
const files = ['index.html','en/index.html','privacy.html','en/privacy.html','404.html'];
const read = path => readFile(new URL(path,root),'utf8');
let assertions=0;
const check = (value,message) => {assert.ok(value,message);assertions++;};
for(const file of files) {
  const html=await read(file);
  check((html.match(/<h1(?:\s|>)/g)||[]).length===1,`${file}: one h1`);
  check(/<html lang="(?:pt-BR|en)"/.test(html),`${file}: document language`);
  check(/name="viewport"/.test(html),`${file}: viewport`);
  check(!/href="#"/.test(html),`${file}: no placeholder links`);
  check(!/https?:[^"']+\.(?:js|css)["']/.test(html),`${file}: no CDN runtime`);
  check(!/<form|<iframe|on(?:click|load|error)=|<script>/.test(html),`${file}: no inline scripts, forms or embeds`);
  check(html.includes('Content-Security-Policy'),`${file}: CSP`);
  check(!/CNPJ|90%|1\.34|Production launch|ALL SYSTEMS NOMINAL/i.test(html),`${file}: no confidential or unsupported claims`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  check(new Set(ids).size===ids.length,`${file}: unique IDs`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value=match[1];
    if(/^(?:https:|mailto:)/.test(value))continue;
    const parsed=new URL(value,'https://akashacorporation.com/'+file);
    const target=parsed.pathname.endsWith('/')?parsed.pathname+'index.html':parsed.pathname;
    await access(new URL('.'+target,root));assertions++;
    if(parsed.hash) {
      const targetHTML=await read(target.slice(1));
      check(targetHTML.includes(`id="${parsed.hash.slice(1)}"`),`${file}: missing target ${value}`);
    }
  }
  for(const m of html.matchAll(/\b(?:aria-controls|aria-labelledby)="([^"]+)"/g)) {
    for(const id of m[1].split(' '))check(ids.includes(id),`${file}: missing ARIA target ${id}`);
  }
  for(const m of html.matchAll(/<img\b[^>]*>/g)) {
    check(/\balt="/.test(m[0]),`${file}: image alt`);
    check(/\bwidth="/.test(m[0])&&/\bheight="/.test(m[0]),`${file}: image dimensions`);
  }
}
assert.deepEqual(Object.keys(content.pt),Object.keys(content.en));assertions++;
for(const c of Object.values(content)) {
  check(c.focus.length===3&&c.principles.length===4,`${c.lang}: complete section translation`);
  check(c.hexNote.includes('Windows 10/11 x64'),`${c.lang}: platform limitation`);
  check(c.scyllaStatus.includes(c.lang==='en'?'PRE-RELEASE':'PRÉ-LANÇAMENTO'),`${c.lang}: accurate Scylla status`);
}
const script=await read('site.js');
function fixture({clipboard='ok',controls=true}={}) {
  const listeners=new Map(), windowListeners=new Map(); let resize;
  const element=attrs=>({hidden:true,attrs:{...attrs},listeners:{},dataset:{},focused:false,addEventListener(t,fn){this.listeners[t]=fn},setAttribute(k,v){this.attrs[k]=v},getAttribute(k){return this.attrs[k]},focus(){this.focused=true}});
  const toggle=element({'aria-expanded':'false'}),menu=element(),copy=element(),status=element();
  copy.dataset={copyEmail:'support@akashacorporation.com',copied:'Copied',failed:'Failed'};
  const classes=new Set();let copied;
  const context=createContext({document:{querySelector:s=>controls?({'.menu-toggle':toggle,'#mobile-nav':menu,'[data-copy-email]':copy,'.copy-status':status}[s]||null):null,documentElement:{classList:{add:s=>classes.add(s)}},addEventListener:(t,fn)=>listeners.set(t,fn)},window:{matchMedia:()=>({addEventListener:(t,fn)=>resize=fn}),addEventListener:(t,fn)=>windowListeners.set(t,fn)},navigator:clipboard==='absent'?{}:{clipboard:{writeText:async value=>{if(clipboard==='fail')throw new Error('Permission denied');copied=value}}}});
  runInContext(script,context);
  return {toggle,menu,copy,status,listeners,windowListeners,resize:()=>resize,classes,copied:()=>copied};
}
const f=fixture();
check(!f.toggle.hidden&&f.classes.has('has-menu'),'progressive navigation enabled');
f.toggle.listeners.click();check(!f.menu.hidden&&f.toggle.attrs['aria-expanded']==='true','menu opens');
f.toggle.listeners.click();check(f.menu.hidden&&f.toggle.attrs['aria-expanded']==='false','repeated click closes');
f.toggle.listeners.click();f.listeners.get('keydown')({key:'Escape'});check(f.menu.hidden&&f.toggle.focused,'Escape closes and restores focus');
f.toggle.listeners.click();f.menu.listeners.click({target:{closest:()=>true}});check(f.menu.hidden,'section click closes');
f.toggle.listeners.click();f.listeners.get('click')({target:{closest:()=>null}});check(f.menu.hidden,'outside click closes');
f.toggle.listeners.click();f.resize()({matches:true});check(f.menu.hidden,'desktop breakpoint closes');
for(const event of ['pageshow','hashchange']){f.toggle.listeners.click();f.windowListeners.get(event)();check(f.menu.hidden,`${event} restores closed navigation`);}
await f.copy.listeners.click();check(f.copied()==='support@akashacorporation.com'&&f.status.textContent==='Copied','copy email success');
await f.copy.listeners.click();check(f.status.textContent==='Copied','copy email repeat');
const bad=fixture({clipboard:'fail'});await bad.copy.listeners.click();check(bad.status.textContent==='Failed','copy permission failure is visible');
check(fixture({clipboard:'absent'}).copy.hidden,'copy is absent when API unsupported');
fixture({controls:false});assertions++;
for(const file of ['site.js','scripts/build.mjs','scripts/content.mjs','scripts/serve.mjs']) {
  const text=await read(file);check(!/localStorage|document\.cookie|eval\(/.test(text),`${file}: no tracking storage or eval`);
}
const css=await read('styles.css');
check(css.includes('prefers-reduced-motion'),'reduced motion support');
check(css.includes(':focus-visible'),'visible keyboard focus');
check(css.replace(/\s+/g,'').includes('[hidden]{display:none!important}'),'hidden navigation stays inaccessible');
check((await read('CNAME')).trim().toLowerCase()==='akashacorporation.com','existing deployment domain preserved');
console.log(`PASS: ${assertions} checks (static pages, links, metadata, translations, content guardrails, navigation and clipboard states).`);

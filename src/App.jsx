import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Github, Mail, Menu, Play, X } from 'lucide-react';
import { company, content } from '../scripts/content.mjs';

const KNOWN_HOME_PATHS = new Set(['/', '/pt-br', '/pt-br/']);
const LEGAL_PATHS = {
  '/privacy.html': 'privacy', '/terms.html': 'terms', '/ethical-use.html': 'ethics',
  '/pt-br/privacy.html': 'privacy', '/pt-br/terms.html': 'terms', '/pt-br/ethical-use.html': 'ethics',
};

const tx = (en, pt, language) => language === 'pt' ? pt : en;

function useAkashaMotion(enabled) {
  useEffect(() => {
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'), import('gsap/ScrollTrigger'), import('lenis'),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-hero-wordmark]', { opacity: 0, y: 36, duration: 1.1 })
          .from('[data-hero-plate]', { opacity: 0, x: 40, duration: 1.2 }, 0.18)
          .from('[data-hero-meta]', { opacity: 0, y: 18, stagger: 0.08, duration: 0.7 }, 0.48);

        gsap.to('[data-hero-clouds]', {
          yPercent: 7, ease: 'none',
          scrollTrigger: { trigger: '.museum-hero', start: 'top top', end: 'bottom top', scrub: 1 },
        });
        gsap.to('[data-hero-plate]', {
          yPercent: -7, ease: 'none',
          scrollTrigger: { trigger: '.museum-hero', start: 'top top', end: 'bottom top', scrub: 1 },
        });
        gsap.utils.toArray('[data-reveal]').forEach(element => {
          gsap.from(element, {
            opacity: 0, y: 34, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          });
        });
        gsap.fromTo('[data-roadmap-rail]', { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: '.roadmap-list', start: 'top 75%', end: 'bottom 70%', scrub: true },
        });
        gsap.utils.toArray('[data-terminal-line]').forEach((line, index) => {
          gsap.from(line, {
            opacity: 0.12, x: -12, duration: 0.35, delay: index * 0.08,
            scrollTrigger: { trigger: '.terminal', start: 'top 78%', once: true },
          });
        });
      });

      const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
      let raf = 0;
      const frame = time => { lenis.raf(time); raf = requestAnimationFrame(frame); };
      raf = requestAnimationFrame(frame);
      lenis.on('scroll', ScrollTrigger.update);
      cleanup = () => { cancelAnimationFrame(raf); lenis.destroy(); context.revert(); ScrollTrigger.getAll().forEach(trigger => trigger.kill()); };
    })();

    return () => { disposed = true; cleanup(); };
  }, [enabled]);
}

function LanguageSwitch({ language, setLanguage }) {
  return <div className="language-switch" role="group" aria-label={tx('Language selector', 'Seletor de idioma', language)}>
    <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
    <span aria-hidden="true">/</span>
    <button type="button" aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>PT-BR</button>
  </div>;
}

function Header({ language, setLanguage, openModal, legal = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const c = content[language];
  const home = language === 'pt' ? '/pt-br/' : '/';
  const ids = ['products', 'systems', 'architecture', 'research', 'roadmap'];

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = event => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [menuOpen]);

  return <>
    <a className="skip-link" href="#main">{c.skip}</a>
    <header className="site-header" id="top">
      <div className="shell header-inner">
        <a className="brand" href={home} aria-label={tx('AkashaCorporation home', 'Início da AkashaCorporation', language)}>
          <img src="/assets/akasha-hydra.png" alt="" width="42" height="42" />
          <span>AKASHA CORPORATION</span>
        </a>
        {!legal && <nav className="desktop-nav" aria-label={tx('Primary navigation', 'Navegação principal', language)}>
          {ids.map((id, index) => <a key={id} href={`#${id}`}>{c.nav[index]}</a>)}
        </nav>}
        <div className="header-actions">
          <LanguageSwitch language={language} setLanguage={setLanguage} />
          <button className="header-access" type="button" onClick={() => openModal('enterprise')}>{c.enterprise}</button>
          {!legal && <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={tx('Open menu', 'Abrir menu', language)} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X /> : <Menu />}</button>}
        </div>
      </div>
    </header>
    {!legal && <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} id="mobile-nav" aria-label={tx('Mobile navigation', 'Navegação móvel', language)}>
      {ids.map((id, index) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{c.nav[index]}<ArrowRight /></a>)}
      <button type="button" onClick={() => { setMenuOpen(false); openModal('enterprise'); }}>{c.enterprise}<ArrowRight /></button>
    </nav>}
  </>;
}

function Hero({ language, openModal }) {
  const en = content.en; const pt = content.pt; const c = content[language];
  return <section className="museum-hero" aria-labelledby="hero-title">
    <div className="hero-clouds" data-hero-clouds aria-hidden="true" />
    <div className="hero-vignette" aria-hidden="true" />
    <div className="shell hero-stage">
      <div className="hero-copy" data-hero-wordmark>
        <p className="hero-badge">{c.heroBadge}</p>
        <h1 id="hero-title">AKASHA</h1>
        <p className="corporation">CORPORATION</p>
        <p className="hero-proposition">{c.heroTitle}</p>
        <p className="hero-intro">{c.heroText}</p>
        <div className="hero-actions" data-hero-meta>
          <button className="button button-ink" type="button" onClick={() => openModal('api')}>{c.primary}<ArrowRight /></button>
          <a className="text-link" href="#architecture">{c.secondary}<ArrowRight /></a>
        </div>
      </div>
      <figure className="hero-plate" data-hero-plate>
        <div className="museum-mat"><img src="/assets/museum-angel.jpg" alt="" width="900" height="1439" fetchPriority="high" /></div>
        <figcaption>PLATE I · VERIFIABLE INTELLIGENCE</figcaption>
      </figure>
      <blockquote data-hero-meta>“{tx(en.heroQuote, pt.heroQuote, language)}”</blockquote>
    </div>
    <div className="hero-record shell" data-hero-meta><span>{company.legalName}</span><span>{tx('PARANÁ · BRAZIL', 'PARANÁ · BRASIL', language)}</span><span>AI × SECURITY × COMPILERS</span></div>
  </section>;
}

function DisciplineStrip({ language }) {
  const items = content[language].proof;
  return <div className="discipline-strip" aria-label="Akasha research disciplines"><div className="discipline-track">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>✦ {item}</span>)}</div></div>;
}

const productVisuals = [
  { src: '/assets/museum-oracle.jpg', className: 'product-art', alt: '' },
  { src: '/assets/hexcore-mark.png', className: 'product-mark', alt: 'HexCore' },
  { src: '/assets/akasha-hydra.png', className: 'product-mark hydra', alt: 'Akasha' },
];

function Products({ language, openModal }) {
  const c = content[language];
  const links = ['#architecture', `${company.github}/HikariSystem-HexCore`, `${company.github}/Bari`];
  return <section className="gallery section" id="products" aria-labelledby="products-title"><div className="shell">
    <div className="section-heading" data-reveal><div><p className="eyebrow">{c.sectionProducts}</p><h2 id="products-title">{c.productsTitle}</h2></div><p>{c.productsIntro}</p></div>
    <div className="catalog">{c.products.map((product, index) => <article className="catalog-entry" id={product.id} data-reveal key={product.id}>
      <div className="catalog-visual"><img {...productVisuals[index]} width={index === 0 ? 820 : 640} height={index === 0 ? 1122 : 640} loading="lazy" /><span>{product.index}</span></div>
      <div className="catalog-copy"><div className="record-line"><span>{product.index}</span><strong>{product.status}</strong></div><h3>{product.name}</h3><p className="product-role">{product.role}</p><p className="product-text">{product.text}</p><ul>{product.features.map(feature => <li key={feature}><span>◇</span>{feature}</li>)}</ul><div className="tag-list">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p className="product-note">{product.note}</p>{index === 0 ? <button className="text-link" type="button" onClick={() => openModal('model')}>{c.productLinks[index]}<ArrowRight /></button> : <a className="text-link" href={links[index]}>{c.productLinks[index]}<ArrowUpRight /></a>}</div>
    </article>)}</div>
  </div></section>;
}

function Terminal({ language }) {
  const c = content[language].terminal;
  const [runKey, setRunKey] = useState(0);
  return <div className="terminal" data-reveal aria-label={tx('Illustrative security analysis trace', 'Trace ilustrativo de análise de segurança', language)} key={runKey}>
    <div className="terminal-bar"><span>HEXCORE / EVIDENCE RECORD</span><span>{tx('READ ONLY', 'SOMENTE LEITURA', language)}</span></div>
    <div className="terminal-command"><span>$</span> bari analyze --engine hexcore --prove lifetime</div>
    <ol>{c.lines.map((line, index) => <li data-terminal-line key={`${line[0]}-${index}`}><span>0{index + 1}</span><strong>{line[0]}</strong><p>{line[1]}</p><em className={line[2]}>{line[2] === 'ok' ? 'PASS' : 'SAT'}</em></li>)}</ol>
    <div className="terminal-foot"><span>{c.footer}</span><button type="button" onClick={() => setRunKey(value => value + 1)} aria-label={c.replay}><Play /></button></div>
  </div>;
}

function Systems({ language }) {
  const c = content[language];
  return <section className="archive section" id="systems" aria-labelledby="systems-title"><div className="archive-watermark" aria-hidden="true">INSTRUMENTS</div><div className="shell">
    <div className="section-heading inverse" data-reveal><div><p className="eyebrow">{c.systemsLabel}</p><h2 id="systems-title">{c.systemsTitle}</h2></div><p>{c.systemsIntro}</p></div>
    <div className="instrument-grid">{c.systems.map(system => <article className={`instrument ${system.accent}`} id={system.id} data-reveal key={system.id}><div className="instrument-index">{system.index}</div><div className="instrument-mark"><img src={system.mark} alt={system.name} width="700" height="700" loading="lazy" /></div><div className="instrument-copy"><span>{system.status}</span><h3>{system.name}</h3><p className="instrument-role">{system.role}</p><p>{system.text}</p><a href={system.href}>{c.systemsCta}<ArrowUpRight /></a></div></article>)}</div>
    <Terminal language={language} />
  </div></section>;
}

function Architecture({ language }) {
  const c = content[language];
  return <section className="gallery architecture section" id="architecture" aria-labelledby="architecture-title"><div className="shell">
    <div className="section-heading" data-reveal><div><p className="eyebrow">{c.architectureLabel}</p><h2 id="architecture-title">{c.architectureTitle}</h2></div><p>{c.architectureIntro}</p></div>
    <ol className="pipeline">{c.pipeline.map(step => <li data-reveal key={step.n}><div className="pipeline-index">{step.n}</div><div className="pipeline-stage">{step.stage}</div><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
    <div className="cloud-targets">{c.cloudTargets.map(target => <div data-reveal key={target[0]}><span>{target[0]}</span><strong>{target[1]}</strong></div>)}</div><p className="architecture-note">{c.architectureNote}</p>
  </div></section>;
}

function Research({ language }) {
  const c = content[language];
  const refs = [`${company.github}/HexCore-Helix`, `${company.github}/hexcore-souper`, `${company.github}/HikariSystem-HexCore/tree/main/docs`];
  return <section className="research section" id="research" aria-labelledby="research-title"><div className="research-art" aria-hidden="true" /><div className="shell research-shell">
    <div className="section-heading inverse" data-reveal><div><p className="eyebrow">{c.researchLabel}</p><h2 id="research-title">{c.researchTitle}</h2></div><p>{c.researchIntro}</p></div>
    <div className="research-grid"><article className="security-record" data-reveal><span>VR / 01</span><h3>{c.securityTitle}</h3><p>{c.securityText}</p><ul>{c.programs.map(program => <li key={program}>◇ {program}</li>)}</ul><small>{c.programNote}</small></article><div className="preprints" data-reveal><h3>{c.preprintTitle}</h3>{c.preprints.map((preprint, index) => <a href={refs[index]} key={preprint[0]}><span>0{index + 1}</span><div><strong>{preprint[0]}</strong><p>{preprint[1]}</p></div><ArrowUpRight /></a>)}</div></div>
  </div></section>;
}

function Roadmap({ language }) {
  const c = content[language];
  return <section className="gallery roadmap section" id="roadmap" aria-labelledby="roadmap-title"><div className="shell">
    <div className="section-heading" data-reveal><div><p className="eyebrow">{c.roadmapLabel}</p><h2 id="roadmap-title">{c.roadmapTitle}</h2></div><p>{c.roadmapIntro}</p></div>
    <div className="roadmap-shell"><div className="roadmap-rail"><span data-roadmap-rail /></div><ol className="roadmap-list">{c.roadmap.map(item => <li data-reveal key={item.period}><div className="roadmap-period">{item.period}</div><div className="roadmap-node"><span>{item.status}</span><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></div>
  </div></section>;
}

function Access({ language, openModal }) {
  const c = content[language];
  return <section className="access" id="access" aria-labelledby="access-title"><div className="shell access-inner" data-reveal><div><p className="eyebrow">{c.ctaLabel}</p><h2 id="access-title">{c.ctaTitle}</h2></div><div><p>{c.ctaText}</p><div><button className="button button-bone" type="button" onClick={() => openModal('enterprise')}>{c.ctaPrimary}<ArrowRight /></button><button className="text-link light" type="button" onClick={() => openModal('api')}>{c.ctaSecondary}</button></div></div></div></section>;
}

function Footer({ language }) {
  const c = content[language]; const prefix = language === 'pt' ? '/pt-br/' : '/';
  const legal = [`${prefix}privacy.html`, `${prefix}terms.html`, `${prefix}ethical-use.html`];
  return <footer className="footer"><div className="footer-wordmark" aria-hidden="true">AKASHA</div><div className="shell"><div className="footer-primary"><div><a className="footer-brand" href={prefix}><img src="/assets/akasha-hydra.png" alt="" width="64" height="64" /><span>AKASHA CORPORATION</span></a><p>{c.footerPitch}</p></div><div className="footer-contact"><a href={`mailto:${company.email}`}><Mail />{company.email}</a><a href={company.github}><Github />GitHub</a></div></div><div className="legal-identity"><div><span>LEGAL ENTITY</span><strong>{company.legalName}</strong></div><div><span>CNPJ</span><strong>{company.taxId}</strong></div><div><span>LOCATION</span><strong>{c.legalLocation}</strong></div></div><div className="footer-bottom"><span>© {new Date().getUTCFullYear()} AKASHA CORPORATION</span><nav>{legal.map((href, index) => <a href={href} key={href}>{c.footerLinks[index]}</a>)}</nav><a href="#top" aria-label={tx('Back to top', 'Voltar ao topo', language)}>↑</a></div></div></footer>;
}

function AccessModal({ language, dialogRef, requestType }) {
  const c = content[language].modal;
  const submit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const kind = requestType === 'api' ? 'API waitlist' : requestType === 'model' ? 'Sovereign SLM research' : 'Enterprise early access';
    const subject = `[Akasha ${kind}] ${values.get('company')}`;
    const body = [`Request type: ${kind}`, `Name: ${values.get('name')}`, `Company: ${values.get('company')}`, `Work email: ${values.get('email')}`, `Deployment: ${values.get('deployment')}`, '', 'Technical use case:', values.get('useCase')].join('\n');
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return <dialog className="access-modal" ref={dialogRef} aria-labelledby="modal-title"><form className="modal-shell" onSubmit={submit}><button className="modal-close" type="button" aria-label={c.cancel} onClick={() => dialogRef.current?.close()}><X /></button><p className="eyebrow">{c.eyebrow}</p><h2 id="modal-title">{c.title}</h2><p className="modal-intro">{c.text}</p><div className="form-grid"><label>{c.name}<input name="name" autoComplete="name" required /></label><label>{c.company}<input name="company" autoComplete="organization" required /></label><label className="full">{c.email}<input name="email" type="email" autoComplete="email" required /></label><label className="full">{c.useCase}<textarea name="useCase" rows="4" required /></label><label className="full">{c.deployment}<select name="deployment">{c.deploymentOptions.map(option => <option key={option}>{option}</option>)}</select></label></div><p className="modal-privacy">{c.privacy}</p><button className="button button-ink modal-submit" type="submit">{c.submit}<ArrowRight /></button></form></dialog>;
}

function LegalPage({ language, type }) {
  const c = content[language]; const titleKey = `${type}Title`; const introKey = `${type}Intro`; const sectionsKey = `${type}Sections`; const home = language === 'pt' ? '/pt-br/' : '/';
  return <main id="main" className="legal shell"><a className="back-link" href={home}>← {c.legal.home}</a><p className="eyebrow">AKASHA / LEGAL</p><h1>{c.legal[titleKey]}</h1><p className="legal-intro">{c.legal[introKey]}</p>{c.legal[sectionsKey].map((section, index) => <section key={section[0]}><span>0{index + 1}</span><div><h2>{section[0]}</h2><p>{section[1]}</p></div></section>)}</main>;
}

function NotFound({ language }) {
  return <main id="main" className="legal shell"><p className="eyebrow">404 / AKASHA</p><h1>{tx('Page not found.', 'Página não encontrada.', language)}</h1><p className="legal-intro">{tx('The requested address is not part of the current AkashaCorporation website.', 'O endereço solicitado não faz parte do site atual da AkashaCorporation.', language)}</p><a className="button button-ink" href={language === 'pt' ? '/pt-br/' : '/'}>{tx('Return home', 'Voltar ao início', language)}<ArrowRight /></a></main>;
}

export default function App({ initialPath }) {
  const path = initialPath ?? (typeof window === 'undefined' ? '/' : window.location.pathname);
  const [language, setLanguage] = useState(path.startsWith('/pt-br') ? 'pt' : 'en');
  const [requestType, setRequestType] = useState('enterprise');
  const dialogRef = useRef(null);
  const isHome = KNOWN_HOME_PATHS.has(path);
  const legalType = LEGAL_PATHS[path];
  useAkashaMotion(isHome);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    const routeContent = content[language];
    if (isHome) {
      document.title = routeContent.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', routeContent.description);
    }
  }, [language, isHome]);

  const openModal = type => { setRequestType(type); dialogRef.current?.showModal(); };
  const legal = Boolean(legalType) || !isHome;
  return <>
    <Header language={language} setLanguage={setLanguage} openModal={openModal} legal={legal} />
    {isHome ? <main id="main"><Hero language={language} openModal={openModal} /><DisciplineStrip language={language} /><Products language={language} openModal={openModal} /><Systems language={language} /><Architecture language={language} /><Research language={language} /><Roadmap language={language} /><Access language={language} openModal={openModal} /></main> : legalType ? <LegalPage language={language} type={legalType} /> : <NotFound language={language} />}
    <Footer language={language} />
    <AccessModal language={language} dialogRef={dialogRef} requestType={requestType} />
  </>;
}

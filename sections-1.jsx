/* eslint-disable */
// ============================================================
// Sections — top of page: Navbar, Hero, Marquee, HexCore, Quote
// ============================================================
const { useState, useEffect, useRef } = React;

// ---------- Brand mark (dragon-ish hex glyph) ----------
function AkashaGlyph({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="ak-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF2D55"/>
          <stop offset="0.6" stopColor="#DC143C"/>
          <stop offset="1" stopColor="#7A0A1E"/>
        </linearGradient>
        <filter id="ak-glow"><feGaussianBlur stdDeviation="1.2"/></filter>
      </defs>
      {/* hexagon frame */}
      <polygon points="32,4 56,18 56,46 32,60 8,46 8,18"
               stroke="#3a2a30" strokeWidth="1" fill="#0a0608"/>
      {/* angular dragon head — geometric */}
      <g fill="url(#ak-g)" filter="url(#ak-glow)">
        <polygon points="20,22 32,18 38,26 30,30 24,28"/>
        <polygon points="30,30 40,26 46,34 38,40 32,38"/>
        <polygon points="38,40 46,38 44,46 36,46"/>
        <polygon points="20,30 26,34 22,40 16,36"/>
        <polygon points="40,18 46,16 48,22 42,22"/>
      </g>
      <circle cx="36" cy="28" r="1.2" fill="#fff"/>
    </svg>
  );
}
window.AkashaGlyph = AkashaGlyph;

// ============================================================
// NAVBAR
// ============================================================
function Navbar() {
  const links = [
    { label: "What we build", href: "#about" },
    { label: "HexCore IDE",   href: "#hexcore" },
    { label: "Arsenal",       href: "#arsenal" },
    { label: "Research",      href: "#research" },
    { label: "Team",          href: "#team" },
  ];
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#" className="flex items-center gap-3" style={{textDecoration:"none", color:"inherit"}}>
          <div className="logo-mark"><img src="Akasha.png" alt="Akasha Logo" style={{width:"22px", height:"22px", objectFit:"contain"}}/></div>
          <div>
            <div style={{fontFamily:"var(--font-mono)", fontSize:"12px", letterSpacing:"0.22em", fontWeight:600}}>
              AKASHA<span style={{color:"var(--crimson)", marginLeft:"6px"}}>CORP</span>
            </div>
            <div style={{fontFamily:"var(--font-mono)", fontSize:"8.5px", letterSpacing:"0.32em", color:"var(--text-faint)", marginTop:"2px"}}>
              HIKARISYSTEM · EST. 2024
            </div>
          </div>
        </a>

        <nav className="nav-links">
          {links.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
        </nav>

        <a href="https://github.com/AkashaCorporation" target="_blank" rel="noopener" className="btn btn-ghost" style={{textDecoration:"none"}}>
          <Icon.Github size={14}/>
          Repositories
          <Icon.ArrowUpRight size={12}/>
        </a>
      </div>
    </header>
  );
}
window.Navbar = Navbar;

// ============================================================
// HERO — editorial dark crimson
// ============================================================
function Hero() {
  return (
    <section data-screen-label="01 Hero" className="relative" style={{paddingTop:"96px", paddingBottom:"120px", overflow:"hidden"}}>
      {/* background field */}
      <div className="grid-bg"/>
      <div className="spotlight pulse-glow" style={{left:"50%", top:"15%", transform:"translateX(-50%)"}}/>
      <div style={{position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, rgba(220,20,60,0.06), transparent 60%)", pointerEvents:"none"}}/>

      <div className="container relative" style={{zIndex:2}}>
        {/* meta row top */}
        <div className="flex justify-between items-center fade-up" style={{marginBottom:"80px", flexWrap:"wrap", gap:"16px"}}>
          <div className="mono" style={{fontSize:"10px", letterSpacing:"0.24em", color:"var(--text-faint)"}}>
            № 001 / SYS-OPS / 2026.05
          </div>
          <div className="flex items-center gap-2">
            <span className="dot" style={{width:"6px", height:"6px", borderRadius:"50%", background:"var(--status-ok)", boxShadow:"0 0 8px var(--status-ok)"}}/>
            <span className="mono" style={{fontSize:"10px", letterSpacing:"0.18em", color:"var(--text-muted)"}}>
              ALL SYSTEMS NOMINAL
            </span>
          </div>
        </div>

        {/* main hero */}
        <div className="flex col items-center text-center" style={{maxWidth:"980px", margin:"0 auto"}}>
          <div className="pill pill--crimson fade-up delay-1" style={{marginBottom:"40px"}}>
            <span className="dot"/>
            Low-Level Security Research
          </div>

          <h1 className="display fade-up delay-2" style={{
            fontSize: "clamp(56px, 11vw, 168px)",
            margin: 0,
            color: "var(--text)",
          }}>
            AKASHA<br/>
            <span style={{color:"var(--crimson)"}}>CORPOR<span className="serif-italic" style={{
              fontWeight: 400,
              letterSpacing: "-0.05em",
              fontSize: "1.05em",
              color: "var(--crimson-bright)",
            }}>a</span>TION</span>
          </h1>

          <div className="mono fade-up delay-3" style={{
            fontSize: "11px",
            letterSpacing: "0.36em",
            color: "var(--text-muted)",
            marginTop: "32px",
          }}>
            SECURITY TOOLING <span style={{color:"var(--crimson)", margin:"0 14px"}}>·</span>
            REVERSE ENGINEERING <span style={{color:"var(--crimson)", margin:"0 14px"}}>·</span>
            BINARY ANALYSIS
          </div>

          {/* Pillars grid */}
          <div className="grid fade-up delay-4" style={{
            gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",
            gap:"1px",
            width:"100%",
            marginTop:"72px",
            background:"var(--border)",
            border:"1px solid var(--border)",
            borderRadius:"14px",
            overflow:"hidden",
          }}>
            {DATA.pillars.map(p => (
              <div key={p.k} style={{background:"var(--bg-1)", padding:"22px 24px", textAlign:"left"}}>
                <div className="mono" style={{fontSize:"9.5px", letterSpacing:"0.2em", color:"var(--text-faint)", textTransform:"uppercase", marginBottom:"8px"}}>
                  {p.k}
                </div>
                <div style={{fontFamily:"var(--font-mono)", fontSize:"13px", color:"var(--text)", fontWeight:500}}>
                  {p.v}
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="fade-up delay-5" style={{marginTop:"72px", maxWidth:"680px"}}>
            <p className="serif-italic" style={{
              fontSize:"28px", lineHeight:1.3, color:"var(--text-2)", margin:0,
            }}>
              “To master the machine, one must first read its records.”
            </p>
            <div className="mono" style={{fontSize:"10px", letterSpacing:"0.24em", color:"var(--text-faint)", marginTop:"16px"}}>
              — HIKARISYSTEM DOCTRINE
            </div>
          </div>
        </div>

        {/* About / what we build */}
        <div id="about" className="grid" style={{
          marginTop:"140px",
          gridTemplateColumns:"minmax(0, 360px) minmax(0, 1fr)",
          gap:"80px",
          maxWidth:"1100px",
          marginLeft:"auto", marginRight:"auto",
          paddingTop:"56px",
          borderTop:"1px solid var(--border)",
        }}>
          <div>
            <div className="eyebrow" style={{marginBottom:"16px"}}>§ 01 — What we build</div>
            <h2 className="display" style={{fontSize:"40px", margin:0, color:"var(--text)"}}>
              Where most tools<br/><span style={{color:"var(--text-muted)"}}>stop, ours</span><br/><span style={{color:"var(--crimson)"}}>begins.</span>
            </h2>
          </div>
          <div>
            <p style={{fontSize:"17px", lineHeight:1.6, color:"var(--text-2)", margin:0}}>
              Akasha Corporation develops <strong style={{color:"var(--text)", fontWeight:600}}>low-level security tooling for binary analysis, CPU emulation, reverse engineering, and offensive security</strong>. Our work lives at the boundary between software and hardware.
            </p>
            <p style={{fontSize:"15px", lineHeight:1.7, color:"var(--text-muted)", marginTop:"24px"}}>
              All projects operate under the <span style={{color:"var(--crimson-bright)", fontWeight:600}}>HikariSystem</span> philosophy: lean, composable, built for professionals. We publish in the open. We document negative results. We credit our tools. We do not ship vaporware.
            </p>

            <div className="flex gap-3" style={{marginTop:"36px"}}>
              <a href="#hexcore" className="btn btn-primary" style={{textDecoration:"none"}}>
                Explore HexCore <Icon.ArrowRight size={14}/>
              </a>
              <a href="#arsenal" className="btn" style={{textDecoration:"none"}}>
                <Icon.Layers size={14}/> Browse Arsenal
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;

// ============================================================
// MARQUEE BAND
// ============================================================
function Marquee() {
  const items = [
    {t:"AKASHA CORPORATION", g:false},
    {t:"HIKARISYSTEM", g:true},
    {t:"HEXCORE IDE", g:false},
    {t:"SCYLLA STUDIO", g:true},
    {t:"BINARY ANALYSIS", g:false},
    {t:"PROJECT AZOTH", g:true},
    {t:"PERSEUS · PATHFINDER · SOUPER", g:false},
  ];
  // Duplicate twice for seamless scroll
  const all = [...items, ...items];
  return (
    <div className="marquee" data-screen-label="02 Marquee band">
      <div className="marquee-track">
        {all.map((it, i) => (
          <div key={i} className="marquee-item">
            <span className={`marquee-text ${it.g ? "marquee-text--ghost" : ""}`}>{it.t}</span>
            <span className="marquee-dot"/>
          </div>
        ))}
      </div>
    </div>
  );
}
window.Marquee = Marquee;

// ============================================================
// HEXCORE IDE — interactive pipeline
// ============================================================
function HexCoreIDE() {
  const [idx, setIdx] = useState(0);
  const layer = DATA.pipelineLayers[idx];

  return (
    <section id="hexcore" data-screen-label="03 HexCore IDE" style={{padding:"140px 0", borderTop:"1px solid var(--border)"}}>
      <div className="container">
        {/* Header */}
        <div className="grid" style={{gridTemplateColumns:"minmax(0, 1fr) minmax(0, 1fr)", gap:"64px", marginBottom:"64px", alignItems:"end"}}>
          <div>
            <div className="eyebrow" style={{marginBottom:"24px"}}>§ 02 — Flagship product</div>
            <h2 className="display" style={{fontSize:"clamp(48px, 7vw, 96px)", margin:0, color:"var(--text)"}}>
              HEXCORE<br/>
              <span style={{color:"var(--crimson)"}}>IDE</span>
              <span className="mono" style={{
                fontSize:"0.22em", color:"var(--text-faint)", letterSpacing:"0.1em",
                marginLeft:"16px", verticalAlign:"middle", fontWeight:400,
              }}>
                v3.8.0
              </span>
            </h2>
          </div>
          <div>
            <p style={{fontSize:"16px", lineHeight:1.65, color:"var(--text-2)", margin:0}}>
              <strong style={{color:"var(--text)", fontWeight:600}}>HikariSystem-HexCore</strong> is a professional reverse engineering environment purpose-built for malware analysis and binary research. Built from the ground up on Code-OSS — <em className="serif-italic" style={{color:"var(--crimson-bright)"}}>not a wrapper</em>, but a native high-performance binary analysis pipeline.
            </p>
            <div className="flex gap-4" style={{marginTop:"28px", flexWrap:"wrap"}}>
              <div className="flex items-center gap-2">
                <span className="status status-ok">9 LAYERS</span>
                <span className="mono" style={{fontSize:"10px", color:"var(--text-muted)"}}>Production</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="status status-info">Code-OSS</span>
                <span className="mono" style={{fontSize:"10px", color:"var(--text-muted)"}}>Native pipeline</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline chips */}
        <div className="chip-row" style={{marginBottom:"40px"}}>
          {DATA.pipelineLayers.map((l, i) => (
            <button key={l.name} onClick={() => setIdx(i)} className={`chip ${i === idx ? "active" : ""}`}>
              <span className="chip-num">{String(i+1).padStart(2,"0")}</span>
              <span>{l.name}</span>
              {i < DATA.pipelineLayers.length - 1 && <Icon.ChevronRight size={11} color="currentColor"/>}
            </button>
          ))}
        </div>

        {/* Main interactive — sidebar + detail */}
        <div className="grid" style={{gridTemplateColumns:"minmax(0, 340px) minmax(0, 1fr)", gap:"24px"}}>
          {/* Sidebar */}
          <div className="flex col gap-2">
            {DATA.pipelineLayers.map((l, i) => (
              <div key={l.name} onClick={() => setIdx(i)} className={`layer ${i === idx ? "active" : ""}`}>
                <div>
                  <div className="mono" style={{fontSize:"9px", letterSpacing:"0.2em", color:"var(--text-faint)", marginBottom:"4px"}}>
                    LAYER {String(i+1).padStart(2,"0")}
                  </div>
                  <div style={{fontSize:"14px", fontWeight:600, color: i === idx ? "var(--text)" : "var(--text-2)"}}>
                    {l.name}
                  </div>
                </div>
                <span className={`status ${l.status === "Production" ? "status-ok" : "status-warn"}`}>
                  {l.status}
                </span>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          <div className="card" style={{padding:"0", overflow:"hidden"}}>
            {/* Top bar */}
            <div style={{
              padding:"16px 24px",
              borderBottom:"1px solid var(--border)",
              background:"var(--bg-2)",
              display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px",
            }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span style={{width:10, height:10, borderRadius:"50%", background:"var(--crimson)"}}/>
                  <span style={{width:10, height:10, borderRadius:"50%", background:"#fbbf24"}}/>
                  <span style={{width:10, height:10, borderRadius:"50%", background:"#4ade80"}}/>
                </div>
                <span className="mono" style={{fontSize:"11px", letterSpacing:"0.16em", color:"var(--text)", fontWeight:500}}>
                  {layer.tech}
                </span>
              </div>
              <div className="mono" style={{fontSize:"10px", color:"var(--text-muted)"}}>
                METRIC <span style={{color:"var(--crimson-bright)", marginLeft:"8px"}}>{layer.metric}</span>
              </div>
            </div>

            {/* Body */}
            <div style={{padding:"36px"}}>
              <div className="flex items-center gap-3" style={{marginBottom:"12px"}}>
                <span className="mono" style={{fontSize:"10px", color:"var(--crimson)", letterSpacing:"0.2em"}}>
                  {String(idx+1).padStart(2,"0")} / 09
                </span>
                <span style={{height:"1px", flex:1, background:"var(--border)"}}/>
              </div>
              <h3 className="display" style={{fontSize:"32px", margin:"0 0 14px", color:"var(--text)"}}>
                {layer.name} <span style={{color:"var(--text-muted)", fontWeight:400, textTransform:"none", letterSpacing:0}} className="serif-italic">
                  subsystem
                </span>
              </h3>
              <p style={{fontSize:"15px", lineHeight:1.65, color:"var(--text-2)", margin:0}}>
                {layer.details}
              </p>

              <div className="code-block" style={{marginTop:"28px"}}>
                <div className="code-tag">SIMULATED OUTPUT</div>
                <pre style={{margin:0, whiteSpace:"pre", fontFamily:"inherit"}}>{layer.code}</pre>
                <span style={{display:"inline-block", width:"8px", height:"14px", background:"var(--crimson)", marginLeft:"2px", verticalAlign:"text-bottom"}} className="blink"/>
              </div>
            </div>
          </div>
        </div>

        {/* Release notes card */}
        <div className="card" style={{marginTop:"56px", padding:"36px", overflow:"hidden", position:"relative"}}>
          <div style={{
            position:"absolute", top:"-80px", right:"-80px", width:"260px", height:"260px",
            background:"radial-gradient(circle, var(--crimson-glow-soft), transparent 70%)",
            pointerEvents:"none",
          }}/>
          <div className="flex items-center justify-between" style={{flexWrap:"wrap", gap:"24px"}}>
            <div className="flex items-center gap-4">
              <div style={{
                padding:"12px",
                background:"rgba(220,20,60,0.08)",
                border:"1px solid var(--crimson-deep)",
                borderRadius:"10px",
                color:"var(--crimson-bright)",
              }}>
                <Icon.GitBranch size={20}/>
              </div>
              <div>
                <div className="mono" style={{fontSize:"10px", letterSpacing:"0.2em", color:"var(--text-faint)", marginBottom:"4px"}}>
                  LATEST RELEASE
                </div>
                <h3 style={{margin:0, fontSize:"22px", color:"var(--text)", fontWeight:700, letterSpacing:"-0.02em"}}>
                  v3.8.0 <span className="serif-italic" style={{color:"var(--text-muted)", fontWeight:400, fontSize:"18px", marginLeft:"6px"}}>
                    “Souper era”
                  </span>
                </h3>
              </div>
            </div>
            <a href="#" className="btn btn-primary" style={{textDecoration:"none"}}>
              <Icon.Download size={14}/> Release Notes
            </a>
          </div>
          <p style={{fontSize:"14px", lineHeight:1.7, color:"var(--text-muted)", marginTop:"28px", paddingTop:"24px", borderTop:"1px solid var(--border)"}}>
            Pathfinder DWARF/PDB/ET_REL metadata feeder unlocks full debug content on kernel modules · Helix v0.9.0 with debug-info-guided type recovery (0% → 90%+ typed parameters on stripped <code style={{background:"var(--bg-2)", color:"var(--text)", padding:"2px 6px", borderRadius:"4px", fontFamily:"var(--font-mono)", fontSize:"12px", border:"1px solid var(--border)"}}>.ko</code>) · Project Azoth clean-room dynamic analysis engine (Rust + C++23, Apache-2.0) · Project Perseus zero-copy Unicorn hooks (1.34× throughput, eliminates 65% TSFN drop rate) · Souper LLVM IR superoptimizer with Z3 SMT solving · Refcount Scanner · Anti-Analysis Detection · API Hash Resolver · Job Queue Manager for concurrent agentic pipelines.
          </p>
        </div>
      </div>
    </section>
  );
}
window.HexCoreIDE = HexCoreIDE;

// ============================================================
// QUOTE BAND — massive editorial statement
// ============================================================
function QuoteBand() {
  return (
    <section data-screen-label="04 Doctrine band" style={{padding:"160px 0", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", position:"relative", overflow:"hidden"}}>
      <div className="spotlight" style={{left:"-200px", top:"50%", transform:"translateY(-50%)", opacity:0.6}}/>
      <div className="container-narrow text-center relative" style={{zIndex:2}}>
        <div className="eyebrow" style={{marginBottom:"32px"}}>§ 03 — Doctrine</div>
        <h2 className="display" style={{fontSize:"clamp(40px, 6.5vw, 84px)", margin:0, color:"var(--text)", lineHeight:0.95}}>
          Our work lives at the<br/>
          <span style={{color:"var(--text-faint)"}}>boundary between software</span><br/>
          <span style={{color:"var(--text-faint)"}}>and hardware.</span><br/>
          <span className="serif-italic" style={{color:"var(--crimson)", textTransform:"none", fontWeight:400, letterSpacing:"-0.04em"}}>
            Where most tools stop, ours begins.
          </span>
        </h2>
      </div>
    </section>
  );
}
window.QuoteBand = QuoteBand;

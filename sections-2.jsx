/* eslint-disable */
// ============================================================
// Sections — bottom of page: Arsenal, Roadmap, Research, Team,
// Practice, Footer, Dock
// ============================================================
const { useState: useState2 } = React;

// ============================================================
// ARSENAL — tabbed: products / engines
// ============================================================
function Arsenal() {
  const [tab, setTab] = useState2("arsenal");
  return (
    <section id="arsenal" data-screen-label="05 Arsenal" style={{padding:"140px 0", borderTop:"1px solid var(--border)"}}>
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-end" style={{marginBottom:"56px", flexWrap:"wrap", gap:"24px"}}>
          <div style={{maxWidth:"640px"}}>
            <div className="eyebrow" style={{marginBottom:"24px"}}>§ 04 — HikariSystem Core</div>
            <h2 className="display" style={{fontSize:"clamp(40px, 6vw, 80px)", margin:0, color:"var(--text)"}}>
              The <span style={{color:"var(--crimson)"}}>Arsenal</span><br/>
              &amp; <span className="serif-italic" style={{textTransform:"none", color:"var(--text-2)", fontWeight:400, letterSpacing:"-0.04em"}}>
                native engines
              </span>
            </h2>
            <p style={{fontSize:"15px", lineHeight:1.65, color:"var(--text-muted)", marginTop:"24px"}}>
              A curated suite of native toolsets and libraries built for low-level architecture execution, threat intelligence, and hardware-accelerated analysis.
            </p>
          </div>

          <div className="tabs">
            <button className={`tab ${tab === "arsenal" ? "active" : ""}`} onClick={() => setTab("arsenal")}>HikariSystem Arsenal</button>
            <button className={`tab ${tab === "engines" ? "active" : ""}`} onClick={() => setTab("engines")}>Native Engine Suite</button>
          </div>
        </div>

        {/* Arsenal grid */}
        {tab === "arsenal" && (
          <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit, minmax(360px, 1fr))", gap:"20px"}}>
            {DATA.arsenal.map((p, i) => (
              <a key={p.name} href={p.github} target="_blank" rel="noopener"
                 className="card" style={{padding:"32px", textDecoration:"none", color:"inherit", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:"260px"}}>
                <div>
                  <div className="flex items-center justify-between" style={{paddingBottom:"16px", borderBottom:"1px solid var(--border)"}}>
                    <div className="flex items-center gap-3">
                      <div style={{padding:"8px", background:"rgba(220,20,60,0.06)", border:"1px solid var(--crimson-deep)", borderRadius:"8px", color:"var(--crimson-bright)"}}>
                        <Icon.Shield size={16}/>
                      </div>
                      <div>
                        <div style={{fontSize:"18px", fontWeight:700, color:"var(--text)", letterSpacing:"-0.01em"}}>{p.name}</div>
                        <div className="mono" style={{fontSize:"10px", color:"var(--text-faint)", letterSpacing:"0.16em", textTransform:"uppercase", marginTop:"3px"}}>{p.tagline}</div>
                      </div>
                    </div>
                    <span className="mono" style={{fontSize:"10px", padding:"3px 8px", borderRadius:"4px", border:"1px solid var(--border-strong)", color:"var(--text-2)", letterSpacing:"0.1em"}}>
                      {p.version}
                    </span>
                  </div>
                  <p style={{fontSize:"14px", lineHeight:1.6, color:"var(--text-muted)", marginTop:"20px"}}>
                    {p.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2" style={{marginTop:"28px", color:"var(--text)", fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.18em", textTransform:"uppercase"}}>
                  <span style={{color:"var(--text-faint)"}}>0{i+1}</span>
                  <span>Browse repository</span>
                  <Icon.ArrowUpRight size={12}/>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Engines table */}
        {tab === "engines" && (
          <div className="card" style={{overflow:"hidden", padding:0}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%", borderCollapse:"collapse", minWidth:"720px"}}>
                <thead>
                  <tr style={{background:"var(--bg-2)", borderBottom:"1px solid var(--border)"}}>
                    {["Engine Package", "Role · Pipeline Responsibility", "Version", "Registry"].map(h =>
                      <th key={h} style={{textAlign: h === "Registry" ? "right" : "left", padding:"18px 24px", fontFamily:"var(--font-mono)", fontSize:"9.5px", letterSpacing:"0.2em", color:"var(--text-faint)", fontWeight:600, textTransform:"uppercase"}}>{h}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {DATA.engines.map((e, i) => (
                    <tr key={e.name} style={{borderBottom: i < DATA.engines.length - 1 ? "1px solid var(--border)" : "none", transition:"background 180ms"}}
                        onMouseEnter={(ev) => ev.currentTarget.style.background = "rgba(220,20,60,0.03)"}
                        onMouseLeave={(ev) => ev.currentTarget.style.background = "transparent"}>
                      <td style={{padding:"18px 24px"}}>
                        <div className="flex items-center gap-3">
                          <Icon.Package size={14} color="var(--text-muted)"/>
                          <span className="mono" style={{color:"var(--text)", fontWeight:600, fontSize:"13px"}}>{e.name}</span>
                        </div>
                      </td>
                      <td style={{padding:"18px 24px", color:"var(--text-muted)", fontSize:"13px"}}>{e.role}</td>
                      <td style={{padding:"18px 24px"}}>
                        <span className="mono" style={{fontSize:"10px", padding:"3px 8px", borderRadius:"4px", border:"1px solid var(--border-strong)", color:"var(--text-2)"}}>
                          {e.version}
                        </span>
                      </td>
                      <td style={{padding:"18px 24px", textAlign:"right"}}>
                        {e.npm ? (
                          <a href="#" className="mono" style={{fontSize:"10px", color:"var(--crimson-bright)", letterSpacing:"0.14em", textTransform:"uppercase", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"4px"}}>
                            npm registry <Icon.ArrowUpRight size={11}/>
                          </a>
                        ) : (
                          <span className="mono" style={{fontSize:"10px", color:"var(--text-faint)", letterSpacing:"0.14em", textTransform:"uppercase"}}>
                            in-house build
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
window.Arsenal = Arsenal;

// ============================================================
// ROADMAP
// ============================================================
function Roadmap() {
  return (
    <section id="roadmap" data-screen-label="06 Roadmap" style={{padding:"140px 0", borderTop:"1px solid var(--border)"}}>
      <div className="container" style={{maxWidth:"960px"}}>
        <div className="text-center" style={{marginBottom:"80px"}}>
          <div className="eyebrow" style={{marginBottom:"24px"}}>§ 05 — Development timeline</div>
          <h2 className="display" style={{fontSize:"clamp(40px, 6vw, 80px)", margin:0, color:"var(--text)"}}>
            Ecosystem<br/><span style={{color:"var(--crimson)"}}>roadmap</span>
          </h2>
          <p style={{fontSize:"15px", lineHeight:1.65, color:"var(--text-muted)", maxWidth:"540px", margin:"24px auto 0"}}>
            Track active research stages, pending patches, and upcoming major compiler system releases.
          </p>
        </div>

        <div className="timeline">
          {DATA.roadmap.map((r, i) => {
            const isReleased = r.status === "Released";
            const isPlanned  = r.status === "Planned";
            return (
              <div key={r.version} className="timeline-item">
                <div className={`timeline-dot ${isReleased ? "released" : isPlanned ? "planned" : "research"}`}>
                  {isReleased ? <Icon.CheckCircle size={11} color="white"/> :
                   isPlanned  ? <Icon.Circle size={9} color="var(--status-info)"/> :
                                <Icon.HelpCircle size={11} color="var(--status-warn)"/>}
                </div>
                <div className="card" style={{padding:"24px 28px"}}>
                  <div className="flex items-center justify-between" style={{flexWrap:"wrap", gap:"12px", marginBottom:"14px"}}>
                    <div className="flex items-center gap-3">
                      <span className="mono" style={{fontSize:"18px", fontWeight:700, color:"var(--text)", letterSpacing:"0.02em"}}>{r.version}</span>
                      <span className={`status ${isReleased ? "status-ok" : isPlanned ? "status-info" : "status-warn"}`}>
                        {r.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mono" style={{fontSize:"10px", color:"var(--text-faint)", letterSpacing:"0.16em"}}>
                      <Icon.Calendar size={12}/>
                      <span>{isReleased ? "COMPLETED" : isPlanned ? "DEVELOPMENT" : "RESEARCH"}</span>
                    </div>
                  </div>
                  <h3 style={{margin:0, fontSize:"15px", fontWeight:600, color:"var(--text)", letterSpacing:"-0.01em"}}>
                    {r.title}
                  </h3>
                  <p style={{margin:"10px 0 0", fontSize:"14px", lineHeight:1.6, color:"var(--text-muted)"}}>
                    {r.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
window.Roadmap = Roadmap;

// ============================================================
// RESEARCH — groups + paper
// ============================================================
function Research() {
  return (
    <section id="research" data-screen-label="07 Research" style={{padding:"140px 0", borderTop:"1px solid var(--border)"}}>
      <div className="container">
        <div className="grid" style={{gridTemplateColumns:"minmax(0, 1fr) minmax(0, 1fr)", gap:"64px", marginBottom:"64px", alignItems:"end"}}>
          <div>
            <div className="eyebrow" style={{marginBottom:"24px"}}>§ 06 — Academic & systems research</div>
            <h2 className="display" style={{fontSize:"clamp(40px, 6vw, 80px)", margin:0, color:"var(--text)"}}>
              Research<br/>
              <span className="serif-italic" style={{textTransform:"none", color:"var(--crimson)", fontWeight:400, letterSpacing:"-0.04em"}}>
                groups & papers
              </span>
            </h2>
          </div>
          <p style={{fontSize:"15px", lineHeight:1.65, color:"var(--text-muted)", margin:0}}>
            Akasha Corporation operates across distinct research groups, collaborating to push the boundaries of static disassembly, runtime emulation, and offensive automation.
          </p>
        </div>

        <div className="grid" style={{gridTemplateColumns:"minmax(0, 7fr) minmax(0, 5fr)", gap:"32px", alignItems:"start"}}>
          {/* Groups */}
          <div className="flex col gap-4">
            <div className="mono flex items-center gap-2" style={{fontSize:"10px", letterSpacing:"0.2em", color:"var(--text-faint)", textTransform:"uppercase", marginBottom:"4px"}}>
              <Icon.Beaker size={12} color="var(--crimson-bright)"/>
              <span>Research focus groups</span>
            </div>
            {DATA.researchGroups.map((g, i) => (
              <div key={g.name} className="card" style={{padding:"28px"}}>
                <div className="flex items-center gap-3" style={{marginBottom:"14px"}}>
                  <span className="mono" style={{fontSize:"10px", color:"var(--crimson)", letterSpacing:"0.2em"}}>GRP-{String(i+1).padStart(2,"0")}</span>
                  <span style={{flex:1, height:"1px", background:"var(--border)"}}/>
                </div>
                <h4 style={{margin:0, fontSize:"22px", fontWeight:700, color:"var(--text)", letterSpacing:"-0.02em"}}>
                  {g.name}
                </h4>
                <p style={{margin:"12px 0 24px", fontSize:"14px", lineHeight:1.65, color:"var(--text-muted)"}}>
                  {g.description}
                </p>
                <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:"24px", paddingTop:"20px", borderTop:"1px solid var(--border)"}}>
                  <div>
                    <div className="mono flex items-center gap-1.5" style={{fontSize:"9px", letterSpacing:"0.2em", color:"var(--text-faint)", textTransform:"uppercase", marginBottom:"10px"}}>
                      <Icon.Layers size={11} color="var(--crimson-bright)"/>
                      <span>Active projects</span>
                    </div>
                    <ul style={{margin:0, padding:0, listStyle:"none"}}>
                      {g.projects.map(pr => (
                        <li key={pr} style={{fontSize:"13px", color:"var(--text-2)", padding:"3px 0", display:"flex", alignItems:"center", gap:"8px"}}>
                          <span style={{width:"3px", height:"3px", borderRadius:"50%", background:"var(--crimson)"}}/>{pr}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mono flex items-center gap-1.5" style={{fontSize:"9px", letterSpacing:"0.2em", color:"var(--text-faint)", textTransform:"uppercase", marginBottom:"10px"}}>
                      <Icon.Users size={11} color="var(--crimson-bright)"/>
                      <span>Investigators</span>
                    </div>
                    <ul style={{margin:0, padding:0, listStyle:"none"}}>
                      {g.members.map(m => (
                        <li key={m} style={{fontSize:"13px", color:"var(--text-2)", padding:"3px 0", display:"flex", alignItems:"center", gap:"8px"}}>
                          <span style={{width:"3px", height:"3px", borderRadius:"50%", background:"var(--text-faint)"}}/>{m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paper card */}
          <div style={{position:"sticky", top:"100px"}}>
            <div className="mono flex items-center gap-2" style={{fontSize:"10px", letterSpacing:"0.2em", color:"var(--text-faint)", textTransform:"uppercase", marginBottom:"16px"}}>
              <Icon.Book size={12} color="var(--crimson-bright)"/>
              <span>Academic publications</span>
            </div>
            <div className="card" style={{padding:"32px", position:"relative", overflow:"hidden"}}>
              <div style={{
                position:"absolute", bottom:"-40px", right:"-40px",
                width:"180px", height:"180px",
                background:"radial-gradient(circle, var(--crimson-glow-soft), transparent 70%)",
                pointerEvents:"none",
              }}/>
              <div style={{position:"absolute", top:"24px", right:"24px"}}>
                <Icon.FileText size={28} color="var(--text-faint)"/>
              </div>

              <span className="status status-ok" style={{display:"inline-block"}}>{DATA.paper.badge}</span>
              <h4 style={{margin:"24px 0 0", fontSize:"22px", lineHeight:1.25, color:"var(--text)", fontWeight:700, letterSpacing:"-0.02em"}}>
                <span className="serif-italic" style={{color:"var(--crimson-bright)", fontWeight:400}}>Helix</span> — Multi-level IR decompilation via MLIR dialect lowering with debug-info-guided type recovery and empirical pipeline loss analysis
              </h4>

              <div style={{margin:"28px 0", padding:"20px 0", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)"}}>
                <div className="mono" style={{fontSize:"9px", letterSpacing:"0.2em", color:"var(--text-faint)", textTransform:"uppercase", marginBottom:"6px"}}>
                  Author
                </div>
                <div style={{fontSize:"14px", color:"var(--text)", fontWeight:500}}>{DATA.paper.author}</div>
                <div className="mono" style={{fontSize:"9px", letterSpacing:"0.2em", color:"var(--text-faint)", textTransform:"uppercase", marginTop:"14px", marginBottom:"6px"}}>
                  Affiliation & year
                </div>
                <div style={{fontSize:"14px", color:"var(--text-2)"}}>{DATA.paper.affiliation}</div>
              </div>

              <a href="#" className="btn" style={{textDecoration:"none", width:"100%", justifyContent:"space-between"}}>
                <span className="flex items-center gap-2">
                  <Icon.FileText size={13}/> Access preprint PDF
                </span>
                <Icon.ArrowRight size={13}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Research = Research;

// ============================================================
// TEAM
// ============================================================
function Team() {
  return (
    <section id="team" data-screen-label="08 Team" style={{padding:"140px 0", borderTop:"1px solid var(--border)"}}>
      <div className="container">
        <div className="grid" style={{gridTemplateColumns:"minmax(0, 1fr) minmax(0, 1fr)", gap:"64px", marginBottom:"56px", alignItems:"end"}}>
          <div>
            <div className="eyebrow" style={{marginBottom:"24px"}}>§ 07 — Core investigators</div>
            <h2 className="display" style={{fontSize:"clamp(40px, 6vw, 80px)", margin:0, color:"var(--text)"}}>
              Systems<br/>
              <span style={{color:"var(--crimson)"}}>engineers</span>
            </h2>
          </div>
          <p style={{fontSize:"15px", lineHeight:1.65, color:"var(--text-muted)", margin:0}}>
            Maintained by a core group of low-level researchers, compiler engineers, and security analysts specializing in binary introspection and instrumentation.
          </p>
        </div>

        <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"1px", background:"var(--border)", border:"1px solid var(--border)", borderRadius:"14px", overflow:"hidden"}}>
          {DATA.team.map((m, i) => {
            const IC = Icon[m.icon] || Icon.Hexagon;
            return (
              <a key={m.handle} href={`https://github.com/${m.handle}`} target="_blank" rel="noopener" className="flex col" style={{
                background:"var(--bg-1)", padding:"32px 28px", textDecoration:"none", color:"inherit",
                position:"relative", overflow:"hidden", transition:"background 220ms",
              }} onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                 onMouseLeave={e => e.currentTarget.style.background = "var(--bg-1)"}>
                <div className="flex items-center justify-between" style={{marginBottom:"24px"}}>
                  <div className="mono" style={{fontSize:"11px", letterSpacing:"0.24em", color:"var(--crimson)", fontWeight:600}}>
                    /{m.glyph}
                  </div>
                  <IC size={18} color="var(--text-faint)"/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:"22px", fontWeight:700, color:"var(--text)", letterSpacing:"-0.02em", marginBottom:"8px"}}>
                    {m.handle}
                  </div>
                  <div style={{fontSize:"13px", lineHeight:1.55, color:"var(--text-muted)"}}>
                    {m.role}
                  </div>
                </div>
                <div className="flex items-center gap-2" style={{marginTop:"32px", paddingTop:"20px", borderTop:"1px solid var(--border)"}}>
                  <Icon.Github size={13} color="var(--text-muted)"/>
                  <span className="mono" style={{fontSize:"10px", letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--text-2)"}}>
                    GitHub profile
                  </span>
                  <Icon.ArrowUpRight size={11} color="var(--text-muted)"/>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
window.Team = Team;

// ============================================================
// PRACTICE — manifesto rows
// ============================================================
function Practice() {
  return (
    <section data-screen-label="09 Practice" style={{padding:"140px 0", borderTop:"1px solid var(--border)"}}>
      <div className="container">
        <div className="text-center" style={{marginBottom:"72px"}}>
          <div className="eyebrow" style={{marginBottom:"24px"}}>§ 08 — How we work</div>
          <h2 className="display" style={{fontSize:"clamp(40px, 6vw, 80px)", margin:0, color:"var(--text)"}}>
            The <span className="serif-italic" style={{textTransform:"none", color:"var(--crimson)", fontWeight:400, letterSpacing:"-0.04em"}}>practice</span>
          </h2>
        </div>

        <div className="flex col" style={{border:"1px solid var(--border)", borderRadius:"14px", overflow:"hidden", maxWidth:"960px", margin:"0 auto"}}>
          {DATA.practice.map((p, i) => (
            <div key={i} className="grid" style={{
              gridTemplateColumns:"60px minmax(0, 280px) minmax(0, 1fr)",
              gap:"28px",
              padding:"32px",
              alignItems:"center",
              background:"var(--bg-1)",
              borderBottom: i < DATA.practice.length - 1 ? "1px solid var(--border)" : "none",
              transition:"background 220ms",
            }} onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
               onMouseLeave={e => e.currentTarget.style.background = "var(--bg-1)"}>
              <div className="mono" style={{fontSize:"11px", color:"var(--crimson)", letterSpacing:"0.2em", fontWeight:600}}>
                §0{i+1}
              </div>
              <div style={{fontSize:"19px", fontWeight:700, color:"var(--text)", letterSpacing:"-0.01em"}}>
                {p.k}
              </div>
              <div style={{fontSize:"14px", lineHeight:1.6, color:"var(--text-muted)"}}>
                {p.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Practice = Practice;

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer data-screen-label="10 Footer" style={{padding:"80px 0 120px", borderTop:"1px solid var(--border)", position:"relative", overflow:"hidden"}}>
      <div className="spotlight" style={{left:"50%", bottom:"-700px", transform:"translateX(-50%)", opacity:0.4}}/>
      <div className="container relative" style={{zIndex:2}}>
        {/* huge brand mark */}
        <div className="text-center" style={{marginBottom:"56px"}}>
          <div className="display" style={{
            fontSize:"clamp(80px, 18vw, 280px)",
            color:"transparent",
            WebkitTextStroke:"1px var(--border-strong)",
            letterSpacing:"-0.06em",
            lineHeight:0.85,
          }}>
            AKASHA
          </div>
          <div className="serif-italic" style={{fontSize:"24px", color:"var(--crimson)", marginTop:"-20px"}}>
            corporation
          </div>
        </div>

        <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:"32px", paddingTop:"56px", borderTop:"1px solid var(--border)"}}>
          <div>
            <div className="mono" style={{fontSize:"10px", letterSpacing:"0.22em", color:"var(--text-faint)", textTransform:"uppercase", marginBottom:"14px"}}>
              Ecosystem
            </div>
            <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"8px"}}>
              {[
                { name: "HexCore IDE", url: "https://github.com/AkashaCorporation/HikariSystem-HexCore" },
                { name: "Scylla Studio", url: "https://github.com/AkashaCorporation/HikariSystem-Scylla" },
                { name: "Tsurugi", url: "https://github.com/ThreatBiih/HikariSystem-Tsurugi" },
                { name: "Ananke", url: "https://github.com/ThreatBiih/HikariSystem-Ananke" }
              ].map(x =>
                <li key={x.name}><a href={x.url} target="_blank" rel="noopener" style={{color:"var(--text-2)", textDecoration:"none", fontSize:"14px"}}>{x.name}</a></li>
              )}
            </ul>
          </div>
          <div>
            <div className="mono" style={{fontSize:"10px", letterSpacing:"0.22em", color:"var(--text-faint)", textTransform:"uppercase", marginBottom:"14px"}}>
              Research
            </div>
            <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"8px"}}>
              {[
                { name: "Binary analysis", url: "#research" },
                { name: "Offensive security", url: "#research" },
                { name: "Language engineering", url: "#research" },
                { name: "Publications", url: "#research" }
              ].map(x =>
                <li key={x.name}><a href={x.url} style={{color:"var(--text-2)", textDecoration:"none", fontSize:"14px"}}>{x.name}</a></li>
              )}
            </ul>
          </div>
          <div>
            <div className="mono" style={{fontSize:"10px", letterSpacing:"0.22em", color:"var(--text-faint)", textTransform:"uppercase", marginBottom:"14px"}}>
              Channels
            </div>
            <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"8px"}}>
              <li><a href="https://github.com/AkashaCorporation" target="_blank" rel="noopener" style={{color:"var(--text-2)", textDecoration:"none", fontSize:"14px"}}>GitHub · @AkashaCorporation</a></li>
              <li><a href="https://discord.gg/uQFb4nUAcT" target="_blank" rel="noopener" style={{color:"var(--text-2)", textDecoration:"none", fontSize:"14px"}}>Discord · /uQFb4nUAcT</a></li>
              <li><a href="mailto:support@Akashacorporation.com" style={{color:"var(--text-2)", textDecoration:"none", fontSize:"14px"}}>support@Akashacorporation.com</a></li>
            </ul>
          </div>
          <div>
            <div className="mono" style={{fontSize:"10px", letterSpacing:"0.22em", color:"var(--text-faint)", textTransform:"uppercase", marginBottom:"14px"}}>
              Legal
            </div>
            <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:"8px"}}>
              <li><span style={{color:"var(--text-2)", fontSize:"14px"}}>MIT / Apache-2.0</span></li>
              <li><span style={{color:"var(--text-2)", fontSize:"14px"}}>Source available</span></li>
              <li><span style={{color:"var(--text-2)", fontSize:"14px"}}>© 2024–2026</span></li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between" style={{paddingTop:"40px", marginTop:"40px", borderTop:"1px solid var(--border)", flexWrap:"wrap", gap:"16px"}}>
          <div className="mono" style={{fontSize:"10px", letterSpacing:"0.22em", color:"var(--text-faint)", textTransform:"uppercase"}}>
            BUILD 3.8.0 · LAST DEPLOY 2026.05.22
          </div>
          <div className="flex items-center gap-2 mono" style={{fontSize:"10px", letterSpacing:"0.18em", color:"var(--text-faint)", textTransform:"uppercase"}}>
            <span style={{width:"6px", height:"6px", borderRadius:"50%", background:"var(--crimson)", boxShadow:"0 0 8px var(--crimson)"}}/>
            <span>signal acquired</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;

// ============================================================
// FLOATING DOCK
// ============================================================
function Dock() {
  const items = [
    { tip: "Home",     icon: Icon.Home,     href: "#" },
    { tip: "HexCore",  icon: Icon.Terminal, href: "#hexcore" },
    { tip: "Arsenal",  icon: Icon.Briefcase,href: "#arsenal" },
    { tip: "Research", icon: Icon.Book,     href: "#research" },
    { tip: "Team",     icon: Icon.Users,    href: "#team" },
  ];
  const links = [
    { tip: "GitHub",  icon: Icon.Github, href: "https://github.com/AkashaCorporation" },
    { tip: "Discord", icon: Icon.Chat,   href: "https://discord.gg/uQFb4nUAcT" },
    { tip: "Email",   icon: Icon.Mail,   href: "mailto:support@Akashacorporation.com" },
  ];
  return (
    <div className="dock-wrap">
      <div className="dock">
        {items.map(i => (
          <a key={i.tip} href={i.href} className="dock-btn" aria-label={i.tip}>
            <i.icon size={18}/>
            <span className="tip">{i.tip}</span>
          </a>
        ))}
        <span className="dock-divider"/>
        {links.map(i => (
          <a key={i.tip} href={i.href} target="_blank" rel="noopener" className="dock-btn" aria-label={i.tip}>
            <i.icon size={18}/>
            <span className="tip">{i.tip}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
window.Dock = Dock;

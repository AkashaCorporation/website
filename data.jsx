/* eslint-disable */
// ============================================================
// AKASHA CORP — content data
// ============================================================

window.DATA = {
  pillars: [
    { k: "Ecosystem", v: "HikariSystem" },
    { k: "Field",     v: "Reverse Engineering" },
    { k: "Arch",      v: "x86 / ARM / RISC-V" },
    { k: "License",   v: "MIT / Apache-2.0" },
  ],

  pipelineLayers: [
    {
      name: "Disassembly",
      tech: "Capstone v5 (N-API)",
      status: "Production",
      metric: "Capstone v5.0.0-rc2",
      details: "Multi-architecture fast binary disassembly for x86, ARM, and RISC-V with direct Node.js N-API bindings.",
      code: `// Capstone v5 Disassembly Stream
0x00401000:  push  rbp
0x00401001:  mov   rbp, rsp
0x00401004:  sub   rsp, 0x20
0x00401008:  mov   dword ptr [rbp - 4], edi
0x0040100b:  cmp   dword ptr [rbp - 4], 0x10
0x0040100f:  jle   0x40101d
0x00401011:  call  0x00402b80   ; security_check`
    },
    {
      name: "CPU Emulation",
      tech: "Unicorn 2.1.4 · Project Perseus",
      status: "Production",
      metric: "1.34× Throughput",
      details: "CPU emulation using SharedArrayBuffer zero-copy hooks to eliminate transit overhead and maximize performance.",
      code: `// Project Perseus — zero-copy emulation
[SYS] Emulator initialized (x86_64, Unicorn 2.1.4)
[MEM] Mapping 4KB page at 0x00401000 (RX)
[REG] RAX 0x0000000000000000 │ RSP 0x00007ffeefbfc6a0
[RUN] Emulating 7 instructions at RIP 0x00401000
[PER] Hook hit on 0x00401011 → shared buffer swap
[SYS] Emulation complete · status OK`
    },
    {
      name: "Assembly & Patching",
      tech: "LLVM 18 MC (N-API)",
      status: "Production",
      metric: "LLVM v18.1.0",
      details: "In-memory assembler and binary patching interface powered by LLVM MC target-specific sub-components.",
      code: `// LLVM 18 MC — in-memory assembly
const llvmMC = require('hexcore-llvm-mc');
const binary = llvmMC.assemble("x86_64", \`
    xor eax, eax
    ret
\`);
// → [ 0x31, 0xc0, 0xc3 ]
// Patched block at RIP 0x0040100f · ok`
    },
    {
      name: "IR Lifting",
      tech: "Remill → LLVM IR",
      status: "Production",
      metric: "Format-aware lifting",
      details: "Format-aware binary lifting to LLVM IR (PE64, ELF, ET_REL) utilizing custom CET / XED-ILD patches.",
      code: `;; Remill LLVM IR — lifted block
define void @sub_401000(%struct.State* %s, i64 %pc) {
entry:
  %GPR_RAX = getelementptr inbounds %struct.State, %struct.State* %s, i32 0, i32 0
  %rax = load i64, i64* %GPR_RAX
  %xor = xor i64 %rax, %rax
  store i64 %xor, i64* %GPR_RAX
  ret void
}`
    },
    {
      name: "Decompilation",
      tech: "Helix MLIR · v0.9.0",
      status: "v0.9.0",
      metric: "90%+ type recovery",
      details: "Multi-level IR decompilation via MLIR dialect lowering. Recovers control flow blocks and high-level types.",
      code: `// Helix decompiler — C AST output
int32_t main(int32_t argc, char** argv) {
    int32_t local_var = argc;
    if (local_var > 16) {
        security_check();
    }
    return 0;
}`
    },
    {
      name: "Superoptimization",
      tech: "Souper + Z3 SMT",
      status: "v0.2.0",
      metric: "Z3 SMT integration",
      details: "LLVM IR block optimization using Z3 SMT solving and alive2 verification. First Windows N-API port of Souper.",
      code: `; Souper optimization query
%0:i32 = var
%1:i32 = xor %0, %0
infer %1
; result:    0:i32
; Z3 proof:  verified · 0.01 ms`
    },
    {
      name: "Dynamic Analysis",
      tech: "Elixir · Project Azoth",
      status: "v1.0.0",
      metric: "Clean-room engine",
      details: "Clean-room dynamic analysis engine leveraging Unicorn + Interceptor + Stalker. Apache-2.0 implementation.",
      code: `// Azoth dynamic trace
[AZOTH] Stalker init on Thread #2844
[HOOK]  VirtualAlloc — params:
        lpAddress=0 dwSize=16384 flAlloc=MEM_COMMIT
[TRACE] block 0x7ffd19b320a0 → 0x7ffd19b320ff
[AZOTH] No sandbox bypass detected`
    },
    {
      name: "Type Recovery",
      tech: "Pathfinder DWARF 5 / PDB",
      status: "Production",
      metric: "3,864 signatures",
      details: "Recovers type information and struct structures from kernel modules and binaries using DWARF 5 and PDB metadata.",
      code: `// Pathfinder type-db matcher
[DWARF] processing mali_kbase.ko
[DWARF] recovered  792 structures   (e.g. kbase_device)
[DWARF] recovered 3864 fn signatures
[MATCH] offset 0x28 → kbase_context*
[INFO]  helix annotations populated`
    },
    {
      name: "Session Persistence",
      tech: "SQLite-backed DB",
      status: "Production",
      metric: ".hexcore_session.db",
      details: "Stores symbol renames, retypes, bookmarks, and IOCs inside HexCore session databases.",
      code: `-- HexCore session storage
BEGIN TRANSACTION;
UPDATE symbols
   SET user_name = 'parsed_payload',
       type      = 'uint8_t*'
 WHERE address   = 0x004010a0;
INSERT INTO bookmarks (address, tag, comment)
VALUES (0x00401011, 'Suspicious', 'Security trigger');
COMMIT;`
    },
  ],

  arsenal: [
    {
      name: "HexCore",
      tagline: "Reverse-engineering IDE",
      version: "v3.8.0",
      desc: "Full-stack reverse engineering IDE. Multi-architecture disassembly, Unicorn CPU emulation, LLVM IR lifting, MLIR decompilation passes in a unified environment.",
      github: "https://github.com/AkashaCorporation/HikariSystem-HexCore"
    },
    {
      name: "Scylla Studio",
      tagline: "Pentesting IDE",
      version: "Active",
      desc: "Automated network reconnaissance, rich HTTP fuzzing interfaces, headless browser automation, and vulnerability discovery pipelines.",
      github: "https://github.com/AkashaCorporation/HikariSystem-Scylla"
    },
    {
      name: "Tsurugi",
      tagline: "Offensive tooling",
      version: "Active",
      desc: "Robust target access, execution redirection, and post-exploitation utility structures for offensive security operators.",
      github: "https://github.com/ThreatBiih/HikariSystem-Tsurugi"
    },
    {
      name: "Ananke",
      tagline: "Threat intelligence",
      version: "Active",
      desc: "Threat intelligence and automation engine. Gathers intel feeds, performs IOC correlations, and automates indicator response workloads.",
      github: "https://github.com/ThreatBiih/HikariSystem-Ananke"
    },
  ],

  engines: [
    { name: "hexcore-capstone",        role: "Multi-arch disassembly via Capstone v5 bindings",                version: "1.3.4", npm: true  },
    { name: "hexcore-unicorn",         role: "CPU emulation with SharedArrayBuffer zero-copy hooks",          version: "1.3.0", npm: true  },
    { name: "hexcore-llvm-mc",         role: "Binary assembly & patching via LLVM 18 target libraries",        version: "1.0.1", npm: true  },
    { name: "hexcore-remill",          role: "Machine code → LLVM IR lifting with CET patches",                version: "0.4.0", npm: true  },
    { name: "hexcore-helix",           role: "LLVM IR → C compiler via C++23 / MLIR with SSA splitting",       version: "0.9.0", npm: false },
    { name: "hexcore-elixir",          role: "Dynamic analysis runtime (Project Azoth)",                       version: "1.0.0", npm: false },
    { name: "hexcore-souper",          role: "LLVM IR superoptimizer via Z3 SMT — first Windows port",         version: "0.2.0", npm: true  },
    { name: "hexcore-better-sqlite3",  role: "SQLite storage for session serialization & local IOCs",          version: "2.0.1", npm: true  },
  ],

  roadmap: [
    { version: "v3.7.4", status: "Released", title: "Format-aware lifting + Helix C AST",
      details: "Released version introducing ELF/PE format-aware machine code decompilation to high-level C AST representations." },
    { version: "v3.8.0", status: "Released", title: "Souper era · Pathfinder · Project Azoth · DWARF",
      details: "Production launch of Google Souper optimizations port, Pathfinder type DB reconstruction, and Project Azoth (Elixir)." },
    { version: "v3.8.1", status: "Planned",  title: "Queue polish & job-scheduling adjustments",
      details: "Refinements to Job Queue Manager — custom thread-pool bounds and execution priority field enhancements." },
    { version: "v3.9.0", status: "Planned",  title: "BinDiff integration & sticky session routing",
      details: "Binary difference comparison graph interfaces and server-side session stickiness for multi-analyst projects." },
    { version: "v4.0.0", status: "Research", title: "Oracle hook & live AI callbacks",
      details: "Active research stage — incorporating live agentic callbacks directly into compiler pipeline hooks." },
  ],

  researchGroups: [
    {
      name: "Binary Analysis",
      description: "Decompilation pipeline architecture, binary lifting representations, CPU emulation optimization, type recovery models, debug-info-guided analysis feeds, and custom MLIR dialect compilation passes.",
      projects: ["HexCore", "Helix", "Pathfinder", "Souper", "Project Azoth"],
      members:  ["LXrdKnowkill", "MayaRomanova"],
    },
    {
      name: "Offensive Security",
      description: "Pentesting orchestration, automated vulnerability discovery, browser-driven exploitation sequences, headless reconnaissance arrays, and active threat intelligence telemetry.",
      projects: ["Scylla Studio", "Tsurugi", "Ananke"],
      members:  ["ThreatBiih", "KrnL777", "LXrdKnowkill"],
    },
    {
      name: "Language Engineering",
      description: "Domain-specific query languages over binary intermediate representations, semantic code pattern matching engines, CAst optimizers, elimination passes, and IR transformation structures.",
      projects: ["HQL", "CAst optimization passes"],
      members:  ["YasminePayload", "MayaRomanova", "LXrdKnowkill"],
    },
  ],

  paper: {
    badge: "Preprint",
    title: "Helix — Multi-level IR decompilation via MLIR dialect lowering with debug-info-guided type recovery and empirical pipeline loss analysis",
    author: "LXrdKnowkill (Lukas Machado)",
    affiliation: "Akasha Corporation · 2026",
  },

  team: [
    { handle: "LXrdKnowkill",   role: "Founder · system architecture · compiler infrastructure",                     glyph: "01", icon: "Hexagon" },
    { handle: "MayaRomanova",   role: "C++23 compilation · MLIR lowering dialects · Helix engine · CAst optimizers",  glyph: "02", icon: "Code"    },
    { handle: "ThreatBiih",     role: "Threat intelligence systems · Unicorn emulation · UI/UX interface design",     glyph: "03", icon: "ShieldAlert" },
    { handle: "YasminePayload", role: "Automation pipelines · headless batch jobs · HQL language design",             glyph: "04", icon: "Terminal" },
    { handle: "KrnL777",        role: "Low-level reverse engineering · target exploitation · exploit scripting",      glyph: "05", icon: "Cpu" },
  ],

  practice: [
    { k: "We publish in the open.",       v: "All HikariSystem libraries are MIT or Apache-2.0. Source first, marketing last." },
    { k: "We document negative results.", v: "Failed approaches stay in the record. Pipeline loss analysis is a deliverable, not an embarrassment." },
    { k: "We credit our tools.",          v: "Capstone, Unicorn, LLVM, Souper, Z3, alive2 — upstream work is named and attributed in every component." },
    { k: "We do not ship vaporware.",     v: "Versioned releases, reproducible builds, public job queues. If it isn't tagged, it doesn't exist." },
  ],
};

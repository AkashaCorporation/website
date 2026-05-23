import { useState } from 'react';
import { Terminal, Play, ChevronRight, GitBranch } from 'lucide-react';

interface LayerDetails {
    name: string;
    tech: string;
    status: string;
    details: string;
    code: string;
    metric?: string;
}

const pipelineLayers: LayerDetails[] = [
    {
        name: "Disassembly",
        tech: "Capstone v5 (N-API)",
        status: "Production",
        details: "Multi-architecture fast binary disassembly for x86, ARM, and RISC-V with direct Node.js N-API bindings.",
        code: `// Capstone v5 Disassembly Stream
0x00401000:  push  rbp
0x00401001:  mov   rbp, rsp
0x00401004:  sub   rsp, 0x20
0x00401008:  mov   dword ptr [rbp - 4], edi
0x0040100b:  cmp   dword ptr [rbp - 4], 0x10
0x0040100f:  jle   0x40101d
0x00401011:  call  0x00402b80 // security_check`,
        metric: "Capstone v5.0.0-rc2"
    },
    {
        name: "CPU Emulation",
        tech: "Unicorn Engine 2.1.4 (Project Perseus)",
        status: "Production",
        details: "CPU emulation using SharedArrayBuffer zero-copy hooks to eliminate transit overhead and maximize performance.",
        code: `// Project Perseus Zero-Copy Emulation
[SYS] Emulator initialized (x86_64, Unicorn 2.1.4)
[MEM] Mapping 4KB page at 0x00401000 (RX)
[REG] RAX: 0x0000000000000000 | RSP: 0x00007ffeefbfc6a0
[RUN] Emulating 7 instructions at RIP: 0x00401000
[PER] Hook hit on 0x00401011 -> shared buffer swap
[SYS] Emulation completed (Status: OK)`,
        metric: "1.34x Throughput Boost"
    },
    {
        name: "Assembly & Patching",
        tech: "LLVM 18 MC (N-API)",
        status: "Production",
        details: "In-memory assembler and binary patching interface powered by LLVM MC target-specific sub-components.",
        code: `// LLVM 18 MC In-Memory Assembly
const llvmMC = require('hexcore-llvm-mc');
const binary = llvmMC.assemble("x86_64", \`
    xor eax, eax
    ret
\`);
// Output: [ 0x31, 0xc0, 0xc3 ]
// Patched block at RIP: 0x0040100f successfully.`,
        metric: "LLVM v18.1.0"
    },
    {
        name: "IR Lifting",
        tech: "Remill → LLVM IR",
        status: "Production",
        details: "Format-aware binary lifting to LLVM IR (PE64, ELF, ET_REL) utilizing custom CET / XED-ILD patches.",
        code: `;; Remill LLVM IR Lifting
define void @sub_401000(%struct.State* %state, i64 %pc) {
entry:
  %GPR_RAX = getelementptr inbounds %struct.State, %struct.State* %state, i32 0, i32 0
  %rax_val = load i64, i64* %GPR_RAX
  %xor_res = xor i64 %rax_val, %rax_val
  store i64 %xor_res, i64* %GPR_RAX
  ret void
}`,
        metric: "Format-Aware Lifting"
    },
    {
        name: "Decompilation",
        tech: "Helix MLIR (v0.9.0)",
        status: "v0.9.0",
        details: "Multi-level IR decompilation via MLIR dialect lowering. Recovers control flow blocks and high-level types.",
        code: `// Helix Decompiler C AST Representation
int32_t main(int32_t argc, char** argv) {
    int32_t local_var = argc;
    if (local_var > 16) {
        security_check();
    }
    return 0;
}`,
        metric: "90%+ Type Recovery"
    },
    {
        name: "Superoptimization",
        tech: "Souper + Z3 SMT (v0.2.0)",
        status: "v0.2.0",
        details: "LLVM IR block optimization using Z3 SMT solving and alive2 verification. First Windows N-API port of Souper.",
        code: `; Souper Optimization Query
%0:i32 = var
%1:i32 = xor %0, %0
infer %1
; Souper result:
; result 0:i32
; Z3 proof: Verified correct via SMT solver (0.01ms)`,
        metric: "Z3 SMT Solver Integration"
    },
    {
        name: "Dynamic Analysis",
        tech: "Elixir (Project Azoth)",
        status: "v1.0.0",
        details: "Clean-room dynamic analysis engine leveraging Unicorn + Interceptor + Stalker. Apache-2.0 clean implementation.",
        code: `// Project Azoth Dynamic Analysis Trace
[AZOTH] Stalker initialized on Thread #2844
[HOOK] Native function hook hit: VirtualAlloc
[HOOK] Params: lpAddress=0, dwSize=16384, flAllocationType=MEM_COMMIT
[TRACE] Executed instruction block: 0x7ffd19b320a0 -> 0x7ffd19b320ff
[AZOTH] No process sandbox bypass detected.`,
        metric: "v1.0.0 Active Core"
    },
    {
        name: "Type Recovery",
        tech: "Pathfinder DWARF 5 / PDB",
        status: "Production",
        details: "Recovers type information and struct structures from kernel modules and binaries using DWARF 5 and PDB metadata.",
        code: `// Pathfinder Type DB Matcher
[DWARF] Processing mali_kbase.ko...
[DWARF] Recovered 792 structures (e.g., struct kbase_device)
[DWARF] Recovered 3,864 function signatures
[MATCH] Matching struct offset 0x28 -> kbase_context*
[INFO] Helix decompiler annotations populated.`,
        metric: "3,864 Signatures Recovered"
    },
    {
        name: "Session Persistence",
        tech: "SQLite-backed Database",
        status: "Production",
        details: "Stores symbol renames, retypes, bookmarks, and indicators of compromise (IOCs) inside HexCore Session databases.",
        code: `-- HexCore Session Storage Transaction
BEGIN TRANSACTION;
UPDATE symbols SET user_name = 'parsed_payload', type = 'uint8_t*' WHERE address = 0x004010a0;
INSERT INTO bookmarks (address, tag, comment) VALUES (0x00401011, 'Suspicious', 'Security trigger');
COMMIT;`,
        metric: ".hexcore_session.db"
    },
    {
        name: "Automation Pipeline",
        tech: "Job Queue Manager",
        status: "Production",
        details: "Headless batch execution and concurrent pipeline manager with priority scheduling and task queues.",
        code: `// .hexcore_job.json Task Queue
{
    "job_id": "job_01h8a3b8",
    "tasks": [
        { "action": "lift_ir", "target": "malware.bin" },
        { "action": "recover_types", "engine": "pathfinder" },
        { "action": "decompile", "output": "decompiled.c" }
    ],
    "priority": "HIGH",
    "status": "COMPLETED"
}`,
        metric: " headless Queue Scheduler"
    }
];

export function HexCoreIDE() {
    const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
    const activeLayer = pipelineLayers[selectedLayerIndex];

    return (
        <section id="hexcore" className="py-24 bg-[#09090b] border-t border-zinc-900 relative">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider text-brand-red font-mono mb-4">
                        Flagship Product
                    </div>
                    <h2 className="font-sans font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
                        HexCore IDE <span className="font-mono text-zinc-500 font-light text-2xl md:text-3xl">v3.8.0</span>
                    </h2>
                    <p className="mt-4 font-sans text-sm md:text-base text-zinc-400 max-w-3xl leading-relaxed">
                        <strong className="text-white font-medium">HikariSystem-HexCore</strong> is a professional reverse engineering environment purpose-built for malware analysis and binary research. Built from the ground up on Code-OSS, it is not a wrapper, but a native high-performance binary analysis pipeline.
                    </p>
                </div>

                {/* Pipeline Flow Visualization */}
                <div className="mb-12 p-6 rounded-lg bg-zinc-950 border border-zinc-900 overflow-x-auto scrollbar-thin">
                    <div className="flex items-center space-x-4 min-w-[900px] justify-between">
                        {pipelineLayers.map((layer, idx) => (
                            <button
                                key={layer.name}
                                onClick={() => setSelectedLayerIndex(idx)}
                                className={`flex items-center space-x-2 px-3 py-2 rounded transition-all duration-200 cursor-pointer ${
                                    selectedLayerIndex === idx
                                        ? 'bg-brand-red text-white'
                                        : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800/80'
                                }`}
                            >
                                <span className="font-mono text-[9px] font-bold">0{idx + 1}</span>
                                <span className="font-sans text-[11px] font-semibold tracking-tight">{layer.name}</span>
                                {idx < pipelineLayers.length - 1 && <ChevronRight className="w-3 h-3 text-zinc-600" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Interactive Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Layer Sidebar / Selection */}
                    <div className="lg:col-span-4 flex flex-col space-y-2">
                        {pipelineLayers.map((layer, idx) => (
                            <button
                                key={layer.name}
                                onClick={() => setSelectedLayerIndex(idx)}
                                className={`w-full text-left p-4 rounded border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                                    selectedLayerIndex === idx
                                        ? 'bg-[#131316] border-brand-red/80 text-white'
                                        : 'bg-[#131316]/50 border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'
                                }`}
                            >
                                <div>
                                    <div className="font-sans text-[11px] uppercase tracking-wider text-zinc-500 font-bold">Layer 0{idx + 1}</div>
                                    <div className="font-sans font-bold text-sm mt-0.5">{layer.name}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`font-mono text-[9px] px-2 py-0.5 rounded border ${
                                        layer.status === 'Production'
                                            ? 'text-emerald-400 border-emerald-950/80 bg-emerald-950/20'
                                            : 'text-rose-400 border-rose-950/80 bg-rose-950/20'
                                    }`}>
                                        {layer.status}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Interactive Code/Detail Panel */}
                    <div className="lg:col-span-8 flex flex-col rounded-lg bg-[#131316] border border-zinc-900 overflow-hidden shadow-2xl">
                        {/* Panel Top bar */}
                        <div className="px-6 py-4 border-b border-zinc-900 flex justify-between items-center bg-[#0e0e11]">
                            <div className="flex items-center space-x-3">
                                <Terminal className="w-4 h-4 text-brand-red" />
                                <span className="font-mono text-[10px] uppercase tracking-widest text-white font-bold">{activeLayer.tech}</span>
                            </div>
                            {activeLayer.metric && (
                                <div className="font-mono text-[10px] text-zinc-500">
                                    METRIC: <span className="text-white">{activeLayer.metric}</span>
                                </div>
                            )}
                        </div>

                        {/* Panel Content */}
                        <div className="p-8 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-sans font-bold text-xl text-white uppercase tracking-tight">
                                    {activeLayer.name} Subsystem
                                </h3>
                                <p className="mt-3 font-sans text-sm text-zinc-400 leading-relaxed">
                                    {activeLayer.details}
                                </p>
                            </div>

                            {/* Simulated Terminal Code Box */}
                            <div className="mt-8 rounded bg-[#09090b] border border-zinc-900 p-5 font-mono text-[11px] text-zinc-300 leading-relaxed relative overflow-x-auto shadow-inner">
                                <div className="absolute top-2 right-3 font-mono text-[8px] text-zinc-600 uppercase select-none">
                                    SIMULATED OUTPUT
                                </div>
                                <pre className="whitespace-pre">{activeLayer.code}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Release Note v3.8.0 Card */}
                <div className="mt-16 p-8 rounded-lg bg-[#131316]/50 border border-zinc-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-red/5 to-transparent pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start space-x-4">
                            <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-brand-red mt-1">
                                <GitBranch className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-sans font-bold text-lg text-white">
                                    Latest Release &mdash; <span className="font-mono text-zinc-400 font-light">v3.8.0</span>
                                </h3>
                                <p className="font-sans text-xs text-zinc-500 uppercase mt-0.5 font-semibold tracking-wider">
                                    "Souper Era + Pathfinder + Project Azoth + DWARF Type Pipeline"
                                </p>
                            </div>
                        </div>
                        <a 
                            href="https://github.com/AkashaCorporation/HikariSystem-HexCore/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-4 py-2 border border-zinc-850 bg-zinc-900 text-white font-mono text-[10px] uppercase tracking-wider hover:border-brand-red hover:text-brand-red transition-all duration-200 cursor-pointer self-start md:self-center"
                        >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Download Release Notes</span>
                        </a>
                    </div>

                    <p className="mt-6 font-sans text-sm text-zinc-400 leading-relaxed border-t border-zinc-900 pt-6">
                        Pathfinder DWARF/PDB/ET_REL metadata feeder unlocks full debug content on kernel modules &bull; Helix v0.9.0 with debug-info-guided type recovery (0% &rarr; 90%+ typed parameters on stripped <code className="text-white font-mono text-xs px-1 bg-zinc-900 border border-zinc-850 rounded">.ko</code>) &bull; Project Azoth clean-room dynamic analysis engine (Rust + C++23, Apache-2.0) &bull; Project Perseus zero-copy Unicorn hooks (1.34&times; throughput, eliminates 65% TSFN drop rate) &bull; Souper LLVM IR superoptimizer with Z3 SMT solving &bull; Refcount Scanner &bull; Anti-Analysis Detection &bull; API Hash Resolver &bull; Job Queue Manager for concurrent agentic pipelines.
                    </p>
                </div>

            </div>
        </section>
    );
}

import { useState } from 'react';
import { Package, Shield, ArrowUpRight } from 'lucide-react';

interface ArsenalProject {
    name: string;
    description: string;
    version: string;
    github: string;
}

interface Engine {
    name: string;
    role: string;
    version: string;
    npm?: string;
}

const arsenalProjects: ArsenalProject[] = [
    {
        name: "HexCore",
        description: "Full-stack reverse engineering IDE. Delivers multi-architecture disassembly, Unicorn CPU emulation, LLVM IR lifting, and MLIR decompilation passes in a unified environment.",
        version: "v3.8.0",
        github: "https://github.com/AkashaCorporation/HikariSystem-HexCore"
    },
    {
        name: "Scylla Studio",
        description: "Pentesting IDE. Features automated network reconnaissance, rich HTTP fuzzing interfaces, headless browser automation, and vulnerability discovery pipelines.",
        version: "Active",
        github: "https://github.com/AkashaCorporation/HikariSystem-Scylla"
    },
    {
        name: "Tsurugi",
        description: "Offensive security tooling ecosystem. Provides robust target access, execution redirection, and post-exploitation utility structures.",
        version: "Active",
        github: "https://github.com/ThreatBiih/HikariSystem-Tsurugi"
    },
    {
        name: "Ananke",
        description: "Threat intelligence and automation engine. Gathers intelligence data feeds, performs IOC correlations, and automates indicator response workloads.",
        version: "Active",
        github: "https://github.com/ThreatBiih/HikariSystem-Ananke"
    }
];

const nativeEngines: Engine[] = [
    {
        name: "hexcore-capstone",
        role: "Multi-arch disassembly (x86, ARM, RISC-V) via Capstone v5 bindings",
        version: "1.3.4",
        npm: "https://www.npmjs.com/package/hexcore-capstone"
    },
    {
        name: "hexcore-unicorn",
        role: "CPU emulation with SharedArrayBuffer zero-copy hooks (Unicorn 2.1.4)",
        version: "1.3.0",
        npm: "https://www.npmjs.com/package/hexcore-unicorn"
    },
    {
        name: "hexcore-llvm-mc",
        role: "Binary assembly & patching engine powered by LLVM 18 target libraries",
        version: "1.0.1",
        npm: "https://www.npmjs.com/package/hexcore-llvm-mc"
    },
    {
        name: "hexcore-remill",
        role: "Machine code → LLVM IR lifting with format-aware extensions & CET patches",
        version: "0.4.0",
        npm: "https://www.npmjs.com/package/hexcore-remill"
    },
    {
        name: "hexcore-helix",
        role: "LLVM IR → C compiler via C++23/MLIR with SSA splitting and type recovery",
        version: "0.9.0"
    },
    {
        name: "hexcore-elixir",
        role: "Dynamic analysis runtime (Unicorn + Interceptor + Stalker) [Project Azoth]",
        version: "1.0.0"
    },
    {
        name: "hexcore-souper",
        role: "LLVM IR superoptimizer via Z3 SMT - first Windows port of Google Souper",
        version: "0.2.0",
        npm: "https://www.npmjs.com/package/hexcore-souper"
    },
    {
        name: "hexcore-better-sqlite3",
        role: "SQLite storage layer for session serialization & local intelligence indicators",
        version: "2.0.1",
        npm: "https://www.npmjs.com/package/hexcore-better-sqlite3"
    }
];

export function Arsenal() {
    const [activeTab, setActiveTab] = useState<'arsenal' | 'engines'>('arsenal');

    return (
        <section id="arsenal" className="py-24 bg-[#09090b] border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider text-brand-red font-mono mb-4">
                            HikariSystem Core
                        </div>
                        <h2 className="font-sans font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
                            The Arsenal &amp; Engines
                        </h2>
                        <p className="mt-4 font-sans text-sm text-zinc-400 max-w-2xl leading-relaxed">
                            A curated suite of native toolsets and libraries built for low-level architecture execution, threat intelligence, and hardware-accelerated analysis.
                        </p>
                    </div>

                    {/* Tab Selectors */}
                    <div className="flex bg-zinc-950 border border-zinc-900 rounded p-1 self-start md:self-auto font-mono text-[10px] uppercase tracking-wider">
                        <button
                            onClick={() => setActiveTab('arsenal')}
                            className={`px-4 py-2 rounded transition-all duration-200 cursor-pointer ${
                                activeTab === 'arsenal'
                                    ? 'bg-zinc-905 bg-brand-red text-white'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            HikariSystem Arsenal
                        </button>
                        <button
                            onClick={() => setActiveTab('engines')}
                            className={`px-4 py-2 rounded transition-all duration-200 cursor-pointer ${
                                activeTab === 'engines'
                                    ? 'bg-zinc-905 bg-brand-red text-white'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Native Engine Suite
                        </button>
                    </div>
                </div>

                {/* Tab Content 1: Arsenal */}
                {activeTab === 'arsenal' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {arsenalProjects.map((project) => (
                            <div 
                                key={project.name}
                                className="p-6 rounded-lg bg-[#131316] border border-zinc-900 hover:border-brand-red/30 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                            >
                                <div>
                                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded bg-zinc-900 border border-zinc-850 text-brand-red">
                                                <Shield className="w-4 h-4" />
                                            </div>
                                            <h3 className="font-sans font-bold text-white text-base tracking-tight uppercase">
                                                {project.name}
                                            </h3>
                                        </div>
                                        <span className="font-mono text-[9px] px-2.5 py-0.5 rounded border border-zinc-850 text-zinc-400 bg-zinc-900">
                                            {project.version}
                                        </span>
                                    </div>
                                    <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-6">
                                        {project.description}
                                    </p>
                                </div>
                                
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-white hover:text-brand-red transition-colors self-start cursor-pointer"
                                >
                                    <span>Browse Repository</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tab Content 2: Engines */}
                {activeTab === 'engines' && (
                    <div className="rounded-lg bg-[#131316] border border-zinc-900 overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-zinc-900 bg-[#0e0e11] font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                                        <th className="py-4 px-6 font-bold">Engine Package</th>
                                        <th className="py-4 px-6 font-bold">Role &amp; Pipeline Responsibility</th>
                                        <th className="py-4 px-6 font-bold">Version</th>
                                        <th className="py-4 px-6 font-bold text-right">Repository / Registry</th>
                                    </tr>
                                </thead>
                                <tbody className="font-sans text-xs divide-y divide-zinc-900">
                                    {nativeEngines.map((engine) => (
                                        <tr key={engine.name} className="hover:bg-zinc-900/20 transition-colors">
                                            <td className="py-4 px-6 font-mono text-white font-bold flex items-center gap-2">
                                                <Package className="w-3.5 h-3.5 text-zinc-500" />
                                                {engine.name}
                                            </td>
                                            <td className="py-4 px-6 text-zinc-400">{engine.role}</td>
                                            <td className="py-4 px-6">
                                                <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-zinc-850 text-zinc-400 bg-zinc-900/60">
                                                    {engine.version}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                {engine.npm ? (
                                                    <a
                                                        href={engine.npm}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center space-x-1 font-mono text-[9px] uppercase tracking-wider text-brand-red hover:text-brand-red-hover transition-colors cursor-pointer"
                                                    >
                                                        <span>npm registry</span>
                                                        <ArrowUpRight className="w-3 h-3" />
                                                    </a>
                                                ) : (
                                                    <span className="font-mono text-[9px] text-zinc-600 uppercase select-none">
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

import { Beaker, BookOpen, Layers, Users, FileText, ArrowRight } from 'lucide-react';

interface ResearchGroup {
    name: string;
    description: string;
    projects: string[];
    members: string[];
}

const researchGroups: ResearchGroup[] = [
    {
        name: "Binary Analysis Group",
        description: "Focuses on decompilation pipeline architecture, binary lifting representations, CPU emulation optimization, type recovery models, debug-info-guided analysis feeds, and custom MLIR dialect compilation passes.",
        projects: ["HexCore", "Helix", "Pathfinder", "Souper", "Project Azoth (Elixir)"],
        members: ["LXrdKnowkill", "MayaRomanova"]
    },
    {
        name: "Offensive Security Group",
        description: "Investigates pentesting orchestration, automated vulnerability discovery, browser-driven exploitation sequences, headless reconnaissance arrays, and active threat intelligence telemetry collection.",
        projects: ["Scylla Studio", "Tsurugi", "Ananke"],
        members: ["ThreatBiih", "KrnL777", "LXrdKnowkill"]
    },
    {
        name: "Language Engineering Group",
        description: "Architects domain-specific query languages over binary intermediate representations, semantic code pattern matching engines, CAst optimizers, elimination passes, and IR transformation structures.",
        projects: ["HQL (HikariSystem Query Language)", "CAst optimization passes"],
        members: ["YasminePayload", "MayaRomanova", "LXrdKnowkill"]
    }
];

export function Research() {
    return (
        <section id="research" className="py-24 bg-[#09090b] border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider text-brand-red font-mono mb-4">
                        Academic &amp; Systems Research
                    </div>
                    <h2 className="font-sans font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
                        Research Groups &amp; Papers
                    </h2>
                    <p className="mt-4 font-sans text-sm text-zinc-400 max-w-3xl leading-relaxed">
                        Akasha Corporation operates across distinct research groups, collaborating to push the boundaries of static disassembly, runtime emulation, and offensive automation.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Research Groups */}
                    <div className="lg:col-span-7 flex flex-col space-y-6">
                        <h3 className="font-sans font-bold text-zinc-500 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Beaker className="w-3.5 h-3.5 text-brand-red" />
                            Research Focus Groups
                        </h3>
                        {researchGroups.map((group) => (
                            <div 
                                key={group.name} 
                                className="p-6 rounded-lg bg-[#131316] border border-zinc-900 shadow-md hover:border-zinc-800 transition-colors"
                            >
                                <h4 className="font-sans font-extrabold text-white text-base tracking-tight uppercase">
                                    {group.name}
                                </h4>
                                <p className="mt-3 font-sans text-xs text-zinc-400 leading-relaxed">
                                    {group.description}
                                </p>
                                
                                <div className="mt-6 pt-4 border-t border-zinc-900 grid grid-cols-2 gap-4">
                                    {/* Active Projects */}
                                    <div>
                                        <div className="flex items-center space-x-1.5 text-zinc-500 font-mono text-[8px] uppercase tracking-wider mb-2">
                                            <Layers className="w-3 h-3 text-brand-red" />
                                            <span>Active Projects</span>
                                        </div>
                                        <ul className="space-y-1 font-sans text-xs text-zinc-300 font-medium">
                                            {group.projects.map((proj) => (
                                                <li key={proj}>&bull; {proj}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    {/* Group Members */}
                                    <div>
                                        <div className="flex items-center space-x-1.5 text-zinc-500 font-mono text-[8px] uppercase tracking-wider mb-2">
                                            <Users className="w-3 h-3 text-brand-red" />
                                            <span>Key Investigators</span>
                                        </div>
                                        <ul className="space-y-1 font-sans text-xs text-zinc-300">
                                            {group.members.map((member) => (
                                                <li key={member}>&bull; {member}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Publications */}
                    <div className="lg:col-span-5 flex flex-col space-y-6">
                        <h3 className="font-sans font-bold text-zinc-500 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-brand-red" />
                            Academic Publications
                        </h3>
                        
                        <div className="p-8 rounded-lg bg-[#131316] border border-zinc-900 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[420px]">
                            {/* Decorative background mark */}
                            <div className="absolute -bottom-10 -right-10 opacity-[0.02] text-[180px] pointer-events-none select-none">
                                <FileText />
                            </div>

                            <div>
                                <span className="font-mono text-[9px] px-2.5 py-0.5 rounded border border-emerald-950 text-emerald-400 bg-emerald-950/20 font-bold uppercase tracking-wider">
                                    Preprint
                                </span>
                                
                                <h4 className="mt-6 font-sans font-black text-white text-lg tracking-tight uppercase leading-snug">
                                    Helix: Multi-Level IR Decompilation via MLIR Dialect Lowering with Debug-Info-Guided Type Recovery and Empirical Pipeline Loss Analysis
                                </h4>
                                
                                <div className="mt-6 space-y-2 border-y border-zinc-900 py-4 font-sans text-xs text-zinc-400">
                                    <div>
                                        <strong className="text-zinc-500 uppercase font-mono text-[9px] tracking-wider block">Author</strong>
                                        <span className="text-zinc-300 font-medium">LXrdKnowkill (Lukas Machado)</span>
                                    </div>
                                    <div className="pt-2">
                                        <strong className="text-zinc-500 uppercase font-mono text-[9px] tracking-wider block">Affiliation &amp; Year</strong>
                                        <span className="text-zinc-300">Akasha Corporation &bull; 2026</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <a 
                                    href="https://github.com/AkashaCorporation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-between p-4 rounded bg-zinc-900 border border-zinc-850 hover:border-brand-red text-white transition-all duration-200 group cursor-pointer"
                                >
                                    <div className="flex items-center space-x-3">
                                        <FileText className="w-4 h-4 text-brand-red" />
                                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Access Preprint PDF</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-brand-red transition-colors group-hover:translate-x-1 duration-200" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

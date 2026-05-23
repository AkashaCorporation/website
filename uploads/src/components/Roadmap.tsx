import { Calendar, CheckCircle2, Circle, HelpCircle } from 'lucide-react';

interface RoadmapItem {
    version: string;
    status: 'Released' | 'Planned' | 'Research';
    title: string;
    details: string;
}

const roadmapItems: RoadmapItem[] = [
    {
        version: "v3.7.4",
        status: "Released",
        title: "Format-Aware Lifting + Helix C AST",
        details: "Released version introducing ELF/PE format-aware machine code decompilation to high-level C AST representations."
    },
    {
        version: "v3.8.0",
        status: "Released",
        title: "Souper Era + Pathfinder + Project Azoth + DWARF",
        details: "Production launch of Google Souper optimizations port, Pathfinder type DB reconstruction, and Project Azoth (Elixir)."
    },
    {
        version: "v3.8.1",
        status: "Planned",
        title: "Queue Polish & Job Scheduling Adjustments",
        details: "Refinements to Job Queue Manager, introducing custom thread pool bounds and execution priority field enhancements."
    },
    {
        version: "v3.9.0",
        status: "Planned",
        title: "BinDiff Integration & Sticky Session Routing",
        details: "Integrates binary difference comparison graph interfaces and server session stickiness for multi-analyst projects."
    },
    {
        version: "v4.0.0",
        status: "Research",
        title: "Oracle Hook & Live AI Callbacks",
        details: "Active research group stage: incorporating live agentic callbacks directly into compiler pipeline hooks."
    }
];

export function Roadmap() {
    return (
        <section id="roadmap" className="py-24 bg-[#09090b] border-t border-zinc-900">
            <div className="max-w-5xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider text-brand-red font-mono mb-4">
                        Development Timeline
                    </div>
                    <h2 className="font-sans font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
                        Ecosystem Roadmap
                    </h2>
                    <p className="mt-4 font-sans text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                        Track active research stages, pending patches, and upcoming major compiler system releases.
                    </p>
                </div>

                {/* Vertical Timeline */}
                <div className="relative border-l border-zinc-800 pl-8 ml-4 space-y-12">
                    {roadmapItems.map((item) => {
                        const isReleased = item.status === 'Released';
                        const isPlanned = item.status === 'Planned';
                        
                        return (
                            <div key={item.version} className="relative group">
                                {/* Dot Indicator */}
                                <div className={`absolute -left-[41px] top-1.5 p-1 rounded-full border ${
                                    isReleased 
                                        ? 'bg-brand-red border-brand-red text-white' 
                                        : isPlanned
                                            ? 'bg-[#131316] border-zinc-700 text-zinc-400'
                                            : 'bg-[#131316] border-zinc-800 text-zinc-600'
                                }`}>
                                    {isReleased ? (
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    ) : isPlanned ? (
                                        <Circle className="w-3.5 h-3.5 fill-current" />
                                    ) : (
                                        <HelpCircle className="w-3.5 h-3.5" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 rounded-lg bg-[#131316] border border-zinc-905 border-zinc-900 hover:border-zinc-800 transition-all duration-300 shadow-md">
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center space-x-3">
                                            <span className="font-mono text-base font-bold text-white">
                                                {item.version}
                                            </span>
                                            <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${
                                                isReleased 
                                                    ? 'text-emerald-400 border-emerald-950 bg-emerald-950/20' 
                                                    : isPlanned
                                                        ? 'text-sky-400 border-sky-950 bg-sky-950/20'
                                                        : 'text-amber-400 border-amber-950 bg-amber-950/20'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-[10px] font-mono text-zinc-500 gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>
                                                {isReleased ? 'COMPLETED' : isPlanned ? 'DEVELOPMENT' : 'RESEARCH'}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="font-sans font-bold text-white text-sm uppercase tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 font-sans text-xs text-zinc-400 leading-relaxed">
                                        {item.details}
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

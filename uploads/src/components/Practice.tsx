import { Eye, Bot, Shield, RotateCcw } from 'lucide-react';

interface Principle {
    title: string;
    description: string;
    icon: React.ReactNode;
    tag: string;
}

const principles: Principle[] = [
    {
        title: "Open by Default",
        description: "All core engines operate under MIT and Apache-2.0 licenses. We actively document negative results: for instance, hexcore-souper is openly documented as having near-zero optimization impacts on standard production binaries to benefit the community.",
        icon: <Eye className="w-5 h-5 text-rose-500" />,
        tag: "OPEN SOURCE"
    },
    {
        title: "LLM-in-the-Loop Disclosed",
        description: "We employ advanced AI assistants across literature survey, design review, and implementation reviews. Following the ReSym transparency model (CCS 2024, Distinguished Paper), all system publications credit AI support directly in acknowledgments.",
        icon: <Bot className="w-5 h-5 text-rose-500" />,
        tag: "AI INTEGRATION"
    },
    {
        title: "Strict Clean-Room Development",
        description: "High-risk components like Project Azoth (Elixir dynamic analysis engine) are developed under rigorous clean-room segregation rules, enforcing automated LICENSE_AUDIT validations on every structural code commit.",
        icon: <Shield className="w-5 h-5 text-rose-500" />,
        tag: "COMPLIANCE"
    },
    {
        title: "Scientific Reproducibility",
        description: "Decompiler pipeline loss analysis is built around structured, automated telemetry. The Helix engine emits detailed [P0-TRACE] logs at every compilation pass boundary, ensuring verification parity between research and debug workflows.",
        icon: <RotateCcw className="w-5 h-5 text-rose-500" />,
        tag: "METHODOLOGY"
    }
];

export function Practice() {
    return (
        <section id="practice" className="py-24 bg-[#09090b] border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider text-brand-red font-mono mb-4">
                        Operating Standards
                    </div>
                    <h2 className="font-sans font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
                        Research Practice
                    </h2>
                    <p className="mt-4 font-sans text-sm text-zinc-400 max-w-3xl leading-relaxed">
                        Akasha Corporation operates under high standards of open-source transparency, clean-room software development, and scientific reproducibility.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {principles.map((principle) => (
                        <div 
                            key={principle.title}
                            className="p-6 rounded-lg bg-[#131316] border border-zinc-905 border-zinc-900 hover:border-zinc-850 transition-colors shadow-md flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 rounded bg-zinc-900 border border-zinc-850 text-brand-red">
                                            {principle.icon}
                                        </div>
                                        <h3 className="font-sans font-bold text-white text-base tracking-tight uppercase">
                                            {principle.title}
                                        </h3>
                                    </div>
                                    <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 px-2 py-0.5 rounded border border-zinc-900 bg-zinc-950/40">
                                        {principle.tag}
                                    </span>
                                </div>
                                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                                    {principle.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

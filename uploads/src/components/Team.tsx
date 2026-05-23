import { Github, Code, Terminal, Hexagon, ShieldAlert, Cpu } from 'lucide-react';

interface TeamMember {
    handle: string;
    domain: string;
    github: string;
    emoji: string;
    icon: React.ReactNode;
}

const teamMembers: TeamMember[] = [
    {
        handle: "LXrdKnowkill",
        domain: "Founder &bull; System Architecture &bull; Compiler Infrastructure",
        github: "https://github.com/LXrdKnowkill",
        emoji: "🐻",
        icon: <Hexagon className="w-4 h-4 text-rose-500" />
    },
    {
        handle: "MayaRomanova",
        domain: "C++23 Compilation &bull; MLIR Lowering Dialects &bull; Helix Engine &bull; CAst Optimizers",
        github: "https://github.com/ReiMayaRomanova",
        emoji: "🐺",
        icon: <Code className="w-4 h-4 text-rose-500" />
    },
    {
        handle: "ThreatBiih",
        domain: "Threat Intelligence Systems &bull; Unicorn Emulation &bull; UI/UX Frontend Interface Design",
        github: "https://github.com/ThreatBiih",
        emoji: "🦂",
        icon: <ShieldAlert className="w-4 h-4 text-rose-500" />
    },
    {
        handle: "YasminePayload",
        domain: "Automation Pipelines &bull; Heads-up Headless Batch Jobs &bull; HQL Language Design",
        github: "https://github.com/YasminePayload",
        emoji: "🦆",
        icon: <Terminal className="w-4 h-4 text-rose-500" />
    },
    {
        handle: "KrnL777",
        domain: "Low-level Reverse Engineering &bull; Target Vulnerability Exploitation &bull; Exploit Scripting",
        github: "https://github.com/KrnL777",
        emoji: "🐼",
        icon: <Cpu className="w-4 h-4 text-rose-500" />
    }
];

export function Team() {
    return (
        <section id="team" className="py-24 bg-[#09090b] border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider text-brand-red font-mono mb-4">
                        Core Investigators
                    </div>
                    <h2 className="font-sans font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
                        Systems Engineers
                    </h2>
                    <p className="mt-4 font-sans text-sm text-zinc-400 max-w-3xl leading-relaxed">
                        Akasha Corporation is maintained by a core group of low-level researchers, compiler engineers, and security analysts specializing in binary introspection and instrumentation.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member) => (
                        <div 
                            key={member.handle}
                            className="p-6 rounded-lg bg-[#131316] border border-zinc-905 border-zinc-900 hover:border-brand-red/30 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                        >
                            <div>
                                <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
                                    <div className="flex items-center space-x-3.5">
                                        {/* Minimal Emoji avatar */}
                                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center text-lg select-none">
                                            {member.emoji}
                                        </div>
                                        <div>
                                            <h3 className="font-sans font-bold text-white text-base tracking-tight">
                                                {member.handle}
                                            </h3>
                                            <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest font-semibold flex items-center gap-1.5 mt-0.5">
                                                {member.icon}
                                                Core Member
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p 
                                    className="font-sans text-xs text-zinc-400 leading-relaxed mb-6"
                                    dangerouslySetInnerHTML={{ __html: member.domain }}
                                />
                            </div>

                            <div className="pt-4 border-t border-zinc-900">
                                <a 
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-white hover:text-brand-red transition-colors cursor-pointer"
                                >
                                    <Github className="w-3.5 h-3.5 text-zinc-500 group-hover:text-brand-red transition-colors" />
                                    <span>GitHub Profile</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

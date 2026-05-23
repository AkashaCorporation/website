import { Github, MessagesSquare } from 'lucide-react';
import { ShinyButton } from './ui/shiny-button';

export function Footer() {
    return (
        <div className="w-full bg-[#09090b] border-t border-zinc-900">
            {/* CTA Section */}
            <section className="py-24 border-b border-zinc-900 bg-[#0e0e11]/30">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider text-brand-red font-mono mb-6">
                        Community
                    </div>
                    <h2 className="font-sans font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
                        Join the System
                    </h2>
                    <p className="mt-4 font-sans text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
                        HikariSystem is an open community working across low-level security research, reverse engineering, malware analysis, and offensive tooling. If you're building something serious &mdash; you belong here.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a 
                            href="https://github.com/AkashaCorporation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 border border-zinc-800 bg-zinc-950 hover:border-white text-white font-mono text-[10px] uppercase tracking-wider transition-all duration-300 rounded cursor-pointer"
                        >
                            <Github className="w-4 h-4" />
                            <span>Browse All Repositories</span>
                        </a>
                        <ShinyButton 
                            href="https://discord.gg/uQFb4nUAcT"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <MessagesSquare className="w-4 h-4" />
                            <span>Join Discord Server</span>
                        </ShinyButton>
                    </div>
                </div>
            </section>

            {/* Footer Bottom */}
            <footer className="w-full py-12 bg-[#060608]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex gap-4 items-center">
                        <img src="/logo.png" alt="Akasha Logo" className="w-7 h-7 object-contain" />
                        <div className="text-left">
                            <span className="font-sans font-extrabold tracking-tight text-white text-sm uppercase block">
                                Akasha <span className="text-brand-red font-light">Corporation</span>
                            </span>
                            <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-wider block mt-0.5">
                                HikariSystem &bull; Security Tools for Professionals
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
                        <div className="flex gap-3 items-center bg-zinc-950 px-4 py-2 border border-zinc-900 rounded">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                            <span className="font-mono text-[9px] uppercase text-zinc-400 tracking-wider">
                                All Systems Operational
                            </span>
                        </div>
                        <span className="font-sans text-[10px] text-zinc-600">
                            Copyright &copy; 2026 Akasha Corporation. All rights reserved.
                        </span>
                        
                        {/* GHPVC GitHub Views indicator */}
                        <div className="mt-2 opacity-80 scale-90">
                            <img 
                                src="https://komarev.com/ghpvc/?username=AkashaCorporation&color=ff0055&style=for-the-badge&label=ORGANIZATION+VIEWS" 
                                alt="Organization Views" 
                                className="h-6"
                            />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

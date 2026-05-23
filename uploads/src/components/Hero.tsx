import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BlurInText } from './ui/BlurInText';
import { ShinyText } from './ui/shiny-text';
import { AnimatedGradientText } from './ui/animated-gradient-text';

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                logoRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.2 }
            )
            .fromTo(
                contentRef.current?.children || [],
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                '-=0.8'
            )
            .fromTo(
                quoteRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.6 },
                '-=0.4'
            )
            .fromTo(
                aboutRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.3'
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen bg-obsidian flex flex-col items-center justify-center py-24 overflow-hidden"
        >
            {/* Elegant Background Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                        backgroundSize: '3rem 3rem',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex flex-col items-center text-center">
                {/* Logo Section */}
                <div ref={logoRef} className="mb-8 opacity-0">
                    <div className="relative p-2 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 shadow-[0_0_50px_-12px_rgba(255,31,75,0.2)] animate-pulse" style={{ animationDuration: '4s' }}>
                        <img 
                            src="/logo.png" 
                            alt="Akasha Corporation Logo" 
                            className="w-40 h-40 md:w-48 md:h-48 object-contain"
                        />
                    </div>
                </div>

                {/* Organization Info */}
                <div ref={contentRef} className="w-full flex flex-col items-center">
                    <h1 className="font-sans font-black tracking-tight text-white text-4xl md:text-6xl uppercase leading-none opacity-0 flex flex-wrap justify-center items-center gap-x-3">
                        <BlurInText
                            text="Akasha"
                            blurAmount={12}
                            duration={1.2}
                            stagger={0.08}
                            split="letter"
                            className="font-black text-white"
                        />
                        <ShinyText
                            text="Corporation"
                            shineColor="#ffffff"
                            duration={5}
                            trigger="loop"
                            shimmerWidth={300}
                            angle={110}
                            className="font-black text-brand-red"
                        />
                    </h1>
                    <p className="mt-4 font-mono text-[10px] md:text-xs tracking-widest text-text-muted uppercase opacity-0">
                        Security Tooling &bull; Reverse Engineering &bull; Binary Analysis
                    </p>

                    {/* Premium Badges using AnimatedGradientText */}
                    <div className="mt-8 flex flex-wrap justify-center gap-3 opacity-0">
                        <AnimatedGradientText speed={4} colorFrom="#ff1f4b" colorTo="#00f0ff">
                            <span>Ecosystem: HikariSystem</span>
                        </AnimatedGradientText>
                        <AnimatedGradientText speed={4.5} colorFrom="#ff1f4b" colorTo="#e11d48">
                            <span>Field: Reverse Engineering</span>
                        </AnimatedGradientText>
                        <AnimatedGradientText speed={5} colorFrom="#00f0ff" colorTo="#7c3aed">
                            <span>Arch: x86 / ARM / RISC-V</span>
                        </AnimatedGradientText>
                        <AnimatedGradientText speed={5.5} colorFrom="#10b981" colorTo="#00f0ff">
                            <span>License: MIT / Apache-2.0</span>
                        </AnimatedGradientText>
                    </div>
                </div>

                {/* Brand Quote */}
                <div ref={quoteRef} className="mt-12 opacity-0">
                    <p className="font-sans font-light italic text-zinc-400 text-lg md:text-xl max-w-2xl border-l-2 border-brand-red/50 pl-4 py-1 text-left">
                        "To master the machine, one must first read its records."
                    </p>
                </div>

                {/* What We Build (About Section) */}
                <div id="about" ref={aboutRef} className="mt-16 text-left opacity-0 max-w-3xl border-t border-steel-gray/40 pt-10">
                    <h2 className="font-sans font-black text-xl tracking-tight text-white uppercase mb-4">
                        What We Build
                    </h2>
                    <p className="font-sans text-sm md:text-base text-zinc-300 leading-relaxed">
                        Akasha Corporation develops <strong className="text-white font-medium">low-level security tooling for binary analysis, CPU emulation, reverse engineering, and offensive security</strong>. Our work lives at the boundary between software and hardware &mdash; where most tools stop, ours begins.
                    </p>
                    <p className="mt-4 font-sans text-sm md:text-base text-zinc-300 leading-relaxed">
                        All projects operate under the <strong className="text-brand-red font-medium">HikariSystem</strong> philosophy: lean, composable, built for professionals. We publish in the open. We document negative results. We credit our tools. We do not ship vaporware.
                    </p>
                </div>
            </div>
        </section>
    );
}

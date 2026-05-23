import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Workflow, Scan, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const engines = [
    {
        id: 1,
        title: "Static Control Flow Analysis",
        description: "Deep graph-based block reconstruction and semantic analysis of non-linear execution paths.",
        icon: <Workflow className="w-8 h-8 text-electric-cyan" />,
        color: "electric-cyan"
    },
    {
        id: 2,
        title: "Dynamic Memory Introspection",
        description: "Real-time laser-focused scanning of continuous hex memory blocks under heavy virtualization.",
        icon: <Scan className="w-8 h-8 text-acid-green" />,
        color: "acid-green"
    },
    {
        id: 3,
        title: "VVM Native Execution Pipeline",
        description: "Complete hardware-accelerated pipeline emulation mapping IR to pure metal operations.",
        icon: <Activity className="w-8 h-8 text-white" />,
        color: "white"
    }
];

function WireframeGraph() {
    const nodeRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        gsap.to(nodeRef.current, {
            rotate: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    }, []);

    return (
        <svg ref={nodeRef} viewBox="0 0 200 200" className="w-full h-full text-steel-gray opacity-30 drop-shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <path d="M100 20 L160 60 L160 140 L100 180 L40 140 L40 60 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M100 20 L100 100 L160 140 M100 100 L40 140" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="20" r="4" fill="#00F0FF" />
            <circle cx="160" cy="60" r="4" fill="#00F0FF" />
            <circle cx="160" cy="140" r="4" fill="#00F0FF" />
            <circle cx="100" cy="180" r="4" fill="#00F0FF" />
            <circle cx="40" cy="140" r="4" fill="#00F0FF" />
            <circle cx="40" cy="60" r="4" fill="#00F0FF" />
            <circle cx="100" cy="100" r="6" fill="#00F0FF" />
        </svg>
    );
}

function ScanningHexGrid() {
    const laserRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.to(laserRef.current, {
            top: '100%',
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut" // Smooth scanning bounce
        });
    }, []);

    return (
        <div className="w-full h-full relative overflow-hidden flex flex-wrap content-start p-4 gap-2">
            <div ref={laserRef} className="absolute left-0 right-0 h-[2px] bg-acid-green z-10 shadow-[0_0_20px_4px_rgba(163,230,53,0.6)]" style={{ top: '0%' }} />
            {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="font-data text-[10px] text-steel-gray opacity-40 uppercase">
                    {Math.floor(Math.random() * 255).toString(16).padStart(2, '0')}
                </div>
            ))}
        </div>
    );
}

function PulsingPipeline() {
    const pathsRef = useRef<SVGGElement>(null);

    useEffect(() => {
        gsap.to(pathsRef.current?.children || [], {
            strokeDashoffset: 0,
            duration: 2,
            repeat: -1,
            ease: "none",
            stagger: 0.2
        });
    }, []);

    return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
                <linearGradient id="pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1F2226" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#1F2226" />
                </linearGradient>
            </defs>
            <g ref={pathsRef} stroke="url(#pipe-grad)" strokeWidth="4" fill="none" strokeDasharray="100 200" strokeDashoffset="300">
                <path d="M 0 50 Q 100 50 100 100 T 200 150" />
                <path d="M 0 100 Q 100 100 100 150 T 200 200" />
                <path d="M 0 150 Q 100 150 100 200 T 200 250" />
            </g>
        </svg>
    );
}

export function EngineStack() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>('.engine-card');

            cards.forEach((card, i) => {
                if (i === cards.length - 1) return; // Last card doesn't shrink beneath anything

                const nextCard = cards[i + 1];

                gsap.to(card, {
                    scale: 0.9,
                    filter: 'grayscale(100%)',
                    opacity: 0.4,
                    ease: "none",
                    scrollTrigger: {
                        trigger: nextCard,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="engine" ref={containerRef} className="relative w-full bg-obsidian">
            {/* Container providing scrolling space for the sticky cards */}
            <div className="relative w-full pb-[10vh]">

                {engines.map((engine, index) => (
                    <div
                        key={engine.id}
                        className="engine-card sticky top-0 w-full h-[100vh] flex items-center justify-center p-6 origin-top"
                    >
                        {/* Dark background container to ensure stacking blocks out visual underneath */}
                        <div className="absolute inset-0 bg-[#08090A] border-t border-steel-gray rounded-t-[20px]" />

                        <div className={`relative z-10 w-full max-w-7xl h-[80vh] border border-steel-gray bg-[#0c0d0f] rounded-xl flex flex-col md:flex-row overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]`}>

                            <div className="flex-1 p-12 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-steel-gray/50">
                                <div className="mb-6">{engine.icon}</div>
                                <h3 className="font-sans font-black text-4xl md:text-6xl text-white uppercase tracking-tighter leading-[0.9]">
                                    {engine.title}
                                </h3>
                                <p className="mt-8 font-mono text-steel-gray text-lg tracking-widest max-w-md">
                                    {engine.description}
                                </p>
                                <div className="mt-12 font-data text-xs text-[#A1A1AA] uppercase">
                                    Engine System 0{engine.id}
                                </div>
                            </div>

                            <div className="flex-1 relative bg-obsidian overflow-hidden flex items-center justify-center p-12">
                                {/* Visual Artifact Graphic */}
                                <div className="w-full h-full max-w-md max-h-md flex items-center justify-center mix-blend-screen opacity-80">
                                    {index === 0 && <WireframeGraph />}
                                    {index === 1 && <ScanningHexGrid />}
                                    {index === 2 && <PulsingPipeline />}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}

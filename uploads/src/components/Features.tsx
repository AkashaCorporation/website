import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Cpu, TerminalSquare, Layers } from 'lucide-react';

const mockAsm = [
    "0x1000: mov eax, ebx",
    "0x1002: xor ecx, ecx",
    "0x1004: push ebp",
    "0x1005: mov ebp, esp",
    "0x1007: sub esp, 0x10",
    "0x100a: cmp dword ptr [ebp+8], 0",
    "0x100e: jz 0x1020",
    "0x1010: call 0x401200",
    "0x1015: add esp, 4",
    "0x1018: leave",
    "0x1019: ret"
];

function CardHexShuffler() {
    const [order, setOrder] = useState([0, 1, 2]);
    const [stream, setStream] = useState<string[]>([]);

    // Rotating logic
    useEffect(() => {
        const cycle = setInterval(() => {
            setOrder(prev => {
                const next = [...prev];
                const last = next.pop()!;
                next.unshift(last);
                return next;
            });
        }, 3000);
        return () => clearInterval(cycle);
    }, []);

    // ASM Stream logic
    useEffect(() => {
        let index = 0;
        const asmInterval = setInterval(() => {
            setStream(prev => {
                const next = [...prev, mockAsm[index % mockAsm.length]];
                if (next.length > 5) next.shift();
                return next;
            });
            index++;
        }, 400);
        return () => clearInterval(asmInterval);
    }, []);

    return (
        <div className="relative h-64 w-full flex justify-center items-end pb-8 perspective-[1000px]">
            {[0, 1, 2].map((id) => {
                const position = order.indexOf(id);
                const isActive = position === 0;

                // Compute Tailwind classes instead of raw styles to maintain the brutalist design system
                let transformClass = "";
                let zIndex = "z-10";
                let opacity = "opacity-40";

                if (position === 0) {
                    transformClass = "translate-y-0 scale-100";
                    zIndex = "z-30";
                    opacity = "opacity-100";
                } else if (position === 1) {
                    transformClass = "-translate-y-6 scale-[0.92]";
                    zIndex = "z-20";
                    opacity = "opacity-80";
                } else if (position === 2) {
                    transformClass = "-translate-y-12 scale-[0.84]";
                    zIndex = "z-10";
                    opacity = "opacity-40";
                }

                return (
                    <div
                        key={id}
                        className={`absolute w-full max-w-sm rounded-[5px] border border-steel-gray bg-[#101215] p-5 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${transformClass} ${zIndex} ${opacity} shadow-2xl`}
                    >
                        <div className="flex justify-between items-center mb-4 border-b border-steel-gray/50 pb-2">
                            <span className="text-xs font-sans font-black text-electric-cyan uppercase tracking-widest flex items-center gap-2">
                                <TerminalSquare className="w-3 h-3" />
                                Capstone
                            </span>
                            <span className="text-[10px] font-mono text-[#A1A1AA]">ID: 0x{id}F{id}A</span>
                        </div>

                        <div className="font-data text-xs text-[#A1A1AA] flex flex-col gap-1 h-24 overflow-hidden">
                            {isActive ? stream.map((line, i) => (
                                <div key={i} className={`${i === stream.length - 1 ? 'text-white' : ''}`}>{line}</div>
                            )) : (
                                <div className="text-steel-gray">Pending execution...</div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function CardRegisterTelemetry() {
    const [text, setText] = useState("");
    const fullText = "[SYS] Emulating Instruction at 0x00401000...\n[REG] EAX: 0x00000000\n[REG] EBX: 0xFFFFFFFF\n[REG] ECX: 0x00000010\n[REG] EDX: 0x00000000\n[SYS] Context swapped successfully.\n[WARN] Illegal memory access at 0xFE...";

    useEffect(() => {
        let i = 0;
        setText("");
        const typeInterval = setInterval(() => {
            setText(fullText.substring(0, i));
            i++;
            if (i > fullText.length) {
                clearInterval(typeInterval);
                setTimeout(() => { i = 0; setText(""); }, 4000); // Restart typing loop
            }
        }, 40);
        return () => clearInterval(typeInterval);
    }, []);

    return (
        <div className="h-64 w-full rounded-[5px] border border-steel-gray bg-[#101215] p-5 shadow-2xl flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 border-b border-steel-gray/50 pb-2">
                <span className="text-xs font-sans font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Cpu className="w-3 h-3" />
                    Unicorn Engine
                </span>
                <div className="flex gap-2 items-center">
                    <span className="text-[10px] font-mono text-[#A1A1AA]">LIVE STATUS</span>
                    <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-pulse" />
                </div>
            </div>

            <div className="font-data text-xs leading-relaxed text-[#A1A1AA] whitespace-pre-wrap flex-1">
                {text}
                <span className="inline-block w-2.5 h-3.5 ml-1 bg-electric-cyan animate-[pulse_0.75s_infinite]" style={{ verticalAlign: 'middle' }}></span>
            </div>

            {/* Background decoration */}
            <div className="absolute -bottom-10 -right-10 opacity-[0.03] text-[180px] pointer-events-none">
                <Cpu />
            </div>
        </div>
    );
}

function CardMockAnalysis() {
    const containerRef = useRef<HTMLDivElement>(null);
    const crosshairRef = useRef<SVGSVGElement>(null);
    const blockRef = useRef<HTMLDivElement>(null);
    const logRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, defaults: { ease: 'power2.inOut' } });

            // Reset
            tl.set(crosshairRef.current, { x: 200, y: -50, opacity: 0, scale: 1 })
                .set(blockRef.current, { backgroundColor: 'transparent' })
                .set(logRef.current, { opacity: 0, y: 10 });

            // Move crosshair in
            tl.to(crosshairRef.current, { x: 60, y: 40, opacity: 1, duration: 1 })
                // Click action (scale down)
                .to(crosshairRef.current, { scale: 0.7, duration: 0.15 })
                .to(crosshairRef.current, { scale: 1, duration: 0.15 })
                // Flash block Acid Green
                .to(blockRef.current, { backgroundColor: '#A3E635', duration: 0.2 }, '-=0.15')
                // Show Log
                .to(logRef.current, { opacity: 1, y: 0, duration: 0.3 })
                // Move away
                .to(crosshairRef.current, { x: -50, y: 150, opacity: 0, duration: 1, delay: 0.5 })
                // Fade out block and log
                .to(blockRef.current, { backgroundColor: 'transparent', duration: 0.5 }, '-=0.5')
                .to(logRef.current, { opacity: 0, duration: 0.5 }, '-=0.5');

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // 4x4 Grid
    const grid = Array.from({ length: 16 }).map((_, i) => i);

    return (
        <div ref={containerRef} className="h-64 w-full rounded-[5px] border border-steel-gray bg-[#101215] p-5 shadow-2xl flex flex-col overflow-hidden relative">
            <div className="flex justify-between items-center mb-4 border-b border-steel-gray/50 pb-2 relative z-10">
                <span className="text-xs font-sans font-black text-acid-green uppercase tracking-widest flex items-center gap-2">
                    <Layers className="w-3 h-3" />
                    LLVM / Remill
                </span>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center relative z-0">
                <div className="grid grid-cols-4 gap-2 w-32 h-32 relative">
                    {grid.map(i => (
                        <div
                            key={i}
                            ref={i === 5 ? blockRef : null}
                            className="w-full h-full border border-steel-gray/40 rounded-[2px]"
                        />
                    ))}

                    <svg
                        ref={crosshairRef}
                        width="24" height="24" viewBox="0 0 24 24"
                        className="absolute top-0 left-0 text-white pointer-events-none drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        style={{ zIndex: 50, transform: 'translate(-50%, -50%)' }}
                        fill="none" stroke="currentColor" strokeWidth="1.5"
                    >
                        <path d="M12 2v20M2 12h20" />
                        <circle cx="12" cy="12" r="4" />
                    </svg>
                </div>

                <div ref={logRef} className="absolute bottom-4 left-5 right-5 font-data text-[10px] text-acid-green bg-acid-green/10 border border-acid-green/20 p-2 rounded-[2px]">
                    [LOG] IR Generated: mapped to LLVM Block 0x40101A
                </div>
            </div>
        </div>
    );
}

export function Features() {
    return (
        <section id="features" className="py-32 w-full bg-obsidian relative">
            <div className="max-w-7xl mx-auto px-6 max-2xl:px-8">
                <div className="mb-20">
                    <h2 className="font-sans font-black text-4xl md:text-5xl text-white uppercase tracking-tighter">
                        Execution Modules
                    </h2>
                    <p className="mt-4 font-mono text-[#A1A1AA] text-sm tracking-widest uppercase">
                        Not just layouts. Interactive functional artifacts.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <CardHexShuffler />
                    <CardRegisterTelemetry />
                    <CardMockAnalysis />
                </div>
            </div>
        </section>
    );
}

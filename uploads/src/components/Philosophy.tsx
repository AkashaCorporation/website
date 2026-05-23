import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background parallax
            gsap.to(bgRef.current, {
                yPercent: 30, // Move down slightly as we scroll down
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Text reveal
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo('.word-reveal-1', { opacity: 0, y: 80, rotateX: -40 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1, ease: 'power4.out' })
                .fromTo('.word-reveal-2', { opacity: 0, y: 80, rotateX: 40 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }, '-=0.6');

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const line1 = "Standard tools see the surface.";
    const line2 = "We manipulate the logic gates.";

    return (
        <section id="philosophy" ref={containerRef} className="relative py-48 md:py-64 w-full bg-[#030303] overflow-hidden flex items-center justify-center">
            {/* Parallax Background Texture */}
            <div
                ref={bgRef}
                className="absolute inset-0 opacity-[0.03] pointer-events-none scale-125"
                style={{
                    backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 max-2xl:px-8 flex flex-col items-center text-center perspective-[1000px]">
                <h2 className="font-sans font-black text-[8vw] sm:text-6xl md:text-8xl text-steel-gray uppercase tracking-tighter leading-[0.85] flex flex-wrap justify-center gap-x-[2vw] gap-y-[1vw]">
                    {line1.split(' ').map((word, i) => (
                        <span key={i} className="word-reveal-1 inline-block transform-origin-bottom">{word}</span>
                    ))}
                </h2>
                <h2 className="font-mono italic font-thin text-[7vw] sm:text-5xl md:text-7xl mt-8 md:mt-12 tracking-tight leading-none flex flex-wrap justify-center gap-x-[2vw] gap-y-[1vw] drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    {line2.split(' ').map((word, i) => (
                        <span key={i} className="word-reveal-2 inline-block text-electric-cyan transform-origin-top">{word}</span>
                    ))}
                </h2>
            </div>
        </section>
    );
}

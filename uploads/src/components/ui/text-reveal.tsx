import { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
}

export function TextReveal({ children, className = '' }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Calculate progress as the text block scrolls through the viewport
        const start = windowHeight;
        const end = -rect.height;
        const current = rect.top;
        
        let pct = (start - current) / (start - end);
        pct = Math.max(0, Math.min(1, pct));
        setProgress(pct);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = children.split(' ');

  return (
    <div
      ref={containerRef}
      className={`relative z-10 w-full min-h-[40vh] flex items-center justify-center py-16 ${className}`}
    >
      <p className="max-w-4xl text-center font-sans font-black tracking-tight text-3xl md:text-5xl uppercase leading-snug px-6">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          const wordProgress = (progress - start) / (end - start);
          const opacity = Math.max(0.12, Math.min(1, wordProgress));

          return (
            <span
              key={i}
              style={{
                opacity,
                transition: 'opacity 0.15s ease-out',
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </span>
          );
        })}
      </p>
    </div>
  );
}

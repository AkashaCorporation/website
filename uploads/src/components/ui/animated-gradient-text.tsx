import React from 'react';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export function AnimatedGradientText({
  children,
  speed = 4,
  colorFrom = '#ff1f4b',
  colorTo = '#00f0ff',
  className = '',
}: AnimatedGradientTextProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-wider border border-zinc-800/85 bg-zinc-950/70 relative overflow-hidden group ${className}`}
    >
      {/* Background glow animation */}
      <span 
        className="absolute inset-0 opacity-15 mix-blend-screen pointer-events-none transition-opacity duration-300 group-hover:opacity-30"
        style={{
          background: `linear-gradient(90deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
          backgroundSize: '200% 100%',
          animation: `gradientMove ${speed}s linear infinite`,
        }}
      />
      {/* Accent border overlay */}
      <span 
        className="absolute inset-0 rounded-full border border-transparent pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.5,
        }}
      />
      <span className="relative z-10 flex items-center gap-1.5 text-zinc-300 group-hover:text-white transition-colors duration-300">
        {children}
      </span>
    </span>
  );
}

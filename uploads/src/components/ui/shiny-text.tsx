import React from 'react';

interface ShinyTextProps {
  text: string;
  shineColor?: string;
  duration?: number;
  trigger?: 'loop' | 'hover' | 'mount';
  shimmerWidth?: number;
  angle?: number;
  className?: string;
}

export function ShinyText({
  text,
  shineColor = 'rgba(255, 255, 255, 1)',
  duration = 4,
  trigger = 'loop',
  shimmerWidth = 250,
  angle = 110,
  className = '',
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block animate-shiny-text bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, #71717a 40%, ${shineColor} 50%, #71717a 60%)`,
        backgroundSize: `${shimmerWidth}px 100%`,
        animationDuration: `${duration}s`,
        animationIterationCount: trigger === 'loop' ? 'infinite' : 1,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      } as React.CSSProperties}
    >
      {text}
    </span>
  );
}

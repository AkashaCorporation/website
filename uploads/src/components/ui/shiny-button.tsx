import React from 'react';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export function ShinyButton({ 
  children, 
  className = '', 
  href, 
  target, 
  rel, 
  ...props 
}: ShinyButtonProps) {
  const classes = `relative overflow-hidden px-6 py-3.5 rounded bg-brand-red text-white font-mono text-[10px] font-semibold uppercase tracking-wider hover:bg-brand-red-hover transition-all duration-300 shadow-[0_0_20px_rgba(255,31,75,0.2)] hover:shadow-[0_0_30px_rgba(255,31,75,0.4)] cursor-pointer group flex items-center justify-center gap-2 ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={rel} 
        className={classes}
      >
        {/* Shiny sheen overlay */}
        <span className="absolute inset-0 w-[40px] h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-[40px] skew-x-12 group-hover:animate-shine-sweep" />
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {/* Shiny sheen overlay */}
      <span className="absolute inset-0 w-[40px] h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-[40px] skew-x-12 group-hover:animate-shine-sweep" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

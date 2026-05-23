import React, { useRef, useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';

interface DockContextType {
  mouseX: number;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextType>({
  mouseX: Infinity,
  magnification: 60,
  distance: 140,
});

interface DockProps {
  children: React.ReactNode;
  className?: string;
  magnification?: number;
  distance?: number;
}

export function Dock({
  children,
  className = '',
  magnification = 60,
  distance = 140,
}: DockProps) {
  const [mouseX, setMouseX] = useState<number>(Infinity);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(Infinity);
  };

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance }}>
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "flex h-16 items-end gap-4 rounded-2xl border border-steel-gray/50 bg-zinc-950/70 px-4 pb-3 backdrop-blur-md shadow-2xl",
          className
        )}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}

interface DockIconProps {
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
  href?: string;
}

export function DockIcon({ children, className = '', tooltip, href }: DockIconProps) {
  const { mouseX, distance } = useContext(DockContext);
  const iconRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Calculate scaling factor based on mouse position
  let scale = 1.0;
  if (mouseX !== Infinity && iconRef.current) {
    const rect = iconRef.current.getBoundingClientRect();
    const dockRect = iconRef.current.parentElement?.getBoundingClientRect();
    if (dockRect) {
      const iconCenterX = rect.left + rect.width / 2 - dockRect.left;
      const dist = Math.abs(mouseX - iconCenterX);
      if (dist < distance) {
        const pct = 1 - dist / distance;
        scale = 1.0 + pct * 0.45; // Max scaling factor of 1.45
      }
    }
  }

  const content = (
    <div
      ref={iconRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: `${40 * scale}px`,
        height: `${40 * scale}px`,
        transition: mouseX === Infinity ? 'width 0.2s, height 0.2s' : undefined,
      }}
      className={cn(
        "relative flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-brand-red/50 transition-colors cursor-pointer",
        className
      )}
    >
      {/* Custom Tooltip */}
      {tooltip && hovered && (
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 rounded bg-zinc-950 border border-steel-gray/60 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-white whitespace-nowrap shadow-lg animate-blur-in z-50">
          {tooltip}
        </div>
      )}
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

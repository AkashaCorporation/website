import { useEffect, useRef, useState } from 'react';

interface VelocityScrollProps {
  text: string;
  default_velocity?: number;
  className?: string;
}

export function VelocityScroll({
  text,
  default_velocity = 5,
  className = '',
}: VelocityScrollProps) {
  const [velocity, setVelocity] = useState(default_velocity);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      // Increase velocity based on scroll speed
      const newVelocity = default_velocity + Math.min(diff * 0.4, 25);
      setVelocity(newVelocity);

      if (scrollTimeout.current) {
        window.cancelAnimationFrame(scrollTimeout.current);
      }

      // Decelerate back to default velocity
      const decelerate = () => {
        setVelocity((prev) => {
          if (prev <= default_velocity + 0.1) {
            return default_velocity;
          }
          const next = prev - (prev - default_velocity) * 0.1;
          scrollTimeout.current = window.requestAnimationFrame(decelerate);
          return next;
        });
      };

      scrollTimeout.current = window.requestAnimationFrame(decelerate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        window.cancelAnimationFrame(scrollTimeout.current);
      }
    };
  }, [default_velocity]);

  // Repeated text to make it continuous
  const repeatedText = Array(12).fill(text).join(' \u00A0\u00A0\u00A0\u00A0 ');

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden whitespace-nowrap select-none border-y border-steel-gray/30 bg-obsidian py-6 ${className}`}
    >
      <div className="flex flex-col gap-2 md:gap-4">
        {/* Row 1: Left scrolling */}
        <div className="overflow-hidden flex">
          <div
            className="flex shrink-0 animate-scroll-left font-sans font-black tracking-tighter uppercase text-white"
            style={{
              animationDuration: `${120 / velocity}s`,
              animationPlayState: 'running',
            }}
          >
            <span className="inline-block pr-8">{repeatedText}</span>
            <span className="inline-block pr-8">{repeatedText}</span>
          </div>
        </div>

        {/* Row 2: Right scrolling */}
        <div className="overflow-hidden flex">
          <div
            className="flex shrink-0 animate-scroll-right font-sans font-black tracking-tighter uppercase"
            style={{
              animationDuration: `${120 / velocity}s`,
              animationPlayState: 'running',
              backgroundImage: 'linear-gradient(to right, var(--color-brand-red), #df0f36, transparent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <span className="inline-block pr-8">{repeatedText}</span>
            <span className="inline-block pr-8">{repeatedText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

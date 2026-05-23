interface BlurInTextProps {
    text: string;
    blurAmount?: number;
    duration?: number;
    stagger?: number;
    split?: 'letter' | 'word';
    className?: string;
}

export function BlurInText({
    text,
    blurAmount = 8,
    duration = 0.6,
    stagger = 0.04,
    split = 'letter',
    className = ''
}: BlurInTextProps) {
    const items = split === 'letter' ? text.split('') : text.split(' ');

    return (
        <span className={`inline-block ${className}`}>
            {items.map((char, index) => (
                <span
                    key={index}
                    className="inline-block animate-blur-in opacity-0"
                    style={{
                        animationDelay: `${index * stagger}s`,
                        animationDuration: `${duration}s`,
                        animationFillMode: 'forwards',
                        // Custom style override for blur amount
                        '--blur-amount': `${blurAmount}px`,
                        marginRight: split === 'word' ? '0.3em' : char === ' ' ? '0.27em' : '0'
                    } as React.CSSProperties}
                >
                    {char === ' ' && split === 'letter' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
}

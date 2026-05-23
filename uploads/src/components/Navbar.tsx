import { useEffect, useState } from 'react';

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-obsidian/85 border-b border-steel-gray/60 backdrop-blur-md h-16'
                : 'bg-transparent border-b border-transparent h-20'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <a href="#" className="flex items-center gap-3 group">
                    <img 
                        src="/logo.png" 
                        alt="Akasha Logo" 
                        className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-105" 
                    />
                    <span className="font-sans font-extrabold tracking-tight text-white text-lg uppercase">
                        Akasha <span className="text-brand-red font-light">Corp</span>
                    </span>
                </a>
                <div className="hidden md:flex gap-8 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    <a href="#about" className="hover:text-brand-red transition-colors">What We Build</a>
                    <a href="#hexcore" className="hover:text-brand-red transition-colors">HexCore IDE</a>
                    <a href="#arsenal" className="hover:text-brand-red transition-colors">Arsenal</a>
                    <a href="#research" className="hover:text-brand-red transition-colors">Research</a>
                    <a href="#team" className="hover:text-brand-red transition-colors">Team</a>
                </div>
                <div>
                    <a 
                        href="https://github.com/AkashaCorporation" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="border border-steel-gray font-mono text-[10px] uppercase tracking-wider text-white px-4 py-2 hover:border-brand-red hover:text-brand-red transition-all duration-300"
                    >
                        Repositories
                    </a>
                </div>
            </div>
        </nav>
    );
}

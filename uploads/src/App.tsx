import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HexCoreIDE } from './components/HexCoreIDE';
import { Arsenal } from './components/Arsenal';
import { Roadmap } from './components/Roadmap';
import { Research } from './components/Research';
import { Team } from './components/Team';
import { Practice } from './components/Practice';
import { Footer } from './components/Footer';
import { VelocityScroll } from './components/ui/scrollbasedvelocity';
import { Dock, DockIcon } from './components/ui/dock';
import { TextReveal } from './components/ui/text-reveal';
import { Home, Terminal, Briefcase, BookOpen, Users, Github, MessagesSquare, Mail } from 'lucide-react';

function App() {
  return (
    <div className="relative min-h-[100vh] bg-obsidian selection:bg-brand-red/30 selection:text-white pb-20">
      <Navbar />
      <Hero />
      
      {/* Scroll Marquee Separator */}
      <VelocityScroll 
        text="Akasha Corporation • HikariSystem Ecosystem • HexCore IDE • Scylla Studio • Binary Analysis • " 
        default_velocity={3} 
        className="border-t border-b border-steel-gray/20 my-4" 
      />
      
      <div id="hexcore">
        <HexCoreIDE />
      </div>

      {/* Interactive Scroll-Linked Statement Reveal */}
      <TextReveal className="bg-zinc-950/20 border-y border-zinc-900/30 text-white">
        Our work lives at the boundary between software and hardware. Where most tools stop, ours begins.
      </TextReveal>

      <div id="arsenal">
        <Arsenal />
      </div>
      
      <div id="roadmap">
        <Roadmap />
      </div>
      
      <div id="research">
        <Research />
      </div>
      
      <div id="team">
        <Team />
      </div>
      
      <Practice />
      
      <Footer />

      {/* Floating Magnified Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Dock className="shadow-[0_10px_35px_-10px_rgba(0,0,0,0.85)] border-steel-gray bg-zinc-950/80">
          <DockIcon tooltip="Home" href="#">
            <Home className="w-5 h-5" />
          </DockIcon>
          <DockIcon tooltip="HexCore IDE" href="#hexcore">
            <Terminal className="w-5 h-5" />
          </DockIcon>
          <DockIcon tooltip="Arsenal" href="#arsenal">
            <Briefcase className="w-5 h-5" />
          </DockIcon>
          <DockIcon tooltip="Research" href="#research">
            <BookOpen className="w-5 h-5" />
          </DockIcon>
          <DockIcon tooltip="Team" href="#team">
            <Users className="w-5 h-5" />
          </DockIcon>
          <div className="w-[1px] h-6 bg-steel-gray/60 self-center mx-1" />
          <DockIcon tooltip="GitHub" href="https://github.com/AkashaCorporation">
            <Github className="w-5 h-5" />
          </DockIcon>
          <DockIcon tooltip="Discord" href="https://discord.gg/uQFb4nUAcT">
            <MessagesSquare className="w-5 h-5" />
          </DockIcon>
          <DockIcon tooltip="Email" href="mailto:contact@akashacorp.com">
            <Mail className="w-5 h-5" />
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
}

export default App;

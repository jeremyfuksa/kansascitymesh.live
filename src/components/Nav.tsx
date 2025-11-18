import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import PulsingDot from './PulsingDot';
import logo from '../assets/kc-mesh-logo-green.png';
import { DISCORD_INVITE } from '../constants/discord';
import { trackEvent } from '../utils/analytics';

interface NavProps {
  onNavigate: (target: 'home' | 'get-started') => void;
  currentPage?: 'home' | 'get-started';
}

export default function Nav({ onNavigate, currentPage = 'home' }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force dark background on Get Started page, transparent on home
    const navBackground = currentPage === 'get-started' || isScrolled
      ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
      : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand/Status */}
          <div className="flex items-center gap-2 md:gap-3">
            <img src={logo} alt="KC Mesh" className="w-8 h-8 rounded-lg" />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="flex items-center">
                <PulsingDot />
              </span>
              <span className="text-sm text-white/80 font-medium hidden sm:inline">KC Mesh</span>
            </div>
          </div>

          {/* Right: Navigation */}
          <div className="flex items-center gap-3 md:gap-6">
            <a 
              href="https://map.kansascitymesh.live" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors hidden md:flex"
            >
              <span>Coverage Map</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
              <button 
                onClick={() => onNavigate(currentPage === 'home' ? 'get-started' : 'home')}
                className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block"
              >
                {currentPage === 'get-started' ? 'Home' : 'Get Started'}
              </button>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 md:px-4 py-2 bg-[#5865F2] text-white rounded-lg text-sm font-medium hover:bg-[#4752C4] transition-colors"
              onClick={() => trackEvent('discord_invite_click', 'nav-link')}
            >
              <span className="hidden sm:inline">Join Discord</span>
              <span className="sm:hidden">Discord</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

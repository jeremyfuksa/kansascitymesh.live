import { ExternalLink } from 'lucide-react';
import { DISCORD_INVITE } from '../constants/discord';
import { trackEvent } from '../utils/analytics';
import { version } from '../../package.json';

interface FooterProps {
  onNavigate: (target: 'home' | 'get-started') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="px-4 py-12 bg-[var(--neutral-900)] border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <nav className="flex flex-wrap justify-center gap-8 mb-8">
          <a 
            href="https://map.kansascitymesh.live" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/60 hover:text-white transition-colors text-sm"
          >
            <span>Coverage Map</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => onNavigate('get-started')}
            className="text-white/60 hover:text-white transition-colors text-sm"
          >
            Get Started
          </button>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors text-sm"
            onClick={() => trackEvent('discord_invite_click', 'footer-link')}
          >
            Join Discord
          </a>
        </nav>
        <p className="text-center text-white/40 text-sm">© 2025 Kansas City Meshtastic Network</p>
        <p className="text-center text-white/40 text-sm">Not affiliated with <a href="https://meshtastic.org">meshtastic.org</a>.</p>
        <p className="text-center text-white/30 text-xs mt-4">v{version}</p>
      </div>
    </footer>
  );
}

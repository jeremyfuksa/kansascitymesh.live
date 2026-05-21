import { ExternalLink } from 'lucide-react';
import { DISCORD_INVITE } from '../constants/discord';
import { trackEvent } from '../utils/analytics';
import { version } from '../../package.json';

interface FooterProps {
  onNavigate: (target: 'home' | 'get-started' | 'host' | 'steal') => void;
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
            className="flex items-center gap-1 text-white/70 hover:text-white transition-colors text-sm"
          >
            <span>Coverage Map</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => onNavigate('get-started')}
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            Get Started
          </button>
          <button
            onClick={() => onNavigate('host')}
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            Host a Node
          </button>
          <button
            onClick={() => onNavigate('steal')}
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            Steal This Network
          </button>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors text-sm"
            onClick={() => trackEvent('discord_invite_click', 'footer-link')}
          >
            Join Discord
          </a>
        </nav>
        <p className="text-center text-white/50 text-sm">
          © 2025–{new Date().getFullYear()} Kansas City Meshtastic Network
        </p>
        <p className="text-center text-white/50 text-sm">
          Not affiliated with{' '}
          <a
            href="https://meshtastic.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            meshtastic.org
          </a>
          .
        </p>

        <p className="text-center text-white/50 text-sm mt-6 max-w-xl mx-auto leading-relaxed">
          Site content licensed under{' '}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white underline underline-offset-2"
          >
            CC&#8209;BY&#8209;SA&nbsp;4.0
          </a>
          {' '}— take whatever helps. Source on{' '}
          <a
            href="https://github.com/jeremyfuksa/kansascitymesh.live"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white underline underline-offset-2"
            onClick={() => trackEvent('footer_github_click', 'footer')}
          >
            GitHub
          </a>
          .
        </p>
        <p className="text-center text-white/50 text-sm mt-2 max-w-xl mx-auto leading-relaxed">
          Built on what{' '}
          <a
            href="https://www.austinmesh.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors underline underline-offset-2"
            onClick={() => trackEvent('footer_lineage_click', 'austinmesh')}
          >
            Austin Mesh
          </a>
          {' '}and{' '}
          <a
            href="https://cascadiamesh.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors underline underline-offset-2"
            onClick={() => trackEvent('footer_lineage_click', 'cascadiamesh')}
          >
            Cascadia Mesh
          </a>
          {' '}did first. If we've inspired you, please{' '}
          <button
            onClick={() => onNavigate('steal')}
            className="text-white/70 hover:text-white transition-colors underline underline-offset-2"
          >
            steal this network
          </button>
          .
        </p>

        <p className="text-center text-white/30 text-xs mt-6">v{version}</p>
      </div>
    </footer>
  );
}

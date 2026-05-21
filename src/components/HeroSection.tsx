import DiscordButton from './DiscordButton';
import FeatureCard from './FeatureCard';
import SecondaryButton from './SecondaryButton';
import { ExternalLink, Radio } from 'lucide-react';
import mapScreenshot from '../assets/meshmonitor.png';
import { DISCORD_INVITE } from '../constants/discord';
import { trackEvent } from '../utils/analytics';

export default function HeroSection() {
  const heroBackgroundStyle = {
    backgroundImage:
      'linear-gradient(180deg, var(--primary-800) 0%, var(--neutral-950) 75%, #000 100%)',
  };

  return (
    <section
      className="relative px-4 pt-32 md:pt-40 pb-24 md:pb-16 overflow-hidden"
      style={heroBackgroundStyle}
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--success-500)', opacity: 0.3 }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--info-600)', opacity: 0.3 }}
        ></div>
        <div
          className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--secondary-600)', opacity: 0.2 }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main headline */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-6xl mb-6 tracking-tight text-white">
            Kansas City has a{' '}
            <span className="bg-gradient-to-r from-[var(--success-500)] to-[var(--info-600)] bg-clip-text text-transparent">
              Mesh Network
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70">
            (And we want to say, "Hi!")
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left: About */}
          <FeatureCard padding="wide" className="flex flex-col">
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="w-10 h-10 bg-[var(--success-500)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Radio className="w-5 h-5 text-[var(--success-500)]" />
              </div>
              <div>
                <h3 className="text-lg mb-1 text-white">60+ active nodes. 130+ total nodes. 200+ in Discord.</h3>
                <p className="text-white/70 leading-relaxed">
                  Power up a Meshtastic node and say hello. Someone in the mesh will hear you.
                </p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed text-[15px] mb-6">
              Just activated your first node and wondering what's next? Or you've heard about Meshtastic and wondering if anyone in Kansas City is on it?
            </p>

            <p className="text-white/70 leading-relaxed text-[15px] mb-6">
              We're here. <strong>Say hello</strong>.
            </p>

            <p className="text-white/70 leading-relaxed text-[15px] mb-6">
              We'll chat on air, but Meshtastic is best for short messages. The Discord is where the longer conversations happen.
            </p>

            <div className="mt-auto">
              <DiscordButton href={DISCORD_INVITE} trackingLabel="hero-cta">
                Join the KC Mesh Discord
              </DiscordButton>
            </div>
          </FeatureCard>

          {/* Right: Coverage map */}
          <FeatureCard padding="none" className="overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={mapScreenshot}
                alt="Kansas City mesh network coverage map"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-gradient-to-br from-[var(--primary-600)] to-[var(--info-600)]">
              <h3 className="text-xl mb-2 text-white">Live Mesh Map of KC</h3>
              <p className="text-white mb-4 text-sm leading-relaxed">
                See where the action is. Identify places to fill out the mesh.
              </p>
              <SecondaryButton
                href="https://map.kansascitymesh.live"
                external
                onClick={() => trackEvent('coverage_map_click', 'hero-cta')}
              >
                <span>View Live Map</span>
                <ExternalLink className="w-4 h-4" />
              </SecondaryButton>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

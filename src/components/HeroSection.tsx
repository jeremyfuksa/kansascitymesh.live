import DiscordButton from './DiscordButton';
import { ExternalLink, Radio } from 'lucide-react';
import mapScreenshot from '../assets/meshmonitor.png';
import { DISCORD_INVITE } from '../constants/discord';

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
          <p className="text-xl md:text-2xl text-white/60">
            (And we want to say, "Hi!")
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left: About */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-6 shadow-xl shadow-black/50 flex flex-col">
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="w-10 h-10 bg-[var(--success-500)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Radio className="w-5 h-5 text-[var(--success-500)]" />
              </div>
              <div>
                <h3 className="text-lg mb-1 text-white">60+ active nodes. 130+ total nodes.</h3>
                <p className="text-white/60 leading-relaxed">
                  Power up a Meshtastic node and say hello. We're always welcoming newcomers.
                </p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed text-[15px] mb-6">
              Did you just activate your first node and wonder, "What's next?" Or, did you just hear about Meshtastic online and wondered whether people are using it in Kansas City?
            </p>

            <p className="text-white/70 leading-relaxed text-[15px] mb-6">
              We're here. <strong>Say hello</strong>.
            </p>

            <p className="text-white/70 leading-relaxed text-[15px] mb-6">
              We'll chat on air, but Meshtastic is best for short messages, so we have a Discord server for longer chats and questions. No pressure to join. Just a group chat for KC folks interested in Meshtastic.
            </p>

            <div className="mt-auto">
            <DiscordButton href={DISCORD_INVITE} trackingLabel="hero-cta">
                Join the KC Mesh Discord
              </DiscordButton>
            </div>
          </div>

          {/* Right: Coverage map */}
          <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/50">
            {/* Map screenshot */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={mapScreenshot} 
                alt="Kansas City mesh network coverage map" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content below map */}
            <div className="p-6 bg-gradient-to-br from-[var(--primary-600)] to-[var(--info-600)]">
              <h3 className="text-xl mb-2 text-white">Live Mesh Map of KC</h3>
              <p className="text-white/90 mb-4 text-sm leading-relaxed">
                See where the action is. Identify places to fill out the mesh.
              </p>
              <a 
                href="https://map.kansascitymesh.live" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl transition-all hover:scale-105 hover:shadow-2xl active:scale-100 group/btn text-sm font-medium"
              >
                <span>View Live Map</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

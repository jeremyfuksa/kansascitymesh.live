import DiscordButton from './DiscordButton';
import { Radio } from 'lucide-react';

export default function FinalCTASection() {
  const ctaBackgroundStyle = {
    backgroundImage:
      'linear-gradient(180deg, rgba(24, 26, 31, 0.6) 0%, rgba(12, 15, 19, 0.95) 65%, #000 100%)',
  };

  return (
    <section
      className="px-4 py-24 md:py-16 relative overflow-hidden border-t border-white/10"
      style={ctaBackgroundStyle}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--secondary-600)', opacity: 0.25 }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--info-600)', opacity: 0.25 }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--success-600)', opacity: 0.2 }}
        ></div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-3xl mx-auto text-center relative">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20">
          <Radio className="w-8 h-8 text-[var(--success-500)]" />
        </div>

        <h2 className="text-5xl md:text-6xl mb-6 tracking-tight text-white">
          See you out there
        </h2>
        
        <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
          Whether you're saying hello on the mesh or asking questions in Discord, we're glad you're here. Pick up a node, check the coverage map, and join the conversation wherever feels right.
        </p>

      </div>
    </section>
  );
}

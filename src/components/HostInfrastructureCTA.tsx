import { ArrowRight, Signal } from 'lucide-react';

interface HostInfrastructureCTAProps {
  onNavigate: (target: 'home' | 'get-started' | 'host') => void;
}

export default function HostInfrastructureCTA({ onNavigate }: HostInfrastructureCTAProps) {
  return (
    <section className="px-4 py-16 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--success-500)', opacity: 0.18 }}
        ></div>
        <div
          className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--secondary-600)', opacity: 0.18 }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-xl shadow-black/50">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-[var(--success-500)]/20 rounded-2xl flex items-center justify-center">
              <Signal className="w-7 h-7 text-[var(--success-500)]" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl text-white mb-2 tracking-tight">
                Got a rooftop, a tower, or a high spot in the metro?
              </h2>
              <p className="text-white/70 leading-relaxed">
                We're recruiting hosts for the KC Backbone Initiative — hosted nodes that fill the metro's east and west edges (Bonner Springs, Independence, Blue Springs) and close the I-70 hop chain out to existing outlier nodes in Manhattan and Columbia.
              </p>
            </div>

            <button
              onClick={() => onNavigate('host')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--success-500)] text-black rounded-xl font-medium text-[15px] transition-all hover:bg-[var(--success-600)] hover:text-white hover:scale-105 hover:shadow-2xl active:scale-100 flex-shrink-0"
            >
              <span>Become a host</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

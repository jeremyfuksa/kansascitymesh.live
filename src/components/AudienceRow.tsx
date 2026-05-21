import { ReactNode } from 'react';

interface AudienceRowProps {
  icon: ReactNode;
  /** Tailwind gradient classes for the left accent stripe. */
  accent: string;
  name: string;
  description: string;
}

/**
 * Horizontal "this is you" row used for the hostTypes section.
 * A left-edge gradient stripe color-codes each audience subtly without
 * the product-tile look of a full gradient icon medallion.
 */
export default function AudienceRow({ icon, accent, name, description }: AudienceRowProps) {
  return (
    <div className="relative bg-[var(--neutral-900)] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
      <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${accent}`} />
      <div className="flex gap-4 p-6 pl-7">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg text-white mb-1">{name}</h3>
          <p className="text-white/70 text-[15px] leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

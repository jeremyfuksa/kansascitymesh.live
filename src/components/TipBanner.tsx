import { ReactNode } from 'react';
import { Info } from 'lucide-react';

interface TipBannerProps {
  children: ReactNode;
  /** Override the default Info icon. */
  icon?: ReactNode;
}

/**
 * Sage-green highlight callout. Used to call attention to a tip or pointer
 * without breaking the reading flow. Replaces the legacy `.tip-banner` CSS class.
 */
export default function TipBanner({ children, icon }: TipBannerProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 flex gap-3"
      style={{
        background:
          'linear-gradient(135deg, rgba(127, 197, 63, 0.12), rgba(32, 61, 35, 0.5))',
        border: '1px solid rgba(143, 177, 75, 0.5)',
        boxShadow: '0 20px 45px rgba(6, 16, 5, 0.45)',
      }}
    >
      <div className="flex-shrink-0 mt-0.5">
        {icon ?? <Info className="w-5 h-5 text-[var(--success-500)]" />}
      </div>
      <div className="relative z-10 text-white/80 leading-relaxed flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}

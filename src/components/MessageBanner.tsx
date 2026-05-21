import { ReactNode } from 'react';

interface MessageBannerProps {
  children: ReactNode;
}

/**
 * Slate-gradient narrative callout. Used for "what this looks like in practice"
 * style storytelling blocks — denser than a card, lighter than a tip.
 * Replaces the legacy `.message-banner` CSS class.
 */
export default function MessageBanner({ children }: MessageBannerProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-8"
      style={{
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(12, 15, 19, 0.95))',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 25px 55px rgba(0, 0, 0, 0.35)',
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

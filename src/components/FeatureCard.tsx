import { ReactNode } from 'react';

type PaddingSize = 'none' | 'default' | 'wide' | 'large';

interface FeatureCardProps {
  children: ReactNode;
  className?: string;
  /** When the card is itself a link/button, enables hover lift + brighter surface. */
  interactive?: boolean;
  /** Render as <a> instead of <div>. */
  href?: string;
  /** External link convenience — adds target/rel automatically when true. */
  external?: boolean;
  onClick?: () => void;
  /**
   * Padding preset:
   * - 'default' = p-6 (most cards)
   * - 'wide'    = px-8 py-6 (Hero left card)
   * - 'large'   = p-8 md:p-10 (homepage CTA cards)
   * - 'none'    = p-0 (image-wrapping cards)
   */
  padding?: PaddingSize;
}

const PADDING_CLASSES: Record<PaddingSize, string> = {
  none: 'p-0',
  default: 'p-6',
  wide: 'px-8 py-6',
  large: 'p-8 md:p-10',
};

/**
 * Glass "showcase" card.
 * Used for hero cards, homepage CTAs, hardware showcase, resource link cards.
 * The "glass" treatment signals "this is a focal element."
 */
export default function FeatureCard({
  children,
  className = '',
  interactive = false,
  href,
  external = false,
  onClick,
  padding = 'default',
}: FeatureCardProps) {
  const base = `bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl ${PADDING_CLASSES[padding]} shadow-xl shadow-black/50`;
  const hover = interactive
    ? ' hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all'
    : '';
  const composed = `${base}${hover}${className ? ` ${className}` : ''}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={composed}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  return <div className={composed}>{children}</div>;
}

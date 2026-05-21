import { ReactNode } from 'react';

type PaddingSize = 'default' | 'large';

interface InfoCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  /**
   * Padding preset:
   * - 'default' = p-6 (most cards)
   * - 'large'   = p-8 (multi-step lists, generous breathing room)
   */
  padding?: PaddingSize;
}

const PADDING_CLASSES: Record<PaddingSize, string> = {
  default: 'p-6',
  large: 'p-8',
};

/**
 * Solid "read this — it's information" card.
 * Used for in-content lists: hardware specs, step instructions, host criteria,
 * what-we-provide cards, operational tips, lineage cards.
 *
 * Set interactive=true for cards that are themselves clickable or part of a
 * group that responds to hover (subtle border lift).
 */
export default function InfoCard({
  children,
  className = '',
  interactive = false,
  padding = 'default',
}: InfoCardProps) {
  const base = `bg-[var(--neutral-900)] border border-white/10 rounded-xl ${PADDING_CLASSES[padding]}`;
  const hover = interactive ? ' hover:border-white/20 transition-colors' : '';
  return <div className={`${base}${hover}${className ? ` ${className}` : ''}`}>{children}</div>;
}

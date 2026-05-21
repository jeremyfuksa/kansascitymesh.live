import { ReactNode, MouseEvent } from 'react';

interface SecondaryButtonProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

/**
 * Secondary action button — outline pill style.
 * For supporting actions that aren't the page's primary CTA.
 * Examples: "View Live Map," "Austin Mesh: Similar Networks."
 */
export default function SecondaryButton({
  children,
  href,
  external = false,
  onClick,
}: SecondaryButtonProps) {
  const className =
    'inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium';

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={className}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

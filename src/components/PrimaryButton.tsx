import { ReactNode, MouseEvent } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

/**
 * Primary action — sage-green CTA, the single most-important action on a page.
 * Examples: "Become a host," "Email about a host site," "Email us about your city."
 */
export default function PrimaryButton({
  children,
  href,
  external = false,
  onClick,
}: PrimaryButtonProps) {
  const className =
    'inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--success-500)] text-black rounded-xl font-medium text-[15px] transition-all hover:bg-[var(--success-600)] hover:text-white hover:scale-105 hover:shadow-2xl active:scale-100';

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

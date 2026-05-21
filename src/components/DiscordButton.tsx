import { ReactNode, MouseEvent } from 'react';
import { DISCORD_INVITE } from '../constants/discord';
import { trackEvent } from '../utils/analytics';

interface DiscordButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  size?: 'small' | 'default' | 'large';
  trackingLabel?: string;
}

export default function DiscordButton({
  children,
  href,
  onClick,
  size = 'default',
  trackingLabel = 'discord-invite',
}: DiscordButtonProps) {
  const sizeClasses =
    size === 'large'
      ? 'px-8 py-5 text-[17px] rounded-xl'
      : size === 'small'
        ? 'px-3 md:px-4 py-2 text-sm rounded-lg'
        : 'px-6 py-3.5 text-[15px] rounded-xl';

  // Small size uses a quieter hover (color only, no scale) since it lives in nav contexts.
  const hoverClasses =
    size === 'small'
      ? 'hover:bg-[#4752C4] transition-colors'
      : 'hover:bg-[#4752C4] hover:scale-105 hover:shadow-2xl hover:shadow-[#5865F2]/25 active:scale-100 transition-all';

  const baseClasses = `inline-flex items-center justify-center gap-2 bg-[#5865F2] text-white font-medium ${hoverClasses} ${sizeClasses}`;
  const shouldTrack = href === DISCORD_INVITE;

  const handleClick = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (shouldTrack) {
      trackEvent('discord_invite_click', trackingLabel);
    }

    onClick?.(event);
  };

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={baseClasses}>
      {children}
    </button>
  );
}

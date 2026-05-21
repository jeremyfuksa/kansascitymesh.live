import type { ImageMetadata } from 'astro';
import heltecV4 from '../assets/heltec-v4.png';
import lilygoTDeck from '../assets/lilygo-t-deck.png';
import rakMini from '../assets/rak-mini.png';
import t1000e from '../assets/t1000e.png';

export interface HardwareSpec {
  label: string;
  value: string;
}

export interface HardwareHighlight {
  title: string;
  body: string;
}

export interface HardwareItem {
  /** Stable key. */
  id: string;
  /** Display name. */
  name: string;
  /** Showcase-mode price (short). */
  price: string;
  /** Detail-mode price label (range with units). */
  detailPrice: string;
  /** Badge text for showcase-mode cards. */
  badge: string;
  /** Tailwind gradient classes for the accent stripe/badge. */
  color: string;
  /** Short, scannable description for the homepage showcase grid. */
  shortDescription: string;
  /** Longer description with specific use case, for the Get Started step-by-step. */
  detailDescription: string;
  /** Product image for the showcase grid. */
  image: ImageMetadata;
  /** Optional "where to buy" link for the detail page. */
  buyUrl?: string;
  /** Specs grid for the detail page; omitted devices fall back to a TODO note. */
  specs?: HardwareSpec[];
  /** "What we like about it" highlights for the detail page. */
  whatWeLike?: HardwareHighlight[];
  /** "Known caveats" note for the detail-page TipBanner. */
  caveats?: string;
}

/**
 * Single source of truth for the four community-favorite Meshtastic devices.
 * Imported by HardwareSection (showcase grid) and GetStartedPage (Step 1).
 */
export const hardware: HardwareItem[] = [
  {
    id: 'heltec-v3-v4',
    name: 'Heltec V4',
    price: '$40',
    detailPrice: '$35–40',
    badge: 'Beginner',
    color: 'from-[var(--primary-500)] to-[var(--primary-700)]',
    shortDescription: 'Most popular starter node. Compact and easy to set up.',
    detailDescription:
      'Most popular starter unit. Small screen, built-in LoRa antenna. Works with your phone via Bluetooth. Perfect for testing coverage while you drive around.',
    image: heltecV4,
    buyUrl: 'https://heltec.org',
    specs: [
      { label: 'LoRa chip', value: 'SX1262' },
      { label: 'Frequency', value: '915 MHz (US)' },
      { label: 'Transmit power', value: 'up to 22 dBm' },
      { label: 'Antenna', value: 'SMA, included' },
      { label: 'Battery', value: 'JST 2-pin' },
      { label: 'Display', value: '0.96" OLED' },
      { label: 'Connectivity', value: 'BLE + Wi-Fi' },
      { label: 'USB', value: 'Type-C' },
    ],
    whatWeLike: [
      {
        title: 'Cheap enough to lose',
        body: "$40 means you'll actually take it places. Drop it in a backpack, mount it on a fence, lend one to a friend without flinching.",
      },
      {
        title: 'The screen earns its keep',
        body: "Built-in OLED shows signal, battery, and recent messages without needing a phone. Useful when you're field-testing coverage.",
      },
      {
        title: 'The community runs them',
        body: 'About half of the active KC nodes are Heltecs. If you have a question, somebody in the Discord has the same hardware in front of them right now.',
      },
    ],
    caveats:
      "The Heltec's stock antenna is functional but quiet. A $15 swap to a proper 915 MHz whip will roughly double your usable range. Worth it the moment you commit to keeping the node powered up.",
  },
  {
    id: 'rak-wisblock',
    name: 'RAK Wireless',
    price: '$35',
    detailPrice: '$35–50',
    badge: 'Solar',
    color: 'from-[var(--success-600)] to-[var(--success-700)]',
    shortDescription: 'Popular for solar nodes. No screen means lower power draw.',
    detailDescription:
      'Popular for outdoor nodes. No screen means lower power draw. Great for 24/7 home nodes or solar deployments. Several KC rooftop nodes use these.',
    image: rakMini,
  },
  {
    id: 't1000e',
    name: 'T-1000 E',
    price: '$50',
    detailPrice: '$50–80',
    badge: 'Portable',
    color: 'from-[var(--warning-600)] to-[var(--warning-700)]',
    shortDescription: 'Lightweight tracker. Built-in GPS and long battery life.',
    detailDescription:
      'Lightweight trackers. Built-in GPS and long battery life. Great for throwing in a backpack or vehicle. T-Echo has e-ink screen, T1000-E is tiny.',
    image: t1000e,
  },
  {
    id: 'lilygo-t-deck',
    name: 'Lilygo T-Deck',
    price: '$90',
    detailPrice: '$90',
    badge: 'Premium',
    color: 'from-[var(--secondary-600)] to-[var(--secondary-700)]',
    shortDescription: 'Full keyboard and screen. Send messages without your phone.',
    detailDescription:
      'Full keyboard and screen. Send messages without your phone. Built-in GPS and trackball. Pricier than the others, but the only one that works fully standalone.',
    image: lilygoTDeck,
  },
];

import HardwareCard from './HardwareCard';
import DiscordButton from './DiscordButton';
import heltecV4 from '../assets/heltec-v4.png';
import lilygoTEcho from '../assets/lilygo-t-deck.png';
import rakWireless from '../assets/rak-mini.png';
import t1000e from '../assets/t1000e.png';

export default function HardwareSection() {
  const hardware = [
    {
      name: "RAK Wireless",
      price: "$35",
      badge: "Solar",
      description: "Popular for solar nodes. No screen means lower power draw.",
      color: "from-[var(--success-600)] to-[var(--success-700)]",
      image: rakWireless
    },
    {
      name: "Heltec V4",
      price: "$40",
      badge: "Beginner",
      description: "Most popular starter node. Compact and easy to set up.",
      color: "from-[var(--primary-500)] to-[var(--primary-700)]",
      image: heltecV4
    },
    {
      name: "T-1000 E",
      price: "$50",
      badge: "Portable",
      description: "Lightweight tracker. Built-in GPS and long battery life.",
      color: "from-[var(--warning-600)] to-[var(--warning-700)]",
      image: t1000e
    },
    {
      name: "Lilygo T-Deck",
      price: "$90",
      badge: "Premium",
      description: "Perfect all-in-one unit for everywhere you go.",
      color: "from-[var(--secondary-600)] to-[var(--secondary-700)]",
      image: lilygoTEcho
    }
  ];

  return (
    <section className="px-4 py-10 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl mb-4 tracking-tight text-white">
            What people are running
          </h2>
          <p className="text-xl text-white/60">
            Start with one. Most of us end up with three or four (it's weirdly fun).
          </p>
        </div>

        {/* Hardware grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {hardware.map((item, index) => (
            <HardwareCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

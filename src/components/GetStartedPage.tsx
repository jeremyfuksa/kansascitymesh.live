import { ChevronLeft, Info } from 'lucide-react';
import DiscordButton from './DiscordButton';
import Nav from './Nav';
import Footer from './Footer';
import { DISCORD_INVITE } from '../constants/discord';

interface GetStartedPageProps {
  onNavigate: (target: 'home' | 'get-started') => void;
}

export default function GetStartedPage({ onNavigate }: GetStartedPageProps) {
  return (
    <div className="min-h-screen bg-[var(--neutral-950)]">
      <Nav onNavigate={onNavigate} currentPage="get-started" />
      
      {/* Simple header */}
      <div className="px-4 py-12 mt-16 border-b border-white/10 bg-gradient-to-b from-[var(--neutral-900)] to-[var(--neutral-950)]">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to home
          </button>

          <h1 className="text-5xl md:text-6xl mb-6 tracking-tight text-white">
            Getting Started
          </h1>
          <p className="text-xl text-white/60">
            From zero to your first transmission in about 30 minutes. Here's how folks in KC get started, but this should work for anyone in the United States.
          </p>
        </div>
      </div>

      {/* Article content */}
      <article className="px-4 py-16 max-w-3xl mx-auto">
        
        {/* Step 1 */}
        <section className="mb-16">
          <h2 className="text-white mb-6">Step 1: Choose Your Hardware</h2>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            Start with one device. You can always add more later. There are a few community favorites:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
              <h3 className="text-white mb-2">Heltec V3 or V4 — $35-40</h3>
              <p className="text-white/60 leading-relaxed">
                Most popular starter unit. Small screen, built-in LoRa antenna. Works with your phone via Bluetooth. Perfect for testing coverage while you drive around.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
              <h3 className="text-white mb-2">RAK WisBlock — $35-50</h3>
              <p className="text-white/60 leading-relaxed">
                Popular for outdoor nodes. No screen means lower power draw. Great for 24/7 home nodes or solar deployments. Several KC rooftop nodes use these.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
              <h3 className="text-white mb-2">Lilygo T-Deck — $90</h3>
              <p className="text-white/60 leading-relaxed">
                Full keyboard and screen. Send messages without your phone. Built-in GPS, keyboard, trackball. Higher price but people love these for portable use.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
              <h3 className="text-white mb-2">T-Echo / T1000-E — $50-80</h3>
              <p className="text-white/60 leading-relaxed">
                Lightweight trackers. Built-in GPS and long battery life. Great for throwing in a backpack or vehicle. T-Echo has e-ink screen, T1000-E is tiny.
              </p>
            </div>
          </div>

          <div className="tip-banner flex gap-3 p-4 mb-8">
            <Info className="w-5 h-5 text-[var(--success-500)] flex-shrink-0 mt-0.5" />
            <p className="text-white/80 leading-relaxed">
              Most people start with a Heltec V3 or V4. It's affordable, has a screen, and you can test the mesh before committing to more expensive gear.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-16">
          <h2 className="text-white mb-6">Step 2: Get Your Device</h2>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            Three main options, depending on budget and timeline:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
              <h3 className="text-white mb-2">AliExpress</h3>
              <p className="text-white/60 leading-relaxed">
                Cheapest prices, but 2-3 week shipping from China. Good if you're patient and want to save $10-20.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
              <h3 className="text-white mb-2">Amazon</h3>
              <p className="text-white/60 leading-relaxed">
                Fast shipping (1-2 days), higher prices. Search "Heltec V3 LoRa" or "Meshtastic node" — watch for sellers shipping from US warehouses.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
              <h3 className="text-white mb-2">Rokland.net</h3>
              <p className="text-white/60 leading-relaxed">
                US-based, supports the Meshtastic community, good customer service. Slightly higher than AliExpress, but they test before shipping and provide support.
              </p>
            </div>
          </div>

        </section>

        {/* Step 3 */}
        <section className="mb-16">
          <h2 className="text-white mb-6">Step 3: Flash the Firmware</h2>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            This is easier than it sounds. Takes about 5 minutes:
          </p>

          <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-8 mb-8">
            <ol className="space-y-6">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary-700)] text-white flex items-center justify-center">1</span>
                <div>
                  <p className="text-white mb-1">Go to <a href="https://flasher.meshtastic.org" target="_blank" rel="noopener noreferrer" className="text-[var(--info-400)] hover:text-[var(--info-300)] underline">flasher.meshtastic.org</a></p>
                  <p className="text-white/50"><strong>Works in Chrome or Edge</strong>. No downloads needed.</p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary-700)] text-white flex items-center justify-center">2</span>
                <div>
                  <p className="text-white mb-1">Connect your device with a USB-C cable</p>
                  <p className="text-white/50">The web flasher will detect it automatically.</p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary-700)] text-white flex items-center justify-center">3</span>
                <div>
                  <p className="text-white mb-1">Select your device model and click "Flash"</p>
                  <p className="text-white/50">Takes 2-3 minutes. The device will reboot when done.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-16">
          <h2 className="text-white mb-6">Step 4: Configure Your Node</h2>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            Download the Meshtastic app for <a href="https://apps.apple.com/us/app/meshtastic/id1586432531" target="_blank" rel="noopener noreferrer" className="text-[var(--info-400)] hover:text-[var(--info-300)] underline">iOS</a>, <a href="https://play.google.com/store/apps/details?id=com.geeksville.mesh" target="_blank" rel="noopener noreferrer" className="text-[var(--info-400)] hover:text-[var(--info-300)] underline">Android</a>, or use the <a href="https://client.meshtastic.org" target="_blank" rel="noopener noreferrer" className="text-[var(--info-400)] hover:text-[var(--info-300)] underline">web client</a>. Connect via Bluetooth and configure these settings:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-2">Set your node name</h3>
              <p className="text-white/60 leading-relaxed">
                Something recognizable. A clever or descriptive name is better than 'Meshtastic abcd'.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-2">Region: United States</h3>
              <p className="text-white/60 leading-relaxed">
                This sets your LoRa frequency to 915 MHz.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-2">Set position (if GPS-enabled device)</h3>
              <p className="text-white/60 leading-relaxed">
                Helps build the coverage map. Your exact location isn't shared publicly, just general area.
              </p>
            </div>
          </div>

          <div className="tip-banner flex gap-3 p-4">
            <Info className="w-5 h-5 text-[var(--success-500)] flex-shrink-0 mt-0.5" />
            <p className="text-white/80 leading-relaxed">
              Leave the default "Long Fast" channel preset. Until we hit a critial mass and have to change presets, that's what KC nodes use.
            </p>
          </div>
        </section>

        {/* Step 5 */}
        <section className="mb-16">
          <h2 className="text-white mb-6">Step 5: Say Hello</h2>
          
          <div className="message-banner mb-8">
            <p className="text-white/70 mb-6 leading-relaxed">
              Open the Meshtastic app, go to Messages, and send a hello message to the Primary channel. You'll probably get responses from folks around KC within a few minutes (depending on time of day and your coverage).
            </p>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              You'll definitely get an automated welcome from the KCML node when it discovers your node for the first time.
            </p>

            <p className="text-white/60 mb-6 leading-relaxed">
              Don't see any nodes? Check the <a href="https://map.kansascitymesh.live" target="_blank" rel="noopener noreferrer" className="text-[var(--info-400)] hover:text-[var(--info-300)] underline">coverage map</a> to see if you're in range. The network is growing but still has gaps.
            </p>

            <p className="text-white/70 leading-relaxed">
              That's it. You're on the mesh.
            </p>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-16 pt-8 border-t border-white/10">
          <h2 className="text-white mb-6">Next Steps</h2>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            If you want to optimize your antenna, add more nodes, or troubleshoot anything, the Discord is full of people who've done this already.
          </p>

      <DiscordButton href={DISCORD_INVITE} trackingLabel="get-started-discord">
        Join the Discord
      </DiscordButton>
        </section>

      </article>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

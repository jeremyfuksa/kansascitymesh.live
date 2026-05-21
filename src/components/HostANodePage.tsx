import { ChevronLeft, Info, MapPin, Radio, Building2, Signal, Church, Megaphone, Home } from 'lucide-react';
import DiscordButton from './DiscordButton';
import Nav from './Nav';
import Footer from './Footer';
import PulsingDot from './PulsingDot';
import { DISCORD_INVITE } from '../constants/discord';
import { trackEvent } from '../utils/analytics';

interface HostANodePageProps {
  onNavigate: (target: 'home' | 'get-started' | 'host') => void;
}

const HOST_EMAIL = 'hello@orangefla.me';

const hostTypes = [
  {
    name: 'Businesses with rooftops',
    description: "Warehouses, retail strip centers, offices. If you have a flat roof and a 120V outlet on it, you have what we need. We're especially looking on the West side of the metro.",
    icon: <Building2 className="w-6 h-6 text-white" />,
    color: 'from-[var(--primary-600)] to-[var(--primary-800)]',
  },
  {
    name: 'Ham operators & repeater owners',
    description: "You already have what we need — elevation, line of sight, and the inclination to mess with radios. A Meshtastic router at your repeater site is a $60 add to infrastructure you've already built.",
    icon: <Signal className="w-6 h-6 text-white" />,
    color: 'from-[var(--success-600)] to-[var(--success-700)]',
  },
  {
    name: 'Churches, schools, civic buildings',
    description: "Steeples, water tanks, rooftop HVAC platforms — anywhere with elevation and a friendly facilities person. A great emergency-comms talking point for your community.",
    icon: <Church className="w-6 h-6 text-white" />,
    color: 'from-[var(--secondary-600)] to-[var(--secondary-700)]',
  },
  {
    name: 'Billboard, water tower, cell tower owners',
    description: "Cascadia's first big host was a billboard owner outside Mayfield, WA. The model works. If you own structures along I-29, I-35, I-70, or I-435, please get in touch.",
    icon: <Megaphone className="w-6 h-6 text-white" />,
    color: 'from-[var(--warning-600)] to-[var(--warning-700)]',
  },
  {
    name: 'Building managers & flagpole homeowners',
    description: "Apartment buildings, condos, HOA-restricted neighborhoods with a flagpole or attic. Stealth deployments are absolutely a thing. 15 feet of elevation is genuinely useful.",
    icon: <Home className="w-6 h-6 text-white" />,
    color: 'from-[var(--info-600)] to-[var(--info-700)]',
  },
];

export default function HostANodePage({ onNavigate }: HostANodePageProps) {
  return (
    <div className="min-h-screen bg-[var(--neutral-950)]">
      <Nav onNavigate={onNavigate} currentPage="host" />

      {/* Hero */}
      <div
        className="px-4 py-20 mt-16 border-b border-white/10 relative overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(180deg, var(--primary-800) 0%, var(--neutral-950) 90%, #000 100%)',
        }}
      >
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: 'var(--success-500)', opacity: 0.25 }}
          ></div>
          <div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: 'var(--secondary-600)', opacity: 0.25 }}
          ></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to home
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <PulsingDot />
            <span className="text-sm text-white/80 font-medium">KC Backbone Initiative</span>
          </div>

          <h1 className="text-5xl md:text-6xl mb-6 tracking-tight text-white">
            Got a rooftop, a tower, or a high spot?{' '}
            <span className="bg-gradient-to-r from-[var(--success-500)] to-[var(--info-600)] bg-clip-text text-transparent">
              We need you.
            </span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Hosted infrastructure is the single biggest thing standing between KC Mesh today and KC Mesh covering the whole metro. If you have elevation and a willing outlet, we'd love to talk.
          </p>
        </div>
      </div>

      {/* Article */}
      <article className="px-4 py-16 max-w-3xl mx-auto">

        {/* Why this matters */}
        <section className="mb-16">
          <h2 className="text-white mb-6">Why hosted infrastructure matters</h2>

          <p className="text-white/70 mb-6 leading-relaxed">
            KC Mesh has 60+ active nodes today. Most of them are client nodes — handhelds, indoor home setups, T-Decks in backpacks. They're great for local conversations, but client-only density doesn't carry a message from Liberty to Olathe.
          </p>

          <p className="text-white/70 mb-6 leading-relaxed">
            What does carry that message is a small number of router nodes mounted high, with clear sky, running 24/7. The plan is four of them: East, West, North, and South. Together they form what we're calling the <strong>KC Backbone Initiative</strong> — the spine that turns a bunch of friendly hobbyist nodes into a metro-wide network.
          </p>

          <div className="tip-banner flex gap-3 p-4">
            <Info className="w-5 h-5 text-[var(--success-500)] flex-shrink-0 mt-0.5" />
            <p className="text-white/80 leading-relaxed">
              <strong>The West side is the current critical gap.</strong> If you own or manage a building, billboard, tower, or rooftop anywhere from Lenexa west to the state line, you might be exactly the host we've been looking for.
            </p>
          </div>
        </section>

        {/* What makes a great host site */}
        <section className="mb-16">
          <h2 className="text-white mb-6">What makes a great host site</h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            Honest list. If your site checks most of these, please get in touch — we can work around the rest.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--success-500)]" />
                Elevation — 15 feet and up
              </h3>
              <p className="text-white/60 leading-relaxed">
                You don't need a 40-foot tower. A two-story roof works. A flagpole works. An attic with a clear southern exposure can work. The dogma about needing massive elevation is just dogma — get above the immediate clutter and you're already useful.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-2 flex items-center gap-2">
                <Radio className="w-5 h-5 text-[var(--success-500)]" />
                Sky that's not blocked by another building
              </h3>
              <p className="text-white/60 leading-relaxed">
                LoRa at 915 MHz mostly cares about line of sight. If you can see other rooftops and the horizon in at least one direction, signals will travel. We'll help you pick the antenna and aim.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-2 flex items-center gap-2">
                <span className="w-5 h-5 text-[var(--success-500)] flex items-center justify-center">⚡</span>
                A 120V outlet — or room for a small solar panel
              </h3>
              <p className="text-white/60 leading-relaxed">
                A wired node draws less power than a wifi router. Don't have an outlet on the roof? A 10W solar panel and a small battery run a node indefinitely. We've got documented setups for both.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-2 flex items-center gap-2">
                <span className="w-5 h-5 text-[var(--success-500)] flex items-center justify-center">🔧</span>
                Willingness to host modest hardware
              </h3>
              <p className="text-white/60 leading-relaxed">
                We're talking about a $60–$200 device the size of a paperback, plus a small antenna. Not commercial telecom gear. Weekend-project scale. If something breaks, the worst case is somebody comes out and swaps the box.
              </p>
            </div>
          </div>
        </section>

        {/* Who should consider hosting */}
        <section className="mb-16">
          <h2 className="text-white mb-6">Who should consider hosting</h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            If you see yourself in any of these, you're exactly who we're trying to reach.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {hostTypes.map((host, index) => (
              <div
                key={index}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${host.color}`}>
                  {host.icon}
                </div>
                <h3 className="text-lg text-white mb-2">{host.name}</h3>
                <p className="text-white/60 text-[15px] leading-relaxed">{host.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What KC Mesh provides */}
        <section className="mb-16">
          <h2 className="text-white mb-6">What KC Mesh provides in return</h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            This is a hobbyist project, not a vendor relationship. But here's what we bring to the table:
          </p>

          <div className="space-y-4">
            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-2">Equipment guidance — and sometimes the equipment itself</h3>
              <p className="text-white/60 leading-relaxed">
                We'll pick hardware that fits your site, your power situation, and your budget. For priority backbone locations, we can usually find someone in the community willing to donate or split the cost of the device.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-2">Hands-on deployment help</h3>
              <p className="text-white/60 leading-relaxed">
                Someone from the community will come out, mount the antenna, configure the node, and confirm it's healthy on the mesh. You don't need to learn LoRa to host one.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-2">Ongoing monitoring via Discord</h3>
              <p className="text-white/60 leading-relaxed">
                If your node falls off the mesh, somebody in the Discord will notice — usually within an hour. We'll let you know and help you bring it back up.
              </p>
            </div>

            <div className="bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-2">Public credit on the coverage map</h3>
              <p className="text-white/60 leading-relaxed">
                Your site shows up on <a href="https://map.kansascitymesh.live" target="_blank" rel="noopener noreferrer" className="text-[var(--success-500)] hover:underline">map.kansascitymesh.live</a> as a contributing backbone node. If you're a business, we'll happily call you out by name; if you'd rather be anonymous, we don't have to.
              </p>
            </div>
          </div>
        </section>

        {/* First success story */}
        <section className="mb-16">
          <h2 className="text-white mb-6">What this looks like in practice</h2>

          <div className="message-banner">
            <p className="text-white/70 mb-4 leading-relaxed">
              Right now the proof-of-concept is my own router. It's a Heltec V3 in a weatherproof box, mounted about 25 feet up, drawing power from a regular outdoor outlet. Total hardware cost was under $100. Total install time was an afternoon.
            </p>

            <p className="text-white/70 mb-4 leading-relaxed">
              It's been online for months. It hands off traffic between client nodes that can't hear each other directly. It made the difference between "a few people messing around" and "a network."
            </p>

            <p className="text-white/70 leading-relaxed">
              We need three more. East, West, North, South. That's the whole ask.
            </p>
          </div>
        </section>

        {/* Get in touch */}
        <section className="mb-16 pt-8 border-t border-white/10">
          <h2 className="text-white mb-6">Get in touch</h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            If you've got a site that sounds like it might fit — or you just want to talk it through to find out — please reach out. The fastest path is email, but Discord works too.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href={`mailto:${HOST_EMAIL}?subject=KC%20Backbone%20Initiative%20%E2%80%94%20potential%20host%20site`}
              onClick={() => trackEvent('host_email_click', 'host-page-cta')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--success-500)] text-black rounded-xl font-medium text-[15px] transition-all hover:bg-[var(--success-600)] hover:text-white hover:scale-105 hover:shadow-2xl active:scale-100"
            >
              Email about a host site
            </a>

            <DiscordButton href={DISCORD_INVITE} trackingLabel="host-page-discord">
              Or come say hi in Discord
            </DiscordButton>
          </div>

          <p className="text-white/50 text-sm leading-relaxed">
            Not sure yet? No problem. The Discord is open — lurk for a while, see what people are doing, and circle back whenever it makes sense.
          </p>
        </section>

      </article>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

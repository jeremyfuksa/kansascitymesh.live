import {
  ChevronLeft,
  MapPin,
  Radio,
  Building2,
  Signal,
  Church,
  Megaphone,
  Home,
  Zap,
  Wrench,
} from 'lucide-react';
import DiscordButton from './DiscordButton';
import Nav from './Nav';
import Footer from './Footer';
import PulsingDot from './PulsingDot';
import InfoCard from './InfoCard';
import AudienceRow from './AudienceRow';
import TipBanner from './TipBanner';
import MessageBanner from './MessageBanner';
import PrimaryButton from './PrimaryButton';
import { DISCORD_INVITE } from '../constants/discord';
import { CONTACT_EMAIL } from '../constants/contact';
import { trackEvent } from '../utils/analytics';

interface HostANodePageProps {
  onNavigate: (target: 'home' | 'get-started' | 'host' | 'steal') => void;
}

const hostTypes = [
  {
    name: 'Businesses with rooftops',
    description:
      "Warehouses, retail strip centers, offices. If you have a flat roof and a 120V outlet on it, you have what we need. We're especially looking in Bonner Springs, Independence, and Blue Springs — plus any spot along I-70 (east or west) where a hop helps connect existing outlier nodes in Manhattan and Columbia back to the KC mesh.",
    icon: <Building2 className="w-5 h-5 text-white" />,
    accent: 'from-[var(--primary-600)] to-[var(--primary-800)]',
  },
  {
    name: 'Ham operators & repeater owners',
    description:
      "You already have what we need — elevation, line of sight, and the inclination to mess with radios. A Meshtastic router at your repeater site is a $60 add to infrastructure you've already built.",
    icon: <Signal className="w-5 h-5 text-white" />,
    accent: 'from-[var(--success-600)] to-[var(--success-700)]',
  },
  {
    name: 'Churches, schools, civic buildings',
    description:
      "Steeples, water tanks, rooftop HVAC platforms — anywhere with elevation and a friendly facilities person. Emergency comms is the right talking point if you're pitching this to a board.",
    icon: <Church className="w-5 h-5 text-white" />,
    accent: 'from-[var(--secondary-600)] to-[var(--secondary-700)]',
  },
  {
    name: 'Billboard, water tower, cell tower owners',
    description:
      "Cascadia's first big host was a billboard owner outside Mayfield, WA. The model works. If you own structures along I-29, I-35, I-70, or I-435, please get in touch.",
    icon: <Megaphone className="w-5 h-5 text-white" />,
    accent: 'from-[var(--warning-600)] to-[var(--warning-700)]',
  },
  {
    name: 'Building managers & flagpole homeowners',
    description:
      "Apartment buildings, condos, HOA-restricted neighborhoods with a flagpole or attic. Stealth deployments work. 15 feet of elevation is enough to be useful.",
    icon: <Home className="w-5 h-5 text-white" />,
    accent: 'from-[var(--info-600)] to-[var(--info-700)]',
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
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to home
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <PulsingDot />
            <span className="text-sm text-white font-medium">KC Backbone Initiative</span>
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
            KC Mesh has 60+ active nodes today, with a strong spine running up and down the I-35 corridor — messages move cleanly between downtown, Westport, Overland Park, and the southern suburbs.
          </p>

          <p className="text-white/70 mb-6 leading-relaxed">
            What we don't yet have is a mesh that reaches the metro's east and west edges, much less the cities just outside it. Most of our 60+ nodes are client nodes — handhelds, indoor home setups, T-Decks in backpacks — and client-only density doesn't carry a message from Westport to Blue Springs.
          </p>

          <p className="text-white/70 mb-6 leading-relaxed">
            The fix is a small number of router nodes mounted high, with clear sky, running 24/7. We're calling the rollout the <strong>KC Backbone Initiative</strong>, and it has two parallel asks:
          </p>

          <TipBanner>
            <div className="space-y-4">
              <p>
                <strong>1. Round out the metro.</strong> Bonner Springs on the west side. Independence and Blue Springs to the east. These are the gaps where messages from downtown die before they reach you.
              </p>
              <p>
                <strong>2. Close the chain to the outliers.</strong> There are already nodes on the map as far out as Manhattan, KS and Columbia, MO — but they can't reliably reach the KC mesh because the hop chain between them and downtown doesn't exist yet. Lawrence, Topeka, Lee's Summit, Warrensburg — every host along I-70 in either direction is a link that makes those far-out nodes part of the network.
              </p>
            </div>
          </TipBanner>
        </section>

        {/* What makes a great host site */}
        <section className="mb-16">
          <h2 className="text-white mb-6">What makes a great host site</h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            If your site checks most of these, please get in touch. We can work around the rest.
          </p>

          <div className="space-y-4 mb-8">
            <InfoCard>
              <h3 className="text-white mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--success-500)]" />
                Elevation — 15 feet and up
              </h3>
              <p className="text-white/70 leading-relaxed">
                You don't need a 40-foot tower. A two-story roof works. A flagpole works. An attic with a clear southern exposure can work. The dogma about needing massive elevation is just dogma — get above the immediate clutter and you're already useful.
              </p>
            </InfoCard>

            <InfoCard>
              <h3 className="text-white mb-2 flex items-center gap-2">
                <Radio className="w-5 h-5 text-[var(--success-500)]" />
                Sky that's not blocked by another building
              </h3>
              <p className="text-white/70 leading-relaxed">
                LoRa at 915 MHz mostly cares about line of sight. If you can see other rooftops and the horizon in at least one direction, signals will travel. We'll help you pick the antenna and aim.
              </p>
            </InfoCard>

            <InfoCard>
              <h3 className="text-white mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[var(--success-500)]" />
                A 120V outlet — or room for a small solar panel
              </h3>
              <p className="text-white/70 leading-relaxed">
                A wired node draws less power than a wifi router. Don't have an outlet on the roof? A 10W solar panel and a small battery run a node indefinitely. We've got documented setups for both.
              </p>
            </InfoCard>

            <InfoCard>
              <h3 className="text-white mb-2 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[var(--success-500)]" />
                Willingness to host modest hardware
              </h3>
              <p className="text-white/70 leading-relaxed">
                We're talking about a $60–$200 device the size of a paperback, plus a small antenna. Not commercial telecom gear. Weekend-project scale. If something breaks, the worst case is somebody comes out and swaps the box.
              </p>
            </InfoCard>
          </div>
        </section>

        {/* Who should consider hosting */}
        <section className="mb-16">
          <h2 className="text-white mb-6">Who should consider hosting</h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            If you see yourself in any of these, you're exactly who we're trying to reach.
          </p>

          <div className="space-y-3 mb-8">
            {hostTypes.map((host) => (
              <AudienceRow
                key={host.name}
                icon={host.icon}
                accent={host.accent}
                name={host.name}
                description={host.description}
              />
            ))}
          </div>
        </section>

        {/* What KC Mesh provides */}
        <section className="mb-16">
          <h2 className="text-white mb-6">What KC Mesh provides in return</h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            Hosting a node is a favor. Here's what we do in return.
          </p>

          <div className="space-y-4">
            <InfoCard>
              <h3 className="text-white mb-2">Equipment guidance — and sometimes the equipment itself</h3>
              <p className="text-white/70 leading-relaxed">
                We'll pick hardware that fits your site, your power situation, and your budget. For priority backbone locations, we can usually find someone in the community willing to donate or split the cost of the device.
              </p>
            </InfoCard>

            <InfoCard>
              <h3 className="text-white mb-2">Hands-on deployment help</h3>
              <p className="text-white/70 leading-relaxed">
                Someone from the community will come out, mount the antenna, configure the node, and confirm it's healthy on the mesh. You don't need to learn LoRa to host one.
              </p>
            </InfoCard>

            <InfoCard>
              <h3 className="text-white mb-2">Ongoing monitoring via Discord</h3>
              <p className="text-white/70 leading-relaxed">
                If your node falls off the mesh, somebody in the Discord will notice — usually within an hour. We'll let you know and help you bring it back up.
              </p>
            </InfoCard>

            <InfoCard>
              <h3 className="text-white mb-2">Public credit on the coverage map</h3>
              <p className="text-white/70 leading-relaxed">
                Your site shows up on{' '}
                <a
                  href="https://map.kansascitymesh.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--success-500)] hover:underline"
                >
                  map.kansascitymesh.live
                </a>
                {' '}as a contributing backbone node. If you're a business, we'll happily call you out by name; if you'd rather be anonymous, we don't have to.
              </p>
            </InfoCard>
          </div>
        </section>

        {/* First success story */}
        <section className="mb-16">
          <h2 className="text-white mb-6">What this looks like in practice</h2>

          <MessageBanner>
            <p className="text-white/70 mb-4 leading-relaxed">
              The proof of concept is already up. One of our first router nodes is a Heltec V3 in a weatherproof box, mounted about 25 feet up, drawing power from a regular outdoor outlet. Total hardware cost was under $100. Total install time was an afternoon.
            </p>

            <p className="text-white/70 mb-4 leading-relaxed">
              It's been online for months. It hands off traffic between client nodes that can't hear each other directly. It made the difference between "a few people messing around" and "a network."
            </p>

            <p className="text-white/70 leading-relaxed">
              We need more like it — out at the edges, and along I-70 in both directions to close the chain to the existing outliers. That's the whole ask.
            </p>
          </MessageBanner>
        </section>

        {/* Get in touch */}
        <section className="mb-16 pt-8 border-t border-white/10">
          <h2 className="text-white mb-6">Get in touch</h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            If you've got a site that sounds like it might fit — or you just want to talk it through to find out — please reach out. The fastest path is email, but Discord works too.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <PrimaryButton
              href={`mailto:${CONTACT_EMAIL}?subject=KC%20Backbone%20Initiative%20%E2%80%94%20potential%20host%20site`}
              onClick={() => trackEvent('host_email_click', 'host-page-cta')}
            >
              Email about a host site
            </PrimaryButton>

            <DiscordButton href={DISCORD_INVITE} trackingLabel="host-page-discord">
              Or come say hi in Discord
            </DiscordButton>
          </div>

          <p className="text-white/50 text-sm leading-relaxed">
            Not sure yet? The Discord is open — lurk for a while, see what people are doing, and circle back whenever it makes sense.
          </p>
        </section>

      </article>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

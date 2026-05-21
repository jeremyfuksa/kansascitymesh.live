import { ChevronLeft, ExternalLink, Heart } from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import DiscordButton from './DiscordButton';
import InfoCard from './InfoCard';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { DISCORD_INVITE } from '../constants/discord';
import { CONTACT_EMAIL } from '../constants/contact';
import { trackEvent } from '../utils/analytics';

interface StealThisNetworkPageProps {
  onNavigate: (target: 'home' | 'get-started' | 'host' | 'steal') => void;
}

const lineage = [
  {
    name: 'austinmesh.org',
    href: 'https://www.austinmesh.org',
    note: "Where this whole posture comes from. Austin Mesh runs their site under a CC-BY-SA share-alike license — they explicitly want other cities to copy it. The welcoming tone, the prosumer framing, the quarterly meetings, the running list of partner meshes across the country: all theirs first. If you can only read one other mesh site, read theirs.",
  },
  {
    name: 'cascadiamesh.org',
    href: 'https://cascadiamesh.org',
    note: "The current refresh of this site is built on what Cascadia is doing — the Backbone Initiative framing, the host-a-node ask, the 'a billboard owner outside Mayfield' kind of storytelling. A lot of the language on the Host a Node page is a direct descendant of theirs.",
  },
];

const operationalTips = [
  {
    title: 'Have regular meetings',
    body: "Quarterly works. Sometimes 30 people show up, sometimes it's three of you at a bar. The point is that anyone who misses one knows there's another coming. Cadence beats turnout.",
  },
  {
    title: 'Start a Discord (or Slack, or Telegram) and an email list',
    body: "The Discord carries the day-to-day. The email list catches people who don't want to live in Discord — which is a lot of older operators, and they're the ones with the towers.",
  },
  {
    title: 'Talk to your local ham radio clubs',
    body: "They know radio. They have access to towers and rooftops. They are often delighted to be asked about anything that isn't 2-meter repeater drama. Go to a meeting. Bring a node.",
  },
  {
    title: 'Talk to local mutual aid and disaster relief groups',
    body: "Red Cross, ARES, neighborhood preparedness groups, community emergency response teams. They have buildings. They care about resilient comms. The emergency-comms framing opens doors that the hobby framing alone won't.",
  },
  {
    title: 'Brag in public when something works',
    body: "Solar node up? Post it. New router on a billboard? Post it. Somewhere two suburbs over, someone has a node sitting on their desk — they didn't see traffic, so they stopped checking. Your post is what gets them to turn it back on.",
  },
  {
    title: 'Fly a node, once a week, if you can',
    body: "Anyone in the community with a drone coordinates a weekly time, lifts a node to altitude for a few minutes, and a separate node on the ground (set to client_mute so it doesn't clog routing) blasts a few messages inviting people to the Discord. Most of the people you reach this way are folks who bought a node, didn't see traffic, and left it on a shelf. They may not see your message right then — but they'll see it in the coming days or weeks. In larger meshes (200+ online nodes) the airborne node can be configured as ROUTER. (Borrowed straight from Austin Mesh — they wrote it first.)",
  },
];

export default function StealThisNetworkPage({ onNavigate }: StealThisNetworkPageProps) {
  return (
    <div className="min-h-screen bg-[var(--neutral-950)]">
      <Nav onNavigate={onNavigate} currentPage="home" />

      {/* Header */}
      <div className="px-4 py-12 mt-16 border-b border-white/10 bg-gradient-to-b from-[var(--neutral-900)] to-[var(--neutral-950)]">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to home
          </button>

          <h1 className="text-5xl md:text-6xl mb-6 tracking-tight text-white">
            Steal this{' '}
            <span className="bg-gradient-to-r from-[var(--success-500)] to-[var(--info-600)] bg-clip-text text-transparent">
              network.
            </span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            If you're building a community mesh in another city — take whatever you can use from this site. Words, ideas, structure, code. That's how we got here, and that's how the next one happens.
          </p>
        </div>
      </div>

      {/* Article */}
      <article className="px-4 py-16 max-w-3xl mx-auto">

        <section className="mb-12">
          <p className="text-white/70 mb-6 leading-relaxed">
            Community mesh networks aren't a product. They're a posture — a small, friendly, anti-perfectionist bet that a handful of people with $60 radios can build something useful for the place they live. KC Mesh exists because Austin Mesh existed first, and the version of this site you're reading exists because Cascadia Mesh figured out a clearer way to talk about hosted infrastructure.
          </p>

          <p className="text-white/70 mb-6 leading-relaxed">
            None of that is proprietary. It shouldn't be. If you're trying to seed a mesh in your own city and any of this saves you a weekend, please take it. The site content here is offered under the same{' '}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--success-500)] hover:underline"
            >
              CC-BY-SA 4.0
            </a>
            {' '}license Austin Mesh uses — keep it open, share the next version forward.
          </p>
        </section>

        {/* What you can use */}
        <section className="mb-16">
          <h2 className="text-white mb-6">What you can use</h2>

          <div className="space-y-4">
            <InfoCard>
              <h3 className="text-white mb-2">The words</h3>
              <p className="text-white/70 leading-relaxed">
                Copy any sentence on this site. Rewrite it for your city, your terrain, your community's quirks. The anti-dogma framing — "15 feet is fine," "indoor sometimes works," "deployed imperfect beats theoretical perfect" — was hard-won over a lot of arguments online. You don't have to relitigate it.
              </p>
            </InfoCard>

            <InfoCard>
              <h3 className="text-white mb-2">The structure</h3>
              <p className="text-white/70 leading-relaxed">
                A homepage, a Get Started, a Host a Node, a Discord, a coverage map. That's the whole thing. You don't need a forum, a wiki, a Substack, or a 501(c)(3). Keep it small. Keep it scannable. Let the Discord carry the real-time stuff.
              </p>
            </InfoCard>

            <InfoCard>
              <h3 className="text-white mb-2">The host-a-node ask</h3>
              <p className="text-white/70 leading-relaxed">
                The framing on our <button onClick={() => onNavigate('host')} className="text-[var(--success-500)] hover:underline">Host a Node</button> page — businesses with rooftops, ham operators with repeater sites, billboard owners along interstates — works in any metro. Swap the highways and city names. The pitch is the same: "you already have what we need."
              </p>
            </InfoCard>

            <InfoCard>
              <h3 className="text-white mb-2">The code</h3>
              <p className="text-white/70 leading-relaxed">
                This site is a small React + Vite app, public on{' '}
                <a
                  href="https://github.com/jeremyfuksa/kansascitymesh.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--success-500)] hover:underline"
                  onClick={() => trackEvent('steal_github_click', 'steal-page-code-card')}
                >
                  GitHub
                </a>
                {' '}under CC-BY-SA 4.0. Fork it, gut it, swap out the city name and the highway list, and you've got a working starting point. There's nothing in there worth gatekeeping.
              </p>
            </InfoCard>
          </div>
        </section>

        {/* Lineage */}
        <section className="mb-16">
          <h2 className="text-white mb-6">Who we stole from</h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            Credit where it's due. This site is a link in a chain.
          </p>

          <div className="space-y-4">
            {lineage.map((entry) => (
              <InfoCard key={entry.name}>
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white mb-2 hover:text-[var(--success-500)] transition-colors"
                  onClick={() => trackEvent('steal_lineage_click', entry.name)}
                >
                  <span className="font-medium">{entry.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-white/70 leading-relaxed">{entry.note}</p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Find your nearest mesh */}
        <section className="mb-16">
          <h2 className="text-white mb-6">Before you start one — find your nearest mesh</h2>

          <p className="text-white/70 mb-6 leading-relaxed">
            Two cities don't need two meshes. If there's already a community within an hour's drive, join theirs first — show up to a meeting, learn how they operate, and build a chapter or a partner mesh instead of a competitor.
          </p>

          <p className="text-white/70 mb-6 leading-relaxed">
            Austin Mesh maintains the running list of partner meshes in the US (Bay Area, SoCal, Chicago, Colorado, Nashville, Birmingham, Asheville, Charlotte, North Texas, South Texas, Hawaii, Ohio, Wisconsin, Northwest Arkansas, OkMesh, Philadelphia, and more). Start there.
          </p>

          <SecondaryButton
            href="https://www.austinmesh.org/similar-networks/"
            external
            onClick={() => trackEvent('steal_partner_list_click', 'austinmesh-similar-networks')}
          >
            <span>Austin Mesh: Similar Networks</span>
            <ExternalLink className="w-4 h-4" />
          </SecondaryButton>
        </section>

        {/* Growing the community */}
        <section className="mb-16">
          <h2 className="text-white mb-6">Beyond the website: actually growing a community</h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            The site is the easy part. Growing the community is harder, and Austin Mesh has already said most of what's worth saying. The condensed version:
          </p>

          <div className="space-y-4">
            {operationalTips.map((tip) => (
              <InfoCard key={tip.title}>
                <h3 className="text-white mb-2">{tip.title}</h3>
                <p className="text-white/70 leading-relaxed">{tip.body}</p>
              </InfoCard>
            ))}
          </div>

          <p className="text-white/50 text-sm leading-relaxed mt-6">
            Almost all of this is borrowed, in spirit, from{' '}
            <a
              href="https://www.austinmesh.org/similar-networks/#start-a-similar-network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--success-500)] hover:underline"
            >
              Austin Mesh's "How to start a similar network" guide
            </a>
            . If anything here is useful, go read theirs in full — it's longer, more specific, and more battle-tested.
          </p>
        </section>

        {/* A few honest tips */}
        <section className="mb-16">
          <h2 className="text-white mb-6">If you're just starting</h2>

          <div className="space-y-6 text-white/70 leading-relaxed">
            <p>
              <strong className="text-white">Deploy one router before you build the website.</strong> A real node on a real roof gives you something to point at. Without it, the site is just a manifesto.
            </p>

            <p>
              <strong className="text-white">Start the Discord on day one.</strong> Even if it's empty. The network is the people, and the people need a place to be. Mesh-on-radio is for messages; Discord is for figuring out what to build next.
            </p>

            <p>
              <strong className="text-white">Resist the urge to centralize.</strong> No bylaws. No officers. No membership tiers. The minute it starts feeling like a club is the minute the most interesting people stop showing up.
            </p>

            <p>
              <strong className="text-white">Tell the truth about what doesn't work.</strong> Every mesh has dead zones, dropped messages, and nodes that quietly fall off the network for weeks. Honesty about that earns more trust than another glossy coverage claim.
            </p>
          </div>
        </section>

        {/* Get in touch */}
        <section className="mb-8 pt-8 border-t border-white/10">
          <h2 className="text-white mb-6 flex items-center gap-2">
            Say hi
            <Heart className="w-5 h-5 text-[var(--primary-600)]" />
          </h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            If anything on this site inspired you, drop us a line. No agenda — just curious where the next one is going to be, and happy to share whatever's been useful here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <PrimaryButton
              href={`mailto:${CONTACT_EMAIL}?subject=Mesh%20in%20%5Byour%20city%5D`}
              onClick={() => trackEvent('steal_email_click', 'steal-page-cta')}
            >
              Email us about your city
            </PrimaryButton>

            <DiscordButton href={DISCORD_INVITE} trackingLabel="steal-page-discord">
              Or come hang out in our Discord
            </DiscordButton>
          </div>
        </section>

      </article>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

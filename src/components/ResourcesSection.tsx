import { ExternalLink, Book, Users, Map } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { trackEvent } from '../utils/analytics';

const resources = [
  {
    title: 'Meshtastic Official Site',
    description: 'The source of all truth. Docs, downloads, and official blog.',
    href: 'https://meshtastic.org',
    icon: <Book className="w-6 h-6 text-white" />,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Meshtastic Subreddit',
    description: 'Bigger and rougher than the Discord. Worth a scroll when you want a question answered by 50 people instead of 5.',
    href: 'https://www.reddit.com/r/meshtastic/',
    icon: <Users className="w-6 h-6 text-white" />,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Meshtastic Site Planner',
    description: 'Drop a pin, set an antenna height, get a propagation map. The right tool for "would a node here actually reach downtown?"',
    href: 'https://site.meshtastic.org',
    icon: <Map className="w-6 h-6 text-white" />,
    color: 'from-green-500 to-emerald-500',
  },
];

export default function ResourcesSection() {
  return (
    <section className="px-4 py-10 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl mb-4 tracking-tight text-white">
            When you need something deeper than Discord
          </h2>
          <p className="text-xl text-white/70">
            Three places we send people often.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <FeatureCard
              key={index}
              href={resource.href}
              external
              interactive
              onClick={() => trackEvent('resource_click', resource.href)}
              className="group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${resource.color}`}
                >
                  {resource.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{resource.title}</h3>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed text-[15px] mb-4">
                {resource.description}
              </p>
              <div className="flex items-center text-sm text-white/50 group-hover:text-white transition-colors">
                <span>Visit site</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

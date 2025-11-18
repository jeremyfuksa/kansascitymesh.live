import { ExternalLink, Book, Users, Map } from 'lucide-react';

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
    description: 'The community hub for all things Meshtastic. Ask questions, share projects, and connect with other users.',
    href: 'https://www.reddit.com/r/meshtastic/',
    icon: <Users className="w-6 h-6 text-white" />,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Meshtastic Site Planner',
    description: 'A tool for planning your mesh network. See how your nodes will connect and predict coverage.',
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
            Resources & Links
          </h2>
          <p className="text-xl text-white/60">
            A few essential links to get you started and keep you going.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/50 hover:scale-105 transition-transform duration-300 ease-in-out group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${resource.color}`}>
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

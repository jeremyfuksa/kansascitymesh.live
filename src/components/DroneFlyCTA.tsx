import { Plane } from 'lucide-react';
import DiscordButton from './DiscordButton';
import FeatureCard from './FeatureCard';
import { DISCORD_INVITE } from '../constants/discord';

export default function DroneFlyCTA() {
  return (
    <section className="px-4 py-16 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--info-600)', opacity: 0.12 }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <FeatureCard padding="large">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-[var(--info-600)]/20 rounded-2xl flex items-center justify-center">
              <Plane className="w-7 h-7 text-[var(--info-600)]" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl text-white mb-3 tracking-tight">
                Got a drone? Let's fly a node.
              </h2>

              <p className="text-white/70 leading-relaxed mb-4">
                KC Mesh is borrowing a tactic from Austin Mesh: once a week, anyone with a drone coordinates a time and lifts a Meshtastic node a few hundred feet for a few minutes. A second node on the ground (set to{' '}
                <code className="text-[var(--info-600)] bg-white/5 px-1.5 py-0.5 rounded text-[13px]">
                  client_mute
                </code>
                {' '}so it doesn't add to the routing burden) blasts a friendly invite to the Discord into the mesh.
              </p>

              <p className="text-white/70 leading-relaxed mb-6">
                Why bother? Because a lot of people in KC bought a node, didn't see traffic on day one, and stuck it in a drawer. An altitude burst hits dozens of those silent nodes at once. Most won't see the message live — but they'll see it next time they power back up.
              </p>

              <p className="text-white/50 text-[15px] leading-relaxed mb-6">
                We haven't scheduled the first one yet — looking for a couple of drone pilots to lock in a cadence. If you've got a drone (Mavic, Mini, anything that'll get a node up safely) and want to be one of the first to try it, hop in the Discord and say so. We'll pick a Saturday.
              </p>

              <DiscordButton href={DISCORD_INVITE} trackingLabel="drone-cta-discord">
                I've got a drone — let's coordinate
              </DiscordButton>
            </div>
          </div>
        </FeatureCard>
      </div>
    </section>
  );
}

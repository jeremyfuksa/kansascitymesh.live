# Community Growth Playbook

A working strategy doc for KC Mesh. Started after the Discord crossed **200 members** and a Cascadia Mesh community member pointed us at [cascadiamesh.org](https://cascadiamesh.org/) as a model for growth — especially for getting businesses and infrastructure hosts to participate.

This isn't a public marketing page. It's a private working document — the thing I (Jeremy) come back to when I'm trying to figure out what to do next, what's already been tried, and what we explicitly decided to wait on.

## Why this exists

Up to ~200 Discord members, growth has been organic. New folks find the site, install a node, say hello on the mesh, lurk in the Discord. That's a great on-ramp for hobbyists who already know what Meshtastic is.

It's a lousy on-ramp for the people who unlock the next jump in coverage:

- A warehouse owner with a flat 30-foot roof and an unused outlet
- A church with a steeple and a tech-curious deacon
- A ham radio operator with a 60-foot tower and weekly nets
- A school IT director who runs the campus repeater
- A billboard owner with sites along I-435

These people don't read the Meshtastic subreddit. They don't know what LoRa is. They need a story, a clear "what do you need from me," and a reason to say yes that isn't "join Discord."

That's the gap this playbook is trying to close.

## The Cascadia playbook — what works

Synthesized from observing [cascadiamesh.org](https://cascadiamesh.org/), [meshamerica.com](https://meshamerica.com/), and the I-5 Project they're running across the Pacific Northwest:

1. **A flagship corridor initiative gives them a story-shaped pitch.** Cascadia's I-5 Project isn't "host a node." It's "help us close the gap between Olympia and Vancouver, WA along I-5." A specific corridor, a specific gap, a specific reason to call right now. That's much easier to say yes to than abstract infrastructure participation.

2. **Concrete site requirements let hosts self-qualify in 30 seconds.** They tell you up front: high elevation, clear 910 MHz LoRa line of sight along the corridor, willingness to support a small solar-powered repeater. A building owner can scan that and immediately know whether their roof is in scope.

3. **An anchor success story makes it real.** Their first deployment is a billboard owner near Mayfield, WA who donated tower space. Once you have one, prospective hosts stop asking "is this serious?" and start asking "what does our site look like for this?"

4. **A sister 501(c)(3) (Mesh America) owns the long-term infrastructure work.** It accepts tax-deductible donations, is raising $35K specifically for tower colocation insurance, and provides the legal/financial scaffolding that lets serious businesses sign on without a million questions. The hobbyist Discord stays a hobbyist Discord; the nonprofit handles the boring grown-up stuff.

5. **A dedicated host email — not just "join Discord."** Cascadia uses [email protected] for I-5 conversations. Hosts get a real channel that doesn't disappear into a fast-moving chat.

6. **Multi-audience welcome language and concrete use-case storytelling.** They name "makers, coders, neighbors and organizations" and list real reasons people care: emergency prep, festival comms, sensor networks, off-grid backup for kids. Anyone reading can find themselves in it.

7. **Regional sub-meshes under one umbrella.** Salish Mesh (and others) operate as sub-regions of Cascadia. A federation model that lets adjacent metros plug in without diluting either brand.

## What KC is adopting now

These are the changes shipping in the same PR as this doc:

### KC Backbone Initiative — our version of "the I-5 Project"

The four-router cardinal-coverage plan (East / West / North / South) that already exists in [`CLAUDE.md`](../CLAUDE.md) is being elevated from "Jeremy's planning doc" to a public-facing flagship project name. It gives us a story to tell hosts and a specific ask: help close the West-side gap (current critical priority).

### `/host-a-node` page

A dedicated recruitment funnel built on Cascadia's template:

- A specific "we need help here right now" hook (the West-side gap)
- Concrete site requirements anyone can self-qualify against
- Audience cards naming every kind of host we want to reach
- A "what KC Mesh provides in return" section so we don't just sound like we're asking for free real estate
- Anchor proof point: my own router as the first success story
- A direct host email + a softer "just lurk in Discord" CTA for people who aren't ready

### Hero stat update

Surfacing the 200-member Discord milestone alongside the existing node counts. Same line, just adds "200+ in Discord." Cheapest possible social proof bump.

### Homepage cross-promotion

A new section between Resources and the Final CTA that links to `/host-a-node`. Doesn't disrupt the existing flow, just gives the new page a homepage entry point.

## What KC is adopting later (in priority order)

These are the next moves once the current PR has been in production for a while and we've watched what happens.

1. **Anchor case study with photos.** Once we land a second hosted site — a real third-party host, not just my own router — write it up properly. Photos of the install, what they get out of it, what we got out of it. Replace the placeholder success story on the Host a Node page with the real one. This is the single highest-leverage upgrade to the page.

2. **Recurring meetups / build nights.** A standing monthly thing (probably a maker space or someone's garage) where people can show up with hardware questions, get help flashing firmware, and meet other KC folks. Hard to overstate how much faster trust builds when people have met each other in person. Cascadia has regional in-person events; we should too.

3. **Cross-mesh cross-promotion.** A Cascadia member just gave us a referral. Return the favor — link out to them on the Host a Node page or the Resources section, and proactively connect with other regional meshes (Mesh America has a directory). The mesh community is small; this is positive-sum.

4. **A "Regions" model if adjacent metros want to federate.** Not until someone in Lawrence, Topeka, or St. Joseph says "we want to be part of this." Don't manufacture demand. But have the answer ready: "yes, you can be Lawrence Mesh under the KC Mesh umbrella, here's what that means."

5. **501(c)(3) formation.** Trigger conditions: 3+ hosted infrastructure sites live, at least one of which is a real business partnership (not a personal favor), AND a specific reason the lack of a nonprofit is blocking us (tower colocation insurance, a donor who needs tax-deductibility, etc.). Don't form a nonprofit just to have one — it's real overhead. Reference Mesh America's structure when the time comes. Until then, "we're a hobbyist project" is an honest, freeing answer.

## Growth tactics inventory

A running list of moves that work in mesh / civic / volunteer communities. Not all of them are for now — this is the bench.

- **Audience-specific landing paths.** Different hooks for ham operators vs. business hosts vs. HOA homeowners vs. emergency-prep folks. We have the Host a Node page now; we should eventually build dedicated deployment guides per `CLAUDE.md`'s planned structure.
- **Anchor case studies.** Real installs with photos, costs, and outcomes. Each one removes a category of objection.
- **Concrete site requirements.** Self-qualification checklist so we're not fielding a hundred "would my house work" questions.
- **Multi-tier participation paths.** Host a node, run a client, hang out in Discord, show up to a meetup, write documentation, donate hardware. Lots of doors in, low pressure to escalate.
- **Recurring in-person events.** Meetups, build nights, field days. Trust + skills compound fast in person.
- **Cross-mesh cross-promotion.** Link out to other regional meshes; ask them to link to us. Show up in their Discords occasionally.
- **Direct contact channels by audience.** A host email for serious infrastructure conversations. Discord for everyone else.
- **Visible social proof.** Node counts, Discord size, miles of coverage, story count. Numbers go up → people trust the project is real.
- **Honest scope.** Anti-perfectionism, anti-corporate. Per `CLAUDE.md` and `AGENTS.md` — hobbyist tone, weekend project, $25–$200 hardware. Don't oversell.

## Sources

- [Cascadia Mesh — cascadiamesh.org](https://cascadiamesh.org/)
- [Mesh America — meshamerica.com](https://meshamerica.com/)
- [The I-5 Project page on Mesh America](https://meshamerica.com/the-i-5-project/)
- KC Mesh internal: [`CLAUDE.md`](../CLAUDE.md), [`AGENTS.md`](../AGENTS.md), [`README.md`](../README.md)

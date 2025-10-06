---
title: Kansas City Meshtastic Network
description: Building mesh backup communications for KC. One person, one router at a time. Want to help?
alerts:
  - variant: info
    message: Found this site after Googling "Meshtastic"? Welcome. This project documents Kansas City's build-out; the official project lives over at meshtastic.org.
    link: https://meshtastic.org
    linkText: meshtastic.org
callouts:
  - title: If you run kansascitymesh.net, I especially want to talk.
    message: I noticed your domain but could not find contact info. This is not about competing—I just want to build mesh infrastructure in KC, and collaboration beats working alone.
    link: /about/coordination
    linkText: Here's why coordination matters.
  - title: We need coverage inside the KC geofence.
    message: The current focus is a polygon stretching from 39.561616°N, -93.948472°W down to 38.649439°N, -95.148729°W. Keeping every router and node inside those boundaries gives us a resilient metro mesh before we expand outward.
    link: /network/coverage
    linkText: See the coverage priorities
cardsSections:
  - heading: Where things stand right now
    cards:
      - title: Router 1
        description: Northeast KC (Liberty). AC-powered for now (solar on deck). Covers about a five mile radius from a 15-foot mount and feeds an MQTT gateway.
        status: operational
      - title: Router 2
        description: West side is wide open. An elevated site west of State Line would bridge the gap and is the next logical move.
        status: gap
        link: /guides/west-side
        linkText: What Router 2 would look like
      - title: Routers 3 & 4
        description: North and south metro coverage. Once Router 2 is online, these complete the cardinal backbone before we focus on density.
        status: needed
  - heading: Ways to participate
    cards:
      - title: Get a node
        description: Spend $30–$50, pair it with your phone, and join the network. Even indoor nodes add coverage. Start here if you are new.
        link: /get-started/join
        linkText: How to join
      - title: Deploy your own router
        description: Got elevation? Start as a Client Base, then coordinate before promoting to a router—Meshtastic's 2024 guidance made that the rule. West side would have the biggest impact.
        link: /guides/repeater-owners
        linkText: Infrastructure guides
      - title: Spread the word
        description: Tell the ham club, emergency comms teams, and your HOA neighbors. Mesh works better with more participants.
        link: /community/contribute
        linkText: Other ways to help
cta:
  title: Not sure where to start?
  description: Read why I am using Meshtastic, what it actually does, and whether it is worth your time.
  link: /about/why-meshtastic
  linkText: What is this thing?
discordInvite:
  description: Today's I-435 loop showed zero telemetry west of I-29. If you can help bridge that gap—or just want real-time coordination—hop into the KC Meshtastic Discord.
  linkText: Coordinate on Discord
---

# I'm building a mesh network for Kansas City

Not because I'm some RF expert. I figured out that a $35 radio on my roof can
reach five miles, and four of these things in the right spots could cover most
of the metro with backup communications. This site documents what I've learned
so far, what I'm doing, and how AI analysis helped me understand what it takes
for a robust KC mesh.

I put the first router up. It works. Now I am looking for help with the other
three.

## What this actually is

**Honestly? It's just fun.** Building infrastructure with cheap radios is cool.
Watching messages hop across the city on hardware I deployed is satisfying.
Learning RF propagation by doing it beats reading about it.

**But it's also useful.** Backup text messaging that works when cell towers do
not. Emergency communications for severe weather, power outages, whatever. If
that is your motivation, great—you'll benefit from this effort.

**Entry cost: $30–$50 for a basic node.** No license required (915 MHz ISM
band). No monthly fees. You own the hardware; the network exists because people
participate.

This is not a company or formal organization. It is infrastructure I'm building
and documenting so others can join. If enough people scatter nodes across KC, we
end up with mesh coverage the whole metro can use—for fun, for emergencies, for
whatever.

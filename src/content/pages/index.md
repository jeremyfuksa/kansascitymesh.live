---
title: Kansas City Meshtastic Network
description: One person building mesh backup communications for KC, documenting what works. You can do this too.
alerts:
  - variant: info
    message: Found this site after Googling "Meshtastic"? Welcome. This project documents Kansas City's build-out; the official project lives over at meshtastic.org.
    link: https://meshtastic.org
    linkText: meshtastic.org
cardsSections:
  - heading: Where things stand right now
    cards:
      - title: Northland client cluster
        description: Elevated client nodes around Liberty and North Kansas City. Indoors for now, AC-powered, and already linking up with Independence and Downtown. MQTT logging runs on a Raspberry Pi gateway.
        status: operational
      - title: Growth Opportunities
        description: Drive tests show that west of I-29 is silent. An elevated site west of State Line would bring the mesh westward and is the next logical move.
        status: gap
      - title: What Makes Sense Next
        description: North and south coverage would complete metro-wide backbone. See what deployments would make the biggest impact.
        link: /network/coverage
        linkText: Coverage priorities
cta:
  title: Not sure where to start?
  description: Read what Meshtastic actually does, and whether it is worth your time.
  link: /about/why-meshtastic
  linkText: What is this thing?
---

# Let's build a mesh network for Kansas City

A cheap [LoRa](https://en.wikipedia.org/wiki/LoRa) radio can reach 15 miles from inside my home office. A few of these in the right spots could cover most of the metro with free text communications.

This site documents what [one person](/about/operator) has done so far learning [Meshtastic](https://meshtastic.org). It also lays out what would make sense for [mesh network](https://en.wikipedia.org/wiki/Mesh_networking) coverage in Kansas City metro. These are suggestions based on what I've figured out—nothing set in stone beyond what already exists.

## What this is

Text messaging without cell towers. $35 radios running [LoRa](https://en.wikipedia.org/wiki/LoRa) on unlicensed spectrum ([915 MHz ISM band](https://en.wikipedia.org/wiki/ISM_radio_band)). No monthly fees, no license, no infrastructure dependency.

The standard pitch is emergency backup—when severe weather or infrastructure failure takes out cell service, the mesh keeps working. That's true.

Most people building this are here because deploying radios and watching packets route through a network you built is compelling. Learning [RF propagation](https://en.wikipedia.org/wiki/Radio_propagation) by experimentation beats theory. Infrastructure-as-hobby works as motivation.

This isn't a company or formal organization. It's [one person's experiment](/about/operator), documented publicly. There are already 40+ nodes scattered across KC—this site is an attempt to coordinate instead of everyone working isolated.

## Getting started

[Get a $35 node](/get-started/join), pair it with your phone, deploy it indoors.

Questions? [Discord](https://discord.gg/eP5VSPKU) for real-time help, or read [what Meshtastic is](/about/why-meshtastic) first.

---

## Target coverage area

Current focus is a polygon from 39.561616°N, -93.948472°W down to 38.649439°N, -95.148729°W. Keeping every router and node inside those boundaries gives us a resilient metro mesh before expanding. See [coverage priorities](/network/coverage) for details.

## Coordination with kansascitymesh.org

If you run kansascitymesh.org (or any other KC mesh effort), jump into the
[KC Meshtastic Discord](https://discord.gg/eP5VSPKU) and say hi. Collaboration
beats parallel, quiet projects. Let's share notes in the open.

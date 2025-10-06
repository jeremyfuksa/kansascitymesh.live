---
title: Why Meshtastic
description: What I wish someone had told me before I started building mesh infrastructure.
pageHeading: Why Meshtastic?
heroVariant: compact
---

## What I wish someone had told me about Meshtastic

Six months ago I didn't know what LoRa was. Now I've got a solar-powered node on
my roof that can text someone 15 miles away with zero cell service.

Here's the thing nobody tells you up front: mesh networking isn't replacing your
phone. It's stupidly simple backup communication that costs $50 to try and might
save your community when the cell towers are down.

## The mesh networking thing, explained simply

Your phone depends on cell towers. Those towers need power, fiber connections,
and working infrastructure. When any of that breaks, your phone becomes a brick.

**Mesh networking is different.** Every device relays messages for every other
device. No towers, no central infrastructure. Just cheap radios talking to each
other, passing messages along until they reach who you're trying to contact.

One node fails? Messages route around it. Power goes out? Nodes run on batteries
or solar. Cell towers overloaded during an emergency? Mesh doesn't care—it was
never using them.

## What Meshtastic actually does

I'm using Meshtastic because it's the simplest way to build a mesh network
without needing expensive equipment or a ham license.

It uses LoRa radio (915 MHz, unlicensed band). Range depends on terrain and
elevation, but I'm getting 5+ miles from my roof with a basic antenna. People
with better setups are hitting 20–40 miles.

**Yes, MeshCore exists.** It's a newer project that borrows a lot of the same
ideas. It's promising, but the vast majority of real-world deployments,
documentation, and firmware tooling today are centered around Meshtastic. That
ubiquity matters when you're trying to bootstrap a metro-wide mesh on hobbyist
gear.

Meshtastic is fully open source, the firmware and apps are under active
maintenance, and hardware vendors across the ecosystem ship boards that are
Meshtastic-ready out of the box. That openness—and the fact you can own the whole
stack without depending on a single vendor—is why I'm building on Meshtastic
while keeping an eye on MeshCore as it matures.

- **What it does:** Text messages, GPS position sharing, and basic sensor data.
  Range is shockingly good for the power level—I'm running 20 mW and getting
  miles of coverage.
- **What it doesn't do:** Voice calls (text only). Internet access (it's not
  Wi-Fi). Instant delivery (messages take seconds to minutes). Guaranteed reach
  (depends on node density).
- **The cost thing:** $30–$50 gets you started. No license needed (915 MHz ISM
  band). No monthly fees. Open source, so no vendor lock-in.

## Why you might want to do this

**Honestly? Because it's fun.** Building stuff is satisfying. Learning how radio
actually works by deploying hardware beats reading about it. Seeing your
messages hop across nodes you deployed yourself is cool.

**But yeah, the emergency thing is real.** Severe weather knocks out power and
cell towers. Your node runs on battery or solar and keeps working. You
coordinate with neighbors, check on family, report conditions. Some people care
deeply about this backup capability. If that's you, great.

**Events, camping, off-grid communication.** Big festival with overloaded cell
towers. Hiking trip with no service. Private text messaging and position
tracking without infrastructure. All valid use cases.

**Practice before you need it.** Whether your motivation is fun or emergency
prep, building capability now means you already know how it works when you
actually need it.

## Kansas City's strategic approach

Most people buy a Meshtastic node, turn it on, and hope to connect to someone.
That's fine for experimenting, but it doesn't build reliable infrastructure.
We're taking a more strategic approach.

**We're building a four-router backbone**, placing high-performance nodes at
strategic, elevated locations around the Kansas City metro. This creates a
reliable, wide-area network that individual users can connect to. Here's the
backbone layout:

- **Router 1 — The Liberty Anchor (operational):** Installed on the northeast
  side of the metro near Liberty. Serves as the network's primary anchor and
  MQTT gateway. Its moderate elevation provides reliable coverage across
  Liberty, Gladstone, and much of the Northland.
- **Router 2 — The Western Bridge (high priority):** Needed in northern Johnson
  County, KS (Shawnee, Lenexa). Strategically placed on a high point, it will
  bridge the western coverage gap, connecting the Kansas side of the metro to
  the rest of the network.
- **Router 3 — The Northern River Crossing (needed):** Positioned on the bluffs
  in southern Clay County to provide robust coverage across the Missouri River,
  linking the Northland suburbs to the central and southern parts of the mesh.
- **Router 4 — The Southern Sentinel (needed):** A prominent hill in northern
  Cass County (near Belton/Grandview) completes the cardinal coverage,
  extending the network's reach to the southern metro.

This backbone ensures that even with sparse client node density, there's a
reliable path for messages to traverse the entire Kansas City metropolitan area.

We're coordinating each router deployment carefully so the mesh grows with
purpose instead of noise. If you think you can host one of these backbone sites,
[reach out](/community/contact).

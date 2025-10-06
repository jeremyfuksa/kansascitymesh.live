---
title: Network Architecture
description: A technical deep dive into the Kansas City Meshtastic network's design, topology, and strategic backbone.
pageHeading: Network Architecture
---

## How the Kansas City mesh is built

The KC Meshtastic network is optimized for resilience, coverage, and community
participation. A strategic backbone of high-elevation routers carries traffic
across the metro, while a growing density of client nodes fills in local gaps.

### Mesh topology in plain language

Meshtastic is a peer-to-peer, self-healing mesh. There is no central server or
single point of failure. Each node repeats messages from its neighbors until the
packet reaches its destination. When a node goes offline, the network routes
around it. When a new node comes online, it joins automatically.

### The four-router backbone

The backbone is a set of four 24/7 sites that form the cardinal spine of the
metro. Each router is planned around reliable power, quality antennas, and
minimal noise floors.

1. **Router 1 — Liberty anchor (operational):** Northeast coverage with MQTT
   gateway duties. AC-powered today, solar retrofit in progress.
2. **Router 2 — Western bridge (high priority):** Needs elevation in northern
   Johnson County (Shawnee/Lenexa). Bridges the Kansas side back to Router 1.
3. **Router 3 — Northern river crossing (needed):** Southern Clay County bluffs
   to link the Northland to midtown and the southside.
4. **Router 4 — Southern sentinel (needed):** Northern Cass County to extend
   coverage into Belton, Grandview, and beyond.

### Device roles (2024 guidance)

Meshtastic refreshed its role guidance in late 2024. KC sticks closely to it:

- **Client:** The default for handheld and vehicle nodes. Sends, receives, and
  repeats traffic.
- **Client Base:** A boosted client for your best-placed home node. Prioritizes
  rebroadcasting favorited neighbors.
- **Router:** Reserved for elevated, 24/7 infrastructure. Always coordinate
  before promoting a node to router status.
- **Repeater:** Router with telemetry silenced. Only for special, high-noise
  cases.
- **Gateway:** Router with MQTT connectivity. Router 1 currently fills this
  role.

Misapplying router-style roles creates collisions and slows the network. Spend
some time as a client first; if you already hear a backbone router, adding
another one nearby likely hurts more than it helps.

### Routing and hop limits

Meshtastic uses controlled flooding with hop limits. KC keeps the default hop
limit of 3, which balances reach with airtime. Nodes favor the routers they
communicate with most, so elevating your node and favoriting the right backbone
sites matters more than chasing raw transmit power.

### Data and automation

Router 1 feeds an MQTT broker for coverage logging, alerting, and future
dashboards. We're designing lightweight telemetry payloads so the mesh stays
responsive while still giving us data to improve placements.

### How you can help

- Host one of the remaining backbone routers.
- Run propagation tests from your location and share results.
- Contribute coverage traces or signal strength logs once the public dashboard
  launches.

The architecture evolves as new data arrives, but the principles stay the same:
high-quality backbone sites, lots of everyday client nodes, and coordination so
we grow in the smartest places first.

---
title: Network Architecture
description: A technical deep dive into the Kansas City Meshtastic network's design, topology, and strategic backbone.
pageHeading: Network Architecture
heroVariant: compact
---

## How the Kansas City mesh is built

The KC Meshtastic network is optimized for resilience, coverage, and community participation. A strategic backbone of high-elevation routers carries traffic across the metro, while a growing density of client nodes fills in local gaps.

### Mesh topology in plain language

[Meshtastic](https://meshtastic.org/) is a peer-to-peer, self-healing [mesh network](https://en.wikipedia.org/wiki/Mesh_networking). There is no central server or single point of failure. Each node repeats messages from its neighbors until the packet reaches its destination. When a node goes offline, the network routes around it. When a new node comes online, it joins automatically.

### The four-router backbone (2025 plan)

The backbone is a set of four 24/7 sites that form the cardinal spine of the metro. Each router is planned around reliable power, quality antennas, and minimal noise floors. Coverage priorities on the [deployment page](/network/coverage) feed this roadmap.

1. **Router 1 — Liberty anchor (operational):** Northeast coverage with MQTT gateway duties. Indoor for now, roughly 10–12 mile reach toward Downtown and Independence. Solar retrofit is queued for spring.
2. **Router 2 — Western bridge (high priority):** Needs elevation in northern Johnson County (Shawnee, Lenexa, or Prairie Village). Bridges the Kansas side back to Router 1 and lights up the I-435 corridor.
3. **Router 3 — Northern river crossing (planned):** Southern Clay County bluffs to reinforce Northland traffic and maintain a strong path across the Missouri River.
4. **Router 4 — Southern sentinel (planned):** Northern Cass County or high ground near Belton/Grandview to extend coverage down I-49.

Client nodes already dot the map across KC, but until these backbone sites come online the mesh leans heavily on Router 1. If you can host one of the remaining sites, sync up in the [KC Meshtastic Discord](https://discord.gg/eP5VSPKU) before ordering hardware so we can sanity-check the plan.

### Device roles (updated for 2024 guidance)

Meshtastic refreshed its [role guidance](https://meshtastic.org/docs/configuration/radio/device/#role) in late 2024. KC sticks closely to it:

- **Client:** The default for handheld and vehicle nodes. Sends, receives, and repeats traffic.
- **Client Base:** A boosted client for your best-placed home node. Prioritizes rebroadcasting favorited neighbors.
- **Router:** Reserved for elevated, 24/7 infrastructure. Always coordinate before promoting a node to router status.
- **Repeater:** Router with telemetry silenced. Only for special, high-noise cases.
- **Gateway:** Router with [MQTT](https://meshtastic.org/docs/configuration/module/mqtt/) connectivity. Router 1 currently fills this role.

Misapplying router-style roles creates collisions and slows the network. Spend some time as a client first; if you already hear a backbone router, adding another one nearby likely hurts more than it helps.

### Routing and hop limits

Meshtastic uses [controlled flooding](https://meshtastic.org/docs/overview/mesh-algo/) with hop limits. KC keeps the default hop limit of 3, which balances reach with airtime. Nodes favor the routers they communicate with most, so elevating your node and favoriting the right backbone sites matters more than chasing raw transmit power.

### Data and automation

Router 1 feeds an [MQTT](https://meshtastic.org/docs/configuration/module/mqtt/) broker for coverage logging, alerting, and future dashboards. We're keeping uploads limited to well-placed infrastructure nodes so the broker stays clean while we build the live map and analytics pipeline.

### How you can help

- **Host one of the remaining backbone routers:** See [coverage priorities](/network/coverage) for high-impact locations.
- **Run propagation tests from your location:** Share results in [Discord](https://discord.gg/eP5VSPKU).
- **Deploy your own node:** [Get started here](/get-started/join).
- **Contribute coverage data:** Signal strength logs and GPS traces help identify where infrastructure makes the most difference.

The architecture evolves as new data arrives, but the principles stay the same: high-quality backbone sites, lots of everyday client nodes, and coordination so we grow in the smartest places first.

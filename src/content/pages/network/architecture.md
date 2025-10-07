---
title: Network Architecture
description: A technical deep dive into the Kansas City Meshtastic network's design, topology, and strategic backbone.
pageHeading: Network Architecture
heroVariant: compact
---

## How the Kansas City mesh is built

The KC Meshtastic network today runs on everyday client nodes spread across the metro. We're architecting a strategic backbone of high-elevation routers, but those installs stay theoretical until partners with serious elevation and 24/7 power raise their hands.

### Mesh topology in plain language

[Meshtastic](https://meshtastic.org/) is a peer-to-peer, self-healing [mesh network](https://en.wikipedia.org/wiki/Mesh_networking). There is no central server or single point of failure. Each node repeats messages from its neighbors until the packet reaches its destination. When a node goes offline, the network routes around it. When a new node comes online, it joins automatically.

### Backbone roadmap (seeking hosts)

The draft backbone calls for four always-on sites that form the cardinal spine of the metro. Each deployment needs reliable power, quality antennas, weatherproof gear, and minimal RF noise. Coverage priorities on the [deployment page](/network/coverage) feed this roadmap while we recruit hosts.

1. **Router 1 — Liberty anchor (seeking host):** Concept for a northeast rooftop or hilltop that can anchor the network and eventually take over MQTT logging from the current Raspberry Pi gateway.
2. **Router 2 — Western bridge (seeking host):** Needs elevation in northern Johnson County (Shawnee, Lenexa, or Prairie Village) to bridge Kansas back toward Downtown and light up the I-435 corridor.
3. **Router 3 — Northern river crossing (seeking host):** Southern Clay County bluffs to reinforce Northland traffic and maintain a strong path across the Missouri River.
4. **Router 4 — Southern sentinel (seeking host):** Northern Cass County or high ground near Belton/Grandview to extend coverage down I-49.

Client nodes already dot the map across KC, but without these backbone sites the mesh stays opportunistic. If you can host one of the locations above, sync up in the [KC Meshtastic Discord](https://discord.gg/eP5VSPKU) before ordering hardware so we can sanity-check the plan.

### Device roles (updated for 2024 guidance)

Meshtastic refreshed its [role guidance](https://meshtastic.org/docs/configuration/radio/device/#role) in late 2024. KC sticks closely to it:

- **Client:** The default for handheld and vehicle nodes. Sends, receives, and repeats traffic.
- **Client Base:** A boosted client for your best-placed home node. Prioritizes rebroadcasting favorited neighbors.
- **Router:** Reserved for elevated, 24/7 infrastructure. Always coordinate before promoting a node to router status.
- **Repeater:** Router with telemetry silenced. Only for special, high-noise cases.

**Routers are reserved for partners who can combine significant elevation with reliable power and weatherized installs.** Misapplying router-style roles creates collisions and slows the network. Spend some time as a client first; if you already hear a backbone router, adding another one nearby likely hurts more than it helps.

### Routing and hop limits

Meshtastic uses [controlled flooding](https://meshtastic.org/docs/overview/mesh-algo/) with hop limits. KC keeps the default hop limit of 3, which balances reach with airtime. Nodes favor the routers they communicate with most, so elevating your node and favoriting the right backbone sites matters more than chasing raw transmit power.

### How you can help

- **Stand up a backbone router:** If you manage a repeater tower, commercial rooftop, or other high-elevation site, see [coverage priorities](/network/coverage) and let's coordinate the deployment.
- **Run propagation tests from your location:** Share results in [Discord](https://discord.gg/eP5VSPKU).
- **Deploy your own node:** [Get started here](/get-started/join).
- **Contribute coverage data:** Signal strength logs and GPS traces help identify where infrastructure makes the most difference.

The architecture evolves as new data arrives, but the principles stay the same: high-quality backbone sites, lots of everyday client nodes, and coordination so we grow in the smartest places first.

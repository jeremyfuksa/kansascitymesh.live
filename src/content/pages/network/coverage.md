---
title: Coverage Map
description: Current and suggested mesh coverage across the Kansas City metro. Router 1 (Liberty) is live. Router 2 (west side) is the priority.
pageHeading: Coverage Map
---

## Where the KC mesh reaches right now

Router 1 in Liberty covers Liberty, Gladstone, and much of the Northland. West
of State Line is still largely uncovered. A proper interactive map is in
progress; for now, here are the essentials.

### Operational

- **Router 1 — Liberty / NE KC (operational):**
  - AC powered today with a solar retrofit planned for spring 2025.
  - MQTT gateway handled by a Raspberry Pi 4 with a Waveshare LoRa hat.
  - Roughly 5–8 mile radius in Liberty, Gladstone, and portions of downtown.

### Priority deployments

- **Router 2 — Western bridge (top priority):** Needs a host in northern
  Johnson County (Shawnee/Lenexa). This site will close the largest coverage gap
  and tie Kansas nodes back to the backbone. [Interested? Reach out](/community/contact)
  or drop into the [Discord server](https://discord.gg/eP5VSPKU) if you have a
  rooftop west of I-29.
- **Router 3 — Northern river crossing (needed):** Southern Clay County bluffs
  to relay across the Missouri River and harden coverage for the Northland.
- **Router 4 — Southern sentinel (needed):** Northern Cass County hilltop to
  extend coverage toward Belton and Grandview.

### How you can help right now

- Host Router 2 on the west side.
- Share signal reports and GPS traces when you roam the metro.
- Deploy local client nodes indoors—even low-elevation coverage helps fill
  city-level gaps until new routers come online.

### Target geofence

Our near-term objective is to saturate the rectangle defined by these
coordinates before we push coverage beyond the metro:

1. **Point 1:** 39.561616° N, -93.948472° W
2. **Point 2:** 39.561616° N, -95.148729° W
3. **Point 3:** 38.649439° N, -95.148729° W
4. **Point 4:** 38.649439° N, -93.948472° W

If you can deploy inside that box, you are directly supporting the “robust mesh
first, gravy later” strategy. Once the geofence is stable, we’ll widen the net
with play nodes and long-haul links.

A live coverage map and propagation heatmaps will land soon, along with public
CSV data. Until then, these notes will keep you aligned with the expansion plan.

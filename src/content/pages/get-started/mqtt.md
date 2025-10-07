---
title: MQTT & The KC Mesh
description: Understand what MQTT does (and doesn't do) for Meshtastic nodes before flipping the switch.
pageHeading: MQTT & The KC Mesh
heroVariant: compact
---

## Why I treat MQTT carefully

MQTT is basically a replay service for the mesh. It mirrors whatever your node
already heard over the air and republishes it through an internet broker. It does
**not** give you a separate chat room or a way to beam packets straight to
another city. Every message still has to exit your radio over RF first before
MQTT ever sees it.

## Why we're using it in KC

I run the broker so we can eventually power a live coverage map and historical
telemetry. MQTT gives us an off-mesh log of packets that we can analyze to see
where routers connect, how often they fall offline, and which parts of the metro
are still quiet. We do **not** need every node uploading to make that happen—too
many uplinks just create duplicate traffic. What helps most is a handful of
24/7, well-placed routers with stable internet doing the uploads.

If you have a high, reliable site that already reaches several neighborhoods,
share the details in the
[Discord server](https://discord.gg/eP5VSPKU) (`#kc-coordination`). A small
number of strategically placed MQTT feeds (north, south, and future west-side
coverage) will give the map good data without overwhelming the broker. Curious
what areas matter most? Check the [coverage priorities](/network/coverage) page
for the current deployment wishlist.

## What MQTT actually is

MQTT (Message Queuing Telemetry Transport) is a lightweight
publish/subscribe protocol. A broker collects packets from clients and
republishes them to anyone subscribed to the same topics. In our case, the
"client" is a node paired to a phone, laptop, or single-board computer that has
both RF access to the mesh **and** an internet connection.

- Official reference: [mqtt.org](https://mqtt.org/)
- Meshtastic docs:
  [meshtastic.org/docs/software/integrations/mqtt](https://meshtastic.org/docs/software/integrations/mqtt)

## What it actually does for KC

- **Extends reach when RF already delivered the packet.** If your node hears a
  message and uploads it to the broker, someone on the other side of the metro
  (or country) can download that same packet if they're also subscribed. Nothing
  shows up unless an RF path existed first.
- **Captures history for debugging and mapping.** The broker gives us a log of
  recent traffic so we can map coverage, build that live dashboard, and diagnose
  outages after the fact. Expect it to drive a future map on the
  [network architecture](/network/architecture) and coverage pages.
- **Feeds dashboards and automations.** Platforms like
  [Home Assistant](https://www.home-assistant.io/),
  [Grafana](https://grafana.com/), and
  [Node-RED](https://nodered.org/) speak MQTT, so it is handy when you want
  alerts, analytics, or custom automations tied to the mesh.

## What it does *not* do

- **It will not rescue nodes that can't reach anyone over RF.** If a packet never
  makes it to an MQTT-enabled node, the broker never sees it.
- **It is not a private backchannel.** Anyone with the topic key can read what
  you upload. Treat it like the public mesh unless you control every hop.
- **It is not an internet-only chat room.** You cannot send packets *only*
  through MQTT. The message still starts (and usually ends) on the air.
- **It is not unlimited bandwidth.** Spamming MQTT still spams RF first because
  every packet has to be transmitted locally before the broker relays it.

## Checklist before enabling MQTT

1. Confirm you have reliable, always-on internet and power.
2. Pick a broker you trust (KC's, Meshtastic public, or your own) and understand
   its retention policy.
3. Keep MQTT to stationary infrastructure nodes. Mobile gear should leave it
   off.
4. Coordinate in Discord before uploading lots of telemetry or sensor data. If
   you're experimenting with something odd, double-check it with the crew first
   so we can make sure it helps instead of flooding the mesh.

## Settings to avoid

- Don't broadcast debug logs or continuous telemetry unless you've cleared it
  with the network maintainers.
- Don't enable uplink/downlink for every channel if you only need one.
- Don't leave the default public topic key in place—set something specific to
  the KC mesh or your project.

## KC broker status

Router 1 in Liberty currently feeds the KC MQTT broker. It mirrors packets for
monitoring, coverage notes, and post-event analysis. If you're brand new to
Meshtastic, finish [Join the Network](/get-started/join) first so your node is
stable before you add MQTT, then review the
[quick start checklist](/get-started/quick-start) for the full radio config.
When you're ready to upload, drop a note in Discord so we can keep the broker
balanced.

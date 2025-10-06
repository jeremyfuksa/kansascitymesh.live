---
title: MQTT & The KC Mesh
description: Understand what MQTT does (and doesn't do) for Meshtastic nodes before flipping the switch.
pageHeading: MQTT & The KC Mesh
heroVariant: compact
---

MQTT is the bridge between the over-the-air mesh and the wider internet. It can
be incredibly useful, but it's also an easy way to drown a local mesh in traffic
or leak data you never meant to share. Here's how we treat it in Kansas City.

## What MQTT actually is

MQTT (Message Queuing Telemetry Transport) is a lightweight publish/subscribe
protocol. A broker collects packets from clients and republishes them to anyone
subscribed to the same topics. For Meshtastic, the "client" is usually a node
paired to a phone or single-board computer.

- Official reference: [mqtt.org](https://mqtt.org/)
- Meshtastic docs: [meshtastic.org/docs/software/integrations/mqtt](https://meshtastic.org/docs/software/integrations/mqtt)

## What it does for the mesh

- **Backhauls messages beyond RF range.** If both ends subscribe to the same
  broker, packets hop across the internet when RF alone can't reach.
- **Provides historical visibility.** Our broker logs messages for later review,
  which helps debug coverage and replay incidents.
- **Enables automation.** Home automation platforms and dashboards speak MQTT,
  so you can wire alerts, monitoring, or analytics on top of it.

## What it does *not* do

- **It is not general internet access.** Packets still originate over RF before
  the broker ever sees them.
- **It is not unlimited bandwidth.** Spam MQTT and you spam RF first.
- **It is not private by default.** Anyone with the topic key can read what you
  publish. Treat it like a public channel unless you control the entire path.

## Checklist before enabling MQTT

1. Confirm you have reliable, always-on internet and power.
2. Choose a broker you trust (KC's, Meshtastic public, or your own) and know its
   retention policy.
3. Keep MQTT on stationary infrastructure nodes. Mobile gear should leave it
   off.
4. Coordinate with the KC team before uploading lots of telemetry or sensor
   data.

## Settings to avoid

- Don't broadcast debug logs or continuous telemetry unless you've cleared it
  with the network maintainers.
- Don't enable uplink/downlink for every channel if you only need one.
- Don't leave the default public topic key in place—set something specific to
  the KC mesh or your project.

## KC broker status

Router 1 in Liberty currently feeds the KC MQTT broker. It's a controlled
backhaul used for monitoring and coordination. Reach out on the [contact
page](/community/contact) if you want access or plan to contribute data so we
can keep the noise manageable.

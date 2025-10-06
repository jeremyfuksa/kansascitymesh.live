---
title: Quick Start Checklist
description: You already know Meshtastic. Here's the KC-specific config and five steps to verify you're on the mesh.
pageHeading: Quick Start Checklist
heroVariant: compact
---

## Quick start for experienced Meshtastic users

You've deployed before. You don't need hand-holding. Here's the Kansas City mesh
configuration and the five steps to confirm you're online. Ten minutes, tops.

## Kansas City mesh config

- **Region:** United States (915 MHz)
- **Preset:** LongFast (SF11, 125 kHz bandwidth)
- **Primary channel:** LongFast default (public)
- **Hop limit:** 3 (default)

Match these settings and you're on the metro mesh. Layer your own encrypted
channels on top if needed, but keep the primary channel compatible so you still
relay KC traffic.

## Five-step deployment checklist

1. **Flash firmware (if needed):** Use the latest stable release via
   [flasher.meshtastic.org](https://flasher.meshtastic.org). Confirm the device
   boots cleanly.
2. **Pair via Bluetooth:** Connect in the Meshtastic app (iOS/Android). Default
   PIN is usually `123456` unless the screen shows otherwise.
3. **Set radio parameters:** Region US-915, preset LongFast, output 21 dBm.
   Update device name to something recognizable (e.g. `KC-Rooftop-West`).
4. **Favor backbone routers:** Add Router 1 (`KC-Liberty-GW`) to your favorites
   so rebroadcast priority stays sane.
5. **Announce yourself:** Send a short intro message with your approximate
   location and whether you're portable or fixed. That helps us map coverage.

## Optional extras

- Add a secondary channel with a private key for your own group chatter.
- Enable MQTT only if you're on stable power/internet. See the [MQTT
  checklist](/get-started/mqtt) before turning it on.
- If your node will run 24/7, let the community know. We'll add it to the
  coverage notes.

---
title: Join the Network
description: Getting started with Meshtastic is easy.
pageHeading: Join the Network
heroVariant: compact
---

## Start here

The instructions below
are what I wish I'd had when I flashed my first node. If you're already fluent
with Meshtastic, jump to the [quick start checklist](/get-started/quick-start)
for the abbreviated version.

### Step 1: Pick hardware that fits your plan

> **Affiliate note:** Some links go through my Amazon affiliate account. If you
> buy through them, I earn a small commission at no extra cost to you.

<div class="row g-4 mb-4">
  <div class="col-md-6">
    <div class="card h-100">
      <div class="card-body">
        <img src="/images/heltec-v3.jpg" class="img-fluid rounded mb-3" alt="Heltec LoRa32 V3">
        <h5 class="card-title">Heltec LoRa32 V3</h5>
        <p class="card-text"><strong>Best for getting started</strong></p>
        <p class="card-text">Under $35. Screen shows live packets. Needs your phone for messaging, which is perfect for first-time setup.</p>
        <a href="https://www.amazon.com/dp/B0DG5F1YNX?tag=jeremyfuksa00-20" class="btn btn-primary">Buy on Amazon</a>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card h-100">
      <div class="card-body">
        <img src="/images/lilygo-t-deck.jpg" class="img-fluid rounded mb-3" alt="LILYGO T-Deck">
        <h5 class="card-title">LILYGO T-Deck</h5>
        <p class="card-text"><strong>Standalone device</strong></p>
        <p class="card-text">~$70. Full keyboard and screen so you can send messages without a phone. GPS built-in for location sharing.</p>
        <a href="https://www.amazon.com/dp/B0FBGTYQH3?tag=jeremyfuksa00-20" class="btn btn-primary">Buy on Amazon</a>
      </div>
    </div>
  </div>
</div>

Need more options? I keep an expanded list with pros and cons on the
[hardware page](/get-started/hardware). Whatever you buy, make sure it states
**915 MHz** for the US ISM band. The 868 MHz and 433 MHz variants will not reach
KC nodes.

### Step 2: Flash firmware first

Flashing happens in the browser and takes about two minutes.

- Plug the radio into your computer with a known-good USB-C cable.
- Using Chrome, Edge, or another Chromium browser, open
  [flasher.meshtastic.org](https://flasher.meshtastic.org).
- Pick the board that matches your device and choose the latest stable build.
- Click "Flash" and wait. Do not disconnect until it finishes.

**Troubleshooting:** If the computer does not see the device, install the
[CP210x drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers).
Windows might need these; macOS has worked out of the box.

### Step 3: Install the Meshtastic app

You need the app (or web client) to configure the node.

- **Android:** Install from the
  [Google Play Store](https://play.google.com/store/apps/details?id=com.geeksville.mesh).
  The app usually finds the node automatically.
- **iOS:** Install from the
  [App Store](https://apps.apple.com/us/app/meshtastic/id1586432531) and pair via
  Bluetooth.
- **Desktop/Web:** The
  [Meshtastic Web Client](https://client.meshtastic.org/) works in any browser if
  you want to configure over USB.

### Step 4: Apply the KC configuration

Keep the settings simple until you see traffic moving. These match what I run on
my indoor nodes.

- Region: **United States 915 MHz**
- Role: **Client** (routers stay reserved for high-elevation partners—keep new nodes in client mode until you coordinate in Discord)
- Channel preset: **LongFast** at 21 dBm
- Device name: pick something recognizable. It doesn't hurt to have 30 `Meshtastic xxxx` nodes, but it doesn't make for good recognition.

When the node behaves, feel free to explore the rest of the app. I document more
advanced tweaks on the [quick start checklist](/get-started/quick-start).

### Step 5: Verify you are on the mesh

This part can feel anticlimactic. KC traffic is still light, so be patient.

- Watch the Nearby Nodes list for a few minutes. If it stays empty, leave the
  device running overnight and check again.
- Send a short hello with your general location. Responses can take hours; the
  channel is intentionally quiet.
- Keep the node powered for a few days so others can see it appear on the mesh.

## Optional next moves

- Move the node to a better spot and upgrade antennas once you know it works.
- Add always-on power and MQTT after reading the
  [MQTT checklist](/get-started/mqtt).
- Share what you learn in the [Discord server](https://discord.gg/eP5VSPKU) so we
  can map coverage faster.
- Ready for a faster path? Deploy multiple nodes using the
  [quick start checklist](/get-started/quick-start).
- Dreaming up something unusual (custom scripts, long-range relays, automation)?
  Pitch it in `#kc-coordination` on Discord first so we make sure it helps the
  mesh.

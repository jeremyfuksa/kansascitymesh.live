---
title: Join the Network
description: How I got my first Meshtastic node running. Takes about 45 minutes and roughly fifty bucks.
pageHeading: Join the Network
---

## Getting your first node running

This took me about 45 minutes total. Most of that was waiting for delivery. If
you can pair Bluetooth headphones and follow five steps, you can do this.

### Why bother?

- **Emergency backup communications.** When cell towers are down, Meshtastic
  keeps working.
- **Off-grid messaging.** Camping, events, rural areas—portable coverage on the
  cheap.
- **Because it's fun.** Building infrastructure with affordable radios is
  satisfying. Watching packets hop across a network you built is addicting.

### Step 1: Get hardware

- Start with a **Heltec LoRa32 V3** if you just want to try things. Under $35.
- Want GPS and better mobile usability? Buy a **LILYGO T-Beam** (~$45).
- Order from Amazon or reputable electronics shops. Confirm you purchase the
  **915 MHz** variant.

### Step 2: Install the Meshtastic app

- Android: install from the Play Store.
- iOS: use TestFlight.
- Desktop: flash firmware with the USB flasher, then use the Web UI if you
  prefer.

### Step 3: Flash firmware

- Plug the radio into your computer with a USB-C cable.
- Visit [flasher.meshtastic.org](https://flasher.meshtastic.org).
- Select the correct device profile (Heltec V3 or T-Beam) and flash the latest
  release.

### Step 4: Configure KC settings

- Open the Meshtastic app while connected to the device.
- Set region to **US 915 MHz**.
- Choose **LongFast** channel at 21 dBm output.
- Change device name to something unique and recognizable (e.g. `KC-YourName`).

### Step 5: Verify and get on the air

- Watch for nearby nodes in the app. Router 1 in Liberty should appear if you're
  anywhere east of the city.
- Send a test message—say hi and mention where you're located.
- Favor the nodes you want prioritized rebroadcasts from; Router 1 is a good
  start.

### Optional: Improve your setup

- Add an outdoor antenna or elevate the stock whip for better range.
- Use a USB power brick or 12 V supply for continuous operation.
- Keep the node near a window until you invest in weatherproof enclosures.

Document what you learn and share it with the community. Every successful node
makes the KC mesh stronger.

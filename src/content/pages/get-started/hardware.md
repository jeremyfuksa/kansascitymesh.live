---
title: Hardware Selection
description: You don't need expensive equipment. Here's what actually works for KC mesh, organized by budget and use case.
pageHeading: Hardware Selection
heroVariant: compact
---

## How I evaluate hardware

The quick win is getting any 915 MHz node online fast, then upgrading once the
spot proves useful. What follows is gear that keeps showing up in the KC mesh
and broader Meshtastic chatter. Most of it comes from comparing Reddit threads,
public node inventories, and what locals have actually deployed.

Whenever I list a part, assume the 915 MHz version unless I call it out. The 868
MHz and 433 MHz variants will not reach the KC mesh.

### Budget radios (try it first)

- **Heltec LoRa32 V3 ($25–$35):** Common entry node thanks to the OLED screen
  and low cost. Needs a phone or laptop for messaging. [Buy on Amazon](https://www.amazon.com/dp/B0DG5F1YNX?tag=jeremyfuksa00-20).
- **LILYGO T-Beam ($40–$55):** Popular for mobile nodes because it includes GPS
  and an 18650 tray. [Buy on Amazon](https://a.co/d/1Wo3rXa).
- **SenseCAP T1000-E ($50–$60):** A compact, card-sized tracker with GPS and
  Bluetooth, ideal for personal tracking and mobile Meshtastic nodes. [Buy on Amazon](https://www.amazon.com/SenseCAP-T1000-Tracker-Meshtastic-Bluetooth/dp/B0C7Q359Y).

### Portable plus keyboard

- **LILYGO T-Deck ($65–$75):** Favored by folks who want a standalone keyboard
  and screen without carrying a phone. [Buy on Amazon](https://www.amazon.com/dp/B0FBGTYQH3?tag=jeremyfuksa00-20).

### Infrastructure-ready nodes

- **RAK WisBlock Meshtastic ($70–$90):** Modular boards designed for outdoor
  enclosures; frequent choice for KC backbone candidates.
  [Buy on Amazon](https://a.co/d/5Zitq0n).
- **DIY Raspberry Pi gateway:** A Meshtastic radio paired with a Pi (often using
  the Waveshare HAT) powers automation and MQTT scripts. [Get the LoRaWAN HAT](https://www.waveshare.com/sx1262-lorawan-hat.htm).

### Antennas that actually help

- **Stock / rubber duck (2–3 dBi):** This will be your first upgrade. The stock antennas are rarely ideal.
- **Indoor 915 MHz replacement (claimed 5.8 dBi):** Cheap way to beat the
  factory rubber duck while keeping everything inside. This
  [915 MHz whip](https://www.amazon.com/dp/B0D3KPFVH3?tag=jeremyfuksa00-20) has
  become a staple for window-mount setups and short coax runs.
- **Outdoor omni (5–8 dBi) for 902–928 MHz:** Look for fiberglass or ABS
  housings with N-female connectors. Pair them with low-loss coax and a proper ground block and you get a
  metro-friendly gain bump without going overboard.

### Power and enclosures

- **Indoor:** USB wall warts or power banks keep demo nodes alive for weeks.
- **Outdoor:** 12 V bricks or small solar kits paired with charge controllers are
  the pattern most deployments follow. Weatherproof boxes and gland fittings
  are non-negotiable.

### Extras people keep buying

- Short SMA pigtails to park the radio indoors while the antenna lives outside.
- Mounting hardware (J-mounts, eave brackets, chimney straps) to reclaim
  elevation without custom fabrication.
- Desiccant packs inside outdoor boxes to fight condensation.

Ready to build? Follow the [join walkthrough](/get-started/join) for firmware and
app setup, or jump to the [quick start checklist](/get-started/quick-start) if
you already run Meshtastic nodes elsewhere. Planning something elaborate (solar
arrays, custom gateways, automation)? Drop the idea in the
[Discord server](https://discord.gg/eP5VSPKU) so the community can sanity-check
it before you spend the money.

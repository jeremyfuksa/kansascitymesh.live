# Fork this for your city

You found this repo because the site says ["steal this network."](https://kansascitymesh.live/steal-this-network) We meant it. The license is CC-BY-SA 4.0 — share-alike, attribution required, otherwise help yourself.

This is the concrete checklist. Most of it is search-and-replace.

## Before you start

A few questions worth answering for yourself first:

- **Do you have a Discord (or other community hub) running already?** The site funnels everyone there. If you don't have one yet, stand it up first; the site won't have anywhere to send people otherwise.
- **Do you have at least one node on the air?** The honest framing of this site is "60+ nodes, a working backbone." If you've got two friends and a wish, your copy should match that — don't import KC's numbers wholesale.
- **What's your city's character?** KC's voice is "Midwest dusk, hobbyist, anti-perfectionist." Yours might be different. The voice will be the most work to make your own; the code is the easy part.

## The minimal change set (1–2 hours)

These are the things you must change. The site will still build and look mostly right after just these.

### 1. Constants — three files in `src/constants/`

| File                         | What to change                                                            |
| ---------------------------- | ------------------------------------------------------------------------- |
| `src/constants/discord.ts`   | `DISCORD_INVITE` — your Discord (or Matrix, or whatever) invite URL       |
| `src/constants/contact.ts`   | `CONTACT_EMAIL` — where host-a-node inquiries land                        |
| `src/constants/analytics.ts` | `GA_MEASUREMENT_ID` — your Google Analytics ID, or leave blank to disable |

### 2. Site identity — `astro.config.mjs` + `src/layouts/Layout.astro`

- `astro.config.mjs` → change `site: 'https://kansascitymesh.live'` to your domain
- `src/layouts/Layout.astro` → the canonical-URL fallback (`Astro.site ?? 'https://kansascitymesh.live'`) appears twice; update both
- `src/layouts/Layout.astro` → `<meta property="og:site_name" content="Kansas City Meshtastic Network" />` → your name

### 3. Brand assets — `public/` and `src/assets/`

- `public/favicon.png` and `public/favicon-v2.png` → your favicon
- `public/og-image.png` → your social preview image (1000×1000 works)
- `src/assets/kc-mesh-logo-green.png` → your logo (or remove the import in `src/components/Nav.astro` and use a text logo)

### 4. Copy

The hard part. Search-and-replace will get you maybe 60% there; the rest is rewriting in your voice. Files to edit, in order of how much they matter:

| File                                                         | What's in it                                                                                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `src/pages/index.astro` + `src/components/HeroSection.astro` | Homepage. Most-visible copy. Change the city name, node counts, and headline.                                                |
| `src/components/HostInfrastructureCTA.astro`                 | "Got a rooftop, a tower, or a high spot in the metro?" — change the place names to your city's.                              |
| `src/components/DroneFlyCTA.astro`                           | The drone-flight tactic (borrowed from Austin Mesh). Keep the tactic; change "KC Mesh" to your name.                         |
| `src/components/FinalCTASection.astro`                       | "See you out there." — voice-check this against your community.                                                              |
| `src/components/Footer.astro`                                | Lineage credits — if you "stole" from KC and others, link us back. The CC-BY-SA requires attribution.                        |
| `src/pages/getting-started.astro`                            | Five steps from zero to your first transmission. Mostly generic; localize the "buying" section if your supply chain differs. |
| `src/pages/host-a-node.astro`                                | Your equivalent of the KC Backbone Initiative. Change the criteria, the place names, the targeted highways.                  |
| `src/pages/steal-this-network.astro`                         | The recursive page. Keep the lineage credits and add your city above ours.                                                   |
| `src/pages/faq.astro`                                        | Most questions are generic. A few mention KC specifically — update those.                                                    |

### 5. Data — `src/data/`

- `src/data/hardware.ts` — the four community-favorite devices. Yours might differ. RAK is popular in solar-heavy places; T-Decks are popular where people walk a lot. Change to match.
- `src/data/networkStatus.ts` — the live-status stats and the node table on `/status`. If you don't have live data yet, lower the numbers and shorten the table. **Don't ship invented numbers** — the whole point of the page is that it reads as proof.

### 6. The coverage map link

`src/components/HeroSection.astro` and the Nav link both point at `map.kansascitymesh.live`. If you're running [MeshMonitor](https://github.com/meshtastic/meshmonitor) (or any other live-status tool), point these at your instance. If you don't have one yet, hide those links until you do — or honest-up the copy ("we don't have a live map yet, here's a snapshot").

## Optional but worth doing

### Update `CLAUDE.md`

Search for "Kansas City," "KC," "I-35," "I-70," and the specific neighborhood names. Replace with your city's equivalents. This file teaches AI assistants how to write in your voice; keep it current.

### Update `README.md`

The CI badge URL, the GitHub clone URL, the "live at" link, the license note pointing at your equivalent `/steal-this-network` page.

### Update analytics events

The site fires GA events for `discord_invite_click`, `hardware_buy_click`, `coverage_map_click`, etc. (see `src/utils/analytics.ts`). The event names are fine to keep; you just need your own GA property to receive them.

### Set up Dependabot

The KC repo has Dependabot enabled via GitHub UI (no `dependabot.yml` checked in). Worth turning on for yours.

### Set up CI

`.github/workflows/ci.yml` runs `npm run check` + `npm run build` on every PR. Already wired; just enable Actions on your fork.

### Protect `main`

In your GitHub repo settings → Branches → require PR + require CI to pass. Catches accidents.

## The voice question

If you read [`CONTRIBUTING.md`](CONTRIBUTING.md) and the voice direction in `CLAUDE.md` and want to keep that exact tone, great — copy it forward. If your community is sharper, drier, more technical, more activist, more anything else, **rewrite the voice direction first** before you start editing pages. Otherwise the site will read like KC Mesh wearing your city's hat, which is worse than just being your city.

For reference on how this site holds itself to its voice, see [`docs/VOICE-AUDIT-2026-05.md`](docs/VOICE-AUDIT-2026-05.md). The anti-pattern catalog is reusable in any voice — wrap-up codas and corporate vocabulary aren't a KC-specific problem.

## What you're inheriting visually

The current design system is:

- **Single-mode dark.** Page background `#1c1f26`, card surface `#2b303b`.
- **Cello (steel blue) + Terracotta (warm red-orange) + Sage (olive-leaning green) + Black Rock (cool gray)** palette. Defined as CSS custom properties in `src/styles/globals.css`.
- **General Sans** body, **Inconsolata** mono (for callsigns, frequencies, version stamps).
- **Tailwind 4 default radii** (4/6/8/12/16 px scale).

You can keep all of this, swap the palette, swap the fonts, or rebuild from scratch. The components are CSS-class-driven, so swapping the palette in `globals.css` rebrands most of the site automatically. The `docs/DESIGN-AUDIT-2026-05.md` document explains why each pattern is the way it is — worth reading before you change things.

## Attribution

Under CC-BY-SA, you must give us credit. The footer on `kansascitymesh.live` does this for Austin Mesh and Cascadia Mesh — copy that pattern. Something like:

> Built on what [Austin Mesh](https://www.austinmesh.org), [Cascadia Mesh](https://cascadiamesh.org), and [KC Mesh](https://kansascitymesh.live) did first.

Linking back from your `/steal-this-network` page (whatever you name it) is the right move.

## Tell us when you ship

Open an issue or ping us in Discord with a link to your site. We list partner meshes on `/steal-this-network` and we'd love to add you. Three mesh networks isn't a movement; thirty is.

## License of your fork

Keep it CC-BY-SA 4.0. The "share-alike" clause requires it — your fork has to be share-alike too. This is by design; the goal is a thicker community of community-mesh sites, not proprietary clones.

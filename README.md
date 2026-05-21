# Kansas City Meshtastic Network

The website for the community-run Meshtastic mesh network in the Kansas City metro. Live at **[kansascitymesh.live](https://kansascitymesh.live)**.

[![CI](https://github.com/jeremyfuksa/kansascitymesh.live/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremyfuksa/kansascitymesh.live/actions/workflows/ci.yml)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/license-CC%20BY--SA%204.0-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-6-BC52EE.svg?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node](https://img.shields.io/badge/node-%3E%3D22-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-F7B93E.svg?logo=prettier&logoColor=white)](https://prettier.io)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-739038.svg)](CONTRIBUTING.md)
[![Discord](https://img.shields.io/badge/Discord-join-5865F2.svg?logo=discord&logoColor=white)](https://discord.gg/yr2QTFSvzN)

This isn't a marketing site for a company. It's the front door to a community of ~200 people running ~60 nodes across Kansas City — recruiting hosts, welcoming beginners, and inviting other cities to fork the whole thing.

## You're here because…

### …you want to fork this for your city

The whole site exists because [Austin Mesh](https://www.austinmesh.org) and [Cascadia Mesh](https://cascadiamesh.org) did it first and we copied them. Now it's your turn.

→ **[FORK-FOR-YOUR-CITY.md](FORK-FOR-YOUR-CITY.md)** has the concrete checklist. The short version:

1. Clone the repo
2. Change four constants in `src/constants/`
3. Swap brand assets in `public/` and `src/assets/`
4. Rewrite the copy in your voice (this is the hard part)
5. Deploy as a static site anywhere

Most cities get to a working site in an afternoon. License is CC-BY-SA 4.0 — attribution required, share-alike, otherwise help yourself.

### …you want to fix or improve something

Most contributions are small: a stale price, a typo, an outdated node count, a hardware tip we should add. None of it requires being a developer.

→ **[CONTRIBUTING.md](CONTRIBUTING.md)** has the details. The two-minute path: open an [issue](https://github.com/jeremyfuksa/kansascitymesh.live/issues/new/choose) or edit a file directly on GitHub. The slower path: clone, edit, PR.

If you'd rather just talk to us, the [Discord](https://discord.gg/yr2QTFSvzN) is where almost everything happens.

### …you want to run the site locally

```bash
git clone https://github.com/jeremyfuksa/kansascitymesh.live
cd kansascitymesh.live
npm install
npm run dev      # → http://localhost:4321
```

The dev server live-reloads on save. Edit any file under `src/`, the browser refreshes.

Before opening a PR:

```bash
npm run format       # Prettier — keeps the diff small
npm run format:check # what CI runs
npm run check        # astro check (TypeScript + Astro types)
npm run build        # production bundle → dist/
```

CI runs the last three on every PR. They all have to pass before merge.

## What's in here

### Tech stack

- **Astro 6** (static) — file-based routing, builds to plain HTML, no client-side framework runtime ships
- **Tailwind CSS 4** via `@tailwindcss/postcss` — design tokens as CSS custom properties in `src/styles/globals.css`
- **`@lucide/astro`** for icons
- **`astro:assets`** for automatic WebP image optimization
- **Two small inline `<script>` blocks** (nav scroll + analytics delegation), ~1 KB total
- **No backend, no database, no auth.** Discord, the live coverage map, and the GitHub repo are external services linked from the page.

### Repository layout

```
src/
├── pages/        One .astro file per route. Astro maps file paths to URLs.
├── layouts/      Shared page shell (Layout.astro): <head>, OG/Twitter meta,
│                 analytics initialization, click delegation.
├── components/   Design-system primitives (InfoCard, FeatureCard, PrimaryButton,
│                 TipBanner, etc.) plus page-specific sections (HeroSection,
│                 NetworkPulse, HostInfrastructureCTA, etc.)
├── data/         hardware.ts — community-favorite devices
│                 networkStatus.ts — live-status block + /status page data
├── constants/    Discord invite, contact email, GA measurement ID
├── styles/       globals.css — Tailwind 4 @import, @theme block, palette,
│                 a few base styles
├── assets/       Product photography, the KC Mesh logo
└── utils/        analytics.ts — trackEvent/trackPageView helpers

public/           Static assets shipped as-is — favicons, OG image, fonts

docs/             Voice + design audits, community growth playbook
```

### Pages on the live site

| URL                   | What's there                                            |
| --------------------- | ------------------------------------------------------- |
| `/`                   | Homepage — hero, live status, hardware, resources, CTAs |
| `/getting-started`    | Five steps from zero to your first transmission         |
| `/host-a-node`        | KC Backbone Initiative recruiting page                  |
| `/hardware`           | Index of the four community-favorite devices            |
| `/hardware/[id]`      | Per-device deep dive (specs, what-we-like, caveats)     |
| `/faq`                | Common questions, native `<details>` accordion          |
| `/status`             | Live network status (stat tiles + node table)           |
| `/log`                | Field-log index                                         |
| `/log/[slug]`         | Individual field-log entries                            |
| `/steal-this-network` | The recursive invitation to other cities                |

## Why this exists

The Meshtastic community has a perfectionism problem. People buy a $60 radio, read forum posts demanding 40-foot towers and ideal antenna polarization, get intimidated, and shelve the node. The KC Mesh thesis is the opposite: **deployed imperfect beats theoretical perfect.** A node in your apartment window beats the node still in the box.

The site reflects that:

- Hardware recommendations sit in the $25–$200 range, not commercial telecom gear
- "15 feet is fine," "indoor sometimes works," "horizontal antennas have trade-offs but they work" — anti-dogma framing throughout
- Copy is welcoming, not technical-by-default
- Honest about gaps. "Most won't see the message live — but they'll see it next time they power back up."

If your community has the same vibe, this template should fit cleanly. If your community is more formal or more technical, you'll need to rewrite the voice — see `FORK-FOR-YOUR-CITY.md` for that conversation.

## Community

- **[Discord](https://discord.gg/yr2QTFSvzN)** — the actual conversation. ~200 people.
- **[Live coverage map](https://map.kansascitymesh.live)** — MeshMonitor, external instance
- **[Meshtastic official](https://meshtastic.org)** — the protocol we use, not the community we are

## Contributing

Code-of-conduct, security disclosure, and contribution guide:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md)
- [FORK-FOR-YOUR-CITY.md](FORK-FOR-YOUR-CITY.md)

[Open an issue](https://github.com/jeremyfuksa/kansascitymesh.live/issues/new/choose) for typos, data updates, bugs, or ideas. The templates ask for the right info up front.

## License

Site content (copy + configuration) under **[CC-BY-SA 4.0](LICENSE)** — attribution required, share-alike. See [`/steal-this-network`](https://kansascitymesh.live/steal-this-network) for the rationale.

## Lineage

Built on what [Austin Mesh](https://www.austinmesh.org) and [Cascadia Mesh](https://cascadiamesh.org) did first. If we've inspired you, please **[steal this network](https://kansascitymesh.live/steal-this-network)**.

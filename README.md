# Kansas City Meshtastic Network

[![CI](https://github.com/jeremyfuksa/kansascitymesh.live/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremyfuksa/kansascitymesh.live/actions/workflows/ci.yml)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](LICENSE)

The website for the community-run Meshtastic mesh network in the Kansas City metro. Live at [kansascitymesh.live](https://kansascitymesh.live). Source under CC-BY-SA 4.0 — fork it for your own city.

## Contributing

We welcome contributions. The two things to read first:

- **[CONTRIBUTING.md](CONTRIBUTING.md)** — how to fix a typo, update data, or open a PR. The fast path takes about 30 seconds.
- **[FORK-FOR-YOUR-CITY.md](FORK-FOR-YOUR-CITY.md)** — concrete checklist for standing up your own city's mesh site from this template.

Plus: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) · [SECURITY.md](SECURITY.md)

## Tech stack

- **Astro 6 (static)** — file-based routing under `src/pages/`. The site builds to fully static HTML; no client-side framework runtime.
- **Tailwind CSS 4 via `@tailwindcss/postcss`** — design tokens defined as CSS custom properties in `src/styles/globals.css`; theme overrides in the `@theme` block of that same file.
- **`@lucide/astro`** — icons.
- **`astro:assets`** — automatic WebP optimization for product photos and the coverage-map screenshot.
- **Two tiny inline `<script>` blocks** for the nav scroll listener and analytics event delegation. About 1 KB total. No framework runtime ships.
- **No backend.** The site is static. Discord, the live coverage map, and the GitHub repo are external services linked from the page.

## Project structure

- `src/pages/` — One `.astro` file per route. Astro maps file paths to URLs automatically.
- `src/layouts/Layout.astro` — Shared page shell. Per-page props for title, description, and canonical path. Owns the `<head>` block (OG/Twitter meta, canonical URL, Google Analytics initialization) and a delegated click listener for `[data-track-event]` analytics.
- `src/components/` — Astro components. Design-system primitives (`InfoCard`, `FeatureCard`, `AudienceRow`, `TipBanner`, `MessageBanner`, `PrimaryButton`, `SecondaryButton`, `DiscordButton`, `PulsingDot`) and page-specific sections (`HeroSection`, `HardwareSection`, `NetworkPulse`, `ResourcesSection`, `HostInfrastructureCTA`, `DroneFlyCTA`, `FinalCTASection`, `Nav`, `Footer`, `HardwareCard`).
- `src/data/` — Shared data (`hardware.ts` is the single source for the four community-favorite Meshtastic devices; `networkStatus.ts` is the live-status block plus the `/status` page).
- `src/constants/` — Shared constants (Discord invite URL, contact email, GA measurement ID).
- `src/styles/globals.css` — Tailwind 4 `@import` + `@theme` block (font tokens) + the color palette as CSS custom properties + a few base styles.
- `src/assets/` — Product photography and the KC Mesh logo. Imported by components via Astro's image pipeline.
- `src/utils/analytics.ts` — `trackEvent` and `trackPageView` helpers. Components opt into analytics by setting `data-track-event` / `data-track-label` attributes; the Layout's delegated listener forwards clicks to `trackEvent`.
- `docs/` — Voice and design audit documents, community growth playbook, host-a-node draft.

## Getting started

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # production bundle to dist/
npm run preview      # serve the production build locally
npm run check        # astro check (TypeScript + Astro type validation)
npm run format       # prettier --write .
npm run format:check # prettier --check . (run in CI)
```

## License

Site content (copy and configuration) under [CC-BY-SA 4.0](LICENSE) — share-alike. Take whatever helps for your city. See [`/steal-this-network`](https://kansascitymesh.live/steal-this-network) for the rationale.

## Lineage

Built on what [Austin Mesh](https://www.austinmesh.org) and [Cascadia Mesh](https://cascadiamesh.org) did first. If we've inspired you, please [steal this network](https://kansascitymesh.live/steal-this-network).

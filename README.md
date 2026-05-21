# Kansas City Meshtastic Network

[![CI](https://github.com/jeremyfuksa/kansascitymesh.live/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremyfuksa/kansascitymesh.live/actions/workflows/ci.yml)

The website for the community-run Meshtastic mesh network in the Kansas City metro. Live at [kansascitymesh.live](https://kansascitymesh.live). Source under CC-BY-SA 4.0 — fork it for your own city.

## Tech stack

- **Astro 5 (static)** — file-based routing under `src/pages/`. The site builds to fully static HTML; no client-side framework runtime.
- **Tailwind CSS via `@astrojs/tailwind`** — design tokens defined as CSS custom properties in `src/styles/globals.css`.
- **`@lucide/astro`** — icons.
- **`astro:assets`** — automatic WebP optimization for product photos and the coverage-map screenshot.
- **Two tiny inline `<script>` blocks** for the nav scroll listener and analytics event delegation. About 1 KB total. No framework runtime ships.
- **No backend.** The site is static. Discord, the live coverage map, and the GitHub repo are external services linked from the page.

## Project structure

- `src/pages/` — One `.astro` file per route. Astro maps file paths to URLs automatically.
- `src/layouts/Layout.astro` — Shared page shell. Per-page props for title, description, and canonical path. Owns the `<head>` block (OG/Twitter meta, canonical URL, Google Analytics initialization) and a delegated click listener for `[data-track-event]` analytics.
- `src/components/` — Astro components. Design-system primitives (`InfoCard`, `FeatureCard`, `AudienceRow`, `TipBanner`, `MessageBanner`, `PrimaryButton`, `SecondaryButton`, `DiscordButton`, `PulsingDot`) and page-specific sections (`HeroSection`, `HardwareSection`, `ResourcesSection`, `HostInfrastructureCTA`, `DroneFlyCTA`, `FinalCTASection`, `Nav`, `Footer`, `HardwareCard`).
- `src/data/` — Shared data (`hardware.ts` is the single source for the four community-favorite Meshtastic devices).
- `src/constants/` — Shared constants (Discord invite URL, contact email, GA measurement ID).
- `src/styles/globals.css` — Tailwind directives plus the color palette and shared utilities as CSS custom properties.
- `src/assets/` — Product photography and the KC Mesh logo. Imported by components via Astro's image pipeline.
- `src/utils/analytics.ts` — `trackEvent` and `trackPageView` helpers. Components opt into analytics by setting `data-track-event` / `data-track-label` attributes; the Layout's delegated listener forwards clicks to `trackEvent`.
- `docs/` — Voice and design audit documents, community growth playbook, host-a-node draft.

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production bundle to dist/
npm run preview  # serve the production build locally
npm run check    # astro check (TypeScript + Astro type validation)
```

## License

Site content (copy and configuration) under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — share-alike. Take whatever helps for your city. See [`/steal-this-network`](https://kansascitymesh.live/steal-this-network) for the rationale.

## Lineage

Built on what [Austin Mesh](https://www.austinmesh.org) and [Cascadia Mesh](https://cascadiamesh.org) did first. If we've inspired you, please [steal this network](https://kansascitymesh.live/steal-this-network).

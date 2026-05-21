# Kansas City Meshtastic Network

The website for the community-run Meshtastic mesh network in the Kansas City metro. Live at [kansascitymesh.live](https://kansascitymesh.live). Source under CC-BY-SA 4.0 — fork it for your own city.

## Tech stack

- **Vite + React (TypeScript)** — entry in `src/main.tsx`.
- **Tailwind CSS** — utility classes; design tokens defined as CSS custom properties in `src/styles/globals.css`.
- **lucide-react** — icons.
- **No backend.** The site is static. Discord, the live coverage map, and the GitHub repo are external services linked from the page.

## Project structure

- `src/components/` — React components. Page-level components (`HomePage`, `GetStartedPage`, `HostANodePage`, `StealThisNetworkPage`) and the design-system primitives (`InfoCard`, `FeatureCard`, `PrimaryButton`, `SecondaryButton`, `DiscordButton`, `TipBanner`, `MessageBanner`, `AudienceRow`).
- `src/data/` — Shared data (`hardware.ts` is the single source for the four community-favorite Meshtastic devices).
- `src/constants/` — Shared constants (Discord invite URL, contact email, analytics IDs).
- `src/styles/globals.css` — Tailwind directives plus the color palette and shared utilities as CSS custom properties.
- `src/assets/` — Product photography and the KC Mesh logo.
- `docs/` — Voice and design audit documents, community growth playbook, host-a-node draft.
- `index.html`, `getting-started.html`, `host-a-node.html`, `steal-this-network.html` — One HTML entry per route. Each boots the same React bundle; the App component reads `window.location.pathname` and renders the matching page.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle to dist/
npm run preview  # serve the production build locally
npm run check    # tsc --noEmit
```

## Routing

Routes are mapped by hand in `src/App.tsx` against `window.location.pathname`. There is no router library — each path maps to one top-level page component, and `pushState` handles in-app navigation. Direct loads of a path require the host to serve the matching HTML file (or fall back to `index.html` — both work because each HTML entry boots the same bundle and the path-routing happens in JS).

## License

Site content (copy and configuration) under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — share-alike. Take whatever helps for your city. See [`/steal-this-network`](https://kansascitymesh.live/steal-this-network) for the rationale.

## Lineage

Built on what [Austin Mesh](https://www.austinmesh.org) and [Cascadia Mesh](https://cascadiamesh.org) did first. If we've inspired you, please [steal this network](https://kansascitymesh.live/steal-this-network).

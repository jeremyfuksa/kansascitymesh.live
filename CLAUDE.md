# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project Overview

Kansas City Meshtastic Network website — a community-run mesh networking project in the KC metro. A working backbone running up and down the I-35 corridor, and an ongoing recruiting effort for hosted infrastructure to round out the metro and reach outlier nodes in Manhattan, Columbia, Lawrence, and Topeka. Current node and Discord counts are live at `/status`, hydrated from `/api/stats.json` — check there before quoting numbers (see Network Architecture Context for a dated snapshot).

The project was originally seeded by one person (Jeremy Fuksa) who deployed the first router and documented the process, but the site now speaks for the broader community. The voice direction below makes this explicit.

**Current Status**: Active development. Voice and design audits live in `docs/` — see `VOICE-AUDIT-2026-05.md` and `DESIGN-AUDIT-2026-05.md` for the most recent passes.

**Critical Voice Direction**: Collective first person — the site speaks as the KC Mesh community of 200+. "We're building..." not "I'm building..." and not "The network provides...". The community is the implied speaker; specific people get named only when accuracy requires it. Honest about gaps and the learning curve. Welcoming to everyday people. Combat perfectionism that prevents deployment.

**Voice audit reference**: Site copy is held to the same diagnostic standards as the `jeremy-voice` skill's anti-pattern catalog (no wrap-up codas, no "X, not Y" rhythm tics, no "actually/genuinely/absolutely" as superiority markers, no graduation-speech sentences, no corporate-adjacent vocabulary). Site copy is not personal-essay register, but it passes the same checks.

## Core Project Philosophy

**Anti-Dogma Approach**: Combat mesh networking perfectionism that prevents deployment:

- Refute "must be perfect or don't do it" mentality
- Emphasize "deployed imperfect beats theoretical perfect"
- Provide practical prosumer solutions ($25-200 hardware range)
- Focus on hobbyist-achievable deployments (weekend projects, not professional-grade)

**Prosumer/Hobbyist Scope Throughout**:

- Equipment: $25-200 range (consumer-grade)
- Installations: DIY backyard-achievable
- Performance: "Good enough for mission" not commercial-grade
- Tone: Enthusiast community, not telecommunications company

**Critical Anti-Dogma Content to Incorporate**:

- Elevation: 15 feet functional vs "need 40-foot tower" dogma
- Indoor deployment: "Test your building" vs "indoor doesn't work"
- Antenna polarization: Horizontal works with trade-offs vs "must be vertical"
- Solar sizing: 10W adequate vs fear-mongering 50W systems
- HOA restrictions: Stealth integration possible vs "HOAs make it impossible"

## Design System

The canonical design and voice rules live in the repo-local **`kc-mesh-design` skill** — `.claude/skills/kc-mesh-design/SKILL.md` plus `references/design-system.md` and `references/voice.md`. That skill owns the palette tables, the component vocabulary, and the decision rules. Don't duplicate them here; the two documents will drift (they already did once).

The short version, for orientation only:

- **Single-mode dark.** Page `var(--neutral-950)`, cards `var(--neutral-900)`. The palette lives as CSS custom properties in `src/styles/globals.css` — use the named tokens (e.g. `var(--primary-600)`), not raw hex values.
- **Two cards, four buttons, two banners — no third of anything.** `InfoCard` + `FeatureCard`; `PrimaryButton` + `DiscordButton` + `SecondaryButton` + plain text links; `TipBanner` + `MessageBanner`. When you think you need a new surface, one of the existing ones almost always covers it.
- **Data wears mono (Inconsolata). Prose wears sans (General Sans).**
- Mobile-first responsive (field use on phones priority); narrative-driven content, not bullet-heavy.

## Site Structure (as implemented)

Eleven routes, file-based routing under `src/pages/`:

- **`/` (`index.astro`)** — Home. HeroSection (intro + live map preview) → NetworkPulse (live activity strip) → HardwareSection → ResourcesSection → HostInfrastructureCTA → DroneFlyCTA → FinalCTASection → Footer.
- **`/getting-started`** — Five-step onboarding. Choose hardware → buy hardware → flash firmware → configure node → say hello on the mesh.
- **`/hardware` (`hardware/index.astro`)** — The four devices the KC community actually runs ($35–$90, field-tested), driven by `src/data/hardware.ts`.
- **`/hardware/[id]`** — Per-device detail pages, one static route per entry in `src/data/hardware.ts`.
- **`/host-a-node`** — The KC Backbone Initiative recruiting page. Why it matters → criteria → audience targeting (AudienceRow) → what we provide back → success story → contact.
- **`/coverage-map`** — Help-wanted coverage map. Embeds the live MeshMonitor map and lists the high-value spots where we'd most love a new node (`src/data/coverage-sites.json`).
- **`/status`** — Live network status: active node counts, total registered, hardware breakdown, backbone table — hydrated from `/api/stats.json` (see Live stats below).
- **`/faq`** — The questions we actually get in Discord: licensing, privacy, hosting, hardware.
- **`/log` (`log/index.astro`)** — Field log index. Deployment stories and lessons learned, written by the people doing the work.
- **`/log/bonner-tower`** — First field log entry: the Bonner Springs water tower deployment that closed the I-70 hop chain on the west side.
- **`/steal-this-network`** — Open invitation to other cities. CC-BY-SA framing, lineage credit to Austin Mesh and Cascadia Mesh, partner-mesh list, operational tips for starting a new community mesh.

External destinations linked throughout:

- **`map.kansascitymesh.live`** — Live coverage map (MeshMonitor). External app, not part of this repo.
- **Discord** — Real-time community. Invite link in `src/constants/discord.ts`.
- **GitHub repo** — `github.com/jeremyfuksa/kansascitymesh.live`. Public, CC-BY-SA 4.0.

## Target Audiences

1. Complete beginners (no radio experience)
2. Ham radio operators (licensed amateurs with RF knowledge)
3. Repeater owners (infrastructure hosts with towers/elevated sites)
4. HOA-restricted homeowners (need stealth deployment solutions)
5. Emergency communications community (ARES/RACES)
6. Other cities seeding their own community meshes (the audience for /steal-this-network)

## Network Architecture Context

The site currently describes a real, in-progress backbone — not a planning exercise:

- Node and Discord counts are live from `/api/stats.json` (rendered on `/status` and the homepage NetworkPulse) — check there, don't hardcode. One dated snapshot for orientation, as of July 2026: ~65 nodes active in the last 7 days, ~205 in the last 30, ~900 total in MeshMonitor's database, ~225 in Discord.
- A working I-35 spine from downtown through Westport, Overland Park, and the southern suburbs
- Active recruiting for hosted infrastructure at the metro edges (Bonner Springs, Independence, Blue Springs)
- Active recruiting along the I-70 hop chain east and west to reach existing outlier nodes in Manhattan, KS and Columbia, MO

The deprecated "Four-Router Backbone Strategy" (Router 1 East / Router 2 West / Router 3 North / Router 4 South) was an early planning model. The current ask is broader: any host along the named highways helps, and the priorities are explicitly named on the Host a Node page.

## Content Guidelines

**Tone and Voice**:

- Welcoming and inclusive (all experience levels)
- Enthusiast/hobbyist community feel
- Professional but not corporate
- Educational without condescension
- Anti-perfectionism, pro-deployment
- Collective first person (see Critical Voice Direction at top of file)

**Scope Discipline**:

- ALWAYS maintain prosumer/hobbyist expectations
- Equipment recommendations: $25–200 range
- Timeframes: Weekend projects, not professional deployments
- Performance: Realistic expectations, not commercial-grade promises
- Avoid feature creep into commercial/professional territory

**SEO Strategy**:

- Primary: "Kansas City mesh network", "Meshtastic Kansas City"
- Audience-specific: "Meshtastic for ham radio", "HOA-friendly mesh deployment"
- Geographic: "Johnson County Meshtastic", "west Kansas City mesh coverage"

## Technical Stack (as implemented)

- **Astro 6 (static)** — `astro.config.mjs` at the project root, no integrations. Pages live in `src/pages/`, each a `.astro` file that maps to a route. The site builds to fully static HTML with no client-side framework runtime.
- **Layout component** — `src/layouts/Layout.astro` wraps every page. Owns the `<head>` block (per-page title/description, OG/Twitter meta, canonical URL, GA initialization) and renders the shared body shell.
- **Tailwind CSS 4 via `@tailwindcss/postcss`** — wired up in `postcss.config.cjs`, not an Astro integration (`@astrojs/tailwind` is gone). `src/styles/globals.css` starts with `@import 'tailwindcss'`, defines the palette as CSS custom properties, and carries the theme overrides in `@theme { }`. It remains the source of truth for base styles.
- **`@lucide/astro`** — Iconography, native Astro components.
- **`astro:assets`** — Image optimization for hardware photos and the meshmonitor screenshot. Static imports type as `ImageMetadata`; the `<Image>` component emits WebP automatically.
- **Client interactivity** — Three small scripts. (1) The Layout has an event-delegation listener for `[data-track-event]` attributes that forwards clicks to `trackEvent()`. (2) Nav.astro has a scroll-listener script that toggles the nav background on the home page only. (3) The Layout imports `src/utils/liveStats.ts`, which hydrates live network numbers on page load (see Live stats below).
- **No client-side framework runtime** — No React, no Vue, no Svelte. The only JS shipped is the three scripts above plus the external Google Analytics loader.
- **Static site, one live endpoint** — The pages are static and there is no application server. The Discord, the coverage map, and the GitHub repo are external. The one dynamic piece is `/api/stats.json`, a file regenerated on the production droplet every five minutes (see Live stats below).

**Live stats** (the one moving part):

- `src/utils/liveStats.ts` (~530 lines) runs on every page via the Layout. It fetches `/api/stats.json` and hydrates four things: `[data-live-stat]` text swaps, hardware lists (`[data-live-hardware]`), a hardware donut chart (`[data-live-hardware-chart]`), and the backbone table (`tbody[data-live-backbone]`). If the fetch fails, the build-time placeholders stay and the page still reads fine.
- `/api/stats.json` is generated by `deploy/server/generate-mesh-stats.py`, which runs on the droplet every 5 minutes via cron. It pulls the MeshMonitor API (`map.kansascitymesh.live/api/nodes` + `/api/stats`) and the Discord guild API, and atomically writes one combined blob. Details in [deploy/README.md](deploy/README.md).
- `src/data/networkStatus.ts` holds the placeholder activity rows that NetworkPulse renders at build time; the live hydration replaces them.

**Project conventions**:

- Astro components live in `src/components/`. Pages in `src/pages/`. Layout in `src/layouts/`.
- Shared data lives in `src/data/` (hardware list, network-status placeholder rows, coverage-map sites) and `src/constants/` (Discord invite, contact email, GA measurement ID).
- Analytics events fire via `src/utils/analytics.ts` (`trackEvent`, `trackPageView`). Components opt in by setting `data-track-event` and optionally `data-track-label` attributes; the Layout's delegated listener calls `trackEvent` on click. Specialized buttons (PrimaryButton, SecondaryButton, FeatureCard, DiscordButton) accept `trackEvent`/`trackLabel` props that forward to these attributes.
- Voice and design audits are kept in `docs/`. Major changes get an audit doc.

## Deploy and hosting

Merging to `main` deploys the site — treat merges as production releases.

- `.github/workflows/deploy.yml` builds on every push to main (`npm ci` → `format:check` → `check` → `build`), tars `dist/`, and streams it over SSH to the DigitalOcean droplet. The deploy key is pinned to a forced command (`deploy-kcmesh.sh`) that atomically swaps the new dist behind the `mesh-web` nginx container, Traefik in front. The workflow then smoke-tests `/`, `/faq/`, and `/api/stats.json`.
- `.github/workflows/ci.yml` runs the same format/check/build gauntlet on every PR.
- The server-side scripts (`deploy-kcmesh.sh`, `generate-mesh-stats.py`) live in `deploy/server/` as the source of truth and get copied to the droplet by hand when they change.
- Full architecture, secrets, deploy-key rotation, and the manual-deploy fallback are documented in [deploy/README.md](deploy/README.md) — don't duplicate that here.

## Working in this repo

- Run `npm run check` before committing — `astro check` must pass.
- Run `npm run format:check` before committing — CI fails the pipeline on the Prettier format check. `npm run format` fixes what it flags.
- Run `npm run build` to verify the production build is clean.
- When changing copy, check the work against `docs/VOICE-AUDIT-2026-05.md` and the `jeremy-voice` skill's anti-pattern catalog.
- When changing visual treatment, use the canonical components from the Design System section. Don't introduce a third card style or fourth button pattern without a real reason.
- **Bump the version in the PR that ships the change.** Loose semver — patch for copy/fact/small fixes, minor for new sections/features/live-data work, major only for full overhauls. Update `package.json` and run `npm install --package-lock-only` to keep the lock in sync. Footer reads `pkg.version` and updates on deploy. Full rules in [CONTRIBUTING.md](CONTRIBUTING.md#versioning).

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project Overview

Kansas City Meshtastic Network website — a community-run mesh networking project in the KC metro. About 60 active nodes today (130 total registered, 200+ in Discord), a working backbone running up and down the I-35 corridor, and an ongoing recruiting effort for hosted infrastructure to round out the metro and reach outlier nodes in Manhattan, Columbia, Lawrence, and Topeka.

The project was originally seeded by one person (Jeremy Fuksa) who deployed the first router and documented the process, but the site now speaks for the broader community. The voice direction below makes this explicit.

**Current Status**: Active development. Voice and design audits live in `docs/` — see `VOICE-AUDIT-2026-05.md` and `DESIGN-AUDIT-2026-05.md` for the most recent passes. The site is being prepared for a complete design system overhaul by Claude Design.

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

The implementation is **single-mode dark**, not the dual-mode warm palette originally specced. The colors live as CSS custom properties in `src/styles/globals.css`. Use the named tokens (e.g. `var(--primary-600)`), not raw hex values.

**Palette tokens** (each color has 50/100/200/.../950 progression in `globals.css`):

- `--primary-*` — **Cello** (desaturated steel blue, `#4c627d` at -600). Primary CTAs, brand backgrounds, link color when not on a dark surface.
- `--secondary-*` — **Terracotta** (warm red-orange, `#a8654f` at -600). Secondary accents, warm highlights.
- `--neutral-*` — **Black Rock** (cool dark gray, `#2b303b` at -900 for cards, `#1c1f26` at -950 for page backgrounds). Surface system.
- `--success-*` — **Sage** (`#8fb14b` at -500, `#739038` at -600). Sage-green CTAs ("Become a host"), success/healthy states.
- `--warning-*` — **Golden Amber** (`#f9c574` at -500). Caution, badges.
- `--danger-*` — **Flamingo** (`#e75351` at -500). Reserved; not yet used in UI copy.
- `--info-*` — **Blue Calx** (`#b8c5d9` at -500). Information accents, drone-fly callout color, link color on dark backgrounds (use -300 or -400 for legible text).
- `--meshtastic-green` — `#10b981` (emerald). **Intentionally outside the sage scale** — the brighter green that says "live" on `<PulsingDot>` indicators. Aligns with Meshtastic project brand color.

**Surface treatments** (the visual hierarchy):

- **`<InfoCard>`** — solid `bg-[var(--neutral-900)]` with subtle white border. Reads as "information to absorb." Used for in-content lists.
- **`<FeatureCard>`** — `bg-white/5 backdrop-blur-xl` glass with shadow. Reads as "focal element." Used for hero cards, homepage CTAs, hardware showcase.
- **`<TipBanner>`** — sage-green gradient highlight, Info icon. Reads as "pay attention to this."
- **`<MessageBanner>`** — slate-gradient narrative block. Reads as "storytelling moment."
- **`<AudienceRow>`** — horizontal row with a left-edge gradient accent stripe. Reads as "this is for you, specifically." Used for the "Who should consider hosting" section.

**Button hierarchy**:

- **`<PrimaryButton>`** — sage-green, black text, scale-up hover. The single most-important action on a page.
- **`<DiscordButton>`** — Discord brand color. Sizes: `small` (nav), `default` (in-content), `large` (hero closer).
- **`<SecondaryButton>`** — outline pill. Supporting actions ("View Live Map," external partner links).

**Text-opacity scale** on dark surfaces:

- `text-white` — heading text
- `text-white/70` — body prose, nav links (canonical body color)
- `text-white/50` — muted secondary, copyright, micro-text
- `text-white/30` — version stamps and similar "fades into background" signals
- `text-white/80` — reserved for tip-banner body emphasis only

**Design Principles**:

- Mobile-first responsive (field use on phones priority)
- High-end professional aesthetic with local KC identity (rendered through the Cello/Terracotta/Sage palette, not literal KC sports colors)
- Single-mode dark (light mode tokens exist in `globals.css` but are unused)
- Narrative-driven content (not bullet-heavy)
- Clear information hierarchy for scanning

## Site Structure (as implemented)

Four pages, routed by `src/App.tsx` based on `window.location.pathname`:

- **`/`** — HomePage. Hero (intro + live map preview) → Hardware showcase grid → Resources cards → HostInfrastructureCTA → DroneFlyCTA → FinalCTASection → Footer.
- **`/getting-started`** — Five-step onboarding. Choose hardware → buy hardware → flash firmware → configure node → say hello on the mesh.
- **`/host-a-node`** — The KC Backbone Initiative recruiting page. Why it matters → criteria → audience targeting (AudienceRow) → what we provide back → success story → contact.
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

The site currently describes a real, in-progress backbone — not a planning exercise. As of May 2026:

- ~60 active nodes, ~130 total registered, 200+ in Discord
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

- **Vite + React (TypeScript)** — entry in `src/main.tsx`. Routing is hand-rolled in `App.tsx` via `window.location.pathname`; each route maps to one of four top-level page components.
- **Multi-entry HTML** — Each route has a matching HTML file at the project root (`index.html`, `getting-started.html`, `host-a-node.html`, `steal-this-network.html`). The host (deploy target) handles path rewrites; direct loads of a path serve the matching HTML which boots the same React bundle.
- **Tailwind CSS** — `src/styles/globals.css` defines the palette as CSS custom properties; Tailwind utility classes do the rest.
- **lucide-react** — Iconography.
- **No backend** — The Discord, the coverage map, and the GitHub repo are external. The site is static.

**Project conventions**:

- Components live in `src/components/`. The canonical design components are documented in the Design System section.
- Shared data lives in `src/data/` (hardware list) and `src/constants/` (Discord invite, contact email).
- Analytics events fire via `src/utils/analytics.ts` (`trackEvent`, `trackPageView`).
- Voice and design audits are kept in `docs/`. Major changes get an audit doc.

## Working in this repo

- Run `npm run check` before committing — typecheck must pass.
- Run `npm run build` to verify Vite production build is clean.
- When changing copy, check the work against `docs/VOICE-AUDIT-2026-05.md` and the `jeremy-voice` skill's anti-pattern catalog.
- When changing visual treatment, use the canonical components from the Design System section. Don't introduce a third card style or fourth button pattern without a real reason.

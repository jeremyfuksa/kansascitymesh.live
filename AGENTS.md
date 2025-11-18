# Agent Guidelines

This document keeps every contributor aligned with the vetted Figma layout and explains the expectations for expanding it. When you need broader context on tone, deployment, or field log energy, refer to the strategy docs referenced in `README.md`.

## Repo Snapshot

- **Entry point:** `index.html` loads Vite w/ `src/main.tsx`. The React tree now hosts the design and immediately renders the two vetted screens.
- **React source:** `src/` mirrors the exported design. `App.tsx` toggles between the `HomePage` (Nav + Hero + Hardware + Final CTA + Footer) and the `GetStartedPage` guide; every section, heading, and CTA comes from the Figma content.
- **Styling:** `src/styles/globals.css` carries the Campfire palette variables, gradient utilities, and Tailwind rules that make the visuals consistent. Tailwind/PostCSS run through `tailwind.config.cjs` / `postcss.config.cjs`.
- **Assets:** `figma:asset/*` imports resolve to `src/assets/figma/` via the alias defined in `vite.config.ts`. Those PNGs are placeholders for the vetted imagery—swap them only with the officially exported versions and keep the same file names so the components don’t break.
- **Scripts:** Use `npm run dev`, `npm run build`, `npm run preview`, and `npm run check` (tsc). The `package.json` documents the required dependencies (React, Lucide, Tailwind, Vite).

## Voice & Content Guardrails

- Maintain first-person narrative—Jeremy is “I,” the KC Mesh community is “we.” Avoid corporate-speak.
- Lean into anti-dogma statements about real deployments, modest hardware ($25‑$200), stealth installs, and strange urban test cases (apartment/indoor, solar, 15–20 ft elevation wins). Each paragraph should read like a log entry, not marketing copy.
- Keep the CTA anchor text action-oriented (“Join Discord,” “View Live Map,” “Get Started”) and keep Discord/map/get-started links prominent.
- Shadow the “field log” tone even inside the new React components. If you edit `HomePage` or `GetStartedPage`, double-check that each paragraph still sounds like a live note with hands-on instructions or observations.

## Implementation Notes

- The React tree is intentionally minimal to avoid a router—`HomePage` and `GetStartedPage` are built as semantic `<section>` stacks that exactly reflect the Figma copy. If a new section is required, add it inline and describe the change in the docs.
- Keep the CSS variables in `globals.css` unchanged unless you are updating the palette. Add new utilities only if they’re reused (the file already defines most backdrop/blur, gradient, and focus styles).
- `Nav`/`Footer` trigger the page toggle via callbacks. Keep the logic that switches from Home ↔ Get Started intact so both screens stay in sync with the vetted copy.
- When you add images or icons, prefer the existing inline SVGs or the placeholder PNGs in `src/assets/figma/`. If a link opens externally (Discord, map, app stores), always add `rel="noopener noreferrer"` and use the established anchor labels.
- The `figma:asset/*` alias in `vite.config.ts` ensures the components keep their original import paths. If you replace an asset, drop the new PNG into `src/assets/figma/` and keep the same hash-named file.

## Outstanding Work (Prioritized)

1. Keep the copy exactly as it appears now. Only accept updates that come through the official strategy docs referenced in `README.md`.
2. Replace the placeholder map/hardware screenshots once the final exports are ready; we keep using the `figma:asset` naming so the code doesn’t need to change.
3. Expand the coverage/status story with static summaries or cards until the live data pipeline is rebuilt (can live inside the existing sections).
4. Flesh out the onboarding flow inside `GetStartedPage` (if additional CTA cards, steps, or statuses are required, add them inline).
5. Keep the `/getting-started` route in sync with the Home page so both entry points stay identical (the landing page now ships two HTML shells).
6. Document any manual procedures in `/docs` immediately after they’re added so future agents know how to reproduce work.

## Collaboration Expectations

- Update this file and `README.md` whenever you make meaningful changes to the pages, tooling, or asset strategy so future agents understand how the static build evolved.
- Keep the Figma-approved copy locked down. If a new copy piece is required, leave a `TODO` with your initials in the component and note the change in the docs before editing the JSX.
- Run the manual viewport sanity check (mobile, tablet, desktop) before considering any work complete—there is no automated visual regression suite.

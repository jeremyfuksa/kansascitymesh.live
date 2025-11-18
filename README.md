# Kansas City Meshtastic Network

The vetted Figma design now lives as a compact React/Vite SPA inside `src/`, and the top-level `index.html` + shared styles/behavior are what ship to production. The UI mirrors the original hero/hardware/final CTA layout and the dedicated get-started guide so the experience plays out exactly as the design mandates.

## Tech stack

- **Vite + React (TypeScript)** — entry point in `src/main.tsx`, minimal render tree, two logical pages (`HomePage`, `GetStartedPage`) swapped through component state.
- **Tailwind CSS** — `src/styles/globals.css` defines the color palette, gradients, and shared utilities; the build runs through `tailwindcss` + `postcss`.
- **Simple assets** — `figma:asset/*` imports are aliased to `src/assets/figma/` so the components keep their original references, and a handful of placeholder PNGs match the approved layout until the real Figma exports are swapped in.

## Project structure

- `src/` – React source from the Figma export, organized by sections; `styles/globals.css` holds the shared theming, and `assets/figma/` stores the image stand-ins.
- `public/` – Static files served directly (favicon, future downloads, etc.).
- `index.html` + `getting-started.html` – Vite entry shells for the home and onboarding screens. Each loads the same React bundle but the `/getting-started` route loads the vetted Flow page on load.
- `package.json` – Scripts for `dev`, `build`, `preview`, and `check`, plus the dependencies needed to run the React + Tailwind toolchain.
- `vite.config.ts` – React plugin plus an alias so `figma:asset` resolves to the local placeholders.
- `tsconfig.json` / `tsconfig.node.json` – TypeScript settings; `src/components/ui` is excluded because those helpers are unused in the current build.
- `tailwind.config.cjs` + `postcss.config.cjs` – Tailwind/PostCSS pipeline configured for the `src/**/*.{ts,tsx}` files.

## Getting started

```bash
npm install        # installs React/Vite/Tailwind with the versions listed in package.json
npm run dev        # run the dev server (Vite) and open http://localhost:5173
npm run build      # create the production bundle with Vite
npm run preview    # preview the production build locally
npm run check      # run tsc --noEmit against tsconfig.json
```

Tailwind/JIT will process the `globals.css` file and the component classes automatically, so there is no additional build step beyond `npm run build`.

## Notes

- The `App` component toggles between `HomePage` and `GetStartedPage` to keep the two vetted screens accessible without introducing routing.
- `src/assets/figma/` contains placeholder PNGs that are resolved via the alias defined in `vite.config.ts`. Swap them for the true Figma exports (or a CDN link) and keep the file names intact to avoid touching the component imports.
- Add new UI patterns directly in `HomePage`, `GetStartedPage`, or their child sections; avoid rearranging the copy unless the strategy docs explicitly call for it.
- The `public/favicon.svg` is a simple KC-branded circle used for the site icon; replace it only if the new design requires a different asset.

## Deployment

The output from `npm run build` lives under `dist/`. Deploy those static files directly to the host of your choice. No additional server or bundler setup is required beyond the above dependencies.

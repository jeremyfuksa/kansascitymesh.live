# Kansas City Meshtastic Site Implementation

The repository root contains the Astro + Tailwind implementation scaffold for kansascitymesh.live. The goal is to translate the planning assets under `/docs` and `CLAUDE.md` into production-ready pages while preserving the project’s prosumer scope.

## Project Structure

```
./
├── astro.config.mjs           # Astro config with Tailwind Vite plugin
├── package.json               # npm scripts (dev, build, preview)
├── tailwind.config.mjs        # Content glob + container sizing
├── tsconfig.json              # TypeScript + JSX settings
├── src/
│   ├── components/
│   │   ├── PagePlaceholder.astro  # Shared scaffold for unfinished pages
│   │   └── ThemeToggle.astro      # Dark/light toggle (Font Awesome icons)
│   ├── layouts/
│   │   └── Layout.astro           # Global layout, responsive shell, navigation
│   ├── pages/                     # Routing aligned with docs/01-SITE-ARCHITECTURE.md
│   └── styles/global.css          # Tailwind import + color tokens (light/dark)
├── public/
│   └── favicon.svg
├── dist/                          # Build output (gitignored)
├── node_modules/                  # Dependencies (gitignored)
└── .vscode/                       # Recommended editor extensions
```

Every top-level route from the site architecture has a placeholder page listing the content requirements and source document references. Replace each `PagePlaceholder` instance with production copy and components as content becomes available.

## Implemented Features

- Base Astro project with Tailwind v4 configured for class-based dark mode.
- Global layout including responsive container, sticky header, footer, and content framing.
- Accessible navigation with Font Awesome icons and an off-canvas mobile drawer (focus trapping, overlay, ESC close).
- Theme toggle that respects saved preference, system preference, and synchronises icons (`fa-sun` / `fa-moon`).
- Color palette, shadows, and typography tokens expressed as CSS variables with light/dark overrides.
- Homepage hero scaffold showing the intended two-column layout, CTA buttons, and implementation checklist.
- Route placeholders for every page defined in the site architecture, each documenting required tasks and source docs.
- Font Awesome kit (02023a5bb5) loaded globally.

## Outstanding Work Before Feature Complete

- Populate all pages with the final copy from README sections 4.1–4.10, replacing placeholders.
- Build the homepage coordination banner, live network stats widget, and recent updates feed.
- Implement the Join flow UI (stepper, checklists, troubleshooting) with proper accessibility.
- Create the Coverage Map using Leaflet, loading GeoJSON/static JSON produced by the automation pipeline.
- Wire data-driven components (network status metrics, growth timeline, dashboard cards) to the planned JSON updates.
- Add the PHP-backed contact form and ensure Nginx/OCI integration instructions are followed (docs/07-OCI-NGINX-DEPLOYMENT.md).
- Integrate Plausible analytics and custom conversion events for forms, hardware clicks, etc.
- Implement audience-specific guide layouts with media, CTAs, and responsive tables/accordions.
- Add automated linting/tests (markdownlint, Astro `check`, component/Playwright tests) and document the commands.
- Finalize accessibility (skip links, focus outlines, reduced motion), animation polish, and theme QA.

## Development Commands

```bash
npm install         # Install dependencies
npm run dev         # Start dev server on http://localhost:4321
npm run build       # Generate static build in ./dist
npm run preview     # Preview the production build locally
```

## Next Steps for Contributors

1. Author production copy and components for the highest-priority routes (Homepage, Community Coordination, Join flow, Coverage Map landing).
2. Stand up the data pipeline that exports `network-stats.json` / GeoJSON and connect components to those feeds.
3. Implement interactive features (Leaflet map, stepper navigation, accordions) following the performance budget.
4. Add the contact form handler and confirm end-to-end submission flow on staging.
5. Introduce linting/testing into CI once Git history is established, then expand automated checks as features land.

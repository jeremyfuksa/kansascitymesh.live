# Kansas City Meshtastic Site Implementation

The repository now ships as an Astro + Bootstrap implementation for kansascitymesh.live. Content is authored in Markdown (`src/content/pages/**`) and rendered through reusable layouts so we can scale copy updates without touching presentation code.

## Project Structure

```
./
├── astro.config.mjs           # Astro config (no Tailwind plugin)
├── package.json               # npm scripts (dev, build, preview)
├── tsconfig.json              # TypeScript + JSX settings
├── src/
│   ├── components/                # Bootstrap-based UI primitives (alerts, cards, CTA blocks)
│   ├── layouts/
│   │   ├── Layout.astro           # Global layout, navbar/footer, Bootstrap includes
│   │   └── content/               # BasePage / ArticlePage / FaqPage layouts
│   ├── pages/                     # Routes selecting the appropriate layout
│   ├── assets/                    # Static assets (e.g., kc-mesh.png)
│   └── styles/global.css          # Light custom overrides (letter spacing, typography)
├── public/
│   └── favicon.svg
├── dist/                          # Build output (gitignored)
├── node_modules/                  # Dependencies (gitignored)
└── .vscode/                       # Recommended editor extensions
```

Each top-level route simply imports the layout and passes its markdown entry, keeping the Astro files thin and focused. Add new sections by creating a markdown file under `src/content/pages/**` and updating the corresponding route to reference the slug.

## Implemented Features

- Astro 5 project with Bootstrap 5 (via CDN) handling layout, typography, and components.
- Global layout with sticky navbar, responsive containers, and a shared footer.
- Content layouts (`BasePage`, `ArticlePage`, `FaqPage`) that map YAML front matter to Bootstrap components (alerts, callouts, card grids, accordions).
- Discord CTA and alert/callout components reusable across pages.
- Font Awesome kit (02023a5bb5) loaded globally for icon support.

## Outstanding Work Before Feature Complete

- Populate all pages with the final copy from README sections 4.1–4.10 (some sections still in-progress).
- Build the homepage coordination banner, live network stats widget, and recent updates feed.
- Implement the Join flow UI (stepper, checklists, troubleshooting) with proper accessibility.
- Create the Coverage Map using Leaflet, loading GeoJSON/static JSON produced by the automation pipeline.
- Wire data-driven components (network status metrics, growth timeline, dashboard cards) to the planned JSON updates.
- Add the PHP-backed contact form and ensure Nginx/OCI integration instructions are followed (docs/07-OCI-NGINX-DEPLOYMENT.md).
- Integrate Plausible analytics and custom conversion events for forms, hardware clicks, etc.
- Implement audience-specific guide layouts with media, CTAs, and responsive tables/accordions.
- Add automated linting/tests (markdownlint, Astro `check`, component/Playwright tests) and document the commands.
- Finalize accessibility (skip links, focus outlines, reduced motion) and polish animations/transitions if needed.

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

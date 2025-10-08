# Project Guidelines

This document outlines the general guidelines and conventions for the Kansas City Meshtastic Network website project. All contributors and agents should adhere to these guidelines.

## Project Structure & Module Organization

`README.md` remains the canonical site plan while `docs/` stores numbered deep dives (00–09). Keep new strategy files in `docs/` with zero-padded names. Implementation lives at the project root as an Astro + Bootstrap scaffold that mirrors the navigation from `docs/01-SITE-ARCHITECTURE.md`. Each route under `src/pages/` currently renders a content layout backed by Markdown—replace these with production copy and UI as sections go live. Group upcoming data assets inside `public/data/` or `src/assets/` using page-specific folders.

## Build, Test, and Development Commands

Run `npm install` from the project root, then `npm run dev` for local work and `npm run build` / `npm run preview` before release. Bootstrap is loaded via CDN in `Layout.astro`, with light custom overrides in `src/styles/global.css`. Until automated tooling lands, lint Markdown with `npx markdownlint-cli2 "**/*.md"` from the repo root. Add Astro `check`, component tests, or Playwright coverage once interactive pieces ship and document new commands here.

## Coding Style & Naming Conventions

Write Markdown in sentence case with 80–100 character lines when practical and retain the anti-dogma, professional tone defined in `CLAUDE.md`. In the Astro project, use kebab-case filenames (`coverage-map.astro`) and descriptive module names. Use Bootstrap components/utilities for styling; additional tweaks belong in `src/styles/global.css`. Inline comments should be rare and only for non-obvious logic. Layout props available to pages are `title`, `description`, `pageHeading`, and optional `heroVariant="compact"`.

## Testing Guidelines

For now testing means vetting visual regressions and ensuring the navigation behaves across breakpoints. Confirm each new section satisfies the tasks listed in its placeholder and cite the source doc in PR notes. When data integrations land, add unit or snapshot tests under `tests/` (to be created) and ensure critical flows (Join, Coverage Map, Contact) have automated coverage. Always smoke-test `npm run build` to catch hydration or SSR regressions.

## Commit & Pull Request Guidelines

Git history is not tracked yet, but plan to use Conventional Commits once mirrored upstream (e.g., `feat: implement coverage map`). Keep commits scoped to a single concern and list affected paths in PR descriptions. For UI updates, attach screenshots or clips. Reference the planning section (e.g., `docs/03-TECHNICAL-REQUIREMENTS.md`) that drove the work.

## Security & Configuration Tips

Never commit credentials, precise node coordinates, or MQTT endpoints—load secrets from `.env.local` (git-ignored). Respect the performance budget: total JavaScript should stay under 100 KB, so defer heavy libraries and tree-shake aggressively. When implementing the contact form, sanitize inputs server-side and confirm HTTPS termination per `docs/07-OCI-NGINX-DEPLOYMENT.md`. Handle Font Awesome usage via the existing kit script (see `Layout.astro`) and avoid bundling icons statically.

<!-- This is a minimal change to trigger a new deployment. -->

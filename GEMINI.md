# Project: Kansas City Meshtastic Network Website

## Project Overview

This project is the official website for the Kansas City Meshtastic Network. It's a single-page application (SPA) built with **Vite**, **React**, and **TypeScript**. Styling is handled by **Tailwind CSS**.

The website is designed to be a central hub for the KC Meshtastic community, providing information about the network, how to get started, and documentation. The UI is based on a Figma design and is structured into two main logical pages: `HomePage` and `GetStartedPage`.

## Building and Running

The project uses `npm` for package management. The following scripts are available in `package.json`:

- **`npm install`**: Installs all necessary dependencies.
- **`npm run dev`**: Starts the development server with hot-reloading, accessible at `http://localhost:5173`.
- **`npm run build`**: Builds the static site for production to the `dist/` directory.
- **`npm run preview`**: Serves the production build locally for previewing.
- **`npm run check`**: Runs the TypeScript compiler to check for type errors without emitting files.

## Development Conventions

- **Framework:** The site is built using **Vite** and **React**. Components are written as `.tsx` files.
- **Styling:** **Tailwind CSS** is used for styling. Global styles and theme definitions can be found in `src/styles/globals.css`.
- **Structure:** The main application logic is in `src/`. The `App.tsx` component handles routing between the `HomePage` and `GetStartedPage`. Static assets are in the `public/` directory.
- **TypeScript:** The project uses TypeScript. The configuration can be found in `tsconfig.json`.
- **Assets:** Image assets are located in `src/assets/`. There's a Vite alias configured to resolve `figma:asset/*` paths to `src/assets/figma/`.
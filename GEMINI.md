# Project: Kansas City Meshtastic Network Website

For general project guidelines, conventions, and technical details, please refer to [GUIDELINES.md](GUIDELINES.md).

## Project Overview

This project is the official website for the Kansas City Meshtastic Network, a community-driven, independent emergency communications network. The site is built with [Astro](https://astro.build/) and styled with [Bootstrap 5](https://getbootstrap.com/).

The website serves as a comprehensive resource and coordination hub for the Kansas City mesh networking community. Its primary goals are:

- To provide a central point of information for anyone interested in the KC Meshtastic network.
- To educate newcomers about Meshtastic technology and how to get involved.
- To serve as a coordination mechanism for the existing, but currently inactive, `kansascitymesh.net` operator.
- To document the network's architecture, status, and growth strategy.
- To provide practical, "anti-dogma" deployment guides for various user groups.

The project has a very detailed and well-defined content and design plan in the `README.md` file. This includes a color palette, design principles, and a complete sitemap.

## Building and Running

The project uses `npm` for package management. The following scripts are available in `package.json`:

- **`npm run dev`**: Starts the development server with hot-reloading.
- **`npm run build`**: Builds the static site for production.
- **`npm run preview`**: Serves the production build locally for previewing.

## Development Conventions

- **Framework:** The site is built using the [Astro](https://astro.build/) framework. All new pages and components should be created as `.astro` files.
- **Styling:** [Bootstrap 5](https://getbootstrap.com/) is used for styling, with light custom overrides in `src/styles/global.css`.
- **Content:** All content is defined in the `README.md` file. This file serves as the single source of truth for all website copy.
- **TypeScript:** The project is configured to use TypeScript. See `tsconfig.json` for the configuration.
- **Sitemap:** The complete sitemap is defined in the `README.md` file. All pages should be created according to this sitemap.
- **Design System:** The `README.md` file also defines a detailed design system, including a color palette and design principles. All new components and pages should adhere to this design system.

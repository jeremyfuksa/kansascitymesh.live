# Architectural Plan: Remediation and Standardization of the Kansas City Meshtastic Network Website

## 1. Executive Summary

The Kansas City Meshtastic Network Website, built with Astro, currently exhibits significant architectural and implementation challenges. These issues manifest as brittle code, convoluted asset handling, and a lack of clear conventions, leading to frequent errors and difficult maintenance. This plan outlines a phased approach to refactor the codebase, standardize practices, and establish a robust, maintainable foundation for future development. The primary goal is to transform the project into a smooth-running, idiomatic Astro setup that is easy to understand, extend, and debug.

> **Status note (2025-10-08):** The remediation described below has been completed. Legacy Markdown content referenced throughout has been migrated to MDX with shared components, and the asset/convention fixes are now part of the live codebase.

## 2. Current State Analysis & Identified Issues

The project's current state is characterized by several critical issues that have contributed to its brittleness and complexity:

### 2.1. Inconsistent Asset Handling

*   **Problem:** Images are stored in `src/assets/` but are not consistently processed by Astro's asset pipeline (`astro:assets`). This leads to a mix of processed and unprocessed assets, causing confusion and broken links.
*   **Specifics:**
    *   Images embedded directly in Markdown (`.md`) files using raw HTML `<img>` tags (e.g., `<img src="/src/assets/image.jpg">`) or even standard Markdown syntax (`![alt text](../../../path/to/image.jpg)`) within complex HTML structures (like `div`s and `card`s) have failed to trigger Astro's asset processing. This results in these images not being copied to the `dist/_astro` directory and thus appearing as broken links in the built site.
    *   The `public/` directory, intended for static assets that do not require processing, was not initially utilized for these images, contributing to the confusion regarding asset placement.
*   **Impact:** Broken image links, increased debugging time, and a non-optimized user experience due to unoptimized images.

### 2.2. Brittle Markdown-to-Component Integration

*   **Problem:** The integration between Markdown content and Astro components is fragile, leading to unexpected rendering behavior and parsing errors.
*   **Specifics:**
    *   Embedding complex HTML structures (e.g., the `div.row > div.col-md-6 > div.card` pattern for hardware listings) directly within Markdown files makes the content difficult to manage. Markdown processors are not designed to interpret and correctly render complex HTML blocks, especially when they contain dynamic elements or require Astro's component features.
    *   Attempts to introduce Astro components directly into Markdown (`.md`) files via frontmatter imports or within the Markdown body led to parsing errors (e.g., "can not read a block mapping entry; a multiline key may not be an implicit key") or failed to render correctly. This indicates a misunderstanding or misapplication of Astro's content collection and component integration patterns.
*   **Impact:** Unpredictable page layouts, difficulty in updating content, and a high likelihood of introducing new rendering bugs.

### 2.3. Lack of Clear Conventions & Documentation

*   **Problem:** The project lacks explicit guidelines for asset placement, Markdown content authoring, and component usage, leading to inconsistent development practices.
*   **Specifics:**
    *   The `README.md` provides a high-level overview but lacks the granular technical conventions necessary for consistent development across different contributors or over time.
    *   There is no established style guide or linter configuration to enforce consistent code formatting and best practices.
*   **Impact:** Increased onboarding time for new developers, inconsistent code quality, and a higher risk of architectural drift.

### 2.4. Over-reliance on Raw HTML in Markdown

*   **Problem:** The extensive use of raw HTML within Markdown files (e.g., for cards, figures) bypasses Markdown's intended simplicity and Astro's component-based approach.
*   **Specifics:**
    *   Content and presentation are tightly coupled, making it hard to change the visual design without modifying numerous Markdown files.
    *   This approach negates the benefits of Astro's component architecture, where UI elements should be encapsulated and reusable.
*   **Impact:** "Spaghetti code" where content is intertwined with presentation logic, making refactoring difficult and increasing the cognitive load for developers.

### 2.5. Error Handling & Debugging Difficulty

*   **Problem:** The brittle nature of the setup makes debugging challenging, as errors often manifest far from their root cause.
*   **Specifics:**
    *   Errors like "immutable" when attempting redirects or YAML parsing failures due to misplaced imports are difficult to trace back to the original architectural flaws.
*   **Impact:** Slow development cycles, increased frustration for developers, and a higher cost of maintenance.

## 3. Proposed Remediation Plan: Phased Approach

This plan prioritizes foundational fixes and aims to establish clear, idiomatic Astro practices.

### Phase 1: Standardize Asset Management & Markdown Content (High Priority)

*   **Goal:** Ensure all static assets are handled consistently and correctly, and Markdown content is clean and maintainable.
*   **Steps:**
    1.  **Asset Categorization and Placement:**
        *   **`src/assets/`:** Reserve this directory exclusively for images and other assets that *must* be processed by Astro's asset pipeline (`astro:assets`) for optimization (e.g., responsive images, WebP conversion). These assets will be imported directly into `.astro` components or `.mdx` files.
        *   **`public/images/`:** Create this directory for all other static images that do *not* require Astro's processing. These include images directly referenced in raw HTML, simple Markdown image tags, or any assets that should be served directly without modification.
    2.  **Migrate Existing Assets:**
        *   Move all images currently in `src/assets/` that are referenced directly in Markdown (`.md`) files (e.g., `heltec-v3.jpg`, `lilygo-t-deck.jpg`, `latest-node-map.jpeg`) to `public/images/`.
        *   Update all references to these images in Markdown (`.md`) files to use absolute paths (e.g., `/images/heltec-v3.jpg`).
    3.  **Clean Markdown Content:**
        *   **Remove all raw HTML blocks** from Markdown (`.md`) files that are intended to be rendered by Astro components. This includes the `div.row > div.col-md-6 > div.card` structures and `<figure>` elements.
        *   Replace these HTML blocks with simple, semantic Markdown content or placeholders that will be processed by new Astro components (see Phase 2).
        *   Ensure all remaining images in Markdown (`.md`) files use standard Markdown image syntax `![alt text](/images/image.jpg)` referencing assets in `public/images/`.
    4.  **Repair the PostCSS purge pipeline:**
        *   Update `postcss.config.mjs` to import the PurgeCSS plugin via its default export so the plugin is actually invoked during production builds.
        *   Expand the safelist to include additional dynamic Bootstrap utility patterns (e.g., `^text-bg-`, `^badge`, `^alert-`) to prevent legitimate classes injected by components from being stripped.
        *   Add a quick smoke test (`npm run build`) after the change to ensure the purge step succeeds and retains required styles.
    5.  **Load Bootstrap’s JavaScript bundle once globally:**
        *   Ensure `bootstrap/dist/js/bootstrap.bundle.min.js` (or the ESM equivalent) is included in the layout so navbar toggles, accordions, and any future interactive Bootstrap components work.
        *   Confirm the inclusion is tree-shaken or deferred so it does not regress performance targets.
    6.  **Eliminate Sass `@import` deprecations:**
        *   Update `src/styles/bootstrap.scss` to use the modern `@use "bootstrap/scss/bootstrap"` entrypoint (and a dedicated partial for variable overrides if needed) so the build stays compatible with Dart Sass 3.0.
        *   Run a build to verify there are no new warnings and Bootstrap styles still compile as expected.

### Phase 2: Develop Robust & Reusable Astro Components

*   **Goal:** Create a library of well-defined Astro components to encapsulate common UI patterns and integrate seamlessly with Markdown content.
*   **Steps:**
    1.  **Create Generic `Card` Component:**
        *   Develop a highly reusable `Card.astro` component that accepts props for `title`, `description`, `link`, `linkText`, and an optional `image` (which can be an `ImageMetadata` object for `astro:assets` or a string path for `public/images/`).
        *   This component will handle the internal structure of a single card.
    2.  **Create `CardGrid` Component:**
        *   Develop a `CardGrid.astro` component that accepts an array of card data as a prop.
        *   This component will be responsible for rendering the `div.row` and `div.col-md-6` layout, using the generic `Card` component internally.
    3.  **Create `CtaBlock` Component:**
        *   Develop a dedicated `CtaBlock.astro` component that accepts `title`, `description`, `link`, and `linkText` as props.
        *   This component will render the call-to-action block consistently across the site.
    4.  **Create `Figure` Component:**
        *   Provide a reusable component for images with captions so Markdown authors can drop in gallery or map callouts without raw HTML.
        *   Support common Bootstrap styling hooks (rounded, shadows) with sensible defaults.
    5.  **Integrate Components with Markdown (using `.mdx`):**
        *   **Enable MDX in Astro:** Add the `@astrojs/mdx` integration and document how to register it in `astro.config.mjs` so content authors can rely on `.mdx` files without manual setup.
        *   **Convert relevant `.md` files to `.mdx`:** For Markdown files that require significant component integration (e.g., `get-started/join.mdx`, `network/coverage.md`), convert them to `.mdx`. This allows direct import and usage of Astro components within the Markdown body.
        *   **Replace placeholders with Components:** In the `.mdx` files, replace the cleaned Markdown content (from Phase 1) with instances of the new `CardGrid`, `CtaBlock`, and other components, passing data as props.
        *   **Update Layouts:** Ensure `ArticlePage.astro` (or similar layout components) is designed to gracefully handle and render `.mdx` content and its embedded components.

### Phase 3: Establish Clear Conventions & Documentation

*   **Goal:** Prevent future architectural drift and ensure maintainability.
*   **Steps:**
    1.  **Update `README.md`:**
        *   Add a comprehensive "Development Conventions" section detailing:
            *   **Asset Strategy:** Explicitly state where different types of assets should reside (`src/assets/` vs. `public/images/`) and how they should be referenced.
            *   **Markdown/MDX Best Practices:** Guidelines for using Markdown, when to use `.mdx`, how to integrate Astro components, and avoiding raw HTML in content files.
            *   **Component Usage:** How to use the new `Card`, `CardGrid`, `CtaBlock`, and other common components, including required props and examples.
            *   **Content Collections:** How to structure and query content collections.
    2.  **Code Style Guide:**
        *   Implement a linter (ESLint) and formatter (Prettier) with a defined configuration.
        *   Add `lint` and `format` scripts to `package.json`.
        *   Configure pre-commit hooks (e.g., using Husky) to automatically run linting and formatting.
    3.  **Component Documentation:** Add JSDoc-style comments to Astro components explaining their props, usage, and internal logic.

### Phase 4: Cleanup & Optimization

*   **Goal:** Remove technical debt and improve build performance.
*   **Steps:**
    1.  **Remove Redundant Files:** Delete any temporary or unused components (e.g., `HardwareCard.astro`, `CoverageMap.astro` if superseded by generic components).
    2.  **Review `src/assets`:** Ensure only assets intended for `astro:assets` processing remain.
    3.  **Optimize Build Configuration:** Review `astro.config.mjs` for any potential build optimizations or unnecessary plugins.
    4.  **Accessibility Audit:** Perform a basic accessibility audit to ensure the site is usable for all.
    5.  **Performance Audit:** Use Lighthouse or similar tools to identify and address performance bottlenecks.

## 4. Implementation Strategy & Prioritization

*   **Iterative Development:** Each phase will be implemented iteratively, with small, testable changes.
*   **Version Control:** All changes will be committed to version control with clear, descriptive commit messages.
*   **Verification:** After each significant change, the site will be rebuilt (`npm run build`) and visually inspected to confirm correct rendering and functionality. Automated tests (if introduced) will be run.
*   **User Feedback:** Regular check-ins with the user will be crucial to ensure the changes align with expectations and address the identified issues effectively.

## 5. Risk Assessment

*   **Complexity of Existing Code:** The current brittle nature increases the risk of introducing new bugs during refactoring.
    *   **Mitigation:** Small, isolated changes; thorough manual and (if introduced) automated testing; frequent communication with the user.
*   **Learning Curve for New Conventions:** Developers (including myself) may need time to adapt to new conventions and Astro's idiomatic patterns.
    *   **Mitigation:** Clear, concise documentation; providing practical examples; pair programming (if applicable).
*   **Time Investment:** Comprehensive refactoring requires a significant time investment.
    *   **Mitigation:** Prioritize changes based on impact and user feedback; break down large tasks into smaller, manageable sub-tasks.

---

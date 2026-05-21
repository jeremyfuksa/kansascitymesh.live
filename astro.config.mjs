// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://kansascitymesh.live',
  integrations: [
    tailwind({
      // We provide our own base styles via src/styles/globals.css.
      // Disable Astro's default `base.css` import so it doesn't conflict.
      applyBaseStyles: false,
    }),
  ],
});

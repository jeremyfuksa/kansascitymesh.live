import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [
    mdx(),
    tailwind()
  ],
  style: {
    scss: {
      quietDeps: true,
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    server: {
      host: true,
      allowedHosts: ['ai.local', 'localhost'],
    },
  },
});

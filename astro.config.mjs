// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // The deployed origin (GitHub Pages user site, repo jacksoncrose.github.io).
  // A user site serves from the domain root, so no `base` is needed. Astro
  // uses this for canonical/absolute URLs (og:url, sitemap) wherever needed.
  site: 'https://jacksoncrose.github.io',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});
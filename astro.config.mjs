// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The deployed origin (GitHub Pages user site, repo jacksoncrose.github.io).
  // A user site serves from the domain root, so no `base` is needed. Astro
  // uses this for canonical/absolute URLs (og:url, sitemap) wherever needed.
  site: 'https://jacksoncrose.github.io',

  vite: {
    plugins: [tailwindcss()]
  },

  /*
    sitemap() added 2026-07-30. It writes sitemap-index.xml and
    sitemap-0.xml at build time from the routes Astro actually generates,
    so the list cannot drift from the site the way a hand-written one
    would. public/robots.txt points search engines at it.

    The three hosted apps under public/ (/land-ownership-explorer/,
    /montana-hall/, /frost-free-days/) are static assets rather than Astro
    routes, so they are not in the sitemap. They are linked from the pages
    that describe them, which is how they should be found.
  */
  integrations: [mdx(), sitemap()]
});
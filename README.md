# jacksoncrose.github.io

Personal research and project portfolio of Jackson Rose, Montana State
University. Live at <https://jacksoncrose.github.io>.

Built with [Astro](https://astro.build) and Tailwind. Static output, no
client-side JavaScript on site pages; the interactive land ownership
explorer under `public/` is a self-contained single-file application.
Content is Markdown under `src/content/` (projects, tools, gallery),
validated by the schemas in `src/content.config.ts`. Images are optimized
by `scripts/ingest-images.mjs` (`npm run images`); the repo holds web
derivatives only.

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push
to `master`.

```sh
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

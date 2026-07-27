/*
  ingest-images.mjs — turns full-resolution exports in _staging/ into
  web-ready derivatives in src/assets/images/.

  Why this exists: the repo commits web derivatives only (AGENTS.md), while
  originals stay in the gitignored _staging/ folder. This script is the one
  path between the two, so every published image gets the same treatment:

  - Downscaled to at most 2400 px on the long edge. Astro's asset pipeline
    then generates the responsive sizes pages actually ship, so 2400 px is
    the ceiling, not what visitors download.
  - Metadata stripped (sharp's default). This is not just about bytes: UAV
    imagery and phone photos carry embedded GPS coordinates and device
    serial numbers in EXIF, and those must not reach a public repo.
  - PNG stays PNG (maps, charts, UI screenshots — hard edges, text).
    JPG stays JPG (orthomosaics, photographs). Format conversion to
    AVIF/WebP happens later, in Astro, at build time.

  Usage, from the repo root (requires `npm install` to have been run):

      npm run images            # process new/changed files only
      npm run images -- --force # reprocess everything

  A derivative is skipped when it is newer than its original, so re-running
  after dropping one new file into _staging/ touches only that file.
*/

import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const STAGING = '_staging';
const OUT = path.join('src', 'assets', 'images');
const MAX_EDGE = 2400;
const FORCE = process.argv.includes('--force');

/** Extensions this script handles; everything else in _staging is ignored. */
const HANDLED = new Set(['.png', '.jpg', '.jpeg']);

/** kebab-case, no spaces, matching the naming rule in _staging/README.md. */
const NAME_RULE = /^[a-z0-9]+(-[a-z0-9]+)*\.(png|jpe?g)$/;

const entries = await readdir(STAGING, { withFileTypes: true });
const images = entries
  .filter((e) => e.isFile() && HANDLED.has(path.extname(e.name).toLowerCase()))
  .map((e) => e.name)
  .sort();

if (images.length === 0) {
  console.log(`No images found in ${STAGING}/ — nothing to do.`);
  process.exit(0);
}

await mkdir(OUT, { recursive: true });

let processed = 0;
let skipped = 0;
let failed = 0;

for (const name of images) {
  const src = path.join(STAGING, name);
  const dest = path.join(OUT, name);

  if (!NAME_RULE.test(name)) {
    console.warn(
      `SKIP  ${name} — rename to kebab-case first (see _staging/README.md)`,
    );
    failed += 1;
    continue;
  }

  // Unchanged since last run? Skip, unless --force.
  if (!FORCE) {
    try {
      const [s, d] = [await stat(src), await stat(dest)];
      if (d.mtimeMs >= s.mtimeMs) {
        skipped += 1;
        continue;
      }
    } catch {
      /* no derivative yet — process it */
    }
  }

  try {
    const image = sharp(src);
    const meta = await image.metadata();
    const isPng = path.extname(name).toLowerCase() === '.png';

    let pipeline = image.resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside', // long edge capped at MAX_EDGE, aspect ratio kept
      withoutEnlargement: true, // never upscale a small original
    });

    // Palette quantization (libimagequant) cuts map/figure PNGs to a
    // fraction of full-color size with no visible loss on flat colors,
    // labels, and terrain tints — verified on a 2.8 MB terrain map that
    // dropped to 0.9 MB with crisp text. quality 90 keeps gradients smooth.
    pipeline = isPng
      ? pipeline.png({ palette: true, quality: 90, compressionLevel: 9 })
      : pipeline.jpeg({ quality: 82, mozjpeg: true });

    const info = await pipeline.toFile(dest);
    const { size: inBytes } = await stat(src);
    console.log(
      `OK    ${name}  ${meta.width}×${meta.height} → ${info.width}×${info.height}` +
        `  ${(inBytes / 1024 / 1024).toFixed(1)} MB → ${(info.size / 1024).toFixed(0)} KB`,
    );
    processed += 1;
  } catch (err) {
    console.error(`FAIL  ${name} — ${err.message}`);
    failed += 1;
  }
}

console.log(
  `\n${processed} processed, ${skipped} unchanged, ${failed} failed.` +
    (processed > 0
      ? `\nNext: fill in each image's row in ${STAGING}/image-inventory.xlsx,` +
        `\nthen add its entry under src/content/gallery/ (or wire it to a project's cover).`
      : ''),
);

process.exit(failed > 0 ? 1 : 0);

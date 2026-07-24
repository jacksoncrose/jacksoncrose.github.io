# Jackson Rose — Personal Portfolio Site

Read this file fully before doing anything. It is the project brief and the
current state of the build. Follow it exactly; where it conflicts with your
defaults, this file wins.

## What this is

Personal research/project portfolio for Jackson Rose. NOT a consulting sales
site. Jackson is Research Faculty, Dept. of Earth Sciences, Montana State
University, and Assistant Director of the MSU Geospatial Core Facility, based
in Bozeman, MT. He may transition out of academia; the site must read well to
non-academic employers (nonprofits, think tanks, policy consultancies,
energy-sector firms) as well as collaborators and PIs.

## Positioning (settled — do not relitigate)

Lead identity: builder of spatial fiscal-analysis tools for energy
development, with the unusual property of also generating underlying data
from scratch (UAS, LiDAR, photogrammetry). The tax-revenue spatial tools are
the headline; acquisition/engineering work is the credibility layer, shown
prominently but subordinated. Broader GIS and cartographic work is included
via a gallery, not cut.

Identity sentence: NOT yet written. Do not write final copy for it without
Jackson's input.

## Sitemap (settled)

- Home — above the fold: name, roles (one compressed line), identity
  sentence, one hero visual (a tax tool interface, not a point cloud),
  contact. Below: Tools strip, selected projects, technical-credibility
  band, Maps teaser row.
- Tools — live, linked tools with 2-sentence descriptions each.
- Projects — index of cards; some link to full project pages.
- Maps — visual gallery grid: image, title, 1–2 sentences, year, tools.
  No case-study prose.
- About — bio, community-organizing → research-faculty arc, teaching
  (2 lines), CV as PDF, one-line consulting mention (RCRC).
- No Contact page. Email in header/footer sitewide.
- No blog. No testimonials. No separate publications page.

## Project tiers (settled)

Tier 1 (spine, longest write-ups): renewable energy tax calculators +
interactive maps (national nonprofit client); Maine clean-energy plant→TIF
crosswalk (239 plants, geopandas, confidence-tiered matching); copper mine
Community Benefit Agreement (anchored on public Rural Assembly webinar);
Montana rural typology PCA (Urban Institute methodology adaptation).

Tier 2 (full project pages): LiDAR corridor rockfall monitoring (MSU Civil
Eng.); MSU campus LiDAR 3D model (LOD2 multipatch, SLPK) — its render is a
below-fold Home visual; River Conditions Tool (USFWS CESU via GCF) if
permissions allow, else a card.

Tier 3 (cards / gallery): night-lighting UAV orthomosaic (2021 + 2023),
Planet imagery catalog/archive, ASSUREd Safe UAS trainings (TN, OH),
MT frost-free days calculator (also a live entry on Tools).

## Facts NOT yet confirmed — never invent these

Client permissions and naming (especially the nonprofit behind the
calculators), URLs of live tools, dates, match rates, corridor lengths,
point densities, funding sources, CBA organization/mine names, ED tenure
dates, webinar link, Part 107 status, gallery inventory. If copy needs one
of these, insert a clearly marked TODO placeholder and ask Jackson. Never
fabricate projects, clients, metrics, or credentials.

## Writing rules

Plain, concrete, specific. Scope and numbers over adjectives. Banned:
"leverage," "passionate about," "cutting-edge," "in today's fast-paced
world," "delve." Em dashes rare. Case studies: problem, approach, what was
delivered, outcome. Emails formatted for copy/paste into Outlook Web.
Set authorship of generated Office documents to "Jackson Rose."

## Design rules

Restrained, editorial. Strong typographic hierarchy, ONE accent color,
enforced via design tokens in one place. No stock photography — visuals are
Jackson's own maps, orthomosaics, renders, figures. WCAG 2.1 AA contrast,
keyboard navigable, real alt text on every image (describe what the map
shows, never "map of Montana"). Optimize all images through Astro's asset
pipeline. No unnecessary JavaScript: target zero client-side JS; MapLibre GL
permitted only on a page where a live map earns its place (likely only if a
tax tool must be hosted here rather than linked). No point-cloud viewers,
no raster tiling — Jackson confirmed no huge orthos or point clouds will be
served; stills only.

## Stack and deploy

Astro 7 (currently 7.1.3), static output, Tailwind, content in
Markdown/MDX via content collections, deployed to GitHub Pages via GitHub
Actions. Node 22. Repo holds web derivatives only; no source GeoTIFF/LAS/
SLPK files ever.

## Build plan and status

Work ONE step at a time. Explain why each step matters before doing it.
Show full file contents with paths for every file created or edited.
Verify with `npm run build` after each step. Stop after each step and let
Jackson confirm before continuing.

1. DONE — Scaffold: minimal template, strict TS, git initialized, build
   verified.
2. NEXT — Tailwind + design tokens: type scale, one accent color, fonts.
3. Content collections: schema for projects (title, year, tier, role,
   tools, client, status of permissions), tools, and gallery entries.
4. Base layout + header/footer (email sitewide), then the five pages as
   structure with placeholder-marked copy.
5. Image pipeline conventions + Maps gallery grid.
6. GitHub Actions deploy to GitHub Pages.

Final copy and the identity sentence are written WITH Jackson, not
autonomously.

## Astro dev notes (from scaffold)

Dev server in agent sessions: `astro dev --background` (manage with
`astro dev stop/status/logs`). Docs: https://docs.astro.build

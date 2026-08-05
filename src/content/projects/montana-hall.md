---
# 2026-08-05 de-AI pass, his picks: the two-sentence closer ("...would
# defend hardest...") DELETED — the footprint story already appears in
# Approach with the numbers; page now ends on the world-space reuse note.
# Problem's mesh/decimate/occlusion sentences reworded for a general
# audience at his direction.
# Condensed from Jackson's own case-study write-up, supplied 2026-07-29
# (full write-up in _staging/montana-hall-extras/). Tier 3, personal side
# project, his call same day. Scan-derivative publication cleared by
# Jackson 2026-07-29 ("Clear to publish").
title: "Montana Hall in Code"
summary: "A side project rebuilding MSU's 1896 Montana Hall as a fully procedural Three.js model. Every dimension is a named constant measured from a 2.05-million-point terrestrial laser scan, and the whole building ships as a single self-contained HTML file that runs in the browser."
year: 2026
tier: 3
role: "Personal side project"
tools: ["Python (laspy, NumPy)", "TypeScript", "Three.js", "Playwright"]
clientPermission: "not-applicable"
hasPage: true
# UNLISTED 2026-08-01, his call: "Tools (MT Hall and FFD) are showing up
# in projects. That's redundant." The card came off the Projects index;
# THIS PAGE STILL BUILDS at /projects/montana-hall and is reached from the
# Tools card, which carries caseStudy: "montana-hall". Do not delete that
# field without relisting this entry, or the page is orphaned.
listed: false
cover:
  src: "../../assets/images/montana-hall-north-elevation.png"
  alt: "Rendered 3D model of Montana Hall viewed from the north: symmetric red-brick facade with an arched central entrance, three cross-gables, hipped slate roof, and central spire, flanked by stylized low-poly trees."
order: 5
# Every value restated from the body copy below; see the stats schema note.
stats:
  - value: "2.05M"
    label: "points in the source scan"
  - value: "36,661"
    label: "triangles, every one procedural"
  - value: "~600 KB"
    label: "one self-contained HTML file"
draft: false
---

## Problem

Montana Hall is the 1896 landmark at the center of the MSU campus, and
this started as a question I wanted to answer for myself: what does it
take to turn a laser scan into a building model you can actually edit?
The usual route is to have software wrap the scanned points in a surface
automatically, which produces a model that is photorealistic but nearly
impossible to edit. Models built that way are heavy, they preserve every
blind spot and scanner error as permanent geometry, and if you later learn
the cornice height is wrong there is nothing to change; the number is
baked into a million triangles.

## Approach

Treat the scan as a measuring instrument instead of a source of geometry.
A Python pipeline (laspy, NumPy) crops a 2.05-million-point Riegl
terrestrial scan to the building, axis-aligns it, strips ground and
vegetation, renders orthographic elevations of each facade, and measures
the wall planes statistically as histogram peaks. That step justified the
whole exercise: working from photographs, I had carried a footprint of
26.0 by 12.5 meters. The scan says 30.2 by 27.3. The depth was off by
more than a factor of two, because front-on photographs of a symmetric
building contain almost no depth information, and the eye fills it in
with something plausible and wrong.

The building itself is generated entirely in code, in TypeScript with
Three.js. Every dimension is a named constant with a measurement behind
it. Windows are cut as real openings through half-meter walls, driven
from a nine-line schedule, so the holes and the glazing that fills them
cannot drift apart. There are no image files anywhere in the project:
brick, stone, and slate are drawn to canvas at load, and every random
value comes from a seeded generator, so a rebuild is byte-comparable and
a visual diff means something. A headless Playwright harness screenshots
five camera presets and prints triangle, vertex, and draw-call counts on
every render, the cheapest bug detector in the project.

## What was delivered

The finished model is 36,661 triangles and ships as a single
self-contained HTML file, about 600 KB, no external requests. The viewer
has orbit and zoom, five camera presets, a day and night toggle, and
switches for ambient occlusion, bloom, shadows, grounds, and wireframe,
with live geometry statistics on screen because the counts are part of
the point.

[Open the interactive model](/montana-hall/).

## Outcome

The scan-to-dimensions pipeline is building-agnostic: point the crop at a
different structure and it produces elevations and wall-plane
measurements the same way. The first 256 lines of the model code are a
reusable, building-neutral kit, and fixed coordinate conventions mean a
second building would land in the same world space as the first.

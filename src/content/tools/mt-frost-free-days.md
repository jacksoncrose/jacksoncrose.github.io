---
# 2026-08-05 de-AI pass: blurb's "honest about" reworded. The hosted app
# itself was also edited the same day (heading reword + planting-callout
# removal) — mirror those in the source Claude project before any rebuild.
# Live 2026-07-29. Self-contained single-file app served from
# public/frost-free-days/ (same pattern as /montana-hall/ and the
# land-ownership explorer). Built in Jackson's separate "Montana Frost
# Free Days Calculator" Claude project; methodology and validation are
# recorded in that project's decision log. Order 4: after the
# spatial-fiscal calculators (0-3, still to land), before Montana Hall (5).
title: "Montana frost-free days calculator"
blurb: "Freeze probabilities for 409 Montana stations, 1991–2025: last spring freeze, first fall freeze, and season length at 10, 50, and 90% odds, with confidence intervals shown. Validated against NOAA freeze normals, with warnings about what a 4 km grid misses in mountain terrain."
url: "https://jacksoncrose.github.io/frost-free-days/"
# Cover added 2026-07-30 (Home cards decision).
#
# COVER REPLACED 2026-07-31. Jackson: the card "is basically just white and
# hard to interpret." He was right, and the cause was the capture, not the
# crop: the app had Surface layers set to Off, so Montana rendered as a white
# shape with small blue station dots, which at the 256x177 card box is a
# white rectangle with specks. Re-captured with the SEASON surface on, which
# fills the state with the classed median-frost-free-days choropleth. The app
# is self-contained in public/frost-free-days/, so a cloud session can serve
# it locally and drive it; no browser round trip to Jackson is needed.
#
# COVER REPLACED AGAIN 2026-08-05, his call in the card-covers pass that
# also redid the land-ownership explorer cover: the flat capture left white
# corners where the state outline met the card frame. This one is the
# Season surface at its native transparency over Esri World Hillshade
# (z9 tiles fetched through Jackson's browser — the container cannot
# reach tile servers — mosaicked in-page, contrast-stretched gain 2.6),
# surrounding land ghosted, the dashed state boundary kept, framed with
# terrain margin on all sides so nothing in the card box is blank.
# COMPOSITED, not a raw capture, but it closely matches the app's Terrain
# base, which became the DEFAULT the same day, so the card previews what
# the app opens to. A first bake from a coarse offline relief (~2 km/px)
# was rejected by Jackson the same day and replaced with this one.
# Capture recipe otherwise per 2026-07-31 (Season on, legends and control
# container hidden — plus any floating button left inside #map, which is
# what the old crop step cut out); Web Mercator bounds queried from the
# live map object registered the relief.
#
# FORMAT SWITCHED PNG → JPEG, measured per the Rooney rule: the draped
# relief is continuous tone, so palette PNG ballooned to 2.67 MB while
# JPEG at the pipeline's q82 is 603 KB at 3.77/255 with no visible
# difference at delivered card size. _staging original is a q95 JPEG.
# The stale mt-frost-free-days-app.png (repo derivative and _staging
# original) was moved to _to_delete/ at the repo root for Jackson to
# empty — cloud sessions cannot delete files on his disk.
#
# THE HOSTED APP WAS EDITED IN PLACE AGAIN 2026-08-05: Terrain is now the
# default base layer (baseTerrain at init, baseName default, hash treats
# "terrain" as the unwritten default and records b=light instead).
# MIRRORED 2026-08-06 into MontanaFFD/code/build_webapp.py together with
# the de-AI edits; rebuild verified byte-equivalent. The mirror rule
# still applies to any future in-place edit.
cover:
  src: "../../assets/images/mt-frost-free-days-app.jpg"
  alt: "Montana's median frost-free season draped over shaded-relief terrain: pale blues through the southwestern mountains where the season is shortest, deepening across the eastern plains, with several hundred stations as small circles and the surrounding states ghosted."
order: 4
draft: false
---

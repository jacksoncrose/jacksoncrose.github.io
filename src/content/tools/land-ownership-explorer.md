---
# Added 2026-08-03, Jackson's call in the visual pass: the explorer was a
# live hosted app reachable only from inside the land ownership case study,
# and the Tools page held two cards in an empty viewport. Third entry gives
# it a front door, mirroring the Montana Hall pattern: the Tools card
# carries the caseStudy link to the write-up.
#
# ORDER 3: before the two personal tools (4, 5) — client work leads, the
# same logic as personal entries sorting last in projects tier 3.
#
# COVER REPLACED 2026-08-05, his call, SUPERSEDING the 2026-08-03 Montana
# zoom. He flagged that card ("weird crop/white borders"): the zoom framed
# the international border, so blank Canada filled the top of the frame.
# Four reframes were rendered at true card size; he answered with a
# direction instead of a pick — "a western US? With a hill shade underneath
# so green draped over with transparency?" — and, told a composited drape
# would stop the cover being a literal screenshot, chose to update the APP
# to match. The app gained a terrain underlay the same day (default on,
# "Terrain" toggle in the map controls, hash param t=0 when off), so this
# cover is a real capture again: western U.S., "All federal land" category,
# terrain on. Captured from the patched app served locally, Playwright at
# DPR 2, zoom controls hidden, viewBox window x −30..535, y 27..409 —
# framed so no blank ocean-less edge or button ghost is in view. Relief
# strength is the SUBTLE variant, his pick of two rendered at card size.
#
# RELIEF SOURCE REPLACED THE SAME DAY: the first bake used the only
# offline relief a cloud session has (ETOPO-derived, ~2 km/px) and
# Jackson rejected it on sight ("Those hillshades look awful" — he was
# right, it was stretched ~2x). Rebuilt from Esri World Hillshade tiles
# (z7) fetched THROUGH HIS BROWSER via the Chrome extension — the cloud
# container cannot reach tile servers — mosaicked in-page on a canvas,
# handed back through Downloads, then warped and contrast-stretched
# (the service is deliberately pale at small scales; gain 2.6, floor
# 0.38). Attribution added to the app's credit line: "Terrain: Esri
# World Hillshade (Esri, NASA, NGA, USGS)". Full recipe in AGENTS.md.
# Same filename, so `npm run images` re-ingests; source PNG lands in
# _staging/ as land-ownership-explorer-app.png to stay in the pipeline's
# watch. Stays PNG, measured not assumed: pipeline output 0.61/255 mean
# error (max 19, p99 6 — no banding), 876 KB, against 2.97/255 for its
# JPEG path — hard county edges keep the rule.
#
# THE NATIONAL VIEW IS STILL OFF THE TABLE for this card: at card size it
# near-duplicates federal-land-share-2024.png, which is already on Home as
# the National Land Ownership project cover — the trap the Maps-teaser
# note in index.astro warns about. The western crop plus the drape is what
# keeps this card distinct from that figure.
#
# THE HOSTED APP WAS EDITED IN PLACE 2026-08-05 (terrain underlay + toggle
# in public/land-ownership-explorer/index.html; file grew 1.65 → 2.16 MB
# from the embedded relief JPEG). The app is built in Jackson's separate
# Claude project; MIRRORED 2026-08-06 into its build pipeline (template
# placeholder + terrain_underlay.jpg asset, reassembly byte-verified), so
# a rebuild keeps the terrain. Underlay regeneration recipe is in
# AGENTS.md under the National Land Ownership project.
title: "U.S. Land Ownership Explorer"
blurb: "The interactive companion to the National Land Ownership Analysis: 2.3 billion acres in twelve ownership categories, browsable by state and county, with an owner classifier and the full methodology. One self-contained page."
url: "https://jacksoncrose.github.io/land-ownership-explorer/"
caseStudy: "national-land-ownership"
cover:
  src: "../../assets/images/land-ownership-explorer-app.png"
  alt: "The western United States county by county, shaded green by federal land share and draped over shaded-relief terrain: near-solid dark green across the Great Basin and mountain West, thinning to pale scattered counties on the plains."
order: 3
draft: false
---

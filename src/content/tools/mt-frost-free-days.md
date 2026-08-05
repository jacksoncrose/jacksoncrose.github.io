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
# The capture hides the two floating .legend control boxes and the Leaflet
# control container, and is cropped to the data bounding box. It carries NO
# basemap tiles (the container cannot reach the tile server) — the Season
# surface covers them anyway. Same filename as before, so `npm run images`
# re-ingests it. Stays PNG per the maps-and-screenshots rule; checked for
# banding, mean abs diff 0.32/255, because the surface is classed rather
# than a smooth gradient. 91 KB -> 331 KB.
cover:
  src: "../../assets/images/mt-frost-free-days-app.png"
  alt: "Montana shaded by median frost-free season length: pale through the southwestern mountains where the season is shortest, deepening across the eastern plains, with several hundred climate stations plotted as small circles."
order: 4
draft: false
---

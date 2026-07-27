---
# Body condensed from Jackson's write-up, 2026-07-27, supplied in his own
# words for the site. Publish and client naming cleared by Jackson the same
# day. Full write-up facts recorded in AGENTS.md (ROONEY block).
# ArcGIS Pro in tools is inferred from the sheets — confirm with Jackson.
title: "Rooney Angus Ranch Atlas"
summary: "Ranch atlas and poster cartography for Rooney Angus: four division maps on a custom 10 m hillshade with one symbol system across a threefold scale range, a wall-scale poster, and an interactive Google Earth environment transferred to the ranch's ownership."
year: 2026
tier: 3
role: "Project lead and cartographer"
tools: ["ArcGIS Pro", "Google Earth"]
client: "Rooney Angus"
clientPermission: "granted"
hasPage: true
cover:
  src: "../../assets/images/rooney-north-hillshade.png"
  alt: "Division map of Rooney North on a grayscale hillshade: a cased orange boundary enclosing white owned parcels and hatched public lease, crimson ranch roads threading between labeled pastures, with aerial-imagery inset panels for the headquarters and subdivided fields."
draft: false
---

## Problem

Rooney Angus operates four ranch divisions across a wide area of central
Montana, on a mix of owned ground, private lease, and public lease. The
spatial knowledge that runs the operation, meaning pasture names, fence
lines, gate locations, water infrastructure, irrigation history, and
two-track road networks, existed in people's heads and in scattered files.
There was no single reference the crew, family, and managers could all work
from.

## Approach

A purpose-built basemap. I produced a custom hillshade from the USGS 1/3
arc-second (10 m) DEM and tuned it as a desaturated grayscale surface.
Terrain is what orients someone on a ranch, so the basemap had to carry
real topographic legibility while staying quiet enough that fences, roads,
and boundaries read cleanly on top of it. Everything was built in
NAD83(2011) UTM Zone 12N so the full series shares one coordinate
framework.

One symbol system holds across four very different maps. The divisions
range from Democrat at 1:17,000 to Rooney North at 1:53,000, a threefold
spread in scale with large differences in feature density. A single visual
grammar carries all of them: a cased orange ranch boundary, crimson ranch
roads, dashed fences, gate points, fill patterns distinguishing owned
ground from private and public lease, and a consistent point taxonomy for
water and range infrastructure. A crew member who learns to read one sheet
can read all of them.

Where scale broke down, aerial imagery inset panels with leader lines give
the headquarters complexes and the tightly subdivided fields on Rooney
North the detail they need without compressing the main map. The maps also
label several hundred pasture and field names in the ranch's own
vocabulary, from Bachelor Gulch and Lambing Camp to Hayland Jock's and the
Susie's fields. Capturing that naming faithfully is what makes the maps
usable as a shared reference rather than a generic land-cover product. The
ranch wordmark and brand color carry through the boundary symbology and
sheet furniture, so the series reads as the ranch's own document.

## What was delivered

Four division maps (Rooney North, Rooney South, Foglands, Democrat), each
with scale bar, north arrow, and projection and DEM provenance noted; a
large-format poster placing all four divisions in regional context on
satellite imagery, produced in alternate label treatments so the ranch
could choose what read best at wall scale; and an interactive Google Earth
environment built from the same dataset and transferred to the ranch's
ownership, giving the team a way to explore their own data without GIS
software or a license.

Foundational digitizing and GIS construction were carried out by GCF
staff. I directed that work and produced all final cartographic and
interactive deliverables.

## Outcome

The ranch came out of phase one with a projected, structured spatial
dataset it owns, a printed atlas the crew can use in trucks and shops, a
wall-scale poster for the office, and an interactive environment for
planning. Because the data was built to be extended rather than delivered
as a finished snapshot, phase two options are on the table, including
attributing infrastructure by fence and road type, refining feature
alignment, and on-site collection for pasture-level resolution.

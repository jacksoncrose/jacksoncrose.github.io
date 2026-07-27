---
# Facts and body text from Jackson, 2026-07-27, supplied in his own words
# for the site. Role and tool credits confirmed by him the same day.
# Full write-up recorded in AGENTS.md (CAMPUS AT NIGHT block).
title: "Campus at Night"
summary: "Overnight UAV survey supporting MSU's campus lighting conversion. 1,369 exposure-locked frames at ~2.7 cm GSD, processed to a 236 ha orthomosaic and cartographic map of the campus lighting footprint."
year: 2023
tier: 3
role: "Mission lead, pilot, and cartographer"
tools: ["UAV", "Agisoft Metashape", "ArcGIS Pro"]
client: "MSU Facilities"
clientPermission: "granted"
hasPage: true
cover:
  src: "../../assets/images/msu-campus-lighting-2023.png"
  alt: "Night orthomosaic of the Montana State University campus on a dark street basemap, walkways and parking lots traced by white-green lamp pools, with amber sodium-vapor lighting around the housing loops at upper left."
draft: false
---

## Problem

MSU Facilities has been converting campus exterior lighting from high
pressure sodium to LED since 2011, with goals around energy consumption,
fixture reliability, and pedestrian safety after dark. What they lacked was
a campus-wide picture of what that lighting actually produces on the
ground.

## Approach

The Geospatial Core Facility flew an overnight UAV mission to supply it: a
Vision Aerial Switchblade carrying a Sony a6000 with a 16 mm lens at
roughly 123 m AGL, collecting 1,369 frames across nine legs between 01:14
and 04:58, for 3 hours 43 minutes of flight. Exposure was locked at 1/60 s,
ISO 12800, f/3.2 with zero frame-to-frame variance, so brightness in the
finished mosaic reads as a measurement of the lighting rather than an
artifact of the camera.

## What was delivered

The imagery was processed in Agisoft Metashape as a single chunk, with
1,309 of 1,370 images aligned. The orthomosaic was built at 2.66 cm and
exported at 3.21 cm/px over roughly 236 hectares, covering both the main
campus and the south athletics block, with color balancing off end to end.
Facilities received a cartographic map of the campus lighting footprint,
composed in ArcGIS Pro.

## Outcome

Facilities now has a campus-wide view of what the conversion produces on
the ground: coverage, gaps, and spill, at a resolution where individual
lamp pools are legible.

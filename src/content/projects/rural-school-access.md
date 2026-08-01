---
# Tier-2 card entry, added 2026-08-01. Card-only (hasPage false) is
# Jackson's call, taken over a full page. Sources: the project folder on
# his machine (02_GCF / "Project - Rural MT Schools") and his own delivery
# email to the client, pasted into the session 2026-08-01. Every figure is
# verified against Deliverables/ClosureImpact_SummaryStats.xlsx.
#
# ROLE: the analysis was his — the grid, the join, the distance work, the
# summary statistics and the maps, confirmed 2026-08-01. THIS IS NOT THE
# ROONEY SHAPE, where GCF staff did the foundational GIS and he directed
# it. Do not narrow this one to "directed".
#
# CLIENT NAMING GRANTED 2026-08-01. **MACSS IS THE DATA SOURCE, NOT THE
# CLIENT** — this session had that backwards for two turns before he
# corrected it. The map legend's "MACSS School" refers to the database.
# MACSS = Montana Association of County School Superintendents (confirmed
# against the MACo acronym list); NOT MASS, the district superintendents'
# association. CRRE is an MSU center, so this is one MSU unit working for
# another, not an outside contract; do not let copy imply a paid external
# engagement.
#
# CARD-ONLY IS SETTLED, NOT PENDING. He confirmed 2026-08-01 that the work
# was presented once and went no further, so there is no Outcome section to
# write and no reason to revisit this as a page.
#
# THE CLOSURE SCENARIO IS A BOUNDING CASE — all 129 schools at once. Nobody
# has proposed it. Never write copy that implies closures are planned.
#
# "Rural" is defined entirely by the MACSS list: every school in it is
# rural, every other school is not. Jackson flagged that himself in the
# delivery email. Distances are straight-line (NEAR_DIST / NEAR_DIST_NR),
# not road distance, which makes the figures conservative for Montana.
#
# POPULATION IS ESRI GEOENRICHMENT (2024 estimates apportioned to the
# cells), from populationtotals_TOTPOP_CY and AgeDependency_CHILD_CY.
# **NEVER CALL IT CENSUS DATA.** The ACS DP05 table in the project is
# joined to Census Places, not to the hexagon grid.
#
# HEXAGON SIZE (~16 sq mi) WAS MEASURED, NOT ASSUMED: scale bar 605 px per
# 100 miles, lattice constant 26.23 px, circumradius 2.50 mi, area 16.3 sq
# mi. The project's 30_Square_Mile hexagon shapefile is an unused input.
#
# "NEARLY TRIPLES", NOT "TRIPLES": children beyond 20 miles go 588 -> 1,707,
# which is 2.90x. His delivery email rounded it up. The summary below uses
# the raw counts instead and avoids the multiplier entirely.
title: "Montana rural school access analysis"
summary: "How far Montana children live from a school, and how that would change if the state's 129 small rural schools closed. Built for the MSU Center for Research on Rural Education. Under the closure scenario the number of children living more than 20 miles from a school rises from 588 to 1,707."
year: 2025
tier: 2
role: "Analysis and cartography, Geospatial Core Facility"
tools: ["ArcGIS Pro"]
client: "Montana State University Center for Research on Rural Education"
clientPermission: "granted"
hasPage: false
cover:
  src: "../../assets/images/rural-school-access-2025.png"
  # Composed 2026-08-01 from the two delivered scenario maps. Montana is
  # 1.79:1 and the projects card is a sm:flex row whose image (sm:w-64) has
  # no fixed height, so it stretches to whatever the text column measures —
  # 256x330 here, not the 256x285 recorded for the estimator. The box ratio
  # is per-entry, so a single map either lost both ends of the state to
  # object-cover or floated in dead grey. Stacking the pair solves the
  # aspect problem and the one-slot-two-maps problem at once, and the
  # comparison IS the project. Built at 0.85 with 9% grey margin each side
  # and 4.4% top and bottom so a stretched box crops padding, not content.
  # Scenario labels sit in the gutters, never over the map. The legend
  # header was painted out in the map's own background grey (65,65,65)
  # below the state outline — the same move as the estimator cover's
  # control box — because it sits at the same height as the southern border
  # and no rectangular crop removes it. The delivered PNGs are untouched.
  alt: "Two stacked hexagon-grid maps of Montana showing distance to the nearest school. In the upper map, current access, most cells are purple and blue with scattered yellow in the southeast and southwest. In the lower map, with all 129 rural schools closed, large areas across the east, south and northwest turn yellow, marking cells more than twenty miles from a school."
  fit: "cover"
order: 2
draft: false
---

<!-- Card-only entry: no page is generated while hasPage is false, and that
is settled rather than pending — the work was presented once and went no
further, so the four-part case-study shape has no Outcome to fill. -->

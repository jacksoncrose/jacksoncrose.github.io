---
# 2026-08-15 section pass, item 5, his approval: Outcome's "the remaining
# deltas are exactly those predicted by the study's water-masking
# methodology" -> "differences ... predicted by the study's removal of
# open water from county boundaries" (same words Approach uses for the
# same operation; "predicted" kept deliberately). "Canonical" REMOVED at
# his direction — his words: "that is AI language usually" — and not
# replaced; "authoritative benchmarks" opening the sentence already does
# that work. ADD "canonical" TO THE WATCH LIST for future passes.
# 2026-08-13 audit flag 19a, his call: "a prioritization and differencing
# scheme that resolves those overlaps defensibly" rewritten in plain words.
# "Defensibly" came out with it — the three sentences that follow (Fee as
# authoritative, Proclamation and NCED added only where they do not
# intersect, Designation excluded after QC) demonstrate it rather than
# asserting it. He SKIPPED 19b, so the "dissolved / intersected / three
# equal-area projections" sentence stays exactly as written.
# 2026-08-05 de-AI pass: staged Q&A opener replaced with Jackson's own
# stem ("County land ownership regimes influence..."), ending his pick.
# Condensed from Jackson's own portfolio write-up, supplied 2026-07-27
# (full text in project knowledge: eps-land-ownership/). Tier 2 per Jackson.
# CLIENT NAMING GRANTED by Jackson 2026-07-27 ("Just name HW. It's fine."),
# superseding the earlier "figures only, no name". The figure ships with its
# full original caption ("...for Headwaters Economics.").
title: "National Land Ownership Analysis"
summary: "A wall-to-wall classification of 2.3 billion acres across all 3,144 U.S. counties into twelve ownership categories, resolving the overlap and attribute problems in PAD-US 3.0, validated against federal benchmarks, and delivered as the land ownership layer behind Headwaters Economics' Economic Profile System."
year: 2024
tier: 2
role: "Assistant Director and Operations Manager, Geospatial Core Facility"
tools: ["ArcGIS Pro", "Python (ArcPy, GeoPandas, pandas)"]
client: "Headwaters Economics"
clientPermission: "granted"
hasPage: true
cover:
  src: "../../assets/images/federal-land-share-2024.png"
  alt: "County choropleth of the United States showing federal land as a share of county land area in sequential greens: near-solid dark green across Nevada, Utah, Idaho, and the Intermountain West, pale scattered greens east of the Rockies, with Alaska and Hawaii inset."
  # fit: contain (2026-07-31). This cover is a self-contained figure with a
  # title, a legend, and the source line that names Headwaters Economics.
  # The card box is 256x286, taller than the figure is wide, so object-cover
  # sliced the title to "...al land" and cut the caption mid-sentence. The
  # figure's own background is white and so is the card, so containing it
  # letterboxes invisibly. The project page is unaffected: it renders the
  # cover at natural aspect, not cropped.
  fit: "contain"
order: 1
# Every value restated from the body copy below; see the stats schema note.
stats:
  - value: "2.3B"
    label: "acres classified"
  - value: "3,144"
    label: "counties, 50 states and DC"
  - value: "12"
    label: "ownership categories"
draft: false
---

## Problem

County land ownership regimes influence everything from school funding to
wildfire planning, but the answer to who owns what is spread across
datasets that overlap and conflict. I built the land ownership layer behind Headwaters Economics'
Economic Profile System (EPS), a free reporting tool used by thousands of
communities, planners, and researchers across the country.

The federal government's Protected Areas Database (PAD-US) is the best
available inventory of public land, but it was never designed for clean
acreage accounting. Its feature classes overlap each other, parcels appear
in multiple layers, attribute fields contradict one another, and entire
ownership types, like Colorado's state trust lands, carry no identifying
attributes at all. Naively summing PAD-US acreage overcounts land by
millions of acres.

## Approach

The core of the project was a set of priority rules for deciding which
source wins where parcels overlap, and then erasing the duplicates. PAD-US Fee parcels were treated as
authoritative; military and tribal lands from the Proclamation layer and
conservation easements from NCED were added only where they did not
intersect Fee parcels. Designation parcels were excluded entirely after QC
revealed many were privately held land, a finding verified against the
Montana Cadastral Framework.

A rule-based Python reclassification engine then reads eight PAD-US
attribute fields per parcel to assign one of twelve ownership classes,
from national forests and BLM rangeland to state trust lands, tribal
lands, municipal parks, and private conservation easements, with
researched special-case handling for state trust lands, water districts,
and tribal boundaries.

So that ownership percentages reference land area rather than total area,
open water was extracted from NLCD and NOAA C-CAP land cover, roughly
38 GB of rasters converted to polygons and erased from county boundaries.
The dissolved ownership layer was intersected with those water-erased
boundaries in three equal-area projections and tabulated by county, with
state and national rollups.

## What was delivered

A validated county-by-county table of land ownership in acres for the
entire United States, a packaged geodatabase of the final ownership layer,
a reproducible codebase in two forms (an ArcPy production workflow and a
portable open-source GeoPandas version), and a twelve-page methods
document. The delivery included a full reconciliation against the prior
2019 analysis, explaining every national-level shift larger than two
percent, and in one case catching a 2.85-million-acre error in the earlier
study's Minnesota figures.

## Outcome

The classification now powers the land use reports communities pull from
EPS. Results were independently cross-validated
against authoritative benchmarks: BLM and Forest Service acreage each landed
within about one percent of the Congressional Research Service's
federal land figures, the national federal share of 27.6 percent matches
the widely cited figure of roughly 28 percent, and the remaining differences
are exactly those predicted by the study's removal of open water from
county boundaries.

The results and the classification engine are also packaged as a
self-contained interactive explorer: a county choropleth with
change-since-2019 analysis, state ownership profiles, county lookup, and a
live demonstration of the parcel classification decision tree ported from
the delivered Python. [Explore the interactive map](/land-ownership-explorer/).

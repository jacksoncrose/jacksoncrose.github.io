---
# 2026-08-20: the Cree syllabics question is RESOLVED. Asked a third time
# with options (cut the reason / the source data was in syllabics / it is
# correct as written), his answer: "Remove the discussion of Cree place
# names." The whole clause came out of the Approach paragraph below; the
# duplicate-label filter sentence it shared a sentence with stays. Do not
# reintroduce the topic and never supply a mechanism — the syllabics
# detail is a write-up fact only, same standing as American Indian Hall.
# 2026-08-15 section pass, item 3, his "take it": the ArcGIS Online
# limits paragraph and the second-phase paragraph MERGED into one; cut
# "using chained raster functions", "The result gives the static map its
# depth without the flat, mechanical look of a default hillshade", and
# "so the web map and static map draw from one authoritative source
# rather than divergent copies" (restated the consolidation). Dates,
# sources, and the component list unchanged. FACT QUESTION, RESOLVED
# 2026-08-20 (see the note at the top of this block): the Cree syllabics
# sentence ("...because the platform does not support standard Roman
# orthography") read backwards — SRO is the Latin-alphabet system and
# should be the EASY one to display. Held verbatim from 08-15 until his
# answer removed it.
# 2026-08-15 second de-AI pass, his "implement all recommendations": the
# Approach sentence ended "rather than a set of borders", the second
# "rather than a set of" on one page (Problem has "...administrative
# jurisdictions"); the tail came off. NOTE: in .md files, body <!-- -->
# comments render into the served HTML — provenance lives here in the
# frontmatter only.
# 2026-08-05 de-AI pass: "Design choices reinforced..." topic sentence
# cut; "built that picture twice over" flattened to the two deliverables
# (his call: don't say it twice). "Contracted independently" stays — it is
# the settled substitute for the LLC name.
# Condensed from Jackson's write-up, supplied 2026-07-28 for the site,
# and UPDATED same day from his revised summary: timeline now runs to
# 2024, with a second phase (custom raster-function relief; geodatabase
# and hosted-feature-service consolidation). Year 2022 is Jackson's
# EXPLICIT call (2026-07-29), overriding the contract-end rule — do not
# "correct" it. Also his direction 2026-07-29: American Indian Hall is
# not mentioned anywhere on the site (page or gallery), and the body
# does not state the work's date range. Client naming granted by Jackson
# same day. Role per Jackson: "doesn't need to be overly specific — I
# did the analysis and cartography." The write-up's credit line named
# an abandoned LLC that must never appear on the site (see AGENTS.md);
# the body says "contracted independently" with no entity. Web map
# mentioned, not linked (his call); revisit once a stable public URL
# exists.
title: "Buffalo Nations Biocultural Region Map"
summary: "Biocultural region mapping for the Buffalo Nations Food Systems Initiative: a public interactive web map and a large-format static map assembled from a dozen sources across two countries, with hand-built treaty and council layers and custom cultural symbology, delivered for the initiative to maintain independently."
year: 2022
tier: 3
role: "Analysis and cartography"
tools: ["ArcGIS Pro", "ArcGIS Online"]
client: "Buffalo Nations Food Systems Initiative"
clientPermission: "granted"
hasPage: true
cover:
  src: "../../assets/images/bnfsi-biocultural-region.jpg"
  alt: "Large-format map titled Buffalo Nations Biocultural Region of the Northern Plains and Rockies on a satellite-imagery base: bison symbols mark Buffalo Treaty signatories, feather symbols mark named Indigenous Advisory Council members, lodge symbols mark tribal colleges and universities, and an inset locates the region within North America."
  # fill was tried 2026-08-13 (the letterbox-gap pass) and REVERTED the
  # same day: this cover is the complete static map, not bare satellite —
  # a full-height crop slices its printed title mid-word. The card keeps a
  # small letterbox instead; a detail-crop cover would be a new decision.
draft: false
---

## Problem

The Buffalo Nations Food Systems Initiative (BNFSI) is an Indigenous-led
initiative at Montana State University working to restore intertribal food
sovereignty across the Northwestern Plains and Northern Rockies. The
initiative needed a way to show the region it serves as a biocultural
homeland rather than a set of administrative jurisdictions, and no single
dataset describes a biocultural region. Contracted
independently, I built an interactive public web map and a large-format
static map published on the BNFSI website.

## Approach

The map was assembled from roughly a dozen sources spanning two countries,
including U.S. Census TIGER American Indian/Alaska Native areas, Natural
Resources Canada Aboriginal Lands and First Nations locations, ORNL/USGS
post-secondary institutions, Natural Earth shaded relief, and the USGS
North American Atlas. Several layers did not exist and had to be built by
hand in ArcGIS Pro, including Buffalo Treaty signatory locations digitized
from the Treaty's own records, Indigenous Advisory Council member
locations, medicine wheel concentrations, and the biocultural region
boundary itself.

Cross-border integration was the bulk of the analytical work. U.S. and
Canadian land datasets use different projections, schemas, and naming
conventions, so reconciling reserves, reservations, trust lands, and
tribal and band names into unified layers required substantial cleanup and
a merged authority table.

The published web map
omits state, provincial, and federal boundaries so the region reads as a
network of relationships. Symbology was drawn
from cultural imagery, including a hand-scanned medicine wheel vectorized
to SVG and custom bison, feather, and lodge symbols, packaged into a
reusable style library so future editors inherit the same visual language.

Working inside ArcGIS Online meant designing around its limits. I built a
filter system to handle duplicate labels across dense clusters of small
land parcels, which the platform cannot deduplicate on its own. A second
phase in 2023 and 2024 rebuilt the map's terrain: rather than rely on a
stock hillshade, I derived a custom relief from continental elevation
data, generating slope, edge, highlight, and multi-radius blur components
and compositing them into one blended surface. The same phase
consolidated the project's scattered working data into a single
geodatabase and moved the shared thematic layers to hosted ArcGIS Online
feature services.

## What was delivered

A published ArcGIS Online web map and interactive web application with
narrative and user guide; the large-format static map for web
publication, revised through 2024; hosted feature layers with full
metadata, transferred to the initiative's ownership; data dictionaries for
both maps documenting source, projection, scale, purpose, and citation for
every layer; and a project overview and maintenance methodology enabling
the initiative to make future edits independently.

## Outcome

The static map is published on the BNFSI website, and the interactive
map is public. Because the feature layers, style library, and
documentation were transferred to BNFSI's ownership, the initiative can
extend and maintain the maps on its own.

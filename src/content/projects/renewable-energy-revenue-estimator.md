---
# 2026-08-13 audit flag 20, his call: "resolved as a residual against
# published totals" -> "backed out from published totals". Same operation.
# The rest of the Approach paragraph (mill rates, net assessed value, the
# A.R.S. cite, straight-line depreciation) is the audience's own working
# vocabulary and was deliberately left.
# 2026-08-05 de-AI pass: "Two caveats up front." is Jackson's own wording;
# spatial/fiscal halves line is the plainer option he picked.
# Card-only entry created 2026-07-29; promoted to a full case study
# 2026-07-31 after Jackson supplied the methods report
# (Methods_Report_Master.docx, revised July 2026, prepared under
# Resources and Communities Research and Consulting, LLC).
#
# CLIENT NAMING GRANTED 2026-07-31, both parties, his call. The
# relationship has three layers: he works through RCRC, contracts to the
# Center for American Progress, and CAP's client is the Arizona
# Governor's Office of Resiliency. `client` carries CAP because they are
# his direct client; the prose names the Arizona office as the end user.
# Do NOT write copy implying he was engaged directly by the State.
#
# NAME CHECK: he wrote "AZ Office of Government Resiliency"; the body's
# public name is the Arizona Governor's Office of Resiliency
# (resilient.az.gov), verified 2026-07-31.
#
# Every figure below comes from the methods report. Nothing is inferred.
# The URL remains the temporary netlify draft; replace it when the final
# public version ships.
title: "Arizona Renewable Energy Revenue Estimator"
summary: "A statewide spatial and fiscal model estimating what a utility-scale energy project would pay in local taxes in Arizona, and which taxing jurisdictions receive it, over a 25-year horizon."
client: "Center for American Progress"
clientPermission: "granted"
role: "Design, analysis, and development"
year: 2026
tier: 1
order: 0
# TOOLS: every entry here is named in the methods report except the
# build-script language, which the report leaves unstated. Python is NOT
# listed for that reason — same treatment as the unconfirmed ArcGIS Pro
# credit on Rooney. Ask him before adding it.
tools: ["ArcGIS Pro", "Excel", "JavaScript", "Leaflet"]
cover:
  # RE-CROPPED TALLER 2026-08-13 (2800x2600 -> 2210x2600 of the painted
  # _staging source, ratio 1.077 -> 0.85, Arizona whole with ~50px margins
  # all around), from Jackson: "I don't like the gaps on top and bottom of
  # some of the cards." At CardCover's 0.85 clamp floor the box now nearly
  # matches the tall cards, shrinking the letterbox from ~46px a side to
  # ~15. NOT fill: true — Arizona is 0.84, so a full-height crop in a
  # 0.78 card box would clip the state's width. This cover stays whole.
  src: "../../assets/images/az-renewable-energy-estimator-map.png"
  # Alt text unchanged from the card-only entry: it describes the actual
  # image, written by someone looking at it. Do not swap it for a generic
  # description of what the tool does.
  alt: "Map panel of the renewable energy revenue estimator: Arizona counties shaded from pale to deep orange by 25-year public revenue potential for a wind project, with a pin dropped in Coconino County."
links:
  - label: "Open the estimator"
    url: "https://az-re-revenue-full-draft.netlify.app/"
hasPage: true
# Every value restated from the body copy below; see the stats schema note.
# NO revenue figures here, same as everywhere else on this entry.
# STAT BAND REMOVED 2026-08-13, his call, in two steps: first "15
# counties is lame to highlight", then, shown replacement candidates,
# "remove the 672 validation scenarios as well. In fact, maybe this tool
# doesn't need a stat band." With 672 out, the remainder (6 / 25 yr) was
# thinner than no band. The OTHER FOUR entries keep their bands. To
# restore, re-add a `stats:` block; the values that were here, all still
# restated in the body: 672 validation scenarios matched to the cent /
# 6 technologies / 25 yr revenue stream / 15 counties.
draft: false
---

<!-- 2026-08-14, his direction: header "Problem" -> "Project Context" (this
page only; the other case studies keep the problem/approach/delivered/
outcome shape) and the opener rewritten to his supplied wording, with his
typo fixed and "in terms of" trimmed. -->

## Project Context

When a utility-scale energy project is proposed in Arizona, developers,
policymakers, and rural communities want to know what it would mean in
revenue over the life of the project. This tool helps answer that
question.

Property tax on generation equipment runs through a valuation statute with
its own assessment factor and depreciation schedule. The resulting money
then splits across a county, a school tax unit, a community college
district, and usually a fire district, none of whose boundaries line up
with each other or with the project footprint. If the site sits on federal
or state trust land, property tax does not apply at all and different
payments take its place. Getting from "a 200 MW solar project here" to
"this much to this school district over 25 years" meant assembling data
that had never been in one place.

<!-- 2026-08-14, his direction, "commissioned" -> "in partnership with".
Still names CAP as the direct relationship and the Arizona office as the
end user; the standing rule holds — no copy implying he was engaged
directly by the State. -->
The work was done in partnership with the Center for American Progress for
the Arizona Governor's Office of Resiliency.

## Approach

<!-- 2026-08-14, his call: the opener "The work had a spatial half and a
fiscal half, built to check each other." (the plainer option he picked in
the 08-05 pass) read as a consultant topic sentence and was CUT rather
than rewritten — the next two paragraphs already open "On the spatial
side" / "On the fiscal side", and the cross-checking claim lives in What
was delivered (672 scenarios, match to the cent). -->

<!-- 2026-08-14, his correction: it is many layers, not one statewide
layer. Source attributions unchanged. -->
On the spatial side, boundary data for every kind of taxing jurisdiction
in Arizona was pulled together and cleaned to a common standard: counties
and school districts from Census TIGER/Line, fire service areas and other
districts from state and agency GIS services, and incorporated places
filtered to those that actually levy. Overlapping school boundaries were intersected into composite tax
units so that any point resolves to exactly one unit. Land ownership was
dissolved into four non-overlapping taxability buckets, with priority given
to the non-taxable categories where source polygons disagree, because
whether ground is private, federal, state trust, or tribal decides whether
it is taxed at all.

On the fiscal side, Arizona Department of Revenue primary and secondary
levy tables were combined into a single levy dataset and converted to mill
rates against net assessed value. School levies took the most work, since
they are the largest local component: per-district secondary levies were
built up and reconciled to state totals for all fifteen counties, joint
technical education district levies were backed out from published totals, and one district's entry was corrected where it had been
carrying only its high-school component. Equipment valuation follows
A.R.S. § 42-14155, which sets full cash value at twenty percent of
depreciated cost, with straight-line depreciation over the useful life the
Department adopts for each technology and a floor at ten percent. Nuclear
is valued under a different statute and is handled separately.

Two caveats up front. The twenty percent
valuation treatment is scheduled to sunset at the end of 2040; the model
assumes it is extended, as it has been before, and says so, because if it
lapses as written the assessed values in later years would be roughly five
times what the tool reports. And several revenue lines are gross rather
than net, since state trust receipts and school levies both interact with
state equalization aid.

## What was delivered

An Excel calculator covering six technologies, which remains the
authoritative source for every rate and cost assumption, and an interactive
map built from it. The map is a single self-contained HTML file with all
data and mapping libraries embedded, so it runs with no server and no
internet connection.

The map does something the calculator cannot. Where the calculator works at
the county level, the map resolves the specific school tax unit and fire
district at a clicked point or across a drawn project footprint and applies
that jurisdiction's actual rate. It computes the federal right-of-way
capacity fee from the federal land share it resolves spatially, rather than
from a manual input, and reports a 25-year revenue stream broken out by
taxing authority, with the first-year figure expressed as a share of that
county's budget.

The map's revenue math is a re-implementation of the calculator's formulas,
and the two were validated against each other across 672 input scenarios.
They match to the cent.

A methods report documents the data sources, the reconciliation decisions,
the statutory basis for each valuation method, and the limitations.

## Outcome

The tool is delivered and in review. A build covering solar, wind, and
storage has been circulated to partners for feedback, while the full build
extends to geothermal and nuclear. A final public version is expected to
replace the draft linked here.

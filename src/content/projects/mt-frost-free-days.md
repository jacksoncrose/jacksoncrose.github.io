---
# Tier-3 card entry, added 2026-07-29. Card-only (hasPage false) per the
# tier-3 default; a full case-study page is a later option if Jackson
# wants one. Companion to the live Tools entry (mt-frost-free-days).
# Built in Jackson's separate "Montana Frost Free Days Calculator" Claude
# project; the full methodology, validation results, and build history
# live in that project's decision log. No client: his own research tool,
# grown out of 2023 WARC growing-season work. Role "Personal research
# project" is Jackson's pick (2026-07-30, from four options) — it pairs
# with Montana Hall's "Personal side project" register and tells the
# reader why no client is named. The estimator-precedent wording was
# considered and passed over for this entry.
title: "Montana Frost-Free Days"
summary: "Station freeze probabilities for planting decisions: last spring freeze, first fall freeze, and frost-free season length at 10, 50, and 90% odds for 409 Montana stations, 1991–2025. A fully scripted pipeline from raw observations to a single-file web app, validated against NOAA freeze normals."
year: 2026
tier: 3
role: "Personal research project"
tools: ["Python (pandas, xarray)", "GHCN-Daily via RCC-ACIS", "gridMET", "Leaflet"]
clientPermission: "not-applicable"
hasPage: false
links:
  - label: "Open the calculator"
    url: "https://jacksoncrose.github.io/frost-free-days/"
cover:
  src: "../../assets/images/mt-frost-free-days-app.png"
  alt: "Screenshot of the Montana Frost-Free Days calculator: a map of Montana with blue station markers shaded by median season length, and a panel for the Bozeman MSU station showing median freeze dates of May 24 and September 22 with a three-risk-level season band."
order: 6
draft: false
---

<!-- Card-only entry: no page is generated while hasPage is false. The
methodology record (probability semantics, record rules, NOAA/PRISM
validation, bootstrap CIs) lives in the tool's About dialog and the
project decision log. -->

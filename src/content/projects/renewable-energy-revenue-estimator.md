---
# Tier-1 card entry, created 2026-07-29 with Jackson. Fills the first
# selected-projects slot on Home (id must stay
# "renewable-energy-revenue-estimator" — index.astro selects by id).
#
# SETTLED 2026-07-29 by Jackson (tappable questions): year 2026; card-only
# for now (hasPage false — the full case-study page comes later from his
# write-up); NO cover image yet (the hero directly above the Home card
# already shows this interface; a distinct capture becomes the card image
# later); publish now. Role wording recommended by the session and
# accepted: describes the work, asserts no unconfirmed affiliation
# (BNFSI precedent).
#
# STANDING DECISIONS (AGENTS.md / open question 9): the client is NOT
# named. clientPermission stays "pending" with no client field, so the
# naming gate prints nothing. When naming permission lands, add client
# here.
#
# LINKING REVERSED 2026-07-30 by Jackson: "link it but we'll replace with
# the final when it is live." He supplied the URL himself. This overturns
# the earlier "NOT linked while the only URL is a draft address" rule for
# this entry only — the draft host name and the tool's own screening-only
# caveat were both put to him first, and he chose to link anyway.
#
# THE URL BELOW IS EXPLICITLY TEMPORARY. When the client's final public
# address exists, replace it here; nothing else needs to change. Because
# this entry has hasPage: false, the link is what the card points at, so
# a dead URL here means a dead card — check it before any future push if
# time has passed.
#
# COVER ADDED 2026-07-30. The original note below said no cover was
# needed because the Home hero directly above this card already showed
# the interface. That hero was REMOVED the same day (Jackson's call), so
# the estimator had no visual anywhere on the site and this card was the
# only one without an image.
#
# The cover is the map panel cropped out of the full-interface capture,
# not a new screenshot: Jackson picked it ("B — map panel") from three
# options rendered at actual card size. The full interface and the
# results panel were both legible at hero size but turn to mush at the
# 208 px the Home card gives an image; the Arizona choropleth survives
# the shrink and reads as his work at a glance.
#
# Cropped from the 4800 px ORIGINAL in _staging, not from the web
# derivative, then run through npm run images like any other asset. A
# fresh capture from the live tool would still be better and can replace
# this by dropping it into _staging under the same filename and
# re-running the pipeline. Cloud sessions cannot take that capture: the
# container's browser cannot reach the netlify host (WebFetch can read
# the page, Playwright gets ERR_TUNNEL_CONNECTION_FAILED), so it needs
# Jackson's own browser and his EDGE DevTools recipe.
title: "Renewable Energy Revenue Estimator"
summary: "An interactive estimator of the public revenue a utility-scale renewable energy project will generate: pick a county, size the project, and see estimated revenue by taxing authority over a 25-year term. Built for a national nonprofit."
year: 2026
tier: 1
role: "Design, analysis, and development"
clientPermission: "pending"
hasPage: false
links:
  - label: "Open the estimator"
    url: "https://az-re-revenue-full-draft.netlify.app/"
cover:
  src: "../../assets/images/az-renewable-energy-estimator-map.png"
  alt: "Map panel of the renewable energy revenue estimator: Arizona counties shaded from pale to deep orange by 25-year public revenue potential for a wind project, with a pin dropped in Coconino County."
order: 0
draft: false
---

<!-- Card-only entry: no page is generated while hasPage is false, so this
body is intentionally empty. The full case study (problem, approach, what
was delivered, outcome) is written with Jackson when the tool's naming and
URL questions settle. -->

---
# Added 2026-08-01. Delivered scenario map from the Montana rural school
# access analysis (02_GCF / "Project - Rural MT Schools", March 2025),
# supplied by Jackson at full resolution. Client naming granted; see the
# project entry and AGENTS.md for the standing constraints on this work.
#
# PAIRED with rural-school-access-closure as a wipe comparison. The two
# exports register: identical 3630x2805 layouts differing only inside the
# hex grid, verified pixel-wise before pairing (the only differences outside
# the grid are a 1px text baseline shift in the legend and the source line,
# from two separate ArcGIS export runs).
#
# "MACSS School" on the legend is the DATA SOURCE, not the client — the
# Montana Association of County School Superintendents database, Fall 2024.
# The client is the MSU Center for Research on Rural Education.
#
# Distance is STRAIGHT-LINE (NEAR_DIST), not road distance, which makes the
# figures conservative for Montana. Say so; do not let a reader assume
# drive time.
title: "Distance to the nearest school"
blurb: "Straight-line distance from each cell to the nearest school, with the 129 small rural schools of the MACSS database marked apart from all other schools. Cells are about 16 square miles."
year: 2025
tools: ["ArcGIS Pro"]
image: "../../assets/images/rural-school-access-current.png"
alt: "Hexagon grid covering Montana, each cell shaded by distance to the nearest school. Most cells are purple or blue, under ten miles, with green and yellow cells over fifteen miles scattered through the southeast, the far southwest, and central Montana."
group: "rural-school-access"
groupOrder: 1
pair: "rural-school-access"
pairLabel: "Current access"
order: 1
draft: false
---

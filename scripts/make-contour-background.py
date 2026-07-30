"""
make-contour-background.py — generates src/assets/images/bridger-contours.svg,
the Home page's contour-line background, from a real USGS DEM.

Why this exists: the background decision (settled with Jackson 2026-07-30)
is that the contours are REAL Montana terrain, not decorative squiggles —
consistent with the site rule that visuals are Jackson's own maps and data.
This script is the reproducible path from a DEM to the shipped SVG, so the
background can be regenerated (different crop, interval, or styling) without
guessing at how the original was made.

Input:  a USGS 1/3 arc-second DEM GeoTIFF covering the crop window, passed
        as the first argument. The shipped version was cut from tile
        n46w111 (lat 45–46 N, lon 111–110 W), kept in _staging/ (gitignored,
        like all source data).
Crop:   the Bridger Range — lat 45.80–45.98, lon −111.00–−110.75. The
        crop's high point is Sacagawea Peak (2,946 m in the DEM).
Output: 50 m contours with 250 m index contours, downsampled, lightly
        smoothed, and simplified (shapely) to keep the SVG under ~100 KB
        raw. Stroke opacity is baked at .45 regular / .7 index; the final
        on-page strength is set by the wrapper's opacity in index.astro.

Usage, from the repo root:
    python3 scripts/make-contour-background.py _staging/USGS_13_n46w111_20250122.tif

Dependencies: numpy, scipy, matplotlib, shapely, Pillow (any recent
versions; matplotlib is used only for its contour tracer, nothing renders).
"""

import sys

import numpy as np
from PIL import Image
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from scipy.ndimage import gaussian_filter
from shapely.geometry import LineString

# Tile georeference (n46w111): top edge lat 46, west edge lon -111, 1x1 degree.
TILE_TOP_LAT = 46.0
TILE_WEST_LON = -111.0

# Crop window: the Bridger Range.
LAT_MAX, LAT_MIN = 45.98, 45.80
LON_MIN, LON_MAX = -111.00, -110.75

INTERVAL = 50  # meters between contours
INDEX_EVERY = 5  # every 5th contour (250 m) is an index contour
DOWNSAMPLE = 4  # take every 4th DEM cell before contouring
SMOOTH_SIGMA = 1.2  # gaussian smoothing so lines are calm at 5% opacity
SIMPLIFY_TOL = 0.6  # shapely simplification tolerance, in downsampled cells
OUT = "src/assets/images/bridger-contours.svg"

Image.MAX_IMAGE_PIXELS = None
dem = np.asarray(Image.open(sys.argv[1]), dtype=np.float32)
H, W = dem.shape

r0 = int((TILE_TOP_LAT - LAT_MAX) * H)
r1 = int((TILE_TOP_LAT - LAT_MIN) * H)
c0 = int((LON_MIN - TILE_WEST_LON) * W)
c1 = int((LON_MAX - TILE_WEST_LON) * W)
crop = dem[max(r0, 0) : r1, max(c0, 0) : c1]

ds = gaussian_filter(crop[::DOWNSAMPLE, ::DOWNSAMPLE], SMOOTH_SIGMA)
lo = np.ceil(ds.min() / INTERVAL) * INTERVAL
levels = np.arange(lo, ds.max(), INTERVAL)

fig = plt.figure()
cs = plt.contour(ds, levels=levels)
plt.close(fig)

h, w = ds.shape
VW = 1600
VH = VW * h / w
sx, sy = VW / w, VH / h

paths = []
for i, segs in enumerate(cs.allsegs):
    is_index = levels[i] % (INTERVAL * INDEX_EVERY) == 0
    for seg in segs:
        if len(seg) < 10:
            continue
        seg = np.asarray(LineString(seg).simplify(SIMPLIFY_TOL).coords)
        pts = seg * [sx, sy]
        d = "M" + "L".join(f"{x:.0f},{y:.0f}" for x, y in pts)
        paths.append(f'<path class="{"i" if is_index else "c"}" d="{d}"/>')

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VW} {VH:.0f}" '
    'preserveAspectRatio="xMidYMin slice" role="presentation">'
    "<style>.c{fill:none;stroke:#1c1917;stroke-width:1;stroke-opacity:.45}"
    ".i{fill:none;stroke:#1c1917;stroke-width:1.8;stroke-opacity:.7}</style>"
    + "".join(paths)
    + "</svg>"
)
with open(OUT, "w") as f:
    f.write(svg)
print(f"{len(paths)} paths → {OUT} ({len(svg) // 1024} KB)")

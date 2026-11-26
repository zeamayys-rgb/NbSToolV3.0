"""Build assets/home/sea-map.svg: the 11 ASEAN member states as flat outlines.

Source: Natural Earth 1:50m admin-0 countries (public domain), via the world-atlas TopoJSON:
  https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json
Download it anywhere, then:  python3 scripts/build-sea-map.py <countries-50m.json>

Plain equirectangular projection: the region sits around the equator, so distortion is small.
One <path> per country (id = country slug) so a country can be styled on its own later.
"""
import json, sys

ASEAN = ['Brunei', 'Cambodia', 'Indonesia', 'Laos', 'Malaysia', 'Myanmar', 'Philippines',
         'Singapore', 'Thailand', 'Timor-Leste', 'Vietnam']
LON0, LON1, LAT0, LAT1 = 91.5, 141.5, -11.5, 29.0   # crop box
W = 1000                                             # viewBox width
H = round(W * (LAT1 - LAT0) / (LON1 - LON0))
TOL = 0.9                                            # simplification tolerance, viewBox units


def arcs_xy(topo):
    sx, sy = topo['transform']['scale']; tx, ty = topo['transform']['translate']
    out = []
    for arc in topo['arcs']:
        x = y = 0; pts = []
        for dx, dy in arc:
            x += dx; y += dy
            lon, lat = x * sx + tx, y * sy + ty
            pts.append(((lon - LON0) / (LON1 - LON0) * W, (LAT1 - lat) / (LAT1 - LAT0) * H))
        out.append(pts)
    return out


def ring(arcs, idx):
    pts = []
    for i in idx:
        a = arcs[i] if i >= 0 else arcs[~i][::-1]
        pts.extend(a[1:] if pts else a)
    return pts


def rdp(pts, tol):
    """Ramer-Douglas-Peucker, iterative."""
    if len(pts) < 4: return pts
    keep = [False] * len(pts); keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        (x1, y1), (x2, y2) = pts[a], pts[b]
        dx, dy = x2 - x1, y2 - y1; n = (dx * dx + dy * dy) ** .5
        best, bi = 0, None
        for i in range(a + 1, b):
            px, py = pts[i][0] - x1, pts[i][1] - y1
            # closed rings start and end on the same point: fall back to plain distance
            d = abs(dy * px - dx * py) / n if n else (px * px + py * py) ** .5
            if d > best: best, bi = d, i
        if bi is not None and best > tol:
            keep[bi] = True; stack += [(a, bi), (bi, b)]
    return [p for p, k in zip(pts, keep) if k]


def main(src):
    topo = json.load(open(src))
    arcs = arcs_xy(topo)
    paths = []
    for g in topo['objects']['countries']['geometries']:
        name = g['properties']['name']
        if name not in ASEAN: continue
        polys = g['arcs'] if g['type'] == 'MultiPolygon' else [g['arcs']]
        d = []
        for poly in polys:
            for r in poly:
                pts = rdp(ring(arcs, r), TOL)
                xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
                if len(pts) < 3 or max(xs) - min(xs) < 1.2 and max(ys) - min(ys) < 1.2:
                    continue   # drops specks smaller than ~1 unit; Singapore is kept below
                d.append('M' + 'L'.join(f'{x:.1f},{y:.1f}' for x, y in pts) + 'Z')
        if not d and name == 'Singapore':   # too small to survive the speck filter
            d = ['M' + 'L'.join(f'{x:.1f},{y:.1f}' for x, y in ring(arcs, polys[0][0])) + 'Z']
        slug = name.lower().replace(' ', '-')
        paths.append(f'<path id="{slug}" d="{"".join(d)}"/>')
    assert len(paths) == len(ASEAN), len(paths)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">'
           f'<!-- ASEAN member states. Natural Earth 1:50m (public domain). Built by scripts/build-sea-map.py -->'
           + ''.join(paths) + '</svg>\n')
    open('assets/home/sea-map.svg', 'w').write(svg)
    print(f'assets/home/sea-map.svg {W}x{H}, {len(svg) // 1024} KB')


if __name__ == '__main__':
    main(sys.argv[1])

#!/usr/bin/env python3
"""Refined deck probe.

Platter center = the spindle highlight inside the well (a tiny bright dot
at the geometric center of the recessed circle).

Arm pivot = the BOTTOM of the bell housing in arm.png (where the post
emerges into the plinth). Computed as the row where the brass blob has its
maximum width, which is the bell base.
"""

from PIL import Image
import os, json
from collections import deque

DECK = os.path.join(os.path.dirname(__file__), "..", "public", "deck")

def load(name): return Image.open(os.path.join(DECK, name)).convert("RGBA")

def is_brass(r,g,b,a): return a>=220 and r>=130 and r > b+30 and g>=70
def is_dark_well(r,g,b,a): return a>=220 and (r+g+b)<240 and max(r,g,b)<100
def is_very_bright(r,g,b,a): return a>=220 and r>=200 and g>=200 and b>=180
def is_opaque(r,g,b,a): return a>=200

def build_mask(img, predicate):
    W, H = img.size
    data = img.tobytes()
    mask = bytearray(W*H)
    for y in range(H):
        base = y*W*4
        for x in range(W):
            i = base + x*4
            if predicate(data[i], data[i+1], data[i+2], data[i+3]):
                mask[y*W + x] = 1
    return mask

def connected_components(mask, W, H, min_size=200):
    visited = bytearray(W*H)
    comps = []
    for y in range(H):
        for x in range(W):
            i = y*W + x
            if not mask[i] or visited[i]: continue
            q = deque([(x,y)]); visited[i] = 1
            xMin=xMax=x; yMin=yMax=y; n=0
            while q:
                cx, cy = q.popleft()
                n += 1
                if cx<xMin: xMin=cx
                if cx>xMax: xMax=cx
                if cy<yMin: yMin=cy
                if cy>yMax: yMax=cy
                for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx, ny = cx+dx, cy+dy
                    if 0<=nx<W and 0<=ny<H:
                        ni = ny*W+nx
                        if mask[ni] and not visited[ni]:
                            visited[ni] = 1; q.append((nx,ny))
            if n >= min_size:
                comps.append({"size":n,"xMin":xMin,"xMax":xMax,"yMin":yMin,"yMax":yMax,
                             "cx":(xMin+xMax)//2,"cy":(yMin+yMax)//2,
                             "w":xMax-xMin,"h":yMax-yMin})
    comps.sort(key=lambda c: -c["size"])
    return comps

def find_spindle_in_well(img, well_bbox):
    """The spindle is a tiny bright/metallic dot at the geometric center
    of the platter well. It interrupts the dark felt."""
    W, H = img.size
    data = img.tobytes()
    xMin, yMin, xMax, yMax = well_bbox["xMin"], well_bbox["yMin"], well_bbox["xMax"], well_bbox["yMax"]
    # Restrict search to the central 30% of the well
    x_pad = (xMax - xMin) * 0.35
    y_pad = (yMax - yMin) * 0.35
    sxMin, sxMax = int(xMin + x_pad), int(xMax - x_pad)
    syMin, syMax = int(yMin + y_pad), int(yMax - y_pad)
    mask = bytearray(W*H)
    for y in range(syMin, syMax+1):
        for x in range(sxMin, sxMax+1):
            i = (y*W + x) * 4
            r, g, b, a = data[i], data[i+1], data[i+2], data[i+3]
            # Spindle: brighter than felt
            if a >= 220 and (r+g+b) > 200:
                mask[y*W + x] = 1
    comps = connected_components(mask, W, H, min_size=10)
    if not comps: return None
    # Most compact (small + circular) cluster near center of search region
    sx = (sxMin + sxMax) / 2
    sy = (syMin + syMax) / 2
    def score(c):
        d = ((c["cx"]-sx)**2 + (c["cy"]-sy)**2) ** 0.5
        return -d  # closest to center
    comps.sort(key=score, reverse=True)
    return comps[0]

def fit_circle_to_bbox(bbox):
    """Use bbox center as circle center, larger of w/h as diameter."""
    return {
        "cx": (bbox["xMin"] + bbox["xMax"]) / 2,
        "cy": (bbox["yMin"] + bbox["yMax"]) / 2,
        "diameter": max(bbox["w"], bbox["h"]),
    }

def find_dark_hole_in_brass(img, brass_bbox):
    W, H = img.size
    data = img.tobytes()
    mask = bytearray(W*H)
    for y in range(brass_bbox["yMin"], brass_bbox["yMax"]+1):
        for x in range(brass_bbox["xMin"], brass_bbox["xMax"]+1):
            i = (y*W + x) * 4
            r, g, b, a = data[i], data[i+1], data[i+2], data[i+3]
            if a >= 230 and (r+g+b) < 90:
                mask[y*W + x] = 1
    comps = connected_components(mask, W, H, min_size=80)
    if not comps: return None
    def score(c):
        if c["w"] < 20 or c["h"] < 20: return -1
        ratio = min(c["w"], c["h"]) / max(c["w"], c["h"])
        return c["size"] * ratio
    comps.sort(key=score, reverse=True)
    return comps[0]

def probe_plinth():
    img = load("plinth2.png")
    W, H = img.size

    well_mask = build_mask(img, is_dark_well)
    well_comps = connected_components(well_mask, W, H, min_size=5000)
    platter = well_comps[0] if well_comps else None
    spindle = find_spindle_in_well(img, platter) if platter else None

    brass_mask = build_mask(img, is_brass)
    brass_comps = connected_components(brass_mask, W, H, min_size=300)
    upperRight = None; lowerLeft = None
    for c in brass_comps:
        if c["cx"] > W*0.5 and c["cy"] < H*0.5:
            if upperRight is None or c["size"] > upperRight["size"]:
                upperRight = c
        if c["cx"] < W*0.5 and c["cy"] > H*0.5:
            if lowerLeft is None or c["size"] > lowerLeft["size"]:
                lowerLeft = c

    armSocket = find_dark_hole_in_brass(img, upperRight) if upperRight else None

    return dict(W=W, H=H, platter=platter, platterSpindle=spindle,
                brassUpperRight=upperRight, brassLowerLeft=lowerLeft,
                armPivotSocket=armSocket)

def probe_arm():
    img = load("arm.png")
    W, H = img.size
    brass_mask = build_mask(img, is_brass)

    # Walk down from the top, tracking brass row width.
    # Bell base = the row where width is at its LOCAL MAXIMUM in the upper third
    # AND just before the elbow narrows. Easier: pick the LAST row in the
    # first widely-brass region where width starts to decrease.
    rows = []
    for y in range(0, H//3):
        l, r = -1, -1
        for x in range(W):
            if brass_mask[y*W + x]:
                if l < 0: l = x
                r = x
        if l < 0:
            rows.append((y, 0, 0, 0))
        else:
            rows.append((y, l, r, r-l))

    # Find the absolute widest row in the upper third — that's the bell base
    widest = max(rows, key=lambda r: r[3])
    widest_y, widest_l, widest_r, widest_w = widest

    # Bell TOP: the highest brass row (where the cap starts)
    top_brass_y = next((y for y, l, r, w in rows if w > 0), 0)

    # Bell INTERNAL CENTER (geometric center of brass blob in upper third)
    blob_pixels = [(x,y) for y in range(0, H//2) for x in range(W) if brass_mask[y*W+x]]
    if blob_pixels:
        bx_min = min(p[0] for p in blob_pixels)
        bx_max = max(p[0] for p in blob_pixels)
        by_min = min(p[1] for p in blob_pixels)
        by_max = max(p[1] for p in blob_pixels)
        bell_bbox = dict(xMin=bx_min, xMax=bx_max, yMin=by_min, yMax=by_max,
                         cx=(bx_min+bx_max)//2, cy=(by_min+by_max)//2)
    else:
        bell_bbox = None

    full = build_mask(img, is_opaque)
    bottom_y = 0; bottom_x = 0
    for y in range(H-1, -1, -1):
        for x in range(W):
            if full[y*W + x]:
                bottom_y = y; bottom_x = x
                break
        if bottom_y > 0: break

    return dict(W=W, H=H,
                bellTopY=top_brass_y,
                bellBaseRow=dict(y=widest_y, l=widest_l, r=widest_r, w=widest_w,
                                cx=(widest_l+widest_r)//2),
                bellBbox=bell_bbox,
                headshellBottom=dict(x=bottom_x, y=bottom_y))

def probe_vinyl():
    img = load("vinyl.png")
    W, H = img.size
    full = build_mask(img, is_opaque)
    comps = connected_components(full, W, H, min_size=10000)
    return dict(W=W, H=H, disc=comps[0] if comps else None)

plinth = probe_plinth()
arm = probe_arm()
vinyl = probe_vinyl()

result = {"plinth2": plinth, "arm": arm, "vinyl": vinyl}

W, H = plinth["W"], plinth["H"]
result["percentages"] = {}

# Use spindle if found, else fall back to platter bbox center
if plinth["platterSpindle"]:
    s = plinth["platterSpindle"]
    cx, cy = s["cx"], s["cy"]
    src = "spindle"
else:
    p = plinth["platter"]
    cx, cy = p["cx"], p["cy"]
    src = "well_bbox"
result["percentages"]["PLATTER"] = {
    "centerX": round(cx/W*100, 2),
    "centerY": round(cy/H*100, 2),
    "diameter_pct_W": round(max(plinth["platter"]["w"], plinth["platter"]["h"])/W*100, 2),
    "source": src,
}

if plinth["armPivotSocket"]:
    s = plinth["armPivotSocket"]
    result["percentages"]["ARM_MOUNT"] = {
        "centerX": round(s["cx"]/W*100, 2),
        "centerY": round(s["cy"]/H*100, 2),
        "socket_w_pct_W": round(s["w"]/W*100, 2),
    }
    # Plinth's brass mount diameter, used to size the arm bell relatively
    if plinth["brassUpperRight"]:
        result["percentages"]["PLINTH_MOUNT_DIAMETER_PCT_W"] = round(
            max(plinth["brassUpperRight"]["w"], plinth["brassUpperRight"]["h"])/W*100, 2
        )

if plinth["brassLowerLeft"]:
    b = plinth["brassLowerLeft"]
    result["percentages"]["SPEED_KNOB"] = {
        "centerX": round(b["cx"]/W*100, 2),
        "centerY": round(b["cy"]/H*100, 2),
    }

aw, ah = arm["W"], arm["H"]
br = arm["bellBaseRow"]
bb = arm["bellBbox"]
result["percentages"]["ARM_PIVOT_IN_IMAGE"] = {
    "x_bell_base": round(br["cx"]/aw*100, 2),
    "y_bell_base": round(br["y"]/ah*100, 2),
    "x_bell_center": round(bb["cx"]/aw*100, 2) if bb else None,
    "y_bell_center": round(bb["cy"]/ah*100, 2) if bb else None,
}

# Recommend ARM_LENGTH_PCT so bell width ≈ 75% of plinth's brass-mount diameter
plinth_mount_d = max(plinth["brassUpperRight"]["w"], plinth["brassUpperRight"]["h"]) / W if plinth["brassUpperRight"] else 0.193
bell_w_in_arm = br["w"] / aw  # bell width as fraction of arm image width
# Render: arm wrapper width = ARM_LENGTH_PCT * (aw/ah) of plinth W. So bell width on screen = bell_w_in_arm * ARM_LENGTH_PCT * aw/ah
# Want: bell_w_on_screen = 0.75 * plinth_mount_d
target_arm_length_pct = 0.75 * plinth_mount_d / (bell_w_in_arm * aw / ah) * 100
result["percentages"]["ARM_LENGTH_PCT_FOR_BELL_75PCT"] = round(target_arm_length_pct, 2)

# Same calc for bell = mount (1.0):
result["percentages"]["ARM_LENGTH_PCT_FOR_BELL_100PCT"] = round(target_arm_length_pct / 0.75, 2)

print(json.dumps(result, indent=2))

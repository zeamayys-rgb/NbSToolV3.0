"""Rebuild the NbS_Activities_Flow_v2.html embedded dataset from the ELIGIBLE
activities-longform sheet. Run: python3 build_rows.py [--write]"""
import json, re, sys, collections, openpyxl

ROOT = "/Users/abe/Work/Claude_Experiment/NbS Tool V3.0"
XLSX = f"{ROOT}/uploads/Activities Deep Dive Fix Latest V 3.0.xlsx"
HTML = f"{ROOT}/NbS_Activities_Flow_v2.html"
TAG = '<script id="dataScript" type="application/json">'

TRAJ = re.compile(r"^(Forest|Non-Forest)\s+to\s+(.+?)\s*\|\s*\((.+?)\)\s*\|\s*([A-Z]+)\*?$")
PREFIX = re.compile(r"^[GU][NPC]-\s*")


def clean(v):
    return str(v).strip() if v is not None else ""


def rows_from_sheet():
    ws = openpyxl.load_workbook(XLSX, read_only=True, data_only=True)["ELIGIBLE activities-longform"]
    out, skipped = [], collections.Counter()
    for raw in list(ws.iter_rows(values_only=True))[1:]:
        traj = clean(raw[1])
        if not traj:
            skipped["no trajectory (blank/#N/A filler)"] += 1
            continue
        m = TRAJ.match(traj)
        if not m:
            skipped[f"unparsable trajectory: {traj}"] += 1
            continue
        hlc, code, label, pw = m.groups()
        ind = clean(raw[6])
        if not ind or clean(raw[4]) == "N/A":
            skipped["no activity defined for this ecosystem"] += 1
            continue
        freq = clean(raw[9]).replace("Anually", "Annually")
        out.append({
            "hlc": hlc,
            "tr": f"{code} · {label}",
            "pw": pw,
            "ec": clean(raw[2]).upper(),
            "ac": clean(raw[3]),
            "bc": clean(raw[4]),
            "bn": PREFIX.sub("", clean(raw[5])),
            "ind": ind,
            "u": clean(raw[8]),
            "f": freq,
            "m": clean(raw[10]),
            "ref": clean(raw[11]),
            "def": clean(raw[7]),
        })
    return out, skipped


def main():
    rows, skipped = rows_from_sheet()
    html = open(HTML).read()
    s = html.index(TAG) + len(TAG)
    e = html.index("</script>", s)
    old = json.loads(html[s:e])

    print(f"old rows: {len(old)}   new rows: {len(rows)}")
    for reason, n in skipped.items():
        print(f"  skipped {n}: {reason}")
    for key in ("hlc", "tr", "pw", "ec", "ac", "bc", "bn", "ind"):
        o, n = {r[key] for r in old}, {r[key] for r in rows}
        print(f"\n[{key}] {len(o)} -> {len(n)}")
        for v in sorted(n - o):
            print(f"   + {v}")
        for v in sorted(o - n):
            print(f"   - {v}")

    assert rows, "no rows parsed"
    assert all(r["pw"] in ("PROTECT", "MANAGE", "RESTORE") for r in rows)
    assert all(r["ec"] in ("DRYLAND", "MANGROVE", "PEATLAND") for r in rows)
    assert all(r["bc"] in ("Nature", "People", "Climate") for r in rows)
    assert not any(PREFIX.match(r["bn"]) for r in rows)

    if "--write" in sys.argv:
        payload = json.dumps(rows, ensure_ascii=False, separators=(",", ":"))
        open(HTML, "w").write(html[:s] + payload + html[e:])
        print("\nwritten.")


main()

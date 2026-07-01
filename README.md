# NbS Tool V3.0

A high-fidelity, front-end prototype of the **NbS Tool** — the design-test build
for the **SCeNe Coalition / ASEAN‑NbS Tool** project. It walks a Nature-based
Solutions project through its full lifecycle: scope a site, read its baseline,
choose an intervention pathway, generate donor-ready documents, and monitor
impact (MRV).

This is a **static site** — plain HTML, CSS and JavaScript. No framework, no
build step.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Interactive Map | `interactive-map.html` |
| Document Generator | `document-generator.html` |
| Dashboard | `dashboard.html` |
| Project Detail | `project-detail.html` |
| Create Monitoring Plan | `create-monitoring-plan.html` |
| New Project (from scratch) | `new-project.html` |
| Monitoring Form | `monitoring-form.html` |
| MRV | `mrv.html` |
| Login | `login.html` |
| Account Settings | `account-settings.html` |
| Design System reference | `design-system.html` |

## Structure

```
.
├── index.html            # home — served at /
├── *.html                # all other pages (flat, at root)
├── css/                  # stylesheets (tokens.css is the shared design tokens)
├── js/                   # scripts (nav-mobile.js is shared)
├── assets/               # images, SVGs, icons
│   └── genctx-icons/     # self-contained Figma export used by the map pages
├── vercel.json           # cleanUrls for Vercel
└── .vercelignore         # keeps local-only folders out of the deploy
```

`uploads/`, `scraps/` and `docs/` are local-only (gitignored) — source material,
backups, and QA/changelog notes, not part of the shipped site.

## Run locally

No dependencies — serve the folder with any static server:

```bash
python3 -m http.server 8765
# then open http://localhost:8765/
```

## Deploy

**Vercel** — static, zero build. `vercel.json` enables clean URLs
(`/dashboard` rather than `/dashboard.html`). Import the repo in Vercel and
deploy; the root is the output directory.

The repo also carries a self-hosted deploy workflow (`.github/workflows/`) that
pulls `main` onto a private server over WireGuard/SSH.

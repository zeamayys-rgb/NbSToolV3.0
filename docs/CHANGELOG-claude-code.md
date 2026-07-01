# Change Log — Claude Code

This file tracks changes made in **Claude Code** (the code side of the loop).
It is the counterpart to the Claude Design changelogs (`CHANGELOG.md`,
`CHANGELOG-chat.md`, `CHANGELOG-session-*.md`), which track the design side.

**Repository:** `WRI-Indonesia/design-test-nbs`

## Workflow

```
Claude Code  →  git  →  Claude Design  →  export zip  →  Claude Code  →  repeat
```

- **Claude Code → git:** Claude Code implements fixes/features and pushes to `main`.
  Record those changes here.
- **Claude Design → zip:** design edits come back as a zip with their own changelog.
- **zip → Claude Code:** Claude Code overlays only the files the design changelog
  lists (verified by diff), preserving the hand-built home page, then commits.

> **Convention:** newest entries on top. When applying a Claude Design zip, note
> which files were overlaid and confirm the home page (`F00 Home.html`, `home.css`,
> testimony assets, footer logo) was left untouched.

---

## 2026-07-01 — Applied "NbS Tool Design (3.0)" from Claude Design

Overlaid the Claude Design export (`NbS Tool Design (3.0) (1).zip`). Diff verified
against `CHANGELOG.md`; only the listed files were applied. Home page preserved.

- **Overwrote:** `f03-app.js`, `f05-0.css`, `f05.css`,
  `screens/F04 Dashboard.html`, `screens/F04.1 Project Detail.html`,
  `screens/F05 Create Monitoring Plan.html`,
  `screens/F05.0 Create New Project From Scratch.html`
- **Added:** `f05-shared.js`, `screens/genctx_icons/assets/landslide.jpg`
- **Added design changelogs:** `CHANGELOG.md`, `CHANGELOG-chat.md`,
  `CHANGELOG-session-2026-07-01.md`
- **Skipped:** `.thumbnail` (junk), 3 loose `uploads/` scratch images
- **Preserved:** `F00 Home.html`, `home.css`, `terrain.jpg`, testimony assets,
  footer logo — none were in the design diff
- Backup of overwritten files: `scraps/v3-backup-*`

_See the Claude Design changelogs for the design-side detail (F03 form/progress
rework, F04.1 Analysis-tab rebuild, F05/F05.0 shared activity system, etc.)._

---

## 2026-06-24 — Home page (hand-built in Claude Code)

The Three.js home page and its polish were built/fixed directly in Claude Code —
these live only here, not in the Claude Design flow, so the overlay step must
always preserve them.

- **Footer logo fix** — replaced the stretched, white-boxed `scene-logo.png` with
  the dark-ready white-wordmark `scene-logo-light.png`, sized `width:auto` to keep
  the aspect ratio; removed the `.logo-chip` box. *(PR — merged to `main`)*
- **Testimony section** — replaced the placeholder quote with a sleek 2×2 grid of
  four real partner testimonials (Philippine Eagle Foundation, Hutan Kita
  Institute), each with a circular photo (`assets/testimony/`) + initials fallback.
- **Hero warm-cache invisibility fix** — the GSAP intro used
  `gsap.from(..., {opacity:0})`, which reads the element's *current* opacity as the
  animation's end value. On a warm cache `window.load` fired before the reveal
  IntersectionObserver applied `.is-in`, so GSAP captured `opacity:0` as the target
  and animated `0→0`, leaving the hero invisible. Switched the five intro tweens to
  `fromTo(..., {opacity:1})` so the end state no longer depends on the load-vs-observer
  race. *(PR #2 — merged)*
- **Journey spacing** — added `30px` bottom padding to `.journey-top`. *(PR #2)*
- **Iterasi 2 import** — overlaid an earlier Claude Design export while keeping the
  new Three.js home (`F00 Home.html` + `home.css`). *(PR #1 — merged)*

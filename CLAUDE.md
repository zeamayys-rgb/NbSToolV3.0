# CLAUDE.md — NbS Tool V3.0

A high-fidelity front-end prototype of the **NbS Tool** for the **SCeNe Coalition /
ASEAN-NbS Tool** project (WRI Indonesia). It walks a Nature-based Solutions project through its
lifecycle: scope a site, read its baseline, choose an intervention pathway, generate donor-ready
documents, monitor impact (MRV).

**Static site.** Plain HTML, CSS and JavaScript. No framework, no build step, no
`package.json`. Routes are `.html` files at the repo root; `vercel.json` sets `cleanUrls`.

```bash
python3 -m http.server 8765   # then open http://localhost:8765/
```

---

## Design canon — read before changing any UI

The design documentation lives in **[`docs/design/`](docs/design/)** and replaces the Figma
canvas. Start at [`docs/design/README.md`](docs/design/README.md).

### Two hard rules

1. **[`docs/design/tokens.json`](docs/design/tokens.json) is the source of truth for every
   colour, spacing, radius, typography, shadow and duration value.**
   Never type a literal hex, px or ms into a stylesheet, an inline `<style>`, or a JS template
   string. Use the `var(--…)` binding from [`css/tokens.css`](css/tokens.css), which
   `tokens.json` documents. If the value you need has no token, that is a design question — add
   a `TODO(design)` entry to `tokens.json`, don't mint a name.

   The codebase does not currently obey this: roughly 1,200 literal hexes duplicate tokens that
   already exist (`#066653` appears 219 times). **Don't add to the pile.** Any file you touch,
   leave with fewer literals than you found.

2. **Read [`docs/design/UI-STATES.md`](docs/design/UI-STATES.md) before implementing any
   data-driven UI.** It is the state matrix: what each screen shows when data is loading, empty,
   partial, failed, out of scope, too long, or stale. Most of those states do not exist yet in
   this codebase, and the file says so explicitly. **Building only the happy path is how it got
   that way.**

### The rest of the canon

| File | Use it for |
|---|---|
| [`docs/design/TOKENS.md`](docs/design/TOKENS.md) | The three tiers, naming convention, how to add a token |
| [`docs/design/COMPONENTS.md`](docs/design/COMPONENTS.md) | Props, variants, states and the accessibility contract per component |
| [`docs/design/SCREENS.md`](docs/design/SCREENS.md) | Every route: purpose, layout, data dependencies |
| [`docs/design/FLOWS.md`](docs/design/FLOWS.md) | User journeys, including the branches that should exist but don't |
| [`docs/design/MOTION.md`](docs/design/MOTION.md) | Existing animation, plus a **proposed** duration/easing scale (not approved) |
| [`docs/design/DECISIONS.md`](docs/design/DECISIONS.md) | Why things are the way they are. Append-only |

### Keeping them true

**Update the canon in the same PR as the code it describes.** New colour → `tokens.json`. New
screen → a `SCR-` entry and its state matrix. Changed component behaviour → its `CMP-` entry.
Structural choice → a `DEC-` entry. IDs (`SCR-`, `CMP-`, `FLW-`, `TOK-`, `DEC-`) are stable:
never reuse or renumber one.

---

## Code layout

```
*.html            every route, flat at the repo root
css/              tokens.css is the shared token layer; the rest are per-screen
js/               nav-mobile.js loads everywhere; analysis-shared.js, f05-shared.js
                  and people-context.js are shared across screens
assets/           images, SVGs, icons
docs/design/      the design canon (tracked in git; excluded from deploys)
docs/             everything else here is local-only, gitignored
uploads/ scraps/  local-only, gitignored
```

**Shared code, in order of reach:**
- [`css/tokens.css`](css/tokens.css) — tokens, global reset, accessibility baseline, dark theme.
  Loaded by every screen. Changes here affect everything.
- [`js/nav-mobile.js`](js/nav-mobile.js) — nav, mobile drawer, profile dropdown, desktop-notice
  dismissal, and `hardenSvgs()` which makes every unlabelled inline `<svg>` `aria-hidden`.
- [`js/analysis-shared.js`](js/analysis-shared.js) — the Data Analyser panes. Mounted by both
  `interactive-map.html` and `project-detail.html`.
- [`js/f05-shared.js`](js/f05-shared.js) — the activity and indicator catalogue, shared by
  `new-project.html` and `create-monitoring-plan.html`.

Edit shared files with care: there is no component system, so these four *are* the abstraction
layer.

---

## Conventions

- **Accessibility is not optional.** The baseline in `css/tokens.css` (focus-visible rings,
  placeholder contrast, `.sr-only`, `.skip-link`) applies everywhere — don't override it. New
  interactive elements need a real role, a keyboard path, and a label. See the blocking list in
  `docs/design/README.md` for the gaps that already exist; don't add more.
- **An icon is decorative by default.** `hardenSvgs()` hides any inline `<svg>` without an
  `aria-label`, `role="img"` or `<title>`. To make one meaningful, label it.
- **Never invent data.** Every figure in this product is illustrative sample data (see DEC-11).
  Don't add numbers, statistics or claims that aren't sourced — this is an environmental tool
  whose output is meant to persuade funders. Flag anything needing verification.
- **Plain English.** The audience is policymakers, field teams and funders across Southeast
  Asia, not developers.
- **Be conservative with restructuring.** Ask before large changes.
- **No secrets in the repo.** Keys go in environment config only, never in a file, a prompt or a
  log.

## Domain vocabulary

**NbS** Nature-based Solutions · **MRV** Monitoring, Reporting and Verification ·
**AOI** Area of Interest · **Ecosystem** forest, mangrove, peatland ·
**Intervention** protect, manage, restore · **SCeNe** the coalition behind the tool.

Screens carry F-codes from the GUI design document: **F01** Interactive Map · **F02** Data
Analyser · **F03** Document Generator · **F04** Dashboard · **F04.1** Project Detail ·
**F05** Monitoring Plan · **F05.0** New Project · **F05.1.1** Monitoring Form · **F06** MRV ·
**F08** Account Settings.

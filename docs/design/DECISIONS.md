# DECISIONS.md — decision log

Append-only. Never edit or delete an entry — supersede it with a new one that references the
old `DEC-` ID.

Entries labelled **`inferred`** were reconstructed from the code, comments, `CHANGELOG.md` and
git history rather than found written down. **They need confirming or correcting.** Entries
labelled **`documented`** were found stated somewhere in the repo.

Dates come from git history and `CHANGELOG.md` where they exist, and are "unknown" otherwise.

---

## DEC-01 · Static site, no framework, no build step

**Date.** unknown (predates the git history) · **Status.** `documented` — `README.md`

**Decision.** Plain HTML, CSS and JavaScript. No React, no bundler, no package manager. There is
no `package.json` in the repo.

**Context.** A high-fidelity design-test prototype for the SCeNe Coalition / ASEAN-NbS Tool
project, deployed to Vercel as static files with `cleanUrls`. Anyone can open a file and edit
it; there is nothing to install and nothing to build.

**Alternatives visible in the code.** None taken. `js/f03-app.js` opens with the comment
*"vanilla JS (no React/Babel)"* and `js/f0511-app.js` repeats it — so React was considered per
screen and rejected each time.

**Consequences.** Zero build friction and total portability. But: no component reuse mechanism,
so the same button is written in twenty stylesheets; no type checking; no tree-shaking, so
`interactive-map.html` pulls nine stylesheets; and 694KB of generated data is inlined into
`NbS_Activities_Flow_v2.html` because there's no import.

---

## DEC-02 · One canonical token layer, primitives plus semantics

**Date.** ~2026-07-31 (`css/tokens.css` last modified) · **Status.** `documented` — file header

**Decision.** `css/tokens.css` holds a two-layer token system: a primitive palette (*"the only
hexes that exist"*) and a theme-aware semantic layer with a `[data-theme="dark"]` override.

**Context.** The header names its origin: *"from 00 Foundation - Design System"* — a Figma
foundation file.

**Alternatives visible in the code.** Per-screen colour definitions, which is what the other 21
stylesheets still do.

**Consequences.** The foundation is genuinely good and is what made
[`tokens.json`](tokens.json) possible to write. But the stated rule — *"the only hexes that
exist"* — is broken roughly 1,200 times across the codebase, and dark theme is therefore broken
by construction on every screen that types a literal. See `TODO-14`.

---

## DEC-03 · Global reset and accessibility baseline live in the token file

**Date.** ~2026-07-31 · **Status.** `documented` — `css/tokens.css`, marked "P-06" and "Wave 4"

**Decision.** `css/tokens.css` carries three things beyond tokens: a global reset (moved out of
`home.css` and `dashboard.css`), an accessibility baseline (focus-visible rings, placeholder
contrast, `.sr-only`, `.skip-link`), and the dark-theme override.

**Context.** Written during an accessibility remediation pass ("Wave 4"). Putting the baseline
in the one file every screen loads guarantees coverage.

**Alternatives visible in the code.** Per-screen focus styles, which is what existed before —
the comments record the move.

**Consequences.** Focus indication is the **only** systematically-applied interactive state in
the product, precisely because it lives here. That is the argument for putting the
reduced-motion block here too (see MOTION.md). The cost is that a file named `tokens.css` is
also a reset and a stylesheet, so "just the tokens" cannot be consumed independently.

---

## DEC-04 · Focus rings only for keyboard users

**Date.** ~2026-07-31 · **Status.** `documented` — `css/tokens.css`, marked "A1"

**Decision.** `:focus-visible` paints a 2px outline; `:focus:not(:focus-visible)` suppresses the
legacy outline. Comment: *"Mouse clicks stay clean (:focus-visible only); keyboard shows a
ring."* A white ring is substituted on dark surfaces (`.sitenav a`, `.btn-primary`).

**Consequences.** Correct modern practice. The dark-surface override is a real detail most
projects miss. Worth noting the outline is deliberately *not* animated — see MOTION.md.

---

## DEC-05 · Inter dropped from the type stack

**Date.** ~2026-07-31 · **Status.** `documented` — `css/tokens.css`, marked "DA-06"

**Decision.** `--font-override: "Poppins", system-ui, sans-serif` with the comment *"Inter
dropped (DA-06) — not a system family"*.

**Context.** From a design audit. Inter was being used as though it were a system font.

**Consequences.** **The decision was made but not carried out.** Ten of sixteen pages still load
Inter from Google Fonts, and three stylesheets hardcode `'Inter', sans-serif`. The
`--font-override` token exists only to overwrite those rules — so the product ships an extra
webfont in order to not use it. Once the Inter links are removed, `--font-override` can go too
(`TODO-15`).

---

## DEC-06 · Acumin Pro Condensed named as the display face

**Date.** unknown · **Status.** `inferred`

**Decision.** `--font-display: "Acumin Pro Condensed", "Barlow Semi Condensed", "Saira
Condensed", sans-serif`.

**Context.** Acumin Pro Condensed is an Adobe Fonts family. It presumably comes from a brand
guideline outside this repo.

**Alternatives visible in the code.** Barlow Semi Condensed sits second in the stack and is the
face every page actually loads from Google Fonts.

**Consequences.** **Acumin is never loaded by any page.** Every heading in the product renders
Barlow Semi Condensed. The two faces have noticeably different proportions, so the product does
not look like the brand guideline it was designed against. Either Acumin needs licensing and
self-hosting, or the token should name Barlow honestly. `TODO-04` — **blocking**, because it
affects every heading.

---

## DEC-07 · `f05-shared.js` as a single source of truth for activities

**Date.** on or before 2026-07-01 · **Status.** `documented` — `CHANGELOG.md` item 18

**Decision.** *"Created `f05-shared.js` as a single source of truth for NbS activity content +
the activity-card UI, loaded by both F05 and F05.0 — edits now propagate to both pages
automatically."*

**Context.** The activity catalogue was duplicated between SCR-04 and SCR-08.

**Consequences.** The clearest instance of the right instinct in this codebase, and the model
`js/analysis-shared.js` and `js/people-context.js` follow. It is also why SCR-03 Step 4 and
SCR-08 can share a data contract at all — via `localStorage` key `nbs_selected_activities`.
That handoff has no failure behaviour, which is the cost of sharing state through a browser key
rather than a module.

---

## DEC-08 · Analysis content rebuilt from Figma as HTML string factories

**Date.** 2026-07-07 to 2026-07-21 · **Status.** `documented` — source comments in `js/analysis-shared.js`

**Decision.** The Data Analyser panes are generated by JS template-literal factories (`gcHead`,
`gcSub`, `gcSource`, `ncSpecies`, `clChart`), with comments citing exact Figma node IDs — *"live
HTML rebuilt from Figma (F02 P2, node 3892-33528)"*.

**Context.** Complex, data-dense layouts designed in Figma and rebuilt by hand.

**Consequences.** The node IDs make the design provenance traceable, which is unusually
disciplined. But the panes are now HTML strings inside a 1,371-line JS file — not inspectable in
a browser's element panel until runtime, not searchable as markup, and not reviewable by anyone
who doesn't read JS. This is also why `interactive-map.html` and `project-detail.html` can mount
the same analysis content: it's a function call, not a template.

---

## DEC-09 · Info affordances attached to what a reader would look up

**Date.** ~2026-07 · **Status.** `documented` — source comment in `js/analysis-shared.js`

**Decision.** *"The 'i' belongs to whatever a reader would look it up by. A card with a single
[metric] gets the 'i' on the card head; a card with several gets one per sub-heading."*

**Context.** Deciding where methodology and source links belong on dense data cards.

**Consequences.** Good editorial reasoning, recorded where it will be found. It is a convention
with no enforcement, so it will drift. And the affordance it governs (`gcInfo`) is an `<svg>`
with `role="button"` and `tabindex="0"` — **focusable but not keyboard-operable**, which is
worse than not being focusable at all. See CMP-06.

---

## DEC-10 · Benefit modal reads its content from the card markup

**Date.** ~2026-07 · **Status.** `documented` — source comment in `js/analysis-shared.js`

**Decision.** *"Both are read off the card itself, so the card markup stays the single source of
truth"* — definition from `[data-def]`, method from `.formula code` or `data-method`. The
overlay is appended to `<body>` *"so it is never clipped by the analyser's scroll panes."*

**Alternatives visible in the code.** A separate content dictionary, which is what the
`data-layer-info` popup does for datasets — so both approaches exist side by side in one file.

**Consequences.** Card and modal can never disagree, which is the right property for a
methodology disclosure. It also means editing card copy silently edits modal copy. The
`<body>`-level mount is the correct fix for the clipping problem and should be the pattern for
the unified modal (CMP-20).

---

## DEC-11 · Illustrative sample data throughout

**Date.** on or before 2026-07-01 · **Status.** `documented` — `CHANGELOG.md` "Open items", and a `ponytail:` comment in `js/people-context.js`

**Decision.** All figures are self-consistent sample data. *"Analysis-tab figures (areas,
percentages, baselines) are self-consistent sample data — replace with real values when
available."* And in code: *"values are illustrative samples for the mock; live values come from
the data pipeline."*

**Context.** A design prototype built ahead of the data pipeline.

**Consequences.** The right call for the build — and it is honestly recorded, in two places.
But **the record lives in a gitignored changelog and a source comment, not in the UI.** A
stakeholder in a demo sees "13,942.2 ha" with a source-and-year attribution line beneath it.
Analysis results are also identical for every polygon drawn, which testers will read as a bug.
`TODO(design)` in UI-STATES.md SCR-03 — **blocking before any public or stakeholder demo.**

---

## DEC-12 · Upload errors typed by cause, with tone matched to cause

**Date.** ~2026-08-14 (`new-project.html` last modified) · **Status.** `inferred` from `UPLOAD_ERRORS`

**Decision.** Three error types — `format`, `area`, `region` — each with `tone`, `tag`, `title`,
`msg` and `detail`. **`format` is `danger`; `area` and `region` are `warning`.**

**Context.** A file can fail for reasons that are the user's mistake, and for reasons that are
simply the product's scope.

**Alternatives visible in the code.** A single generic error, which is what every other screen
has.

**Consequences.** The best state design in the product and the model for everything else: tone
matches cause, four content slots each do one job, the filename is echoed back, a probable cause
is named (*"a wrong projection can place a valid site outside the region"*), and there are two
ways out. **Not applied on SCR-03**, so the same two rules are enforced at one door and ignored
at the other. See FLW-04 — **blocking**.

---

## DEC-13 · Shared behaviour centralised into `nav-mobile.js`

**Date.** ~2026-07 · **Status.** `documented` — source comments marked "Q-03" and "Wave 4 — A6"

**Decision.** One file carries mobile nav, desktop-notice dismissal, the profile dropdown
(*"wired once here, removed from all 7 screen inline scripts"*) and `hardenSvgs()`.

**Consequences.** Seven copies of the dropdown script became one. `hardenSvgs()` makes every
unlabelled inline `<svg>` `aria-hidden` — a good default, but it is why CMP-07's charts are
entirely invisible to assistive tech: they're unlabelled, so they're hidden. It also re-runs on
`setTimeout` at 400ms and 1200ms to catch JS-rendered icons, which is a timing race rather than
a guarantee.

---

## DEC-14 · Client-side persistence via `localStorage`

**Date.** various · **Status.** `inferred`

**Decision.** Six keys carry state with no backend: `nbs-theme`, `nbs-vu-seen`,
`nbs_selected_activities`, `nbs_deleted_project`, `f03_gen` / `f03_ccb`, `f0511_data`.

**Consequences.** The prototype is genuinely usable end-to-end without a server, which is what
makes it demo-able. The costs are all real: drafts don't follow the user; two users on one
machine collide (no key namespacing); `nbs_selected_activities` is the only link between SCR-03
and SCR-08 and has no missing-key behaviour; `f0511_app.save()` has no try/catch, so a quota
error on the field-data screen loses an entry silently. Tracked in UI-STATES.md — **blocking**.

---

## DEC-15 · Desktop-first, with a notice rather than a mobile design

**Date.** ~2026-07-06 · **Status.** `inferred` from `.desktop-notice` copy

**Decision.** Data-dense screens show a dismissible banner: *"Best viewed on desktop. The NbS
Tool is built for larger screens. This page still works on mobile, but for the full experience —
wide data tables, side-by-side panels and editing — open it in a desktop browser."*

**Alternatives visible in the code.** A genuine mobile layout. The mobile nav drawer exists, so
mobile wasn't ignored — it was scoped.

**Consequences.** An honest, well-written admission rather than a broken layout, and it names
what specifically is worse. But **SCR-09 Monitoring Form is a field-data screen** — the one
screen most likely to be used on a phone, standing in a mangrove — and a desktop-first posture
is hardest to justify there. Dismissal is also per-page, so the banner returns on every
navigation.

`TODO(design): does SCR-09 need a genuine mobile design rather than a notice? It is the screen whose users are least likely to have a desktop.` **Blocking.**

---

## DEC-16 · Dark theme defined but never exposed

**Date.** ~2026-07-31 · **Status.** `inferred`

**Decision.** A complete `[data-theme="dark"]` token set exists and `localStorage` key
`nbs-theme` is read and written — but **no screen has a theme toggle** in its nav or settings.

**Alternatives visible in the code.** `js/tweaks-vanilla.js` (`mountTweaks`) is a developer
panel with an `isLight(hex)` helper, suggesting theme switching was explored as a dev tool.

**Consequences.** Half the token layer is untested against real screens. And because ~1,200
literal hexes bypass the tokens, enabling dark theme today would produce a half-dark product.
Two further problems are already visible in the token values: brand text and fills stay at
`viridian.600` on a near-black ground (~2.4:1, below the 4.5:1 minimum), and every `*Subtle`
status background collapses to the same `gray.900`, so status is carried by text colour alone.
`TODO-08` — **blocking, if dark theme is ever shipped.**

---

## DEC-17 · Five independent modal implementations

**Date.** various · **Status.** `inferred`

**Decision.** No decision was made. Each screen that needed a modal built one.

**Context.** With no component mechanism (DEC-01), there was nothing to reuse, so each
implementation solved a slightly different problem: `nbsBenefitInfo()` needed body-level
mounting to escape scroll clipping; `version-modal.js` needed to inject its own CSS; the F03/
F05.1.1 overlays needed to render from a state variable.

**Consequences.** Each got a different subset of the contract right — `nbsBenefitInfo()` has the
best ARIA and restores focus, `version-modal.js` has scroll lock and reduced-motion — and **none
of the five traps focus**. Tabbing past the last control in any modal in this product walks into
the page behind it. See CMP-20 — **blocking, accessibility.**

---

## DEC-18 · Design system page not linked from anywhere

**Date.** ~2026-07-21 · **Status.** `inferred`

**Decision.** `design-system.html` (1,363 lines) is reachable only by typing the URL. It appears
in no nav, footer or sitemap.

**Consequences.** The product's own design documentation is invisible to the people who need it.
It also matters more than "an orphan page" suggests: **SCR-04's upload error links to
`design-system.html#requirements`** as its "View upload requirements" action — so a user hitting
a real error is sent to an unlinked developer page. See UI-STATES.md SCR-04 — **blocking.**

---

## DEC-19 · `docs/` excluded from git and from deploys

**Date.** ~2026-08-06 · **Status.** `documented` — `.gitignore`, `.vercelignore`, `README.md`

**Decision.** *"`uploads/`, `scraps/` and `docs/` are local-only (gitignored) — source material,
backups, and QA/changelog notes, not part of the shipped site."*

**Context.** Keeping working material out of the deployment.

**Consequences.** Correct for `uploads/` and `scraps/`, and correct that docs shouldn't deploy.
But it also means `CHANGELOG.md`'s Part 2, the QA audit reports, and the decision record you are
reading were all untracked — every design rationale in this project has been one `rm -rf` from
gone. **Superseded by DEC-20.**

---

## DEC-20 · `docs/design/` tracked in git, still excluded from deploys

**Date.** 2026-09-03 · **Status.** `documented` — this change

**Decision.** `.gitignore` gains a negation for `docs/design/` so the design canon is version
controlled. `.vercelignore` is left alone — the docs still don't ship to the public site.

**Context.** DEC-19 is right that docs shouldn't deploy, but these files must be reviewable in a
PR alongside the code they describe, or they'll drift within a sprint.

**Consequences.** Design documentation is now diffable, reviewable and recoverable. It also
means these files can go stale in a way a reader will trust — so the rule in
[README.md](README.md) applies: **update them in the same PR as the code they describe.**
Supersedes DEC-19 for `docs/design/` only; `uploads/`, `scraps/` and the rest of `docs/` are
unchanged.

## DEC-21 · The Technical Documentation page reads live parameters, it never restates them

**Date.** 2026-09-07 · **Status.** `documented` — this change

**Decision.** SCR-17 (`technical-docs.html`) hard-codes no numeric constant. At page load,
`readLiveParameters()` in `js/technical-docs.js` reads the objects the product itself renders
from — `NBS_DATA`, `NBS_LAYER_INFO`, `ecosystems`, `indicatorMeta`, `NBS_PEOPLE` — and, for the
carbon method, parses `NBS_ANALYSIS['benefit-content']` with `DOMParser` to recover the benefit
cards' own methods, metrics, formulas and the gross → net deduction chain. Every figure in the
prose goes through `docParam()` / `docNum()`. A value that cannot be read renders as a visible
`.doc-todo` marker, never as a fallback constant that looks real.

**Context.** The brief this page was built from assumed a live `/api/parameters` endpoint, as in
the MET toolbox it is modelled on. This project has no backend — it is a static site — so there
is no API to fetch. The equivalent single source of truth is the shared JS the screens already
render from. Copying those numbers into documentation prose would have produced a page that was
accurate on the day it shipped and quietly wrong a month later, which is the specific failure
mode this page exists to prevent.

**Consequences.** Changing a carbon rate, an ecosystem area or the activity matrix updates the
documentation on the next page load, with no second edit to remember. The cost is a coupling to
the *shape* of `js/analysis-shared.js`: three constants (forest stock, deforestation rate,
sequestration rates) exist only as literals inside the analyser's assumptions paragraph and are
recovered by regex over its text. If that paragraph is reworded the docs show `TODO`, not a
stale number — a loud failure rather than a silent one, which was the deliberate trade.

**The fix this defers.** Those three constants should be lifted out of the template string into
a small exported object in `js/analysis-shared.js` that both the analyser and the docs read.
That edit was left out of this change on purpose: `analysis-shared.js` is mounted by both
SCR-03 and SCR-07, and the canon says be conservative there. Do it as its own change.
`TODO(design): lift forest stock, deforestation rate and the Restore/Manage sequestration rates
out of the benefitFoot template into a named export, then drop the regex in readLiveParameters().`

---

---

## How to add an entry

```markdown
## DEC-nn · <one-line decision>

**Date.** YYYY-MM-DD or "unknown" · **Status.** `documented` | `inferred`

**Decision.** What was decided.
**Context.** What made it necessary.
**Alternatives visible in the code.** What else was tried or considered — cite the file.
**Consequences.** What this makes easy, and what it makes hard. Both.
```

Never renumber. To reverse a decision, write a new entry that says which `DEC-` it supersedes,
and add a "Superseded by DEC-nn" line to the old one.

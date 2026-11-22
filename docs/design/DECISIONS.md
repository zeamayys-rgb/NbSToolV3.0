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

**Scope.** This entry governs **site figures** — what this project area measures. It does not
govern **method statements** — what the published method says, which is transcribed and cited
(DEC-24) — or **approved copy**, which is transcribed and validated against (DEC-23). Both are
named exceptions, and both say so on the page.

**The fix this defers.** Those three constants should be lifted out of the template string into
a small exported object in `js/analysis-shared.js` that both the analyser and the docs read.
That edit was left out of this change on purpose: `analysis-shared.js` is mounted by both
SCR-03 and SCR-07, and the canon says be conservative there. Do it as its own change.
`TODO(design): lift forest stock, deforestation rate and the Restore/Manage sequestration rates
out of the benefitFoot template into a named export, then drop the regex in readLiveParameters().`

---

## DEC-22 · The site navigation is rendered from one file, not copied into every screen

**Date.** 2026-09-09 · **Status.** `documented`

**Decision.** `nav.sitenav` is no longer authored per screen. Each of the 12 screens that carry
the bar ships an empty placeholder — `<nav class="sitenav" data-nav-page="…" data-nav-auth="…">`
— followed by `<script src="js/navbar.js"></script>`, which renders the markup synchronously
during parse. `js/navbar.js` owns the markup; `js/nav-mobile.js` still owns the behaviour.

**Context.** The same 47 lines of nav markup were duplicated across 12 files, and drifting:
`interactive-map.html` pointed its own active link at `href="#"`, `technical-docs.html` carried
an extra doc-icon button nobody else had, `account-settings.html` highlighted a dropdown row
with inline hexes, and `sitemap.html` styled its Login/Sign-up anchors inline. Adding one link
("Technical Doc") meant 12 identical edits — the change that prompted this.

**Alternatives visible in the code.** A build step or template include (rejected — DEC-01 keeps
this a no-build static site); `fetch()` + inject on `DOMContentLoaded` (rejected — the bar would
paint late and shift the page); a custom element (same late-paint problem, plus a second
abstraction next to the four shared files the codebase already treats as its component layer).

**Consequences.** A nav change is now one edit in `js/navbar.js` — the `LINKS` array for
items, `actions()`/`profile()` for the right-hand side. The dropdown's sample identity lives in
one place, ready to become a real session user. The cost: the bar is JS-dependent — with
scripting off the placeholder renders as an empty bar, where before there was static markup.
Acceptable for a prototype whose screens are already JS-driven; the guard in `navbar.js` skips
any `nav.sitenav` that still has children, so a screen can opt back into its own markup.

Two fixes rode along: `interactive-map.html` and `sitemap.html` never loaded
`js/nav-mobile.js`, so they had no hamburger and (on the map) a dead profile button. Both now
load it.

---

## DEC-23 · One article on SCR-17 is transcribed copy, not a live parameter

**Date.** 2026-09-10 · **Status.** `superseded` by DEC-25 on 2026-09-14 — the article was removed

**Decision.** The *Approved interface copy* article (`#docs/gui-copy`) in
`js/technical-docs.js` reproduces the product team's **GUI Design Document NbS Tool V 3.1
(Launch Ver)** verbatim, as fixed strings, and closes with a table of where the build currently
disagrees with it. It is a deliberate, named exception to DEC-21.

**Context.** User-facing wording is approved outside this repository, in a PDF copy sheet. The
build had drifted from it — a changed attribution, a different contact address, and several
blocks of copy written after sign-off — with nowhere in the product to notice. Copy validation
needs the approved text held still next to the implementation, not re-derived from it.

**Alternatives visible in the code.** Reading the strings live, as every other article does,
would require `version-modal.js` to export its copy and `technical-docs.html` to load it — and
would defeat the purpose: a reference that follows the build can never show the build is wrong.

**Consequences.** The article must be re-transcribed when the copy sheet is reissued (the
version is held in `GUI_DOC_VERSION`, the path in `GUI_DOC_FILE`, both at the top of
`docsGuiCopy()`'s block). Never edit a string there to match the build — that is the one edit
that silently destroys the page's value. In exchange, the deltas table is a standing, readable
answer to "does the product say what we approved".

---

## DEC-25 · The approved-interface-copy article is removed from SCR-17

**Date.** 2026-09-14 · **Status.** `documented` — this change

**Decision.** The *Approved interface copy* article (`#docs/gui-copy`), its renderer
`docsGuiCopy()` and the `guiRow` / `guiTable` helpers are deleted from
`js/technical-docs.js`. SCR-17 now carries method content only. This supersedes DEC-23.

**Consequences.** The copy sheet (`GUI Design Document NbS Tool V 3.1 (Launch Ver)`) and the
build are no longer readable side by side inside the product, and the "where the build differs"
table — which flagged an unverified launch date and a contact-address mismatch — no longer
appears anywhere. Those checks now live only in the source PDF. DEC-21 has no named exception
left: every figure on SCR-17 is read live or cites the methodology documentation.

---

## DEC-27 · The walkthrough is a static page of committed screenshots, not a live tour

**Date.** 2026-09-15 · **Status.** `documented`

**Decision.** SCR-18 is hand-written static HTML with forty-eight WebP screenshots committed
under `assets/walkthrough/`. It reuses `css/technical-docs.css` for its reading shell and adds
`css/walkthrough.css` for what a tour needs and documentation does not. It carries no data, no
template engine and no product code, and it is reached from the footer link present on all
thirteen screens that carry the footer.

**Context.** The tool had no entry point that explained itself. The footer's "NbS Tool
Tutorial" link pointed at SCR-17, which answers *how was this number produced* — a different
question from *what does this button do*, and the wrong first thing to hand a policymaker or a
field team.

**Alternatives visible in the code.**

- *Render it the way SCR-17 renders* — an article array driving one view at a time
  (`js/technical-docs.js`, 2,261 lines). Rejected: a walkthrough is read start to finish, so
  one continuous scroll matches how it is used, and an eight-chapter static document needs no
  engine. A second content DSL would also have to be maintained alongside the first.
- *An interactive product tour* — overlays driven on the real screens. Rejected: it would have
  to run inside every screen it explains, making twelve screens depend on tour code, and it
  cannot be read by someone without an account or a boundary file.
- *A second reading stylesheet* — rejected. The three-column shell, the callouts, the flow
  strip and the table styles in `css/technical-docs.css` are already token-bound and already
  responsive; SCR-18 overrides four rules and adds one component.
- *Right-hand TOC, as SCR-17 has* — rejected. SCR-17 needs one because it shows one article at
  a time; SCR-18's sidebar already lists every anchor on the page.

**Consequences.** The page renders when the product is broken, which is what a manual should
do, and it is honest about carrying no live data — the sample-data warning sits above the first
screenshot. The cost is that **it cannot know when it is wrong.** A control can be renamed,
moved or removed and the walkthrough will keep showing last month's picture with confident
prose beside it, with nothing in the codebase to catch the drift. That risk is concentrated,
not spread: the screenshots are the only part that can go stale, they are all in one directory,
and each is referenced exactly once. Regenerating one is re-capturing one file at
1440×884 on a 2× display. The open question — what triggers a re-capture — is recorded as a
`TODO(design)` on SCR-18 in both SCREENS.md and UI-STATES.md.

A second consequence: the screenshots are desktop-only. Nothing in the walkthrough shows any
screen at phone width, so the mobile layouts of twelve screens remain undocumented.

---

## How to add an entry

```markdown
## DEC-24 · SCR-17 renders the methodology documentation, and prints its contradictions

**Date.** 2026-09-14 · **Status.** `documented`

**Decision.** The method articles on SCR-17 are a transcription of the SCeNe Coalition's
**Data & methodology documentation — Nature-based Solutions triple benefits assessment**
(last updated 26 August 2026). Article order, section numbers and table numbers follow that
document; every constant, rate, class table, decision row, formula, citation and publisher
disclaimer is quoted from it and cites its `§`. Site figures — hectares, ecosystem shares,
carbon totals — stay live under DEC-21. Where the source document contradicts itself, **both
readings are printed with a warn callout naming the contradiction**, rather than one being
silently chosen.

**Context.** The method existed only as a PDF held outside the product. A reader looking at a
carbon figure in the Data Analyser had no way to reach the growth rates, the baseline
assumptions or the publisher's disclaimer that produced it. The previous SCR-17 described the
method in its own words, which is a second source that can drift from the first — and it was
already thinner than the document in places that matter (the seventeen decision rows, the ARR
rate table, Annex A's thirty-four layer records, the direction of each known bias).

A method statement must not follow the build, for the same reason approved copy must not
(DEC-23): a reference that tracks the implementation can never show the implementation is
wrong. So the split on this screen is by *kind of claim*, not by convenience — **what the
method says** is transcribed and cited; **what this site measures** is read live.

**Contradictions currently printed rather than resolved.** Four, each with the handling the
page tells the reader to use:

| Where | The contradiction | What the page says to do |
|---|---|---|
| §8.4.4.3 | The printed narrative says the buffer is not yet subtracted; the code subtracts it | Treat `net_ERR` as buffer-deducted, disregard the sentence, do not quote the narrative to a third party |
| §2.3 vs Table 4 / Annex A | Reference CRS given as `ESRI:54043` in one place, `ESRI:54034` in others | Confirm with the Substance Team; the method (one reprojection to an equal-area CRS) is unambiguous either way |
| §6 / A.1 | The interface specifies five hazard risk levels; the wired rasters carry four | Flagged for reclassification; do not equate a four-class "High" with a five-class "High" |
| §8.4.2 | The formula line reads `× 44/7`; its own bullet and the constants table give `44/12` | `44/12` is used; the source line should be corrected in the next revision |

**Alternatives considered.** Paraphrasing the method in the product's own voice (rejected — it
created the drift this entry removes, and it quietly dropped the limitations that make the
figures safe to use). Linking out to the PDF instead of transcribing (rejected — a reader
checking one carbon constant should not have to open a 84-page document, and the deploy
excludes `docs/`). Resolving the contradictions silently (rejected — the tool's own third
analysis convention is that where a method is uncertain it reports the uncertainty).

**Consequences.** The articles must be re-transcribed when the methodology document is
reissued; the source date lives in `METHOD_DOC_DATE` at the top of `js/technical-docs.js`, and
the contradiction table above must be re-checked against the new revision. Never edit a
transcribed constant to match the build — that is the one edit that destroys the page's value;
if the build disagrees, that disagreement is the finding. New method content belongs in the
source document first, and in the article second.

---

## DEC-26 · The activity matrix is embedded in SCR-17, not rebuilt there

**Date.** 2026-09-14 · **Status.** `documented`

**Decision.** §7.5 of the *Phase 4a · Decision matrix* article shows the activity flow matrix by
iframing SCR-13 at `NbS_Activities_Flow_v2.html?embed`, with a CTA link to the full page below
it. SCR-13 gained an embed mode — a query flag that hides its title block, filter toolbar, stat
strip and footer — rather than SCR-17 gaining a copy of the diagram.

**Why.** The seventeen decision rows end at a pathway, and readers kept asking what happens
next. The answer already exists as a screen. Rebuilding it inside the docs article would mean a
second copy of ~650KB of source rows, a second D3 and d3-sankey dependency on a page that has
none, and two diagrams to keep in step with
`scripts/build_activities_flow_data.py`. The iframe keeps one source and one renderer.

**Alternatives considered.** A static image (rejected — it goes stale silently, and the matrix
is read by tracing a path, which a picture cannot do). Porting the Sankey into
`js/technical-docs.js` (rejected — the duplication above). A link with no figure (rejected — the
question §7.5 raises deserves an answer on the page that raises it).

**Consequences.** SCR-17 now has a network- and CDN-dependent element, which is the first on a
page whose whole premise is that it renders from in-page data (DEC-21). The frame is therefore
not load-bearing: the caption and the CTA carry the meaning, and both render whether or not the
frame does. Below 820px the frame is hidden and the CTA is the route, because eight label
columns across 1680px cannot be read on a phone. The frame is sized by `aspect-ratio` rather
than a fixed height so it tracks the article column; if the diagram's own proportions change,
the ratio in `css/technical-docs.css` must change with it. The caption also states what the
matrix leaves out — the six rows that resolve to *Carbon ineligible* carry no activities, so
they are absent from the diagram, which would otherwise read as an omission.

---

## DEC-28 · SCR-01 tracks the staging front-end, not the other way round

**Date.** 2026-09-15 · **Status.** `documented`

**Decision.** SCR-01 is now kept in parity with the implemented home page at
`staging-fe.scenecoalition.org`. Where the two disagree, staging wins and this prototype is
brought to it. Six pieces were ported on this date: rolling-odometer hero counters carrying
staging's figures; photo-headed benefit cards with the two-mark lockup note; a tabbed feature
index of six photo cards; a marquee of flip cards behind a "coming very soon" pill in place of
the hidden static portfolio grid; a workshop photograph and a methodology link in the
credibility band; and staging's step chapters, which carry no F-code, tag row or per-step CTA.

**Context.** SCR-01 was the source the front-end team ported from — staging still carries this
prototype's class names (`hero`, `terrain`, `cbtn`, `hstat`). Once shipped, the implemented
page became the thing stakeholders actually see, so a prototype that drifts ahead of it
describes a product that does not exist.

**Alternatives visible in the code.** *Keep the prototype richer* — the step CTAs, the F-code
chips and the benefit-card metric lists were real content, and the diff deletes them. Rejected
deliberately: a reference that shows more than the product shows is a reference that misleads.
They remain in git history if the front-end adopts them later.

**Deviation on the flip cards.** The marquee carries real field notes from the 2026 site
visits, not staging's lorem ipsum, and the cards were resized from 352×233 to 420×340 to hold
them without clipping or scrolling (CMP-32). The fourth card is "Kampong Thom, Cambodia" rather
than staging's "Cambodia, Cambodia".

**Consequences.** SCR-01 now answers "what does the home page look like" truthfully, and the
journey steps lost their only in-page route into the tool — the nav, hero CTA and footer flow
are now the sole paths out of the page. The figures in the hero and proof bands are a snapshot
of staging's live counters read on 2026-09-15; they are marked as such in comments in
`index.html`, and they will go stale. The footer is the one place parity was **not** applied:
its link columns are duplicated across fourteen pages, so stripping them from SCR-01 alone
would have made the home page the odd one out. See DEC-11 on illustrative figures.

---

## DEC-nn · <one-line decision>

**Date.** YYYY-MM-DD or "unknown" · **Status.** `documented` | `inferred`

**Decision.** What was decided.
**Context.** What made it necessary.
**Alternatives visible in the code.** What else was tried or considered — cite the file.
**Consequences.** What this makes easy, and what it makes hard. Both.
```

Never renumber. To reverse a decision, write a new entry that says which `DEC-` it supersedes,
and add a "Superseded by DEC-nn" line to the old one.

---

## DEC-29 · The help centre is a static hub over the existing docs, and describes the product as specified rather than as prototyped

**Date.** 2026-10-12 · **Status.** `documented`

**Decision.** SCR-19 (`help.html`) is one hand-written static page, modelled on the Global
Forest Watch help centre's shape — entry cards, grouped sidebar, search, task guides, FAQs as
accordions, support — but built on the SCR-17/SCR-18 reading shell with a 65-line stylesheet
and a 50-line inline filter. It carries no content engine and no live data. Where the
prototype and the SCeNe Coalition's capacity-building guidance disagree about what the tool
can do, **the help centre follows the guidance**: GeoPDF, tabular and GIS export; General and
Carbon Project Documentation for Verra, Gold Standard and Plan Vivo; supplementary data upload.
The analysis flow is described as the product owner specified it: an optional Phase 0 on the
map, then seven phases from selecting a location to generating documents. The guidance
documents are not linked or cited by title, because they are drafts. The support address is
`support@nbstool.org`. English only.

**Context.** The tool had two deep reference surfaces — SCR-18 answers *what does this button
do*, SCR-17 answers *how was this number produced* — and no front door. A policymaker with one
question had to read a chapter or a method article to find it. The Coalition's guidance also
holds context that neither surface carries: who the Coalition is, where the tool sits in a
project's life, and in plain terms what the tool is not.

**Alternatives visible in the code.**

- *Multi-page, one article per route, as GFW does* — rejected. With no build step, every
  article would duplicate the nav, footer and shell; twenty-eight copies of the same chrome to
  keep in step. Anchors on one page give the same deep links.
- *Render it through `js/technical-docs.js`* — rejected for the reason DEC-27 gives: a second
  content DSL to maintain, for content that is read by anchor rather than switched by view.
- *Fold it into the walkthrough as a chapter* — rejected. The walkthrough is read in order;
  a help centre is entered at a question. Different page, same shell.
- *Describe the prototype as it is, and list the gaps as "known issues"* — rejected by the
  product owner. The page faces stakeholders and describes the product being built. The gaps
  are recorded here, not on the page.
- *Duplicate the scroll-spy inline, as SCR-18 did* — rejected. It moved to `js/docs-spy.js`,
  mounted by a `data-spy` attribute, and SCR-18 now loads the shared file.

**Consequences.** The page works when the product is down and with JavaScript off, and a
reader lands on an answer in one click from any footer. **The cost is that the help centre is
ahead of the prototype.** Three how-to guides and three FAQ answers describe controls that do
not exist yet: the map export controls (the legend's "Export as Image" is inert, see the TODO
on SCR-03), the Plan Vivo template (SCR-05 offers CCB, Verra VCS + CCB and Gold Standard + CCB),
and supplementary data upload. Nothing in the codebase flags that drift. The rule for whoever
closes it: **change the prototype to match the help centre, not the other way round**, and
re-read the matching article against the real screen when the feature ships. The TODO on
SCR-19 in UI-STATES.md carries the list.

## DEC-30 · Two documentation destinations, one workflow spine, one fact in one place

**Date.** 2026-10-13 · **Status.** `documented`

**Decision.** The product keeps two documentation pages, not three. **Help** (SCR-19) answers
*how do I use the tool*; **Methodology** (SCR-17, renamed from Technical Documentation, URL
unchanged) answers *how is this number produced*. The walkthrough (SCR-18) is retired: its
screenshots and explanations became SCR-19's phase guides, and `walkthrough.html` is a redirect
that maps each old chapter anchor to its guide. Every surface describes the workflow the same
way — Phase 0 *Explore the map* to Phase 7 *Generate documents*, then *after the analysis*:
manage projects, record and verify. The two pages link both ways at three levels: a Help |
Methodology switch atop both sidebars (CMP-34); a *How it's calculated* box at the end of each
Help guide and a *Do this in the tool* box at the end of each Methodology article, mapped one to
one (SCREENS.md SCR-19); and an empty search on either page offering the same query on the other
(`?q=`). User-facing copy shows no internal codes — no screen IDs, no "Phase 4a", no "Annex A.1".

**Context.** Three pages answered overlapping questions, and the product described its own
workflow five ways: six home-page features, a five-step footer strip, six walkthrough steps,
five method phases and eight help phases. No page owned the spine, so every page re-derived it,
and a reader moving between them met the same idea under different numbers.

**Alternatives visible in the code.**

- *Keep three pages behind a shared switcher* — rejected. It labels the overlap without
  removing it; the walkthrough and help would still both explain the same screens.
- *Merge the Methodology into Help as well* — rejected. Different reader (analyst, reviewer,
  funder), different engine (the live-parameter article system of DEC-21/DEC-24), different
  question. Linked, not merged.
- *Split Help into a hub and a separate guides page* — rejected for now. One page keeps every
  anchor on one URL and the search over everything. Revisit if the guides outgrow ~60
  screenshots.
- *Delete `walkthrough.html` outright* — rejected. Old links in slides, emails and training
  material would 404. The redirect costs one small file.

**Consequences.** One fact, one home: a new explanation goes on the page whose question it
answers, and the other page links to it. Changing a Help guide's anchor, or a Methodology
article id, breaks a mirrored link: the two tables (the boxes in `help.html`, `HELP_GUIDES` in
`js/technical-docs.js`) change together. The footer strip now reads *Phases 0–1 · Phases 2–5 ·
Phase 6 · Phase 7 · After the analysis*. The home page's feature cards are unchanged in shape:
they describe modules, not steps, so they keep their grouping and their *See how* links point at
the matching guide. The Document Generator screenshots are not reused, because they show
templates the Help copy (DEC-29) says will change. Method section numbers (§) remain in SCR-17
citations, where they trace a figure to its source document.

## DEC-31 · Help and Methodology share one reading shell, one article index and one search

**Date.** 2026-10-13 · **Status.** `documented`

**Decision.** SCR-19 adopts SCR-17's layout — three columns, one article at a time, an "On this
page" list, a previous/next pager — and both pages run on one engine, `js/docs-shell.js`
(CMP-35), reading one list of articles, `js/docs-index.js`. The search box on either page
searches both. The SCeNe Coalition introduction and *How the NbS Tool works* move from SCR-17
to SCR-19 and are deleted from SCR-17; old links to them forward. Help's screenshots are shown
inline, in the section they illustrate, instead of behind a disclosure.

**Context.** The product owner preferred SCR-17's layout to SCR-19's single long page, found two
documentation pages that look and behave differently harder to move between than one system
with two halves, and judged the Coalition material redundant across the two. SCR-17's own
sidebar, TOC and pager code was the better engine but lived inside a 2,300-line file of method
content, where SCR-19 could not reuse it.

**Alternatives visible in the code.**

- *Load `js/technical-docs.js` on Help as well* — rejected. It drags every method article and
  the live-parameter readers (`analysis-shared.js`, `f05-shared.js`, `people-context.js`) into a
  page that needs none of them.
- *Render Help's articles from JavaScript strings, as SCR-17 does* — rejected. Help has no live
  data; authored HTML keeps it readable with scripting off and editable without touching code.
  The shell takes either: `render(id)` returning a string, or `data-doc` elements already in the
  page.
- *Universal search over full article text* — rejected for now. The other page's text is not
  loaded, so a cross-page index can only be what both pages share: label, group, keywords. Both
  pages therefore search the same fields, and the same words find the same articles anywhere.

**Consequences.** One place to change navigation behaviour for both pages, and one row to add
for a new article. The cost: a Help article now needs a row in `docs-index.js` *and* a
`data-doc` block, and its keywords are hand-written — an article whose body mentions a word its
keywords do not will not be found by that word. With scripting off Help still reads as one long
page, but its sidebar is empty. `css/walkthrough.css` and `js/docs-spy.js` are deleted; the
classes Help still needed moved into `css/help.css` as `hc-*`.

---

## DEC-32 · Generated output and reference material live apart; superseded screens go to `archive/`

**Date.** 2026-10-13 · **Status.** `documented`

**Decision.** The local-only `docs/` folder splits in two. `docs/generated/` holds what Claude
produced: QA and audit reports, built Word and PowerPoint documents, working changelogs, and
the scripts that build them. `docs/reference/` holds the source material the product owner
keeps for reference: the GUI design document, the GIS methodology, the capacity-building
guidebooks. `docs/design/` stays as the tracked canon. SCR-15 and SCR-16 move to
`archive/screens/`, which is tracked but excluded from the Vercel deploy. `deliverables/` leaves
git and becomes local-only, and `AGENTS.md` becomes a pointer to `CLAUDE.md`.

**Context.** `docs/` mixed generated reports with source documents, so it was hard to tell what
was authoritative and what could be regenerated. SCR-15 and SCR-16 were unlinked and drifting
(the open question in README.md). `deliverables/` put a 10 MB video on the design-test server.
`AGENTS.md` was a full copy of `CLAUDE.md` and would drift.

**Alternatives visible in the code.** *Move every route into `pages/`* — rejected. Every page
links to its siblings by relative path (`href="dashboard.html"`), and both Vercel and the
design-test server (`.github/workflows/abdan-deploy.yml`, a `git pull`) serve the repo root, so
moving routes would break every link and every shared URL.

**Consequences.** One rule decides where a new document goes: if Claude made it, it's in
`generated`; if it came from the team, it's in `reference`. Generated files can be deleted and
rebuilt, reference files cannot. The build scripts now write next to themselves
(`../documents/`), not into the current directory. The archived pages still work by URL on the
design-test server but no longer on Vercel.

---

## DEC-33 · The site footer is rendered from one file, like the navigation
**Date.** 2026-10-13 · **Status.** `documented`

**Decision.** `js/footer.js` owns the footer markup. Every screen with a footer ships an empty
`<footer class="footer">` placeholder followed by the script, the same pattern as DEC-22.
The Activity Matrix (`NbS_Activities_Flow_v2.html`) now also carries the shared top bar; it
loads `css/tokens.css` and `css/nav.css` for it, and its body padding moved to `body > .wrap`
so the bar and footer run full width.

**Context.** The same 2.6 KB footer was copied into 14 screens; Help had already drifted
(its own `aria-current`). The Activity Matrix had no way back into the tool except the footer.

**Consequences.** A footer change is one edit. Without JavaScript the footer is absent — the
same trade-off DEC-22 accepted for the nav. Login, the design system and the walkthrough
redirect keep their own layouts and get no top bar.

---

## DEC-34 · The Help Centre is a hub of five sections, and the Methodology is its science half

**Date.** 2026-10-19 · **Status.** `documented`

**Decision.** SCR-19 is rebuilt as a help centre in the shape of Global Nature Watch's: a landing
page of entry cards that only directs, then five sections — *Get started* (what it is, a demo,
who is behind it), *How it works* (the eight phases on a chart, then one page per stage with the
manual's screenshots), *The science behind it* (four entry pages: what the tool analyses, how
each phase is calculated, the data behind each figure, limits / carbon / citation), *Resources*
(the Coalition's external documents) and *Support* (FAQ, contact). SCR-17 keeps its URL and its
engine but becomes the science half: its twenty articles are nested under the four science entry
pages in one sidebar tree that both pages render, its kickers name their parent, and its title is
*The science behind it*. The CMP-34 switch is retired. The site navigation's *Methodology* item
becomes *Help Centre*. The content source is the product owner's contextualised NbS Tool v3.0
User Manual; the previous Help Centre's articles are retired, their ids forwarded or kept as
section ids.

**Context.** The previous SCR-19 was twenty-five articles in the Methodology's clothes: the
product owner found it read like a second methods page rather than a help centre, and the
manual had since been rewritten to speak to users directly. The reference was GNW's help
centre: a landing that directs, short section pages, and external documents as cards.

**Alternatives visible in the code.**

- *Split the science section into four new articles and rewrite the twenty method articles into
  them* — rejected. The method articles are the live-parameter engine of DEC-21/DEC-24; four
  entry pages that group them cost twelve cards and no rewrite, and the sidebar nesting makes
  them read as one section.
- *Keep the Help | Methodology switch* — rejected. With one tree there is nothing to switch
  between; a reader on a method page sees the whole Help Centre and where they are in it.
- *One page per phase under How it works* — rejected. The brief asked for one page for phases 0
  to 5; the "On this page" list and section deep links (`#phase-2`) give each phase its own
  address without a page each.
- *Order How it works as the brief listed it (plan, manage, generate)* — rejected. The chart
  numbers the phases, so the sidebar follows the manual's order (6, 7, after the analysis) to
  avoid contradicting it.
- *Link the Resources cards to the local reference documents* — rejected. They are not deployed
  and not public; the cards wait for published addresses and say so.

**Consequences.** One tree, two pages: adding a method article means a row with a `parent`;
adding a help page means a row and a `data-doc` block. Old links keep working through `moved`
and through section ids that match the retired article ids (`#phase-0` to `#phase-5`,
`#projects`, `#record`). The repo now carries 7.9 MB of video for the demo. Screenshots are the
manual's, so a screen change means recapturing for the manual and copying across, not
recapturing twice. The spelling stays *Help Centre*, as everywhere else in the product's copy.

---

## DEC-35 · The journey replaces the home page's feature tabs

**Date.** 2026-11-06 · **Status.** `documented`

**Context.** The home page told the same story twice: six journey steps, then six feature cards
in three tabs, all using one placeholder photo. Neither pointed clearly to the Help Centre.

**Decision.** Merge them. Each journey chapter now names its feature in a tag and links to the matching Help Centre section. The journey
header links to the demo video and the Help Centre. The `#features` section, its CSS and its tab
script are removed (CMP-31 retired). The sticky stage frame swaps its hand-built mock-ups (and their sample
figures) for the real Help Centre screenshot of each step, under a plain label with no F-code.

**Consequences.** One section, one story, real pictures. Screenshots are shared with
`help.html`, so a recapture updates both. Per-step GIFs are not made yet: the only video is the
full demo. If short clips are recorded later, they replace the `.s-shot` images in the stage frame.

---

## DEC-36 · The home page explains its data as the ASEAN MRV Framework flow

**Date.** 2026-11-06 · **Status.** `documented`

**Context.** The mint band ("Decision-grade data, not guesswork") listed three data tiers,
four standard chips and six IUCN-style criteria beside a workshop photo. It said the data was
defensible without showing where it came from.

**Decision.** Replace it with the framework's own thinking-process diagram, redrawn in HTML and
made interactive: global standards and the eleven Member States feed one indicator set, which is
fed by three data tiers (global layers harmonised with SERVIR-Mekong's RLCMS land cover, national
statistics offices, field data) and ends in a dataset for the user's site. Each node links to the
methodology page section that explains it. The tier ladder, standards chips, photo and criteria
grid are removed (recoverable from git).

**Consequences.** Node copy is sourced from `js/technical-docs.js`. The "85 items" count comes
from the framework diagram and needs confirming against the published framework. Flags are the
first image loaded from a CDN; vendoring them into `assets/` would remove that dependency.

---

## DEC-37 · Home page copy is written in the product's own voice, ahead of staging

**Date.** 2026-11-06 · **Status.** `documented`

**Context.** DEC-28 keeps SCR-01 in parity with the staging front-end, and the copy that came
with it overclaimed: "a climate project the world can verify", "regulator-grade documents",
"donor-ready MRV record", carbon "on a five-pool basis" (the tool reads biomass and soil
only), FPIC "in the record" (the tool holds no consent process). It also read as machine
written: stacked em dashes, triplets, slogans.

**Decision.** Rewrite the hero, benefit cards, journey steps, coalition and closing copy from
the v3 Reference Methodology and the Help Centre, in plain English, claiming only what the
tool does: a free screening tool that reports what is there, what is happening to it, which
pathway fits, and drafts the documents and monitoring plan. Where staging and this copy
disagree, this copy is the proposal and staging should adopt it, an exception to DEC-28
for copy only. Layout parity stands. Testimony quotes are untouched.

**Consequences.** The page no longer promises verification, bankability or regulator-grade
output. "Choose the pathway", "Write it up", "Keep it in one place" and "Keep the record"
replace the step titles. The `<title>` and meta description changed, so search snippets will
change. Figures in the hero strip are unchanged and still illustrative (DEC-11).

---

## DEC-38 · Testimony drifts instead of sitting in a grid

**Date.** 2026-11-07 · **Status.** `documented`

**Context.** The seven quotes sat in a tidy two-column grid, which read as a gallery of equals
and made the band feel like a template.

**Decision.** Show them as two full-bleed rows (`.tq-slider` > `.tq-row` > `.tq-track`) that drift
in opposite directions, each row holding all seven quotes in a different order and at one of
three widths (280, 360, 460px), the second row offset so the columns never line up. Every card
shares one quote size and one height (the tallest card sets it), so only the widths vary. Edges are
masked, hover or focus pauses the drift, and the clone set is `aria-hidden`. With reduced motion
each row becomes a scroll-snap strip and the clones are hidden. Modelled on the moving
testimonial rows at nonprofitbuilder.org. Layout parity with staging (DEC-28) is set aside for
this band only.

**Consequences.** Quote text is unchanged. Widths and the row offset are literals in
`css/home.css` until a width scale exists (TODO-22). Seven quotes are enough for a seamless loop
up to about 2,800px of viewport; add quotes before adding a third row.

## DEC-39 · Help moves out of the link row into a "?" icon

**Date.** 2026-11-09 · **Status.** `documented`

**Context.** *Help Centre* sat in the centred link row beside Home, Interactive Map and My
Project. Those three are places you work in; Help is something you reach for from anywhere.

**Decision.** Drop it from `LINKS` in `js/navbar.js` and render it as a round "?" icon link
(`.sitenav-help`) at the far right of `.sitenav-actions`, after the language selector, on every
screen. Its accessible name is `aria-label="Help"`; a tooltip reading "Help" appears on hover and
on keyboard focus and is `aria-hidden` so it is not announced twice. The icon is a solid disc in the
logo's orange (`--logo-orange`, #e99f4a, a new primitive) with a white glyph, darkening slightly on
hover, so Help stands apart from the green actions. On the Help Centre it carries `aria-current="page"` and an
orange ring (`--ring-warning`). In the mobile drawer there is no hover, so
the tooltip text shows as a visible label beside the icon.

**Consequences.** The link row now holds three items. White on `--logo-orange` is about
2.2:1, below the 3:1 WCAG 1.4.11 asks of a meaningful icon; a darker orange is a design question.
The tooltip font size is a literal until a
type-size scale exists (see the type-scale TODO in `tokens.json`).

## DEC-40 · Testimony cards: Poppins quote, Acumin name, width follows the quote

**Date.** 2026-11-09 · **Status.** `documented`

**Context.** In DEC-38's cards the quote was set in the condensed display face and the name in
Poppins, the role was in mono, and widths were dealt out without regard to quote length. Long
quotes landed in 280px cards and short ones in 460px cards, so every row grew to the tallest
narrow card and the wide cards were left half empty. Browser default `figure` margins also added
80px between cards.

**Decision.** Each card reads top to bottom: quote mark, quote in `--font-text` (Poppins), a
hairline, then avatar, name in `--font-display` (Acumin Pro Condensed) and role in Poppins. A
card's width now follows its quote's length (`tq-sm` short, `tq-md` mid, `tq-lg` long), so the
same quote is the same width in both rows. The second row is reordered so the widths alternate.
The three widths, the drift, the clones and the reduced-motion behaviour from DEC-38 are unchanged.

**Consequences.** Quote text and who said it are unchanged. Cards now sit 20px apart, and the
loop seam no longer jumps 2px. A new quote needs a width class chosen by its length.

## DEC-41 · Home sections reordered; every band changes tone from the one before

**Date.** 2026-11-09 · **Status.** `documented`

**Context.** The home page sections were reordered to: hero, journey, data flow, triple benefit,
field stories, testimony, coalition, final CTA. With their old backgrounds that put dark next to
dark (hero → journey, stories → testimony) and light next to light (data flow → triple benefit),
so section breaks did not show.

**Decision.** Neighbouring bands never share a tone. Strict dark/light alternation is impossible
because the coalition band has to stay light (partner logos) and the CTA dark, so a third tone,
brand green, takes the testimony band:

| # | Section | Tone |
|---|---|---|
| 1 | Hero | dark (`--ink-800`) |
| 2 | Journey | light mint (`--paper-2`); the product frame inside stays dark |
| 3 | Data flow | dark (`.band-dark`) |
| 4 | Triple benefit | light (`--paper`) |
| 5 | Field stories | dark (`--ink-850`) |
| 6 | Testimony | brand green (`--primary-600`) |
| 7 | Coalition | light (`--paper`) |
| 8 | Final CTA | dark (`--ink-900`) |

Content was recoloured with each band: the journey's chapters, tags and links moved to the light
palette and its buttons to `cbtn-solid` / `cbtn-light`; the data-flow labels and step names went
light, the core node became `--ink-650` with a spring border, and the white detail card sets its
own dark text and link colour; testimony accents moved to `--spring-soft` and the card hairlines
and fills to white tints.

**Consequences.** `.band-mint` is no longer used on the home page. Moving a section again means
checking this table first. Role text on testimony cards is at 90% opacity to keep 12px text above
4.5:1 on the green.

## DEC-42 · SCR-17 follows the WRI App Plan where it and the methodology document differ

**Date.** 2026-11-09 · **Status.** `documented`

**Context.** A review of "The science behind it" against the WRI App Plan (revised 14/08/2026)
found six places where the page disagreed with the plan or with itself (review findings C-01 to
C-06). The page is otherwise a transcription of the methodology document (DEC-24).

**Decision.** Where the App Plan is the more authoritative or more recent statement, the page
follows it, and says so where the methodology document reads differently:

| Finding | Change in `js/technical-docs.js` | Basis |
|---|---|---|
| C-01 | Phase 1 states the maximum area: 100,000 ha without an account, 500,000 ha with one, larger on request | App Plan p. 8 |
| C-02 | "ASEAN NbS/EbA MRV Framework" renamed **ASEAN NbS Framework**; a status callout says it is under review for ASEAN endorsement and names the old title once | App Plan p. 3 |
| C-03 | Phase 1 intro no longer says "no other user input is requested"; it names duration, activities and the carbon-project question | App Plan p. 10; the page's own 8.4.4 |
| C-04 | Duration stays in the Phase 1 table (methodology Table 4) but is marked as set in Phase 4 | App Plan p. 8 diagram; `interactive-map.html` |
| C-05 | Restore definition in 2.2 says "assisted natural regeneration (ANR)", matching 7.8 and the 0.8 stocking factor | Internal consistency |
| C-06 | Phase 2 says "29 characterisation layers" and lists the 3 threat and 2 pathway layers read on top | Annex A counts |

**Consequences.** Three gaps stay open:

- The rest of the build still says **200,000 ha** for guests (`help.html`, the map's "area is too
  big" warning). Until those change, the methodology page and the product disagree (review
  finding O-02).
- The App Plan diagram counts the pathway raster inside its 29 layers, while this page counts 29
  without it. The Geospatial Data Lead should confirm which count is correct.
- The Data Analyser's source line still cites an "ASEAN NbS / EbA toolkit"
  (`js/analysis-shared.js`). It may be a separate document, so it was not renamed.

C-05 departs from the GUI Design Document's wording and needs the Substance Lead's confirmation.

## DEC-42 · Field stories and testimony share one dark-green band

**Date.** 2026-11-09 · **Status.** `documented`

**Context.** After DEC-41 the field stories (near-black `--ink-850`) and the testimony (brand
green `--primary-600`) sat in two bands next to each other. Both say what people on the ground
told us, and the third tone existed only to separate them.

**Decision.** The testimony moves inside the `#portfolio` section as a second `.wrap.proof-tq`,
spaced from the stories by a top margin, and the `.testimony-band` section is gone. The combined
`.proof` band is a `.band-dark` (same `--ink-800`, no gradient, no grain). The "More stories arrive with the NbS Portfolio,
soon" pill under the stories (`.proof-foot`, `.soon-pill`) is removed. The page tones are now
strictly alternating: dark, light mint, dark, light, dark, light, dark. This supersedes the
testimony row of DEC-41's table.

**Consequences.** `#portfolio` still targets the start of the stories. Testimony card colours
from DEC-41 (white-tint hairlines and fills, `--spring-soft` accents) were tuned for brand
green and stay legible on the dark band. Nothing on the page says the portfolio is coming any
more; put that back elsewhere if it is still needed.

## DEC-43 · SCR-17 gains Phase 6 and Phase 7 articles, a review record, and App Plan wording

**Date.** 2026-11-09 · **Status.** `documented`

**Context.** The App Plan review of SCR-17 (follows DEC-42, the SCR-17 entry) left ten
"fix before launch" and "should fix" findings that needed no team decision. Two of them are
missing methods: the App Plan promises a Monitoring Plan with "recommended indicators,
monitoring methods, and frequencies" and a Document Generator, and the methodology document,
which ends at potential benefit, explains neither.

**Decision.**

| Finding | Change |
|---|---|
| G-01 | New article **Phase 6 · Monitoring Plan** (`#docs/phase6`). It explains the activity → benefit → indicator chain and the three steps of the F05 screen. It reads the indicator catalogue live from `indicatorMeta`: the frequency counts, plus every indicator with its method and frequency in a collapsed table. The Framework mapping per indicator is a visible TODO, because the catalogue does not record it. |
| G-02 | New article **Phase 7 · Generated documents** (`#docs/phase7`). It covers the three sources of content (analysis, user, template), the two F03 templates, where each of the three planned deliverables is produced, and the output. *Project Summary* is a visible TODO, because no template for it exists in the build. |
| G-05 | Phase 1 names the accepted files (.zip shapefile, .kml, .kmz) and the area check. Geometry checks are a TODO. |
| G-06, D-01 | *About this documentation* records the 1 and 8 September review (19 reviewers), the specialist partners' roles, the sign-off still open, and that the Technical Note is the planned publication. A *How to cite* callout says to cite the draft as a draft until then. |
| G-07 | The People layers annex opens with a data provenance statement, taken from the App Plan's wording. |
| D-02, D-03 | Glossary: FO defined, plus CSO, IPLC and Triple benefit. §8 names the three pillars as the triple benefit. |
| D-04 | §2.1 explains that the data covers four ecosystems, interventions are recommended for three, and savanna is a guardrail. |
| D-06 | §2.2 flags that the pathway definitions come from the GUI document and points to §7.6–7.9 until the Substance Team confirms them. |

**Why the two new articles break the DEC-24 rule.** Every other method article is a
transcription of the methodology document. Phases 6 and 7 have no source there, so they
describe the build instead, and each section says so in a `doc-source` line ("Not part of the
methodology document"). Phase 6 follows DEC-21 and reads its figures live. Phase 7 is prose,
because `js/f03-app.js` keeps its template fields private inside an IIFE and SCR-17 does not
load it. If the F03 templates change, Phase 7 must be edited by hand.

**Consequences.** SCR-19's science entry page gains an *After the analysis* card row. The
*Plan the monitoring* and *Generate the documents* sections link to the new articles, and
`HELP_GUIDES` links back. Findings G-03, G-04, D-05, V-01, O-01 and O-02 still need a team
decision and are untouched.

## DEC-44 · Button shapes set by the November 2026 audit

**Decision.** The button shape audit set each button's shape one at a time. Pills use
`--radius-pill`, and rounded rectangles use `--radius-md` (6px).

| Change | Selectors |
|---|---|
| Now a pill (`--radius-pill`) | `.upload-demo-btn` (F05.0), `.fpill` (F05.0, F05), `.pill` (Activities flow) |
| Now a rounded rectangle (`--radius-md`) | `.sitenav-lang`, `.sitenav-login`, `.sitenav-signup`, `.sitenav-profile` (nav, every screen); `.cbtn` (Home); `.legend__export`, `.s1-back`, `.da-ctx__nav`, `.t3-nav` (F01); `.fchip` (F06, design system page); `.hc-where a.hc-route` (Walkthrough) |

All other buttons in the audit keep their current shape, including the 2–4px corners on the
small icon and map controls.

**Why.** Before this, the same kind of action was a pill on one screen and a rectangle on
the next. Rectangles use 6px to match `.btn`, the most-used button (93 uses).

**Consequences.** `.fchip` (F06) is now a rectangle and `.fpill` (F05) is a pill, though both
are filter controls. That is what the audit decided. It may be worth turning into a written
rule later. `.privacy .pill` (F04.1) is a different component and is unchanged.

## DEC-45 · Acumin Pro Condensed self-hosted as the display face (supersedes DEC-06)

**Date.** 2026-11-16 · **Status.** `decided`

**Decision.** `--font-display: "Acumin Pro Condensed", "Barlow Semi Condensed", "Saira
Condensed", sans-serif`. The condensed face is self-hosted. The files are
`assets/fonts/AcuminProCond-{Regular,Bold}.woff`, taken from WRI's brand guidelines repo
(`Vizzuality/wri-guidelines/fonts`). They are registered with `@font-face` at the top of
`css/tokens.css`, so every screen that loads the token file gets them.

**Why.** DEC-06 named Acumin Pro Condensed, but nothing loaded it, so every heading rendered
Barlow (`TODO-04`). WRI's guidelines repo publishes the face.

**Alternatives.** Acumin Pro at normal width was tried first and rejected the same day in
favour of the condensed face that the type scale was designed for.

**Consequences.**
- Only weights 400 and 700 exist. Under CSS font matching, weight 500 renders Regular and
  weight 600 renders Bold, so the Medium and Semibold steps on the type scale no longer look
  different from their neighbours.
- Hard-coded Barlow remains in the F05 print and Word export templates
  (`create-monitoring-plan.html`). Those open as separate documents that do not load
  `tokens.css`, and Word cannot use a web font.
- Licensing: the files come from WRI's own brand repo. Before a public launch, confirm
  that WRI's Adobe/Monotype licence covers self-hosting them for web use.

---

## DEC-62 · General context follows GUI 3.1; the two leaving cards wait for the Threat profile

**Date.** 2026-11-17 · **Status.** `documented`

**Context.** The GUI Design Document v3.1 for Site Characterisation: General
(`docs/reference/GUI3.1/`) lists five sections in its "Final Data Analyzer Structure": Reference
ecosystem, Administration and zoning status, Terrain, Landcover and Soil classification. GUI 3.0
had six, with Soil classification in Climate. Deforestation analysis and Natural disaster risk
are absent from the General table and present in the Threat Profile table. The document never
says they move; that is read from the two tables.

**Decision.** General is rebuilt to the five GUI 3.1 sections, in that order.

| Section | What changed |
|---|---|
| Reference ecosystem | Renamed from "Ecosystem type identification". Total as a big number, a compact donut, and a legend with hectares and share, all drawn from `NBS_DATA` |
| Administration and zoning status | GUI 3.1 narrative for the "several sub-districts" case. A note that protected-area overlap can affect which NbS activities are eligible. Administration gets its own "i" row |
| Terrain | New bars for the four elevation classes. Slope keeps its five classes and gains the share |
| Landcover | Unchanged, apart from "Oil Palm" as two words |
| Soil classification | Moved in from Climate, restyled to the General green |

On all five, the dataset's own disclaimer replaces the general alert, the source line gives the
GUI 3.1 source, resolution and year, and the card can show the three GUI 3.1 result states
(CMP-06, UI-STATES SCR-03 step 2).

Deforestation analysis and Natural disaster risk **stay in General, unchanged, below the five**,
until step 3 is rebuilt. Removing them now would drop them from the prototype altogether.

**Why.** GUI 3.1 is the team's current specification. Keeping the two leaving cards in place is
the conservative reading of a move the document implies but does not state.

**Consequences.**
- General shows seven cards until the Threat profile pass, two of them in GUI 3.0 form with the
  general alert and their old source lines.
- The elevation-class figures (52,500 / 67,500 / 30,000 / 0 ha) are new sample data, chosen to
  agree with the existing 45 to 1,860 m range and the 150,000 ha area. See DEC-11.
- Three sentences are edited from the GUI 3.1 template for plain English: "majorly located"
  became "mostly located", "hectare" became "hectares", and the NbS-activities note was
  reworded. `TODO(design): Substance to confirm.`
- GUI 3.1 leaves the Soil classification disclaimer blank. The card uses the one already in the
  dataset catalogue (`NBS_LAYER_INFO["soil-groups"]`). `TODO(design): confirm.`
- The soil percentages are shown as before. GUI 3.1 asks that they be labelled as probabilities
  or as shares of the area, depending on the data. `TODO(design): which are they?`
- The five dataset disclaimers no longer link to the NbS Tool Form ("replace it with your own
  data"). The general alert carried that link. `TODO(design): where does the link live now?`
- Not built here, because they belong to all four tabs: the confirmation before "Reselect
  area", the selected-area line, the data guidance note, and the two extra fields GUI 3.1 wants
  in the "i" pop-up ("how to read it" and "coverage").
- The donut and legend colours are three literal hexes in `GC_ECO` (tokens.json TODO-23).

---

## DEC-63 · Nature context follows GUI 3.1

**Date.** 2026-11-17 · **Status.** `documented`

**Context.** The GUI Design Document v3.1 for Site Characterisation: Nature
(`docs/reference/GUI3.1/`) keeps six sections, renames two and adds two tables. Follows DEC-62.

**Decision.** Nature is rebuilt to the "Final Data Analyzer Structure" table.

| Section | What changed |
|---|---|
| Habitat area | Split into "Total area of habitat" (the animal-group badges, unchanged) and a new "Area of habitat threshold": one sentence and a table of species per habitat-overlap band. A line explains how suitable habitat is mapped and that habitat areas are not added together |
| Charismatic species | Renamed from "Indicative key species presence". Each row gains the year of its latest record; a record without a date says so. "occurrence" became "records" |
| Conservation significance | The three scores are listed as text beside the chart, with a line on how to read them. Gains an "i" row |
| Forest Landscape Integrity Index | Score reads "9.7 / 10" (was "9.7*"). A line says the percentages refer to the forest assessed |
| Key Biodiversity Area | New table of sites: name, overlap in hectares, share of the selected area, and a total |
| Plant species occurrence | Replaces "Endangered tree species": a GBIF narrative (species recorded 2000 to 2026, CITES Appendix I, II, III, share of global plant diversity) above the big number. Gains an "i" row |

All six carry the dataset's own disclaimer, the GUI 3.1 source line and the result states
(CMP-06). The demo card "Endangered Tree Species (Error)" is removed: its two treatments are now
the `nodata` and `failed` states of every card. The step title drops "context" on this tab only,
as GUI 3.1 writes it, and the tab has its own subtitle.

**Consequences.**
- **New sample figures (DEC-11).** The threshold bands 180 / 112 / 63 / 49 / 0 are the GUI 3.1
  example table (80 / 50 / 28 / 22 / 0) scaled to the card's 404 species. The latest-record years
  are invented. Plant species: the count stays 31 (the old card's figure); 1 / 6 / 2 CITES
  species and 0.01% are invented.
- **Sample figures changed.** The Key Biodiversity Area site figures were 4,512.3 ha and
  1,776.7 ha, which could not add up to the 19,500 ha total shown beside them. They are now
  13,200 ha and 6,300 ha, so the table sums to the unchanged total.
- **Figures read from the existing chart.** The significance scores 8, 7 and 6 are read off
  `radar.png`'s own 0 to 10 axis. They are not new.
- "A higher score means a higher conservation priority" is my reading of the card.
  `TODO(design): Substance to confirm the direction of the scale.`
- GUI 3.1 heads the threshold narrative "Priority conservation actions for EDGE List species".
  It is left out: nothing says the 404 species are EDGE species. `TODO(design): what does that heading label?`
- "less than 90% habitat overlap with the project area" keeps the template's ambiguity.
  `TODO(design): is the percentage a share of the species' habitat, or of the project area?`
- GUI 3.1 renames the section "Charismatic species" but its narrative still says "keystone
  species". The card says "charismatic". `TODO(design): confirm.`
- GUI 3.1 gives no disclaimer for Plant species occurrence. The card reuses the GBIF one.
  Its draft table asks for two blocks (flora richness and endangered trees); the final table,
  followed here, asks for one. `TODO(design): confirm both.`
- SCR-17 has no method for Plant species occurrence, and its "Endangered Tree Species Richness"
  method now describes something no screen shows. The screen pointer says so; the article is
  otherwise untouched because it is transcribed from the methodology document.
- Not built: the label for records outside the selected area, the "some forest has no data"
  message, the one-site KBA layout (see UI-STATES SCR-03 step 2).

---

## DEC-64 · Climate context follows GUI 3.1; Historical burned area waits for the Threat profile

**Date.** 2026-11-17 · **Status.** `documented`

**Context.** The GUI Design Document v3.1 for Site Characterisation: Climate
(`docs/reference/GUI3.1/`) lists three sections in its "Final Data Analyzer Structure": Carbon
information, Annual climate ledger and Peat depth. Soil classification moved to General in
DEC-62. Historical burned area is absent from the Climate table and present in the Threat
Profile table. Follows DEC-62 and DEC-63.

**Decision.** Climate is rebuilt to the three GUI 3.1 sections, in that order.

| Section | What changed |
|---|---|
| Carbon information | Layout unchanged. A line says the total is the sum of the three pools; soil organic carbon is labelled with its 30 cm depth |
| The annual climate ledger | Precipitation now reads as a monthly range, a monthly average and an annual total, all worked out from the chart's own bars. Each metric says it is a long-term average. Chart axes say "Monthly" and use "°C" |
| Peat depth | New. Peatland area as a big number, the GUI 3.1 narrative for medium-depth peat, and bars for the share of peatland in three depth classes |

All three carry the result states (CMP-06). Carbon and the ledger carry the dataset's own
disclaimer and the GUI 3.1 source lines. The step title drops "context" on this tab and the tab
has its own subtitle.

Historical burned area **stays in Climate, unchanged, below the three**, until step 3 is
rebuilt — the same reasoning as the two General cards in DEC-62.

**Consequences.**
- **New sample figures (DEC-11).** Peat depth "0.4 to 4.6 metres" and the class areas 7,000 /
  19,250 / 8,750 ha are invented; they sum to the existing 35,000 ha of peatland in `NBS_DATA`.
- **Figures worked out, not new.** "167 mm per month" is the chart's twelve bars averaged
  (2,000 mm / 12). "4 dry months" is dropped: nothing defines a dry month.
- **Unit kept as tCO₂e.** GUI 3.1 writes "tons Carbon"; the methodology (SCR-17, annex A.3)
  reports tCO₂e and Step 5 uses it. `TODO(design): Substance to confirm the unit.`
- **Three sources disagree on soil organic carbon.** GUI 3.1 names OpenLandMap, 30 m, 2018;
  the methodology and the dataset catalogue name SoilGrids, 250 m. The card's source line follows
  GUI 3.1; the "i" pop-up still shows the catalogue row. The 30 cm depth label comes from the
  methodology. `TODO(design): which dataset is it?`
- The sample pools do not follow the methodology's fixed root-to-shoot ratio: below-ground
  biomass is shown as 30% of the total and above-ground as 20%, where the method gives
  below-ground = 0.28 x above-ground. Not changed here. `TODO(design): correct the sample.`
- **Peat depth has no source and no disclaimer in GUI 3.1.** The card says the source is to be
  confirmed, keeps the general alert, and has no "i". The PDF page that carries the deep-peat
  narrative is cut off, so only the shallow and medium narratives can be read; the sample uses
  medium. The narrative names three depth classes, the mock-up in the document shows four; the
  card follows the narrative. `TODO(design): source, disclaimer, deep-peat text, three classes or four.`
- GUI 3.1 gives one sentence shape for both metrics ("ranges from X to Y with an average of
  Z"). The built precipitation sentence adds the annual total, as the same document's guidance
  asks ("keep the monthly chart separate from the annual total"). `TODO(design): confirm.`
- "WorldClim, 2000" is all GUI 3.1 gives for the reference period. `TODO(design): state the
  period the normals cover.`
- The GUI 3.1 subtitle for this tab still mentions soil and fire, both of which the same
  document moves elsewhere. Used as written.
- Not built: the "partial total" display for Carbon information, and the no-peatland case for
  Peat depth (see UI-STATES SCR-03 step 2).

---

## DEC-65 · Threat profile follows GUI 3.1; three cards move in from Site characterisation

**Date.** 2026-11-17 · **Status.** `documented`

**Context.** The GUI Design Document v3.1 for the Threat Profile (`docs/reference/GUI3.1/`) has
two parts. Parts A to D keep the existing screen (screening overview, disturbance map, one card
per ecosystem) with refinements. Its "Final Data Analyzer Structure" then lists three groups of
results: Observed ecosystem disturbance, Ecosystem pressure and hazard, Business-as-usual
projection. The document does not say whether the groups sit beside the ecosystem views or
replace them. Closes the waiting moves in DEC-62 and DEC-64.

**Decision.** The groups sit **beside** the ecosystem views. They show in the All Ecosystem
(Overview) view, below the three ecosystem cards, and not in a single-ecosystem view.

| Group | Card | Where it came from |
|---|---|---|
| Observed ecosystem disturbance | Historical deforestation | Moved from General › Deforestation analysis |
| | Historical burned area | Moved from Climate. Split into "Past fires" and "Fire susceptibility"; the second says its data are not available |
| | Land degradation | New |
| Ecosystem pressure and hazard | Drainage canal pressure (Canal proximity, Drainage pressure) | New as a card. The Peatland view keeps its three small badges, now reading Close / High / High to match |
| | Natural disaster risk | Moved from General |
| Business-as-usual projection | Deforestation risk | Moved from General › Deforestation analysis. A class badge and one sentence replace the 0 to 1 index figure |
| | Fire risk | New |

The three cards are **removed** from General and Climate. General now has five cards and Climate
three, as GUI 3.1 lists them.

Also changed: the step title ("Threat profile") and subtitle; the footer buttons ("Review site
characterisation", which goes to step 2 and no longer to step 1, and "Select NbS pathways"); a
heading and intro above the overview; a "View … details" button on each overview ecosystem
card; an ecosystem boundary legend under the map; a source line on each ecosystem card, and for
forest and mangrove a sentence on what "disturbance" means; Mangrove's main pressure as a line
of text and no longer a fourth figure.

**Why beside.** Parts A to D say "keep" on almost every row, so removing the ecosystem views
would contradict the same document. Putting the groups in the overview needs no new tab and no
new entry in the SCR-07 side menu.

**Consequences.**
- **New sample figures (DEC-11).** Land degradation: 24,000 ha degraded (3,000 potential false
  positive, 2,400 potential false negative; 15,000 in forest, 9,000 outside), 18,000 ha improved
  (15,000 likely improving, 3,000 possible false positive), 108,000 ha stable; they sum to the
  150,000 ha area. Canal proximity: nearest canal 320 m. Fire risk: 96,000 ha (64%).
- **Figure removed.** The deforestation risk index average "0.85" is gone, as GUI 3.1 asks; the
  "top 15%" ranking stays.
- The overview is long: four sections of the old screen, then seven cards. `TODO(design): confirm
  beside, and whether the groups need their own tabs.`
- Fire now appears four times: the Fire risk card, the fire badge in Natural disaster risk, the
  fire-susceptibility block in Historical burned area, and the Fire risk badge in the Peatland
  view. All read "High" or "not available". `TODO(design): which one owns the result?`
- GUI 3.1 names no source, no disclaimer and no visual for Fire risk (the PDF page is cut off),
  and no disclaimer for Drainage canal pressure. Fire risk says its source is to be confirmed;
  both keep the general alert. Only the High narrative of Fire risk is built: the Medium and Low
  texts are on the cut-off page.
- The Land degradation template says "Of this [degraded] area … was flagged as Degraded –
  Potential False Negative". A false negative is normally land *not* flagged. Kept as written.
  `TODO(design): Substance to confirm what the two flags count.`
- GUI 3.1's draft table says "do not describe the median as the average"; its final table says
  "higher than the national average". The card follows the final table. `TODO(design): confirm.`
- GUI 3.1 repeats the forest-canopy disclaimer on the Peatland rows, which reads as a copy-paste.
  It is applied to forest and mangrove only. `TODO(design): confirm.`
- "Accessed through Global Nature Watch on 01/09/2026" is ambiguous (1 September or 9 January),
  so the source line says "accessed 2026".
- The disturbance map image still carries its own baked-in legend (Stable / Disturbed /
  Converted or lost), partly hidden by the on-screen legend (Remaining / Disturbed / Forest loss /
  Forest gain). GUI 3.1 asks to confirm how the two sets of classes relate before relabelling.
  Not changed.
- SCR-07 still titles the section "Threats Profile". Not changed: that menu is page-specific.
- Not built: the absent-ecosystem state, the no-peatland and no-drainage cases, result states on
  the three ecosystem cards, and map switching by ecosystem (see UI-STATES SCR-03 step 3).

---

## DEC-66 · Threat profile is three accordion groups; the ecosystem views are removed

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe; supersedes the "beside"
choice in DEC-65

**Context.** DEC-65 put the three GUI 3.1 groups beside the existing ecosystem views, because
the document did not say which it wanted. The result was long: the old screen, then seven cards.

**Decision.** The Threat profile follows the GUI 3.1 "Final Data Analyzer Structure" only.

1. **Three groups, in this order:** Observed Ecosystem Disturbance, Ecosystem Pressure and
   Hazard, Business as Usual Projection.
2. **An accordion, not tabs.** The cards carry long narratives, so each group is a collapsible
   section with an icon in its title. Built on native `<details>` (CMP-08). The first group
   starts open.
3. **No grouping by ecosystem.** Removed: the All Ecosystem / Forest / Mangrove / Peatland tabs;
   the screening overview (total and disturbed area, the three ecosystem cards); the Ecosystem
   Disturbance Map and both its legends; the Dryland forest, Mangrove and Peatland cards with
   their driver lists, figures, peatland badges and field-verification notes.
4. **Only what the final structure lists stays:** Historical deforestation, Historical burned
   area, Land degradation · Drainage canal pressure, Natural disaster risk · Deforestation risk,
   Fire risk.

**Consequences.**
- GUI 3.1 parts A to D describe the removed overview, map and ecosystem cards, mostly with
  "keep". They are not in the final structure, and this decision follows the final structure.
  `TODO(design): tell Substance that parts A to D are not built, or have the document updated.`
- Figures that no longer appear anywhere in step 3: disturbed area per ecosystem, forest loss
  and gain, remaining forest, the driver lists. Step 4 still shows its own ecosystem figures
  from `NBS_DATA`, which is unchanged.
- `nbsInitThreat()`, the `threat-sections` mount and about 150 lines of `.t3-*` styles are
  deleted. `assets/f01-step3/disturbance-map.png` is no longer referenced; the file is kept.
- SCR-07's side menu lists the three groups in place of Overview / Forest / Mangrove / Peatland,
  and reads "Threat Profile" (was "Threats Profile").
- SCR-17 keeps its methods for ecosystem disturbance screening and forest disturbance drivers;
  their screen pointers now say the result is no longer shown.
- The FigJam board "Data Analyser IA · GUI 3.0 to 3.1" still shows the ecosystem views as kept.

---

## DEC-67 · Fire risk: a half-doughnut gauge and three thresholds

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe

**Context.** GUI 3.1 gives the Fire risk card a narrative per level but no visual and no rule
for which level applies (DEC-65). The card showed "High" beside a 64% overlap with nothing
connecting the two.

**Decision.**
1. The card shows a half-doughnut gauge of the share of the project area that overlaps mapped
   fire-risk areas (`gcGauge`, CMP-06).
2. The level follows that share:

   | Level | Share of the project area in mapped fire-risk areas |
   |---|---|
   | High | over 80% |
   | Medium | 30% to 80% |
   | Low | under 30% |

   Exactly 30% and exactly 80% are Medium. The two boundaries are marked on the gauge and
   listed under it, with the current level named in words.
3. The badge, the gauge colour and the narrative are all worked out from the one figure
   (`gcFireLevel`), so they cannot disagree.

**Consequences.**
- **The sample area now reads Medium, not High.** Its figure is unchanged (96,000 ha, 64%);
  under the new thresholds 64% is Medium.
- **The Medium and Low narratives are pieced together.** GUI 3.1 has them on a PDF page that
  is cut off at the left edge, so only the ends of the lines can be read. The missing words
  are filled in. `TODO(design): Substance to supply both texts.`
- **Fire now disagrees with itself in the sample.** Natural disaster risk still shows "Fire
  Risk: High risk". It is a different measure (a hazard class from ADPC), but a reader sees High
  in one card and Medium in another. `TODO(design): align the sample, or say on screen how the
  two differ.`
- The thresholds are not in GUI 3.1. `TODO(design): have Substance confirm them and add them to
  the document.`

---

## DEC-68 · Fire-risk thresholds sit on the gauge as coloured labels with a hover pop-up

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe; revises the layout in DEC-67

**Decision.** The list of thresholds under the gauge (DEC-67, point 2) is removed. In its place
each band of the gauge carries a label in its own risk colour with a "?" mark: Low beside 0 to
30%, Medium above 30 to 80%, High beside 80 to 100%. Pointing at a band or its label, or
focusing the label from the keyboard, fades in a pop-up with the band's rule, and the band's
arc thickens. The 30% and 80% marks stay on the arc. The thresholds themselves are unchanged.

**Consequences.**
- The rule for each band ("under 30%", "30% to 80%", "over 80%") is now one step away for a
  sighted pointer user. It stays readable without hovering from the 30% and 80% marks and the
  band labels, and it is in each label's accessible name and in the chart's description.
- This is the first hover animation in the Data Analyser. It uses `--motion-fast`, the same
  token as other transitions; MOTION.md's proposed scale is still not approved.

---

## DEC-69 · Fire risk: one pill for the current level, no badge under the gauge

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe; revises DEC-67 and DEC-68

**Context.** The level was shown four times in one card: the gauge colour, the outlined label
on the gauge, a "Fire risk: Medium" badge under the gauge, and the narrative. All three band
labels were pills, so the two levels that do not apply looked as selected as the one that does.

**Decision.**
1. The "Fire risk" badge under the gauge is removed. The label on the gauge is the badge.
2. Only the label of the band the area falls in is a pill. The other two are plain text in
   their band's colour. They keep the "?" mark and the hover and focus pop-up from DEC-68.

**Consequences.**
- The level is still written in words without relying on colour: in the narrative ("medium
  fire risk"), in the chart's description, and in the current label's accessible name.
- In the dark theme the plain labels use the light tints (`--success-300`, `--warning-300`,
  `--danger-300`), because the pill's dark text is only readable on its pale fill.
- `gcLevel` is unchanged and still used by Drainage canal pressure and Deforestation risk.

---

## DEC-70 · Natural disaster risk drops Fire and becomes a 2 x 2 gallery

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe

**Context.** Natural disaster risk listed five hazards in one row of small pictures, Fire among
them. Fire risk has its own card under Business as Usual Projection, and the two disagreed in
the sample: "High risk" here, Medium there (DEC-67).

**Decision.**
1. Fire is removed from the Natural disaster risk list. The Fire risk card owns fire.
2. The remaining four hazards (Drought, Flood, Landslide, Tropical Typhoon) are shown two by
   two, with larger pictures that keep the shape of their source files.

**Consequences.**
- This closes the DEC-67 `TODO(design)` about fire disagreeing with itself between these two
  cards. The fire-susceptibility block in Historical burned area (DEC-65) is untouched.
- The card's source line still says ADPC. `TODO(design): Substance to confirm that the ADPC
  hazard set may be shown without its fire class.`
- The pictures are 273 x 160 px files and are now shown wider than that, so they look soft,
  most of all on high-density screens. `TODO(design): supply larger pictures.`
- `assets/asset/Disaster Risk/fire risk.png` is no longer used. It stays in the repo.

---

## DEC-71 · Natural disaster risk: drawn scenes that play the hazard on hover

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe

**Context.** The four pictures were 273 x 160 px photographs shown wider than their files, so
they looked soft (DEC-70). Abe asked for simple flat line drawings in the style of the Habitat
Area species icons, each animating its hazard when the pointer is over it.

**Decision.**
1. Each tile's picture is an inline SVG scene, 270 x 120, drawn by `js/hazard-scenes.js`
   (CMP-39). At rest it shows a healthy landscape. On hover it plays the hazard; on leave it
   plays back.
   - **Drought.** Rock, trees and bushes on green ground. The ground and hills turn from green
     to brown, cracks open, and the leaves dry and drop to leave bare branches.
   - **Flood.** Trees, flowers, a wading bird and a butterfly beside a stream. Rain starts and
     blue waves rise over the land; the bird and butterfly fly up.
   - **Landslide.** A hill with pines. Its right-hand edge breaks away and slides down with a
     tree, leaving bare soil, falling rocks and dust.
   - **Tropical typhoon.** A beach with a palm and mangroves. The sky darkens, a cyclone spins,
     wind and rain cross the scene, the trees bend and the sea rises.
2. GSAP 3.12.5 drives the motion, loaded from cdnjs on `interactive-map.html` and
   `project-detail.html` (the same file `index.html` already loads). GSAP only moves and fades;
   every colour is a token bound in `css/genctx.css` (`.hz-*`).
3. The tiles are 270 / 120, not the photographs' 273 / 160.

**Consequences.**
- Closes the DEC-70 `TODO(design): supply larger pictures.` The drawings are vector.
- The scenes are decorative (`aria-hidden`). The hazard name and risk level stay in text, so
  nothing is lost for a screen reader, on touch, or with a keyboard, none of which can hover.
- With `prefers-reduced-motion: reduce`, or if GSAP fails to load, the calm drawing stays still.
- The calm drawing shows a healthy landscape for every hazard, whatever the risk level. The
  drawings illustrate the hazard type only; they are not data.
- Not delivered as Lottie files. Lottie is exported from After Effects; hand-written Lottie
  JSON for four scenes could not be checked here. `TODO(design): decide whether a designer
  should redraw these in After Effects and export Lottie, or whether the SVG scenes stay.`
- The four photographs in `assets/asset/Disaster Risk/` are now only the fallback for a page
  that mounts `js/analysis-shared.js` without `js/hazard-scenes.js`. They stay in the repo.
- Durations (0.2 s to 1.4 s, loops up to 2.4 s) and GSAP eases are typed in
  `js/hazard-scenes.js`: there is no token for illustrative motion (tokens.json TODO-24).
- `TODO(design): Abe to review the four drawings. They were drawn in code, not by a designer.`

---

## DEC-72 · Hazard scenes keep their hazard state after the pointer leaves

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe

**Context.** DEC-71 played each scene back to the calm drawing when the pointer left the tile.

**Decision.** A scene plays its hazard once, on the first hover, and stays in that state. If the
pointer leaves part-way, the sequence still runs to its end. The repeating motion (rain, waves,
wind, the cyclone) runs only while the pointer is over the tile and holds still otherwise.

**Consequences.**
- This replaces "on leave it plays back" in DEC-71, decision 1.
- A scene is calm again only after the page reloads, or when the analyser redraws the card.
- `TODO(design): decide whether a second hover should replay the hazard from the calm drawing.`

---

## DEC-73 · Hazard scenes are redrawn without outlines, in the land-cover icon style

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe

**Context.** The first drawings (DEC-71) followed the Habitat Area species icons: bright flat
fills inside a dark outline. Abe found them childish and pointed to the land-cover icons
(`assets/f01-step2/genctx/lc-*.svg`) as the direction.

**Decision.**
1. No outlines. Shapes are flat and separated by tone, with ridges layered back to front from
   dark to pale.
2. Land and leaves use the viridian ramp (`--primary-200` to `--primary-800`) instead of the
   brighter success greens. Earth, sand and dust are muted tans; storm sky and funnel are slate.
3. Lines are kept only for thin things: branches, roots, palm fronds, rain, wind, cracks, heat.
4. Cartoon details are gone: the butterfly, the bird's eye and beak colour, the grass ticks.
   The wading bird and the birds in flight are single-tone silhouettes.
5. The typhoon is a side-view funnel of see-through rings, not a top-down swirl.

**Consequences.**
- This replaces "in the style of the Habitat Area species icons" in DEC-71. The motion,
  the hover rule (DEC-72) and the accessibility contract are unchanged.
- The muted tans and the slate sky have no token. They are written as `color-mix()` of two
  existing tokens in `css/genctx.css`, so no hex is typed, but the resulting colours are not in
  `tokens.json` (TODO-25). `color-mix()` needs a 2023 or newer browser.
- `TODO(design): Abe to review the redrawn scenes. They are still drawn in code.`

---

## DEC-74 · Natural disaster risk shows its level as the shared pill, in five classes

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe

**Context.** Each hazard tile wrote its level as bold text ("Moderate risk"), while the other
threat cards use a label and a pill (`gcLevel`, for example Deforestation risk).

**Decision.**
1. Each tile shows "Risk level" and a pill, through the same `gcLevel` helper.
2. The level is one of five classes, lowest to highest: Very Low, Low, Moderate, High,
   Very High (given by Abe).
3. The pill has three tones, so the five classes share them: Very Low and Low take `ok`,
   Moderate takes `warn`, High and Very High take `bad` (`GC_HAZARD_LEVELS` in
   `js/analysis-shared.js`).

**Consequences.**
- The sample levels are unchanged: Drought Moderate, Flood High, Landslide Moderate, Tropical
  Typhoon Low. They are still illustrative (DEC-11).
- Two pairs of classes look the same and differ only in their words.
  `TODO(design): decide whether five classes need five tones, and which.`
- `TODO(design): Substance to confirm the five class names and their order against the source
  hazard data.`

---

## DEC-75 · Hazard tiles put the name and the level on one line

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe

**Context.** DEC-74 left each tile with two lines under its picture: the hazard name, then
"Risk level" and the pill.

**Decision.** One line: the hazard name on the left and the pill on the right. The words "Risk
level" are dropped; the card's title, Natural Disaster Risk, already says what the pill means.
It is still the `gcLevel` helper, with the hazard name as its label.

**Consequences.**
- This replaces decision 1 of DEC-74. The five classes and their tones are unchanged.
- On a tile too narrow for both, the pill wraps under the name.
- The name was not drawn into the picture: the SVG is hidden from screen readers (CMP-39), so
  the name has to stay as text.

---

## DEC-76 · The hazard scenes are also exported as Lottie files

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe

**Context.** DEC-71 left Lottie undelivered: hand-written Lottie JSON could not be checked. Abe
asked for the four files in `assets/natural-disaster-risk/`.

**Decision.**
1. The files are recorded from the live scenes, not drawn again.
   `docs/generated/scripts/build-hazard-lottie.html` draws each scene in the browser, steps its
   GSAP animation one frame at a time, and writes what it reads back as Lottie JSON.
2. Each file is 270 x 120, 30 frames a second, 6 seconds. Frames 0 to 90 are the hazard
   arriving (marker `intro`); frames 90 to 180 are a seamless loop (marker `loop`).
3. To make that loop clean, every repeat in `js/hazard-scenes.js` now lasts a whole fraction of
   3 seconds and every delay lands on a frame. Eleven durations moved by 0.1 to 0.6 seconds.
4. The product still draws the scenes as inline SVG with GSAP (CMP-39). The Lottie files are
   for use elsewhere: slides, documents, a native app.

**Consequences.**
- Closes the DEC-71 `TODO(design)` about Lottie.
- The files are `drought.json`, `flood.json`, `landslide.json` and `tropical-typhoon.json`:
  62 to 324 KB, because every frame's motion is written out as keys rather than as eases.
- Colours in the files are fixed at the token values on the day of the export. They do not
  follow later token changes or the dark theme. Re-run the exporter after changing a drawing
  or a colour.
- The exporter is in `docs/generated/`, which is local-only, so it is not in git.
  `TODO(design): decide whether the exporter should move to scripts/ so the files can be rebuilt
  from a clone.`
- Checked in lottie-web 5.12.2 (SVG renderer) only. `TODO(design): check the files in the
  player they will actually ship in.`


---

## DEC-77 · The data disclaimer alert loses its stripe, border and label

**Date.** 2026-11-17 · **Status.** `documented` — decided by Abe

**Context.** The `.gc-alert` disclaimer under each Data Analyser card stacked four warning cues:
a warning tint, a 1px border, a 4px orange left stripe and a 30px warning triangle, plus a
"Disclaimer:" label and an arrow on the link. It repeats under almost every card, so it read as
generated decoration and wore out the warning. Reviewed against the anti-slop checklist
(github.com/miqdadbadjuber/anti-slop: "Colored Left Stripe", "Small Arrows"). Abe chose option C
of three.

**Decision.**
1. Keep the warm tint (`--bg-warning-second`) and the warning icon, shrunk to 16px and set inline
   with the first line.
2. Drop the border and the left stripe.
3. Drop the "Disclaimer:" prefix and the arrow after "NbS Tool Form". The disclaimer text itself
   (GUI 3.1, per card) is unchanged.
4. All colours are tokens; the four literal hexes are gone.

**Consequences.**
- The old CSS comment cited a "system alert spec DA-08", which is not in `docs/design/`.
  `TODO(design): if DA-08 exists in Figma, update it to match.`
- The icon is still decorative (`alt=""`); the tint plus the text carry the meaning.

## DEC-78 · Fire risk gauge shows the overlap share only, with no levels

**Status.** Accepted, 2026-11-17. Supersedes the gauge parts of DEC-67, DEC-68 and DEC-69.

**Context.** The gauge drew Low / Medium / High bands on the arc. Those bands were thresholds on
the share of the area that overlaps mapped fire-risk areas, which reads as if it were the fire
risk level of the mapped areas themselves (Very Low to Very High). The two are different logics
and the chart implied a link between them that does not exist.

**Decision.** The gauge shows only the share of the project area that overlaps mapped fire-risk
areas: a grey ring for the total area and an orange arc for the overlap. No bands, marks or level
labels. Hovering or focusing the chart shows a pop-up with "Total area" and "Overlaps mapped
fire-risk areas", each with its percentage and hectares.

**Consequences.**
- The narrative beside the gauge still uses `gcFireLevel(pct)` (DEC-67 thresholds).
  `TODO(design): confirm whether that narrative should also stop naming a level.`

## DEC-79 · Doughnut segments have soft corners and a small gap

**Status.** Accepted, 2026-11-18.

**Context.** The ring charts were drawn two ways: full doughnuts as filled SVG slices with sharp
corners, and the half doughnuts as one stroked arc cut with dash offsets. The Carbon Pool ring was
a CSS `conic-gradient`. Segments ran into each other with no separation.

**Decision.** Every doughnut segment is a filled slice with corners rounded to `--radius-sm` (4px)
and a `--space-4` gap between neighbours, drawn by one shared builder, `nbsRingSeg`
(`js/analysis-shared.js`). This covers Reference ecosystem, Land degradation, Fire risk, the
Carbon Pool ring and the People Context donut.

**Consequences.**
- On the Fire risk gauge the grey part is now drawn as the remainder after the orange part rather
  than a full ring behind it, so its tooltip no longer reads "Total area" (DEC-78). It names
  the remainder instead: "Outside mapped fire-risk areas", with its hectares and share. The
  orange part still reads "Overlaps mapped fire-risk areas". Wording requested by the product
  owner, 2026-11-18.
- Sizes are tokens read at runtime, so changing `--radius-sm` or `--space-4` changes the charts too.

## DEC-80 · Material Symbols is the icon set, copied in one icon at a time

**Status.** Accepted, 2026-11-18. The product owner chose Material icons as the iconography of
the brand kit.

**Context.** Icons were drawn by hand per screen in at least three styles: 2px-stroke outlines,
Bootstrap Icons paths in the Data Analyser, and filled Material Icons in the card heads. Nothing
said which to use for a new one. The full `google/material-design-icons` repository is about
4.9 GB on GitHub; the npm packages that hold every Symbols icon as SVG are about 13 MB and 23,000
files. The site has no build step and no `package.json` to tree-shake either.

**Decision.** Material Symbols, Outlined, weight 400, grade 0, optical size 24, is the icon set
for all interface icons. Only the icons the product uses are copied into
`assets/icons/material/`, by `scripts/fetch-material-icons.mjs`, which holds the list. Each file
draws in `currentColor`. Google's Apache 2.0 licence ships beside them. See CMP-40.

**Alternatives rejected.**
- *Load the icon font from Google Fonts.* No files in the repo, but every page would make a
  request to Google, the font is about 975 KB unless every page lists its icon names in the URL,
  and icons would not show offline or before the font loads.
- *Commit an npm package.* 13 MB of icons nobody uses.

**Consequences.**
- The first set is 83 icons (88 files with five filled versions), about 32 KB.
- Domain artwork (ecosystems, pathways, land cover, species, hazard scenes) is not an interface
  icon and stays custom.
- Existing inline icons move to Material as their screens are touched (CMP-40, Known gap). The
  nav Help icon is the first: Material `question_mark` (CMP-01).

## DEC-81 · One phase numbering across the Help Centre, the user guide and the method pages

**Status.** Accepted, 2026-11-19. Asked for by the product owner with the four Help Page source
documents (User Manual, Reference Methodology, FAQ, Glossary).

**Context.** The source documents number the work differently. The User Manual has eight
phases, 0 to 7. The Reference Methodology has a chain of six: 1, 2, 3, 4a, 4b, 5. The FAQ lists
seven "main steps" in which step 6 is saving and step 7 is monitoring and documents together.
The method pages still carried the chapter numbers of an older methodology document in their
headings ("7.5 —", "8.4.2 —"), next to phase numbers. A reader moving between the three could
meet three different "phase 4"s.

**Decision.**
- The numbering is the manual's and the Data Analyser's own: Phase 0 (optional) to Phase 7, with
  Phases 1 to 5 being the five numbered steps of the analyser. Phase 4 has two parts, taken
  from the Reference Methodology: 4a pathway selection, 4b activity selection.
- Every surface uses it: the landing page's phase table, the chart (CMP-36), the guide headings,
  the FAQ answer, the sidebar labels in `js/docs-index.js`, and the hero kickers and
  `HELP_GUIDES` of SCR-17. Old chapter numbers are removed from SCR-17's headings.
- SCR-17 gains a *Phase 4b · Activity selection* article, so every phase in the guide has a
  method page with the same number.
- The sidebar group *How it works* becomes *User guide*: it is the user manual, and the old name
  was easy to confuse with *The science behind it*.
- The guide links to the method at the level the reader is on: each phase closes with a *The
  science behind it* box, and sub-sections link to the matching method section through a new
  address form on the generated page, `#docs/<article>/<section>` (CMP-35).
- Video tutorials are YouTube embeds behind a play button (CMP-42), with their addresses in one
  map, `HC_VIDEOS`.
- Where the source documents disagree with the GUI v3.1 screens, the Help Centre follows the
  screens: Phases 2 and 3 are described as built (deforestation, fire and hazard sit in the
  threat profile's three groups), and four screenshots were recaptured to match.

**Alternatives rejected.**
- *Number the method pages 1 to 6 as the Reference does.* It would make "Phase 6" mean activity
  selection on one page and monitoring on another.
- *Embed YouTube players directly.* Five iframes on a page load several megabytes and set
  third-party cookies before the reader has chosen to watch anything.
- *Keep the manual's v3.0 lists and screenshots for Phases 2 and 3.* The guide would describe
  tabs and cards this build no longer shows.

**Consequences.**
- A new phase name or number must be changed in all the places listed above, in one change.
- Open disagreements between the source documents are recorded as `TODO(design)` under SCR-19:
  the guest area allowance (200,000 or 100,000 ha), where the duration is set, and the draft
  status of the glossary.
- SCR-17 still cites the older methodology document's table numbers in its source lines, and
  several of its figures differ from the Reference Methodology. Those are listed for the
  methodology team rather than changed silently.

## DEC-82 · The user guide has one page per phase, nested under "Run an analysis"

**Status.** Accepted, 2026-11-19. Asked for by the product owner. Supersedes the page layout of
DEC-34, which rejected one page per phase.

**Context.** Phases 0 to 5 shared one long page, *Start the analysis*, while Phases 6 and 7 had
pages of their own beside it. The sidebar could not show the phases, the title did not say what
the page held, and the guide's shape differed from the method pages, where *How each phase is
calculated* opens onto one page per phase.

**Decision.**
- *Start the analysis* becomes *Run an analysis* (`analysis`), an entry page: a short lead, then
  one card per phase, in the same form as the science entry pages.
- Each of Phases 0 to 5 is its own page (`phase-0` … `phase-5`). Phases 6 and 7 keep their ids
  (`monitoring`, `documents`) and are named for their phase: *Monitoring planning*, *Generate
  documents*. All eight sit under `analysis` in the sidebar through `parent` in
  `js/docs-index.js`, which CMP-35 already supported for the science pages.
- The former sub-headings of each phase are now its sections, so they appear in "On this page".
- The chart (CMP-36) has two lanes, *Run an analysis* and *Manage your project*.

**Consequences.**
- Every existing link keeps working: `#phase-2` was a section and is now a page; `#phase-4b`
  is a section of the `phase-4` page.
- The guide and the method now mirror each other page for page, which is what makes the
  phase-to-phase cross-links of DEC-81 exact.


## DEC-83 · Conservation significance shows no scores

**Context.** DEC-63's Nature rebuild listed the three conservation-significance values as text
beside the spider chart (Biodiversity 8, Water 7, Carbon 6, "out of 10"). The source (Jung et al.
2021) is a global priority *ranking*, not a measured score, so the result cannot be quantified.
GUI 3.1's narrative for this section is qualitative: "The project area reflects the area's
significance for [biodiversity/water/carbon] conservation."

**Decision.** The card keeps the narrative and the spider chart, and drops the numbers: no score
list, no "out of 10" note, and no values in the chart's alt text. A note says that a point further
from the centre means a higher priority, and that the chart shows a ranking, not a measured score.
The legend reads "Relative conservation priority".

**Consequences.** The text alternative to the chart is now the narrative (which priority is
highest), not a list of values. This supersedes the "Conservation significance" row of DEC-63.

## DEC-84 · The conservation spider chart is inline SVG on the brand green

**Context.** The chart was `radar.png`, a render with pale grey axis labels on a near-black
(#1f1f1e) panel and a green shape. The labels were hard to read, the shape blended into the
green card around it, and the image could not take tokens or a dark theme.

**Decision.** `ncRadar()` in `js/analysis-shared.js` draws the chart as inline SVG from
`NC_RADAR`. The panel uses `--primary-750`, the same deep green as the FLII score card. Axis
labels are 16px semibold in `--text-on-color`. The shape is `--warning-400` amber so it stands
out on the green; the legend swatch matches. Grid rings are faint white and carry no values
(DEC-83). The reach of each axis was traced from the old render and remains illustrative
(DEC-11).

**Consequences.** `assets/f01-step2/natctx/radar.png` is no longer referenced. The chart's text
alternative is the SVG's `aria-label`.

## DEC-85 · Historical burned area is narrative only

**Context.** The card held two sub-sections: "Past fires" (a yearly bar chart and a dark
summary box with the 10-year total) and "Fire susceptibility" (an intro and an empty-state box
saying its data were not available). The design review asked for a single narrative.

**Decision.** The card keeps its head, disclaimer and source line, and shows two paragraphs:
what the layer means, then the cumulative, average-annual and peak-year burned area. The chart,
summary box, both sub-titles and the empty-state box are gone, with their `.cl-fire`,
`.cl-burned` and `.cl-chart--fire` styles. The figures come from the sample series the chart
used (DEC-11): 2011 to 2020, 4,125 ha in total, 413 ha a year on average, 563 ha in 2012. The
review copy said "between 2014 and 2024"; the period follows the sample data until real data
set it. This supersedes the "split into Past fires and Fire susceptibility" row of DEC-65.

**Consequences.** Nothing on the card says fire-susceptibility data are missing any more.
`assets/f01-step2/climctx/burned-area.png` is no longer referenced.

## DEC-86 · Land degradation splits by forest and non-forest, in a two-ring half doughnut

**Context.** The Land degradation card showed one ring (Degraded, Stable, Improved) and fixed
copy that mixed the false-positive and false-negative flags into the degraded and improved
sentences. The review copy treats the flags as categories of their own, reports forest and
non-forest separately, and makes the improved, stable and uncertainty sentences conditional.

**Decision.** `gcSunHalf()` in `js/analysis-shared.js` draws a half sunburst on the existing
half-doughnut geometry: the inner ring is Forest (`--primary-750`) against Non-forest
(`--warning-700`); the outer ring splits each into Degraded, Stable, Improved, Degraded –
potential false positive and Degraded – potential false negative, each slice over its parent.
The outer ring uses a quarter of the usual slice gap so sub-1% slices stay visible. The card
stacks vertically: narrative, then the chart centred at up to 400px wide with the total and
"Area assessed, 2014 to 2024" inside the inner hole, then a two-column legend (Forest left,
Non-forest right), each a group row followed by its five categories indented. A 1.2% gap separates the groups on
both rings. The three degradation-related classes sit together, and Forest draws its categories
in reverse, so both red blocks meet at the centre gap; the legend keeps one order for both.

`ldNarrative()` builds the copy from `LD_DATA`: the degradation sentence always; the improved
sentence only if improved area > 0; the stable sentence only if stable area > 0; the
uncertainty sentence only if either flagged class has area.

**Consequences.** Category totals keep the earlier copy's sample figures (DEC-11). The
forest / non-forest split of each category is new illustrative sample data and must be replaced
by real figures. "Degradation-related" means Degraded plus both flagged classes.

## DEC-87 · Drainage canal pressure copy is chosen by class

**Context.** The card's copy was written for one case (close canal, high density). GUI 3.1's
narrative table gives a sentence per class: canal proximity Close (0 to 500 m), Intermediate
(500 to 1,000 m), Distant (over 1,000 m); drainage density High, Moderate, Low, or no overlap.

**Decision.** `drCard()` in `js/analysis-shared.js` builds the card from `DR_DATA` (sample
values, DEC-11). The distance picks the proximity class, its badge tone (bad, warn, ok) and its
sentence; the density class does the same for drainage pressure. No overlap with the density
layer shows a "No drainage" badge with no narrative, rather than hiding the block, so the reader
sees that it was checked. No peatland hides the whole card. The card opens with "The peatland
area is located [close to / at an intermediate distance from / far from] mapped drainage canals,
with the nearest canal approximately [X m] away."; the Canal proximity block holds only the class
sentence. "Peatland disturbance may be associated…" is the card's disclaimer (`gcDisc`), in place
of the generic data alert. Canal proximity and Drainage pressure stack vertically; each row puts
its title, level badge and sentence beside a horizontal threshold bar (CMP-43). The badge sits
beside the title and names the class only ("Close", "High"); the bar carries the ranges, so
the "Distance class" and "Drainage density" labels are gone.

**Consequences.** The old closing sentence about canals lowering the water table and raising
fire susceptibility is gone; the class sentences replace it.

## DEC-88 · Hazard level badges sit next to the hazard name

**Context.** DEC-58 placed each Natural Disaster Risk hazard's name at the left and its level
badge at the far right of the row.

**Decision.** The badge follows the name with a 12px gap (`.gc-lvl`, `--space-12`), as it does
everywhere else a label and its level badge appear. Supersedes the placement in DEC-58.

## DEC-89 · Historical burned area shows its yearly chart again

**Context.** DEC-85 reduced the card to narrative only and removed the 2011 to 2020 bar chart.

**Decision.** The bar chart returns below the narrative, with the same sample series (DEC-11)
the narrative's figures come from. The summary box, the sub-titles and the fire-susceptibility
empty state stay removed. Supersedes DEC-85 on the chart only.

## DEC-90 · The land degradation chart shows three classes

**Context.** The half sunburst (DEC-86) split each of forest and non-forest into five
classes, including Degraded – potential false positive and – potential false negative. The
flagged slices were under 1% each and crowded the chart.

**Decision.** The chart and its legend show Degraded, Stable and Improved. Degraded includes
both flagged classes, so it matches the narrative's degradation-related total. The narrative's
uncertainty sentence still reports the flagged areas on their own.

## DEC-91 · No monospace type: labels and code use Poppins

**Context.** Eyebrows, section labels, phase labels, sitemap IDs and formula/code blocks were set
in IBM Plex Mono (or a system `ui-monospace` stack). The small uppercase monospace label read as
generic AI-generated styling rather than WRI's brand type.

**Decision.** Every former monospace rule uses `--font-text` (Poppins). `--mono` stays as a name
in `css/home.css` and `css/footer.css` but now resolves to `var(--font-text)`; new rules use
`--font-text` directly. IBM Plex Mono is no longer loaded. Resolves TODO-05 and TODO-17.

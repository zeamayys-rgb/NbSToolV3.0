# SCREENS.md — screen inventory

Every route in the NbS Tool. This is a **static site**: routes are `.html` files at the repo
root, and `vercel.json` sets `cleanUrls`, so `/dashboard` serves `dashboard.html`. There is no
router, no framework and no build step.

Component IDs (`CMP-nn`) are defined in [COMPONENTS.md](COMPONENTS.md).
State matrices (`SCR-nn`) are in [UI-STATES.md](UI-STATES.md).

> **Data dependency note that applies to every screen.** This is a design prototype. All
> figures — hectares, species, threat scores, benefit estimates, project records — are
> hardcoded in JS constants (`NBS_DATA`, `NBS_ANALYSIS`, `NBS_PEOPLE`, `ecosystems`). Only two
> real network calls exist in the entire codebase: the country/state/city cascade in
> `js/f08-app.js` and the Nominatim place search in `interactive-map.html`. Where a screen says
> "data dependency", read it as *what a real build would need to load*, not what loads today.

---

## Inventory

| ID | Route | Name | Purpose | Primary user goal | Key components | Data dependencies |
|---|---|---|---|---|---|---|
| SCR-01 | `/` | Home | Explain the Design-to-MRV proposition to a first-time visitor | Understand what the tool does and start an analysis | CMP-01, CMP-02, CMP-03, CMP-21, CMP-22 | None (static marketing copy + images) |
| SCR-02 | `/login` | Log in / Sign up | Authenticate, or register a new organisation account | Get into the tool | CMP-01, CMP-02, CMP-10, CMP-11, CMP-21 | None — no auth backend exists |
| SCR-03 | `/interactive-map` | Interactive Map / Data Analyser | The analytical core. Draw or upload an area, then read its baseline across 5 steps | Turn a boundary on a map into a scoped NbS pathway | CMP-01, CMP-04, CMP-05, CMP-06, CMP-07, CMP-08, CMP-09, CMP-20, CMP-23 | Basemap tiles; Nominatim geocoding; boundary geometry; all five analysis layers |
| SCR-04 | `/new-project` | Create New Project (F05.0) | Create a project from scratch when the user already has a boundary file | Register a project without going through the map | CMP-01, CMP-02, CMP-10, CMP-12, CMP-13, CMP-23 | SHP/GeoJSON upload; ecosystem + activity catalogue |
| SCR-05 | `/document-generator` | Document Generator (F03) | Fill donor/standard templates (General, CCB) from project data | Produce a funder-ready document | CMP-01, CMP-02, CMP-10, CMP-14, CMP-24 | Project record; template field schema; `localStorage` (`f03_gen`, `f03_ccb`) |
| SCR-06 | `/dashboard` | My Project Dashboard (F04) | List and manage the user's projects | Find and open a project | CMP-01, CMP-02, CMP-15, CMP-16, CMP-17, CMP-24 | Project list for the signed-in user; `localStorage` (`nbs_deleted_project`) |
| SCR-07 | `/project-detail` | Project Detail (F04.1) | One project across 7 tabs: overview, collaborators, privacy, history, analysis, monitoring, MRV | Review and administer a single project | CMP-01, CMP-02, CMP-06, CMP-07, CMP-18, CMP-23, CMP-24 | Project record; collaborator list; edit history; the SCR-03 analysis result |
| SCR-08 | `/create-monitoring-plan` | Create Monitoring Plan (F05) | 6-step wizard turning selected activities into a monitoring plan | Produce a downloadable monitoring plan | CMP-01, CMP-02, CMP-12, CMP-13, CMP-19, CMP-24 | Selected activities (`localStorage` `nbs_selected_activities`); indicator + methodology catalogue |
| SCR-09 | `/monitoring-form` | Monitoring Form (F05.1.1) | Field data entry against the plan's indicators | Record this period's observations with evidence | CMP-01, CMP-02, CMP-10, CMP-19, CMP-20 | Indicator list from the plan; `localStorage` (`f0511_data`); evidence file store |
| SCR-10 | `/mrv` | MRV Dashboard (F06) | Show verification status and monitoring results | See whether the project is on track and verified | CMP-01, CMP-02, CMP-16, CMP-18, CMP-24 | Submitted monitoring records; verification status; indicator time series |
| SCR-11 | `/account-settings` | Account Settings (F08) | Manage identity, password, organisation | Change my details securely | CMP-01, CMP-02, CMP-10, CMP-11, CMP-25, CMP-26 | User profile; org record; **live** country/state/city API |
| SCR-12 | `/sitemap` | Sitemap | Full page index for testers and reviewers | Reach any screen directly | CMP-01, CMP-02 | None |
| SCR-13 | `/NbS_Activities_Flow_v2` | Activity Matrix Flow | Reference Sankey of ecosystem → intervention → activity → benefit → indicator | Understand the taxonomy behind the tool | CMP-02, CMP-27 | `scripts/build_activities_flow_data.py` output, inlined; **D3 + d3-sankey from CDN** |
| SCR-14 | `/design-system` | Design System reference | Living catalogue of tokens and primitives | Look up a component before building | CMP-02, and every primitive | `css/tokens.css`, `css/styleguide.css` |
| SCR-15 | `/F02-P4_Pathway_Selection` | Pathway Selection (superseded) | Original Figma rebuild of Step 4 | — | — | Superseded by SCR-03 Step 4 |
| SCR-16 | `/F02-P5_Potential_Benefit_1` | Potential Benefit (superseded) | Original Figma rebuild of Step 5 | — | — | Superseded by SCR-03 Step 5 |
| SCR-17 | `/technical-docs` | Technical Documentation (F09) | In-app rendering of the Data & methodology documentation: scope, the five phases, benefit detail, Annex A spatial layers, limits | Understand and audit how a number was produced | CMP-01, CMP-28 | Reads live parameters from `NBS_DATA`, `NBS_ANALYSIS`, `NBS_LAYER_INFO`, `ecosystems`, `indicatorMeta`, `NBS_PEOPLE` — no static copies |

**Orphans.** SCR-14, SCR-15, SCR-16 and SCR-17 are reachable by URL but linked from no nav, footer or
sitemap. SCR-15 and SCR-16 are the Figma-rebuild sources whose content now lives inside
`js/analysis-shared.js` and renders in SCR-03; they are kept for visual reference and will
drift.
`TODO(design): confirm SCR-15/SCR-16 are reference-only and should be excluded from QA, or delete them.`
`TODO(design): SCR-17 ships with a nav entry point on its own page only. Decide where the docs
button lives on every other screen (nav actions, footer meta, or both) and add it to CMP-01.`

---

## The shared shell

SCR-02 through SCR-14 all render the same chrome, in this order:

1. `.sitenav` (CMP-01) — logo, three links, profile dropdown, language switcher, mobile drawer.
2. `.crumbbar` (CMP-24) — breadcrumb trail. Present on SCR-05, SCR-06, SCR-07, SCR-08, SCR-10.
3. `.desktop-notice` (CMP-23) — dismissible "best viewed on desktop" note.
4. Page content.
5. `.footer` (CMP-02) — logo, the six-step Design-to-MRV flow strip, meta links, socials.

SCR-01 replaces the nav's profile block with login/signup buttons. SCR-03 drops the footer
entirely — it's a full-viewport working surface.

---

## SCR-01 · Home

**What the user is trying to accomplish.** Decide, in about ninety seconds, whether this tool
is relevant to their organisation.

**Entry** — direct link, coalition site, search. **Exit** — "Interactive Map" (SCR-03) or the
auth modal (SCR-02 in overlay form).

**Layout.** Full-bleed hero with a scroll-driven `.stage` sequence, then seven `.band`
sections: benefits ("Actions that pay back"), the `#journey` step strip, lifecycle features,
proof ("Real places. Real hectares."), a mint data band, testimony, and the `#about` coalition
band, closing on a `.finale` CTA.

**Components.** CMP-01, CMP-02, CMP-03 (auth modal — the same login form as SCR-02, overlaid),
CMP-21 (scroll-reveal), CMP-22 (version / "what's new" modal, fired once per visitor and
remembered under `localStorage` key `nbs-vu-seen`).

**Data.** None. Every figure is copy. This is the one screen where that's appropriate — but the
hectare and project counts read as live statistics.
`TODO(design): the proof band presents specific numbers as fact. Mark them as illustrative, or wire them to a real source before any public launch.`

---

## SCR-02 · Log in / Sign up

**Goal.** Get in, or register.

**Entry** — nav "Log in"/"Sign up", the SCR-01 hero CTA, or any gated action.
**Exit** — SCR-06 on success. There is no failure exit, because there is no auth.

**Layout.** Split: a brand panel carrying the value proposition on one side, the form on the
other. Two `<section class="panel">` elements, `#panelLogin` and `#panelSignup`, swapped by
toggling `.active`; `#formTitle` is rewritten to match. The same markup is reused as an
overlay modal on SCR-01.

**Components.** CMP-01, CMP-02, CMP-10 (form fields), CMP-11 (password visibility toggle),
CMP-21.

**Data.** None. Submitting navigates. No credential is validated, no session is created, no
error path exists.
`TODO(design): every authenticated screen assumes a signed-in user with no session check. Define the unauthenticated and expired-session behaviour before any backend lands.`

---

## SCR-03 · Interactive Map / Data Analyser

The most complex screen in the product — 1,604 lines of HTML pulling nine stylesheets and
three scripts, one of which (`js/analysis-shared.js`) is 1,371 lines of content.

**Goal.** Go from "somewhere on a map" to "a scoped, evidenced NbS pathway I can defend".

**Entry** — nav, SCR-01 CTA, footer flow step F01. **Exit** — SCR-04 (create a project from the
result) or SCR-07 (attach to an existing one).

**Layout.** Full-viewport map with a left analysis drawer. The drawer advances through five
steps, driven by a `data-step` attribute; `data-step="-1"` is the collapsed/reopen state, so
the map can be seen unobstructed at any point.

| Step | Heading | What happens |
|---|---|---|
| 1 | Choose your analysis area | Draw a polygon, upload a boundary, or search a place (Nominatim). Confirm via "Analyse the selected polygon?" |
| 2 | Site characterisation | Four context panes — General, Nature, People, Climate — switched by `nbsShowSitePane()`. People Context is rendered separately by `js/people-context.js` with its own SVG charts. |
| 3 | Threat profile and NbS screening overview | Ranked threats by section, `nbsInitThreat()`; Overview shows all sections at once. |
| 4 | Design your NbS pathway | Choose ecosystem and intervention; activities render from `js/f05-shared.js`. |
| 5 | Potential Benefit | Benefit categories as flip-cards with per-tab scroll memory, `nbsInitBenefit()`. |

**Components.** CMP-01, CMP-04 (map canvas + draw tools), CMP-05 (step drawer), CMP-06
(context pane switcher), CMP-07 (People Context charts), CMP-08 (threat list), CMP-09 (benefit
flip-card), CMP-20 (the "i" info modals — two different implementations on this screen alone),
CMP-23.

**Data before the screen is useful.** Basemap tiles; a boundary geometry; then per-layer
results for all five steps. Today every value comes from the `NBS_DATA` / `NBS_ANALYSIS`
constants regardless of what polygon is drawn — the analysis output does not vary with the
input.
`TODO(design): Step 2–5 results are identical for every polygon. Testers will read this as a bug. Decide whether the prototype should label results as sample data.`

---

## SCR-04 · Create New Project (F05.0)

**Goal.** Register a project when the boundary already exists as a file, skipping the map.

**Entry** — dashboard "New project", footer flow step F02. **Exit** — SCR-06 or SCR-05.

**Layout.** Same `data-step` wizard pattern as SCR-08, plus a file drop zone: "Drop your SHP
file here to generate the Site Characterisation", with a success state ("Site Characterisation
generated") and an error region `#upErrTitle`. Steps then mirror the monitoring-plan flow —
add indicators, adjust source and frequency, assign responsible parties, notes and evidence,
review.

**Components.** CMP-01, CMP-02, CMP-10, CMP-12 (step wizard), CMP-13 (file drop zone), CMP-23.

**Data.** A parsed boundary file, the ecosystem/activity catalogue, and the indicator
catalogue. Upload is the only genuine input on the screen; nothing downstream of it varies.

---

## SCR-05 · Document Generator (F03)

**Goal.** Turn project data into a document a donor or standard body will accept.

**Entry** — profile dropdown, breadcrumb from SCR-07, footer flow step F03. **Exit** — download.

**Layout.** The HTML file is 95 lines: shell plus `<div class="f03-page" id="root">`. The entire
screen is rendered by `js/f03-app.js` (670 lines) — two template views (`gen` and `ccb`)
selected by `view`, a stepped form with per-step completion counts (`stepCounts`,
`filledCount`), a socio-economic section with live-recalculating tables (`recalcTables`), and
number inputs that format with thousand separators.

**Components.** CMP-01, CMP-02, CMP-10, CMP-14 (multi-step form engine), CMP-24.

**Data.** Template field schema; project record for prefill; `localStorage` under `f03_gen` /
`f03_ccb`. **Draft state is per-browser only** — it does not follow the user or the project.
`TODO(design): localStorage drafts are lost on browser change and silently collide between users on a shared machine. Confirm this is acceptable for the prototype and flag it in-product.`

---

## SCR-06 · My Project Dashboard (F04)

**Goal.** Find a project. Secondarily: create, delete, switch how the list is displayed.

**Entry** — post-login, nav "My Project". **Exit** — SCR-07, SCR-04.

**Layout.** `<h1>Welcome back, Adi 👋`, a profile card, then the project list in one of three
mutually exclusive regions: `#tableView`, `#gridView`, and `#emptyState`. This is the **only
screen in the product with a real empty state.** A "Create a new project" modal (`#npTitle`)
opens over it.

**Components.** CMP-01, CMP-02, CMP-15 (project table), CMP-16 (project card grid), CMP-17
(view switcher), CMP-24.

**Data.** The project list. `localStorage` key `nbs_deleted_project` carries a
delete-confirmation toast across the navigation that follows a deletion.

---

## SCR-07 · Project Detail (F04.1)

**Goal.** Everything about one project, in one place.

**Entry** — SCR-06 row/card. **Exit** — SCR-05, SCR-08, SCR-10, or back.

**Layout.** Header with the project title (`#projTitle`, truncating with ellipsis at one line),
then seven tab panels: `#p-overview`, `#p-collaborators`, `#p-privacy`, `#p-history`,
`#p-analysis`, `#p-monitoring`, `#p-mrv`. The `#p-analysis` tab re-mounts the SCR-03 Data
Analyser panes via `js/analysis-shared.js` and `js/people-context.js` — the same code, a
different container.

**Components.** CMP-01, CMP-02, CMP-06, CMP-07, CMP-18 (tab set), CMP-23, CMP-24.

**Data.** Project record, collaborators, privacy settings, edit history, the cached analysis
result, monitoring records, MRV status. Seven independent loads behind one screen — the
strongest case in the product for per-panel loading and error states, none of which exist.

---

## SCR-08 · Create Monitoring Plan (F05)

**Goal.** Turn chosen activities into a plan with indicators, sources, frequencies and owners.

**Entry** — SCR-07 monitoring tab, footer flow step F05. **Exit** — download, or SCR-09.

**Layout.** Six `data-step` sections: add monitoring indicator → review and edit indicators →
adjust data source and monitoring frequency → assign responsible parties → add notes and
evidence → download monitoring plan. The download step builds a print-ready document inline,
which is where the screen's hardcoded `'Barlow Semi Condensed', Arial` and `#042620` /
`#044c3e` literals come from — export markup that bypasses the token layer.

**Components.** CMP-01, CMP-02, CMP-12, CMP-13, CMP-19 (indicator row editor), CMP-24.

**Data.** `localStorage` key `nbs_selected_activities` (written by SCR-03 Step 4), plus the
indicator metadata table in `js/f05-shared.js` (methodology and sampling frequency per
indicator).
`TODO(design): what does this screen show if nbs_selected_activities is missing — a user who lands here directly, or clears storage between sessions?`

---

## SCR-09 · Monitoring Form (F05.1.1)

**Goal.** Record this period's field observations against the plan.

**Entry** — SCR-08, or SCR-07 monitoring tab. **Exit** — submit for verification (SCR-10).

**Layout.** 100 lines of HTML; `js/f0511-app.js` renders a sidebar of indicator groups with
per-group filled counts, indicator cards with value + evidence, a review step, and a
confirmation modal (`renderModal`, overlaid by `ov()` as `.f03-ov`).

**Components.** CMP-01, CMP-02, CMP-10, CMP-19, CMP-20.

**Data.** The plan's indicator list; `localStorage` key `f0511_data`; evidence attachments.
Evidence is rendered by `renderEvidence(id)` but has no upload target — the most
field-critical screen has the least real persistence.

---

## SCR-10 · MRV Dashboard (F06)

**Goal.** Answer "is this project verified, and on track?"

**Entry** — SCR-07 MRV tab, footer flow step F06. **Exit** — back into monitoring.

**Layout.** `.f06-hero` (eyebrow, title, meta, actions) over `.f06-grid` of `.f06-panel` cards
each with a head, title, sub and a `.chip-row`, plus a `.side-stack` column.

**Components.** CMP-01, CMP-02, CMP-16, CMP-18, CMP-24.

**Data.** Submitted monitoring records, verification status per indicator, time series for the
trend panels. Entirely static today.

---

## SCR-11 · Account Settings (F08)

**Goal.** Change my details without breaking my access.

**Entry** — profile dropdown. **Exit** — back.

**Layout.** Scroll-spy rail beside three `.card.sect` sections: `#profile` (personal identity),
`#password`, `#org` (organization info). `js/f08-app.js` (441 lines) carries the most real
behaviour in the codebase: toast, per-section save with a flash confirmation, avatar initials
synced to the name fields, password show/hide, live password strength and match checking,
forgot-password send, an email-verification OTP flow with auto-advancing boxes, paste support
and a resend countdown, and a country → province → city cascade.

**Components.** CMP-01, CMP-02, CMP-10, CMP-11, CMP-25 (OTP input), CMP-26 (cascading select).

**Data.** User profile, org record, and the **only genuine third-party dependency in the
product** — four `fetch()` calls to a countries/states/cities API, with a static fallback
(`provincesFallback`, `cityStaticFallback`) when it fails. This is the one place in the
codebase where a network failure is actually handled.

---

## SCR-12 · Sitemap

Full page index grouped as Start here / Design-to-MRV workflow / Reference / Account. Linked
from the footer only. Useful to testers; not part of the product narrative.

---

## SCR-13 · Activity Matrix Flow

A 694KB single file: a Sankey of ecosystem → intervention → activity → benefit → indicator,
generated by `scripts/build_activities_flow_data.py` and inlined. **Loads D3 and d3-sankey from
a CDN and guards for their absence** (`if (typeof d3 === 'undefined' || !d3.sankey)` → writes
into `#err`) — the only explicit dependency-failure state in the product. Also the only file
besides `js/version-modal.js` that reads `prefers-reduced-motion` and acts on it.

**Embed mode.** `?embed` hides the title block, the filter toolbar, the stat strip and the
footer, leaving the legend and the diagram. SCR-17 §7.5 iframes the page that way as a figure
above the seventeen-row table; the filters are dropped there because the embed is an overview
and its CTA sends anyone who wants to interrogate the matrix to this page. See DEC-26.

---

## SCR-14 · Design System

Living catalogue rendered from `css/styleguide.css` against `css/tokens.css`. Linked from
nothing. It is the closest thing to design documentation that exists in the product, and it is
unreachable by a user.
`TODO(design): link SCR-14 from the sitemap, or accept it as a developer-only URL and say so in the README.`

---

## SCR-17 · Technical Documentation (F09)

**What the user is trying to accomplish.** Find out how a figure they are looking at was
produced, and what it is safe to claim from it — before it goes into a proposal.

**Entry** — the `.nav-doc-button` in the nav actions, or a `#docs/<article-id>` deep link.
**Exit** — back to any nav destination. There is no forward step; this is a reference surface.

**Layout.** Three-column reading grid, `230px / minmax(0,900px) / 180px`, gap 44px, sidebar and
TOC both sticky. Below 1100px the TOC is dropped; below 820px the sidebar collapses to a
horizontal chip rail above the article. `body.docs-active` hides the analyser toolbar, topbar
and footer so the layout owns the viewport.

**Content model.** One `TECH_DOCS.articles` array drives three things at once: the grouped
sidebar, the search index (`label + keywords + group`), and the previous/next order.
**Twenty-four articles in seven groups**, mirroring the section order of the Coalition's
*Data & methodology documentation* so the two can be read side by side — Start here, Scope,
The five phases, Benefit detail, Annex A · Layers, Checks & limits, Reference. Each article is
a function returning `docHero(...)` plus a sequence of `docSection(...)`, and each `<h2>`
inside a `.doc-section` becomes a TOC anchor, tracked by an IntersectionObserver at
`rootMargin: '-22% 0px -68% 0px'`.

The six Annex A articles — one per annex section, A.1 to A.6 — carry thirty-four layer records
built by `docLayer(name, indicator, fields)`, which renders one `.doc-details` per layer with
the source document's own field order (why it matters, citation, attributes, sources,
pre-processing, method, QA/QC, where it appears, disclaimer). A field the source leaves blank is
not printed rather than filled in. Each annex article is split into two to four thematic
`docSection`s so the TOC rail stays useful on a page of collapsed records.

Method tables carry a `docSource('Table n')` citation line (`.doc-source`) naming the table
they were transcribed from.

One article embeds another screen. *Phase 4a · Decision matrix* opens §7.5 with a
`.doc-embed` figure that iframes **SCR-13** at `?embed`, followed by a `.doc-cta` link to the
full page. The figure shows where the seventeen rows lead once a pathway is assigned; its
caption states the limit, which is that the six rows resolving to *Carbon ineligible* carry no
activities and so do not appear in it. See DEC-26.

**Data dependencies — the point of the screen.** No figure on SCR-17 is typed into prose.
`readLiveParameters()` reads the same objects the product renders from, including parsing the
Data Analyser's own rendered benefit HTML for its methods, metrics, formulas and carbon
deduction chain. A value that cannot be read prints a visible `TODO` rather than a plausible
constant. See DEC-21.

One kind of content is transcribed rather than read, and it says so on the page.
Every **method** statement — constants, rates, class tables, decision rows, formulas,
citations and publisher disclaimers — is transcribed from the methodology documentation and
cites its section number (DEC-24). Site figures stay live. The two are kept visibly apart:
a method constant cites a `§`, a site figure cites a source object.

**States.** See [UI-STATES.md](UI-STATES.md) — SCR-17 has no loading or failure state (all data
is synchronous and in-page), but it does have a *missing parameter* state, rendered inline as
`.doc-todo`, and an *empty search* state (`.docs-nav-empty`).

**Accessibility.** The article region is `tabindex="-1"` and focused on article change so
keyboard and screen-reader users land on the new content; nav buttons carry `aria-current`;
TOC links move focus to their target section; the skip link targets `#docs-article`.

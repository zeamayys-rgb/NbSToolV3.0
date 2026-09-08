# UI-STATES.md — the state matrix

What every screen and data-driven component does when the data is missing, slow, partial,
broken, out of scope, too long, or stale.

**Read this before implementing any data-driven UI.**

---

## How to read this file

`Implemented?` has four values:

| Value | Meaning |
|---|---|
| **Yes** | The state exists in the code and is designed. |
| **Partial** | Something is there, but incomplete or unconfirmed. The cell says what's missing. |
| **No** | Not implemented. The "What the user sees" column is then a **proposal**, not a description. |
| **N/A** | The state can't occur on this screen. |

### The headline finding

Across the entire codebase there is **one** empty state (SCR-06), **one** typed error system
(SCR-04 upload), **one** loading overlay (SCR-03), **one** dependency-failure guard (SCR-13),
**one** network fallback (SCR-11), and **zero** skeletons, retry affordances, stale-data
indicators or per-panel error boundaries. Everything else in this file is a gap.

That is the useful output. The rows marked **No** are the backlog.

### Two conventions this file assumes

1. **Non-eligible is a product rule, not an error.** A region outside South East Asia, an area
   over the 500,000 ha cap, a project on a plan the org doesn't have — none of these are
   failures. They must never use danger colour or error iconography. SCR-04's upload errors
   already get this right: `format` is `tone: 'danger'`, but `area` and `region` are
   `tone: 'warning'`. **That is the pattern to copy everywhere else.**
2. **A partial result renders; it does not hide.** A missing layer shows an inline "Not
   available" affordance in its own place. Silently dropping it makes the user think the layer
   was assessed and found empty.

---

## SCR-01 · Home

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Page load | Hero, scroll-driven `.stage` sequence, seven content bands, finale CTA | Yes |
| Loading | Hero and band imagery in flight | Nothing — images pop in as they decode; the hero has no placeholder or aspect-ratio box | Partial — no reserved space, so the hero shifts on slow connections |
| Empty | N/A — all copy is static | — | N/A |
| Partial | An image 404s | Browser default broken-image behaviour | No — `TODO(design)` |
| Error | N/A | — | N/A |
| Non-eligible | N/A | — | N/A |
| Long content | Very narrow viewport, or 200% browser zoom | Bands reflow; the scroll-driven stage sequence is the fragile part | Partial — untested above 200% zoom |
| Offline / stale | No connection | Cached page renders; Google Fonts fail so display type falls back through the stack | Partial — the fallback chain works, but the layout was never checked in it |

**Notes**
- The version modal (CMP-22) fires once per visitor on top of the default state, gated by
  `localStorage` key `nbs-vu-seen`. If storage is unavailable (private mode, storage blocked),
  it fires on **every** visit.
- `TODO(design): reserve aspect-ratio boxes for the hero and proof-band imagery so the home page doesn't reflow while loading.`
- `TODO(design): the proof band states specific hectare and project counts as fact. Decide whether these are labelled illustrative before public launch.`

---

## SCR-02 · Log in / Sign up

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Page load | Brand panel + login form; `#panelSignup` hidden behind the toggle | Yes |
| Loading | Credentials submitted | Nothing — the button does not enter a pending state, and nothing prevents a double submit | No — `TODO(design)` |
| Empty | N/A | — | N/A |
| Partial | N/A | — | N/A |
| Error | Wrong credentials, locked account, network failure | **Nothing. There is no auth backend and no error region in the markup.** Submitting always navigates as if successful | No — the single largest state gap in the product |
| Non-eligible | Email domain not permitted, invitation required, org not approved | Not modelled | No — `TODO(design)` |
| Long content | Long email or org name in a field | Standard input overflow; no truncation rules defined | Partial |
| Offline / stale | Submit with no connection | Navigation appears to succeed | No — actively misleading |

**Notes**
- `TODO(design): define the full auth failure set — wrong password, unknown account, locked, rate-limited, expired session, network failure — with copy for each. Nothing downstream can be built honestly until this exists.` **Blocking.**
- `TODO(design): every authenticated screen assumes a signed-in user and performs no session check. Define what SCR-06 through SCR-11 render for a logged-out or expired visitor.` **Blocking.**

---

## SCR-03 · Interactive Map / Data Analyser

The highest-traffic and highest-risk screen. Broken out by step.

### SCR-03 · Step 1 — Choose your analysis area

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Screen opens | Full map, draw tools, place search, "Choose your analysis area" panel | Yes |
| Loading | Area confirmed, analysis running | `#mapLoading` full-map overlay: spinner + "Analysing the area" | Yes |
| Empty | No area drawn yet | Panel prompts for a draw, upload or search; Next is unavailable | Yes |
| Partial | Self-intersecting or multi-part polygon | Not validated — accepted silently | No — `TODO(design)` |
| Error | Nominatim search fails or times out | **Silent.** `fetch()` at `interactive-map.html:1570` has no `.catch()`; the results list simply never updates | No — `TODO(design)` |
| Non-eligible | Area outside South East Asia, or over 500,000 ha | Not checked here — **but SCR-04 checks exactly this on upload.** A user can draw an ineligible area on the map and proceed | No — inconsistent with SCR-04 |
| Long content | Many search results | List renders; `limit=6` caps it | Yes |
| Offline / stale | Basemap tiles unreachable | Blank grey tile grid, no message | No — `TODO(design)` |

**Notes**
- `TODO(design): SCR-04 rejects areas over 500,000 ha and outside South East Asia with designed, warning-toned copy. SCR-03 applies neither rule. Apply the same two rules at draw/confirm time and reuse the SCR-04 copy verbatim.` **Blocking — same product rule, two different answers.**
- `TODO(design): the "Analysing the area" overlay has no failure exit. If analysis fails it spins forever. Define a timeout and an error state.` **Blocking.**

### SCR-03 · Step 2 — Site characterisation

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Analysis complete | Four context panes — General, Nature, People, Climate — switched by `nbsShowSitePane()` | Yes |
| Loading | Pane switch | Instant swap of pre-rendered HTML; no perceptible load | Yes (nothing to load) |
| Empty | A pane has no data for this area | Not modelled — content is a constant, so the case can't arise today | No — `TODO(design)` |
| Partial | Some layers missing (e.g. species data but no water data) | Not modelled | No — `TODO(design)` |
| Error | A layer fails to compute | Not modelled | No — `TODO(design)` |
| Non-eligible | Area outside layer coverage | Not modelled | No — `TODO(design)` |
| Long content | Long species lists, many indicator cards | Panes scroll within the drawer | Yes |
| Offline / stale | Analysis older than the underlying dataset | No indication anywhere that a result has an age | No — `TODO(design)` |

**Notes**
- Every card already carries a source-and-year line (`gcSource(data, source, year)`) and an
  "i" affordance (`gcInfo(key)`). **The attribution mechanism for stale-data messaging already
  exists** — it just isn't used to say when a figure was computed.
- `TODO(design): should the source line carry an "analysed on <date>" stamp, and at what age does a result become visibly stale?`
- `TODO(design): define the per-card missing-layer treatment. The inline "Not available" chip is the recommendation; confirm the copy and whether it keeps the "i" affordance pointing at the methodology.`

### SCR-03 · Step 3 — Threat profile and NbS screening

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Region has threat data | Ranked threats by section; Overview shows every section at once (`nbsInitThreat`) | Yes |
| Loading | Section switch | Instant | Yes (nothing to load) |
| Empty | No modelled threats for this area | Not modelled | No — `TODO(design)` |
| Partial | Some threat layers unavailable | Not modelled — a missing layer would simply be absent, reading as "no threat" | No — **dangerous default** |
| Error | Threat model fails | Not modelled | No — `TODO(design)` |
| Non-eligible | Area outside the screening model's scope | Not modelled | No — `TODO(design)` |
| Long content | Many threats in one section | Section scrolls within the drawer | Yes |
| Offline / stale | — | No age indication | No |

**Notes**
- **The partial row matters more here than anywhere else in the product.** An absent threat
  layer is visually identical to an assessed-and-clear one. A user could scope a project
  believing a threat was ruled out when it was never evaluated.
  `TODO(design): a missing threat layer must render as an explicit "Not assessed" row, visually distinct from a zero-severity result. Confirm copy and treatment.` **Blocking.**

### SCR-03 · Step 4 — Design your NbS pathway

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Ecosystem + intervention chosen | Activity checkbox sections from `buildActivitySectionsHTML()` | Yes |
| Loading | Selection change | Instant re-render | Yes |
| Empty | Ecosystem + intervention combination has no activities | Not modelled — `buildActivitySectionsHTML` would render an empty section shell | No — `TODO(design)` |
| Partial | Some activities unavailable for this ecosystem | Not modelled | No — `TODO(design)` |
| Error | — | Not modelled | No |
| Non-eligible | Ecosystem not present in the drawn area | **All three ecosystems are always offered**, regardless of what the analysis found | No — `TODO(design)` |
| Long content | Many activities across several interventions | Sections scroll | Yes |
| Offline / stale | — | Catalogue is bundled, so never stale within a release | Yes (by construction) |

**Notes**
- `TODO(design): should an ecosystem with ~0 ha in the drawn area be disabled with a reason, hidden, or offered with a caution? Offering restoration of a mangrove in an area with no mangrove is a credibility problem.` **Blocking.**
- Selecting activities writes `localStorage` key `nbs_selected_activities`, which SCR-08 reads.
  That handoff has no defined failure behaviour — see SCR-08.

### SCR-03 · Step 5 — Potential Benefit

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Pathway chosen | Benefit categories as flip-cards; per-tab scroll memory preserved (`nbsInitBenefit`) | Yes |
| Loading | Category switch | Instant; card heights measured and set by `sizeCard()` before display | Yes |
| Empty | No modelled benefits for this pathway | Not modelled | No — `TODO(design)` |
| Partial | Some benefit categories unquantified | Not modelled | No — `TODO(design)` |
| Error | Benefit model fails | Not modelled | No — `TODO(design)` |
| Non-eligible | Benefit not applicable to this ecosystem | Not modelled | No — `TODO(design)` |
| Long content | Long assessment text on a card back | `faceHeight()` / `sizeAll()` measure both faces and size the card to the taller one; recalculated on resize | Yes — the most carefully built state in the product |
| Offline / stale | — | No age indication | No |

**Notes**
- The benefit "i" modal (`nbsBenefitInfo()`) is one of five separate modal implementations. See
  CMP-20 in [COMPONENTS.md](COMPONENTS.md).
- `TODO(design): benefit figures are presented without uncertainty ranges or confidence. For a tool whose output goes to funders, is a point estimate defensible, or does each figure need a range?` **Blocking — accuracy, not UI.**

---

## SCR-04 · Create New Project — upload step

**This is the reference implementation. Every other error state in the product should be built
to match it.**

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Step 1 opens | `#uploadHero` drop zone: "Drop your SHP file here to generate the Site Characterisation", plus a demo bar | Yes |
| Loading | File dropped, parsing | `#uploadProcessing` region shown; hero and demo bar hidden | Yes |
| Success | Boundary parsed | `#uploadResult`: "Site Characterisation generated"; Next enabled | Yes |
| Empty | No file yet | Drop zone is the empty state; `#step1Next` is `disabled` | Yes |
| Partial | Zipped Shapefile missing `.prj` or another part | Falls into the `format` error, which names the required parts in `detail` | Yes |
| Error — unreadable file | Not a boundary format, or a corrupt archive | `tone: 'danger'`, tag "Unsupported file", title "We couldn't read this file", the filename echoed back in bold, a `detail` line listing accepted formats, and two actions: "↻ Upload a different file" and "View upload requirements" | Yes |
| Non-eligible — too large | Boundary over 500,000 ha | `tone: 'warning'` (**not danger**), tag "Area too large", explains the cap and suggests splitting into sub-boundaries | Yes |
| Non-eligible — out of region | Boundary outside South East Asia | `tone: 'warning'`, tag "Outside supported region", and — the detail that makes it genuinely good — it names the likely cause: *"a wrong projection can place a valid site outside the region"* | Yes |
| Long content | Very long filename | Echoed inline in `upErrMsg` with no truncation | Partial — no max-width or ellipsis rule |
| Offline / stale | Upload with no connection | Parsing is client-side, so it works; nothing downstream is checked | Partial |

**Notes**
- Why this works, and what to copy: **a tone that matches the cause** (danger only for a real
  failure), **a tag, title, message and detail as four distinct jobs**, **the user's own input
  echoed back**, **a probable cause named**, and **two ways out — retry and learn more**.
- `TODO(design): truncate long filenames in upErrMsg (middle-ellipsis, keeping the extension visible).`
- `TODO(design): "View upload requirements" links to design-system.html#requirements — the orphan developer page (SCR-14). Users will land somewhere unbranded and confusing. Give the requirements a real home.` **Blocking — it's a live link in an error path.**

### SCR-04 · remaining steps

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Step advances | Wizard step content | Yes |
| Loading | Step transition | Instant | Yes |
| Empty | No indicators added yet | Not modelled | No — `TODO(design)` |
| Partial | Some indicators lack a source or owner | Not modelled — the review step counts fills but doesn't gate | Partial |
| Error | Save fails | No save exists | No |
| Non-eligible | — | — | N/A |
| Long content | Many indicators | Sections scroll | Yes |
| Offline / stale | — | Nothing persists server-side | No |

---

## SCR-05 · Document Generator (F03)

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | `js/f03-app.js` renders `#root` | Stepped form, per-step completion counts (`stepCounts`, `filledCount`) | Yes |
| Loading | Screen open before JS runs | **Empty white page.** The HTML body is a bare `<div id="root">` | No — `TODO(design)` |
| Empty | No fields filled | Form renders with zero counts; that reads correctly as an empty state | Yes |
| Partial | Some steps complete | Per-step counts communicate progress well | Yes |
| Error | JS fails to load, or stored draft JSON is corrupt | `loadFd()` catches the parse and resets to `{}` — **a corrupt draft is silently discarded with no message.** If the script itself fails, the page stays blank | Partial — data loss is handled but not communicated |
| Non-eligible | Template not available for this project type | Not modelled | No — `TODO(design)` |
| Long content | Long free-text answers, large socio-economic tables | Tables recalculate via `recalcTables()`; no max-height defined | Partial |
| Offline / stale | Draft is per-browser only | No indication that the draft is local and unsynced | No — `TODO(design)` |

**Notes**
- `TODO(design): a corrupt draft is silently reset to empty in loadFd(). The user loses their work with no message. Show a recoverable notice instead.` **Blocking — data loss.**
- `TODO(design): SCR-05, SCR-09 and SCR-10 render entirely from JS into an empty container. Define what a user sees if the script fails or is slow — at minimum a <noscript> message and a server-rendered skeleton.`
- `TODO(design): drafts live in localStorage (f03_gen, f03_ccb) with no user identity in the key. Two users on one machine overwrite each other. Namespace the key or state the limitation in-product.`

---

## SCR-06 · My Project Dashboard (F04)

**The only screen with a real empty state.**

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | User has projects | `#tableView` or `#gridView`, plus profile card and pager | Yes |
| Loading | Project list in flight | Not modelled — the list is markup, so it's simply present | No — `TODO(design)` |
| Empty | No projects yet | `#emptyState`: a sprout illustration, "Start your first project", copy explaining the Interactive Map route, and a "Create New Project" button. **Correct — an illustration, an explanation of the next step, and one clear action** | Yes |
| Partial | Some project records incomplete | Not modelled | No — `TODO(design)` |
| Error | Project list fails to load | Not modelled — the screen would show the empty state, telling a user with projects that they have none | No — **actively wrong** |
| Non-eligible | Org over its project quota | Not modelled | No — `TODO(design)` |
| Long content | Many projects; very long project names | `#pager` paginates; long names truncate in the table | Yes |
| Offline / stale | List cached from a previous session | No indication | No |

**Notes**
- `TODO(design): "list failed to load" must not fall through to the empty state. An error and an emptiness are different facts and a user cannot tell them apart today.` **Blocking.**
- Deleting a project writes `localStorage` key `nbs_deleted_project`, read and cleared on the
  next screen to show a confirmation toast. Sound pattern; it just needs an undo window.
  `TODO(design): should project deletion be undoable, and for how long?`

---

## SCR-07 · Project Detail (F04.1)

Seven tabs, seven independent data sources, one shared failure mode.

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Project loads | Header + the active tab panel | Yes |
| Loading | Tab switch (analysis and MRV tabs are heavy) | Instant swap of pre-rendered markup; no per-panel loading | No — `TODO(design)` |
| Empty | Tab has no content — no collaborators, no history, no monitoring yet | Not modelled for any of the seven | No — **seven missing empty states** |
| Partial | Analysis exists but monitoring doesn't | Not modelled; tabs give no completeness signal | No — `TODO(design)` |
| Error | One panel's data fails | Not modelled. **A failure in the analysis panel should not take down the screen** | No — `TODO(design)` |
| Non-eligible | User is a viewer, not an editor; project is private to another org | Privacy tab exists, but no permission-gated rendering anywhere | No — `TODO(design)` |
| Long content | Long project title | `#projTitle` is `nowrap` + `overflow:hidden` + `text-overflow:ellipsis` — handled, though with no tooltip revealing the full name | Partial |
| Offline / stale | Cached analysis older than the current dataset | No age shown | No |

**Notes**
- `TODO(design): define an empty state for each of the seven tabs. Collaborators, history and monitoring will be legitimately empty for most new projects — this is the common case, not the edge case.` **Blocking.**
- `TODO(design): the privacy tab implies roles, but no screen renders differently by role. Define the viewer / editor / owner matrix, then the no-permission treatment for each tab.` **Blocking.**
- `TODO(design): each tab panel needs its own error boundary so one failed source doesn't blank the screen.`

---

## SCR-08 · Create Monitoring Plan (F05)

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Activities selected upstream | Six-step wizard from indicators through to download | Yes |
| Loading | Step transition, document build | Instant; the download step builds the document synchronously | Partial — a large plan will block the main thread with no feedback |
| Empty | `nbs_selected_activities` missing or empty — a direct visit, cleared storage, or a new browser | **Not handled.** The screen renders with no indicators and no explanation of why | No — **the most likely real-world failure on this screen** |
| Partial | Some indicators lack a source, frequency or owner | Review step shows what's filled but doesn't block the download | Partial — an incomplete plan can be downloaded and sent to a funder |
| Error | Document generation fails | Not modelled | No — `TODO(design)` |
| Non-eligible | — | — | N/A |
| Long content | Many indicators across several ecosystems | Sections scroll; the generated document paginates | Yes |
| Offline / stale | Selection made in an earlier session against a since-changed pathway | No staleness check | No — `TODO(design)` |

**Notes**
- `TODO(design): define the no-upstream-selection state. Recommended: explain that activities must be chosen first, and link back to SCR-03 Step 4. This will happen to real users constantly.` **Blocking.**
- `TODO(design): should the download step block on an incomplete plan, warn, or allow it? An indicator with no responsible party is a plan that cannot be executed.` **Blocking.**
- The generated document hardcodes `'Barlow Semi Condensed', Arial` and `#042620` / `#044c3e`,
  bypassing the token layer entirely. See `TODO-14` in [tokens.json](tokens.json).

---

## SCR-09 · Monitoring Form (F05.1.1)

The field-data screen — the one most likely to be used on a poor connection.

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Plan indicators loaded | Sidebar of indicator groups with per-group filled counts; indicator cards; review step | Yes |
| Loading | Before `js/f0511-app.js` runs | Blank page — the HTML is 100 lines of shell | No — `TODO(design)` |
| Empty | No values entered | `filledCount()` returns 0 and the sidebar shows it; correct as an empty state | Yes |
| Partial | Some groups complete | `groupFilled(g)` drives per-group counts — genuinely good progress feedback | Yes |
| Error | Save fails, evidence upload fails | `save()` writes to `localStorage` with **no try/catch — a quota-exceeded throw is uncaught** and loses the entry silently | No — **data loss** |
| Non-eligible | Indicator not applicable this period | Not modelled | No — `TODO(design)` |
| Long content | Many indicators; long notes | Sidebar and main both scroll | Yes |
| Offline / stale | Field use with no connection | `localStorage` keeps values, so entry works offline — **but nothing tells the user their data is unsent**, and `renderEvidence(id)` has no upload target at all | No — **the most consequential gap in the product** |

**Notes**
- `TODO(design): this screen will be used in the field, offline, on phones, by people recording observations they cannot easily repeat. It needs an explicit sync model: saved-locally vs submitted, a pending-upload count, and a retry. Today a user can complete a full survey and have no idea it never left the device.` **Blocking — the single highest-priority item in this file.**
- `TODO(design): wrap localStorage writes in try/catch. Evidence photos will hit the quota.` **Blocking.**
- `TODO(design): evidence attachments render but have no upload destination. Define the storage, size limits, accepted types, and the failed-upload state.` **Blocking.**

---

## SCR-10 · MRV Dashboard (F06)

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Verification data present | `.f06-hero` over a `.f06-grid` of panels with chip rows and a side stack | Yes |
| Loading | Data in flight | Not modelled | No — `TODO(design)` |
| Empty | Project has no submitted monitoring yet — **the state every new project starts in** | Not modelled | No — `TODO(design)` |
| Partial | Some indicators reported, others not | Not modelled; panels assume a full set | No — `TODO(design)` |
| Error | Verification service unavailable | Not modelled | No — `TODO(design)` |
| Non-eligible | Project not enrolled in a verification standard | Not modelled | No — `TODO(design)` |
| Long content | Many indicators, long time series | Grid reflows; charts have no defined overflow behaviour | Partial |
| Offline / stale | Verification status cached | **No "as of" timestamp on a verification status** | No — `TODO(design)` |

**Notes**
- `TODO(design): a verification status with no date is not trustworthy. Every status chip needs an "as of" stamp and a staleness threshold.` **Blocking — this is the screen whose output people rely on.**
- `TODO(design): design the pre-first-submission state. Every project passes through it, and it is currently a dashboard of empty panels.` **Blocking.**

---

## SCR-11 · Account Settings (F08)

The best-covered screen in the product for real-world states.

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Page load | Scroll-spy rail + three sections: profile, password, organisation | Yes |
| Loading | Country/province/city fetch in flight | `.select-box.loading` swaps the chevron for a spinner | Yes |
| Empty | No organisation set | Not modelled | No — `TODO(design)` |
| Partial | Country loaded but the city list is unavailable for that province | `applyCities(..., note)` renders an explanatory note; `provincesFallback` / `cityStaticFallback` supply a static list | Yes — **the only genuine partial-data state in the product** |
| Error | API unreachable | Silent fallback to the static list; `resetCity(msg)` carries a message | Partial — degrades correctly but doesn't say a fallback is in use |
| Error — validation | Passwords don't match, invalid email | `checkMatch()`, `recalcStrength()` and `validEmail()` give live inline feedback | Yes |
| Non-eligible | SSO account — password not user-changeable | Not modelled | No — `TODO(design)` |
| Long content | Long org name, many countries in the select | Selects scroll natively | Yes |
| Offline / stale | Save with no connection | `wireSave()` flashes "saved" **unconditionally — no request is made and none could fail** | No — **falsely confirms a save** |

**Notes**
- The email-verification OTP flow (auto-advance, backspace, paste, resend countdown via
  `startResendCountdown()`) is the most complete interaction in the codebase. Use it as the
  model for any future multi-input control.
- `TODO(design): every "Saved" confirmation in this screen is unconditional. When a backend exists these must become pending → success → failure. Confirming a save that didn't happen is worse than no confirmation.` **Blocking.**
- `TODO(design): should the static country/city fallback announce itself ("showing a limited list — search unavailable"), or degrade silently as it does now?`

---

## SCR-13 · Activity Matrix Flow

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | D3 and d3-sankey load | Full Sankey: ecosystem → intervention → activity → benefit → indicator | Yes |
| Loading | CDN fetch in flight | Nothing — no placeholder for a 694KB page plus two CDN scripts | Partial |
| Empty | N/A — data is inlined | — | N/A |
| Partial | N/A | — | N/A |
| Error | D3 or d3-sankey unavailable | `if (typeof d3 === 'undefined' \|\| !d3.sankey)` writes into `#err` — **the only explicit dependency-failure guard in the codebase** | Yes |
| Non-eligible | N/A | — | N/A |
| Long content | Full matrix on a small screen | Diagram scales down; small nodes become unreadable | Partial — no minimum legible size or mobile alternative |
| Offline / stale | No connection | CDN scripts fail → the error guard fires correctly | Yes |
| Reduced motion | `prefers-reduced-motion: reduce` | `const reduce = matchMedia(...).matches` is read and honoured | Yes |

## SCR-17 · Technical Documentation (F09)

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Page load, or a `#docs/<id>` deep link | Grouped sidebar, article, TOC, prev/next pager | Yes |
| Loading | N/A — every parameter is already in the page, read synchronously | — | N/A |
| Empty | Search matches no article | `.docs-nav-empty` — "No methodology section matches “…”" | Yes |
| Partial | A live parameter cannot be read from the shared objects | Inline `.doc-todo` marker naming the missing path, in place of the figure. Tables and examples that need it degrade to a warn callout rather than printing a zero | Yes |
| Error | A shared script (`analysis-shared.js`, `f05-shared.js`, `people-context.js`) fails to load | Every figure it would have supplied renders as `.doc-todo`; the page itself still renders. **No banner tells the user the page is degraded** | Partial |
| Non-eligible | N/A | — | N/A |
| Long content | A long article on a narrow viewport | Tables and equation blocks scroll horizontally inside their own wrapper; the page body never scrolls sideways. TOC drops below 1100px; sidebar becomes a chip rail below 820px | Yes |
| Offline / stale | No connection after first load | Fully functional — no network calls after the page and its scripts are cached | Yes |
| Invalid deep link | `#docs/nonsense` | Falls back to the `overview` article rather than an empty page | Yes |
| Reduced motion | `prefers-reduced-motion: reduce` | Honoured — `docScrollBehavior()` returns `auto`, and a media query opts the page out of the global `html { scroll-behavior: smooth }` in `tokens.css` | Yes |

`TODO(design): SCR-17 has no degraded-page banner. If a shared script fails, the reader sees a page of TODO markers with no explanation of why.` **Blocking.**
`TODO(design): SCR-17 opts itself out of the global smooth scroll under reduced motion. Every other screen still ignores the preference — fix it in css/tokens.css instead.`

---

---

## Cross-cutting components

### CMP-01 · Site navigation

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Any screen | Logo, three links, profile dropdown, language switcher | Yes |
| Logged out | SCR-01, SCR-02 | Login and Sign up buttons replace the profile block | Yes |
| Mobile | Narrow viewport | Hamburger drawer via `setOpen()` in `js/nav-mobile.js` | Yes |
| Loading | User identity in flight | Not modelled — name and email are hardcoded markup ("Adi Mantri") | No — `TODO(design)` |
| Long content | Long user name or email in the dropdown | No truncation rule | No — `TODO(design)` |
| Error | — | — | N/A |

### CMP-23 · Desktop notice

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Narrow viewport on a desktop-first screen | "Best viewed on desktop" banner with a dismiss button, `role="note"` | Yes |
| Dismissed | User clicks `.dn-x` | Hidden for the session | Partial — **dismissal is not remembered across pages, so it reappears on every navigation** |

`TODO(design): persist the desktop-notice dismissal (localStorage), or accept that a mobile user dismisses it on every screen.`

### CMP-20 · Info modals

Five separate implementations; see [COMPONENTS.md](COMPONENTS.md) CMP-20 for the full contract.

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | "i" affordance activated | Panel with the layer's or benefit's methodology and source | Yes (per implementation) |
| Loading | Content fetched on open | N/A — all content is bundled | N/A |
| Empty | No methodology recorded for this key | Not modelled — `gcInfo(key)` renders the affordance whether or not the key resolves, so an "i" can open onto nothing | No — `TODO(design)` |
| Error | — | — | N/A |
| Long content | Long methodology text | Body scrolls in some implementations, overflows in others | Partial — inconsistent across the five |
| Dismissal | Escape, scrim click, close button | Only `js/version-modal.js` handles Escape (`onKey`). The others vary | Partial — **inconsistent** |
| Focus trap | Modal open | **None of the five implement a focus trap or restore focus on close** | No — accessibility failure |

`TODO(design): specify one modal contract — dismissal (Escape + scrim + button), focus trap, focus restore, scroll lock, ARIA roles — then converge all five implementations on it.` **Blocking — accessibility.**

---

## Ocean Calculator

**Not in this codebase.** The word "ocean" appears once, in a comment in
`js/analysis-shared.js`, and there is no calculator feature anywhere in the repo.

`TODO(design): is the Ocean Calculator unbuilt, renamed (the marine pathway inside SCR-03 Step 4?), or living in the sibling repo "nbs tool (3) f05 finish"? No states are documented here because there is nothing to document.`

---

## Universal gaps

These apply to every screen and are recorded once rather than in every table.

1. `TODO(design): no screen has a defined loading state for its primary content. SCR-05, SCR-09 and SCR-10 render entirely from JS into an empty container and show a blank page until the script runs.` **Blocking.**
2. `TODO(design): there is no skeleton pattern anywhere. Define one — matched row heights, no layout shift — before the first real data source lands.` **Blocking.**
3. `TODO(design): there is no toast or global notification pattern shared across screens. js/f08-app.js has a local toast(); SCR-06 and SCR-08 have their own. Promote one.`
4. `TODO(design): no screen distinguishes "loaded and empty" from "failed to load". Every empty region in the product is ambiguous.` **Blocking.**
5. `TODO(design): nothing in the product shows the age of a computed result. Analysis, benefit figures and verification status are all presented as timeless.` **Blocking.**
6. `TODO(design): no screen renders differently by permission, though the privacy tab implies roles exist.` **Blocking.**
7. `TODO(design): 19 of 25 files ignore prefers-reduced-motion. See MOTION.md.`

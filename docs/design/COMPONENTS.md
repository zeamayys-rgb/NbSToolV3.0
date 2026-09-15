# COMPONENTS.md — component reference

There are no component files in this project. It is a static site with no framework and no
build step, so a "component" here is one of three things:

1. **A CSS class family** — `.btn`, `.sitenav`, `.f06-panel`.
2. **An HTML-string factory in JS** — `gcHead()`, `card()`, `cardHTML()`.
3. **A behaviour attached to markup** — `initNav()`, `nbsInitBenefit()`, `mountTweaks()`.

Props are therefore either **CSS modifier classes**, **data attributes**, or **function
arguments**. Each entry says which.

State matrices are in [UI-STATES.md](UI-STATES.md). Screens are in [SCREENS.md](SCREENS.md).

> **A11y note that applies to everything below.** `js/nav-mobile.js` runs `hardenSvgs()` on
> boot, which sets `aria-hidden="true"` and `focusable="false"` on every inline `<svg>` that
> lacks its own `aria-label`, `role="img"` or `<title>`. It re-runs at 400ms and 1200ms on
> JS-rendered screens. So **an icon is decorative by default**; to make one meaningful you must
> give it a label, or `hardenSvgs` will hide it from assistive tech.

---

## CMP-01 · Site navigation (`.sitenav`)

**Files.** [css/nav.css](../../css/nav.css) · [js/navbar.js](../../js/navbar.js) (markup) ·
[js/nav-mobile.js](../../js/nav-mobile.js) (behaviour)
**Purpose.** The persistent top bar on every screen except SCR-01's variant. Brand, primary
navigation, identity, language.

**One source of markup (DEC-22).** A screen ships only a placeholder; `js/navbar.js` renders
the bar into it. Add the script with a plain `<script>` directly after the placeholder so the
bar exists before paint.

```html
<nav class="sitenav" data-nav-page="map" data-nav-auth="user"></nav>
<script src="js/navbar.js"></script>
```

Changing a nav item — a new link, a renamed label, a different action — is a one-line edit to
the `LINKS` array or a template function in `js/navbar.js`, never a pass over 12 HTML files.
The bar spans the full viewport width with `var(--space-48)` side padding; the links stay
centred via `.sitenav-links { margin: 0 auto }`.

**Brand lockup.** `.sitenav-logo` is a two-mark lockup: the NbS Tool mark
(`assets/nbs-logo-dark.png`, `.sitenav-logo-nbs`), a 1px `.sitenav-logo-rule` divider, then
SCeNe Coalition (`assets/scene-logo.png`, `.sitenav-logo-scene`). Both `<img>` carry real `alt`
text; the rule is `aria-hidden`. Marks shrink on the ≤860px breakpoint.

**Product switcher (`.sitenav-brand` / `.sitenav-switch`).** A chevron button sits beside the
SCeNe mark and discloses `#brandSwitchMenu`, listing the four coalition tools: NbS Tool (current,
`aria-current="page"`), NbS Criteria, NbS Incubator, NbS Portfolio. Wired by `initBrandSwitch()`
in `js/nav-mobile.js` — opens on click, closes on outside click and Escape (returning focus to
the button), and keeps `aria-expanded` in sync. The menu is toggled with the `hidden` property,
so it is removed from the a11y tree when closed.

`TODO(design): NbS Criteria, Incubator and Portfolio have no destinations. They render as
`.is-unavailable` non-links (dimmed, not focusable) rather than links to nowhere — supply URLs
to turn them into `<a>`.`

| "Prop" | Type | Required | Default | Controls |
|---|---|---|---|---|
| `data-nav-page` | attribute | no | — | `home` \| `map` \| `projects` \| `docs` \| `account` — marks the current link `.active` + `aria-current` |
| `data-nav-auth` | attribute | no | `user` | `user` = profile dropdown · `guest` = Login / Sign up |
| `.sitenav-link.active` | class (set by JS) | no | — | Marks the current section |
| `#profileWrap` / `#profileBtn` | id | for signed-in screens | — | Presence enables the profile dropdown |
| `.sitenav-login` / `.sitenav-signup` | class | no | — | Logged-out variant (SCR-01, SCR-02); rendered as `<a href="login.html" data-auth>` so SCR-01's auth modal can intercept it and every other screen just follows the link |
| `.open` | class (set by JS) | — | off | Mobile drawer open |

**Variants.** Signed-in (profile dropdown + language) · Logged-out (Log in + Sign up) · Mobile
(hamburger drawer).

**Interactive states.** Rest / hover / focus-visible on links; the a11y baseline in
`css/tokens.css` paints a 2px outline on `:focus-visible`, switched to a **white** ring on
`.sitenav a` because the bar can be dark. No active or disabled state.

**Accessibility contract.**
- Hamburger is a real `<button type="button">` with `aria-label="Toggle menu"` and a live
  `aria-expanded` that `setOpen()` keeps in sync.
- Drawer closes on link click, outside click, and **Escape**.
- Profile dropdown closes on outside click and Escape, but **`aria-expanded` is never set on
  `#profileBtn`** — a screen-reader user isn't told it opened.
- Injected once per `nav.sitenav`; re-entrant via a `:scope > .sitenav-burger` guard.

**Known limitations.**
- User name and email are still sample data ("Adi Mantri", "adi@lestari.org"), now in one
  place — `profile()` in `js/navbar.js` — rather than on every screen.
- The dropdown is not a `menu`/`menuitem` structure and has no roving focus.
- Long names have no truncation rule.
- `TODO(design): add aria-expanded to the profile button and define its open/closed announcement.`

---

## CMP-02 · Footer (`.footer`)

**File.** [css/footer.css](../../css/footer.css)
**Purpose.** Brand close, two link columns, the five-step Design-to-MRV flow strip, socials.

No props, no variants, no states beyond link hover/focus.

**Structure.**
- `.footer-head` — a grid. Left: `.footer-brand`, holding the `.footer-lockup` (NbS Tool
  `assets/nbs-logo-light.png` · 1px `.footer-lockup-rule` · SCeNe `assets/scene-logo-light.png`)
  and the one-sentence positioning line. Right: `.footer-cols`, a
  `<nav aria-label="Footer links">` of two `.footer-col` blocks — **Supporting Materials**
  (Activity Matrix, Methodology, NbS Tool Tutorial) and **Other Page** (Sitemap, About SCeNe
  Coalition, Contact Us).
- `.footer-flow` — `<nav aria-label="The Design-to-MRV workflow">`, five labelled steps
  (Step 1–5: Scope, Analyse, Document, Manage, Plan) and the clearest expression of the
  product's mental model anywhere in the UI.
- `.footer-bottom` — copyright and social icons.

**Known limitations.**
- The social links are `href="#"` placeholders with correct `aria-label`s — they announce as
  links to nowhere.
- **Methodology** and **NbS Tool Tutorial** both point at `technical-docs.html`, and
  **Contact Us** points at `index.html#about`: none of those three destinations exist yet.
  `TODO(design): specify real destinations for Methodology, NbS Tool Tutorial and Contact Us.`
- The rail no longer links F06 MRV — the design shows five steps, so `mrv.html` is now reachable
  only from the dashboard and the sitemap.
  `TODO(design): confirm dropping MRV from the footer rail is intended.`

---

## CMP-03 · Auth panel (`.panel` + `#panelLogin` / `#panelSignup`)

**Files.** [css/auth.css](../../css/auth.css) · inline script in `index.html` / `login.html`
**Purpose.** Login and signup forms. Used full-page on SCR-02 and as an overlay on SCR-01.

| Prop | Type | Required | Default | Controls |
|---|---|---|---|---|
| `.active` | class | yes | on `#panelLogin` | Which panel shows |
| `#formTitle` / `#authTitle` | id | yes | "Welcome back" | Heading, rewritten on toggle |

**Variants.** Login · Signup · Overlay (SCR-01, wrapped in `.auth-overlay` > `.auth-modal`).

**Known limitations.** Panels are swapped by class, so **the inactive panel's fields remain in
the DOM and in the tab order** unless `hidden` is also applied. No submit, pending, or error
state — see UI-STATES.md SCR-02.

---

## CMP-04 · Map canvas

**File.** [interactive-map.html](../../interactive-map.html) · [css/f01-step1.css](../../css/f01-step1.css)
**Purpose.** OpenStreetMap basemap with an AOI overlay, draw tools, and place search.

| Prop | Type | Required | Default | Controls |
|---|---|---|---|---|
| `#mapLoading[hidden]` | attribute | — | hidden | The "Analysing the area" overlay |
| `.map-bg` | class | yes | — | Basemap container |

**States.** Rest · drawing · area selected · analysing (`.map-loading` — spinner and copy over a
scrim). No tile-failure state.

**Accessibility contract.** `.map-loading__spin` is `aria-hidden`; the copy beside it carries the
meaning. There is **no keyboard path to drawing a polygon** — the primary action of the primary
screen is pointer-only.

**Known limitations.**
- `.map-loading__box` uses `padding-left: 450px` to clear the drawer — a hardcoded offset that
  breaks if the drawer width changes.
- Nominatim search has no `.catch()`; failures are silent.
- `TODO(design): define a keyboard and screen-reader path for area selection — search-and-confirm, or a coordinate/bounding-box entry.` **Blocking — accessibility.**

---

## CMP-05 · Step drawer (`[data-step]`)

**Files.** [interactive-map.html](../../interactive-map.html) · [css/f01.css](../../css/f01.css)
**Purpose.** The five-step analysis panel over the map.

| Prop | Type | Required | Default | Controls |
|---|---|---|---|---|
| `data-step` | attribute | yes | `"1"` | Which step renders; `-1` collapses the drawer |

**Variants.** Steps 1–5 · collapsed (`-1`) with a reopen tab painted in `viridian.750`.

**Known limitations.** Step state is a DOM attribute only — not in the URL. **Reloading the page
loses all analysis progress, and a step cannot be linked to or shared.**
`TODO(design): should analysis state live in the URL (?step=3) so a result can be bookmarked and shared? This is a workflow question, not a technical one.` **Blocking.**

---

## CMP-06 · Context pane switcher

**File.** [js/analysis-shared.js](../../js/analysis-shared.js) — `nbsShowSitePane(root, key)`
**Purpose.** Switches Site Characterisation between General, Nature, People and Climate.

| Arg | Type | Required | Default | Controls |
|---|---|---|---|---|
| `root` | Element | yes | — | The mounted analysis container |
| `key` | `'general' \| 'nature' \| 'people' \| 'climate'` | yes | `'general'` | Which pane shows |

**Sub-factories** (all return HTML strings):

| Factory | Signature | Purpose |
|---|---|---|
| `gcHead` | `(title, icon, key)` | Card head with a Material icon chip and an optional "i" |
| `gcSub` | `(title, key)` | Sub-heading with an "i" |
| `gcInfo` | `(key)` | The "i" affordance itself — `role="button"`, `tabindex="0"`, `aria-label="More information"`, `data-layer-info="<key>"` |
| `gcSource` | `(data, source, year)` | The attribution line under a card |
| `ncSpecies` | `(icon, name, dot, list)` | Species row; `list` is `[common, latin, occurrence]` |
| `clChart` | `(bars, plot, labels, yTicks, yTitle, cls)` | Climate chart |

**Accessibility contract.** `gcInfo` is a `<svg>` with `role="button"` and `tabindex="0"` — it is
reachable and labelled, but **it is not a real button**, so it does not fire on Enter or Space
unless a key handler is bound, and it has no `aria-expanded`/`aria-haspopup` for the modal it
opens.

**Known limitations.** The "i" renders whether or not its `key` resolves to content, so it can
open onto nothing. Deciding where an "i" belongs is documented in a source comment ("The 'i'
belongs to whatever a reader would look it up by") — good intent, no enforcement.
`TODO(design): make gcInfo a real <button>, or bind Enter/Space. As shipped it is keyboard-focusable but not keyboard-operable, which is worse than not being focusable.` **Blocking — accessibility.**

---

## CMP-07 · People Context charts

**File.** [js/people-context.js](../../js/people-context.js) — `NBS_PEOPLE`
**Purpose.** Hand-built SVG charts for the People pane. No charting library.

| Builder | Signature | Renders |
|---|---|---|
| `svgDonut` | `(segs, colors, unit)` | 116px donut |
| `svgLine` | `(pts, color, soft, labels)` | 270×88 line |
| `svgBars` | `(items, color, deep, unit)` | Bars, width `max(220, n*56)` |
| `svgStack` | `(segs, colors, W)` | Stacked bar, default 300 wide |
| `svgPyramid` | `(rows, mTot, fTot)` | 300×196 population pyramid |
| `gauge` | `(level, tipTxt)` | Five-step Very Low → Very High |
| `dots` | `(pct)` | Ten-dot percentage |
| `card` / `section` | `(key, c, wide)` / `(key, narr, cards, cols, srcLine)` | Card and section shells |

**Interactive states.** Hover only, via a single shared tooltip element (`ensureTip()`,
`wireTips()`) positioned from `data-tip`.

**Accessibility contract.** **None.** The charts are unlabelled `<svg>`, so `hardenSvgs()` hides
every one of them from assistive tech. `data-tip` is mouse-only — no focus, no keyboard, no
text equivalent. `lum()` exists to pick a readable label colour against a segment fill, which is
the only contrast handling in the file.

**Known limitations.**
- Chart colours are hardcoded hex passed as arguments — outside the token system entirely.
- A source comment flags the values as illustrative: *"values are illustrative samples for the
  mock; live values come from the data pipeline"*.
- `TODO(design): every chart needs a text equivalent — a data table, or aria-label carrying the summary. Today the People pane is entirely invisible to a screen reader.` **Blocking — accessibility.**
- `TODO(design): map chart series colours onto tokens, with a documented categorical palette that survives dark theme.`

---

## CMP-08 · Threat list

**File.** [js/analysis-shared.js](../../js/analysis-shared.js) — `nbsInitThreat(root, onShow)`
**Purpose.** Step 3 threat profile with section switching; Overview shows all sections.

| Arg | Type | Required | Default | Controls |
|---|---|---|---|---|
| `root` | Element | yes | — | Container |
| `onShow` | `(key) => void` | no | — | Callback on section change |

**Known limitations.** A missing threat layer is indistinguishable from an assessed-and-clear
one. See UI-STATES.md SCR-03 Step 3 — the most consequential state gap in the analysis flow.

---

## CMP-09 · Benefit flip-card

**File.** [js/analysis-shared.js](../../js/analysis-shared.js) — `nbsInitBenefit(root)`
**Purpose.** Step 5 benefit cards that flip between a summary and an assessment.

| Data attribute | Type | Required | Default | Controls |
|---|---|---|---|---|
| `data-def` | string | no | — | Definition text; `data-def="modal"` hides it on the card and shows it only in CMP-20 |
| `data-method` | string | no | — | Calculation method for cards with no `.formula` block |
| `.formula code` | element | no | — | Preferred method source; takes precedence over `data-method` |

**Interactive states.** Rest · hover · flipped. Both faces are measured (`faceHeight()`) and the
card sized to the taller (`sizeCard()`, `sizeAll()`), recalculated on resize. Per-tab scroll
position is remembered across category switches.

**Accessibility contract.** The flip is the concern: **there is no documented control for what
is focusable on the hidden face.** A CSS-only flip leaves the back face's content in the tab
order while visually hidden.
`TODO(design): confirm the hidden face is removed from the tab order (inert / visibility:hidden, not just a transform), and that the flip trigger announces its state.` **Blocking — accessibility.**

**Known limitations.** Card markup is the single source of truth for the info modal, which is
elegant but means changing card copy silently changes modal copy.

---

## CMP-10 · Form field

**Files.** [css/styleguide.css](../../css/styleguide.css) · per-screen CSS
**Purpose.** Text, number, select, textarea, checkbox, radio.

| Prop | Type | Required | Default | Controls |
|---|---|---|---|---|
| `.error` / `.is-invalid` | class | no | — | Error styling (inconsistent — both spellings appear) |
| `disabled` | attribute | no | — | Disabled styling via `--bg-disabled` |
| `.select-box.loading` | class | no | — | Swaps the chevron for a spinner (SCR-11) |

**Interactive states.** Rest · hover · focus-visible (2px outline from the a11y baseline, plus
`--ring-primary` where applied) · disabled. **No loading state** except the SCR-11 select.

**Accessibility contract.** `::placeholder` is set to `#767b82` in the a11y baseline
specifically to clear 4.5:1. Labels are present on most fields but **there is no enforced
label–input association pattern**, and error text is not wired with `aria-describedby`
anywhere.

**Known limitations.**
- Number formatting with thousand separators (`formatNumInput`, `f03-app.js`) uses `.` as the
  separator while `f03-app.js`'s `grp()` uses `en-US` (`,`). **Two separator conventions in one
  screen.**
- `TODO(design): pick one number format — Indonesian (1.234,5) or English (1,234.5) — and apply it everywhere. Mixed separators in a data tool are a correctness problem, not a style one.` **Blocking.**
- `TODO(design): standardise the error class name and wire error text with aria-describedby.`

---

## CMP-11 · Password field

**File.** [js/f08-app.js](../../js/f08-app.js)
**Purpose.** Password entry with visibility toggle, live strength, and match checking.

| Behaviour | Function | Notes |
|---|---|---|
| Show / hide | inline | Toggles `type` between `password` and `text` |
| Strength | `recalcStrength()` | Live meter + requirement checklist |
| Match | `checkMatch()` | Live comparison against the confirm field |

**Accessibility contract.** The toggle needs `aria-pressed` and a label that changes with state;
the strength meter needs an `aria-live` region. Neither is present.
`TODO(design): announce password strength changes politely, and label the visibility toggle by state.`

---

## CMP-12 · Step wizard (`[data-step]`, `.step-content`)

**Files.** [new-project.html](../../new-project.html) · [create-monitoring-plan.html](../../create-monitoring-plan.html)
**Purpose.** Multi-step flows on SCR-04 (6 steps) and SCR-08 (6 steps).

| Prop | Type | Required | Default | Controls |
|---|---|---|---|---|
| `data-step` | attribute | yes | `"1"` | Active step |
| `#step1Next[disabled]` | attribute | — | disabled | Gates advancing until step 1 validates |

**Known limitations.** Step state is not in the URL — a reload restarts the wizard. Only step 1
gates; later steps advance regardless of completeness. Same pattern as CMP-05 and the same
`TODO`.

---

## CMP-13 · File drop zone

**File.** [new-project.html](../../new-project.html)
**Purpose.** Accepts a zipped Shapefile or KML/KMZ and produces a Site Characterisation.

| Region | Id | Shown when |
|---|---|---|
| Drop hero | `#uploadHero` | Default |
| Processing | `#uploadProcessing` | Parsing |
| Result | `#uploadResult` | Success |
| Error card | `#uploadError` / `#upErrCard` | Any of three typed errors |

**Error contract** — `UPLOAD_ERRORS[type]` supplies `tone`, `tag`, `title`, `msg`, `detail`;
`ERR_IC[type]` supplies the icon; `showUploadError(type, name)` renders and disables Next;
`resetUpload()` restores the default.

| type | tone | Meaning |
|---|---|---|
| `format` | `danger` | Unreadable or unsupported file — a real failure |
| `area` | `warning` | Over the 500,000 ha cap — a product rule |
| `region` | `warning` | Outside South East Asia — a product rule |

**This is the reference error implementation in the product.** Tone matches cause; tag, title,
message and detail each do one job; the user's filename is echoed back; a probable cause is
named; there are two ways out.

**Known limitations.** Long filenames are echoed without truncation. "View upload requirements"
points at `design-system.html#requirements` — an orphan developer page. Both tracked in
UI-STATES.md SCR-04.

---

## CMP-14 · F03 form engine

**File.** [js/f03-app.js](../../js/f03-app.js) (670 lines)
**Purpose.** Renders the entire Document Generator screen into `#root`.

| Concept | Function | Notes |
|---|---|---|
| View | `view` (`'gen'` \| `'ccb'`) | Selects the template |
| Persistence | `lsKey()`, `loadFd()`, `save()` | `localStorage` under `f03_gen` / `f03_ccb` |
| Progress | `filledCount()`, `stepCounts()`, `isFilled()`, `stepKeys()` | Per-step completion |
| Field rendering | `frow()`, `fieldInput()`, `simpleFields()`, `dateRange()` | Structure only; values set in populate |
| Domain widgets | `propCard()`, `bioTbl()`, `matrixHTML()`, `livelihoodHTML()`, `hhTableHTML()`, `iplcHTML()` | Socio-economic and biodiversity blocks |
| Live totals | `recalcTables()`, `toNum()`, `sep()`, `setCell()` | Recalculating tables |

**Known limitations.** `loadFd()` catches a JSON parse failure and silently resets to `{}` —
**data loss with no message**. `save()` is unguarded against quota errors. The `localStorage`
key carries no user identity, so two users on one machine overwrite each other. All three in
UI-STATES.md SCR-05.

---

## CMP-15 · Project table · CMP-16 · Project card · CMP-17 · View switcher

**Files.** [css/dashboard.css](../../css/dashboard.css) · [css/f04.css](../../css/f04.css) · [js/tweaks-vanilla.js](../../js/tweaks-vanilla.js)
**Purpose.** The two presentations of the project list and the control that swaps them.

| Prop | Type | Required | Default | Controls |
|---|---|---|---|---|
| `#tableView` / `#gridView` / `#emptyState` | id | yes | table | Which of the three regions shows — mutually exclusive |
| `#pager` | id | no | — | Pagination |

**Known limitations.** The chosen view is not remembered between visits. The switcher's
`aria-pressed` state is undefined. The three regions are swapped by display, so hidden rows may
remain in the tab order.
`TODO(design): remember the table/grid preference per user.`

---

## CMP-18 · Tab set

**Files.** [project-detail.html](../../project-detail.html) (7 tabs) · [mrv.html](../../mrv.html)
**Purpose.** Panel switching within a screen.

| Prop | Type | Required | Default | Controls |
|---|---|---|---|---|
| `.panel.active` | class | yes | first panel | Which panel shows |
| `role="tab"` | attribute | partial | — | Present in the a11y baseline's focus selectors, inconsistently applied in markup |

**Accessibility contract.** `css/tokens.css` styles `[role="tab"]:focus-visible`, so the tab
role **is** expected — but the markup does not consistently supply `role="tablist"`,
`aria-selected`, `aria-controls`, or arrow-key roving focus.
`TODO(design): specify one tab contract — roles, aria-selected, arrow-key navigation, and whether panels are unmounted or just hidden — and apply it to SCR-07's seven tabs and SCR-03's category tabs.` **Blocking — accessibility.**

---

## CMP-19 · Indicator row editor

**Files.** [js/f05-shared.js](../../js/f05-shared.js) · [js/f0511-app.js](../../js/f0511-app.js)
**Purpose.** Add, review and edit monitoring indicators; enter values with evidence.

| Function | File | Purpose |
|---|---|---|
| `buildActivitySectionsHTML(activeEco, activeIntv)` | f05-shared | Activity checkbox sections |
| `wireActivityCheckboxes(onChange)` | f05-shared | Binds change handlers; `onChange` runs after each toggle |
| `findAct(id)` | f05-shared | Look up an activity across all ecosystems |
| `cardHTML(ind)` / `sidebarHTML()` / `reviewHTML()` | f0511-app | Entry card, group sidebar, review step |
| `hasValue(id)` / `groupFilled(g)` / `filledCount()` | f0511-app | Progress accounting |
| `renderEvidence(id)` | f0511-app | Evidence list — **no upload target exists** |

**Known limitations.** `save()` writes to `localStorage` with no try/catch. Evidence has no
storage. Both in UI-STATES.md SCR-09, and both are data-loss risks on the screen most likely to
be used in the field.

---

## CMP-20 · The info modal system — extended

**There is no info modal system. There are five modals that don't agree with each other.**

| # | Implementation | File | Used on |
|---|---|---|---|
| 1 | `nbsBenefitInfo()` — `.bi-overlay` / `.bi-modal` | `js/analysis-shared.js` | SCR-03 Step 5, SCR-07 |
| 2 | `data-layer-info` dataset popup, opened from `gcInfo()` | `js/analysis-shared.js` | SCR-03 Step 2 |
| 3 | `open()` — `.vu-ovl` / `.vu` | `js/version-modal.js` | SCR-01 |
| 4 | `renderModal()` — `.f03-ov` / `.f03-modal` | `js/f0511-app.js` | SCR-09 |
| 5 | `.cust-modal`, `.np-modal`, `.ds-modal`, `.auth-modal`, `.im-modal` | various inline | SCR-01, SCR-04, SCR-06, SCR-14 |

### What each one does

| Capability | 1 · benefit | 2 · layer | 3 · version | 4 · f0511 | 5 · inline |
|---|---|---|---|---|---|
| `role="dialog"` | ✅ | ? | ❌ | ❌ | ❌ |
| `aria-modal="true"` | ✅ | ? | ❌ | ❌ | ❌ |
| `aria-labelledby` | ✅ | ? | ❌ | ❌ | ❌ |
| Escape closes | ✅ | ? | ✅ | ❌ | varies |
| Scrim click closes | ✅ | ? | ✅ | ✅ (`data-ov`) | varies |
| Close button | ✅ `.bi-x` | ? | ✅ `.vu-x` | ✅ `.modal-x` (a text "✕") | varies |
| Body scroll lock | ❌ | ? | ✅ | ❌ | ❌ |
| Focus moved in on open | ✅ (close button) | ? | ✅ (close button, then first input per view) | ❌ | ❌ |
| Focus restored on close | ✅ (`opener.focus()`) | ? | ❌ | ❌ | ❌ |
| **Focus trap** | ❌ | ❌ | ❌ | ❌ | ❌ |
| `prefers-reduced-motion` | ❌ | ❌ | ✅ | ❌ | ❌ |

**No implementation traps focus.** Tabbing past the last control in any modal in this product
walks into the page behind it, which for a screen-reader or keyboard-only user means the modal
effectively doesn't close and the page behind is silently interactive.

### The contract these should converge on

**When to use a modal.** For a short, self-contained explanation the user asked for — a
methodology, a definition, a calculation — where losing their place on the page would cost
them. The benefit and layer "i" popups are the right call.

**When not to.** For anything the user must act on to continue (put it inline — see SCR-04's
error card, which is correctly *not* a modal); for content longer than about two screens; for
errors; for anything a user might want to read side-by-side with the page.

**How content is passed in.**
- Implementation 1 reads from the card markup itself — `[data-def]`, `.formula code`,
  `data-method`, the card's `<h3>`, and the containing `.tabpanel` id for the eyebrow. The card
  stays the single source of truth. **This is the right approach; adopt it.**
- Implementation 2 keys off `data-layer-info="<key>"` into the dataset catalogue in
  `js/analysis-shared.js`.
- Implementations 3–5 have their content hardcoded in the modal.

**Dismissal.** Escape, scrim click, and an explicit close button — all three, always. The close
button must be a real `<button>` with `aria-label="Close"`, not a text `✕`.

**Focus rules.** On open: remember the opener, move focus to the modal's first meaningful
control, lock body scroll. While open: trap Tab within the dialog. On close: restore focus to
the opener, restore scroll. Implementation 1 gets restore right; implementation 3 gets scroll
lock and initial focus right; **combine them.**

`TODO(design): converge all five modals on one implementation with role=dialog, aria-modal, aria-labelledby, Escape + scrim + button dismissal, focus trap, focus restore, scroll lock, and a reduced-motion path. Start from nbsBenefitInfo() (best a11y) and take the scroll lock and reduced-motion handling from version-modal.js.` **Blocking — accessibility.**
`TODO(design): decide one scrim colour and opacity, and add it as component.modal.scrim in tokens.json (TODO-11).`

---

## CMP-21 · Scroll reveal (`.reveal`, `.stage`)

**File.** [css/home.css](../../css/home.css)
**Purpose.** Entrance animation for home-page content as it scrolls into view.

`prefers-reduced-motion: reduce` is handled properly — `.reveal` is forced to
`opacity: 1; transform: none`, animations are reduced to `.001ms`, `scroll-behavior` becomes
`auto`, and the scroll cue and HUD dots stop animating. **The best reduced-motion handling in
the codebase.** `index.html` also reads the query into a `REDUCED` constant for its JS path.

---

## CMP-22 · Version / "What's new" modal

**File.** [js/version-modal.js](../../js/version-modal.js) (307 lines)
**Purpose.** Announces a release on SCR-01, with a newsletter subscribe view.

| Prop | Type | Required | Default | Controls |
|---|---|---|---|---|
| `NBSVU_ONCE` | global | no | truthy | Whether to remember dismissal |
| `RELEASE` | constant | yes | — | Value written to `localStorage` key `nbs-vu-seen` |
| `data-vu-view` | attribute | — | `'news'` | Switches between news / subscribe / confirmation |
| `data-vu-close` | attribute | — | — | Marks any element as a close trigger |

**Interactive states.** Entering (`.in` added on the next frame) · open · closing (removed after
260ms). Injects its own `<style>` on open and removes it on close.

**Accessibility contract.** Scroll lock ✅, Escape ✅, initial focus ✅, per-view focus into the
first email input ✅, reduced-motion ✅. **No `role="dialog"`, no `aria-modal`, no focus trap, no
focus restore.**

**Known limitations.** If `localStorage` is unavailable the `try/catch` swallows the failure and
the modal reappears on every visit. Self-injected CSS bypasses the token layer.

---

## CMP-23 · Desktop notice (`.desktop-notice`)

**File.** [js/nav-mobile.js](../../js/nav-mobile.js) — `initNotices()`
**Purpose.** "Best viewed on desktop" banner on data-dense screens.

`role="note"`, a labelled dismiss button (`.dn-x`, `aria-label="Dismiss"`), dismissal by adding
`.dismissed`. **Dismissal is per-page — it reappears on every navigation.** Tracked in
UI-STATES.md.

---

## CMP-24 · Breadcrumb (`.crumbbar`)

**Purpose.** Trail back up the project hierarchy. Present on SCR-05, SCR-06, SCR-07, SCR-08,
SCR-10.

The current page is a `<span>`, not a link — correct. But the bar is a bare `<nav>` with **no
`aria-label`**, so it announces only as "navigation", indistinguishable from the site nav and
footer nav on the same page.
`TODO(design): add aria-label="Breadcrumb" and mark the current page with aria-current="page".`

---

## CMP-25 · OTP input

**File.** [js/f08-app.js](../../js/f08-app.js)
**Purpose.** Six-box email verification code entry.

| Behaviour | Function |
|---|---|
| Auto-advance and backspace | inline handlers |
| Paste a full code | inline paste handler |
| Read the value | `otpValue()` |
| Resend countdown | `startResendCountdown()` |
| Open / confirm | `openVerify()`, `markVerified()` |

**The most complete interaction in the codebase.** Use it as the model for any future
multi-input control.

**Known limitations.** No `aria-live` announcement of the countdown or of verification success;
no `inputmode="numeric"` / `autocomplete="one-time-code"` documented.
`TODO(design): confirm the OTP boxes carry inputmode="numeric" and autocomplete="one-time-code" so mobile keyboards and SMS autofill work.`

---

## CMP-26 · Cascading select

**File.** [js/f08-app.js](../../js/f08-app.js)
**Purpose.** Country → province/state → city, from a live API.

| Function | Purpose |
|---|---|
| `loadCountries()` | `GET /countries/iso` |
| `loadProvinces(country, preProv, preCity)` | `POST /countries/states` |
| `loadCities(country, province, preCity)` | `POST /countries/state/cities` |
| `provincesFallback()` / `cityStaticFallback()` | Static lists when the API fails |
| `fillSelect(sel, items, placeholder, selected)` | Populate |
| `resetCity(msg)` | Clear downstream with an explanatory note |
| `applyCities(cities, province, country, preCity, note)` | Apply with an optional note |

**States.** Rest · loading (`.select-box.loading` — chevron becomes a spinner) · loaded ·
fallback · empty-with-note. **The only component in the product with a real network-failure
path.**

**Known limitations.** The fallback is silent — a user cannot tell they're seeing a reduced
list. Selects have no `aria-busy` during load.

---

## CMP-27 · Sankey diagram

**File.** [NbS_Activities_Flow_v2.html](../../NbS_Activities_Flow_v2.html)
**Purpose.** Ecosystem → intervention → activity → benefit → indicator flow.

Loads D3 and d3-sankey from a CDN and guards their absence
(`typeof d3 === 'undefined' || !d3.sankey` → writes into `#err`) — the only dependency-failure
guard in the codebase. Reads `prefers-reduced-motion` into a `reduce` constant.

**Known limitations.** No text equivalent for the diagram. No minimum legible size or mobile
alternative. Third-party CDN with no SRI hash.
`TODO(design): the activity taxonomy is only expressible as a Sankey today. Is there a table view for people who can't use the diagram?`

## CMP-28 · Documentation reader

**Files.** [js/technical-docs.js](../../js/technical-docs.js) ·
[css/technical-docs.css](../../css/technical-docs.css) ·
mounted by [technical-docs.html](../../technical-docs.html) (SCR-17)

**Purpose.** Render a methodology article set from data: grouped sidebar, keyword search,
article body, on-this-page TOC, and previous/next paging — all driven by one
`TECH_DOCS.articles` array.

**Parts.**

| Part | Element | Notes |
|---|---|---|
| Nav button | `.nav-doc-button` | `data-page="docs"`, `aria-label="Technical documentation"`. Lives in `.sitenav-actions`. |
| Sidebar | `.docs-sidebar` → `.docs-article-nav` | Sticky. `.docs-nav-group` headers inserted when `article.group` changes. |
| Search | `.docs-search` → `#docs-search` | Filters on `label + keywords + group`; matches are wrapped in `<mark>`. |
| Article | `#docs-article` | `tabindex="-1"`, `aria-live="polite"`. Focused on every article change. |
| TOC | `.docs-toc` → `#docs-toc` | Built from `.doc-section > h2`. Active link tracked by IntersectionObserver. |
| Pager | `.docs-article-footer` | Previous/next from the `articles` array order. |

**Content primitives.** `docSection`, `docHero`, `docCallout` (tones `''` / `warn` / `note`),
`docEquation`, `docTable`, `docFlow`, `docExample`, `docDetails`, plus `.doc-todo` for a value
that could not be read. These are the whole content DSL — articles are template strings, not
markup.

**States.** No loading or error state: all data is synchronous and already in the page. Has a
*missing parameter* state (`.doc-todo`) and an *empty search* state (`.docs-nav-empty`).

**Accessibility contract.** Article change moves focus to `#docs-article`. The active nav item
carries `aria-current="page"` (not a class alone). TOC links move focus to the target section
as well as scrolling. Every SVG here is decorative and unlabelled, so `hardenSvgs()` hides it;
`openTechnicalDoc()` re-runs `hardenSvgs()` after injecting new markup.

**Known limitations.** The nav button currently exists only on SCR-17's own page — it is not in
CMP-01 yet, so there is no way to reach the docs from any other screen except by URL.
`TODO(design): add the docs entry point to CMP-01 (nav actions) and to the footer meta links.`
`TODO(design): search matches whole strings only — no fuzzy matching, no per-section results, no keyboard shortcut to focus the field.`

---

---

## CMP-29 · Screenshot figure

**Files.** [css/walkthrough.css](../../css/walkthrough.css) ·
used by [walkthrough.html](../../walkthrough.html) (SCR-18)

**Purpose.** Show one screen of the product inside a document, with a caption that says what to
look at. The only component in the codebase whose content is an image of the codebase.

**Parts.**

| Part | Element | Notes |
|---|---|---|
| Figure | `figure.wt-shot` | Block-level, own vertical rhythm. |
| Image | `.wt-shot img` | `loading="lazy"`, `width` + `height` **required**. Bordered, `--radius-lg`, `--elevation-2`. Never given a CSS height — the intrinsic ratio is what keeps a UI screenshot legible. |
| Caption | `.wt-shot figcaption` | Left rule in `--stroke-primary`. Opens with a `<b>` naming the screen, then one sentence on what it shows. |
| Pair | `.wt-shot-pair` | Two figures side by side above 900px, stacked below. For two variants of one screen. |

**Props, by convention rather than code** (there is no component system — see DEC-03):

| Prop | Where | Required | Notes |
|---|---|---|---|
| `src` | `img` | Yes | `assets/walkthrough/NN-name.webp`. Numbered in reading order. |
| `alt` | `img` | Yes | Describes the **controls visible in the screenshot**, not the caption. This is the whole accessible content of the figure. |
| `width` / `height` | `img` | Yes | The intrinsic pixel size. Without them, a page of lazy images produces cumulative layout shift. |
| caption `<b>` | `figcaption` | Yes | The screen or state being shown. |

**Capture convention.** 1440×884 CSS px on a 2× display, so files are 2880px wide; WebP at
quality 80, roughly 100–260 KB each. Transient overlays that are not the subject (the version
modal, the desktop notice) are dismissed before capture.

**States.** None — it is static content. A failed image shows the browser's own broken-image
box in the reserved area, with the alt text and caption still readable. See UI-STATES SCR-18.

**Accessibility contract.** `alt` is mandatory and must be a description, never a filename, a
caption restatement, or empty. A screenshot is never decorative here: it *is* the explanation,
so a reader who cannot see it must get the same information from the alt text and the
surrounding prose. The figure needs no `role` — `<figure>` with `<figcaption>` already
associates the two.

**Known limitations.** Nothing detects that a screenshot has gone stale.
`TODO(design): a screenshot cannot be diffed against the screen it depicts. Define when they are regenerated, and record it in SCREENS.md SCR-18.`
`TODO(design): the screenshots are captured at one viewport only. There is no mobile capture of any screen, so the walkthrough documents the desktop layout exclusively.`

---

---

## Component-wide gaps

- `TODO(design): no component defines a loading state except CMP-26. Once a backend exists, every data-driven component needs one.` **Blocking.**
- `TODO(design): no component defines a focus trap, and five modals need one.` **Blocking.**
- `TODO(design): interactive states are inconsistently specified. Only focus-visible is systematic (from the a11y baseline in css/tokens.css); hover, active and disabled are defined per component with no shared rule.`
- `TODO(design): the "i" affordance (gcInfo) is focusable but not operable by keyboard. It is the primary way users reach methodology and source information.` **Blocking.**

---

## CMP-30 · Odometer counter (`.odo`)

**Files.** [css/home.css](../../css/home.css) · built by the inline script in
[index.html](../../index.html) (SCR-01 only)

**Purpose.** Roll a figure up into place as it scrolls into view. Ported from the staging
front-end (DEC-28) in place of the older `data-count` tween, which SCR-01 no longer uses.

**Parts.** A `.odo` span holds one `.odo-win` per digit — a 1.1em-tall clipping window over an
`.odo-col` strip of twenty `<b>` digits (two 0–9 cycles). Punctuation (`,` `.`) renders as a
plain `aria-hidden` span between windows. JS sets each column's final `translateY` on reveal;
`--odo-delay` staggers the columns 0.08s apart, left to right.

| Prop | Where | Required | Notes |
|---|---|---|---|
| `data-odo` | `.odo` | Yes | The figure **as it should read**, punctuation included: `"524,054.82"`. Also becomes the `aria-label`. |

**States.** *Pre-roll* — every column shows `0`, so the number reads as zeros until observed.
*Rolled* — the final value. There is no error or empty state; a missing `data-odo` renders
nothing.

**Accessibility contract.** The digit strips are `aria-hidden`; the whole value reaches a
screen reader once, from the `aria-label` set at build time — so it is announced correctly
before the animation runs, not digit by digit. Under `prefers-reduced-motion: reduce` the
transition is removed and the final offset is applied immediately.

---

## CMP-31 · Feature tab set (`.ftabs` / `.fpanel`)

**Files.** [css/home.css](../../css/home.css) · inline script in
[index.html](../../index.html) (SCR-01 only)

**Purpose.** Group the six lifecycle feature cards under three headings. Ported from staging
(DEC-28).

**Parts.** `.ftabs[role="tablist"]` of three `button[role="tab"]`, each `aria-controls` its
`.fpanel[role="tabpanel"]` of two `.fcard`s. A card is a 280px photo (`.fc-shot`, gradient
scrim, corner "See tutorial" link) beside a `.fc-body` of icon chip, title and description.

**States.** Selected tab carries `.is-on` + `aria-selected="true"` + `tabIndex 0`; the rest are
`aria-selected="false"` + `tabIndex -1`. Unselected panels are `hidden`.

**Accessibility contract.** Roving tabindex: only the selected tab is in the tab order, and
<kbd>←</kbd>/<kbd>→</kbd> move between tabs, wrapping, moving focus with selection. Panels are
hidden with the `hidden` attribute, not `display:none` in a class, so they leave the
accessibility tree. The tablist carries `aria-label="NbS Tool features"`.

---

## CMP-32 · Project flip card + marquee (`.pflip` / `.pmarquee`)

**Files.** [css/home.css](../../css/home.css) · inline script in
[index.html](../../index.html) (SCR-01 only)

**Purpose.** Tease the unbuilt project portfolio (SCR-08) with a looping strip of field-project
cards that turn over to show a summary. Ported from staging (DEC-28), replacing the static
three-card grid that had been `hidden` in the markup.

**Parts.** `.pmarquee` scrolls `.pmarquee-track`, which holds the card set twice — the second
copy is a visual clone only. `.pflip` is a 420×340 `perspective` box over `.pflip-in`, which
rotates 180° between `.pf-front` (photo, name, location) and `.pf-back` (name, location, the
field note, external-link corner).

**Sizing.** The card is sized to its longest back, not to a design grid: 420×340 holds the
Lematang note at 336px with 12.5px/1.5 copy. Staging's 352×233 was cut around lorem ipsum and
clips every real note. `.pf-copy` keeps `overflow-y: auto` as a safety net for narrow
viewports, but nothing scrolls at the sizes shipped. **If a note is rewritten longer, re-measure
and raise the height — do not let it scroll.**

**States.** *Resting* — front face, marquee sliding. *Flipped* — `.is-flipped` +
`aria-pressed="true"`. *Paused* — `:hover` or `:focus-within` on `.pmarquee` stops the
animation.

**Accessibility contract.** Each real card is `role="button"`, `tabindex="0"`, labelled
"<name>, <location>. Show details." and toggles on click, <kbd>Enter</kbd> and
<kbd>Space</kbd>, with `aria-pressed` tracking the face. **The cloned set is `aria-hidden` and
`tabindex="-1"`, with empty `alt` on its images** — without that, every project is announced
and tabbed through twice. Focus inside the strip pauses the animation, so a keyboard user is
not reading a moving target. The transition is removed under `prefers-reduced-motion: reduce`,
along with the marquee itself.

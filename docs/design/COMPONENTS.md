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
| `.sitenav-link.active` | class (set by JS) | no | — | Marks the current section. The Methodology link (`help.html#science-scope`, DEC-97) is not driven by `data-nav-page`: `js/docs-shell.js` marks it while the docs show the Methodology tree |
| `#profileWrap` / `#profileBtn` | id | for signed-in screens | — | Presence enables the profile dropdown |
| `.sitenav-login` / `.sitenav-signup` | class | no | — | Logged-out variant (SCR-01, SCR-02); rendered as `<a href="login.html" data-auth>` so SCR-01's auth modal can intercept it and every other screen just follows the link |
| `.sitenav-help` | class (rendered by JS) | no | always shown | "?" icon link (Material `question_mark`, DEC-80) to `help.html`, last item on the right; tooltip `.sitenav-help-tip` on hover / focus-visible, shown as a visible label in the mobile drawer; `aria-current="page"` on SCR-19 (DEC-39) |
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

**Files.** [css/footer.css](../../css/footer.css) · [js/footer.js](../../js/footer.js) (markup)
**Purpose.** Brand close, two link columns, the five-step workflow strip, socials.

**One source of markup (DEC-33).** A screen ships only a placeholder; `js/footer.js` renders
it and marks the link to the current page with `aria-current="page"`:

```html
<footer class="footer" data-screen-label="Footer"></footer>
<script src="js/footer.js"></script>
```

A footer that already has children is left alone.

No props, no variants, no states beyond link hover/focus.

**Structure.**
- `.footer-head` — a grid. Left: `.footer-brand`, holding the `.footer-lockup` (NbS Tool
  `assets/nbs-logo-light.png` · 1px `.footer-lockup-rule` · SCeNe `assets/scene-logo-light.png`)
  and the one-sentence positioning line. Right: `.footer-cols`, a
  `<nav aria-label="Footer links">` of two `.footer-col` blocks — **Supporting Materials**
  (Activity Matrix, Methodology, Help Centre) and **Other Page** (Sitemap, About SCeNe
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
| `gcDisc` | `(text)` | The disclaimer written for that card's dataset (GUI 3.1). Replaces the general `gcAlert` on the five General cards. Styled as `.gc-alert`: warm tint, 16px inline icon, no border, stripe or "Disclaimer:" prefix (DEC-60) |
| `gcBars` | `(rows)` | Class bars for elevation and slope; `rows` is `[label, hectares, colour]`. The share is worked out from the hectares, and a class with 0 ha draws an empty track |
| `gcDonut` | `(items, totalLabel, ariaLead, half)` | Total, donut and legend for `[label, hectares, colour]` rows. With `half = true` the segments are drawn on the Fire risk half doughnut (`gcGauge`'s look, shared arc `GC_ARC`) with `totalLabel` as the chart title above it and only the total (number and ha) in its centre, replacing the full ring (Land degradation). The donut is an SVG with one path per segment, `role="img"` with the shares in its `aria-label`; the legend repeats them as text. **Interaction:** pointing at a segment dims it and names only that segment in the People Context tooltip ("Degraded: 24,000 ha (16%)"), the same `data-tip` + `.pcx-tip` behaviour as the People Context charts (`js/people-context.js` wires every `.gc`). Mouse only; the legend carries the same figures for keyboard and screen-reader users. **Layout:** next to a long text column, put `gc-terr--mid` on the `.gc-terr` grid so the chart sits on the text's centre line; inside it the chart stacks above a full-width legend, both left-aligned (Land degradation does this). Elsewhere the donut stays 96px beside its legend. Used by Reference ecosystem (`gcEcoChart()`, drawn from `NBS_DATA`) and Land degradation |
| `nbsRingSeg` | `(cx, cy, R, r, a0, a1, o)` | The shape of one doughnut segment, used by every ring chart: `gcDonut` (full and half), `gcGauge`, the Carbon Pool ring (`clPoolDonut`) and the People Context donut (`svgDonut`, via `window.nbsRingSeg`). A filled ring slice whose four corners are rounded to `--radius-sm`, with a `--space-4` gap between slices; both are read from `tokens.css` in screen pixels and `o.k` converts them to viewBox units. The outer ends of a half doughnut stay flush (`o.gapStart` / `o.gapEnd = false`). A slice too thin for full corners gets smaller ones; a 0% slice is not drawn (DEC-79) |
| `gcTip` | `(label, ha, pct)` | The `data-tip` attribute for one chart segment: "Label: 12,345 ha (16%)". Shared by `gcDonut` and `gcGauge` |
| `gcGauge` | `(part, total, caption, partLabel, restLabel)` | Half-doughnut of a part against a whole, 0 to 100%. Two colours only: the whole is a grey ring (`--neutral-800`), the part is orange (`--warning-500`). It shows a share, not a level: no bands, thresholds or level labels (DEC-61). **Interaction:** pointing at an arc dims it and names it in the People Context tooltip (`gcTip`): the orange arc reads `partLabel` with its hectares and share, and the grey arc (the rest of the whole) reads `restLabel` with the remaining hectares and share. Fire risk passes "Overlaps mapped fire-risk areas" and "Outside mapped fire-risk areas" (DEC-79). Mouse only. **Accessibility:** the wrapper is `role="img"` and its `aria-label` says both figures; the caption under the gauge repeats them as text. Used by Fire risk |
| `gcLevel` | `(label, value, tone)` | A labelled level badge; `tone` is `bad`, `warn` or `ok`. The word carries the meaning, the colour only repeats it |
| `.gc-sub--ic` | markup: `<h5 class="gc-sub gc-sub--ic"><span class="gc-sub__ic"><svg …/></span>Title</h5>` | Sub-title with a 36px tinted icon tile in front (`--warning-25` tile, `--warning-700` stroke icon, `--radius-lg`), the look of the earlier Threat profile "t3-mini" cards. The icon is decorative (`hardenSvgs()` hides it); the heading text is the name. Used by Drainage canal pressure (Canal proximity, Drainage pressure) |
| `ncSpecies` | `(icon, name, dot, list)` | Species row; `list` is `[common, latin, records, year of latest record]`. A missing year reads "Date not recorded". Names only: no photo is licensed yet |
| `clChart` | `(bars, plot, labels, yTicks, yTitle, cls, fmt)` | Climate chart. Each bar carries a `data-tip` read off the y axis, formatted by `fmt`; bars are `--bar-w` (14px) wide and dim on hover |

**Result states.** `nbsCardState(card, state)` swaps one card's result for a GUI 3.1 message:
`unavailable`, `nodata` or `failed`. Any other value restores the result. The card head, its
"i" and the source line stay; the other cards are not touched. Only cards with a `data-gc` key
take part — today the five GUI 3.1 General cards, the six Nature cards, the three Climate cards
and the seven result cards in the Threat profile accordion (CMP-08). Two more states,
`noforest` (Forest Landscape Integrity Index) and `nokba` (Key Biodiversity Area), are valid
results that happen to be nothing, so they render as a plain sentence, not as a "missing" box. `failed` is `role="alert"` and carries a real
`<button>` ("Try again"); the other two are `role="status"` and use the neutral tone, because
missing coverage is not an error (UI-STATES convention 1). Preview with
`?gcstate=terrain:failed,soil:nodata`. See UI-STATES.md, SCR-03 step 2.

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

## CMP-08 · Threat profile accordion (`.t3-acc`)

**File.** [js/analysis-shared.js](../../js/analysis-shared.js) — the `threat` mount
(`<div data-nbs="threat">`), styles in [css/analysis-shared.css](../../css/analysis-shared.css)
**Purpose.** Step 3. Three groups of result cards, as GUI 3.1 lists them (DEC-49). There is no
script: `nbsInitThreat()` was removed with the ecosystem views it switched.

| Part | Markup | Notes |
|---|---|---|
| Group | `<details class="t3-acc t3-acc--observed \| --pressure \| --bau" data-t3grp="…">` | `open` on the first group only. Groups open and close independently |
| Head | `<summary class="t3-acc__head">` | Icon chip (`.t3-acc__ic`, a `GC_ICONS` glyph), an `<h3>` title, a one-line description, a chevron. **Sticky:** the head of an open group stays at the top of the scrolling area while its cards scroll under it, and leaves with the group. The offset is `--t3-sticky-top`: the top of the drawer on SCR-03 (the default), just under the site navigation on SCR-07 |
| Body | `<div class="gc">` | The group's `.gc-card` cards (CMP-06): `gcDisc`, `gcSource`, result states |

**Icon colour.** Each group sets one pair, `--t3-ic-bg` and `--t3-ic-fg` (green for Observed,
amber for Pressure and Hazard, blue for Business as Usual). The group's own icon, and the icon
chip, title and "i" button of every card inside it, use that pair. That includes the two fire cards, which
are red everywhere else. The Observed icon (`GC_ICONS.observe`, an eye in front of a magnifying glass) was drawn
for this project; the other glyphs are Material icons.

**States.** Closed (head only) · open (head, a rule, then the cards) · open and scrolled (head
pinned, cards passing under it) · hover on the head ·
keyboard focus on the head (the shared `summary:focus-visible` ring). A card inside takes the
CMP-06 result states; previewing one with `?gcstate=` opens its group.

**Accessibility contract.** Native `<details>/<summary>`: focusable, toggles on Enter and
Space, and announces expanded or collapsed without ARIA. The title is a real `<h3>` inside the
summary, so the groups appear in the heading outline. The icon and chevron are `aria-hidden`.
The chip colour differs per group but the title carries the meaning. The chevron's turn is the
only motion and is switched off under `prefers-reduced-motion`.

**Known limitations.** The "See more" link on a source line does nothing on a card with no
dataset catalogue row (Land degradation, Drainage canal pressure, Fire risk). `.t3-acc` must not
get `overflow: hidden`: it would stop the head from sticking, which is why the head and the
body round their own corners. SCR-07 drives the
groups from its own side menu (`an2Go('threat-observed' | 'threat-pressure' | 'threat-bau')`),
which opens the chosen group and closes the other two; on SCR-03 nothing closes a group but the
user.

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

**Key-features sync.** On SCR-01 the `.stage` picture and its `.chapter` text share one
`is-active` index: the chapter crossing the vertical middle of the pinned `.stage-col` (DEC-96).

---

## CMP-22 · Version / "What's new" modal

**File.** [js/version-modal.js](../../js/version-modal.js) (210 lines)
**Purpose.** Introduces v3.0 on SCR-01 as a live release ("Welcome to NbS Tool v3.0") and asks
the visitor to create an account. One view: what's new, then a sign-up CTA in the footer. The
pre-launch subscribe and confirmation views were removed once v3.0 shipped (December 2026).

| Prop | Type | Required | Default | Controls |
|---|---|---|---|---|
| `NBSVU_ONCE` | global | no | `false` | Whether to remember dismissal |
| `RELEASE` | constant | yes | — | Value written to `localStorage` key `nbs-vu-seen` |
| `data-vu-signup` | attribute | — | — | Closes the modal and clicks the page's `[data-auth="signup"]` (CMP auth modal, Sign up tab). With no auth modal on the page, the link follows `login.html#signup` |
| `data-vu-close` | attribute | — | — | Marks any element as a close trigger |

**Interactive states.** Entering (`.in` added on the next frame) · open · closing (removed after
260ms). Injects its own `<style>` on open and removes it on close.

**Accessibility contract.** Scroll lock ✅, Escape ✅, initial focus ✅, reduced-motion ✅, `role="dialog"` +
`aria-modal` ✅. **No focus trap, no focus restore.**

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

## CMP-31 · Feature tab set (`.ftabs` / `.fpanel`) — retired

**Retired 2026-11-06 (DEC-35).** Removed from SCR-01; its content now lives in the journey
chapters. Kept for history; the ID is not reused.

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

## CMP-32 · Field-stories gallery + site modal (`.pgal` / `.pg-modal`)

**Files.** [css/home.css](../../css/home.css) · inline script in
[index.html](../../index.html) (SCR-01 only)

**Purpose.** Tease the unbuilt project portfolio (SCR-08): five field sites laid around the
section heading, each opening its photos and field note. Replaced the auto-scrolling flip-card
marquee (DEC-98).

**Parts.** `.pgal` is a full-viewport (`min-height: 100svh`) 3×3 grid. `.pg-centre` (the
heading and intro) holds the middle cell; the five `.pg-tile` buttons sit in the outer cells,
each a different size and aspect, so the layout reads as scattered but tiles can never cover
the copy. A tile is `.pg-photo` (one photo), `.pg-name` (display type, one word per line,
overlapping the photo's lower edge) and `.pg-loc` (location, running down the photo's side).
Behind everything, `.pgal::before` draws a faint map of the 11 ASEAN member states
(`assets/home/sea-map.svg` as a CSS mask filled with `--ink-650`, full width at its own aspect ratio and centred on the gallery, so it is
never clipped top or bottom; on wide screens it runs up into the dark band above and behind the
testimony, whose content is lifted above it with `z-index: 1`; decorative, no
alt). Each tile holds a `<template>` with every site photo and the field note. One shared
`<dialog class="pg-modal">` shows them: main photo, thumbnail row, then name, location and
story.

**States.** *Resting* — each tile shows one of its photos, picked at random on page load.
*Hover / focus* — the photo pushes in to 1.04 and the name turns spring green. *Modal open* —
the first photo is shown; a thumbnail switches the main photo and gets `aria-pressed="true"`.
Page scroll is locked while the modal is open.

**Responsive.** At 900px and below the grid becomes two columns: heading first, then the tiles
with the name tucked over the photo's lower edge and the location underneath. At 760px and
below the modal stacks photo over text and scrolls as one.

**Accessibility contract.** Tiles are real `<button>`s with `aria-haspopup="dialog"`, named by
their visible name and location; the tile photo has empty `alt` (the name says it). The modal
is a native `<dialog>` opened with `showModal()`: focus moves in, Tab stays inside, Esc closes
and focus returns to the tile. It is labelled by its heading. Thumbnails are buttons labelled
"Photo n of m: <alt>", and the main photo carries the real `alt`. The close button and a click
on the backdrop also close it. Under `prefers-reduced-motion` the push-in is removed.

## CMP-33 · Help entry card + numbered steps (`.hc-card` / `.hc-steps`)

**Files.** [css/help.css](../../css/help.css) · [help.html](../../help.html) (SCR-19 only)

**Purpose.** Give a help centre the two shapes documentation does not have: a card that is a
door into a group of articles, and a step list whose marker is a number because the order
matters.

**Parts.** `.hc-cards` is a grid of three `.hc-card` anchors — a kicker `<span>`, a
`<strong>` title and a `<small>` line — one column below 700px, three above. `.hc-steps` is an
`<ol>` with `list-style: none` whose items draw a CSS-counter number in a filled circle
(`::before`) and emphasise the action in a leading `<b>`. `.hc-contact` is the same card
treatment, non-interactive, for the two support boxes.

**States.** *Resting*, and *hover / focus-visible* on a card: primary border and tint. The
steps have no state.

**Accessibility contract.** A card is a plain `<a>` with real text, so it is announced as a
link with its title; the kicker is part of the accessible name, which is intended ("New here?
Start with what the tool is"). The step number is painted by `::before` and is decorative:
the `<ol>` supplies the real numbering to assistive technology, so do not swap it for a `<ul>`.
Focus rings come from the global `:focus-visible` baseline in `css/tokens.css`.

**Addendum (DEC-30).** `.hc-steps-zero` resets the counter to −1 so a list of phases is
numbered from 0. Guides close with `.hc-shots`, a `.doc-details` holding the screenshots
(CMP-29 figures), and a `.doc-callout.hc-xref` linking into SCR-17.

## CMP-34 · Help | Methodology switch (`.docs-switch`) — **retired (DEC-34)**

> Removed 2026-10-19. The Help Centre tree (CMP-35) shows both halves of the documentation
> in one sidebar, so there is nothing to switch between. `.docs-switch` is gone from
> `css/technical-docs.css`. The entry below is history.

**Files.** [css/technical-docs.css](../../css/technical-docs.css) · [help.html](../../help.html) ·
[technical-docs.html](../../technical-docs.html)

**Purpose.** Make the other half of the documentation one click away from anywhere in either
half, so a reader never has to know which page holds an answer before looking.

**Parts.** A `<nav aria-label="Documentation">` holding two `<a>` elements, *Help* and
*Methodology*, laid out as a two-column segmented control directly under the sidebar head.

**States.** *Current* — `aria-current="page"`, filled primary. *Other* — muted text; *hover*
lifts to the base background. Stays visible below 820px, where the sidebar head is hidden.

**Accessibility contract.** Real links to real pages, not tabs: each half is its own page, so
`role="tab"` would be wrong. The current half is announced through `aria-current`. Focus rings
come from the global `:focus-visible` baseline in `css/tokens.css`.

**Addendum (DEC-31).** The entry cards (`.hc-card`) and the closed screenshot panels
(`.hc-shots`) are removed: Help no longer has a hero, and screenshots now show inline. The
numbered steps, `.hc-steps-zero` and `.hc-contact` remain, alongside `.hc-where` / `.hc-route`,
`.hc-points` and `.hc-shot` / `.hc-shot-pair`, moved from the deleted `css/walkthrough.css`.

**Addendum (DEC-34).** The entry cards are back, as the Help Centre's main navigation device.
`.hc-cards` is a grid (`.hc-cards-3` for three across) of `.hc-card` anchors: an optional `<em>`
kicker ("Phase 6"), a `<strong>` title, a `<span>` line and an inline arrow `<svg>`. They are the
landing page, every *Where to go next*, and the four science entry pages. `.hc-card.hc-card-soon`
is the same card as a `<div>`, dashed, with a `.hc-soon` pill, for an external document that has
no address yet: not a link, and says so. `.hc-steps-zero` is gone (the chart, CMP-36, numbers the
phases now).

## CMP-35 · Documentation shell (`js/docs-shell.js` + `js/docs-index.js`)

**Files.** [js/docs-shell.js](../../js/docs-shell.js) · [js/docs-index.js](../../js/docs-index.js) ·
used by [help.html](../../help.html) and [technical-docs.html](../../technical-docs.html)

**Purpose.** One engine for every documentation page, so Help and Methodology look, navigate
and search the same way, and a third page would cost one index entry and one `mount` call.

**Parts.**
- `DOCS_INDEX` — per page: `title`, `url`, `hashPrefix`, `defaultId`, optional `moved` map, and
  `articles` (`id`, `group`, `label`, `keywords`). Labels are user-facing: no internal codes.
- `DocsShell.mount({ page, render? })` — wires the search box, the hash router and `?q=`, then
  opens the hashed article. Without `render`, articles are the page's own `data-doc` elements.
- `DocsShell.open(id, sectionId?)`, `DocsShell.scrollToSection(id)`, `DocsShell.scrollBehavior()`.
- Renders: the grouped sidebar as links (`a.docs-nav-button`), *Also in <page>* search hits
  (`.docs-nav-elsewhere`), the "On this page" list from `.doc-section > h2` with an
  IntersectionObserver highlight, and the pager (`.docs-article-footer a`).
- The mode switch (`nav#docs-modes`, inserted before `.docs-sidebar-head`): two links,
  Help Centre and Methodology, the current one `aria-current="page"`. The open article sets the
  mode; the tree and the pager show only that mode, search shows both (DEC-92).

**Required markup.** `#docs-search`, `#docs-article-nav`, `#docs-article`, optional `#docs-toc`.

**States.** Default; searching (this page first, then other pages); no match; arrived with
`?q=`; unknown hash (first article); moved hash (forwards). See UI-STATES SCR-17 and SCR-19.

**Accessibility contract.** Sidebar items and pager are real links. The current article carries
`aria-current="page"`. Opening an article moves focus to `#docs-article` (`tabindex="-1"`) without
scrolling twice; TOC links move focus to their section. Scrolling honours
`prefers-reduced-motion`. The document title names the open article.

**Addendum (DEC-34).** The sidebar is one tree for both pages. Rows may carry `parent`: an
article nested under a help entry page, shown indented (`.docs-nav-children`) only while the
parent or one of its children is open; the parent link carries `.docs-nav-parent` and a chevron.
Searching lists every matching article on both pages flat, under its section heading, with
cross-page links carrying `?q=`; *Also in <page>* is gone. On the authored page a hash that names
a section inside an article opens that article scrolled to it (`state.owner`), and the section
hash stays in the address. The document title omits the label when it equals the page title.

**Section addresses (DEC-81).** On the authored page a section is addressed by its own id
(`help.html#phase-4b`). On the generated page a section cannot be found before its article is
rendered, so its address names both: `technical-docs.html#docs/<article>/<section>`
(`#docs/phase2/phase2-nature`). `open()` writes that form into the address bar, so a copied link
survives a reload.

## CMP-36 · Eight-phase chart (`.hc-phases`)

**Files.** [css/help.css](../../css/help.css) · [help.html](../../help.html) (SCR-19, *The eight phases*)

**Purpose.** Show the whole workflow on one chart, in the manual's order, and make every phase a
door to its guide.

**Parts.** An `<ol class="hc-phases">` of two `.hc-lane` items: *Run an analysis* (phases 0 to 7, each chip a link to that phase's page) and *Manage your project* (DEC-82; four lanes before).
Each lane is a `.hc-lane-head` (an `<em>` range such as "Phases 0 to 5", the page link, a
`<small>` line) beside an `<ol class="hc-flow">` of `.hc-phase` links flowing left to right with
an arrow between them: a numbered circle `<b>` and the phase name. `.is-optional` greys the
circle (Phase 0); `.is-after` colours it success and shows a tick (after the analysis).
`.hc-flow-note` is a full-width footnote inside a flow.

**States.** *Resting*, and *hover / focus-visible* on a phase or page link: primary border and
tint. Below 900px the lane head stacks above the flow; the flow wraps.

**Accessibility contract.** Two nested ordered lists, so the lane order and the phase order are
announced. The circle's number is text, not a pseudo-element; the tick is `aria-hidden` and the
link text carries the meaning. Arrows are `::before` content and decorative. Focus rings come
from the global `:focus-visible` baseline.

## CMP-37 · Demo video (`.hc-video`)

**Files.** [css/help.css](../../css/help.css) · [help.html](../../help.html) (SCR-19, *Demo of the NbS Tool*; script inline)

**Purpose.** Show the tool moving before the reader reads about it, without forcing a 49-second
video on anyone.

**Parts.** A `.hc-shot.hc-demo` figure holding `.hc-video` (a `<video>` of the 12-second loop:
`muted loop playsinline autoplay`, with the poster, and `data-full` naming the full file) and a
`.hc-video-play` button ("Watch the full demo · 49 s"), then the figure caption.

**States.** *Cover* — the loop plays silently, button over it. *Full* (`.is-full`) — the button
is hidden; the video's source is the full file, with native controls, not looping. *Reduced
motion* — the loop does not autoplay; the poster shows with the button. *Remounted* — the shell
re-inserts the article on every visit; a `MutationObserver` restarts the loop.

**Accessibility contract.** The loop is `muted` and labelled; the swap is a real `<button>`, so
it has a keyboard path; the full video uses native controls. Neither file has an audio track, so
there are no captions to provide. If the browser refuses autoplay the poster stands in and the
button still works.

---

## CMP-38 · Data flow (`.mrv-flow` / `.mf-node` / `.mf-detail`)

**Files.** [css/home.css](../../css/home.css) · inline script in
[index.html](../../index.html) (SCR-01 only)

**Purpose.** Show how the ASEAN MRV Framework turns global standards and national systems into
one indicator set, and how three data tiers (regional, national, field) become a dataset for one
site. Redrawn as HTML from the framework's own diagram (DEC-36).

**Parts.** One markup, two layouts. The boxes sit in five `.mf-stage` wrappers (each with a
`.mf-step` number and label). **Above 900px** the wrappers are `display: contents`, the step labels
hide, and every box is placed in one five-column diagram: four global standards beside the
country-standards box (eleven flags); definition, pathway and joint reporting; the indicator set
with country indicators feeding it from the right; three data tiers on a bus; the site dataset.
Arrows are `::before`/`::after` on `.has-down` nodes. **900px and below** the same markup is a
numbered stepper with no arrows. Beside the diagram, a sticky `.mf-detail` card (200px of content)
holds the picked node's title and text and one button, "How this works", which links to that
node's `technical-docs.html#docs/…` section (the methodology home until a node is picked).

**States.** Idle (all nodes at full strength, the card on its "Start anywhere" text).
**Previewed**, on hover or keyboard focus: `.has-focus` on the flow; the node's ancestors and
descendants get `.is-lit`, everything else drops to 0.28 opacity, and the card shows that node; on
the stepper, each stage holding a lit node fills its number. The preview ends, back to idle, when
the pointer or focus leaves the diagram. **Locked**, on click (DEC-97): the node also gets `.is-on`
(spring ring) + `aria-pressed="true"`, and the card stays on it whatever else is hovered or
focused. Clicking the locked node again unlocks it; clicking another node moves the lock there.
One shared tooltip (`.mf-tip`) sits on the top edge of the hovered or focused node: "Click to lock
this information", "Click again to unlock", or "Click to lock this box instead" while another node
is locked. At 900px and below the card stops being sticky and sits under the flow.

**Accessibility contract.** Every node is a `<button>` with a visible text label. Flags are
decorative (`aria-hidden`); the node's text names the eleven Member States. The card's text sits
in an `aria-live="polite"` region. Focus previews a node the way hover does, and Enter or Space
locks and unlocks it; `aria-pressed` carries the locked state. The tooltip is `aria-hidden`.

**Known gap.** Flags load from cdnjs (`flag-icons` 7.2.3), the site's only image from a CDN. At
900px and below the card sits below the flow, so a tap near the top updates text off-screen.

---

## CMP-39 · Hazard scene (`.hz`)

**Files.** [js/hazard-scenes.js](../../js/hazard-scenes.js) · colours in
[css/genctx.css](../../css/genctx.css) · used by `gcHazard()` in
[js/analysis-shared.js](../../js/analysis-shared.js) (SCR-03, Natural Disaster Risk; DEC-54)

**Purpose.** Picture one natural hazard as a small flat drawing, without outlines (DEC-56), that
plays the hazard when the pointer is over its tile. The tile under it is one line: the hazard name on the left and its level on the right as the
shared pill, in one of five classes followed by the word "risk", for example "Moderate risk"
(DEC-57, DEC-58).

**Props.** `hazardScene(key)` returns the SVG markup. `key` is `drought`, `flood`, `landslide`
or `typhoon`. Load the file before `js/analysis-shared.js`; GSAP may load later.

**Parts.** One 270 x 120 inline SVG. Shapes take a fill class (`.hz-land`, `.hz-water`, …) and
no stroke; thin things (branches, rain, wind, cracks) are `.hz-l` lines with a colour modifier.
Classes starting `a-` only mark what GSAP moves.
A shape that changes colour is drawn twice; the second copy (`.a-alt`) fades in over the first.

**States.** Calm (default, until the first hover). Hazard, from the first time the pointer is
over the `.gc-nditem` tile: one timeline plays forward once and the scene keeps that state after
the pointer leaves (DEC-55); it is calm again only when the page reloads. Every scene also has motion that repeats while the pointer is over the tile and
holds still when it leaves: drought, the sun's rays turn and pulse and heat rises off the ground;
flood, rain and waves; landslide, pebbles roll down the scar and dust lifts at its foot; typhoon,
the funnel (drawn from the side, as stacked rings that writhe and spin), rain, wind, waves and
swaying trees. Reduced
motion, or no GSAP: calm only.

**Accessibility contract.** Decorative: `aria-hidden="true"`, not focusable, no role. The tile's
text carries the hazard name and risk level. Never put information only in the animation.

**Lottie copies.** The same four scenes exist as Lottie files in
`assets/natural-disaster-risk/`, recorded from this component by
`docs/generated/scripts/build-hazard-lottie.html` (DEC-59). The product does not load them. The
exporter needs every repeat to last a whole fraction of 3 seconds; the comment above `MOTION`
in the script says so.

**Known gap.** Hover only, so touch and keyboard users see the calm drawing. The page that mounts
it without `js/hazard-scenes.js` gets the old photograph instead.

---

## CMP-40 · Icon (Material Symbols)

**Files.** [assets/icons/material/](../../assets/icons/material/) (one SVG per icon, plus
Google's Apache 2.0 `LICENSE`) · [scripts/fetch-material-icons.mjs](../../scripts/fetch-material-icons.mjs)
(the list of icons, and the script that copies them in)
**Purpose.** The one icon set for the product's interface (DEC-80). Every icon is Material
Symbols, **Outlined**, weight 400, grade 0, optical size 24.

**Only what we use is in the repo.** The folder holds the icons named in `ICONS` at the top of
the script, not the whole library. To add one: find its name at fonts.google.com/icons (style
Outlined), add it to `ICONS`, run `node scripts/fetch-material-icons.mjs`. A name followed by
`:fill` also writes the filled version as `name-fill.svg`. Removing a name removes its file.

**How to use one.** Paste the file's `<svg>` inline into the markup or JS template. Each file
already draws in `fill="currentColor"` with Material's own `viewBox="0 -960 960 960"` and no
fixed size, so:

| Prop | Type | Controls |
|---|---|---|
| `color` on the parent | CSS | The icon's colour. Use a token (`var(--text-body)`), never a hex |
| `width` / `height` on the `svg` | CSS | Size. `var(--space-16)`, `var(--space-20)` or `var(--space-24)`; 24 is the size it is drawn for |

An `<img src="assets/icons/material/….svg">` also works but cannot be recoloured, so it shows
black. Use it only where black is right.

**Accessibility.** An icon is decorative by default: `hardenSvgs()` hides it. Name the control,
not the icon: an icon-only button carries `aria-label` on the `<button>`. Give the `svg` itself a
label only when the icon is the content, with no text or control around it.

**What is not a Material icon.** The domain artwork is drawn for this project and stays as it is:
ecosystem and pathway icons (`assets/asset/`, `assets/pathway/`), land cover, species and
climate glyphs (`assets/f01-step2/`), the hazard scenes (CMP-39), the home feature
illustrations, the logo, and the Observed glyph `GC_ICONS.observe` (CMP-08).

**Known gap.** About 600 inline icons predate this rule. Most are hand-drawn 2px-stroke outlines
in the Feather style, and `js/analysis-shared.js` also uses Bootstrap Icons paths (16-unit grid).
They are swapped for Material as each screen is touched; the nav Help icon (CMP-01) is the first.
The `GC_ICONS` card glyphs are Material's older filled "Material Icons" set, not Symbols Outlined.
`TODO(design): confirm whether card head chips should move to Outlined or keep the filled look.`

---

## CMP-41 · Soil type accordion (`.cl-soil` / `.cl-soilrow`)

**Files.** `gcSoil()` and `GC_SOIL` in [js/analysis-shared.js](../../js/analysis-shared.js) ·
styles in [css/genctx.css](../../css/genctx.css) (SCR-03, General context, Soil classification).

**Purpose.** List the WRB soil groups in the area with their share, and explain each one inside
the same card. It replaces the separate dark "Dominant Soil Type" panel. Figma reference: NbS
Tool V3, node 5076:22358.

**Props.** `GC_SOIL` rows are `[group, share %, colour, description]`. Descriptions and colours
come from the soil-groups layer legend (Soil Classification sheet, WRB 2006), so the card matches
the map. Shares follow the Figma frame and are illustrative sample data (DEC-11). The bar width equals the share.

**States.** Every row: light grey, 3px top rule in its soil colour, share in dark text on a grey pill, then a Material `expand_more` chevron that rotates to point up while the row is open (decorative; `<details>` already announces the state). Hover
(collapsed rows only): darker grey, plus the shared `.pcx-tip` tooltip "Learn more about [group]";
a capture-phase `toggle` listener removes the tooltip while a row is open.
Open: description below, indented to the name column. One row is open at a time
(`<details name="cl-soil">`), and the first row (the dominant group) starts open. Clicking the
open row closes it.

**Accessibility contract.** Native `<details>`/`<summary>`: focusable, Enter/Space toggles,
expanded state announced. The focus ring comes from the tokens.css baseline.

**Known gap.** The Figma frame uses a muted palette (#6c8f4f, #c59a3c, …); the code uses the map
legend colours instead. The light ones are too pale for text, so the share is set in
`--text-base-main` rather than the soil colour. The white badge number still fails contrast on
Cambisols #FECD67 and Nitisols #F7A082. `TODO(design)`: update the Figma frame to match. Figma draws the bars at about twice their share
(Andosols 27% fills about 54% of the track, Nitisols 7% about 7%); the code draws them at their
share. The tooltip is pointer-only. No loading, empty or failed
state yet (UI-STATES.md).

## CMP-42 · Video tutorial slot (`.hc-yt`)

**Where.** SCR-19: the landing page (overview), *Video tutorials* (all), and under the hero of
each guide page. Introduced by DEC-81.

**Parts.** A `<figure class="hc-shot hc-yt" data-video="<key>" data-title="…">` holding a
`.hc-video.hc-yt-frame` and a `figcaption`. The frame and the play button are CMP-37's; the
"Video coming soon" pill is CMP-33's `.hc-soon`.

**Props.** `data-video` — a key of `HC_VIDEOS` in the inline script of `help.html`, whose value
is a YouTube link in any common form or a bare video id. `data-title` — the accessible name of
the play button and the `title` of the player. `hidden` — on a guide page's slot, so it takes
no space until its video exists.

**States.** *Coming soon* (no address): a short dashed strip with the pill. *Ready*: a 16:9
dark frame with a *Play video* button. *Playing*: the YouTube iframe. See UI-STATES SCR-19.

**Behaviour.** Nothing is loaded from YouTube until the button is pressed; the player then
comes from `youtube-nocookie.com` and takes focus. An address that is not a YouTube link is
treated as empty.

**Accessibility contract.** The button is a real `<button>` named "Play video: <title>". The
iframe carries the same title. The caption links to the written guide, so the content is never
video-only. There is no autoplay before a press, so reduced motion needs no special case.

**Known gap.** No captions or transcript requirement is enforced here; that belongs to the
videos themselves. `TODO(design): decide whether each tutorial needs a written transcript link.`

## CMP-43 · Horizontal threshold bar (`gcScale()` / `.gc-scale`)

**Files.** `gcScale()` and `drRow()` in [js/analysis-shared.js](../../js/analysis-shared.js) ·
styles in [css/genctx.css](../../css/genctx.css) (SCR-03, Threat profile, Drainage canal pressure).

**Purpose.** Show which class a site falls in on a three-class scale, next to the badge and
sentence that name it. A horizontal, discrete take on the FLII vertical gauge.

**Props.** `classes`: `[name, range, tone, colour, …]` in axis order, one equal-width segment
each, flat colour (no gradient). `at`: 0 to 100 along the bar, or `null` for no marker. `mark`:
the marker's label (a value such as "320 m", or the class name when only the class is known).

**States.** Marker over the site's position; no marker when the layer has no data (the badge
then reads "No drainage"). Canal proximity places the marker by distance within its class
(past 1,000 m it runs to 2,000 m and stops). Drainage density has only a class, so the marker
sits mid-segment.

**Accessibility contract.** `aria-hidden`: decorative. The badge and sentence beside it carry
the same information as text. Colour is never the only cue: each segment is named.

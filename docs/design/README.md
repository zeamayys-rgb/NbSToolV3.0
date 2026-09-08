# Design canon — NbS Tool V3

These files replace the Figma canvas. A developer who has never seen the design work should be
able to read this folder and build the product correctly.

**They are accurate to the code, not aspirational.** Where something is genuinely undefined, it
says `TODO(design): <question>` rather than guessing. The gaps are the point.

---

## Read in this order

| # | File | What it's for |
|---|---|---|
| 1 | **[README.md](README.md)** | You are here. Start with the blocking list below. |
| 2 | **[tokens.json](tokens.json)** | **The source of truth for every colour, spacing, radius, type, shadow and duration value.** W3C DTCG format. Never type a literal that belongs here. |
| 3 | **[TOKENS.md](TOKENS.md)** | How the three tiers work, the naming convention, and how to add a token. |
| 4 | **[UI-STATES.md](UI-STATES.md)** | **Read before implementing any data-driven UI.** What every screen does when data is missing, slow, partial, broken, out of scope, too long or stale. |
| 5 | **[COMPONENTS.md](COMPONENTS.md)** | Every reusable component: props, variants, interactive states, accessibility contract, known limitations. |
| 6 | **[SCREENS.md](SCREENS.md)** | Every route: purpose, layout, components used, data dependencies. |
| 7 | **[FLOWS.md](FLOWS.md)** | The user journeys as Mermaid diagrams, including the branches that should exist but don't. |
| 8 | **[MOTION.md](MOTION.md)** | Every transition and animation in the code, then a proposed duration and easing scale. **The proposal is not approved.** |
| 9 | **[DECISIONS.md](DECISIONS.md)** | Why things are the way they are. Append-only. |

**In a hurry?** tokens.json for what to use, UI-STATES.md for what to build.

---

## The rule

> **These files are updated in the same PR as the code they describe.**

A PR that adds a colour updates `tokens.json`. A PR that adds a screen adds a `SCR-` entry and
its state matrix. A PR that changes how a component behaves updates its `CMP-` entry. A PR that
makes a structural choice adds a `DEC-` entry.

Documentation updated later is documentation that is wrong now.

### Stable IDs

`SCR-` screens · `CMP-` components · `FLW-` flows · `TOK-` token groups · `DEC-` decisions.

**Never reuse or renumber an ID.** They survive renames and let the files cross-reference each
other. If something is removed, mark the ID retired; don't fill the gap.

---

## Every open question, by how much it blocks a developer

Collected from all eight files. `TODO-nn` refers to
[`tokens.json`](tokens.json) `$extensions["id.wri.nbs.todo"]`.

### Blocking — a developer cannot proceed correctly without an answer

**Accessibility**

1. **No modal traps focus.** Five implementations, none of them. Tab past the last control and
   you're in the page behind. — CMP-20
2. **The "i" affordance is focusable but not operable.** `gcInfo` is an `<svg>` with
   `role="button"` and `tabindex="0"` and no key handler. It's the primary route to methodology
   and source information. — CMP-06
3. **People Context charts are invisible to assistive tech.** Unlabelled SVG, so `hardenSvgs()`
   hides all of them. `data-tip` is mouse-only. — CMP-07
4. **No keyboard path to drawing an area.** The primary action of the primary screen is
   pointer-only. — CMP-04
5. **Tab sets have no agreed contract.** `[role="tab"]` is styled but roles, `aria-selected` and
   arrow-key navigation are inconsistent across SCR-07's seven tabs. — CMP-18
6. **19 of 25 files ignore `prefers-reduced-motion`,** including the 400–550ms benefit card
   flip. One global block in `css/tokens.css` fixes most of it. — MOTION.md
7. **Benefit flip-card:** confirm the hidden face leaves the tab order. — CMP-09

**Data loss and false confirmation**

8. **`f0511_app.save()` has no try/catch.** A quota error on the field-data screen loses the
   entry silently. — SCR-09
9. **Evidence attachments have no upload target.** They render; they go nowhere. — SCR-09
10. **SCR-09 has no sync model.** A user can complete a full field survey offline and never know
    it didn't leave the device. **Highest-priority item in this document.** — SCR-09
11. **A corrupt F03 draft is silently reset to empty.** `loadFd()` catches and discards. — SCR-05
12. **Every "Saved" on SCR-11 is unconditional.** No request is made, so none can fail. — SCR-11

**Correctness and trust**

13. **The same eligibility rule has two answers.** Over 500,000 ha and outside South East Asia
    are rejected on upload (SCR-04) and accepted on the map (SCR-03). — FLW-04
14. **A missing threat layer looks like a clear one.** Absent must not read as assessed-and-zero.
    — SCR-03 Step 3
15. **All three ecosystems are always offered,** whatever the analysis found in the area. —
    SCR-03 Step 4
16. **Analysis results are identical for every polygon,** and presented with source-and-year
    attribution. Testers and stakeholders will read this as fact or as a bug. — DEC-11
17. **Benefit figures carry no uncertainty range.** The output goes to funders. — SCR-03 Step 5
18. **No verification status carries an "as of" date.** — SCR-10
19. **Nothing anywhere shows the age of a computed result.** — universal
20. **Mixed number formats.** `.` as thousand separator in one function, `en-US` `,` in another,
    same screen. — CMP-10

**Missing states**

21. **No screen distinguishes "loaded and empty" from "failed to load".** On SCR-06 a failed
    load shows the empty state — telling a user with projects that they have none. — universal
22. **No loading state for primary content anywhere.** SCR-05, SCR-09 and SCR-10 render from JS
    into an empty container and show a blank page until the script runs. — universal
23. **No skeleton pattern exists.** Define one before the first real data source lands. —
    universal
24. **SCR-08 has no missing-upstream-selection state.** No `nbs_selected_activities` → an empty
    wizard with no explanation. Will happen constantly. — SCR-08
25. **SCR-08 doesn't gate the download.** An indicator with no owner produces an unexecutable
    plan that reaches a funder. — SCR-08
26. **SCR-07 has no empty state for any of its seven tabs.** Collaborators, history and
    monitoring are empty for every new project — the common case. — SCR-07
27. **SCR-10 has no first-run state.** Every project starts with an empty dashboard. — SCR-10
28. **No auth failure set exists.** No wrong-password, locked, rate-limited, expired or network
    path. Submitting always appears to succeed. — SCR-02
29. **No screen checks for a session,** and none renders by permission though the privacy tab
    implies roles exist. — SCR-02, SCR-07
30. **The "Analysing the area" overlay has no failure exit.** It spins forever. — SCR-03 Step 1

**Design foundation**

31. **`TODO-04` — Acumin Pro Condensed is never loaded.** Every heading in the product renders
    Barlow Semi Condensed instead. License and self-host, or name Barlow honestly.
32. **`TODO-01` — which green is the brand?** The brief says `#077F68`; the product paints
    `#066653` 219 times.
33. **`TODO-14` — ~1,200 literal hexes bypass the token layer.** Dark theme and any brand change
    are broken until these are migrated.
34. **`TODO-08` — dark theme brand colour fails contrast.** `viridian.600` on `gray.950` is
    ~2.4:1.
35. **`TODO-11` — five modals, five scrims.** Pick one, then pick one modal.
36. **SCR-04's error links to `design-system.html#requirements`** — an orphan developer page,
    from a live error path. — DEC-18
37. **Does SCR-09 need a real mobile design?** Its users are the least likely to have a desktop.
    — DEC-15
38. **Should analysis state live in the URL?** Today a reload loses everything and a result
    can't be shared. — CMP-05

### Should decide soon — a developer can proceed, but will guess

- `TODO-05` — `--mono` is referenced 37 times and never declared; three mono faces are loaded
  across pages.
- `TODO-06` — four semantic tokens hold literal hexes with no primitive to alias.
- `TODO-07` — `text.tertiary` and `text.disabled` are the same value; so are `surface.sunken`
  and `surface.disabled`.
- `TODO-10` — no semantic radius or ring tier, so four component tokens break the tiering rule.
- `TODO-13` — `#bea001` (42 uses), `#1a9e96` (25), `#f9f8f8` (26), `#2d3648` (18) have no
  semantic meaning recorded.
- The missing-layer "Not available" chip: confirm copy, and whether it keeps the "i".
- Does the source line need an "analysed on" stamp, and at what age is a result stale?
- No shared toast pattern — three screens have their own.
- Should the SCR-11 static country/city fallback announce itself?
- Should project deletion be undoable, and for how long?
- Standardise the form error class name and wire error text with `aria-describedby`.
- Is the Ocean Calculator unbuilt, renamed, or in the sibling repo? Nothing in this codebase
  matches it.
- Confirm `inputmode="numeric"` and `autocomplete="one-time-code"` on the OTP boxes.
- Are SCR-15 / SCR-16 reference-only, and should they be excluded from QA or deleted?

### Nice to have

- `TODO-02` — `viridian.900` and `.950` are the same value.
- `TODO-03` — `radius.pill` and `radius.full` are functionally identical.
- `TODO-09` — button hover is a filter shift, so it can't be themed.
- `TODO-12` — is `viridian.750` a one-off, or a "deep brand surface" role?
- `TODO-15` — delete `--font-override` once Inter is removed from the 10 pages still loading it.
- Persist the desktop-notice dismissal; today it returns on every navigation.
- Remember the table/grid preference on SCR-06.
- Reserve aspect-ratio boxes for the SCR-01 hero imagery.
- Truncate long filenames in the SCR-04 error message.
- `aria-label="Breadcrumb"` and `aria-current="page"` on the crumb bar.
- `aria-expanded` on the profile dropdown button.
- Link SCR-14 from the sitemap, or state that it's a developer-only URL.
- Is there a table view of the activity taxonomy for people who can't use the Sankey?
- Adopt a brand `cubic-bezier`, or is `ease-out` enough?
- **Approve or amend the MOTION.md duration and easing scale.** None of it is implemented.

---

## What this folder does not cover

- **Content and copy standards** — tone, reading level, bilingual EN/ID handling. Not written.
- **Data pipeline contracts** — what the analysis layers return, and in what shape. Every figure
  in the product is currently a hardcoded constant.
- **Responsive breakpoints** — the product is desktop-first with a notice (DEC-15); no
  breakpoint system is documented because none is defined.
- **Print and export styling** — SCR-08's generated document has its own hardcoded typography and
  colour, bypassing the token layer entirely.

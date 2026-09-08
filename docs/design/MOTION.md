# MOTION.md — transitions and animation

Every animation currently in the code, then a proposed set of house rules derived from it.

**The house rules in Part 2 are a proposal awaiting approval. Part 1 is fact.**

---

## Part 1 — what exists

### Scale of it

| | Count |
|---|---|
| `transition` declarations | 257 |
| `@keyframes` definitions | 16 unique names (several redefined per file) |
| Distinct durations typed | 20 |
| Distinct easing functions | 4 |
| Files honouring `prefers-reduced-motion` | **6 of 25** |

Durations, by how often each appears:

| Duration | Uses | Where |
|---|---|---|
| `.15s` | 127 | The de-facto default — hover, focus, colour |
| `.2s` | 28 | Panel and tab swaps, toast fades |
| `.18s` | 21 | Dropdowns, chips |
| `.12s` | 14 | Small hovers |
| `.25s` | 10 | Modal and drawer entrances |
| `.16s` | 9 | Assorted hovers |
| `.3s` | 7 | Larger entrances |
| `.4s` / `.28s` / `.55s` / `.35s` / `.26s` / `.22s` | 2–5 each | One-offs |
| `.8s`, `4s`, `21s` | 2–7 | Ambient home-page loops |

Two duration tokens exist and are barely used:

```css
--motion-fast:    150ms ease-out;
--motion-default: 200ms ease-in-out;
```

Easing, by frequency: `ease` (138), `linear` (65), `ease-out` (22), `ease-in-out` (3). So the
CSS default `ease` carries the product, while `ease-out` — the value inside `--motion-fast` —
is used a sixth as often. **No `cubic-bezier()` is defined anywhere.**

### The transitions

| Trigger | Property | Duration | Easing | Reduced motion? |
|---|---|---|---|---|
| Button / link hover | `background`, `color`, `opacity` | `.15s` | `ease` | ❌ |
| `.ws-btn` hover (SCR-04, SCR-08) | `opacity`, `background` | `.15s` | `ease` | ❌ |
| Focus-visible ring | `outline` | none — instant | — | N/A (correct: focus should not animate) |
| `.skip-link` reveal | `top` | `.15s` | `ease` | ❌ |
| Card hover lift | `box-shadow`, `transform` | `.15s`–`.2s` | `ease` | ❌ |
| Tab / panel swap | `opacity` (+ `fade` keyframe) | `.2s` | `ease` | ❌ |
| Profile dropdown open | `opacity`, `transform` | `.18s` | `ease` | ❌ |
| Mobile nav drawer | `transform` | `.25s` | `ease` | ❌ |
| Desktop notice dismiss | `opacity`, `height` | `.2s` | `ease` | ❌ |
| Benefit card flip (CMP-09) | `transform` (rotateY) | `.4s`–`.55s` | `ease` | ❌ |
| Modal entrance (`.vu`) | `opacity`, `transform` | `260ms` (JS `setTimeout` on close) | `ease` | ✅ |
| Export toast | `opacity`, `transform` | `.2s` | `ease` | ✅ (SCR-04, SCR-08) |
| Home reveal (`.reveal`) | `opacity`, `transform` | `.55s` | `ease` | ✅ |
| Home stage sequence (`.stage`) | `opacity` | `.2s`–`.8s` | `ease` | ✅ |

### The keyframes

| Name | Definition | Purpose | File |
|---|---|---|---|
| `fade` | `opacity 0→1`, `translateY(6px→0)` | Generic entrance | `f01.css` |
| `fade` | `opacity 0→1`, `translateY(4px→0)` | **Same name, different distance** | `f03.css`, `genctx.css`, `f041.css` |
| `f05fade` | `opacity 0→1`, `translateY(4px→0)` | Same thing under another name | `f05.css` |
| `biIn` | `opacity 0→1`, `translateY(10px) scale(.98)→none` | Benefit info modal | `analysis-shared.js` |
| `imIn` | `opacity 0→1`, `translateY(10px) scale(.98)→none` | **Identical to `biIn`** | `interactive-map.html` |
| `dmIn` | `opacity 0→1`, `translateY(8px) scale(.99)→none` | **Near-identical, different numbers** | `project-detail.html` |
| `fmenuIn` | `opacity 0→1`, `translateY(-4px→0)` | Menu drop | `footer.css` |
| `toastIn` | `opacity 0→1`, `translateY(-10px) scale(.97)→none` | Toast | `f08` / settings |
| `mapspin` | `rotate(360deg)` | Map analysing spinner | `f01-step1.css` |
| `procspin` | `rotate(360deg)` | **Duplicate spinner** | `new-project.html` |
| `ds-spin` | `rotate(360deg)` | **Duplicate spinner** | `styleguide.css` |
| `sp` | `translateY(-50%) rotate(360deg)` | **Duplicate spinner, centred variant** | `settings.css` |
| `pulse` | `opacity 1 → .35 → 1` | Live / loading indicator | `f01.css` |
| `vuPulse` | expanding `box-shadow` ring | Version badge | `version-modal.js` |
| `aoidash` | `stroke-dashoffset → -18` | Marching-ants AOI outline on the map | `f01-step1.css` |
| `drop` | `top: -40% → 120%` | Ambient home-page decoration | `home.css` |
| `fpillShake` | `translateX ±3px` | Invalid-input shake | `f01-step2.css` |
| `exportToastBar` | `scaleX(1→0)` | Toast countdown bar | SCR-04, SCR-08 |

**Four spinners.** `mapspin`, `procspin`, `ds-spin` and `sp` are the same 360° rotation written
four times.
**Three modal entrances.** `biIn`, `imIn` and `dmIn` are the same idea at 10px/.98, 10px/.98 and
8px/.99.
**Two `fade`s under one name.** `fade` is defined with a 6px offset in one file and 4px in three
others, so the same class name animates differently depending on which stylesheet won.

### Reduced motion — the six files that honour it

| File | What it does | Quality |
|---|---|---|
| `css/home.css` | `*` animation → `.001ms`, iteration count 1, `scroll-behavior: auto`, `.reveal` forced visible, scroll cue and HUD dots stopped | **Correct and thorough** |
| `js/version-modal.js` | `.vu-ovl, .vu, .vu-badge i { transition: none; animation: none }` | Correct |
| `new-project.html` | `.export-toast` transform removed, countdown bar animation off | Correct |
| `create-monitoring-plan.html` | Same as above | Correct |
| `index.html` | Reads the query into a `REDUCED` constant for its JS path | Correct |
| `NbS_Activities_Flow_v2.html` | Reads it into a `reduce` constant before building the Sankey | Correct |

**Nineteen files ignore it**, including every screen with a card hover, a tab swap, a dropdown,
a drawer, a spinner, and the benefit card flip — a 400–550ms `rotateY` that is exactly the kind
of motion the preference exists to suppress.

`TODO(design): add a single global reduced-motion block to css/tokens.css so the preference is honoured by default everywhere, rather than opted into per file.` **Blocking — accessibility.**

---

## Part 2 — proposed house rules

**Status: PROPOSAL. Not adopted. Needs Abe's approval before anything is changed.**

These are derived from what the code already does — the intent is to name the existing pattern,
not to invent a new one. The duration scale below is already in
[`tokens.json`](tokens.json) under `primitive.duration`, marked `INFERRED`.

### Duration scale

| Token | Value | Use for | Derived from |
|---|---|---|---|
| `duration.instant` | 120ms | Small hovers, chip and icon states | 14 existing uses of `.12s` |
| `duration.fast` | **150ms** | **The default.** Hover, focus, colour, opacity on anything small | 127 uses — already declared as `--motion-fast` |
| `duration.default` | 200ms | Panel and tab swaps, dropdowns, disclosure, toasts | 28 uses — already declared as `--motion-default` |
| `duration.slow` | 300ms | Modals, drawers, anything entering over the page | 7 uses of `.3s`, plus the `.25s` and `.26s` cluster |
| `duration.slower` | 550ms | Scroll-triggered entrances on the home page only | `.reveal` |
| `duration.ambient` | 21s | Decorative background loops. Never on functional UI | home-page grain and drift |

**Retire** `.16s`, `.18s`, `.22s`, `.28s`, `.35s`, `.4s` — each rounds to a neighbouring step
and no user can tell the difference.

### Easing

| Token | Value | Use for |
|---|---|---|
| `easing.out` | `ease-out` | **The default.** Anything entering or responding to the user — it starts fast and settles, which reads as responsive |
| `easing.inOut` | `ease-in-out` | Things that move from one place to another and back: drawers, panel swaps |
| `easing.linear` | `linear` | Spinners and progress bars **only**. Never on anything with a start and an end |

**Retire the bare `ease` keyword** (138 uses). It's the CSS default rather than a choice, and it
eases in — which makes hover feel a beat late.

`TODO(design): should we adopt a custom cubic-bezier for the brand, or is ease-out sufficient? A named curve is the cheapest way to make the product feel like one product, but it's a decision only you should make.`

### What animates

Restrict to **`opacity`** and **`transform`** — the two properties a browser composites without
laying out again. Never animate `height`, `width`, `top`, `left`, `margin` or `padding`. Two
places currently break this: the desktop-notice dismiss (`height`) and the `drop` keyframe
(`top`).

### Distance

One entrance offset, not three: **`translateY(6px)`**. Modals additionally scale from `.98`.

That consolidates `fade`, `f05fade`, `biIn`, `imIn`, `dmIn`, `fmenuIn` and `toastIn` into two
keyframes: `enter` (6px rise) and `enterModal` (6px rise + `.98` scale).

### Reduced motion

One global block, in `css/tokens.css`, applying to everything:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
}
```

Then, per component, restore the *information* the motion was carrying — a spinner still needs
to say "working", so replace the rotation with a static indicator plus text rather than removing
the feedback. `css/home.css` already does exactly this for `.reveal`; generalise it.

### What must never animate

- **Focus indicators.** A focus ring that fades in is a focus ring the user misses.
- **Error and validation appearance.** An error must be present the instant it's true.
- **Anything that moves a target the user is reaching for.**

### Migration order, if approved

1. Add the global reduced-motion block. One change, largest accessibility gain.
2. Replace the four spinners with one.
3. Consolidate the three modal entrances into `enterModal`, and the two `fade`s into `enter`.
4. Sweep `.16s`/`.18s`/`.22s`/`.28s`/`.35s`/`.4s` onto the nearest scale step.
5. Replace bare `ease` with `easing.out`, screen by screen, checking as you go.

Steps 1–3 are mechanical. Steps 4–5 need eyes on each screen.

`TODO(design): approve or amend this scale before any of it is applied to code. Nothing here has been implemented.`

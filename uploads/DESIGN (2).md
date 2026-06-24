# DESIGN.md — NbS Tool V3

<!-- extraction-meta
source: Figma files "NbS Tool V3" (structure, components, layout, depth)
        + "00 Foundation - Design System" (color + typography tokens — canonical)
scope: NbS Tool V3 (5 pages) reconciled against the Foundation design system
date: 2026-06-02
note: Color and Typography below are the CANONICAL Foundation tokens, not the
      raw values scraped from V3 screens. Where a V3 screen uses a color or font
      outside this set, treat it as legacy drift to be migrated to a token here.
confidence: { extracted: 100%, inferred: 0%, known: 0% }
-->

> **How to read this file.** Sections 3 (Color) and 4 (Typography) are the source
> of truth and come from the **00 Foundation - Design System** file. Everything
> else (structure, components, spacing, radii, shadows) is observed from the
> **NbS Tool V3** working file. When the two disagree, Foundation wins — the V3
> screens are mid-migration and still contain un-tokenized colors and stray
> fonts. Flag those as drift; don't copy them into new work.

---

## 1. Identity

**In one line:** A spatial environmental / Nature-based Solutions planning tool —
white-surfaced, neutral-gray UI anchored by a **teal-green brand** (`#066653`)
with full semantic ramps (success green, danger red, warning amber, purple),
light + dark themes, typeset in **Acumin Pro Condensed** for display/headlines
and **Poppins** for body/UI — on a consistent auto-layout spacing system, rounded
shape language, and a layered shadow system for depth.

**Signature techniques:**
- Neutral, near-white surfaces with cool-gray text and borders
- Teal-green brand (`primary`) + full semantic ramps (success/danger/warning/purple)
- Light and dark themes via semantic system tokens
- Acumin Pro Condensed for display/headlines; Poppins for body/UI
- Consistent auto-layout spacing on a 4px base
- Rounded shape language (4–12px radii for most UI)
- Layered, low-opacity shadows for elevation

**Migration status:** The V3 working file still contains ~2,500 raw hexes and 14
font families from organic growth. This document narrows that to the Foundation
token set (primitive palette + semantic system tokens). New screens use only
these tokens; existing screens get migrated onto them over time.

---

## 2. Structure

High-level composition of the NbS Tool V3 file, from Figma pages and top-level
frames. Each entry shows frame name, type, dimensions, and auto-layout direction.

### Page: V 3.0 — _30 top-level frames_

The primary product surface. Key flows and frames:

- **General User Flow (End-to-End Journey)** · `SECTION` · 6896×3104 · 101 children
  - Flow map covering: NbS Tool Home `[F00]`, User Registration / Login/Signup
    `[F07]`, User Profile `[F08]`, Open NbS Tool, NbS Criteria page `[F00.2]`,
    Features / Tutorial page `[F00.1]`, Interactive Map `[F01]`, My Project
    Dashboard `[F04]`, Create Monitoring Plan `[F05]`, Explore Spatial Layers
    `[F01.1]`, Explore Legends `[F01.2]`, …and ~89 more flow nodes.
- **NEW UI V3 ---** · `SECTION` · 18776×13865 · 18 children
  - **Buffer Submit Key 473** · `FRAME` · 1920×1519 — dashboard shell:
    sidebar layer (collapsible `Sidebar Opened` + `Hide` toggle), Profile Summary,
    Project List (paginated — "Showing 1 to 5 of 50 entries"), Top Navbar
    (1920×100, divider), Footer (1920×472, padded 64/80).
  - **Project Management / Project Detail** · `FRAME` · 1920×(1384–2112) —
    repeated detail layouts: `Section` (padding 100/24/0/24) → `Main Content`
    (vertical, gap 32, padding 32/0) → Footer + Top Navbar.

### Page: Page 5 — _4 top-level frames_

The map + analyzer working surface (1440-wide layouts).

- **Benefit / Climate** · `FRAME` · 1440×1024 — the core analysis screen:
  - **Map by GFW BG** — layered map raster group (GFW basemap + colored data layers)
  - **Filter Layers** · `INSTANCE` — left rail: Site Information, Project Management
  - **Map Controller New** · `INSTANCE` · 70×310 — Select Area of Interest, zoom,
    Export AOI, with hover tooltips
  - **Legend** · `INSTANCE` · 355×105 — collapsible legend box (Title + Legend 1/2/3)
  - **Top Navbar** · `INSTANCE` · 1440×82 — scene coalition logo + Navigation
  - **Panel Data Analyzer V3** · `INSTANCE` · 810×942 — the right-hand analyzer
    panel: Title Panel, `.DA Tab` tabs, scrolling Content Wrapper, Button Block
    (Button Group + WF Button)
- **Frame 1000003710** · 898×596 — action chooser: "What action do you want to do?"
  → Generate Document / Pre-feasibility Study / Create Monitoring Plan
- **Login** · 898×596 — login modal
- **Exit Confirmation** · 898×596 — "your analysis hasn't been saved yet…"
  → Yes, leave anyway / Save my analysis

### Page: 🫆 Component — _10 top-level frames_

The component library. Notable sets:

- **Alert** · `COMPONENT_SET` · 2290×1946 · 16 children — variants on
  Theme (Light/Dark) × Hierarchy (Primary/Secondary) × Variant (Info/Warning/…),
  each: Icon container + Info Container (paragraph + button) + X close.
- …plus the component families catalogued in §7.

---

## 3. Color  *(canonical — from the Foundation color tokens)*

Two layers: a **primitive palette** (raw scales — the only hexes that exist) and
**system tokens** (semantic, theme-aware roles that reference the palette). In
code, reference **system tokens** for anything theme-aware (backgrounds, text,
strokes), and primitive scale steps only when you need a specific tint. Never
hardcode a hex outside this set; anything on a V3 screen outside it is legacy
drift to migrate.

### 3.1 Primitive palette

**Base**

| Token | Value |
|-------|-------|
| `base-white` | `#ffffff` |
| `base-black` | `#000000` |

**Neutral** (near-white → light grays; surfaces & subtle fills)

| Token | Value | | Token | Value |
|-------|-------|-|-------|-------|
| `neutral-25` | `#fcfcfc` | | `neutral-500` | `#efeff1` |
| `neutral-50` | `#fafbfc` | | `neutral-600` | `#eaebf0` |
| `neutral-100` | `#f8f9fb` | | `neutral-700` | `#e5e5e7` |
| `neutral-200` | `#f9f9f9` | | `neutral-800` | `#c0c2c6` |
| `neutral-300` | `#f7f7f8` | | `neutral-900` | `#a0a4ac` |
| `neutral-400` | `#f5f5f5` | | `neutral-950` | `#9599a1` |

**Gray** (mid → dark grays; text, icons, borders)

| Token | Value | | Token | Value |
|-------|-------|-|-------|-------|
| `gray-25` | `#979aa0` | | `gray-500` | `#444a51` |
| `gray-50` | `#848b94` | | `gray-600` | `#383d43` |
| `gray-100` | `#68727d` | | `gray-700` | `#323539` |
| `gray-200` | `#626b75` | | `gray-800` | `#2b2d2f` |
| `gray-300` | `#5c656e` | | `gray-900` | `#252525` |
| `gray-400` | `#505760` | | `gray-950` | `#181818` |

**Primary** (brand teal-green)

| Token | Value | | Token | Value |
|-------|-------|-|-------|-------|
| `primary-25` | `#e9f8f1` | | `primary-500` | `#077f68` |
| `primary-50` | `#d4f1e3` | | `primary-600` | `#066653` |
| `primary-100` | `#beead5` | | `primary-700` | `#044c3e` |
| `primary-200` | `#9fd4c9` | | `primary-800` | `#05332a` |
| `primary-300` | `#6ab2a4` | | `primary-900` | `#042620` |
| `primary-400` | `#399986` | | `primary-950` | `#042620` |

**Danger** (red)

| Token | Value | | Token | Value |
|-------|-------|-|-------|-------|
| `danger-25` | `#fdfbfb` | | `danger-500` | `#ff453a` |
| `danger-50` | `#ffefee` | | `danger-600` | `#e33b32` |
| `danger-100` | `#fddddc` | | `danger-700` | `#da3a33` |
| `danger-200` | `#fea19b` | | `danger-800` | `#901f1b` |
| `danger-300` | `#fe827b` | | `danger-900` | `#751614` |
| `danger-400` | `#ff645a` | | `danger-950` | `#590c0c` |

**Success** (green)

| Token | Value | | Token | Value |
|-------|-------|-|-------|-------|
| `success-25` | `#e9f8f1` | | `success-500` | `#27b973` |
| `success-50` | `#d4f1e3` | | `success-600` | `#1f945c` |
| `success-100` | `#beead5` | | `success-700` | `#176f45` |
| `success-200` | `#a9e3c7` | | `success-800` | `#104a2e` |
| `success-300` | `#7dd5ab` | | `success-900` | `#082517` |
| `success-400` | `#52c78f` | | `success-950` | `#04130c` |

**Warning** (amber)

| Token | Value | | Token | Value |
|-------|-------|-|-------|-------|
| `warning-25` | `#fdf6ea` | | `warning-500` | `#efa22f` |
| `warning-50` | `#fcecd5` | | `warning-600` | `#dc9d24` |
| `warning-100` | `#fae3c1` | | `warning-700` | `#8f611c` |
| `warning-200` | `#f9daac` | | `warning-800` | `#604113` |
| `warning-300` | `#f5c782` | | `warning-900` | `#302009` |
| `warning-400` | `#f2b559` | | `warning-950` | `#181005` |

**Purple**

| Token | Value | | Token | Value |
|-------|-------|-|-------|-------|
| `purple-25` | `#f8f8fb` | | `purple-500` | `#5d54f6` |
| `purple-50` | `#ecebff` | | `purple-600` | `#564efa` |
| `purple-100` | `#c7c4fd` | | `purple-700` | `#453de3` |
| `purple-200` | `#aba7fd` | | `purple-800` | `#342dc7` |
| `purple-300` | `#8f89fc` | | `purple-900` | `#33049f` |
| `purple-400` | `#736cfb` | | `purple-950` | `#1b0254` |

### 3.2 System tokens (semantic, theme-aware)

These are what you reference in components. Each has a **Light** and **Dark**
value. Format below: `token` → Light / Dark.

**Background**

| Token | Light | Dark |
|-------|-------|------|
| `bg-base-main` | `#ffffff` | `#181818` |
| `bg-base-second` | `#fafbfc` | `#252525` |
| `bg-base-third` | `#f7f7f8` | `#2b2d2f` |
| `bg-disabled` | `#f7f7f8` | `#2b2d2f` |
| `bg-primary-main` | `#066653` | `#066653` |
| `bg-primary-second` | `#ecf4fc` | `#399986` |
| `bg-success-main` | `#27b973` | `#27b973` |
| `bg-success-second` | `#e9f8f1` | `#252525` |
| `bg-danger-main` | `#e33b32` | `#e33b32` |
| `bg-danger-second` | `#ffefee` | `#252525` |
| `bg-warning-main` | `#efa22f` | `#efa22f` |
| `bg-warning-second` | `#fdf6ea` | `#252525` |
| `bg-purple-main` | `#564efa` | `#564efa` |
| `bg-purple-second` | `#ecebff` | `#252525` |

**Text & icons**

| Token | Light | Dark |
|-------|-------|------|
| `text-base-main` | `#252525` | `#f9f9f9` |
| `text-base-second` | `#68727d` | `#979aa0` |
| `text-base-third` | `#c0c2c6` | `#68727d` |
| `text-on-color` | `#ffffff` | `#ffffff` |
| `text-disabled` | `#c0c2c6` | `#68727d` |
| `text-primary` | `#066653` | `#066653` |
| `text-success` | `#27b973` | `#27b973` |
| `text-danger` | `#e33b32` | `#e33b32` |
| `text-warning` | `#efa22f` | `#efa22f` |
| `text-purple` | `#564efa` | `#564efa` |

**Stroke / border**

| Token | Light | Dark |
|-------|-------|------|
| `stroke-base` | `#eaebf0` | `#323539` |
| `stroke-primary` | `#066653` | `#066653` |
| `stroke-success` | `#1f945c` | `#1f945c` |
| `stroke-danger` | `#da3a33` | `#e33b32` |
| `stroke-warning` | `#dc9d24` | `#dc9d24` |
| `stroke-purple` | `#453de3` | `#564efa` |

> **Usage rules**
> - Page background = `bg-base-main`; secondary panels = `bg-base-second`; insets/disabled = `bg-base-third`.
> - Body text = `text-base-main`; muted = `text-base-second`; placeholder/hint = `text-base-third`; text on a colored fill = `text-on-color`.
> - Brand actions use the **primary** family (note: brand main fill is `#066653`, the 600 step — `primary-500` `#077f68` is the brightest brand tint for accents/hovers).
> - Semantics: success = green, danger = red, warning = amber, purple = informational/special. Pair each `*-main` with its `*-second` tint for subtle backgrounds.
> - Need a shade between steps? Pick the nearest primitive step or adjust opacity — don't invent a hex.

---

## 4. Typography  *(canonical — from the Foundation typography tokens)*

### Fonts

Three families, each with a defined job:

- **Acumin Pro Condensed** — display & headlines (the `display` and `headline` ramps).
- **Poppins** — body / UI text (the `text` ramp: paragraphs, labels, controls, captions).
- **Inter** — used for two specific overrides only (`headline-XL-desktop-semibold` and `headline-XS-desktop-regular`); otherwise not a primary family here.

> Any other family on a V3 screen (Roboto, Lato, DM Sans, IBM Plex, SF Pro, etc.)
> is legacy drift → migrate to the family above for its tier.

### 4.1 Display — Acumin Pro Condensed

| Token | Size / LH | Weights available | Letter Spacing |
|-------|-----------|-------------------|----------------|
| `display-L` | 64 / 68 | medium 500, semibold 600, bold 700, heavy 900 | -2px |
| `display-M` | 52 / 60 | light 300, medium 500, semibold 600, bold 700, heavy 900 | -2px |

### 4.2 Headline — Acumin Pro Condensed (responsive; two Inter overrides)

Sizes shown as desktop → mobile where a mobile step exists.

| Token | Desktop Size / LH | Mobile Size / LH | Weights | Letter Spacing |
|-------|-------------------|------------------|---------|----------------|
| `headline-XL` | 40 / 48 | 36 / 44 | light 300, regular 400, medium 500, **semibold 600 *(Inter)***, bold 700 | -2px |
| `headline-L` | 36 / 44 | — | light 300, regular 400, medium 500, semibold 600, bold 700¹ | -2px (bold -1px) |
| `headline-M` | 32 / 40 | 28 / 36 | regular 400, medium 500, semibold 600², bold 700 | -1.5px |
| `headline-S` | 28 / 38 | 24 / 32 | regular 400, medium 500, semibold 600, bold 700 | -1.5px |
| `headline-XS` | 24 / 30 | 20 / 28 | **regular 400 *(Inter)***, medium 500, semibold 600, bold 700 | -1px |
| `headline-XXS` | 20 / 28 | 18 / 24 | regular 400, medium 500, semibold 600, bold 700 | -1px |

_¹ `headline-L` desktop bold uses -1px letter-spacing (others -2px)._
_² `headline-M` desktop semibold uses 42px line-height (others 40px)._

### 4.3 Text — Poppins

| Token | Size / LH | Weights available | Letter Spacing |
|-------|-----------|-------------------|----------------|
| `text-XL` | 18 / 26–28 | regular 400 (26 LH), medium 500, semibold 600, bold 700 | 0 |
| `text-L` | 16 / 24 | regular 400, medium 500, semibold 600, bold 700 | 0 |
| `text-M` | 14 / 22 | regular 400, medium 500, semibold 600, bold 700 | 0 |
| `text-S` | 12 / 20 | regular 400, medium 500, semibold 600, bold 700 | 0 |
| `text-XS` | 11 / 18 | bold 700 | 0 |
| `text-XXS` | 10 / 18 | regular 400, medium 500, semibold 600 | 0 |

> **Pairing guide:** Page/hero titles → `display-*`; section & card headings →
> `headline-*` (use mobile steps under ~768px); body copy → `text-L`/`text-M`;
> labels, captions, table cells → `text-S`/`text-XS`/`text-XXS`. Default UI body
> is `text-M` (14/22). The full per-weight values live in §11.

---
## 5. Spacing & Layout

### Base unit — **4px**

Use a 4px-based scale. Prefer these steps; round stray values to the nearest:

`0 · 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 100`

Common layout values observed in V3 (keep using these for parity with existing
screens): section padding `100/24/0/24`, content padding `32/0`, footer padding
`64/80`, panel/content gap `20`, main-content gap `32`, card gap `8–16`.

> The raw V3 file contained ~250 distinct spacing values (organic drift). Don't
> reproduce that. Snap to the scale above; if you truly need a new step, add it
> here first.

### Border radius

Curated set for UI. The raw file had 70+ radius values — these are the ones worth
keeping; map anything else to the nearest.

| Token | Value | Use |
|-------|-------|-----|
| `radius-none` | 0px | Flush edges, dividers |
| `radius-xs` | 2px | Subtle rounding, tags |
| `radius-sm` | 4px | Inputs, small buttons, chips |
| `radius-md` | 6px | Buttons, default controls |
| `radius-lg` | 8px | Cards, panels |
| `radius-xl` | 12px | Modals, large containers |
| `radius-2xl` | 20px | Hero / feature cards |
| `radius-pill` | 999px | Pills, toggles |
| `radius-full` | 9999px | Avatars, circular icon buttons |

---

## 6. Depth & Motion

### Elevation

The V3 file held 87 distinct shadows. Below is a curated, semantic ladder — pick
by intent, not by scraping. (Full raw list preserved in the machine-readable
appendix if you ever need an exact legacy match.)

| Token | Shadow | Use |
|-------|--------|-----|
| `elevation-1` | `0px 1px 2px 0px rgba(16, 24, 40, 0.04)` | Hairline lift — inputs, rows |
| `elevation-2` | `0px 1px 3px 0px rgba(0, 0, 0, 0.08)` | Resting cards |
| `elevation-3` | `0px 4px 8px 0px rgba(113, 128, 150, 0.08), 0px 0px 1px 0px rgba(113, 128, 150, 0.04)` | Raised cards, dropdowns |
| `elevation-4` | `0px 4px 12px 0px rgba(0, 0, 0, 0.04)` | Popovers, panels |
| `elevation-5` | `0px 8px 11px 0px rgba(4, 76, 62, 0.02)` | Floating panels (green-tinted) |
| `elevation-6` | `0px 24px 64px 0px rgba(0, 0, 0, 0.22)` | Modals, overlays |

**Focus ring tokens** (derive from the semantic palette, §3 — 3px ring at low opacity):
- `ring-primary` · `0px 0px 0px 3px rgba(6, 102, 83, 0.15)` — brand focus (`primary-600`)
- `ring-success` · `0px 0px 0px 3px rgba(39, 185, 115, 0.15)` — success (`success-500`)
- `ring-danger` · `0px 0px 0px 3px rgba(227, 59, 50, 0.15)` — error (`danger-600`)
- `ring-warning` · `0px 0px 0px 3px rgba(239, 162, 47, 0.15)` — warning (`warning-500`)
- `ring-purple` · `0px 0px 0px 3px rgba(86, 78, 250, 0.15)` — informational (`purple-600`)

### Motion

Not defined in Foundation. Use a single, calm convention until specified:
`150ms ease-out` for hover/press, `200ms ease-in-out` for panels/modals.

---

## 7. Components

717 components were defined in the V3 file. The families you'll reuse most:

**Library / system**
- **Alert** — Theme (Light/Dark) × Hierarchy (Primary/Secondary) × Variant
  (Info/Warning/Error/Success); icon + message + optional button + close.
- **WF Button** — `State=Default | Hover | Active | Disable`
- **Template Selection** / **Modal Template Selection** — `State=Default | Hover
  | Active | Disable`, with `Variant` and `Section Selector` states.

**NbS Tool–specific**
- **Data Analyzer V.3** — the right panel. Matrix component:
  `Property 1 = {Site Information | Nature | Climate | People | Degradation Layer}`
  × `Data = {Current Condition | Benefit}`.
- **Intervention Type Selector** — `Property 1 = Default | …`
- **Filter Layers**, **Map Controller New**, **Legend**, **Top Navbar**,
  **Footer**, **Tooltip hover mouse**.

> When building a new screen, compose from these first. Only create a new
> component if nothing fits — then add it here.

---

## 8. States

Derive state treatments from the system tokens in §3:

| State | Treatment |
|-------|-----------|
| Hover | Step the fill one shade darker (e.g. `primary-600` → `primary-700`); neutral fills → `bg-base-third` |
| Focus | 3px ring in the relevant family at low opacity — `primary` for brand inputs, `purple`/`stroke-purple` for informational |
| Active / pressed | Step two shades darker; optional inset shadow |
| Selected | `text-primary` / `stroke-primary` on `bg-primary-second` |
| Disabled | `text-disabled` + `bg-disabled`, no pointer events |
| Error | `stroke-danger` border + `text-danger` on `bg-danger-second` |
| Success | `text-success` / `stroke-success` on `bg-success-second` |
| Warning | `text-warning` / `stroke-warning` on `bg-warning-second` |

---

## 9. Rules

### Do
- Use `bg-base-main` (`#ffffff`) for page background, `bg-base-second` (`#fafbfc`) for panels, `bg-base-third` for insets.
- Use `text-base-main` / `text-base-second` / `text-base-third` for the text hierarchy; `text-on-color` on colored fills.
- Use the **primary** family for brand actions; reserve success/danger/warning/purple for their semantics.
- Pair each `*-main` color with its `*-second` tint for subtle backgrounds.
- Use **Acumin Pro Condensed** for display/headlines, **Poppins** for body/UI (§4).
- Keep radii on the curated set (§5); default controls = `radius-md` (6px), cards = `radius-lg` (8px).
- Snap spacing to the 4px scale.
- Pick shadows by intent from the §6 ladder.
- Honor both **Light and Dark** values when building themed components.

### Don't
- Don't introduce hexes outside §3. Need a tint? Use the nearest primitive step or adjust opacity.
- Don't repurpose semantic colors (e.g. don't use `danger` for non-error emphasis).
- Don't bring back legacy fonts (Roboto, Lato, DM Sans, IBM Plex, SF Pro, etc.).
- Don't invent spacing/radii outside the scales — add to this file first if genuinely needed.
- Don't flatten the shadow system into single hard shadows.

---

## 10. Extending this system

This file is the canonical reference for NbS Tool V3. Commit it at the repo root
and feed it (or `@DESIGN.md`) to Cursor / Claude / Copilot so generated screens
reuse these exact tokens.

### Adding a new screen
- Start from the **Identity** statement — the screen must read as the same product.
- Reuse **Structure** patterns (same containers, gaps, padding rhythm) before inventing new ones.
- Use only §3 colors, §4 fonts, §5 spacing/radii, §6 shadows.
- Compose from §7 components; promote anything used 3+ times into §7.

### When to add a token vs reuse
| Situation | Action |
|-----------|--------|
| Need a tint/shade of an existing color | Reuse + adjust opacity; don't add a hex |
| Need a size between two type steps | Pick the closer step |
| Need a one-off spacing value | Round to nearest scale value |
| Need a genuinely new semantic role | Add to §3 with a clear role + note |
| Need a pattern used 3+ times | Promote to §7 Components |

### Migrating legacy V3 screens
1. Replace raw hexes with the nearest §3 token (use the **Similar** column as a map).
2. Swap any non-Inter UI font to Inter (keep Poppins only where display is intended).
3. Snap stray spacing/radii to the scales.
4. Re-run the extraction plugin and diff — the diff is your migration changelog.

### Versioning
This reconciles **NbS Tool V3** structure with **00 Foundation - Design System**
tokens (2026-06-02). The color (primitive + system) and typography ramps are
complete and authoritative. When Foundation adds motion tokens or new component
patterns, update §6 / §7 here and re-diff.

---

## 11. Machine-readable tokens

```json
{
  "color": {
    "palette": {
      "baseWhite": "#ffffff",
      "baseBlack": "#000000",
      "neutral-25": "#fcfcfc",
      "neutral-50": "#fafbfc",
      "neutral-100": "#f8f9fb",
      "neutral-200": "#f9f9f9",
      "neutral-300": "#f7f7f8",
      "neutral-400": "#f5f5f5",
      "neutral-500": "#efeff1",
      "neutral-600": "#eaebf0",
      "neutral-700": "#e5e5e7",
      "neutral-800": "#c0c2c6",
      "neutral-900": "#a0a4ac",
      "neutral-950": "#9599a1",
      "gray-25": "#979aa0",
      "gray-50": "#848b94",
      "gray-100": "#68727d",
      "gray-200": "#626b75",
      "gray-300": "#5c656e",
      "gray-400": "#505760",
      "gray-500": "#444a51",
      "gray-600": "#383d43",
      "gray-700": "#323539",
      "gray-800": "#2b2d2f",
      "gray-900": "#252525",
      "gray-950": "#181818",
      "primary-25": "#e9f8f1",
      "primary-50": "#d4f1e3",
      "primary-100": "#beead5",
      "primary-200": "#9fd4c9",
      "primary-300": "#6ab2a4",
      "primary-400": "#399986",
      "primary-500": "#077f68",
      "primary-600": "#066653",
      "primary-700": "#044c3e",
      "primary-800": "#05332a",
      "primary-900": "#042620",
      "primary-950": "#042620",
      "danger-25": "#fdfbfb",
      "danger-50": "#ffefee",
      "danger-100": "#fddddc",
      "danger-200": "#fea19b",
      "danger-300": "#fe827b",
      "danger-400": "#ff645a",
      "danger-500": "#ff453a",
      "danger-600": "#e33b32",
      "danger-700": "#da3a33",
      "danger-800": "#901f1b",
      "danger-900": "#751614",
      "danger-950": "#590c0c",
      "success-25": "#e9f8f1",
      "success-50": "#d4f1e3",
      "success-100": "#beead5",
      "success-200": "#a9e3c7",
      "success-300": "#7dd5ab",
      "success-400": "#52c78f",
      "success-500": "#27b973",
      "success-600": "#1f945c",
      "success-700": "#176f45",
      "success-800": "#104a2e",
      "success-900": "#082517",
      "success-950": "#04130c",
      "warning-25": "#fdf6ea",
      "warning-50": "#fcecd5",
      "warning-100": "#fae3c1",
      "warning-200": "#f9daac",
      "warning-300": "#f5c782",
      "warning-400": "#f2b559",
      "warning-500": "#efa22f",
      "warning-600": "#dc9d24",
      "warning-700": "#8f611c",
      "warning-800": "#604113",
      "warning-900": "#302009",
      "warning-950": "#181005",
      "purple-25": "#f8f8fb",
      "purple-50": "#ecebff",
      "purple-100": "#c7c4fd",
      "purple-200": "#aba7fd",
      "purple-300": "#8f89fc",
      "purple-400": "#736cfb",
      "purple-500": "#5d54f6",
      "purple-600": "#564efa",
      "purple-700": "#453de3",
      "purple-800": "#342dc7",
      "purple-900": "#33049f",
      "purple-950": "#1b0254"
    },
    "system": {
      "bg-base-main": {
        "light": "#ffffff",
        "dark": "#181818"
      },
      "bg-base-second": {
        "light": "#fafbfc",
        "dark": "#252525"
      },
      "bg-primary-main": {
        "light": "#066653",
        "dark": "#066653"
      },
      "bg-success-main": {
        "light": "#27b973",
        "dark": "#27b973"
      },
      "bg-danger-main": {
        "light": "#e33b32",
        "dark": "#e33b32"
      },
      "bg-warning-main": {
        "light": "#efa22f",
        "dark": "#efa22f"
      },
      "bg-purple-main": {
        "light": "#564efa",
        "dark": "#564efa"
      },
      "bg-primary-second": {
        "light": "#ecf4fc",
        "dark": "#399986"
      },
      "bg-warning-second": {
        "light": "#fdf6ea",
        "dark": "#252525"
      },
      "bg-success-second": {
        "light": "#e9f8f1",
        "dark": "#252525"
      },
      "bg-purple-second": {
        "light": "#ecebff",
        "dark": "#252525"
      },
      "bg-danger-second": {
        "light": "#ffefee",
        "dark": "#252525"
      },
      "text-base-main": {
        "light": "#252525",
        "dark": "#f9f9f9"
      },
      "text-base-second": {
        "light": "#68727d",
        "dark": "#979aa0"
      },
      "text-on-color": {
        "light": "#ffffff",
        "dark": "#ffffff"
      },
      "text-disabled": {
        "light": "#c0c2c6",
        "dark": "#68727d"
      },
      "text-primary": {
        "light": "#066653",
        "dark": "#066653"
      },
      "text-success": {
        "light": "#27b973",
        "dark": "#27b973"
      },
      "text-danger": {
        "light": "#e33b32",
        "dark": "#e33b32"
      },
      "text-warning": {
        "light": "#efa22f",
        "dark": "#efa22f"
      },
      "text-purple": {
        "light": "#564efa",
        "dark": "#564efa"
      },
      "stroke-base": {
        "light": "#eaebf0",
        "dark": "#323539"
      },
      "stroke-primary": {
        "light": "#066653",
        "dark": "#066653"
      },
      "stroke-success": {
        "light": "#1f945c",
        "dark": "#1f945c"
      },
      "stroke-danger": {
        "light": "#da3a33",
        "dark": "#e33b32"
      },
      "stroke-warning": {
        "light": "#dc9d24",
        "dark": "#dc9d24"
      },
      "stroke-purple": {
        "light": "#453de3",
        "dark": "#564efa"
      },
      "bg-disabled": {
        "light": "#f7f7f8",
        "dark": "#2b2d2f"
      },
      "bg-base-third": {
        "dark": "#2b2d2f",
        "light": "#f7f7f8"
      },
      "text-base-third": {
        "light": "#c0c2c6",
        "dark": "#68727d"
      }
    }
  },
  "font": {
    "display": "Acumin Pro Condensed",
    "headline": "Acumin Pro Condensed",
    "text": "Poppins",
    "overrides": "Inter"
  },
  "type": {
    "display-L-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "64px",
      "lineHeight": "68px",
      "letterSpacing": "-2px"
    },
    "display-L-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "64px",
      "lineHeight": "68px",
      "letterSpacing": "-2px"
    },
    "display-L-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "64px",
      "lineHeight": "68px",
      "letterSpacing": "-2px"
    },
    "display-L-heavy": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 900,
      "fontSize": "64px",
      "lineHeight": "68px",
      "letterSpacing": "-2px"
    },
    "display-M-light": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 300,
      "fontSize": "52px",
      "lineHeight": "60px",
      "letterSpacing": "-2px"
    },
    "display-M-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "52px",
      "lineHeight": "60px",
      "letterSpacing": "-2px"
    },
    "display-M-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "52px",
      "lineHeight": "60px",
      "letterSpacing": "-2px"
    },
    "display-M-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "52px",
      "lineHeight": "60px",
      "letterSpacing": "-2px"
    },
    "display-M-heavy": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 900,
      "fontSize": "52px",
      "lineHeight": "60px",
      "letterSpacing": "-2px"
    },
    "headline-XL-desktop-light": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 300,
      "fontSize": "40px",
      "lineHeight": "48px",
      "letterSpacing": "-2px"
    },
    "headline-XL-desktop-regular": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 400,
      "fontSize": "40px",
      "lineHeight": "48px",
      "letterSpacing": "-2px"
    },
    "headline-XL-desktop-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "40px",
      "lineHeight": "48px",
      "letterSpacing": "-2px"
    },
    "headline-XL-desktop-semibold": {
      "fontFamily": "Inter",
      "fontWeight": 600,
      "fontSize": "40px",
      "lineHeight": "48px",
      "letterSpacing": "-2px"
    },
    "headline-XL-desktop-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "40px",
      "lineHeight": "48px",
      "letterSpacing": "-2px"
    },
    "headline-XL-mobile-regular": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 400,
      "fontSize": "36px",
      "lineHeight": "44px",
      "letterSpacing": "-2px"
    },
    "headline-XL-mobile-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "36px",
      "lineHeight": "44px",
      "letterSpacing": "-2px"
    },
    "headline-XL-mobile-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "36px",
      "lineHeight": "44px",
      "letterSpacing": "-2px"
    },
    "headline-XL-mobile-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "36px",
      "lineHeight": "44px",
      "letterSpacing": "-2px"
    },
    "headline-L-desktop-light": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 300,
      "fontSize": "36px",
      "lineHeight": "44px",
      "letterSpacing": "-2px"
    },
    "headline-L-desktop-regular": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 400,
      "fontSize": "36px",
      "lineHeight": "44px",
      "letterSpacing": "-2px"
    },
    "headline-L-desktop-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "36px",
      "lineHeight": "44px",
      "letterSpacing": "-2px"
    },
    "headline-L-desktop-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "36px",
      "lineHeight": "44px",
      "letterSpacing": "-2px"
    },
    "headline-L-desktop-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "36px",
      "lineHeight": "44px",
      "letterSpacing": "-1px"
    },
    "headline-M-desktop-regular": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 400,
      "fontSize": "32px",
      "lineHeight": "40px",
      "letterSpacing": "-1.5px"
    },
    "headline-M-desktop-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "32px",
      "lineHeight": "40px",
      "letterSpacing": "-1.5px"
    },
    "headline-M-desktop-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "32px",
      "lineHeight": "42px",
      "letterSpacing": "-1.5px"
    },
    "headline-M-desktop-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "32px",
      "lineHeight": "40px",
      "letterSpacing": "-1.5px"
    },
    "headline-M-mobile-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "28px",
      "lineHeight": "36px",
      "letterSpacing": "-1.5px"
    },
    "headline-M-mobile-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "28px",
      "lineHeight": "36px",
      "letterSpacing": "-1.5px"
    },
    "headline-M-mobile-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "28px",
      "lineHeight": "36px",
      "letterSpacing": "-1.5px"
    },
    "headline-S-desktop-regular": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 400,
      "fontSize": "28px",
      "lineHeight": "38px",
      "letterSpacing": "-1.5px"
    },
    "headline-S-desktop-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "28px",
      "lineHeight": "38px",
      "letterSpacing": "-1.5px"
    },
    "headline-S-desktop-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "28px",
      "lineHeight": "38px",
      "letterSpacing": "-1.5px"
    },
    "headline-S-desktop-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "28px",
      "lineHeight": "38px",
      "letterSpacing": "-1.5px"
    },
    "headline-S-mobile-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "24px",
      "lineHeight": "32px",
      "letterSpacing": "-1.5px"
    },
    "headline-S-mobile-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "24px",
      "lineHeight": "32px",
      "letterSpacing": "-1.5px"
    },
    "headline-S-mobile-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "24px",
      "lineHeight": "32px",
      "letterSpacing": "-1.5px"
    },
    "headline-XS-desktop-regular": {
      "fontFamily": "Inter",
      "fontWeight": 400,
      "fontSize": "24px",
      "lineHeight": "30px",
      "letterSpacing": "-1px"
    },
    "headline-XS-desktop-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "24px",
      "lineHeight": "30px",
      "letterSpacing": "-1px"
    },
    "headline-XS-desktop-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "24px",
      "lineHeight": "30px",
      "letterSpacing": "-1px"
    },
    "headline-XS-desktop-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "24px",
      "lineHeight": "30px",
      "letterSpacing": "-1px"
    },
    "headline-XS-mobile-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "20px",
      "lineHeight": "28px",
      "letterSpacing": "-1px"
    },
    "headline-XS-mobile-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "20px",
      "lineHeight": "28px",
      "letterSpacing": "-1px"
    },
    "headline-XS-mobile-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "20px",
      "lineHeight": "28px",
      "letterSpacing": "-1px"
    },
    "headline-XXS-desktop-regular": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 400,
      "fontSize": "20px",
      "lineHeight": "28px",
      "letterSpacing": "-1px"
    },
    "headline-XXS-desktop-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "20px",
      "lineHeight": "28px",
      "letterSpacing": "-1px"
    },
    "headline-XXS-desktop-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "20px",
      "lineHeight": "28px",
      "letterSpacing": "-1px"
    },
    "headline-XXS-desktop-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "20px",
      "lineHeight": "28px",
      "letterSpacing": "-1px"
    },
    "headline-XXS-mobile-medium": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 500,
      "fontSize": "18px",
      "lineHeight": "24px",
      "letterSpacing": "-1px"
    },
    "headline-XXS-mobile-semibold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 600,
      "fontSize": "18px",
      "lineHeight": "24px",
      "letterSpacing": "-1px"
    },
    "headline-XXS-mobile-bold": {
      "fontFamily": "Acumin Pro Condensed",
      "fontWeight": 700,
      "fontSize": "18px",
      "lineHeight": "24px",
      "letterSpacing": "-1px"
    },
    "text-XL-regular": {
      "fontFamily": "Poppins",
      "fontWeight": 400,
      "fontSize": "18px",
      "lineHeight": "26px",
      "letterSpacing": "0px"
    },
    "text-XL-medium": {
      "fontFamily": "Poppins",
      "fontWeight": 500,
      "fontSize": "18px",
      "lineHeight": "28px",
      "letterSpacing": "0px"
    },
    "text-XL-semibold": {
      "fontFamily": "Poppins",
      "fontWeight": 600,
      "fontSize": "18px",
      "lineHeight": "28px",
      "letterSpacing": "0px"
    },
    "text-XL-bold": {
      "fontFamily": "Poppins",
      "fontWeight": 700,
      "fontSize": "18px",
      "lineHeight": "28px",
      "letterSpacing": "0px"
    },
    "text-L-regular": {
      "fontFamily": "Poppins",
      "fontWeight": 400,
      "fontSize": "16px",
      "lineHeight": "24px",
      "letterSpacing": "0px"
    },
    "text-L-medium": {
      "fontFamily": "Poppins",
      "fontWeight": 500,
      "fontSize": "16px",
      "lineHeight": "24px",
      "letterSpacing": "0px"
    },
    "text-L-semibold": {
      "fontFamily": "Poppins",
      "fontWeight": 600,
      "fontSize": "16px",
      "lineHeight": "24px",
      "letterSpacing": "0px"
    },
    "text-L-bold": {
      "fontFamily": "Poppins",
      "fontWeight": 700,
      "fontSize": "16px",
      "lineHeight": "24px",
      "letterSpacing": "0px"
    },
    "text-M-regular": {
      "fontFamily": "Poppins",
      "fontWeight": 400,
      "fontSize": "14px",
      "lineHeight": "22px",
      "letterSpacing": "0px"
    },
    "text-M-medium": {
      "fontFamily": "Poppins",
      "fontWeight": 500,
      "fontSize": "14px",
      "lineHeight": "22px",
      "letterSpacing": "0px"
    },
    "text-M-semibold": {
      "fontFamily": "Poppins",
      "fontWeight": 600,
      "fontSize": "14px",
      "lineHeight": "22px",
      "letterSpacing": "0px"
    },
    "text-M-bold": {
      "fontFamily": "Poppins",
      "fontWeight": 700,
      "fontSize": "14px",
      "lineHeight": "22px",
      "letterSpacing": "0px"
    },
    "text-S-regular": {
      "fontFamily": "Poppins",
      "fontWeight": 400,
      "fontSize": "12px",
      "lineHeight": "20px",
      "letterSpacing": "0px"
    },
    "text-S-medium": {
      "fontFamily": "Poppins",
      "fontWeight": 500,
      "fontSize": "12px",
      "lineHeight": "20px",
      "letterSpacing": "0px"
    },
    "text-S-semibold": {
      "fontFamily": "Poppins",
      "fontWeight": 600,
      "fontSize": "12px",
      "lineHeight": "20px",
      "letterSpacing": "0px"
    },
    "text-S-bold": {
      "fontFamily": "Poppins",
      "fontWeight": 700,
      "fontSize": "12px",
      "lineHeight": "20px",
      "letterSpacing": "0px"
    },
    "text-XS-bold": {
      "fontFamily": "Poppins",
      "fontWeight": 700,
      "fontSize": "11px",
      "lineHeight": "18px",
      "letterSpacing": "0px"
    },
    "text-XXS-regular": {
      "fontFamily": "Poppins",
      "fontWeight": 400,
      "fontSize": "10px",
      "lineHeight": "18px",
      "letterSpacing": "0px"
    },
    "text-XXS-medium": {
      "fontFamily": "Poppins",
      "fontWeight": 500,
      "fontSize": "10px",
      "lineHeight": "18px",
      "letterSpacing": "0px"
    },
    "text-XXS-semibold": {
      "fontFamily": "Poppins",
      "fontWeight": 600,
      "fontSize": "10px",
      "lineHeight": "18px",
      "letterSpacing": "0px"
    }
  },
  "spacing": [
    0,
    2,
    4,
    8,
    12,
    16,
    20,
    24,
    32,
    40,
    48,
    64,
    80,
    100
  ],
  "radius": {
    "none": 0,
    "xs": 2,
    "sm": 4,
    "md": 6,
    "lg": 8,
    "xl": 12,
    "2xl": 20,
    "pill": 999,
    "full": 9999
  },
  "shadow": {
    "elevation-1": "0px 1px 2px 0px rgba(16, 24, 40, 0.04)",
    "elevation-2": "0px 1px 3px 0px rgba(0, 0, 0, 0.08)",
    "elevation-3": "0px 4px 8px 0px rgba(113, 128, 150, 0.08), 0px 0px 1px 0px rgba(113, 128, 150, 0.04)",
    "elevation-4": "0px 4px 12px 0px rgba(0, 0, 0, 0.04)",
    "elevation-5": "0px 8px 11px 0px rgba(4, 76, 62, 0.02)",
    "elevation-6": "0px 24px 64px 0px rgba(0, 0, 0, 0.22)"
  },
  "motion": {
    "fast": "150ms ease-out",
    "default": "200ms ease-in-out"
  }
}
```

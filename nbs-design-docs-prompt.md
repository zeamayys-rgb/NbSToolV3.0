# Prompt: generate the design canon for the NbS Tool

Paste everything below into Claude Code, from the root of the NbS repo.
Start in plan mode (`shift+tab`) so it reads before it writes.

---

You are helping me build a design-canon document set for this repo. The goal is that a developer who has never seen the design work can open `docs/design/` and understand the product without a Figma file. These documents replace the Figma canvas, so they must be accurate to the code, not aspirational.

## Ground rules

1. **Derive everything from the codebase.** Read the actual components, routes, styles, and config. Do not invent values, states, or components that don't exist.
2. **Mark gaps, don't fill them.** Where something is genuinely undefined (an error state that isn't implemented, a token with no semantic name), write `TODO(design): <specific question>` instead of guessing. The gaps are the most useful output.
3. **Do not modify application code.** This task only creates files under `docs/design/` plus one edit to `CLAUDE.md`. If you notice bugs or inconsistencies, list them in the audit; do not fix them.
4. **Work one file at a time.** After each file, stop and show me the diff before moving on.
5. Every entity gets a **stable ID** so docs can cross-reference each other and survive renames. Use these prefixes: `SCR-` screens, `CMP-` components, `FLW-` flows, `TOK-` token groups, `DEC-` decisions. Never reuse or renumber an ID once assigned.

## Phase 0 — audit first (no files yet)

Before writing anything, report back to me:

- The route/screen inventory you found, and how you found it.
- The component inventory, split into: design-system primitives, composite/feature components, and one-off components used in a single place.
- Where styling values currently live (Tailwind config, CSS variables, inline, hardcoded).
- Any place where the same visual value is defined more than once with different values.
- What you could **not** determine from the code and will need from me.

Then wait for my go-ahead.

## Phase 1 — `docs/design/tokens.json`

Extract the design tokens into W3C DTCG format (spec version 2025.10). Every token uses `$value` and `$type`. Structure in three tiers:

- **Primitive** — raw values (`color.viridian.700`, `space.4`, `font.size.lg`)
- **Semantic** — intent (`color.action.primary`, `color.surface.raised`, `color.status.danger`)
- **Component** — bindings (`button.background.primary`, `modal.border.color`)

Rules:
- Semantic tokens reference primitives. Component tokens reference semantics. Component tokens must never reference primitives directly.
- The project anchors on Viridian `#077F68` / `#044C3E`, with Poppins, Inter, and Acumin Pro Condensed. Map what's in the code to that foundation set and flag anything that conflicts.
- Where the code uses a raw hex or px value that has no token, list it under a `TODO(design)` block at the end of the file rather than silently minting a token name.

Also produce `docs/design/TOKENS.md`: a short human-readable page explaining the tiering, the naming convention, and how to add a token.

## Phase 2 — `docs/design/SCREENS.md`

A table of every screen/route, then a section per screen. Table columns: ID, route, name, purpose, primary user goal, key components, data dependencies.

Per-screen section covers: what the user is trying to accomplish, entry and exit points, layout structure, the components used (by `CMP-` ID), and what data must be loaded before the screen is useful.

## Phase 3 — `docs/design/UI-STATES.md`

The state matrix. This is the highest-value file, so be exhaustive. For every screen and every data-driven component, cover: default, loading, empty, partial data, error, no-permission / non-eligible, long-content overflow, and offline or stale-data.

Use exactly this format:

````markdown
### SCR-04 · Threat Profile panel

| State | Trigger | What the user sees | Implemented? |
|---|---|---|---|
| Default | Region selected, threat data present | Ranked threat list with severity bars, source attribution footer | Yes |
| Loading | Region change in flight | Skeleton rows matching final row height, no layout shift | Yes |
| Empty | Region has no modelled threats | Illustration + "No threat data for this region yet" + link to methodology | No — `TODO(design)` |
| Partial | Some threat layers missing | Available threats render; missing layers show inline "Not available" chip rather than being hidden | Partial — chip exists, copy unconfirmed |
| Error | API failure | Inline error card inside the panel, retry button, rest of dashboard stays usable | No — currently fails silently |
| Non-eligible | Region outside programme scope | Panel replaced by explainer card, CTA disabled with tooltip reason | Yes |
| Long content | >12 threats | List scrolls within panel; header stays fixed | Yes |

**Notes**
- Non-eligible is a product rule, not an error. It must never use danger colour or error iconography.
- `TODO(design): confirm whether empty and non-eligible share one visual treatment or stay distinct.`
````

Apply the same treatment to the map dashboard, Intervention Pathway, Benefits section, the info modal system, and the Ocean Calculator.

## Phase 4 — `docs/design/COMPONENTS.md`

One entry per reusable component: ID, file path, purpose, props table (name, type, required, default, what it controls), variants, interactive states (rest, hover, focus-visible, active, disabled, loading), accessibility contract (role, keyboard behaviour, focus management, required labels), and known limitations.

Give the info modal system its own extended section, since it's a shared pattern: when to use it, when not to, how content is passed in, dismissal behaviour, and focus-trap rules.

## Phase 5 — `docs/design/FLOWS.md`

Mermaid diagrams for the primary user journeys, derived from actual routing and state logic. At minimum: first-load through to a region-level result, and the intervention selection path. Include decision branches for non-eligible regions and missing data. Below each diagram, a numbered walkthrough naming the screens by `SCR-` ID.

## Phase 6 — `docs/design/MOTION.md`

Every transition and animation currently in the code: what triggers it, duration, easing, what property animates, and whether it respects `prefers-reduced-motion`. Then a short "house rules" section proposing consistent duration and easing scales based on what's already there, flagged as a proposal for me to approve.

## Phase 7 — `docs/design/DECISIONS.md`

An append-only decision log. One entry per decision you can infer from the code, each with: ID, date (or "unknown"), decision, context, alternatives visible in the code or comments, and consequences. Where you infer a decision rather than find it documented, label it `inferred` so I can confirm or correct it.

## Phase 8 — wire it up

- Create `docs/design/README.md`: what each file is for, which to read first, and the rule that these files are updated in the same PR as the code they describe.
- Update `CLAUDE.md` to point at `docs/design/tokens.json` as the source of truth for all colour, spacing, and typography values, and at `docs/design/UI-STATES.md` before implementing any data-driven UI.

## Final output

After the last file, give me a single list of every `TODO(design)` across all files, grouped by how much it blocks a developer: blocking, should-decide-soon, and nice-to-have.

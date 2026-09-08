# TOKENS.md — how the token system works

`tokens.json` is the source of truth for every colour, spacing, radius, type, shadow and
duration value in the NbS Tool. It is W3C DTCG format (spec 2025.10): every token carries
`$value` and `$type`, and references use `{dot.path}` aliases.

The runtime that actually paints the product is **[`css/tokens.css`](../../css/tokens.css)**.
`tokens.json` documents and formalises that file — it does not yet generate it. Keeping the
two in sync is manual until a build step exists.

---

## The three tiers

```
primitive  ->  semantic  ->  component
 raw value      intent        binding
```

**Primitive** (`TOK-01`–`TOK-05`) — the raw scales. `primitive.color.viridian.600`,
`primitive.space.16`, `primitive.duration.fast`. This is the only tier where a literal hex,
px or ms may appear. A primitive name says *what the value is*, never *what it's for*.
Nothing in product code should reference a primitive.

**Semantic** (`TOK-06`, `TOK-07`) — intent. `semantic.color.action.primary`,
`semantic.color.surface.raised`, `semantic.color.status.danger`. Every value is an alias
to a primitive. This is the tier product code normally consumes, and it maps 1:1 to the
`--bg-*` / `--text-*` / `--stroke-*` variables in `css/tokens.css`.

**Component** (`TOK-08`) — bindings. `component.button.background.primary`,
`component.modal.border`. Every value aliases a **semantic** token.

### The one hard rule

> **A component token must never reference a primitive directly.**

If you find yourself wanting to, the semantic tier is missing a role — add that role first.
Four tokens currently break this rule (`button.radius`, `chip.radius`, `input.focusRing`,
`dataAnalyser.headerBackground`); each is marked `VIOLATION` in `$description` and tracked
as `TODO-10` / `TODO-12`.

---

## Naming convention

`tier.category.role.variant`

| Part | Rule | Examples |
|---|---|---|
| tier | `primitive` \| `semantic` \| `component` | — |
| category | the kind of thing | `color`, `space`, `radius`, `font`, `elevation`, `ring`, `duration`, `easing` |
| role | what it means | `action`, `surface`, `text`, `border`, `status` |
| variant | which one | `primary`, `raised`, `danger`, `onColor` |

- **Colour ramps** run `25 → 950`, low number = light. Off-rhythm steps are allowed but must
  say why in `$description` (see `viridian.750`).
- **`*Subtle`** suffix means the tinted background that pairs with a solid status colour —
  `status.danger` is the fill, `status.dangerSubtle` is the wash behind it.
- **camelCase** for multi-word segments (`primarySubtle`, `borderFocus`, `headBackground`).
- Never encode the value in the name. `color.green500` is wrong; `color.viridian.500` is the
  primitive, `color.action.primary` is the semantic.

### Dark theme

Dark is **not** a separate token set. `semantic.dark.*` lists **only the tokens that change**
under `[data-theme="dark"]`; everything unlisted is inherited from light. The theme is applied
as a `data-theme` attribute on `<html>` and persisted in `localStorage` under `nbs-theme`.

---

## How to add a token

1. **Check the semantic tier first.** Most new needs are an existing role in a new place, not
   a new token. Reuse before you mint.
2. **Does the raw value already exist as a primitive?** If yes, add only the semantic alias.
   If no, add the primitive to the correct ramp at the correct step *and* to `css/tokens.css`.
3. **Add the semantic token** naming the intent, aliasing the primitive.
4. **Add the component binding** only if a specific component needs to diverge from the
   semantic default later. If it never will, use the semantic token directly and skip this.
5. **If dark theme needs a different value**, add the override under `semantic.dark.*`. Do not
   duplicate tokens that don't change.
6. **Write a `$description`** whenever the token is inferred, off-rhythm, or shares a value
   with another token. Future readers need to know it was deliberate.
7. **If you can't answer a question the token raises, don't guess** — add a `TODO-nn` entry to
   `$extensions["id.wri.nbs.todo"]` at the end of `tokens.json` and reference it from the
   token's `$description`.

### What not to do

- Don't type a hex, px or ms literal anywhere outside the `primitive` tier.
- Don't add a token to make one screen work. That's a local style, not a token.
- Don't rename a token to "fix" it. Add the new name, migrate uses, then delete the old one in
  a separate change.

---

## Known state of the system

The token *layer* is sound. The token *adoption* is not.

Roughly **1,200 literal hex values** are typed across `css/*.css`, inline `<style>` blocks and
JS template strings, most of them duplicating tokens that already exist — `#066653` appears 219
times, `#68727d` 183, `#252525` 155, `#eaebf0` 154. Until those become `var()` references,
dark theme is broken by construction and a brand change is a find-and-replace across 40 files.
Tracked as `TODO-14`.

The full list of open questions lives at the end of
[`tokens.json`](tokens.json) under `$extensions["id.wri.nbs.todo"]`, and is grouped by urgency
in [`README.md`](README.md).

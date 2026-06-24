# QA.md — Website QA/QC Reference

> Drop this file in the repo root. It defines how QA/QC is run on this site and
> doubles as the prompt to hand to Claude Code. Run everything inside `git` so
> each wave is a clean, revertable commit.

---

## ROLE

Act as a **Senior QA/QC Engineer** with deep experience in web standards,
accessibility, and design systems. The goal is to make this website
**consistent, technically stable, bug-free, performant, and accessible.**

---

## SOURCE OF TRUTH

- `design.md` — written design system spec (tokens, type, components)
- `[design-system].html` — canonical living component reference

All visual/styling judgments must trace back to these files. **Flag — do not
silently "fix"** — anything that contradicts them; the maintainer decides on
ambiguous cases.

---

## OPERATING RULES

1. Work in **WAVES** (below), one at a time. Do not start the next wave until
   the current one is approved.
2. For each issue, report: **file + location**, **severity**
   (Critical / High / Medium / Low), **what's wrong**, **why it matters**, and
   the **proposed fix**.
3. Change only what each wave covers. Never refactor opportunistically.
4. Preserve existing behavior and visual output unless the issue *is* the
   behavior/appearance. Show diffs; don't apply sweeping edits blind.
5. If a fix could affect other screens/components, say so before doing it.

---

## WAVE 1 — FUNCTIONAL

Audit every interactive element: links (no 404 / dead anchors), buttons, forms
(validation, submit, error states), navigation, tabs / modals / toggles /
filters. Test failure paths: empty input, wrong format, double-click,
back-after-submit. List broken/risky behaviors before fixing.

## WAVE 2 — DESIGN-SYSTEM CONSISTENCY

Audit all CSS against `design.md` and the design-system HTML. Find: hardcoded
values that should be tokens, drifted spacing / color / type, divergent copies
of the same component, one-off hex/px values. Consolidate toward the defined
tokens. Report every value used that is **not** in the design system.

## WAVE 3 — RESPONSIVE & CROSS-BROWSER

Check breakpoints (375 / 768 / 1280+) and the awkward in-between widths. Find
horizontal scroll, overlap, broken reflow, tap targets < 44px. Flag CSS likely
to break in Safari/iOS (flex `gap`, `backdrop-filter` on glassmorphism cards,
date inputs).

## WAVE 4 — ACCESSIBILITY (WCAG 2.1 AA)

Check contrast (4.5:1 text, 3:1 UI/large), full keyboard navigation, visible
focus states, semantic HTML, heading order, alt text, and correct (minimal)
ARIA. Report each failure with the specific ratio/element and the fix.

## WAVE 5 — PERFORMANCE

Find dead CSS, oversized/repeated inline SVGs, render-blocking or unminified
assets, layout shift (CLS) risks, and animation jank. Propose concrete weight
reductions.

## WAVE 6 — CODE QUALITY & STABILITY

Validate HTML. Find console errors/warnings, broken references, dead code,
inline styles fighting the stylesheet, unhandled JS edge cases, inconsistent
naming. Confirm graceful handling of missing/malformed data.

## WAVE 7 — CONTENT & DATA INTEGRITY

Spelling/grammar, leftover placeholder text/links, correct data bindings,
number/unit formatting and labels — **critical for the data-viz components**
(charts, radar/spider graphs, metric cards, count-up numbers).

## WAVE 8 — REGRESSION

Re-test every fix from Waves 1–7 plus surrounding elements. Confirm nothing
broke. Produce a final summary: issues found, fixed, deferred — by severity.

---

## DELIVERABLE

Start with **Wave 1 only**. First produce the audit report for Wave 1 — **no
edits yet** — then wait for go-ahead to fix.

---

## ISSUE LOG (fill in as you go)

| ID | Wave | Severity | File / Location | Issue | Status |
|----|------|----------|-----------------|-------|--------|
|    |      |          |                 |       |        |

Status values: `Open` · `Fixed` · `Deferred` · `Won't fix`

---

## DEFINITION OF DONE

- [ ] All Critical and High issues resolved
- [ ] No console errors or warnings
- [ ] No 404s / dead links
- [ ] WCAG 2.1 AA contrast + keyboard nav verified
- [ ] All styles trace to design-system tokens (no unexplained one-offs)
- [ ] No horizontal scroll at any tested breakpoint
- [ ] Tested in Chrome, Safari, Firefox, Edge (incl. iOS Safari)
- [ ] Data bindings, units, and labels verified on all data-viz components
- [ ] Regression pass complete; final summary produced

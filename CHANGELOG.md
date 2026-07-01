# Change Log — NbS Tool Design (3.0)

Consolidated report of all design-system screen edits across the recent working sessions.
Prepared for developer handoff to Claude Code.

**Repository:** `WRI-Indonesia/design-test-nbs`
**Sessions covered:**
- F03 / F04.1 / F05.0 chat session
- Session — July 1, 2026

---

## Files touched

| Area | File |
| --- | --- |
| F03 — Document Generator | `design-system/f03-app.js` |
| F04 — Dashboard | `design-system/screens/F04 Dashboard.html` |
| F04.1 — Project Detail | `design-system/screens/F04.1 Project Detail.html` |
| F05 — Create Monitoring Plan | `design-system/screens/F05 Create Monitoring Plan.html` |
| F05.0 — Import Existing Project | `design-system/screens/F05.0 Create New Project From Scratch.html` |
| Shared logic | `design-system/f05-shared.js` *(new)* |
| Shared styles | `design-system/f05.css` |
| Assets | `design-system/screens/genctx_icons/assets/landslide.jpg` *(new)*, `eco-forest.svg` / `eco-mangrove.svg` / `eco-peatland.svg` |

---

## Setup

- Connected GitHub and imported the full `WRI-Indonesia/design-test-nbs` repo (164 files) into the project for editing.

---

## F03 — Document Generator
**File:** `design-system/f03-app.js`

1. **Required-question note reworded** — "* Indicates required question" → "* Indicates required question before submitting the CCB Document".
2. **General (socio-economic) form cleanup**
   - Removed the **Mandatory / Optional / Review** tag from each question.
   - Removed the asterisk (`*`) from filled questions and from questions tagged Mandatory.
   - The level badge (Desa / Kelurahan, etc.) is retained.
3. **Required-question note scoped to CCB only** — the note now shows only on the CCB form, not on the General/socio-economic form.
4. **Form-level progress → section-level progress**
   - Removed the form-level progress widget (`% Completed`, `x / y questions filled`, progress bar).
   - Added per-section progress counts (`x/y filled`) beside every sidebar section and next to the section title.
   - A section shows a ✓ when complete; counts update live as fields are filled.

---

## F04 — Dashboard
**File:** `design-system/screens/F04 Dashboard.html`

5. **Status tag renamed** — "Waiting for MRV Plan" → "**Waiting for Monitoring Plan**" (2 instances).

---

## F04.1 — Project Detail
**File:** `design-system/screens/F04.1 Project Detail.html`

6. **Monitoring Plan modal matched to F05 structure**
   - Rebuilt the "See plan" modal as a five-column monitoring matrix: **NbS Activity · Benefit · Monitoring indicator · Data source · Frequency**.
   - Rows grouped by activity → benefit category, with color-coded Nature / People / Climate tags and PROTECT / MANAGE pathway badges.
   - Populated from the plan's recommended mangrove activities (18 indicators); summary stats and "Indicators tracked" updated to match.
7. **NbS Design summary redesigned around the F05.0 framework**
   - **Ecosystem cards** for Forest, Mangrove, Peatland — each with its icon, area share, and intervention pathways.
   - **Pathway icons** — per-ecosystem Protect / Manage chips using the real pathway icons.
   - **Activities list** grouped by ecosystem (with dividers), each tagged with its intervention (PROTECT / MANAGE).
   - **Benefit column** — Nature / People / Climate tags on every activity.
   - **Monitoring matrix summary** — indicator count per ecosystem matrix plus a total.
   - **Edit NbS Design** button links to F05.0 (`?mode=edit`); **Download** button opens a menu to export the full design or any individual F05.0 step (with confirmation toast).
8. **NbS Design summary made expandable**
   - Each ecosystem card is now the expand/hide control (chevron + highlight state).
   - Activity/indicator counts are summarized on the ecosystem card; the full per-activity list collapses under each ecosystem.
   - Forest expanded by default; Mangrove and Peatland collapsed.
9. **Monitoring Plan added to Project Documents** — new document row (Final status) with **View** (opens the monitoring-matrix modal), **Edit** (links to F05 Create Monitoring Plan), and **Download**.
10. **Analysis tab rebuilt to match the Figma "Site Characterisation: General Context" layout**
    - **Sticky left nav**: 1 Site Characterisation (General Information / Nature / People / Climate), 2 Threat Profile, 3 Potential Benefit — sticks below the top bar; all items switch the main pane.
    - **General Context** content: five cards — Administrative & ecosystem type (ecosystem map + donut), Topography & slope (terrain model + slope classes + donut), Deforestation analysis (rate + risk map), Land cover class (6 icon tiles), Natural disaster risk (4 photo cards). Each card has a "Data source … See more" footer.
    - Nature / People / Climate / Threat Profile / Potential Benefit panes populated with baseline data.
    - Responsive: collapses to a single column below 880px.

---

## F05 — Create Monitoring Plan
**File:** `design-system/screens/F05 Create Monitoring Plan.html`

11. **Step 3: added "Your NbS pathways" overview cards** above the ecosystem list — one per ecosystem, showing pathway pills (Protect / Manage / Restore, following user choices) and a prototype duration (random multiple of 5).
12. **Ecosystem accordions now integrate the real Step 2 matrix** — only checked indicators, each with Benefit, Data source, and Monitoring frequency as edited.
13. **Clarified count label** — "X selected" → "**X activities selected**".

---

## F05.0 — Import Existing Project to NbS Tool
**File:** `design-system/screens/F05.0 Create New Project From Scratch.html`
*(Page retitled from "Create New Project — From Scratch" to "Import Existing Project to NbS Tool"; on-disk filename unchanged.)*

14. **Edit mode support** — when opened with `?mode=edit` (from F04.1 "Edit NbS Design"), the page reframes as an edit flow: title becomes "Edit NbS Design", subtitle and breadcrumb updated. Existing `?step=` deep-linking preserved.
15. **Retitled and reframed as the documentation flow for existing projects** — upload SHP → define interventions → build monitoring metrics; generates project analysis + saves to My Projects dashboard. Subtitle later shortened; page width set to 920px.
16. **Added contextual upload error states to Step 1**, each styled to the design system with a distinct cause:
    - *wrong file format* (red),
    - *area > 500,000 ha* (amber),
    - *outside South East Asia* (amber).
    - Real file uploads auto-validate format; each error offers a reset action. Added a "Preview states" demo bar for reviewing states without uploading.
17. **Rebuilt Step 3 to mirror F05 Step 1** — same grouped-by-pathway activity cards plus Ecosystem + Intervention filter chips (seeded from the pathways chosen in Step 2). Step 4 matrix now draws from the same shared data.

---

## Shared / system-wide

18. **Created `f05-shared.js`** (`design-system/f05-shared.js`) as a single source of truth for NbS activity content + the activity-card UI, loaded by both F05 and F05.0 — edits now propagate to both pages automatically.
19. **Swapped ecosystem logos** to the uploaded SVG assets (`eco-forest.svg` / `eco-mangrove.svg` / `eco-peatland.svg`) everywhere they appear on both pages (18 instances), sized per context.
20. **Fixed a CSS bug** — moved the pathway group-header styles (`.pw-section-hd`) into shared `f05.css` so headers render consistently on both pages.

---

## Assets

21. **Landslide disaster image generated** — `design-system/screens/genctx_icons/assets/landslide.jpg` created to complete the four natural-disaster cards (flood, typhoon, drought already existed).

---

## Open items / notes

- Monitoring Plan modal remains mangrove-only; the NbS Design summary reflects chosen activities across all three ecosystems. Confirm whether the project should be mangrove-only.
- Analysis-tab figures (areas, percentages, baselines) are self-consistent **sample data** — replace with real values when available.
- Generated landslide image is illustrative; swap for a real photo if available.
- F05.0 on-disk filename (`F05.0 Create New Project From Scratch.html`) still reflects the old title; rename to match "Import Existing Project to NbS Tool" if desired, updating any links.

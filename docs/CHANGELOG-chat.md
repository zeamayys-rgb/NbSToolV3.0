# Change Log — F03 / F04.1 / F05.0 Session

_Scope: edits made to the NbS design-system screens during this chat session._

---

## F03 — Document Generator (`design-system/f03-app.js`)

1. **Required-question note reworded**
   - "* Indicates required question" → "* Indicates required question before submitting the CCB Document".

2. **General (socio-economic) form cleanup**
   - Removed the **Mandatory / Optional / Review** tag from each question.
   - Removed the asterisk (`*`) from filled questions and from questions tagged Mandatory.
   - The level badge (Desa / Kelurahan, etc.) is retained.

3. **Required-question note scoped to CCB only**
   - The note now shows only on the CCB form, not on the General/socio-economic form.

4. **Form-level progress → section-level progress**
   - Removed the form-level progress widget (`% Completed`, `x / y questions filled`, progress bar).
   - Added per-section progress counts (`x/y filled`) beside every sidebar section and next to the section title.
   - A section shows a ✓ when complete; counts update live as fields are filled.

---

## F04.1 — Project Detail (`design-system/screens/F04.1 Project Detail.html`)

5. **Monitoring Plan modal matched to F05 structure**
   - Rebuilt the "See plan" modal as a five-column monitoring matrix: **NbS Activity · Benefit · Monitoring indicator · Data source · Frequency**.
   - Rows grouped by activity → benefit category, with color-coded Nature / People / Climate tags and PROTECT / MANAGE pathway badges.
   - Populated from the plan's recommended mangrove activities (18 indicators); summary stats and "Indicators tracked" updated to match.

6. **NbS Design summary redesigned around the F05.0 framework**
   - **Ecosystem cards** for Forest, Mangrove, Peatland — each with its icon, area share, and intervention pathways.
   - **Pathway icons** — per-ecosystem Protect / Manage chips using the real pathway icons.
   - **Activities list** grouped by ecosystem (with dividers), each tagged with its intervention (PROTECT / MANAGE).
   - **Benefit column** — Nature / People / Climate tags on every activity.
   - **Monitoring matrix summary** — indicator count per ecosystem matrix plus a total.
   - **Edit NbS Design** button links to F05.0 (`?mode=edit`); **Download** button opens a menu to export the full design or any individual F05.0 step (with confirmation toast).

7. **NbS Design summary made expandable**
   - Each ecosystem card is now the expand/hide control (chevron + highlight state).
   - Activity/indicator counts are summarized on the ecosystem card; the full per-activity list collapses under each ecosystem.
   - Forest expanded by default; Mangrove and Peatland collapsed.

8. **Monitoring Plan added to Project Documents**
   - New document row (Final status) with **View** (opens the monitoring-matrix modal), **Edit** (links to F05 Create Monitoring Plan), and **Download**.

9. **Analysis tab rebuilt to match the Figma "Site Characterisation: General Context" layout**
   - **Sticky left nav**: 1 Site Characterisation (General Information / Nature / People / Climate), 2 Threat Profile, 3 Potential Benefit — sticks below the top bar; all items switch the main pane.
   - **General Context** content: five cards — Administrative & ecosystem type (ecosystem map + donut), Topography & slope (terrain model + slope classes + donut), Deforestation analysis (rate + risk map), Land cover class (6 icon tiles), Natural disaster risk (4 photo cards). Each card has a "Data source … See more" footer.
   - Nature / People / Climate / Threat Profile / Potential Benefit panes populated with baseline data.
   - Responsive: collapses to a single column below 880px.

---

## F05.0 — Create New Project From Scratch (`design-system/screens/F05.0 Create New Project From Scratch.html`)

10. **Edit mode support**
    - When opened with `?mode=edit` (from F04.1 "Edit NbS Design"), the page reframes as an edit flow: title becomes "Edit NbS Design", subtitle and breadcrumb updated. Existing `?step=` deep-linking preserved.

---

## Assets

11. **Landslide disaster image generated**
    - `design-system/screens/genctx_icons/assets/landslide.jpg` created to complete the four natural-disaster cards (flood, typhoon, drought already existed).

---

## Open items / notes

- Monitoring Plan modal remains mangrove-only; the NbS Design summary reflects chosen activities across all three ecosystems. Confirm whether the project should be mangrove-only.
- Analysis-tab figures (areas, percentages, baselines) are self-consistent **sample data** — replace with real values when available.
- Generated landslide image is illustrative; swap for a real photo if available.

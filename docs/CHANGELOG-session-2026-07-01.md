# Change Log — NbS Tool Design (3.0)
**Session date:** July 1, 2026

## Setup
- Connected GitHub and imported the full `WRI-Indonesia/design-test-nbs` repo (164 files) into the project for editing.

## F05.0 — "Import Existing Project to NbS Tool" *(renamed from "Create New Project — From Scratch")*
- Retitled the page and rewrote the subtitle to frame it as the documentation flow for existing projects (upload SHP → define interventions → build monitoring metrics; generates project analysis + saves to My Projects dashboard). Later shortened it and set its width to 920px.
- **Added contextual upload error states** to Step 1, each styled to the design system with a distinct cause: *wrong file format* (red), *area > 500,000 ha* (amber), *outside South East Asia* (amber). Real file uploads auto-validate format; each error offers a reset action. Added a "Preview states" demo bar for reviewing states without uploading.
- **Rebuilt Step 3 to mirror F05 Step 1** — same grouped-by-pathway activity cards plus Ecosystem + Intervention filter chips (seeded from the pathways chosen in Step 2). Step 4 matrix now draws from the same shared data.

## F05 — "Create Monitoring Plan"
- **Step 3: added "Your NbS pathways" overview cards** above the ecosystem list — one per ecosystem, showing pathway pills (Protect/Manage/Restore, following user choices) and a prototype duration (random multiple of 5).
- **Ecosystem accordions now integrate the real Step 2 matrix** — only checked indicators, each with Benefit, Data source, and Monitoring frequency as edited.
- Clarified count label: "X selected" → "**X activities selected**".

## Shared / system-wide
- **Created `f05-shared.js`** as a single source of truth for NbS activity content + the activity-card UI, loaded by both F05 and F05.0 — edits now propagate to both pages automatically.
- **Swapped ecosystem logos** to the uploaded SVG assets (`eco-forest/mangrove/peatland.svg`) everywhere they appear on both pages (18 instances), sized per context.
- **Fixed a CSS bug** — moved the pathway group-header styles (`.pw-section-hd`) into shared `f05.css` so headers render consistently on both pages.

## F04 — Dashboard
- Renamed status tag "Waiting for MRV Plan" → "**Waiting for Monitoring Plan**" (2 instances).

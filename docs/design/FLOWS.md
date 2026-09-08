# FLOWS.md — user journeys

Derived from the actual link graph (`href`s in the nav, footer, breadcrumbs and CTAs), the
`data-step` state machines, and the `localStorage` handoffs between screens.

Screen IDs are from [SCREENS.md](SCREENS.md). `FLW-` IDs are stable.

**Convention in these diagrams.** Solid arrows are paths that exist in the code. **Dashed
arrows are branches that should exist but don't** — every one of them corresponds to a
`TODO(design)` in [UI-STATES.md](UI-STATES.md).

---

## FLW-01 · First load → region-level result

The primary journey: a visitor arrives, scopes an area, and reads its baseline.

```mermaid
flowchart TD
    A([Visitor arrives]) --> B[SCR-01 Home]
    B --> V{{"CMP-22 version modal<br/>localStorage: nbs-vu-seen"}}
    V -->|dismissed| B
    B -->|"CTA / nav"| C{Signed in?}

    C -->|"no session check exists"| D[SCR-03 Interactive Map]
    C -.->|"should gate"| E[SCR-02 Log in]
    E -.->|"no success path implemented"| D

    D --> S1["Step 1 · Choose analysis area<br/>draw / upload / Nominatim search"]
    S1 --> Q1{Area selected?}
    Q1 -->|no| S1
    Q1 -->|yes| CONF["Analyse the selected polygon?"]

    CONF -.->|"area &gt; 500,000 ha"| X1["/// Non-eligible: too large<br/>NOT CHECKED HERE ///"]
    CONF -.->|"outside South East Asia"| X2["/// Non-eligible: out of region<br/>NOT CHECKED HERE ///"]

    CONF -->|confirm| L["#mapLoading<br/>'Analysing the area'"]
    L -.->|"analysis fails"| X3["/// No failure exit —<br/>spinner runs forever ///"]
    L -->|success| S2

    S2["Step 2 · Site characterisation"] --> P{Which pane?}
    P --> P1[General]
    P --> P2[Nature]
    P --> P3["People<br/>js/people-context.js"]
    P --> P4[Climate]
    P1 & P2 & P3 & P4 --> S3

    S3["Step 3 · Threat profile<br/>+ NbS screening"] -.->|"a layer is missing"| X4["/// Renders as no-threat.<br/>Indistinguishable from<br/>assessed-and-clear ///"]
    S3 --> S4["Step 4 · Design NbS pathway"]
    S4 --> S5["Step 5 · Potential Benefit"]
    S5 --> R([Region-level result])

    R --> O1[SCR-04 Create project]
    R --> O2[SCR-07 Attach to project]

    classDef gap fill:#fdf6ea,stroke:#dc9d24,stroke-width:2px,color:#604113
    class X1,X2,X3,X4 gap
```

### Walkthrough

1. **SCR-01 Home.** Entry from a direct link, the coalition site, or search. On first visit
   CMP-22 fires over the page, gated by `localStorage` key `nbs-vu-seen`. If storage is
   unavailable it fires every time.
2. **The auth branch does not exist.** No screen performs a session check, so a visitor reaches
   SCR-03 whether or not they've been through SCR-02. Both dashed arrows are
   `TODO(design)`.
3. **SCR-03 Step 1.** Three ways to define an area: draw on the map, upload a boundary, or
   search a place through Nominatim (whose failure is silent — no `.catch()`). Confirmation
   runs through "Analyse the selected polygon?".
4. **The two eligibility branches are missing here.** SCR-04 rejects areas over 500,000 ha and
   outside South East Asia, with warning-toned copy that names the likely cause. SCR-03 applies
   neither rule. **The same product rule has two different answers depending on which door the
   user came through.**
5. **Analysing.** `#mapLoading` covers the map with a spinner and "Analysing the area". There is
   no timeout and no error branch — a failed analysis spins indefinitely.
6. **SCR-03 Step 2.** Four context panes switched by `nbsShowSitePane()`. People Context is
   rendered by a separate module with its own SVG charts. Every card carries a source-and-year
   line and an "i" affordance.
7. **SCR-03 Step 3.** Threats ranked by section; Overview shows every section. A missing layer
   is not distinguished from an assessed-and-clear one — the most consequential gap in the
   flow, because it changes what a user believes about their site.
8. **SCR-03 Step 4 → Step 5.** Pathway design feeds benefit estimation. Step 4 writes
   `localStorage` key `nbs_selected_activities`, which FLW-03 depends on.
9. **Exit.** Either create a project (SCR-04) or attach the result to an existing one (SCR-07).

**State is not addressable.** `data-step` lives only in the DOM. A reload restarts the flow and
a result cannot be bookmarked, linked or shared — which for a tool whose output is meant to
persuade a funder is a workflow problem, not a technical one. See CMP-05.

---

## FLW-02 · Intervention selection

Steps 4 and 5 in detail — where a site becomes a plan.

```mermaid
flowchart TD
    A["SCR-03 Step 3 complete<br/>threats + screening read"] --> B[Step 4 · Design your NbS pathway]

    B --> E{Choose ecosystem}
    E --> E1[Forest]
    E --> E2[Mangrove]
    E --> E3[Peatland]

    E1 & E2 & E3 -.->|"ecosystem absent from the drawn area"| XE["/// All three always offered,<br/>whatever the analysis found ///"]

    E1 & E2 & E3 --> I{Choose intervention}
    I --> I1[Protect]
    I --> I2[Manage]
    I --> I3[Restore]

    I1 & I2 & I3 --> ACT["buildActivitySectionsHTML(eco, intv)<br/>activity checkboxes"]
    ACT -.->|"combination has no activities"| XA["/// Empty section shell,<br/>no explanation ///"]

    ACT --> SEL["wireActivityCheckboxes(onChange)"]
    SEL --> LS[("localStorage<br/>nbs_selected_activities")]

    SEL --> B5[Step 5 · Potential Benefit]
    B5 --> CAT{Benefit category}
    CAT --> CARD["Flip-card<br/>front: summary · back: assessment"]
    CARD --> INFO["CMP-20 'i' modal<br/>definition + calculation method"]
    CARD -.->|"benefit not modelled<br/>for this pathway"| XB["/// Not modelled ///"]

    CARD --> OUT([Pathway + benefits defined])
    LS -.-> F3
    OUT --> F3[FLW-03 Monitoring plan]
    OUT --> P[SCR-04 / SCR-07 Create or attach project]

    classDef gap fill:#fdf6ea,stroke:#dc9d24,stroke-width:2px,color:#604113
    class XE,XA,XB gap
```

### Walkthrough

1. **Entry from SCR-03 Step 3.** The user has read the threat profile and screening overview.
2. **Ecosystem.** Forest, mangrove or peatland. **All three are always offered**, regardless of
   what the analysis found in the drawn area — so the tool will happily let someone plan
   mangrove restoration on a site with no mangrove. That's a credibility problem, and it's the
   most important dashed branch in this diagram.
3. **Intervention.** Protect, manage or restore. The pair (ecosystem, intervention) selects the
   activity set through `buildActivitySectionsHTML()`.
4. **Activities.** Rendered as checkboxes and wired by `wireActivityCheckboxes(onChange)`.
   Selection is written to `localStorage` under `nbs_selected_activities`.
5. **SCR-03 Step 5.** Benefit categories as flip-cards. Both faces are measured and the card
   sized to the taller, and each tab remembers its own scroll position — the most carefully
   engineered interaction in the analysis flow.
6. **The "i" modal** reads its content off the card markup itself (`[data-def]`, `.formula
   code`, `data-method`), so the card stays the single source of truth. Good pattern; see
   CMP-20.
7. **Exit.** Either into FLW-03 to build a monitoring plan, or into project creation.

**The handoff is fragile.** `nbs_selected_activities` is the only link between this flow and
SCR-08, and it is a browser-local key with no expiry, no versioning and no ownership. See
FLW-03.

---

## FLW-03 · Plan → monitor → verify

What happens after a pathway exists.

```mermaid
flowchart TD
    A[SCR-03 Step 4 selection] --> LS[("localStorage<br/>nbs_selected_activities")]
    LS --> B[SCR-08 Create Monitoring Plan]
    LS -.->|"key missing, cleared,<br/>or different browser"| XM["/// Renders empty,<br/>no explanation ///"]

    B --> B1[1 · Add monitoring indicator]
    B1 --> B2[2 · Review and edit indicators]
    B2 --> B3[3 · Adjust data source and frequency]
    B3 --> B4[4 · Assign responsible parties]
    B4 --> B5[5 · Add notes and evidence]
    B5 --> B6[6 · Download monitoring plan]

    B6 -.->|"indicators missing owner<br/>or frequency"| XI["/// Download not gated —<br/>an unexecutable plan<br/>can reach a funder ///"]
    B6 --> DOC([Monitoring plan document])

    DOC --> C[SCR-09 Monitoring Form]
    C --> C1["Indicator cards<br/>value + evidence"]
    C1 --> C2[("localStorage<br/>f0511_data")]
    C1 -.->|"evidence attachment"| XU["/// renderEvidence() renders,<br/>but there is no upload target ///"]
    C2 -.->|"quota exceeded"| XQ["/// save() is unguarded —<br/>entry lost silently ///"]

    C1 --> C3[Review step]
    C3 --> M{"CMP-20 confirm modal"}
    M -->|Keep editing| C1
    M -->|Confirm and submit| D[SCR-10 MRV Dashboard]

    D -.->|"no submissions yet"| XE2["/// Empty panels,<br/>no first-run state ///"]
    D --> V([Verification status])
    V -.->|"how old is this?"| XS["/// No 'as of' date<br/>on any status ///"]

    classDef gap fill:#fdf6ea,stroke:#dc9d24,stroke-width:2px,color:#604113
    class XM,XI,XU,XQ,XE2,XS gap
```

### Walkthrough

1. **The handoff.** SCR-08 reads `nbs_selected_activities`. If the user opens the screen
   directly, cleared their storage, or switched browser, the wizard renders with no indicators
   and no explanation. This will happen constantly in real use.
2. **SCR-08 steps 1–5.** Indicators, then source and frequency, then responsible parties, then
   notes and evidence. Indicator metadata (methodology, sampling frequency) comes from
   `js/f05-shared.js`.
3. **SCR-08 step 6 — download.** Builds a print-ready document inline. **Nothing gates
   completeness**: an indicator with no responsible party produces a plan nobody can execute,
   and the document downloads anyway.
4. **SCR-09 Monitoring Form.** Field entry against the plan's indicators, with per-group filled
   counts. Values persist to `localStorage` under `f0511_data`.
5. **Two data-loss paths.** `save()` has no try/catch, so a quota error loses the entry
   silently; and `renderEvidence(id)` renders attachments that have nowhere to upload to. On the
   screen most likely to be used offline, in the field, recording observations that cannot be
   repeated.
6. **Submit.** A confirmation modal states how many of the total indicators are filled, then
   goes to SCR-10.
7. **SCR-10 MRV Dashboard.** Verification status and results — with no first-run state (every
   project starts here empty) and no date on any status.

---

## FLW-04 · Non-eligible and missing-data branches

The two branches that decide whether this tool is trustworthy, collected in one place because
they are handled inconsistently across the product.

```mermaid
flowchart TD
    A([User supplies an area]) --> R{Which door?}

    R -->|"SCR-04 · file upload"| U["showUploadError(type, name)"]
    R -->|"SCR-03 · draw on map"| M["No eligibility check"]

    U --> U1{Validate}
    U1 -->|"unreadable file"| E1["tone: danger<br/>'We couldn't read this file'<br/>+ accepted formats<br/>+ retry / requirements"]
    U1 -->|"&gt; 500,000 ha"| E2["tone: WARNING<br/>'Project area exceeds<br/>the 500,000 ha limit'<br/>+ split into sub-boundaries"]
    U1 -->|"outside South East Asia"| E3["tone: WARNING<br/>'This area is outside<br/>South East Asia'<br/>+ 'check your CRS'"]
    U1 -->|valid| OK1([Site Characterisation generated])

    M -.->|"should reject: too large"| E2
    M -.->|"should reject: out of region"| E3
    M --> OK2([Analysis proceeds regardless])

    OK1 & OK2 --> L{All layers available?}
    L -->|yes| D([Full result])
    L -.->|"some layers missing"| P["/// Missing layers are simply<br/>absent — a user reads this<br/>as 'assessed, nothing found' ///"]

    classDef good fill:#e9f8f1,stroke:#1f945c,stroke-width:2px,color:#104a2e
    classDef gap fill:#fdf6ea,stroke:#dc9d24,stroke-width:2px,color:#604113
    class E1,E2,E3 good
    class M,P gap
```

### Walkthrough

1. **Two doors, one rule, two answers.** An area over 500,000 ha or outside South East Asia is
   rejected on upload (SCR-04) and accepted on the map (SCR-03).
2. **The upload path is the model.** Note what it does right: **`area` and `region` are
   `tone: 'warning'`, not `danger`.** Being out of scope is a product rule, not a user error,
   and the UI says so in colour before it says so in words. The `region` case even names the
   probable cause — a wrong CRS placing a valid site outside the region.
3. **The map path does neither check.** Fix by applying both rules at confirm time and reusing
   the SCR-04 copy verbatim, so the two doors give the same answer in the same words.
4. **Missing layers are the quieter problem.** Absent is not the same as zero. Anywhere a layer
   could be unavailable, it must render an explicit "Not assessed" marker in its own place.
   Hiding it converts "we don't know" into "there's nothing there".

`TODO(design): unify the eligibility rules across SCR-03 and SCR-04 — same thresholds, same tone, same copy.` **Blocking.**
`TODO(design): specify the "Not assessed" treatment for a missing layer, distinct from a zero result, and apply it in Steps 2, 3 and 5.` **Blocking.**

---

## FLW-05 · Account and settings

Included because it contains the only real network path in the product.

```mermaid
flowchart TD
    A[Any screen] --> N["CMP-01 profile dropdown"]
    N --> S[SCR-11 Account Settings]

    S --> P1["#profile · personal identity"]
    S --> P2["#password"]
    S --> P3["#org · organization info"]

    P1 --> AV["syncAvatar()<br/>initials follow the name fields"]
    P2 --> PW["recalcStrength() · checkMatch()<br/>live inline validation"]
    P2 --> FP["Forgot password → send reset link"]
    P1 --> EV["openVerify() → CMP-25 OTP<br/>auto-advance · paste · resend countdown"]
    EV --> MV["markVerified()"]

    P3 --> CC["CMP-26 country → province → city"]
    CC --> API{"fetch() live API"}
    API -->|ok| FILL["fillSelect()"]
    API -->|fails| FB["provincesFallback()<br/>cityStaticFallback()"]
    FB -.->|"silent — user isn't told<br/>they're on a reduced list"| XF["/// Degrades correctly,<br/>says nothing ///"]

    FILL & FB --> SAVE["wireSave() → flashSaved()"]
    SAVE -.->|"unconditional 'Saved'<br/>— no request is made"| XS["/// Confirms a save<br/>that didn't happen ///"]

    classDef gap fill:#fdf6ea,stroke:#dc9d24,stroke-width:2px,color:#604113
    class XF,XS gap
```

### Walkthrough

1. **Entry** from the profile dropdown on any signed-in screen.
2. **Three sections** with a scroll-spy rail: identity, password, organisation.
3. **Password** has live strength and match checking — the best inline validation in the
   product.
4. **Email verification** runs the OTP flow (CMP-25): auto-advance, backspace, paste support and
   a resend countdown. The most complete interaction in the codebase.
5. **The location cascade** is the only genuine third-party dependency, and the only place a
   network failure is handled: it falls back to static lists. It does so silently, though — a
   user seeing five provinces instead of thirty-eight has no idea why.
6. **Every save flashes "Saved" unconditionally.** No request is made, so none can fail. When a
   backend lands these must become pending → success → failure; confirming a save that didn't
   happen is worse than not confirming at all.

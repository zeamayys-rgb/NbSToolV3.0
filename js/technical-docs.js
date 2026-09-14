/* ============================================================================
   technical-docs.js — F09 Technical Documentation

   The in-app rendering of "Data & methodology documentation — Nature-based
   Solutions triple benefits assessment" (SCeNe Coalition, NbS Tool Substance
   Team, last updated 26 August 2026). The article order, the section numbers
   and the tables follow that document so the two can be read side by side.

   TWO SOURCES, NEVER MIXED
   1. METHOD — transcribed from the methodology document. Every constant, rate,
      class table, decision row, formula, citation and disclaimer on these pages
      comes from it. A method statement must not follow the build: it is the
      fixed reference the build is measured against. Section numbers are quoted
      (e.g. "§8.4.3") so any figure can be traced back to its source paragraph.
   2. SITE FIGURES — read live from the objects the product itself renders from.
      `readLiveParameters()` reads them at page load:
          NBS_DATA        (js/analysis-shared.js)  — AOI and ecosystem areas
          NBS_ANALYSIS    (js/analysis-shared.js)  — the rendered benefit cards,
                                                     parsed for methods, metrics,
                                                     formulas and carbon rates
          NBS_LAYER_INFO  (js/analysis-shared.js)  — the dataset catalogue
          ecosystems / indicatorMeta (js/f05-shared.js) — activity & indicator matrix
          NBS_PEOPLE      (js/people-context.js)   — People Context per country
      Every site figure comes from docParam(). If a value cannot be read, the
      page prints a visible TODO instead of a plausible-looking constant.

   Where the source document contradicts itself, the contradiction is reported
   on the page rather than silently resolved — see the CRS note in "Analysis
   conventions" and the buffer note in "Climate benefits".
   See DEC-21 (live parameters), DEC-24 (this transcription), DEC-25 (GUI copy removed).
   ============================================================================ */

const TECH_DOCS = {
  loaded: false,
  active: 'introduction',
  params: null,
  tocObserver: null,
  articles: [
    { id:'introduction',   group:'Start here',      label:'Introduction & the SCeNe Coalition', keywords:'introduction scene coalition nbs tool purpose frontline organisation investor pre-feasibility asean gtf members birdlife conservation international mandai recoftc tnc wcs wwf wri zsl overview start' },
    { id:'how-it-works',   group:'Start here',      label:'How the NbS Tool works',             keywords:'how it works five phases chain phase select location site characterisation threat profile pathway benefit feedback loop result file' },
    { id:'scope',          group:'Scope',           label:'Region, ecosystems & pathways',      keywords:'scope region countries southeast asia eleven ecosystem dryland forest mangrove peatland savanna guardrail time frame 2014 2024 pathway protect manage restore cook-patton asean mrv framework' },
    { id:'landcover',      group:'Scope',           label:'Land cover classes',                 keywords:'land cover classes rlcms servir alphaearth twenty classes aquaculture barren cropland plantation deciduous evergreen flooded forest grass mangrove mixed oil palm rice rubber shrub settlement water wetlands snow other land' },
    { id:'conventions',    group:'Scope',           label:'Analysis conventions',               keywords:'conventions projection equal area esri 54034 54043 reprojection mixed site area weighted distribution screening instrument uncertainty' },
    { id:'phase1',         group:'The five phases', label:'Phase 1 · Select location',          keywords:'phase 1 select location aoi area of interest boundary polygon upload identifier minimum area cell resolution duration' },
    { id:'phase2',         group:'The five phases', label:'Phase 2 · Site characterisation',    keywords:'phase 2 site characterisation general context nature climate people groups layers puyravaud deforestation rate reference layer area of habitat root to shoot soil organic carbon' },
    { id:'phase3',         group:'The five phases', label:'Phase 3 · Threat profile',           keywords:'phase 3 threat profile disturbance drivers canopy height deficit peatland drainage canal astiani wedeux natural hazard risk flood landslide typhoon drought fire' },
    { id:'phase4-state',   group:'The five phases', label:'Phase 4a · Ecological state & trajectory', keywords:'phase 4 ecological state c1 c2 c3 c4 c5 c6 trajectory ten categories reference ecosystem potential natural vegetation forest savanna peat mangrove transition matrix' },
    { id:'phase4-matrix',  group:'The five phases', label:'Phase 4a · Decision matrix',         keywords:'decision matrix seventeen rows cat 1 cat 10 3a 3b 4a 4b 8a 8b 8c 9a 9b 9c 9d pathway assignment protect manage restore carbon ineligible' },
    { id:'phase4-pathways',group:'The five phases', label:'Phase 4a · Protect, Manage, Restore, Ineligible', keywords:'protect manage restore ineligible eligibility avoided deforestation silvofishery paludiculture arr additionality plantation settlement savanna guardrail' },
    { id:'phase5',         group:'The five phases', label:'Phase 5 · Potential benefit',        keywords:'phase 5 potential benefit summary shared projection puyravaud exponential ranked allocation risk pillar general unique quantified qualitative' },
    { id:'benefit-nature', group:'Benefit detail',  label:'Nature benefits',                    keywords:'nature connectivity mspa guidostoolbox watershed biodiversity habitat loss avoided iucn star threatened species condition uplift sd vista' },
    { id:'benefit-people', group:'Benefit detail',  label:'People benefits',                    keywords:'people qualitative tenure food water security livelihood social capital governance benefit sharing cultural heritage watershed erosion' },
    { id:'benefit-climate',group:'Benefit detail',  label:'Climate benefits & carbon',          keywords:'climate carbon constants carbon fraction 0.47 root shoot 0.28 co2 44 12 avoided emissions redd sequestration arr stocking factor leakage uncertainty buffer net err microclimate hazard resilience' },
    { id:'annex-general',  group:'Annex A · Layers',label:'A.1 General context layers',         keywords:'annex general context gadm administrative protected area wdpa land cover 2024 forest cover deforestation risk forestatrisk elevation srtm slope ecosystem type natural disaster risk adpc' },
    { id:'annex-nature',   group:'Annex A · Layers',label:'A.2 Nature layers',                  keywords:'annex nature flii forest landscape integrity area of habitat aoh gbif key species key biodiversity area kba conservation significance naturemap ecological connectivity mspa endangered tree species' },
    { id:'annex-climate',  group:'Annex A · Layers',label:'A.3 Climate layers',                 keywords:'annex climate above ground biomass gedi below ground biomass soil organic carbon soilgrids worldclim temperature precipitation burned area gabam fire susceptibility soil groups wrb' },
    { id:'annex-people',   group:'Annex A · Layers',label:'A.4 People layers',                  keywords:'annex people worldpop gridded population age sex structure dependency ratio climate vulnerability adpc national socio-economic indicators bps dosm psa nso gso' },
    { id:'annex-threat',   group:'Annex A · Layers',label:'A.5 Threat profile layers',          keywords:'annex threat ecosystem disturbance screening canopy height deficit drivers slagter fire viirs peatland drainage canal dadap astiani wedeux water table' },
    { id:'annex-pathway',  group:'Annex A · Layers',label:'A.6 Pathway layers',                 keywords:'annex pathway forest cover trajectory transition category nbs pathway raster three bands band 1 band 2 band 3 reference ecosystem decision row cook-patton asean mrv' },
    { id:'limits',         group:'Checks & limits', label:'Limitations & how to read a figure', keywords:'limitations uncertainty caveats disclaimer validation field verification screening not certified sample data error propagation resolution vintage' },
    { id:'reference',      group:'Reference',       label:'Parameters, formulas & glossary',    keywords:'reference parameters constants formulas worked example arithmetic lookup table glossary aoi mrv tco2e net err' }
  ]
};

/* Source document, named once so every citation on the page agrees. */
const METHOD_DOC = 'Data &amp; methodology documentation — Nature-based Solutions triple benefits assessment';
const METHOD_DOC_DATE = '26 August 2026';
const METHOD_DOC_LABEL = 'methodology documentation';

/* ---------------------------------------------------------------- formatters */
const docN    = v => Number.isFinite(+v) ? +v : 0;
const docFmt  = (v, d = 0) => Number(v || 0).toLocaleString('en-US', { maximumFractionDigits: d });
const docPct  = (v, d = 1) => `${docFmt(Number(v || 0) * 100, d)}%`;
const docSlug = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const docEsc  = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

/* A missing value is shown, never guessed. */
const docTodo = what => `<span class="doc-todo">TODO: ${docEsc(what)}</span>`;

/* Safe deep-get into the live parameters read at load time. */
const docParam = (path, fallback = docTodo('value not published by the app')) => {
  let x = TECH_DOCS.params;
  for (const part of String(path).split('.')) x = (x == null ? x : x[part]);
  return x == null ? fallback : x;
};
/* Numeric variant: formats, or prints a TODO rather than a zero. */
const docNum = (path, d = 0) => {
  const v = docParam(path, null);
  return v == null || !Number.isFinite(+v) ? docTodo(`${path} not readable`) : docFmt(v, d);
};

/* Accessibility baseline: never animate scrolling for a reader who asked us not to. */
const docScrollBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

/* ------------------------------------------------------------ html builders */
function docSection(title, body, id = '') {
  return `<section class="doc-section" id="${id || docSlug(title)}"><h2>${title}</h2>${body}</section>`;
}
function docHero(kicker, title, intro, meta = []) {
  return `<div class="doc-breadcrumb"><span>Technical Documentation</span><i></i><span>${title}</span></div>` +
         `<header class="doc-hero"><span class="doc-kicker">${kicker}</span><h1>${title}</h1><p>${intro}</p>` +
         `<div class="doc-meta">${meta.map(x => `<span>${x}</span>`).join('')}</div></header>`;
}
function docCallout(label, body, tone = '') {
  return `<aside class="doc-callout ${tone}"><span>${label}</span><p>${body}</p></aside>`;
}
function docEquation(eq, note = '') {
  return `<div class="doc-equation"><code>${eq}</code>${note ? `<small>${note}</small>` : ''}</div>`;
}
/* A citation that goes somewhere: target is "<article-id>" or "<article-id>#<section-id>". */
const docJump = (label, target) =>
  `<button type="button" class="doc-jump" data-doc-jump="${target}">${label}</button>`;

function docTable(headers, rows) {
  return `<div class="doc-table-wrap"><table class="doc-table"><thead><tr>${
    headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${
    rows.map(r => `<tr>${r.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function docFlow(steps) {
  return `<div class="doc-flow">${steps.map((s, i) =>
    `${i ? '<div class="arrow" aria-hidden="true">&rarr;</div>' : ''}<div class="step"><span>${s[0]}</span><strong>${s[1]}</strong>${s[2] ? `<small>${s[2]}</small>` : ''}</div>`
  ).join('')}</div>`;
}
function docExample(title, body, result = '') {
  return `<div class="doc-example"><header><span>EXAMPLE</span><strong>${title}</strong></header>${body}${
    result ? `<div class="result">${result}</div>` : ''}</div>`;
}
/* A citation line under a table, naming the source document section it came
   from. Every method table on this page carries one. */
function docSource(ref) {
  return `<p class="doc-source">Source: ${METHOD_DOC_LABEL}, ${ref}.</p>`;
}
function docDetails(title, body) {
  return `<details class="doc-details"><summary>${title}</summary><div>${body}</div></details>`;
}

/* One Annex A layer record. The field order is the source document's own:
   why it matters, citation, attributes, sources, pre-processing, method,
   QA/QC, where it appears, disclaimer. Any field left out is simply not
   printed — the annex leaves several QA/QC cells blank and this reproduces
   that rather than inventing a line to fill it. */
const LAYER_FIELDS = [
  ['why',        'Why this layer matters'],
  ['citation',   'Data / methodology citation'],
  ['attributes', 'Attribute, categories and class'],
  ['sources',    'Data sources'],
  ['prep',       'Pre-processing'],
  ['method',     'Method / algorithm'],
  ['qa',         'QA / QC'],
  ['screen',     'Appears in the NbS Tool'],
  ['limits',     'Disclaimer']
];
function docLayer(name, indicator, f) {
  const body = `<p><strong>What it reports.</strong> ${indicator}</p>` + LAYER_FIELDS
    .filter(([k]) => f[k])
    .map(([k, label]) => `<p><strong>${label}.</strong> ${f[k]}</p>`)
    .join('');
  return docDetails(name, body);
}
/* ============================================================================
   LIVE PARAMETERS — read once, from the same objects the product renders from.
   ========================================================================== */
function readLiveParameters() {
  const p = {};
  const g = name => (typeof window !== 'undefined' && window[name] != null) ? window[name] : undefined;

  /* --- 1. Area of interest & ecosystem areas (NBS_DATA) --- */
  const D = g('NBS_DATA') || (typeof NBS_DATA !== 'undefined' ? NBS_DATA : null);
  if (D) {
    p.aoi = {
      total: D.aoi, nonEligible: D.nonEligible, eligible: D.totalEligible,
      disturbed: D.totalDisturbed, duration: D.duration
    };
    p.eco = D.eco;
  }

  /* --- 2. Dataset catalogue (NBS_LAYER_INFO) --- */
  const L = g('NBS_LAYER_INFO') || (typeof NBS_LAYER_INFO !== 'undefined' ? NBS_LAYER_INFO : null);
  if (L) p.layers = Object.keys(L).map(k => Object.assign({ key: k }, L[k]));

  /* --- 3. Benefit cards, methods and formulas, parsed out of the very HTML
           the Data Analyser renders. Parsing the product's own output is what
           keeps this page from drifting away from it. --- */
  const A = g('NBS_ANALYSIS') || (typeof NBS_ANALYSIS !== 'undefined' ? NBS_ANALYSIS : null);
  if (A && A['benefit-content']) {
    const dom = new DOMParser().parseFromString(A['benefit-content'], 'text/html');
    p.benefits = [...dom.querySelectorAll('.scard')].map(c => ({
      name:        c.querySelector('.card-tt h3')?.textContent.trim() || '',
      pathways:    [...c.querySelectorAll('.pw')].map(x => x.textContent.trim()),
      metric:      c.querySelector('.mnum')?.textContent.trim() || '',
      unit:        c.querySelector('.munit')?.textContent.trim() || '',
      metricLabel: c.querySelector('.metric-lab')?.textContent.trim() || '',
      method:      c.getAttribute('data-method') || '',
      formula:     c.querySelector('.formula code')?.textContent.trim() || ''
    })).filter(b => b.name);

    /* Carbon deduction chain: read the two "Net = Gross − …" formula blocks. */
    const NET = /Gross\s*([\d,.]+)\s*\D+?Leakage\s*([\d,.]+)\s*\D+?Uncertainty\s*([\d,.]+)\s*\D+?Buffer\s*([\d,.]+)\s*=\s*([\d,.]+)/;
    const toN = s => Number(String(s).replace(/,/g, ''));
    const carbon = {};
    p.benefits.forEach(b => {
      const m = b.formula && NET.exec(b.formula);
      if (!m) return;
      const row = { gross: toN(m[1]), leakage: toN(m[2]), uncertainty: toN(m[3]), buffer: toN(m[4]), net: toN(m[5]) };
      if (/emissions reduction/i.test(b.name)) carbon.avoided = row;
      else if (/sequestration/i.test(b.name)) carbon.sequestration = row;
    });
    const ha = p.aoi && p.aoi.eligible;
    ['avoided', 'sequestration'].forEach(k => {
      const r = carbon[k];
      if (!r || !ha) return;
      r.perHa            = r.gross / ha;
      r.netPerHa         = r.net / ha;
      r.leakageShare     = r.gross ? r.leakage / r.gross : null;
      r.uncertaintyShare = r.gross ? r.uncertainty / r.gross : null;
      r.bufferShare      = r.gross ? r.buffer / r.gross : null;
      r.netShare         = r.gross ? r.net / r.gross : null;
    });

    /* Stock and annual rates are declared only in the analyser's own
       assumptions note. Parsed, not retyped — if the note is reworded these
       read as TODO rather than silently going stale. */
    const disc = dom.querySelector('.disc-body');
    const txt  = disc ? disc.textContent.replace(/\s+/g, ' ') : '';
    const grab = (re, i = 1) => { const m = re.exec(txt); return m ? Number(m[i]) : null; };
    carbon.forestStockTCha   = grab(/forest stock of ~?([\d.]+)\s*tC\/ha/i);
    carbon.deforestationRate = grab(/([\d.]+)\s*%\/yr avoided deforestation/i);
    carbon.restoreRate       = grab(/sequestration of ([\d.]+)\s*\(Restore\)/i);
    carbon.manageRate        = grab(/\/\s*([\d.]+)\s*\(Manage\)/i);
    carbon.assumptionsNote   = disc ? [...disc.querySelectorAll('p')].map(x => x.outerHTML).join('') : '';
    p.carbon = carbon;
  }

  /* --- 4. Activity / benefit / indicator matrix (f05-shared.js) --- */
  const E = g('ecosystems') || (typeof ecosystems !== 'undefined' ? ecosystems : null);
  const M = g('indicatorMeta') || (typeof indicatorMeta !== 'undefined' ? indicatorMeta : null);
  if (E) {
    const acts = E.flatMap(e => e.activities.map(a => Object.assign({ eco: e.name }, a)));
    const benefitNames = new Set(), indNames = new Set(), pathways = new Set();
    acts.forEach(a => {
      pathways.add(a.pw);
      a.benefits.forEach(b => { benefitNames.add(b.benefit); b.inds.forEach(i => indNames.add(i)); });
    });
    p.matrix = {
      ecosystems: E.map(e => ({ id: e.id, name: e.name, activities: e.activities.length })),
      ecosystemCount: E.length,
      activityCount: acts.length,
      benefitCount: benefitNames.size,
      indicatorCount: indNames.size,
      pathways: [...pathways],
      byPathway: [...pathways].map(pw => ({ pw, n: acts.filter(a => a.pw === pw).length })),
      categories: [...new Set(acts.flatMap(a => a.benefits.map(b => b.cat)))],
      activities: acts
    };
  }
  if (M) {
    const freq = {};
    Object.values(M).forEach(m => { freq[m.freq] = (freq[m.freq] || 0) + 1; });
    p.indicators = { total: Object.keys(M).length, frequencies: freq, meta: M };
  }

  /* --- 5. People Context (people-context.js) --- */
  const P = g('NBS_PEOPLE') || (typeof NBS_PEOPLE !== 'undefined' ? NBS_PEOPLE : null);
  if (P && P.DATA) {
    const countries = P.ORDER.filter(n => P.DATA[n]);
    p.people = {
      countries,
      countryCount: countries.length,
      granularity: countries.map(n => ({ country: n, gran: P.DATA[n]?.demo?.hh?.gran || '', src: P.DATA[n]?.demo?.hh?.src || '' })),
      vulnDimensions: ['Physical', 'Environmental', 'Economic', 'Social']
    };
  }
  return p;
}


/* ============================================================================
   ARTICLES — transcribed from the methodology document, section by section.
   ========================================================================== */

/* ------------------------------------------------------------ 1 Introduction */
function docsIntroduction() {
  return docHero('START HERE', 'Introduction and the SCeNe Coalition',
    'The NbS Tool is an online spatial platform built by the SCeNe Coalition so that a project developer or an investor can make an initial assessment of a site in Southeast Asia: what is there, what is happening to it, what kind of Nature-based Solution it can take, and what triple benefits — for nature, people and climate — that intervention might deliver. This documentation describes the method behind those answers.',
    ['Method documentation', `Source updated ${METHOD_DOC_DATE}`, 'Screening, not feasibility']) +

  docSection('1.1 &mdash; The SCeNe Coalition', `
    <p>The <strong>Southeast Asia Climate and Nature-based Solutions (SCeNe) Coalition</strong> is a collaboration between leading non-governmental organisations with an established presence in Southeast Asia. Its purpose is to accelerate and increase the implementation of, and investment in, high-quality, high-integrity, triple-benefit Nature-based Solutions across the region.</p>
    <p>Southeast Asia is facing unprecedented demand for carbon credits, and with it an unparalleled opportunity to direct climate finance towards projects that deliver not only climate outcomes but outcomes for biodiversity and for people as well.</p>
    <h3>The Coalition's four aims</h3>
    <ol>
      <li>Demonstrate what quality NbS for Climate looks like in Southeast Asia.</li>
      <li>Direct carbon finance and other climate finance towards just and equitable climate mitigation and adaptation, and the conservation of biodiversity and critical habitat in Southeast Asia.</li>
      <li>Accelerate and scale up high-integrity demand for, and supply of, NbS for Climate in Southeast Asia.</li>
      <li>Ensure the growth of NbS for Climate genuinely delivers positive impacts for climate, nature and equitable benefits for local people &mdash; the <strong>triple benefits</strong>.</li>
    </ol>
    <h3>Members and partners</h3>
    ${docTable(['Group', 'Organisations'], [
      ['<strong>Coalition members</strong>', 'BirdLife International · Conservation International · Mandai Nature · RECOFTC · The Nature Conservancy · Wildlife Conservation Society · Worldwide Fund for Nature Singapore (WWF Singapore) · Yayasan Institut Sumber Daya Dunia (World Resources Institute) Indonesia · Zoological Society of London (ZSL)'],
      ['<strong>Technical experts</strong>', 'Asian Disaster Preparedness Center (ADPC) · Nanyang Technological University (NTU) · Spatial Informatics Group&ndash;Natural Assets Laboratory (SIG-NAL), together with NbS, geospatial, biodiversity and financing experts from across Southeast Asia'],
      ['<strong>Funder</strong>', 'ASEAN&ndash;UK Green Transition Fund (GTF)'],
      ['<strong>Consultation</strong>', 'The ASEAN Secretariat and ASEAN Member States (AMS)']
    ])}
    ${docCallout('Launch', 'NbS Tool Version 3 is planned for launch in <strong>December 2026</strong>.', 'note')}`,
    'scene-coalition') +

  docSection('1.2 &mdash; What the NbS Tool is for', `
    <p>The tool serves two audiences, and it answers a different question for each.</p>
    ${docTable(['Audience', 'What the tool gives them'], [
      ['<strong>Project developers</strong>, especially frontline organisations (FOs)',
       'The generation of a pre-feasibility assessment document: a comprehensive overview of existing conditions at the project location, plus preliminary insight into the potential triple benefits of a proposed pathway or intervention type. This matters because frontline organisations often have limited capacity to carry out initial spatial assessments of their own.'],
      ['<strong>Investors</strong>',
       'Insight into the potential costs and revenue associated with a planned NbS project, so that projects with the potential to deliver optimal triple benefits can be evaluated and selected with confidence.']
    ])}
    ${docCallout('An initial assessment, not a pre-feasibility study', 'The information the NbS Tool generates serves as an <strong>initial assessment only</strong>. It is not intended to replace a comprehensive pre-feasibility study. It is a foundation for more detailed work &mdash; field observation and more detailed spatial data sources &mdash; that refines the understanding of a project&rsquo;s potential.', 'warn')}`,
    'what-the-tool-is-for') +

  docSection('About this documentation', `
    <p>These pages reproduce the Coalition&rsquo;s methodology document so the method can be read inside the product it describes.</p>
    ${docTable(['Field', 'Value'], [
      ['<strong>Title</strong>', METHOD_DOC],
      ['<strong>Owners</strong>', 'SCeNe Coalition'],
      ['<strong>Contributors</strong>', 'NbS Tool Substance Team'],
      ['<strong>Reviewers</strong>', 'Coalition members'],
      ['<strong>Last updated</strong>', METHOD_DOC_DATE],
      ['<strong>Status</strong>', 'Draft / under review'],
      ['<strong>Category</strong>', 'Documentation'],
      ['<strong>Related material</strong>', 'Spatial Data Catalog (<em>NbS Tool V3 Data Management</em>) · Figma: NbS Tool V3 Design · Version 1: NbS Tool V1']
    ])}
    ${docCallout('How to read the numbers on these pages', 'Constants, rates, class definitions and formulas are <strong>transcribed from the methodology document</strong> and cite their section number. Figures describing <em>this</em> project area &mdash; hectares, ecosystem shares, carbon totals &mdash; are read live from the same data the analysis screens render from. Where a value cannot be read, the page prints a visible TODO rather than a plausible constant.', 'note')}`,
    'about-this-documentation');
}

/* ------------------------------------------------- 3 How the NbS Tool works */
function docsHowItWorks() {
  return docHero('START HERE', 'How the NbS Tool works',
    'The tool runs in five phases. Each phase feeds the next, so nothing can be produced without the phases before it. Phase 4 produces two things — the pathway and the activity list — and the method treats them as two sections, because the logic behind them is different.',
    ['Five phases', 'One feedback loop', 'Re-runnable per phase']) +

  docSection('The five phases', `
    ${docFlow([
      ['PHASE 1', 'Select location',       'A boundary on an equal-area grid'],
      ['PHASE 2', 'Site characterisation', 'What is here'],
      ['PHASE 3', 'Threat profile',        'What is happening to it'],
      ['PHASE 4', 'Pathway selection',     'What intervention the land can take'],
      ['PHASE 5', 'Potential benefit',     'What the project would deliver']
    ])}
    ${docTable(['Phase', 'Name', 'What happens', 'What comes out'], [
      ['<strong>1</strong>', '<strong>Select location</strong>',
       'The user draws or uploads a polygon and sets the project duration.',
       'A project boundary, called the area of interest (AOI), on an equal-area grid.'],
      ['<strong>2</strong>', '<strong>Site characterisation</strong>',
       'The tool clips every spatial layer to the AOI and reports what is there, in four groups: general context, nature, climate and people.',
       'A description of the site as area-weighted distributions, never a single label.'],
      ['<strong>3</strong>', '<strong>Threat profile</strong>',
       'The tool reports what is happening to the site: how much is disturbed, what is driving it, drainage pressure on peat, and natural hazard risk.',
       'Disturbed area by ecosystem, a driver breakdown, and hazard levels.'],
      ['<strong>4</strong>', '<strong>Pathway selection</strong>',
       'The tool compares land cover in 2014 with 2024, reads the reference ecosystem, and assigns every pixel to Protect, Manage, Restore or Carbon ineligible.',
       'Area and share under each pathway, and the pathway raster.'],
      ['<strong>5</strong>', '<strong>Potential benefit</strong>',
       'The tool reports the benefits the selected activities are expected to deliver, in three pillars, and quantifies carbon.',
       'A benefit profile for nature, people and climate, plus gross and net carbon figures.']
    ])}
    ${docSource("Table 3")}`,
    'five-phases') +

  docSection('Two properties of the chain', `
    <p><strong>It is one-directional, with one feedback loop.</strong> Site characterisation and the threat profile inform the pathway; the pathway and the reference ecosystem select the activity; the activity determines the benefit. The single loop back is the threat profile, which is read again at the benefit stage to decide which climate-hazard and species components can be quantified.</p>
    ${docFlow([
      ['INFORM', 'Site & threat', 'Phases 2 and 3'],
      ['SELECT', 'Pathway + reference', 'Phase 4a'],
      ['SELECT', 'Activity', 'Phase 4b'],
      ['DETERMINE', 'Benefit', 'Phase 5'],
      ['LOOP BACK', 'Threat profile', 'Gates hazard and species components']
    ])}
    <p><strong>Every phase writes a result file keyed to the AOI.</strong> A phase can therefore be re-run without re-running the ones before it, and a saved result carries the inputs it was produced with, including the project duration.</p>`,
    'chain-properties') +

  docSection('What the tool computes, and what it only reports', `
    <p>Three different kinds of output appear on the analysis screens, and it matters which is which.</p>
    ${docTable(['Kind of output', 'How it is produced', 'Example'], [
      ['<strong>Derived</strong>', 'Calculated inside the tool from the site area and published rates', 'Projected forest loss, avoided emissions, carbon removals, habitat loss avoided'],
      ['<strong>Read and reported</strong>', 'Clipped from a named external layer and tabulated as an area-weighted distribution', 'Land cover shares, population, vulnerability class, soil group'],
      ['<strong>Qualitative</strong>', 'A benefit tag attached to a selected activity, with no number, because no defensible spatial method exists yet', 'Watershed function, cultural heritage, benefit sharing']
    ])}
    ${docCallout('A benefit without a number is not a weaker benefit', 'It is one for which the tool has no defensible spatial method yet. The interface marks which is which, and the People pillar is deliberately qualitative throughout &mdash; see <em>People benefits</em>.', 'note')}`,
    'derived-vs-reported') +

  docSection('The figures this build is showing', `
    <p>This page never hard-codes a site figure. It reads the same shared objects the product renders from, at the moment the page loads. The current reading is:</p>
    ${docTable(['Parameter', 'Value', 'Read from'], [
      ['Area of interest', `${docNum('aoi.total')} ha`, '<code>NBS_DATA.aoi</code>'],
      ['Eligible ecosystem area', `${docNum('aoi.eligible')} ha`, '<code>NBS_DATA.totalEligible</code>'],
      ['Project duration', `${docNum('aoi.duration')} years`, '<code>NBS_DATA.duration</code>'],
      ['Ecosystems in the activity matrix', docNum('matrix.ecosystemCount'), '<code>ecosystems</code> (f05-shared)'],
      ['NbS activities', docNum('matrix.activityCount'), '<code>ecosystems[].activities</code>'],
      ['Distinct monitoring indicators', docNum('indicators.total'), '<code>indicatorMeta</code>'],
      ['Countries with People Context', docNum('people.countryCount'), '<code>NBS_PEOPLE.DATA</code>']
    ])}
    ${docCallout('Illustrative sample data', 'Every site figure in this build describes one worked example area. It demonstrates that the method runs end to end. It is not a measurement of anywhere, and it must not be quoted, screenshotted into a proposal, or presented to a partner as a finding.', 'warn')}`,
    'live-parameters');
}

/* ------------------------------------- 2.1 Region, ecosystems, time frame */
function docsScope() {
  return docHero('SCOPE', 'Region, ecosystems and pathways',
    'Three decisions bound everything the tool can say: where it works, which ecosystems it recognises, and which interventions it is willing to recommend. This page sets out all three, together with the reasoning the methodology document gives for each.',
    ['11 countries', '3 ecosystems + 1 guardrail', '2014 &rarr; 2024']) +

  docSection('2.1 &mdash; Region', `
    <p>The tool covers <strong>eleven countries</strong> in Southeast Asia:</p>
    <p>Brunei Darussalam · Cambodia · Indonesia · Lao PDR · Malaysia · Myanmar · the Philippines · Singapore · Thailand · Timor-Leste · Viet Nam.</p>`,
    'region') +

  docSection('2.1 &mdash; Three ecosystems, and a fourth reference class', `
    ${docTable(['Ecosystem', 'Definition'], [
      ['<strong>Dryland forest</strong>', 'Sits on mineral soil that is well drained and not regularly flooded.'],
      ['<strong>Mangrove</strong>', 'Sits on a coastal zone with salt or brackish water shaped by the tides.'],
      ['<strong>Peatland</strong>', 'Sits on peat, an organic soil that stays wet for most of the year.'],
      ['<strong>Savanna / natural grassland</strong><br><small>a reference class, not a target</small>',
       'Carried inside the pathway data but never offered as a restoration target. It acts as a guardrail: planting trees on land whose natural state is savanna is <em>conversion</em>, not restoration, so those areas are held as carbon ineligible instead of being restored.']
    ])}
    <h3>Why these three</h3>
    <p>The ecosystems were chosen on ecological grounds. Tropical forests in Southeast Asia hold high biodiversity and large carbon stocks. The region holds over <strong>70% of the world&rsquo;s tropical peatland</strong>, where the soil rather than the vegetation carries most of the carbon. Mangroves can store up to <strong>six times more carbon</strong> than land forests, and are under heavy pressure in the region.</p>
    ${docCallout('The three are not mutually exclusive', 'Peat swamp forest is both forest and peatland. Mangrove can grow on peat. The tool therefore reports a <strong>combination</strong> where one exists, rather than forcing a single label onto the site.', 'note')}`,
    'ecosystems') +

  docSection('2.1 &mdash; Time frame', `
    <p>The time frame is <strong>2014 to 2024</strong>. Everything the tool says about change &mdash; forest loss, disturbance, and the trajectory that selects the pathway &mdash; is measured between those two dates.</p>
    ${docEquation('observation window = 2014 &rarr; 2024 (10 years)',
      'The same window sets BASELINE_RATE_MAX_YEARS = 10 in the carbon method. A project duration longer than the window extrapolates beyond the evidence, and the tool flags it.')}`,
    'time-frame') +

  docSection('2.2 &mdash; Why protect, manage, then restore', `
    <p>Nature-based Solutions can act on land in three ways: by keeping intact ecosystems intact, by changing how working land is used so that it holds more carbon and supports more life, and by bringing back what has been lost. <strong>Cook-Patton et al. (2021)</strong> set these out as a hierarchy &mdash; protect, manage, then restore &mdash; and argue the order on four criteria: the magnitude of mitigation potential, the immediacy of that mitigation, cost-effectiveness, and the co-benefits each option offers.</p>
    ${docTable(['Pathway', 'The argument for its position'], [
      ['<strong>Protect</strong>', 'Protection avoids emissions that would otherwise happen now, so it acts immediately and cannot be undone by a failed planting season.'],
      ['<strong>Manage</strong>', 'Improved management works on land that is already in use, so it needs no land-use change and is often the cheapest option per tonne.'],
      ['<strong>Restore</strong>', 'Restoration has the largest long-run potential but the slowest response, because trees have to grow.']
    ])}
    ${docCallout('The order is a rule of thumb, not a ranking of worth', 'Cook-Patton et al. are explicit that the three are complementary and in practice sit together in one portfolio; which of them leads on a given site depends on biophysical, political, institutional, economic and socio-cultural context. The NbS Tool follows that reading. <strong>It does not tell a user which pathway is best.</strong> It reports which pathways the land is eligible for, and how many hectares fall under each.', 'note')}`,
    'pathway-hierarchy') +

  docSection('2.2 &mdash; Alignment with the ASEAN NbS/EbA MRV Framework', `
    <p>The ASEAN NbS/EbA MRV Framework adopts the same three pathways. In that framework the process begins with ecosystem identification for the selected ecosystems &mdash; forests, mangroves and peatlands &mdash; from land-use data. Each ecosystem is then assigned an NbS pathway according to its level of degradation. Key degradation drivers &mdash; forest fires, flooding, erosion, abrasion, landslides and logging &mdash; are identified to inform the choice of intervention.</p>
    ${docCallout('NbS Tool v3 is the spatial implementation of that logic', 'The tool reads degradation from a ten-year land cover trajectory and turns it into a pathway. The rules are set out in <em>Ecological state &amp; trajectory</em> and <em>Decision matrix</em>.', 'note')}`,
    'asean-framework') +

  docSection('2.2 &mdash; The four pathway outcomes', `
    ${docTable(['Pathway', 'Definition'], [
      ['<strong>Protect</strong>',
       'Maintain forest cover based on spatial data from 2014 and 2024. Driven by avoided deforestation initiatives such as mitigating legal land clearing and illegal logging, this strategy preserves forests as carbon sinks, prevents wildlife habitat fragmentation, and enhances social wellbeing for forest-dependent communities.'],
      ['<strong>Manage</strong>',
       'Balance human livelihoods with ecological health on lands that transitioned into active use between 2014 and 2024. Manage pathways include silvofishery, paludiculture, soil and water enrichment, and buffer management. This strategy optimises working-land productivity, lowers carbon intensity, and minimises ecosystem impacts without requiring full rewilding.'],
      ['<strong>Restore</strong>',
       'Actively heal heavily degraded landscapes, targeting degraded vegetation, barren lands, and long-term non-forested areas. Driven by the Afforestation, Reforestation and Revegetation (ARR) framework, the activities include native species planting, ecosystem restoration, and allowing natural forest regeneration. This pathway re-establishes high-integrity forest cover, secures long-term carbon removals, and creates ecosystem services.'],
      ['<strong>Ineligible</strong>',
       'Not a pathway, but a screening outcome reported in the same field. The land cannot generate carbon credits under the tool&rsquo;s current criteria, although non-carbon options may still exist. It covers natural forest converted to managed tree cover, plantation that was already established in 2014, settlement, and the savanna-reference categories.']
    ])}
    ${docSource("Table 1; definitions follow the GUI Design Document NbS Tool V 3.0")}`,
    'pathway-definitions');
}

/* ------------------------------------------------ 2.3 Land cover classes */
function docsLandcover() {
  return docHero('SCOPE', 'Land cover classes',
    'Land cover is the base layer of the tool. The 2024 map classifies the land surface of Southeast Asia into twenty classes: the nineteen land cover types defined below, plus an “other land” class for surfaces that fit none of them. Everything the tool concludes about ecological state, trajectory and pathway is built on this classification.',
    ['20 classes', 'SERVIR RLCMS', 'AlphaEarth embeddings · 30 m']) +

  docSection('How the map is produced', `
    <p>The map is produced with the <strong>SERVIR Regional Land Cover Monitoring System (RLCMS)</strong> running on <strong>AlphaEarth Foundations</strong> satellite embeddings in Google Earth Engine. The class definitions below are those used by the RLCMS.</p>
    ${docFlow([
      ['INPUT',  'AlphaEarth 2024', '64-band annual embedding'],
      ['STEP 1', 'Primitives',      'One probability surface per class'],
      ['STEP 2', 'Assemblage',      'Hierarchical decision tree, TCC, TCH, MMU'],
      ['OUTPUT', 'Land Cover 2024', '20 classes at 30 m']
    ])}
    <p>Full provenance, accuracy figures per country and the publisher&rsquo;s disclaimer are in <em>A.1 General context layers</em>.</p>`,
    'landcover-production') +

  docSection('2.3 &mdash; The nineteen class definitions', `
    ${docTable(['No.', 'Class', 'Definition'], [
      ['1', '<strong>Aquaculture</strong>', 'The farming of aquatic organisms, including fish, molluscs, crustaceans and aquatic plants. It includes man-made pond systems within fresh and salt water bodies or temporarily flooded regions.'],
      ['2', '<strong>Barren</strong>', 'Natural or semi-natural lands characterised by exposed soil, sand or rock, including rocky mountains and mining sites.'],
      ['3', '<strong>Cropland</strong>', 'Lands with herbaceous and shrubby crops followed by harvest and a bare soil period (Loveland and Belward, 1997). Includes single, mixed, multiple and seasonal cropping systems &mdash; cereals, oil seeds, vegetables, root crops and forages. Tea and coffee plantations are included; orchards, forest croplands and forest plantations are not. It also excludes irrigated or flooded rice fields and low land paddy fields where rice is intensively planted for more than one cycle per year.'],
      ['4', '<strong>Crop Plantation</strong>', 'Lands cultivated with perennial crops that reach heights above 5 m and occupy the land for long periods (Blanchez, 1997). Commodity orchards, for example coconut, fruit trees, coffee, cashew, mango, rambutan, longan and banana.'],
      ['5', '<strong>Deciduous</strong>', 'Forest lands dominated by trees with more than 30% canopy cover and a tree height above 5 m, dominated by deciduous species: tree species that shed leaves make up more than 30% of the total tree cover. Includes mixed deciduous types.'],
      ['6', '<strong>Evergreen</strong>', 'Evergreen broadleaf lands dominated by trees with more than 30% canopy cover and a tree height above 5 m. Dominant species are evergreen and make up more than 30% of the total tree cover. Includes primary and naturally regenerating secondary forests.'],
      ['7', '<strong>Flooded Forests</strong>', 'Natural forest growing on permanently or seasonally waterlogged soils, with more than 10% tree canopy cover and a tree height above 2 m, including peat swamp forests.'],
      ['8', '<strong>Forest Plantation</strong>', 'Forest predominantly composed of trees established through planting and/or deliberate seeding, using either native or introduced species. Includes productive plantations (timber, pulp) and protective plantations (watershed protection, coastal stabilisation).'],
      ['9', '<strong>Grass</strong>', 'Areas dominated by herbaceous vegetation, primarily grasses, where wetland-obligate species are scarce. Includes both natural rangelands and managed pastures.'],
      ['10', '<strong>Mangrove</strong>', 'Coastal sediment habitats with more than 10% woody vegetation canopy cover, the majority of cover higher than 2 m. A specific forest type found in coastal or brackish water.'],
      ['11', '<strong>Mixed Forest</strong>', '10&ndash;30% tree canopy cover, tree height greater than 5 m, and a mixed composition such that no single forest type dominates. The mix includes both natural and plantation, and can be agroforestry in some areas.'],
      ['12', '<strong>Oil Palm</strong>', 'Areas dominated by the cultivation of the oil palm tree. Ecologically and economically distinct from forests and other crops.'],
      ['13', '<strong>Rice</strong>', 'Irrigated or flooded rice fields and low land paddy fields where rice is intensively planted for more than one cycle per year (can be two or three). Rice makes up the majority of vegetation cover.'],
      ['14', '<strong>Rubber</strong>', 'Areas dominated by the cultivation of rubber trees (<em>Hevea brasiliensis</em>). These plantations are characterised by their specific spatial arrangement and growth patterns, often seen in tropical regions.'],
      ['15', '<strong>Shrub</strong>', 'Areas dominated by a mixture of shrubs, bushes and small woody vegetation, typically less than 5 m in height, with tree canopy cover of 5&ndash;10%. Shrub species may be evergreen or deciduous. These areas often represent degraded forest land.'],
      ['16', '<strong>Settlement</strong>', 'All artificial surfaces, including cities, villages, industrial areas and transportation infrastructure.'],
      ['17', '<strong>Water</strong>', 'Open water larger than 30 m by 30 m, fresh and saltwater (Pekel et al., 2016).'],
      ['18', '<strong>Wetlands</strong>', 'Seasonally flooded regions dominated by herbaceous or shrub vegetation. Non-forested ecosystems including marshes, swamps or peatlands.'],
      ['19', '<strong>Snow and ice</strong>', 'Lands under snow and/or ice cover throughout the year. In the ASEAN region mainly distributed in Myanmar.']
    ])}
    ${docSource('Table 2; definitions from the Regional Land Cover Monitoring System, Documentation UKPACT &ndash; ADPC')}
    ${docCallout('These numbers are not raster codes', 'The numbers in the first column are <strong>row numbers from the source documentation</strong>, not raster pixel codes. The raster codes are different, and they appear in the ecological state table &mdash; see <em>Ecological state &amp; trajectory</em>.', 'warn')}`,
    'class-definitions') +

  docSection('Land cover and ecosystem are different questions', `
    ${docCallout('The two layers can overlap', 'The land cover categories are <strong>not spatially exclusive</strong> with the ecosystem layer: it is possible for them to co-occur in the same area. Flooded forest can overlap peatland (peat swamp forest), and non-forest peatland exists under shrub, grass or cropland. Reading one as the other is the most common misreading of the site characterisation output.', 'warn')}
    <p>Land cover answers <em>what is standing here today</em>. The ecosystem layer answers <em>what kind of place this is</em> &mdash; and the reference ecosystem answers <em>what should grow here</em>. All three are needed, and the pathway logic uses each for a different purpose.</p>`,
    'landcover-vs-ecosystem');
}

/* ------------------------------------------- 2.3 Analysis conventions */
function docsConventions() {
  return docHero('SCOPE', 'Analysis conventions',
    'Three conventions apply everywhere in the tool. They explain several choices further down the method: why every area figure is trustworthy but every distance figure needs a correction, why a site is never reduced to a single label, and why the output states its own uncertainty instead of hiding it.',
    ['Equal-area projection', 'Area-weighted distributions', 'Screening instrument']) +

  docSection('1 &mdash; The boundary is reprojected once', `
    <p>Whatever coordinate system a user supplies, the tool reprojects the boundary to a <strong>World Cylindrical Equal Area</strong> projection. Every hectare figure is therefore computed on an equal-area grid.</p>
    ${docEquation('any input CRS &rarr; World Cylindrical Equal Area (reference CRS)',
      'Applied once, at the boundary. Every subsequent layer is clipped and read against the reprojected boundary.')}
    <p>That projection preserves area but <strong>distorts distance and shape</strong>, increasingly so further from the equator. Any measure that depends on distance applies a correction &mdash; the slope layer, for example, corrects by project-area latitude &mdash; and no component measures distance or perimeter directly in that projection.</p>
    ${docCallout('One discrepancy in the source document', 'The methodology document gives the reference CRS as <code>ESRI:54043</code> in the analysis conventions section, and as <code>ESRI:54034</code> in the Phase&nbsp;1 table and throughout Annex&nbsp;A. Both are cited here as written. <strong>Confirm the intended code with the Substance Team before quoting it</strong>; the method itself &mdash; a single reprojection to an equal-area CRS &mdash; is unambiguous.', 'warn')}`,
    'equal-area') +

  docSection('2 &mdash; The site is treated as mixed, not uniform', `
    <p>A project area covers many pixels and usually spans several categories at once. Results are therefore reported as <strong>area-weighted distributions</strong>, not single labels. A site is never reduced to one ecosystem, one land cover class or one risk level.</p>
    ${docExample('What this looks like in practice',
      `<p>A site made up of 60% evergreen forest, 30% shrubland and 10% cropland is reported as those three shares.</p>
       <ul>
         <li>Evergreen forest &mdash; <strong>60%</strong></li>
         <li>Shrubland &mdash; <strong>30%</strong></li>
         <li>Cropland &mdash; <strong>10%</strong></li>
       </ul>`,
      'It is <strong>never</strong> reported as “a forest site”.')}
    ${docCallout('The exceptions are declared', 'A handful of components do produce a single representative value &mdash; natural hazard risk takes the highest class covering at least 20% of the project area, and the climate vulnerability cards round an area-weighted mean to one class. Each says so at the point where it does it.', 'note')}`,
    'mixed-site') +

  docSection('3 &mdash; The tool is a screening instrument', `
    <p>Where a method is uncertain, <strong>the tool reports the uncertainty rather than hiding it</strong>. That principle is why the annex prints publisher disclaimers verbatim, why unimplemented components are marked as unimplemented, and why a contradiction between a printed sentence and the code that produced it is flagged on the page instead of being quietly reconciled.</p>
    ${docCallout('What “screening” means for a reader', 'A figure here means &ldquo;this site is worth investigating at roughly this scale&rdquo;. It does not mean the figure has been measured, verified, or that it can be claimed. All information in the NbS Tool is provided to support a pre-feasibility study; further data collection and field verification are required before a pathway is committed to.', 'warn')}`,
    'screening-instrument');
}

/* ------------------------------------------ 4 Phase 1: Select location */
function docsPhase1() {
  const e = docParam('eco', {});
  const ecoRows = Object.keys(e).map(k => [
    `<strong>${docEsc(e[k].label)}</strong>`,
    `<span class="num">${docFmt(e[k].area)}</span>`,
    `<span class="num">${docFmt(e[k].remaining)}</span>`,
    `<span class="num">${docFmt(e[k].disturbed)}</span>`,
    `<span class="num">${docFmt(e[k].loss)}</span>`,
    `<span class="num">${docFmt(e[k].gain)}</span>`
  ]);
  return docHero('PHASE 1', 'Select location',
    'The user supplies a project boundary. Everything the tool produces is derived from that input and from layers already held on the server. No other user input is required, and none is requested.',
    [`AOI ${docNum('aoi.total')} ha`, `Duration ${docNum('aoi.duration')} years`, 'No minimum area check']) +

  docSection('What the user provides', `
    ${docTable(['Input', 'What it is', 'Detail'], [
      ['<strong>Project boundary (AOI)</strong>', 'A polygon drawn on the interactive map, or uploaded as a spatial file.',
       '<p><strong>How it is used.</strong> The boundary is reprojected to the reference CRS, World Cylindrical Equal Area, and every subsequent layer is clipped and read against it. A stable identifier is derived from the geometry, and every phase writes its result under that identifier, so a boundary can be re-analysed without repeating earlier phases.</p>' +
       '<p><strong>Limits.</strong> There is <strong>no minimum area check</strong>. A boundary smaller than the coarsest layer&rsquo;s cell will fall inside a single cell of that layer, and the tool will report that layer&rsquo;s value for the whole site.</p>'],
      ['<strong>Project duration</strong>', 'The number of years the project is expected to run.',
       'Carried into every projection in Phase 5. It sets <em>t</em> in the shared loss projection, the growth years in the ARR carbon method, and the horizon named in every benefit narrative. A saved result stores the duration it was produced with.']
    ])}
    ${docSource('Table 4')}`,
    'phase1-inputs') +

  docSection('Which layers a small boundary can outrun', `
    <p>The &ldquo;no minimum area&rdquo; limit bites hardest on the coarse layers. These are the native resolutions recorded in Annex&nbsp;A, coarsest first:</p>
    ${docTable(['Layer', 'Native resolution', 'What a small AOI gets'], [
      ['<strong>Conservation significance</strong> (NatureMap)', '10 km (~100 km² per pixel)', 'A landscape-context statement only; the tool also reports the envelope inflation so the artefact is visible'],
      ['<strong>Endangered tree species richness</strong>', '4 km', 'The species count of the single grid cell with the largest overlap'],
      ['<strong>Peatland canal density</strong> (Dadap et al.)', '1 km', 'A drainage-pressure class, not a canal inventory'],
      ['<strong>Temperature and precipitation</strong> (WorldClim)', '~1 km', 'One climatological normal across the whole site'],
      ['<strong>Soil organic carbon, soil groups</strong> (SoilGrids)', '250 m', 'A single soil profile for a small site'],
      ['<strong>Forest landscape integrity</strong> (FLII)', '300 m', 'A mean over very few cells'],
      ['<strong>Natural disaster risk</strong> (ADPC)', 'Varies by hazard, several coarse', 'Possibly a one-class distribution &mdash; expected, not an error'],
      ['<strong>Most other layers</strong>', '30 m', 'Usable area statistics, subject to the 30 m detection limit']
    ])}
    ${docCallout('Resolution is a hard limit on what you can conclude', 'A layer at 30-metre resolution cannot resolve a feature narrower than about 30 metres; a 10-kilometre layer cannot describe a single valley. Any figure derived from a layer inherits that layer&rsquo;s limit, including hectare counts. Check the resolution recorded for each layer in Annex&nbsp;A before quoting a figure derived from it.', 'warn')}`,
    'phase1-resolution') +

  docSection('The boundary this build is analysing', `
    <p>The current reading from the shared data objects:</p>
    ${docEquation('eligible area (ha) = AOI (ha) &minus; non-eligible area (ha)',
      `In the current reading: ${docNum('aoi.total')} ha &minus; ${docNum('aoi.nonEligible')} ha = ${docNum('aoi.eligible')} ha.`)}
    ${ecoRows.length ? docTable(['Ecosystem', 'Area (ha)', 'Remaining (ha)', 'Disturbed (ha)', 'Loss (ha)', 'Gain (ha)'], ecoRows)
                     : docCallout('Missing', docTodo('NBS_DATA.eco not readable'), 'warn')}
    ${docCallout('Eligibility here is ecological only', 'This step asks whether the land is forest, mangrove or peatland &mdash; not whether a project may lawfully work on it. Land tenure, concession boundaries, customary rights and protected-area status are <strong>not</strong> screened. The methodology is explicit that the tenure question moves to the feasibility stage, outside this tool.', 'warn')}`,
    'phase1-current-reading');
}

/* ------------------------------------- 5 Phase 2: Site characterisation */
function docsPhase2() {
  const L = docParam('layers', []);
  const rows = Array.isArray(L) ? L.map(l => [
    `<strong>${docEsc(l.name || l.key)}</strong>`,
    docEsc(l.category || '—'),
    docEsc(l.resolution || '—'),
    docEsc(l.dateOfContent || '—')
  ]) : [];
  return docHero('PHASE 2', 'Site characterisation',
    'Site characterisation answers one question: what is here. It reads data and makes no recommendation. Every layer held by the tool is clipped to the boundary and summarised, and the results are grouped exactly as the interface groups them — general context, nature, climate and people.',
    ['Four groups', '29 layers in Annex A', 'Area-weighted, never a single label']) +

  docSection('The rule for every group', `
    <p>Results are area-weighted distributions over the project area, not single labels, because a project area almost always spans several classes at once. The full description of each layer &mdash; its source, resolution, update frequency, method and disclaimer &mdash; is in Annex&nbsp;A. This page states what each group is for and what it contributes downstream.</p>`,
    'phase2-rule') +

  docSection('5 &mdash; General context', `
    <p><strong>What it reports.</strong> Where the site is and what it is made of: administrative boundaries, protected areas, land cover 2024, forest cover in 2014 and 2024, deforestation between the two dates and its annual rate, deforestation risk, elevation, slope, ecosystem type, and natural disaster risk.</p>
    <p><strong>Method and downstream use.</strong> Ten layers, described in Annex&nbsp;A.1. Three of them carry the whole downstream chain:</p>
    ${docTable(['Layer', 'What it becomes downstream'], [
      ['<strong>Land Cover 2024</strong>', 'The current ecological state in Phase 4a'],
      ['<strong>Forest Cover 2014</strong>', 'The past state in Phase 4a'],
      ['<strong>Deforestation rate</strong>', 'Computed with the Puyravaud (2003) formula over the ten-year window; becomes the baseline for every avoided-loss projection in Phase 5']
    ])}
    ${docCallout('The single most common misreading of this group', 'Ecosystem type is a <strong>reference layer</strong>: it is the ecosystem that <em>belongs</em> on the site, not the vegetation standing on it today. Reading it as current cover will produce the wrong conclusion about almost every degraded site.', 'warn')}`,
    'phase2-general') +

  docSection('5 &mdash; Nature', `
    <p><strong>What it reports.</strong> The biodiversity and habitat value of the site: forest landscape integrity, refined area of habitat for mammals, birds, reptiles and amphibians, key species presence, key biodiversity areas, conservation significance, ecological connectivity, and endangered tree species richness.</p>
    <p><strong>Method and downstream use.</strong> Seven layers, described in Annex&nbsp;A.2. The Area of Habitat rasters are the input to three of the benefit components in the Nature pillar, where they are intersected with projected deforestation or with the restoration area.</p>
    ${docCallout('Limitation', 'Area of Habitat is <strong>modelled suitable habitat, not confirmed occurrence</strong>. It states where a species <em>could</em> live given cover, elevation and range &mdash; not where it has been recorded.', 'warn')}`,
    'phase2-nature') +

  docSection('5 &mdash; Climate', `
    <p><strong>What it reports.</strong> Carbon stocks and climate conditions: above-ground biomass density, below-ground biomass, soil organic carbon for peatland, mangrove and dryland, annual temperature, annual precipitation, historical burned area, fire susceptibility, and soil groups.</p>
    <p><strong>Method and downstream use.</strong> Eight layers, described in Annex&nbsp;A.3. Above-ground biomass is the stock that the avoided-emissions component converts to avoided emissions, and that the removals component uses as the restoration baseline. Elevation and the twelve monthly precipitation bands derive the dryland climatic zone that sets the ARR growth rate.</p>
    ${docCallout('Two limitations to carry forward', '<strong>Below-ground biomass is not a mapped layer.</strong> It is derived from above-ground biomass by a fixed root-to-shoot ratio of 0.28. And <strong>soil organic carbon is reported in characterisation but does not enter the carbon quantification</strong> &mdash; peat soil carbon is out of scope there, which is the single largest pool on a peat site.', 'warn')}`,
    'phase2-climate') +

  docSection('5 &mdash; People', `
    <p><strong>What it reports.</strong> Who lives with the site and how exposed they are: gridded population, gridded age and sex structure, climate vulnerability, and national socio-economic indicators.</p>
    <p><strong>Method and downstream use.</strong> Four layers, described in Annex&nbsp;A.4. Population and climate vulnerability feed the climate-hazard resilience component in the Climate pillar.</p>
    ${docCallout('Limitation', 'All four are gridded or national products. They describe <strong>the population of the cells the project area covers, not the community that holds rights over it</strong>. Tenure, customary claims and community composition are not spatial layers in this tool and have to come from the socio-economic form.', 'warn')}
    ${(() => {
      const gran = docParam('people.granularity', []);
      const gr = Array.isArray(gran) ? gran.map(r => [
        `<strong>${docEsc(r.country)}</strong>`,
        `<code>${docEsc(r.gran || '—')}</code>`,
        docEsc((r.src || '').split('·').slice(1).join('·').trim() || '—')
      ]) : [];
      return gr.length
        ? `<h3>Administrative level is part of the number</h3>
           <p>Statistics are published by administrative unit, and different agencies publish at different levels. The tool records the level with every figure, because it changes what the figure means: a provincial unemployment rate says almost nothing about one village inside that province. This is what the product currently reports for the household indicator in each country:</p>
           ${docTable(['Country', 'Level', 'Source'], gr)}
           ${docCallout('Do not mix levels in one sentence', 'A narrative that pairs a village household count with a provincial literacy rate is describing two different populations. The tool names the unit for each figure; keep those names when quoting them in a proposal.', 'warn')}`
        : '';
    })()}`,
    'phase2-people') +

  docSection('The dataset catalogue as the build holds it', `
    <p>Every layer carries its own provenance record: what it is, which agency published it, at what spatial resolution, and for what period. Annex&nbsp;A documents each one in full; this is the catalogue as the product currently holds it.</p>
    ${rows.length ? docTable(['Layer', 'Category', 'Resolution', 'Period'], rows)
                  : docCallout('Missing', docTodo('NBS_LAYER_INFO not readable — the layer catalogue could not be listed'), 'warn')}
    ${(() => {
      const first = Array.isArray(L) ? L.find(x => x.disclaimer) : null;
      return first
        ? `<p>Each catalogued layer also carries the publisher&rsquo;s own disclaimer, shown in the tool next to the figure it produced. Disclaimers are reproduced rather than summarised, because a paraphrase loses the specific caveat that matters.</p>` +
          docDetails(`Example disclaimer &mdash; ${docEsc(first.name || first.key)}`, `<p>${docEsc(first.disclaimer)}</p>`)
        : '';
    })()}`,
    'phase2-catalogue');
}

/* ------------------------------------------- 6 Phase 3: Threat profile */
function docsPhase3() {
  return docHero('PHASE 3', 'Threat profile',
    'The threat profile answers a different question from site characterisation: not what is here, but what is happening to it. It does not choose the pathway. It decides which activities within a pathway are worth switching on, and it gates two of the benefit components.',
    ['4 components', 'Drivers, not symptoms', 'Gates two benefits']) +

  docSection('Why drivers matter', `
    <p>A credible intervention addresses a <strong>driver</strong>, not a symptom. Knowing whether forest is being lost to small-scale agriculture, selective logging, road building or fire changes which activity is worth proposing and which is likely to fail.</p>`,
    'phase3-why') +

  docSection('6 &mdash; Ecosystem disturbance screening', `
    <p><strong>What it reports.</strong> How much of each ecosystem in the project area is disturbed, in hectares and as a share.</p>
    <p><strong>How it is derived.</strong> Disturbance means <em>structural decline within forest that is still standing</em>: a canopy height deficit measured against an undisturbed reference population, where that reference is forest at least <strong>120 m</strong> from any disturbed forest. The detection threshold is the <strong>5th percentile</strong> of the reference population&rsquo;s height change, which gives a nominal <strong>5% false-positive rate</strong>. The disturbance layer is crossed with the ecosystem layer inside the project boundary and areas are tabulated per ecosystem.</p>
    ${docEquation('disturbed = canopy height deficit &lt; 5th percentile of the undisturbed reference population',
      'Reference population = forest at least 120 m from any disturbed forest. Nominal false-positive rate 5%.')}
    ${docCallout('Limits', 'Results are <strong>area statistics by stratum</strong>. Per-pixel interpretation is not supported at 30 m, given a product error of <strong>6.6 to 9.1 m</strong>. A ten-year window is long for detecting degradation; version 3.1 will move to an annual or five-year analysis.', 'warn')}`,
    'phase3-disturbance') +

  docSection('6 &mdash; Disturbance drivers', `
    <p><strong>What it reports.</strong> What is causing the disturbance, grouped into human-caused, natural and other.</p>
    <p><strong>How it is derived.</strong> The driver layer is masked to the disturbance layer and clipped to the project boundary, then the area of each driver class is tabulated.</p>
    ${docTable(['Group', 'Driver classes'], [
      ['<strong>Human-caused</strong>', 'Small-scale agriculture · small-scale agriculture with fire · large-scale agriculture · large-scale agriculture with fire · road development · selective logging · mining'],
      ['<strong>Natural</strong>', 'Flooding · forest fire · drought · typhoon · landslide · extreme climate events'],
      ['<strong>Other</strong>', 'Non-productive conversion · unknown'],
      ['<strong>Mangrove (human-caused set)</strong>', 'Commodities · settlement']
    ])}
    ${docCallout('Limits', 'The source classifies <strong>key</strong> drivers and may not include every cause. Only <strong>high and very high</strong> disaster risk is treated as contributing to disturbance.', 'warn')}`,
    'phase3-drivers') +

  docSection('6 &mdash; Peatland drainage pressure', `
    <p><strong>What it reports.</strong> Canal proximity, drainage pressure and fire risk on peat, each reported as High, Moderate or Low, with the distance to the nearest canal.</p>
    <p><strong>How it is derived.</strong> Drainage is the primary driver of peatland degradation: canals lower the water table, which dries the peat, speeds up oxidation and subsidence, and makes the peat far more likely to burn. Drainage pressure <strong>deliberately includes canals outside the project boundary</strong>.</p>
    ${docTable(['Published finding', 'Distance', 'What it sets'], [
      ['<strong>Astiani et al. (2017)</strong>', '500 m', 'Canals can influence water-table depth up to 500 m into the surrounding area'],
      ['<strong>Wedeux et al. (2020)</strong>', '1 km', 'Canal networks can affect forest biomass growth up to 1 km away']
    ])}
    ${docCallout('Limits', 'The canal layer was produced by a model trained with roads included, on the assumption that roads often carry drainage ditches. Read it as a <strong>drainage-infrastructure proxy, not a canal inventory</strong>. It indicates pressure, not measured water-table depth.', 'warn')}`,
    'phase3-peat') +

  docSection('6 &mdash; Natural hazard risk', `
    <p><strong>What it reports.</strong> Flood, landslide, typhoon, drought and fire risk, each as a single representative level for the project area.</p>
    <p><strong>How it is derived.</strong> These are <strong>risk</strong> layers, not bare hazard layers: exposure and vulnerability are already folded in. A weighted vulnerability composite is multiplied by the classified hazard layer, normalised, and reclassified into risk classes. The tool then takes the highest class covering at least <strong>20%</strong> of the project area.</p>
    ${docEquation('representative level = highest risk class covering &ge; 20% of the project area',
      'The rule is deliberately conservative, because in risk screening a false negative costs more than a false positive.')}
    ${docCallout('Limits', 'The interface specifies <strong>five</strong> levels but the wired rasters carry <strong>four</strong>. No composite index is produced across hazards, because they are not comparable with one another. Coarse layers may fall inside a single cell for a small project area.', 'warn')}`,
    'phase3-hazard');
}

/* ------------------ 7.1–7.4 Phase 4a: ecological state and trajectory */
function docsPhase4State() {
  return docHero('PHASE 4A', 'Ecological state and trajectory',
    'Pathway selection is where the tool stops describing and starts deciding. Everything before it reports what is on the ground; this phase turns that description into a statement about what kind of intervention the land can take. Identifying the ecosystem alone is not enough — the ecological state has to be understood as well, and it is built from three components.',
    ['6 state classes', '10 trajectory categories', '5 reference values']) +

  docSection('7 &mdash; The three components of ecological state', `
    ${docTable(['Component', 'What it is', 'Where it comes from in the tool'], [
      ['<strong>The ecological state reference</strong>', 'The ecosystem that originally and naturally existed in the landscape &mdash; forest, savanna, grassland, peatland or mangrove.', 'The Ecosystem Type layer (Annex A.1)'],
      ['<strong>The current ecological state</strong>', 'What exists in that landscape now.', 'Land Cover 2024, grouped into the six ecological state classes below'],
      ['<strong>The trajectory</strong>', 'The comparison between the current state and the earlier state: whether the landscape is disturbed, stable or recovering.', 'Forest Cover 2014 crossed with the 2024 state']
    ])}
    <p>The trajectory, read against the reference ecosystem, is what selects the pathway.</p>`,
    'state-components') +

  docSection('7 &mdash; Three questions behind the framework', `
    <p>Every rule and every row of the decision matrix is an answer to one of these three questions.</p>
    ${docTable(['Question', 'Type of answer', 'How the tool answers it'], [
      ['<strong>What happened here?</strong>', 'Measured, not assumed.',
       'Two land cover maps ten years apart show whether the land gained cover, lost cover, or stayed the same. This is the trajectory.'],
      ['<strong>What should grow here?</strong>', 'Not measured, modelled.',
       'The reference ecosystem is the vegetation the site would carry without human pressure. It is the only way to tell degradation apart from natural condition. Grassland on a forest reference is degraded land. The same grassland on a savanna reference is a healthy ecosystem, and planting trees on it would be damage, not restoration.'],
      ['<strong>What can start without a change in land use?</strong>', 'A feasibility question, treated as a first-order decision.',
       'An intervention that can begin on land as it is used today is very different from one that requires the land to leave production. Both may be valid, but they carry different cost, different risk and different social consequences. The framework treats this difference as a first-order decision, not a detail.']
    ])}`,
    'three-questions') +

  docSection('7.1 &mdash; The assignment chain', `
    <p>The assignment runs in six steps, from two land cover maps to a list of activities and expected benefits.</p>
    ${docTable(['Step', 'Question', 'Input', 'Output'], [
      ['<strong>1</strong>', 'What is on the land now, and what was there in 2014?', 'Land cover 2014 and 2024', 'Ecological state, past and present'],
      ['<strong>2</strong>', 'What happened between the two dates?', 'The two states, crossed', 'Trajectory category (10 categories)'],
      ['<strong>3</strong>', 'What should naturally grow here?', 'Reference ecosystem layer', 'Reference ecosystem (4 classes, or none)'],
      ['<strong>4</strong>', 'What kind of intervention fits?', 'Trajectory plus reference', 'Pathway: Protect, Manage, Restore or Carbon ineligible'],
      ['<strong>5</strong>', 'What should actually be done on the ground?', 'Trajectory plus reference', 'Recommended activity'],
      ['<strong>6</strong>', 'What will the project deliver?', 'The selected activity', 'Expected benefits, in three pillars']
    ])}
    ${docSource('Table 7')}
    ${docCallout('Trajectory and reference are two different things, and both are needed', 'The trajectory says <em>what happened</em>. The reference says <em>what belongs</em>. A site can be losing forest cover and still be at its natural state, and a site can be stable and still be far below its natural state. The activity is <strong>not</strong> selected from the pathway alone: it comes from the trajectory category and the reference ecosystem together. Restore means planting trees on a forest reference, breaching pond dykes on a mangrove reference, and raising water tables on a peat reference &mdash; different projects, different costs, different carbon outcomes.', 'note')}`,
    'assignment-chain') +

  docSection('7.2 &mdash; Six ecological state classes', `
    <p>Current land cover is grouped into six ecological states. Grouping keeps the logic readable: the tool reasons about ecological condition, not about individual land cover labels. The classification represents the <strong>severity of ecosystem disturbance</strong>, so higher class numbers are more disturbed than lower ones. Numbers in brackets are the land cover <strong>raster codes</strong>.</p>
    ${docTable(['Class', 'Meaning', '2024 land cover classes', 'Justification'], [
      ['<strong>C1</strong>', 'Mature natural forest', 'Flooded forest (1), Mangrove (6), Evergreen (8)', 'Mature natural forest; highest carbon density, highest biodiversity'],
      ['<strong>C2</strong>', 'Natural forest with lower carbon and biodiversity', 'Deciduous (7), Mixed forest (10)', 'Natural forest, lower carbon density and biodiversity value'],
      ['<strong>C3</strong>', 'Managed tree cover', 'Rubber (2), Oil palm (3), Forest plantation (4), Crop plantation (5)', 'Tree cover, but managed or monoculture; lower biodiversity'],
      ['<strong>C4</strong>', 'Non-forest vegetation', 'Shrubland (9), Grassland (17), Wetland (18)', 'Non-forest with vegetation; can be native or anthropogenic'],
      ['<strong>C5</strong>', 'Active anthropogenic use', 'Aquaculture (13), Rice (14), Settlement (15), Cropland (16)', 'Active, intensive anthropogenic use'],
      ['<strong>C6</strong>', 'Barren', 'Bare land (19)', 'Minimal vegetation cover'],
      ['<strong>Mask</strong>', 'Not a category', 'Snow (11), Water (12), Other land (20)', 'Excluded from the classification']
    ])}
    ${docSource('Table 8')}
    ${docCallout('C1 and C2 are always treated together in the pathway logic', 'The difference between them matters <strong>for carbon, not for the choice of intervention</strong>.', 'note')}`,
    'ecological-state') +

  docSection('7.2 &mdash; Why the 2014 layer is only binary', `
    <p>The 2014 layer is binary: <strong>forest or non-forest</strong>. It is not divided into six states. This is a data limitation, and it is deliberate. A consistent, region-wide land cover product with the same class system for both years does not exist for the whole of Southeast Asia. Rather than force a detailed classification onto weaker data, the framework asks the 2014 layer only the one question it can answer reliably: <em>was there natural forest here?</em></p>
    ${docCallout('The consequence', 'The framework can detect <strong>forest loss and forest gain</strong>, but it cannot detect a change <em>within</em> the non-forest classes &mdash; cropland that became a settlement, for example. This is accepted at screening level.', 'warn')}`,
    'binary-2014') +

  docSection('7.3 &mdash; The transition matrix', `
    <p>The comparison is therefore not symmetric: two categories in 2014 against six classes in 2024, which gives twelve transitions.</p>
    ${docTable(['2014 &bsol; 2024', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6'], [
      ['<strong>Forest</strong>', 'Forest persisting', 'Forest persisting', 'Forest lost to plantation', 'Forest degraded to vegetation', 'Forest converted to active use', 'Forest converted to barren'],
      ['<strong>Non-forest</strong>', 'Forest recovery&nbsp;*', 'Forest recovery&nbsp;*', 'Plantation stable', 'Non-forest vegetation stable', 'Active use stable', 'Barren stable']
    ])}
    ${docSource('Table 9')}
    ${docCallout('* Treated with caution', 'A ten-year recovery from non-forest to mature natural forest is rare. These pixels are most likely a <strong>classification error</strong>, or a plantation misclassified as natural forest.', 'warn')}`,
    'transition-matrix') +

  docSection('7.3 &mdash; The ten trajectory categories', `
    <p>With C1 and C2 merged, the twelve transitions collapse into ten trajectory categories.</p>
    ${docTable(['Cat', 'Pattern', 'Meaning'], [
      ['<strong>1</strong>', 'Forest &rarr; C1 or C2', 'Forest persisting. Natural forest in 2014, still natural forest in 2024'],
      ['<strong>2</strong>', 'Forest &rarr; C3', 'Forest lost to plantation. Natural forest replaced by managed tree cover'],
      ['<strong>3</strong>', 'Forest &rarr; C4', 'Forest degraded to non-forest vegetation. Tree cover lost, no other land use took the site'],
      ['<strong>4</strong>', 'Forest &rarr; C5', 'Forest converted to active use. Site now under crops, rice, ponds or buildings'],
      ['<strong>5</strong>', 'Forest &rarr; C6', 'Forest converted to barren. Tree cover lost and no vegetation left'],
      ['<strong>6</strong>', 'Non-forest &rarr; C1 or C2', 'Forest recovery. Natural forest returned without planting'],
      ['<strong>7</strong>', 'Non-forest &rarr; C3', 'Plantation stable. Managed tree cover already in place in 2014'],
      ['<strong>8</strong>', 'Non-forest &rarr; C4', 'Non-forest vegetation stable. Shrub, grass or wetland since at least 2014'],
      ['<strong>9</strong>', 'Non-forest &rarr; C5', 'Active use stable. Land in production in 2014 and still in production'],
      ['<strong>10</strong>', 'Non-forest &rarr; C6', 'Barren stable. Bare land, no evidence that forest ever stood there']
    ])}
    ${docSource('Table 10')}
    ${docCallout('Exhaustive and mutually exclusive', 'Every pixel that carries valid data in both years falls in <strong>exactly one</strong> of these ten. Four categories are then split further, because one trajectory can require different responses depending on the reference ecosystem or on the exact land use &mdash; which is what turns ten categories into seventeen decision rows.', 'note')}`,
    'trajectory-categories') +

  docSection('7.4 &mdash; The reference ecosystem', `
    <p>The reference ecosystem answers the question <em>what should grow here</em>. It is the <strong>potential natural vegetation</strong> of the site, not its current cover. Five values are used.</p>
    ${docTable(['Ecosystem type', 'Reference', 'What it implies for restoration'], [
      ['<strong>Dryland forest</strong>', 'Terrestrial forest, not flooded, not on peat', 'Tree planting on mineral soil'],
      ['<strong>Mangrove</strong>', 'Intertidal forest', 'Tidal reconnection first, then planting'],
      ['<strong>Peatland</strong>', 'Peat soil, forested or not', 'Water table first, then vegetation'],
      ['<strong>Savanna and grassland</strong>', 'Naturally open, fire-maintained systems', 'Native grasses and herbs, <strong>no afforestation</strong>'],
      ['<strong>None</strong>', 'No reference could be assigned', 'No restoration target, so no restoration activity']
    ])}
    ${docSource('Table 11')}
    <h3>How the layer is built</h3>
    <p>From three independent sources, combined in a fixed order:</p>
    <ol>
      <li>Mapped historical mangrove extent</li>
      <li>National and global peat maps</li>
      <li>A global ecosystem typology, for the split between forest and naturally open systems</li>
    </ol>
    <p>Where sources disagree, the <strong>edaphic references win</strong> &mdash; soil and tidal conditions are far more stable than vegetation cover.</p>
    ${docCallout('An honest gap beats a confident recommendation', 'If no reference can be assigned, the tool cannot say what the site should become. It therefore <strong>does not recommend restoration there</strong>. Reporting an honest gap is better than recommending planting with no target species.', 'note')}
    ${docCallout('Why the reference layer is the load-bearing input', 'The reference is the only input that separates <strong>degradation</strong> from <strong>natural condition</strong>. Without it, every open landscape in Southeast Asia looks like degraded forest, and the tool would recommend planting trees on tens of millions of hectares of natural savanna.', 'warn')}`,
    'reference-ecosystem');
}

/* ------------------------------------------- 7.5 Phase 4a: decision matrix */
function docsPhase4Matrix() {
  const row = (n, cat, traj, def, cond, pw) =>
    [`<span class="num">${n}</span>`, `<strong>${cat}</strong>`, traj, def, cond, `<strong>${pw}</strong>`];
  return docHero('PHASE 4A', 'The decision matrix',
    'Ten trajectory categories become seventeen decision rows once the conditional splits are applied. This table is the whole of the pathway logic: every pixel in every project area resolves to exactly one of these rows, and the row number is carried in band 3 of the pathway raster so the assignment can be audited afterwards.',
    ['17 rows', '4 outcomes', 'Auditable per pixel']) +

  docSection('7.5 &mdash; Seventeen decision rows', `
    <figure class="doc-embed">
      <iframe src="NbS_Activities_Flow_v2.html?embed" loading="lazy"
              title="Activity flow matrix: 2014 land cover through trajectory, pathway, ecosystem, activity and benefit to indicator"></iframe>
      <figcaption>Where the seventeen rows lead. Each pathway below continues into an ecosystem, an activity, a benefit and the indicator that measures it. The full matrix filters by pathway and ecosystem and traces one path at a time. <strong>This matrix covers only the decision rows that resolve to a pathway &mdash; Protect, Manage and Restore. The six rows that resolve to Carbon ineligible (Cat 2, 3A, 4A, 7, 8A and 9D) carry no activities, so they are not shown above.</strong></figcaption>
    </figure>
    <p><a class="doc-cta" href="NbS_Activities_Flow_v2.html">See the detailed activities matrix<span aria-hidden="true">&rarr;</span></a></p>
    ${docTable(['#', 'Category', 'Trajectory', 'Definition', 'Condition', 'Pathway'], [
      row(1,  'Cat 1',   'Forest &rarr; C1/C2',     'Forest persisting',                      '&ndash;',                          'Protect'),
      row(2,  'Cat 2',   'Forest &rarr; C3',        'Forest lost to plantation',              '&ndash;',                          'Carbon ineligible'),
      row(3,  'Cat 3A',  'Forest &rarr; C4',        'Forest degraded to non-forest vegetation','Reference is savanna',            'Carbon ineligible'),
      row(4,  'Cat 3B',  'Forest &rarr; C4',        'Forest degraded to non-forest vegetation','Other reference',                 'Restore'),
      row(5,  'Cat 4A',  'Forest &rarr; C5',        'Forest converted to active use',          'Reference is savanna',            'Carbon ineligible'),
      row(6,  'Cat 4B',  'Forest &rarr; C5',        'Forest converted to active use',          'Other reference',                 'Restore'),
      row(7,  'Cat 5',   'Forest &rarr; C6',        'Forest converted to barren',              '&ndash;',                         'Restore'),
      row(8,  'Cat 6',   'Non-forest &rarr; C1/C2', 'Forest recovery, regenerated without planting', '&ndash;',                   'Manage'),
      row(9,  'Cat 7',   'Non-forest &rarr; C3',    'Plantation stable',                       '&ndash;',                         'Carbon ineligible'),
      row(10, 'Cat 8A',  'Non-forest &rarr; C4',    'Non-forest vegetation stable',            'Savanna reference, natural',      'Carbon ineligible'),
      row(11, 'Cat 8B',  'Non-forest &rarr; C4',    'Non-forest vegetation stable',            'Savanna reference, cultivated',   'Manage'),
      row(12, 'Cat 8C',  'Non-forest &rarr; C4',    'Non-forest vegetation stable',            'Richer reference',                'Restore'),
      row(13, 'Cat 9A',  'Non-forest &rarr; C5',    'Active use stable',                       'Cropland or rice',                'Manage'),
      row(14, 'Cat 9B',  'Non-forest &rarr; C5',    'Active use stable',                       'Aquaculture on mangrove or peat', 'Restore'),
      row(15, 'Cat 9C',  'Non-forest &rarr; C5',    'Active use stable',                       'Aquaculture elsewhere',           'Manage'),
      row(16, 'Cat 9D',  'Non-forest &rarr; C5',    'Active use stable',                       'Settlement',                      'Carbon ineligible'),
      row(17, 'Cat 10',  'Non-forest &rarr; C6',    'Barren stable',                           'Reference is not none',           'Restore')
    ])}
    ${docSource('Table 12')}
    ${docCallout('The first column is a raster band', 'The decision row number is the value carried in <strong>band 3 of the pathway raster</strong>. Band 1 carries the pathway, band 2 the reference ecosystem. See <em>A.5&ndash;A.6 Threat &amp; pathway layers</em>.', 'note')}`,
    'seventeen-rows') +

  docSection('7.5 &mdash; Three properties reviewers test first', `
    <h3>Protect appears only in Category 1</h3>
    <p>A stable natural savanna is a valuable ecosystem, but under the present carbon framework it does not support a credible carbon project, so it is reported as carbon ineligible rather than as Protect. <strong>This is a statement about carbon eligibility, not about ecological value.</strong></p>

    <h3>Category 6, forest recovery, is Manage and not Protect</h3>
    <p>Natural regeneration already succeeded on this land without planting, so Restore would be wrong &mdash; planting could damage the species mix that has formed on its own. Protect would also be wrong, because the site is still changing. Manage is the correct answer, but it carries a condition: young secondary forest holds real carbon and faces a real risk of clearing, because it has low timber value, unclear land status, and is often seen locally as scrub rather than forest.</p>
    ${docCallout('What that condition means for the activity list', 'The activity list for Category 6 must include <strong>threat reduction</strong>, not only recovery support.', 'warn')}

    <h3>Category 4B, forest converted to active use, is Restore</h3>
    <p>This is the one place where two of the framework&rsquo;s principles pull in opposite directions. The land is occupied and productive, so the &ldquo;what can start without a change in land use&rdquo; question would favour Manage. The site is also far below its reference, and the conversion happened inside the last ten years, so the &ldquo;what happened here&rdquo; question favours Restore.</p>
    <p>The framework resolves this <strong>in favour of Restore</strong>, because recent conversion from natural forest is exactly the situation where restoration carries the highest carbon and biodiversity return.</p>
    ${docCallout('The tenure question does not disappear', 'It moves to the feasibility stage, <strong>outside this tool</strong>. A Restore assignment on Category 4B land says the ecology supports restoration; it says nothing about whether the people currently using that land can or should be asked to stop.', 'warn')}`,
    'matrix-properties');
}

/* ------------------------------------ 7.6–7.9 the four pathway outcomes */
function docsPhase4Pathways() {
  const m = docParam('matrix', null);
  return docHero('PHASE 4A', 'Protect, Manage, Restore and Ineligible',
    'What each outcome means on the ground: which decision rows produce it, what the pathway is for, which site characteristics are read against it, and the circumstances in which a project area is reported as ineligible for it.',
    m ? [`${m.ecosystemCount} ecosystems`, `${m.activityCount} activities`, 'Eligibility, not ranking'] : ['Protect · Manage · Restore · Ineligible']) +

  docSection('7.6 &mdash; Protect', `
    <p>Protect maintains existing forest cover, judged against spatial data from 2014 and 2024. Driven by avoided deforestation &mdash; including the mitigation of legal land clearing and illegal logging &mdash; it preserves forests as carbon sinks, prevents habitat fragmentation, and supports the wellbeing of forest-dependent communities.</p>
    <p><strong>Eligibility comes from one category.</strong> Category 1, forest persisting: natural forest that was forest in 2014 and is still natural forest in 2024. The condition in 2024 may be intact or degraded within the forest gradient, but it remains forest. The tool reports the area and share of the project area eligible for Protect, alongside the total remaining forest and the disturbed share within it.</p>
    <h3>Two characteristics read against the pathway, not used to define it</h3>
    ${docTable(['Layer', 'What it indicates'], [
      ['<strong>Deforestation risk</strong>', 'Whether the standing forest is actually under pressure, which is the basis of an avoided unplanned deforestation baseline'],
      ['<strong>Forest landscape integrity index</strong>', 'How intact and well connected the forest is. High integrity favours Protect']
    ])}
    ${docCallout('When Protect is reported as ineligible', 'A project area whose forest remains intact <strong>with no significant deforestation risk detected</strong> is reported as ineligible for Protect on those grounds &mdash; because there is nothing to avoid.', 'note')}`,
    'protect') +

  docSection('7.7 &mdash; Manage', `
    <p>Manage balances human livelihoods with ecological health on land that stays in its current use. It covers <strong>silvofishery, paludiculture, soil and water enrichment, and buffer management</strong>. It raises the productivity of working land, lowers its carbon intensity, and reduces its ecosystem impact without requiring full rewilding.</p>
    ${docCallout('Manage is new in version 3', 'Version 2 had no equivalent: land under active use was either restored or excluded. The pathway matters because it covers the land where <strong>most people actually live and work</strong>, and because it requires no land-use change &mdash; which makes it the option most likely to be adopted and the cheapest per tonne.', 'note')}
    <h3>Four eligible categories</h3>
    ${docTable(['Category', 'What the land is'], [
      ['<strong>Cat 6</strong>', 'Forest recovery &mdash; not forest in 2014, natural forest in 2024, regenerated without planting. The intervention is to protect what is coming back rather than to plant.'],
      ['<strong>Cat 8B</strong>', 'Stable non-forest vegetation on a cultivated savanna reference'],
      ['<strong>Cat 9A</strong>', 'Cropland or rice that was already in production in 2014 and still is'],
      ['<strong>Cat 9C</strong>', 'Aquaculture outside mangrove and peat']
    ])}
    ${docCallout('When Manage is reported as ineligible', 'Where the forest remains intact and shows no sufficient signs of degradation; where forest has already been converted to barren land and is no longer suitable for a forest management intervention; or where most of the area is stable non-forest vegetation.', 'note')}`,
    'manage') +

  docSection('7.8 &mdash; Restore', `
    <p>Restore actively heals heavily degraded landscapes: degraded vegetation, barren land and long-term non-forested areas. Driven by the <strong>Afforestation, Reforestation and Revegetation (ARR)</strong> framework, it covers native species planting, ecosystem restoration and assisted natural regeneration. It re-establishes high-integrity cover, secures long-term carbon removals and rebuilds ecosystem services.</p>
    <h3>Six eligible categories</h3>
    ${docTable(['Category', 'What the land is'], [
      ['<strong>Cat 3B</strong>', 'Forest degraded to non-forest vegetation, on a non-savanna reference'],
      ['<strong>Cat 4B</strong>', 'Forest converted to active use, on a non-savanna reference'],
      ['<strong>Cat 5</strong>',  'Forest converted to barren'],
      ['<strong>Cat 8C</strong>', 'Stable non-forest vegetation on a richer reference'],
      ['<strong>Cat 9B</strong>', 'Aquaculture on mangrove or peat'],
      ['<strong>Cat 10</strong>', 'Stable barren land where a reference ecosystem exists']
    ])}
    <h3>Two conditions run through all six</h3>
    ${docTable(['Condition', 'Why'], [
      ['<strong>The reference ecosystem must support the restored state</strong>',
       'Restoring forest onto land whose natural reference is savanna is <em>conversion</em>, not restoration, so those categories are excluded.'],
      ['<strong>On peatland the intervention is hydrological before it is botanical</strong>',
       'Revegetation on degraded peat has a low likelihood of success while the water table remains drawn down, so the peatland activities lead with <strong>rewetting infrastructure</strong> and only then revegetation.']
    ])}
    ${docCallout('When Restore is reported as ineligible', 'Where forest cover still persists; where forest was converted to active use or non-forest use that is already established; or where the site is a natural ecosystem in its own right that does not need restoring.', 'note')}`,
    'restore') +

  docSection('7.9 &mdash; Carbon ineligible areas', `
    <p><strong>Carbon ineligible</strong> means no carbon project is credible on this land under the current framework. Non-carbon interventions may still exist. The pixel is <strong>reported, not hidden</strong>.</p>
    <p>It is a deliberate fourth outcome rather than a gap in the logic. It covers four very different situations, spread across six of the seventeen decision rows.</p>
    ${docTable(['Situation', 'Decision rows', 'Why it is excluded'], [
      ['<strong>Established plantation</strong>', 'Cat 2, Cat 7',
       'Additionality and integrity: recent conversion of natural forest to managed tree cover should not be rewarded, and plantation already in place in 2014 has no baseline to improve on.'],
      ['<strong>Forest loss on a savanna reference</strong>', 'Cat 3A, Cat 4A', 'The savanna guardrail &mdash; the restored state the carbon method would assume does not belong here.'],
      ['<strong>Stable natural savanna</strong>', 'Cat 8A', 'The savanna guardrail. A valuable ecosystem, but not one the present carbon framework can credit.'],
      ['<strong>Settlement</strong>', 'Cat 9D', 'Built environments sit outside the NbS frameworks the tool follows.']
    ])}
    ${docCallout('Keeping ineligible areas visible matters for due diligence', 'The tool reports the ineligible area <strong>with a sentence naming the reason</strong>, so a user can see whether the constraint is the land&rsquo;s history, its reference ecosystem, or its current use. An area that is carbon ineligible is not an area without conservation value.', 'note')}`,
    'ineligible') +

  docSection('From pathway to activity', `
    <p>The pathway and the reference ecosystem are the two join keys into the activity catalogue. Selecting an activity is what commits the project to a set of benefits and, through those, to a set of monitoring indicators. This is the shape of the catalogue in the current build:</p>
    ${m ? docTable(['Ecosystem', 'Activities'], m.ecosystems.map(x => [`<strong>${docEsc(x.name)}</strong>`, `<span class="num">${x.activities}</span>`])
            .concat([['<strong>Total</strong>', `<span class="num"><strong>${m.activityCount}</strong></span>`]]))
        : docCallout('Missing', docTodo('activity matrix not readable'), 'warn')}
    ${m ? docTable(['Pathway', 'Activities'], m.byPathway.map(x => [`<strong>${docEsc(x.pw)}</strong>`, `<span class="num">${x.n}</span>`])) : ''}
    ${m ? `<p>Those activities resolve to <strong>${m.benefitCount} distinct benefits</strong> across <strong>${m.categories.length} categories</strong> (${m.categories.map(docEsc).join(', ')}), measured by <strong>${docNum('indicators.total')} distinct indicators</strong>.</p>` : ''}
    ${docCallout('What selection does not decide', 'The matrix says an activity is <em>ecologically appropriate</em> for the site. It does not consider cost, available labour, community consent, land tenure, market access, or whether an implementing organisation exists nearby. A shortlist from this step is an input to a feasibility study, not a substitute for one.', 'warn')}`,
    'pathway-to-activity');
}

/* --------------------------------------- 8 / 8.1 Phase 5: potential benefit */
function docsPhase5() {
  const B = docParam('benefits', []);
  const quant = Array.isArray(B) ? B.filter(b => b.metric) : [];
  const qual  = Array.isArray(B) ? B.filter(b => !b.metric) : [];
  return docHero('PHASE 5', 'Potential benefit',
    'Potential benefit is the last phase and the one the whole chain exists to produce. The page is built from a set of quantified components that read rasters directly. Nothing is invented at this stage: every qualitative benefit shown comes from a benefit tag attached to an activity that the pathway logic already selected. If an activity is not eligible on this ground, its benefits do not appear.',
    ['Nature · People · Climate', 'General & unique', `${docNum('aoi.duration')}-year horizon`]) +

  docSection('8 &mdash; How benefits are split', `
    <p>Quantified and qualitative benefits sit side by side, and the interface marks which is which. The interface splits benefits two ways, and this documentation follows the same split.</p>
    ${docTable(['Split', 'Values', 'What it means'], [
      ['<strong>By pillar</strong>', 'Nature · People · Climate', 'The three sides of the triple-benefit framing the SCeNe Coalition works to'],
      ['<strong>By type</strong>', 'General · Unique',
       '<strong>General benefits</strong> are the outcomes any project on this pathway would deliver. <strong>Unique benefits</strong> depend on the specific conditions of the site &mdash; the threatened species present, or the hazards the community faces.']
    ])}
    ${docCallout('A benefit shown without a number is not a weaker benefit', 'It is one for which the tool has <strong>no defensible spatial method yet</strong>. Marking it as qualitative is the honest position, and it tells a project designer exactly what the monitoring plan has to fill in.', 'note')}`,
    'benefit-split') +

  docSection('8.1 &mdash; The benefit summary band', `
    <p>The summary band at the top of the page is a roll-up, not a separate calculation.</p>
    ${docTable(['Element', 'What it reports'], [
      ['<strong>Project overview</strong>', 'Number of activities, project duration in years, and total project area in hectares'],
      ['<strong>Pathways present</strong>', 'Protect, Manage and Restore shown as tags, with the carbon ineligible area reported separately'],
      ['<strong>Nature</strong>', 'Number of sub-components scored, and the reference ecosystems present'],
      ['<strong>People</strong>', 'Number of sub-components scored, and the number of households in the project area'],
      ['<strong>Climate</strong>', 'Number of sub-components scored, and the total carbon stock in tCO₂e']
    ])}`,
    'benefit-summary') +

  docSection('8.1 &mdash; The shared projection', `
    <p>Five quantified components share one projection, so it is stated once here and referenced by the components that use it. The question all five answer is the same: <strong>how much of this project area would be lost over the project duration if nothing were done, and where.</strong> The answer has two parts.</p>

    <h3>How much &mdash; a compounding projection of the historical deforestation rate</h3>
    ${docEquation('projected_loss_ha = risk_area_ha &times; (1 &minus; exp(&minus;r &times; t))',
      'where r = rate_pct ÷ 100, and t = project duration in years.')}
    <p>The tool calculates projected forest loss using the <strong>exponential Puyravaud (2003) formula</strong> rather than a linear one. This prevents over-projection over long timeframes and ensures the calculation asymptotically approaches the eligible area without exceeding it. The compounding approach provides a more realistic baseline for long-term projects than a simple linear multiplication of hectares-per-year figures.</p>

    <h3>Where &mdash; ranked allocation by deforestation risk</h3>
    <p>To determine where the loss occurs, the tool uses a <strong>ranked allocation method</strong> that prioritises pixels with the highest deforestation risk. Every eligible pixel is ranked from highest risk to lowest, and the tool moves down that list selecting the most threatened pixels one by one until the total selected area equals the projected loss.</p>
    ${docFlow([
      ['1', 'Eligible pixels', 'Pathway area &cap; pixels with a risk value'],
      ['2', 'Projected loss',  'Exponential Puyravaud over t years'],
      ['3', 'Rank by risk',    'Highest deforestation risk first'],
      ['4', 'Select',          'Until selected area = projected loss'],
      ['5', 'Intersect',       'With biomass, habitat or species rasters']
    ])}
    ${docCallout('Two biases the method states about itself', '<strong>Ranked allocation tends to attribute projected loss to frontier and edge forests</strong>, which often contain less biomass than intact interior forests &mdash; potentially giving lower carbon results than a uniform distribution would. The tool allows both methods to be compared. Separately, <strong>the deforestation rate is a project-area average</strong>, which may include degraded, fast-losing edge forest; applying that rate to Protect areas can overestimate the baseline.', 'warn')}`,
    'shared-projection') +

  docSection('What this build is currently reporting', `
    ${quant.length ? docTable(['Benefit', 'Figure', 'Measures'],
        quant.map(b => [
          `<strong>${docEsc(b.name)}</strong><br><small>${b.pathways.map(docEsc).join(' · ')}</small>`,
          `<span class="num">${docEsc(b.metric)} ${docEsc(b.unit)}</span>`,
          docEsc(b.metricLabel)
        ]))
      : docCallout('Missing', docTodo('benefit cards not readable from NBS_ANALYSIS'), 'warn')}
    ${qual.length ? `<h3>Reported qualitatively in this build</h3><ul>${qual.map(b => `<li><strong>${docEsc(b.name)}</strong> &mdash; ${b.pathways.map(docEsc).join(', ')}</li>`).join('')}</ul>` : ''}
    ${docCallout('Not certified, not tradeable, not a guarantee', 'These are screening estimates produced from area figures and published rates. They are not verified under any carbon or biodiversity standard, they cannot be sold or claimed as credits, and they do not commit the project to an outcome.', 'warn')}`,
    'benefit-current-reading');
}

/* ------------------------------------------------ 8.2 Nature benefits */
function docsBenefitNature() {
  return docHero('BENEFIT DETAIL', 'Nature benefits',
    'Five components make up the nature pillar: three general and two unique. Each states plainly what its number is, how it is derived, what it cannot support, and — for two of the five — that it is specified in the interface design but not yet implemented in the benefit notebook.',
    ['5 components', '3 general · 2 unique', '2 not yet implemented']) +

  docSection('8.2.1 &mdash; Maintenance of ecological connectivity', `
    <p><strong>Type.</strong> General benefit. Quantifiable.</p>
    <p><strong>What it reports.</strong> Whether the site holds habitat that links otherwise separate blocks, and how much of it.</p>
    <p><strong>How it is derived.</strong> Connectivity is assessed <em>structurally</em> with <strong>Morphological Spatial Pattern Analysis (MSPA)</strong> in GuidosToolbox, run on a binary habitat mask derived from the 2024 land cover map plus a surrounding landscape buffer. MSPA classifies each habitat pixel into a structural type: core, edge, perforation, bridge, loop, branch or islet. The <strong>bridge and loop</strong> classes are the connectors, and their area is what the narrative reports.</p>
    ${docTable(['Pathway', 'What the narrative reports'], [
      ['<strong>Protect</strong>', 'The intact block conserved and the corridor area within it'],
      ['<strong>Manage</strong>', 'The connector and edge habitat whose condition can be improved'],
      ['<strong>Restore</strong>', 'The number of separate patches that restoration would re-link']
    ])}
    ${docCallout('Limitations', '<strong>Structural connectivity is not functional connectivity.</strong> MSPA says the habitat is physically linked; it does not say any species uses the link. The buffer also means results depend on land cover <em>outside</em> the project boundary, which the project does not control.', 'warn')}
    ${docCallout('Status', 'Specified in the interface design. <strong>Not implemented in the benefit notebook at the time of writing.</strong>', 'warn')}`,
    'nature-connectivity') +

  docSection('8.2.2 &mdash; Protection of watershed function', `
    <p><strong>Type.</strong> General benefit. Quantifiable.</p>
    <p><strong>What it reports.</strong> The capacity of the landscape to capture, store, filter and slowly release water, and what keeping natural cover protects.</p>
    <p><strong>How it is derived.</strong> Reported <em>qualitatively</em> against the ecosystem and cover present. Keeping the site under healthy natural cover supports more stable river flow, lower erosion and sediment loads, and better water quality downstream.</p>
    <p><strong>What the tool says.</strong> &ldquo;Safeguarding this ecosystem helps protect the natural capacity of the landscape to capture, store, filter and slowly release water.&rdquo;</p>
    ${docCallout('Limitations', '<strong>No hydrological model is run.</strong> There is no catchment delineation, no water yield figure and no sediment figure. The claim is <em>directional, not quantified</em>, and should not be presented as a modelled result.', 'warn')}
    ${docCallout('Status', 'Specified in the interface design. <strong>Not implemented in the benefit notebook at the time of writing.</strong>', 'warn')}`,
    'nature-watershed') +

  docSection('8.2.3 &mdash; Enhanced biodiversity and ecosystem function', `
    <p><strong>Type.</strong> General benefit. Quantifiable.</p>
    <p><strong>What it reports.</strong> How many hectares of suitable habitat would be lost under the baseline, and therefore how much habitat loss conservation avoids.</p>
    <p><strong>How it is derived.</strong> Habitat loss avoided is the intersection of projected baseline deforestation with <strong>Area of Habitat</strong>. Area of Habitat comes from the species habitat rasters for mammals, birds, reptiles and amphibians, unioned into a single habitat mask. Projected loss follows the shared method, run inside the ecosystem mask on pixels that carry a risk value above the no-data floor. The overlap of the allocated loss with the habitat union is the habitat that would be expected to be lost under the baseline, and is therefore interpreted as habitat loss avoided through conservation.</p>
    ${docEquation('habitat_loss_avoided_ha = &Sigma; ( pixel_ha &times; allocated_loss &times; habitat_union )')}
    <p><strong>What the tool says.</strong> &ldquo;Conserving this forest ecosystem is estimated to avoid the loss of X hectares of suitable habitat over the project&rsquo;s t-year duration.&rdquo;</p>
    ${docCallout('Limitations', 'Area of Habitat is <strong>modelled suitable habitat, not confirmed occurrence</strong>, so the species count is a count of species that <em>could</em> be present. The union mask means one hectare of habitat shared by fifty species is counted once &mdash; correct for area, but it means the figure carries <strong>no information about species richness</strong>. For that reason the component reports the number of species overlapping the projected loss separately.', 'warn')}`,
    'nature-biodiversity') +

  docSection('8.2.4 &mdash; Reduced vulnerability to fire, pests and disease', `
    <p><strong>Type.</strong> Unique benefit. Quantifiable. <strong>Protect pathway.</strong></p>
    <p><strong>What it reports.</strong> Which threatened species have habitat in the project area, and what share of that habitat projected deforestation would take.</p>
    <p><strong>How it is derived.</strong> The species inventory is filtered to those whose habitat raster intersects the project area. For each species the tool computes its Area of Habitat inside the boundary, intersects that habitat with the allocated projected loss, and expresses the overlap as a share of the species&rsquo; habitat in the project area. <strong>Threatened</strong> means Critically Endangered, Endangered or Vulnerable on the IUCN Red List. The overall figure is the sum of avoided habitat across threatened species divided by the sum of their habitat in the project area.</p>
    ${docEquation('avoided_habitat_loss_pct = &Sigma; avoided_ha (all threatened species) &divide; &Sigma; habitat_aoi_ha (all threatened species) &times; 100')}
    <p><strong>What the tool says.</strong> &ldquo;By protecting at-risk habitat, this project supports habitat for N species, including X% threatened species: a CR, b EN and c VU. Over the project&rsquo;s t-year duration, the intervention <em>may</em> reduce threat levels by protecting at least P% of habitat for M threatened species.&rdquo;</p>
    ${docCallout('Limitations', 'The method is an adaptation of the <strong>IUCN STAR</strong> threat metric, and it is a simplified one. STAR weights a species&rsquo; contribution by its extinction risk <em>and</em> by the share of its global range affected, whereas this component works on the share of habitat inside the project area only. A species with 1% of its global range in the project area and one with 90% are treated identically. <strong>The framing &ldquo;may reduce threat levels&rdquo; is deliberate and should not be tightened.</strong>', 'warn')}`,
    'nature-species') +

  docSection('8.2.5 &mdash; Improved forest productivity and regeneration', `
    <p><strong>Type.</strong> Unique benefit. Quantifiable. <strong>Manage and Restore pathways.</strong></p>
    <p><strong>What it reports.</strong> The potential biodiversity uplift from restoration, expressed in condition-adjusted hectares, and the habitat gain per species.</p>
    <p><strong>How it is derived.</strong> A spatially explicit adaptation of the area-adjusted <strong>Condition</strong> approach of the <strong>SD VISta Nature Framework v1.0</strong>, which defines area-adjusted condition as ecosystem extent multiplied by standardised ecosystem condition. The tool applies that relationship at pixel level and sums the difference between projected project condition and baseline condition across eligible restoration pixels.</p>
    ${docEquation('uplift&#8348; = A_restore &times; ( C_project,&#8348; &minus; C_baseline,&#8348; )', 'The framework definition.')}
    ${docEquation('gain_rate = gain_ha(10 yr) &divide; restore_ha &divide; 10<br>degradation_rate = degradation_ha(10 yr) &divide; restore_ha &divide; 10<br>condition_uplift = min( 1.0, (gain_rate + degradation_rate) &times; t )<br>biodiversity_uplift_ha = restore_ha &times; condition_uplift',
      'The formula as implemented.')}
    <p><strong>What the tool says.</strong> &ldquo;By restoring degraded areas, this project may expand habitat for N species, including X% threatened species. Over the project&rsquo;s t-year duration, the intervention may increase suitable habitat by P% on average, with an area-weighted gain of Q%.&rdquo;</p>
    ${docCallout('Limitations — a known divergence between definition and implementation', 'Condition is <strong>inferred</strong> from observed tree-cover gain and degradation rates over the 2014&ndash;2024 window, not measured directly. The implementation <strong>adds the degradation rate to the gain rate</strong>, which treats observed degradation as additional condition headroom the project can recover, rather than as a decline in the baseline. That reading is defensible as the total condition gap a project could close, but it is not the only reading of C_project &minus; C_baseline, and <strong>it inflates the uplift on sites that are degrading fast</strong>. The result is condition-adjusted hectares &mdash; a screening unit, not a biodiversity credit.', 'warn')}`,
    'nature-uplift');
}

/* ------------------------------------------------ 8.3 People benefits */
function docsBenefitPeople() {
  return docHero('BENEFIT DETAIL', 'People benefits',
    'In version 3 the people pillar is purely qualitative and generates no numbers from raster data, as the interface indicates. That is a deliberate constraint, not a gap waiting to be filled with a proxy.',
    ['Qualitative by design', '4 general benefits', '5 unique benefits']) +

  docSection('8.3 &mdash; Why the people pillar carries no numbers', `
    <p>Key outcomes such as <strong>tenure security, benefit sharing, governance capacity and cultural continuity are institutional and unobservable via satellite</strong>. Creating spatial proxies for them would lack a defensible link to actual outcomes.</p>
    ${docCallout('The sole exception', 'Protection of watershed function is quantifiable for the <strong>Protect and Restore</strong> pathways in areas facing soil erosion risk &mdash; though even there it runs no hydrological model.', 'note')}`,
    'people-qualitative') +

  docSection('8.3.1 &mdash; General benefits', `
    <p>These are delivered by any project on the pathway.</p>
    ${docTable(['Benefit', 'What it means'], [
      ['<strong>Enhanced food and water security</strong>',
       'Year-round, climate-resilient community access to critical nutritional and hydrological resources, by stabilising and restoring vital ecosystem functions.'],
      ['<strong>Sustainable livelihood opportunities</strong>',
       'Climate-adaptive, nature-positive revenue streams that allow households to withstand economic shocks without degrading or depleting the local natural resource base.'],
      ['<strong>Strengthened social capital and governance capacity</strong>',
       'Community cohesion, institutional trust, and local legislative and operational capacity to manage resources, enforce rules and resolve conflicts independently.'],
      ['<strong>Equitable benefit-sharing mechanisms</strong>',
       'Transparent, inclusive and legally binding frameworks that distribute project rewards and resource rights fairly, and actively prevent elite capture.']
    ])}
    ${docSource('Table 14')}`,
    'people-general') +

  docSection('8.3.2 &mdash; Unique benefits', `
    <p>Each is tied to a specific pathway.</p>
    ${docTable(['Benefit', 'Pathway', 'What it means'], [
      ['<strong>Secure land and resource tenure</strong>', 'Protect',
       'Formalisation, legal protection and institutional enforcement of a community&rsquo;s rights to possess, use, manage and inherit land and natural resources, safeguarding them against displacement and unauthorised exploitation.'],
      ['<strong>Cultural heritage preservation</strong>', 'Protect',
       'Safeguarding and transmission of a community&rsquo;s intangible traditions, local ecological knowledge, sacred sites and customary ways of life that are intertwined with the landscape.'],
      ['<strong>Sustainable livelihood opportunities</strong>', 'Manage',
       'Income streams anchored in ecosystem services and the sustainable harvesting of non-timber forest assets, including nursery work, planting and NTFP species inclusion.'],
      ['<strong>Sustainable livelihood opportunities</strong>', 'Restore',
       'The same income streams, anchored in restoration services rather than in ongoing management.'],
      ['<strong>Protection of watershed function</strong>', 'Protect and Restore',
       'Reduced soil erosion and sediment reaching nearby rivers, helping maintain water quality for downstream users. Applied only in areas exposed to soil erosion risk.']
    ])}
    ${docSource('Table 15')}`,
    'people-unique') +

  docSection('What the People Context can and cannot tell you', `
    <p>The People Context pane in Phase 2 supplies the socio-economic picture behind these benefits. Two limits govern how any of its figures should be read.</p>
    ${docCallout('Gridded and jurisdiction-based data describe a place, not a community', 'The population layers describe the population of the cells the project area covers, not the community that holds rights over it. The national indicators are published for an administrative unit, which may be far larger than the site. <strong>Tenure, customary claims and community composition are not spatial layers in this tool</strong> and have to come from the socio-economic form.', 'warn')}
    ${docCallout('Vulnerability classes are ordinal, not quantities', 'The four ADPC vulnerability dimensions &mdash; physical, environmental, economic, social &mdash; are reported as four <strong>independent</strong> cards. No composite score is calculated, because the four are not commensurable and averaging them would hide the dimension that actually constrains a project. Do not average, subtract or convert them.', 'warn')}`,
    'people-context-limits');
}

/* ---------------------------------------- 8.4 Climate benefits and carbon */
function docsBenefitClimate() {
  const c = docParam('carbon', {}) || {};
  const av = c.avoided, sq = c.sequestration;
  const dur = docParam('aoi.duration', null);
  const el  = docParam('aoi.eligible', null);
  return docHero('BENEFIT DETAIL', 'Climate benefits and carbon',
    'The climate pillar carries the carbon quantification and two site-specific components. Carbon is the part of this tool most likely to be quoted out of context, so each component states plainly what its number is and what it is not.',
    ['tCO₂e', `${docNum('aoi.duration')}-year horizon`, 'Gross &rarr; net']) +

  docSection('8.4 &mdash; Two figures from opposite sides of the pathway assignment', `
    ${docTable(['Component', 'Side', 'What is being counted'], [
      ['<strong>8.4.2 Reduced emissions from deforestation and degradation</strong>', 'Protect',
       'Avoided emissions from deforestation that would otherwise happen'],
      ['<strong>8.4.3 Increased carbon sequestration and storage</strong>', 'Restore',
       'Removals from growth that would otherwise not happen']
    ])}
    <p>They are in the same units over the same duration, so they can be presented side by side without conversion.</p>
    ${docCallout('The Manage carbon component is not started', 'The Manage qualitative benefits already appear in the general benefit list, but there is no Manage carbon figure. An absence here is an absence, not a zero.', 'warn')}`,
    'climate-two-figures') +

  docSection('8.4.1 &mdash; Constants used', `
    ${docTable(['Constant', 'Value', 'Meaning'], [
      ['<code>CARBON_FRACTION (CF)</code>', '<span class="num">0.47</span>',
       'Dry matter to carbon, IPCC 2006 GL Vol 4 Ch 4. Mangrove uses <strong>0.451</strong> in the ARR method.'],
      ['<code>CO2_PER_C</code>', '<span class="num">44 / 12</span>',
       'Molecular weight ratio, tCO₂e per tC. A CO₂ molecule weighs about 3.67 times more than a bare carbon atom.'],
      ['<code>ROOT_TO_SHOOT_RATIO (R)</code>', '<span class="num">0.28</span>',
       'Used by 8.4.2 to derive below-ground from above-ground biomass. The ARR method (8.4.3) uses <strong>per-ecosystem ratios</strong> instead.'],
      ['<code>BASELINE_RATE_MAX_YEARS</code>', '<span class="num">10</span>',
       'The window the deforestation rate is measured over. Longer durations extrapolate and are flagged.']
    ])}
    ${docSource('Table 16')}`,
    'carbon-constants') +

  docSection('8.4.2 &mdash; Reduced emissions from deforestation and degradation', `
    <p><strong>What it reports.</strong> How much CO₂e a Protect project could keep out of the atmosphere over its lifetime.</p>
    <p><strong>What kind of claim it is.</strong> This is the <strong>avoided unplanned deforestation (AUD)</strong> case: loss driven by diffuse, unsanctioned pressure, which is why the baseline comes from a spatial risk model rather than from a document. <em>Avoided planned deforestation is a different construct with a different baseline and is not what this component estimates.</em></p>

    <h3>Step 1 &mdash; Determine the eligible protection area</h3>
    ${docEquation('Total Protect Area = &Sigma; ( pixels designated for Protect &cap; pixels with a risk value )')}

    <h3>Step 2 &mdash; Project future forest loss (the baseline)</h3>
    ${docEquation('Projected Loss&#8348; = Total Protect Area &times; (1 &minus; e<sup>&minus;r&times;t</sup>)',
      't = the number of years into the future. r = the historical annual deforestation rate as a decimal (a 2% historical rate becomes 0.02). e = Euler’s number, ≈ 2.718.')}

    <h3>Step 3 &mdash; Allocate the projected loss spatially</h3>
    <p>Not all forest is equally vulnerable. Instead of assuming average carbon loss across the whole map, the model pinpoints which trees would fall first: every eligible pixel is ranked from highest deforestation risk to lowest, and the tool selects the most threatened pixels one by one until their total area equals the projected loss from step 2.</p>

    <h3>Step 4 &mdash; Calculate avoided emissions</h3>
    ${docEquation('Avoided Emissions&#8348; = &Sigma; ( AGB &times; (1 + 0.28) &times; 0.47 &times; 44/12 )')}
    ${docTable(['Term', 'What it is'], [
      ['<strong>AGB</strong>', 'Above-Ground Biomass — the physical dry weight of the wood, branches and leaves above ground, in megagrams per hectare'],
      ['<strong>(1 + 0.28)</strong>', 'Accounts for below-ground biomass (roots). Because there is no separate map for roots, the formula assumes roots add an extra 28% to the visible tree mass — a root-to-shoot ratio of 0.28'],
      ['<strong>0.47</strong>', 'Carbon fraction — the standard proportion of dry biomass that is pure carbon'],
      ['<strong>44/12</strong>', 'The chemical multiplier converting pure carbon to CO₂ equivalent']
    ])}
    ${docCallout('A transcription note on the source', 'The formula line in the methodology document reads &ldquo;<code>&times; 44/7</code>&rdquo;, while the bullet immediately beneath it defines the term as <strong>44/12</strong> and describes the 3.67&times; ratio that 44/12 produces. <code>44/12</code> is used here, as the document&rsquo;s own definition and its constants table (8.4.1) both specify. <strong>The source line should be corrected in the next revision.</strong>', 'warn')}
    ${(av && el && dur) ? docExample('Gross avoided emissions, this build',
      `<p>The tool reports a gross avoided figure of <strong>${docFmt(av.gross)} tCO₂e</strong> across <strong>${docFmt(el)} ha</strong> over ${dur} years.</p>
       <ul><li>per hectare over the whole period = ${docFmt(av.gross)} &divide; ${docFmt(el)} = <strong>${docFmt(av.perHa, 1)} tCO₂e/ha</strong></li>
       <li>per hectare per year = ${docFmt(av.perHa, 1)} &divide; ${dur} = <strong>${docFmt(av.perHa / dur, 2)} tCO₂e/ha/yr</strong></li></ul>`,
      `Effective avoided rate: <strong>${docFmt(av.perHa / dur, 2)} tCO₂e per hectare per year</strong>.`) : ''}`,
    'carbon-avoided') +

  docSection('8.4.3 &mdash; Increased carbon sequestration and storage', `
    <p><strong>What it reports.</strong> The carbon a restoration project could remove over its lifetime, as an <em>ex-ante</em> estimate.</p>
    <p><strong>How it is derived.</strong> The reference-rate method applied per hectare and summed over eligible pixels. Growth runs in two phases &mdash; <strong>young in years 1 to 20</strong> and <strong>old in years 21 to 40</strong> &mdash; at rates given per ecosystem and, for dryland, per climatic zone.</p>
    ${docEquation('1. AGB = (Growth Rate_young &times; Years_young) + (Growth Rate_old &times; Years_old)', 'Above-ground biomass in Mg of dry matter per hectare.')}
    ${docEquation('2. Total Biomass = AGB &times; (1 + R)', 'R is the per-ecosystem root-to-shoot ratio from the table below — not the flat 0.28 used by 8.4.2.')}
    ${docEquation('3. Total CO₂e = Total Biomass &times; Carbon Fraction &times; 44/12')}
    ${docEquation('4. Net CO₂e = Total CO₂e &minus; Baseline CO₂e')}
    ${docEquation('5. Adjusted Net CO₂e = Net CO₂e &times; Stocking Factor',
      'Stocking Factor represents tree density: active planting gets 100% of the calculated potential (1.0); Assisted Natural Regeneration (ANR) is estimated at 80% (0.8).')}
    ${docEquation('6. Total Project Carbon = &Sigma; ( Adjusted Net CO₂e per pixel &times; area of pixel )')}
    ${docEquation('7. Low Estimate = Total Project Carbon &times; 0.70<br>&nbsp;&nbsp; High Estimate = Total Project Carbon &times; 1.20',
      'A conservative worst case assuming 30% underperformance, and an optimistic best case assuming 20% overperformance.')}

    <h3>Reference accumulation rates</h3>
    <p>In megagrams of dry matter per hectare per year.</p>
    ${docTable(['Ecosystem or zone', 'Young Y1&ndash;20', 'Old Y21&ndash;40', 'Root:shoot R', 'Carbon fraction'], [
      ['<strong>Mangrove</strong>',                 '<span class="num">12.0</span>', '<span class="num">7.0</span>', '<span class="num">0.39</span>', '<span class="num">0.451</span>'],
      ['<strong>Peatland</strong>',                 '<span class="num">5.7</span>',  '<span class="num">3.5</span>', '<span class="num">0.25</span>', '<span class="num">0.47</span>'],
      ['<strong>Dryland, humid lowland</strong>',   '<span class="num">3.4</span>',  '<span class="num">2.7</span>', '<span class="num">0.21</span>', '<span class="num">0.47</span>'],
      ['<strong>Dryland, seasonal lowland</strong>','<span class="num">2.4</span>',  '<span class="num">2.0</span>', '<span class="num">0.44</span>', '<span class="num">0.47</span>'],
      ['<strong>Dryland, humid montane</strong>',   '<span class="num">2.4</span>',  '<span class="num">1.9</span>', '<span class="num">0.32</span>', '<span class="num">0.47</span>']
    ])}
    ${docSource('Table 17, from NBS-v3-ANX-B §4.6')}

    <h3>How the dryland zone is chosen, per pixel</h3>
    <p>Derived from elevation and the twelve monthly precipitation bands:</p>
    ${docTable(['Zone', 'Condition'], [
      ['<strong>Humid montane</strong>', 'Elevation above 1000 m'],
      ['<strong>Humid lowland</strong>', 'Otherwise, if annual rainfall is above 2000 mm <em>and</em> there are fewer than three dry months, where a dry month is below 100 mm (Walsh 1996)'],
      ['<strong>Seasonal lowland</strong>', 'Everything else, including boundary and missing-data pixels — the conservative choice']
    ])}
    ${docCallout('One project area can carry three rates', 'Because the zone is decided per pixel, a single category can carry three different growth rates across one project area.', 'note')}

    <h3>The baseline deducted at step 4</h3>
    <p>Class-based: a small assumed standing biomass per current land cover state, converted through the same chain and clamped at zero.</p>
    ${docTable(['Ecological state', 'Assumed standing biomass'], [
      ['<strong>C4</strong> — non-forest vegetation', '<span class="num">25</span> Mg/ha'],
      ['<strong>C5</strong> — active anthropogenic use', '<span class="num">5</span> Mg/ha'],
      ['<strong>C6</strong> — barren', '<span class="num">0</span> Mg/ha']
    ])}
    <p>This replaced a per-pixel biomass baseline, which zeroed almost all vegetated Restore land because the source reads a high baseline at low biomass. <strong>The per-pixel baseline and the gross figure are still computed and reported alongside for comparison.</strong></p>

    ${docCallout('Limitations', 'The low and high figures are simply the total multiplied by 0.7 and 1.2. They are an <strong>indicative screening range, not a confidence interval and not a creditable volume</strong>. Beyond year 40 nothing further is credited; the curve is defined only that far, and a longer duration is flagged. No-data above-ground biomass counts as a <strong>zero baseline, which over-credits</strong> — the opposite direction to the equivalent rule in 8.4.2. And even when peat is re-enabled it is <strong>biomass only</strong>: peat soil carbon and avoided emissions from rewetting, usually the largest peat pool, stay out of scope.', 'warn')}`,
    'carbon-sequestration') +

  docSection('8.4.4 &mdash; Net carbon figures', `
    <p>The three net components appear <strong>only when the user answers Yes to the carbon project question</strong>. Otherwise they stay deactivated, and only the gross figures of 8.4.2 and 8.4.3 are shown.</p>

    <h3>8.4.4.1 &mdash; Net carbon emission reduction (the Protect side)</h3>
    ${docEquation('Net Protect Credits = Gross Avoided &minus; (Gross Avoided &times; Leakage) &minus; (Gross Avoided &times; Uncertainty) &minus; (Gross Avoided &times; Buffer)',
      'Gross Avoided Emission is read directly from component 8.4.2.')}
    <p><em>What the tool says.</em> &ldquo;Net carbon emissions reduction is estimated at X tCO₂e after applying deductions to the total estimated carbon reduction of Y tCO₂e.&rdquo;</p>

    <h3>8.4.4.2 &mdash; Net carbon sequestration (the Restore side)</h3>
    ${docEquation('Net Restore Credits = Gross Removal &minus; (Gross Removal &times; Leakage) &minus; (Gross Removal &times; Uncertainty) &minus; (Gross Removal &times; Buffer)',
      'Gross Carbon Removal is read directly from component 8.4.3.')}
    <p><em>What the tool says.</em> &ldquo;Net carbon sequestration is estimated at X tCO₂e after applying deductions to the total estimated carbon sequestration of Y tCO₂e.&rdquo;</p>

    <h3>8.4.4.3 &mdash; Estimated net emission reductions and removals</h3>
    <p>The two sides combined, as the headline figure for a carbon project.</p>
    ${docEquation('1. Adjusted Total = (Gross Protect &minus; Protect Deduction) + (Gross Restore &minus; Restore Deduction)')}
    ${docEquation('2. Final Net Credits = Adjusted Total &minus; (Adjusted Total &times; Buffer %)')}
    ${docEquation('3. Annual Credits = Final Net Credits &divide; Project Duration (years)')}
    <p><strong>The buffer is applied once</strong>, to the combined leakage- and uncertainty-adjusted total, rather than separately to each side.</p>
    <p><em>What the tool says.</em> &ldquo;Over a t-year crediting period, the project area could generate an estimated X tCO₂e of net emission reductions and removals, an average of Y tCO₂e per year.&rdquo;</p>

    ${docCallout('One inconsistency that must be flagged, not smoothed over', 'The narrative printed by component 8.4.4.3 states that the figure <em>does not yet subtract</em> the buffer contribution, while the code that produces it <em>does</em> subtract the buffer. <strong>The number and the sentence describing it disagree.</strong> Until this is reconciled: treat <code>net_ERR</code> as buffer-deducted, disregard the sentence, and <strong>do not quote the narrative to a third party.</strong>', 'warn')}

    <h3>What the three deductions are for</h3>
    ${docTable(['Deduction', 'Share of gross in this build', 'Why it exists'], [
      ['<strong>Leakage</strong>', av?.leakageShare != null ? docPct(av.leakageShare, 0) : docTodo('leakage share not readable'),
       'Pressure displaced rather than removed — clearing that simply moves to a neighbouring area'],
      ['<strong>Uncertainty</strong>', av?.uncertaintyShare != null ? docPct(av.uncertaintyShare, 0) : docTodo('uncertainty share not readable'),
       'A conservative allowance for error in the area, stock and rate inputs'],
      ['<strong>Buffer</strong>', av?.bufferShare != null ? docPct(av.bufferShare, 0) : docTodo('buffer share not readable'),
       'A reserve held back against reversal — fire, storm, illegal clearing after the fact'],
      ['<strong>Net retained</strong>', av?.netShare != null ? `<strong>${docPct(av.netShare, 0)}</strong>` : docTodo('net share not readable'),
       'What remains reportable after all three']
    ])}
    ${(av && sq) ? docExample('Gross to net, both flows, this build',
      `<p><strong>Avoided emissions</strong></p>
       <ul><li>gross ${docFmt(av.gross)} &minus; leakage ${docFmt(av.leakage)} &minus; uncertainty ${docFmt(av.uncertainty)} &minus; buffer ${docFmt(av.buffer)}</li>
       <li>= <strong>${docFmt(av.net)} tCO₂e</strong></li></ul>
       <p><strong>Sequestration</strong></p>
       <ul><li>gross ${docFmt(sq.gross)} &minus; leakage ${docFmt(sq.leakage)} &minus; uncertainty ${docFmt(sq.uncertainty)} &minus; buffer ${docFmt(sq.buffer)}</li>
       <li>= <strong>${docFmt(sq.net)} tCO₂e</strong></li></ul>`,
      `Net ERRs = ${docFmt(av.net)} + ${docFmt(sq.net)} = <strong>${docFmt(av.net + sq.net)} tCO₂e</strong> over ${dur} years &mdash; an illustrative screening figure, not a certifiable result.`)
      : docCallout('Missing', docTodo('carbon deduction chain not readable from the benefit formulas'), 'warn')}
    ${c.assumptionsNote ? `<h3>Assumptions as the product states them</h3>
      <div class="doc-callout note"><span>From the Data Analyser</span>${c.assumptionsNote}</div>` : ''}`,
    'carbon-net') +

  docSection('8.4.5 &mdash; Enhanced resilience to climate hazards', `
    <p><strong>What it reports.</strong> The reduction in people&rsquo;s and assets&rsquo; exposure to climate hazards achieved by using healthy ecosystems as natural buffers.</p>
    <p><strong>How it is derived.</strong> Combines the ADPC climate disaster risk layers with forest cover and gridded population. The area where the intervention overlaps mapped hazard exposure gives the <em>buffered area</em>, and the population within it gives the people or households whose risk is lowered.</p>
    <p><em>What the tool says.</em> &ldquo;Implementing NbS in this ecosystem can reduce disaster exposure across an estimated X hectares, helping to lower risk for an estimated Y people over the project&rsquo;s t-year duration.&rdquo;</p>
    ${docCallout('Limitations', 'The link between cover and hazard reduction is treated as <strong>binary presence, not modelled attenuation</strong>. The component says exposure overlaps intervention; it does not model how much a given hazard is attenuated by a given amount of cover. The hazard layers also carry the four-versus-five class inconsistency noted in the threat profile.', 'warn')}`,
    'climate-resilience') +

  docSection('8.4.6 &mdash; Microclimate regulation', `
    <p><strong>What it reports.</strong> The moderation of local temperature by vegetation, through canopy shading and evapotranspiration, expressed as the tree-cover area delivering that cooling function.</p>
    <p><strong>How it is derived.</strong> Uses the forest cover benchmark to derive an annual gain rate, then projects it forward linearly.</p>
    ${docEquation('annual_gain_rate = total_gain(2014 to 2024) &divide; 10',
      'Total tree cover gain is the measured increase in forest area over that decade; dividing by the ten years of the baseline period yields the average new forest added per year.')}
    ${docEquation('projected_gain = annual_gain_rate &times; years from 2024 to project end',
      'Multiplying the historical annual speed by the years remaining estimates the total new tree cover that will eventually exist to moderate local temperature.')}
    <p><em>What the tool says.</em> &ldquo;Conserving this ecosystem, with an estimated X hectares of tree cover increase, helps regulate the local microclimate over the project&rsquo;s t-year duration.&rdquo;</p>
    ${docCallout('Limitations', 'Linear extrapolation assumes the gain rate stays constant. <strong>Tree-cover gain is rarely linear</strong>: regrowth can accelerate once established, or plateau as land runs out or succession matures. A flat annual average is the simplest defensible assumption but drifts from reality the further it is projected. The cooling effect itself is <strong>cited from De Frenne et al. (2019) rather than modelled for the site</strong>.', 'warn')}`,
    'climate-microclimate') +

  docSection('What the carbon method does not do', `
    ${docCallout('Not a carbon standard calculation', 'This is a screening estimate. It does not follow the requirements of Verra, Gold Standard, ART-TREES or any national registry: there is no project-specific baseline scenario, no additionality test, no formal uncertainty propagation, no independent validation, and no monitoring record behind the figure. <strong>Nothing here can be issued or traded as a credit.</strong>', 'warn')}
    <p>Three further gaps are worth naming. Rates are <strong>regional averages, not site measurements</strong> &mdash; actual growth and stock vary widely with soil, hydrology and management. <strong>Peatland emissions depend strongly on water-table depth</strong>, which this method does not model, and peat soil carbon is out of scope entirely. And the estimate assumes the carbon stays stored for the full duration; <strong>permanence beyond the project period is not assessed at all</strong>.</p>`,
    'carbon-limits');
}

/* ============================================================================
   ANNEX A — SPATIAL DATA LAYERS
   Every layer the tool reads, described the same way: why it is there, where
   the data and the method come from, what the tool does with it, what is
   checked, where it appears in the interface, and what a reader should not
   conclude from it. Organised by the screen each layer appears on.
   ========================================================================== */

const ANNEX_INTRO = `<p>Each layer below is described the same way: why it is there, where the data and the method come from, what the tool does with it, what is checked, where it appears in the interface, and what a reader should <em>not</em> conclude from it. Open a layer to read its full record.</p>`;

/* ------------------------------------------------ A.1 General context */
function docsAnnexGeneral() {
  return docHero('ANNEX A.1', 'General context layers',
    'Ten layers that answer where the site is and what it is made of. Three of them — Land Cover 2024, Forest Cover 2014 and the deforestation rate — carry the whole downstream chain, and an error in any of them propagates into every pathway and every benefit figure.',
    ['10 layers', 'F02 General Context', '3 carry the chain']) +

  docSection('A.1 &mdash; Where the site is', ANNEX_INTRO +

    docLayer('Administrative Boundary',
      'Dominant district and province; list of overlapping administrative units with overlap area (ha) and share of the project area.', {
      why: 'It names the jurisdictions a project sits in, which sets who must consent, which permits apply, which sub-national statistics can be attached to the site, and which national baseline the deforestation risk is compared against. The country result gates which national datasets and policies apply, and the province result links the site to the deforestation risk regions.',
      citation: 'Global Administrative Areas (2012). GADM database of Global Administrative Areas, version 2.0, www.gadm.org. The layer used is GADM v4.1.',
      attributes: 'Country (level 0), province (NAME_1), district (NAME_2), overlap area in hectares and share of the project area. Narrative: &ldquo;This project area is majorly located in [district], [province] with an approximate total area of [ha] hectares&rdquo;, followed by a table of the other overlapping districts where more than one is present.',
      sources: 'GADM v4.1, one combined administrative boundary layer for Southeast Asia (<code>SEA_Administrative_Boundaries_4326_revised</code>).',
      prep: 'Dissolved by the NAME columns rather than by GID, because GID_1 and GID_2 are blank for Indonesia in this release. Reprojected to the reference CRS before intersection.',
      method: 'Polygon intersection between the project area and the dissolved administrative units, with area computed in the equal-area CRS. Units contributing less than <strong>1.0%</strong> of the project area are dropped as slivers &mdash; a stricter rule than the pure-presence rule used for raster layers, because boundary geometry is coarser than a 30 m raster. The headline province is taken from the dominant district&rsquo;s own NAME_1 rather than from a separate province intersection, so the district and province named in one sentence can never disagree.',
      screen: 'F02 Site Characterisation &mdash; General Context, &ldquo;Administration&rdquo; (text list or table).',
      limits: 'The level of administrative detail available varies by country: Indonesia goes to level 4, Singapore only to level 1, so a district row is not available everywhere. <strong>GADM is not an authoritative legal boundary source and should not be used to determine jurisdiction or tenure.</strong> Validation has been carried out for Indonesia only.'
    }) +

    docLayer('Protected Area',
      'Overlap area (ha) with protected areas and the designation type of each.', {
      why: 'Protection status is a key eligibility and additionality signal. A project inside a strict protected area (IUCN Ia, Ib, II) is hard to justify on additionality, while a biodiversity-important site that carries no legal protection strengthens the case for a Protect pathway.',
      citation: 'UNEP-WCMC and IUCN. Protected Planet: The World Database on Protected Areas (WDPA). Cambridge, UK. www.protectedplanet.net.',
      attributes: 'Protected-area name, designation type (DESIG_ENG), IUCN category, overlap area in hectares. Narrative: &ldquo;Besides, this project area overlaps with [X] hectares of protected areas. The protected area within the polygon is designated for [designation].&rdquo;',
      sources: 'World Database on Protected Areas (WDPA), polygon features, clipped to Southeast Asia. Updated monthly at source; the tool carries a dated snapshot.',
      prep: 'Filtered to STATUS in {Designated, Inscribed, Established}; pure marine sites (REALM = Marine) dropped while coastal sites are kept so mangrove protection is not lost; polygon features only, points excluded.',
      method: 'Polygon intersection with the project area. The headline overlap uses the <strong>union</strong> of all protected-area polygons, because WDPA sites overlap one another and summing per site can exceed the project area. <strong>No sliver threshold is applied</strong> &mdash; even a small overlap is legally meaningful. Duplicate designation types are collapsed, so two national parks read as &ldquo;National Park&rdquo; once, ordered by total overlap area.',
      screen: 'F02 Site Characterisation &mdash; General Context, &ldquo;Protection / zoning status&rdquo; (badge or tag list).',
      limits: 'Protected area data are compiled from the WDPA and provided as is. They may differ from official national records and <strong>should not be treated as a legal reference</strong>; the boundaries and designations shown imply no opinion on the legal status of any territory or its frontiers. For authoritative information, refer to the relevant national authority.'
    }) +

    docSource('Table A1'),
    'annex-a1-where') +

  docSection('A.1 &mdash; What is standing on it',

    docLayer('Land Cover 2024',
      'Area (ha) and share of the project area for each of the 20 land cover classes, plus the six largest classes as a headline.', {
      why: 'Land cover is the base layer of the tool. It characterises the environmental state of the site and is the primary input to the ecological state classification that drives pathway selection. Several downstream layers &mdash; the forest mask, the ecosystem composite and the trajectory &mdash; are derived from it rather than mapped separately.',
      citation: 'Saah, D., Tenneson, K., Poortinga, A., Nguyen, Q., Chishtie, F., Aung, K. S., Markert, K. N., et al. (2020). Primitives as building blocks for constructing land cover maps. <em>International Journal of Applied Earth Observation and Geoinformation</em>, 85, 101979. Satellite embeddings: Brown et al. (2025), AlphaEarth Foundations.',
      attributes: '20 classes: Aquaculture, Barren, Cropland, Crop Plantation, Deciduous, Evergreen, Flooded Forests, Forest Plantation, Grass, Mangrove, Mixed Forest, Oil Palm, Rice, Rubber, Shrub, Settlement, Water, Wetlands, Snow and ice, and Other land. Reported as area (ha) and share (%).',
      sources: 'SERVIR Regional Land Cover Monitoring System (RLCMS), SIGnal land cover 2024, 30 m. Input features are the 64 bands of the AlphaEarth Foundations 2024 annual embedding layer.',
      prep: 'Raw satellite imagery is pre-processed and encoded through the AlphaEarth Foundations embedding field model, which produces analysis-ready, stabilised annual representations with built-in handling of atmospheric and radiometric variability. The 2024 annual 64-band embedding layer is used for inference, so no manual covariate engineering (NDVI, EVI, SAVI and similar) is required.',
      method: 'Two steps. <strong>Step 1, primitives:</strong> each land cover class is modelled separately as a probability surface from the 64 embedding bands, in Google Earth Engine. <strong>Step 2, assemblage:</strong> all primitive layers are combined through a hierarchical decision tree that also applies tree canopy cover (TCC), tree canopy height (TCH) and a minimum mapping unit. The tree retains high-probability locations at each successive layer; where no location meets the criteria the area becomes a terminal node, otherwise it returns to the root node. The process is re-run iteratively until validation is satisfactory. In the tool, the finished map is clipped to the project area and the area of each class is tabulated, with the total project area as denominator.',
      qa: 'Accuracy assessment follows Olofsson et al. (2014), using stratified random sampling and Collect Earth Online for reference data. Area weights are computed per class per country; expected user&rsquo;s accuracy is assigned per class from 0.5 for spectrally difficult classes (rubber, plantation) to 0.9 for distinct ones (water, snow); a target overall standard error of 0.012 sets a sample size of about 200 points per country. Rare classes receive a floor of 10 to 50 samples. For archipelagic countries a greedy minimum-distance filter (10 km, reduced to 1.5 km for Singapore) prevents clustering on one island. The confusion matrix produces unbiased area estimates with variance, standard error and 95% confidence intervals, aggregated to IPCC land use categories and to forest versus non-forest.<br><strong>Overall accuracy by country:</strong> Brunei 0.823 · Cambodia 0.804 · Indonesia 0.804 · Lao PDR 0.757 · Malaysia 0.757 · Myanmar 0.826 · Philippines 0.794 · Singapore 0.798 · Thailand 0.804 · Timor-Leste 0.823 · Vietnam 0.824.',
      screen: 'F02 Site Characterisation &mdash; General Context, &ldquo;Landcover&rdquo; (text list and big number). The full class breakdown appears in the feasibility study document.',
      limits: 'This layer is a modelled classification from satellite data and has not been field-verified at every location. Provided as is for landscape-scale analysis; <strong>it should not be used as a legal or authoritative determination of land cover, tenure, or boundaries.</strong>'
    }) +

    docLayer('Forest Cover 2014 and Forest Cover 2024',
      'Binary forest / non-forest extent at each date. Not displayed directly; used to derive deforestation and trajectory.', {
      why: 'The two dates are the endpoints of everything the tool says about change. Forest Cover 2014 is the historical reference against which loss is measured; Forest Cover 2024 is the current-state reference for how much natural forest remains and where. Both are also the inputs to the ecological state trajectory that selects the pathway.',
      citation: 'Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M. C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C. E., Armston, J., Dubayah, R., Blair, J. B., &amp; Hofton, M. (2021). Mapping global forest canopy height through integration of GEDI and Landsat data. <em>Remote Sensing of Environment</em>, 253, 112165. JRC Tropical Moist Forest.',
      attributes: 'Binary: 1 = natural forest, 0 = non-forest. Natural forest for 2024 is the RLCMS classes flooded forest, deciduous, evergreen and mixed forest, with mangrove brought into the overall forest cover.',
      sources: '<strong>2024:</strong> RLCMS 2024 SEA land cover map. <strong>2014, Mekong subregion</strong> (Cambodia, Lao PDR, Myanmar, Thailand, Viet Nam): the existing RLCMS 2014 Mekong product. <strong>2014, outside the Mekong</strong> (Indonesia, Malaysia, Philippines, Brunei, Singapore, Timor-Leste): University of Maryland Tree Canopy Cover and Tree Canopy Height, with the JRC Tropical Moist Forest non-forest layer for 2014 and a separate 2014 mangrove dataset.',
      prep: 'Because RLCMS has no 2024-equivalent product for 2014 across the whole region, the 2014 baseline is a <strong>composite</strong>. Outside the Mekong a pixel is classified as forest where tree canopy cover exceeds 10% and tree canopy height exceeds 5 m. To reduce commission errors from tree plantations being read as forest, the JRC Tropical Moist Forest non-forest layer for 2014 masks out areas already deforested or non-forest by that date. Mangrove is excluded from the general forest mask to avoid double counting with the separate mangrove change analysis. The two components are then merged into a single SEA-wide 2014 forest mask.',
      method: 'For 2024, the forest classes are extracted directly from the RLCMS land cover map. For 2014, the two regional components are mosaicked as described above. Both masks are clipped to the project area in the reference CRS before any change statistic is computed.',
      qa: 'Reported accuracy of the 2014 forest mask is <strong>0.89</strong>. A consistency check is run once per data release to confirm that every component using a forest mask &mdash; deforestation, deforestation risk and forest landscape integrity &mdash; is masked to the same forest definition; if an upstream mask used a different date or definition, a component would silently report on a different area from the rest of the module.',
      screen: 'Not displayed as a layer. Underpins &ldquo;Historical deforestation&rdquo; and &ldquo;Deforestation Risk&rdquo; in General Context, and the trajectory in Pathway Selection.',
      limits: 'A modelled forest baseline compiled from more than one satellite source, not field-verified at every location. <strong>Forest Cover 2014 and Land Cover 2024 were built using different methods and inputs, so a change between the two dates may partly reflect a change in mapping approach rather than a change on the ground.</strong> Provided as is for landscape-scale analysis; not a legal or authoritative determination of forest status or boundaries.'
    }) +

    docSource('Table A1'),
    'annex-a1-cover') +

  docSection('A.1 &mdash; What has happened, and what is at risk',

    docLayer('Deforestation 2014 &ndash; 2024',
      'Forest loss over the period (ha) and the average annual rate (% per year).', {
      why: 'Observed loss is the empirical basis of the ecological state trajectory and a direct signal of threat intensity. It also tells a user how fast the site has been changing, which is the first question a funder or a verifier asks.',
      citation: 'Puyravaud, J.-P. (2003). Standardizing the calculation of the annual rate of deforestation. <em>Forest Ecology and Management</em>, 177(1&ndash;3), 593&ndash;596.',
      attributes: 'Loss area in hectares over the ten years; annual rate as a percentage, reported to one decimal place. Narrative: &ldquo;Between 2014 and 2024, the project area lost [loss_ha] ha of forest, an average of [rate_pct]% per year.&rdquo;',
      sources: 'Forest Cover 2014 and Forest Cover 2024 (above). No third dataset is read.',
      prep: 'None beyond the forest masks themselves. Both dates use the same forest definition.',
      method: 'Forest loss is computed pixel-wise with simple Boolean logic: a pixel is loss where it was forest in 2014 and is not forest in 2024. Forest gain, the reverse case, is computed the same way but <strong>is not netted off</strong>. The annual rate uses Puyravaud (2003): <code>rate = (1 / (t2 &minus; t1)) &times; ln(A2 / A1) &times; 100</code>, where A1 is the 2014 forest area, A2 = A1 minus the gross loss, and t2 &minus; t1 = 10. Gain on land that was not forest in 2014 is deliberately excluded from A2, so the rate stays consistent with the loss figure reported next to it. Two edge cases are handled explicitly: with no loss the tool uses a dedicated sentence rather than reporting &ldquo;0.0% per year&rdquo;, and where all 2014 forest is gone the rate is undefined (ln 0) and the tool says the area lost all of its forest rather than emitting an infinite rate.',
      screen: 'F02 Site Characterisation &mdash; General Context, &ldquo;Historical deforestation&rdquo; (deforestation map plus big number).',
      limits: 'Derived from modelled forest classifications and not field-verified at every location. The layer records <strong>the location and extent of loss but does not attribute its cause</strong>, which may range from clearing and conversion to other forms of disturbance. Part of the apparent change may reflect the change in mapping approach between the two dates.'
    }) +

    docLayer('Deforestation Risk',
      'Relative risk of future unplanned deforestation, and where the project area’s forest sits in the national distribution.', {
      why: 'Standing forest at high risk is the core signal for avoided unplanned deforestation. The layer serves as a baseline for projecting where and how much forest is likely to be lost without intervention, and high-risk locations can be used to define a project footprint or, under jurisdictional carbon frameworks such as Verra JNR, to allocate baseline deforestation.',
      citation: 'Vieilledent, G. (2021). forestatrisk: a Python package for modelling and forecasting deforestation in the tropics. <em>Journal of Open Source Software</em>, 6(59), 2975.',
      attributes: 'A 0&ndash;100 relative risk score per pixel; risk class; the project area&rsquo;s median risk expressed as a position in the national distribution. The narrative is comparative: higher than, similar to, or lower than the national average, with the percentile named.',
      sources: 'SCeNe Coalition, 30 m. Observed forest-cover change over 2014&ndash;2024 is the training signal.',
      prep: 'The risk raster is masked to forest upstream, so its valid pixels are the forest to assess &mdash; the tool does not build its own forest mask for this layer. Resampling to the reference CRS is <strong>nearest neighbour</strong>; bilinear would blend risk values across the forest boundary and contaminate the summary statistic.',
      method: 'A Random Forest classifier is trained on observed 2014&ndash;2024 forest-cover change to produce a probability surface from 0 to 100%. Explanatory variables follow the forestatrisk approach (Vieilledent et al. 2021, 2023): distance from past deforestation, distance from the forest edge, distance from towns, distance from roads, distance from rivers, elevation, slope, and protected areas. In the tool, the project area summary is the <strong>median</strong> risk, which is robust to the strongly skewed risk distribution (most forest is low risk and a small frontier is very high risk, so a mean would be pulled by the right tail). The comparison is made against a national percentile table built from the same raster: above the 60th percentile reads as higher than the national average, the 40th to 60th as similar, below the 40th as lower.',
      screen: 'F02 Site Characterisation &mdash; General Context, &ldquo;Deforestation Risk&rdquo; (comparative narrative, no chart).',
      limits: 'The output is <strong>relative</strong> deforestation risk, not a calibrated rate, and should be read as a ranking rather than an absolute probability. Two properties of the model make this so: it is fitted with case-control sampling, which ties the intercept to the chosen sampling ratio rather than to the true base rate, and any predicted probability is conditional on the length of the calibration period. What survives as valid information is <strong>the ordering of pixels, not the level</strong>. Only two dates are available, so distance to past deforestation cannot be used as a leak-free predictor. The model represents unplanned deforestation only; planned, legally sanctioned conversion is a different construct and is not covered.'
    }) +

    docSource('Table A1'),
    'annex-a1-change') +

  docSection('A.1 &mdash; The physical setting',

    docLayer('Elevation',
      'Minimum and maximum elevation (m above sea level) and the predominant elevation class.', {
      why: 'Topography is a design constraint, not only a description. Elevation guides species and forest type choice, and bounds which activities are workable on a site. It also sets the dryland climatic zone used by the ARR carbon method.',
      citation: 'Farr, T. G., Rosen, P. A., Caro, E., Crippen, R., Duren, R., Hensley, S., Kobrick, M., et al. (2007). The shuttle radar topography mission. <em>Reviews of Geophysics</em>, 45(2), RG2004.',
      attributes: 'Four classes: Lowland (0&ndash;500 m), Submontane or hill (500&ndash;1000 m), Montane (1000&ndash;2000 m), Upper montane (above 2000 m). Narrative: &ldquo;Elevation ranges from [X] to [Y] m above sea level (asl), predominantly [elevation class].&rdquo;',
      sources: 'Shuttle Radar Topography Mission (SRTM), one continuous elevation raster in metres, 30 m, reprojected to the reference CRS.',
      prep: 'The SRTM product has undergone void filling using open-source data (ASTER GDEM2, GMTED2010, NED). The raster is continuous; the tool does the binning itself rather than reading a pre-classified layer.',
      method: 'Clip the elevation raster to the project area, bin the values into the four classes, and tabulate the area of each. The narrative reports the exact minimum and maximum in metres from the continuous raster, so the range is not rounded to class boundaries, while the bar chart stays class-based. The denominator is the valid (non-nodata) area, so the chart sums to 100%.',
      screen: 'F02 Site Characterisation &mdash; General Context, &ldquo;Terrain&rdquo; (bar chart plus narrative).',
      limits: 'The elevation shown is <strong>surface elevation, not bare-earth terrain elevation</strong>. Values are approximate and should not be used as a legal or authoritative determination of ground height or boundaries.'
    }) +

    docLayer('Slope',
      'Area (ha) and share of the project area in each of five slope classes, and the predominant class.', {
      why: 'Steep slopes limit which activities are workable and raise erosion risk, so slope constrains activity design as directly as land cover does.',
      citation: 'Derived from SRTM (Farr et al., 2007). Class scheme adapted from the SOTER (Soil and Terrain) slope classification.',
      attributes: 'Five classes in percent rise: Flat (0&ndash;8%), Gently sloping (8&ndash;15%), Moderately steep (15&ndash;25%), Steep (25&ndash;40%), Very steep (above 40%).',
      sources: 'Derived from the SRTM elevation raster, 30 m. Not read as a pre-classified layer.',
      prep: 'None beyond the elevation raster&rsquo;s own void filling.',
      method: 'Slope is calculated as percent rise &mdash; the vertical gain over horizontal distance &mdash; from the elevation raster, <strong>with a distance correction applied by project-area latitude</strong>. The correction is necessary because the reference CRS is equal-area: it preserves area exactly but distorts distance, increasingly so away from the equator, and slope is a distance-based quantity. The resulting values are binned into the five classes and tabulated by area, with the valid area as denominator.',
      screen: 'F02 Site Characterisation &mdash; General Context, &ldquo;Terrain&rdquo; (bar chart, alongside elevation).',
      limits: 'Derived from SRTM elevation and not field-verified. Values and classes are approximate and should not be used as a legal or authoritative determination of ground steepness or boundaries.'
    }) +

    docLayer('Ecosystem Type (dryland forest, mangrove, peatland)',
      'Dominant ecosystem type; area (ha) and share of the project area for dryland forest, mangrove and peatland, including where two or three overlap.', {
      why: 'The reference ecosystem decides everything downstream: which carbon pools matter, which soil carbon dataset applies, which restoration pathway is eligible, and which methodology a project can use. <strong>Mangrove and peatland carry soil carbon stocks that dwarf the biomass pool, so getting this wrong changes the carbon case by an order of magnitude.</strong> The ecosystem class is also the second join key, with the trajectory category, into the activity catalogue.',
      citation: 'Mangrove, Indonesia: Badan Informasi Geospasial land system map (Sistem Lahan), class &ldquo;Intertidal swamps under halophytic vegetation&rdquo;. Mangrove, rest of ASEAN: Global Mangrove Watch 1996 baseline (Bunting et al., 2022). Peat, Indonesia: Kementerian Pertanian (2021). Peat, Peninsular Malaysia, Sumatra and Borneo: land cover distribution in the peatlands of Peninsular Malaysia, Sumatra and Borneo, 2015 with changes since 1990 (2017). Peat, remaining SEA countries: PEATGRIDS.',
      attributes: 'Four classes: 1 Dryland forest, 2 Mangrove, 3 Peatland, 4 Other / Unclassified. The narrative branches on the set of classes present: a single type, or one of four combinations, up to &ldquo;Dryland + Mangrove + Peatland&rdquo;.',
      sources: 'A composite built by the SCeNe Coalition from the national and global sources listed above, harmonised to the RLCMS 30 m grid. In the tool the ecosystem class is read from <strong>band 2 of the pathway raster</strong> rather than from a separate file.',
      prep: 'The mangrove layer represents <strong>historical habitat extent</strong> &mdash; the coastal area where mangrove naturally occurs, rather than present-day cover; for ASEAN countries outside Indonesia it uses the earliest Global Mangrove Watch epoch, the 1996 baseline. PEATGRIDS is resampled bilinearly to the RLCMS grid; the categorical peat masks are reprojected to the same grid; the two are then mosaicked, taking the union of the Indonesia and Malaysia masks with PEATGRIDS on the mainland, so the layer carries both peat extent and per-pixel soil carbon density. Dryland is defined by exclusion: mineral soil that is well-drained and not waterlogged &mdash; everything that is neither mangrove nor peatland. Exported at 30 m as coded classes.',
      method: 'Read the ecosystem band, remap to the three reference classes (dryland forest and savanna both fold into Dryland for this display; mangrove and peatland keep their own class), tabulate pixel count per class, convert to hectares, and divide by total project area. An explicit &ldquo;Other / Unclassified&rdquo; slice absorbs nodata and non-ecosystem pixels so the shares sum to 100%. Composition uses <strong>pure presence</strong>: a class counts as present if its area is above zero.',
      screen: 'F02 Site Characterisation &mdash; General Context, &ldquo;Ecosystem identification&rdquo; (text, bar chart and map). Also the ecosystem axis in F02 Threat Profile and F02 Pathway Selection.',
      limits: 'Derived from regional remote-sensing and land-cover datasets compiled from several sources with different methodologies, scales and mapping accuracies. They are <strong>indicative estimates, not ground-verified measurements</strong>, and may differ from actual conditions. Misclassification between mangrove, peatland and dryland forest depends on imagery date and resolution. Intended for regional-scale analysis; verify with field data before using these figures for site-specific delineation, legal boundaries, planning or reporting.'
    }) +

    docLayer('Natural Disaster Risk (flood, landslide, typhoon, drought)',
      'One card per hazard with a representative risk level from Very Low to Very High.', {
      why: 'Each risk level is read twice later: as a <strong>permanence risk</strong> that constrains activity design and durability, and as a <strong>disaster-risk-reduction co-benefit</strong> mapped to the triple-benefit pillars.',
      citation: 'Mach, K. J., Mastrandrea, M. D., Bilir, T. E., et al. (2016). Understanding and responding to danger from climate change: the role of key risks in the IPCC AR5. <em>Climatic Change</em>, 136, 427&ndash;444.',
      attributes: 'The interface specifies a five-level scale: 1 Very Low, 2 Low, 3 Moderate, 4 High, 5 Very High. <strong>The risk rasters currently wired carry four classes</strong>, 1 Very Low to 4 High, with 0 as nodata; the fifth level is not yet populated. This mismatch is one of the reasons the layer is flagged for reclassification. Hazards covered: flood, landslide, tropical typhoon, drought. Fire is reported separately under Climate, on the five-level scale.',
      sources: 'Asian Disaster Preparedness Center (ADPC), pre-classified risk rasters.',
      prep: 'Resampling to the reference CRS is <strong>nearest neighbour</strong>, because the rasters are categorical and their values must not be interpolated. For rainfall-induced landslide the Southeast Asia layer arrives already classified; a supplementary Indonesia layer is derived from a raw 0&ndash;1 probability raster.',
      method: 'These are <strong>risk</strong> layers, not bare hazard layers: exposure and vulnerability are folded in upstream. A weighted vulnerability composite is multiplied by the classified hazard layer to produce a raw risk value in the range 1&ndash;25, which is normalised to 0&ndash;1 and reclassified into the five risk classes. In the tool, each layer is clipped to the project area and given a single representative level: <strong>the highest class covering at least 20% of the valid risk area</strong>. The rule is deliberately conservative, because in risk screening a false negative costs more than a false positive. No composite index is produced across hazards: the four are not commensurable.',
      screen: 'F02 Site Characterisation &mdash; General Context, &ldquo;Natural Disaster Risk&rdquo; (badge or image).',
      limits: '<strong>The classification of these layers still needs refinement.</strong> The four layers sit at very different native resolutions, so for a small project area the coarse layers may fall inside a single cell and give a one-class distribution &mdash; that is expected, not an error.'
    }) +
    docSource('Table A1'),
    'annex-a1-setting');
}

/* ------------------------------------------------------ A.2 Nature */
function docsAnnexNature() {
  return docHero('ANNEX A.2', 'Nature layers',
    'Seven layers describing the biodiversity and habitat value of the site. Three of them — the Area of Habitat rasters — are the direct input to the nature benefit components, where they are intersected with projected deforestation or with the restoration area.',
    ['7 layers', 'F02 Nature', 'Modelled, not observed']) +

  docSection('A.2 &mdash; Condition of the forest', ANNEX_INTRO +

    docLayer('Forest Landscape Integrity Index (FLII)',
      'Mean forest landscape integrity score out of 10, with the share of forest in High, Medium and Low integrity classes.', {
      why: 'The FLII assesses the overall health and ecological integrity of forested areas, combining forest fragmentation, human disturbance and habitat loss into a single measure of condition. It is a biodiversity and ecosystem-quality proxy, and a pathway signal in its own right: <strong>high integrity favours Protect, low integrity favours Restore or Manage</strong>. It also underpins the SCeNe high-integrity NbS criteria.',
      citation: 'Grantham, H. S., Duncan, A., Evans, T. D., Jones, K. R., Beyer, H. L., Schuster, R., Walston, J., et al. (2020). Anthropogenic modification of forests means only 40% of remaining forests have high ecosystem integrity. <em>Nature Communications</em>, 11(1), 5978.',
      attributes: 'A continuous score from 0 (low integrity) to 10 (high integrity) on forest, plus three classes following the paper: <strong>High at or above 9.6, Low at or below 6.0, Medium in between</strong>. Narrative: &ldquo;Forest landscape integrity: [mean FLII] / 10&rdquo;, followed by the High, Medium and Low shares and the predominant class.',
      sources: 'Forest Landscape Integrity Index, reimplemented and calibrated on the Southeast Asia data stack. Two rasters: a continuous 0&ndash;10 surface and a 1/2/3 class surface, both forest-masked, native 300 m.',
      prep: 'The index is calculated as the inverse of cumulative human modification, integrating four primary spatial datasets: forest extent; observed human pressures such as infrastructure and agriculture; inferred pressures such as edge effects; and the loss of forest connectivity. Processing is carried out in Google Earth Engine. The class raster is pre-classified into High, Medium and Low.',
      method: 'Clip both rasters to the project area, restricted to the project area&rsquo;s forest, then take the mean of the continuous surface as the headline and tabulate the three classes by area. <strong>The denominator is the project area&rsquo;s forest</strong> &mdash; the same forest extent used by the deforestation and deforestation risk components &mdash; not the whole project area. Where the project area contains no forest the component returns &ldquo;no forest present to assess for landscape integrity&rdquo; rather than a score.',
      screen: 'F02 Site Characterisation &mdash; Nature, &ldquo;Forest Landscape Integrity Index&rdquo; (big number plus narrative).',
      limits: 'The FLII estimates forest integrity from factors known to influence forest condition, but <strong>does not represent directly observed measurements</strong> and may therefore contain inaccuracies. In particular, it treats all observed fires as natural and so does not count them as evidence of human pressure, despite many fires being deliberately set. Activities that occurred before 2000, such as historical logging, are not considered. <strong>Do not present these values as absolute global integrity scores.</strong>'
    }) +

    docSource('Table A2'),
    'annex-a2-condition') +

  docSection('A.2 &mdash; Species and habitat',

    docLayer('Refined Area of Habitat (mammals, birds, reptiles, amphibians)',
      'Number of species with suitable habitat in the project area, by class, and the habitat area and share of the project area per species.', {
      why: 'Area of Habitat is the accessible habitat within a species&rsquo; range. Unlike a coarse range map, it shows where a species is actually likely to occur, which is what a project needs in order to describe the biodiversity it is protecting or restoring &mdash; and what several carbon standards require in their biodiversity sections.',
      citation: 'Brooks, T. M., Pimm, S. L., Ak&ccedil;akaya, H. R., Buchanan, G. M., Butchart, S. H. M., Foden, W., Hilton-Taylor, C., Hoffmann, M., Jenkins, C. N., Joppa, L., Li, B. V., Menon, V., Ocampo-Pe&ntilde;uela, N., &amp; Rondinini, C. (2019). Measuring terrestrial Area of Habitat (AOH) and its utility for the IUCN Red List. <em>Trends in Ecology &amp; Evolution</em>, 34(11), 977&ndash;986.',
      attributes: 'Binary suitable / unsuitable rasters, one per species, for roughly <strong>6,000 species</strong>. Reported as a species count per class (mammal, bird, reptile, amphibian) and, in the feasibility document, a per-species table with IUCN category, habitat area in hectares and share of the project area.',
      sources: 'IUCN Red List of Threatened Species and BirdLife International range maps, refined with a habitat crosswalk and a high-resolution digital elevation model. 30 m.',
      prep: 'Three sequential filtering steps. <strong>First</strong>, retain only polygons classified as extant and native, removing those classified as introduced, uncertain or extinct. <strong>Second</strong>, extract habitat preferences from the IUCN Red List species assessment and mask the range map to the pixels that correspond to suitable habitat classes under the crosswalk. <strong>Third</strong>, apply species-specific elevational limits from the DEM; where relevant, additional climatic constraints refine habitat suitability for habitat types such as savanna.',
      method: 'The resulting raster is the intersection of range, habitat and environmental suitability. Species habitat rasters are filtered using a master species footprint index, then the suitable pixels falling inside the project area are counted to give habitat area and share of the project area, and the distinct species are counted by class.',
      screen: 'F02 Site Characterisation &mdash; Nature, &ldquo;Habitat Area&rdquo; (badge with big number).',
      limits: '<strong>Area of Habitat cannot be compared directly with the Extent of Occurrence or Area of Occupancy thresholds used to determine extinction risk under the IUCN Red List criteria</strong>; comparing AOH against those thresholds would overestimate the number of species potentially qualifying under each Red List category. The portion of a species&rsquo; range represented in the AOH varies with the method used to link species to habitats, the detail of the range map, the species&rsquo; geographical distribution, and the specificity of its habitat and elevation limits.'
    }) +

    docLayer('Key Species Presence',
      'Number of key species recorded in the project area, with record count, individual count, latest encounter and basis of record per species.', {
      why: 'Keystone and flagship species have a disproportionately large effect on ecosystem structure and function relative to their abundance, and they are what a community, a funder or a government recognises. <strong>Their presence is evidence a project can point to rather than infer.</strong>',
      citation: 'GBIF.org (2025). GBIF Home Page. GBIF Secretariat: GBIF Backbone Taxonomy. Species selection: McGowan, J., Beaumont, L. J., Smith, R. J., et al. (2020). Conservation prioritization can resolve the flagship species conundrum. <em>Nature Communications</em>, 11, 994.',
      attributes: 'Species name, total occurrence, record count, latest encounter date, basis of record. Summary values: unique species, total records, total individuals.',
      sources: 'GBIF occurrence records for <strong>2000 to 2025</strong>, compiled from natural history museums, citizen science networks, academic and research institutions, and government and conservation agencies, under the Darwin Core Standard, Ecological Metadata Language and the Biological Collection Access Service.',
      prep: 'Species selection combines existing conservation flagship species with potential <em>Cinderella</em> species &mdash; species sharing traits commonly associated with flagship taxa such as large body size, distinctive appearance and forward-facing eyes. Public awareness is assessed using annual Wikipedia page views; bird taxonomy follows the IOC World Bird List version 7.1. Records before 2000 are excluded to reduce uncertainty from older records with potentially lower spatial accuracy.',
      method: 'GBIF occurrence points are intersected with the project area, using an <em>intersects</em> predicate so that points on the boundary are included, then summarised by species using record count, individual count, latest event date and the most frequent Darwin Core <code>basisOfRecord</code> value.',
      screen: 'F02 Site Characterisation &mdash; Nature, &ldquo;Indicative Key Species Presence&rdquo; (badge or species images).',
      limits: 'GBIF data come from a wide range of sources, which can lead to inconsistencies, inaccuracies and missing information. Some records may lack critical detail such as species identification, location accuracy or collection date. <strong>Absence of a record is not evidence of absence of the species.</strong>'
    }) +

    docSource('Table A2'),
    'annex-a2-species') +

  docSection('A.2 &mdash; Designations and global context',

    docLayer('Key Biodiversity Areas',
      'Overlap with Key Biodiversity Areas: area (ha), share of the project area, and the name of each site.', {
      why: 'A Key Biodiversity Area is a site that contributes significantly to the global persistence of biodiversity. It is a different lens from the protected area layer: a KBA may or may not be legally protected, and <strong>a KBA that carries no protection is a biodiversity-important but unprotected site</strong> &mdash; a strong rationale for a Protect pathway and for additionality.',
      citation: 'BirdLife International. World Database of Key Biodiversity Areas. Developed by the KBA Partnership: BirdLife International, IUCN, American Bird Conservancy, Amphibian Survival Alliance, Conservation International, Critical Ecosystem Partnership Fund, Global Environment Facility, Re:wild, NatureServe, Rainforest Trust, RSPB, Wildlife Conservation Society and World Wildlife Fund.',
      attributes: 'KBA name (field IntName), overlap area in hectares, share of the total project area, and the number of sites where more than one is touched.',
      sources: 'World Database of Key Biodiversity Areas, polygon layer clipped to Southeast Asia.',
      prep: 'None beyond clipping to the region and reprojection to the reference CRS.',
      method: 'Polygon intersection with the project area. The headline overlap is the <strong>union</strong> of KBA polygons, so overlapping or nested sites are not double counted, matching the treatment of protected areas. <strong>No sliver threshold is applied</strong>, because any KBA overlap is material. The denominator is the total project area, not its forest, because a KBA concerns the whole site. The narrative gives the site name only; criteria and type are not reported.',
      screen: 'F02 Site Characterisation &mdash; Nature, &ldquo;Key Biodiversity Area&rdquo; (text).',
      limits: 'While the World Database of Key Biodiversity Areas is the most comprehensive global database of its kind, in some cases there may be inaccuracies and differences from national datasets.'
    }) +

    docLayer('Conservation Significance',
      'Share of the project area falling within the global top-ranked cells for biodiversity, carbon and water conservation priority.', {
      why: 'It places the site in a global context: whether this piece of land is among the places where conserving nature delivers most for species, for carbon, or for water. <strong>It answers the question a funder asks about why here rather than somewhere else.</strong>',
      citation: 'Jung, M., Arnell, A., de Lamo, X., et al. (2021). Areas of global importance for conserving terrestrial biodiversity, carbon and water. <em>Nature Ecology &amp; Evolution</em>, 5, 1499&ndash;1509.',
      attributes: 'Three axes, one per weighting scenario: Biodiversity, Carbon, Water. Each reports the minimum priority rank and the number of valid pixels inside the project area. Displayed as a spider graph.',
      sources: 'NatureMap global priority-rank layers (Jung et al. 2021), <strong>10 km native resolution, about 100 km² per pixel</strong>. Ranked priority layers only; the archive contains no raw carbon or water stock rasters.',
      prep: 'Nothing is resampled. The layers are read at native 10 km resolution.',
      method: 'The project area is intersected with the priority-rank grid and the share of project-area land falling within the global top-X% ranked cells is computed, one axis per weighting scenario. <strong>The tool also reports the true polygon area alongside the pixel envelope and the resulting envelope inflation</strong>, so a reader can see how much of the reported figure is an artefact of the coarse grid.',
      screen: 'F02 Site Characterisation &mdash; Nature, &ldquo;Conservation Significance&rdquo; (spider graph).',
      limits: 'The reported quantity is the share of project area within globally top-ranked cells. <strong>It is not the same quantity as the paper&rsquo;s own summary figure</strong>, which shows the share of species targets met or the share of stock conserved. At 10 km resolution the layer is suitable for <strong>landscape-context statements only</strong>, not for site-level or per-stratum figures.'
    }) +

    docLayer('Ecological Connectivity',
      'Area (ha) and share of the project area in each morphological connectivity class, for 2014 and for 2024.', {
      why: 'Habitat loss and fragmentation are principal drivers of biodiversity decline. Connectivity distinguishes large contiguous habitat, which is worth protecting, from the linking features (bridges, loops) that hold a network together and the isolated fragments that a restoration project might reconnect.',
      citation: 'Vogt, P., Riitters, K., Rambaud, P., d&rsquo;Annunzio, R., Lindquist, E., &amp; Pekkarinen, A. (2022). GuidosToolbox Workbench: spatial analysis of raster maps for ecological applications. <em>Ecography</em>, 2022(3).',
      attributes: 'Seven Morphological Spatial Pattern Analysis classes: core, edge, perforation, bridge, loop, branch and islet, each reported as area (ha) and share (%).',
      sources: 'Forest Cover 2014 and SIGnal land cover 2024, processed in GuidosToolbox. 30 m.',
      prep: 'Binary habitat masks are built separately from the 2014 forest map and from the 2024 land cover map, producing two independent MSPA outputs for comparison over time.',
      method: 'MSPA classifies every pixel, forest and non-forest alike, into one of the structural connectivity categories, describing the role each pixel plays within the wider habitat network. The analysis is run with <strong>8-connected pixel connectivity, an edge width of 1 pixel</strong> (approximately a 30 m edge zone), <strong>transition classes enabled</strong>, and <strong>internal/external split enabled with a 100 offset</strong>. In the tool, the area of each MSPA class inside the project area is computed.',
      screen: 'F02 Site Characterisation &mdash; Potential Benefit.',
      limits: 'This is a <strong>structural, morphological</strong> analysis of connectivity based on spatial pattern alone. It does not incorporate ecological, functional or species-specific connectivity such as species movement, dispersal ability or habitat suitability. The two source layers come from different years and were produced using different mapping methods and classification schemes, so <strong>users should be cautious when comparing the two MSPA outputs directly</strong>: differences may reflect the change in mapping approach rather than actual change on the ground. Any errors or biases in the source maps propagate into this analysis.'
    }) +

    docLayer('Endangered Tree Species Richness',
      'Number of threatened and socio-economically important tree species modelled as present in the project area.', {
      why: 'It indicates the richness of tree biodiversity within the project area and the potential contribution a project can make to conserving imperilled species. Areas rich in tree species diversity are also significantly threatened by habitat destruction, climatic shifts and overharvesting, so they are candidates for priority conservation.',
      citation: 'Gaisberger, H., Fremout, T., Kettle, C. J., Vinceti, B., Kemalasari, D., Kanchanarak, T., Thomas, E., Serra-Diaz, J. M., Svenning, J.-C., Slik, F., Eiadthong, W., Palanisamy, K., Ravikanth, G., Bodos, V., Sang, J., Warrier, R. R., Wee, A. K. S., Elloran, C., Ramos, L. T., &hellip; Jalonen, R. (2022). Tropical and subtropical Asia&rsquo;s valued tree species under threat. <em>Conservation Biology</em>, 36, e13873.',
      attributes: 'Count of species. Distributions of <strong>63</strong> socio-economically important and threatened tree species, modelled with Maxent.',
      sources: 'Tree-diversity.org species richness layer, <strong>4 km</strong>.',
      prep: 'None in the tool.',
      method: 'Clip the layer to the project area, identify the grid cell with the largest overlap, and read the species count from that cell. Carried forward unchanged from the previous tool version.',
      qa: '<strong>Data accuracy is under review with the modelling partner.</strong>',
      screen: 'F02 Site Characterisation &mdash; Nature, &ldquo;Endangered Tree Species&rdquo;.',
      limits: 'Based on species distribution modelling. While the data identify likely suitable areas for each species, <strong>they do not guarantee that a species is present in any particular location</strong>, and they cover only a small subset of threatened and commercially important plant species. The model excluded the mangrove biome as unsuitable, except for <em>Rhizophora apiculata</em>, and excluded states or provinces where a species did not occur or was naturalised.'
    }) +
    docSource('Table A2'),
    'annex-a2-designations');
}

/* ----------------------------------------------------- A.3 Climate */
function docsAnnexClimate() {
  return docHero('ANNEX A.3', 'Climate layers',
    'Eight layers covering carbon stocks and climate conditions. Biomass carbon and soil carbon are reported as two separate headline numbers and are deliberately not summed — adding them would look like a complete carbon account when it is not.',
    ['8 layers', 'F02 Climate', 'Two carbon pools, never summed']) +

  docSection('A.3 &mdash; The three carbon pools', ANNEX_INTRO +

    docLayer('Above Ground Biomass Density',
      'Above-ground biomass density in Mg per hectare, and the carbon it represents in tCO₂e.', {
      why: 'Above-ground biomass is the pool that is lost quickly in a clearing event and the pool that grows back under restoration, so it is <strong>the reference point for benefit quantification</strong>: avoided loss is measured against what is standing, and removals are measured as growth towards a reference stock.',
      citation: 'Dubayah, R., et al. GEDI L4A Footprint Level Aboveground Biomass Density. Satellite embeddings: Brown et al. (2025), AlphaEarth Foundations.',
      attributes: 'Continuous dry biomass density in Mg/ha, with an accompanying uncertainty layer. Reported in the tool as tCO₂e after conversion.',
      sources: 'GEDI L4A aboveground biomass density (<code>LARSE/GEDI/GEDI04_A_002_MONTHLY</code>) and the AlphaEarth Foundations 2024 annual 64-band satellite embedding layer. Copernicus GLO30 DEM for slope masking and a canopy height product for geolocation shift correction. 30 m.',
      prep: 'GEDI samples the surface as <strong>sparse LiDAR footprints rather than wall to wall</strong>, so the footprint measurements are aligned and then interpolated. Sampling and a geolocation search step align the GEDI footprints to the embedding grid; the GLO30 DEM is used to mask steep slopes where the LiDAR return is unreliable.',
      method: 'A Random Forest regression is trained on the aligned GEDI footprints using the 64 embedding bands as predictors, then applied across the region to produce a spatially complete prediction. An uncertainty layer is produced from the bootstrap standard deviation across ensemble members. In the tool, the biomass raster is clipped to the project area and integrated, then converted in <strong>two visible steps</strong>: carbon (tC) = biomass (Mg) &times; 0.47, the IPCC default carbon fraction of dry matter; and storage (tCO₂e) = carbon (tC) &times; 44/12. Neither conversion is done upstream, so both assumptions stay auditable in the tool&rsquo;s configuration rather than baked into a raster that looks like a measurement. Resampling is <strong>area-weighted average, not bilinear</strong>, because this is a stock quantity and reprojection must preserve the area-weighted mean.',
      screen: 'F02 Site Characterisation &mdash; Climate, &ldquo;Current Carbon Storage Total&rdquo;.',
      limits: 'Modelled biomass estimates from satellite data, not field-verified at every location. <strong>Pixel values are modelled estimates with an associated uncertainty, not direct measurements.</strong> Provided as is for landscape-scale analysis; it should not be used as a legal or authoritative measurement of carbon stocks without local validation.'
    }) +

    docLayer('Below Ground Biomass',
      'Below-ground biomass density in Mg per hectare, and the carbon it represents in tCO₂e.', {
      why: 'Root carbon behaves differently from above-ground biomass under disturbance: <strong>it decays over years rather than being released in a single clearing event</strong>. Reporting it separately keeps that difference visible in the benefit calculation.',
      citation: 'IPCC (2006). 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Volume 4: Agriculture, Forestry and Other Land Use, Chapter 4.',
      attributes: 'Continuous dry biomass density in Mg/ha, <strong>derived rather than mapped</strong>.',
      sources: 'Derived from the Above Ground Biomass Density layer. Ancillary inputs: <code>COPERNICUS/DEM/GLO30</code> and the AlphaEarth Foundations annual embedding layer used to produce the above-ground layer. 30 m.',
      prep: 'None separate from the above-ground layer.',
      method: 'Below-ground biomass is calculated by applying a root-to-shoot ratio to the above-ground layer: <code>BGB (Mg/ha) = AGB (Mg/ha) &times; 0.28</code>. The same carbon fraction and CO₂ conversion are then applied as for the above-ground pool. The two pools are <strong>integrated separately and then added</strong>, so they may sit on different grids or resolutions without any alignment assumption.',
      screen: 'F02 Site Characterisation &mdash; Climate, reported within &ldquo;Current Carbon Storage Total&rdquo; as a separate carbon pool.',
      limits: 'Derived from a <strong>fixed default ratio, not mapped</strong>, so it inherits every uncertainty in the above-ground layer and adds the error of the ratio itself. The IPCC default is a broad regional approximation and may not reflect local root-to-shoot behaviour.'
    }) +

    docLayer('Soil Organic Carbon (peatland, mangrove, dryland)',
      'Soil organic carbon stock in tC per hectare, converted to tCO₂e for the project area.', {
      why: 'Soil carbon is the pool <strong>most at risk from drainage and conversion</strong>, and on peat it is the pool that matters most: in tropical peat swamp forest the biomass pools typically hold only a small share of total site carbon, because the peat itself can store on the order of thousands of tCO₂e per hectare depending on depth. Soil carbon is therefore the quantity behind a peat protection pathway.',
      citation: 'Poggio, L., de Sousa, L. M., Batjes, N. H., Heuvelink, G. B. M., Kempen, B., Ribeiro, E., &amp; Rossiter, D. (2021). SoilGrids 2.0: producing soil information for the globe with quantified spatial uncertainty. <em>SOIL</em>, 7, 217&ndash;240. Mangrove: Maxwell, T. L., Hengl, T., Parente, L. L., Minarik, R., Worthington, T. A., Bunting, P., Smart, L. S., Spalding, M. D., &amp; Landis, E. (2023). Global mangrove soil organic carbon stocks dataset at 30 m resolution for the year 2020. <em>Data in Brief</em>, 50, 109621.',
      attributes: 'Soil organic carbon stock in tC/ha, reported to a <strong>fixed depth of 30 cm</strong>. Reported as tCO₂e total and tCO₂e per hectare.',
      sources: 'SoilGrids at 250 m for dryland and peatland; Maxwell et al. (2023) global mangrove soil organic carbon at 30 m for mangrove. SoilGrids reports carbon content at six standard depths (0, 10, 30, 60, 100 and 200 cm).',
      prep: 'SoilGrids values are published in units of 5 g/kg and are converted to a percentage by dividing by two. The 0&ndash;30 cm stock used by the tool is the sum of the 0&ndash;5, 5&ndash;15 and 15&ndash;30 cm SoilGrids depth intervals. Ecosystem-specific constants select which source applies to a given pixel, using the ecosystem layer.',
      method: 'Clip to the project area and integrate over every valid pixel; soil carbon exists under all land cover, so <strong>no forest mask or land cover filter is applied</strong>. One conversion only: storage (tCO₂e) = SOC (tC) &times; 44/12. The carbon fraction used for biomass is <strong>deliberately not applied here</strong>, because this layer already holds carbon rather than dry matter, and applying 0.47 would be a double conversion that understates the stock by roughly half. Resampling is area-weighted average, as for biomass, because this is a stock. The result is reported as its own headline number and is <strong>deliberately not summed with the biomass carbon</strong>: adding the two would still not be total site carbon, because deadwood and litter are absent from both and the soil layer only reaches a fixed depth, so a combined figure would look like a complete account when it is not.',
      screen: 'F02 Site Characterisation &mdash; Climate, &ldquo;Soil characteristics: soil organic carbon stock&rdquo; (big number).',
      limits: '<strong>Depth is part of the measurement and is therefore part of the label.</strong> Thirty centimetres is the IPCC default for mineral soil and captures most of the profile&rsquo;s carbon there. For peat it does not: tropical peat can run several metres deep, so a fixed 30 cm window samples only a thin upper slice and <strong>a peatland project area will report far below its real soil stock</strong>. These are modelled estimates from satellite and global soil models, not field measurements, and should not be used as an authoritative measurement of carbon stocks without local validation.'
    }) +

    docSource('Table A3'),
    'annex-a3-carbon') +

  docSection('A.3 &mdash; Climate conditions',

    docLayer('Annual Temperature',
      'Mean annual temperature across the project area, with a twelve-month profile.', {
      why: 'Temperature guides species selection and helps a project judge the resilience of local ecosystems to climate change. It bounds which species and forest types are appropriate, so it feeds species choice in the activity catalogue alongside elevation. <strong>It is descriptive context, not a pathway driver.</strong>',
      citation: 'Fick, S. E., &amp; Hijmans, R. J. (2017). WorldClim 2: new 1 km spatial resolution climate surfaces for global land areas. <em>International Journal of Climatology</em>, 37(12), 4302&ndash;4315.',
      attributes: 'Degrees Celsius. Twelve monthly values as a bar chart, plus the annual mean reported as a minimum, maximum and mean across the project area.',
      sources: 'WorldClim, twelve monthly mean temperature bands. Approximately 1 km grid.',
      prep: 'Resampling is <strong>nearest neighbour, not bilinear</strong>, because the component reports a minimum and a maximum and those values must exist in the source data; bilinear would invent intermediate values and shrink the reported range.',
      method: 'Two different statistics are produced from one stack, <strong>and the order of operations matters</strong>. The chart shows twelve monthly values, each the spatial mean over the project area for that month. The sentence describes the annual figure across space: for temperature the annual figure is the <em>per-pixel mean of the twelve months</em>, then summarised as a minimum, maximum and mean over the project area&rsquo;s pixels. A pixel counts only where all twelve months are valid, so a pixel valid in nine months cannot contribute a nine-month annual figure. The chart and the sentence therefore describe the same pixel set. The spatial mean is unweighted, which is already area-weighted because every pixel in the equal-area CRS covers the same ground.',
      screen: 'F02 Site Characterisation &mdash; Climate, &ldquo;Annual Temperature&rdquo;.',
      limits: 'WorldClim surfaces are <strong>long-term climatological normals interpolated from weather station records</strong> &mdash; not current conditions and not directly observed values at each pixel. They describe the bioclimatic setting that determines which species and forest type belong on a site, which is the right kind of data for screening, but mean temperature across Southeast Asia has risen since the reference window closed. The reference period travels with every figure so it can be labelled in the interface; confirm the period and unit against the source before quoting a figure.'
    }) +

    docLayer('Annual Precipitation',
      'Annual precipitation total across the project area, with a twelve-month profile.', {
      why: 'Rainfall total and its seasonal distribution govern which pathways are workable. <strong>A long dry season raises establishment risk for planting under Restore</strong> and links directly to the fire and drought hazards. The monthly series is retained so that the dryland climatic zone can be derived from it.',
      citation: 'Fick, S. E., &amp; Hijmans, R. J. (2017). WorldClim 2: new 1 km spatial resolution climate surfaces for global land areas. <em>International Journal of Climatology</em>, 37(12), 4302&ndash;4315.',
      attributes: 'Millimetres. Twelve monthly values as a bar chart, plus the annual total reported as a minimum, maximum and mean across the project area.',
      sources: 'WorldClim, twelve monthly precipitation bands. Approximately 1 km grid.',
      prep: 'Resampling is nearest neighbour, for the same reason as temperature.',
      method: 'As for temperature, with <strong>one difference that must not be reordered</strong>: the annual figure is the <em>per-pixel sum</em> of the twelve months, and only then the spatial minimum, maximum and mean. Summing the twelve spatial minima instead would produce a value that no pixel actually has. The spatial mean happens to survive the swap, because averaging and summing commute, but the range does not &mdash; so the calculation never takes that shortcut. A pixel counts only where all twelve months are valid.',
      screen: 'F02 Site Characterisation &mdash; Climate, &ldquo;Annual Precipitation&rdquo;.',
      limits: 'As for temperature: these are interpolated long-term normals, not observations and not current conditions. <strong>Precipitation is the noisier of the two variables</strong> and interpolation quality depends heavily on station density, which is uneven across Southeast Asia.'
    }) +

    docSource('Table A3'),
    'annex-a3-climate') +

  docSection('A.3 &mdash; Fire and soil',

    docLayer('Historical Burned Area',
      'Area (ha) of the project area that burned at least once between 2014 and 2024, and the area burned in each year.', {
      why: 'When peatlands burn, a large amount of stored carbon is released and the fire is difficult to control and extinguish. A fire history <strong>raises permanence risk</strong>, points to fire-driven degradation, and supports fire-management activities in the pathway logic. It also provides the basis for early detection and rapid response in degraded peatland.',
      citation: 'Long, T., Zhang, Z., He, G., Jiao, W., Tang, C., Wu, B., Zhang, X., Wang, G., &amp; Yin, R. (2019). 30 m resolution Global Annual Burned Area Mapping based on Landsat images and Google Earth Engine. <em>Remote Sensing</em>, 11(5), 489. Zhang, Z., Qi, B., Long, T., He, G., &amp; Wei, M. (2025). Updated 30 m resolution global annual burned area map, 2014&ndash;2024 (Version 1). Zenodo.',
      attributes: 'Binary per year: 1 = burned, 0 = nodata. Reported as a union area (burned at least once) and a per-year series.',
      sources: 'Global Annual Burned Area Map (GABAM), derived from Landsat imagery, one raster per year, 2014 to 2024, 30 m.',
      prep: 'All years are aligned to the first year&rsquo;s grid so that the multi-year union is an exact pixel-wise OR. Resampling is <strong>nearest neighbour only</strong>; a burned / not-burned flag must never be interpolated.',
      method: 'GABAM is produced in Google Earth Engine using a Random Forest classification combined with a seed-growing algorithm to detect and delineate burned area. In the tool, <strong>two totals are produced deliberately</strong>. The headline is the <em>union</em> &mdash; the area that burned at least once, which is always at most the project area and reads as the true burned footprint. The bar chart is <em>per year</em>, where a pixel that reburns is counted in each year it burns, which is what an annual series should show. The sum of the annual areas is also retained; <strong>it can exceed the project area and measures burn events rather than footprint, so it must not be read as an area.</strong>',
      screen: 'F02 Site Characterisation &mdash; Climate, &ldquo;Historical Burned Area&rdquo;.',
      limits: 'Burned area in cropland should generally be treated as <strong>low confidence and may be under-reported</strong>, because agricultural burning is inherently difficult to map reliably.'
    }) +

    docLayer('Fire Susceptibility',
      'Distribution of the project area across five fire susceptibility classes.', {
      why: 'Fire susceptibility is read twice later: as a <strong>permanence risk</strong> that constrains activity design and durability, since fire is one of the main threats to restored and protected forest, and as a <strong>co-benefit</strong>, where reducing fire susceptibility is an ecosystem outcome in its own right.',
      citation: 'Asian Disaster Preparedness Center (ADPC).',
      attributes: 'Five classes: 1 Very Low, 2 Low, 3 Moderate, 4 High, 5 Very High. The class labels are <strong>shared with the natural disaster risk component</strong> so the two can never drift apart on wording.',
      sources: 'ADPC fire hazard raster, pre-classified. The model is to be updated using the RLCMS land cover as input.',
      prep: 'Resampling is nearest neighbour; the raster is categorical and its values must not be interpolated.',
      method: 'The layer is clipped to the project area and the full five-class distribution is tabulated, with the valid area as denominator so the bars sum to 100%. <strong>All five classes are always emitted, including empty ones</strong>, so the chart keeps a stable shape across sites and the absence of a class is visible. Note that the same raster is also read by the natural disaster risk component in General Context, but <em>under a different rule</em>: there it produces one conservative representative level (the highest class covering at least 20% of the project area), here it produces the full distribution. <strong>The two can legitimately disagree, and both statements are true &mdash; they answer different questions.</strong>',
      screen: 'F02 Site Characterisation &mdash; Climate, fire susceptibility bar chart. The narrative is fixed text supplied by the team, explaining what the layer means rather than reporting a result, because the result is the chart.',
      limits: 'This shows how likely the land is to burn <strong>under baseline conditions</strong>, based on factors such as land cover, dryness and climate. <strong>It is not a forecast of current fire danger.</strong> The data classification still needs refinement.'
    }) +

    docLayer('Soil Groups',
      'Ranked list of World Reference Base reference soil groups present, each with its share of the project area, and the dominant group named.', {
      why: 'Soil group is context for activity design: rooting depth, drainage and nutrient supply all shape which species and which establishment method are workable. <strong>A high Histosols share also cross-checks the ecosystem and soil carbon layers</strong>, since Histosols with no peatland in the ecosystem layer is a contradiction worth surfacing.',
      citation: 'IUSS Working Group WRB (2007). World Reference Base for Soil Resources 2006, first update 2007. World Soil Resources Reports No. 103. FAO, Rome. Data: ISRIC SoilGrids.',
      attributes: 'WRB 2006 reference soil group name and share of area, expressed as a percentage. Narrative: &ldquo;Based on the World Reference Base for Soil Resources (WRB) 2006, the soils in this area are predominantly [group]. The distribution of all identified soil types is presented below.&rdquo;',
      sources: 'ISRIC SoilGrids, WRB 2006 soil groups, 250 m.',
      prep: '<strong>Two input modes are supported and they do not measure the same thing.</strong> In <em>categorical mode</em>, a class raster with a code-to-name lookup gives the share of project area falling in each class; resampling is nearest neighbour. In <em>probability mode</em>, one probability raster per WRB group gives the mean probability of that group across project-area pixels; resampling is area-weighted average. Whichever mode is active, the tool writes the measure and the axis label into its output so the interface labels the axis from the data. <strong>The word &ldquo;probability&rdquo; must not appear in the interface while categorical mode is active, because those numbers are not probabilities.</strong>',
      method: 'Clip to the project area and tabulate. In categorical mode the denominator is the valid soil area, so shares sum to 100% over the mapped part of the project area rather than over the whole polygon. In probability mode a pixel counts only where every group raster is valid, so the breakdown still sums to 100%. Groups below a minimum threshold are dropped from the list, because around thirty groups are modelled and most sites touch only a handful; without a floor the table fills with noise. <strong>Soil group descriptions cover soil properties only and never state whether a soil suits a Nature-based Solution</strong>, because that depends on climate, slope, hydrology, land cover and tenure rather than on the soil group alone.',
      screen: 'F02 Site Characterisation &mdash; Climate, &ldquo;Soil classification&rdquo; (table of soil class and share).',
      limits: 'The classification provides a standardised international soil nomenclature and <strong>should not be interpreted as a substitute for site-specific soil surveys or field verification</strong>.'
    }) +
    docSource('Table A3'),
    'annex-a3-fire-soil');
}

/* ------------------------------------------------------ A.4 People */
function docsAnnexPeople() {
  return docHero('ANNEX A.4', 'People layers',
    'Unlike the nature and climate layers, which are spatially explicit, most socio-economic data are jurisdiction-based: reported for an administrative unit rather than for the project area itself. The two gridded population layers are the exception — and even they are modelled estimates, not a head count.',
    ['4 layers', 'F02 People', 'Jurisdiction-based, mostly']) +

  docSection('A.4 &mdash; The two gridded population layers', ANNEX_INTRO +

    docLayer('Gridded Population',
      'Total estimated population inside the project area, population density, settled area (ha) and the share of the project area that is settled.', {
      why: 'Population is the starting point for understanding who lives in and around a prospective site. It informs project design directly: <strong>avoided deforestation projects tend to sit on land with low population and substantial remaining natural forest, while restoration and agroforestry projects often sit in more populated areas</strong>, where the effect on local livelihoods becomes central. It is also the denominator behind every per-capita figure on the People screen.',
      citation: 'Bondarenko, M., Priyatikanto, R., Tejedor-Garavito, N., Zhang, W., McKeen, T., Cunningham, A., Woods, T., Hilton, J., Cihan, D., Nosatiuk, B., Brinkhoff, T., Tatem, A., &amp; Sorichetta, A. Constrained estimates of 2015&ndash;2030 total number of people per grid square at a resolution of 3 arc seconds, R2025A version v1. Global Demographic Data Project, funded by the Bill and Melinda Gates Foundation (INV-045237). WorldPop, University of Southampton.',
      attributes: 'People, people per km², hectares, percent. Narrative: &ldquo;Based on gridded world population data, the selected area has an estimated total population of [total], consisting of [male] males and [female] females.&rdquo;',
      sources: 'WorldPop Global Demographic Data Project, release R2025A, constrained population counts, 100 m, one estimate per year from 2015 to 2030, covering 242 countries and territories.',
      prep: 'WorldPop starts from official census counts, which are published only for whole administrative units, and distributes those counts across the grid. A random forest model learns where people are most likely to live from covariates visible from satellites: buildings and building footprints, built-up areas, night-time lights, roads, terrain, climate, land cover and distance to water. This is the <strong>constrained</strong> version, meaning people are placed only on land that shows signs of settlement, so open forest, farmland with no houses and water stay at zero. National totals are matched to the UN World Population Prospects 2024.',
      method: '<strong>Population is a count, not a density</strong>, so the tool uses <em>sum</em> resampling when it aligns the raster to the equal-area analysis grid, and sums the counts directly rather than multiplying them by cell area. The raster is clipped to the project area, the counts are summed for the headline, and the settled area and share are derived from the non-zero cells.',
      screen: 'F02 Site Characterisation &mdash; People, &ldquo;Estimated Populations&rdquo; (big number).',
      limits: 'These are <strong>estimates from a model, not a head count</strong>. Reliability depends on how recent and how detailed the census behind them is, and that varies a great deal from country to country. Years between censuses are filled in by interpolation, and crowded urban areas can come out too low. The numbers describe <strong>where people usually live, not where they are during the day</strong>, so they miss commuters, seasonal workers and recently displaced people. Read change between years with care, especially over small areas. Use for landscape-scale work only: this is not a legal or official statement of population, settlement or boundaries, and site-level numbers should be checked against local or national statistics.'
    }) +

    docLayer('Gridded Age and Sex Structure',
      'Population by sex and age band, with children, working-age and older-adult totals and the dependency ratio.', {
      why: 'It tells a project not just how many people live there but <strong>who they are</strong>: how many are of working age and available for project activities, how many dependents each working adult supports, and which groups stand to be affected by or to benefit from the work. It feeds the community and social safeguard sections of carbon standard documentation.',
      citation: 'Bondarenko, M., Priyatikanto, R., Tejedor-Garavito, N., Zhang, W., McKeen, T., Cunningham, A., Woods, T., Hilton, J., Cihan, D., Nosatiuk, B., Brinkhoff, T., Tatem, A., &amp; Sorichetta, A. Estimates of 2015&ndash;2030 total number of people per grid square broken down by gender and age groupings at a resolution of 3 arc seconds, R2025A version v1. Global Demographic Data Project. WorldPop, University of Southampton.',
      attributes: 'Twenty age bands per sex in the source, grouped into fourteen display ranges: 0&ndash;4, then five-year ranges from 5&ndash;9 through 60&ndash;64, then 65 and over. Reported as people, percent and a ratio.',
      sources: 'WorldPop Global Demographic Data Project, release R2025A, constrained age and sex structures, 100 m, reference year 2025.',
      prep: 'WorldPop takes the age and sex breakdown reported by the census for a whole administrative unit and applies those proportions to the gridded population, again placing people only on settled land, with national totals matched to the UN World Population Prospects 2024.',
      method: 'Same alignment and sum resampling as the total population layer. Counts are summed by band inside the project area and grouped into the fourteen display ranges, then aggregated into <strong>children (0&ndash;14), working age (15&ndash;64) and older adults (65+)</strong>, with the dependency ratio derived from those three.',
      screen: 'F02 Site Characterisation &mdash; People, &ldquo;Estimated Age group&rdquo; (population pyramid plus headline figures).',
      limits: 'Modelled estimates, not a head count. <strong>The age and sex split is borrowed from a whole administrative unit and applied across it</strong>, so the broad shape of the population is reasonably reliable while a single narrow age band over a small area is much less certain than the overall total. As with the population layer, quality depends on how recent and detailed the census is. The numbers describe usual residents, not who is present during the day or in a particular season. Check against local or national statistics before quoting figures in a report.'
    }) +

    docSource('Table A4'),
    'annex-a4-population') +

  docSection('A.4 &mdash; Vulnerability and national statistics',

    docLayer('Climate Vulnerability',
      'Four independent vulnerability levels, from Very Low to Very High: physical, environmental, economic and social.', {
      why: 'Vulnerability describes how exposed the people and systems around a site are to climate hazards, and how well they could recover. <strong>Read together with the hazard layers it separates a place that is exposed but resilient from a place that is exposed and fragile</strong> &mdash; which is a different project design problem.',
      citation: 'Asian Disaster Preparedness Center (ADPC).',
      attributes: 'Five classes per dimension: 1 Very Low to 5 Very High.<br><strong>Physical</strong> &mdash; infrastructure, buildings, critical facilities and other exposed physical assets.<br><strong>Environmental</strong> &mdash; ecosystem degradation, the loss of natural buffers and reduced ecological resilience.<br><strong>Economic</strong> &mdash; dependence on climate-sensitive livelihoods, household income stability, asset bases and economic diversification.<br><strong>Social</strong> &mdash; the demographic and socio-economic characteristics that shape a community&rsquo;s ability to prepare for, respond to and recover from climate impacts.',
      sources: 'ADPC, four pre-classified vulnerability rasters.',
      prep: 'Resampling is nearest neighbour, to retain the class values.',
      method: 'Each raster is clipped to the project area, an area-weighted mean class is calculated, and the result is rounded to a single displayed class. The four dimensions are reported as <strong>four independent cards</strong>. <strong>No composite vulnerability score is calculated</strong>: the four are not commensurable, and averaging them would hide the dimension that actually constrains a project. A dimension with no valid coverage is reported as no data.',
      screen: 'F02 Site Characterisation &mdash; People, &ldquo;Vulnerability Assessment&rdquo; (four cards, Very High to Very Low).',
      limits: 'Vulnerability classes are <strong>modelled at regional scale and describe the wider setting rather than the project area itself</strong>. They are not a substitute for a participatory vulnerability assessment with the communities concerned.'
    }) +

    docLayer('National socio-economic indicators (country-specific)',
      'Thirteen indicator families reported at the finest administrative level each national statistical office publishes.', {
      why: 'Spatial layers describe the land; these describe the people who use it. They give the denominators behind household-level indicators, indicate how directly livelihoods depend on land and natural resources, show the register at which training materials, contracts and consultation should be pitched, and supply the baseline that community and social safeguard sections of carbon standards require.',
      citation: 'Compiled for the NbS Tool v3 (2026) from official statistics published by each national statistical office: Statistics Indonesia (BPS); Department of Statistics Malaysia (DOSM); Philippine Statistics Authority (PSA); National Statistical Office Thailand (NSO); General Statistics Office Viet Nam (GSO); National Institute of Statistics Cambodia (NIS); Lao Statistics Bureau (LSB); Department of Population Myanmar; Department of Economic Planning and Statistics Brunei Darussalam (DEPS); Department of Statistics Singapore (SingStat); National Statistics Directorate Timor-Leste (NSD).',
      attributes: 'Number of Households · Unemployment Rate · Employment Rate · Underemployment Rate · Employment by Sector · Top 5 Industries or Occupations · Literacy Rate · Number of Students Enrolled · Population Educated (school attainment) · Average Household Income · Top 5 Common Diseases · Households with Access to Water · Toilet Facility Categories · Permanent Reserved Forests. <strong>Units vary by indicator</strong>: households, percent, persons, local currency per month, hectares.',
      sources: 'One national series per indicator per country. The administrative level and the reference years <strong>differ by country and by indicator</strong>: from village level in Indonesia (63,401 villages, education attainment), through district, province, region and state, to national only for several Brunei, Cambodia, Lao PDR and Singapore series.',
      prep: 'Series are compiled from published national tables and joined to the administrative boundary layer. <strong>Where a published series does not match the indicator definition it is left unpopulated rather than substituted</strong>: Indonesian household counts, for example, are not taken from family-card counts, which over-count households by roughly a quarter.',
      method: 'The tool identifies the administrative unit containing the site, selects the value for that unit at the most recent available reference year, and inserts it into the narrative sentence for the relevant section. For the distribution indicators &mdash; employment by sector, education attainment, top industries, common diseases &mdash; the published categories are ranked or totalled for that unit and the leading entries are returned.',
      screen: 'F02 Site Characterisation &mdash; People, per-country sections.',
      limits: 'These are official national statistics, produced under each country&rsquo;s own definitions, survey instruments and reference periods. <strong>Values are not directly comparable between countries</strong> and should be read only against other years of the same national series. Administrative boundary changes are not retrofitted, so units created recently may be absent from earlier years. Several series carry a country-specific caveat: Thailand counts registered rather than resident households and excludes Bangkok from the provincial labour force series; Malaysian student enrolment covers pre-school only; Viet Nam student enrolment covers university only; Singapore reports employment for residents aged 25 to 64, a narrower base than elsewhere. Unlike the nature and climate layers, these data are <strong>jurisdiction-based, so the picture they give may not represent conditions inside the project area itself</strong>.'
    }) +
    docSource('Table A4'),
    'annex-a4-statistics');
}

/* ------------------------------------ A.5 Threat profile · A.6 Pathway */
function docsAnnexThreat() {
  return docHero('ANNEX A.5', 'Threat profile layers',
    'The three layers behind Phase 3 — the ones that report not what is here, but what is happening to it. Two read structural decline in forest that is still standing and what is driving it; the third reads the hydrology that decides whether anything on peat can work at all. All three carry the same instruction: field verification is required.',
    ['3 layers', 'F02 Threat Profile', 'Field verification required']) +

  docSection('A.5 &mdash; Disturbance, and what is driving it', ANNEX_INTRO +

    docLayer('Ecosystem disturbance screening',
      'Total ecosystem area and disturbed area (ha and %) for dryland forest, mangrove and peatland.', {
      why: 'It answers where the most disturbed area is and what is driving it. The screening compares the three ecosystems side by side so a user can see immediately <strong>which one carries the largest disturbed or degraded area</strong>, which is the first input to choosing between Protect, Manage and Restore on a mixed site.',
      citation: 'Bourgoin, C., et al. (2024), methodology published following the JRC Tropical Moist Forest data on degraded and undisturbed forest. FAO (2011), FRA Working Paper 177, for the growing stock and biomass marker of degradation.',
      attributes: 'Forest disturbance raster: any pixel above zero is disturbed. The ecosystem breakdown reports area (ha), share of total, disturbed area (ha) and disturbed share, per ecosystem, plus an <em>Other</em> residual.',
      sources: 'Forest disturbance layer, produced on the tree canopy cover and tree canopy height stack behind the SIGnal forest cover, combined with the ecosystem layer. 30 m.',
      prep: 'The disturbance layer is calibrated on the pooled Southeast Asia distribution, so <strong>its values are not one-to-one with the published JRC Tropical Moist Forest product</strong>.',
      method: 'Disturbance is defined as <em>structural decline within retained forest</em>, assessed as a canopy height deficit relative to an undisturbed reference population, where the reference population is defined at <strong>120 m or more</strong> from any disturbed forest. The detection threshold is set at the <strong>5th percentile</strong> of the reference population&rsquo;s height change, giving a nominal 5% false-positive rate. In the tool, the disturbance layer is crossed with the ecosystem layer inside the project area and the areas are tabulated per ecosystem.',
      screen: 'F02 Threat Profile, &ldquo;Ecosystem overview&rdquo; (three ecosystem cards plus bar chart) and the ecosystem disturbance map.',
      limits: '&ldquo;Forest disturbance&rdquo; here is an <strong>internal working term</strong> for forest degradation involving structural change across the ten-year window. It addresses the growing stock and biomass marker of degradation in FAO (2011) but <strong>is not a complete assessment of forest degradation as FAO defines it</strong>, and no globally agreed operational definition currently exists. A ten-year window is long for degradation detection; version 3.1 will revise this to an annual or five-year analysis. <strong>Field verification is required.</strong>'
    }) +

    docLayer('Forest disturbance drivers',
      'The disturbance drivers detected inside the project area, grouped into human-caused, natural and other.', {
      why: '<strong>A pathway addresses a driver, not a symptom.</strong> Knowing whether forest is being lost to small-scale agriculture, to selective logging, to road development or to fire changes which activity is worth proposing and which is likely to fail.',
      citation: 'Slagter, B., et al. (2026).',
      attributes: '<strong>Human-caused:</strong> small-scale agriculture, small-scale agriculture (fire), large-scale agriculture, large-scale agriculture (fire), road development, selective logging, mining. <strong>Natural:</strong> flooding, forest fire, drought, typhoon, landslide, extreme climate event. <strong>Other:</strong> non-productive conversion, unknown. For mangrove the human-caused set is commodities and settlement, the natural set is extreme climate event, and the other set is non-productive conversion.',
      sources: 'Forest disturbance drivers layer, values 1 to 11, 30 m.',
      prep: 'A post-processing step identifies where fire coincided with the clearing of agricultural land, based on the presence of <strong>VIIRS fire alerts within a 500 m buffer</strong> of the alert and a low post-disturbance normalized burn ratio in the following month&rsquo;s Sentinel-2 composite. A further step masks out the area outside the forest disturbance layer and recalibrates against the ADPC disaster risk layers; <strong>only high and very high disaster risk is treated as contributing to forest disturbance</strong>.',
      method: 'The driver layer is masked to the disturbance layer and clipped to the project area, then the area of each driver class is tabulated and grouped into the three families. The main dashboard shows only the <strong>leading pressure group with the largest area</strong>; the detailed driver classes sit behind a view-details control.',
      screen: 'F02 Threat Profile, &ldquo;Dryland Forest disturbance drivers&rdquo; and &ldquo;Mangrove disturbance drivers&rdquo; (driver list plus details).',
      limits: 'The source classifies the <strong>key</strong> drivers of forest disturbance and may not include all potential causes of deforestation. A disturbance here refers to a significant change in tree canopy cover and canopy height, <strong>indicating degradation without a significant loss of standing trees</strong>. Field verification is required.'
    }) +

    docSource('Table A5'),
    'annex-a5-disturbance') +

  docSection('A.5 &mdash; Peatland hydrology',

    docLayer('Peatland drainage pressure',
      'Canal proximity, drainage pressure and fire risk, each classified High, Moderate or Low, with the distance to the nearest canal.', {
      why: 'Drainage is the primary driver of peatland degradation. Canals lower the water table, which dries the peat, accelerates oxidation and subsidence, and makes the peat far more likely to burn. <strong>On peat, hydrology is the condition that decides whether any other intervention can work</strong>, so it is reported as a disturbance signal in its own right, separately from vegetation cover.',
      citation: 'Dadap, N. C., Hoyt, A. M., Cobb, A. R., Oner, D., Kozinski, M., Fua, P. V., et al. (2021). Drainage canals in Southeast Asian peatlands increase carbon emissions. <em>AGU Advances</em>, 2, e2020AV000321. Astiani et al. (2017); Wedeux et al. (2020).',
      attributes: 'Three status fields, each High / Moderate / Low: canal proximity, drainage pressure, fire risk. Plus the distance in metres to the nearest canal, and the peatland area split into remaining peat forest, disturbed, and converted or lost.',
      sources: 'Drainage canal density layer (Dadap et al. 2021), the ecosystem layer, the historical deforestation layer, and the fire risk layer. 30 m analysis grid; <strong>canal density at 1 km</strong>.',
      prep: 'The Dadap et al. drainage canal dataset captures canals across both peatland and non-peatland areas, so it is masked with the ecosystem layer to retain only canals occurring within mapped peatland in Southeast Asia.',
      method: 'Drainage pressure is the proximity of drainage canals to the project area, and <strong>deliberately includes canals outside the project boundary</strong> that may still influence peatland conditions inside it. Two published findings set the distances used: Astiani et al. (2017) found that canals can influence water-table depth up to <strong>500 m</strong> into the surrounding area, and Wedeux et al. (2020) found that canal networks may affect forest biomass growth up to <strong>1 km</strong> away. The tool combines canal proximity with the fire risk layer and reports each as a class.',
      screen: 'F02 Threat Profile, &ldquo;Peatland disturbance drivers&rdquo; (alert card).',
      limits: 'Peatland disturbance here refers to <em>possible</em> changes in peatland condition caused by canals, reduced soil moisture, fire occurrence or altered water table conditions, <strong>even where vegetation cover remains present</strong>. It is an indication of pressure, <strong>not a measurement of water table depth</strong>. Field verification is required.'
    }) +
    docSource('Table A5'),
    'annex-a5-peat');
}

/* ------------------------------------------------------ A.6 Pathway */
function docsAnnexPathway() {
  return docHero('ANNEX A.6', 'Pathway layers',
    'The two layers that turn the site reading into a pathway assignment. The first says what happened between 2014 and 2024; the second is where the whole chain lands — one raster with three bands carrying the pathway, the reference ecosystem and the decision row that produced them.',
    ['2 layers', 'F02 Pathway Selection', 'Screening recommendation']) +

  docSection('A.6 &mdash; What happened between the two dates', ANNEX_INTRO +

    docLayer('Forest Cover Trajectory',
      'The transition each part of the project area went through between 2014 and 2024, as a trajectory category.', {
      why: '<strong>A single snapshot cannot tell a Protect site from a Restore site.</strong> Degraded shrubland that was forest ten years ago and native shrubland that has never been forest look identical in a 2024 land cover map, but they call for opposite interventions. The trajectory is what separates them, and it is therefore the layer the pathway assignment rests on.',
      citation: 'Trajectory rules follow the ASEAN NbS/EbA MRV Framework (ASEAN&ndash;UK GTF, Output 2).',
      attributes: 'Trajectory categories: forest persisting, forest lost to plantation, forest degraded to vegetation, forest converted to active use, forest converted to barren, forest recovery, plantation stable or established, non-forest vegetation stable, active use stable or established, barren stable or established.',
      sources: 'Forest Cover 2014 (binary forest / non-forest) and Land Cover 2024 (grouped into six ecological state classes). 30 m.',
      prep: 'Land Cover 2024 is grouped into the six ecological state classes. Forest Cover 2014 is held as forest or non-forest, because <strong>a full six-class map for 2014 does not exist across the whole region</strong>.',
      method: 'Pixel-by-pixel comparison of the 2014 state against the 2024 class, applying the trajectory rules in the NbS MRV Framework. Because the 2014 side has two states and the 2024 side has six classes, the comparison produces a <strong>2 &times; 6 matrix of transitions</strong>. Each pixel is assigned one trajectory category. <strong>The layer describes the transition only</strong>, before any restoration or protection pathway is assigned.',
      screen: 'Not displayed as a layer. It is the input to the pathway raster.',
      limits: 'Forest Cover 2014 and Land Cover 2024 were built from different sources using different methods, so a transition between the two dates may partly reflect the change in mapping approach rather than a change on the ground. <strong>This is the single largest source of uncertainty in the pathway assignment.</strong>'
    }) +

    docSource('Table A6'),
    'annex-a6-trajectory') +

  docSection('A.6 &mdash; The pathway raster',

    docLayer('NbS Pathway (predefined)',
      'Area (ha) and share of the project area under each pathway: Protect, Manage, Restore, or Ineligible.', {
      why: 'It is the output the whole site characterisation builds towards: the recommended nature-based response for each part of the site, and how much land falls under each. It also carries the <strong>two join keys &mdash; category and reference ecosystem &mdash; that select which specific activities the tool can offer.</strong>',
      citation: 'Pathway rules follow the ASEAN NbS/EbA MRV Framework (ASEAN&ndash;UK GTF, Output 2). Hierarchy rationale: Cook-Patton, S. C., Drever, C. R., Griscom, B. W., Hamrick, K., Hardman, H., Kroeger, T., Pacheco, P., Raghav, S., Stevenson, M., Webb, C., Yeo, S., &amp; Ellis, P. W. (2021). Protect, manage and then restore lands for climate mitigation. <em>Nature Climate Change</em>, 11, 1027&ndash;1034.',
      attributes: 'One raster with three bands.<br><strong>Band 1, pathway:</strong> 0 no data, 1 Protect, 2 Manage, 3 Restore, 4 Ineligible.<br><strong>Band 2, reference ecosystem:</strong> 0 none, 1 dryland forest, 2 mangrove, 3 peatland, 4 savanna.<br><strong>Band 3, category index:</strong> 1 to 17, the canonical decision row.',
      sources: 'Derived from the Forest Cover Trajectory and the Ecosystem Type layer. 30 m.',
      prep: 'None in the tool. <strong>The raster is pre-computed</strong>; the tool summarises a finished raster rather than assigning pathways at run time.',
      method: 'Each trajectory category is mapped to a pathway through the predefined rules of the decision matrix. Broadly: persisting natural forest goes to Protect; degraded, converted or barren land whose reference ecosystem is forest goes to Restore; land under active or continuing use, and naturally regenerating forest, go to Manage; and categories such as stable plantation and settlement fall outside NbS eligibility. In the tool, band 1 is clipped to the project area and tabulated by area, with the total project area as denominator and an <em>Unclassified</em> row so the table sums to 100%. Bands 2 and 3 are not tabulated for display; their codes pass through to select the activities that apply.',
      screen: 'F02 Pathway Selection: ecosystem cards, the Protect / Manage / Restore selection badges, and the ineligible-area narrative.',
      limits: 'The pathway assignment is a <strong>predefined classification produced from two dates of satellite-derived land cover. It is a screening recommendation, not a prescription.</strong> All information in the NbS Tool is provided to support a pre-feasibility study; further data collection and field verification are required before a pathway is committed to.'
    }) +
    docSource('Table A6'),
    'annex-a6-raster');
}

/* ================================================== CHECKS & LIMITS */
function docsLimits() {
  return docHero('CHECKS & LIMITS', 'Limitations and how to read a figure',
    'Every limit the methodology states, collected in one place. It exists because limitations buried in a footnote get skipped, and this tool produces material that goes to funders and government partners — where an overstated figure does real damage.',
    ['Read before reporting', 'Screening only', 'Not verified']) +

  docSection('The sample-data warning', `
    ${docCallout('Every site figure in this build is illustrative', 'The numbers throughout this prototype describe one worked example area, not a real site. They demonstrate that the method runs end to end. <strong>They are not measurements of anywhere, and they must not be quoted, screenshotted into a proposal, or presented to a partner as findings.</strong>', 'warn')}`,
    'sample-data') +

  docSection('Components specified but not yet implemented', `
    <p>Two nature components are specified in the interface design but not implemented in the benefit notebook at the time of writing. A figure shown for them is not a result.</p>
    ${docTable(['Component', 'Status'], [
      ['<strong>8.2.1 Maintenance of ecological connectivity</strong>', 'Specified in the interface design. Not implemented in the benefit notebook.'],
      ['<strong>8.2.2 Protection of watershed function</strong>', 'Specified in the interface design. Not implemented in the benefit notebook. Reported qualitatively; no hydrological model is run.'],
      ['<strong>Manage carbon component</strong>', 'Not started. The Manage qualitative benefits already appear in the general benefit list, but there is no Manage carbon figure.']
    ])}`,
    'not-implemented') +

  docSection('Known inconsistencies in the current method', `
    <p>Three are recorded in the methodology document itself. They are reported here rather than reconciled, because reconciling them silently would hide a real disagreement between the specification and the build.</p>
    ${docTable(['Where', 'The inconsistency', 'How to handle it'], [
      ['<strong>Net ERRs narrative (8.4.4.3)</strong>',
       'The printed narrative says the figure does not yet subtract the buffer contribution; the code that produces it <em>does</em> subtract the buffer.',
       'Treat <code>net_ERR</code> as <strong>buffer-deducted</strong>, disregard the sentence, and <strong>do not quote the narrative to a third party</strong> until it is reconciled.'],
      ['<strong>Hazard class scale (Phase 3, A.1)</strong>',
       'The interface specifies five risk levels; the wired rasters carry four (1 Very Low to 4 High, 0 as nodata).',
       'The layer is flagged for reclassification. Do not read a &ldquo;High&rdquo; on a four-class raster as equivalent to a &ldquo;High&rdquo; on a five-class one.'],
      ['<strong>Reference CRS (2.3 vs Table 4 / Annex A)</strong>',
       'The analysis conventions give <code>ESRI:54043</code>; the Phase 1 table and Annex A give <code>ESRI:54034</code>.',
       'Confirm the intended code with the Substance Team before quoting it. The method — one reprojection to an equal-area CRS — is unambiguous either way.'],
      ['<strong>Avoided emissions formula (8.4.2)</strong>',
       'The formula line reads <code>&times; 44/7</code>; the bullet beneath it and the constants table both give <strong>44/12</strong>.',
       '44/12 is correct and is what this documentation uses. The source line should be corrected in the next revision.']
    ])}`,
    'known-inconsistencies') +

  docSection('Direction of bias, where the method knows it', `
    <p>Several components state which way their simplification pushes the answer. Knowing the direction is more useful than knowing that error exists.</p>
    ${docTable(['Component', 'Simplification', 'Direction'], [
      ['<strong>Ranked loss allocation (8.1)</strong>', 'Projected loss is allocated to the highest-risk pixels, which tend to be frontier and edge forest with less biomass',
       'Tends to give <strong>lower</strong> carbon results than a uniform distribution'],
      ['<strong>Project-area average rate (8.1)</strong>', 'The deforestation rate is a project-area average that may include degraded, fast-losing edge forest',
       'Applying it to Protect areas can <strong>overestimate</strong> the baseline'],
      ['<strong>No-data biomass in removals (8.4.3)</strong>', 'No-data above-ground biomass counts as a zero baseline',
       '<strong>Over-credits</strong> — the opposite direction to the equivalent rule in 8.4.2'],
      ['<strong>Condition uplift (8.2.5)</strong>', 'The degradation rate is added to the gain rate, treating degradation as recoverable headroom',
       '<strong>Inflates</strong> the uplift on sites that are degrading fast'],
      ['<strong>Soil carbon depth (A.3)</strong>', 'Soil organic carbon is reported to a fixed 30 cm depth',
       'A peatland project area will report <strong>far below</strong> its real soil stock'],
      ['<strong>Hazard representative level (Phase 3)</strong>', 'The highest class covering at least 20% of the area is taken',
       'Deliberately <strong>conservative</strong> — in risk screening a false negative costs more than a false positive'],
      ['<strong>Dryland zone fallback (8.4.3)</strong>', 'Boundary and missing-data pixels fall to seasonal lowland',
       'The <strong>conservative</strong> choice — the lowest growth rates of the three dryland zones']
    ])}`,
    'bias-direction') +

  docSection('Six things the tool cannot tell you', `
    ${docTable(['Question', 'Why the tool cannot answer it'], [
      ['<strong>May we lawfully work here?</strong>', 'Pathway eligibility is ecological and carbon-related only. Tenure, customary rights, concessions and protected-area legal status are not screened. GADM and WDPA are explicitly not legal references.'],
      ['<strong>What caused this degradation?</strong>', 'The driver layer classifies <em>key</em> drivers and may not include every cause. Attribution needs fieldwork; field verification is required.'],
      ['<strong>Which species are actually here?</strong>', 'Area of Habitat is modelled suitable habitat, not confirmed occurrence. In GBIF, absence of a record is not evidence of absence of the species.'],
      ['<strong>Can this project actually be delivered?</strong>', 'Cost, labour, community consent, market access and implementing capacity are outside the method. The tenure question moves to the feasibility stage.'],
      ['<strong>Are these carbon figures certifiable?</strong>', 'No project-specific baseline scenario, no additionality test, no formal uncertainty propagation, no independent validation, no monitoring record. The low and high figures are &times;0.7 and &times;1.2 — an indicative screening range, not a confidence interval.'],
      ['<strong>Is this what is happening on the ground right now?</strong>', 'Every layer has a vintage and a detection lag. WorldClim surfaces are long-term normals; the disturbance window is ten years; the mangrove reference uses a 1996 baseline.']
    ])}`,
    'cannot-answer') +

  docSection('How error propagates', `
    <p>The chain is multiplicative, which means errors do not stay where they start.</p>
    ${docFlow([
      ['1', 'Boundary error',     'Wrong hectares'],
      ['2', 'Ecosystem / reference', 'Wrong pathway eligibility'],
      ['3', 'Trajectory',         'Wrong decision row'],
      ['4', 'Benefit estimate',   'Wrong tonnes and hectares'],
      ['5', 'Reported claim',     'Confidently wrong']
    ])}
    ${docEquation('relative error in output &asymp; relative error in area + relative error in rate',
      'To first order, a 20% overstatement of eligible area and a 15% overstatement of the growth rate compound to roughly 35% overstatement of the reported tonnage.')}
    ${docCallout('Verify the boundary first', 'Of all the inputs, the AOI is the one a project team can most easily check and most cheaply fix. Confirming the boundary and the ecosystem split against field knowledge removes more error than refining anything further down the chain. The single largest source of uncertainty in the pathway assignment is the <strong>method difference between the 2014 and 2024 maps</strong>, which no amount of care with the boundary can remove &mdash; but which field knowledge of the site&rsquo;s recent history will expose immediately.', 'note')}`,
    'error-propagation') +

  docSection('Resolution and vintage travel with the number', `
    <p>Two properties are recorded for every dataset and both bound what can be concluded from it. <strong>Resolution</strong> sets the smallest feature that can be seen. <strong>Vintage</strong> sets how current the picture is.</p>
    ${docCallout('Quote the vintage with the number', 'A household figure from a 2015 census is not wrong, but presenting it without its year invites the reader to assume it is current. The tool records the year with every indicator; carry it through into anything you write. The same applies to depth on soil carbon, to the epoch on the mangrove reference layer, and to the reference period on every WorldClim figure.', 'warn')}`,
    'resolution-vintage') +

  docSection('When to stop screening and start doing fieldwork', `
    <p>Screening has done its job once a site looks plausible. The following should trigger field verification before any further use of the output:</p>
    <ul>
      <li>The site is about to enter a funding proposal or a partner agreement.</li>
      <li>The eligible area or the pathway split disagrees with local knowledge by more than a small margin.</li>
      <li>The benefit estimate is being used to size a budget or a target.</li>
      <li>Any figure is about to be presented to a community as a commitment.</li>
      <li>A carbon number is going anywhere near a buyer, a registry or a claim.</li>
      <li>The site is on peat &mdash; where hydrology decides everything, and the tool measures pressure rather than water table.</li>
    </ul>`,
    'when-to-stop');
}

/* ====================================================== REFERENCE */
function docsReference() {
  const c = docParam('carbon', {}) || {};
  const av = c.avoided, sq = c.sequestration;
  const dur = docParam('aoi.duration', null);

  /* Every "Source section" cell links to where this page explains that citation. */
  const r841   = docJump('§8.4.1', 'benefit-climate#carbon-constants');
  const r843   = docJump('§8.4.3', 'benefit-climate#carbon-sequestration');
  const rDist  = `${docJump('§6', 'phase3#phase3-disturbance')}, ${docJump('A.5', 'annex-threat#annex-a5-disturbance')}`;
  const rCanal = `${docJump('§6', 'phase3#phase3-peat')}, ${docJump('A.5', 'annex-threat#annex-a5-peat')}`;
  const rFlii  = docJump('A.2', 'annex-nature#annex-a2-condition');

  return docHero('REFERENCE', 'Parameters, formulas and glossary',
    'Everything a reviewer needs to reproduce the main calculations without reading the whole documentation: the method constants in one table, the live site parameters in another, every formula in one list, and a worked example they can follow end to end.',
    ['Method constants', 'Live site values', 'One page']) +

  docSection('Method constants', `
    <p>Transcribed from the methodology document. These do not change with the site.</p>
    ${docTable(['Constant', 'Value', 'Unit', 'Source section'], [
      ['Carbon fraction (CF)',            '0.47',      'tC per Mg dry matter', r841],
      ['Carbon fraction — mangrove (ARR)','0.451',     'tC per Mg dry matter', `${r841}, ${r843}`],
      ['CO₂ per C',                       '44 / 12',   'tCO₂e per tC',         r841],
      ['Root-to-shoot ratio (8.4.2)',     '0.28',      'ratio',                r841],
      ['Baseline rate max years',         '10',        'years',                r841],
      ['ANR stocking factor',             '0.8',       'multiplier',           r843],
      ['Active planting stocking factor', '1.0',       'multiplier',           r843],
      ['Low estimate multiplier',         '0.70',      'multiplier',           r843],
      ['High estimate multiplier',        '1.20',      'multiplier',           r843],
      ['Restore baseline — C4',           '25',        'Mg/ha standing biomass',r843],
      ['Restore baseline — C5',           '5',         'Mg/ha standing biomass',r843],
      ['Restore baseline — C6',           '0',         'Mg/ha standing biomass',r843],
      ['Growth phase — young',            'Years 1–20','phase',                r843],
      ['Growth phase — old',              'Years 21–40','phase',               r843],
      ['Disturbance reference distance',  '120',       'm from disturbed forest',rDist],
      ['Disturbance detection threshold', '5th percentile', 'of reference height change',rDist],
      ['Canal water-table influence',     '500',       'm (Astiani et al. 2017)',rCanal],
      ['Canal biomass influence',         '1,000',     'm (Wedeux et al. 2020)',rCanal],
      ['Hazard representative threshold', '20',        '% of project area',
       `${docJump('§6', 'phase3#phase3-hazard')}, ${docJump('A.1', 'annex-general#annex-a1-setting')}`],
      ['Admin sliver threshold',          '1.0',       '% of project area',
       docJump('A.1', 'annex-general#annex-a1-where')],
      ['Humid montane threshold',         '1,000',     'm elevation',          r843],
      ['Humid lowland rainfall threshold','2,000',     'mm/year',              r843],
      ['Dry month threshold',             '100',       'mm (Walsh 1996)',      r843],
      ['FLII High class',                 '&ge; 9.6',  'score out of 10',      rFlii],
      ['FLII Low class',                  '&le; 6.0',  'score out of 10',      rFlii],
      ['Soil carbon depth',               '0–30',      'cm',
       docJump('A.3', 'annex-climate#annex-a3-carbon')]
    ])}`,
    'method-constants') +

  docSection('Live site parameters', `
    <p>Read from the objects the product renders from, at the moment this page loaded.</p>
    ${docTable(['Parameter', 'Value', 'Unit', 'Source object'], [
      ['Area of interest',            docNum('aoi.total'),        'ha',    '<code>NBS_DATA.aoi</code>'],
      ['Non-eligible area',           docNum('aoi.nonEligible'),  'ha',    '<code>NBS_DATA.nonEligible</code>'],
      ['Eligible ecosystem area',     docNum('aoi.eligible'),     'ha',    '<code>NBS_DATA.totalEligible</code>'],
      ['Total disturbed area',        docNum('aoi.disturbed'),    'ha',    '<code>NBS_DATA.totalDisturbed</code>'],
      ['Project duration',            docNum('aoi.duration'),     'years', '<code>NBS_DATA.duration</code>'],
      ['Forest carbon stock',         c.forestStockTCha != null ? docFmt(c.forestStockTCha, 1) : docTodo('not readable'), 'tC/ha', 'Analyser assumptions note'],
      ['Avoided deforestation rate',  c.deforestationRate != null ? docFmt(c.deforestationRate, 2) : docTodo('not readable'), '%/yr', 'Analyser assumptions note'],
      ['Sequestration &mdash; Restore', c.restoreRate != null ? docFmt(c.restoreRate, 1) : docTodo('not readable'), 'tCO₂e/ha/yr', 'Analyser assumptions note'],
      ['Sequestration &mdash; Manage',  c.manageRate != null ? docFmt(c.manageRate, 1) : docTodo('not readable'), 'tCO₂e/ha/yr', 'Analyser assumptions note'],
      ['Leakage deduction',           av?.leakageShare != null ? docPct(av.leakageShare, 0) : docTodo('not readable'), 'of gross', 'Net ERRs formula'],
      ['Uncertainty deduction',       av?.uncertaintyShare != null ? docPct(av.uncertaintyShare, 0) : docTodo('not readable'), 'of gross', 'Net ERRs formula'],
      ['Buffer deduction',            av?.bufferShare != null ? docPct(av.bufferShare, 0) : docTodo('not readable'), 'of gross', 'Net ERRs formula'],
      ['Ecosystems',                  docNum('matrix.ecosystemCount'), 'count', '<code>ecosystems</code>'],
      ['NbS activities',              docNum('matrix.activityCount'),  'count', '<code>ecosystems[].activities</code>'],
      ['Distinct benefits',           docNum('matrix.benefitCount'),   'count', 'Activity matrix'],
      ['Distinct indicators',         docNum('indicators.total'),      'count', '<code>indicatorMeta</code>'],
      ['Countries (People Context)',  docNum('people.countryCount'),   'count', '<code>NBS_PEOPLE.DATA</code>']
    ])}`,
    'live-site-parameters') +

  docSection('All formulas', `
    <h3>Deforestation rate &mdash; Puyravaud (2003)</h3>
    ${docEquation('rate = (1 / (t2 &minus; t1)) &times; ln(A2 / A1) &times; 100',
      'A1 = 2014 forest area, A2 = A1 minus gross loss, t2 &minus; t1 = 10. Gain is deliberately excluded from A2.')}
    <h3>The shared loss projection</h3>
    ${docEquation('projected_loss_ha = risk_area_ha &times; (1 &minus; exp(&minus;r &times; t))', 'r = rate_pct ÷ 100; t = project duration in years.')}
    <h3>Avoided emissions &mdash; the Protect side</h3>
    ${docEquation('Total Protect Area = &Sigma; ( pixels designated Protect &cap; pixels with a risk value )')}
    ${docEquation('Avoided Emissions&#8348; = &Sigma; ( AGB &times; (1 + 0.28) &times; 0.47 &times; 44/12 )')}
    <h3>Carbon removals &mdash; the Restore side</h3>
    ${docEquation('AGB = (Growth Rate_young &times; Years_young) + (Growth Rate_old &times; Years_old)')}
    ${docEquation('Total Biomass = AGB &times; (1 + R)')}
    ${docEquation('Total CO₂e = Total Biomass &times; Carbon Fraction &times; 44/12')}
    ${docEquation('Net CO₂e = Total CO₂e &minus; Baseline CO₂e')}
    ${docEquation('Adjusted Net CO₂e = Net CO₂e &times; Stocking Factor')}
    ${docEquation('Total Project Carbon = &Sigma; ( Adjusted Net CO₂e per pixel &times; area of pixel )')}
    <h3>Net carbon figures</h3>
    ${docEquation('Net Credits = Gross &minus; (Gross &times; Leakage) &minus; (Gross &times; Uncertainty) &minus; (Gross &times; Buffer)')}
    ${docEquation('Adjusted Total = (Gross Protect &minus; Protect Deduction) + (Gross Restore &minus; Restore Deduction)')}
    ${docEquation('Final Net Credits = Adjusted Total &minus; (Adjusted Total &times; Buffer %)', 'The buffer is applied once, to the combined total.')}
    ${docEquation('Annual Credits = Final Net Credits &divide; Project Duration (years)')}
    <h3>Nature benefits</h3>
    ${docEquation('habitat_loss_avoided_ha = &Sigma; ( pixel_ha &times; allocated_loss &times; habitat_union )')}
    ${docEquation('avoided_habitat_loss_pct = &Sigma; avoided_ha &divide; &Sigma; habitat_aoi_ha &times; 100', 'Across all threatened species.')}
    ${docEquation('uplift&#8348; = A_restore &times; ( C_project,&#8348; &minus; C_baseline,&#8348; )')}
    ${docEquation('condition_uplift = min( 1.0, (gain_rate + degradation_rate) &times; t )')}
    ${docEquation('biodiversity_uplift_ha = restore_ha &times; condition_uplift')}
    <h3>Microclimate regulation</h3>
    ${docEquation('annual_gain_rate = total_gain(2014 to 2024) &divide; 10')}
    ${docEquation('projected_gain = annual_gain_rate &times; years from 2024 to project end')}
    <h3>Derived biomass</h3>
    ${docEquation('BGB (Mg/ha) = AGB (Mg/ha) &times; 0.28', 'Used by 8.4.2 and by the below-ground biomass layer. The ARR method uses per-ecosystem ratios instead.')}
    ${docEquation('storage (tCO₂e) = SOC (tC) &times; 44/12', 'Soil organic carbon. The 0.47 carbon fraction is deliberately NOT applied — this layer already holds carbon, not dry matter.')}`,
    'all-formulas') +

  docSection('End-to-end worked example', `
    ${(() => {
      const t = docParam('aoi.total', null), ne = docParam('aoi.nonEligible', null), el = docParam('aoi.eligible', null);
      const f = docParam('eco.forest', null);
      if (t == null || !el || !f || !av || !sq) return docCallout('Missing', docTodo('live parameters incomplete — worked example cannot be computed'), 'warn');
      return docExample('From boundary to Net ERRs',
        `<p><strong>Phase 1 &mdash; Select location.</strong> An AOI of ${docFmt(t)} ha contains ${docFmt(ne)} ha of non-eligible land.</p>
         <ul><li>eligible = ${docFmt(t)} &minus; ${docFmt(ne)} = <strong>${docFmt(el)} ha</strong></li></ul>
         <p><strong>Phases 2&ndash;3 &mdash; Characterisation and threat.</strong> ${docFmt(f.area)} ha of forest, ${f.disturbedPct}% disturbed, ${f.lossPct}% lost over the ten-year window.</p>
         <ul><li>disturbed = ${docFmt(f.area)} &times; ${f.disturbedPct}% = <strong>${docFmt(f.disturbed)} ha</strong></li>
             <li>loss = ${docFmt(f.area)} &times; ${f.lossPct}% = <strong>${docFmt(f.loss)} ha</strong></li>
             <li>remaining = <strong>${docFmt(f.remaining)} ha</strong></li></ul>
         <p><strong>Phase 4a &mdash; Pathway.</strong> Forest persisting (Cat 1) &rarr; Protect. Forest degraded or converted on a non-savanna reference (Cat 3B, 4B, 5) &rarr; Restore.</p>
         <p><strong>Phase 5 &mdash; Gross carbon over ${dur} years.</strong></p>
         <ul><li>gross avoided = <strong>${docFmt(av.gross)} tCO₂e</strong> (${docFmt(av.perHa, 1)} tCO₂e/ha)</li>
             <li>gross removals = <strong>${docFmt(sq.gross)} tCO₂e</strong> (${docFmt(sq.perHa, 1)} tCO₂e/ha)</li></ul>
         <p><strong>Deductions.</strong> ${av.leakageShare != null ? docPct(av.leakageShare, 0) : '—'} leakage, ${av.uncertaintyShare != null ? docPct(av.uncertaintyShare, 0) : '—'} uncertainty, ${av.bufferShare != null ? docPct(av.bufferShare, 0) : '—'} buffer.</p>
         <ul><li>net avoided = ${docFmt(av.gross)} &minus; ${docFmt(av.leakage)} &minus; ${docFmt(av.uncertainty)} &minus; ${docFmt(av.buffer)} = <strong>${docFmt(av.net)} tCO₂e</strong></li>
             <li>net removals = ${docFmt(sq.gross)} &minus; ${docFmt(sq.leakage)} &minus; ${docFmt(sq.uncertainty)} &minus; ${docFmt(sq.buffer)} = <strong>${docFmt(sq.net)} tCO₂e</strong></li></ul>`,
        `<strong>Net ERRs = ${docFmt(av.net + sq.net)} tCO₂e</strong> over ${dur} years, from ${docFmt(av.gross + sq.gross)} tCO₂e gross &mdash; an illustrative screening figure, not a certifiable result.`);
    })()}`,
    'worked-example') +

  docSection('Glossary', `
    ${docTable(['Term', 'Meaning'], [
      ['<strong>NbS</strong>', 'Nature-based Solutions &mdash; protecting, managing or restoring ecosystems to deliver benefits for nature, people and climate'],
      ['<strong>SCeNe</strong>', 'Southeast Asia Climate and Nature-based Solutions Coalition &mdash; the coalition behind the tool'],
      ['<strong>AOI</strong>', 'Area of Interest &mdash; the boundary drawn or uploaded for analysis'],
      ['<strong>AOH</strong>', 'Area of Habitat &mdash; modelled accessible habitat within a species&rsquo; range'],
      ['<strong>ARR</strong>', 'Afforestation, Reforestation and Revegetation &mdash; the framework behind the Restore pathway'],
      ['<strong>ANR</strong>', 'Assisted Natural Regeneration &mdash; carries a stocking factor of 0.8'],
      ['<strong>AUD</strong>', 'Avoided Unplanned Deforestation &mdash; the construct component 8.4.2 estimates'],
      ['<strong>MRV</strong>', 'Monitoring, Reporting and Verification'],
      ['<strong>FO</strong>', 'Frontline Organisation'],
      ['<strong>Net ERRs</strong>', 'Net Emission Reductions and Removals &mdash; avoided emissions plus removals, after deductions'],
      ['<strong>tCO₂e</strong>', 'Tonnes of carbon dioxide equivalent'],
      ['<strong>tC</strong>', 'Tonnes of carbon; 1 tC &asymp; 3.67 tCO₂e'],
      ['<strong>AGB / BGB</strong>', 'Above-Ground Biomass / Below-Ground Biomass, in Mg of dry matter per hectare'],
      ['<strong>SOC</strong>', 'Soil Organic Carbon'],
      ['<strong>Leakage</strong>', 'Pressure displaced outside the project area rather than removed'],
      ['<strong>Buffer</strong>', 'Tonnage held in reserve against reversal'],
      ['<strong>Pathway</strong>', 'Protect, Manage, Restore &mdash; or Carbon ineligible, a screening outcome reported in the same field'],
      ['<strong>Reference ecosystem</strong>', 'The potential natural vegetation of a site &mdash; what <em>should</em> grow there, not what does'],
      ['<strong>Trajectory</strong>', 'The transition from the 2014 state to the 2024 ecological state class; ten categories'],
      ['<strong>C1&ndash;C6</strong>', 'The six ecological state classes, from mature natural forest (C1) to barren (C6)'],
      ['<strong>Cat 1&ndash;Cat 10</strong>', 'The ten trajectory categories; conditional splits expand them to seventeen decision rows'],
      ['<strong>RLCMS</strong>', 'SERVIR Regional Land Cover Monitoring System &mdash; the source of Land Cover 2024'],
      ['<strong>MSPA</strong>', 'Morphological Spatial Pattern Analysis &mdash; the structural connectivity method'],
      ['<strong>FLII</strong>', 'Forest Landscape Integrity Index'],
      ['<strong>KBA</strong>', 'Key Biodiversity Area'],
      ['<strong>WDPA</strong>', 'World Database on Protected Areas'],
      ['<strong>GABAM</strong>', 'Global Annual Burned Area Map'],
      ['<strong>ADPC</strong>', 'Asian Disaster Preparedness Center'],
      ['<strong>adm1 / adm2+</strong>', 'Administrative level of a statistic &mdash; province/state, or district and below']
    ])}`,
    'glossary');
}

function docsArticleHtml(id) {
  const map = {
    introduction: docsIntroduction,
    'how-it-works': docsHowItWorks,
    scope: docsScope,
    landcover: docsLandcover,
    conventions: docsConventions,
    phase1: docsPhase1,
    phase2: docsPhase2,
    phase3: docsPhase3,
    'phase4-state': docsPhase4State,
    'phase4-matrix': docsPhase4Matrix,
    'phase4-pathways': docsPhase4Pathways,
    phase5: docsPhase5,
    'benefit-nature': docsBenefitNature,
    'benefit-people': docsBenefitPeople,
    'benefit-climate': docsBenefitClimate,
    'annex-general': docsAnnexGeneral,
    'annex-nature': docsAnnexNature,
    'annex-climate': docsAnnexClimate,
    'annex-people': docsAnnexPeople,
    'annex-threat': docsAnnexThreat,
    'annex-pathway': docsAnnexPathway,
    limits: docsLimits,
    reference: docsReference
  };
  return (map[id] || docsIntroduction)();
}
/* ============================================================================
   CHROME
   ========================================================================== */

function renderDocsNav(query = '') {
  const host = document.querySelector('#docs-article-nav');
  if (!host) return;
  const q = String(query || '').trim().toLowerCase();
  const visible = TECH_DOCS.articles.filter(a =>
    !q || `${a.label} ${a.keywords} ${a.group}`.toLowerCase().includes(q));

  if (!visible.length) {
    host.innerHTML = `<div class="docs-nav-empty">No methodology section matches &ldquo;${docEsc(query)}&rdquo;.</div>`;
    return;
  }
  let currentGroup = '';
  host.innerHTML = visible.map(a => {
    let group = '';
    if (a.group !== currentGroup) { currentGroup = a.group; group = `<div class="docs-nav-group">${docEsc(a.group)}</div>`; }
    const safe = docEsc(a.label);
    const label = q
      ? safe.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'), '<mark>$1</mark>')
      : safe;
    const active = a.id === TECH_DOCS.active;
    return `${group}<button type="button" class="docs-nav-button"${active ? ' aria-current="page"' : ''} data-doc-article="${a.id}">${label}</button>`;
  }).join('');
  host.querySelectorAll('[data-doc-article]').forEach(b =>
    b.addEventListener('click', () => openTechnicalDoc(b.dataset.docArticle)));
}

/* Move the page, and the keyboard, to a .doc-section by id. */
function docScrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: docScrollBehavior(), block: 'start' });
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

function renderDocsToc() {
  const host = document.querySelector('#docs-toc');
  const article = document.querySelector('#docs-article');
  if (!host || !article) return;
  const headings = [...article.querySelectorAll('.doc-section > h2')];
  host.innerHTML = headings.map(h =>
    `<a href="#${h.parentElement.id}" data-doc-toc="${h.parentElement.id}">${docEsc(h.textContent)}</a>`).join('');
  host.querySelectorAll('a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    docScrollToSection(a.dataset.docToc);
  }));

  if (TECH_DOCS.tocObserver) TECH_DOCS.tocObserver.disconnect();
  TECH_DOCS.tocObserver = new IntersectionObserver(entries => {
    const active = entries.filter(x => x.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!active) return;
    host.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.dataset.docToc === active.target.id));
  }, { rootMargin: '-22% 0px -68% 0px' });
  article.querySelectorAll('.doc-section').forEach(s => TECH_DOCS.tocObserver.observe(s));
}

function renderDocsFooter() {
  const article = document.querySelector('#docs-article');
  if (!article) return;
  const i = TECH_DOCS.articles.findIndex(a => a.id === TECH_DOCS.active);
  const prev = TECH_DOCS.articles[i - 1], next = TECH_DOCS.articles[i + 1];
  article.insertAdjacentHTML('beforeend',
    `<footer class="docs-article-footer">${
      prev ? `<button type="button" data-doc-footer="${prev.id}"><span>&larr; PREVIOUS</span><strong>${docEsc(prev.label)}</strong></button>` : '<span></span>'}${
      next ? `<button type="button" data-doc-footer="${next.id}"><span>NEXT &rarr;</span><strong>${docEsc(next.label)}</strong></button>` : '<span></span>'}</footer>`);
  article.querySelectorAll('[data-doc-footer]').forEach(b =>
    b.addEventListener('click', () => openTechnicalDoc(b.dataset.docFooter)));
}

function openTechnicalDoc(id, replaceHash = true) {
  if (!TECH_DOCS.articles.some(a => a.id === id)) id = 'overview';
  TECH_DOCS.active = id;
  const host = document.querySelector('#docs-article');
  if (!host) return;
  host.innerHTML = docsArticleHtml(id);
  renderDocsFooter();
  renderDocsNav(document.querySelector('#docs-search')?.value || '');
  renderDocsToc();
  /* nav-mobile.js hides unlabelled inline SVGs; re-run for freshly injected markup. */
  if (typeof hardenSvgs === 'function') hardenSvgs();
  if (replaceHash && history.replaceState) history.replaceState(null, '', `#docs/${id}`);
  window.scrollTo({ top: 0, behavior: docScrollBehavior() });
  host.focus({ preventScroll: true });
}

function loadTechnicalDocs() {
  if (!TECH_DOCS.loaded) {
    TECH_DOCS.params = readLiveParameters();
    TECH_DOCS.loaded = true;
    const search = document.querySelector('#docs-search');
    search?.addEventListener('input', e => renderDocsNav(e.target.value));
    /* Cross-references inside an article: data-doc-jump="<article-id>#<section-id>". */
    document.querySelector('#docs-article')?.addEventListener('click', e => {
      const jump = e.target.closest('[data-doc-jump]');
      if (!jump) return;
      const [article, section] = jump.dataset.docJump.split('#');
      openTechnicalDoc(article);
      if (section) docScrollToSection(section);
    });
  }
  const match = location.hash.match(/^#docs\/([a-z0-9-]+)$/);
  if (match && TECH_DOCS.articles.some(a => a.id === match[1])) TECH_DOCS.active = match[1];
  document.body.classList.add('docs-active');
  renderDocsNav();
  openTechnicalDoc(TECH_DOCS.active, false);
}

window.loadTechnicalDocs = loadTechnicalDocs;
window.openTechnicalDoc = openTechnicalDoc;

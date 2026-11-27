/* ============================================================================
   technical-docs.js — the Methodology articles (SCR-17)

   The in-app rendering of the team's reference document, "NbS Tool v3 ·
   Reference Methodology v3" (26 November 2026). Article order, wording, tables and equations follow
   that document so the two can be read side by side (DEC-93). Three groups:
     Methodology summary · How each phase is calculated ·
     Outputs, limitations and sources.

   Kept from the earlier build, because the reference document does not hold
   them: Land cover classes, and the two framework pages for Phase 6 and
   Phase 7, which read the activity and indicator catalogue live through
   readLiveParameters(). No article quotes a site figure from the sample data;
   the one worked example is the reference document's own run.
   ============================================================================ */


/* The article list (ids, groups, labels, search keywords) lives in
   js/docs-index.js, shared with Help. This file supplies the articles only. */
const TECH_DOCS = { params: null };

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


/* ------------------------------------------------------------ html builders */
function docSection(title, body, id = '') {
  return `<section class="doc-section" id="${id || docSlug(title)}"><h2>${title}</h2>${body}</section>`;
}
function docHero(kicker, title, intro, meta = []) {
  return `<header class="doc-hero"><span class="doc-kicker">${kicker}</span><h1>${title}</h1><p>${intro}</p>` +
         (meta.length ? `<div class="doc-meta">${meta.map(x => `<span>${x}</span>`).join('')}</div>` : '') + '</header>';
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
   The articles below follow the team's reference document, "NbS Tool v3 ·
   Reference Methodology" (DEC-93): same order, same wording, British spelling.
   Three groups: Methodology summary · How each phase is calculated ·
   Outputs, limitations and sources.
   ========================================================================== */
const G_SUMMARY = 'Methodology summary';
const G_PHASES  = 'How each phase is calculated';
const G_OUTPUTS = 'Outputs, limitations and sources';

/* The reference document uses two callouts only. */
const docNote    = body => docCallout('Note', body, 'note');
const docCaution = body => docCallout('Caution', body, 'warn');
/* A formula in plain words: title, one line per equation, a "where" list, and
   the published method it follows. `ref` is left empty only where the reference
   document names no external method. */
function docFormula(title, lines, where = [], ref = '') {
  return `<div class="doc-equation"><strong>${title}</strong>${
    lines.map(l => `<code>${l}</code>`).join('')}${
    where.length ? `<dl class="doc-where"><dt class="doc-where-label">where</dt>${
      where.map(w => `<div><dt>${w[0]}</dt><dd>${w[1]}</dd></div>`).join('')}</dl>` : ''}${
    `<small>Reference: ${ref || 'the tool&rsquo;s own implementation; the reference document names no external method.'}</small>`}</div>`;
}
const docSays = text => `<p><strong>What the tool says.</strong> &ldquo;${text}&rdquo;</p>`;
const docCaption = text => `<p class="doc-source">${text}</p>`;

/* ------------------------------------------------------ Methodology summary */
function docsSummary() {
  return docHero(G_SUMMARY, 'Summary',
    'This documentation tells you what each phase of the NbS Tool does, from the Interactive Map to the potential benefit, and which spatial layers each phase reads. It also shows the equations behind every figure that the tool reports.') +

  docSection('Summary', `
    <p>The NbS Tool screens a project area for nature-based solutions potential across three ecosystems in Southeast Asia. It starts at the ${docJump('Interactive Map', 'phase0')}, Phase 0, where a user explores the region before drawing anything, and continues in the Data Analyser as a chain of phases. Each analysis phase reads the result of the phase before it, so nothing later can be produced without the earlier stages, and each phase writes a result file keyed to the project boundary, which means a phase can be re-run without repeating the ones before it.</p>
    <p>Phase 1 fixes the project boundary. Phase 2 describes the site. Phase 3 describes what is happening to it. Phase 4a decides what kind of intervention the land can take, and Phase 4b decides what should be done on it and with which project settings. Phase 5 reports what that delivers. The single feedback loop in the chain is the threat profile, which is read a second time at the benefit stage to decide which climate-hazard and species components can be quantified.</p>
    <p>Each phase is documented in the same order: what it does, how it is used, which layers it reads, the method and equations underneath, and the usage notes that govern how the output should be read. Within each phase, sections follow the order of the screens specified in the GUI Design Document v3.1, so the documentation can be read alongside the interface.</p>
    ${docNote('The tool is a screening instrument. Results are reported as area-weighted distributions over the project area, never as a single label, because a project area almost always spans several classes at once. Where a method is uncertain, the tool reports the uncertainty rather than hiding it.')}`,
    'summary') +

  docSection('How this documentation is organised', `
    ${docTable(['Group', 'What it holds'], [
      ['<strong>Methodology summary</strong>', `This page, then ${docJump('Requirements and limits', 'requirements')}, ${docJump('Scope and analysis conventions', 'scope')}, the ${docJump('Workflow', 'workflow')} and the ${docJump('Land cover classes', 'landcover')}.`],
      ['<strong>How each phase is calculated</strong>', `One page per phase, from ${docJump('Phase 0 &middot; Interactive Map', 'phase0')} to ${docJump('Phase 5', 'phase5')}, followed by the two steps that start from a saved analysis: ${docJump('Phase 6 &middot; Monitoring planning', 'phase6')} and ${docJump('Phase 7 &middot; Generate documents', 'phase7')}.`],
      ['<strong>Outputs, limitations and sources</strong>', `${docJump('Outputs', 'outputs')}, ${docJump('Troubleshooting', 'troubleshooting')}, a ${docJump('Worked example', 'worked-example')}, ${docJump('Known issues and limitations', 'limitations')} and ${docJump('Sources', 'sources')}.`]
    ])}`,
    'organised');
}

function docsRequirements() {
  return docHero(G_SUMMARY, 'Requirements and limits',
    'This page shows what the tool accepts as a project boundary. It also shows the limits that apply to a session.') +

  docSection('Input requirements and session limits', `
    ${docTable(['Item', 'Value', 'Notes'], [
      ['<strong>Accepted formats</strong>', '.zip, .kml, .kmz', 'A .zip must contain the four shapefile components: .shp, .shx, .dbf and .prj. The .prj is what makes the reported area correct.'],
      ['<strong>Geometry</strong>', 'Polygon', 'Multi-part and multi-feature inputs are accepted and dissolved into one project area before measurement.'],
      ['<strong>Coordinate system</strong>', 'Any', 'The boundary is accepted in any coordinate reference system and reprojected once by the tool.'],
      ['<strong>Maximum area, guest session</strong>', '100,000 ha', 'A larger polygon is refused at the confirm step and the confirm button is replaced by a sign-in prompt.'],
      ['<strong>Maximum area, signed-in session</strong>', '500,000 ha', 'Above this the polygon has to be split, regardless of account type.'],
      ['<strong>Minimum area</strong>', 'None', `No check is applied. See the caution under ${docJump('Phase 1', 'phase1#phase1-notes')}.`],
      ['<strong>Project duration</strong>', '10 to 70 years', 'Default 30. Used only by Phase 5.']
    ])}
    ${docCaption('Table 1. Input requirements and session limits.')}
    ${docCaution('The three outputs worth having, save to portfolio, generate the feasibility document, and create the monitoring plan, all require an account, and the last two stay disabled until the project is saved. A guest session can run the full analysis but cannot keep it. Plan on an account before starting real work.')}`,
    'requirements');
}

function docsScope() {
  return docHero(G_SUMMARY, 'Scope and analysis conventions',
    'The methodology documentation sets four decisions. These decisions shape everything that the tool reports.') +

  docSection('Scope and conventions', `
    ${docTable(['Property', 'Value', 'Explanation'], [
      ['<strong>Region</strong>', '11 countries', 'Brunei Darussalam, Cambodia, Indonesia, Lao PDR, Malaysia, Myanmar, the Philippines, Singapore, Thailand, Timor-Leste and Viet Nam.'],
      ['<strong>Ecosystems</strong>', 'Three, plus one guardrail class', 'Dryland forest sits on well-drained mineral soil that is not regularly flooded. Mangrove sits in a coastal zone with salt or brackish water shaped by the tides. Peatland sits on peat, an organic soil that stays wet for most of the year. Savanna and natural grassland is carried inside the pathway data as a fourth reference class but is never offered as a restoration target, because planting trees on land whose natural state is open is conversion rather than restoration. In the reference ecosystem layer each pixel takes one ecosystem only, in a fixed priority order of mangrove, peatland, savanna and dryland forest, so peat swamp forest is counted as peatland and mangrove on peat as mangrove.'],
      ['<strong>Change window</strong>', '2014 to 2024', 'Everything the tool says about change, forest loss, disturbance, and the trajectory that selects the pathway is measured between those two dates.'],
      ['<strong>Measurement grid</strong>', 'Equal area', 'The boundary is reprojected once to ESRI:54034 World Cylindrical Equal Area, so every hectare figure is computed on an equal-area grid. That projection preserves area but distorts distance and shape away from the equator, so any measure that depends on distance applies a correction, and no component measures distance or perimeter directly in it.']
    ])}
    ${docCaption('Table 2. Scope and conventions.')}
    <p>The land cover map behind the ecosystems and the change window is described in ${docJump('Land cover classes', 'landcover')}.</p>`,
    'scope');
}

function docsWorkflow() {
  return docHero(G_SUMMARY, 'Workflow',
    'This page shows the phases of the NbS Tool: the Interactive Map, then the six analysis phases of the Data Analyser. For each phase, it shows what the phase does and what the phase produces.') +

  docSection('The phases', `
    ${docTable(['Phase', 'Name', 'What happens', 'What comes out'], [
      ['<strong>0</strong>', docJump('Interactive Map', 'phase0'), 'Explore 51 regional and country-specific layers in five groups, and search a province or district to draw a tracing guide.', 'A scoping view of the region before any boundary is drawn. Nothing is computed or saved, and no account is needed.'],
      ['<strong>1</strong>', docJump('Select location', 'phase1'), 'The user draws or uploads a polygon, checks the area on the confirm card, sets the project duration and confirms.', 'A project boundary, the area of interest, measured on an equal-area grid.'],
      ['<strong>2</strong>', docJump('Site characterisation', 'phase2'), 'Every spatial layer is clipped to the boundary and summarised on four tabs: General, Nature, Climate and People.', 'A description of the site as area-weighted distributions.'],
      ['<strong>3</strong>', docJump('Threat profile', 'phase3'), 'Reports observed ecosystem disturbance, ecosystem pressure and hazard, and the business-as-usual projection.', 'Deforestation and burned-area history, drainage pressure on peat, natural hazard levels, and deforestation and fire risk.'],
      ['<strong>4a</strong>', docJump('Pathway selection', 'phase4a'), 'Land cover in 2024 is compared with 2014, read against the reference ecosystem, and every pixel is assigned to Protect, Manage, Restore or Carbon ineligible.', 'Area and share under each pathway by ecosystem, the ineligible area with its reason, and the pathway raster.'],
      ['<strong>4b</strong>', docJump('Activity selection', 'phase4b'), 'Each trajectory category and reference ecosystem is joined to the activity catalogue. The user then chooses activities, the project duration and the carbon project settings.', 'The activities that apply on this ground, per pathway, and the settings Phase 5 runs with.'],
      ['<strong>5</strong>', docJump('Potential benefit', 'phase5'), 'Reports the benefits of the selected activities as a summary, general benefits and unique benefits across nature, people and climate, and quantifies carbon.', 'A benefit profile for nature, people and climate, plus gross and net carbon figures.']
    ])}
    ${docCaption('Table 3. The phases of the NbS Tool, the functionality of each and what it produces. Phase 0 sits before the Data Analyser; Phases 1 to 5 form the analysis chain.')}`,
    'six-phases') +

  docSection('After the analysis', `
    <p>In the interface workflow, the Monitoring Plan and the Document Generator follow the analysis. They start from a saved analysis rather than from the map, and they reuse the saved results rather than computing new ones, so their pages describe a framework rather than a method.</p>
    ${docTable(['Phase', 'Name', 'What happens', 'What comes out'], [
      ['<strong>6</strong>', docJump('Monitoring planning', 'phase6'), 'The selected activities are matched to indicators, each with a suggested method and frequency.', 'A draft monitoring plan to adapt.'],
      ['<strong>7</strong>', docJump('Generate documents', 'phase7'), 'The saved analysis and the user&rsquo;s own answers are placed into document templates.', 'Editable project documents.']
    ])}`,
    'after-the-analysis');
}

/* -------------------------------------------------------------------- Phase 0 */
function docsPhase0() {
  return docHero(G_PHASES, 'Phase 0 &middot; Interactive Map',
    'The Interactive Map is where a user looks at the region before committing to a project boundary. It computes nothing, saves nothing and needs no account.') +

  docSection('What the Interactive Map does', `
    <p>The Interactive Map is the entry point of the tool and sits outside the Data Analyser chain: it computes nothing, saves nothing and needs no account. Its job is scoping, so that the boundary drawn in ${docJump('Phase 1', 'phase1')} is drawn with the landscape already in view.</p>
    <p>The map carries 51 layers in five groups: country-specific layers, site information, nature, climate and people. Each layer can be switched on and off and read against the base map. A province or district search draws that administrative boundary on the map as a tracing guide; it does not become the project polygon. The analysis begins only when a boundary is confirmed in Phase 1.</p>
    ${docNote('The Interactive Map layers are carried over from version 2.5, as the GUI Design Document v3.1 records, except current land cover and future deforestation risk, which now show the same 2024 layers as the Data Analyser. Several others are older or coarser versions of a theme that the Data Analyser reads from a newer source: historical deforestation (Hansen tree cover loss on the map, ADPC forest cover change 2014 to 2024 in the analysis), carbon storage (ESA CCI biomass on the map, GEDI with AlphaEarth embeddings in the analysis) and burned area (MODIS on the map, GABAM in the analysis). A map layer is for orientation. Quote figures from the Data Analyser, not from the map.')}`,
    'phase0-overview') +

  docSection('Regional layers', `
    ${docTable(['Data', 'Short description', 'Source'], [
      ['<strong>Site information</strong>', '', ''],
      ['Administrative boundaries', 'Country, province and district boundaries, used for orientation and for the province or district search.', 'GADM (2022). n/a, 2022'],
      ['Current land cover', 'Land cover and land use classes that characterise the environmental state of an area.', 'ADPC (2024b), RLCMS accessed through SIGnal: AlphaEarth Foundations embeddings (Brown et al., 2025) classified with the primitives method of Saah et al. (2020) and validated after Olofsson et al. (2014); overall accuracy 0.76 to 0.83 by country. 30 m, 2024'],
      ['Elevation', 'Height above sea level from a digital elevation model, describing the topography that shapes land suitability, access and climate.', 'Farr et al. (2007), SRTM Version 3. 30 m, 2000'],
      ['Slope', 'Terrain steepness in percent, derived from SRTM and grouped into five classes following Dobos et al. (2005).', 'Farr et al. (2007), SRTM. 30 m, 2000'],
      ['Future deforestation risk', 'Relative ranking of how likely natural forest is to be cleared, modelled from elevation, slope, distance to forest edge, settlement, road and river, and protected area status. It shows where loss is more likely, not a baseline deforestation rate.', `WRI Indonesia (2026b), the same layer as the Data Analyser deforestation risk (${docJump('Table 18', 'phase3')}). 30 m, 2024`],
      ['Historical deforestation', 'Annual deforestation over the last ten years, from tree cover loss masked to the 2001 forest baseline.', 'Hansen et al. (2013), Global Forest Change. 30 m, 2020'],
      ['Mangrove', 'Mangrove extent from the Global Mangrove Watch baseline for 2010, with change epochs from 1996 to 2020.', 'Bunting et al. (2022), Global Mangrove Watch v3.0. 25 m, 2020'],
      ['Protected areas', 'Designated protected areas from the World Database on Protected Areas, maintained by UNEP-WCMC with IUCN.', 'UNEP-WCMC and IUCN (2023), WDPA. n/a, 2023'],
      ['<strong>Nature</strong>', '', ''],
      ['Endangered trees species richness', 'Richness of threatened tree species, pointing to areas where tree diversity is high and under pressure.', 'Gaisberger et al. (2022). 4,000 m, 2021'],
      ['Key Biodiversity Area', 'Sites of global importance for the persistence of biodiversity, identified by the Key Biodiversity Area Partnership.', 'BirdLife International (2023), World Database of Key Biodiversity Areas. n/a, 2022'],
      ['Forest Landscape Integrity Index', 'A continuous index of forest integrity that combines observed and inferred forest pressure with lost forest connectivity.', 'Grantham et al. (2020). 30 m, 2020'],
      ['Species Conservation Landscape: <em>Panthera tigris</em>', 'Tiger Conservation Landscapes: areas with confirmed tiger presence in the last five years, areas where tiger status is uncertain, and areas identified for restoration.', 'WCS (2020). 300 m, 2020'],
      ['Global peatlands', 'Peatland distribution compiled from the best available global, regional and national maps (PEATMAP).', 'Xu et al. (2018), PEATMAP. Resolution not recorded, 2018'],
      ['Global peatland drainage density', 'Density of drainage canals on peat, which lower water tables and raise peat oxidation, subsidence and fire risk.', 'Dadap et al. (2021). 1,000 m, 2022'],
      ['<strong>Climate</strong>', '', ''],
      ['Annual mean temperature', 'Long-term mean annual temperature, used to guide species selection and to read climate risk.', 'Hijmans et al. (2005), WorldClim. 927 m, 1950 to 2000'],
      ['Annual precipitation', 'Long-term mean annual precipitation.', 'Hijmans et al. (2005), WorldClim. 927 m, 1950 to 2000'],
      ['Burned area', 'Areas burned by fire, most relevant on peat, where burning releases large carbon stocks.', 'Giglio et al. (2021), MODIS MCD64A1. 500 m, 2023'],
      ['Current carbon storage', 'Forest above-ground biomass estimated from radar and optical Earth observation.', 'Santoro and Cartus (2023), ESA CCI Biomass v4. 100 m, 2020'],
      ['Frequency of land fires', 'How often land has burned, a measure of fire as a recurring disturbance.', 'Giglio et al. (2021), MODIS MCD64A1. 500 m, 2020'],
      ['<strong>People</strong>', '', ''],
      ['Ethnicity or indigenous territory', 'Territories of known ethnic and indigenous groups. Where indigenous territory data are missing, ethnic group boundaries from the Joshua Project are used.', 'Bruno Manser Fonds (2023); Joshua Project (2023); Open Development Mekong (2023); PAFID and NCIP (2023); Save Cambodia&rsquo;s Wildlife (2023). n/a, 2023']
    ])}
    ${docCaption('Table 4. Regional layers on the Interactive Map, by group. Source entries give the APA in-text citation of the producer, then spatial resolution and data vintage. Full entries are under References.')}
    <p>Full source entries are listed under ${docJump('Sources', 'sources')}.</p>`,
    'phase0-regional') +

  docSection('Country-specific layers', `
    ${docTable(['Data', 'Short description', 'Source'], [
      ['Peat thickness, Indonesia', 'Peat depth interpolated from transect surveys, indicating carbon stock and the water storage potential of the peatland.', 'Kementerian Pertanian (2019). n/a, 2019'],
      ['Peatland drainage density, Indonesia', 'Density of drainage canals on Indonesian peat.', 'BRGM (2022). 1,000 m, 2022'],
      ['Social forestry permit, Indonesia', 'Indicative area of state forest designated for social forestry, the basis for HTR, HPHD and HKm licences and for partnerships with Forest Management Units.', 'KLHK (2023a). n/a, 2023'],
      ['Forest cover, Indonesia (2003, 2012, 2022)', 'National forest cover under the Indonesia FREL definition: more than 6.25 ha, trees taller than 5 m at maturity and canopy cover above 30 percent.', 'KLHK (2022). 30 m, 2003 to 2022'],
      ['Forest cover, Thailand, Cambodia, Lao PDR, Viet Nam and Myanmar (2003, 2013, 2023)', 'Forest cover for the five Mekong countries, each classified under its own national forest reference level definition.', 'SERVIR-Mekong (2023). 30 m, 2003 to 2023'],
      ['Forest cover, the Philippines (2020)', 'Forest cover under the Philippines forest reference level definition, aligned with FAO, combining global and national tree cover data.', 'IGES (2020). 30 m, 2020'],
      ['Mining concession, Indonesia, Myanmar, the Philippines and Cambodia', 'Undeveloped and active mining concessions, with the commodities named for each country.', 'ESDM (2021) for Indonesia; Open Development Myanmar (2021); Government of the Philippines and USGS (2021); Open Development Cambodia (2021). n/a, 2021'],
      ['Forest concession, Indonesia, Cambodia and Malaysia', 'Known forest concessions, covering logging, industrial plantation, agroforestry, ecosystem restoration and non-timber forest products depending on the country.', 'KLHK (2020) for Indonesia; LICADHO (2020) for Cambodia; Global Forest Watch (2020), from the Sarawak Forest Department, for Malaysia. n/a, 2020'],
      ['Oil palm concession, Indonesia and Malaysia', 'Areas allocated for industrial-scale and smallholder oil palm, aggregated from government, non-governmental, private and academic sources.', 'KLHK (2023b) for Indonesia; Global Forest Watch (2023) for Malaysia. n/a, 2023']
    ])}
    ${docCaption('Table 5. Country-specific layers on the Interactive Map. The forest cover rows group 16 layers, one per country and year, and each concession row groups one layer per country, so the table covers 31 layers.')}`,
    'phase0-country');
}

/* -------------------------------------------------------------------- Phase 1 */
function docsPhase1() {
  return docHero(G_PHASES + ' &middot; Phase 1', 'Select location',
    'The user supplies a project boundary. The tool derives everything that it produces from that input and from layers that the server already holds. The tool does not require other user input, and it does not request other user input.') +

  docSection('Usage', `
    <p>Three methods define the area of interest. All three end at the same confirm card.</p>
    ${docTable(['Method', 'Explanation'], [
      ['<strong>Search a province or district</strong>', 'Draws the administrative boundary on the map as a tracing guide. It does not become the project polygon.'],
      ['<strong>Draw polygon</strong>', 'Click points on the map to form a custom boundary.'],
      ['<strong>Upload spatial file</strong>', 'Drop a zipped shapefile, KML or KMZ on the upload panel. This is the only reproducible method, so use it for any analysis that will need to be defended or repeated.']
    ])}
    ${docCaption('Table 6. Methods for defining the area of interest.')}
    <ol>
      <li>Define the area with one of the three methods above.</li>
      <li>Read the area estimate on the confirm card. This is the point at which the session area limit is applied.</li>
      <li>Set the project duration. It is not used until Phase 5, but it is recorded with every saved result.</li>
      <li>Confirm to continue to site characterisation. No analysis compute is spent before this point.</li>
    </ol>`,
    'phase1-usage') +

  docSection('Method', `
    <p>The reported area is not computed from the polygon geometry. The polygon is rasterised against the reference pathway grid, and the area is the sum of the ground areas of the pixels whose centres fall inside it. Each pixel&rsquo;s ground area is computed geodesically on the WGS84 ellipsoid, row by row, because pixel ground area changes with latitude.</p>
    ${docFormula('Project area',
      ['Project Area (ha) = ( Sum over rows [ Pixels Inside (row) &times; Pixel Ground Area (row) ] ) / 10,000'],
      [['Pixels Inside (row)', 'The number of pixels in that raster row whose centre falls inside the polygon. Pixels that are only touched by the boundary are not counted.'],
       ['Pixel Ground Area (row)', 'The geodesic area, in square metres, of one pixel quadrilateral at that row&rsquo;s latitude, on the WGS84 ellipsoid.'],
       ['10,000', 'Square metres per hectare.']])}`,
    'phase1-method') +

  docSection('Usage notes', `
    <ul>
      <li>Using the same grid and the same area rule for the project area, the ecosystem areas, the disturbed area and the benefit areas means those figures reconcile with each other. An area computed from the polygon geometry would not tie to the pixel counts reported downstream.</li>
      <li>A stable identifier is derived from the geometry, and every phase writes its result under that identifier, so a boundary can be re-analysed without repeating earlier phases.</li>
      <li>The analysis state survives navigating back and forward through the phases. It does not survive a page reload.</li>
    </ul>
    ${docCaution('There is no minimum area check. A boundary smaller than one cell of the coarsest layer will fall inside a single cell of that layer, and the tool will report that layer&rsquo;s value for the whole site. The layers where this happens first are cyclone and drought risk, at roughly 11 km and 28 km, then conservation significance at 10 km, and the WorldClim climate normals at 927 m.')}
    ${docNote('The methodology documentation states that the boundary is reprojected to ESRI:54034 and every hectare figure computed in that projection. The Phase 1 notebook instead rasterises onto the pathway grid and integrates geodesic pixel areas. Both are equal-area measurements and agree closely, but they are not the same operation, so a small difference between the confirm-card area and a downstream ecosystem total is expected rather than a fault. A large difference is not expected.')}`,
    'phase1-notes');
}

/* ------------------------------------------------ 2.3 Land cover classes */
function docsLandcover() {
  return docHero(G_SUMMARY, 'Land cover classes',
    'Land cover is the base layer of the tool. The 2024 map classifies the land surface of Southeast Asia into twenty classes. Nineteen classes are the land cover types that this page defines. The other class is “other land”, for surfaces that fit none of the nineteen types. The tool builds every conclusion about ecological state, trajectory and pathway on this classification.',
    []) +

  docSection('How the map is produced', `
    <p>The map is produced with the <strong>SERVIR Regional Land Cover Monitoring System (RLCMS)</strong> running on <strong>AlphaEarth Foundations</strong> satellite embeddings in Google Earth Engine. The class definitions below are those used by the RLCMS.</p>
    ${docFlow([
      ['INPUT',  'AlphaEarth 2024', '64-band annual embedding'],
      ['STEP 1', 'Primitives',      'One probability surface per class'],
      ['STEP 2', 'Assemblage',      'Hierarchical decision tree, TCC, TCH, MMU'],
      ['OUTPUT', 'Land Cover 2024', '20 classes at 30 m']
    ])}
    <p>The layer and its source are listed with the other general context layers in ${docJump('Phase 2 · Site characterisation', 'phase2#phase2-general')}.</p>`,
    'landcover-production') +

  docSection('The nineteen class definitions', `
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
    ${docCaption('Definitions from the Regional Land Cover Monitoring System, Documentation UKPACT &ndash; ADPC.')}
    ${docCallout('These numbers are not raster codes', 'The numbers in the first column are <strong>row numbers from the source documentation</strong>, not raster pixel codes. The raster codes are different, and they appear in the ecological state table &mdash; see <em>Ecological state &amp; trajectory</em>.', 'warn')}`,
    'class-definitions') +

  docSection('Land cover and ecosystem are different questions', `
    ${docCallout('The two layers can overlap', 'The land cover categories are <strong>not spatially exclusive</strong> with the ecosystem layer: it is possible for them to co-occur in the same area. Flooded forest can overlap peatland (peat swamp forest), and non-forest peatland exists under shrub, grass or cropland. Reading one as the other is the most common misreading of the site characterisation output.', 'warn')}
    <p>Land cover answers <em>what is standing here today</em>. The ecosystem layer answers <em>what kind of place this is</em> &mdash; and the reference ecosystem answers <em>what should grow here</em>. All three are needed, and the pathway logic uses each for a different purpose.</p>`,
    'landcover-vs-ecosystem');
}

/* -------------------------------------------------------------------- Phase 2 */
function docsPhase2() {
  const L = ['Data', 'Short description', 'Source'];
  /* A group label row inside a layer table (People tab). */
  const grp = name => [`<em>${name}</em>`, '', ''];
  /* Table 14: one mask per indicator, one digit per country in column order. */
  const COUNTRIES = ['BRN', 'KHM', 'IDN', 'LAO', 'MYS', 'MMR', 'PHL', 'SGP', 'THA', 'TLS', 'VNM'];
  const avail = (name, mask) => [`<strong>${name}</strong>`].concat(mask.split('').map(c =>
    c === '1' ? '&#10003;<span class="sr-only"> available</span>' : '<span class="sr-only">not available</span>'));
  return docHero(G_PHASES + ' &middot; Phase 2', 'Site characterisation',
    'Site characterisation answers the question &ldquo;what is here?&rdquo;. It reads data and makes no recommendation. The tool clips every layer that it holds to the boundary and summarises each layer. The tool groups the results as the interface groups them: general context, nature, climate and people.') +

  docSection('What carries forward', `
    <p>Three layers carry the whole downstream chain. Land cover 2024 becomes the current ecological state in Phase 4a. Forest cover 2014 becomes the past state. The annual deforestation rate, shown in the ${docJump('threat profile', 'phase3')}, becomes the baseline for every avoided-loss projection in Phase 5.</p>
    ${docCaution('The reference ecosystem on the General tab reports the ecosystem that belongs on the site, not the vegetation standing on it today. Reading it as current cover is the single most common misreading of this phase.')}`,
    'phase2-forward') +

  /* ---- General context ---- */
  docSection('General context', `
    <p>The General tab has five sections: reference ecosystem, administration and zoning status, terrain, land cover, and soil classification. Forest cover 2014 and 2024 and the forest cover trajectory are not shown on this tab; they are read in ${docJump('Phase 4a', 'phase4a')} and listed there. Historical deforestation, deforestation risk and natural disaster risk are part of the ${docJump('Phase 3 threat profile', 'phase3')}.</p>
    ${docTable(L, [
      ['<strong>Reference ecosystem</strong>', 'The natural reference ecosystem of each 30 m pixel, not its current cover: dryland forest, mangrove, peatland or savanna, assigned in a fixed priority order so that each pixel has one value. Dryland forest and savanna are shown together as Dryland. A second band, ddf_flag, marks possible seasonal deciduous forest for a field check.', 'WRI Indonesia (2026d): mangrove from Global Mangrove Watch 1996 (Bunting et al., 2022) and the national Indonesian mangrove map; peat from the national Indonesia (Kementerian Pertanian, 2018) and Malaysia peat maps, PEATGRIDS elsewhere (Widyastuti et al., 2024); savanna rule from WorldClim (Hijmans et al., 2005), CHIRPS (Funk et al., 2015), tree cover 2000 (Hansen et al., 2013) and ADPC (2024b) land cover. 30 m, 2026'],
      ['<strong>Administrative boundaries</strong>', 'Administrative boundaries that the project area overlaps, with the dominant district and province named.', 'GADM (2022). n/a, 2022'],
      ['<strong>Protected area, zoning status</strong>', 'Areas designated and managed, through law or other effective means, to conserve nature over the long term, with the overlap and designation of each.', 'UNEP-WCMC and IUCN (2025), WDPA. 30 m, 2025'],
      ['<strong>Elevation</strong>', 'The range of heights above sea level across the area of interest, from its lowest to highest point, and the elevation class that predominates.', 'Farr et al. (2007), SRTM. 30 m, 2000'],
      ['<strong>Slope</strong>', 'The range of terrain steepness across the area of interest, in percent rise, and the slope class that predominates.', 'Farr et al. (2007), SRTM. 30 m, 2000'],
      ['<strong>Land cover 2024</strong>', `The land surface of Southeast Asia in 2024 classified into 19 land cover and land use classes plus other land, spanning forest, cropland and plantation, grassland and shrub, settlement, water and wetland types. See ${docJump('Land cover classes', 'landcover')}.`, 'ADPC (2024b), RLCMS accessed through SIGnal: AlphaEarth Foundations embeddings (Brown et al., 2025) classified with the primitives method of Saah et al. (2020) and validated after Olofsson et al. (2014); overall accuracy 0.76 to 0.83 by country. 30 m, 2024'],
      ['<strong>Soil classification, soil groups</strong>', 'Dominant World Reference Base 2006 reference soil groups present, giving a standardised international soil nomenclature for the area.', 'Poggio et al. (2021), SoilGrids, as WRB 2006 reference soil groups (IUSS Working Group WRB, 2007). 250 m, 2020']
    ])}
    ${docCaption('Table 7. Layers read by the General tab, in the order of its sections. Source entries give the APA in-text citation of the producer, then spatial resolution and data vintage. Full entries are under References.')}

    <h3>Method: reference ecosystem</h3>
    <p>The categorical ecosystem raster is clipped to the boundary with nearest-neighbour resampling, because the values are class codes and must not be interpolated. Pixels are counted per class, the denominator is the total project area, and an Other or Unclassified share absorbs nodata so the composition sums to 100 percent. Dryland forest and savanna are shown together as Dryland. Composition uses pure presence: a class counts as present if its area is above zero. The resulting set of present classes is the reference ecosystem that drives Phase 4a and filters the activity catalogue in Phase 4b.</p>

    <h3>Method: administrative boundaries and protected areas</h3>
    <p>Administrative units are intersected at three GADM levels, country, province and district. A unit is reported only if its intersection is at least 1 percent of the project area, which removes false slivers caused by the generalised boundary lines, and retained districts define their parent provinces and country so the hierarchy stays consistent.</p>
    <p>For protected areas the headline overlap is computed on the union of sites, dissolved first and then intersected, because sites overlap one another and summing them individually can exceed the project area. No sliver threshold is applied, because even a small overlap is legally meaningful. The WDPA selection keeps status Designated, Inscribed or Established, drops pure marine sites and keeps coastal ones. The same union rule applies to Key Biodiversity Areas on the Nature tab.</p>
    <p>Where the project area overlaps no protected area, the zoning section is hidden. Where it does, the interface lists each site with its designation and overlap, and reminds the user that the overlap can affect which activities are eligible on that ground.</p>

    <h3>Method: terrain</h3>
    <p>Elevation and slope are read as pre-classified rasters, so the tool tallies class codes and performs no reclassification. The denominator is the valid, non-nodata area, so each distribution sums to 100 percent.</p>
    ${docTable(['Code', 'Elevation class', 'Range', 'Slope class', 'Range, percent rise'], [
      ['1', 'Lowland', '0 to 500 m', 'Flat', '0 to 8'],
      ['2', 'Submontane or hill', '500 to 1,000 m', 'Gently sloping', '8 to 15'],
      ['3', 'Montane', '1,000 to 2,000 m', 'Moderately steep', '15 to 25'],
      ['4', 'Upper montane', 'above 2,000 m', 'Steep', '25 to 40'],
      ['5', 'not applicable', 'not applicable', 'Very steep', 'above 40']
    ])}
    ${docCaption('Table 8. Terrain class definitions.')}`,
    'phase2-general') +

  /* ---- Nature ---- */
  docSection('Nature', `
    <p>The Nature tab has six sections: habitat area, indicative key species presence, conservation significance, forest landscape integrity, Key Biodiversity Areas and plant species occurrence.</p>
    ${docTable(L, [
      ['<strong>Habitat area, refined Area of Habitat for mammals, birds, reptiles and amphibians</strong>', 'The habitat available to a species within its range, refined from coarse range maps into spatially explicit estimates of available suitable habitat following globally standardised methods.', 'NTU (2024), refined from IUCN (2022) range maps following Brooks et al. (2019). 30 m, 2024'],
      ['<strong>Area of Habitat threshold, share of habitat inside the project area</strong>', 'Species counted in bands by how much of their habitat overlaps the project area, with the threatened categories of the species above the 90 percent band and the share of their Southeast Asia habitat that the site represents.', 'NTU (2024), refined from IUCN (2022) range maps following Brooks et al. (2019). 30 m, 2024'],
      ['<strong>Indicative key species presence</strong>', 'Presence of keystone and flagship species, which have a disproportionately large effect on ecosystem structure and function relative to their abundance, estimated from occurrence records collected between 2000 and 2025.', 'GBIF.org (2025). n/a, 2025'],
      ['<strong>Conservation significance</strong>', 'Areas of global conservation importance where biodiversity, carbon storage and water quality regulation can be jointly supported, identified through multicriteria spatial optimisation.', 'Jung et al. (2021). 10 km, 2021'],
      ['<strong>Forest Landscape Integrity Index</strong>', 'Landscape-scale integrity of natural forest, scored from 0, heavily modified, to 10, fully intact, from observed and inferred human pressure and lost forest connectivity, and grouped into High, Medium and Low. Calibrated on Southeast Asia, so it is not the published global index. Non-forest has no score.', 'WRI Indonesia (2026e), rebuilt for Southeast Asia after Grantham et al. (2020) from ADPC (2024b) land cover and forest loss 2014 to 2024 and OpenStreetMap contributors (n.d.) roads. 300 m, 2024'],
      ['<strong>Key Biodiversity Area</strong>', 'Overlap with sites that contribute significantly to the global persistence of biodiversity. A Key Biodiversity Area may or may not be legally protected, which makes it a different lens from the protected area layer.', 'BirdLife International (2023), World Database of Key Biodiversity Areas. n/a, 2022'],
      ['<strong>Plant species occurrence</strong>', 'Plant species recorded in the project area between 2000 and 2026, with the number listed under CITES Appendix I, II and III and the share of global plant species diversity those records represent.', 'GBIF.org (2026). n/a, 2026']
    ])}
    ${docCaption('Table 9. Layers read by the Nature tab, in the order the tab shows them. Endangered tree species richness remains a map layer (Table 4), and ecological connectivity is reported as a benefit in Phase 5.')}
    <p>See ${docJump('Phase 0 &middot; Interactive Map', 'phase0')} for Table 4 and ${docJump('Phase 5 &middot; Potential benefit', 'phase5#phase5-nature')} for ecological connectivity.</p>

    <h3>Method: area of habitat</h3>
    <p>The species habitat rasters for mammals, birds, reptiles and amphibians are clipped to the boundary and counted per taxon and per IUCN category. These same rasters are the direct input to three benefit components in Phase 5, where they are intersected with projected deforestation or with the restoration area.</p>
    ${docCaution('Area of Habitat is modelled suitable habitat, not confirmed occurrence. It states where a species could live given cover, elevation and range, not where it has been recorded, and it is not equivalent to Extent of Occurrence or Area of Occupancy (Brooks et al., 2019), so it cannot be compared with the IUCN Red List thresholds that use those quantities.')}

    <h3>Method: forest landscape integrity</h3>
    <p>Integrity is a property of forest, so the summary is taken over the project area&rsquo;s forest only, using the same forest mask as the deforestation components. The headline is the mean score out of 10 over those pixels. The distribution uses the class breaks of the source paper, High at or above 9.6, Low at or below 6.0 and Medium in between, and the shares sum to 100 percent of forest rather than of the project area.</p>
    <p>The score is built at 300 m, the scale of the original index (WRI Indonesia, 2026e). It starts at 10 and is lowered by three things:</p>
    <ul>
      <li><strong>Observed pressure:</strong> the share of nearby land under agriculture, infrastructure and 2014 to 2024 deforestation, each passed through a saturating curve.</li>
      <li><strong>Inferred pressure:</strong> spread from that into surrounding forest, strongly within about 5 km and more weakly up to 12 km.</li>
      <li><strong>Lost forest connectivity:</strong> the 2024 forest compared with the potential forest within a 5 km window.</li>
    </ul>
    <p>Agriculture includes rubber, oil palm and other plantations, and infrastructure is buildings plus OpenStreetMap roads. The curve parameters were set once on the pooled data of all 11 regions and are frozen, so a later change in score reflects the landscape rather than the scale. High is rare outside Borneo and Papua, at 0 to 3 percent of forest. The tool reads the 300 m score and class maps. Because the score map stores non-forest as 0, the score is masked with the class map before the mean is taken, never by value, since degraded forest can genuinely score 0.</p>
    ${docNote('The 0 to 10 values are calibrated on the pooled Southeast Asia distribution. They are internally consistent within one run but are not one to one with the published global index, so they should be presented as the regional forest integrity layer rather than as an absolute global integrity score.')}`,
    'phase2-nature') +

  /* ---- Climate ---- */
  docSection('Climate', `
    <p>The Climate tab has three sections: carbon information, with current carbon storage split into above-ground biomass, below-ground biomass and soil organic carbon; the annual climate ledger of temperature and precipitation; and peat depth. Peat depth has its own method below, under ${docJump('Peat depth', 'phase2#phase2-peat')}.</p>
    ${docTable(L, [
      ['<strong>Current Carbon Storage</strong>', 'Above-ground biomass, below-ground biomass and soil organic carbon only. Deadwood and litter are excluded, so the result is not a full ecosystem carbon stock.', 'WRI Indonesia (2025), from the AGB (WRI Indonesia, 2026a), BGB (IPCC, 2006) and SOC layers below. 250 m, 2024'],
      ['<strong>Above Ground Biomass Density</strong>', 'Above-ground dry biomass density for 2024, in Mg/ha. A Random Forest model per region (11 regions) predicts it from AlphaEarth satellite embeddings, trained on quality-screened GEDI lidar footprints. A companion layer gives the per-pixel standard deviation, from which the tool reports total above-ground biomass with a 90 percent confidence interval. Permanent water is NoData.', 'WRI Indonesia (2026a): Random Forest on GEDI L4A v2.1 (Dubayah et al., 2022) and AlphaEarth Foundations 2024 embeddings (Brown et al., 2025); water mask from Pekel et al. (2016). 30 m, 2024'],
      ['<strong>Below Ground Biomass</strong>', 'Root biomass. Not mapped: derived from above-ground biomass using a fixed regional root-to-shoot ratio, so it carries that layer&rsquo;s error plus the error of the ratio itself.', 'IPCC (2006) root-to-shoot ratio of 0.28 applied to the AGBD layer (WRI Indonesia, 2026a). 30 m, 2024'],
      ['<strong>Soil Organic Carbon, peatland, mangrove and dryland</strong>', 'Soil organic carbon stock per hectare, predicted from point observations at six standard depths, with the reported figure representing a fixed 0 to 30 cm window.', 'Hengl and Wheeler (2018), OpenLandMap; Poggio et al. (2021), SoilGrids; Maxwell et al. (2023) for mangrove. 250 m, 2018; 30 m, 2020 for mangrove'],
      ['<strong>Annual Temperature</strong>', 'Average annual temperature of the area of interest, with a twelve-month profile. A long-term climate normal interpolated from weather stations, not current or observed conditions.', 'Hijmans et al. (2005), WorldClim. 927 m, 1950 to 2000'],
      ['<strong>Annual Precipitation</strong>', 'Average annual precipitation total, with a twelve-month profile. The monthly series is retained so that dry-season length can be derived from it.', 'Hijmans et al. (2005), WorldClim. 927 m, 1950 to 2000'],
      ['<strong>Peat Depth</strong>', 'Area and share of each peat depth class inside the project area: shallow (1 m or less), medium (more than 1 m to 3 m) and deep (more than 3 m), with deep peat highlighted as a conservation priority.', 'Widyastuti et al. (2024), PEATGRIDS, masked to peat extent from Kementerian Pertanian (2018), Miettinen et al. (2016) and Greifswald Mire Centre (2022). About 1 km, 2024']
    ])}
    ${docCaption('Table 10. Layers read by the Climate tab. Biomass carbon and soil carbon are computed separately. The summary card adds them into one stored-carbon total, which therefore inherits the 0 to 30 cm soil limit and leaves out deadwood and litter.')}

    <h3>Method: total current carbon stock</h3>
    <p>Above-ground biomass density is a predefined 30 m layer for 2024 (WRI Indonesia, 2026a). It is built in four steps:</p>
    <ol>
      <li>GEDI L4A version 2.1 footprints are screened for quality and averaged onto a 30 m grid. The screen keeps quality flag 1, not degraded, relative error at most 0.5, beam sensitivity at least 0.95, power beams only, night-time acquisitions and slope below 30 degrees.</li>
      <li>In each of 11 regions, up to 25,000 cells are sampled with their 64 AlphaEarth embedding values. Cells above a region-specific AGBD cap are removed, and the rest are split at random into 70 percent for training and 30 percent for testing.</li>
      <li>One Random Forest regression per region, with settings tuned by spatial cross-validation, predicts AGBD from the embeddings. Cells with JRC surface-water occurrence of 50 percent or more (Pekel et al., 2016) are NoData.</li>
      <li>The uncertainty layer is the per-pixel standard deviation of 20 Random Forest members, each trained on a 63.2 percent subsample of the training cells with every GEDI value perturbed by its own standard error.</li>
    </ol>
    <p>The tool sums both layers over the project area and reports total above-ground biomass with a 90 percent confidence interval. The layers support indicative estimates for project planning, not credit issuance.</p>
    <p>Both biomass layers hold dry biomass density in megagrams per hectare, not carbon. The conversion from biomass to carbon happens once, and the tool keeps it visible. Below-ground biomass is derived rather than read, because no mapped layer exists yet.</p>
    ${docFormula('Biomass carbon',
      ['AGB (Mg) = AGB Density (Mg/ha) &times; Area (ha)',
       'BGB (Mg) = AGB (Mg) &times; Root-to-Shoot Ratio',
       'Total Biomass (Mg) = AGB (Mg) + BGB (Mg)',
       'Biomass Carbon (tC) = Total Biomass (Mg) &times; Carbon Fraction'],
      [], 'IPCC 2006 Guidelines, Volume 4, for the carbon fraction and the root-to-shoot ratio.')}
    ${docFormula('Soil carbon, and conversion to carbon dioxide equivalent',
      ['Soil Carbon (tC) = SOC Density (tC/ha) &times; Area (ha)',
       'CO&#8322;e (t) = Carbon (tC) &times; 44 / 12'],
      [['Root-to-Shoot Ratio', '0.28, applied on the stock and avoided-emissions side. The restoration method uses per-ecosystem ratios instead.'],
       ['Carbon Fraction', '0.47, the IPCC 2006 default fraction of carbon in dry matter. Mangrove uses 0.451 in the restoration method.'],
       ['44 / 12', 'The molecular weight ratio of carbon dioxide to carbon, equal to 3.67. It is applied in Phase 5 only, and never to the soil layer, which already holds carbon.']],
      'IPCC 2006 Guidelines, Volume 4.')}
    ${docCaution('Site characterisation reports carbon stock in tonnes of carbon. Phase 5 reports emissions and removals in tonnes of carbon dioxide equivalent. The two differ by a factor of 3.67, so check which unit a figure carries before quoting it.')}

    <h3>Two things the pool split cannot tell you</h3>
    <ul>
      <li>A fixed root-to-shoot ratio makes the above-ground and below-ground shares constant by construction. A ratio of 0.28 always yields the same 78 to 22 split, on every site, so those percentages carry no site-specific information and must not be presented as a finding.</li>
      <li>The soil figure represents a fixed 0 to 30 cm depth, which is the IPCC default for mineral soil and captures most of the profile there. It does not on peat. Tropical peat can run several metres deep, so a peatland project area reports far below its real soil carbon stock. Deadwood and litter are absent from both figures, so the stored-carbon total on the summary card and in ${docJump('Table 36', 'worked-example')} is not a full ecosystem carbon stock.</li>
    </ul>

    <h3>Method: temperature and precipitation</h3>
    <p>Two different statistics appear in one card, and the order of operations matters. The chart shows twelve monthly values, each the spatial mean over the project area for that month. The sentence describes the annual figure across space, as its minimum, maximum and mean over the project area&rsquo;s pixels.</p>
    ${docFormula('Annual figures',
      ['Annual Temperature (per pixel) = mean of the twelve monthly temperature values',
       'Annual Precipitation (per pixel) = sum of the twelve monthly precipitation values',
       'then the spatial minimum, maximum and mean are taken across pixels'],
      [], 'the tool&rsquo;s own summary of the WorldClim monthly climate normals.')}
    <p>For precipitation the per-pixel sum must come first. Summing the twelve spatial minima would produce a value that no pixel actually has. Resampling is nearest neighbour rather than bilinear, because these components report a minimum and a maximum and those values must exist in the source data, and a pixel counts only when all twelve months are valid.</p>`,
    'phase2-climate') +

  /* ---- Climate: peat depth ---- */
  docSection('Peat depth', `
    <p>Peat depth decides how peatland can be managed. Peatland management follows landscape and hydrological zones (Notohadiprawiro, 2001):</p>
    <ul>
      <li><strong>Coastal zone.</strong> Shaped by tides, it generally holds peat 0 to 1 m thick and may suit fisheries and cultivation.</li>
      <li><strong>Adaptive management zone.</strong> A buffer around the conservation zone, holding peat of about 1 to 3 m. It allows only limited cultivation that needs no intensive drainage, so forest species suit it better than crops that depend on drainage.</li>
      <li><strong>Conservation zone.</strong> It holds the deepest peat, more than 3 m, and may include peat domes. Non-forested land inside it should be restored or conserved to keep the natural peatland ecosystem and its hydrological function.</li>
    </ul>

    <h3>Method: peat depth</h3>
    <p>The layer is built in two steps. First, peat extent is assembled from two kinds of source: the national peatland maps of Indonesia and Malaysia, and the Global Peatland Map 2.0 for the Greater Mekong countries, Brunei and Timor-Leste. From the global map only the peat-dominated class is kept, and the peat-in-soil-mosaic class is excluded. Second, the PEATGRIDS peat-thickness grid is masked to that extent, so a depth value exists only where a peat map records peat.</p>
    ${docTable(['Dataset', 'Description and use', 'Source'], [
      ['<strong>Indonesia peatland</strong>', 'National peat extent, used to delineate peat areas in Indonesia.', 'Kementerian Pertanian (2018). 1:250,000, 2018'],
      ['<strong>Malaysia peatland</strong>', 'National peat extent, used to delineate peat areas in Malaysia.', 'Miettinen et al. (2016). Map year 2015'],
      ['<strong>Global Peatland Map 2.0</strong>', 'Global peat extent, peat-dominated class only, used to delineate peat areas in the Greater Mekong countries, Brunei and Timor-Leste.', 'Greifswald Mire Centre (2022), Global Peatland Map 2.0. 2022'],
      ['<strong>PEATGRIDS</strong>', 'Peat thickness, used to estimate peat depth within the delineated peat areas.', 'Widyastuti et al. (2024), PEATGRIDS. About 1 km, 2024']
    ])}
    ${docCaption('Table 11. Datasets used to build the peat depth layer.')}
    <p>Depth is read from PEATGRIDS at a resolution of about 1 km. Rather than averaging the project area into a single value, the tool keeps the spatial variation and reports the extent of each of three depth classes:</p>
    <ul>
      <li><strong>Shallow:</strong> peat 1 m deep or less.</li>
      <li><strong>Medium:</strong> peat more than 1 m and up to 3 m deep.</li>
      <li><strong>Deep:</strong> peat more than 3 m deep.</li>
    </ul>
    <p>The layer feeds the Peat Depth component of the Climate tab, component 3.5, in four steps:</p>
    ${docTable(['Step', 'What the tool does'], [
      ['<strong>Project value</strong>', 'Identifies peat areas within the project boundary and calculates the area of each peat depth class.'],
      ['<strong>Peat depth classification</strong>', 'Classifies peat into three depth classes: shallow (1 m or less), medium (more than 1 m to 3 m) and deep (more than 3 m).'],
      ['<strong>Assessment</strong>', 'Evaluates the distribution of depth classes within the project area to identify areas that need different management approaches.'],
      ['<strong>Output</strong>', 'Reports the area and proportion of each depth class within the project area and highlights deep peat, more than 3 m, as a priority for conservation.']
    ])}
    ${docCaption('Table 12. How the Peat Depth component is computed and reported.')}
    <p>Deep peat is treated as a priority for conservation. Cultivation inside it should be restricted to keep the hydrological and ecological functions of the peatland, so the card highlights deep peat wherever it occurs.</p>
    ${docCaution(`PEATGRIDS is a global grid of about 1 km, roughly 100 ha per cell, while the rest of the analysis runs at 30 m. In a small project area, or along a narrow peat margin, the depth classes rest on a handful of cells, so read them as the zone the site sits in rather than as a measured thickness. For Indonesia, the Interactive Map also carries the Ministry of Agriculture peat thickness layer built from transect surveys (${docJump('Table 5', 'phase0')}); it is a separate layer and can disagree with these classes. The card reports depth classes only and does not convert peat depth into a peat carbon stock, which is why the soil carbon figure above still covers only 0 to 30 cm.`)}`,
    'phase2-peat') +

  /* ---- People ---- */
  docSection('People', `
    <p>Unlike the nature and climate layers, which are spatially explicit, most socio-economic data is jurisdiction-based: reported for an administrative unit rather than for the project area. The two gridded population layers and the vulnerability composite are the exception.</p>
    ${docTable(L, [
      grp('Social (demography)'),
      ['<strong>Estimated population</strong>', 'How many people live inside the project area and how densely they are packed, from population estimates distributed onto a 100 m grid and placed only on land that shows signs of settlement.', 'Bondarenko et al. (2025), WorldPop constrained population counts R2025A v1. 100 m, 2025'],
      ['<strong>Estimated age group</strong>', 'The age and sex make-up of the people living inside the project area, from the same 100 m grid, in bands from under 1 year to 90 and over.', 'Bondarenko et al. (2025), WorldPop constrained age and sex structures R2025A v1. 100 m, 2025'],
      ['<strong>Number of households</strong>', 'Number of private households in the selected administrative unit, the denominator behind every household-based indicator on the tab.', 'National statistical offices'],
      grp('Vulnerability assessment'),
      ['<strong>Physical, environmental, economic and social vulnerability</strong>', 'Four independent composite indices summarising how susceptible the area is to climate hazards, one per dimension.', 'ADPC (2024a), harmonised vulnerability indices'],
      grp('Employment'),
      ['<strong>Unemployment rate</strong>', 'Share of the labour force that is unemployed, which signals both a livelihoods vulnerability that climate change can deepen and a labour pool that project activities could draw on.', 'National statistical offices'],
      ['<strong>Employment rate</strong>', 'Share of the working-age population in employment, indicating how much of that population is economically engaged.', 'National statistical offices'],
      ['<strong>Underemployment rate</strong>', 'Share of employed people working fewer hours than they are willing and able to work, which points to spare labour capacity and to already insecure household income.', 'National statistical offices'],
      ['<strong>Top 3 industries or occupations</strong>', 'The three industry or occupation groups employing the most people, indicating the skills present locally and how directly livelihoods depend on land and natural resources.', 'National statistical offices'],
      ['<strong>Employment by sector</strong>', 'Distribution of employment across economic sectors, identifying which livelihoods are climate-exposed and which a project could support or diversify.', 'National statistical offices'],
      grp('Education'),
      ['<strong>Population educated (school)</strong>', 'Distribution of the population by highest level of schooling completed, which indicates the appropriate register for training materials, contracts and consultation.', 'National statistical offices'],
      ['<strong>Literacy rate</strong>', 'Share of the population able to read and write, describing how ready a community is to take part in the training, record-keeping and monitoring that nature-based solutions require.', 'National statistical offices'],
      ['<strong>Number of students enrolled</strong>', 'Students enrolled in education, indicating the size of the school-age cohort and the reach of the education system around the site.', 'National statistical offices'],
      grp('Economy'),
      ['<strong>Average household income</strong>', 'Average household income per month in local currency, which sketches local earning conditions and the scale against which benefit sharing would be judged.', 'National statistical offices'],
      ['<strong>Contributing industries</strong>', 'The industries contributing most to the local economy, by value or share, which shows what the local economy rests on.', 'National statistical offices'],
      ['<strong>Income distribution or inequality</strong>', 'Income inequality on the measure the national office publishes, which signals how unevenly project benefits could land.', 'National statistical offices'],
      grp('Health'),
      ['<strong>Number of health facilities</strong>', 'Health facilities in the reporting area, indicating access to care.', 'National statistical offices'],
      ['<strong>Stunting prevalence (under 5)</strong>', 'Share of children under five recorded as stunted, a marker of chronic undernutrition and food insecurity.', 'National statistical offices'],
      ['<strong>Disability prevalence</strong>', 'Rate or count of people reporting a disability, relevant to inclusive participation and benefit design.', 'National statistical offices'],
      ['<strong>Top 5 common diseases</strong>', 'The most frequently reported illnesses, indicating which health co-benefits a project might plausibly deliver and which health burdens already constrain participation.', 'National statistical offices'],
      grp('Housing and human settlements'),
      ['<strong>House types distribution</strong>', 'Distribution of dwellings by house type, a proxy for housing quality and exposure to hazards.', 'National statistical offices'],
      ['<strong>Top 3 drinking water sources</strong>', 'The most common drinking-water sources, which show how far households depend on wells, springs, rivers or piped supply.', 'National statistical offices'],
      ['<strong>Clean water supply production</strong>', 'Volume of clean water produced in the reporting area over a period.', 'National statistical offices'],
      ['<strong>Households with access to water</strong>', 'Share of households with access to improved or safe drinking water, a core measure of the basic services that shape how communities cope with drought and flood.', 'National statistical offices'],
      ['<strong>Wastewater management type</strong>', 'How wastewater is managed, by type and share.', 'National statistical offices'],
      ['<strong>Toilet facility categories</strong>', 'Share of households with hygienic sanitation, or the distribution of toilet facility types, covering the sanitation conditions that shape community health and vulnerability.', 'National statistical offices'],
      ['<strong>Permanent reserved forests</strong>', 'Area of permanent reserved forest recorded in the reporting area, where national statistics report it.', 'National statistical offices']
    ])}
    ${docCaption('Table 13. Layers and indicators read by the People tab, grouped as the tab groups them. The national indicators are reported at the finest administrative level each national statistical office publishes, which ranges from village level in Indonesia to national only in Singapore. Table 14 shows which indicator is available in which country.')}

    ${docTable(['Indicator'].concat(COUNTRIES), [
      avail('Number of Households', '11111111110'),
      avail('Unemployment Rate', '11111101101'),
      avail('Employment Rate', '10110111110'),
      avail('Underemployment Rate', '10100001001'),
      avail('Top 3 Industries or Occupations', '11101000100'),
      avail('Employment by Sector', '10111000101'),
      avail('Population Educated (School)', '10101101111'),
      avail('Literacy Rate', '10110111111'),
      avail('Number of Students Enrolled', '11001101111'),
      avail('Average Household Income', '10101011101'),
      avail('Contributing Industries', '10111000101'),
      avail('Income Distribution or Inequality', '10111011001'),
      avail('Number of Health Facilities', '10011111011'),
      avail('Stunting Prevalence (under 5)', '11111110101'),
      avail('Disability Prevalence', '00000101100'),
      avail('Top 5 Common Diseases', '00110101100'),
      avail('House Types Distribution', '11001101011'),
      avail('Top 3 Drinking Water Sources', '10101111000'),
      avail('Clean Water Supply Production', '10001101101'),
      avail('Households with Access to Water', '11111101010'),
      avail('Wastewater Management Type', '00100101100'),
      avail('Toilet Facility Categories', '11111111001'),
      avail('Permanent Reserved Forests', '10011001000')
    ])}
    ${docCaption('Table 14. National indicators available in each country, as specified in the GUI Design Document v3.1. BRN Brunei Darussalam, KHM Cambodia, IDN Indonesia, LAO Lao PDR, MYS Malaysia, MMR Myanmar, PHL the Philippines, SGP Singapore, THA Thailand, TLS Timor-Leste, VNM Viet Nam.')}

    <h3>Method</h3>
    <p>Population is a count rather than a density, so alignment to the analysis grid uses sum resampling and counts are added directly instead of being multiplied by cell area. Vulnerability classes are categorical, so they use nearest-neighbour resampling, and each dimension is reported as an area-weighted mean class rounded to one displayed level. No composite vulnerability score is produced across the four dimensions, because they measure different things. Household estimation from the population grid is excluded: household counts come from the national statistics instead.</p>
    ${docCaution('Population and age structure are a clipped 100 m grid and describe the project area. Every other indicator on this tab is reported for an administrative unit, in most countries a province or a region and in several countries at national level only. Do not present a province-wide unemployment rate or disease ranking as a site figure. The tool labels the level each value is reported at, and that label should be quoted with the number.')}
    ${docNote('All four People layer groups describe the population of the cells the project area covers, not the community that holds rights over it. Tenure, customary claims and community composition are not spatial layers in this tool and have to come from the socio-economic form. National series are produced under each country&rsquo;s own definitions, survey instruments and reference periods, so a value is comparable across years within one national series and not across countries.')}`,
    'phase2-people');
}

/* -------------------------------------------------------------------- Phase 3 */
function docsPhase3() {
  return docHero(G_PHASES + ' &middot; Phase 3', 'Threat profile',
    'The threat profile answers a different question from site characterisation. Site characterisation tells you what is here. The threat profile tells you what is happening to it. The threat profile does not choose the pathway. It decides which activities within a pathway are worth activating. It also controls two of the Phase 5 benefit components.') +

  docSection('Why it matters', `
    <p>A credible intervention addresses a pressure rather than a symptom. Knowing whether the site is losing forest, burning repeatedly, being drained, or sitting in a hazard zone changes which activity is worth proposing and which is likely to fail.</p>`,
    'phase3-why') +

  docSection('How the profile is arranged', `
    <p>The profile is arranged in three groups, as the interface shows it:</p>
    <ul>
      <li>${docJump('Observed ecosystem disturbance', 'phase3#phase3-disturbance')}: what has already happened on the site. Its layers are in Table 15.</li>
      <li>${docJump('Ecosystem pressure and hazard', 'phase3#phase3-pressure')}: what acts on it now. Its layers are in Table 16.</li>
      <li>${docJump('Business-as-usual projection', 'phase3#phase3-bau')}: what is likely to happen without a project. Its layers are in Table 18.</li>
    </ul>`,
    'phase3-layers') +

  /* ---- Group 1. Observed ecosystem disturbance ---- */
  docSection('Observed ecosystem disturbance', `
    ${docTable(['Data', 'Short description', 'Source'], [
      ['<strong>Historical deforestation, 2014 to 2024</strong>', 'Natural forest standing in 2014 that had been lost by 2024, derived by comparing the two forest cover layers. It records the location and extent of loss but does not attribute its cause.', 'ADPC (2024b), forest loss: forest in 2014 and not forest in 2024. 30 m, 2014 to 2024'],
      ['<strong>Historical burned area</strong>', 'Historical burned area within the project boundary. Burn scars are detected from satellite, so cropland burning is under-detected and small or short fires can be missed entirely.', 'Long et al. (2021), GABAM. 30 m, 2024']
    ])}
    ${docCaption('Table 15. Layers read for observed ecosystem disturbance.')}
    <p>Structural disturbance inside forest that is still standing is reported with the ecosystem summary in ${docJump('Phase 4a', 'phase4a#phase4a-disturbance')}.</p>`,
    'phase3-disturbance') +

  docSection('Method: historical deforestation and the annual rate', `
    <p>Forest at both dates is meant to use the same natural forest definition, so that the two are comparable. One gap remains: ADPC (2024b) excludes mangrove from its 2014 forest mask, while the 2024 definition counts mangrove, code 6, as forest. Unless the 2014 mangrove extent is added back, standing mangrove can read as forest gain and mangrove loss is not captured. Forest gain on land that was not forest in 2014 is excluded, which keeps the rate consistent with the reported loss. The annual rate follows Puyravaud (2003) rather than a simple percentage, and it is the input to every avoided-loss projection in ${docJump('Phase 5', 'phase5')}.</p>
    ${docFormula('Forest loss and remaining forest',
      ['Forest Loss (ha) = Area ( Forest 2014 and not Forest 2024 )',
       'Forest Remaining (A2) = Forest Area 2014 (A1) &minus; Forest Loss'])}
    ${docFormula('Annual deforestation rate, Puyravaud (2003)',
      ['Annual Deforestation Rate (% per year) = ( 1 / t ) &times; ln ( A2 / A1 ) &times; 100'],
      [['A1', 'Forest area in 2014, in hectares.'],
       ['A2', 'Forest area remaining in 2024, in hectares, taken as A1 minus gross loss of 2014 forest.'],
       ['t', 'Length of the window in years, fixed at 10.'],
       ['ln', 'Natural logarithm. The result is negative for loss; the tool reports its absolute value.']],
      'Puyravaud (2003).')}
    <p>Three guards run before the logarithm. If there was no forest in 2014, the component returns not applicable. If there was no loss, the rate is zero. If all forest was lost, the case is reported as total loss rather than evaluating the logarithm of zero.</p>
    <p>The resulting rate is then compared with the national rate of the dominant country, itself computed with the same formula so the comparison is valid. It is reported as higher than the national rate if it exceeds it by more than 20 percent, lower than if it falls short by more than 20 percent, and similar to within that band.</p>`,
    'phase3-deforestation') +

  docSection('Method: burned area', `
    <p>A pixel can burn in more than one year, so the component produces two totals on purpose. The headline is the union: the area that burned at least once. It is at most the project area and reads as the true burned footprint. The bar chart is per year, where a reburning pixel is counted in each year it burns. The sum of the annual areas is kept separately and can exceed the project area: it measures burn events, not area, and must not be read as an area.</p>
    <p>The narrative reports the cumulative burned area between 2014 and 2024, the average annual burned area, and the year with the largest burned area.</p>`,
    'phase3-burned') +

  /* ---- Group 2. Ecosystem pressure and hazard ---- */
  docSection('Ecosystem pressure and hazard', `
    ${docTable(['Data', 'Short description', 'Source'], [
      ['<strong>Drainage canal pressure, canal proximity</strong>', 'Distance from peatland in the project area to the nearest mapped drainage canal, including canals outside the boundary that still influence conditions inside it.', 'Dadap et al. (2021). 5 m, 2021'],
      ['<strong>Drainage pressure, drainage density</strong>', 'Length of mapped drainage canal per square kilometre on peat, the primary driver of peatland degradation.', 'Dadap et al. (2021). 1,000 m, 2021'],
      ['<strong>Natural disaster risk, flood, typhoon, landslide and drought</strong>', 'Natural-hazard susceptibility of the area of interest. These are risk layers rather than bare hazard layers: exposure and vulnerability are already folded in.', 'ADPC (2024a). 30 to 250 m, 2024']
    ])}
    ${docCaption('Table 16. Layers read for ecosystem pressure and hazard.')}`,
    'phase3-pressure') +

  docSection('Method: peatland drainage pressure', `
    <p>Both drainage results apply only where the project area holds peatland, and the section is hidden where peat does not overlap mapped drainage. Canal proximity reports the distance to the nearest canal and its class. Drainage pressure reports the drainage density class.</p>
    <p>Drainage pressure deliberately includes canals outside the project boundary, because two published findings set the relevant distances: canals can influence water-table depth up to 500 m into the surrounding area (Astiani et al., 2017), and canal networks can affect forest biomass growth up to 1 km away (Wedeux et al., 2020).</p>
    ${docTable(['Class', 'Canal proximity', 'Drainage density', 'Reading'], [
      ['<strong>Close, or High</strong>', '0 to 500 m', 'Above 5 km per km&sup2;', 'Substantial hydrological disturbance, associated with accelerated peat subsidence, higher carbon emissions and significant peat-fire risk.'],
      ['<strong>Intermediate, or Moderate</strong>', '500 to 1,000 m', '2.5 to 5 km per km&sup2;', 'Moderate drainage-related pressure, with higher subsidence and carbon-loss potential than the lowest class.'],
      ['<strong>Far, or Low</strong>', 'Above 1,000 m', 'Below 2.5 km per km&sup2;', 'Low drainage disturbance.']
    ])}
    ${docCaption('Table 17. Drainage classes as the interface reports them.')}
    ${docNote('The canal layer was produced by a model trained with roads included, on the assumption that roads often carry drainage ditches. Read it as a drainage-infrastructure proxy rather than a canal inventory. It indicates pressure, not measured water-table depth.')}`,
    'phase3-peat') +

  docSection('Method: natural disaster risk', `
    <p>Each risk layer is clipped, and the class distribution is tabulated against the valid hazard area. The representative level for the site is the highest class covering at least 20 percent of that area. The rule is deliberately conservative, because in risk screening a false negative costs more than a false positive: a site that is 70 percent Moderate and 25 percent Very High reports as Very High. No composite index is produced across hazards, because the hazards are not commensurable with one another.</p>
    <p>Each hazard is shown as its own labelled badge on a five-level scale, Very Low to Very High. Fire is no longer one of the hazards in this group: it is reported as ${docJump('fire risk', 'phase3#phase3-fire')} under the business-as-usual projection.</p>`,
    'phase3-hazard') +

  /* ---- Group 3. Business-as-usual projection ---- */
  docSection('Business-as-usual projection', `
    ${docTable(['Data', 'Short description', 'Source'], [
      ['<strong>Deforestation risk</strong>', 'Relative ranking of how likely each natural forest pixel is to be cleared by unplanned deforestation, compared with other forest in the same region. A ranking, not a probability or a rate. Planned clearing in concessions or conversion zones is not covered.', 'WRI Indonesia (2026b): forestatrisk logistic regression with an iCAR spatial effect (Vieilledent, 2021), one model for each of 11 regions, trained on natural forest loss 2014 to 2024 from ADPC (2024b), with drivers from SRTM (Farr et al., 2007), OpenStreetMap contributors (n.d.) and WDPA (UNEP-WCMC and IUCN, 2025); in-sample AUC 0.84 to 0.97. 30 m, 2024'],
      ['<strong>Fire risk</strong>', 'Distribution of the area of interest across five fire susceptibility classes, derived from cumulative fire-detection frequency between 2000 and 2024 rather than from burned area or future fire probability.', 'ADPC (2024a), from NASA FIRMS (n.d.) MODIS fire detections. 1,000 m, 2024']
    ])}
    ${docCaption('Table 18. Layers read for the business-as-usual projection.')}`,
    'phase3-bau') +

  /* phase3-drivers re-homed here. v3 drops the disturbance-driver
     layer; the closest surviving content is the seven drivers of this model. */
  docSection('Method: deforestation risk', `
    <p>The risk raster is a relative spatial ranking produced with forestatrisk (Vieilledent, 2021): a logistic regression with an intrinsic conditional autoregressive (iCAR) spatial effect on a 5 km grid. It is fitted separately for 11 regions, each on its own metric projection at 30 m (WRI Indonesia, 2026b).</p>
    <p>Each model is trained on an equal sample of cleared and retained pixels inside the 2014 natural forest, land cover codes 1, 6, 7, 8 and 10, with seven drivers: elevation, slope, distance to forest edge, distance to settlement, distance to road, distance to river, and protected area status as inside or outside. Distance to past deforestation is deliberately left out, because with only two dates it would leak the answer. Risk is then predicted on the 2024 forest using the 2024 forest edge, and the 11 regional maps are joined into one.</p>
    <p>The regional models separate cleared from remaining forest with an in-sample AUC of 0.84 to 0.97, about 0.93 on average. Riau Islands is weakest, and in Papua roads and protected areas have almost no effect, consistent with roads missing from OpenStreetMap. Planned clearing inside concessions or conversion zones is not covered.</p>
    <p>The tool never states an absolute chance of deforestation. It places the project area forest within the national distribution of forest risk for the same country, computed from the same raster masked to the same forest definition.</p>
    ${docFormula('Relative risk and national position',
      ['Relative Risk (0 to 100) = Raw Risk Value / 65,535 &times; 100',
       'Project Risk = median ( Relative Risk over project-area forest pixels )',
       'National Percentile = position of Project Risk within the country percentile breakpoints'],
      [['65,535', 'The maximum of the unsigned 16-bit raster, which encodes the 0 to 100 risk scale.'],
       ['median', 'Used rather than the mean because the risk distribution is strongly skewed.'],
       ['Comparison', 'Higher than the national average above the 60th percentile, lower than below the 40th, similar to in between.']],
      'forestatrisk (Vieilledent, 2021); WRI Indonesia (2026b).')}`,
    'phase3-drivers') +

  docSection('Method: fire risk', `
    <p>Fire risk is a susceptibility layer built from history: cumulative MODIS FIRMS fire-detection frequency between 2000 and 2024, reclassified into five classes with region-specific, percentile-calibrated thresholds. The tool reports the area and share of the project area that overlaps mapped fire-risk areas, and names the class that covers most of it.</p>
    <p>It is not a burned-area record and not a probability of future fire. Read it alongside the ${docJump('historical burned area', 'phase3#phase3-burned')}, which measures what has actually burned.</p>`,
    'phase3-fire');
}

/* ------------------------------------------------------------------- Phase 4a */
function docsPhase4a() {
  return docHero(G_PHASES + ' &middot; Phase 4a', 'Pathway selection',
    'In pathway selection, the tool stops describing and starts deciding. Every phase before it reports what is on the ground. This phase changes that description into a statement about the kind of intervention that the land can take.') +

  docSection('Three questions behind the logic', `
    <p>Three questions sit behind the logic. <strong>What happened here</strong> is measured, from two land cover maps ten years apart. <strong>What should grow here</strong> is not measured but modelled, as the reference ecosystem, and it is the only way to tell degradation apart from natural condition: grassland on a forest reference is degraded land, and the same grassland on a savanna reference is a healthy ecosystem where planting trees would be damage rather than repair. <strong>What can start without a change in land use</strong> is a feasibility question that the framework treats as a first-order decision rather than a detail.</p>`,
    'phase4a-questions') +

  docSection('Layers read', `
    ${docTable(['Data', 'Short description', 'Source'], [
      ['<strong>Land cover 2024</strong>', 'The land surface of Southeast Asia in 2024 classified into 19 land cover and land use classes plus other land, spanning forest, cropland and plantation, grassland and shrub, settlement, water and wetland types.', 'ADPC (2024b), RLCMS accessed through SIGnal: AlphaEarth Foundations embeddings (Brown et al., 2025) classified with the primitives method of Saah et al. (2020) and validated after Olofsson et al. (2014); overall accuracy 0.76 to 0.83 by country. 30 m, 2024'],
      ['<strong>Forest cover 2014</strong>', 'Forest extent as of 2014, the landscape classified into forest and non-forest, marking the earlier state of where forest stood.', 'ADPC (2024b): RLCMS 2014 forest classes in the Mekong countries; elsewhere tree canopy cover above 10 percent and height above 5 m (Potapov et al., 2021), masked with JRC TMF non-forest 2014 (Vancutsem et al., 2021), mangrove excluded; accuracy 0.89. 30 m, 2014'],
      ['<strong>Forest cover 2024</strong>', 'Forest extent as of 2024, separating natural forest from non-forest land and from planted forest or tree-crop plantation.', 'ADPC (2024b), RLCMS 2024 natural forest classes used by the tool: flooded forest, mangrove, deciduous, evergreen and mixed forest (codes 1, 6, 7, 8 and 10). 30 m, 2024'],
      ['<strong>Forest cover trajectory</strong>', 'The transition each location went through between 2014 and 2024, describing what happened rather than the state at a single date.', 'WRI Indonesia (2025), derived from ADPC (2024b) forest cover 2014 and land cover 2024. 30 m, 2014 to 2024'],
      ['<strong>Reference ecosystem, pathway layer</strong>', 'Potential natural vegetation at 30 m: mangrove, peatland, savanna, or dryland forest as the default. Built as described in Step 3. A second band, ddf_flag, marks possible seasonal deciduous forest.', 'WRI Indonesia (2026d): mangrove from Global Mangrove Watch 1996 (Bunting et al., 2022) and the national Indonesian mangrove map; peat from the national Indonesia (Kementerian Pertanian, 2018) and Malaysia peat maps, PEATGRIDS elsewhere (Widyastuti et al., 2024); savanna rule from WorldClim (Hijmans et al., 2005), CHIRPS (Funk et al., 2015), tree cover 2000 (Hansen et al., 2013) and ADPC (2024b) land cover. 30 m, 2026'],
      ['<strong>Degraded forest, forest disturbance</strong>', 'Disturbances affecting forest structure that reduce the capacity of forests to provide ecosystem services, identified from declines in tree canopy height between the 2014 baseline and the 2024 assessment period.', 'WRI Indonesia (2025), from Potapov et al. (2021) canopy height and ADPC (2024b) land cover, method after Bourgoin et al. (2024). 30 m, 2024']
    ])}
    ${docCaption('Table 19. Layers read by pathway selection.')}`,
    'phase4a-layers') +

  docSection('Ecosystem summary', `
    <p>The pathway page opens with one card per ecosystem present in the project area: dryland forest, mangrove or peatland. Each card reports the remaining forest in hectares and as a share, and the disturbed area within it, so the user sees the condition of each ecosystem before choosing a pathway for it. Changing the ecosystem updates its pathway options without resetting the other selections.</p>`,
    'phase4a-summary') +

  docSection('Method: disturbance detection', `
    <p>Disturbance here means structural decline within forest that is still standing, which is a different quantity from forest loss. It is detected as a canopy height deficit measured against an undisturbed reference population, where that reference is forest at least 120 m from any disturbed forest.</p>
    ${docFormula('Disturbance by ecosystem',
      ['Detection Threshold = 5th percentile of canopy height change in the reference population',
       'Disturbed Area (ecosystem) = Area ( canopy height change &lt; Detection Threshold and ecosystem and inside boundary )',
       'Disturbed Share (%) = Disturbed Area (ecosystem) / Ecosystem Area &times; 100'],
      [['Reference population', 'Forest at least 120 m from any disturbed forest, taken as undisturbed.'],
       ['5th percentile', 'Gives a nominal 5 percent false-positive rate.']],
      'Bourgoin et al. (2024), for structural forest degradation.')}
    ${docCaution('Disturbance and forest loss overlap within the same polygon and must never be added. Results are also area statistics by stratum: per-pixel interpretation is not supported at 30 m, given a product error of 6.6 to 9.1 m. A ten-year window is long for detecting degradation, which the team flags: version 3.1 is intended to move to an annual or five-year analysis.')}`,
    'phase4a-disturbance') +

  docSection('The four outcomes', `
    ${docTable(['Pathway', 'Eligible categories', 'Definition'], [
      ['<strong>Protect</strong>', 'Cat 1, 10B', 'Maintain forest cover or natural ecosystem based on spatial data from 2014 and 2024. Avoid emissions from converting forests, grasslands or wetlands, or from changing wetland hydrology. Covers mature and young secondary ecosystems. Additionality means focusing on ecosystems at high risk.'],
      ['<strong>Manage</strong>', 'Cat 4B, 8B, 9A, 9C', 'Balance human livelihoods with ecological health on lands that transitioned into active use between 2014 and 2024. Working agricultural and forest lands, with little or no land-use change. Two modes: cut emissions (reduced-impact logging, manure, fertiliser) and rebuild carbon pools (cover crops, agroforestry).'],
      ['<strong>Restore</strong>', 'Cat 3B, 5, 6B, 8C, 10A', 'Actively heal heavily degraded landscapes, targeting degraded vegetation, barren lands, and long-term non-forested areas. Used narrowly: recover forest, wetland or grassland where it historically occurred. Excludes replacing native ecosystems with non-native ones, such as afforesting natural grassland.'],
      ['<strong>Carbon ineligible</strong>', 'Cat 2, 3A, 4A, 4C, 6A, 7, 8A, 8D, 9D, 10C', 'Not a pathway, but a screening outcome reported in the same field. The land cannot generate carbon credits under the tool&rsquo;s current criteria, although non-carbon options may still exist. It covers natural forest converted to managed tree cover, plantation that was already established in 2014, settlement, the savanna-reference categories, open wetland on a dryland forest reference (8D) and bare land of unknown origin (10C).']
    ])}
    ${docCaption('Table 20. Pathway definitions and the trajectory categories eligible for each. Definitions follow the GUI design document, and the protect, manage and restore order follows Cook-Patton et al. (2021).')}`,
    'phase4a-outcomes') +

  docSection('Step 1. Current ecological state from land cover 2024', `
    <p>The 2024 land cover classes are grouped into six ecological states so that the logic reasons about ecological condition rather than individual land cover labels. The classification represents the severity of ecosystem disturbance, so higher class numbers are more disturbed than lower ones.</p>
    ${docTable(['Class', 'Meaning', '2024 land cover classes', 'Justification'], [
      ['<strong>C1</strong>', 'Mature natural forest', 'Flooded forest (1), Mangrove (6), Evergreen (8)', 'Highest carbon density, highest biodiversity'],
      ['<strong>C2</strong>', 'Natural forest, lower carbon and biodiversity', 'Deciduous (7), Mixed forest (10)', 'Natural forest, lower carbon density and biodiversity value'],
      ['<strong>C3</strong>', 'Managed tree cover', 'Rubber (2), Oil palm (3), Forest plantation (4), Crop plantation (5)', 'Tree cover, but managed or monoculture, so lower biodiversity'],
      ['<strong>C4</strong>', 'Non-forest vegetation', 'Shrubland (9), Grassland (17), Wetland (18)', 'Non-forest with vegetation, which can be native or anthropogenic'],
      ['<strong>C5</strong>', 'Active anthropogenic use', 'Aquaculture (13), Rice (14), Settlement (15), Cropland (16)', 'Active, intensive anthropogenic use'],
      ['<strong>C6</strong>', 'Barren', 'Bare land (19)', 'Minimal vegetation cover'],
      ['<strong>Mask</strong>', 'Not a category', 'Snow (11), Water (12), Other land (20)', 'Excluded from the classification']
    ])}
    ${docCaption('Table 21. Ecological state classification. Numbers in brackets are the land cover raster codes.')}
    <p>C1 and C2 are always treated together in the pathway logic. The difference between them matters for carbon, not for the choice of intervention.</p>`,
    'phase4a-state') +

  docSection('Step 2. The trajectory, 2014 against 2024', `
    <p>The 2014 layer is binary, forest or non-forest, and is not divided into six states. This is a data limitation and it is deliberate: a consistent, region-wide land cover product with the same class system for both years does not exist for the whole of Southeast Asia, so rather than force a detailed classification onto weaker data the framework asks the 2014 layer only the one question it can answer reliably, was there natural forest here. The consequence is that the framework can detect forest loss and forest gain but cannot detect a change within the non-forest classes, for example cropland that became a settlement. That is accepted at screening level.</p>
    <p>Two categories in 2014 against six classes in 2024 gives twelve transitions, which collapse into ten trajectory categories once C1 and C2 are merged. The categories are exhaustive and mutually exclusive: every pixel that carries valid data in both years falls into exactly one of them.</p>
    ${docTable(['Category', 'Pattern', 'Meaning'], [
      ['<strong>1</strong>', 'Forest to C1 or C2', 'Forest persisting. Natural forest in 2014, still natural forest in 2024'],
      ['<strong>2</strong>', 'Forest to C3', 'Forest lost to plantation. Natural forest replaced by managed tree cover'],
      ['<strong>3</strong>', 'Forest to C4', 'Forest degraded to non-forest vegetation. Tree cover lost, no other land use took the site'],
      ['<strong>4</strong>', 'Forest to C5', 'Forest converted to active use. Site now under crops, rice, ponds or buildings'],
      ['<strong>5</strong>', 'Forest to C6', 'Forest converted to barren. Tree cover lost and no vegetation left'],
      ['<strong>6</strong>', 'Non-forest to C1 or C2', 'Forest recovery. Natural forest returned without planting'],
      ['<strong>7</strong>', 'Non-forest to C3', 'Plantation stable. Managed tree cover in 2024 on land that was not forest in 2014, either already in place or newly established. The binary 2014 layer cannot tell the two apart'],
      ['<strong>8</strong>', 'Non-forest to C4', 'Non-forest vegetation stable. Shrub, grass or wetland in 2024 on land that was not forest in 2014. It can be native open vegetation, stable wetland, or a transition from another non-forest type'],
      ['<strong>9</strong>', 'Non-forest to C5', 'Active use stable. Crops, rice, ponds or buildings in 2024 on land that was not forest in 2014, either in use since then or newly established from another non-forest type'],
      ['<strong>10</strong>', 'Non-forest to C6', 'Barren stable. Bare land in 2024 on land that was not forest in 2014, stable or new. It can be natural or cleared, and Step 4 separates the two']
    ])}
    ${docCaption('Table 22. The ten trajectory categories.')}
    ${docNote('Category 6 is treated with caution in the source documentation. A ten-year recovery from non-forest to mature natural forest is rare, so these pixels are most likely a classification error, or a plantation misclassified as natural forest.')}`,
    'phase4a-trajectory') +

  docSection('Step 3. The reference ecosystem', `
    <p>The reference ecosystem answers what should grow here. It is the potential natural vegetation of the site, not its current cover. Each pixel takes one code, assigned in a fixed order in which the first matching rule wins (WRI Indonesia, 2026d):</p>
    <ol>
      <li>none (0), for land cover 2024 snow, water or other land;</li>
      <li>then mangrove (2);</li>
      <li>then peatland (3);</li>
      <li>then savanna (4);</li>
      <li>with dryland forest (1) as the default for every other land pixel.</li>
    </ol>
    <p>Mangrove comes from the 1996 Global Mangrove Watch extent (Bunting et al., 2022), which predates much of the conversion, together with the national Indonesian mangrove map. Peatland comes from the national Indonesia and Malaysia peat maps, and from PEATGRIDS (Widyastuti et al., 2024) elsewhere. These edaphic references win over savanna, because soil and tidal conditions are far more stable than vegetation cover. Savanna comes from a 30 m rule built for this tool, described in ${docJump('the savanna rule', 'phase4a#phase4a-savanna')}.</p>
    ${docTable(['Reference ecosystem', 'What it is', 'What it implies for restoration'], [
      ['<strong>Dryland forest</strong>', 'Terrestrial forest, not flooded, not on peat. The default wherever no other reference applies', 'Tree planting on mineral soil'],
      ['<strong>Mangrove</strong>', 'Intertidal forest', 'Tidal reconnection first, then planting'],
      ['<strong>Peatland</strong>', 'Peat soil, forested or not', 'Water table first, then vegetation'],
      ['<strong>Savanna</strong>', 'Naturally open, fire-maintained systems', 'Native grasses and herbs, no afforestation']
    ])}
    ${docCaption('Table 23. The four reference ecosystem values.')}
    <p>The reference is the only input that separates degradation from natural condition. Without it, every open landscape in Southeast Asia looks like degraded forest and the tool would recommend planting trees on natural savanna. Because dryland forest is the default, a naturally open system that the savanna rule misses is read as degraded forest. Two rows in Step 4 limit that error: natural open wetland on a dryland forest reference (8D) and natural bare land (10B) are not sent to Restore.</p>`,
    'phase4a-reference') +

  docSection('The savanna rule', `
    <p>The savanna reference is mapped at 30 m. A pixel is savanna when all four conditions hold:</p>
    <ol>
      <li><strong>Dry months.</strong> At least 4 dry months on the mainland (Myanmar, Thailand, Lao PDR, Cambodia and Viet Nam), or at least 5 on the islands. A dry month is a month with long-term mean rainfall below 60 mm, following the Schmidt-Ferguson convention. Dry months are the higher of the WorldClim V1 (Hijmans et al., 2005) and CHIRPS 1991 to 2020 (Funk et al., 2015) counts. This rule applies from 2 November 2026 and is in the pathway v4 run of 5 November 2026, because WorldClim alone missed dry savanna on Sumba, Flores and Timor.</li>
      <li><strong>Tree cover.</strong> Hansen tree cover in 2000 below 50 percent.</li>
      <li><strong>Soil.</strong> Not mangrove and not peat.</li>
      <li><strong>Not farmland.</strong> On the mainland, pixels that were aquaculture, rice, building or cropland in RLCMS 2014 are excluded. On the islands, aquaculture, rice and building in LC 2024 are excluded. Dryland cropland is kept on the islands, because LC 2024 often reads burnt savanna as cropland, including about a third of the Baluran savanna.</li>
    </ol>

    <h3>How the thresholds were set</h3>
    <p>The thresholds are calibrated values, because no single external standard sets them. They were set on 18 sites: 10 known savanna sites, among them Baluran, Sumba, Timor and Cambodian deciduous dipterocarp forest, and 8 man-made grassland sites in Kalimantan and Sumatra. A threshold of 4 dry months on the islands was rejected because man-made grassland sites start to pass (20 to 27 percent). The farmland exclusions were added after checks showed mainland rice plains and deltas, Central Luzon and some valleys in Java reading as savanna.</p>
    <p>Natural savanna sites came out 80 to 96 percent savanna (Baluran 85, East Sumba 80, West Timor 87, Komodo 96). Wasur, not used in calibration, came out 62, and the man-made grassland sites came out 0. These figures are from the WorldClim-only October 2026 version and are to be updated after quality assurance of the November 2026 version.</p>

    <h3>Independent check and uncertainty</h3>
    <p>The IUCN Global Ecosystem Typology (GET) is used only as an independent check, never to set thresholds, because at its resolution it misses small savannas and over-assigns grassland. Of the mapped savanna, 85 percent on the mainland and 72 percent on the islands falls inside its dry forest or savanna classes, against 68 and 16 percent of dryland forest points. GET has no savanna in the Philippines, so it cannot check that country. Global Pasture Watch was tested as an input to the rule and dropped, because it could not separate natural from man-made grassland.</p>
    ${docCaution('The sample is small, so the thresholds are not yet final. Mainland savanna covers about 426,000 km&sup2;, about 22 percent of mainland land and more than published dry forest totals, so it is provisional and may include degraded or old farmland. It moves by &minus;15 to +19 percent when the tree cover limit moves to 40 or 60 percent. Island savanna, about 52,000 km&sup2;, is very sensitive to the dry-month limit: &minus;68 to +57 percent for one month either way.')}
    <p>The reference is the least disturbed state the data can observe, around 2000, not the original natural vegetation, because the inputs go back only that far: Hansen tree cover 2000 for savanna, RLCMS 2014 and land cover 2024 for farmland, and forest cover 2014 for the trajectory. Land cleared long before 2000 cannot be seen as cleared, so old Imperata grassland or old farmland with low tree cover in a dry zone can be labelled savanna. Mangrove, from the 1996 extent, and peatland, from soil maps, are the exceptions.</p>

    <h3>Deciduous dipterocarp forest flag</h3>
    <p>Deciduous dipterocarp forest is a natural, fire-adapted open forest on the mainland, but its tree cover is often above 50 percent, so the savanna rule misses it. These pixels stay dryland forest and receive ddf_flag = 1 when they are on the mainland, below 1,000 m, with less than 2,500 mm of rain a year, at least 4 dry months, tree cover in 2000 of 50 percent or more, and land cover 2024 class 7, deciduous.</p>
    <p>The flag means seasonal deciduous forest, either deciduous dipterocarp or mixed deciduous forest, to be checked in the field. It does not change the pathway, but activities must check it first: open native planting and fire management for deciduous dipterocarp forest, and no closed-canopy plantation. With the flag, the deciduous dipterocarp test sites are 97 to 100 percent covered.</p>`,
    'phase4a-savanna') +

  docSection('Step 4. The decision matrix', `
    <p>Six categories split further on a condition, so the ten categories become twenty-one decision rows. The conditions come from three sources: the reference ecosystem (Categories 3, 4, 6 and 8), the 2024 land cover class (Categories 4, 8 and 9), and the land history of bare pixels (Category 10). The row identifier is carried in band 3 of the pathway raster and becomes one of the two join keys in Phase 4b.</p>
    ${docTable(['Row', 'Category', 'Trajectory', 'Condition', 'Pathway'], [
      ['1', '<strong>Cat 1</strong>', 'Forest persisting', 'None', 'Protect'],
      ['2', '<strong>Cat 2</strong>', 'Forest lost to plantation', 'None', 'Carbon ineligible'],
      ['3', '<strong>Cat 3A</strong>', 'Forest degraded to vegetation', 'Reference is savanna', 'Carbon ineligible'],
      ['4', '<strong>Cat 3B</strong>', 'Forest degraded to vegetation', 'Other reference', 'Restore'],
      ['5', '<strong>Cat 4A</strong>', 'Forest converted to active use', 'Reference is savanna', 'Carbon ineligible'],
      ['6', '<strong>Cat 4B</strong>', 'Forest converted to active use', 'Other reference; cropland, rice or aquaculture', 'Manage'],
      ['7', '<strong>Cat 4C</strong>', 'Forest converted to active use', 'Other reference; settlement', 'Carbon ineligible'],
      ['8', '<strong>Cat 5</strong>', 'Forest converted to barren', 'None', 'Restore'],
      ['9', '<strong>Cat 6A</strong>', 'Forest recovery', 'Reference is savanna', 'Carbon ineligible'],
      ['10', '<strong>Cat 6B</strong>', 'Forest recovery', 'Other reference', 'Restore (assisted natural regeneration)'],
      ['11', '<strong>Cat 7</strong>', 'Plantation stable', 'None', 'Carbon ineligible'],
      ['12', '<strong>Cat 8A</strong>', 'Non-forest vegetation stable', 'Savanna reference, natural', 'Carbon ineligible'],
      ['13', '<strong>Cat 8B</strong>', 'Non-forest vegetation stable', 'Savanna reference, cultivated', 'Manage'],
      ['14', '<strong>Cat 8C</strong>', 'Non-forest vegetation stable', 'Other reference, not 8D', 'Restore'],
      ['15', '<strong>Cat 8D</strong>', 'Non-forest vegetation stable', 'Wetland in 2024, dryland forest reference, tree cover 2000 below 50%', 'Carbon ineligible'],
      ['16', '<strong>Cat 9A</strong>', 'Active use stable', 'Cropland or rice', 'Manage'],
      ['17', '<strong>Cat 9C</strong>', 'Active use stable', 'Aquaculture, any reference', 'Manage'],
      ['18', '<strong>Cat 9D</strong>', 'Active use stable', 'Settlement', 'Carbon ineligible'],
      ['19', '<strong>Cat 10A</strong>', 'Barren stable', 'Cleared: vegetation before 2014', 'Restore'],
      ['20', '<strong>Cat 10B</strong>', 'Barren stable', 'Natural: volcanic, high elevation or water edge', 'Protect'],
      ['21', '<strong>Cat 10C</strong>', 'Barren stable', 'Origin unknown', 'Carbon ineligible']
    ])}
    ${docCaption('Table 24. The twenty-one decision rows, their trajectory, the condition that splits them, and the pathway each is assigned. There is no row 9B: aquaculture on mangrove or peat is part of 9C.')}
    <figure class="doc-embed">
      <iframe src="NbS_Activities_Flow_v2.html?embed" loading="lazy" title="Activity matrix: how each pathway continues into an ecosystem, an activity, a benefit and an indicator"></iframe>
      <figcaption>Where the decision rows lead. Each pathway continues into an ecosystem, an activity, a benefit and the indicator that measures it. The rows that resolve to Carbon ineligible carry no activities, so they are not drawn.</figcaption>
    </figure>
    <p><a class="doc-cta" href="NbS_Activities_Flow_v2.html">See the detailed activities matrix<span aria-hidden="true">&rarr;</span></a></p>

    <h3>How Category 10 is split</h3>
    <p>Category 10 covers pixels that were non-forest in 2014 and are bare land in 2024. Bare land can be natural, such as volcanic slopes, high mountains and the edges of rivers and coasts, or it can be land that was cleared. The tests run in this order, and the first match decides the row:</p>
    <ol>
      <li>Within 15 km of a Holocene volcano, or at 3,000 m elevation or higher: <strong>10B, natural</strong>.</li>
      <li>Vegetation before 2014, meaning any one of Hansen tree cover in 2000 at 10 percent or more, JRC TMF forest in any year from 1990 to 2013, or GLAD GLCLU vegetation or cropland in 2000, 2005 or 2010: <strong>10A, cleared</strong>.</li>
      <li>Water at any time in JRC Global Surface Water, or within 300 m of water: <strong>10B, natural</strong>.</li>
      <li>None of the above: <strong>10C, origin unknown</strong>.</li>
    </ol>`,
    'phase4a-matrix') +

  docSection('Step 5. What the phase reports', `
    <p>The pathway raster (WRI Indonesia, 2025) is built from the layers in Table 19, with its land cover, forest cover and forest change inputs from ADPC (2024b). It carries three bands. This phase tabulates band 1 only. Bands 2 and 3 pass through to Phase 4b, where together they select the activities.</p>
    ${docTable(['Band', 'Name', 'Codes'], [
      ['1', 'pathway', '0 no data, 1 Protect, 2 Manage, 3 Restore, 4 Carbon ineligible'],
      ['2', 'ecosystem', '0 none (snow, water or other land) or no data, 1 dryland forest (default), 2 mangrove, 3 peatland, 4 savanna'],
      ['3', 'cat_code', 'The decision row from Table 24 (21 rows)']
    ])}
    ${docCaption('Table 25. Pathway raster band layout.')}
    <p>The denominator for the distribution is the total project area, with an Unclassified row absorbing code 0 and nodata so that the table sums to 100 percent. Code 4, carbon ineligible, is listed but excluded from the eligible headline, because it is not a pathway.</p>`,
    'phase4a-reports') +

  docSection('Ineligible area', `
    <p>Where part of the project area cannot take a pathway, the card for that pathway is disabled and the area is reported with its reason rather than hidden. The interface explains the reason in plain language, following the decision matrix.</p>
    ${docTable(['Pathway', 'Unavailable where'], [
      ['<strong>Protect</strong>', 'The forest is intact and no significant deforestation risk is detected, or the forest has already been converted or degraded into vegetation, active use or bare land.'],
      ['<strong>Manage</strong>', 'The forest is intact and shows no sufficient sign of degradation, it has been converted to bare land, or most of the site is stable non-forest vegetation.'],
      ['<strong>Restore</strong>', 'Forest still persists, it has been converted to active use, or the land is stable or established active use, stable or established bare land, or a natural ecosystem.']
    ])}
    <p>No pathway is available on forest lost to plantation and on stable plantation, which do not meet the current criteria for any of the three.</p>
    <p>The interface keeps three situations apart that can look alike on screen: missing data, an ecosystem that is not present, and confirmed ineligibility.</p>
    ${docNote('A pathway is a screening recommendation from a two-date land cover trajectory, not a prescription. Confirm land use, tenure and condition on the ground first.')}`,
    'phase4a-ineligible');
}

/* Phase 4b. The catalogue below is the Reference Methodology's Table 26, transcribed.
   The reference document itself cautions that the catalogue predates the
   November 2026 decision matrix (Table 24); the caution is reproduced on the page.
   TODO(design): the activity list the screens use (js/f05-shared.js) is keyed by
   ecosystem and pathway, has no savanna column and offers four activities this
   table marks "not offered". Reconcile the two with the methodology team. */
function docsPhase4Activities() {
  const no = '<em>not offered</em>';
  return docHero(G_PHASES + ' &middot; Phase 4b', 'Activity selection',
    'Phase 4a decides which pathway the land can take. Phase 4b decides what to do on the land. The tool does not select an activity from the pathway alone. It selects an activity from two things together: what happened to the land, and the ecosystem that belongs there. On a forest reference, Restore means planting trees. On a mangrove reference, Restore means breaching pond dykes. On a peat reference, Restore means raising water tables. These are different projects with different costs and different carbon outcomes.',
    []) +

  docSection('How an activity is matched to the land', `
    <p>The pathway raster from Phase 4a carries, for every pixel, the decision row it fell into and its reference ecosystem. Phase 4b reads band 3 and band 2 of that raster on the same grid and lists the unique category and ecosystem pairs present in the project area, each with its area. Each pair is then looked up in the activity catalogue, which is keyed on exactly that pair.</p>
    ${docFormula('Activity join',
      ['Pairs Present = unique ( Category, Reference Ecosystem ) combinations inside the boundary, with area',
       'Activities = join ( Pairs Present, Activity Catalogue ) on ( Category, Reference Ecosystem )'],
      [['Category', 'The decision row, one of the 21 rows of Table 24, from band 3.'],
       ['Reference Ecosystem', 'Dryland forest, mangrove, peatland or savanna, from band 2.'],
       ['No match', 'Carbon ineligible categories carry no activity by design. A category with no matching catalogue row is flagged, not dropped.']])}
    <p>The categories are defined in ${docJump('the decision matrix', 'phase4a#phase4a-matrix')}.</p>
    ${docNote('This phase is not covered in the earlier v2b methodology documentation. It is read from the tool itself: the canonical activity catalogue and the join logic of Phase 4.')}`,
    'activity-join') +

  docSection('What follows from the match', `
    <p>Three things follow from the key being a pair rather than the pathway.</p>
    <ul>
      <li><strong>One pathway can carry several activities.</strong> A project area has one activity for each category and ecosystem combination present, so a mixed site has a longer activity list than a uniform one.</li>
      <li><strong>The list is not filtered by anything the user chooses.</strong> Selecting a pathway on the screen turns its activities on or off for the benefit roll-up. It does not change which activities the ground is eligible for.</li>
      <li><strong>Savanna is shown with dryland.</strong> For display, the savanna reference is folded into the dryland group. That changes only the group heading, never the category, pathway or activity of a pixel, so a savanna cell keeps its own row.</li>
    </ul>
    <p>Besides its text, each catalogue row carries three benefit fields, one for each pillar, and two carbon flags. Those travel through to ${docJump('Phase 5 · Potential benefit', 'phase5')}, where the benefit list is assembled from them.</p>`,
    'activity-consequences') +

  docSection('The activity catalogue', `
    <p>One row per trajectory category, one column per reference ecosystem.</p>
    ${docTable(['Category', 'Pathway', 'Dryland forest', 'Mangrove', 'Peatland', 'Savanna'], [
      ['<strong>Cat 1</strong>', 'Protect', 'Establish protected areas, corridors, and enforce customary land rights', 'Establish marine protected areas and enforce strict prohibitions on coastal development', 'Protect peat domes within Peat Hydrological Units, enforce moratoria and ban canal construction', 'Establish protected areas, corridors, and enforce customary land rights'],
      ['<strong>Cat 3B</strong>', 'Restore', 'Execute Assisted Natural Regeneration and enrichment planting', 'Breach coastal barriers for tidal flushing and actively plant native mangroves', 'Construct rewetting infrastructure to raise water tables and re-vegetate with native species', no],
      ['<strong>Cat 4B</strong>', 'Restore', 'Conduct Forest Landscape Restoration to transition back to native forest', 'Reclaim active aquaculture ponds, restore hydrology, and re-establish intertidal elevation', 'Rewet drained croplands and implement paludiculture', no],
      ['<strong>Cat 5</strong>', 'Restore', 'Soil terracing and gully plugs for erosion control, and active reforestation', 'Build permeable breakwaters to trap sediment and re-vegetate mudflats', 'Rewet degraded bare peat, control compaction, and reintroduce peatland native species', 'Savanna revegetation'],
      ['<strong>Cat 6</strong>', 'Manage', 'Protect regenerating stands from fire and grazing, and apply community-based forest management', 'Protect colonising seedlings on mudflats and regulate non-timber harvesting', 'Maintain high peat water tables and establish community fire-monitoring teams', 'Protect regenerating stands from fire and grazing, and apply community-based forest management'],
      ['<strong>Cat 8B</strong>', 'Manage', no, no, no, 'Optimise forage management, rotational grazing, and controlled patch burning'],
      ['<strong>Cat 8C</strong>', 'Restore', 'Remove invasive flora, plant native non-forest trees, and restore riparian buffers', 'Restore degraded tidal marshlands and rehabilitate abandoned salt pans', 'Construct peat rewetting infrastructure to maintain water tables and revegetate with native species', no],
      ['<strong>Cat 9A</strong>', 'Manage', 'Agroforestry with alley cropping and windbreaks, zero tillage, cover crops, and biochar', 'Manage saline-tolerant crops and establish protective mangrove greenbelts', 'Transition drained croplands to paludiculture and maintain water table management', 'Agroforestry with alley cropping and windbreaks, zero tillage, cover crops, and biochar'],
      ['<strong>Cat 9B</strong>', 'Restore', no, 'Breach aquaculture pond dykes for full tidal flushing and replant endemic mangroves', 'Decommission drained peat farming and ponds, and build peat rewetting infrastructure', no],
      ['<strong>Cat 9C</strong>', 'Manage', 'Establish vegetated riparian buffers around inland fish ponds', no, no, 'Establish vegetated riparian buffers around inland fish ponds'],
      ['<strong>Cat 10</strong>', 'Restore', 'Bio-engineering, soil reclamation, and drought-tolerant native afforestation', 'Build artificial breakwaters to restore mud substrate and reintroduce pioneer flora', 'Rewet bare degraded peat and reintroduce native peatland species', 'Bio-engineering, soil reclamation, and drought-tolerant native savanna revegetation'],
      ['<strong>Cat 2, 3A, 4A, 7, 8A, 9D</strong>', 'Carbon ineligible', '<em>No activity, by design.</em>', '<em>No activity.</em>', '<em>No activity.</em>', '<em>No activity.</em>']
    ])}
    ${docCaption('Table 26. The canonical v3 activity catalogue, 40 rows, keyed on trajectory category and reference ecosystem.')}
    <p>A carbon ineligible area is reported with a sentence naming the reason rather than hidden, so a user can see whether the constraint is the land&rsquo;s history, its reference ecosystem, or its current use.</p>
    ${docCaution('The catalogue predates the November 2026 decision matrix. Under the current matrix Category 4B is Manage rather than Restore, Category 6 is split into 6A, carbon ineligible, and 6B, Restore through assisted natural regeneration, Category 9B is merged into 9C, Category 10 is split into 10A, 10B and 10C, and 4C and 8D are new carbon ineligible rows. The rows above have to be reconciled with the activity list in the Activities Deep Dive before the catalogue is quoted.')}`,
    'activity-catalogue') +

  docSection('Two deliberate gaps', `
    <p>Two gaps in the catalogue are intended, not missing data.</p>
    <ul>
      <li><strong>Category 9B has no dryland or savanna row.</strong> Aquaculture outside mangrove and peat is sent to Manage under Category 9C instead.</li>
      <li><strong>Categories 3B, 4B and 8C have no savanna row.</strong> A savanna reference sends those trajectories to carbon ineligible under Categories 3A, 4A and 8A. This is the guardrail against planting trees on land that is naturally open.</li>
    </ul>
    ${docCallout('What selection does not decide', 'The catalogue says an activity is <em>ecologically appropriate</em> for the ground. It does not consider cost, available labour, community consent, land tenure or market access. A shortlist from this phase is an input to a feasibility study, not a substitute for one.', 'warn')}`,
    'activity-gaps') +

  /* Moved here from Phase 5 in v3. Keeps the id phase5-parameters, which the
     section carried when it lived in Phase 5. */
  docSection('Duration and carbon project settings', `
    <p>The last controls on the pathway page set how ${docJump('Phase 5', 'phase5')} runs. The duration slider moves in 10-year steps and keeps its value when the user moves between steps. The carbon project question starts at No. Answering Yes reveals the three deductions, each with a short explanation and a clear error for values outside the supported range.</p>
    ${docTable(['Label', 'Default and range', 'Explanation'], [
      ['<strong>Duration of intervention</strong>', '30 years; 10 to 70', 'Enters every projection as the time variable. The restoration growth curve is defined only to year 40, so a longer duration is flagged rather than extrapolated. Written into every saved result, so a result records the duration it was produced with.'],
      ['<strong>Carbon project</strong>', 'No', 'Answering Yes exposes the three deductions below and the three net carbon figures. Answering No leaves only the gross figures visible.'],
      ['<strong>Leakage deduction</strong>', '15%; 1 to 100', 'Emission displacement outside the project boundary.'],
      ['<strong>Uncertainty</strong>', '10%; 1 to 100', 'Discount for error in data and models.'],
      ['<strong>Buffer pool deduction</strong>', '12%; 1 to 100', 'Set-aside against reversal and non-permanence risk.']
    ])}
    ${docCaption('Table 27. Settings made on the pathway page and used in Phase 5.')}
    ${docCaution('These three defaults are generic, not methodology-specific. The backend is explicit that a 15 percent leakage deduction is not a universal minimum requirement: it is an optional conservative default that may be applied only where the relevant methodology permits it and where activity-shifting leakage must be quantified. The official buffer pool contribution must be determined with the Verra AFOLU Non-Permanence Risk Tool and Risk Assessment Calculator during project validation. If you are working toward a particular standard, replace all three with that standard&rsquo;s values before quoting any net figure, and record what you used.')}
    ${docNote('All the information in NbS Tool is provided to support a pre-feasibility study. Further data collection may be required.')}`,
    'phase5-parameters');
}

/* -------------------------------------------------------------------- Phase 5 */
/* "What the tool says" quotes the Data Analyser's own sentences
   (js/analysis-shared.js), with the figures replaced by [placeholders].
   Order follows the v3 interface: summary, general benefits, unique benefits. */
function docsPhase5() {
  return docHero(G_PHASES + ' &middot; Phase 5', 'Potential benefit',
    'Potential benefit is the last phase. The full chain exists to produce it. The tool invents nothing at this stage. Each qualitative benefit comes from a benefit tag on an activity that the pathway logic already selected. If an activity is not eligible on this ground, the tool does not show its benefits.') +

  docSection('How the results are arranged', `
    <p>The interface arranges the results in three blocks, and this page follows the same order. The benefit summary comes first. General benefits follow, which any project on the pathway would deliver. Then come unique benefits, which depend on the specific conditions of the site, such as the threatened species present or the hazards the community faces. Within each block, benefits are grouped by pillar: Nature, People and Climate. A benefit shown without a number is not a weaker benefit; it is one for which the tool has no defensible spatial method yet.</p>
    <p>The duration and the carbon deductions used here are set on the pathway page. See ${docJump('Phase 4b · Duration and carbon project settings', 'phase4b#phase5-parameters')}.</p>`,
    'phase5-split') +

  docSection('Benefit summary', `
    <p>The summary opens with the estimated carbon benefit: the net emission reductions and removals over the project duration, and the average per year. It is built from the gross figures of the two climate components under ${docJump('unique benefits', 'phase5#phase5-climate')}. A project summary follows, with the number of activities, the duration and the project area.</p>
    <p>A pathway selector switches every card between Protect, Manage and Restore without changing the selections made on the pathway page, so the results for each pathway stay separate. Three pillar cards close the summary: the nature sub-components and the reference ecosystem; the people sub-components and households; and the climate sub-components with the total carbon stock stored.</p>
    <p>The triple benefit score of earlier versions has been removed. Each pillar card carries its own units and data states, and no combined score is produced across the three pillars.</p>`,
    'phase5-summary') +

  docSection('Net carbon figures', `
    <p>The three net components appear only when the user answers Yes to the carbon project question. Otherwise they stay deactivated and only the gross figures are shown.</p>
    ${docFormula('Net carbon emission reduction, the Protect side',
      ['Net Protect Credits = Gross Avoided Emissions &minus; ( Gross Avoided Emissions &times; Leakage ) &minus; ( Gross Avoided Emissions &times; Uncertainty ) &minus; ( Gross Avoided Emissions &times; Buffer )'],
      [], 'the tool&rsquo;s own deduction on user-supplied percentages. The buffer contribution of a real project is set with the Verra AFOLU Non-Permanence Risk Tool.')}
    ${docSays('If this project is developed for an NbS Carbon Project, the net carbon emissions reduction is estimated at [X] tCO&#8322;e after applying deductions to the total estimated carbon reduction of [Y] tCO&#8322;e.')}
    ${docFormula('Net carbon sequestration, the Restore side',
      ['Net Restore Credits = Gross Carbon Removal &times; ( 1 &minus; Leakage &minus; Uncertainty &minus; Buffer )'],
      [], 'the tool&rsquo;s own deduction on user-supplied percentages.')}
    ${docSays('The net carbon sequestration is estimated at [X] tCO&#8322;e after applying deductions to the total estimated carbon sequestration of [Y] tCO&#8322;e.')}
    ${docFormula('Estimated net emission reductions and removals, the headline',
      ['Adjusted Total = ( Gross Protect &minus; Protect Deduction ) + ( Gross Restore &minus; Restore Deduction )',
       'Final Net Credits = Adjusted Total &minus; ( Adjusted Total &times; Buffer )',
       'Annual Credits = Final Net Credits / Project Duration (years)'],
      [['Leakage, Uncertainty, Buffer', 'The three user parameters, as decimals. The two side formulas above are equivalent: the first is written out in full, the second in factored form.'],
       ['Protect Deduction, Restore Deduction', 'Leakage and uncertainty only, applied to each side separately.'],
       ['Buffer, in the headline', 'Applied once, to the combined leakage-adjusted and uncertainty-adjusted total, rather than separately to each side.']],
      'the tool&rsquo;s own deduction on user-supplied percentages.')}
    ${docSays('Over a [t]-year crediting period, the project area could generate an estimated [X] tCO&#8322;e of net emission reductions and removals, an average of [Y] tCO&#8322;e per year.')}
    ${docCaution('Three different net numbers appear on one screen and they are not interchangeable. The two side figures deduct all three items from each side separately. The headline deducts leakage and uncertainty per side, then applies the buffer once to the combined total, which is why it is larger than the sum of the two side figures. Always state which of the three is being quoted.')}`,
    'phase5-net') +

  docSection('The shared projection', `
    <p>Five quantified components answer the same question: how much of this project area would be lost over the project duration if nothing were done, and where. The answer has two parts, how much and where.</p>
    ${docFormula('How much: compounding projection of the historical rate',
      ['Projected Loss (ha) = Risk Area (ha) &times; ( 1 &minus; e<sup>&minus;rt</sup> )'],
      [['Risk Area', 'The eligible area that carries a deforestation risk value, in hectares.'],
       ['r', 'The annual deforestation rate from Phase 3, as a decimal. A 2 percent rate becomes 0.02.'],
       ['t', 'Project duration in years.'],
       ['e', 'Euler&rsquo;s number, approximately 2.718.']],
      'Puyravaud (2003), for the annual rate that is projected forward.')}
    <p><strong>Where.</strong> Not all forest is equally vulnerable, so instead of assuming an average carbon loss across the whole area, the tool ranks every eligible pixel from highest deforestation risk to lowest, then moves down that list selecting the most threatened pixels one by one until their combined area equals the projected loss.</p>
    ${docNote('The exponential form prevents over-projection over long timeframes: it approaches the eligible area asymptotically and can never exceed it, which a simple multiplication of hectares per year can. The ranked allocation, in turn, tends to attribute projected loss to frontier and edge forest, which often carries less biomass than intact interior forest, so the carbon result tends to be lower than a uniform distribution would give. Both allocations are computed so they can be compared. And because the rate is a project-area average that may include degraded, fast-losing edge forest, applying it to Protect areas can overestimate the baseline.')}`,
    'phase5-projection') +

  /* ---- General benefits ---- */
  docSection('General benefits: Nature', `
    <p>Three general nature benefits. The unique nature benefits are under ${docJump('Unique benefits: Nature', 'phase5#phase5-unique-nature')}.</p>

    <h3>Maintenance of ecological connectivity</h3>
    <p><em>General benefit, all three pathways.</em> Reports whether the site holds habitat that links otherwise separate blocks, and how much of it. The classified Morphological Spatial Pattern Analysis result is intersected with each pathway. Under Protect the narrative reports the intact block conserved and the corridor area, bridge plus loop, within it. Under Manage it reports the connector and edge habitat whose condition can be improved. Under Restore it reports the number of separate habitat patches that restoration would re-link, counted as connected cores with 8-connectivity.</p>
    <p>Ecological connectivity comes from a regional Morphological Spatial Pattern Analysis layer (WRI Indonesia, 2026c; Soille &amp; Vogt, 2009). It was run once for the whole of Southeast Asia in GuidosToolbox Workbench 1.9.8 (Vogt et al., 2022), on natural forest masks for 2014 and 2024. Forest is land cover codes 1, 6, 7, 8 and 10 from ADPC (2024b), the same definition as the deforestation risk layer, so plantations and shrubland are not forest. The settings are 8-connectivity, an edge width of one pixel (about 30 m), and transition and internal or external classes switched on. The region was processed in 80 tiles with a 15 km overlap.</p>
    <p>The tool does not run the analysis per project. It overlays the regional classes on each pathway area, so a pixel class already reflects forest beyond the boundary. Pixels inside the boundary are reported separately from those in a surrounding buffer.</p>
    <ul>
      <li><strong>Protect</strong> counts all forest classes and, as corridor, Bridge (codes 33, 35, 133, 135 and 137) and Loop (65, 67, 165, 167 and 169).</li>
      <li><strong>Manage</strong> counts Bridge and Loop plus Edge (3 and 103) and Perforation (105).</li>
      <li><strong>Restore</strong> counts the separate 8-connected forest patches that the restoration area would join.</li>
    </ul>
    ${docSays('Conserving this [ecosystem] ecosystem keeps an estimated [X] ha block of natural habitat intact and safeguards its role as a connector in the surrounding landscape. Based on the site structure, [Y] ha (&asymp; [Z]%) of the area functions as a corridor linking separate habitat cores. Protecting it prevents the fragmentation that would likely occur under current deforestation pressure over the [t]-year project period.')}
    ${docCaution('Morphological connectivity is structural: it establishes that habitat is physically linked, not that any species uses the link. Morphological Spatial Pattern Analysis classifies morphology only, and no dispersal, movement or habitat suitability is modelled. Because the analysis uses a landscape buffer, the result also depends on land cover outside the project boundary, which the project does not control. The one-pixel edge makes Core mean &ldquo;not on the forest border&rdquo; rather than deep interior habitat, and the 2014 and 2024 masks come from different map products, so differences between the two dates are not pure change.')}

    <h3>Protection of watershed function</h3>
    <p><em>General benefit, Protect and Restore.</em> Reports the capacity of the landscape to capture, store, filter and slowly release water, and what keeping natural cover protects. It is reported qualitatively against the ecosystem and cover present.</p>
    ${docSays('Safeguarding this [ecosystem] ecosystem helps protect the natural capacity of the landscape to capture, store, filter, and slowly release water. Keeping the site under healthy natural cover supports more stable river flow, lower erosion and sediment loads, and better water quality downstream.')}
    ${docCaution('No hydrological model is run. There is no catchment delineation, no water yield figure and no sediment figure. The claim is directional, not quantified, and should not be presented as a modelled result. The launch version keeps it as a narrative by ecosystem type and shows a number only where an approved indicator, unit, baseline and period exist.')}

    <h3>Enhanced biodiversity and ecosystem function</h3>
    <p><em>General benefit, Protect.</em> Reports how many hectares of suitable habitat would be lost under the baseline, and therefore how much habitat loss conservation avoids. The projected baseline loss from the shared projection is intersected with Area of Habitat, unioned across mammals, birds, reptiles and amphibians into a single habitat mask.</p>
    ${docFormula('Habitat loss avoided',
      ['Habitat Loss Avoided (ha) = Sum ( Pixel Area &times; Allocated Loss &times; Habitat Union )'],
      [['Pixel Area', 'Ground area of one pixel, in hectares.'],
       ['Allocated Loss', '1 where the ranked allocation placed projected loss on that pixel, 0 otherwise.'],
       ['Habitat Union', '1 where any of the four taxon habitat rasters marks the pixel as suitable habitat, 0 otherwise.']],
      'Brooks et al. (2019), for Area of Habitat.')}
    ${docSays('Conserving this [ecosystem] ecosystem maintains an estimated [X] hectares of suitable habitat, safeguarding habitat extent for species over the [t] year of project&rsquo;s duration.')}
    ${docNote('The union mask means one hectare of habitat shared by fifty species is counted once, which is correct for area but carries no information about species richness. The component therefore reports the number of species overlapping the projected loss separately.')}`,
    'phase5-nature') +

  docSection('General benefits: People', `
    <p>In version 3 the People pillar is purely qualitative and generates no numbers from raster data. This is a deliberate constraint rather than a gap: outcomes such as tenure security, benefit sharing, governance capacity and cultural continuity are institutional and unobservable from satellite, and spatial proxies for them would lack a defensible link to actual outcomes. Protection of watershed function, which matters to people downstream, is reported under the ${docJump('nature pillar', 'phase5#phase5-nature')} and runs no hydrological model.</p>
    <p>The tab also asks the user qualitative benefit specification questions covering household access to water and food, the primary livelihood source, governance capacity, benefit-sharing transparency and tenure status. These are inputs the user supplies from field knowledge, not modelled values.</p>
    ${docTable(['Benefit', 'What it means'], [
      ['<strong>Enhanced food and water security</strong>', 'Year-round, climate-resilient community access to critical nutritional and hydrological resources, by stabilising and restoring vital ecosystem functions.'],
      ['<strong>Sustainable livelihood opportunities</strong>', 'Climate-adaptive, nature-positive revenue streams that allow households to withstand economic shocks without degrading or depleting the local natural resource base. Opportunities depend on project design and local participation.'],
      ['<strong>Strengthened social capital and governance capacity</strong>', 'Community cohesion, institutional trust, and local legislative and operational capacity to manage resources, enforce rules and resolve conflicts independently.'],
      ['<strong>Equitable benefit-sharing mechanisms</strong>', 'Transparent, inclusive and legally binding frameworks that distribute project rewards and resource rights fairly, and actively prevent elite capture. Arrangements have to be agreed locally.']
    ])}
    ${docCaption('Table 28. General people benefits, each shown as a short text card.')}
    <p>The unique people benefits are under ${docJump('Unique benefits: People', 'phase5#phase5-unique-people')}.</p>`,
    'phase5-people') +

  docSection('General benefits: Climate', `
    <h3>Enhance resilience to climate hazards</h3>
    <p>Reports the reduction in people&rsquo;s and assets&rsquo; exposure to climate hazards achieved by using healthy ecosystems as natural buffers. For areas assigned to any of the three pathways, the tool identifies locations classified as high or very high risk for the relevant hazards, then overlays projected population for the corresponding project year.</p>
    ${docFormula('Exposure within eligible areas, per hazard',
      ['Exposed Area (hazard) = Sum [ Pixel Area &times; I( Risk Class &ge; 4 ) &times; I( pixel is Protect, Manage or Restore ) ]',
       'Exposed Population (hazard, year t) = Sum [ Projected Population<sub>t</sub> &times; I( Risk Class &ge; 4 ) &times; I( pixel is Protect, Manage or Restore ) ]'],
      [['I( )', 'An indicator: 1 when the condition holds, 0 when it does not.'],
       ['Risk Class &ge; 4', 'High or very high risk for that hazard.'],
       ['Projected Population', 'WorldPop FuturePop for the project year, aligned to Shared Socioeconomic Pathway 2.']],
      'the tool&rsquo;s own overlay of ADPC risk classes and WorldPop FuturePop; the reference document names no external method.')}
    ${docSays('Implementing NbS in this ecosystem can reduce disaster exposure across an estimated [X] hectares, helping to lower risk for an estimated [Y] people / [H] households / [C] communities over the project&rsquo;s [t]-year duration.')}
    ${docNote('Population here is a scenario of possible future distribution, not observed population. The link between cover and hazard reduction is treated as binary presence: the component establishes that exposure overlaps intervention, and does not model how much a given hazard is attenuated by a given amount of cover. It does not quantify the effectiveness of individual activities, nor model changes in hazard intensity, flood depth or return period.')}

    <h3>Microclimate regulation</h3>
    <p>Reports the moderation of local temperature by vegetation, through canopy shading and evapotranspiration, expressed as the tree-cover area delivering that cooling function. The historical gain rate is derived from the forest cover benchmark and projected forward linearly.</p>
    ${docFormula('Projected tree cover gain',
      ['Annual Gain Rate (ha per year) = Tree Cover Gain (2014 to 2024) / 10',
       'Projected Tree Cover Gain (ha) = Annual Gain Rate &times; Years from 2024 to project end'],
      [['Tree Cover Gain', 'The measured increase in forest area over the decade, in hectares.'],
       ['10', 'Years in the baseline period, giving the average new forest added per year.']],
      'De Frenne et al. (2019), for the cooling effect of canopy cover. The linear projection is the tool&rsquo;s own.')}
    ${docSays('Conserving this [ecosystem] ecosystem, with an estimated [X] hectares (&asymp; [P]%) of tree cover increase, helps regulate the local microclimate, moderating temperatures through shading and evapotranspiration, and buffering the surrounding area against heat extremes over the project&rsquo;s [t] year duration.')}
    ${docNote('Linear extrapolation assumes the gain rate stays constant. Tree-cover gain is rarely linear: regrowth can accelerate once established, or plateau as land runs out or succession matures. A flat annual average is the simplest defensible assumption but drifts from reality the further it is projected. The cooling effect itself is cited from De Frenne et al. (2019) rather than modelled for the site.')}
    <p>The carbon components are under ${docJump('Unique benefits: Climate', 'phase5#phase5-climate')}.</p>`,
    'phase5-resilience') +

  /* ---- Unique benefits ---- */
  docSection('Unique benefits: Nature', `
    <h3>Reduced vulnerability to fire, pests and disease</h3>
    <p><em>Unique benefit, Protect.</em> Reports which threatened species have habitat in the project area, and what share of that habitat projected deforestation would take. The species inventory is filtered to those whose habitat raster intersects the project area. For each species the tool computes its Area of Habitat inside the boundary, intersects that habitat with the allocated projected loss, and expresses the overlap as a share of the species&rsquo; habitat in the project area. Threatened means Critically Endangered, Endangered or Vulnerable on the IUCN Red List.</p>
    ${docFormula('Avoided habitat loss across threatened species',
      ['Avoided Habitat Loss (%) = Sum of Avoided Habitat / Sum of Habitat in Project Area &times; 100'],
      [['Avoided Habitat', 'For one threatened species, the area of its habitat inside the boundary that the projected loss would have taken, in hectares.'],
       ['Habitat in Project Area', 'For the same species, its total Area of Habitat inside the boundary, in hectares.'],
       ['Sum', 'Summed over all threatened species present.']],
      'a simplified adaptation of the IUCN STAR threat metric, on Area of Habitat (Brooks et al. 2019).')}
    ${docSays('By protecting at-risk habitat, this project supports habitat for [N] species, including [X]% threatened species: [a] CR, [b] EN, and [c] VU. Over the project&rsquo;s [t] year duration, the intervention may reduce threat levels by protecting at least [P]% of habitat for [N] species through: [selected activities].')}
    ${docNote('The method is a simplified adaptation of the IUCN STAR threat metric. STAR weights a species&rsquo; contribution by its extinction risk and by the share of its global range affected, whereas this component works on the share of habitat inside the project area only, so a species with 1 percent of its global range in the project area and one with 90 percent are treated identically. The phrasing &ldquo;may reduce threat levels&rdquo; is deliberate and should not be tightened.')}

    <h3>Improved forest productivity and regeneration</h3>
    <p><em>Unique benefit, Manage and Restore.</em> Reports the potential biodiversity uplift from restoration, expressed in condition-adjusted hectares. The method is a spatially explicit adaptation of the area-adjusted Condition approach of the SD VISta Nature Framework v1.0 (Verra, 2024), which defines area-adjusted condition as ecosystem extent multiplied by standardised ecosystem condition. The tool applies that relationship at pixel level and sums the difference between projected project condition and baseline condition across eligible restoration pixels.</p>
    ${docFormula('Framework definition',
      ['Potential Biodiversity Uplift (ha) = Restore Area &times; ( Condition<sub>project</sub> &minus; Condition<sub>baseline</sub> )'],
      [], 'SD VISta Nature Framework v1.0 (Verra, 2024), area-adjusted condition.')}
    ${docFormula('As implemented',
      ['Gain Rate = Gain Area (2014 to 2024) / Restore Area / 10',
       'Degradation Rate = Degradation Area (2014 to 2024) / Restore Area / 10',
       'Condition Uplift = minimum of 1.0 and ( Gain Rate + Degradation Rate ) &times; t',
       'Biodiversity Uplift (ha) = Restore Area &times; Condition Uplift'],
      [['Condition', 'Expressed on a scale from 0 to 1, so the result reads as condition-adjusted hectares.'],
       ['10', 'Years in the observation window, to give an annual rate.'],
       ['t', 'Project duration in years.']],
      'SD VISta Nature Framework v1.0 (Verra, 2024), adapted to pixel level.')}
    ${docSays('By restoring degraded areas, this project may expand habitat for [N] species, including [X]% threatened species: [a] CR, [b] EN, and [c] VU. Over the project&rsquo;s [t] year duration, the intervention may increase suitable habitat by [P]% for [N] species through: [selected activities].')}
    ${docCaution('Condition is inferred from observed tree-cover gain and degradation rates over the 2014 to 2024 window, not measured directly. The implementation adds the degradation rate to the gain rate, which treats observed degradation as additional condition headroom the project can recover rather than as a decline in the baseline. That reading is defensible as the total condition gap a project could close, but it is not the only reading of the project-minus-baseline difference, and it inflates the uplift on sites that are degrading fast. The result is condition-adjusted hectares, a screening unit, not a biodiversity credit.')}`,
    'phase5-unique-nature') +

  docSection('Unique benefits: People', `
    <p>Four unique people benefits are reported, each as a text card for the pathway it applies to. The livelihood benefit appears twice, once for Manage and once for Restore, and neither is added to the general livelihood card as a separate total.</p>
    ${docTable(['Benefit', 'Pathway', 'What it means'], [
      ['<strong>Secure land and resource tenure</strong>', 'Protect', 'Formalisation, legal protection and institutional enforcement of a community&rsquo;s rights to possess, use, manage and inherit land and natural resources, safeguarding them against displacement and unauthorised exploitation. Depends on a rights assessment and local processes.'],
      ['<strong>Cultural heritage preservation</strong>', 'Protect', 'Safeguarding and transmission of a community&rsquo;s intangible traditions, local ecological knowledge, sacred sites and customary ways of life that are intertwined with the landscape. The card avoids exposing sensitive locations or knowledge.'],
      ['<strong>Sustainable livelihood opportunities, Manage</strong>', 'Manage', 'Climate-adaptive, nature-positive revenue streams that allow households to withstand economic shocks without degrading or depleting the local natural resource base.'],
      ['<strong>Sustainable livelihood opportunities, Restore</strong>', 'Restore', 'Climate-adaptive, nature-positive income anchored in ecosystem restoration services and the sustainable harvesting of non-timber forest assets, allowing households to improve financial security without exhausting local natural resources.']
    ])}
    ${docCaption('Table 29. Unique people benefits and the pathway each applies to.')}`,
    'phase5-unique-people') +

  docSection('Unique benefits: Climate', `
    <p>Two figures are produced from opposite sides of the pathway assignment. The avoided-emissions component quantifies the Protect side, emissions that would otherwise happen. The sequestration component quantifies the Restore side, removals from growth that would otherwise not happen. They are in the same units over the same duration, so they can be presented side by side without conversion. The Manage carbon component is not started; the Manage qualitative benefits already appear in the general benefit list.</p>
    ${docTable(['Constant', 'Value', 'Meaning'], [
      ['<strong>Carbon Fraction</strong>', '0.47', 'Dry matter to carbon, IPCC 2006 Guidelines Volume 4 Chapter 4. Mangrove uses 0.451 in the restoration method.'],
      ['<strong>CO&#8322; per Carbon</strong>', '44 / 12', 'Molecular weight ratio, tonnes of carbon dioxide equivalent per tonne of carbon. Equal to 3.67.'],
      ['<strong>Root-to-Shoot Ratio</strong>', '0.28', 'Derives below-ground from above-ground biomass in the avoided-emissions component. The restoration method uses per-ecosystem ratios instead.'],
      ['<strong>Baseline Rate Window</strong>', '10 years', 'The window the deforestation rate is measured over. Longer project durations extrapolate beyond it and are flagged.']
    ])}
    ${docCaption('Table 30. Constants used throughout the climate components.')}

    <h3>Reduced emissions from deforestation and degradation</h3>
    <p>How much carbon dioxide equivalent a Protect project could keep out of the atmosphere over its lifetime. This is the avoided unplanned deforestation case: loss driven by diffuse, unsanctioned pressure, which is why the baseline comes from a spatial risk model rather than from a document. Avoided planned deforestation is a different construct with a different baseline and is not what this component estimates. There are four steps.</p>
    ${docFormula('Avoided emissions, in four steps',
      ['Step 1. Eligible protection area: Total Protect Area (ha) = Sum ( pixels designated Protect and pixels carrying a risk value )',
       'Step 2. Project the baseline forward: Projected Loss (ha) = Total Protect Area &times; ( 1 &minus; e<sup>&minus;rt</sup> )',
       'Step 3. Allocate the projected loss spatially: rank eligible pixels by deforestation risk, highest first, then select down that list until the selected area equals Projected Loss.',
       'Step 4. Convert the carbon standing on those pixels: Avoided Emissions (tCO&#8322;e) = Sum [ AGB Density &times; ( 1 + Root-to-Shoot Ratio ) &times; Carbon Fraction &times; 44 / 12 &times; Pixel Area ]'],
      [['AGB Density', 'Above-ground dry biomass on the pixel, in megagrams per hectare.'],
       ['1 + Root-to-Shoot Ratio', '1.28, which adds below-ground biomass because no root layer is mapped.'],
       ['Carbon Fraction', '0.47, the share of dry biomass that is carbon.'],
       ['44 / 12', 'Converts carbon to carbon dioxide equivalent.'],
       ['Sum', 'Summed over the pixels selected in step 3.']],
      'IPCC 2006 Guidelines, Volume 4, Chapter 4, for the carbon fraction and root-to-shoot ratio; Puyravaud (2003) for the rate.')}
    ${docSays('Protecting this [ecosystem] ecosystem can avoid an estimated [X] tonnes of CO&#8322;eq emissions over the project&rsquo;s [t] year duration.')}
    ${docCaution('The earlier v2b methodology documentation prints the final factor in step 4 as 44 divided by 7. The correct and implemented factor is 44 divided by 12. Using 44 divided by 7 would overstate the result by roughly 70 percent.')}
    <p>The component runs on the Protect area, but Protect is the input it runs on, not what it measures: the output is an avoided-emission estimate. It also gates on the activity catalogue, so quantification runs only where the project area holds at least one Protect-pathway activity flagged for avoided emissions.</p>

    <h3>Increased carbon sequestration and storage</h3>
    <p>The carbon a restoration project could remove over its lifetime, as an ex-ante estimate. The method is the reference-rate approach applied per hectare and summed over eligible pixels. Growth runs in two phases, young in years 1 to 20 and old in years 21 to 40, at rates given per ecosystem and, for dryland, per climatic zone.</p>
    ${docFormula('Per hectare, then summed',
      ['AGB Cumulative (Mg/ha) = ( Growth Rate<sub>young</sub> &times; Years<sub>young</sub> ) + ( Growth Rate<sub>old</sub> &times; Years<sub>old</sub> )',
       'Total Biomass Cumulative (Mg/ha) = AGB Cumulative &times; ( 1 + Root-to-Shoot Ratio )',
       'CO&#8322;e Cumulative (tCO&#8322;e/ha) = Total Biomass Cumulative &times; Carbon Fraction &times; 44 / 12',
       'Net CO&#8322;e (tCO&#8322;e/ha) = maximum of 0 and ( CO&#8322;e Cumulative &minus; Baseline CO&#8322;e )',
       'Adjusted Net CO&#8322;e = Net CO&#8322;e &times; Stocking Factor',
       'Total Project Removal (tCO&#8322;e) = Sum ( Adjusted Net CO&#8322;e &times; Pixel Area )',
       'Low Estimate = Total Project Removal &times; 0.70',
       'High Estimate = Total Project Removal &times; 1.20'],
      [['Growth Rate', 'Reference accumulation rate in megagrams of dry matter per hectare per year, from Table 31.'],
       ['Years<sub>young</sub>, Years<sub>old</sub>', 'Years of the project duration falling in years 1 to 20 and 21 to 40 respectively.'],
       ['Baseline CO&#8322;e', 'The biomass already standing on the site, deducted so only additional growth is credited.'],
       ['Stocking Factor', 'A multiplier representing tree density. Active planting reaches full stocking at 1.0; Assisted Natural Regeneration and ecological mangrove restoration are estimated at 0.8.']],
      'IPCC 2006 Guidelines, Volume 4, for carbon fractions and root-to-shoot ratios; Walsh (1996) for the dry-month threshold. The reference document names no source for the growth rates in Table 31.')}
    ${docTable(['Ecosystem or zone', 'Young, years 1 to 20', 'Old, years 21 to 40', 'Root-to-shoot ratio', 'Carbon fraction'], [
      ['<strong>Mangrove</strong>', '12.0', '7.0', '0.39', '0.451'],
      ['<strong>Peatland</strong>', '5.7', '3.5', '0.25', '0.47'],
      ['<strong>Dryland, humid lowland</strong>', '3.4', '2.7', '0.21', '0.47'],
      ['<strong>Dryland, seasonal lowland</strong>', '2.4', '2.0', '0.44', '0.47'],
      ['<strong>Dryland, humid montane</strong>', '2.4', '1.9', '0.32', '0.47']
    ])}
    ${docCaption('Table 31. Reference accumulation rates, in megagrams of dry matter per hectare per year, with the root-to-shoot ratio and carbon fraction used for each.')}
    <p>The dryland zone is derived per pixel from elevation and the twelve monthly precipitation bands, so one trajectory category can carry three different rates across a single project area.</p>
    ${docTable(['Order', 'Condition', 'Zone assigned'], [
      ['1', 'Elevation above 1,000 m', 'Humid montane'],
      ['2', 'Annual rainfall above 2,000 mm and fewer than three dry months', 'Humid lowland'],
      ['3', 'Everything else, including boundary and missing-data pixels', 'Seasonal lowland, the conservative default']
    ])}
    ${docCaption('Table 32. Dryland climatic zone assignment, evaluated in order. A dry month here is one below 100 mm (Walsh, 1996), a different threshold from the 60 mm used by the savanna rule in Phase 4a.')}
    <p>The baseline deducted at step 4 is class-based: a small assumed standing biomass per current ecological state, 25 Mg per hectare for C4, 5 for C5 and 0 for C6, converted through the same chain and clamped at zero. This replaced a per-pixel biomass baseline, which zeroed almost all vegetated Restore land because the source reads a high baseline at low biomass. The per-pixel baseline and the gross figure are still computed and reported alongside for comparison.</p>
    ${docSays('Restoring and sustainably managing this [ecosystem] ecosystem can sequester an estimated [X] tonnes of CO&#8322;eq over the project&rsquo;s [t] years duration.')}
    ${docNote('The eligibility gate is the method&rsquo;s own pair list, not the catalogue carbon flag, because the two currently disagree. Restore categories 3B, 4B, 5, 8C and 10 qualify on dryland, mangrove and peatland. Category 9B qualifies on mangrove only, because on peat it is rewetting without planting. Savanna is deferred throughout. Peatland is, at the time of writing, temporarily excluded by team decision even though the rates exist. This pair list uses the category codes from before the November 2026 decision matrix (Table 24): 4B is now Manage, 9B is merged into 9C, and Categories 6 and 10 are split, so the list has to be reconciled with the matrix in the same way as the catalogue.')}
    ${docCaution('The low and high figures are simply the total multiplied by 0.70 and 1.20. They are an indicative screening range, not a confidence interval and not a creditable volume. Beyond year 40 nothing further is credited, because the curve is defined only that far. No-data above-ground biomass counts as a zero baseline, which over-credits, the opposite direction to the equivalent rule on the avoided-emissions side. And even where peat is enabled the estimate is biomass only: peat soil carbon and avoided emissions from rewetting, usually the largest peat pool, stay out of scope.')}`,
    'phase5-climate') +

  docSection('Assumptions, methodology and disclaimer', `
    <p>Method information sits inside each benefit card, behind an information button; the interface has no separate methodology page. The benefit view carries one standing disclaimer: the quantifiable benefits are limited by the lack of adequate project-level data, and benefits can be quantified with data collected following the monitoring plan guidance.</p>`,
    'phase5-assumptions') +

  docSection('Implementation status', `
    ${docTable(['Component', 'Pillar', 'Status'], [
      ['General benefit listing, from activity benefit tags merged per pathway', 'All three', 'Implemented'],
      ['Avoided emissions from unplanned deforestation', 'Climate', 'Implemented'],
      ['Carbon removal from restoration, ex-ante', 'Climate', 'Implemented. Class baseline values are placeholders pending literature references'],
      ['Net emission reduction, net sequestration, net emission reductions and removals', 'Climate', 'Implemented, on user-supplied deductions'],
      ['Maintenance of ecological connectivity', 'Nature', 'Specified in the interface. Morphological class codes documented in WRI Indonesia (2026c)'],
      ['Enhanced biodiversity, threatened species habitat, biodiversity uplift', 'Nature', 'Specified with formulas. Habitat components read the habitat rasters directly'],
      ['Protection of watershed function', 'Nature and People', 'Narrative only, by ecosystem type'],
      ['Manage-side carbon', 'Climate', 'Not started'],
      ['All other People components', 'People', 'Qualitative by design']
    ])}
    ${docCaption('Table 33. What is quantified today, from the benefit notebook and the data status checklist.')}`,
    'phase5-status');
}


/* ============================================================================
   PHASES 6 AND 7 — AFTER THE ANALYSIS (DEC-43)
   The methodology document ends at potential benefit, so these two articles
   are NOT transcriptions. Phase 6 reads the activity and indicator catalogue
   live (f05-shared.js); Phase 7 describes the F03 templates in js/f03-app.js,
   which this page does not load, so that article is prose and says so.
   ========================================================================== */
const BUILD_SOURCE = what => `<p class="doc-source">Source: ${what}.</p>`;

/* ------------------------------------------- Phase 6: the Monitoring Plan */
function docsPhase6() {
  const I = docParam('indicators', null);
  const meta = I && I.meta ? I.meta : null;
  const freqRows = I ? Object.entries(I.frequencies)
    .sort((a, b) => b[1] - a[1])
    .map(([f, n]) => [`<strong>${docEsc(f)}</strong>`, `<span class="num">${n}</span>`]) : [];
  const indRows = meta ? Object.keys(meta).sort().map(k =>
    [`<strong>${docEsc(k)}</strong>`, docEsc(meta[k].source || '—'), docEsc(meta[k].freq || '—')]) : [];

  return docHero(G_PHASES + ' &middot; Phase 6', 'Monitoring planning',
    'The Monitoring Plan changes the activities chosen for a project into a list of things to measure in the field. Each indicator has a suggested monitoring method and a frequency. This page explains how the tool makes that list. The Data Analyser ends at potential benefit. Thus this page describes a framework, not a calculation: the activity and indicator catalogue that the tool uses.',
    []) +

  docSection('Where each indicator comes from', `
    <p>Every indicator in a plan traces back to an activity chosen for the project. The tool adds nothing that is not attached to one.</p>
    ${docFlow([
      ['1', 'Activity',             'Chosen by ecosystem and pathway'],
      ['2', 'Benefit',              'What the activity is expected to deliver'],
      ['3', 'Indicator',            'What measures that benefit'],
      ['4', 'Method and frequency', 'One suggestion per indicator']
    ])}
    <p>The activities and benefits come from the same catalogue Phase 4b offers when activities are selected, described in <em>Activity selection</em>. The full chain from trajectory to indicator is drawn in the activities matrix.</p>
    ${docCallout('One indicator can measure more than one benefit', 'Forest carbon stock, for example, measures both reduced emissions from deforestation and increased carbon sequestration. Read the indicator count as the number of distinct measurements, not the number of benefits.', 'note')}
    ${BUILD_SOURCE('the activity and indicator catalogue')}`,
    'phase6-chain') +

  docSection('What you decide, step by step', `
    ${docTable(['Step', 'What the tool does', 'What you decide'], [
      ['<strong>1 &middot; Define NbS activities</strong>', 'Lists the activities for each ecosystem and pathway.', 'Which activities the project will carry out. At least one is required.'],
      ['<strong>2 &middot; Define monitoring indicators</strong>', 'Generates the recommended indicators for those activities, each with a data source and a monitoring frequency.', 'Review the list, filtered by ecosystem, pathway or benefit type.'],
      ['<strong>3 &middot; Review and finalise</strong>', 'Assembles the plan and its summary.', 'Adjust indicators, methods and frequencies; assign responsibilities; add local context, assumptions and evidence; set the duration for each ecosystem; then generate the plan.']
    ])}
    ${BUILD_SOURCE('the Monitoring Plan screen')}`,
    'phase6-steps') +

  docSection('How often each indicator is measured', `
    <p>Each indicator carries one suggested frequency. These counts are read from the catalogue the tool uses:</p>
    ${freqRows.length ? docTable(['Frequency', 'Indicators'], freqRows)
                      : docCallout('Missing', docTodo('indicator frequencies not readable'), 'warn')}
    ${indRows.length ? docDetails(`All ${indRows.length} indicators, with their suggested method and frequency`, docTable(['Indicator', 'Suggested method', 'Frequency'], indRows)) : ''}`,
    'phase6-frequency') +

  docSection('Alignment with the ASEAN NbS Framework', `
    <p>The Monitoring Plan is designed to align with the ASEAN NbS Framework, which is under review for ASEAN endorsement.</p>
    ${docNote('The catalogue does not yet record which Framework indicator each entry corresponds to, so this page cannot show that mapping.')}`,
    'phase6-framework') +

  docSection('What a generated plan is not', `
    ${docCallout('A draft to adapt, not a monitoring design', 'A generated plan is an automatically generated draft. Field verification, stakeholder consultation and a data-quality review are required before formal reporting. The methods are suggestions: the plan does not set sample sizes, plot locations or a budget, and it does not by itself meet the monitoring requirements of any carbon standard.', 'warn')}`,
    'phase6-limits');
}

/* ------------------------------------------- Phase 7: generated documents */
function docsPhase7() {
  return docHero(G_PHASES + ' &middot; Phase 7', 'Generate documents',
    'The Document Generator changes a saved analysis and your answers into project documents that you can edit. This page explains what goes into each document and where each part comes from. The Document Generator does no calculation. Thus this page describes a framework: the templates that the tool uses.',
    []) +

  docSection('Three sources of content', `
    ${docTable(['Source', 'What it supplies', 'How it appears in the form'], [
      ['<strong>Your saved analysis</strong>',
       'A first draft of the narrative the analysis can support: the project summary, the without-project baseline, the leakage assessment, the stakeholder groups, the expected community impacts, and the biodiversity condition of the site.',
       'Pre-filled and marked as generated from project data. Every pre-filled field can be edited.'],
      ['<strong>You</strong>',
       'Everything the analysis cannot know: land tenure, the standard and version you are writing for, the crediting period, implementation and monitoring dates, the consent (FPIC) process, benefit-sharing and grievance arrangements, and all the socio-economic data in the Feasibility Document.',
       'Empty fields with guidance text.'],
      ['<strong>The template</strong>',
       'The section structure and headings of the chosen template.',
       'Fixed.']
    ])}
    <p>Project data you add yourself is held under the privacy level chosen for the project.</p>
    ${BUILD_SOURCE('the Document Generator')}`,
    'phase7-sources') +

  docSection('The two templates', `
    ${docTable(['Template', 'Sections', 'Pre-filled from the analysis'], [
      ['<strong>CCB project document</strong><br><small>Climate, Community &amp; Biodiversity Standards; you choose the version and any paired carbon standard</small>',
       'Basic information · General description · Climate and carbon accounting · Community impacts · Nature and biodiversity, including flora and fauna inventories',
       'Project summary · baseline scenario · leakage assessment · stakeholder groups · community impacts · existing and current biodiversity condition'],
      ['<strong>Socio-economic Feasibility Document</strong>',
       'Demography · Social · Economics · Housing and settlements · Governance',
       'None. These figures come from you and your own field data.']
    ])}
    ${BUILD_SOURCE('the Document Generator')}`,
    'phase7-templates') +

  docSection('The three planned deliverables', `
    <p>Version 3 plans three project deliverables. This is where each one is produced today:</p>
    ${docTable(['Deliverable', 'Where it is produced'], [
      ['<strong>Project Summary</strong>', 'Not available yet.'],
      ['<strong>Feasibility Document</strong>', 'The socio-economic Feasibility Document template, above'],
      ['<strong>Monitoring Plan</strong>', `The Monitoring Plan screen, described in ${docJump('Phase 6 · Monitoring planning', 'phase6')}`]
    ])}`,
    'phase7-deliverables') +

  docSection('What you receive', `
    <p>The document is generated as an editable Word file (.docx) and sent to the email address on the account. It can be generated before every field is answered; the gaps can then be completed in Word, or later from the project dashboard.</p>
    ${docCallout('A generated document is a starting draft', 'Pre-filled text is written from screening estimates and carries their limits; see ' + docJump('Known issues and limitations', 'limitations') + '. A CCB document produced here has not been validated against the CCB Standards. That requires independent validation under the standard.', 'warn')}`,
    'phase7-output');
}



/* ---------------------------------------- Outputs, limitations and sources */
function docsOutputs() {
  return docHero(G_OUTPUTS, 'Outputs',
    'Finishing the analysis offers three next steps. The forward button reads &ldquo;Continue to the Feasibility Study Template&rdquo;. You can reopen the same choices from the Data Analyser panel at any time.') +

  docSection('The three exits', `
    ${docTable(['Option', 'What it does', 'Guest status'], [
      ['<strong>Save to my Project</strong>', 'Stores the polygon and the full analysis to the account portfolio.', 'Opens a login dialog'],
      ['<strong>Generate Document (Feasibility)</strong>', 'Builds the pre-feasibility study document, including the complete administrative and land cover breakdowns that the panels only summarise.', 'Disabled until saved'],
      ['<strong>Create Monitoring Plan</strong>', 'Select activities and metric indicators to track over time.', 'Disabled until saved']
    ])}
    ${docCaption('Table 34. The three exits and their availability in a guest session.')}
    <p>Every phase writes a result file keyed to the project boundary, and each saved result records the inputs it was produced with, including the project duration. A phase can therefore be re-run without re-running the ones before it.</p>
    <p>In the interface workflow, the Monitoring Plan and the Document Generator follow the analysis. The reference methodology does not document either of them, because both reuse the saved results above rather than computing new ones. Their framework pages are ${docJump('Phase 6 · Monitoring planning', 'phase6')} and ${docJump('Phase 7 · Generate documents', 'phase7')}.</p>`,
    'outputs');
}

function docsTroubleshooting() {
  return docHero(G_OUTPUTS, 'Troubleshooting',
    'This page lists symptoms that occurred in a live run. It tells you what each symptom means.') +

  docSection('Symptoms and causes', `
    ${docTable(['Symptom', 'Cause and resolution'], [
      ['<strong>The area is too big. You can only analyse up to 100,000 ha.</strong>', 'Sign in for the 500,000 ha tier, or split the polygon. A 580,023 ha test polygon was refused outright, because it exceeds even the signed-in cap.'],
      ['<strong>The reported area looks wrong by a wide margin</strong>', 'The .prj is missing from the zip, or the shapefile is in a projected coordinate system the tool misreads. Reproject to WGS 84 geographic and re-zip all four component files together.'],
      ['<strong>A small difference between the confirm-card area and a downstream ecosystem total</strong>', `Expected. The two use different equal-area routes, as described under ${docJump('Phase 1', 'phase1#phase1-notes')}. A large difference is not expected and is worth reporting.`],
      ['<strong>Panels sit empty or spin indefinitely</strong>', 'Sections load as the panel is scrolled. Scroll each tab slowly to the bottom, and expand collapsed benefit cards one at a time rather than several at once.'],
      ['<strong>Data not available on key species presence</strong>', 'Expected, not a fault. Occurrence coverage is patchy across Southeast Asia. Treat absence as no record, never as no species.'],
      ['<strong>A pathway reports as Non-eligible</strong>', 'That ecosystem is absent from the polygon, or it has no eligible hectares for that pathway. Check the ecosystem split and the trajectory categories before assuming a fault.'],
      ['<strong>One coarse layer reports a single class for the whole site</strong>', `The project area is smaller than a few cells of that layer. See the caution under ${docJump('Phase 1', 'phase1#phase1-notes')} for which layers are affected first.`],
      ['<strong>Generate Document and Create Monitoring Plan are unavailable</strong>', 'Save the project first, which requires an account. Both unlock from the portfolio afterwards.'],
      ['<strong>The analysis resets</strong>', 'State survives navigating back and forward through the phases but does not survive a page reload. Do not reload mid-run.']
    ])}
    ${docCaption('Table 35. Symptoms observed in a live run, and what each one means.')}`,
    'troubleshooting');
}

function docsWorkedExample() {
  return docHero(G_OUTPUTS, 'Worked example',
    'This page shows one complete guest run. The run stays here as a reference for what the full chain produces, end to end. The figures are the tool&rsquo;s own output for this polygon and these settings. A different polygon or different settings give different results.') +

  docSection('The run', `
    ${docTable(['Result', 'Value'], [
      ['<strong>Area accepted</strong>', '67,439.02 ha, within the 100,000 ha guest cap'],
      ['<strong>Ecosystem composition</strong>', 'Dryland forest 98.76%, other 1.24%. No mangrove or peatland'],
      ['<strong>Protected area overlap</strong>', '6,676.96 ha, Gunung Nyiut Penrissen'],
      ['<strong>Key Biodiversity Area overlap</strong>', '14,316.72 ha, Gunung Niut-Poteng'],
      ['<strong>Deforestation 2014 to 2024</strong>', '10,480.36 ha lost, 2.42% per year; top 30.81% of national forest by risk'],
      ['<strong>Disturbance</strong>', '13,101.84 ha (19.7%)'],
      ['<strong>Forest landscape integrity</strong>', '4.53 of 10, low integrity: 0% high, 44.94% medium, 55.06% low'],
      ['<strong>Carbon stock</strong>', '81,218,608 tCO&#8322;e; soil organic carbon 66.4%, above-ground biomass 26.3%, below-ground biomass 7.4%'],
      ['<strong>Pathways eligible</strong>', 'Protect 38,345.93 ha (57.58%), Manage 6,063.41 ha (9.1%), Restore 16,445.83 ha (24.69%)'],
      ['<strong>Settings used</strong>', 'Protect and Restore selected, 3 of 6 activities, 30 years, carbon project on, deductions left at 15, 10 and 12%'],
      ['<strong>Gross avoided emissions</strong>', '8,714,731 tCO&#8322;e'],
      ['<strong>Gross removals</strong>', '2,320,758 tCO&#8322;e, indicative range 1,624,531 to 2,784,910'],
      ['<strong>Net carbon emission reduction</strong>', '8,714,731 &minus; 1,307,210 &minus; 871,473 &minus; 1,045,768 = 5,490,280 tCO&#8322;e'],
      ['<strong>Net carbon sequestration</strong>', '2,320,758 &minus; 348,114 &minus; 232,076 &minus; 278,491 = 1,462,078 tCO&#8322;e'],
      ['<strong>Net emission reductions and removals</strong>', '11,035,489 gross, less leakage and uncertainty = 7,283,423 tCO&#8322;e over 30 years, about 242,781 per year'],
      ['<strong>Nature results</strong>', '38,334 ha kept connected, of which 704 ha is corridor; 18,030 ha of suitable habitat safeguarded; 21 threatened species with reduced risk; 113 species with expanded habitat']
    ])}
    ${docCaption('Table 36. Guest run of 11 September 2026. Area of interest: a zipped shapefile covering 110.15 to 110.38 degrees east and 0.67 to 0.91 degrees north, in Sanggau and Landak districts, Kalimantan Barat. The run predates the November 2026 decision matrix, so its pathway areas would differ under the current rules.')}`,
    'worked-example') +

  docSection('Reading the carbon figures', `
    <p>Two features of this run are worth noticing. The three net carbon figures differ because the buffer is applied differently in each, as described under ${docJump('Phase 5', 'phase5#phase5-net')}. And the interface reported the carbon stock in tonnes of carbon dioxide equivalent while the backend reports that stock in tonnes of carbon, so the unit label has to be read before the figure is quoted.</p>`,
    'worked-example-carbon');
}

function docsLimitations() {
  return docHero(G_OUTPUTS, 'Known issues and limitations',
    'The tool is a pre-feasibility screen. Almost every panel says so, with the line &ldquo;field verification required&rdquo;. Nothing on this page replaces a ground survey, tenure due diligence, or a methodology-compliant baseline. The items on this page are the items most likely to cause a person to quote a figure incorrectly.') +

  docSection('Inconsistencies between the documentation and the implementation', `
    ${docTable(['Item', 'Reading to use'], [
      ['The narrative printed under net emission reductions and removals states that the figure does not yet subtract the buffer, while the code that produces it does subtract the buffer.', 'Treat the figure as buffer-deducted and disregard the sentence. Do not quote that narrative to a third party.'],
      ['Section 8.4.2 of the documentation prints the carbon dioxide conversion factor as 44 divided by 7.', 'The implemented and correct factor is 44 divided by 12.'],
      ['Site characterisation reports carbon stock in tonnes of carbon; the interface card shows tonnes of carbon dioxide equivalent.', 'Read the unit label. The factor between them is 3.67.'],
      ['Phase 1 area: the documentation specifies reprojection to ESRI:54034; the notebook integrates geodesic pixel areas on the pathway grid.', 'Both are equal-area. Expect a small difference, not a large one.'],
      ['The activity catalogue&rsquo;s carbon sequestration flag contradicts the restoration method on peat and on savanna.', 'The backend ignores the catalogue flag and uses the method&rsquo;s own eligible-pair list. The catalogue is the thing to reconcile.'],
      ['The interface specifies a five-level disaster risk scale; the wired rasters carry four levels.', 'Read the legend that the tool renders, not the design specification.'],
      ['The class-based restoration baseline values, 25, 5 and 0 Mg per hectare, are placeholders pending literature references.', 'The removal figure scales with these values, so treat it as indicative until they are set.'],
      ['The biodiversity uplift implementation adds the degradation rate to the gain rate.', 'This inflates the uplift on fast-degrading sites. Use it as a screening unit, not as a credit.'],
      [`The ${docJump('activity catalogue', 'phase4b#activity-catalogue')} (Table 26) predates the November 2026 decision matrix: it still lists 4B as Restore, Category 6 as a single Manage row, 9B as its own row and Category 10 as one row.`, 'Use the decision matrix for the pathway and treat the catalogue rows for the changed categories as provisional until they are reconciled.'],
      ['The GUI Design Document v3.1 lists the Forest Landscape Integrity Index as the global 2020 product; this document describes a layer recalibrated on the Southeast Asia distribution.', 'Confirm which layer is wired before quoting a score, and present it as the regional forest integrity layer.']
    ])}
    ${docCaption('Table 37. Open inconsistencies, with the reading to use until each is reconciled.')}`,
    'limitations-inconsistencies') +

  docSection('Method limitations to carry into any report', `
    <ul>
      <li><strong>Ecosystem boundaries are indicative.</strong> The ecosystem layer is a composite of datasets at different scales and methods, and the tool names peat and mangrove edges as the least certain. That matters most where the carbon answer hinges on whether the soil is peat.</li>
      <li><strong>The reference ecosystem is modelled, not observed,</strong> and it is the single input that decides whether open land reads as degraded forest or as healthy savanna. Dryland forest is the default reference, so a naturally open system that the savanna rule misses is read as degraded forest.</li>
      <li><strong>Carbon is modelled twice over.</strong> Above-ground biomass is a modelled estimate with per-pixel uncertainty, reliable as an area total and weak for any single pixel. Below-ground biomass is not mapped at all but derived from a fixed ratio. On the removals side the growth rates are published reference rates rather than site data.</li>
      <li><strong>Deforestation risk is a ranking, not a rate.</strong> A statement such as &ldquo;top 30 percent of the country&rsquo;s forest&rdquo; is a relative percentile from a model whose accuracy is reported in-sample only, without independent or out-of-time validation. It is not a calibrated annual probability and must not be used as one in a baseline.</li>
      <li><strong>Disturbance and forest loss are different quantities that overlap.</strong> Disturbance is structural decline within standing forest; loss is clearance. They coexist in the same polygon, so they must never be added.</li>
      <li><strong>Terrain comes from a surface model.</strong> SRTM is a digital surface model, so under closed canopy the elevation is the top of the trees, and the derived slope inherits that error plus resolution smoothing.</li>
      <li><strong>Socio-economic figures are jurisdiction-wide.</strong> Only the population grid and the vulnerability composite describe the project area. Everything else on the People tab describes a province, a region or a whole country, under that country&rsquo;s own definitions, and is comparable only within its own national series.</li>
      <li><strong>Administrative, protected area and Key Biodiversity Area boundaries are reference layers.</strong> The tool states they are not legal sources for jurisdiction, tenure, or protection status.</li>
      <li><strong>Carbon ineligible is an answer, not a gap.</strong> It means no carbon project is credible on that land under the current framework. Non-carbon interventions may still exist, and the area is reported with its reason rather than hidden, which is what due diligence requires.</li>
    </ul>`,
    'limitations-method');
}

function docsSources() {
  return docHero(G_OUTPUTS, 'References',
    'This page lists every data set and published method that the reference methodology cites.') +

  docSection('References', `
    <p>Entries follow APA 7th edition. Group authors are abbreviated in the tables: ADPC, Asian Disaster Preparedness Center; BRGM, Badan Restorasi Gambut dan Mangrove; ESDM, Kementerian Energi dan Sumber Daya Mineral; IGES, Institute for Global Environmental Strategies; KLHK, Kementerian Lingkungan Hidup dan Kehutanan; WCS, Wildlife Conservation Society. Where a data set has no publication date, the year is the data vintage recorded in the NbS Tool v3 data catalogue. Layers produced by WRI Indonesia for the SCeNe Coalition are cited to their technical notes, WRI Indonesia (2026a to 2026e), and the remaining derived layers are cited as one data set, WRI Indonesia (2025).</p>
    <ul>
      <li>Asian Disaster Preparedness Center. (2024a). [Harmonised hazard, vulnerability and risk layers for Southeast Asia: flood, typhoon, landslide, drought and fire] [Unpublished data set]. SERVIR Southeast Asia.</li>
      <li>Asian Disaster Preparedness Center. (2024b). [Regional Land Cover Monitoring System land cover 2024, forest cover 2014 and 2024, and forest and mangrove change 2014–2024 for Southeast Asia] [Unpublished data set and technical documentation]. SERVIR Southeast Asia, for the UK PACT ASEAN-NbS Tool project. Distributed through SIGnal.</li>
      <li>Astiani, D., Burhanuddin, Curran, L. M., Mujiman, &amp; Salim, R. (2017). Effects of drainage ditches on water table level, soil conditions and tree growth of degraded peatland forests in West Kalimantan. Indonesian Journal of Forestry Research, 4(1), 15–25. <a href="https://doi.org/10.20886/ijfr.2017.4.1.15-25">https://doi.org/10.20886/ijfr.2017.4.1.15-25</a></li>
      <li>Badan Restorasi Gambut dan Mangrove. (2022). [Peatland drainage canal density, Indonesia] [Data set].</li>
      <li>BirdLife International. (2023). World database of Key Biodiversity Areas (March 2023 version) [Data set]. KBA Partnership. <a href="http://keybiodiversityareas.org/kba-data/request">http://keybiodiversityareas.org/kba-data/request</a></li>
      <li>Bondarenko, M., Priyatikanto, R., Tejedor-Garavito, N., Zhang, W., McKeen, T., Cunningham, A., Woods, T., Hilton, J., Cihan, D., Nosatiuk, B., Brinkhoff, T., Tatem, A., &amp; Sorichetta, A. (2025). Constrained estimates of 2015–2030 total number of people per grid square at a resolution of 3 arc seconds (approximately 100 m at the equator) (Release R2025A, Version 1) [Data set]. WorldPop, University of Southampton. <a href="https://doi.org/10.5258/SOTON/WP00839">https://doi.org/10.5258/SOTON/WP00839</a></li>
      <li>Bourgoin, C., Ceccherini, G., Girardello, M., Vancutsem, C., Avitabile, V., Beck, P. S. A., Beuchle, R., Blanc, L., Duveiller, G., Migliavacca, M., Vieilledent, G., Cescatti, A., &amp; Achard, F. (2024). Human degradation of tropical moist forests is greater than previously estimated. Nature, 631(8021), 570–576. <a href="https://doi.org/10.1038/s41586-024-07629-0">https://doi.org/10.1038/s41586-024-07629-0</a></li>
      <li>Brooks, T. M., Pimm, S. L., Akçakaya, H. R., Buchanan, G. M., Butchart, S. H. M., Foden, W., Hilton-Taylor, C., Hoffmann, M., Jenkins, C. N., Joppa, L., Li, B. V., Menon, V., Ocampo-Peñuela, N., &amp; Rondinini, C. (2019). Measuring terrestrial area of habitat (AOH) and its utility for the IUCN Red List. Trends in Ecology &amp; Evolution, 34(11), 977–986. <a href="https://doi.org/10.1016/j.tree.2019.06.009">https://doi.org/10.1016/j.tree.2019.06.009</a></li>
      <li>Brown, C. F., Kazmierski, M. R., Pasquarella, V. J., Rucklidge, W. J., Samsikova, M., Zhang, C., Shelhamer, E., Lahera, E., Wiles, O., Ilyushchenko, S., Gorelick, N., Zhang, L. L., Alj, S., Schechter, E., Askay, S., Guinan, O., Moore, R., Boukouvalas, A., &amp; Kohli, P. (2025). AlphaEarth Foundations: An embedding field model for accurate and efficient global mapping from sparse label data (arXiv:2507.22291). arXiv. <a href="https://doi.org/10.48550/arXiv.2507.22291">https://doi.org/10.48550/arXiv.2507.22291</a></li>
      <li>Bruno Manser Fonds. (2023). [Indigenous community territory maps, Sarawak] [Data set].</li>
      <li>Bunting, P., Rosenqvist, A., Hilarides, L., Lucas, R. M., Thomas, N., Tadono, T., Worthington, T. A., Spalding, M., Murray, N. J., &amp; Rebelo, L.-M. (2022). Global mangrove extent change 1996–2020: Global Mangrove Watch version 3.0. Remote Sensing, 14(15), 3657. <a href="https://doi.org/10.3390/rs14153657">https://doi.org/10.3390/rs14153657</a></li>
      <li>Cook-Patton, S. C., Drever, C. R., Griscom, B. W., Hamrick, K., Hardman, H., Kroeger, T., Pacheco, P., Raghav, S., Stevenson, M., Webb, C., Yeo, S., &amp; Ellis, P. W. (2021). Protect, manage and then restore lands for climate mitigation. Nature Climate Change, 11(12), 1027–1034. <a href="https://doi.org/10.1038/s41558-021-01198-0">https://doi.org/10.1038/s41558-021-01198-0</a></li>
      <li>Dadap, N. C., Hoyt, A. M., Cobb, A. R., Oner, D., Kozinski, M., Fua, P. V., Rao, K., Harvey, C. F., &amp; Konings, A. G. (2021). Drainage canals in Southeast Asian peatlands increase carbon emissions. AGU Advances, 2(1), e2020AV000321. <a href="https://doi.org/10.1029/2020AV000321">https://doi.org/10.1029/2020AV000321</a></li>
      <li>De Frenne, P., Zellweger, F., Rodríguez-Sánchez, F., Scheffers, B. R., Hylander, K., Luoto, M., Vellend, M., Verheyen, K., &amp; Lenoir, J. (2019). Global buffering of temperatures under forest canopies. Nature Ecology &amp; Evolution, 3(5), 744–749. <a href="https://doi.org/10.1038/s41559-019-0842-1">https://doi.org/10.1038/s41559-019-0842-1</a></li>
      <li>Dobos, E., Daroussin, J., &amp; Montanarella, L. (2005). An SRTM-based procedure to delineate SOTER terrain units on 1:1 and 1:5 million scales (EUR 21571 EN). Office for Official Publications of the European Communities.</li>
      <li>Dubayah, R. O., Armston, J., Kellner, J. R., Duncanson, L., Healey, S. P., Patterson, P. L., Hancock, S., Tang, H., Bruening, J., Hofton, M. A., Blair, J. B., &amp; Luthcke, S. B. (2022). GEDI L4A footprint level aboveground biomass density (Version 2.1) [Data set]. ORNL DAAC. <a href="https://doi.org/10.3334/ORNLDAAC/2056">https://doi.org/10.3334/ORNLDAAC/2056</a></li>
      <li>Farr, T. G., Rosen, P. A., Caro, E., Crippen, R., Duren, R., Hensley, S., Kobrick, M., Paller, M., Rodriguez, E., Roth, L., Seal, D., Shaffer, S., Shimada, J., Umland, J., Werner, M., Oskin, M., Burbank, D., &amp; Alsdorf, D. (2007). The Shuttle Radar Topography Mission. Reviews of Geophysics, 45(2), RG2004. <a href="https://doi.org/10.1029/2005RG000183">https://doi.org/10.1029/2005RG000183</a></li>
      <li>Funk, C., Peterson, P., Landsfeld, M., Pedreros, D., Verdin, J., Shukla, S., Husak, G., Rowland, J., Harrison, L., Hoell, A., &amp; Michaelsen, J. (2015). The climate hazards infrared precipitation with stations—a new environmental record for monitoring extremes. Scientific Data, 2, 150066. <a href="https://doi.org/10.1038/sdata.2015.66">https://doi.org/10.1038/sdata.2015.66</a></li>
      <li>GADM. (2022). GADM database of global administrative areas (Version 4.1) [Data set]. <a href="https://gadm.org">https://gadm.org</a></li>
      <li>Gaisberger, H., Fremout, T., Kettle, C. J., Vinceti, B., Kemalasari, D., Kanchanarak, T., Thomas, E., Serra-Diaz, J. M., Svenning, J.-C., Slik, F., Eiadthong, W., Palanisamy, K., Ravikanth, G., Bodos, V., Sang, J., Warrier, R. R., Wee, A. K. S., Elloran, C., Ramos, L. T., … Jalonen, R. (2022). Tropical and subtropical Asia’s valued tree species under threat. Conservation Biology, 36(3), e13873. <a href="https://doi.org/10.1111/cobi.13873">https://doi.org/10.1111/cobi.13873</a></li>
      <li>GBIF.org. (2025). GBIF home page. <a href="https://www.gbif.org">https://www.gbif.org</a></li>
      <li>GBIF.org. (2026, October 12). GBIF occurrence download [Data set]. <a href="https://doi.org/10.15468/dl.bkcxj4">https://doi.org/10.15468/dl.bkcxj4</a></li>
      <li>Giglio, L., Justice, C., Boschetti, L., &amp; Roy, D. (2021). MODIS/Terra+Aqua burned area monthly L3 global 500m SIN grid V061 [Data set]. NASA EOSDIS Land Processes Distributed Active Archive Center. <a href="https://doi.org/10.5067/MODIS/MCD64A1.061">https://doi.org/10.5067/MODIS/MCD64A1.061</a></li>
      <li>Global Forest Watch. (2020). [Forest concessions, Sarawak, from the Sarawak Forest Department] [Data set]. <a href="https://www.globalforestwatch.org">https://www.globalforestwatch.org</a></li>
      <li>Global Forest Watch. (2023). [Oil palm concessions, Malaysia] [Data set]. <a href="https://www.globalforestwatch.org">https://www.globalforestwatch.org</a></li>
      <li>Government of the Philippines &amp; U.S. Geological Survey. (2021). [Mining concessions, the Philippines] [Data set].</li>
      <li>Grantham, H. S., Duncan, A., Evans, T. D., Jones, K. R., Beyer, H. L., Schuster, R., Walston, J., Ray, J. C., Robinson, J. G., Callow, M., Clements, T., Costa, H. M., DeGemmis, A., Elsen, P. R., Ervin, J., Franco, P., Goldman, E., Goetz, S., Hansen, A., … Watson, J. E. M. (2020). Anthropogenic modification of forests means only 40% of remaining forests have high ecosystem integrity. Nature Communications, 11, 5978. <a href="https://doi.org/10.1038/s41467-020-19493-3">https://doi.org/10.1038/s41467-020-19493-3</a></li>
      <li>Greifswald Mire Centre. (2022). Global Peatland Map 2.0 [Data set]. Underlying data set of the UNEP Global Peatland Assessment. Global Peatlands Initiative, United Nations Environment Programme.</li>
      <li>Hansen, M. C., Potapov, P. V., Moore, R., Hancher, M., Turubanova, S. A., Tyukavina, A., Thau, D., Stehman, S. V., Goetz, S. J., Loveland, T. R., Kommareddy, A., Egorov, A., Chini, L., Justice, C. O., &amp; Townshend, J. R. G. (2013). High-resolution global maps of 21st-century forest cover change. Science, 342(6160), 850–853. <a href="https://doi.org/10.1126/science.1244693">https://doi.org/10.1126/science.1244693</a></li>
      <li>Hengl, T., &amp; Wheeler, I. (2018). Soil organic carbon content in x 5 g/kg at 6 standard depths (0, 10, 30, 60, 100 and 200 cm) at 250 m resolution (Version 0.2) [Data set]. Zenodo. <a href="https://doi.org/10.5281/zenodo.2525553">https://doi.org/10.5281/zenodo.2525553</a></li>
      <li>Hijmans, R. J., Cameron, S. E., Parra, J. L., Jones, P. G., &amp; Jarvis, A. (2005). Very high resolution interpolated climate surfaces for global land areas. International Journal of Climatology, 25(15), 1965–1978. <a href="https://doi.org/10.1002/joc.1276">https://doi.org/10.1002/joc.1276</a></li>
      <li>Institute for Global Environmental Strategies. (2020). [Forest cover of the Philippines under the national forest reference level definition, 2020] [Data set].</li>
      <li>IPCC. (2006). 2006 IPCC guidelines for national greenhouse gas inventories: Vol. 4. Agriculture, forestry and other land use (H. S. Eggleston, L. Buendia, K. Miwa, T. Ngara, &amp; K. Tanabe, Eds.). Institute for Global Environmental Strategies.</li>
      <li>IUCN. (2022). The IUCN Red List of Threatened Species (Version 2022-2). <a href="https://www.iucnredlist.org">https://www.iucnredlist.org</a></li>
      <li>IUSS Working Group WRB. (2007). World reference base for soil resources 2006, first update 2007 (World Soil Resources Reports No. 103). FAO.</li>
      <li>Joshua Project. (2023). [People group boundaries, Southeast Asia] [Data set]. <a href="https://joshuaproject.net">https://joshuaproject.net</a></li>
      <li>Jung, M., Arnell, A., de Lamo, X., García-Rangel, S., Lewis, M., Mark, J., Merow, C., Miles, L., Ondo, I., Pironon, S., Ravilious, C., Rivers, M., Schepaschenko, D., Tallowin, O., van Soesbergen, A., Govaerts, R., Boyle, B. L., Enquist, B. J., Feng, X., … Visconti, P. (2021). Areas of global importance for conserving terrestrial biodiversity, carbon and water. Nature Ecology &amp; Evolution, 5(11), 1499–1509. <a href="https://doi.org/10.1038/s41559-021-01528-7">https://doi.org/10.1038/s41559-021-01528-7</a></li>
      <li>Kementerian Energi dan Sumber Daya Mineral. (2021). [Mining concessions, Indonesia] [Data set].</li>
      <li>Kementerian Lingkungan Hidup dan Kehutanan. (2020). [Forest concessions, Indonesia] [Data set].</li>
      <li>Kementerian Lingkungan Hidup dan Kehutanan. (2022). [Forest cover of Indonesia in 2003, 2012 and 2022 under the FREL definition] [Data set].</li>
      <li>Kementerian Lingkungan Hidup dan Kehutanan. (2023a). [Indicative area for social forestry permits] [Data set].</li>
      <li>Kementerian Lingkungan Hidup dan Kehutanan. (2023b). [Oil palm concessions, Indonesia] [Data set].</li>
      <li>Kementerian Pertanian, Badan Penelitian dan Pengembangan Pertanian. (2018). Peta lahan gambut Indonesia skala 1:250.000. IAARD Press.</li>
      <li>Kementerian Pertanian. (2019). [Peat thickness, Indonesia] [Data set].</li>
      <li>LICADHO. (2020). [Land and forest concessions, Cambodia] [Data set].</li>
      <li>Long, T., Zhang, Z., &amp; He, G. (2021). 30 m resolution global annual burned area product (Version 1) [Data set]. Harvard Dataverse. <a href="https://doi.org/10.7910/DVN/3CTMKP">https://doi.org/10.7910/DVN/3CTMKP</a></li>
      <li>Maxwell, T. L., Hengl, T., Parente, L. L., Minarik, R., Worthington, T. A., Bunting, P., Smart, L. S., Spalding, M. D., &amp; Landis, E. (2023). Global mangrove soil organic carbon stocks dataset at 30 m resolution for the year 2020 based on spatiotemporal predictive machine learning. Data in Brief, 50, 109621. <a href="https://doi.org/10.1016/j.dib.2023.109621">https://doi.org/10.1016/j.dib.2023.109621</a></li>
      <li>Miettinen, J., Shi, C., &amp; Liew, S. C. (2016). Land cover distribution in the peatlands of Peninsular Malaysia, Sumatra and Borneo in 2015 with changes since 1990. Global Ecology and Conservation, 6, 67–78. <a href="https://doi.org/10.1016/j.gecco.2016.02.004">https://doi.org/10.1016/j.gecco.2016.02.004</a></li>
      <li>NASA FIRMS. (n.d.). MODIS Collection 6.1 active fire detections (MCD14ML) [Data set]. NASA Fire Information for Resource Management System. <a href="https://doi.org/10.5067/FIRMS/MODIS/MCD14ML">https://doi.org/10.5067/FIRMS/MODIS/MCD14ML</a></li>
      <li>Notohadiprawiro, T. (2001). [Peatland management zones; full reference to be confirmed].</li>
      <li>NTU. (2024). [Refined Area of Habitat for mammals, birds, amphibians and reptiles in Southeast Asia] [Unpublished data set].</li>
      <li>Olofsson, P., Foody, G. M., Herold, M., Stehman, S. V., Woodcock, C. E., &amp; Wulder, M. A. (2014). Good practices for estimating area and assessing accuracy of land change. Remote Sensing of Environment, 148, 42–57. <a href="https://doi.org/10.1016/j.rse.2014.02.015">https://doi.org/10.1016/j.rse.2014.02.015</a></li>
      <li>Open Development Cambodia. (2021). [Mining licences, Cambodia] [Data set]. <a href="https://opendevelopmentcambodia.net">https://opendevelopmentcambodia.net</a></li>
      <li>Open Development Mekong. (2023). [Indigenous and ethnic group territories, Mekong region] [Data set]. <a href="https://opendevelopmentmekong.net">https://opendevelopmentmekong.net</a></li>
      <li>Open Development Myanmar. (2021). [Mining concessions, Myanmar] [Data set]. <a href="https://opendevelopmentmyanmar.net">https://opendevelopmentmyanmar.net</a></li>
      <li>OpenStreetMap contributors. (n.d.). OpenStreetMap [Data set]. <a href="https://www.openstreetmap.org">https://www.openstreetmap.org</a></li>
      <li>PAFID &amp; NCIP. (2023). [Ancestral domain boundaries, the Philippines] [Data set]. Philippine Association for Intercultural Development and National Commission on Indigenous Peoples.</li>
      <li>Pekel, J.-F., Cottam, A., Gorelick, N., &amp; Belward, A. S. (2016). High-resolution mapping of global surface water and its long-term changes. Nature, 540(7633), 418–422. <a href="https://doi.org/10.1038/nature20584">https://doi.org/10.1038/nature20584</a></li>
      <li>Poggio, L., de Sousa, L. M., Batjes, N. H., Heuvelink, G. B. M., Kempen, B., Ribeiro, E., &amp; Rossiter, D. (2021). SoilGrids 2.0: Producing soil information for the globe with quantified spatial uncertainty. SOIL, 7(1), 217–240. <a href="https://doi.org/10.5194/soil-7-217-2021">https://doi.org/10.5194/soil-7-217-2021</a></li>
      <li>Potapov, P., Li, X., Hernandez-Serna, A., Tyukavina, A., Hansen, M. C., Kommareddy, A., Pickens, A., Turubanova, S., Tang, H., Silva, C. E., Armston, J., Dubayah, R., Blair, J. B., &amp; Hofton, M. (2021). Mapping global forest canopy height through integration of GEDI and Landsat data. Remote Sensing of Environment, 253, 112165. <a href="https://doi.org/10.1016/j.rse.2020.112165">https://doi.org/10.1016/j.rse.2020.112165</a></li>
      <li>Puyravaud, J.-P. (2003). Standardizing the calculation of the annual rate of deforestation. Forest Ecology and Management, 177(1–3), 593–596. <a href="https://doi.org/10.1016/S0378-1127(02)00335-3">https://doi.org/10.1016/S0378-1127(02)00335-3</a></li>
      <li>Saah, D., Tenneson, K., Poortinga, A., Nguyen, Q., Chishtie, F., Aung, K. S., Markert, K. N., Clinton, N., Anderson, E. R., Cutter, P., Goldstein, J., Housman, I. W., Bhandari, B., Potapov, P. V., Matin, M., Uddin, K., Pham, H. N., Khanal, N., Maharjan, S., … Ganz, D. (2020). Primitives as building blocks for constructing land cover maps. International Journal of Applied Earth Observation and Geoinformation, 85, 101979. <a href="https://doi.org/10.1016/j.jag.2019.101979">https://doi.org/10.1016/j.jag.2019.101979</a></li>
      <li>Santoro, M., &amp; Cartus, O. (2023). ESA Biomass Climate Change Initiative (Biomass_cci): Global datasets of forest above-ground biomass for the years 2010, 2017, 2018, 2019 and 2020 (Version 4) [Data set]. NERC EDS Centre for Environmental Data Analysis. <a href="https://doi.org/10.5285/af60720c1e404a9e9d2c145d2b2ead4e">https://doi.org/10.5285/af60720c1e404a9e9d2c145d2b2ead4e</a></li>
      <li>Save Cambodia’s Wildlife. (2023). [Indigenous community land, Cambodia] [Data set].</li>
      <li>SERVIR-Mekong. (2023). [Forest cover of Cambodia, Lao PDR, Myanmar, Thailand and Viet Nam under national forest reference level definitions, 2003, 2013 and 2023] [Data set]. Asian Disaster Preparedness Center.</li>
      <li>Soille, P., &amp; Vogt, P. (2009). Morphological segmentation of binary patterns. Pattern Recognition Letters, 30(4), 456–459. <a href="https://doi.org/10.1016/j.patrec.2008.10.015">https://doi.org/10.1016/j.patrec.2008.10.015</a></li>
      <li>UNEP-WCMC &amp; IUCN. (2023). Protected Planet: The World Database on Protected Areas (WDPA) [Data set]. <a href="https://www.protectedplanet.net">https://www.protectedplanet.net</a></li>
      <li>UNEP-WCMC &amp; IUCN. (2025). Protected Planet: The World Database on Protected Areas (WDPA) [Data set]. <a href="https://www.protectedplanet.net">https://www.protectedplanet.net</a></li>
      <li>Vancutsem, C., Achard, F., Pekel, J.-F., Vieilledent, G., Carboni, S., Simonetti, D., Gallego, J., Aragão, L. E. O. C., &amp; Nasi, R. (2021). Long-term (1990–2019) monitoring of forest cover changes in the humid tropics. Science Advances, 7(10), eabe1603. <a href="https://doi.org/10.1126/sciadv.abe1603">https://doi.org/10.1126/sciadv.abe1603</a></li>
      <li>Verra. (2024). SDVM002 Nature Framework (Version 1.0). Sustainable Development Verified Impact Standard Program. <a href="https://verra.org/documents/sd-vista-sdvm002-nature-framework-v1-0">https://verra.org/documents/sd-vista-sdvm002-nature-framework-v1-0</a></li>
      <li>Vieilledent, G. (2021). forestatrisk: A Python package for modelling and forecasting deforestation in the tropics. Journal of Open Source Software, 6(59), 2975. <a href="https://doi.org/10.21105/joss.02975">https://doi.org/10.21105/joss.02975</a></li>
      <li>Vogt, P., Riitters, K., Rambaud, P., d’Annunzio, R., Lindquist, E., &amp; Pekkarinen, A. (2022). GuidosToolbox Workbench: Spatial analysis of raster maps for ecological applications. Ecography, 2022(3), e05864. <a href="https://doi.org/10.1111/ecog.05864">https://doi.org/10.1111/ecog.05864</a></li>
      <li>Walsh, R. P. D. (1996). Climate. In P. W. Richards, The tropical rain forest: An ecological study (2nd ed., pp. 159–205). Cambridge University Press.</li>
      <li>Wedeux, B., Dalponte, M., Schlund, M., Hagen, S., Cochrane, M., Graham, L., Usup, A., Thomas, A., &amp; Coomes, D. (2020). Dynamics of a human-modified tropical peat swamp forest revealed by repeat lidar surveys. Global Change Biology, 26(7), 3947–3964. <a href="https://doi.org/10.1111/gcb.15108">https://doi.org/10.1111/gcb.15108</a></li>
      <li>Widyastuti, M. T., Minasny, B., Padarian, J., &amp; Maggi, F. (2024). PEATGRIDS: Mapping global peat thickness and carbon stock via digital soil mapping approach (Version 2.0.1) [Data set]. Zenodo. <a href="https://doi.org/10.5281/zenodo.15070037">https://doi.org/10.5281/zenodo.15070037</a></li>
      <li>Wildlife Conservation Society. (2020). [Tiger Conservation Landscapes, Panthera tigris] [Data set].</li>
      <li>WRI Indonesia. (2025). [NbS Tool v3 derived layers for Southeast Asia: forest cover trajectory, pathway raster, degraded forest and current carbon storage] [Unpublished data set]. SCeNe Coalition. <a href="https://nbstool.scenecoalition.org">https://nbstool.scenecoalition.org</a></li>
      <li>WRI Indonesia. (2026a). Above-ground biomass density modeling (ASEAN NbS Tool technical note, Appendix III) [Unpublished manuscript].</li>
      <li>WRI Indonesia. (2026b). Deforestation risk layer: Technical note [Unpublished technical note].</li>
      <li>WRI Indonesia. (2026c). Ecological connectivity: Technical note [Unpublished technical note].</li>
      <li>WRI Indonesia. (2026d). Ecosystem type layer: Technical note [Unpublished technical note].</li>
      <li>WRI Indonesia. (2026e). Forest landscape integrity (FLII) layer: Technical note [Unpublished technical note].</li>
      <li>Xu, J., Morris, P. J., Liu, J., &amp; Holden, J. (2018). PEATMAP: Refining estimates of global peatland distribution based on a meta-analysis. CATENA, 160, 134–140. <a href="https://doi.org/10.1016/j.catena.2017.09.010">https://doi.org/10.1016/j.catena.2017.09.010</a></li>
    </ul>
    <p>Each formula on the phase pages names the citation it follows. To cite the tool itself, see <a href="help.html#cite">how to cite</a> in the Help Centre.</p>`,
    'sources');
}

/* Every article closes with a link to the Help Centre section that does the same
   thing in the tool. The mirror of this table is the "How it's calculated" box at
   the end of each Help section; change both together (DEC-30, SCREENS.md SCR-17/SCR-19). */
const HELP_GUIDES = {
  summary:           [['The eight phases', 'phases']],
  requirements:      [['Phase 1 · Select location', 'phase-1'], ['Accounts and area limits', 'faq-accounts']],
  scope:             [['Phase 0 · Explore the map', 'phase-0']],
  workflow:          [['The eight phases', 'phases'], ['Run an analysis', 'analysis']],
  landcover:         [['Phase 0 · Explore the map', 'phase-0']],
  phase0:            [['Phase 0 · Explore the map', 'phase-0']],
  phase1:            [['Phase 1 · Select location', 'phase-1']],
  phase2:            [['Phase 2 · Site characterisation', 'phase-2']],
  phase3:            [['Phase 3 · Threat profile', 'phase-3']],
  phase4a:           [['Phase 4a · Ecosystem and pathway', 'phase-4a']],
  phase4b:           [['Phase 4b · Activities', 'phase-4b']],
  phase5:            [['Phase 5 · Potential benefit', 'phase-5'], ['Duration and carbon', 'phase-4-duration']],
  phase6:            [['Phase 6 · Monitoring planning', 'monitoring']],
  phase7:            [['Phase 7 · Generate documents', 'documents']],
  outputs:           [['Manage your project', 'manage']],
  troubleshooting:   [['Frequently asked questions', 'faq']],
  'worked-example':  [['Run an analysis', 'analysis']],
  limitations:       [['What the tool does not do', 'not-do']],
  sources:           [['How to cite', 'cite'], ['Glossary', 'glossary']]
};
function docsHelpLink(id) {
  const guides = HELP_GUIDES[id];
  if (!guides) return '';
  return docCallout('Do this in the tool',
    guides.map(([label, anchor]) => `<a href="help.html#${anchor}">${label}</a>`).join(' &middot; ') +
    ' &mdash; step by step in the user guide, with screenshots.', 'hc-xref');
}

function docsArticleHtml(id) {
  const map = {
    summary: docsSummary,
    requirements: docsRequirements,
    scope: docsScope,
    workflow: docsWorkflow,
    landcover: docsLandcover,
    phase0: docsPhase0,
    phase1: docsPhase1,
    phase2: docsPhase2,
    phase3: docsPhase3,
    phase4a: docsPhase4a,
    phase4b: docsPhase4Activities,
    phase5: docsPhase5,
    phase6: docsPhase6,
    phase7: docsPhase7,
    outputs: docsOutputs,
    troubleshooting: docsTroubleshooting,
    'worked-example': docsWorkedExample,
    limitations: docsLimitations,
    sources: docsSources
  };
  return (map[id] || docsSummary)() + docsHelpLink(id);
}

/* ============================================================================
   LOADER — the sidebar, universal search, "On this page", pager and routing
   are js/docs-shell.js, shared with Help (CMP-35). This file only supplies the
   articles and the live parameters they read.
   ========================================================================== */
function openTechnicalDoc(id, section) { DocsShell.open(id, section); }

function loadTechnicalDocs() {
  TECH_DOCS.params = readLiveParameters();
  document.body.classList.add('docs-active');
  /* Cross-references inside an article: data-doc-jump="<article-id>#<section-id>". */
  document.querySelector('#docs-article')?.addEventListener('click', e => {
    const jump = e.target.closest('[data-doc-jump]');
    if (!jump) return;
    const [article, section] = jump.dataset.docJump.split('#');
    DocsShell.open(article, section);
  });
  DocsShell.mount({ page: 'methodology', render: docsArticleHtml });
}

window.loadTechnicalDocs = loadTechnicalDocs;
window.openTechnicalDoc = openTechnicalDoc;

/* ============================================================================
   technical-docs.js — the Methodology articles (SCR-17)

   The in-app rendering of the team's reference document, "NbS Tool v3 ·
   Reference Methodology". Article order, wording, tables and equations follow
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
    'This documentation tells you what each phase of the Data Analyser does and which spatial layers each phase reads. It also shows the equations behind every figure that the tool reports.') +

  docSection('Summary', `
    <p>The NbS Tool Data Analyser screens a project area for nature-based solutions potential across three ecosystems in Southeast Asia. It runs as a chain of six phases. Each phase reads the result of the phase before it, so nothing later can be produced without the earlier stages, and each phase writes a result file keyed to the project boundary, which means a phase can be re-run without repeating the ones before it.</p>
    <p>Phase 2 describes the site. Phase 3 describes what is happening to it. Phase 4a decides what kind of intervention the land can take and Phase 4b decides what should be done on it. Phase 5 reports what that delivers. The single feedback loop in the chain is the threat profile, which is read a second time at the benefit stage to decide which climate-hazard and species components can be quantified.</p>
    <p>Each phase is documented in the same order: what it does, how it is used, which layers it reads, the method and equations underneath, and the usage notes that govern how the output should be read.</p>
    ${docNote('The tool is a screening instrument. Results are reported as area-weighted distributions over the project area, never as a single label, because a project area almost always spans several classes at once. Where a method is uncertain, the tool reports the uncertainty rather than hiding it.')}`,
    'summary') +

  docSection('How this documentation is organised', `
    ${docTable(['Group', 'What it holds'], [
      ['<strong>Methodology summary</strong>', `This page, then ${docJump('Requirements and limits', 'requirements')}, ${docJump('Scope and analysis conventions', 'scope')}, the ${docJump('Workflow', 'workflow')} and the ${docJump('Land cover classes', 'landcover')}.`],
      ['<strong>How each phase is calculated</strong>', `One page per phase, from ${docJump('Phase 1', 'phase1')} to ${docJump('Phase 5', 'phase5')}, followed by the two steps that start from a saved analysis: ${docJump('Phase 6 · Monitoring planning', 'phase6')} and ${docJump('Phase 7 · Generate documents', 'phase7')}.`],
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
      ['<strong>Ecosystems</strong>', 'Three, plus one guardrail class', 'Dryland forest sits on well-drained mineral soil that is not regularly flooded. Mangrove sits in a coastal zone with salt or brackish water shaped by the tides. Peatland sits on peat, an organic soil that stays wet for most of the year. Savanna and natural grassland is carried inside the pathway data as a fourth reference class but is never offered as a restoration target, because planting trees on land whose natural state is open is conversion rather than restoration. The three ecosystems are not mutually exclusive: peat swamp forest is both forest and peatland, and mangrove can grow on peat, so the tool reports a combination where one exists.'],
      ['<strong>Change window</strong>', '2014 to 2024', 'Everything the tool says about change, forest loss, disturbance, and the trajectory that selects the pathway is measured between those two dates.'],
      ['<strong>Measurement grid</strong>', 'Equal area', 'The boundary is reprojected once to ESRI:54034 World Cylindrical Equal Area, so every hectare figure is computed on an equal-area grid. That projection preserves area but distorts distance and shape away from the equator, so any measure that depends on distance applies a correction, and no component measures distance or perimeter directly in it.']
    ])}
    ${docCaption('Table 2. Scope and conventions.')}
    <p>The land cover map behind the ecosystems and the change window is described in ${docJump('Land cover classes', 'landcover')}.</p>`,
    'scope');
}

function docsWorkflow() {
  return docHero(G_SUMMARY, 'Workflow',
    'This page shows the six phases of the Data Analyser. For each phase, it shows what the phase does and what the phase produces.') +

  docSection('The six phases', `
    ${docTable(['Phase', 'Name', 'What happens', 'What comes out'], [
      ['<strong>1</strong>', docJump('Select location', 'phase1'), 'The user draws or uploads a polygon and sets the project duration.', 'A project boundary, the area of interest, measured on an equal-area grid.'],
      ['<strong>2</strong>', docJump('Site characterisation', 'phase2'), 'Every spatial layer is clipped to the boundary and summarised, in four groups: general context, nature, climate and people.', 'A description of the site as area-weighted distributions.'],
      ['<strong>3</strong>', docJump('Threat profile', 'phase3'), 'Reports what is happening to the site: how much is disturbed, what is driving it, drainage pressure on peat, and natural hazard risk.', 'Disturbed area by ecosystem, a driver breakdown, and hazard levels.'],
      ['<strong>4a</strong>', docJump('Pathway selection', 'phase4a'), 'Land cover in 2024 is compared with 2014, read against the reference ecosystem, and every pixel is assigned to Protect, Manage, Restore or Carbon ineligible.', 'Area and share under each pathway, and the pathway raster.'],
      ['<strong>4b</strong>', docJump('Activity selection', 'phase4b'), 'Each pixel&rsquo;s trajectory category and reference ecosystem are joined to the activity catalogue.', 'The activities that apply on this ground, per pathway.'],
      ['<strong>5</strong>', docJump('Potential benefit', 'phase5'), 'Reports the benefits the selected activities are expected to deliver, in three pillars, and quantifies carbon.', 'A benefit profile for nature, people and climate, plus gross and net carbon figures.']
    ])}
    ${docCaption('Table 3. The six phases, what each does, and what it produces.')}`,
    'six-phases') +

  docSection('After the analysis', `
    <p>Two further steps start from a saved analysis rather than from the map. They organise what the six phases produced and run no further spatial calculation, so their pages describe a framework rather than a method.</p>
    ${docTable(['Phase', 'Name', 'What happens', 'What comes out'], [
      ['<strong>6</strong>', docJump('Monitoring planning', 'phase6'), 'The selected activities are matched to indicators, each with a suggested method and frequency.', 'A draft monitoring plan to adapt.'],
      ['<strong>7</strong>', docJump('Generate documents', 'phase7'), 'The saved analysis and the user&rsquo;s own answers are placed into document templates.', 'Editable project documents.']
    ])}`,
    'after-the-analysis');
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
    ${docCaption('Table 4. Methods for defining the area of interest.')}
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
    ${docCaution('There is no minimum area check. A boundary smaller than one cell of the coarsest layer will fall inside a single cell of that layer, and the tool will report that layer&rsquo;s value for the whole site. The layers where this happens first are cyclone and drought risk, at roughly 11 km and 28 km, then conservation significance at 10 km, endangered tree species richness at 4 km, and the WorldClim climate normals at 927 m.')}
    ${docNote('The methodology documentation states that the boundary is reprojected to ESRI:54034 and every hectare figure computed in that projection. The tool instead rasterises onto the pathway grid and integrates geodesic pixel areas. Both are equal-area measurements and agree closely, but they are not the same operation, so a small difference between the confirm-card area and a downstream ecosystem total is expected rather than a fault. A large difference is not expected.')}`,
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
  return docHero(G_PHASES + ' &middot; Phase 2', 'Site characterisation',
    'Site characterisation answers the question &ldquo;what is here?&rdquo;. It reads data and makes no recommendation. The tool clips every layer that it holds to the boundary and summarises each layer. The tool groups the results as the interface groups them: general context, nature, climate and people.') +

  docSection('What carries forward', `
    <p>Three layers carry the whole downstream chain. Land cover 2024 becomes the current ecological state in Phase 4a. Forest cover 2014 becomes the past state. The annual deforestation rate becomes the baseline for every avoided-loss projection in Phase 5.</p>
    ${docCaution('Ecosystem type is a reference layer. It reports the ecosystem that belongs on the site, not the vegetation standing on it today. Reading it as current cover is the single most common misreading of this phase.')}`,
    'phase2-forward') +

  /* ---- General context ---- */
  docSection('General context', `
    ${docTable(L, [
      ['<strong>Administration Boundary</strong>', 'Administrative boundaries that the project area overlaps, with the dominant district and province named.', 'GADM, n/a, 2022'],
      ['<strong>Protected Area</strong>', 'Areas designated and managed, through law or other effective means, to conserve nature over the long term, with the overlap and designation of each.', 'WDPA, 30 m, 2025'],
      ['<strong>Land Cover 2024</strong>', `The land surface of Southeast Asia in 2024 classified into 19 land cover and land use classes plus other land, spanning forest, cropland and plantation, grassland and shrub, settlement, water and wetland types. See ${docJump('Land cover classes', 'landcover')}.`, 'SIGnal, 30 m, 2024'],
      ['<strong>Forest Cover 2014</strong>', 'Forest extent as of 2014, the landscape classified into forest and non-forest, marking the earlier state of where forest stood.', 'SIGnal, 30 m, 2014'],
      ['<strong>Forest Cover 2024</strong>', 'Forest extent as of 2024, separating natural forest from non-forest land and from planted forest or tree-crop plantation.', 'SIGnal, 30 m, 2024'],
      ['<strong>Deforestation 2014 to 2024</strong>', 'Natural forest standing in 2014 that had been lost by 2024, derived by comparing the two forest cover layers. It records the location and extent of loss but does not attribute its cause.', 'SIGnal, 30 m, 2014 to 2024'],
      ['<strong>Forest cover trajectory</strong>', 'The transition each location went through between 2014 and 2024, describing what happened rather than the state at a single date.', 'SCeNe Coalition, 30 m, 2014 to 2024'],
      ['<strong>Deforestation Risk</strong>', 'Modelled probability of future unplanned deforestation across Southeast Asia, expressed as a relative ranking of risk rather than a calibrated rate.', 'SCeNe Coalition, 30 m, 2024'],
      ['<strong>Elevation</strong>', 'The range of heights above sea level across the area of interest, from its lowest to highest point, and the elevation class that predominates.', 'SRTM, 30 m, 2000'],
      ['<strong>Slope</strong>', 'The range of terrain steepness across the area of interest, in percent rise, and the slope class that predominates.', 'SRTM, 30 m, 2000'],
      ['<strong>Ecosystem type</strong>', 'The mangrove, peatland, dryland and grassland classes merged into a single ecosystem-type map, including areas where two or all three overlap.', 'SCeNe Coalition, 30 m, 2025'],
      ['<strong>Disaster risk: flood, landslide, typhoon and drought</strong>', 'Natural-hazard susceptibility of the area of interest. These are risk layers rather than bare hazard layers: exposure and vulnerability are already folded in.', 'ADPC, 30 to 250 m, 2024']
    ])}
    ${docCaption('Table 5. Layers read by the General tab. Source entries give the publisher, spatial resolution and vintage as recorded in the v3 data catalogue.')}

    <h3>Method: ecosystem type</h3>
    <p>The categorical ecosystem raster is clipped to the boundary with nearest-neighbour resampling, because the values are class codes and must not be interpolated. Pixels are counted per class, the denominator is the total project area, and an Other or Unclassified share absorbs nodata so the composition sums to 100 percent. Composition uses pure presence: a class counts as present if its area is above zero. The resulting set of present classes is the reference ecosystem that drives Phase 4a and filters the activity catalogue in Phase 4b.</p>

    <h3>Method: administrative boundaries, protected areas and Key Biodiversity Areas</h3>
    <p>Administrative units are intersected at three GADM levels, country, province and district. A unit is reported only if its intersection is at least 1 percent of the project area, which removes false slivers caused by the generalised boundary lines, and retained districts define their parent provinces and country so the hierarchy stays consistent.</p>
    <p>For protected areas and Key Biodiversity Areas the headline overlap is computed on the union of sites, dissolved first and then intersected, because sites overlap one another and summing them individually can exceed the project area. No sliver threshold is applied to either, because even a small overlap is legally or ecologically meaningful. The WDPA selection keeps status Designated, Inscribed or Established, drops pure marine sites and keeps coastal ones.</p>

    <h3>Method: terrain</h3>
    <p>Elevation and slope are read as pre-classified rasters, so the tool tallies class codes and performs no reclassification. The denominator is the valid, non-nodata area, so each distribution sums to 100 percent.</p>
    ${docTable(['Code', 'Elevation class', 'Range', 'Slope class', 'Range, percent rise'], [
      ['1', 'Lowland', '0 to 500 m', 'Flat', '0 to 8'],
      ['2', 'Submontane or hill', '500 to 1,000 m', 'Gently sloping', '8 to 15'],
      ['3', 'Montane', '1,000 to 2,000 m', 'Moderately steep', '15 to 25'],
      ['4', 'Upper montane', 'above 2,000 m', 'Steep', '25 to 40'],
      ['5', 'not applicable', 'not applicable', 'Very steep', 'above 40']
    ])}
    ${docCaption('Table 6. Terrain class definitions.')}

    <h3>Method: historical deforestation and the annual rate</h3>
    <p>Forest at both dates uses the same forest definition, so the two are comparable. Forest gain on land that was not forest in 2014 is excluded, which keeps the rate consistent with the reported loss. The annual rate follows Puyravaud (2003) rather than a simple percentage, and it is the input to every avoided-loss projection in Phase 5.</p>
    ${docFormula('Forest loss and remaining forest',
      ['Forest Loss (ha) = Area ( Forest 2014 and not Forest 2024 )',
       'Forest Remaining (A2) = Forest Area 2014 (A1) &minus; Forest Loss'],
      [], 'the tool&rsquo;s own comparison of the two SIGnal forest cover layers; it feeds the Puyravaud (2003) rate below.')}
    ${docFormula('Annual deforestation rate',
      ['Annual Deforestation Rate (% per year) = ( 1 / t ) &times; ln ( A2 / A1 ) &times; 100'],
      [['A1', 'Forest area in 2014, in hectares.'],
       ['A2', 'Forest area remaining in 2024, in hectares, taken as A1 minus gross loss of 2014 forest.'],
       ['t', 'Length of the window in years, fixed at 10.'],
       ['ln', 'Natural logarithm. The result is negative for loss; the tool reports its absolute value.']],
      'Puyravaud (2003).')}
    <p>Three guards run before the logarithm. If there was no forest in 2014 the component returns not applicable. If there was no loss the rate is zero. If all forest was lost the case is reported as total loss rather than evaluating the logarithm of zero. The resulting rate is then compared with the dominant country&rsquo;s national rate, itself computed with the same formula so the comparison is valid: higher than if it exceeds the national rate by more than 20 percent, lower than if it falls short by more than 20 percent, and similar to within that band.</p>

    <h3>Method: deforestation risk</h3>
    <p>The risk raster is a relative spatial ranking produced by a Random Forest machine learning model trained on observed forest cover change from 2014 to 2024, using the explanatory variables of the forestatrisk approach. The tool never states an absolute chance of deforestation. It places the project area&rsquo;s forest within the national distribution of forest risk for the same country, computed from the same raster masked to the same forest definition.</p>
    ${docFormula('Relative risk and national position',
      ['Relative Risk (0 to 100) = Raw Risk Value / 65,535 &times; 100',
       'Project Risk = median ( Relative Risk over project-area forest pixels )',
       'National Percentile = position of Project Risk within the country&rsquo;s percentile breakpoints'],
      [['65,535', 'The maximum of the unsigned 16-bit raster, which encodes the 0 to 100 risk scale.'],
       ['median', 'Used rather than the mean because the risk distribution is strongly skewed.'],
       ['Comparison', 'Higher than the national average above the 60th percentile, lower than below the 40th, similar to in between.']],
      'Vieilledent (2021), for the forestatrisk variable set.')}

    <h3>Method: natural disaster risk</h3>
    <p>Each risk layer is clipped, the class distribution is tabulated against the valid hazard area, and the representative level for the site is the highest class covering at least 20 percent of that area. The rule is deliberately conservative, because in risk screening a false negative costs more than a false positive: a site that is 70 percent Moderate and 25 percent Very High reports as Very High. No composite index is produced across hazards, because the hazards are not commensurable with one another.</p>`,
    'phase2-general') +

  /* ---- Nature ---- */
  docSection('Nature', `
    ${docTable(L, [
      ['<strong>Forest Landscape Integrity Index</strong>', 'An assessment of the overall health and ecological integrity of forested areas, combining forest fragmentation, human disturbance and habitat loss into a single measure of condition.', 'SCeNe Coalition, 30 m, 2024'],
      ['<strong>Refined Area of Habitat: mammal, bird, reptile and amphibian</strong>', 'The habitat available to a species within its range, refined from coarse range maps into spatially explicit estimates of available suitable habitat following globally standardised methods.', 'IUCN, refined by NTU, 30 m, 2024'],
      ['<strong>Key Species Presence</strong>', 'Presence of keystone and flagship species, which have a disproportionately large effect on ecosystem structure and function relative to their abundance, estimated from occurrence records collected between 2000 and 2025.', 'GBIF, n/a, 2025'],
      ['<strong>Key Biodiversity Area</strong>', 'Overlap with sites that contribute significantly to the global persistence of biodiversity. A Key Biodiversity Area may or may not be legally protected, which makes it a different lens from the protected area layer.', 'WDKBA, n/a, 2022'],
      ['<strong>Conservation Significance</strong>', 'Areas of global conservation importance where biodiversity, carbon storage and water quality regulation can be jointly supported, identified through multicriteria spatial optimisation.', 'Jung et al., 10 km, 2021'],
      ['<strong>Ecological connectivity</strong>', 'Structural connectivity from Morphological Spatial Pattern Analysis, which classifies each habitat pixel as core, edge, perforation, bridge, loop, branch or islet.', 'Forest cover 2014 and SIGnal land cover 2024, GuidosToolbox processing, 30 m, 2024'],
      ['<strong>Endangered trees species richness</strong>', 'Richness of threatened and socio-economically important tree species modelled as present, used to identify areas that should be prioritised for conservation.', 'Tree diversity, 4,000 m, 2021']
    ])}
    ${docCaption('Table 7. Layers read by the Nature tab.')}

    <h3>Method: forest landscape integrity</h3>
    <p>Integrity is a property of forest, so the summary is taken over the project area&rsquo;s forest only, using the same forest mask as the deforestation components. The headline is the mean score out of 10 over those pixels. The distribution uses the class breaks of the source paper (Grantham et al. 2020): High at or above 9.6, Low at or below 6.0 and Medium in between, and the shares sum to 100 percent of forest rather than of the project area.</p>
    ${docNote('The 0 to 10 values are calibrated on the pooled Southeast Asia distribution. They are internally consistent within one run but are not one to one with the published global index, so they should be presented as the regional forest integrity layer rather than as an absolute global integrity score.')}

    <h3>Method: area of habitat and connectivity</h3>
    <p>The species habitat rasters for mammals, birds, reptiles and amphibians are clipped to the boundary and counted per taxon and per IUCN category (Area of Habitat after Brooks et al. 2019). These same rasters are the direct input to three benefit components in Phase 5, where they are intersected with projected deforestation or with the restoration area.</p>
    <p>Ecological connectivity is produced by running Morphological Spatial Pattern Analysis in GuidosToolbox (Vogt et al. 2022) on a binary habitat mask derived from the 2024 land cover plus a surrounding landscape buffer, with 8-connected pixels, an edge width of one pixel, approximately 30 m, transition classes enabled and an internal and external split. The connector classes are bridge and loop, and their combined area is the figure the narrative reports.</p>
    ${docCaution('Area of Habitat is modelled suitable habitat, not confirmed occurrence. It states where a species could live given cover, elevation and range, not where it has been recorded, and it is not equivalent to Extent of Occurrence or Area of Occupancy, so it cannot be compared with the IUCN Red List thresholds that use those quantities. Morphological connectivity is likewise structural: it establishes that habitat is physically linked, not that any species uses the link. Because the analysis uses a landscape buffer, the result also depends on land cover outside the project boundary, which the project does not control.')}`,
    'phase2-nature') +

  /* ---- Climate ---- */
  docSection('Climate', `
    ${docTable(L, [
      ['<strong>Current Carbon Storage</strong>', 'Above-ground biomass, below-ground biomass and soil organic carbon only. Deadwood and litter are excluded, so the result is not a full ecosystem carbon stock.', 'SCeNe Coalition, 250 m, 2024'],
      ['<strong>Above Ground Biomass Density</strong>', 'The mass of living vegetation held above the soil surface, produced by combining sparse GEDI spaceborne LiDAR footprints with high-resolution satellite embeddings so that biomass can be predicted consistently across the full landscape.', 'GEDI L4A with AlphaEarth Foundations embeddings, 30 m, 2024'],
      ['<strong>Below Ground Biomass</strong>', 'Root biomass. Not mapped: derived from above-ground biomass using a fixed regional root-to-shoot ratio, so it carries that layer&rsquo;s error plus the error of the ratio itself.', 'IPCC 2006, 30 m, 2024'],
      ['<strong>Soil Organic Carbon: peatland, mangrove and dryland</strong>', 'Soil organic carbon stock per hectare, predicted from point observations at six standard depths, with the reported figure representing a fixed 0 to 30 cm window.', 'OpenLandMap and SoilGrids, with Maxwell et al. (2023) for mangrove, 30 m, 2018'],
      ['<strong>Annual Temperature</strong>', 'Average annual temperature of the area of interest, with a twelve-month profile. A long-term climate normal interpolated from weather stations, not current or observed conditions.', 'WorldClim, 927 m, 2000'],
      ['<strong>Annual Precipitation</strong>', 'Average annual precipitation total, with a twelve-month profile. The monthly series is retained so that dry-season length can be derived from it.', 'WorldClim, 927 m, 2000'],
      ['<strong>Burned Area</strong>', 'Historical burned area within the project boundary. Burn scars are detected from satellite, so cropland burning is under-detected and small or short fires can be missed entirely.', 'GABAM, 30 m, 2024'],
      ['<strong>Fire susceptibility</strong>', 'Distribution of the area of interest across five fire susceptibility classes, derived from cumulative fire-detection frequency between 2000 and 2024 rather than from burned area or future fire probability.', 'ADPC, with MODIS FIRMS, 1,000 m, 2024'],
      ['<strong>Soil Groups</strong>', 'Dominant World Reference Base 2006 reference soil groups present, giving a standardised international soil nomenclature for the area.', 'ISRIC, World Reference Base (2006) Soil Groups, 250 m, 2020']
    ])}
    ${docCaption('Table 8. Layers read by the Climate tab. Biomass carbon and soil carbon are reported as two separate figures and are deliberately not summed.')}

    <h3>Method: total current carbon stock</h3>
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
       ['Carbon Fraction', '0.47, the IPCC 2006 default fraction of carbon in dry matter. Mangrove uses 0.451 in the restoration method. It is never applied to the soil layer, which already holds carbon.'],
       ['44 / 12', 'The molecular weight ratio of carbon dioxide to carbon, equal to 3.67. It is applied in Phase 5 only.']],
      'IPCC 2006 Guidelines, Volume 4.')}
    ${docCaution('Site characterisation reports carbon stock in tonnes of carbon. Phase 5 reports emissions and removals in tonnes of carbon dioxide equivalent. The two differ by a factor of 3.67, so check which unit a figure carries before quoting it.')}
    <p><strong>Two things the pool split cannot tell you</strong></p>
    <ul>
      <li>A fixed root-to-shoot ratio makes the above-ground and below-ground shares constant by construction. A ratio of 0.28 always yields the same 78 to 22 split, on every site, so those percentages carry no site-specific information and must not be presented as a finding.</li>
      <li>The soil figure represents a fixed 0 to 30 cm depth, which is the IPCC default for mineral soil and captures most of the profile there. It does not on peat. Tropical peat can run several metres deep, so a peatland project area reports far below its real soil carbon stock. Deadwood and litter are absent from both figures, which is why they are never summed into a site total.</li>
    </ul>

    <h3>Method: temperature and precipitation</h3>
    <p>Two different statistics appear in one card, and the order of operations matters. The chart shows twelve monthly values, each the spatial mean over the project area for that month. The sentence describes the annual figure across space, as its minimum, maximum and mean over the project area&rsquo;s pixels.</p>
    ${docFormula('Annual figures',
      ['Annual Temperature (per pixel) = mean of the twelve monthly temperature values',
       'Annual Precipitation (per pixel) = sum of the twelve monthly precipitation values',
       'then the spatial minimum, maximum and mean are taken across pixels'],
      [], 'the tool&rsquo;s own summary of the WorldClim monthly climate normals.')}
    <p>For precipitation the per-pixel sum must come first. Summing the twelve spatial minima would produce a value that no pixel actually has. Resampling is nearest neighbour rather than bilinear, because these components report a minimum and a maximum and those values must exist in the source data, and a pixel counts only when all twelve months are valid.</p>

    <h3>Method: burned area</h3>
    <p>A pixel can burn in more than one year, so the component produces two totals on purpose. The headline is the union, the area that burned at least once, which is at most the project area and reads as the true burned footprint. The bar chart is per year, where a reburning pixel is counted in each year it burns. The sum of the annual areas is kept separately and can exceed the project area: it measures burn events, not area, and must not be read as an area.</p>`,
    'phase2-climate') +

  /* ---- People ---- */
  docSection('People', `
    <p>Unlike the nature and climate layers, which are spatially explicit, most socio-economic data is jurisdiction-based: reported for an administrative unit rather than for the project area. The two gridded population layers and the vulnerability composite are the exception.</p>
    ${docTable(L, [
      ['<strong>Gridded Population</strong>', 'How many people live inside the project area and how densely they are packed, from population estimates distributed onto a 100 m grid and placed only on land that shows signs of settlement.', 'WorldPop Global Demographic Data Project, constrained population counts R2025A v1, 100 m, 2025'],
      ['<strong>Gridded Age and Sex Structure</strong>', 'The age and sex make-up of the people living inside the project area, from the same 100 m grid, in bands from under 1 year to 90 and over.', 'WorldPop, constrained age and sex structures R2025A v1, 100 m, 2025'],
      ['<strong>Climate Vulnerability</strong>', 'Four independent composite indices summarising how susceptible the area is to climate hazards: physical, environmental, economic and social.', 'ADPC harmonised vulnerability indices'],
      ['<strong>Number of Households</strong>', 'Number of private households in the selected administrative unit, the denominator behind every household-based indicator on the tab.', 'National statistical offices'],
      ['<strong>Unemployment Rate</strong>', 'Share of the labour force that is unemployed, which signals both a livelihoods vulnerability that climate change can deepen and a labour pool that project activities could draw on.', 'National statistical offices'],
      ['<strong>Employment Rate</strong>', 'Share of the working-age population in employment, indicating how much of that population is economically engaged.', 'National statistical offices'],
      ['<strong>Underemployment Rate</strong>', 'Share of employed people working fewer hours than they are willing and able to work, which points to spare labour capacity and to already insecure household income.', 'National statistical offices'],
      ['<strong>Employment by Sector</strong>', 'Distribution of employment across economic sectors, identifying which livelihoods are climate-exposed and which a project could support or diversify.', 'National statistical offices'],
      ['<strong>Top 5 Industries or Occupations</strong>', 'The occupation or industry groups employing the most people, indicating the skills present locally and how directly livelihoods depend on land and natural resources.', 'National statistical offices'],
      ['<strong>Literacy Rate</strong>', 'Share of the population able to read and write, describing how ready a community is to take part in the training, record-keeping and monitoring that nature-based solutions require.', 'National statistical offices'],
      ['<strong>Number of Students Enrolled</strong>', 'Students enrolled in education, indicating the size of the school-age cohort and the reach of the education system around the site.', 'National statistical offices'],
      ['<strong>Population Educated (School)</strong>', 'Distribution of the population by highest level of schooling completed, which indicates the appropriate register for training materials, contracts and consultation.', 'National statistical offices'],
      ['<strong>Average Household Income</strong>', 'Average household income per month in local currency, which sketches local earning conditions and the scale against which benefit sharing would be judged.', 'National statistical offices'],
      ['<strong>Top 5 Common Diseases</strong>', 'The most frequently reported illnesses, indicating which health co-benefits a project might plausibly deliver and which health burdens already constrain participation.', 'National statistical offices'],
      ['<strong>Households with Access to Water</strong>', 'Share of households with access to improved or safe drinking water, a core measure of the basic services that shape how communities cope with drought and flood.', 'National statistical offices'],
      ['<strong>Toilet Facility Categories</strong>', 'Share of households with hygienic sanitation, or the distribution of toilet facility types, covering the sanitation conditions that shape community health and vulnerability.', 'National statistical offices']
    ])}
    ${docCaption('Table 9. Layers read by the People tab. The thirteen national indicator families are reported at the finest administrative level each national statistical office publishes, which ranges from village level in Indonesia to national only in Singapore.')}

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
    <p>A credible intervention addresses a driver rather than a symptom. Knowing whether forest is being lost to small-scale agriculture, to selective logging, to road development or to fire changes which activity is worth proposing and which is likely to fail.</p>`,
    'phase3-why') +

  docSection('Layers', `
    ${docTable(['Data', 'Short description', 'Source'], [
      ['<strong>Degraded Forest, forest disturbance</strong>', 'Disturbances affecting forest structure that reduce the capacity of forests to provide ecosystem services, identified from declines in tree canopy height between the 2014 baseline and the 2024 assessment period.', 'Tree Canopy Height and SIGnal, 30 m, 2024. Method after Bourgoin et al. (2024)'],
      ['<strong>Driver of forest disturbance</strong>', 'Probable drivers assigned to integrated deforestation alerts using a deep learning model on post-disturbance Sentinel-1 and Sentinel-2 imagery: small and large-scale agriculture, road development, selective logging, mining, wildfire, flooding and other natural disturbance.', 'WUR and Global Nature Watch, accessed through Global Forest Watch, 30 m, 2024'],
      ['<strong>Peatland disturbance driver, canal proximity and drainage pressure</strong>', 'Drainage canal density and proximity on peat, the primary driver of peatland degradation, including canals outside the project boundary that still influence conditions inside it.', 'Dadap et al., 30 m, 2022'],
      ['<strong>Ecosystem type</strong>', 'Used here as the stratification layer: the disturbance layer is crossed with it so that disturbed area is tabulated per ecosystem.', 'SCeNe Coalition, 30 m, 2025'],
      ['<strong>Disaster risk: landslide, flood, typhoon and drought</strong>', 'Hazard combined with a weighted vulnerability composite and reclassified into risk classes, used both as a threat signal and as the recalibration input to the driver layer.', 'ADPC, 30 to 250 m, 2024'],
      ['<strong>Disaster risk: fire</strong>', 'Cumulative fire-detection frequency from 2000 to 2024 reclassified into five fire hazard classes using region-specific, percentile-calibrated thresholds.', 'ADPC, with MODIS FIRMS, 1,000 m, 2024']
    ])}
    ${docCaption('Table 10. Layers read by the threat profile.')}`,
    'phase3-layers') +

  docSection('Method: disturbance detection', `
    <p>Disturbance here means structural decline within forest that is still standing, which is a different quantity from forest loss. It is detected as a canopy height deficit measured against an undisturbed reference population, where that reference is forest at least 120 m from any disturbed forest.</p>
    ${docFormula('Disturbance by ecosystem',
      ['Detection Threshold = 5th percentile of canopy height change in the reference population',
       'Disturbed Area (ecosystem) = Area ( canopy height change &lt; Detection Threshold and ecosystem and inside boundary )',
       'Disturbed Share (%) = Disturbed Area (ecosystem) / Ecosystem Area &times; 100'],
      [['Reference population', 'Forest at least 120 m from any disturbed forest, taken as undisturbed.'],
       ['5th percentile', 'Gives a nominal 5 percent false-positive rate.']],
      'Bourgoin et al. (2024), for structural forest degradation.')}
    ${docCaution('Disturbance and forest loss overlap within the same polygon and must never be added. Results are also area statistics by stratum: per-pixel interpretation is not supported at 30 m, given a product error of 6.6 to 9.1 m. A ten-year window is long for detecting degradation: version 3.1 is intended to move to an annual or five-year analysis.')}`,
    'phase3-disturbance') +

  docSection('Method: disturbance drivers', `
    <p>The driver layer is masked to the disturbance layer and clipped to the project boundary, then the area of each driver class is tabulated and grouped into human-caused, natural and other (driver classes after Slagter et al. 2026). Post-processing identifies where fire coincided with agricultural clearing, using VIIRS fire alerts within a 500 m buffer and a low post-disturbance normalised burn ratio in the following month&rsquo;s Sentinel-2 composite. The classification is then recalibrated against ADPC disaster risk, and only high and very high disaster risk is treated as contributing to disturbance. For mangrove the human-caused set is commodities and settlement rather than the full list.</p>`,
    'phase3-drivers') +

  docSection('Method: peatland drainage pressure', `
    <p>Canal proximity, drainage pressure and fire risk are each reported as High, Moderate or Low, together with the distance to the nearest canal (canal layer after Dadap et al. 2021). Drainage pressure deliberately includes canals outside the project boundary, because two published findings set the relevant distances: canals can influence water-table depth up to 500 m into the surrounding area (Astiani et al. 2017), and canal networks can affect forest biomass growth up to 1 km away (Wedeux et al. 2020).</p>
    ${docNote('The canal layer was produced by a model trained with roads included, on the assumption that roads often carry drainage ditches. Read it as a drainage-infrastructure proxy rather than a canal inventory. It indicates pressure, not measured water-table depth.')}`,
    'phase3-peat');
}

/* ------------------------------------------------------------------- Phase 4a */
function docsPhase4a() {
  return docHero(G_PHASES + ' &middot; Phase 4a', 'Pathway selection',
    'In pathway selection, the tool stops describing and starts deciding. Every phase before it reports what is on the ground. This phase changes that description into a statement about the kind of intervention that the land can take.') +

  docSection('Three questions behind the logic', `
    <p>Three questions sit behind the logic. <strong>What happened here</strong> is measured, from two land cover maps ten years apart. <strong>What should grow here</strong> is not measured but modelled, as the reference ecosystem, and it is the only way to tell degradation apart from natural condition: grassland on a forest reference is degraded land, and the same grassland on a savanna reference is a healthy ecosystem where planting trees would be damage rather than repair. <strong>What can start without a change in land use</strong> is a feasibility question that the framework treats as a first-order decision rather than a detail.</p>
    <p>The three pathways follow the protect, manage and restore hierarchy of Cook-Patton et al. (2021).</p>`,
    'phase4a-questions') +

  docSection('The four outcomes', `
    ${docTable(['Pathway', 'Eligible categories', 'Definition'], [
      ['<strong>Protect</strong>', 'Cat 1', 'Maintain forest cover based on spatial data from 2014 and 2024. Driven by avoided deforestation initiatives such as mitigating legal land clearing and illegal logging, this strategy preserves forests as carbon sinks, prevents wildlife habitat fragmentation, and enhances social wellbeing for forest-dependent communities.'],
      ['<strong>Manage</strong>', 'Cat 6, 8B, 9A, 9C', 'Balance human livelihoods with ecological health on lands that transitioned into active use between 2014 and 2024. Manage pathways include silvofishery, paludiculture, soil and water enrichment, and buffer management. This strategy optimises working-land productivity, lowers carbon intensity, and minimises ecosystem impacts without requiring full rewilding.'],
      ['<strong>Restore</strong>', 'Cat 3B, 4B, 5, 8C, 9B, 10', 'Actively heal heavily degraded landscapes, targeting degraded vegetation, barren lands, and long-term non-forested areas. Driven by the Afforestation, Reforestation and Revegetation framework, the activities include native species planting, ecosystem restoration, and allowing natural forest regeneration. This pathway re-establishes high-integrity forest cover, secures long-term carbon removals, and creates ecosystem services.'],
      ['<strong>Carbon ineligible</strong>', 'Cat 2, 3A, 4A, 7, 8A, 9D', 'Not a pathway, but a screening outcome reported in the same field. The land cannot generate carbon credits under the tool&rsquo;s current criteria, although non-carbon options may still exist. It covers natural forest converted to managed tree cover, plantation that was already established in 2014, settlement, and the savanna-reference categories.']
    ])}
    ${docCaption('Table 11. Pathway definitions and the trajectory categories eligible for each. Definitions follow the GUI design document.')}`,
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
    ${docCaption('Table 12. Ecological state classification. Numbers in brackets are the land cover raster codes.')}
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
      ['<strong>7</strong>', 'Non-forest to C3', 'Plantation stable. Managed tree cover already in place in 2014'],
      ['<strong>8</strong>', 'Non-forest to C4', 'Non-forest vegetation stable. Shrub, grass or wetland since at least 2014'],
      ['<strong>9</strong>', 'Non-forest to C5', 'Active use stable. Land in production in 2014 and still in production'],
      ['<strong>10</strong>', 'Non-forest to C6', 'Barren stable. Bare land, no evidence that forest ever stood there']
    ])}
    ${docCaption('Table 13. The ten trajectory categories.')}
    ${docNote('Category 6 is treated with caution. A ten-year recovery from non-forest to mature natural forest is rare, so these pixels are most likely a classification error, or a plantation misclassified as natural forest.')}`,
    'phase4a-trajectory') +

  docSection('Step 3. The reference ecosystem', `
    <p>The reference ecosystem answers what should grow here. It is the potential natural vegetation of the site, not its current cover. The layer is built from three independent sources combined in a fixed order: mapped historical mangrove extent, national and global peat maps, and a global ecosystem typology for the split between forest and naturally open systems. Where sources disagree the edaphic references win, because soil and tidal conditions are far more stable than vegetation cover.</p>
    ${docTable(['Reference ecosystem', 'What it is', 'What it implies for restoration'], [
      ['<strong>Dryland forest</strong>', 'Terrestrial forest, not flooded, not on peat', 'Tree planting on mineral soil'],
      ['<strong>Mangrove</strong>', 'Intertidal forest', 'Tidal reconnection first, then planting'],
      ['<strong>Peatland</strong>', 'Peat soil, forested or not', 'Water table first, then vegetation'],
      ['<strong>Savanna and grassland</strong>', 'Naturally open, fire-maintained systems', 'Native grasses and herbs, no afforestation'],
      ['<strong>None</strong>', 'No reference could be assigned', 'No restoration target, so no restoration activity']
    ])}
    ${docCaption('Table 14. The five reference ecosystem values.')}
    <p>The reference is the only input that separates degradation from natural condition. Without it, every open landscape in Southeast Asia looks like degraded forest and the tool would recommend planting trees on tens of millions of hectares of natural savanna. Where no reference can be assigned the tool cannot say what the site should become, so it does not recommend restoration there: reporting an honest gap is better than recommending planting with no target species.</p>`,
    'phase4a-reference') +

  docSection('Step 4. The decision matrix', `
    <p>Four categories split further on a condition, so the ten categories become seventeen decision rows. The row identifier is carried in band 3 of the pathway raster and becomes one of the two join keys in Phase 4b.</p>
    ${docTable(['Row', 'Category', 'Trajectory', 'Condition', 'Pathway'], [
      ['1', '<strong>Cat 1</strong>', 'Forest persisting', 'None', 'Protect'],
      ['2', '<strong>Cat 2</strong>', 'Forest lost to plantation', 'None', 'Carbon ineligible'],
      ['3', '<strong>Cat 3A</strong>', 'Forest degraded to vegetation', 'Reference is savanna', 'Carbon ineligible'],
      ['4', '<strong>Cat 3B</strong>', 'Forest degraded to vegetation', 'Other reference', 'Restore'],
      ['5', '<strong>Cat 4A</strong>', 'Forest converted to active use', 'Reference is savanna', 'Carbon ineligible'],
      ['6', '<strong>Cat 4B</strong>', 'Forest converted to active use', 'Other reference', 'Restore'],
      ['7', '<strong>Cat 5</strong>', 'Forest converted to barren', 'None', 'Restore'],
      ['8', '<strong>Cat 6</strong>', 'Forest recovery', 'None', 'Manage'],
      ['9', '<strong>Cat 7</strong>', 'Plantation stable', 'None', 'Carbon ineligible'],
      ['10', '<strong>Cat 8A</strong>', 'Non-forest vegetation stable', 'Savanna reference, natural', 'Carbon ineligible'],
      ['11', '<strong>Cat 8B</strong>', 'Non-forest vegetation stable', 'Savanna reference, cultivated', 'Manage'],
      ['12', '<strong>Cat 8C</strong>', 'Non-forest vegetation stable', 'Richer reference', 'Restore'],
      ['13', '<strong>Cat 9A</strong>', 'Active use stable', 'Cropland or rice', 'Manage'],
      ['14', '<strong>Cat 9B</strong>', 'Active use stable', 'Aquaculture on mangrove or peat', 'Restore'],
      ['15', '<strong>Cat 9C</strong>', 'Active use stable', 'Aquaculture elsewhere', 'Manage'],
      ['16', '<strong>Cat 9D</strong>', 'Active use stable', 'Settlement', 'Carbon ineligible'],
      ['17', '<strong>Cat 10</strong>', 'Barren stable', 'Reference is not none', 'Restore']
    ])}
    ${docCaption('Table 15. The seventeen decision rows, their trajectory, the condition that splits them, and the pathway each is assigned.')}
    <figure class="doc-embed">
      <iframe src="NbS_Activities_Flow_v2.html?embed" loading="lazy" title="Activity matrix: how each pathway continues into an ecosystem, an activity, a benefit and an indicator"></iframe>
      <figcaption>Where the decision rows lead. Each pathway continues into an ecosystem, an activity, a benefit and the indicator that measures it. The six rows that resolve to Carbon ineligible carry no activities, so they are not drawn.</figcaption>
    </figure>
    <p><a class="doc-cta" href="NbS_Activities_Flow_v2.html">See the detailed activities matrix<span aria-hidden="true">&rarr;</span></a></p>

    <h3>Three properties reviewers test first</h3>
    <p><strong>Protect appears only in Category 1.</strong> A stable natural savanna is a valuable ecosystem, but under the present carbon framework it does not support a credible carbon project, so it is reported as carbon ineligible rather than as Protect. This is a statement about carbon eligibility, not about ecological value.</p>
    <p><strong>Category 6, forest recovery, is Manage and not Protect.</strong> Natural regeneration already succeeded on this land without planting, so Restore would be wrong, and planting could damage the species mix that has formed on its own. Protect would also be wrong, because the site is still changing. Manage is the correct answer, but it carries a condition: young secondary forest holds real carbon and faces a real risk of clearing, because it has low timber value, unclear land status, and is often seen locally as scrub rather than forest. The activity list for Category 6 must therefore include threat reduction, not only recovery support.</p>
    <p><strong>Category 4B, forest converted to active use, is Restore.</strong> This is the one place where the two framing rules pull in opposite directions. The land is occupied and productive, which favours Manage. The site is also far below its reference, and the conversion happened inside the last ten years, which favours Restore. The framework resolves this in favour of Restore, because recent conversion from natural forest is exactly the situation where restoration carries the highest carbon and biodiversity return. The tenure question does not disappear: it moves to the feasibility stage, outside this tool.</p>`,
    'phase4a-matrix') +

  docSection('Step 5. What the phase reports', `
    <p>The pathway raster carries three bands. This phase tabulates band 1 only. Bands 2 and 3 pass through to Phase 4b, where together they select the activities.</p>
    ${docTable(['Band', 'Name', 'Codes'], [
      ['1', 'pathway', '0 no data, 1 Protect, 2 Manage, 3 Restore, 4 Ineligible'],
      ['2', 'ecosystem', '0 none, 1 dryland forest, 2 mangrove, 3 peatland, 4 savanna'],
      ['3', 'cat_code', '1 to 17, the decision row index from Table 15']
    ])}
    ${docCaption('Table 16. Pathway raster band layout.')}
    <p>The denominator for the distribution is the total project area, with an Unclassified row absorbing code 0 and nodata so that the table sums to 100 percent. Code 4, Ineligible, is listed but excluded from the eligible headline, because it is not a pathway.</p>

    <h3>When a pathway is reported as not eligible</h3>
    <p>A project area can hold no eligible hectares for a pathway. The tool then reports that pathway as not eligible rather than leaving it blank.</p>
    ${docTable(['Pathway', 'Reported as not eligible where'], [
      ['<strong>Protect</strong>', 'The forest remains intact and no significant deforestation risk is detected, so there is nothing to avoid.'],
      ['<strong>Manage</strong>', 'The forest remains intact and shows no sufficient signs of degradation; forest has already been converted to barren land and is no longer suitable for a forest management intervention; or most of the area is stable non-forest vegetation.'],
      ['<strong>Restore</strong>', 'Forest cover still persists; forest was converted to active use or non-forest use that is already established; or the site is a natural ecosystem in its own right that does not need restoring.']
    ])}`,
    'phase4a-reports');
}

/* Phase 4b. The catalogue below is the Reference Methodology's Table 17, transcribed.
   TODO(design): the activity list the screens use (js/f05-shared.js) is keyed by
   ecosystem and pathway, has no savanna column and offers four activities this
   table marks "not offered". Reconcile the two with the methodology team. */
function docsPhase4Activities() {
  const no = '<em>not offered</em>';
  return docHero(G_PHASES + ' &middot; Phase 4b', 'Activity selection',
    'Phase 4a decides which pathway the land can take. Phase 4b decides what to do on the land. The tool does not select an activity from the pathway alone. It selects an activity from two things together: what happened to the land, and the ecosystem that belongs there. On a forest reference, Restore means planting trees. On a mangrove reference, Restore means breaching pond dykes. On a peat reference, Restore means raising water tables. These are different projects with different costs and different carbon outcomes.',
    []) +

  docSection('How an activity is matched to the land', `
    <p>The pathway raster from Phase 4a carries, for every pixel, the decision row it fell into and its reference ecosystem. Phase 4b reads those two bands on the same grid and lists the unique pairs present in the project area, each with its area. Each pair is then looked up in the activity catalogue, which is keyed on exactly that pair.</p>
    ${docEquation('Pairs Present = unique ( Category, Reference Ecosystem ) combinations inside the boundary, with area')}
    ${docEquation('Activities = join ( Pairs Present, Activity Catalogue ) on ( Category, Reference Ecosystem )',
      'Category is the decision row, 1 to 17, from the decision matrix. Reference Ecosystem is dryland forest, mangrove, peatland or savanna. Carbon ineligible categories carry no activity by design. A category with no matching catalogue row is flagged, not dropped.')}
    ${docNote('This phase is read from the tool itself: the canonical activity catalogue and the join logic of Phase 4.')}`,
    'activity-join') +

  docSection('What follows from the match', `
    <ul>
      <li><strong>One pathway can carry several activities.</strong> A project area has one activity for each category and ecosystem combination present, so a mixed site has a longer activity list than a uniform one.</li>
      <li><strong>The list is not filtered by anything the user chooses.</strong> Switching a pathway on or off on the screen includes or leaves out its activities in the benefit roll-up. It does not change which activities the ground is eligible for.</li>
      <li><strong>Savanna is shown with dryland.</strong> For display, the savanna reference is folded into the dryland group. That changes only the group heading, never the category, pathway or activity of a pixel.</li>
    </ul>
    <p>Besides its text, each catalogue row carries three benefit fields, one for each of nature, people and climate, and two carbon flags. Those travel through to ${docJump('Phase 5 · Potential benefit', 'phase5')}, where the benefit list is assembled from them.</p>`,
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
    <p>A carbon ineligible area is reported with a sentence naming the reason rather than hidden, so a user can see whether the constraint is the land&rsquo;s history, its reference ecosystem, or its current use. The categories are defined in ${docJump('the decision matrix', 'phase4a#phase4a-matrix')}.</p>`,
    'activity-catalogue') +

  docSection('Two deliberate gaps', `
    <p>Two gaps in the catalogue are intended, not missing data.</p>
    <ul>
      <li><strong>Category 9B has no dryland or savanna row.</strong> Aquaculture outside mangrove and peat is sent to Manage under Category 9C instead.</li>
      <li><strong>Categories 3B, 4B and 8C have no savanna row.</strong> A savanna reference sends those trajectories to carbon ineligible under Categories 3A, 4A and 8A. This is the guardrail against planting trees on land that is naturally open.</li>
    </ul>
    ${docCallout('What selection does not decide', 'The catalogue says an activity is <em>ecologically appropriate</em> for the ground. It does not consider cost, available labour, community consent, land tenure or market access. A shortlist from this phase is an input to a feasibility study, not a substitute for one.', 'warn')}`,
    'activity-gaps');
}

/* -------------------------------------------------------------------- Phase 5 */
/* "What the tool says" quotes the Data Analyser's own sentences
   (js/analysis-shared.js), with the figures replaced by [placeholders]. */
function docsPhase5() {
  return docHero(G_PHASES + ' &middot; Phase 5', 'Potential benefit',
    'Potential benefit is the last phase. The full chain exists to produce it. The tool invents nothing at this stage. Each qualitative benefit comes from a benefit tag on an activity that the pathway logic already selected. If an activity is not eligible on this ground, the tool does not show its benefits.') +

  docSection('How benefits are split', `
    <p>The interface splits benefits two ways and this page follows the same split. By pillar: Nature, People and Climate. By type: general benefits, which any project on the pathway would deliver, and unique benefits, which depend on the specific conditions of the site, such as the threatened species present or the hazards the community faces. A benefit shown without a number is not a weaker benefit; it is one for which the tool has no defensible spatial method yet.</p>`,
    'phase5-split') +

  docSection('Parameters', `
    ${docTable(['Label', 'Default and range', 'Explanation'], [
      ['<strong>Duration of intervention</strong>', '30 years; 10 to 70', 'Enters every projection as the time variable. The restoration growth curve is defined only to year 40, so a longer duration is flagged rather than extrapolated. Written into every saved result, so a result records the duration it was produced with.'],
      ['<strong>Carbon project</strong>', 'No', 'Answering Yes exposes the three deductions below and the three net carbon figures. Answering No leaves only the gross figures visible.'],
      ['<strong>Leakage deduction</strong>', '15%; 1 to 100', 'Emission displacement outside the project boundary.'],
      ['<strong>Uncertainty</strong>', '10%; 1 to 100', 'Discount for error in data and models.'],
      ['<strong>Buffer pool deduction</strong>', '12%; 1 to 100', 'Set-aside against reversal and non-permanence risk.']
    ])}
    ${docCaption('Table 18. User parameters that enter Phase 5.')}
    ${docCaution('These three defaults are generic, not methodology-specific. A 15 percent leakage deduction is not a universal minimum requirement: it is an optional conservative default that may be applied only where the relevant methodology permits it and where activity-shifting leakage must be quantified. The official buffer pool contribution must be determined with the Verra AFOLU Non-Permanence Risk Tool and Risk Assessment Calculator during project validation. If you are working toward a particular standard, replace all three with that standard&rsquo;s values before quoting any net figure, and record what you used.')}`,
    'phase5-parameters') +

  docSection('The shared projection', `
    <p>Five quantified components answer the same question: how much of this project area would be lost over the project duration if nothing were done, and where. The answer has two parts, how much and where.</p>
    ${docFormula('How much: compounding projection of the historical rate',
      ['Projected Loss (ha) = Risk Area (ha) &times; ( 1 &minus; e<sup>&minus;rt</sup> )'],
      [['Risk Area', 'The eligible area that carries a deforestation risk value, in hectares.'],
       ['r', 'The annual deforestation rate from Phase 2, as a decimal. A 2 percent rate becomes 0.02.'],
       ['t', 'Project duration in years.'],
       ['e', 'Euler&rsquo;s number, approximately 2.718.']],
      'Puyravaud (2003), for the annual rate that is projected forward.')}
    <p><strong>Where.</strong> Not all forest is equally vulnerable, so instead of assuming an average carbon loss across the whole area, the tool ranks every eligible pixel from highest deforestation risk to lowest, then moves down that list selecting the most threatened pixels one by one until their combined area equals the projected loss.</p>
    ${docNote('The exponential form prevents over-projection over long timeframes: it approaches the eligible area asymptotically and can never exceed it, which a simple multiplication of hectares per year can. The ranked allocation, in turn, tends to attribute projected loss to frontier and edge forest, which often carries less biomass than intact interior forest, so the carbon result tends to be lower than a uniform distribution would give. Both allocations are computed so they can be compared. And because the rate is a project-area average that may include degraded, fast-losing edge forest, applying it to Protect areas can overestimate the baseline.')}`,
    'phase5-projection') +

  /* ---- Nature ---- */
  docSection('Nature components', `
    <p>Five components make up the nature pillar, three general and two unique.</p>

    <h3>Maintenance of ecological connectivity</h3>
    <p><em>General benefit, all three pathways.</em> Reports whether the site holds habitat that links otherwise separate blocks, and how much of it. The classified Morphological Spatial Pattern Analysis result (Vogt et al. 2022) is intersected with each pathway. Under Protect the narrative reports the intact block conserved and the corridor area, bridge plus loop, within it. Under Manage it reports the connector and edge habitat whose condition can be improved. Under Restore it reports the number of separate habitat patches that restoration would re-link, counted as connected cores with 8-connectivity.</p>
    ${docSays('Conserving this [ecosystem] ecosystem keeps an estimated [X] ha block of natural habitat intact and safeguards its role as a connector in the surrounding landscape. Based on the site structure, [Y] ha (&asymp; [Z]%) of the area functions as a corridor linking separate habitat cores. Protecting it prevents the fragmentation that would likely occur under current deforestation pressure over the [t]-year project period.')}

    <h3>Protection of watershed function</h3>
    <p><em>General benefit, Protect and Restore.</em> Reports the capacity of the landscape to capture, store, filter and slowly release water, and what keeping natural cover protects. It is reported qualitatively against the ecosystem and cover present.</p>
    ${docSays('Safeguarding this [ecosystem] ecosystem helps protect the natural capacity of the landscape to capture, store, filter, and slowly release water. Keeping the site under healthy natural cover supports more stable river flow, lower erosion and sediment loads, and better water quality downstream.')}
    ${docCaution('No hydrological model is run. There is no catchment delineation, no water yield figure and no sediment figure. The claim is directional, not quantified, and should not be presented as a modelled result. The launch version is expected to add InVEST Sediment Delivery Ratio and Seasonal Water Yield modelling.')}

    <h3>Enhanced biodiversity and ecosystem function</h3>
    <p><em>General benefit, Protect.</em> Reports how many hectares of suitable habitat would be lost under the baseline, and therefore how much habitat loss conservation avoids. The projected baseline loss from the shared projection is intersected with Area of Habitat, unioned across mammals, birds, reptiles and amphibians into a single habitat mask.</p>
    ${docFormula('Habitat loss avoided',
      ['Habitat Loss Avoided (ha) = Sum ( Pixel Area &times; Allocated Loss &times; Habitat Union )'],
      [['Pixel Area', 'Ground area of one pixel, in hectares.'],
       ['Allocated Loss', '1 where the ranked allocation placed projected loss on that pixel, 0 otherwise.'],
       ['Habitat Union', '1 where any of the four taxon habitat rasters marks the pixel as suitable habitat, 0 otherwise.']],
      'Brooks et al. (2019), for Area of Habitat.')}
    ${docSays('Conserving this [ecosystem] ecosystem maintains an estimated [X] hectares of suitable habitat, safeguarding habitat extent for species over the [t] year of project&rsquo;s duration.')}
    ${docNote('The union mask means one hectare of habitat shared by fifty species is counted once, which is correct for area but carries no information about species richness. The component therefore reports the number of species overlapping the projected loss separately.')}

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
    <p><em>Unique benefit, Manage and Restore.</em> Reports the potential biodiversity uplift from restoration, expressed in condition-adjusted hectares. The method is a spatially explicit adaptation of the area-adjusted Condition approach of the SD VISta Nature Framework v1.0, which defines area-adjusted condition as ecosystem extent multiplied by standardised ecosystem condition. The tool applies that relationship at pixel level and sums the difference between projected project condition and baseline condition across eligible restoration pixels.</p>
    ${docFormula('Framework definition',
      ['Potential Biodiversity Uplift (ha) = Restore Area &times; ( Condition<sub>project</sub> &minus; Condition<sub>baseline</sub> )'],
      [], 'SD VISta Nature Framework v1.0, area-adjusted condition.')}
    ${docFormula('As implemented',
      ['Gain Rate = Gain Area (2014 to 2024) / Restore Area / 10',
       'Degradation Rate = Degradation Area (2014 to 2024) / Restore Area / 10',
       'Condition Uplift = minimum of 1.0 and ( Gain Rate + Degradation Rate ) &times; t',
       'Biodiversity Uplift (ha) = Restore Area &times; Condition Uplift'],
      [['Condition', 'Expressed on a scale from 0 to 1, so the result reads as condition-adjusted hectares.'],
       ['10', 'Years in the observation window, to give an annual rate.'],
       ['t', 'Project duration in years.']],
      'SD VISta Nature Framework v1.0, adapted to pixel level.')}
    ${docSays('By restoring degraded areas, this project may expand habitat for [N] species, including [X]% threatened species: [a] CR, [b] EN, and [c] VU. Over the project&rsquo;s [t] year duration, the intervention may increase suitable habitat by [P]% for [N] species through: [selected activities].')}
    ${docCaution('Condition is inferred from observed tree-cover gain and degradation rates over the 2014 to 2024 window, not measured directly. The implementation adds the degradation rate to the gain rate, which treats observed degradation as additional condition headroom the project can recover rather than as a decline in the baseline. That reading is defensible as the total condition gap a project could close, but it is not the only reading of the project-minus-baseline difference, and it inflates the uplift on sites that are degrading fast. The result is condition-adjusted hectares, a screening unit, not a biodiversity credit.')}`,
    'phase5-nature') +

  /* ---- People ---- */
  docSection('People components', `
    <p>In version 3 the People pillar is purely qualitative and generates no numbers from raster data. This is a deliberate constraint rather than a gap: outcomes such as tenure security, benefit sharing, governance capacity and cultural continuity are institutional and unobservable from satellite, and spatial proxies for them would lack a defensible link to actual outcomes. The sole exception is protection of watershed function, reported for Protect and Restore in areas facing soil erosion risk, and it still runs no hydrological model.</p>
    <p>The tab also asks the user qualitative benefit specification questions covering household access to water and food, the primary livelihood source, governance capacity, benefit-sharing transparency and tenure status. These are inputs the user supplies from field knowledge, not modelled values.</p>
    ${docTable(['Benefit', 'Type and pathway', 'What it means'], [
      ['<strong>Enhanced food and water security</strong>', 'General', 'Year-round, climate-resilient community access to critical nutritional and hydrological resources, by stabilising and restoring vital ecosystem functions.'],
      ['<strong>Sustainable livelihood opportunities</strong>', 'General; also unique to Manage and to Restore', 'Climate-adaptive, nature-positive revenue streams that allow households to withstand economic shocks without degrading or depleting the local natural resource base. As a unique benefit it is anchored in ecosystem services and non-timber forest assets under Manage, and in restoration services under Restore.'],
      ['<strong>Strengthened social capital and governance capacity</strong>', 'General', 'Community cohesion, institutional trust, and local legislative and operational capacity to manage resources, enforce rules and resolve conflicts independently.'],
      ['<strong>Equitable benefit-sharing mechanisms</strong>', 'General', 'Transparent, inclusive and legally binding frameworks that distribute project rewards and resource rights fairly, and actively prevent elite capture.'],
      ['<strong>Secure land and resource tenure</strong>', 'Unique, Protect', 'Formalisation, legal protection and institutional enforcement of a community&rsquo;s rights to possess, use, manage and inherit land and natural resources, safeguarding them against displacement and unauthorised exploitation.'],
      ['<strong>Cultural heritage preservation</strong>', 'Unique, Protect', 'Safeguarding and transmission of a community&rsquo;s intangible traditions, local ecological knowledge, sacred sites and customary ways of life that are intertwined with the landscape.'],
      ['<strong>Protection of watershed function</strong>', 'Unique, Protect and Restore', 'Reduced soil erosion and sediment reaching nearby rivers, helping maintain water quality for downstream users. Applied only in areas exposed to soil erosion risk.']
    ])}
    ${docCaption('Table 19. People benefits, general and unique.')}`,
    'phase5-people') +

  /* ---- Climate ---- */
  docSection('Climate components', `
    <p>Two figures are produced from opposite sides of the pathway assignment. The avoided-emissions component quantifies the Protect side, emissions that would otherwise happen. The sequestration component quantifies the Restore side, removals from growth that would otherwise not happen. They are in the same units over the same duration, so they can be presented side by side without conversion. The Manage carbon component is not started; the Manage qualitative benefits already appear in the general benefit list.</p>
    ${docTable(['Constant', 'Value', 'Meaning'], [
      ['<strong>Carbon Fraction</strong>', '0.47', 'Dry matter to carbon, IPCC 2006 Guidelines Volume 4 Chapter 4. Mangrove uses 0.451 in the restoration method.'],
      ['<strong>CO&#8322; per Carbon</strong>', '44 / 12', 'Molecular weight ratio, tonnes of carbon dioxide equivalent per tonne of carbon. Equal to 3.67.'],
      ['<strong>Root-to-Shoot Ratio</strong>', '0.28', 'Derives below-ground from above-ground biomass in the avoided-emissions component. The restoration method uses per-ecosystem ratios instead.'],
      ['<strong>Baseline Rate Window</strong>', '10 years', 'The window the deforestation rate is measured over. Longer project durations extrapolate beyond it and are flagged.']
    ])}
    ${docCaption('Table 20. Constants used throughout the climate components.')}

    <h3>Reduced emissions from deforestation and degradation</h3>
    <p>How much carbon dioxide equivalent a Protect project could keep out of the atmosphere over its lifetime. This is the avoided unplanned deforestation case: loss driven by diffuse, unsanctioned pressure, which is why the baseline comes from a spatial risk model rather than from a document. Avoided planned deforestation is a different construct with a different baseline and is not what this component estimates. There are four steps.</p>
    ${docFormula('Avoided emissions, in four steps',
      ['Step 1. Total Protect Area (ha) = Sum ( pixels designated Protect and pixels carrying a risk value )',
       'Step 2. Projected Loss (ha) = Total Protect Area &times; ( 1 &minus; e<sup>&minus;rt</sup> )',
       'Step 3. Rank eligible pixels by deforestation risk, highest first, then select down that list until the selected area equals Projected Loss.',
       'Step 4. Avoided Emissions (tCO&#8322;e) = Sum [ AGB Density &times; ( 1 + Root-to-Shoot Ratio ) &times; Carbon Fraction &times; 44 / 12 &times; Pixel Area ]'],
      [['AGB Density', 'Above-ground dry biomass on the pixel, in megagrams per hectare.'],
       ['1 + Root-to-Shoot Ratio', '1.28, which adds below-ground biomass because no root layer is mapped.'],
       ['Carbon Fraction', '0.47, the share of dry biomass that is carbon.'],
       ['44 / 12', 'Converts carbon to carbon dioxide equivalent.'],
       ['Sum', 'Summed over the pixels selected in step 3.']],
      'IPCC 2006 Guidelines, Volume 4, Chapter 4, for the carbon fraction and root-to-shoot ratio; Puyravaud (2003) for the rate.')}
    ${docSays('Protecting this [ecosystem] ecosystem can avoid an estimated [X] tonnes of CO&#8322;eq emissions over the project&rsquo;s [t] year duration.')}
    ${docCaution('The earlier methodology documentation prints the final factor in step 4 as 44 divided by 7. The correct and implemented factor is 44 divided by 12. Using 44 divided by 7 would overstate the result by roughly 70 percent.')}
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
      [['Growth Rate', 'Reference accumulation rate in megagrams of dry matter per hectare per year, from Table 21.'],
       ['Years<sub>young</sub>, Years<sub>old</sub>', 'Years of the project duration falling in years 1 to 20 and 21 to 40 respectively.'],
       ['Baseline CO&#8322;e', 'The biomass already standing on the site, deducted so only additional growth is credited.'],
       ['Stocking Factor', 'A multiplier representing tree density. Active planting reaches full stocking at 1.0; Assisted Natural Regeneration and ecological mangrove restoration are estimated at 0.8.']],
      'IPCC 2006 Guidelines, Volume 4, for carbon fractions and root-to-shoot ratios; Walsh (1996) for the dry-month threshold. The reference document names no source for the growth rates in Table 21.')}
    ${docTable(['Ecosystem or zone', 'Young, years 1 to 20', 'Old, years 21 to 40', 'Root-to-shoot ratio', 'Carbon fraction'], [
      ['<strong>Mangrove</strong>', '12.0', '7.0', '0.39', '0.451'],
      ['<strong>Peatland</strong>', '5.7', '3.5', '0.25', '0.47'],
      ['<strong>Dryland, humid lowland</strong>', '3.4', '2.7', '0.21', '0.47'],
      ['<strong>Dryland, seasonal lowland</strong>', '2.4', '2.0', '0.44', '0.47'],
      ['<strong>Dryland, humid montane</strong>', '2.4', '1.9', '0.32', '0.47']
    ])}
    ${docCaption('Table 21. Reference accumulation rates, in megagrams of dry matter per hectare per year, with the root-to-shoot ratio and carbon fraction used for each.')}
    <p>The dryland zone is derived per pixel from elevation and the twelve monthly precipitation bands, so one trajectory category can carry three different rates across a single project area.</p>
    ${docTable(['Order', 'Condition', 'Zone assigned'], [
      ['1', 'Elevation above 1,000 m', 'Humid montane'],
      ['2', 'Annual rainfall above 2,000 mm and fewer than three dry months', 'Humid lowland'],
      ['3', 'Everything else, including boundary and missing-data pixels', 'Seasonal lowland, the conservative default']
    ])}
    ${docCaption('Table 22. Dryland climatic zone assignment, evaluated in order. A dry month is one below 100 mm (Walsh 1996).')}
    <p>The baseline deducted at step 4 is class-based: a small assumed standing biomass per current ecological state, 25 Mg per hectare for C4, 5 for C5 and 0 for C6, converted through the same chain and clamped at zero. This replaced a per-pixel biomass baseline, which zeroed almost all vegetated Restore land because the source reads a high baseline at low biomass. The per-pixel baseline and the gross figure are still computed and reported alongside for comparison.</p>
    ${docSays('Restoring and sustainably managing this [ecosystem] ecosystem can sequester an estimated [X] tonnes of CO&#8322;eq over the project&rsquo;s [t] years duration.')}
    ${docNote('The eligibility gate is the method&rsquo;s own pair list, not the catalogue carbon flag, because the two currently disagree. Restore categories 3B, 4B, 5, 8C and 10 qualify on dryland, mangrove and peatland. Category 9B qualifies on mangrove only, because on peat it is rewetting without planting. Savanna is deferred throughout. Peatland is, at the time of writing, temporarily excluded by team decision even though the rates exist.')}
    ${docCaution('The low and high figures are simply the total multiplied by 0.70 and 1.20. They are an indicative screening range, not a confidence interval and not a creditable volume. Beyond year 40 nothing further is credited, because the curve is defined only that far. No-data above-ground biomass counts as a zero baseline, which over-credits, the opposite direction to the equivalent rule on the avoided-emissions side. And even where peat is enabled the estimate is biomass only: peat soil carbon and avoided emissions from rewetting, usually the largest peat pool, stay out of scope.')}`,
    'phase5-climate') +

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

  docSection('Resilience and microclimate', `
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
    ${docNote('Linear extrapolation assumes the gain rate stays constant. Tree-cover gain is rarely linear: regrowth can accelerate once established, or plateau as land runs out or succession matures. A flat annual average is the simplest defensible assumption but drifts from reality the further it is projected. The cooling effect itself is cited from De Frenne et al. (2019) rather than modelled for the site.')}`,
    'phase5-resilience') +

  docSection('Implementation status', `
    ${docTable(['Component', 'Pillar', 'Status'], [
      ['General benefit listing, from activity benefit tags merged per pathway', 'All three', 'Implemented'],
      ['Avoided emissions from unplanned deforestation', 'Climate', 'Implemented'],
      ['Carbon removal from restoration, ex-ante', 'Climate', 'Implemented. Class baseline values are placeholders pending literature references'],
      ['Net emission reduction, net sequestration, net emission reductions and removals', 'Climate', 'Implemented, on user-supplied deductions'],
      ['Maintenance of ecological connectivity', 'Nature', 'Specified in the interface. Morphological class codes flagged to verify on first run'],
      ['Enhanced biodiversity, threatened species habitat, biodiversity uplift', 'Nature', 'Specified with formulas. Habitat components read the habitat rasters directly'],
      ['Protection of watershed function', 'Nature and People', 'Narrative only. Hydrological modelling deferred to the launch version'],
      ['Manage-side carbon', 'Climate', 'Not started'],
      ['All other People components', 'People', 'Qualitative by design']
    ])}
    ${docCaption('Table 23. What is quantified today.')}`,
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
    'When you finish the analysis, a dialog opens with three exits. You can open the dialog again from the Data Analyser panel at any time.') +

  docSection('The three exits', `
    ${docTable(['Option', 'What it does', 'Guest status'], [
      ['<strong>Save to my Project</strong>', 'Stores the polygon and the full analysis to the account portfolio.', 'Opens a login dialog'],
      ['<strong>Generate Document (Feasibility)</strong>', 'Builds the pre-feasibility study document, including the complete administrative and land cover breakdowns that the panels only summarise.', 'Disabled until saved'],
      ['<strong>Create Monitoring Plan</strong>', 'Select activities and metric indicators to track over time.', 'Disabled until saved']
    ])}
    ${docCaption('Table 24. The three exits and their availability in a guest session.')}
    <p>Every phase writes a result file keyed to the project boundary, and each saved result records the inputs it was produced with, including the project duration. A phase can therefore be re-run without re-running the ones before it.</p>
    <p>The two exits that follow a saved project are described in ${docJump('Phase 6 · Monitoring planning', 'phase6')} and ${docJump('Phase 7 · Generate documents', 'phase7')}.</p>`,
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
    ${docCaption('Table 25. Symptoms observed in a live run, and what each one means.')}`,
    'troubleshooting');
}

function docsWorkedExample() {
  return docHero(G_OUTPUTS, 'Worked example',
    'This page shows how one polygon goes from a boundary to the figures of a feasibility study. It is one complete guest run. The run stays here as a reference for what the full chain produces. The figures are the tool&rsquo;s output for this polygon and these settings. A different polygon or different settings give different results.') +

  docSection('The run', `
    <p>Guest run of 11 September 2026. Area of interest: a zipped shapefile covering 110.15 to 110.38 degrees east and 0.67 to 0.91 degrees north, in Sanggau and Landak districts, Kalimantan Barat.</p>
    ${docTable(['Step', 'What the tool did', 'Result'], [
      [`<strong>${docJump('Phase 1', 'phase1')}</strong><br>Select location`, 'Measured the uploaded boundary on the pathway grid and checked it against the session limit.', 'Area accepted: 67,439.02 ha, within the 100,000 ha guest cap.'],
      [`<strong>${docJump('Phase 2', 'phase2')}</strong><br>Site characterisation`, 'Clipped every layer to the boundary and summarised it.', 'Ecosystem composition: dryland forest 98.76%, other 1.24%. No mangrove or peatland.<br>Protected area overlap: 6,676.96 ha, Gunung Nyiut Penrissen.<br>Key Biodiversity Area overlap: 14,316.72 ha, Gunung Niut-Poteng.<br>Deforestation 2014 to 2024: 10,480.36 ha lost, 2.42% per year; top 30.81% of national forest by risk.<br>Forest landscape integrity: 4.53 of 10, low integrity: 0% high, 44.94% medium, 55.06% low.<br>Carbon stock: 81,218,608 tCO&#8322;e as the interface shows it; soil organic carbon 66.4%, above-ground biomass 26.3%, below-ground biomass 7.4%.'],
      [`<strong>${docJump('Phase 3', 'phase3')}</strong><br>Threat profile`, 'Crossed the disturbance layer with the ecosystem layer and tabulated the drivers.', 'Disturbance: 13,101.84 ha (19.7%), driven mainly by small-scale agriculture and small-scale agriculture with fire.'],
      [`<strong>${docJump('Phase 4a', 'phase4a')}</strong><br>Pathway selection`, 'Assigned every pixel to a decision row and tabulated the pathway band.', 'Protect 38,345.93 ha (57.58%), Manage 6,063.41 ha (9.1%), Restore 16,445.83 ha (24.69%).'],
      [`<strong>${docJump('Phase 4b', 'phase4b')}</strong><br>Activity selection`, 'Joined the category and ecosystem pairs to the activity catalogue. The user then chose the settings.', 'Protect and Restore selected, 3 of 6 activities, 30 years, carbon project on, deductions left at 15, 10 and 12%.'],
      [`<strong>${docJump('Phase 5', 'phase5')}</strong><br>Potential benefit`, 'Projected the baseline loss, allocated it by risk, and quantified the nature and climate components.', 'Gross avoided emissions: 8,714,731 tCO&#8322;e.<br>Gross removals: 2,320,758 tCO&#8322;e, indicative range 1,624,531 to 2,784,910.<br>Nature results: 38,334 ha kept connected, of which 704 ha is corridor; 18,030 ha of suitable habitat safeguarded; 21 threatened species with reduced risk; 113 species with expanded habitat.']
    ])}
    ${docCaption('Table 26. The run, phase by phase.')}`,
    'worked-example') +

  docSection('From gross to net carbon', `
    <p>With the carbon project question answered Yes, the three deductions turn the two gross figures into three net figures.</p>
    ${docTable(['Figure', 'Calculation', 'Result'], [
      ['<strong>Net carbon emission reduction</strong>', '8,714,731 &minus; 1,307,210 (leakage 15%) &minus; 871,473 (uncertainty 10%) &minus; 1,045,768 (buffer 12%)', '5,490,280 tCO&#8322;e'],
      ['<strong>Net carbon sequestration</strong>', '2,320,758 &minus; 348,114 &minus; 232,076 &minus; 278,491', '1,462,078 tCO&#8322;e'],
      ['<strong>Net emission reductions and removals</strong>', '11,035,489 gross; less leakage and uncertainty 8,276,617; less the buffer, applied once to that total', '7,283,423 tCO&#8322;e over 30 years, about 242,781 per year']
    ])}
    <p>Two features of this run are worth noticing. The three net carbon figures differ because the buffer is applied differently in each, as described under ${docJump('Phase 5', 'phase5#phase5-net')}. And the interface reported the carbon stock in tonnes of carbon dioxide equivalent while the method reports that stock in tonnes of carbon, so the unit label has to be read before the figure is quoted.</p>`,
    'worked-example-carbon') +

  docSection('From the analysis to a feasibility study', `
    <p>A guest run ends at the figures above. Turning them into a document needs a saved project, which needs an account.</p>
    <ol>
      <li><strong>Save to my Project.</strong> The polygon and the full analysis are stored in the account portfolio, with the settings they were produced with.</li>
      <li><strong>Generate Document (Feasibility).</strong> The saved figures are placed into the pre-feasibility study document, together with the complete administrative and land cover breakdowns that the panels only summarise. See ${docJump('Phase 7 · Generate documents', 'phase7')}.</li>
      <li><strong>Create Monitoring Plan.</strong> The selected activities are matched to indicators to track over time. See ${docJump('Phase 6 · Monitoring planning', 'phase6')}.</li>
    </ol>
    ${docNote('The figures in this example are a screening result. Before they go into a proposal they need field verification, as set out in the limitations that follow.')}`,
    'worked-example-study');
}

function docsLimitations() {
  return docHero(G_OUTPUTS, 'Known issues and limitations',
    'The tool is a pre-feasibility screen. Almost every panel says so, with the line &ldquo;field verification required&rdquo;. Nothing on this page replaces a ground survey, tenure due diligence, or a methodology-compliant baseline. The items on this page are the items most likely to cause a person to quote a figure incorrectly.') +

  docSection('Inconsistencies between the documentation and the implementation', `
    ${docTable(['Item', 'Reading to use'], [
      ['The narrative printed under net emission reductions and removals states that the figure does not yet subtract the buffer, while the code that produces it does subtract the buffer.', 'Treat the figure as buffer-deducted and disregard the sentence. Do not quote that narrative to a third party.'],
      ['The earlier methodology documentation prints the carbon dioxide conversion factor as 44 divided by 7.', 'The implemented and correct factor is 44 divided by 12.'],
      ['Site characterisation reports carbon stock in tonnes of carbon; the interface card shows tonnes of carbon dioxide equivalent.', 'Read the unit label. The factor between them is 3.67.'],
      ['Phase 1 area: the documentation specifies reprojection to ESRI:54034; the tool integrates geodesic pixel areas on the pathway grid.', 'Both are equal-area. Expect a small difference, not a large one.'],
      ['The activity catalogue&rsquo;s carbon sequestration flag contradicts the restoration method on peat and on savanna.', 'The tool ignores the catalogue flag and uses the method&rsquo;s own eligible-pair list. The catalogue is the thing to reconcile.'],
      ['The interface specifies a five-level disaster risk scale; the wired rasters carry four levels.', 'Read the legend that the tool renders, not the design specification.'],
      ['The class-based restoration baseline values, 25, 5 and 0 Mg per hectare, are placeholders pending literature references.', 'The removal figure scales with these values, so treat it as indicative until they are set.'],
      ['The biodiversity uplift implementation adds the degradation rate to the gain rate.', 'This inflates the uplift on fast-degrading sites. Use it as a screening unit, not as a credit.']
    ])}
    ${docCaption('Table 27. Open inconsistencies, with the reading to use until each is reconciled.')}`,
    'limitations-inconsistencies') +

  docSection('Method limitations to carry into any report', `
    <ul>
      <li><strong>Ecosystem boundaries are indicative.</strong> The ecosystem layer is a composite of datasets at different scales and methods, and the tool names peat and mangrove edges as the least certain. That matters most where the carbon answer hinges on whether the soil is peat.</li>
      <li><strong>The reference ecosystem is modelled, not observed,</strong> and it is the single input that decides whether open land reads as degraded forest or as healthy savanna. Where the tool assigns no reference, it declines to recommend restoration, which is the honest answer rather than a gap to fill in by hand.</li>
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
  return docHero(G_OUTPUTS, 'Sources',
    'This page lists the key method citations behind the calculations on these pages.') +

  docSection('Key method citations', `
    ${docTable(['Citation', 'Used for'], [
      ['Puyravaud (2003)', 'The annual deforestation rate'],
      ['Vieilledent (2021)', 'The forestatrisk variable set behind deforestation risk'],
      ['Grantham et al. (2020)', 'Forest landscape integrity'],
      ['Bourgoin et al. (2024)', 'Structural forest degradation'],
      ['Slagter et al. (2026)', 'Disturbance drivers'],
      ['Dadap et al. (2021)', 'Peatland drainage canals'],
      ['Astiani et al. (2017) and Wedeux et al. (2020)', 'Canal influence distances'],
      ['Vogt et al. (2022)', 'Morphological Spatial Pattern Analysis'],
      ['Brooks et al. (2019)', 'Area of Habitat'],
      ['Jung et al. (2021)', 'Conservation significance'],
      ['Cook-Patton et al. (2021)', 'The protect, manage and restore hierarchy'],
      ['Walsh (1996)', 'The dry-month threshold'],
      ['De Frenne et al. (2019)', 'Canopy temperature buffering'],
      ['IPCC 2006 Guidelines, Volume 4', 'Carbon fractions and root-to-shoot ratios'],
      ['SD VISta Nature Framework v1.0', 'Area-adjusted condition']
    ])}
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

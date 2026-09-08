/* ============================================================================
   technical-docs.js — F09 Technical Documentation (methodology only)

   Documents how the NbS Tool turns a boundary on a map into a pathway, a set
   of estimated benefits and a monitoring plan. Scope is deliberately narrow:
   inputs, derivation, core method, checks and limits, forward planning, and a
   closing reference page. It is not a user manual and not an API reference.

   ANTI-DRIFT CONTRACT
   This is a static site — there is no backend, so there is no /api/… to call.
   The equivalent single source of truth is the shared data the product itself
   renders from. `readLiveParameters()` reads those objects at page load:
       NBS_DATA        (js/analysis-shared.js)  — AOI and ecosystem areas
       NBS_ANALYSIS    (js/analysis-shared.js)  — the rendered benefit cards,
                                                  parsed for methods, metrics,
                                                  formulas and carbon rates
       NBS_LAYER_INFO  (js/analysis-shared.js)  — the dataset catalogue
       ecosystems / indicatorMeta (js/f05-shared.js) — activity & indicator matrix
       NBS_PEOPLE      (js/people-context.js)   — People Context per country
   Every number below comes from docParam(). If a value cannot be read, the
   page prints a visible TODO instead of a plausible-looking constant.
   ============================================================================ */

const TECH_DOCS = {
  loaded: false,
  active: 'overview',
  params: null,
  tocObserver: null,
  articles: [
    { id:'overview',      group:'Start here',       label:'Overview & analysis chain',      keywords:'overview chain pipeline scope aoi pathway benefit monitoring mrv how it works start' },
    { id:'scoping',       group:'Inputs',           label:'Area of interest & eligibility',  keywords:'aoi area of interest boundary eligible non-eligible hectares ecosystem forest mangrove peatland f01 scoping' },
    { id:'site-context',  group:'Inputs',           label:'Site characterisation datasets',  keywords:'site characterisation datasets layers resolution remote sensing land cover source provenance f02 general nature climate' },
    { id:'people-context',group:'Inputs',           label:'People context & vulnerability',  keywords:'people socio-economic demography employment education economy health housing vulnerability worldpop bps dosm adpc admin level adm1 adm2' },
    { id:'threat',        group:'Core method',      label:'Threat profile & land accounting',keywords:'threat disturbed loss gain remaining land cover accounting deforestation degradation pressure' },
    { id:'pathway',       group:'Core method',      label:'Pathway & activity selection',    keywords:'pathway protect manage restore trajectory c1 c2 c3 c4 c5 c6 activity matrix eligibility' },
    { id:'benefit',       group:'Core method',      label:'Potential benefit estimation',    keywords:'benefit nature people climate estimate metric mspa connectivity habitat star indicator score' },
    { id:'carbon',        group:'Core method',      label:'Carbon accounting & net ERRs',    keywords:'carbon co2 tco2e avoided sequestration leakage uncertainty buffer net err additionality cook-patton' },
    { id:'limits',        group:'Checks & limits',  label:'What the method does not do',     keywords:'limitations uncertainty caveats disclaimer validation ground truth verification not certified sample data' },
    { id:'monitoring',    group:'Forward planning', label:'Monitoring plan derivation',      keywords:'monitoring plan indicator frequency method sampling f05 derivation benefit indicator mapping' },
    { id:'mrv',           group:'Forward planning', label:'MRV reporting cycle',             keywords:'mrv monitoring reporting verification cycle evidence baseline reporting period f06' },
    { id:'reference',     group:'Reference',        label:'Parameters & worked examples',    keywords:'reference parameters constants worked example arithmetic lookup table glossary' }
  ]
};

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
function docDetails(title, body) {
  return `<details class="doc-details"><summary>${title}</summary><div>${body}</div></details>`;
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
   ARTICLES
   ========================================================================== */

function docsOverview() {
  return docHero('START HERE', 'How the NbS Tool turns a site into a plan',
    'This documentation describes the method behind the NbS Tool: what data goes in, how a site is read, how a pathway and its likely benefits are derived, and what is monitored afterwards. It covers methodology only — not how to click through the screens. NbS means Nature-based Solutions: actions that protect, manage or restore ecosystems so they deliver benefits for nature, people and climate.',
    ['Methodology only', 'Live parameters', 'Illustrative sample data']) +

  docSection('The analysis chain', `
    <p>Every project moves through the same six steps. Each one narrows the question, and each one depends on the step before it. Nothing later in the chain can be more certain than the data that entered it at the start.</p>
    ${docFlow([
      ['F01', 'Scope the site',      'Draw an area of interest'],
      ['F02', 'Read the baseline',   'Site, nature, climate and people context'],
      ['F02', 'Profile the threats', 'What is disturbed, lost or recovering'],
      ['F02', 'Choose a pathway',    'Protect, manage or restore'],
      ['F02', 'Estimate benefits',   'Nature, people and climate'],
      ['F05/F06', 'Monitor & verify','Indicators, frequencies, evidence']
    ])}
    <p>The tool is a <strong>screening</strong> instrument. It is designed to tell a frontline organisation whether a site is worth a full feasibility study and roughly what kind of intervention fits it — not to produce a certified carbon or biodiversity result.</p>`,
    'analysis-chain') +

  docSection('What the tool computes, and what it only displays', `
    <p>Two different things happen on the analysis screens, and it matters which is which.</p>
    ${docTable(['Kind of output', 'How it is produced', 'Example'], [
      ['<strong>Derived</strong>', 'Calculated from the site area and published rates inside the tool', 'Disturbed area, avoided emissions, sequestered carbon'],
      ['<strong>Looked up</strong>', 'Read from a named external dataset for the site, then displayed', 'Population, land cover class, vulnerability class'],
      ['<strong>Qualitative</strong>', 'A described benefit with no number attached, because no adequate data exists yet', 'Watershed protection, cultural heritage']
    ])}
    ${docCallout('Sample data', 'Every figure currently shown in this build is <strong>illustrative sample data</strong> for one worked area. It is there to demonstrate the method, not to describe a real site. See <em>What the method does not do</em>.', 'warn')}`,
    'derived-vs-displayed') +

  docSection('The numbers this page uses', `
    <p>This page never hard-codes a value. It reads the same shared data objects the product itself renders from, at the moment the page loads. The current reading is:</p>
    ${docTable(['Parameter', 'Value', 'Read from'], [
      ['Area of interest', `${docNum('aoi.total')} ha`, '<code>NBS_DATA.aoi</code>'],
      ['Eligible ecosystem area', `${docNum('aoi.eligible')} ha`, '<code>NBS_DATA.totalEligible</code>'],
      ['Project duration', `${docNum('aoi.duration')} years`, '<code>NBS_DATA.duration</code>'],
      ['Ecosystems in the matrix', docNum('matrix.ecosystemCount'), '<code>ecosystems</code> (f05-shared)'],
      ['NbS activities', docNum('matrix.activityCount'), '<code>ecosystems[].activities</code>'],
      ['Distinct indicators', docNum('indicators.total'), '<code>indicatorMeta</code>'],
      ['Countries with People Context', docNum('people.countryCount'), '<code>NBS_PEOPLE.DATA</code>']
    ])}
    ${docCallout('Why it is built this way', 'A static documentation page drifts away from the product within weeks. Reading the live objects means a change to the activity matrix or the carbon rates shows up here on the next page load, with no second edit to remember.', 'note')}`,
    'live-parameters');
}

function docsScoping() {
  const e = docParam('eco', {});
  const rows = Object.keys(e).map(k => [
    `<strong>${docEsc(e[k].label)}</strong>`,
    `<span class="num">${docFmt(e[k].area)}</span>`,
    `<span class="num">${docFmt(e[k].disturbedPct)}%</span>`,
    `<span class="num">${docFmt(e[k].lossPct)}%</span>`,
    `<span class="num">${docFmt(e[k].gainPct)}%</span>`
  ]);
  return docHero('INPUTS', 'Area of interest and ecosystem eligibility',
    'Everything downstream is measured in hectares, so the first job is to decide which hectares count. The Area of Interest (AOI) is the boundary the user draws or uploads. Only part of it is usually eligible for Nature-based Solutions work.',
    [`AOI ${docNum('aoi.total')} ha`, `Eligible ${docNum('aoi.eligible')} ha`, 'Forest · mangrove · peatland']) +

  docSection('From boundary to eligible area', `
    <p>The AOI is intersected with the ecosystem-type layer. Land that is neither forest, mangrove nor peatland — settlements, open water, bare rock, existing plantations — is set aside as <strong>non-eligible</strong> and takes no further part in the calculation.</p>
    ${docEquation('eligible area (ha) = AOI (ha) &minus; non-eligible area (ha)',
      `In the current reading: ${docNum('aoi.total')} ha &minus; ${docNum('aoi.nonEligible')} ha = ${docNum('aoi.eligible')} ha.`)}
    <p>The eligible area is then split by ecosystem. Every ecosystem is treated separately from this point on, because the pathways, the benefits and the carbon rates all differ between them.</p>
    ${docTable(['Ecosystem', 'Area (ha)', 'Disturbed', 'Loss', 'Gain'], rows.length ? rows : [['—', docTodo('NBS_DATA.eco not readable'), '—', '—', '—']])}`,
    'eligible-area') +

  docSection('How disturbance, loss and gain are derived', `
    <p>Three shares are recorded per ecosystem, each read from land-cover change analysis and applied to that ecosystem's area:</p>
    ${docEquation('disturbed (ha) = ecosystem area (ha) &times; disturbed share (%) &divide; 100')}
    ${docEquation('loss (ha) = ecosystem area (ha) &times; loss share (%) &divide; 100')}
    ${docEquation('gain (ha) = ecosystem area (ha) &times; gain share (%) &divide; 100')}
    <p>What is left is the intact remainder — the part of the ecosystem that is neither degraded nor already gone:</p>
    ${docEquation('remaining (ha) = ecosystem area &minus; disturbed &minus; loss',
      'Gain is reported separately and is not subtracted: it describes area recovering, not area removed.')}
    ${(() => {
      const f = docParam('eco.forest', null);
      if (!f) return docCallout('Missing', docTodo('NBS_DATA.eco.forest not readable'), 'warn');
      return docExample('Forest, current reading',
        `<p>Forest covers <strong>${docFmt(f.area)} ha</strong> of the eligible area, with <strong>${f.disturbedPct}%</strong> disturbed, <strong>${f.lossPct}%</strong> lost and <strong>${f.gainPct}%</strong> gaining.</p>
         <ul>
           <li>disturbed = ${docFmt(f.area)} &times; ${f.disturbedPct} &divide; 100 = <strong>${docFmt(f.disturbed)} ha</strong></li>
           <li>loss = ${docFmt(f.area)} &times; ${f.lossPct} &divide; 100 = <strong>${docFmt(f.loss)} ha</strong></li>
           <li>gain = ${docFmt(f.area)} &times; ${f.gainPct} &divide; 100 = <strong>${docFmt(f.gain)} ha</strong></li>
           <li>remaining = ${docFmt(f.area)} &minus; ${docFmt(f.disturbed)} &minus; ${docFmt(f.loss)} = <strong>${docFmt(f.remaining)} ha</strong></li>
         </ul>`,
        `Intact forest remaining: <strong>${docFmt(f.remaining)} ha</strong> of ${docFmt(f.area)} ha (${Math.round(f.remaining / f.area * 100)}%).`);
    })()}`,
    'disturbance-derivation') +

  docSection('Limits of the boundary step', `
    ${docCallout('This step cannot check ownership or legality', 'Eligibility here is purely ecological — it asks whether the land is a forest, mangrove or peatland, not whether a project may lawfully work on it. Land tenure, concession boundaries, customary rights and protected-area status are <strong>not</strong> screened. They must be established separately before any activity is planned.', 'warn')}
    <p>Ecosystem boundaries also come from remote sensing at a fixed resolution, so a narrow mangrove fringe or a small peat dome can fall below the detection threshold and be classified as something else. Check the resolution recorded for each layer in the next chapter.</p>`,
    'scoping-limits');
}

function docsSiteContext() {
  const L = docParam('layers', []);
  const rows = Array.isArray(L) ? L.map(l => [
    `<strong>${docEsc(l.name || l.key)}</strong>`,
    docEsc(l.category || '—'),
    docEsc(l.resolution || '—'),
    docEsc(l.dateOfContent || '—')
  ]) : [];
  return docHero('INPUTS', 'Site characterisation datasets',
    'Site characterisation reads the baseline: what is physically at the site now, before anything is planned. It is a lookup step, not a calculation — the tool reports what named external datasets say about the area, together with the resolution and vintage of each one, so a reader can judge how much weight to put on it.',
    [`${Array.isArray(L) ? L.length : 0} catalogued layers`, 'Resolution recorded', 'Not ground-verified']) +

  docSection('Four context panes', `
    <p>The baseline is grouped into four views, each answering a different planning question:</p>
    ${docTable(['Pane', 'Question it answers', 'Typical content'], [
      ['<strong>General</strong>', 'What kind of place is this?', 'Ecosystem type, land cover, administrative setting, topography'],
      ['<strong>Nature</strong>',  'What lives here and how intact is it?', 'Species presence, habitat condition, protected areas'],
      ['<strong>Climate</strong>','What climate is it exposed to?', 'Rainfall and temperature patterns, hazard exposure'],
      ['<strong>People</strong>', 'Who lives here and how exposed are they?', 'Population, livelihoods, services, vulnerability (see the next chapter)']
    ])}`,
    'context-panes') +

  docSection('The dataset catalogue', `
    <p>Every layer carries its own provenance record: what it is, which agency published it, at what spatial resolution, and for what period. This is the catalogue as the product currently holds it.</p>
    ${rows.length ? docTable(['Layer', 'Category', 'Resolution', 'Period'], rows)
                  : docCallout('Missing', docTodo('NBS_LAYER_INFO not readable — the layer catalogue could not be listed'), 'warn')}
    ${docCallout('Resolution is a hard limit on what you can conclude', `A layer at 30-metre resolution cannot resolve a feature narrower than about 30 metres. Any figure derived from it inherits that limit — including hectare counts. Treat all areas as indicative, and confirm on the ground before committing them to a proposal or a contract.`, 'warn')}`,
    'dataset-catalogue') +

  docSection('Disclaimers travel with the data', `
    <p>Each catalogued layer carries the publisher's own disclaimer, shown in the tool next to the figure it produced. They are reproduced rather than summarised, because a paraphrase loses the specific caveat that matters.</p>
    ${(() => {
      const first = Array.isArray(L) ? L.find(x => x.disclaimer) : null;
      return first
        ? docDetails(`Example disclaimer &mdash; ${docEsc(first.name || first.key)}`, `<p>${docEsc(first.disclaimer)}</p>`)
        : docCallout('Missing', docTodo('no layer disclaimer available to quote'), 'warn');
    })()}`,
    'layer-disclaimers');
}

function docsPeopleContext() {
  const gran = docParam('people.granularity', []);
  const rows = Array.isArray(gran) ? gran.map(r => [
    `<strong>${docEsc(r.country)}</strong>`,
    `<code>${docEsc(r.gran || '—')}</code>`,
    docEsc((r.src || '').split('·').slice(1).join('·').trim() || '—')
  ]) : [];
  return docHero('INPUTS', 'People context and vulnerability',
    'Nature-based Solutions succeed or fail on whether the people living around a site can take part in them and benefit from them. The People Context pane assembles socio-economic indicators for the area from official national statistics, and summarises exposure to climate hazards as four vulnerability indices.',
    [`${docNum('people.countryCount')} countries`, 'National statistics agencies', 'Reported at admin level']) +

  docSection('Six indicator groups', `
    <p>Indicators are grouped so a reader can go straight to the question they have:</p>
    ${docTable(['Group', 'What it tells a project designer'], [
      ['<strong>Social (demography)</strong>', 'How many people and households the project could affect, and their age and sex structure'],
      ['<strong>Employment</strong>', 'Which livelihoods dominate, and which of them are climate-sensitive'],
      ['<strong>Education</strong>', 'Whether the skills and literacy exist locally to run monitoring and management'],
      ['<strong>Economy</strong>', 'Income levels and inequality — who is least able to absorb a shock or a land-use change'],
      ['<strong>Health</strong>', 'Health and nutrition conditions that Nature-based Solutions co-benefits could ease'],
      ['<strong>Housing &amp; human settlements</strong>', 'Access to water and sanitation — the basic services that shape coping capacity']
    ])}`,
    'indicator-groups') +

  docSection('Administrative level is part of the number', `
    <p>Statistics are published by administrative unit, and different agencies publish at different levels. The tool records the level with every figure, because it changes what the figure means. A provincial unemployment rate says almost nothing about one village inside that province.</p>
    ${docTable(['Code', 'Meaning', 'How to read it'], [
      ['<code>national</code>', 'Whole country', 'Only safe for city-states, where the country is the locality'],
      ['<code>adm1</code>', 'Province, state or region', 'A broad average; the site may differ substantially'],
      ['<code>adm2+</code>', 'District, city, township or village', 'Closest to the site — prefer this where it exists']
    ])}
    <p>This is what the product currently reports for the household indicator in each country:</p>
    ${rows.length ? docTable(['Country', 'Level', 'Source'], rows)
                  : docCallout('Missing', docTodo('NBS_PEOPLE.DATA not readable'), 'warn')}
    ${docCallout('Do not mix levels in one sentence', 'A narrative that pairs a village household count with a provincial literacy rate is describing two different populations. The tool names the unit for each figure; keep those names when quoting them in a proposal.', 'warn')}`,
    'admin-level') +

  docSection('The four vulnerability indices', `
    <p>Vulnerability is reported as four composite indices, each on a five-level scale from Very Low to Very High. They summarise how susceptible the area is to climate hazards from four different angles.</p>
    ${docTable(['Index', 'What it is built from'], [
      ['<strong>Physical</strong>', 'Condition of infrastructure, buildings and critical facilities exposed to hazards'],
      ['<strong>Environmental</strong>', 'Ecosystem degradation, loss of natural buffers, reduced ecological resilience'],
      ['<strong>Economic</strong>', 'Dependence on climate-sensitive livelihoods, income stability, diversification'],
      ['<strong>Social</strong>', 'Demographic and socio-economic capacity to prepare for, respond to and recover from impacts']
    ])}
    ${docCallout('These are classes, not measurements', 'A vulnerability index is an ordinal class produced by a regional assessment. "High" is higher than "Moderate", but the gap between them is not a fixed quantity and two indices at "High" are not equivalent. Do not average them, subtract them, or convert them to a score.', 'warn')}`,
    'vulnerability-indices');
}

function docsThreat() {
  const e = docParam('eco', {});
  const keys = Object.keys(e);
  return docHero('CORE METHOD', 'Threat profile and land accounting',
    'The threat profile turns land-cover change into a statement about pressure: how much of each ecosystem is already degraded, how much has been converted outright, and how much is recovering. It is the evidence that decides which pathway a site needs.',
    ['Disturbed · lost · gained', 'Per ecosystem', `Over ${docNum('aoi.duration')} years`]) +

  docSection('Four land states', `
    <p>Every hectare of eligible ecosystem falls into exactly one state at the time of analysis:</p>
    ${docTable(['State', 'Meaning', 'What it implies'], [
      ['<strong>Remaining</strong>', 'Intact ecosystem, no detected degradation', 'A candidate for <em>protect</em>'],
      ['<strong>Disturbed</strong>', 'Still the same ecosystem, but degraded — thinned canopy, drained peat, damaged mangrove', 'A candidate for <em>manage</em>'],
      ['<strong>Loss</strong>', 'Converted to another land cover within the observation window', 'A candidate for <em>restore</em>'],
      ['<strong>Gain</strong>', 'Area recovering or expanding, reported separately', 'Evidence that recovery is possible here']
    ])}
    ${docEquation('remaining + disturbed + loss = ecosystem area (ha)',
      'Gain is tracked alongside, not inside, this balance — it describes trajectory, not a share of the current area.')}`,
    'land-states') +

  docSection('Reading the profile across ecosystems', `
    <p>The same three shares are applied per ecosystem, so the profiles are directly comparable. The current reading:</p>
    ${keys.length ? docTable(['Ecosystem', 'Area (ha)', 'Remaining (ha)', 'Disturbed (ha)', 'Loss (ha)', 'Gain (ha)'],
        keys.map(k => [
          `<strong>${docEsc(e[k].label)}</strong>`,
          `<span class="num">${docFmt(e[k].area)}</span>`,
          `<span class="num">${docFmt(e[k].remaining)}</span>`,
          `<span class="num">${docFmt(e[k].disturbed)}</span>`,
          `<span class="num">${docFmt(e[k].loss)}</span>`,
          `<span class="num">${docFmt(e[k].gain)}</span>`
        ])) : docCallout('Missing', docTodo('NBS_DATA.eco not readable'), 'warn')}
    ${(() => {
      const tot = docParam('aoi.disturbed', null), el = docParam('aoi.eligible', null);
      if (tot == null || !el) return '';
      return docExample('Overall disturbance pressure',
        `<p>Disturbed hectares are summed across all three ecosystems and compared with the total eligible area.</p>
         <ul><li>total disturbed = ${keys.map(k => docFmt(e[k].disturbed)).join(' + ')} = <strong>${docFmt(tot)} ha</strong></li>
         <li>share of eligible area = ${docFmt(tot)} &divide; ${docFmt(el)} = <strong>${Math.round(tot / el * 100)}%</strong></li></ul>`,
        `Roughly <strong>${Math.round(tot / el * 100)}%</strong> of the eligible area is degraded but not yet converted &mdash; the part where management activity has most to work with.`);
    })()}`,
    'threat-profile') +

  docSection('What the threat profile does not say', `
    ${docCallout('Change detected is not cause explained', 'The profile records that cover changed. It does not identify who or what changed it — fire, drainage, smallholder clearing, aquaculture conversion or plantation expansion all appear the same way in a change map. Attribution needs field investigation, and the choice of intervention depends on it.', 'warn')}
    <p>Two further limits are worth stating plainly. Detection lags: a change is only visible once it is large enough and old enough to show in imagery, so very recent pressure is under-reported. And a single observation window cannot separate a one-off event from a sustained trend — a fire year and a decade of gradual degradation can produce the same loss figure.</p>`,
    'threat-limits');
}

function docsPathway() {
  const m = docParam('matrix', null);
  return docHero('CORE METHOD', 'Pathway and activity selection',
    'A pathway is the broad posture a project takes towards a site: protect what is intact, manage what is degraded, or restore what has been lost. Under each pathway sits a defined set of activities, and each activity carries its own benefits and indicators. The mapping is fixed, published and auditable — it is not generated per project.',
    m ? [`${m.ecosystemCount} ecosystems`, `${m.pathways.join(' · ')}`, `${m.activityCount} activities`] : ['Protect · Manage · Restore']) +

  docSection('Three pathways', `
    <p>Pathway follows from the land state found in the threat profile.</p>
    ${docFlow([
      ['STATE', 'Remaining', 'Intact ecosystem'],
      ['→', 'PROTECT', 'Prevent the loss that would otherwise occur'],
      ['STATE', 'Disturbed', 'Degraded but present'],
      ['→', 'MANAGE', 'Improve condition of what is still there'],
      ['STATE', 'Loss', 'Converted away'],
      ['→', 'RESTORE', 'Bring the ecosystem back']
    ])}
    <p>A site normally needs more than one. A landscape with intact core forest, a degraded buffer and cleared edges calls for all three at once, applied to different hectares.</p>`,
    'three-pathways') +

  docSection('Land-cover trajectories (C1&ndash;C6)', `
    <p>Behind each activity sits a <strong>trajectory</strong> — a coded statement of the ecological state the activity is designed to act on. The codes run from an ecosystem that has stayed intact through to one converted to bare ground.</p>
    ${docTable(['Code', 'State it describes'], [
      ['<code>C1 / C2</code>', 'Persistent ecosystem — still present and broadly intact'],
      ['<code>C3</code>', 'Ecosystem present but under active pressure'],
      ['<code>C4</code>', 'Degraded, still recognisably the same ecosystem'],
      ['<code>C5</code>', 'Converted to another land cover'],
      ['<code>C6</code>', 'Converted to barren or bare ground']
    ])}
    ${docCallout('Trajectories constrain the menu', 'An activity is only offered where its trajectory matches the site. Assisted natural regeneration is not offered for bare ground, and terracing with active replanting is not offered for intact forest. Combinations that make no ecological sense are excluded from the matrix rather than being left to the user to avoid.', 'note')}
    ${docCallout('Trajectory codes are provenance, not product', 'The codes are recorded so the mapping can be audited against the activity matrix. They are not shown in the interface, and they are not a field the user sets.', 'note')}`,
    'trajectories') +

  docSection('The activity matrix', `
    <p>The full mapping runs ecosystem &rarr; pathway &rarr; activity &rarr; benefit category &rarr; benefit &rarr; indicator. One traversal of that chain is one complete, monitorable commitment. This is its current shape:</p>
    ${m ? docTable(['Ecosystem', 'Activities'], m.ecosystems.map(x => [`<strong>${docEsc(x.name)}</strong>`, `<span class="num">${x.activities}</span>`])
            .concat([['<strong>Total</strong>', `<span class="num"><strong>${m.activityCount}</strong></span>`]]))
        : docCallout('Missing', docTodo('activity matrix not readable'), 'warn')}
    ${m ? docTable(['Pathway', 'Activities'], m.byPathway.map(x => [`<strong>${docEsc(x.pw)}</strong>`, `<span class="num">${x.n}</span>`])) : ''}
    ${m ? `<p>Those activities resolve to <strong>${m.benefitCount} distinct benefits</strong> across <strong>${m.categories.length} categories</strong> (${m.categories.map(docEsc).join(', ')}), measured by <strong>${docNum('indicators.total')} distinct indicators</strong>.</p>` : ''}
    ${docDetails('Why the matrix is fixed rather than generated', `
      <p>A generated recommendation would be impossible to audit and impossible to reproduce. A fixed matrix means any reviewer can trace a proposed activity back to the ecosystem state that justified it, and any change to the mapping is a visible edit to a single published table rather than a silent change in behaviour.</p>`)}`,
    'activity-matrix') +

  docSection('What selection does not decide', `
    ${docCallout('Feasibility is not assessed', 'The matrix says an activity is <em>ecologically appropriate</em> for the site. It does not consider cost, available labour, community consent, land tenure, market access, or whether an implementing organisation exists nearby. A shortlist from this step is an input to a feasibility study, not a substitute for one.', 'warn')}`,
    'selection-limits');
}

function docsBenefit() {
  const B = docParam('benefits', []);
  const quant = Array.isArray(B) ? B.filter(b => b.metric) : [];
  const qual  = Array.isArray(B) ? B.filter(b => !b.metric) : [];
  return docHero('CORE METHOD', 'Potential benefit estimation',
    'The benefit step estimates what the chosen activities are likely to deliver, in three categories: nature, people and climate. Some benefits carry a number; many deliberately do not. Which is which is itself a finding — it tells a project designer where the evidence base is thin and what the monitoring plan needs to fill in.',
    Array.isArray(B) ? [`${B.length} benefit cards`, `${quant.length} quantified`, `${qual.length} qualitative`] : ['Nature · People · Climate']) +

  docSection('Three categories', `
    ${docTable(['Category', 'What it covers'], [
      ['<strong>Nature</strong>', 'Biodiversity, habitat connectivity, watershed function, ecosystem condition'],
      ['<strong>People</strong>', 'Tenure, livelihoods, food and water security, governance capacity, equitable benefit sharing'],
      ['<strong>Climate</strong>', 'Avoided emissions, carbon sequestration, microclimate regulation, hazard buffering']
    ])}
    <p>The categories come from the same activity matrix used in pathway selection, so a benefit only appears if an activity that produces it has been selected. There is no separate benefit model to keep in step.</p>`,
    'benefit-categories') +

  docSection('Quantified benefits and their methods', `
    <p>A benefit is quantified only where a defined method exists and the input data supports it. Each quantified card publishes the method that produced its figure:</p>
    ${quant.length ? docTable(['Benefit', 'Figure', 'Measures'],
        quant.map(b => [
          `<strong>${docEsc(b.name)}</strong><br><small>${b.pathways.map(docEsc).join(' · ')}</small>`,
          `<span class="num">${docEsc(b.metric)} ${docEsc(b.unit)}</span>`,
          docEsc(b.metricLabel)
        ]))
      : docCallout('Missing', docTodo('benefit cards not readable from NBS_ANALYSIS'), 'warn')}
    ${(() => {
      const withM = quant.filter(b => b.method);
      if (!withM.length) return '';
      return withM.map(b => docDetails(`Method &mdash; ${docEsc(b.name)}`, `<p>${docEsc(b.method)}</p>`)).join('');
    })()}
    ${(() => {
      const f = (Array.isArray(B) ? B : []).find(b => b.formula && !/Net = Gross/i.test(b.formula));
      return f ? `<h3>Published formula</h3>${docEquation(docEsc(f.formula).replace(/&amp;/g, '&'), `From the “${docEsc(f.name)}” card. Habitat pixel area is in hectares; deforestation risk is a per-pixel probability between 0 and 1, so the product is hectares.`)}` : '';
    })()}`,
    'quantified-benefits') +

  docSection('Qualitative benefits', `
    <p>The remaining benefits are described rather than counted. That is not an oversight — it is the honest position where no site-level dataset exists to support a figure.</p>
    ${qual.length ? `<ul>${qual.map(b => `<li><strong>${docEsc(b.name)}</strong> &mdash; ${b.pathways.map(docEsc).join(', ')}</li>`).join('')}</ul>`
                  : '<p>All benefit cards in the current reading carry a figure.</p>'}
    ${docCallout('A missing number is a monitoring requirement', 'Where a benefit is qualitative, the way to turn it into a number is to collect the data — which is exactly what the Monitoring Plan chapter sets up. Do not substitute a benchmark from another project in the meantime.', 'note')}`,
    'qualitative-benefits') +

  docSection('What benefit estimates are not', `
    ${docCallout('Not certified, not tradeable, not a guarantee', 'These are screening estimates produced from area figures and published rates. They are not verified under any carbon or biodiversity standard, they cannot be sold or claimed as credits, and they do not commit the project to an outcome. A figure here means "worth investigating at this scale", nothing more.', 'warn')}
    <p>Two structural limits sit behind every figure on this screen. Estimates scale with the eligible area, so an error in the boundary propagates directly into every benefit. And they assume the activity is implemented and sustained for the full project duration; partial or interrupted implementation is not modelled.</p>`,
    'benefit-limits');
}

function docsCarbon() {
  const c = docParam('carbon', {}) || {};
  const av = c.avoided, sq = c.sequestration;
  const dur = docParam('aoi.duration', null);
  const el  = docParam('aoi.eligible', null);
  return docHero('CORE METHOD', 'Carbon accounting and net ERRs',
    'Carbon is the one benefit the tool follows all the way from a hectare to a net tonnage, so it gets its own chapter. Two flows are counted separately — emissions avoided by protecting carbon already stored, and carbon newly removed by restoring or managing vegetation — and both are then reduced by three deductions before anything is reported as net.',
    ['tCO₂e', `${docNum('aoi.duration')}-year horizon`, 'Gross → net']) +

  docSection('Two flows, never mixed', `
    ${docTable(['Flow', 'Pathway', 'What is being counted'], [
      ['<strong>Avoided emissions</strong>', 'Protect', 'Carbon already in the vegetation and soil that would have been released if the ecosystem had been cleared'],
      ['<strong>Sequestration</strong>', 'Restore, Manage', 'Carbon newly drawn out of the atmosphere as vegetation grows back or improves']
    ])}
    ${docCallout('Why they are kept apart', 'Avoiding a release and removing a tonne are physically different claims with different permanence risks and different reporting rules under every carbon standard. Adding them into one headline number destroys that distinction, so the tool reports both and only sums them at the final Net ERRs line.', 'note')}`,
    'two-flows') +

  docSection('Rates used', `
    <p>Both flows start from published per-hectare rates applied over the project duration.</p>
    ${docTable(['Parameter', 'Value', 'Unit'], [
      ['Forest carbon stock', c.forestStockTCha != null ? `<span class="num">${docFmt(c.forestStockTCha, 1)}</span>` : docTodo('forest stock not readable'), 'tC / ha'],
      ['Avoided deforestation rate', c.deforestationRate != null ? `<span class="num">${docFmt(c.deforestationRate, 2)}</span>` : docTodo('deforestation rate not readable'), '% / year'],
      ['Sequestration &mdash; Restore', c.restoreRate != null ? `<span class="num">${docFmt(c.restoreRate, 1)}</span>` : docTodo('restore rate not readable'), 'tCO₂e / ha / year'],
      ['Sequestration &mdash; Manage', c.manageRate != null ? `<span class="num">${docFmt(c.manageRate, 1)}</span>` : docTodo('manage rate not readable'), 'tCO₂e / ha / year'],
      ['Project duration', dur != null ? `<span class="num">${docFmt(dur)}</span>` : docTodo('duration not readable'), 'years']
    ])}
    ${docEquation('gross sequestration (tCO₂e) = eligible area (ha) &times; rate (tCO₂e/ha/yr) &times; duration (yr)')}
    ${docEquation('gross avoided (tCO₂e) = protected area (ha) &times; stock (tCO₂e/ha) &times; annual deforestation rate &times; duration (yr)',
      'Carbon stock is published in tonnes of carbon (tC); one tonne of carbon corresponds to 44/12 ≈ 3.67 tonnes of CO₂ equivalent.')}
    ${(av && el) ? docExample('Gross avoided emissions, current reading',
      `<p>The tool reports a gross avoided figure of <strong>${docFmt(av.gross)} tCO₂e</strong> across <strong>${docFmt(el)} ha</strong> over ${dur} years.</p>
       <ul><li>per hectare over the whole period = ${docFmt(av.gross)} &divide; ${docFmt(el)} = <strong>${docFmt(av.perHa, 1)} tCO₂e/ha</strong></li>
       <li>per hectare per year = ${docFmt(av.perHa, 1)} &divide; ${dur} = <strong>${docFmt(av.perHa / dur, 2)} tCO₂e/ha/yr</strong></li></ul>`,
      `Effective avoided rate: <strong>${docFmt(av.perHa / dur, 2)} tCO₂e per hectare per year</strong>.`) : ''}`,
    'carbon-rates') +

  docSection('Three deductions', `
    <p>Gross tonnage is never reported as the result. Three deductions are applied, in this order, to get from gross to net:</p>
    ${docTable(['Deduction', 'Share of gross', 'Why it exists'], [
      ['<strong>Leakage</strong>', av?.leakageShare != null ? docPct(av.leakageShare, 0) : docTodo('leakage share not readable'),
       'Pressure displaced rather than removed &mdash; clearing that simply moves to a neighbouring area'],
      ['<strong>Uncertainty</strong>', av?.uncertaintyShare != null ? docPct(av.uncertaintyShare, 0) : docTodo('uncertainty share not readable'),
       'A conservative allowance for error in the area, stock and rate inputs'],
      ['<strong>Buffer</strong>', av?.bufferShare != null ? docPct(av.bufferShare, 0) : docTodo('buffer share not readable'),
       'A reserve held back against reversal &mdash; fire, storm, illegal clearing after the fact'],
      ['<strong>Net retained</strong>', av?.netShare != null ? `<strong>${docPct(av.netShare, 0)}</strong>` : docTodo('net share not readable'),
       'What remains reportable after all three']
    ])}
    ${docEquation('net (tCO₂e) = gross &minus; leakage &minus; uncertainty &minus; buffer',
      'Each deduction is a share of gross, not compounded on the running balance.')}
    ${(av && sq) ? docExample('Gross to net, both flows',
      `<p><strong>Avoided emissions</strong></p>
       <ul><li>gross ${docFmt(av.gross)} &minus; leakage ${docFmt(av.leakage)} &minus; uncertainty ${docFmt(av.uncertainty)} &minus; buffer ${docFmt(av.buffer)}</li>
       <li>= <strong>${docFmt(av.net)} tCO₂e</strong></li></ul>
       <p><strong>Sequestration</strong></p>
       <ul><li>gross ${docFmt(sq.gross)} &minus; leakage ${docFmt(sq.leakage)} &minus; uncertainty ${docFmt(sq.uncertainty)} &minus; buffer ${docFmt(sq.buffer)}</li>
       <li>= <strong>${docFmt(sq.net)} tCO₂e</strong></li></ul>`,
      `Net emission reductions and removals (Net ERRs) = ${docFmt(av.net)} + ${docFmt(sq.net)} = <strong>${docFmt(av.net + sq.net)} tCO₂e</strong> over ${dur} years &mdash; ${av.netShare != null ? docPct(av.netShare, 0) : '—'} of the ${docFmt(av.gross + sq.gross)} tCO₂e gross.`)
      : docCallout('Missing', docTodo('carbon deduction chain not readable from the benefit formulas'), 'warn')}`,
    'deductions') +

  docSection('Assumptions as the product states them', `
    <p>These are the analyser's own assumptions, reproduced from the tool rather than restated here, so the two cannot disagree:</p>
    ${c.assumptionsNote ? `<div class="doc-callout note"><span>From the Data Analyser</span>${c.assumptionsNote}</div>`
                        : docCallout('Missing', docTodo('assumptions note not readable'), 'warn')}`,
    'carbon-assumptions') +

  docSection('What the carbon method does not do', `
    ${docCallout('Not a carbon standard calculation', 'This is a screening estimate. It does not follow the requirements of Verra, Gold Standard, ART-TREES or any national registry: there is no project-specific baseline scenario, no additionality test, no formal uncertainty propagation, no independent validation, and no monitoring record behind the figure. Nothing here can be issued or traded as a credit.', 'warn')}
    <p>Three further gaps are worth naming. Rates are regional averages, not site measurements — actual growth and stock vary widely with soil, hydrology and management. Peatland emissions in particular depend strongly on water-table depth, which this method does not model. And the estimate assumes the carbon stays stored for the full duration; permanence beyond the project period is not assessed at all.</p>`,
    'carbon-limits');
}

function docsLimits() {
  return docHero('CHECKS & LIMITS', 'What the method does not do',
    'This chapter collects, in one place, every limit stated elsewhere in this documentation. It exists because limitations buried in footnotes get skipped, and this tool produces material that goes to funders and government partners — where an overstated figure does real damage.',
    ['Read before reporting', 'Screening only', 'Not verified']) +

  docSection('The sample-data warning', `
    ${docCallout('Every figure in this build is illustrative', 'The numbers throughout this prototype describe one worked example area, not a real site. They demonstrate that the method runs end to end. They are not measurements of anywhere, and they must not be quoted, screenshotted into a proposal, or presented to a partner as findings.', 'warn')}`,
    'sample-data') +

  docSection('Five things the tool cannot tell you', `
    ${docTable(['Question', 'Why the tool cannot answer it'], [
      ['<strong>May we lawfully work here?</strong>', 'Eligibility is ecological only. Tenure, customary rights, concessions and protected-area status are not screened.'],
      ['<strong>What caused this degradation?</strong>', 'Change detection records that cover changed, not who changed it or why. Attribution needs fieldwork.'],
      ['<strong>Can this project actually be delivered?</strong>', 'Cost, labour, community consent, market access and implementing capacity are outside the method.'],
      ['<strong>Are these carbon figures certifiable?</strong>', 'No baseline scenario, no additionality test, no validation, no monitoring record. Screening only.'],
      ['<strong>Is this what is happening on the ground right now?</strong>', 'Every layer has a vintage and a detection lag. Recent change is systematically under-reported.']
    ])}`,
    'cannot-answer') +

  docSection('How error propagates', `
    <p>The chain is multiplicative, which means errors do not stay where they start.</p>
    ${docFlow([
      ['1', 'Boundary error',    'Wrong hectares'],
      ['2', 'Ecosystem split',   'Wrong ecosystem shares'],
      ['3', 'Land states',       'Wrong disturbed / loss'],
      ['4', 'Benefit estimate',  'Wrong tonnes and hectares'],
      ['5', 'Reported claim',    'Confidently wrong']
    ])}
    ${docEquation('relative error in output ≈ relative error in area + relative error in rate',
      'To first order, a 20% overstatement of eligible area and a 15% overstatement of the sequestration rate compound to roughly 35% overstatement of the reported tonnage.')}
    ${docCallout('Verify the boundary first', 'Of all the inputs, the AOI is the one a project team can most easily check and most cheaply fix. Confirming the boundary and the ecosystem split against field knowledge removes more error than refining anything further down the chain.', 'note')}`,
    'error-propagation') +

  docSection('Resolution and vintage', `
    <p>Two properties are recorded for every dataset and both bound what can be concluded from it. <strong>Resolution</strong> sets the smallest feature that can be seen — a 30-metre grid cannot resolve a 15-metre mangrove fringe. <strong>Vintage</strong> sets how current the picture is; several socio-economic series in the People Context end several years before the present.</p>
    ${docCallout('Quote the vintage with the number', 'A household figure from a 2015 census is not wrong, but presenting it without its year invites the reader to assume it is current. The tool records the year with every indicator; carry it through into anything you write.', 'warn')}`,
    'resolution-vintage') +

  docSection('When to stop using the tool and start doing fieldwork', `
    <p>Screening has done its job once a site looks plausible. The following should trigger field verification before any further use of the output:</p>
    <ul>
      <li>The site is about to enter a funding proposal or a partner agreement.</li>
      <li>The eligible area disagrees with local knowledge by more than a small margin.</li>
      <li>The benefit estimate is being used to size a budget or a target.</li>
      <li>Any figure is about to be presented to a community as a commitment.</li>
      <li>A carbon number is going anywhere near a buyer, a registry or a claim.</li>
    </ul>`,
    'when-to-stop');
}

function docsMonitoring() {
  const ind = docParam('indicators', null);
  const freq = ind && ind.frequencies;
  const freqRows = freq ? Object.keys(freq).sort((a, b) => freq[b] - freq[a])
    .map(k => [`<strong>${docEsc(k)}</strong>`, `<span class="num">${freq[k]}</span>`,
               `<span class="num">${Math.round(freq[k] / ind.total * 100)}%</span>`]) : [];
  return docHero('FORWARD PLANNING', 'Monitoring plan derivation',
    'A monitoring plan is not written from scratch. It is derived: the activities selected in the pathway step determine the benefits claimed, the benefits determine the indicators, and every indicator carries a fixed measurement method and sampling frequency. This chapter documents that derivation, so a reviewer can check that a plan follows from its activities rather than from preference.',
    ind ? [`${docNum('indicators.total')} indicators`, `${Object.keys(freq || {}).length} frequencies`, 'Method fixed per indicator'] : ['Derived, not authored']) +

  docSection('The derivation chain', `
    ${docFlow([
      ['SELECTED', 'Activity',   'From the pathway step'],
      ['IMPLIES',  'Benefit',    'Nature, people or climate'],
      ['REQUIRES', 'Indicator',  'What must be measured'],
      ['DEFINES',  'Method',     'How it is measured'],
      ['SETS',     'Frequency',  'How often']
    ])}
    <p>Each link is a fixed lookup in the activity matrix. Selecting an activity therefore commits the project to a specific, non-negotiable set of measurements — which is the point. A plan that could drop an inconvenient indicator would not be evidence of anything.</p>
    ${docCallout('One method and one frequency per indicator', 'An indicator has exactly one measurement method and one frequency across the whole matrix, regardless of which activity or ecosystem invoked it. Two projects measuring canopy cover measure it the same way, so their results can be compared.', 'note')}`,
    'derivation-chain') +

  docSection('Sampling frequencies', `
    <p>Frequency follows from how fast the thing being measured can actually change. Water-table depth moves daily; forest carbon stock does not.</p>
    ${freqRows.length ? docTable(['Frequency', 'Indicators', 'Share'], freqRows)
                      : docCallout('Missing', docTodo('indicatorMeta not readable'), 'warn')}
    ${(() => {
      if (!freq) return '';
      const ann = freq['Annually'] || 0;
      return ann ? docExample('Reading the frequency mix',
        `<p><strong>${ann}</strong> of <strong>${ind.total}</strong> indicators are measured annually.</p>
         <ul><li>share = ${ann} &divide; ${ind.total} = <strong>${Math.round(ann / ind.total * 100)}%</strong></li></ul>
         <p>The remainder need more frequent visits, which is what drives field cost. A plan weighted towards daily and monthly indicators needs either permanent instrumentation or a resident field team.</p>`,
        `Annual measurement covers <strong>${Math.round(ann / ind.total * 100)}%</strong> of indicators; the rest set the real staffing requirement.`) : '';
    })()}`,
    'frequencies') +

  docSection('Measurement methods', `
    <p>Every indicator carries a written method describing how the measurement is taken — the instrument, the survey design, or the dataset. Methods fall into three broad families:</p>
    ${docTable(['Family', 'Typical instrument or design', 'Example indicators'], [
      ['<strong>Field survey</strong>', 'Quadrats, transects, permanent plots, camera traps, flux chambers, soil cores', 'Species richness, carbon stock, methane flux'],
      ['<strong>Remote sensing</strong>', 'Satellite imagery, drone orthomosaics, LiDAR, thermal anomaly detection', 'Canopy cover, burned area, deforestation rate'],
      ['<strong>Administrative record</strong>', 'Registries, legal gazettes, project logs, audits', 'Land tenure, grievance mechanism, benefit sharing']
    ])}
    ${(() => {
      const meta = ind && ind.meta;
      if (!meta) return '';
      const k = Object.keys(meta).find(x => /Tree Canopy Cover/i.test(x)) || Object.keys(meta)[0];
      return k ? docDetails(`Example method &mdash; ${docEsc(k)}`,
        `<p>${docEsc(meta[k].source)}</p><p><strong>Frequency:</strong> ${docEsc(meta[k].freq)}</p>`) : '';
    })()}
    ${docCallout('Governance indicators are still indicators', 'Roughly a third of the catalogue measures institutions rather than ecology &mdash; tenure recognition, grievance mechanisms, benefit sharing, gender-disaggregated access. They are as binding as the ecological ones. A project that hits its canopy target while failing its tenure indicator has not succeeded.', 'note')}`,
    'measurement-methods') +

  docSection('What the plan does not include', `
    ${docCallout('No baseline value is set here', 'The plan says what to measure, how, and how often. It does not set the starting value or the target. Baselines must be measured in the field at the start of the project; a target set against an estimated baseline is unverifiable.', 'warn')}
    <p>Cost, staffing, equipment procurement and data-management arrangements are also outside the plan. They follow from the frequency mix above, but the tool does not size them.</p>`,
    'plan-limits');
}

function docsMrv() {
  return docHero('FORWARD PLANNING', 'MRV reporting cycle',
    'MRV stands for Monitoring, Reporting and Verification: the cycle that turns a monitoring plan into evidence someone else can check. Monitoring collects the measurements, reporting presents them against the plan, and verification is the independent step that decides whether the report can be believed.',
    ['Monitoring → Reporting → Verification', 'Evidence-led', 'Independent check']) +

  docSection('The three steps', `
    ${docFlow([
      ['M', 'Monitoring',    'Measure each indicator at its set frequency'],
      ['R', 'Reporting',     'Present results against baseline and plan'],
      ['V', 'Verification',  'Independent party checks method and evidence']
    ])}
    ${docTable(['Step', 'Who does it', 'What it produces'], [
      ['<strong>Monitoring</strong>', 'The project team or a contracted field partner', 'Dated, located, method-tagged measurements'],
      ['<strong>Reporting</strong>', 'The project team', 'A period report: values, change against baseline, deviations from plan'],
      ['<strong>Verification</strong>', 'A party independent of the project', 'A statement on whether the reported results are supported by the evidence']
    ])}
    ${docCallout('Verification is not part of this tool', 'The tool supports monitoring and reporting. Verification is by definition performed by someone independent of the project, using their own procedures. Nothing produced here is verified, and nothing here should be described as verified.', 'warn')}`,
    'three-steps') +

  docSection('What makes a measurement reportable', `
    <p>A number on its own is not evidence. For a measurement to survive verification it needs four things attached to it:</p>
    ${docTable(['Attribute', 'Why a verifier needs it'], [
      ['<strong>Date</strong>', 'To place it in the reporting period and check it against the required frequency'],
      ['<strong>Location</strong>', 'To confirm it was taken inside the project area, and to allow re-measurement at the same place'],
      ['<strong>Method</strong>', 'To confirm the prescribed method was used, so the value is comparable with the baseline'],
      ['<strong>Observer</strong>', 'To trace the record and follow up on anomalies']
    ])}
    ${docCallout('A gap is reportable too', 'A missed measurement should be reported as a gap with its reason, not silently omitted. An unexplained absence in a series is treated by a verifier as a failure of the monitoring system; a documented gap is treated as a known limitation.', 'note')}`,
    'reportable-measurement') +

  docSection('Comparing against the baseline', `
    <p>Every reported result is a comparison, not an absolute. The change reported for an indicator is its current value against the baseline value measured at the start of the project, using the same method at the same locations.</p>
    ${docEquation('reported change = value (current period) &minus; value (baseline)',
      'Both values must come from the same method and the same sampling locations. A change produced by switching method is a change in measurement, not in the world.')}
    ${docCallout('Change is not attribution', 'An indicator improving during a project does not prove the project caused it. Regional trends, weather, and unrelated policy all move indicators. Attribution requires a counterfactual &mdash; a control site or a modelled baseline scenario &mdash; which this tool does not construct.', 'warn')}`,
    'baseline-comparison');
}

function docsReference() {
  const c = docParam('carbon', {}) || {};
  const av = c.avoided, sq = c.sequestration;
  const dur = docParam('aoi.duration', null);
  return docHero('REFERENCE', 'Parameters and worked examples',
    'Everything a reviewer needs to reproduce the main calculations without reading the whole documentation: the live parameter values, the formulas in one list, and worked arithmetic they can follow end to end.',
    ['Live values', 'Reproducible arithmetic', 'One page']) +

  docSection('All live parameters', `
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
    'all-parameters') +

  docSection('All formulas', `
    ${docEquation('eligible area (ha) = AOI (ha) &minus; non-eligible area (ha)')}
    ${docEquation('disturbed (ha) = ecosystem area (ha) &times; disturbed share (%) &divide; 100')}
    ${docEquation('remaining (ha) = ecosystem area &minus; disturbed &minus; loss')}
    ${docEquation('gross sequestration (tCO₂e) = eligible area (ha) &times; rate (tCO₂e/ha/yr) &times; duration (yr)')}
    ${docEquation('gross avoided (tCO₂e) = protected area (ha) &times; stock (tCO₂e/ha) &times; deforestation rate (/yr) &times; duration (yr)')}
    ${docEquation('net (tCO₂e) = gross &minus; leakage &minus; uncertainty &minus; buffer')}
    ${docEquation('Net ERRs (tCO₂e) = net avoided + net sequestration')}
    ${docEquation('reported change = value (current period) &minus; value (baseline)')}`,
    'all-formulas') +

  docSection('End-to-end worked example', `
    ${(() => {
      const t = docParam('aoi.total', null), ne = docParam('aoi.nonEligible', null), el = docParam('aoi.eligible', null);
      const f = docParam('eco.forest', null);
      if (t == null || !el || !f || !av || !sq) return docCallout('Missing', docTodo('live parameters incomplete — worked example cannot be computed'), 'warn');
      return docExample('From boundary to Net ERRs',
        `<p><strong>1 &mdash; Scope.</strong> An AOI of ${docFmt(t)} ha contains ${docFmt(ne)} ha of non-eligible land.</p>
         <ul><li>eligible = ${docFmt(t)} &minus; ${docFmt(ne)} = <strong>${docFmt(el)} ha</strong></li></ul>
         <p><strong>2 &mdash; Land states (forest).</strong> ${docFmt(f.area)} ha of forest, ${f.disturbedPct}% disturbed, ${f.lossPct}% lost.</p>
         <ul><li>disturbed = ${docFmt(f.area)} &times; ${f.disturbedPct}% = <strong>${docFmt(f.disturbed)} ha</strong></li>
             <li>loss = ${docFmt(f.area)} &times; ${f.lossPct}% = <strong>${docFmt(f.loss)} ha</strong></li>
             <li>remaining = <strong>${docFmt(f.remaining)} ha</strong> &rarr; protect</li></ul>
         <p><strong>3 &mdash; Gross carbon over ${dur} years.</strong></p>
         <ul><li>gross avoided = <strong>${docFmt(av.gross)} tCO₂e</strong> (${docFmt(av.perHa, 1)} tCO₂e/ha)</li>
             <li>gross sequestration = <strong>${docFmt(sq.gross)} tCO₂e</strong> (${docFmt(sq.perHa, 1)} tCO₂e/ha)</li></ul>
         <p><strong>4 &mdash; Deductions.</strong> ${av.leakageShare != null ? docPct(av.leakageShare, 0) : '—'} leakage, ${av.uncertaintyShare != null ? docPct(av.uncertaintyShare, 0) : '—'} uncertainty, ${av.bufferShare != null ? docPct(av.bufferShare, 0) : '—'} buffer.</p>
         <ul><li>net avoided = ${docFmt(av.gross)} &minus; ${docFmt(av.leakage)} &minus; ${docFmt(av.uncertainty)} &minus; ${docFmt(av.buffer)} = <strong>${docFmt(av.net)} tCO₂e</strong></li>
             <li>net sequestration = ${docFmt(sq.gross)} &minus; ${docFmt(sq.leakage)} &minus; ${docFmt(sq.uncertainty)} &minus; ${docFmt(sq.buffer)} = <strong>${docFmt(sq.net)} tCO₂e</strong></li></ul>`,
        `<strong>Net ERRs = ${docFmt(av.net + sq.net)} tCO₂e</strong> over ${dur} years, from ${docFmt(av.gross + sq.gross)} tCO₂e gross &mdash; an illustrative screening figure, not a certifiable result.`);
    })()}`,
    'worked-example') +

  docSection('Glossary', `
    ${docTable(['Term', 'Meaning'], [
      ['<strong>NbS</strong>', 'Nature-based Solutions &mdash; protecting, managing or restoring ecosystems to deliver benefits for nature, people and climate'],
      ['<strong>AOI</strong>', 'Area of Interest &mdash; the boundary drawn or uploaded for analysis'],
      ['<strong>MRV</strong>', 'Monitoring, Reporting and Verification'],
      ['<strong>Net ERRs</strong>', 'Net Emission Reductions and Removals &mdash; avoided emissions plus sequestration, after deductions'],
      ['<strong>tCO₂e</strong>', 'Tonnes of carbon dioxide equivalent'],
      ['<strong>tC</strong>', 'Tonnes of carbon; 1 tC ≈ 3.67 tCO₂e'],
      ['<strong>Leakage</strong>', 'Pressure displaced outside the project area rather than removed'],
      ['<strong>Buffer</strong>', 'Tonnage held in reserve against reversal'],
      ['<strong>Pathway</strong>', 'Protect, manage or restore'],
      ['<strong>Trajectory (C1&ndash;C6)</strong>', 'Coded land-cover state an activity is designed to act on'],
      ['<strong>adm1 / adm2+</strong>', 'Administrative level of a statistic &mdash; province/state, or district and below'],
      ['<strong>SCeNe</strong>', 'The coalition behind the tool']
    ])}`,
    'glossary');
}

function docsArticleHtml(id) {
  const map = {
    overview: docsOverview, scoping: docsScoping, 'site-context': docsSiteContext,
    'people-context': docsPeopleContext, threat: docsThreat, pathway: docsPathway,
    benefit: docsBenefit, carbon: docsCarbon, limits: docsLimits,
    monitoring: docsMonitoring, mrv: docsMrv, reference: docsReference
  };
  return (map[id] || docsOverview)();
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

function renderDocsToc() {
  const host = document.querySelector('#docs-toc');
  const article = document.querySelector('#docs-article');
  if (!host || !article) return;
  const headings = [...article.querySelectorAll('.doc-section > h2')];
  host.innerHTML = headings.map(h =>
    `<a href="#${h.parentElement.id}" data-doc-toc="${h.parentElement.id}">${docEsc(h.textContent)}</a>`).join('');
  host.querySelectorAll('a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(a.dataset.docToc);
    if (!target) return;
    target.scrollIntoView({ behavior: docScrollBehavior(), block: 'start' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
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
  }
  const match = location.hash.match(/^#docs\/([a-z0-9-]+)$/);
  if (match && TECH_DOCS.articles.some(a => a.id === match[1])) TECH_DOCS.active = match[1];
  document.body.classList.add('docs-active');
  renderDocsNav();
  openTechnicalDoc(TECH_DOCS.active, false);
}

window.loadTechnicalDocs = loadTechnicalDocs;
window.openTechnicalDoc = openTechnicalDoc;

/* F03 Document Generator — vanilla JS (no React/Babel) */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ── Field data ── */
  var CCB2F = [
    { k: 'gSummary', q: 'What is the project description and summary?*', type: 'ta', auto: true, ph: 'Describe project activities, objectives and expected outcomes...' },
    { k: 'gArea', q: 'What is the total project area?*', type: 'text', ph: 'e.g. 2,500 ha' },
    { k: 'gEcosys', q: 'What is the primary ecosystem type?*', type: 'sel', opts: ['Mangrove', 'Tropical Forest', 'Peatland', 'Grassland', 'Seagrass', 'Coral Reef', 'Freshwater Wetland', 'Montane Forest'] },
    { k: 'gLegal', q: 'What is the legal land tenure / ownership?*', type: 'sel', opts: ['State Forest Land', 'Community Forest (Hutan Desa)', 'Social Forestry', 'Private Land', 'Protected Area', 'National Park', 'Conservation Area'] },
    { k: 'gStd', q: 'What certification standard is this document for?*', type: 'sel', opts: ['CCB Standard v3.1', 'CCB Standard v3.0', 'Verra VCS + CCB', 'Gold Standard + CCB'] },
    { k: 'gCredit', q: 'What is the project crediting period?*', type: 'text', ph: 'e.g. 30 years (2024–2054)' }
  ];
  var CCB3F = [
    { k: 'cBaseline', q: 'Describe the without-project (baseline) scenario*', type: 'ta', auto: true, ph: 'Describe what would happen to the ecosystem without this project...' },
    { k: 'cActivity', q: 'Describe the project activity and how it reduces GHG emissions*', type: 'ta', ph: 'Explain the mechanisms by which the project reduces or removes GHG emissions...' },
    { k: 'cReductions', q: 'Estimated annual net GHG emission reductions (tCO₂e/year)*', type: 'text', ph: 'e.g. 125,000 tCO₂e/year' },
    { k: 'cLeakage', q: 'Describe the leakage assessment*', type: 'ta', auto: true, ph: 'Assess potential displacement of emissions outside the project boundary...' },
    { k: 'cMethod', q: 'What carbon methodology is applied?*', type: 'sel', opts: ['VM0007 REDD+ Methodology', 'VM0015 Avoided Unplanned Deforestation', 'VM0033 Tidal Wetlands & Seagrass', 'VM0047 Afforestation, Reforestation & Revegetation', 'Other'] },
    { k: 'cPerm', q: 'Describe the permanence and risk management approach*', type: 'ta', ph: 'Explain how the project ensures long-term carbon sequestration and addresses non-permanence risk...' }
  ];
  var CCB4F = [
    { k: 'cStake', q: 'Identify all relevant stakeholder groups*', type: 'ta', auto: true, ph: 'List government agencies, local communities, NGOs, indigenous peoples, and other relevant parties...' },
    { k: 'cFPIC', q: 'Describe the Free, Prior and Informed Consent (FPIC) process*', type: 'ta', ph: 'Describe how community consent was obtained before project commencement...' },
    { k: 'cBenef', q: 'What are the expected net positive community impacts?*', type: 'ta', auto: true, ph: 'Describe improved livelihoods, employment, food security, and other community co-benefits...' },
    { k: 'cEquity', q: 'Describe equity and benefit-sharing arrangements*', type: 'ta', ph: 'Explain how project benefits will be distributed equitably among communities...' },
    { k: 'cGriev', q: 'Describe the grievance and feedback mechanism*', type: 'ta', ph: 'How can communities raise concerns and receive timely responses?' }
  ];
  var GEN_STEPS = [
    { id: 1, label: 'Demography', sub: 'Population & structure', secKey: 'demography' },
    { id: 2, label: 'Social', sub: 'Employment, education, health', secKey: 'social' },
    { id: 3, label: 'Economics', sub: 'Income, poverty & GDP', secKey: 'economics' },
    { id: 4, label: 'Housing & Settlements', sub: 'Services & dwellings', secKey: 'housing' }
  ];
  var GEN_STEPS_OLD = [
    { id: 1, label: 'Project Overview', sub: 'Basic Info', fields: [
      { k: 'gName', q: 'Project name*', type: 'text', ph: 'e.g. Kubu Raya Mangrove Restoration Project' },
      { k: 'gDesc', q: 'Project description*', type: 'ta', ph: 'Describe objectives, activities and expected outcomes...' },
      { k: 'gCountry', q: 'Country*', type: 'sel', opts: ['Indonesia', 'Malaysia', 'Philippines', 'Vietnam', 'Thailand', 'Cambodia', 'Myanmar', 'Laos'] },
      { k: 'gProv', q: 'Province / Region*', type: 'text', ph: 'e.g. West Kalimantan' },
      { k: 'gArea', q: 'Total project area (ha)*', type: 'text', ph: 'e.g. 2,500' },
      { k: 'gStart', q: 'Project start date*', type: 'date' },
      { k: 'gEnd', q: 'Project end date*', type: 'date' }
    ] },
    { id: 2, label: 'Site & Ecosystem', sub: 'Habitat & Site', fields: [
      { k: 'sEco', q: 'Primary ecosystem type*', type: 'sel', opts: ['Mangrove', 'Tropical Forest', 'Peatland', 'Grassland', 'Seagrass Meadow', 'Freshwater Wetland', 'Montane Forest', 'Agroforestry'] },
      { k: 'sAct', q: 'NbS activity type*', type: 'sel', opts: ['Restore', 'Protect', 'Manage', 'Restore & Protect'] },
      { k: 'sDriver', q: 'Primary deforestation / degradation driver*', type: 'sel', opts: ['Agricultural Expansion', 'Illegal Logging', 'Charcoal Production', 'Aquaculture', 'Urban Expansion', 'Fire', 'Peat Drainage', 'Other'] },
      { k: 'sInteg', q: 'Forest / habitat integrity level*', type: 'sel', opts: ['Low (suitable for restoration)', 'Medium', 'High (suitable for protection)'] },
      { k: 'sKBA', q: 'Is the project area within a Key Biodiversity Area (KBA)?*', type: 'sel', opts: ['Yes', 'No', 'Partially'] },
      { k: 'sDesc', q: 'Site description*', type: 'ta', auto: true, ph: 'Describe the biophysical characteristics of the project site...' }
    ] },
    { id: 3, label: 'Carbon & Climate', sub: 'Carbon Data', fields: [
      { k: 'cStd', q: 'Carbon standard*', type: 'sel', opts: ['Verra VCS', 'Gold Standard', 'Plan Vivo', 'Social Carbon', 'Other'] },
      { k: 'cMeth', q: 'Applicable methodology*', type: 'sel', opts: ['VM0007 REDD+', 'VM0015 Avoided Deforestation', 'VM0033 Tidal Wetlands', 'VM0047 ARR', 'Plan Vivo Standard', 'Other'] },
      { k: 'cBase', q: 'Baseline carbon stock (tCO₂e/ha)*', type: 'text', ph: 'e.g. 150' },
      { k: 'cReduc', q: 'Estimated annual net GHG reductions (tCO₂e/year)*', type: 'text', ph: 'e.g. 125,000' },
      { k: 'cDesc', q: 'Describe the carbon accounting approach*', type: 'ta', auto: true, ph: 'Explain baseline scenario, project activity and GHG calculation methodology...' }
    ] },
    { id: 4, label: 'Biodiversity', sub: 'Species Data', fields: [
      { k: 'bKey', q: 'Key biodiversity features*', type: 'ta', ph: 'List key flora and fauna species present in the project area...' },
      { k: 'bIUCN', q: 'IUCN Red Listed species present*', type: 'ta', ph: 'List threatened, endangered, or critically endangered species...' },
      { k: 'bHab', q: 'Habitat condition assessment*', type: 'sel', opts: ['Good (minimal degradation)', 'Fair (some degradation)', 'Poor (heavily degraded)', 'Very Poor (near total degradation)'] },
      { k: 'bThreat', q: 'Key threats to biodiversity*', type: 'ta', ph: 'Describe main threats affecting biodiversity in the project area...' }
    ] },
    { id: 5, label: 'Socio-economic', sub: 'BPS Indicators', fields: [] },
    { id: 6, label: 'Safeguards & Governance', sub: 'Governance', fields: [
      { k: 'sgEnv', q: 'Environmental safeguards compliance*', type: 'sel', opts: ['Fully compliant', 'Partially compliant', 'Under review', 'Not assessed'] },
      { k: 'sgSoc', q: 'Social safeguards compliance*', type: 'sel', opts: ['Fully compliant', 'Partially compliant', 'Under review', 'Not assessed'] },
      { k: 'sgMon', q: 'Monitoring plan description*', type: 'ta', ph: 'Describe monitoring approach, indicators, and reporting frequency...' },
      { k: 'sgVer', q: 'Verification body*', type: 'text', ph: 'e.g. Bureau Veritas, SCS Global Services, DNV' },
      { k: 'sgGov', q: 'Project governance structure*', type: 'ta', ph: 'Describe organizational structure, roles, and decision-making processes...' }
    ] }
  ];
  var CCB_STEPS = [
    { id: 1, label: 'Basic Information', sub: 'Project & Document Details' },
    { id: 2, label: 'General', sub: 'Project Description' },
    { id: 3, label: 'Climate', sub: 'GHG & Carbon Accounting' },
    { id: 4, label: 'Community', sub: 'Stakeholders & Impacts' },
    { id: 5, label: 'Nature', sub: 'Biodiversity Criteria' }
  ];
  var CCB_TITLES = [
    'Fill in the form to generate the document',
    'General Project Information',
    'Climate & Carbon Accounting',
    'Community & Social Impacts',
    'Nature & Biodiversity Assessment'
  ];
  var CCB_FIELDS = { 2: CCB2F, 3: CCB3F, 4: CCB4F };

  var DEFAULT_TA = {
    existBio: 'The forests in the project area are classified as [forest type 1], [forest type 2], and [forest type 3]. The most important characteristics of vegetation are described in Section 2.1.5. The section lists alternative land use scenarios to the project activity resulting from the additionality analysis. The scenarios are:',
    currBio: 'The selected area is located within [KBA name] Key Biodiversity Area and has overlapped area by [x] ha. According to the Forest Landscape Integrity Index, the average forest integrity in the regions is: [FLII Scores]. [x]% of forest within the project area has low integrity, meaning it may be suitable for a forest restoration project.',
    optCrit: 'The project does not seek to validate Gold Level for exceptional biodiversity benefits',
    // Socio-economic narrative (auto) prefills
    seHealthDisease: 'Common endemic infectious diseases reported in the selected area include [Disease 1], [Disease 2], and [Disease 3].',
    seIplc: '[IP&LC / Ethnicity] in the selected area identify as Indigenous Peoples or members of local communities.'
  };

  /* ── Socio-economic indicators (F03 General Template — BPS) ──
     ui: 'input'  = long-answer textbox, example shown as placeholder
          'auto'  = narrative auto-generated, prefilled & editable
          'select'= single-selection dropdown                         */
  var SOCIO = [
    { key: 'demography', title: 'Demography', subs: [
      { title: 'Total Populations', inds: [
        { k: 'sePopTotal', name: 'Total populations', level: 'Desa/Kelurahan', req: 'Mandatory', ui: 'input', prompt: 'State the total population and its breakdown by sex.', example: 'e.g. According to BPS, the selected area has a total population of 12,480, comprising 6,310 males and 6,170 females.' },
        { k: 'sePopHh', name: 'Household population & number of households', level: 'Desa/Kelurahan', req: 'Optional', ui: 'input', prompt: 'Report household members and the number of households.', example: 'e.g. According to BPS, the selected Desa/Kelurahan contains 11,920 household members across 3,140 households.' },
        { k: 'sePopGrowth', name: 'Population growth', level: 'Desa/Kelurahan', req: 'Optional', ui: 'select', prompt: 'Select the population growth trend between census rounds.', opts: ['High growth (> 2% / year)', 'Moderate growth (1–2% / year)', 'Low growth (< 1% / year)', 'Stable (≈ 0%)', 'Declining (negative growth)'] }
      ] },
      { title: 'Gender Disaggregation', inds: [
        { k: 'seGender', name: 'Gender disaggregation (% Male / % Female)', level: 'Desa/Kelurahan', req: 'Mandatory', ui: 'select', prompt: 'Select the sex distribution of the population (male / female only).', opts: ['Male majority (> 55% male)', 'Balanced (≈ 50% / 50%)', 'Female majority (> 55% female)'] }
      ] },
      { title: 'Age Group', inds: [
        { k: 'seAge', name: 'Age group (5-year bands, 0–4 … 75+)', level: 'Desa/Kelurahan', req: 'Mandatory', ui: 'select', prompt: 'Select the dominant age structure.', opts: ['Predominantly young (0–14 dominant)', 'Predominantly working age (15–64 dominant)', 'Ageing population (65+ significant)', 'Balanced age structure'] }
      ] },
      { title: 'Population Density', inds: [
        { k: 'seDensity', name: 'Population density', level: 'Desa/Kelurahan', req: 'Mandatory', ui: 'input', prompt: 'Enter the population density (persons per km²).', example: 'e.g. The selected Desa/Kelurahan has a population density of 245 persons per square kilometre (according to BPS).' }
      ] },
      { title: 'Disability', inds: [
        { k: 'seDisability', name: 'Disabilities (disabilitas / tanpa disabilitas)', level: 'Kabupaten/Kota', req: 'Optional', ui: 'input', prompt: 'Report the share of persons with disabilities.', example: 'e.g. According to BPS, 2.3% of the population in the selected Kabupaten/Kota are persons with disabilities.' }
      ] }
    ] },
    { key: 'social', title: 'Social', subs: [
      { title: 'Employment', inds: [
        { k: 'seEmpStatus', name: 'Employment status (% formal / informal workers)', level: 'Kabupaten/Kota', req: 'Review', ui: 'input', prompt: 'Report the formal / informal employment split.', example: 'e.g. According to BPS, 38% of the labour force is in formal employment and 62% in informal employment.' },
        { k: 'seEmpSector', name: 'Employment by sector (Agriculture / Forestry / Fisheries)', level: 'Kabupaten/Kota', req: 'Optional', ui: 'input', prompt: 'Report employment shares in agriculture, forestry and fisheries.', example: 'e.g. According to BPS, 41% of employed persons work in agriculture, 6% in forestry, and 18% in fisheries.' }
      ] },
      { title: 'Education', inds: [
        { k: 'seEduLevel', name: 'Education level (none, SD, SMP, SMA, D1/D2 … S3)', level: 'Kabupaten/Kota', req: 'Mandatory', ui: 'input', prompt: 'Report educational attainment by highest level completed.', example: 'e.g. According to BPS, educational attainment is 8% with no schooling, 34% primary (SD), 22% junior secondary (SMP), 28% senior secondary (SMA), and 8% diploma or university.' },
        { k: 'seEduSchools', name: 'Number of schools', level: 'Desa/Kelurahan', req: 'Optional', ui: 'input', prompt: 'Report the number of schools by level.', example: 'e.g. The selected area is served by 14 schools, including 9 primary, 3 secondary, and 2 senior/high schools (according to BPS).' },
        { k: 'seEduEnrol', name: 'School enrolment & participation rate', level: 'Kabupaten/Kota', req: 'Optional', ui: 'input', prompt: 'Report school enrolment and participation rates.', example: 'e.g. According to BPS, the school enrolment rate is 94% and the participation rate 89% among school-age children.' }
      ] },
      { title: 'Health', inds: [
        { k: 'seHealthFac', name: 'Health facilities', level: 'Desa/Kelurahan', req: 'Mandatory', ui: 'input', prompt: 'Report the number of health facilities.', example: 'e.g. Health services in the selected area are supported by 1 hospital, 4 clinics, and 2 community health centres (according to BPS).' },
        { k: 'seHealthWork', name: 'Medical workers', level: 'Desa/Kelurahan', req: 'Mandatory', ui: 'input', prompt: 'Report the number of medical workers.', example: 'e.g. Healthcare in the selected area is supported by 6 doctors, 28 nurses, and 12 midwives (according to BPS).' },
        { k: 'seHealthDisease', name: 'Endemic infectious diseases (dengue, malaria, hepatitis, TBC)', level: 'Kabupaten/Kota', req: 'Review', ui: 'auto' }
      ] },
      { title: 'IP&LC or Ethnicity Identification', inds: [
        { k: 'seIplc', name: 'IP&LC or ethnicity identification', level: 'Desa/Kelurahan', req: 'Review', ui: 'auto' }
      ] }
    ] },
    { key: 'economics', title: 'Economics', subs: [
      { title: 'Household Economy', inds: [
        { k: 'seHhIncome', name: 'Household income & expenditure (Susenas)', level: 'Kabupaten/Kota', req: 'Mandatory', ui: 'input', prompt: 'Report average household income and expenditure.', example: 'e.g. Household economic conditions indicate an average income of IDR 3,200,000 and average expenditure of IDR 2,750,000 per household (according to BPS).' },
        { k: 'seHhLivelihood', name: 'Household based on livelihood', level: 'Kabupaten/Kota', req: 'Optional', ui: 'select', prompt: 'Select the dominant household livelihood.', opts: ['Agriculture', 'Fisheries', 'Forestry', 'Services / trade', 'Mixed livelihoods'] }
      ] },
      { title: 'Poverty & Food Security', inds: [
        { k: 'sePoverty', name: '% population in poverty', level: 'Kabupaten/Kota', req: 'Optional', ui: 'select', prompt: 'Select the poverty incidence band.', opts: ['Very low (< 5%)', 'Low (5–10%)', 'Moderate (10–20%)', 'High (> 20%)'] },
        { k: 'seUndernourish', name: '% undernourished', level: 'Kabupaten/Kota', req: 'Optional', ui: 'input', prompt: 'Report the share of undernourished population.', example: 'e.g. According to BPS, 7.4% of the population in the selected Kabupaten/Kota is undernourished, indicating food-security concerns.' },
        { k: 'seLowIncome', name: 'Low-income household coverage', level: 'Kabupaten/Kota', req: 'Optional', ui: 'input', prompt: 'Report the share of low-income households.', example: 'e.g. An estimated 21% of households in the selected Kabupaten/Kota are low-income (according to BPS).' }
      ] },
      { title: 'GDP', inds: [
        { k: 'seGdp', name: 'GDP / GRDP', level: 'Kabupaten/Kota', req: 'Optional', ui: 'input', prompt: 'Report the gross domestic / regional product.', example: 'e.g. The selected area records a GDP of IDR 18.6 trillion (according to BPS).' }
      ] },
      { title: 'Gini Ratio Line', inds: [
        { k: 'seGini', name: 'Gini ratio line', level: 'Kabupaten/Kota', req: 'Optional', ui: 'input', prompt: 'Report the Gini ratio (income inequality).', example: 'e.g. Income inequality in the selected area is reflected by a Gini ratio of 0.34 (according to BPS).' }
      ] }
    ] },
    { key: 'housing', title: 'Housing & Settlements', subs: [
      { title: 'Basic Services', inds: [
        { k: 'seElectricity', name: '% households with access to electricity', level: 'Desa/Kelurahan', req: 'Mandatory', ui: 'input', prompt: 'Report household access to electricity.', example: 'e.g. Access to electricity covers 96% of households in the selected area (according to BPS).' },
        { k: 'seWash', name: '% households with access to WASH', level: 'Desa/Kelurahan', req: 'Mandatory', ui: 'input', prompt: 'Report household access to water and sanitation (WASH).', example: 'e.g. Access to WASH (clean water and sanitation) covers 82% of households in the selected area (according to BPS).' }
      ] },
      { title: 'Housing', inds: [
        { k: 'seHousing', name: 'Housing (PODES facilities; dwelling via Susenas)', level: 'Desa/Kelurahan', req: 'Review', ui: 'select', prompt: 'Select the dominant housing / dwelling type.', opts: ['Permanent (brick / concrete)', 'Semi-permanent', 'Non-permanent (wood / bamboo)', 'Mixed housing types'] }
      ] }
    ] }
  ];

  /* ── state ── */
  var view = 'picker';       // 'picker' | 'ccb' | 'general'
  var step = 1;
  var modal = null;
  var openSub = { s1: true, s2: true };
  var openSec = { demography: true, social: false, economics: false, housing: false };
  var fd = {};
  function lsKey() { return view === 'ccb' ? 'f03_ccb' : 'f03_gen'; }
  function loadFd() { try { fd = JSON.parse(localStorage.getItem(lsKey()) || '{}'); } catch (e) { fd = {}; } }
  function save() { localStorage.setItem(lsKey(), JSON.stringify(fd)); }

  var root = document.getElementById('root');
  var modalRoot = document.createElement('div');
  document.body.appendChild(modalRoot);

  /* ── field renderers (structure only; values set in populate) ── */
  function frow(q, hint, inner) {
    return '<div class="frow"><div class="frow-lbl"><div class="frow-q" style="font-size:13px;font-weight:400">' + q + '</div>' +
      (hint ? '<div class="frow-hint">' + hint + '</div>' : '') + '</div><div class="frow-inp">' + inner + '</div></div>';
  }
  function fieldInput(f, scope) {
    scope = scope || 'fd';
    var d = 'data-scope="' + scope + '" data-k="' + f.k + '"';
    var al = ' aria-label="' + esc((f.q || f.ph || f.k || 'field').replace(/\*$/, '').trim()) + '"';
    if (f.type === 'ta') {
      return '<textarea class="fi-ta' + (f.auto ? ' auto' : '') + '" rows="4" placeholder="' + esc(f.ph || '') + '" ' + d + al + '></textarea>' +
        (f.auto ? '<div class="fi-sub">Auto-generated based on project data. You may edit based on your conditions.</div>' : '');
    }
    if (f.type === 'sel') {
      var opts = '<option value="">— Select</option>' + (f.opts || []).map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('');
      return '<select class="fi" style="font-size:12px" ' + d + al + '>' + opts + '</select>';
    }
    return '<input class="fi" type="' + (f.type || 'text') + '" placeholder="' + esc(f.ph || '') + '" ' + d + al + ' />';
  }
  function simpleFields(fields) {
    return fields.map(function (f) { return frow(f.q, f.hint, fieldInput(f)); }).join('');
  }
  function dateRange(sk, ek) {
    return '<div class="fi-grid2"><div class="fi-col"><label>Start date</label>' +
      '<input class="fi" type="date" aria-label="Start date" data-scope="fd" data-k="' + sk + '" /></div>' +
      '<div class="fi-col"><label>End date</label>' +
      '<input class="fi" type="date" aria-label="End date" data-scope="fd" data-k="' + ek + '" /></div></div>';
  }
  function propCard(p, i) {
    var del = i > 0 ? '<button class="prop-del" data-act="delProp" data-i="' + i + '" title="Remove"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="3,6 5,6 21,6" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M19 6l-1 14H6L5 6" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></button>' : '';
    var sc = 'data-scope="prop" data-i="' + i + '"';
    return '<div class="prop-card">' + del +
      '<div class="fi-col" style="margin-bottom:8px"><label>Organization Name</label><input class="fi" aria-label="Organization name" placeholder="Organization name" ' + sc + ' data-k="org" /></div>' +
      '<div class="fi-grid2" style="margin-bottom:8px"><div class="fi-col"><label>Contact Name</label><input class="fi" aria-label="Contact name" placeholder="Name here" ' + sc + ' data-k="name" /></div>' +
      '<div class="fi-col"><label>Email</label><input class="fi" type="email" aria-label="Contact email" placeholder="contact@mail.com" ' + sc + ' data-k="email" /></div></div>' +
      '<div class="fi-col"><label>Phone Number</label><input class="fi" aria-label="Phone number" placeholder="(62) - 123 456 789" style="max-width:280px" ' + sc + ' data-k="phone" /></div></div>';
  }
  function bioTbl(type, rows) {
    var label = type === 'flora' ? 'Flora' : type.charAt(0).toUpperCase() + type.slice(1);
    var cls = type === 'flora' ? 'flora' : 'fauna';
    var iucnOpts = ['LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX', 'DD'];
    var head = '<div class="bio-tbl-row ' + cls + ' bio-tbl-hdr"><span class="bio-col-hd">#</span><span class="bio-col-hd">Species</span>' +
      '<span class="bio-col-hd">Common Name</span><span class="bio-col-hd">IUCN</span><span></span></div>';
    var body = rows.map(function (r, i) {
      var sc = 'data-scope="bio" data-bt="' + type + '" data-i="' + i + '"';
      var sel = '<select class="bio-sel" ' + sc + ' data-k="iucn"><option value="">—</option>' +
        iucnOpts.map(function (x) { return '<option>' + x + '</option>'; }).join('') + '</select>';
      return '<div class="bio-tbl-row ' + cls + '">' +
        '<input class="bio-fi" aria-label="Number" placeholder="#" ' + sc + ' data-k="num" />' +
        '<input class="bio-fi" aria-label="Scientific name" placeholder="Scientific name" ' + sc + ' data-k="spp" />' +
        '<input class="bio-fi" aria-label="Common name" placeholder="Common name" ' + sc + ' data-k="cmn" />' +
        sel + '<button class="bio-del" aria-label="Delete row" data-act="delBio" data-bt="' + type + '" data-i="' + i + '">✕</button></div>';
    }).join('');
    return '<div style="margin-bottom:16px">' +
      (type === 'flora' ? '<div class="bio-title">Flora</div>' : '<div class="bio-sub-title">' + label + '</div>') +
      head + body + '<button class="btn-add" data-act="addBio" data-bt="' + type + '">+ Add ' + label + '</button></div>';
  }

  function ccbStep1HTML() {
    var props = fd.proponents || [{}];
    var cards = props.map(propCard).join('') + '<button class="btn-add" style="margin-top:0" data-act="addProp">+ Add Project Proponent</button>';
    var countryOpts = '<option value="">— Select Country</option>' +
      ['Indonesia', 'Malaysia', 'Philippines', 'Vietnam', 'Thailand', 'Cambodia', 'Myanmar', 'Laos', 'Singapore', 'Brunei']
        .map(function (c) { return '<option>' + c + '</option>'; }).join('');
    return frow('What is the name of your project?*', null, '<input class="fi" placeholder="Title" data-scope="fd" data-k="projectName" />') +
      frow('What is the version number of this document?*', null, '<input class="fi" placeholder="Example : V 1.2" data-scope="fd" data-k="docVersion" />') +
      frow('What is the date of the document created?*', null, '<input class="fi" type="date" data-scope="fd" data-k="docDate" />') +
      frow('Where is the location of the project?*', null,
        '<div class="fi-grid2"><div class="fi-col"><label>Country</label><select class="fi" aria-label="Country" data-scope="fd" data-k="country">' + countryOpts + '</select></div>' +
        '<div class="fi-col"><label>Province</label><input class="fi" aria-label="Province" placeholder="— Select Province" data-scope="fd" data-k="province" /></div></div>') +
      frow('Who is the project proponent? (Can be more than one)*', null, '<div>' + cards + '</div>') +
      frow('Please indicate the time period of project implementation*', null, dateRange('implS', 'implE')) +
      frow('Please indicate the timeframe of monitoring for GHG emission reduction and/or removals from project activities*', null, dateRange('ghgS', 'ghgE')) +
      frow('Expected Verification Schedule', null, '<input class="fi" type="date" data-scope="fd" data-k="verDate" />');
  }

  function ccbStep5HTML() {
    var floraRows = fd.flora || [{}];
    var fauna = ['birds', 'mammals', 'amphibians', 'reptiles'];
    var faunaHTML = fauna.map(function (t) { return bioTbl(t, fd[t] || [{}]); }).join('');
    var s1 = '<div class="form-subsec"><div class="form-subsec-hd" data-act="toggleSub" data-sub="s1">' +
      '<span class="form-subsec-hd-title">Without-Project Biodiversity Scenario</span>' +
      '<span style="font-size:14px;color:#68727d">' + (openSub.s1 ? '▲' : '▼') + '</span></div>' +
      (openSub.s1 ? '<div class="form-subsec-body">' +
        frow('Existing Conditions of Biodiversity', null, '<textarea class="fi-ta auto" rows="5" data-scope="fd" data-k="existBio"></textarea><div class="fi-sub">This narration field is generated automatically based on selected project area, however you can edit based on scenario of your condition (Max 500 words).</div>') +
        frow('Flora Species Inventory', null, '<div class="bio-inner">' + bioTbl('flora', floraRows) + '</div>') +
        frow('Fauna Species Inventory', null, '<div class="bio-inner">' + faunaHTML + '</div>') +
        frow('What are the biodiversity threats?', 'Explain threats from both illegal and legal activities, e.g. Land Conversion, Poor Law Enforcement, Deforestation, Forest Fire, Habitat Reduction, Degradation and Fragmentation, Government Development, Exploitation, Pollution.', '<textarea class="fi-ta" rows="4" placeholder="type your answer here" data-scope="fd" data-k="bioThreats"></textarea><div class="fi-sub">Max 500 words.</div>') +
        frow('What is the current condition of the biodiversity?', null, '<textarea class="fi-ta auto" rows="5" data-scope="fd" data-k="currBio"></textarea><div class="fi-sub">This narration field is generated automatically based on selected project area, however you can edit based on scenario of your condition.</div>') +
        '</div>' : '') + '</div>';
    var s2 = '<div class="form-subsec"><div class="form-subsec-hd" data-act="toggleSub" data-sub="s2">' +
      '<span class="form-subsec-hd-title">Biodiversity Impact Monitoring</span>' +
      '<span style="font-size:14px;color:#68727d">' + (openSub.s2 ? '▲' : '▼') + '</span></div>' +
      (openSub.s2 ? '<div class="form-subsec-body">' +
        frow('What is the optional criterion?', 'Validation at Gold Level requires exceptional biodiversity benefits.', '<textarea class="fi-ta" rows="3" data-scope="fd" data-k="optCrit"></textarea><div class="fi-sub">This is a default answer. However, you may edit the information given.</div>') +
        '</div>' : '') + '</div>';
    return s1 + s2;
  }

  /* ── Socio-economic (general step 5) ── */
  function seFieldInput(ind) {
    var d = 'data-scope="fd" data-k="' + ind.k + '"';
    var al = ' aria-label="' + esc(ind.name) + '"';
    if (ind.ui === 'auto') {
      return '<textarea class="fi-ta auto" rows="3" ' + d + al + '></textarea>' +
        '<div class="fi-sub">Auto-generated based on project data. You may edit based on your conditions.</div>';
    }
    if (ind.ui === 'select') {
      var opts = '<option value="">— Select</option>' +
        (ind.opts || []).map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('');
      return '<select class="fi" style="font-size:12px" ' + d + al + '>' + opts + '</select>';
    }
    return '<textarea class="fi-ta" rows="3" placeholder="' + esc(ind.example || '') + '" ' + d + al + '></textarea>';
  }
  function seRow(ind) {
    var star = ind.req === 'Mandatory' ? '<span style="color:#e33b32"> *</span>' : '';
    var reqCls = ind.req === 'Mandatory' ? 'man' : ind.req === 'Optional' ? 'opt' : 'rev';
    var meta = '<div class="se-meta"><span class="se-badge lvl">' + esc(ind.level) + '</span>' +
      '<span class="se-badge ' + reqCls + '">' + esc(ind.req) + '</span></div>' +
      (ind.prompt ? '<div class="se-prompt">' + esc(ind.prompt) + '</div>' : '');
    return frow(esc(ind.name) + star, meta, seFieldInput(ind));
  }
  function seSection(sec) {
    var open = !!openSec[sec.key];
    var count = sec.subs.reduce(function (n, sub) { return n + sub.inds.length; }, 0);
    var body = '';
    if (open) {
      body = '<div class="form-subsec-body">' + sec.subs.map(function (sub) {
        return '<div class="se-subsec"><div class="se-subsec-title">' + esc(sub.title) + '</div>' +
          sub.inds.map(seRow).join('') + '</div>';
      }).join('') + '</div>';
    }
    return '<div class="form-subsec"><div class="form-subsec-hd" data-act="toggleSec" data-sec="' + sec.key + '">' +
      '<span class="form-subsec-hd-title">' + esc(sec.title) + '</span>' +
      '<span class="se-sec-right"><span class="se-sec-count">' + count + ' indicators</span>' +
      '<span class="se-sec-chev">' + (open ? '▲' : '▼') + '</span></span></div>' + body + '</div>';
  }
  function genSocioStepHTML() {
    var sec = SOCIO[step - 1];
    if (!sec) return '';
    return '<p class="se-intro">Socio-economic indicators for <strong>' + esc(sec.title) + '</strong> are drawn from official statistics (BPS). ' +
      'Fields are auto-filled from project data where available, and you can edit any of them.</p>' +
      sec.subs.map(function (sub) {
        return '<div class="se-subsec"><div class="se-subsec-title">' + esc(sub.title) + '</div>' +
          sub.inds.map(seRow).join('') + '</div>';
      }).join('');
  }
  function genStep5HTML() {
    return '<p class="se-intro">Socio-economic indicators are drawn from official statistics (BPS). ' +
      'Expand a section to fill it in — fields are auto-filled from project data where available, and you can edit any of them.</p>' +
      SOCIO.map(seSection).join('');
  }

  function stepContentHTML() {
    if (view === 'ccb') {
      if (step === 1) return ccbStep1HTML();
      if (step === 5) return ccbStep5HTML();
      return simpleFields(CCB_FIELDS[step] || []);
    }
    if (view !== 'ccb') return genSocioStepHTML();
    if (step === 5) return genStep5HTML();
    var s = GEN_STEPS[step - 1];
    return s ? simpleFields(s.fields) : '';
  }

  function filledCount() {
    if (view === 'ccb') {
      return Object.keys(fd).filter(function (k) {
        var v = fd[k];
        return v && (Array.isArray(v) ? v.length > 0 : String(v).trim());
      }).length;
    }
    return Object.keys(fd).filter(function (k) { return fd[k] && String(fd[k]).trim(); }).length;
  }

  function sidebarHTML() {
    var steps = view === 'ccb' ? CCB_STEPS : GEN_STEPS;
    var total = view === 'ccb' ? 44 : 26;
    var filled = filledCount();
    var pct = Math.min(100, Math.round(filled / total * 100));
    var items = steps.map(function (s) {
      var st = s.id < step ? 'done' : s.id === step ? 'curr' : 'next';
      var circle = st === 'done' ? '✓' : String(s.id).padStart(2, '0');
      return '<div class="snav-item' + (s.id === step ? ' active' : '') + '" data-step="' + s.id + '">' +
        '<div class="snav-circle ' + st + '">' + circle + '</div>' +
        '<div><div class="snav-label">' + s.label + '</div><div class="snav-sub">' + s.sub + '</div></div></div>';
    }).join('');
    return '<div class="f03-sidebar"><div class="prog-widget"><div class="prog-top">' +
      '<span class="prog-pct" id="progPct">' + pct + '% Completed</span>' +
      '<span class="prog-count" id="progCount">' + filled + ' / ' + total + ' questions filled</span></div>' +
      '<div class="prog-bar"><div class="prog-fill" id="progFill" style="width:' + pct + '%"></div></div></div>' +
      '<div class="step-nav-card">' + items + '</div>' +
      '<div class="dl-hint"><div class="dl-hint-title">Download document</div>' +
      '<p class="dl-hint-text">Document can be generated without finishing the form. You can fill in manually by .docx or continue from the project dashboard.</p>' +
      '<button class="btn-dl-gen" data-act="dl"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Generate Document</button></div></div>';
  }

  function pickerHTML() {
    return '<div class="doc-picker-wrap"><button class="btn-back picker-back" data-act="toDetail">← Back to project</button>' +
      '<div class="doc-picker-hd"><h1>Document Generator</h1>' +
      '<p>Select a document template to begin filling out your project documentation for Nature-based Solutions.</p></div>' +
      '<div class="doc-picker-grid">' +
      '<div class="doc-card" data-act="pick" data-doc="ccb" style="padding:24px"><div class="doc-card-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/></svg></div>' +
      '<div class="doc-card-badge">CCB Standard</div><div class="doc-card-title">Climate, Community and Biodiversity (CCB) Standard</div>' +
      '<div class="doc-card-desc">Generate a Climate, Community and Biodiversity (CCB) Standards project document. Covers 5 sections: Basic Information, General Description, Climate/Carbon Accounting, Community Impacts, and Biodiversity/Nature criteria — including full flora and fauna inventories.</div></div>' +
      '<div class="doc-card" data-act="pick" data-doc="general" style="padding:24px"><div class="doc-card-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 9h18M9 21V9" stroke="currentColor" stroke-width="2"/></svg></div>' +
      '<div class="doc-card-badge">Socio-Economic</div><div class="doc-card-title">Pre Feasibility Document</div>' +
      '<div class="doc-card-desc">Socio-economic data entry drawn from official statistics (BPS), covering 4 sections: Demography, Social, Economics, and Housing & Settlements.</div></div>' +
      '</div></div>';
  }

  function formHTML() {
    var isCcb = view === 'ccb';
    var steps = isCcb ? CCB_STEPS : GEN_STEPS;
    var isLast = step === steps.length;
    var title = isCcb ? 'Generate Project Document' : 'Socio-Economic — Form Data Entry';
    var badge = isCcb ? 'CCB Standard v3.1' : 'Pre-feasibility Document Template';
    var secHd = isCcb ? CCB_TITLES[step - 1] : (GEN_STEPS[step - 1] ? GEN_STEPS[step - 1].label : '');
    var prev = step > 1 ? '<button class="btn-draft" data-act="prev">← Previous</button>' : '';
    var nextIcon = isLast ? '' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return '<div class="f03-view"><div class="f03-topbar"><div style="display:flex;align-items:center;gap:14px">' +
      '<button class="btn-back" data-act="back">← Back</button><span class="f03-topbar-title">' + title + '</span>' +
      '<span class="doc-type-badge">' + badge + '</span></div>' +
      '<div class="f03-topbar-right"><button class="btn-draft" data-act="save">Save the Draft</button></div></div>' +
      '<div class="f03-layout">' + sidebarHTML() +
      '<div class="f03-main"><div class="form-sec-hd">' + secHd + '</div>' +
      '<div class="form-req-note">* Indicates required question</div>' + stepContentHTML() +
      '<div class="form-nav-btns">' + prev +
      '<button class="btn-nxt" data-act="next">' + (isLast ? 'Generate Document' : 'Next') + nextIcon + '</button></div></div></div></div>';
  }

  function populate() {
    // simple fd-scoped fields
    root.querySelectorAll('[data-scope="fd"]').forEach(function (inp) {
      var k = inp.getAttribute('data-k');
      var v = fd[k];
      if (v == null || v === '') v = DEFAULT_TA[k] != null ? DEFAULT_TA[k] : '';
      inp.value = v;
    });
    root.querySelectorAll('[data-scope="prop"]').forEach(function (inp) {
      var i = +inp.getAttribute('data-i'), k = inp.getAttribute('data-k');
      var p = (fd.proponents || [{}])[i] || {};
      inp.value = p[k] || '';
    });
    root.querySelectorAll('[data-scope="bio"]').forEach(function (inp) {
      var bt = inp.getAttribute('data-bt'), i = +inp.getAttribute('data-i'), k = inp.getAttribute('data-k');
      var r = (fd[bt] || [{}])[i] || {};
      inp.value = r[k] || '';
    });
  }

  function render() {
    if (view === 'picker') { root.innerHTML = pickerHTML(); modalRoot.innerHTML = ''; return; }
    root.innerHTML = formHTML();
    populate();
  }

  function updateProgress() {
    var total = view === 'ccb' ? 44 : 26;
    var filled = filledCount();
    var pct = Math.min(100, Math.round(filled / total * 100));
    var a = document.getElementById('progPct'), b = document.getElementById('progCount'), c = document.getElementById('progFill');
    if (a) a.textContent = pct + '% Completed';
    if (b) b.textContent = filled + ' / ' + total + ' questions filled';
    if (c) c.style.width = pct + '%';
  }

  /* ── modals ── */
  function ov(inner) { return '<div class="f03-ov" data-ov="1">' + inner + '</div>'; }
  function modalX() { return '<button class="modal-x" data-act="closeModal"><svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>'; }
  var PROC_ICON = '<svg width="55" height="55" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="#066653" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="#066653" stroke-width="1.5"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#066653" stroke-width="1.5" stroke-linecap="round"/></svg>';
  var DL_ICON = '<svg width="70" height="70" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#066653" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function renderModal() {
    if (!modal) { modalRoot.innerHTML = ''; return; }
    var h = '';
    if (modal === 'save') {
      var savedTitle = view === 'ccb' ? 'Save as Draft' : 'Draft Saved';
      var savedDesc = view === 'ccb'
        ? 'Your progress has been saved. You can always edit and re-visit your project documentation from the project dashboard.'
        : 'Your progress has been saved as a draft. You can continue editing from the project dashboard at any time.';
      var savedBtn = view === 'ccb' ? 'Continue Filling' : 'Continue editing';
      h = ov('<div class="f03-modal sm">' + modalX() +
        '<div class="modal-icon" style="background:#e9f8f1;border-radius:50%"><svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#066653" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
        '<div class="modal-title">' + savedTitle + '</div><p class="modal-desc">' + savedDesc + '</p>' +
        '<div class="modal-btns col"><button class="mb-solid full" data-act="closeModal">' + savedBtn + '</button>' +
        '<button class="mb-out full" data-act="backToPicker">Go to My Project Dashboard</button></div></div>');
    } else if (modal === 'dl-undone') {
      h = ov('<div class="f03-modal">' + modalX() + '<div class="modal-icon">' + DL_ICON + '</div>' +
        '<div class="modal-title">Download unfinished document</div>' +
        '<p class="modal-desc">Do you want to generate your project document without completing the field? Document could be generated anyway without finishing the form completely. You can fill in manually by .docx or continuing fill the form in project dashboard.</p>' +
        '<div class="modal-btns"><button class="mb-out" data-act="closeModal">Complete the data first</button>' +
        '<button class="mb-solid" data-act="processing">Yes, generate anyway</button></div></div>');
    } else if (modal === 'dl-done') {
      h = ov('<div class="f03-modal">' + modalX() + '<div class="modal-icon">' + DL_ICON + '</div>' +
        '<div class="modal-title">Download The Document</div>' +
        '<p class="modal-desc">Do you want to generate your project document without completing the field? Document could be generated anyway without finishing the form completely. You can fill in manually by .docx or continuing fill the form in project dashboard.</p>' +
        '<div class="modal-btns"><button class="mb-solid full" data-act="processing">Download CCB Document</button></div></div>');
    } else if (modal === 'dl') {
      h = ov('<div class="f03-modal">' + modalX() + '<div class="modal-icon">' + DL_ICON + '</div>' +
        '<div class="modal-title">Generate Pre Feasibility Document</div>' +
        '<p class="modal-desc">Your socio-economic project data will be compiled into a Pre Feasibility document. The document will be sent to your registered email address.</p>' +
        '<div class="modal-btns"><button class="mb-solid full" data-act="processing">Generate Document</button></div></div>');
    } else if (modal === 'processing') {
      var procDesc = view === 'ccb'
        ? 'We will send your generated CCB template to your email. While waiting a minute, you can explore your previous or running projects on your dashboard.'
        : 'We will send your generated document to your email. While waiting, you can explore your projects on your dashboard.';
      var procBtn = view === 'ccb' ? 'Go to Project Management Dashboard' : 'Go to Dashboard';
      h = ov('<div class="f03-modal">' + modalX() + '<div class="modal-icon">' + PROC_ICON + '</div>' +
        '<div class="modal-title">The document is processing</div><p class="modal-desc">' + procDesc + '</p>' +
        '<div class="modal-btns"><button class="mb-out" data-act="backToPicker">' + procBtn + '</button></div></div>');
    }
    modalRoot.innerHTML = h;
  }

  function handleDl() {
    if (view === 'ccb') { modal = filledCount() >= 20 ? 'dl-done' : 'dl-undone'; }
    else { modal = 'dl'; }
    renderModal();
  }

  /* ── events ── */
  root.addEventListener('input', function (e) {
    var t = e.target, sc = t.getAttribute && t.getAttribute('data-scope');
    if (!sc) return;
    var k = t.getAttribute('data-k');
    if (sc === 'fd') { fd[k] = t.value; }
    else if (sc === 'prop') { var pi = +t.getAttribute('data-i'); fd.proponents = fd.proponents || [{}]; fd.proponents[pi] = fd.proponents[pi] || {}; fd.proponents[pi][k] = t.value; }
    else if (sc === 'bio') { var bt = t.getAttribute('data-bt'), bi = +t.getAttribute('data-i'); fd[bt] = fd[bt] || [{}]; fd[bt][bi] = fd[bt][bi] || {}; fd[bt][bi][k] = t.value; }
    save();
    updateProgress();
  });
  root.addEventListener('change', function (e) {
    var t = e.target;
    if (t.tagName !== 'SELECT') return;
    var sc = t.getAttribute('data-scope'); if (!sc) return;
    var k = t.getAttribute('data-k');
    if (sc === 'fd') { fd[k] = t.value; }
    else if (sc === 'bio') { var bt = t.getAttribute('data-bt'), bi = +t.getAttribute('data-i'); fd[bt] = fd[bt] || [{}]; fd[bt][bi] = fd[bt][bi] || {}; fd[bt][bi][k] = t.value; }
    save();
    updateProgress();
  });
  root.addEventListener('click', function (e) {
    var stepEl = e.target.closest('[data-step]');
    if (stepEl) { step = +stepEl.getAttribute('data-step'); render(); return; }
    var act = e.target.closest('[data-act]');
    if (!act) return;
    var a = act.getAttribute('data-act');
    if (a === 'pick') { view = act.getAttribute('data-doc'); step = 1; openSub = { s1: true, s2: true }; openSec = { demography: true, social: false, economics: false, housing: false }; loadFd(); render(); }
    else if (a === 'toDetail') { window.location.href = 'F04.1 Project Detail.html'; }
    else if (a === 'back' || a === 'backToPicker') { view = 'picker'; modal = null; step = 1; render(); }
    else if (a === 'save') { modal = 'save'; renderModal(); }
    else if (a === 'dl') { handleDl(); }
    else if (a === 'prev') { step = Math.max(1, step - 1); render(); }
    else if (a === 'next') {
      var steps = view === 'ccb' ? CCB_STEPS : GEN_STEPS;
      if (step === steps.length) { handleDl(); }
      else { step += 1; render(); }
    }
    else if (a === 'addProp') { fd.proponents = (fd.proponents || [{}]).concat([{}]); save(); render(); }
    else if (a === 'delProp') { var di = +act.getAttribute('data-i'); fd.proponents = (fd.proponents || [{}]).filter(function (_, j) { return j !== di; }); save(); render(); }
    else if (a === 'addBio') { var abt = act.getAttribute('data-bt'); fd[abt] = (fd[abt] || [{}]).concat([{}]); save(); render(); }
    else if (a === 'delBio') { var bt2 = act.getAttribute('data-bt'), dbi = +act.getAttribute('data-i'); fd[bt2] = (fd[bt2] || [{}]).filter(function (_, j) { return j !== dbi; }); save(); render(); }
    else if (a === 'toggleSub') { var sub = act.getAttribute('data-sub'); openSub[sub] = !openSub[sub]; render(); }
    else if (a === 'toggleSec') { var sec = act.getAttribute('data-sec'); openSec[sec] = !openSec[sec]; render(); }
  });
  modalRoot.addEventListener('click', function (e) {
    if (e.target.getAttribute && e.target.getAttribute('data-ov') === '1') { modal = null; renderModal(); return; }
    var act = e.target.closest('[data-act]');
    if (!act) return;
    var a = act.getAttribute('data-act');
    if (a === 'closeModal') { modal = null; renderModal(); }
    else if (a === 'processing') { modal = 'processing'; renderModal(); }
    else if (a === 'backToPicker') { modal = null; view = 'picker'; step = 1; render(); }
  });

  render();
})();

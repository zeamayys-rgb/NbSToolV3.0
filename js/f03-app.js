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
    { id: 1, label: 'Demography', sub: 'Population & villages', secKey: 'demography' },
    { id: 2, label: 'Social', sub: 'Employment, livelihood & services', secKey: 'social' },
    { id: 3, label: 'Economics', sub: 'Income & poverty', secKey: 'economics' },
    { id: 4, label: 'Housing and Settlements', sub: 'Electricity & WASH', secKey: 'housing' },
    { id: 5, label: 'Governance', sub: 'Legal, benefit sharing & MRV', secKey: 'governance' }
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
    optCrit: 'The project does not seek to validate Gold Level for exceptional biodiversity benefits'
  };

  /* ── Socio-economic form (F03 Form Generator — General Template) ──
     ui: 'number'    = single numeric fill-in-the-blank
         'short'     = short answer (max 20 words)
         'para'      = long paragraph answer (max 100 words), example as placeholder
         'matrix'    = population by age × education × gender table (auto-totalled)
         'villages'  = number + names of villages
         'employment'= employed / unemployed / economically inactive numbers
         'livelihood'= households per type of livelihood table (auto-totalled)
         'hhtable'   = households by dominant livelihood table (auto share %)
         'currency'  = currency dropdown + amount
         'iplc'      = repeatable "Community X consists of N individuals" rows   */
  var CURRENCIES = ['BND', 'KHR', 'IDR', 'LAK', 'MYR', 'MMK', 'PHP', 'SGD', 'THB', 'USD', 'VND', 'GBP'];
  var LIVELIHOODS = ['Formal sectors', 'Informal sectors', 'Entrepreneur', 'Fishery / aquaculture', 'NbS — agroforestry', 'NbS — reforestation', 'NbS — mangrove restoration', 'NbS — NTFP', 'NbS — forest patrol and protection', 'NbS — seedling nursery'];
  var HH_LIVELIHOODS = ['Agriculture / agroforestry', 'Forestry / NbS', 'Fishery / aquaculture', 'Other'];
  var MX_AGES = ['0–14 years old', '15–44 years old', '45 & beyond'];
  var MX_EDUS = ['Primary education', 'Secondary education', 'Higher education'];
  var SOCIO = [
    { key: 'demography', title: 'Demography', subs: [
      { title: '', inds: [
        { k: 'seMatrix', name: 'Population by Age, Education & Gender', ui: 'matrix', prompt: 'Fill the table with the number of people for each age group, highest education level and gender. Total population, gender disaggregation, education level and age group are combined into one table (auto-totalled).' },
        { k: 'seVillages', name: 'Number of Villages', ui: 'villages', prompt: 'How many villages are located within the project area? Please provide the names of the villages.' },
        { k: 'seYearSource', name: 'Year of Data Source', ui: 'number', plain: true, prompt: 'What is the reference year of the population data used?', example: 'e.g. 2025' },
        { k: 'seHouseholds', name: 'Household Population & Number of Households', ui: 'number', prompt: 'How many households are located within the project area?', example: 'e.g. 3.140' },
        { k: 'seDisabilities', name: 'Disabilities', ui: 'number', prompt: 'How many people with disabilities reside within the project area?', example: 'e.g. 46' }
      ] }
    ] },
    { key: 'social', title: 'Social', subs: [
      { title: '', inds: [
        { k: 'seEmployment', name: 'Employment Status', ui: 'employment', prompt: 'How many people are employed, unemployed, or economically inactive within the project area?' },
        { k: 'seLivelihood', name: 'Type of Livelihood (Agriculture, Forestry, Fishery)', ui: 'livelihood', prompt: 'Fill the table with the number of households for each type of livelihood.' },
        { k: 'seSchools', name: 'Number of Schools within Project Area', ui: 'number', prompt: 'How many schools within the project area?', example: 'e.g. 14' },
        { k: 'seHealthFac', name: 'Health Facility within Project Area', ui: 'number', prompt: 'How many health facilities within the project area?', example: 'e.g. 5' },
        { k: 'seDiseases', name: 'Endemic Infectious Diseases', ui: 'short', prompt: 'Is there any endemic or infectious diseases within the project area? If yes, what are those? (short answer, max 20 words)', example: 'e.g. dengue, malaria, hepatitis, tuberculosis' },
        { k: 'seIplc', name: 'IP&LC or Ethnicity Identification', ui: 'iplc', prompt: 'Specify the Indigenous Peoples and Local Communities (IP&LCs) or ethnic groups present within the project area, and indicate the number of people or households belonging to each group.' },
        { k: 'seSocialForestry', name: 'Social Forestry Beneficiaries', ui: 'number', prompt: 'How many households within the project area are beneficiaries to social forestry?', example: 'e.g. 210' }
      ] }
    ] },
    { key: 'economics', title: 'Economics', subs: [
      { title: '', inds: [
        { k: 'seHhLivelihood', name: 'Household Based on Livelihood', ui: 'hhtable', prompt: 'Breakdown of households by dominant livelihood (derived from the livelihood table in the Social section).' },
        { k: 'seIncome', name: 'Average Household Income', ui: 'currency', prompt: 'What is the average household income of the community within the project area?', example: 'e.g. 3.200.000' },
        { k: 'seExpenditure', name: 'Average Household Expenditure', ui: 'currency', prompt: 'What is the average household expenditure of the community within the project area?', example: 'e.g. 2.750.000' },
        { k: 'sePoverty', name: 'Number of Households in Poverty', ui: 'number', prompt: 'How many households within the project area living in poverty?', example: 'e.g. 640' },
        { k: 'seUndernourished', name: 'Number of Undernourished Households', ui: 'number', prompt: 'How many undernourished households in the project area?', example: 'e.g. 220' }
      ] }
    ] },
    { key: 'housing', title: 'Housing and Settlements', subs: [
      { title: '', inds: [
        { k: 'seElectricity', name: 'Number of Households with Access to Electricity', ui: 'number', prompt: 'How many households are in the project area with access to electricity?', example: 'e.g. 3.000' },
        { k: 'seWash', name: 'Number of Households with Access to WASH', ui: 'number', prompt: 'How many households in the project area are living with access to WASH?', example: 'e.g. 2.600' }
      ] }
    ] },
    { key: 'governance', title: 'Governance', subs: [
      { title: '', inds: [
        { k: 'seLegal', name: 'Forestry Legal Framework', ui: 'para', prompt: 'Elaborate the applicable forestry legal framework governing the project, including formal statement of conservation group, its organisation structure along with working/management plan. (long paragraph, max 100 words)', example: 'e.g. The project is located within a designated Social Forestry area established under the Decree of the Minister of Environment and Forestry No. 116 of 2024. It is managed by a legally recognised Village Forest Management Institution with a defined organisational structure and an approved Village Forest Management Plan and Annual Work Plan guiding restoration, conservation, and community engagement activities.' },
        { k: 'seBenefit', name: 'Benefit Sharing Mechanism', ui: 'para', prompt: 'Elaborate existing benefit-sharing mechanism established for the project. It covers number of beneficiaries, type of benefit and the mechanism on benefit determination and disbursement. (long paragraph, max 100 words)', example: 'e.g. A benefit-sharing mechanism is established through the Village Forest Management Institution, covering 320 beneficiary households. Benefits include carbon-revenue shares, agroforestry income, and livelihood grants; allocation is decided in a participatory village assembly and disbursed annually via the institution’s managed account — 60% to community members, 25% to institutional operations, and 15% to a village conservation fund.' },
        { k: 'seTenure', name: 'Indigenous Land Tenure', ui: 'para', prompt: 'Please describe relevant land governance, land use, or customary/community tenure considerations. (long paragraph, max 100 words)', example: 'e.g. The project is located on land managed under customary tenure or an ancestral domain by Indigenous People and Local Communities, recognised under national law (e.g. the Indigenous Peoples’ Rights Act (IPRA) of 1997 and covered by a Certificate of Ancestral Domain Title (CADT) in the Philippines). The area is managed through a recognised Indigenous governance structure (e.g. Indigenous Cultural Community), with project activities implemented following Free, Prior and Informed Consent (FPIC), and the community’s approved management plan (e.g. the Ancestral Domain Sustainable Development and Protection Plan (ADSDPP)).' },
        { k: 'seMrv', name: 'MRV Institutional Capacity', ui: 'para', prompt: 'If the community is assigned to conduct MRV process, elaborate the steps they would take and what instrument they would use. (long paragraph, max 100 words)', example: 'e.g. The project will establish a monitoring, reporting, and verification (MRV) team comprising community representatives (e.g. the Village Forest Management Institution), local government agencies (e.g. the Forest Management Unit or the District Forestry Office), and technical partners (e.g. NGOs/CSOs or local universities). Standard operating procedures (SOPs) will guide data collection, quality assurance, reporting, and verification.', note: 'To develop a detailed Monitoring Plan, including Monitoring, Reporting, and Verification (MRV) indicators, please proceed to the <a href="create-monitoring-plan.html" style="color:#066653;font-weight:600">Monitoring Plan</a> feature.' },
        { k: 'seSafeguard', name: 'Safeguard Information System', ui: 'para', prompt: 'Please describe any existing safeguard, risk management, or community feedback system relevant to the project area, including responsible actors and supporting procedures where available. (long paragraph, max 100 words)', example: 'e.g. A safeguard information system is coordinated by the project proponent together with the Village Forest Management Institution, recording how social and environmental safeguards are addressed and respected, drawing on national REDD+ Safeguards Information System guidance. It is updated periodically and made accessible to community members through village meetings.' },
        { k: 'seGrievance', name: 'Grievance Redress Mechanism', ui: 'para', prompt: 'Please describe any available mechanism for receiving and responding to community feedback, concerns, or complaints related to the project. (long paragraph, max 100 words)', example: 'e.g. Community members can submit complaints through village facilitators, a suggestion box, or a dedicated contact number. Grievances are logged, acknowledged within seven days, and resolved by a village grievance committee; unresolved cases are escalated to the project proponent and, where needed, the relevant district authority.' },
        { k: 'seAdaptive', name: 'Adaptive Management Response Time', ui: 'para', prompt: 'How long does it take for the community to respond emerging issues within the project area? (long paragraph, max 100 words)', example: 'e.g. The community typically responds within two to four weeks. Routine matters are handled at monthly institution meetings, while urgent issues (fire, illegal logging, flooding) trigger an immediate response by the village patrol team, followed by coordination with the project proponent and local government for adaptive management.' }
      ] }
    ] }
  ];

  /* ── state ── */
  var view = 'picker';       // 'picker' | 'ccb' | 'general'
  var step = 1;
  var modal = null;
  var openSub = { s1: true, s2: true };
  var openSec = { demography: true, social: false, economics: false, housing: false, governance: false };
  var fd = {};
  function lsKey() { return view === 'ccb' ? 'f03_ccb' : 'f03_gen'; }
  function loadFd() { try { fd = JSON.parse(localStorage.getItem(lsKey()) || '{}'); } catch (e) { fd = {}; } }
  function save() { localStorage.setItem(lsKey(), JSON.stringify(fd)); }

  var root = document.getElementById('root');
  var modalRoot = document.createElement('div');
  document.body.appendChild(modalRoot);

  /* ── field renderers (structure only; values set in populate) ── */
  function frow(q, hint, inner, cls) {
    return '<div class="frow' + (cls ? ' ' + cls : '') + '"><div class="frow-lbl"><div class="frow-q" style="font-size:13px;font-weight:400">' + q + '</div>' +
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

  /* ── Socio-economic form widgets ── */
  function numIn(k, ph, label, plain) {
    // plain = integer without thousand separator (e.g. a year)
    return '<input class="fi fi-num" type="text" inputmode="numeric"' + (plain ? ' data-plain="1"' : '') + ' placeholder="' + esc(ph || '0') + '" data-scope="fd" data-k="' + k + '" aria-label="' + esc(label || k) + '" />';
  }
  /* format value with "." thousand separators; flag & strip non-numeric input */
  function formatNumInput(el) {
    var raw = el.value;
    var invalid = /[^\d.,\s]/.test(raw);
    el.classList.toggle('fi-invalid', invalid);
    var err = el.nextElementSibling;
    var hasErr = !!(err && err.classList && err.classList.contains('fi-num-err'));
    if (invalid && !hasErr) {
      err = document.createElement('span');
      err.className = 'fi-num-err';
      err.textContent = 'Unaccepted format — numbers only';
      el.parentNode.insertBefore(err, el.nextSibling);
    } else if (!invalid && hasErr) { err.remove(); }
    var digits = raw.replace(/\D/g, '');
    var formatted = el.hasAttribute('data-plain') ? digits : digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (formatted !== raw) {
      var digitsBefore = raw.slice(0, el.selectionStart || 0).replace(/\D/g, '').length;
      el.value = formatted;
      var pos = 0, seen = 0;
      while (pos < formatted.length && seen < digitsBefore) { if (/\d/.test(formatted[pos])) seen++; pos++; }
      el.setSelectionRange(pos, pos);
    }
  }
  function matrixHTML(ind) {
    var sexes = [['m', 'Male (M)'], ['f', 'Female (F)'], ['o', 'Other (O)']];
    var h = '<div class="se-tbl-wrap"><table class="se-tbl"><thead><tr><th>Age of group</th><th>Highest education level</th>' +
      sexes.map(function (s) { return '<th>' + s[1] + '</th>'; }).join('') + '<th>Total (M+F+O)</th></tr></thead><tbody>';
    MX_AGES.forEach(function (age, ai) {
      MX_EDUS.forEach(function (edu, ei) {
        h += '<tr>' + (ei === 0 ? '<td rowspan="3" class="se-tbl-age">' + esc(age) + '</td>' : '') +
          '<td>' + esc(edu) + '</td>' +
          sexes.map(function (s) { return '<td>' + numIn(ind.k + '_a' + ai + '_e' + ei + '_' + s[0], '0', age + ' ' + edu + ' ' + s[1]) + '</td>'; }).join('') +
          '<td class="se-tbl-tot" data-mxt="a' + ai + '_e' + ei + '_t">0</td></tr>';
      });
      h += '<tr class="se-tbl-sub"><td colspan="2">Subtotal — ' + esc(age) + '</td>' +
        sexes.map(function (s) { return '<td data-mxt="a' + ai + '_' + s[0] + '">0</td>'; }).join('') +
        '<td data-mxt="a' + ai + '_t">0</td></tr>';
    });
    h += '<tr class="se-tbl-grand"><td colspan="2">Total population in the project area</td>' +
      sexes.map(function (s) { return '<td data-mxt="g_' + s[0] + '">0</td>'; }).join('') +
      '<td data-mxt="g_t">0</td></tr></tbody></table></div>';
    return h;
  }
  function livelihoodHTML(ind) {
    return '<div class="se-tbl-wrap"><table class="se-tbl"><thead><tr><th>Type of livelihood</th><th>Number of households</th></tr></thead><tbody>' +
      LIVELIHOODS.map(function (lv, i) {
        return '<tr><td>' + esc(lv) + '</td><td>' + numIn(ind.k + '_' + i, '0', lv) + '</td></tr>';
      }).join('') +
      '<tr class="se-tbl-grand"><td>Total households</td><td data-lvt="total">0</td></tr></tbody></table></div>';
  }
  function hhTableHTML(ind) {
    return '<div class="se-tbl-wrap"><table class="se-tbl"><thead><tr><th>Livelihood</th><th>Households</th><th>Share</th></tr></thead><tbody>' +
      HH_LIVELIHOODS.map(function (lv, i) {
        return '<tr><td>' + esc(lv) + '</td><td>' + numIn(ind.k + '_' + i, '0', lv) + '</td><td class="se-tbl-tot" data-hhsh="' + i + '">—</td></tr>';
      }).join('') + '</tbody></table></div>';
  }
  function iplcHTML(ind) {
    var rows = fd[ind.k];
    if (!Array.isArray(rows) || !rows.length) rows = [{}];
    var h = rows.map(function (r, i) {
      var sc = 'data-scope="iplc" data-i="' + i + '"';
      return '<div class="se-iplc-row">Community <input class="fi" style="flex:1" placeholder="name" aria-label="Community name" ' + sc + ' data-k="name" /> consists of ' +
        '<input class="fi fi-num" type="text" inputmode="numeric" style="width:90px" placeholder="0" aria-label="Number of individuals" ' + sc + ' data-k="num" /> individuals' +
        (i > 0 ? '<button class="bio-del" aria-label="Remove community" data-act="delIplc" data-i="' + i + '">✕</button>' : '') + '</div>';
    }).join('');
    return h + '<button class="btn-add" data-act="addIplc">+ Add community</button>';
  }
  function seFieldInput(ind) {
    var d = 'data-scope="fd" data-k="' + ind.k + '"';
    var al = ' aria-label="' + esc(ind.name) + '"';
    if (ind.ui === 'matrix') return matrixHTML(ind);
    if (ind.ui === 'livelihood') return livelihoodHTML(ind);
    if (ind.ui === 'hhtable') return hhTableHTML(ind);
    if (ind.ui === 'iplc') return iplcHTML(ind);
    if (ind.ui === 'villages') {
      return '<div class="fi-grid2"><div class="fi-col"><label>Number of villages</label>' + numIn(ind.k + '_num', 'e.g. 12', 'Number of villages') + '</div>' +
        '<div class="fi-col"><label>Name of villages</label><input class="fi" placeholder="e.g. Phum Sambor, Teluk Pambang Village, Barangay Kobongcog" aria-label="Name of villages" data-scope="fd" data-k="' + ind.k + '_names" /></div></div>';
    }
    if (ind.ui === 'employment') {
      return '<div class="fi-grid2" style="grid-template-columns:1fr 1fr 1fr"><div class="fi-col"><label>Employed</label>' + numIn(ind.k + '_emp', '0', 'Employed') + '</div>' +
        '<div class="fi-col"><label>Unemployed</label>' + numIn(ind.k + '_unemp', '0', 'Unemployed') + '</div>' +
        '<div class="fi-col"><label>Economically inactive</label>' + numIn(ind.k + '_inactive', '0', 'Economically inactive') + '</div></div>';
    }
    if (ind.ui === 'currency') {
      var cur = '<select class="fi" style="font-size:12px;width:100px" aria-label="Currency" data-scope="fd" data-k="' + ind.k + '_cur"><option value="">Currency</option>' +
        CURRENCIES.map(function (c) { return '<option>' + c + '</option>'; }).join('') + '</select>';
      return '<div style="display:flex;gap:8px">' + cur + numIn(ind.k + '_amt', ind.example || '0', ind.name) + '</div>';
    }
    if (ind.ui === 'short') return '<textarea class="fi-ta" rows="2" placeholder="' + esc(ind.example || '') + '" ' + d + al + '></textarea>';
    if (ind.ui === 'para') {
      return '<textarea class="fi-ta" rows="5" placeholder="' + esc(ind.example || '') + '" ' + d + al + '></textarea>' +
        '<div class="fi-sub">Max 100 words.</div>';
    }
    return numIn(ind.k, ind.example, ind.name, ind.plain);
  }
  function seRow(ind) {
    var meta = ind.prompt ? '<div class="se-prompt">' + esc(ind.prompt) + '</div>' : '';
    var note = ind.note ? '<div class="fi-sub" style="margin-top:8px">' + ind.note + '</div>' : '';
    return frow(esc(ind.name), meta, seFieldInput(ind) + note, ind.ui === 'matrix' ? 'frow-stack' : '');
  }
  function toNum(v) { return parseInt(String(v == null ? '' : v).replace(/[^0-9]/g, ''), 10) || 0; }
  function sep(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function setCell(attr, id, txt) {
    var el = root.querySelector('[' + attr + '="' + id + '"]');
    if (el) el.textContent = txt;
  }
  function recalcTables() {
    if (view === 'ccb') return;
    var g = { m: 0, f: 0, o: 0 };
    MX_AGES.forEach(function (_, ai) {
      var s = { m: 0, f: 0, o: 0 };
      MX_EDUS.forEach(function (_, ei) {
        var rt = 0;
        ['m', 'f', 'o'].forEach(function (x) {
          var v = toNum(fd['seMatrix_a' + ai + '_e' + ei + '_' + x]);
          s[x] += v; rt += v;
        });
        setCell('data-mxt', 'a' + ai + '_e' + ei + '_t', sep(rt));
      });
      ['m', 'f', 'o'].forEach(function (x) { g[x] += s[x]; setCell('data-mxt', 'a' + ai + '_' + x, sep(s[x])); });
      setCell('data-mxt', 'a' + ai + '_t', sep(s.m + s.f + s.o));
    });
    ['m', 'f', 'o'].forEach(function (x) { setCell('data-mxt', 'g_' + x, sep(g[x])); });
    setCell('data-mxt', 'g_t', sep(g.m + g.f + g.o));
    var lvTotal = LIVELIHOODS.reduce(function (n, _, i) { return n + toNum(fd['seLivelihood_' + i]); }, 0);
    setCell('data-lvt', 'total', sep(lvTotal));
    var hhVals = HH_LIVELIHOODS.map(function (_, i) { return toNum(fd['seHhLivelihood_' + i]); });
    var hhTotal = hhVals.reduce(function (a, b) { return a + b; }, 0);
    hhVals.forEach(function (v, i) { setCell('data-hhsh', i, hhTotal ? Math.round(v / hhTotal * 100) + '%' : '—'); });
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
    return '<p class="se-intro">Socio-economic form for <strong>' + esc(sec.title) + '</strong>. ' +
      'Fill in the fields below — tables are totalled automatically, and you can edit any answer at any time.</p>' +
      sec.subs.map(function (sub) {
        return '<div class="se-subsec">' + (sub.title ? '<div class="se-subsec-title">' + esc(sub.title) + '</div>' : '') +
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

  function isFilled(k) {
    var v = fd[k];
    if (Array.isArray(v)) return v.some(function (r) { return r && Object.keys(r).some(function (x) { return String(r[x] || '').trim(); }); });
    if (v != null && String(v).trim() !== '') return true;
    // composite widgets store sub-values as "<k>_suffix"
    for (var kk in fd) { if (kk.indexOf(k + '_') === 0 && fd[kk] != null && String(fd[kk]).trim() !== '') return true; }
    return false;
  }
  function socioKeys(sec) {
    var ks = [];
    sec.subs.forEach(function (sub) { sub.inds.forEach(function (ind) { ks.push(ind.k); }); });
    return ks;
  }
  function stepKeys(stepId) {
    if (view === 'ccb') {
      if (stepId === 1) return ['projectName', 'docVersion', 'docDate', 'country', 'province', 'implS', 'implE', 'ghgS', 'ghgE'];
      if (stepId === 5) return ['existBio', 'bioThreats', 'currBio', 'optCrit'];
      return (CCB_FIELDS[stepId] || []).map(function (f) { return f.k; });
    }
    var sec = SOCIO[stepId - 1];
    return sec ? socioKeys(sec) : [];
  }
  function stepCounts(stepId) {
    var keys = stepKeys(stepId);
    return { filled: keys.filter(isFilled).length, total: keys.length };
  }

  function sidebarHTML() {
    var steps = view === 'ccb' ? CCB_STEPS : GEN_STEPS;
    var items = steps.map(function (s) {
      var c = stepCounts(s.id);
      var complete = c.total > 0 && c.filled === c.total;
      var st = s.id === step ? 'curr' : complete ? 'done' : 'next';
      var circle = complete ? '✓' : String(s.id).padStart(2, '0');
      return '<div class="snav-item' + (s.id === step ? ' active' : '') + '" data-step="' + s.id + '">' +
        '<div class="snav-circle ' + st + '">' + circle + '</div>' +
        '<div style="min-width:0"><div class="snav-label">' + s.label + '</div><div class="snav-sub">' + s.sub + '</div></div>' +
        '<span class="snav-count" data-step="' + s.id + '" style="margin-left:auto;font-size:11px;font-weight:600;color:#68727d;white-space:nowrap">' + c.filled + '/' + c.total + ' filled</span></div>';
    }).join('');
    return '<div class="f03-sidebar">' +
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
      '<div class="doc-card-badge">Socio-Economic</div><div class="doc-card-title">Feasibility Document</div>' +
      '<div class="doc-card-desc">Socio-economic data entry covering 5 sections: Demography, Social, Economics, Housing and Settlements, and Governance.</div></div>' +
      '</div></div>';
  }

  function formHTML() {
    var isCcb = view === 'ccb';
    var steps = isCcb ? CCB_STEPS : GEN_STEPS;
    var isLast = step === steps.length;
    var title = isCcb ? 'Generate Project Document' : 'Socio-Economic — Form Data Entry';
    var badge = isCcb ? 'CCB Standard v3.1' : 'Feasibility Document Template';
    var secHd = isCcb ? CCB_TITLES[step - 1] : (GEN_STEPS[step - 1] ? GEN_STEPS[step - 1].label : '');
    var prev = step > 1 ? '<button class="btn-draft" data-act="prev">← Previous</button>' : '';
    var nextIcon = isLast ? '' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return '<div class="f03-view"><div class="f03-topbar"><div style="display:flex;align-items:center;gap:14px">' +
      '<button class="btn-back" data-act="back">← Back</button><span class="f03-topbar-title">' + title + '</span>' +
      '<span class="doc-type-badge">' + badge + '</span></div>' +
      '<div class="f03-topbar-right"><button class="btn-draft" data-act="save">Save the Draft</button></div></div>' +
      '<div class="f03-layout">' + sidebarHTML() +
      '<div class="f03-main"><div class="form-sec-hd" style="display:flex;align-items:baseline;justify-content:space-between;gap:12px"><span>' + secHd + '</span>' +
      '<span id="secHdCount" style="font-size:13px;font-weight:600;color:#68727d">' + (function () { var c = stepCounts(step); return c.filled + '/' + c.total + ' filled'; })() + '</span></div>' +
      (isCcb ? '<div class="form-req-note">* Indicates required question before submitting the CCB Document</div>' : '') + stepContentHTML() +
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
    root.querySelectorAll('[data-scope="iplc"]').forEach(function (inp) {
      var i = +inp.getAttribute('data-i'), k = inp.getAttribute('data-k');
      var r = (fd.seIplc || [{}])[i] || {};
      inp.value = r[k] || '';
    });
  }

  function render() {
    if (view === 'picker') { root.innerHTML = pickerHTML(); modalRoot.innerHTML = ''; return; }
    root.innerHTML = formHTML();
    populate();
    recalcTables();
  }

  function updateProgress() {
    var steps = view === 'ccb' ? CCB_STEPS : GEN_STEPS;
    steps.forEach(function (s) {
      var c = stepCounts(s.id);
      var el = document.querySelector('.snav-count[data-step="' + s.id + '"]');
      if (el) el.textContent = c.filled + '/' + c.total + ' filled';
    });
    var hd = document.getElementById('secHdCount');
    if (hd) { var cc = stepCounts(step); hd.textContent = cc.filled + '/' + cc.total + ' filled'; }
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
        '<div class="modal-title">Generate Feasibility Document</div>' +
        '<p class="modal-desc">Your socio-economic project data will be compiled into a Feasibility document. The document will be sent to your registered email address.</p>' +
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
    if (t.classList && t.classList.contains('fi-num')) formatNumInput(t);
    var k = t.getAttribute('data-k');
    if (sc === 'fd') { fd[k] = t.value; }
    else if (sc === 'prop') { var pi = +t.getAttribute('data-i'); fd.proponents = fd.proponents || [{}]; fd.proponents[pi] = fd.proponents[pi] || {}; fd.proponents[pi][k] = t.value; }
    else if (sc === 'bio') { var bt = t.getAttribute('data-bt'), bi = +t.getAttribute('data-i'); fd[bt] = fd[bt] || [{}]; fd[bt][bi] = fd[bt][bi] || {}; fd[bt][bi][k] = t.value; }
    else if (sc === 'iplc') { var ii = +t.getAttribute('data-i'); fd.seIplc = fd.seIplc || [{}]; fd.seIplc[ii] = fd.seIplc[ii] || {}; fd.seIplc[ii][k] = t.value; }
    save();
    updateProgress();
    if (sc === 'fd' && /^se(Matrix|Livelihood|HhLivelihood)_/.test(k)) recalcTables();
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
    if (a === 'pick') { view = act.getAttribute('data-doc'); step = 1; openSub = { s1: true, s2: true }; openSec = { demography: true, social: false, economics: false, housing: false, governance: false }; loadFd(); render(); }
    else if (a === 'toDetail') { window.location.href = 'project-detail.html'; }
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
    else if (a === 'addIplc') { fd.seIplc = (fd.seIplc || [{}]).concat([{}]); save(); render(); }
    else if (a === 'delIplc') { var ri = +act.getAttribute('data-i'); fd.seIplc = (fd.seIplc || [{}]).filter(function (_, j) { return j !== ri; }); save(); render(); }
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

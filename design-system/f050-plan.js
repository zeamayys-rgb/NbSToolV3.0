/* ============================================================
   F05.0 — Steps 3 (activities), 4 (matrix + pathway review),
   5 (customize & finalize) + customization modals.
   Depends on f050-app.js (window.F050).
   ============================================================ */
(function () {
  'use strict';
  const F = window.F050;
  const { ECO, ECO_ORDER, PW_ORDER, PW_LABEL, PW, ECOIMG, state } = F;

  /* ── activities per ecosystem (shared with monitoring matrix) ── */
  const ACT = {
    forest: [
      { id: 'f-cons', name: 'Forest conservation', type: 'Recommended', pw: ['protect'], checked: true, indicators: ['Actual conservation area (ha)', 'Annual forest cover loss (ha/yr)'], optional: ['Forest habitat fragmentation (index)', 'Conservation priority species (count)'], method: 'Remote sensing + field verification', freq: 'Annual' },
      { id: 'f-rest', name: 'Forest restoration', type: 'Recommended', pw: ['restore'], checked: true, indicators: ['Area of habitats restored (ha)', 'Forest cover gain (ha/yr)'], optional: ['Tree biomass stock change (tCO₂e/ha)', 'Soil carbon content (tC/ha)'], method: 'GPS mapping + satellite imagery', freq: 'Annual / seasonal' },
      { id: 'anr', name: 'Assisted natural regeneration', type: 'Recommended', pw: ['restore', 'manage'], checked: false, indicators: ['Area prepared for restoration (ha)', 'Seedling survival rate (%)'], optional: ['Tree regeneration density (stems/ha)', 'Species diversity (index)'], method: 'Field plots + geotagged photos', freq: '3, 6, 12 months' },
      { id: 'fire-f', name: 'Fire prevention and control', type: 'Optional', pw: ['protect', 'manage'], checked: false, indicators: ['Burned area (ha)', 'Number of fire events (count/yr)'], optional: ['Hotspot count (number)', 'Community patrol coverage (km²)'], method: 'Satellite fire data + patrol reports', freq: 'Monthly in dry season' }
    ],
    mangrove: [
      { id: 'mg-rehab', name: 'Mangrove rehabilitation', type: 'Recommended', pw: ['restore', 'manage'], checked: true, indicators: ['Area of habitats restored (ha)', 'Mangrove cover change (ha/yr)'], optional: ['Species diversity (index)', 'Sediment flow (kg/m²/yr)'], method: 'Drone/satellite imagery + transect', freq: '6–12 months' },
      { id: 'hydro', name: 'Hydrological improvement', type: 'Recommended', pw: ['manage'], checked: false, indicators: ['Water flow condition (m³/s)', 'Tidal exchange (m)'], optional: ['Sediment accretion (mm/yr)', 'Water salinity (ppt)'], method: 'Field observation + hydrology assessment', freq: 'Quarterly' },
      { id: 'shore', name: 'Shoreline restoration', type: 'Optional', pw: ['restore'], checked: false, indicators: ['Erosion risk area (ha)', 'Shoreline condition (index)'], optional: ['Flood risk area (ha)', 'Recreational value (score)'], method: 'Shoreline change analysis', freq: 'Annual' },
      { id: 'mg-prot', name: 'Protection of intact mangrove stands', type: 'Optional', pw: ['protect'], checked: false, indicators: ['Mangrove cover maintained (ha)', 'Converted mangrove area (ha/yr)'], optional: ['Habitat richness (species count)', 'Community stewardship (household)'], method: 'Remote sensing + stakeholder report', freq: 'Annual' }
    ],
    peatland: [
      { id: 'canal', name: 'Canal blocking', type: 'Recommended', pw: ['restore'], checked: true, indicators: ['Number of canal blocks (count)', 'Canal block condition (%)'], optional: ['Canal proximity to settlement (km)', 'Hydrological feasibility (index)'], method: 'GPS inspection + photo documentation', freq: 'Quarterly' },
      { id: 'rewet', name: 'Rewetting', type: 'Recommended', pw: ['restore', 'manage'], checked: true, indicators: ['Water table depth (cm below surface)', 'Wet area extent (ha)'], optional: ['Wetness index (score)', 'Peat subsidence (mm/yr)'], method: 'Dipwell/water logger + remote sensing', freq: 'Monthly' },
      { id: 'fire-p', name: 'Fire prevention', type: 'Recommended', pw: ['protect', 'manage'], checked: false, indicators: ['Burned area (ha)', 'Fire risk index (score)'], optional: ['Hotspot count (number)', 'Patrol coverage (km²)'], method: 'MODIS/VIIRS + patrol report', freq: 'Monthly in dry season' },
      { id: 'veg', name: 'Peat vegetation recovery', type: 'Optional', pw: ['restore'], checked: false, indicators: ['Vegetation recovery area (ha)', 'Peatland vegetation maintained (%)'], optional: ['Canopy condition (%)', 'Biodiversity observation (species count)'], method: 'NDVI/canopy monitoring + field survey', freq: 'Annual' }
    ]
  };
  const ecoIconSm = id => `<img src="${ECOIMG(ECO[id].fig, true)}" width="20" height="20" alt="" style="vertical-align:middle">`;

  const customDone = { opt1: false, opt2: false, opt3: false, opt4: false };

  function selectedEcos() { return F.selectedEcos(); }
  function getSelectedActivities() {
    const out = [];
    selectedEcos().forEach(id => ACT[id].forEach(a => { if (a.checked) out.push({ ...a, ecoId: id }); }));
    return out;
  }

  /* ════════════════ STEP 3 — Select activities ════════════════ */
  F.renderActivities = function () {
    const host = document.getElementById('actGrid');
    const ecos = selectedEcos();
    host.innerHTML = ecos.map(id => {
      const e = ECO[id];
      const pws = PW_ORDER.filter(p => state.pathways[id][p]);
      const pwIcons = pws.map(p => `<img src="${PW(p, e.fig, true)}" width="24" height="24" alt="${PW_LABEL[p]}" title="${PW_LABEL[p]}">`).join('');
      return `<div class="eco-card">
        <div class="eco-head">
          <div class="eco-title">${ecoIconSm(id)}<span>${e.name}</span></div>
          <div style="display:flex;gap:2px">${pwIcons}</div>
        </div>
        <div class="act-list">
          ${ACT[id].map(a => `
            <label class="act-item">
              <input type="checkbox" data-act="${id}:${a.id}" ${a.checked ? 'checked' : ''}/>
              <span>${a.name}</span>
              <span class="act-tag ${a.type === 'Optional' ? 'opt' : ''}">${a.type}</span>
            </label>`).join('')}
        </div>
      </div>`;
    }).join('');
    host.querySelectorAll('[data-act]').forEach(cb => cb.addEventListener('change', () => {
      const [eid, aid] = cb.dataset.act.split(':');
      const a = ACT[eid].find(x => x.id === aid); if (a) a.checked = cb.checked;
      updateStep3();
    }));
    updateStep3();
  };
  function updateStep3() {
    const sel = getSelectedActivities();
    document.getElementById('actCount').textContent = sel.length;
    document.getElementById('s3next').disabled = sel.length === 0;
    const ecoNames = [...new Set(sel.map(a => ECO[a.ecoId].name))];
    document.getElementById('actTags').innerHTML = ecoNames.map(n => `<span class="sel-tag">${n}</span>`).join('');
  }
  document.getElementById('s3back').addEventListener('click', () => F.goToStep(2));
  document.getElementById('s3next').addEventListener('click', () => F.advance(4));

  /* ════════════════ Pathway summary panel (steps 4 & 5) ════════════════ */
  function pathwaySummaryHTML(editStep) {
    const body = selectedEcos().map(id => {
      const e = ECO[id];
      const pws = PW_ORDER.filter(p => state.pathways[id][p]);
      const chips = pws.length
        ? pws.map(p => `<span class="pwsum-pw"><img src="${PW(p, e.fig, true)}" alt="">${PW_LABEL[p]}</span>`).join('')
        : `<span class="pwsum-pw none">No pathway</span>`;
      return `<div class="pwsum-eco">
        <div class="pwsum-eco-hd">${`<img src="${ECOIMG(e.fig, true)}" alt="">`}
          <div><div class="nm">${e.name}</div><div class="du">${state.duration[id]} year duration · ${e.area}</div></div>
        </div>
        <div class="pwsum-pws">${chips}</div>
      </div>`;
    }).join('');
    return `<div class="pwsum">
      <div class="pwsum-hd">
        <div class="t"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#066653" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>NbS pathway selection</div>
        <button class="pwsum-edit" onclick="F050.goToStep(2)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Edit pathways</button>
      </div>
      <div class="pwsum-body">${body}</div>
    </div>`;
  }

  /* ════════════════ STEP 4 — Review matrix ════════════════ */
  function renderMatrix(showOpt) {
    const sel = getSelectedActivities();
    const rows = sel.map(a => {
      const e = ECO[a.ecoId];
      const inds = [
        ...a.indicators.map(i => `<li>${i}</li>`),
        ...(showOpt ? a.optional.map(i => `<li><span class="m-badge opt">Opt</span> ${i}</li>`) : [])
      ].join('');
      return `<tr>
        <td><div class="act-cell ${e.colorCls}">${ecoIconSm(a.ecoId)}<span>${a.name}</span></div></td>
        <td><span class="m-badge rec">Recommended</span>${showOpt ? '<br><span class="m-badge opt" style="margin-top:4px">Optional avail.</span>' : ''}</td>
        <td><ul class="ind-list">${inds}</ul></td>
        <td style="font-size:11px;color:rgb(74,84,104)">${a.method}<br><span class="m-badge field" style="margin-top:5px">Field verify</span></td>
        <td class="freq-cell">📅 ${a.freq}</td>
      </tr>`;
    }).join('');
    document.getElementById('matrixRows').innerHTML = rows;
    const ecos = new Set(sel.map(a => a.ecoId));
    const indCount = sel.reduce((s, a) => s + a.indicators.length + (showOpt ? a.optional.length : 0), 0);
    document.getElementById('s4meta').textContent = `${ecos.size} ecosystems · ${sel.length} activities · ${indCount} indicators`;
  }
  F.renderMatrixStep = function () {
    document.getElementById('pwSummary4').innerHTML = pathwaySummaryHTML();
    const opt = document.getElementById('showOptional').classList.contains('active');
    renderMatrix(opt);
  };
  document.getElementById('showOptional').addEventListener('click', e => {
    e.currentTarget.classList.toggle('active');
    document.getElementById('showRecommended').classList.toggle('active', !e.currentTarget.classList.contains('active'));
    renderMatrix(e.currentTarget.classList.contains('active'));
  });
  document.getElementById('showRecommended').addEventListener('click', e => {
    e.currentTarget.classList.add('active');
    document.getElementById('showOptional').classList.remove('active');
    renderMatrix(false);
  });
  document.getElementById('s4back').addEventListener('click', () => F.goToStep(3));
  document.getElementById('s4next').addEventListener('click', () => F.advance(5));

  /* ════════════════ STEP 5 — Customize & finalize ════════════════ */
  F.renderCustomizeStep = function () {
    document.getElementById('pwSummary5').innerHTML = pathwaySummaryHTML();
    renderAccordions();
    updatePlanSummary();
  };
  function renderAccordions() {
    const sel = getSelectedActivities();
    const ecos = selectedEcos().filter(id => sel.some(a => a.ecoId === id));
    document.getElementById('accordions').innerHTML = ecos.map(id => {
      const e = ECO[id];
      const acts = ACT[id].filter(a => a.checked);
      const pws = PW_ORDER.filter(p => state.pathways[id][p]).map(p => PW_LABEL[p]).join(' · ');
      return `<div class="accordion">
        <div class="accordion-head" onclick="this.parentElement.classList.toggle('open')">
          <div class="accordion-title">${ecoIconSm(id)}
            <div><strong style="color:var(--primary-600)">${e.name} monitoring plan</strong>
            <div class="acc-hint">${pws || 'No pathway'} · ${state.duration[id]} yr · indicators, methods &amp; responsibilities</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="acc-count">${acts.length} selected</span><span class="acc-chev">▼</span>
          </div>
        </div>
        <div class="accordion-body">
          <table class="small-table">
            <thead><tr><th>NbS Activity</th><th>Recommended indicators</th><th>Optional indicators</th><th>Method</th><th>Frequency</th></tr></thead>
            <tbody>${acts.map(a => `<tr>
              <td><strong>${a.name}</strong><br><span class="act-tag ${a.type === 'Optional' ? 'opt' : ''}" style="display:inline-block;margin-top:3px">${a.type}</span></td>
              <td>${a.indicators.map(i => `<div style="margin:2px 0">· ${i}</div>`).join('')}</td>
              <td>${a.optional.map(i => `<div style="margin:2px 0;color:#68727d">· ${i}</div>`).join('')}</td>
              <td style="font-size:11px">${a.method}</td>
              <td class="freq-cell">${a.freq}</td>
            </tr>`).join('')}</tbody>
          </table>
        </div>
      </div>`;
    }).join('');
  }
  function updatePlanSummary() {
    const sel = getSelectedActivities();
    const ecos = selectedEcos();
    document.getElementById('sumEco').textContent = ecos.length;
    document.getElementById('sumPathways').textContent = F.selectedPathwayCount();
    document.getElementById('sumActivities').textContent = sel.length;
    document.getElementById('sumRecommended').textContent = sel.reduce((s, a) => s + a.indicators.length, 0);
    document.getElementById('sumOptional').textContent = sel.reduce((s, a) => s + a.optional.length, 0);
    const durs = ecos.map(id => state.duration[id]);
    document.getElementById('sumDuration').textContent = durs.length ? `${Math.min(...durs)}–${Math.max(...durs)} yr` : '—';
    const done = Object.values(customDone).filter(Boolean).length;
    document.getElementById('sumCustom').textContent = `${done} / 4`;
  }
  function markDone(id) {
    customDone[id] = true;
    const el = document.getElementById(id + '-status');
    if (el) { el.textContent = 'Done ✓'; el.classList.add('done'); }
    updatePlanSummary();
  }
  F._markDone = markDone;

  document.getElementById('s5back').addEventListener('click', () => F.goToStep(4));
  document.getElementById('finalizeBtn').addEventListener('click', () => F.advance(6));

  /* ════════════════ Customization modals ════════════════ */
  window.openModal = function (id) {
    if (id === 'm-indicators') buildIndEditor();
    if (id === 'm-methods') buildMethEditor();
    if (id === 'm-parties') buildPartyList();
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeModal = function (id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('.cust-ov').forEach(ov => ov.addEventListener('click', e => { if (e.target === ov) closeModal(ov.id); }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.cust-ov.open').forEach(ov => closeModal(ov.id)); });

  /* Indicators editor */
  function buildIndEditor() {
    const sel = getSelectedActivities();
    let html = '';
    selectedEcos().forEach(id => {
      const acts = sel.filter(a => a.ecoId === id);
      if (!acts.length) return;
      html += `<div class="act-section-hd">${ecoIconSm(id)} ${ECO[id].name}</div>`;
      acts.forEach(a => {
        html += `<div style="margin-bottom:16px">
          <div style="font-family:var(--font-text);font-size:12px;font-weight:700;color:#444a51;margin-bottom:8px">${a.name}</div>
          <div id="indrows-${a.id}">
            ${a.indicators.map((i, k) => indRow(i, false, k)).join('')}
            ${a.optional.map((i, k) => indRow(i, true, 'o' + k)).join('')}
          </div>
          <button onclick="document.getElementById('indrows-${a.id}').appendChild(F050._newInd())" class="btn-add-act" style="margin-top:6px;font-size:11px">+ Add indicator</button>
        </div>`;
      });
    });
    document.getElementById('ind-editor-body').innerHTML = html || '<p style="font-family:var(--font-text);font-size:13px;color:#68727d">No activities selected yet.</p>';
  }
  function indRow(text, isOpt) {
    return `<div class="ind-edit-row">
      <span class="ind-edit-name">${text}</span>
      <button class="ind-toggle-opt ${isOpt ? 'is-opt' : ''}" onclick="F050._toggleOpt(this)"><span class="tog-icon">⇄</span>${isOpt ? 'Optional' : 'Recommended'}</button>
      <button class="ind-del2" onclick="this.closest('.ind-edit-row').remove()">✕</button>
    </div>`;
  }
  F._toggleOpt = function (btn) {
    btn.classList.toggle('is-opt');
    const isOpt = btn.classList.contains('is-opt');
    btn.innerHTML = `<span class="tog-icon">⇄</span>${isOpt ? 'Optional' : 'Recommended'}`;
  };
  F._newInd = function () {
    const div = document.createElement('div');
    div.className = 'ind-edit-row';
    div.innerHTML = `<input type="text" style="font-family:var(--font-text);font-size:12px;border:none;outline:none;width:100%;background:transparent" placeholder="New indicator name..."/>
      <button class="ind-toggle-opt" onclick="F050._toggleOpt(this)"><span class="tog-icon">⇄</span>Recommended</button>
      <button class="ind-del2" onclick="this.closest('.ind-edit-row').remove()">✕</button>`;
    setTimeout(() => div.querySelector('input').focus(), 0);
    return div;
  };
  window.saveIndicators = function () { markDone('opt1'); closeModal('m-indicators'); };

  /* Methods editor */
  function buildMethEditor() {
    const sel = getSelectedActivities();
    const METHODS = ['Remote sensing + field verification', 'GPS mapping + satellite imagery', 'Field plots + geotagged photos', 'Drone/satellite imagery + transect', 'Dipwell/water logger + remote sensing', 'Stakeholder report + survey'];
    const FREQ = ['Monthly', 'Quarterly', '3, 6, 12 months', '6–12 months', 'Annual', 'Annual / seasonal', 'Monthly in dry season'];
    document.getElementById('meth-editor-body').innerHTML = sel.map(a => `
      <div class="meth-row">
        <div class="meth-row-hd">${a.name}</div>
        <div class="meth-fields">
          <div><label class="meth-label">Monitoring method</label>
            <select class="fi select-chev" style="width:100%;height:40px;font-size:12px">${METHODS.map(m => `<option ${m === a.method ? 'selected' : ''}>${m}</option>`).join('')}</select></div>
          <div><label class="meth-label">Frequency</label>
            <select class="fi select-chev" style="width:100%;height:40px;font-size:12px">${FREQ.map(f => `<option ${f === a.freq ? 'selected' : ''}>${f}</option>`).join('')}</select></div>
        </div>
      </div>`).join('') || '<p style="font-family:var(--font-text);font-size:13px;color:#68727d">No activities selected.</p>';
  }
  window.saveMethods = function () { markDone('opt2'); closeModal('m-methods'); };

  /* Parties */
  const parties = [{ name: 'Adi Mantri', email: 'adi@lestari.org', role: 'Owner', cls: 'owner' }];
  function buildPartyList() {
    document.getElementById('party-list').innerHTML = parties.map((p, i) => `
      <div class="party-row">
        <div style="display:flex;align-items:center;gap:10px">
          <span class="party-avatar">${p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
          <div><div class="party-name">${p.name}</div><div class="party-email">${p.email}</div></div>
        </div>
        <span class="role-badge role-${p.cls}">${p.role}</span>
        <span style="font-family:var(--font-override);font-size:11px;color:#68727d">${p.role === 'Owner' ? 'You' : 'Invited'}</span>
        <button class="ind-del2" ${p.role === 'Owner' ? 'style="visibility:hidden"' : ''} onclick="F050._delParty(${i})">✕</button>
      </div>`).join('');
  }
  F._delParty = function (i) { parties.splice(i, 1); buildPartyList(); };
  window.addParty = function () {
    const email = document.getElementById('party-email-input').value.trim();
    const role = document.getElementById('party-role-input').value;
    if (!email) return;
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    parties.push({ name, email, role, cls: role === 'Viewer' ? 'viewer' : 'editor' });
    document.getElementById('party-email-input').value = '';
    buildPartyList();
  };
  window.saveParties = function () { markDone('opt3'); closeModal('m-parties'); };

  /* Notes & evidence */
  const evidence = [];
  window.handleFiles = function (files) {
    [...files].forEach(f => evidence.push({ name: f.name, size: (f.size / 1024 / 1024).toFixed(1) + ' MB' }));
    document.getElementById('evidence-list').innerHTML = evidence.map((e, i) => `
      <div class="evidence-item">
        <span class="ev-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#066653" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6" stroke="#066653" stroke-width="2"/></svg></span>
        <div><div class="ev-name">${e.name}</div><div class="ev-meta">${e.size}</div></div>
        <button class="ind-del2" onclick="F050._delEv(${i})">✕</button>
      </div>`).join('');
  };
  F._delEv = function (i) { evidence.splice(i, 1); window.handleFiles([]); };
  window.saveNotes = function () { markDone('opt4'); closeModal('m-notes'); };

  /* success-state exports */
  window.showExportToast = window.showExportToast || function () {};
})();

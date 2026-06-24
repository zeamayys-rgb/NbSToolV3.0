/* ============================================================
   F05.0 — Create New Project From Scratch
   Core: shared data, step navigation, Step 1 (SHP upload),
   Step 2 (NbS pathway selection). Step 3–5 live in f050-plan.js
   ============================================================ */
(function () {
  'use strict';

  /* ── asset path helpers ── */
  const PW = (pathway, ecoName, filled) =>
    `../assets/asset/NBS PATHWAY ICON_Intervention Pathway=${pathway.toUpperCase()}, Filled=${filled ? 'Yes' : 'No'}, Ecosystem=${ecoName}.svg`;
  const ECOIMG = (ecoName, rect) =>
    `../assets/asset/ECOSYSTEM ICON_Ecosystem Type=${ecoName}, Filled=Yes${rect ? ', rectangle=yes' : ''}.svg`;

  /* ── shared data model ── */
  const ECO = {
    forest: {
      id: 'forest', name: 'Forest', fig: 'Forest', colorCls: 'forest',
      area: '13,942.2 ha', areaVal: 13942.2, pct: '40%',
      cond: { label: 'Low Disturbance', cls: 'low', barColor: '#7ba05b', barPct: 12, val: '4,638.4 ha', note: '12% of forest is disturbed' },
      threats: ['Plantation', 'Urban dev.', 'Agriculture'],
      best: 'protect',
      pathways: {
        protect: { fit: 5, area: '13,942.2 ha · 40%', desc: 'Safeguard intact forest from future degradation. Best for areas with low-to-moderate damage and intact structure.' },
        manage:  { fit: 2, area: '9,754.6 ha · 28%',  desc: 'Sustainably manage working forest to keep ecosystem function while supporting livelihoods.' },
        restore: { fit: 1, area: '4,638.4 ha · 12%',  desc: 'Actively rebuild degraded forest through replanting and assisted natural regeneration.' }
      }
    },
    mangrove: {
      id: 'mangrove', name: 'Mangrove', fig: 'Mangrove', colorCls: 'mangrove',
      area: '9,754.6 ha', areaVal: 9754.6, pct: '28%',
      cond: { label: 'Moderate Disturbance', cls: 'mod', barColor: '#c97a2b', barPct: 28, val: '2,731.3 ha', note: '28% of mangrove is disturbed' },
      threats: ['Aquaculture', 'Coastal dev.', 'Sedimentation'],
      best: 'manage',
      pathways: {
        protect: { fit: 2, area: '5,950.3 ha · 17%', desc: 'Protect intact mangrove stands and buffer zones from conversion and clearing.' },
        manage:  { fit: 4, area: '9,754.6 ha · 28%', desc: 'Manage tidal hydrology and harvesting to sustain a healthy, productive mangrove belt.' },
        restore: { fit: 3, area: '2,731.3 ha · 8%',  desc: 'Rehabilitate cleared or degraded mangrove through replanting and hydrological repair.' }
      }
    },
    peatland: {
      id: 'peatland', name: 'Peatland', fig: 'Peatland', colorCls: 'peatland',
      area: '11,210.8 ha', areaVal: 11210.8, pct: '32%',
      cond: { label: 'High Disturbance', cls: 'high', barColor: '#d24a2a', barPct: 80, val: '7,484.3 ha', note: '80% of peatland is disturbed' },
      threats: ['Drainage', 'Fire', 'Oil palm'],
      best: 'restore',
      pathways: {
        protect: { fit: 2, area: '3,363.2 ha · 10%',  desc: 'Protect the remaining intact peat dome and its water catchment from drainage.' },
        manage:  { fit: 1, area: '5,605.4 ha · 16%',  desc: 'Manage water levels and land use on cultivated peat to slow subsidence and emissions.' },
        restore: { fit: 5, area: '11,210.8 ha · 32%', desc: 'Rewet and revegetate drained peat. Best for highly degraded, fire-prone areas.' }
      }
    }
  };
  const ECO_ORDER = ['forest', 'mangrove', 'peatland'];
  const PW_ORDER = ['protect', 'manage', 'restore'];
  const PW_LABEL = { protect: 'Protect', manage: 'Manage', restore: 'Restore' };

  /* ── runtime state ── */
  const state = {
    uploaded: false,
    pathways: {}, // ecoId -> { protect:bool, manage:bool, restore:bool }
    duration: {}, // ecoId -> years
    activeTab: 'forest'
  };
  ECO_ORDER.forEach(id => {
    state.pathways[id] = { protect: false, manage: false, restore: false };
    state.pathways[id][ECO[id].best] = true; // default: recommended pathway on
    state.duration[id] = 30;
  });

  // expose
  window.F050 = { ECO, ECO_ORDER, PW_ORDER, PW_LABEL, PW, ECOIMG, state,
    selectedEcos, selectedPathwayCount, goToStep, getStep: () => current };

  function selectedEcos() {
    return ECO_ORDER.filter(id => PW_ORDER.some(p => state.pathways[id][p]));
  }
  function selectedPathwayCount() {
    let n = 0;
    ECO_ORDER.forEach(id => PW_ORDER.forEach(p => { if (state.pathways[id][p]) n++; }));
    return n;
  }

  /* ════════════════════════════════════════════════════════
     STEP NAVIGATION  (1 upload · 2 pathway · 3 activities ·
     4 matrix · 5 customize · 6 success)
     ════════════════════════════════════════════════════════ */
  let current = 1;
  let maxReached = 1;
  const TOTAL = 5;

  function goToStep(n) {
    if (n > maxReached) return;
    current = n;
    document.querySelectorAll('.step-content').forEach(c => c.classList.remove('active'));
    const tgt = document.querySelector(`[data-content="${n}"]`);
    if (tgt) tgt.classList.add('active');
    paintStepper();

    if (n === 2) window.F050.renderPathwayStep && window.F050.renderPathwayStep();
    if (n === 3) window.F050.renderActivities && window.F050.renderActivities();
    if (n === 4) window.F050.renderMatrixStep && window.F050.renderMatrixStep();
    if (n === 5) window.F050.renderCustomizeStep && window.F050.renderCustomizeStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function paintStepper() {
    document.querySelectorAll('.f050-step').forEach(s => {
      const sn = parseInt(s.dataset.step, 10);
      s.classList.remove('is-active', 'is-complete', 'is-disabled');
      const num = s.querySelector('.f050-num');
      if (sn < current) { s.classList.add('is-complete'); num.innerHTML = CHECK; }
      else if (sn === current) { s.classList.add('is-active'); num.textContent = sn; }
      else { num.textContent = sn; if (sn > maxReached) s.classList.add('is-disabled'); }
    });
  }
  const CHECK = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function advance(to) { maxReached = Math.max(maxReached, to); goToStep(to); }
  window.F050.advance = advance;

  /* stepper click */
  document.querySelectorAll('.f050-step').forEach(s => {
    s.addEventListener('click', () => {
      if (s.classList.contains('is-disabled')) return;
      goToStep(parseInt(s.dataset.step, 10));
    });
  });

  /* ════════════════════════════════════════════════════════
     STEP 1 — Upload SHP
     ════════════════════════════════════════════════════════ */
  const drop = document.getElementById('shpDrop');
  const fileInput = document.getElementById('shpInput');
  const progress = document.getElementById('shpProgress');
  const sitechar = document.getElementById('siteChar');
  const next1 = document.getElementById('s1next');

  function handleFile(name) {
    drop.style.display = 'none';
    progress.classList.add('show');
    document.getElementById('shpFileName').textContent = name || 'project_area.zip';
    const bar = document.getElementById('shpBar');
    const pct = document.getElementById('shpPct');
    let v = 0;
    const t = setInterval(() => {
      v += Math.random() * 18 + 8;
      if (v >= 100) { v = 100; clearInterval(t); setTimeout(showResult, 350); }
      bar.style.width = v + '%';
      pct.textContent = Math.round(v) + '%';
    }, 180);
  }
  function showResult() {
    progress.classList.remove('show');
    sitechar.classList.add('show');
    state.uploaded = true;
    next1.disabled = false;
    // build the ecosystem chips from the data
    document.getElementById('scEcoRow').innerHTML = ECO_ORDER.map(id => {
      const e = ECO[id];
      return `<span class="sc-eco"><img src="${ECOIMG(e.fig, true)}" alt="">${e.name} <small>${e.area} · ${e.pct}</small></span>`;
    }).join('');
  }
  window.F050.resetUpload = function () {
    sitechar.classList.remove('show');
    progress.classList.remove('show');
    drop.style.display = '';
    state.uploaded = false;
    next1.disabled = true;
  };

  if (drop) {
    fileInput.addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0].name); });
    ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('is-drag'); }));
    ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('is-drag'); }));
    drop.addEventListener('drop', e => { const f = e.dataTransfer.files[0]; if (f) handleFile(f.name); });
  }
  next1 && next1.addEventListener('click', () => advance(2));

  /* ════════════════════════════════════════════════════════
     STEP 2 — NbS Pathway Selection
     ════════════════════════════════════════════════════════ */
  function dots(fit) {
    let h = '<div class="dots">';
    for (let i = 0; i < 5; i++) h += `<i class="${i < fit ? 'on' : ''}"></i>`;
    h += '</div>';
    return h;
  }

  function renderDiagnosis() {
    const host = document.getElementById('diagBody');
    host.innerHTML = ECO_ORDER.map(id => {
      const e = ECO[id];
      const rec = PW_ORDER.map(p => {
        const best = e.best === p;
        return `<div class="rec-row ${best ? 'best' : ''}">
          <span class="pw">${PW_LABEL[p]}${best ? '<em>★ Best</em>' : ''}</span>
          ${dots(e.pathways[p].fit)}
          <span class="sc">${e.pathways[p].fit}/5</span>
        </div>`;
      }).join('');
      return `<div class="diag-row">
        <div class="diag-eco">
          <img src="${ECOIMG(e.fig, true)}" alt="">
          <div><div class="nm">${e.name}</div><div class="ar">${e.area}</div><div class="pc">${e.pct} of area</div></div>
        </div>
        <div class="cond">
          <span class="cond-pill cond-${e.cond.cls}"><span class="dot"></span>${e.cond.label}</span>
          <div class="cond-val">${e.cond.val}</div>
          <div class="cond-bar"><span style="width:${e.cond.barPct}%;background:${e.cond.barColor}"></span></div>
          <div class="cond-note">${e.cond.note}</div>
        </div>
        <div class="threats">${e.threats.map((t, i) =>
          `<span class="threat"><span class="no">0${i + 1}</span><span class="nm">${t}</span></span>`).join('')}</div>
        <div class="rec-list">${rec}</div>
      </div>`;
    }).join('');
  }

  function renderTabs() {
    const host = document.getElementById('ecoTabs');
    host.innerHTML = ECO_ORDER.map(id => {
      const e = ECO[id];
      const n = PW_ORDER.filter(p => state.pathways[id][p]).length;
      return `<button class="eco-tab ${state.activeTab === id ? 'active' : ''}" data-tab="${id}">
        <img src="${ECOIMG(e.fig, true)}" alt="">${e.name}${n ? `<span class="cnt">${n}</span>` : ''}
      </button>`;
    }).join('');
    host.querySelectorAll('.eco-tab').forEach(b => b.addEventListener('click', () => {
      state.activeTab = b.dataset.tab; renderTabs(); renderBuilder();
    }));
  }

  function renderBuilder() {
    const id = state.activeTab, e = ECO[id];
    const head = document.getElementById('bldEcoHead');
    head.innerHTML = `
      <div class="bld-eco-id">
        <img src="${ECOIMG(e.fig, true)}" alt="">
        <div><div class="nm">${e.name} Ecosystem</div>
        <div class="ds">Toggle the intervention pathways you want to include for this ecosystem. Recommended pathway is pre-selected from the site diagnosis.</div></div>
      </div>
      <div class="bld-rec-pill">★ ${e.name} recommended for ${PW_LABEL[e.best].toLowerCase()}</div>`;

    const cards = document.getElementById('pwCards');
    cards.innerHTML = PW_ORDER.map(p => {
      const on = state.pathways[id][p];
      const best = e.best === p;
      const fit = e.pathways[p].fit;
      const badge = best
        ? `<span class="fit-badge fit-best">★ Best fit · ${fit}/5</span>`
        : fit >= 3
          ? `<span class="fit-badge fit-good">Good fit · ${fit}/5</span>`
          : `<span class="fit-badge fit-fair">Fair fit · ${fit}/5</span>`;
      return `<div class="pw-card ${on ? 'on' : ''}" data-pw="${p}" role="button" tabindex="0" aria-pressed="${on}">
        <div class="pw-card-top">
          <img src="${PW(p, e.fig, on)}" alt="">
          <button class="pw-switch" aria-label="Toggle ${PW_LABEL[p]}"></button>
        </div>
        <h4>${PW_LABEL[p]}</h4>
        <div class="area">${e.pathways[p].area}</div>
        <div class="desc">${e.pathways[p].desc}</div>
        ${badge}
      </div>`;
    }).join('');
    cards.querySelectorAll('.pw-card').forEach(card => {
      const toggle = () => {
        const p = card.dataset.pw;
        state.pathways[id][p] = !state.pathways[id][p];
        renderTabs(); renderBuilder(); updateStep2Footer();
      };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggle(); } });
    });

    // duration
    const dr = document.getElementById('durRange');
    const dv = document.getElementById('durVal');
    const dlbl = document.getElementById('durLbl');
    dr.value = state.duration[id];
    dv.textContent = state.duration[id];
    dlbl.textContent = `How many years should the intervention of the ${e.name} ecosystem last?`;
    dr.oninput = () => { state.duration[id] = parseInt(dr.value, 10); dv.textContent = dr.value; };
  }

  function updateStep2Footer() {
    const ecos = selectedEcos();
    const n = selectedPathwayCount();
    document.getElementById('s2meta').textContent =
      `${ecos.length} ecosystem${ecos.length === 1 ? '' : 's'} · ${n} pathway${n === 1 ? '' : 's'} selected`;
    document.getElementById('s2next').disabled = n === 0;
  }

  window.F050.renderPathwayStep = function () {
    renderDiagnosis(); renderTabs(); renderBuilder(); updateStep2Footer();
  };

  document.getElementById('s2back').addEventListener('click', () => goToStep(1));
  document.getElementById('s2next').addEventListener('click', () => advance(3));

  /* ── init ── */
  paintStepper();
})();

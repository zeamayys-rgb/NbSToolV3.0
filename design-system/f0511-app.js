/* F05.1.1 User Input Monitoring Form — vanilla JS (no React/Babel) */
(function () {
  'use strict';

  var ECO_BG = { forest: '#e9f8f1', mangrove: 'rgb(236,249,249)', peatland: 'rgb(250,248,236)' };
  var ecoIcon = {
    forest: '<svg width="18" height="18" viewBox="0 0 24 24"><g fill="#066653"><path d="M12 2.5 8.6 7.1h1.8L7.5 11h2l-2.7 3.8h3.6v4.7h3.2v-4.7h3.6L14.5 11h2l-2.9-3.9h1.8L12 2.5z"/></g></svg>',
    mangrove: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(15,138,143)" stroke-width="1.8" stroke-linecap="round"><path d="M12 4.2c-2.8 0-5 2.2-5 5 0 1.7.9 3.1 2.3 4"/><path d="M12 4.2c2.8 0 5 2.2 5 5 0 1.7-.9 3.1-2.3 4"/><path d="M12 8.5v6.2"/><path d="M9.2 14.4 7 18.2"/><path d="M12 14.8v4"/><path d="M14.8 14.4 17 18.2"/></svg>',
    peatland: '<svg width="18" height="18" viewBox="0 0 24 24"><g fill="rgb(138,122,31)"><path d="M6.5 19.8c0-4 1.1-7 3-9.9 1.1 2.5 1.3 5 .7 9.9H6.5z"/><path d="M10.5 19.8c0-5 1.2-8.9 3.5-12.6 1.3 3.1 1.7 6.2 1.2 12.6h-4.7z"/><path d="M15 19.8c.1-3.8 1.1-6.6 2.8-9.1 1 2.2 1.2 4.5.8 9.1H15z"/></g></svg>'
  };

  var GROUPS = [
    { eco: 'mangrove', name: 'Mangrove', sub: '4 indicators · Restore pathway', indicators: [
      { id: 'mg1', name: 'Area of habitats restored', unit: 'ha', target: '600 ha', method: 'Drone/satellite imagery + transect', freq: '6–12 months', type: 'Recommended' },
      { id: 'mg2', name: 'Mangrove cover change', unit: 'ha/yr', target: '+50 ha/yr', method: 'Drone/satellite imagery + transect', freq: '6–12 months', type: 'Recommended' },
      { id: 'mg3', name: 'Water flow condition', unit: 'm³/s', target: '2.2 m³/s', method: 'Field observation + hydrology assessment', freq: 'Quarterly', type: 'Recommended' },
      { id: 'mg4', name: 'Tidal exchange', unit: 'm', target: '1.2 m', method: 'Field observation + hydrology assessment', freq: 'Quarterly', type: 'Recommended' }
    ] },
    { eco: 'forest', name: 'Dryland Forest', sub: '4 indicators · Restore pathway', indicators: [
      { id: 'f1', name: 'Area of habitats restored', unit: 'ha', target: '320 ha', method: 'GPS mapping + satellite imagery', freq: 'Annual / seasonal', type: 'Recommended' },
      { id: 'f2', name: 'Seedling survival rate', unit: '%', target: '80 %', method: 'Field plots + geotagged photos', freq: '3, 6, 12 months', type: 'Recommended' },
      { id: 'f3', name: 'Forest cover gain', unit: 'ha/yr', target: '+40 ha/yr', method: 'GPS mapping + satellite imagery', freq: 'Annual / seasonal', type: 'Recommended' },
      { id: 'f4', name: 'Area prepared for restoration', unit: 'ha', target: '240 ha', method: 'Field plots + geotagged photos', freq: '3, 6, 12 months', type: 'Recommended' }
    ] },
    { eco: 'peatland', name: 'Peatland', sub: '4 indicators · Restore pathway', indicators: [
      { id: 'p1', name: 'Number of canal blocks', unit: 'count', target: '50', method: 'GPS inspection + photo documentation', freq: 'Quarterly', type: 'Recommended' },
      { id: 'p2', name: 'Water table depth', unit: 'cm', target: '−20 cm', method: 'Dipwell/water logger + remote sensing', freq: 'Monthly', type: 'Recommended' },
      { id: 'p3', name: 'Wet area extent', unit: 'ha', target: '900 ha', method: 'Dipwell/water logger + remote sensing', freq: 'Monthly', type: 'Optional' },
      { id: 'p4', name: 'Burned area', unit: 'ha', target: '0 ha', method: 'MODIS/VIIRS + patrol report', freq: 'Monthly in dry season', type: 'Optional' }
    ] }
  ];

  var ALL = [];
  GROUPS.forEach(function (g) { g.indicators.forEach(function (i) { ALL.push(i); }); });
  var TOTAL = ALL.length;

  // ── state ──
  var step = 0; // 0..2 groups, 3 = review
  var modal = null;
  var data = {};
  try { data = JSON.parse(localStorage.getItem('f0511_data') || '{}'); } catch (e) { data = {}; }
  function save() { localStorage.setItem('f0511_data', JSON.stringify(data)); }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function hasValue(id) { return !!(data[id] && data[id].value && String(data[id].value).trim()); }
  function filledCount() { var n = 0; ALL.forEach(function (i) { if (hasValue(i.id)) n++; }); return n; }
  function groupFilled(g) { return g.indicators.filter(function (i) { return hasValue(i.id); }).length; }

  var root = document.getElementById('root');
  var modalRoot = document.createElement('div');
  document.body.appendChild(modalRoot);

  // ── render ──
  function sidebarHTML() {
    var filled = filledCount();
    var pct = Math.round(filled / TOTAL * 100);
    var items = GROUPS.map(function (g, i) {
      var gf = groupFilled(g);
      var st = gf === g.indicators.length ? 'done' : i === step ? 'curr' : 'next';
      var circle = st === 'done' ? '✓' : String(i + 1).padStart(2, '0');
      return '<div class="snav-item' + (i === step ? ' active' : '') + '" data-step="' + i + '">' +
        '<div class="snav-circle ' + st + '">' + circle + '</div>' +
        '<div><div class="snav-label">' + g.name + '</div><div class="snav-sub">' + gf + ' / ' + g.indicators.length + ' recorded</div></div></div>';
    }).join('');
    var reviewActive = step === GROUPS.length;
    return '<div class="f03-sidebar">' +
      '<div class="prog-widget"><div class="prog-top"><span class="prog-pct">' + pct + '% Recorded</span>' +
      '<span class="prog-count">' + filled + ' / ' + TOTAL + ' indicators</span></div>' +
      '<div class="prog-bar"><div class="prog-fill" style="width:' + pct + '%"></div></div></div>' +
      '<div class="step-nav-card">' + items +
      '<div class="snav-item' + (reviewActive ? ' active' : '') + '" data-step="' + GROUPS.length + '">' +
      '<div class="snav-circle ' + (reviewActive ? 'curr' : 'next') + '">✓</div>' +
      '<div><div class="snav-label">Review &amp; Submit</div><div class="snav-sub">Confirm and send</div></div></div></div>' +
      '<div class="dl-hint"><div class="dl-hint-title">Submit monitoring data</div>' +
      '<p class="dl-hint-text">You can submit partial data and continue later. Submitted values feed directly into the MRV Dashboard.</p>' +
      '<button class="btn-dl-gen" data-act="submit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Submit to MRV</button></div></div>';
  }

  function cardHTML(ind) {
    return '<div class="mind-card" data-card="' + ind.id + '">' +
      '<div class="mind-top"><div>' +
      '<div class="mind-name">' + ind.name + '</div>' +
      '<div class="mind-ref"><span>Target: <b>' + ind.target + '</b></span>' +
      '<span>Method: <b>' + ind.method + '</b></span>' +
      '<span>Frequency: <b>' + ind.freq + '</b></span></div></div>' +
      '<span class="mind-tag ' + (ind.type === 'Optional' ? 'opt' : 'rec') + '">' + ind.type + '</span></div>' +
      '<div class="mind-fields">' +
      '<div class="mind-field"><label>Recorded value *</label><div class="mind-value-wrap">' +
      '<input class="fi" type="text" placeholder="Enter value" data-id="' + ind.id + '" data-field="value" />' +
      '<input class="fi mind-unit" type="text" data-id="' + ind.id + '" data-field="unit" /></div></div>' +
      '<div class="mind-field"><label>Date collected *</label>' +
      '<input class="fi" type="date" data-id="' + ind.id + '" data-field="date" /></div>' +
      '<div class="mind-field"><label>Data source / collector</label>' +
      '<input class="fi" type="text" placeholder="e.g. Field team A" data-id="' + ind.id + '" data-field="source" /></div></div>' +
      '<div class="mind-foot">' +
      '<label class="mind-evidence"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Attach evidence' +
      '<input type="file" data-id="' + ind.id + '" data-field="evidence" /></label>' +
      '<span class="mind-evfile" data-evfile="' + ind.id + '" style="display:none"></span>' +
      '<div class="mind-note"><input type="text" placeholder="Add a note (optional)" data-id="' + ind.id + '" data-field="note" style="width:572px" /></div>' +
      '</div></div>';
  }

  function reviewHTML() {
    var body = GROUPS.map(function (g) {
      var rows = g.indicators.map(function (ind) {
        var d = data[ind.id] || {};
        var val = d.value ? '<b>' + esc(d.value) + ' ' + esc(d.unit || ind.unit) + '</b>' : '<span class="review-empty">Not recorded</span>';
        var date = d.date ? esc(d.date) : '<span class="review-empty">—</span>';
        var src = d.source ? esc(d.source) : '<span class="review-empty">—</span>';
        var ev = d.evidence ? '📎 1 file' : '<span class="review-empty">—</span>';
        return '<tr><td>' + ind.name + '</td><td>' + val + '</td><td>' + date + '</td><td>' + src + '</td><td>' + ev + '</td></tr>';
      }).join('');
      return '<tr class="review-eco-row"><td colspan="5">' + g.name + '</td></tr>' + rows;
    }).join('');
    return '<div class="form-sec-hd" style="font-family:var(--font-text)">Review &amp; Submit</div>' +
      '<div class="form-req-note" style="color:#68727d">Confirm your recorded values for Q2 2026 before submitting to the MRV Dashboard.</div>' +
      '<table class="review-tbl"><thead><tr><th>Indicator</th><th>Value</th><th>Date</th><th>Source</th><th>Evidence</th></tr></thead>' +
      '<tbody>' + body + '</tbody></table>';
  }

  function mainHTML() {
    var isReview = step === GROUPS.length;
    var inner;
    if (isReview) {
      inner = reviewHTML();
    } else {
      var g = GROUPS[step];
      inner = '<div class="period-banner"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Recording for reporting period:' +
        '<select><option>Q2 2026</option><option>Q3 2026</option><option>Annual 2026</option></select></div>' +
        '<div class="mgroup-hd"><div class="mgroup-icon" style="background:' + ECO_BG[g.eco] + '">' + ecoIcon[g.eco] + '</div>' +
        '<div><div class="mgroup-title">' + g.name + ' indicators</div><div class="mgroup-sub">' + g.sub + '</div></div></div>' +
        g.indicators.map(cardHTML).join('');
    }
    var prev = step > 0 ? '<button class="btn-draft" data-act="prev">← Previous</button>' : '';
    var nextLabel = isReview ? 'Submit to MRV' : 'Next';
    var nextIcon = isReview ? '' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return '<div class="f03-main">' + inner +
      '<div class="form-nav-btns">' + prev +
      '<button class="btn-nxt" data-act="next">' + nextLabel + nextIcon + '</button></div></div>';
  }

  function render() {
    root.innerHTML = '<div class="f03-view"><div class="f03-topbar">' +
      '<div style="display:flex;align-items:center;gap:14px">' +
      '<button class="btn-back" data-act="back">← Back to MRV</button>' +
      '<span class="f03-topbar-title">User Input Monitoring Form</span>' +
      '<span class="doc-type-badge">Q2 2026 · Kubu Raya Mangrove</span></div>' +
      '<div class="f03-topbar-right"><button class="btn-draft" data-act="save">Save the Draft</button></div></div>' +
      '<div class="f03-layout">' + sidebarHTML() + mainHTML() + '</div></div>';
    // populate input values for current step
    if (step !== GROUPS.length) {
      GROUPS[step].indicators.forEach(function (ind) {
        var d = data[ind.id] || {};
        setVal(ind.id, 'value', d.value || '');
        setVal(ind.id, 'unit', d.unit != null ? d.unit : ind.unit);
        setVal(ind.id, 'date', d.date || '');
        setVal(ind.id, 'source', d.source || '');
        setVal(ind.id, 'note', d.note || '');
        markFilled(ind.id);
        renderEvidence(ind.id);
      });
    }
  }

  function setVal(id, field, v) {
    var inp = root.querySelector('input[data-id="' + id + '"][data-field="' + field + '"]');
    if (inp) inp.value = v;
  }
  function markFilled(id) {
    var card = root.querySelector('.mind-card[data-card="' + id + '"]');
    if (card) card.classList.toggle('filled', hasValue(id));
  }
  function renderEvidence(id) {
    var span = root.querySelector('.mind-evfile[data-evfile="' + id + '"]');
    if (!span) return;
    var name = data[id] && data[id].evidence;
    if (name) {
      span.style.display = '';
      span.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#066653" stroke-width="2"/><path d="M14 2v6h6" stroke="#066653" stroke-width="2"/></svg>' +
        esc(name) + '<span class="x" data-clearev="' + id + '">✕</span>';
    } else {
      span.style.display = 'none';
      span.innerHTML = '';
    }
  }

  function updateLive() {
    // re-render only the sidebar (no focused inputs there)
    var layout = root.querySelector('.f03-layout');
    if (!layout) return;
    var old = layout.querySelector('.f03-sidebar');
    var tmp = document.createElement('div');
    tmp.innerHTML = sidebarHTML();
    if (old) layout.replaceChild(tmp.firstChild, old);
  }

  // ── modals ──
  function renderModal() {
    if (!modal) { modalRoot.innerHTML = ''; return; }
    var html = '';
    if (modal === 'save') {
      html = ov('<div class="f03-modal sm"><button class="modal-x" data-act="closeModal">✕</button>' +
        '<div class="modal-icon" style="background:#e9f8f1;border-radius:50%"><svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#066653" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
        '<div class="modal-title">Draft Saved</div>' +
        '<p class="modal-desc">Your recorded monitoring data has been saved. You can continue entering values anytime from the MRV Dashboard.</p>' +
        '<div class="modal-btns"><button class="mb-solid full" data-act="closeModal">Continue</button></div></div>');
    } else if (modal === 'submit') {
      html = ov('<div class="f03-modal"><button class="modal-x" data-act="closeModal">✕</button>' +
        '<div class="modal-icon"><svg width="70" height="70" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#066653" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
        '<div class="modal-title">Submit monitoring data?</div>' +
        '<p class="modal-desc">You are submitting <strong>' + filledCount() + ' of ' + TOTAL + '</strong> indicator values for Q2 2026. Submitted values will update the MRV Dashboard and reporting progress. You can still edit them before verification.</p>' +
        '<div class="modal-btns"><button class="mb-out" data-act="closeModal">Keep editing</button>' +
        '<button class="mb-solid" data-act="confirmSubmit">Confirm &amp; submit</button></div></div>');
    } else if (modal === 'done') {
      html = ov('<div class="f03-modal"><button class="modal-x" data-act="closeModal">✕</button>' +
        '<div class="modal-icon" style="background:#e9f8f1;border-radius:50%;width:84px;height:84px"><svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#066653" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
        '<div class="modal-title">Data submitted</div>' +
        '<p class="modal-desc">Your Q2 2026 monitoring data for Kubu Raya Mangrove has been submitted and the MRV Dashboard has been updated.</p>' +
        '<div class="modal-btns"><button class="mb-solid full" data-act="goMrv">Back to MRV Dashboard</button></div></div>');
    }
    modalRoot.innerHTML = html;
  }
  function ov(inner) { return '<div class="f03-ov" data-ov="1">' + inner + '</div>'; }

  // ── events ──
  root.addEventListener('input', function (e) {
    var t = e.target;
    var id = t.getAttribute && t.getAttribute('data-id');
    var f = t.getAttribute && t.getAttribute('data-field');
    if (!id || !f || t.type === 'file') return;
    data[id] = data[id] || {};
    data[id][f] = t.value;
    save();
    if (f === 'value') { markFilled(id); updateLive(); }
  });
  root.addEventListener('change', function (e) {
    var t = e.target;
    if (t.type !== 'file') return;
    var id = t.getAttribute('data-id');
    data[id] = data[id] || {};
    data[id].evidence = (t.files[0] && t.files[0].name) || '';
    save();
    renderEvidence(id);
  });
  root.addEventListener('click', function (e) {
    var stepEl = e.target.closest('[data-step]');
    if (stepEl) { step = parseInt(stepEl.getAttribute('data-step'), 10); modal = null; render(); return; }
    var clr = e.target.closest('[data-clearev]');
    if (clr) { var cid = clr.getAttribute('data-clearev'); if (data[cid]) data[cid].evidence = ''; save(); renderEvidence(cid); return; }
    var act = e.target.closest('[data-act]');
    if (!act) return;
    var a = act.getAttribute('data-act');
    if (a === 'back' || a === 'goMrv') { window.location.href = 'F06 NbS MRV.html'; }
    else if (a === 'save') { modal = 'save'; renderModal(); }
    else if (a === 'submit') { modal = 'submit'; renderModal(); }
    else if (a === 'prev') { step = Math.max(0, step - 1); modal = null; render(); }
    else if (a === 'next') {
      if (step === GROUPS.length) { modal = 'submit'; renderModal(); }
      else { step += 1; render(); }
    }
  });
  modalRoot.addEventListener('click', function (e) {
    var act = e.target.closest('[data-act]');
    if (e.target.getAttribute && e.target.getAttribute('data-ov') === '1') { modal = null; renderModal(); return; }
    if (!act) return;
    var a = act.getAttribute('data-act');
    if (a === 'closeModal') { modal = null; renderModal(); }
    else if (a === 'confirmSubmit') { modal = 'done'; renderModal(); }
    else if (a === 'goMrv') { window.location.href = 'F06 NbS MRV.html'; }
  });

  render();
})();

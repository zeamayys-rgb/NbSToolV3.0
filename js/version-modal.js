/* ============================================================
   NbS Tool — "What's new in v3.0" modal, with a sign-up CTA
   Drop-in: <script src="js/version-modal.js" defer></script>
   Self-contained (styles + markup injected) so it can be copied
   straight into the NbS Tool v2 site with no other files.
   ponytail: shows on every visit by design — see NBSVU_ONCE below.
   ============================================================ */
(function () {
  'use strict';

  // Set to true to show the modal only once per browser (per RELEASE).
  var NBSVU_ONCE = false;
  var RELEASE = 'v3.0';

  if (NBSVU_ONCE) {
    try { if (localStorage.getItem('nbs-vu-seen') === RELEASE) return; } catch (e) {}
  }

  var css = `
  .vu-ovl,.vu-ovl *{box-sizing:border-box}
  .vu-ovl{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;
    padding:24px;background:rgba(4,26,20,.62);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
    opacity:0;transition:opacity .22s ease;font-family:'Poppins',system-ui,-apple-system,'Segoe UI',sans-serif}
  .vu-ovl.in{opacity:1}
  .vu{position:relative;width:min(760px,100%);max-height:min(88vh,860px);display:flex;flex-direction:column;
    background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 40px 90px -20px rgba(3,19,13,.55);
    transform:translateY(14px) scale(.985);transition:transform .26s cubic-bezier(.2,.7,.3,1)}
  .vu-ovl.in .vu{transform:none}

  /* header */
  .vu-hd{position:relative;padding:26px 32px 22px;color:#eafaf1;
    background:radial-gradient(120% 140% at 12% 0%,#0a3a2e 0%,#05241c 55%,#03130d 100%)}
  .vu-hd::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.5;
    background:repeating-linear-gradient(115deg,rgba(95,230,160,.07) 0 1px,transparent 1px 22px)}
  .vu-hd>*{position:relative}
  .vu-hd h2{margin:0;padding-right:44px;font-family:'Barlow Semi Condensed','Poppins',sans-serif;font-weight:700;
    font-size:clamp(26px,3.4vw,32px);line-height:1.08;letter-spacing:-.01em;color:#fff}
  .vu-hd h2 em{font-style:normal;color:#5fe6a0}
  .vu-hd p{margin:10px 0 0;max-width:56ch;font-size:14px;line-height:1.6;color:rgba(234,250,241,.78)}
  .vu-x{position:absolute;top:16px;right:16px;width:36px;height:36px;display:grid;place-items:center;
    border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:#eafaf1;
    border-radius:10px;cursor:pointer;transition:background .18s,transform .18s}
  .vu-x:hover{background:rgba(255,255,255,.16);transform:rotate(90deg)}
  .vu-x svg{width:17px;height:17px}

  /* body */
  .vu-bd{overflow:auto;padding:26px 32px 8px;-webkit-overflow-scrolling:touch}
  .vu-sec+.vu-sec{margin-top:26px}
  .vu-sec>h3{display:flex;align-items:center;gap:10px;margin:0 0 4px;font-size:12px;font-weight:700;
    letter-spacing:.11em;text-transform:uppercase;color:#077f68}
  .vu-sec>h3::after{content:"";flex:1;height:1px;background:#e5e5e7}
  .vu-sec>.vu-lead{margin:8px 0 16px;font-size:13.5px;line-height:1.65;color:#5c656e}
  .vu-item{display:flex;gap:14px;padding:14px 0;border-top:1px solid #f0f1f3}
  .vu-sec .vu-item:first-of-type{border-top:0}
  .vu-ic{flex:none;width:36px;height:36px;border-radius:10px;display:grid;place-items:center;
    background:#e9f8f1;color:#066653}
  .vu-ic svg{width:19px;height:19px}
  .vu-item h4{margin:0 0 3px;font-size:14.5px;font-weight:600;line-height:1.35;color:#2d3648}
  .vu-item p{margin:0;font-size:13px;line-height:1.6;color:#5c656e}
  .vu-item ul{margin:8px 0 0;padding:0;list-style:none}
  .vu-item li{position:relative;padding-left:16px;margin-top:6px;font-size:13px;line-height:1.6;color:#5c656e}
  .vu-item li::before{content:"";position:absolute;left:2px;top:8.5px;width:5px;height:5px;border-radius:50%;background:#9fd4c9}
  .vu-item li b{color:#2d3648;font-weight:600}
  .vu-tag{display:inline-block;margin-left:8px;padding:2px 8px;border-radius:999px;background:#e9f8f1;
    color:#066653;font-size:10.5px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;vertical-align:2px}

  /* footer */
  .vu-ft{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding:18px 32px;
    background:#f8f9fb;border-top:1px solid #e5e5e7}
  .vu-ft-txt{flex:1 1 240px;min-width:0}
  .vu-ft-txt b{display:block;font-size:13.5px;color:#2d3648}
  .vu-ft-txt span{font-size:12.5px;line-height:1.55;color:#5c656e}
  .vu-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:12px;
    font-family:inherit;font-size:13.5px;font-weight:600;cursor:pointer;text-decoration:none;
    border:1px solid transparent;transition:background .18s,transform .18s,box-shadow .18s;white-space:nowrap}
  .vu-btn svg{width:16px;height:16px}
  .vu-solid{background:#077f68;color:#fff}
  .vu-solid:hover{background:#066653;transform:translateY(-1px);box-shadow:0 12px 26px -12px rgba(7,127,104,.9)}
  .vu-ghost{background:#fff;color:#2d3648;border-color:#e5e5e7}
  .vu-ghost:hover{background:#f5f5f5;transform:translateY(-1px)}


  @media (max-width:600px){
    .vu-ovl{padding:0;align-items:flex-end}
    .vu{max-height:94vh;border-radius:20px 20px 0 0}
    .vu-hd{padding:26px 20px 22px}.vu-bd{padding:22px 20px 4px}
    .vu-ft{padding:16px 20px}.vu-ft .vu-btn{flex:1 1 auto;justify-content:center}
  }
  @media (prefers-reduced-motion:reduce){
    .vu-ovl,.vu{transition:none}
  }`;

  var ic = {
    layers: '<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
    map: '<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/>',
    panel: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    folder: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.5L10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"/>'
  };
  function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>'; }
  function item(icon, title, tag, body) {
    return '<div class="vu-item"><div class="vu-ic">' + svg(icon) + '</div><div><h4>' + title +
      (tag ? '<span class="vu-tag">' + tag + '</span>' : '') + '</h4>' + body + '</div></div>';
  }

  var HEADER =
    '<div class="vu-hd">' +
      '<button class="vu-x" type="button" aria-label="Close announcement">' + svg('<path d="M18 6 6 18M6 6l12 12"/>') + '</button>' +
      '<h2 id="vu-title">Welcome to NbS Tool <em>v3.0</em></h2>' +
      '<p>Version 3.0 is live. It adds more data layers and deeper analysis, so you can take a site past a pre-feasibility overview and write it up as a full feasibility study.</p>' +
    '</div>';

  var newsHtml =
      '<section class="vu-sec">' +
        '<h3>New features</h3>' +
        item(ic.chart, 'Data Analyser', 'Expanded',
          '<p>Your baseline analysis now says more about the specific place you\'re looking at, thanks to four additions:</p><ul>' +
          '<li><b>Ecosystem identification</b> shows which ecosystems are present in your area.</li>' +
          '<li><b>Threat Profile</b> sets out the pressures acting on each of those ecosystems.</li>' +
          '<li><b>Country-specific social data</b> gives better figures on demography, employment, education, the economy, health, and housing and settlements.</li>' +
          '<li><b>Deeper NbS Pathway design</b>: pick an ecosystem (forest, mangrove or peatland) and a pathway (protect, manage or restore), choose activities for that pairing, and you\'ll get a projected estimate for your NbS carbon project.</li></ul>') +
        item(ic.layers, 'Monitoring Plan', 'New',
          '<p>Pick the NbS activities you plan to run and the indicators you want to track. NbS Tool suggests recommended and additional indicators, and you review them before it produces the report.</p>') +
        item(ic.doc, 'Feasibility Study', 'Upgraded',
          '<p>This replaces the Pre-Feasibility Study and goes further.</p><ul>' +
          '<li>A guided form lets you enter the socio-economic information the document needs without leaving NbS Tool.</li>' +
          '<li>The document you download is more complete, with sharper analysis and more recent data.</li></ul>') +
        item(ic.shield, 'My Project', 'Improved',
          '<p>You now set the privacy policy per project, so each one keeps its own sharing decision.</p>') +
      '</section>' +

      '<section class="vu-sec">' +
        '<h3>Interface changes</h3>' +
        '<p class="vu-lead">You sent us a lot of feedback on v2, and we ran a user study to see how different people move through the tool and which flow suits them best. Version 3.0 puts those findings into the interface.</p>' +
        item(ic.map, 'Clearer area search', '',
          '<p>Search for an area and you now get its boundary polygon, taken from jurisdiction shapefiles.</p>') +
        item(ic.panel, 'A leaner Data Analyser panel', '',
          '<p>The panel takes up less room, and its navigation is easier to follow and works the same way across the tool.</p>') +
        item(ic.info, 'Metadata you can actually find', '',
          '<p>Each analysis\'s data sources and disclaimers are quicker to open, and the metadata is sorted into clear categories.</p>') +
        item(ic.folder, 'A more complete My Project', '',
          '<p>The My Project screen shows more information, grouped into clearer categories.</p>') +
      '</section>' +
    '';

  var newsFt =
    '<div class="vu-ft-txt"><b>Ready to try v3.0?</b>' +
      '<span>Create a free account and start your first Nature-based Solutions project.</span></div>' +
    // ponytail: hands off to the page's auth modal ([data-auth="signup"]); the href is the fallback where there is none.
    '<a class="vu-btn vu-solid" href="login.html#signup" data-vu-signup>' +
      svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>') +
      'Create a free account</a>' +
    '<button class="vu-btn vu-ghost" type="button" data-vu-close>Got it</button>';

  var shell =
  '<div class="vu" role="dialog" aria-modal="true" aria-labelledby="vu-title">' +
    HEADER +
    '<div class="vu-bd"></div>' +
    '<div class="vu-ft"></div>' +
  '</div>';

  function open() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var ovl = document.createElement('div');
    ovl.className = 'vu-ovl';
    ovl.innerHTML = shell;
    document.body.appendChild(ovl);

    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { ovl.classList.add('in'); });
    var bd = ovl.querySelector('.vu-bd');
    var ft = ovl.querySelector('.vu-ft');
    bd.innerHTML = newsHtml;
    ft.innerHTML = newsFt;
    ovl.querySelector('.vu-x').focus({ preventScroll: true });

    function close() {
      ovl.classList.remove('in');
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { ovl.remove(); style.remove(); }, 260);
      if (NBSVU_ONCE) { try { localStorage.setItem('nbs-vu-seen', RELEASE); } catch (e) {} }
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    ovl.addEventListener('click', function (e) {
      if (e.target === ovl || e.target.closest('.vu-x, [data-vu-close]')) return close();
      var auth = e.target.closest('[data-vu-signup]') && document.querySelector('[data-auth="signup"]');
      if (auth) { e.preventDefault(); close(); auth.click(); }
    });
    document.addEventListener('keydown', onKey);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', open);
  else open();
})();

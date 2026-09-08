/* ============================================================
   NbS Tool — Version Update Announcement Modal (V3.0)
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
  var CONTACT = 'mailto:support@nbstool.org?subject=NbS%20Tool%20v3.0%20—%20request%20assistance';

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
  .vu-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;
    background:rgba(95,230,160,.12);border:1px solid rgba(95,230,160,.34);color:#9bf2c4;
    font-size:11.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase}
  .vu-badge i{width:7px;height:7px;border-radius:50%;background:#5fe6a0;box-shadow:0 0 0 0 rgba(95,230,160,.6);
    animation:vuPulse 2.2s infinite}
  @keyframes vuPulse{70%{box-shadow:0 0 0 9px rgba(95,230,160,0)}100%{box-shadow:0 0 0 0 rgba(95,230,160,0)}}
  .vu-hd h2{margin:14px 0 0;font-family:'Barlow Semi Condensed','Poppins',sans-serif;font-weight:700;
    font-size:clamp(26px,3.4vw,32px);line-height:1.08;letter-spacing:-.01em;color:#fff}
  .vu-hd h2 em{font-style:normal;color:#5fe6a0}
  .vu-hd p{margin:10px 0 0;max-width:56ch;font-size:14px;line-height:1.6;color:rgba(234,250,241,.78)}
  .vu-date{display:inline-flex;align-items:center;gap:9px;margin-top:18px;padding:9px 14px;border-radius:12px;
    background:rgba(255,255,255,.07);border:1px solid rgba(125,233,180,.22);font-size:13.5px;color:#eafaf1;white-space:nowrap}
  .vu-date b{color:#5fe6a0;font-weight:600}
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


  .vu-hd-row{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:18px}
  .vu-date{margin-top:0}
  .vu-link{display:inline-flex;align-items:center;gap:7px;padding:6px 2px;border:0;background:none;
    font-family:inherit;font-size:13px;font-weight:600;color:#5fe6a0;cursor:pointer;
    border-bottom:1px solid rgba(95,230,160,.35);transition:color .18s,border-color .18s}
  .vu-link:hover{color:#9bf2c4;border-color:#9bf2c4}
  .vu-link svg{width:15px;height:15px;transition:transform .2s}
  .vu-link:hover svg{transform:translateX(3px)}

  /* subscribe form */
  .vu-fld{display:flex;flex-direction:column;gap:6px;margin-top:4px}
  .vu-fld>span{font-size:12.5px;font-weight:600;color:#2d3648}
  .vu-fld>span em{font-style:normal;font-weight:400;color:#848b94}
  .vu-fld input{width:100%;padding:11px 13px;border:1px solid #e5e5e7;border-radius:10px;
    font-family:inherit;font-size:13.5px;color:#2d3648;background:#fff;outline:none;
    transition:border-color .16s,box-shadow .16s}
  .vu-fld input::placeholder{color:#a0a4ac}
  .vu-fld input:focus{border-color:#077f68;box-shadow:0 0 0 3px rgba(7,127,104,.13)}
  .vu-cap{display:flex;align-items:center;gap:12px;margin-top:18px;padding:14px 16px;
    background:#f8f9fb;border:1px solid #e5e5e7;border-radius:12px;cursor:pointer}
  .vu-cap input{position:absolute;opacity:0;width:0;height:0}
  .vu-cap-box{flex:none;width:24px;height:24px;border:2px solid #c0c2c6;border-radius:6px;background:#fff;
    display:grid;place-items:center;color:#fff;transition:background .16s,border-color .16s}
  .vu-cap-box svg{width:15px;height:15px;opacity:0;transition:opacity .16s}
  .vu-cap input:checked+.vu-cap-box{background:#077f68;border-color:#077f68}
  .vu-cap input:checked+.vu-cap-box svg{opacity:1}
  .vu-cap-txt{flex:1;font-size:13.5px;font-weight:500;color:#2d3648}
  .vu-cap-brand{display:inline-flex;align-items:center;gap:6px;font-size:10.5px;color:#848b94;text-align:right}
  .vu-cap-brand svg{width:20px;height:20px;color:#9fd4c9}

  /* confirmation */
  .vu-done{text-align:center;padding:26px 0 10px}
  .vu-done-ic{width:52px;height:52px;margin:0 auto 14px;border-radius:50%;display:grid;place-items:center;
    background:#e9f8f1;color:#077f68}
  .vu-done-ic svg{width:26px;height:26px}
  .vu-done h4{margin:0 0 6px;font-size:18px;font-weight:600;color:#2d3648}
  .vu-done p{margin:0 auto;max-width:46ch;font-size:13.5px;line-height:1.65;color:#5c656e}

  @media (max-width:600px){
    .vu-ovl{padding:0;align-items:flex-end}
    .vu{max-height:94vh;border-radius:20px 20px 0 0}
    .vu-hd{padding:26px 20px 22px}.vu-bd{padding:22px 20px 4px}
    .vu-ft{padding:16px 20px}.vu-ft .vu-btn{flex:1 1 auto;justify-content:center}
  }
  @media (prefers-reduced-motion:reduce){
    .vu-ovl,.vu,.vu-badge i{transition:none;animation:none}
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
      '<span class="vu-badge"><i></i>Version update</span>' +
      '<h2 id="vu-title">NbS Tool <em>v3.0</em> is coming</h2>' +
      '<p>An interface rebuilt around how you actually work—shaped by your feedback and user research, featuring richer contextual data layers and deeper analytical tools to take you from general pre-feasibility overviews into detailed feasibility documentation.</p>' +
      '<div class="vu-hd-row">' +
        '<span class="vu-date">' + svg('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>') +
          'Launching <b>December 2026</b></span>' +
        '<button class="vu-link" type="button" data-vu-view="form">Be the first to know NbS Tool update' +
          svg('<path d="M5 12h14M13 6l6 6-6 6"/>') + '</button>' +
      '</div>' +
    '</div>';

  var newsHtml =
      '<section class="vu-sec">' +
        '<h3>What\'s new — Features</h3>' +
        item(ic.chart, 'Data Analyser', 'Expanded',
          '<p>Four additions that make the baseline analysis sharper and more location-specific.</p><ul>' +
          '<li><b>Ecosystem identification</b> — a new aspect that maps which ecosystems are present in your area.</li>' +
          '<li><b>Threat Profile</b> — an analysis of the pressures affecting each ecosystem.</li>' +
          '<li><b>Country-specific social data</b> — stronger figures across demography, employment, education, economy, health, as well as housing and human settlements.</li>' +
          '<li><b>Deeper NbS Pathway design</b> — choose an ecosystem (forest, mangrove, peatland), a pathway (protect, manage, restore), and activities for each ecosystem–pathway combination, then see a projected estimate for your NbS carbon project.</li></ul>') +
        item(ic.layers, 'Monitoring Plan', 'New',
          '<p>Select your planned NbS activities and monitoring indicators. NbS Tool generates recommended and additional indicators for you to review before the report is produced.</p>') +
        item(ic.doc, 'Feasibility Study', 'Upgraded',
          '<p>Previously the Pre-Feasibility Study — now a fuller Feasibility Study document.</p><ul>' +
          '<li>Fill in the socio-economic content the document needs directly in NbS Tool, using a guided form.</li>' +
          '<li>The document you download is more complete and more robust, with sharper analysis and more up-to-date data.</li></ul>') +
        item(ic.shield, 'My Project', 'Improved',
          '<p>Privacy policy is now set at project level, so each project carries its own sharing decision.</p>') +
      '</section>' +

      '<section class="vu-sec">' +
        '<h3>What\'s new — Interface</h3>' +
        '<p class="vu-lead">NbS Tool v2 gave us a lot of feedback on the experience. The WRI Indonesia team also ran a user study to understand the flow that works best and how different users behave. Version 3.0 brings those findings into the interface.</p>' +
        item(ic.map, 'Clearer area search', '',
          '<p>Searching for an area now returns polygon information based on jurisdiction shapefiles.</p>') +
        item(ic.panel, 'A leaner Data Analyser panel', '',
          '<p>Slimmer layout with navigation that is easier to follow and consistent across the tool.</p>') +
        item(ic.info, 'Metadata you can actually find', '',
          '<p>Data sources and disclaimers for every analysis are easier to open, with metadata classified and structured.</p>') +
        item(ic.folder, 'A more complete My Project', '',
          '<p>The My Project screen carries more information, organised into clearer categories.</p>') +
      '</section>' +
    '';

  var newsFt =
    '<div class="vu-ft-txt"><b>Questions about the update?</b>' +
      '<span>The NbS Tool team would love to walk you through what changes for your projects.</span></div>' +
    '<a class="vu-btn vu-solid" href="' + CONTACT + '">' +
      svg('<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="m22 7-10 6L2 7"/>') +
      'Contact the NbS Tool team</a>' +
    '<button class="vu-btn vu-ghost" type="button" data-vu-close>Got it</button>';

  // ponytail: interface only — no submit endpoint, no real captcha.
  var formHtml =
    '<section class="vu-sec vu-form">' +
      '<h3>Early access</h3>' +
      '<p class="vu-lead">Want to be among the first to try the new version? Share your email below for early access!</p>' +
      '<label class="vu-fld"><span>Email address</span>' +
        '<input type="email" name="email" placeholder="you@organisation.org" autocomplete="email" required /></label>' +
      '<label class="vu-cap">' +
        '<input type="checkbox" name="captcha" />' +
        '<span class="vu-cap-box">' + svg('<path d="M20 6 9 17l-5-5"/>') + '</span>' +
        '<span class="vu-cap-txt">I am not a robot</span>' +
        '<span class="vu-cap-brand">' + svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>') + 'Privacy · Terms</span>' +
      '</label>' +
    '</section>';

  var formFt =
    '<div class="vu-ft-txt"><b>One email, at launch.</b>' +
      '<span>We only use this address for NbS Tool release news — no newsletters, no sharing.</span></div>' +
    '<button class="vu-btn vu-solid" type="button" data-vu-view="done">' +
      svg('<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="m22 7-10 6L2 7"/>') +
      'Notify me at launch</button>' +
    '<button class="vu-btn vu-ghost" type="button" data-vu-view="news">Back to what\'s new</button>';

  var doneHtml =
    '<section class="vu-sec vu-done">' +
      '<div class="vu-done-ic">' + svg('<path d="M20 6 9 17l-5-5"/>') + '</div>' +
      '<h4>You are on the list</h4>' +
      '<p>We will email you on 2 December 2026 when NbS Tool v3.0 is live. In the meantime you can keep using v2 as usual.</p>' +
    '</section>';

  var doneFt =
    '<div class="vu-ft-txt"><b>Need something sooner?</b>' +
      '<span>The NbS Tool team can walk you through the update for your projects.</span></div>' +
    '<a class="vu-btn vu-solid" href="' + CONTACT + '">' +
      svg('<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="m22 7-10 6L2 7"/>') +
      'Contact the NbS Tool team</a>' +
    '<button class="vu-btn vu-ghost" type="button" data-vu-close>Got it</button>';

  var views = {
    news: [newsHtml, newsFt],
    form: [formHtml, formFt],
    done: [doneHtml, doneFt]
  };

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
    function show(name) {
      bd.innerHTML = views[name][0];
      ft.innerHTML = views[name][1];
      bd.scrollTop = 0;
      var first = bd.querySelector('input[type="email"]');
      if (first) first.focus({ preventScroll: true });
    }
    show('news');
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
      var v = e.target.closest('[data-vu-view]');
      if (v) show(v.getAttribute('data-vu-view'));
    });
    document.addEventListener('keydown', onKey);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', open);
  else open();
})();

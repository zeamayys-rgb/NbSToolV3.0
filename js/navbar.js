/* Shared site navigation for the NbS Tool — the single source of the top bar.
   Every screen carries only a placeholder; this file renders it:

     <nav class="sitenav" data-nav-page="map" data-nav-auth="user"></nav>
     <script src="js/navbar.js"></script>

   data-nav-page  home | map | projects | docs | account   (omit for none)
   data-nav-auth  user (default, profile dropdown) | guest (login / sign up)

   Load it with a plain <script> immediately after the placeholder so the bar
   is in the DOM before paint — no flash, and later scripts (nav-mobile.js,
   the F00 auth modal) find the same markup they always did.
   Behaviour — burger, dropdowns — stays in js/nav-mobile.js. */
(function () {
  'use strict';

  var CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var LINKS = [
    { page: 'home',     href: 'index.html',          label: 'Home' },
    { page: 'map',      href: 'interactive-map.html', label: 'Interactive Map' },
    { page: 'projects', href: 'dashboard.html',       label: 'My Project' },
    // Never matches data-nav-page: js/docs-shell.js marks it current while the
    // docs show the Methodology tree (DEC-97).
    { page: 'methodology', href: 'help.html#science-scope', label: 'Methodology' }
  ];
  // Help sits at the far right as an icon (DEC-39); see help() below.

  function brand() {
    return '' +
    '<div class="sitenav-brand" id="brandSwitch">' +
      '<a class="sitenav-logo" href="index.html">' +
        '<img class="sitenav-logo-nbs" src="assets/nbs-logo-dark.png" alt="NbS Tool" width="188" height="80" />' +
        '<span class="sitenav-logo-rule" aria-hidden="true"></span>' +
        '<img class="sitenav-logo-scene" src="assets/scene-logo.png" alt="SCeNe Coalition" width="360" height="133" />' +
      '</a>' +
      '<button class="sitenav-switch" type="button" aria-label="Other SCeNe Coalition tools" aria-expanded="false" aria-controls="brandSwitchMenu">' + CHEV + '</button>' +
      '<div class="sitenav-switch-menu" id="brandSwitchMenu" hidden>' +
        '<p class="ssm-head">SCeNe Coalition tools</p>' +
        '<a class="ssm-item is-current" href="index.html" aria-current="page">' +
          '<b>NbS Tool</b><span>Understand your area with credible spatial data.</span></a>' +
        // TODO(design): these three need real destinations; rendered as non-links until then.
        '<div class="ssm-item is-unavailable"><b>NbS Criteria</b><span>Build climate, biodiversity and social integrity into the project.</span></div>' +
        '<div class="ssm-item is-unavailable"><b>NbS Incubator</b><span>Turn an early idea into a fundable project.</span></div>' +
        '<div class="ssm-item is-unavailable"><b>NbS Portfolio</b><span>Find high-integrity nature-based projects in the region.</span></div>' +
      '</div>' +
    '</div>';
  }

  function links(page) {
    return '<div class="sitenav-links">' + LINKS.map(function (l) {
      var on = l.page === page;
      return '<a href="' + l.href + '" class="sitenav-link' + (on ? ' active' : '') + '"' +
             (on ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
    }).join('') + '</div>';
  }

  function profile(page) {
    var acct = page === 'account';
    return '' +
    '<div class="sitenav-profile-wrap" id="profileWrap">' +
      '<button class="sitenav-profile" id="profileBtn">' +
        '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
        ' Profile ' + CHEV +
      '</button>' +
      '<div class="sitenav-dropdown">' +
        // ponytail: sample identity, same as before — swap for the session user when auth is real.
        '<div class="sitenav-user-info"><div class="sitenav-user-name">Adi Mantri</div><div class="sitenav-user-email">adi@lestari.org</div></div>' +
        '<a href="dashboard.html">My Projects</a>' +
        '<a href="document-generator.html">Document Generator</a>' +
        '<a href="account-settings.html"' + (acct ? ' aria-current="page"' : '') + '>Account settings</a>' +
        '<button class="logout" onclick="window.location.href=\'login.html\'">Log out</button>' +
      '</div>' +
    '</div>';
  }

  function help(page) {
    // The visible tooltip is aria-hidden; the link's name comes from aria-label.
    return '<a class="sitenav-help" href="help.html" aria-label="Help Centre"' +
      (page === 'docs' ? ' aria-current="page"' : '') + '>' +
      // Material Symbols "question_mark" (Outlined, 24px), drawn in currentColor.
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.6,16q0-2.03 0.36-2.91t1.54-1.94q1.03-0.9 1.56-1.56T14.6,8.07q0-1.02-0.69-1.7T12,5.7q-1.27,0-1.94,0.77T9.13,8.05L6.55,6.95q0.52-1.6 1.92-2.78T12,3q2.63,0 4.04,1.46q1.41,1.46 1.41,3.51q0,1.25-0.54,2.14t-1.69,2.01Q14,13.3 13.74,13.91T13.48,16H10.6ZM12,22q-0.82,0-1.41-0.59T10,20t0.59-1.41T12,18t1.41,0.59Q14,19.18 14,20t-0.59,1.41T12,22Z"/></svg>' +
      '<span class="sitenav-help-tip" aria-hidden="true">Help Centre</span>' +
    '</a>';
  }

  function actions(page, auth) {
    // The F00 auth modal binds [data-auth]; screens without it follow the href.
    var guest =
      '<a class="sitenav-login" href="login.html" data-auth="login">Login</a>' +
      '<a class="sitenav-signup" href="login.html" data-auth="signup">Sign up</a>';
    return '<div class="sitenav-actions">' +
      (auth === 'guest' ? guest : profile(page)) +
      '<button class="sitenav-lang" type="button" aria-label="Language: English">🇺🇸 ' + CHEV + '</button>' +
      help(page) +
    '</div>';
  }

  document.querySelectorAll('nav.sitenav[data-nav-page], nav.sitenav[data-nav-auth]').forEach(function (nav) {
    if (nav.children.length) return; // a screen that still ships its own markup wins
    var page = nav.getAttribute('data-nav-page') || '';
    nav.innerHTML = brand() + links(page) + actions(page, nav.getAttribute('data-nav-auth') || 'user');
  });
})();

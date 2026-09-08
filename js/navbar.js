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
    { page: 'docs',     href: 'technical-docs.html',  label: 'Technical Doc' }
  ];

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

  function actions(page, auth) {
    // The F00 auth modal binds [data-auth]; screens without it follow the href.
    var guest =
      '<a class="sitenav-login" href="login.html" data-auth="login">Login</a>' +
      '<a class="sitenav-signup" href="login.html" data-auth="signup">Sign up</a>';
    return '<div class="sitenav-actions">' +
      (auth === 'guest' ? guest : profile(page)) +
      '<button class="sitenav-lang" type="button" aria-label="Language: English">🇺🇸 ' + CHEV + '</button>' +
    '</div>';
  }

  document.querySelectorAll('nav.sitenav[data-nav-page], nav.sitenav[data-nav-auth]').forEach(function (nav) {
    if (nav.children.length) return; // a screen that still ships its own markup wins
    var page = nav.getAttribute('data-nav-page') || '';
    nav.innerHTML = brand() + links(page) + actions(page, nav.getAttribute('data-nav-auth') || 'user');
  });
})();

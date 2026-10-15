/* Shared site footer for the NbS Tool — the single source of the bottom bar.
   Every screen carries only a placeholder; this file renders it:

     <footer class="footer" data-screen-label="Footer"></footer>
     <script src="js/footer.js"></script>

   The link to the current page gets aria-current="page" automatically.
   Styles live in css/footer.css. */
(function () {
  'use strict';

  var HTML = '' +
  '<div class="wrap">' +
    '<div class="footer-head">' +
      '<div class="footer-brand">' +
        '<a class="footer-lockup" href="index.html">' +
          '<img class="footer-logo-nbs" src="assets/nbs-logo-light.png" alt="NbS Tool" width="294" height="80" loading="lazy" />' +
          '<span class="footer-lockup-rule" aria-hidden="true"></span>' +
          '<img class="footer-logo-scene" src="assets/scene-logo-light.png" alt="SCeNe Coalition" width="150" height="56" loading="lazy" />' +
        '</a>' +
        '<p>One standardised platform carrying frontline organisations from a boundary on a map to verified climate, nature and people impact.</p>' +
      '</div>' +
      '<nav class="footer-cols" aria-label="Footer links">' +
        '<div class="footer-col">' +
          '<h2>Supporting Materials</h2>' +
          '<a href="NbS_Activities_Flow_v2.html">Activity Matrix</a>' +
          '<a href="technical-docs.html">Methodology</a>' +
          '<a href="help.html">Help Centre</a>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h2>Other Page</h2>' +
          '<a href="sitemap.html">Sitemap</a>' +
          '<a href="index.html#about">About SCeNe Coalition</a>' +
          '<a href="index.html#about">Contact Us</a>' +
        '</div>' +
      '</nav>' +
    '</div>' +
    '<nav class="footer-flow" aria-label="The NbS Tool workflow">' +
      '<a href="interactive-map.html"><span class="fno">Phases 0–1</span><b>Explore &amp; select</b><em>Interactive Map</em></a>' +
      '<a href="interactive-map.html"><span class="fno">Phases 2–5</span><b>Analyse</b><em>Data Analyser</em></a>' +
      '<a href="create-monitoring-plan.html"><span class="fno">Phase 6</span><b>Plan monitoring</b><em>Monitoring Plan</em></a>' +
      '<a href="document-generator.html"><span class="fno">Phase 7</span><b>Generate documents</b><em>Document Generator</em></a>' +
      '<a href="dashboard.html"><span class="fno">After the analysis</span><b>Manage &amp; monitor</b><em>My Projects</em></a>' +
    '</nav>' +
    '<div class="footer-bottom">' +
      '<span>© 2026 SCeNe Coalition · ASEAN-NbS Tool project</span>' +
      '<div class="soc">' +
        // TODO(design): social links have no real destinations yet.
        '<a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.4 8.4h3.1V21H3.4V8.4zM9.1 8.4h2.97v1.72h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9.1V8.4z"/></svg></a>' +
        '<a href="#" aria-label="Website"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" stroke-width="1.7"/></svg></a>' +
      '</div>' +
    '</div>' +
  '</div>';

  // cleanUrls serves /help for help.html, so compare without the extension.
  var here = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';

  document.querySelectorAll('footer.footer').forEach(function (f) {
    if (f.children.length) return; // a screen that still ships its own markup wins
    f.innerHTML = HTML;
    f.querySelectorAll('.footer-cols a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href.indexOf('#') === -1 && href.replace(/\.html$/, '') === here) a.setAttribute('aria-current', 'page');
    });
  });
})();

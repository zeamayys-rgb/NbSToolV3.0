/* Shared mobile-nav behaviour for .sitenav (NbS Tool).
   Injects a hamburger button, toggles the menu, and closes it on
   link-click / outside-click / Escape. Also wires .desktop-notice
   dismiss buttons. Safe to load on every screen. */
(function () {
  'use strict';
  var BARS = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var XICN = '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  function initNav(nav) {
    if (nav.querySelector(':scope > .sitenav-burger')) return;
    var burger = document.createElement('button');
    burger.className = 'sitenav-burger';
    burger.type = 'button';
    burger.setAttribute('aria-label', 'Toggle menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = BARS;

    function setOpen(open) {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.innerHTML = open ? XICN : BARS;
    }
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!nav.classList.contains('open'));
    });
    // close when a nav link is tapped
    nav.addEventListener('click', function (e) {
      var a = e.target.closest('a.sitenav-link');
      if (a) setOpen(false);
    });
    // close on outside click / Escape
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    nav.appendChild(burger);
  }

  function initNotices() {
    document.querySelectorAll('.desktop-notice .dn-x').forEach(function (x) {
      x.addEventListener('click', function () {
        x.closest('.desktop-notice').classList.add('dismissed');
      });
    });
  }

  /* A11y (Wave 4 — A6): hide decorative inline SVG icons from assistive tech.
     An SVG is decorative unless it carries its own aria-label/role=img/title.
     Re-runs shortly after load to catch JS-rendered icons (F03/F05 forms). */
  function hardenSvgs(root) {
    (root || document).querySelectorAll('svg:not([aria-hidden]):not([aria-label]):not([role="img"])').forEach(function (s) {
      if (s.querySelector('title')) return; // titled SVGs are meaningful
      s.setAttribute('aria-hidden', 'true');
      s.setAttribute('focusable', 'false');
    });
  }

  /* Q-03: profile dropdown — wired once here, removed from all 7 screen inline scripts */
  function initProfileDropdown() {
    var wrap = document.getElementById('profileWrap');
    if (!wrap) return;
    document.getElementById('profileBtn').addEventListener('click', function (e) {
      e.stopPropagation();
      wrap.classList.toggle('open');
    });
    document.addEventListener('click', function () { wrap.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') wrap.classList.remove('open'); });
  }

  function boot() {
    document.querySelectorAll('nav.sitenav').forEach(initNav);
    initNotices();
    initProfileDropdown();
    hardenSvgs();
    // catch dynamically-rendered icons — only on JS-rendered screens (F03 / F05.1.1)
    if (document.getElementById('root')) {
      setTimeout(hardenSvgs, 400);
      setTimeout(hardenSvgs, 1200);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

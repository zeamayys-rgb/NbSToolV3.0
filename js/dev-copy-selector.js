/* Dev only (localhost / file://): Option/Alt + click any element to copy a unique CSS selector.
   Loaded by nav-mobile.js, or by a direct script tag on pages without it.
   A plain right-click still opens the normal context menu. */
(function () {
  'use strict';
  // never on the deployed site, even if a page includes this file directly
  if (location.protocol !== 'file:' && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
  if (window.__copySelector) return; // loaded twice (direct tag + nav-mobile.js)
  window.__copySelector = true;

  function esc(s) { return window.CSS && CSS.escape ? CSS.escape(s) : s; }

  function selectorFor(el) {
    var parts = [];
    while (el && el.nodeType === 1 && el !== document.documentElement) {
      if (el.id) { parts.unshift('#' + esc(el.id)); break; }
      var part = el.tagName.toLowerCase();
      var cls = Array.prototype.filter.call(el.classList, function (c) { return !/^(open|active|is-|has-)/.test(c); });
      if (cls.length) part += '.' + cls.map(esc).join('.');
      var parent = el.parentElement;
      if (parent) {
        var same = Array.prototype.filter.call(parent.children, function (c) { return c.tagName === el.tagName; });
        if (same.length > 1) part += ':nth-of-type(' + (same.indexOf(el) + 1) + ')';
      }
      parts.unshift(part);
      // ponytail: stop climbing once the path is unique; short selectors beat full paths
      if (document.querySelectorAll(parts.join(' > ')).length === 1) break;
      el = parent;
    }
    return parts.join(' > ');
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { legacyCopy(text); });
    }
    legacyCopy(text);
    return Promise.resolve();
  }
  // VS Code's integrated browser can block the Clipboard API inside its frame
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }

  var toast;
  function show(msg) {
    if (!toast) {
      toast = document.createElement('div');
      toast.setAttribute('role', 'status');
      toast.style.cssText = 'position:fixed;bottom:var(--space-16);left:50%;transform:translateX(-50%);' +
        'z-index:2147483647;padding:var(--space-8) var(--space-12);border-radius:var(--radius-md);' +
        'background:var(--bg-base-main);color:var(--text-title);box-shadow:var(--elevation-3);' +
        'font-family:monospace;max-width:90vw;overflow-wrap:anywhere;pointer-events:none;';
      document.body.appendChild(toast);
    }
    toast.textContent = 'Copied: ' + msg;
    toast.hidden = false;
    clearTimeout(show.t);
    show.t = setTimeout(function () { toast.hidden = true; }, 1800);
  }

  // Option/Alt + click (left or right). VS Code's integrated browser keeps
  // right-clicks for its own menu, so the left-click path is the one that works there.
  function onPick(e) {
    if (!e.altKey) return; // plain clicks behave normally
    e.preventDefault();
    e.stopPropagation();
    var sel = selectorFor(e.target);
    copy(sel).then(function () { show(sel); });
    console.log('[copy-selector]', sel, e.target);
  }
  document.addEventListener('click', onPick, true);
  document.addEventListener('contextmenu', onPick, true);
})();

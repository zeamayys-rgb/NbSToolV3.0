// ============================================================
// tweaks-vanilla.js -- dependency-free Tweaks panel
// Drop-in replacement for the React+Babel tweaks-panel.jsx.
// No CDN, no compiler: load with a plain <script src>.
//
// Usage: define a TWEAK_DEFAULTS object (inside the EDITMODE markers
// so the host can persist edits), then call mountTweaks({ title,
// defaults, controls, apply }). Control types: section, toggle,
// slider, radio, select, color. apply(values, changedKey) runs on
// init (changedKey null) and on every change.
//
// Host protocol (same as the React version): listens for
// __activate_edit_mode / __deactivate_edit_mode, posts
// __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed,
// and dispatches a same-window 'tweakchange' CustomEvent.
// ============================================================
(function () {
  'use strict';

  var STYLE = "" +
    ".twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;" +
    "max-height:calc(100vh - 32px);display:flex;flex-direction:column;" +
    "transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;" +
    "background:rgba(250,249,247,.78);color:#29261b;" +
    "-webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);" +
    "border:.5px solid rgba(255,255,255,.6);border-radius:14px;" +
    "box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);" +
    "font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}" +
    ".twk-hd{display:flex;align-items:center;justify-content:space-between;" +
    "padding:10px 8px 10px 14px;cursor:move;user-select:none}" +
    ".twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}" +
    ".twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);" +
    "width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}" +
    ".twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}" +
    ".twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;" +
    "overflow-y:auto;overflow-x:hidden;min-height:0;" +
    "scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}" +
    ".twk-body::-webkit-scrollbar{width:8px}" +
    ".twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}" +
    ".twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;" +
    "border:2px solid transparent;background-clip:content-box}" +
    ".twk-row{display:flex;flex-direction:column;gap:5px}" +
    ".twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}" +
    ".twk-lbl{display:flex;justify-content:space-between;align-items:baseline;color:rgba(41,38,27,.72)}" +
    ".twk-lbl>span:first-child{font-weight:500}" +
    ".twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}" +
    ".twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;" +
    "color:rgba(41,38,27,.45);padding:10px 0 0}" +
    ".twk-sect:first-child{padding-top:0}" +
    ".twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;" +
    "border:.5px solid rgba(0,0,0,.1);border-radius:7px;" +
    "background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}" +
    ".twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}" +
    "select.twk-field{padding-right:22px;" +
    "background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>\");" +
    "background-repeat:no-repeat;background-position:right 8px center}" +
    ".twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;" +
    "border-radius:999px;background:rgba(0,0,0,.12);outline:none}" +
    ".twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;" +
    "width:14px;height:14px;border-radius:50%;background:#fff;" +
    "border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}" +
    ".twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;" +
    "background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}" +
    ".twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;background:rgba(0,0,0,.06);user-select:none}" +
    ".twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;" +
    "background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);" +
    "transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}" +
    ".twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;" +
    "background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;" +
    "border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;overflow-wrap:anywhere}" +
    ".twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;" +
    "background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}" +
    ".twk-toggle[data-on=\"1\"]{background:#34c759}" +
    ".twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;" +
    "background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}" +
    ".twk-toggle[data-on=\"1\"] i{transform:translateX(14px)}" +
    ".twk-chips{display:flex;gap:6px}" +
    ".twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;padding:0;border:0;" +
    "border-radius:6px;overflow:hidden;cursor:default;" +
    "box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);" +
    "transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}" +
    ".twk-chip:hover{transform:translateY(-1px);box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}" +
    ".twk-chip[data-on=\"1\"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),0 2px 6px rgba(0,0,0,.15)}" +
    ".twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}";

  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function isLight(hex) {
    var h = String(hex).replace('#', '');
    if (h.length === 3) h = h.replace(/./g, function (c) { return c + c; });
    var n = parseInt(h.slice(0, 6), 16);
    if (isNaN(n)) return true;
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return r * 299 + g * 587 + b * 114 > 148000;
  }

  function checkSvg(light) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 14 14');
    var p = document.createElementNS(ns, 'path');
    p.setAttribute('d', 'M3 7.2 5.8 10 11 4.2');
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke-width', '2.2');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('stroke', light ? 'rgba(0,0,0,.78)' : '#fff');
    svg.appendChild(p);
    return svg;
  }

  window.mountTweaks = function (cfg) {
    var values = Object.assign({}, cfg.defaults || {});
    var title = cfg.title || 'Tweaks';
    var controls = cfg.controls || [];
    var apply = cfg.apply || function () {};

    // ── inject style once ──
    if (!document.getElementById('twk-vanilla-style')) {
      var st = el('style'); st.id = 'twk-vanilla-style'; st.textContent = STYLE;
      document.head.appendChild(st);
    }

    function setTweak(key, val) {
      values[key] = val;
      var edits = {}; edits[key] = val;
      try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: edits }, '*'); } catch (e) {}
      window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
      apply(values, key);
    }

    // ── build panel ──
    var panel = el('div', 'twk-panel'); panel.setAttribute('data-omelette-chrome', '');
    panel.style.display = 'none';

    var hd = el('div', 'twk-hd');
    var b = el('b'); b.textContent = title; hd.appendChild(b);
    var x = el('button', 'twk-x', { 'aria-label': 'Close tweaks' }); x.textContent = '✕';
    hd.appendChild(x);
    panel.appendChild(hd);

    var body = el('div', 'twk-body');
    panel.appendChild(body);

    controls.forEach(function (c) { body.appendChild(renderControl(c)); });
    (document.body || document.documentElement).appendChild(panel);

    function renderControl(c) {
      if (c.type === 'section') {
        var s = el('div', 'twk-sect'); s.textContent = c.label; return s;
      }
      if (c.type === 'toggle') {
        var row = el('div', 'twk-row twk-row-h');
        var lbl = el('div', 'twk-lbl'); var sp = el('span'); sp.textContent = c.label; lbl.appendChild(sp);
        var btn = el('button', 'twk-toggle', { type: 'button', role: 'switch' });
        btn.appendChild(el('i'));
        function syncT() {
          btn.setAttribute('data-on', values[c.key] ? '1' : '0');
          btn.setAttribute('aria-checked', values[c.key] ? 'true' : 'false');
        }
        syncT();
        btn.addEventListener('click', function () { setTweak(c.key, !values[c.key]); syncT(); });
        row.appendChild(lbl); row.appendChild(btn); return row;
      }
      if (c.type === 'slider') {
        var rowS = el('div', 'twk-row');
        var lblS = el('div', 'twk-lbl');
        var s1 = el('span'); s1.textContent = c.label;
        var s2 = el('span', 'twk-val');
        var unit = c.unit || '';
        s2.textContent = values[c.key] + unit;
        lblS.appendChild(s1); lblS.appendChild(s2);
        var inp = el('input', 'twk-slider', { type: 'range' });
        inp.min = c.min != null ? c.min : 0; inp.max = c.max != null ? c.max : 100;
        inp.step = c.step != null ? c.step : 1; inp.value = values[c.key];
        inp.addEventListener('input', function () {
          var v = Number(inp.value); s2.textContent = v + unit; setTweak(c.key, v);
        });
        rowS.appendChild(lblS); rowS.appendChild(inp); return rowS;
      }
      if (c.type === 'select' || (c.type === 'radio' && !fitsSegments(c.options))) {
        var rowSel = el('div', 'twk-row');
        var lblSel = el('div', 'twk-lbl'); var spSel = el('span'); spSel.textContent = c.label; lblSel.appendChild(spSel);
        var sel = el('select', 'twk-field');
        c.options.forEach(function (o) {
          var v = typeof o === 'object' ? o.value : o;
          var l = typeof o === 'object' ? o.label : o;
          var op = el('option'); op.value = v; op.textContent = l;
          if (v === values[c.key]) op.selected = true;
          sel.appendChild(op);
        });
        sel.addEventListener('change', function () { setTweak(c.key, sel.value); });
        rowSel.appendChild(lblSel); rowSel.appendChild(sel); return rowSel;
      }
      if (c.type === 'radio') {
        var rowR = el('div', 'twk-row');
        var lblR = el('div', 'twk-lbl'); var spR = el('span'); spR.textContent = c.label; lblR.appendChild(spR);
        var seg = el('div', 'twk-seg', { role: 'radiogroup' });
        var thumb = el('div', 'twk-seg-thumb');
        seg.appendChild(thumb);
        var opts = c.options.map(function (o) { return typeof o === 'object' ? o : { value: o, label: o }; });
        var n = opts.length;
        function positionThumb() {
          var idx = Math.max(0, opts.findIndex(function (o) { return o.value === values[c.key]; }));
          thumb.style.left = 'calc(2px + ' + idx + ' * (100% - 4px) / ' + n + ')';
          thumb.style.width = 'calc((100% - 4px) / ' + n + ')';
        }
        opts.forEach(function (o) {
          var ob = el('button', null, { type: 'button', role: 'radio' });
          ob.textContent = o.label;
          ob.addEventListener('click', function () { setTweak(c.key, o.value); positionThumb(); });
          seg.appendChild(ob);
        });
        rowR.appendChild(lblR); rowR.appendChild(seg);
        // position after layout so percentages resolve
        requestAnimationFrame(positionThumb);
        return rowR;
      }
      if (c.type === 'color') {
        var rowC = el('div', 'twk-row');
        var lblC = el('div', 'twk-lbl'); var spC = el('span'); spC.textContent = c.label; lblC.appendChild(spC);
        var chips = el('div', 'twk-chips', { role: 'radiogroup' });
        c.options.forEach(function (o) {
          var hero = Array.isArray(o) ? o[0] : o;
          var chip = el('button', 'twk-chip', { type: 'button', role: 'radio', title: hero });
          chip.style.background = hero;
          function syncC() {
            var on = String(values[c.key]).toLowerCase() === String(hero).toLowerCase();
            chip.setAttribute('data-on', on ? '1' : '0');
            chip.setAttribute('aria-checked', on ? 'true' : 'false');
            var existing = chip.querySelector('svg');
            if (on && !existing) chip.appendChild(checkSvg(isLight(hero)));
            else if (!on && existing) existing.remove();
          }
          syncC();
          chip.addEventListener('click', function () {
            setTweak(c.key, o);
            Array.prototype.forEach.call(chips.children, function (ch) {
              if (ch.__sync) ch.__sync();
            });
          });
          chip.__sync = syncC;
          chips.appendChild(chip);
        });
        rowC.appendChild(lblC); rowC.appendChild(chips); return rowC;
      }
      return el('div');
    }

    function fitsSegments(options) {
      if (!options || options.length < 2 || options.length > 3) return false;
      var maxLen = options.reduce(function (m, o) {
        var l = String(typeof o === 'object' ? o.label : o).length;
        return Math.max(m, l);
      }, 0);
      return maxLen <= (options.length === 2 ? 16 : 10);
    }

    // ── host protocol ──
    function open() { panel.style.display = 'flex'; }
    function close() { panel.style.display = 'none'; }
    x.addEventListener('click', function () {
      close();
      try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
    });
    window.addEventListener('message', function (e) {
      var t = e && e.data && e.data.type;
      if (t === '__activate_edit_mode') open();
      else if (t === '__deactivate_edit_mode') close();
    });
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}

    // ── drag ──
    hd.addEventListener('mousedown', function (e) {
      if (e.target === x) return;
      var r = panel.getBoundingClientRect();
      var sx = e.clientX, sy = e.clientY;
      var startRight = window.innerWidth - r.right;
      var startBottom = window.innerHeight - r.bottom;
      function move(ev) {
        panel.style.right = Math.max(16, startRight - (ev.clientX - sx)) + 'px';
        panel.style.bottom = Math.max(16, startBottom - (ev.clientY - sy)) + 'px';
      }
      function up() {
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      }
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    });

    // initial effect application
    apply(values, null);
  };
})();

/* Hazard scenes (DEC-54): the four Natural Disaster Risk pictures, drawn as inline SVG and
   animated with GSAP on hover. Once played, a scene keeps its hazard state (DEC-55).

   - hazardScene(key) returns the calm drawing. Load this file before js/analysis-shared.js.
   - Style (DEC-56): no outlines. Shapes are flat, muted and layered by tone, after the
     land-cover icons (assets/f01-step2/genctx/lc-*.svg). Lines are used only for thin things:
     branches, rain, wind, cracks.
   - Colours live in css/genctx.css (.hz-*) so the drawings follow the tokens. GSAP here only
     moves and fades; it never sets a colour.
   - Decorative: the SVG is aria-hidden and the risk level stays in the text under it.
   - No GSAP on the page, or prefers-reduced-motion: the calm drawing stays still.
   - Durations are in seconds and local to this file. TODO(design): tokens.json TODO-24. */
(function () {
  const W = 270, H = 120;

  /* ---------- drawing helpers ---------- */
  const HIDE = ' opacity="0"';
  const p = (cls, d, more = '') => `<path class="${cls}" d="${d}"${more}/>`;
  // one shape, two colours: the second sits on top and fades in (.a-alt)
  const both = (d, calm, alt) => p(calm, d) + p(alt + ' a-alt', d, HIDE);
  const oval = (cx, cy, rx, ry, cls, alt) => {
    const at = `cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"`;
    return `<ellipse class="${cls}" ${at}/>` + (alt ? `<ellipse class="${alt} a-alt" ${at}${HIDE}/>` : '');
  };
  const dot = (cls, cx, cy, r, more = '') => `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"${more}/>`;
  const sky = (alt) => `<rect class="hz-sky" width="${W}" height="${H}"/>` + (alt ? `<rect class="${alt} a-alt" width="${W}" height="${H}"${HIDE}/>` : '');
  // a soft disc with a paler halo
  const sun = (cx, cy, cls = '') => `<g class="${cls}">${dot('hz-sun hz-faint a-halo', cx, cy, 15)}${dot('hz-sun', cx, cy, 9)}</g>`;
  const rays = (cx, cy) => Array.from({ length: 8 }, (_, i) => {
    const a = i * Math.PI / 4, at = (r) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    return `M${at(18)}L${at(23)}`;
  }).join('');
  const CLOUD = 'h30a7 7 0 0 0 0-14a6 6 0 0 0-5-2a10 10 0 0 0-19 1a7.5 7.5 0 0 0-6 15z';
  // 'fair' stays white, 'storm' is grey from the start; with neither, it turns from one to the other
  const cloud = (x, y, kind) => kind ? p(kind === 'storm' ? 'hz-cloud--storm' : 'hz-cloud', `M${x} ${y}${CLOUD}`) : both(`M${x} ${y}${CLOUD}`, 'hz-cloud', 'hz-cloud--storm');
  // a band of water with a pale foam line along its crest
  const wave = (anim, fill, y, amp) => {
    const top = `M-60 ${y}q15-${amp} 30 0${'t30 0'.repeat(13)}`;
    return `<g class="${anim}">${p(fill, top + 'V130H-60z')}${p('hz-l hz-l--pale hz-faint', top)}</g>`;
  };
  // rain as one path; shifting it by (dx, 40) lands it on itself, so the loop is seamless
  const rain = (dx) => {
    let d = '';
    for (let c = -3; c < 10; c++) for (let r = -1; r < 4; r++) {
      const x = c * 30 + r * dx + (c * 13) % 9, y = r * 40 + (c * 17) % 40;
      d += `M${x.toFixed(1)} ${y}l${(dx * .22).toFixed(1)} 9`;
    }
    return `<g class="a-rain"${HIDE}>${p('hz-l hz-l--rain a-rainfall', d)}</g>`;
  };

  // plants. `dries` gives the leaves a second, dry colour to fade to
  const tree = (x, y, s, dries) => `<g transform="translate(${x} ${y}) scale(${s})">` +
    p('hz-wood', 'M-2 0L-1.2-26h2.4L2 0z') + p('hz-l hz-l--wood', 'M0-26v-13M0-31l-9-9M0-34l10-10M-5-36h-5M6-40l6 1') +
    `<g class="a-leaf">${oval(0, -42, 17, 15, 'hz-leaf', dries && 'hz-leaf--dry')}${oval(5, -47, 10, 8, 'hz-leaf--lit', dries && 'hz-leaf--dry')}</g></g>`;
  const bush = (x, y, dries) => `<g transform="translate(${x} ${y})">` +
    p('hz-l hz-l--wood', 'M0-1.5v-7M0-4l-4-4M0-5l4-4M-3-1.5l-5-3M3-1.5l5-3') +
    `<g class="a-leaf">${dries ? both('M-14 0A14 10 0 0 1 14 0z', 'hz-leaf', 'hz-leaf--dry') : p('hz-leaf', 'M-14 0A14 10 0 0 1 14 0z')}` +
    (dries ? both('M0 0A9 6.5 0 0 1 18 0z', 'hz-leaf--lit', 'hz-leaf--dry') : p('hz-leaf--lit', 'M0 0A9 6.5 0 0 1 18 0z')) + '</g></g>';
  const pine = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">` +
    p('hz-wood', 'M-1.2 0v-5h2.4v5z') +
    p('hz-leaf--deep hz-tier3', 'M0-18L12-3H-12z') + p('hz-leaf--deep hz-tier2', 'M0-25L10-10H-10z') + p('hz-leaf--deep', 'M0-32L8-17H-8z') + '</g>';
  const mangrove = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">` +
    p('hz-l hz-l--wood', 'M0-12Q-8-8-10 2M0-12Q-3-5-4 2M0-12Q4-5 5 2M0-12Q9-8 11 2M0-12v-12') +
    `<g transform="translate(0 -22)"><g class="a-lean"><g class="a-sway">${oval(0, -8, 14, 10, 'hz-leaf')}${oval(4, -12, 8, 5.5, 'hz-leaf--lit')}</g></g></g></g>`;

  // the typhoon seen from the side: a funnel of stacked rings, wide at the cloud and narrow at
  // the sea. The rings are see-through, so where they overlap the funnel darkens into bands.
  // Each ring is drawn around its own 0,0; the pale streak on its front reads as spin.
  const funnel = () => {
    const rings = [], f = (n) => n.toFixed(1);
    for (let i = 0, y = 16, rx = 34; i < 10; i++, rx *= .8) {
      const ry = Math.max(rx * .3, 1.6), a = rx * .72;
      rings.unshift(`<g transform="translate(${f(6 * Math.sin(i * .6))} ${f(y)})"><g class="a-ring"><ellipse class="hz-funnel" rx="${f(rx)}" ry="${f(ry)}"/>` +
        (rx > 8 ? p('hz-l hz-l--cut hz-l--pale a-spin', `M${f(-a)} ${f(ry * .15)}A${f(a)} ${f(ry * .6)} 0 0 0 ${f(a)} ${f(ry * .15)}`, ' pathLength="1" stroke-dasharray=".3 .7"') : '') +
        '</g></g>');
      y += ry * 1.25;
    }
    return `<g transform="translate(150 0)"><g class="a-cyclone"${HIDE}>${rings.join('')}</g></g>`;   // top ring last, so it sits in front
  };

  /* ---------- the four drawings ---------- */
  const HILL = 'M-2 122V58Q28 40 72 40L126 42Q144 43 154 58L196 122z';
  const SLIP = 'M100 41L126 42Q144 43 154 58L175 90Q146 90 132 70Q120 52 100 41z';   // the edge that gives way
  const ROCKS = [[150, 62], [160, 74], [142, 68], [166, 84], [156, 58]];
  const ROCKS_END = [[214, 109], [232, 111], [204, 110], [246, 110], [222, 105]];
  const drawn = ' pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"';   // a line GSAP draws in

  const ART = {
    drought:
      sky('hz-sky--hot') +
      p('hz-l hz-l--sun a-rays', rays(222, 30), HIDE) + sun(222, 30) +
      both('M-2 70Q40 50 88 64T172 58T272 66V122H-2z', 'hz-far', 'hz-far--dry') +
      both('M-2 82Q60 66 130 78T272 72V122H-2z', 'hz-mid', 'hz-mid--dry') +
      both('M-2 92Q70 84 136 90T272 88V122H-2z', 'hz-land', 'hz-land--dry') +
      ['M40 122L52 110L46 103L57 97', 'M52 110L66 108', 'M120 122L128 111L122 104L131 98', 'M128 111L143 113',
        'M200 122L192 111L202 104L197 98', 'M192 111L180 107', 'M238 122L243 112L237 106']
        .map(d => p('hz-l hz-l--cut hz-l--crack a-crack', d, drawn)).join('') +
      p('hz-l hz-l--fine a-tuft', 'M70 90l1.5-5M73 90l1-4M166 94l1.5-5M169 94l1-4M214 95l1.5-5M217 95l1-4') +
      ['M66 84q3-3 0-6t0-6', 'M160 86q3-3 0-6t0-6', 'M214 88q3-3 0-6t0-6'].map(d => p('hz-l hz-l--heat a-heat', d, HIDE)).join('') +
      p('hz-rock', 'M24 91L31 77L45 73L56 81L60 90z') + p('hz-rock--lit', 'M31 77L45 73L42 84z') +
      p('hz-rock', 'M252 93l4-7l8 1l5 6z') +
      tree(96, 89, 1, true) + tree(190, 93, .8, true) + bush(146, 92, true) + bush(236, 93, true),

    flood:
      sky('hz-sky--rain') + sun(104, 22, 'a-calm') +
      cloud(26, 30) + cloud(188, 26) +
      p('hz-l hz-l--fine hz-l--ink a-flock', 'M148 34q3.5-4 7 0q3.5-4 7 0M170 25q2.5-3 5 0q2.5-3 5 0') +
      p('hz-far', 'M-2 66Q50 42 104 58T200 50T272 60V122H-2z') +
      p('hz-mid', 'M-2 78Q60 64 130 74T272 68V122H-2z') +
      p('hz-land', 'M-2 88Q70 80 136 86T272 84V122H-2z') +
      p('hz-water', 'M-2 110Q60 103 136 108T272 105V122H-2z') + p('hz-l hz-l--pale hz-faint', 'M40 115h14M150 116h12M214 113h10') +
      tree(48, 86, .95) + pine(224, 88, 1.3) + pine(244, 89) + bush(134, 87) +
      p('hz-l hz-l--fine', 'M94 85v-6M102 85v-8M110 86v-5') + dot('hz-sun', 94, 78, 1.8) + dot('hz-sun', 102, 76, 1.8) + dot('hz-sun', 110, 80, 1.8) +
      p('hz-l hz-l--fine', 'M254 108v-14M260 108v-10') + oval(254, 92, 1.5, 3.5, 'hz-wood') + oval(260, 96, 1.5, 3.5, 'hz-wood') +
      // a wading bird, as a silhouette
      '<g class="a-bird">' + p('hz-l hz-l--fine hz-l--ink', 'M173 97v-12M177 97v-12') +
      '<ellipse class="hz-ink" cx="174" cy="82" rx="9" ry="4.8" transform="rotate(-12 174 82)"/>' +
      p('hz-l hz-l--neck hz-l--ink', 'M180 80C186 76 182 70 184 64') + dot('hz-ink', 184.5, 63, 2.3) + p('hz-l hz-l--ink', 'M186 62.6l7 1.6') + '</g>' +
      rain(-6) +
      '<g class="a-flood" transform="translate(0 74)">' +
      wave('a-wave1', 'hz-water hz-wet', 58, 6) + wave('a-wave2', 'hz-water--deep hz-wet', 72, 5) + '</g>',

    landslide:
      sky() + sun(160, 22) + cloud(206, 32, 'fair') +
      p('hz-far', 'M150 122L206 54Q214 46 222 54L272 104V122z') + p('hz-far hz-faint', 'M214 122L250 82Q256 76 262 82L290 122z') +
      p('hz-land', HILL) + p('hz-soil a-seam', SLIP, HIDE) +
      p('hz-l hz-l--crack a-seam', 'M116 49Q132 56 140 72M130 48Q146 58 154 78', HIDE) +
      p('hz-l hz-l--soft', 'M4 74Q44 60 92 66M10 98Q60 86 118 94') +
      pine(22, 48) + pine(46, 43, 1.15) + pine(78, 41) +
      ROCKS.map(([x, y]) => `<g class="a-rock" transform="translate(${x} ${y})"${HIDE}>${p('hz-rock', 'M-4 2L-2-3L3-3L5 2z')}</g>`).join('') +
      // the slipping edge takes a darker tone as it moves, so it reads against the hill
      '<g class="a-slide">' + both(SLIP, 'hz-land', 'hz-near') + '<g class="a-topple">' + pine(118, 42) + '</g></g>' +
      [[122, 50], [134, 60], [128, 54]].map(([x, y]) => dot('hz-rock a-pebble', x, y, 2, HIDE)).join('') +
      p('hz-near', 'M-2 111Q135 103 272 111V122H-2z') +
      [[202, 102, 8], [214, 99, 7], [190, 104, 6]].map(([x, y, r]) => dot('hz-dust a-dust', x, y, r, HIDE)).join('') +
      [[198, 105], [212, 103]].map(([x, y]) => dot('hz-dust a-puff', x, y, 5, HIDE)).join('') +
      pine(250, 112, .9),

    typhoon:
      sky('hz-sky--storm') + sun(34, 24, 'a-calm') + cloud(92, 24) +
      `<g class="a-cloudl" transform="translate(-60 0)">${cloud(8, 36, 'storm')}</g>` +
      `<g class="a-cloudr" transform="translate(70 0)">${cloud(222, 24, 'storm')}</g>` +
      both('M-2 62H272V122H-2z', 'hz-water', 'hz-water--storm') + p('hz-l hz-l--pale hz-faint a-calm', 'M120 74h16M150 97h14M226 110h12') +
      '<g class="a-swell" transform="translate(0 66)">' + wave('a-wave1', 'hz-water--deep', 66, 7) + '</g>' +
      funnel() +
      p('hz-sand', 'M-2 86Q60 78 112 92Q146 102 166 122H-2z') +
      mangrove(206, 92) + mangrove(242, 102, 1.15) + mangrove(178, 106, .8) +
      '<g class="a-palm">' + p('hz-wood--pale', 'M53 90Q56 64 67.5 46L70.5 47.5Q61 66 58 90z') +
      '<g transform="translate(69 46)"><g class="a-lean"><g class="a-sway">' +
      p('hz-l hz-l--frond', 'M0 0Q-12-10-26-7M0 0Q12-10 26-7M0 0Q-7-15-5-25M0 0Q7-15 13-23M0 0Q-14 0-23 10M0 0Q14 0 23 10') +
      '</g></g>' + dot('hz-wood', 0, 1, 2.6) + '</g></g>' +
      '<g class="a-swell2" transform="translate(0 40)">' + wave('a-wave2', 'hz-water--storm hz-wet', 102, 6) + '</g>' +
      '<g class="a-wind"' + HIDE + '>' +
      ['M-10 46H96q12 0 12-8q0-7-7-7q-5 0-5 5', 'M70 58H196q10 0 10-7q0-6-6-6q-4 0-4 4', 'M-10 76H140q12 0 12 8q0 7-7 7q-5 0-5-5']
        .map(d => p('hz-l hz-l--cut hz-l--wind a-gust', d, ' pathLength="1" stroke-dasharray=".35 1.35" stroke-dashoffset=".35"')).join('') +
      '</g>' + rain(26),
  };

  window.hazardScene = (key) =>
    `<svg class="hz" data-hz="${key}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${ART[key]}</svg>`;

  /* ---------- motion ----------
     Each builder fills `tl` (plays once, on the first hover, and is never played back) and
     returns the tweens that repeat for as long as the pointer stays.
     Every repeat, with its pause, lasts a whole fraction of 3 seconds (0.3, 0.5, 0.6, 1, 1.5
     or 3) and every delay lands on a 30 fps frame, and everything has settled by 3 seconds.
     That is what lets the Lottie export (DEC-59) cut a clean 3 second loop. Keep it so. */
  const loop = (targets, vars) => gsap.to(targets, Object.assign({ ease: 'none', repeat: -1, paused: true }, vars));
  // one repeating tween per element, each starting a little after the last
  const each = (els, vars, wait, gap) => Array.from(els, (el, i) => loop(el, Object.assign({ delay: wait + i * gap }, vars)));
  const sway = (q, sel) => loop(q(sel), { keyframes: { rotation: [0, 5, -4, 0] }, duration: 1, ease: 'sine.inOut' });

  const MOTION = {
    drought(q, tl) {
      // green fades to brown first; then the dried leaves drop and the ground cracks
      tl.to(q('.a-alt'), { opacity: 1, duration: 1.2, ease: 'power1.inOut' }, 0)
        .to(q('.a-halo'), { scale: 1.35, transformOrigin: '50% 50%', duration: 1.2 }, 0)
        .to(q('.a-rays'), { opacity: .8, duration: .5 }, .5)
        .to(q('.a-tuft'), { opacity: 0, duration: .5 }, .2)
        .to(q('.a-leaf'), { scale: .25, opacity: 0, transformOrigin: '50% 75%', duration: .8, ease: 'power2.in', stagger: .1 }, .9)
        .to(q('.a-crack'), { strokeDashoffset: 0, duration: .7, ease: 'power1.out', stagger: .07 }, .6);
      // the sun beams: rays turn and pulse (eight rays, so an eighth of a turn loops cleanly)
      gsap.set(q('.a-rays'), { svgOrigin: '222 30' });
      return [
        loop(q('.a-rays'), { rotation: 45, duration: 3 }),
        loop(q('.a-rays'), { keyframes: { scale: [1, 1.15, 1] }, duration: 1.5, ease: 'sine.inOut' }),
      ].concat(each(q('.a-heat'), { keyframes: { '0%': { opacity: 0, y: 0 }, '40%': { opacity: .9 }, '100%': { opacity: 0, y: -10 } }, duration: 1.5 }, 1.2, .5));
    },
    flood(q, tl) {
      tl.to(q('.a-alt'), { opacity: 1, duration: .6 }, 0)
        .to(q('.a-calm'), { opacity: 0, duration: .5 }, 0)
        .to(q('.a-rain'), { opacity: 1, duration: .4 }, .1)
        .to(q('.a-flock'), { x: 40, y: -16, opacity: 0, duration: 1, ease: 'power1.in' }, .1)
        .to(q('.a-bird'), { x: 34, y: -52, rotation: -10, transformOrigin: '50% 50%', duration: 1, ease: 'power2.inOut' }, .2)
        .to(q('.a-flood'), { y: 0, duration: 1.4, ease: 'power2.out' }, .3);
      return [
        loop(q('.a-rainfall'), { x: -6, y: 40, duration: .5 }),
        loop(q('.a-wave1'), { x: -60, duration: 3 }),
        loop(q('.a-wave2'), { x: 60, duration: 1.5 }),
      ];
    },
    landslide(q, tl) {
      tl.to(q('.a-seam, .a-alt'), { opacity: 1, duration: .2 }, 0)
        .to(q('.a-slide'), { x: 24, y: 36, rotation: 9, svgOrigin: '175 90', duration: 1, ease: 'power2.in' }, .15)
        .to(q('.a-topple'), { rotation: 65, svgOrigin: '118 42', duration: .9, ease: 'power1.in' }, .25)
        .to(q('.a-rock'), { opacity: 1, duration: .1, stagger: .08 }, .35)
        .to(q('.a-rock'), { x: i => ROCKS_END[i][0], y: i => ROCKS_END[i][1], rotation: i => 200 + i * 45, duration: .9, ease: 'bounce.out', stagger: .08 }, .35)
        .to(q('.a-dust'), { keyframes: [{ opacity: .8, scale: 1, duration: .35 }, { opacity: 0, scale: 1.6, duration: .55 }], transformOrigin: '50% 50%', stagger: .1 }, 1);
      // the slope keeps shedding: pebbles roll down the scar and dust lifts at its foot
      gsap.set(q('.a-puff'), { transformOrigin: '50% 50%' });
      return each(q('.a-pebble'), { keyframes: { '0%': { opacity: 0, x: 0, y: 0 }, '12%': { opacity: 1 }, '88%': { opacity: 1 }, '100%': { opacity: 0, x: 62, y: 52 }, easeEach: 'none' }, duration: 1.2, ease: 'power1.in', repeatDelay: .3 }, 1.2, .5)
        .concat(each(q('.a-puff'), { keyframes: { '0%': { opacity: 0, scale: .4, y: 0 }, '30%': { opacity: .8 }, '100%': { opacity: 0, scale: 1.5, y: -8 } }, duration: 1.3, repeatDelay: .2 }, 1.4, .6));
    },
    typhoon(q, tl) {
      // pivots first: each of these is drawn around its own 0,0
      gsap.set(q('.a-lean, .a-sway'), { svgOrigin: '0 0' });
      gsap.set(q('.a-cyclone'), { svgOrigin: '0 6' });   // the funnel grows down from its top
      tl.to(q('.a-alt'), { opacity: 1, duration: .8 }, 0)
        .to(q('.a-calm'), { opacity: 0, duration: .4 }, 0)
        .to(q('.a-cloudl, .a-cloudr'), { x: 0, duration: .9, ease: 'power2.out', stagger: .1 }, 0)
        .fromTo(q('.a-cyclone'), { scale: .3, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'power2.out' }, .3)
        .to(q('.a-palm'), { rotation: 12, svgOrigin: '55 90', duration: .9, ease: 'power2.out' }, .2)
        .to(q('.a-lean'), { rotation: 14, duration: .9, ease: 'power2.out' }, .2)
        .to(q('.a-wind, .a-rain'), { opacity: 1, duration: .4 }, .3)
        .to(q('.a-swell, .a-swell2'), { y: 0, duration: 1, ease: 'power2.out', stagger: .1 }, .3);
      return [
        loop(q('.a-spin'), { strokeDashoffset: -1, duration: .6 }),
        loop(q('.a-rainfall'), { x: 26, y: 40, duration: .3 }),
        loop(q('.a-wave1'), { x: -60, duration: 1.5 }),
        loop(q('.a-wave2'), { x: 60, duration: 1 }),
        sway(q, '.a-sway'),
      ].concat(each(q('.a-gust'), { strokeDashoffset: -1, duration: 1 }, 0, .3))
        .concat(each(q('.a-ring'), { keyframes: { x: [0, 3, 0, -3, 0] }, duration: 1 }, 0, .1));   // the funnel writhes, bottom first
    },
  };

  const live = new WeakMap();   // svg -> { tl, loops }, built on first hover
  const still = window.matchMedia('(prefers-reduced-motion: reduce)');

  function hover(e, on) {
    const tile = e.target.closest && e.target.closest('.gc-nditem');
    if (!tile || tile.contains(e.relatedTarget)) return;
    const svg = tile.querySelector('.hz');
    if (!svg || !window.gsap || still.matches) return;
    let s = live.get(svg);
    if (!s) {
      const tl = gsap.timeline({ paused: true });
      s = { tl, loops: MOTION[svg.dataset.hz](sel => svg.querySelectorAll(sel), tl) };
      live.set(svg, s);
    }
    // leaving does not undo the hazard: the timeline runs on to its end and stays there,
    // and only the repeating motion (rain, waves, wind) stops until the pointer returns
    if (on) s.tl.play();
    s.loops.forEach(t => t.paused(!on));
  }
  document.addEventListener('mouseover', e => hover(e, true));
  document.addEventListener('mouseout', e => hover(e, false));
})();

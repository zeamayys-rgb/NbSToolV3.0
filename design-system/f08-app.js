/* ============================================================
   NbS Tool — [F08] Account Settings
   Profile · email verification · password · organization
   Country/City consume the open countriesnow.space API
   (https://countriesnow.space) with a static fallback.
   ============================================================ */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Toast ---------- */
  var CHECK = '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function toast(msg) {
    var host = $('#toastHost');
    var t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<span class="t-ic">' + CHECK + '</span>' + msg;
    host.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { t.remove(); }, 300);
    }, 2600);
  }
  function flashSaved(id) {
    var n = $('#' + id);
    if (!n) return;
    n.classList.add('show');
    setTimeout(function () { n.classList.remove('show'); }, 2600);
  }

  /* ---------- Scroll-spy rail ---------- */
  (function () {
    var links = $$('.settings-nav a[data-spy]');
    var map = {};
    links.forEach(function (l) { map[l.getAttribute('data-spy')] = l; });
    var sections = $$('.sect');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          if (map[e.target.id]) map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  })();

  /* ---------- Cancel / reset ---------- */
  $$('[data-reset]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = $('#' + btn.getAttribute('data-reset'));
      if (f) { f.reset(); recalcStrength(); checkMatch(); }
    });
  });

  /* ---------- Generic save (profile / org) ---------- */
  function wireSave(formId, savedId, msg) {
    var f = $('#' + formId);
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      flashSaved(savedId);
      toast(msg);
    });
  }
  wireSave('profileForm', 'profileSaved', 'Profile updated');
  wireSave('orgForm', 'orgSaved', 'Organization info saved');

  /* avatar initials follow the name fields */
  function syncAvatar() {
    var a = ($('#firstName').value || '').trim()[0] || '';
    var b = ($('#lastName').value || '').trim()[0] || '';
    $('#avatar').textContent = (a + b).toUpperCase() || 'U';
  }
  $('#firstName').addEventListener('input', syncAvatar);
  $('#lastName').addEventListener('input', syncAvatar);

  /* ---------- Password show / hide ---------- */
  var EYE = '<svg viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>';
  var EYEOFF = '<svg viewBox="0 0 24 24" fill="none"><path d="M3 3l18 18M10.6 10.6a3 3 0 004.2 4.2M9.4 5.2A9.3 9.3 0 0112 5c6.5 0 10 7 10 7a17 17 0 01-3.1 3.9M6.1 6.1A17 17 0 002 12s3.5 7 10 7a9.4 9.4 0 003.9-.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  $$('[data-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var inp = $('#' + btn.getAttribute('data-toggle'));
      var show = inp.type === 'password';
      inp.type = show ? 'text' : 'password';
      btn.innerHTML = show ? EYEOFF : EYE;
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

  /* ---------- Password strength + requirements ---------- */
  var LABELS = ['Password strength', 'Weak', 'Fair', 'Good', 'Strong'];
  function recalcStrength() {
    var v = $('#newPw').value;
    var reqs = {
      len: v.length >= 8,
      case: /[a-z]/.test(v) && /[A-Z]/.test(v),
      num: /[0-9]/.test(v),
      sym: /[^A-Za-z0-9]/.test(v)
    };
    $$('#pwReqs li').forEach(function (li) {
      li.classList.toggle('ok', !!reqs[li.getAttribute('data-req')]);
    });
    var score = (reqs.len ? 1 : 0) + (reqs.case ? 1 : 0) + (reqs.num ? 1 : 0) + (reqs.sym ? 1 : 0);
    if (v.length === 0) score = 0;
    var meter = $('#pwStrength');
    meter.className = 'pw-strength' + (score ? ' lvl' + score : '');
    $('#pwLabel').textContent = LABELS[score];
  }
  function checkMatch() {
    var a = $('#newPw').value, b = $('#confPw').value;
    var err = $('#confErr');
    var bad = b.length > 0 && a !== b;
    err.classList.toggle('show', bad);
    $('#confPw').classList.toggle('invalid', bad);
    return !bad;
  }
  $('#newPw').addEventListener('input', function () { recalcStrength(); checkMatch(); });
  $('#confPw').addEventListener('input', checkMatch);

  $('#pwForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var cur = $('#curPw').value, nw = $('#newPw').value;
    if (!cur) { $('#curPw').classList.add('invalid'); $('#curPw').focus(); return; }
    $('#curPw').classList.remove('invalid');
    if (nw.length < 8) { recalcStrength(); $('#newPw').focus(); toast('Choose a stronger password'); return; }
    if (!checkMatch()) { $('#confPw').focus(); return; }
    flashSaved('pwSaved');
    toast('Password changed');
    $('#pwForm').reset(); recalcStrength();
  });

  /* ---------- Forgot password — send reset link ---------- */
  var forgotBtn = $('#forgotPwBtn');
  if (forgotBtn) {
    forgotBtn.addEventListener('click', function () {
      var emailEl = $('#emailInput');
      var email = (emailEl && emailEl.value.trim()) ? emailEl.value.trim() : 'your registered email address';
      toast('Reset link sent \u2014 check ' + email);
    });
  }

  /* ---------- Email verification ---------- */
  var emailStatus = $('#emailStatus');
  var resendTimer = null;
  if (emailStatus) {
  function startResendCountdown() {
    var n = 30, btn = $('#resendBtn'), span = $('#resendCount');
    btn.disabled = true;
    span.textContent = n;
    clearInterval(resendTimer);
    resendTimer = setInterval(function () {
      n--;
      span.textContent = n;
      if (n <= 0) {
        clearInterval(resendTimer);
        btn.disabled = false;
        btn.textContent = 'Resend code';
      }
    }, 1000);
  }
  function openVerify() {
    $('#vpAddr').textContent = $('#emailInput').value || 'your email';
    $('#verifyPanel').classList.add('open');
    startResendCountdown();
    var first = $('#otp input');
    setTimeout(function () { first.focus(); }, 60);
    toast('Verification code sent');
  }
  $('#sendVerifyBtn').addEventListener('click', openVerify);
  $('#resendBtn').addEventListener('click', function () {
    if (this.disabled) return;
    this.innerHTML = 'Resend code (<span id="resendCount">30</span>s)';
    startResendCountdown();
    toast('New code sent');
  });

  /* OTP boxes: auto-advance, backspace, paste */
  var otp = $$('#otp input');
  otp.forEach(function (inp, i) {
    inp.addEventListener('input', function () {
      inp.value = inp.value.replace(/[^0-9]/g, '').slice(0, 1);
      inp.classList.toggle('filled', !!inp.value);
      if (inp.value && otp[i + 1]) otp[i + 1].focus();
    });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !inp.value && otp[i - 1]) { otp[i - 1].focus(); }
    });
    inp.addEventListener('paste', function (e) {
      e.preventDefault();
      var d = (e.clipboardData.getData('text') || '').replace(/[^0-9]/g, '').slice(0, 6).split('');
      d.forEach(function (ch, k) { if (otp[k]) { otp[k].value = ch; otp[k].classList.add('filled'); } });
      (otp[Math.min(d.length, 5)] || inp).focus();
    });
  });
  function otpValue() { return otp.map(function (o) { return o.value; }).join(''); }

  function markVerified() {
    emailStatus.classList.remove('is-unverified');
    emailStatus.classList.add('is-verified');
    $('#esIc').innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 1.8 3 .2.9 2.9 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-.9 2.9-3 .2L12 22l-2.4-1.8-3-.2-.9-2.9L3.3 15l.9-2.9-.9-2.9 2.4-1.8.9-2.9 3-.2L12 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    $('#emailBadge').className = 'badge s-verified-ok';
    $('#emailBadge').innerHTML = '<span class="d"></span>Verified';
    $('#esSub').textContent = 'This email address has been verified.';
    $('#sendVerifyBtn').remove();
    $('#verifyPanel').classList.remove('open');
    clearInterval(resendTimer);
  }
  $('#confirmCodeBtn').addEventListener('click', function () {
    if (otpValue().length < 6) {
      otp.forEach(function (o) { if (!o.value) o.classList.add('invalid'); });
      toast('Enter all 6 digits');
      return;
    }
    markVerified();
    toast('Email verified');
  });

  /* Change email -> revalidate */
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  $('#updateEmailBtn').addEventListener('click', function () {
    var v = $('#emailInput').value.trim();
    var bad = !validEmail(v);
    $('#emailErr').classList.toggle('show', bad);
    $('#emailInput').classList.toggle('invalid', bad);
    if (bad) { $('#emailInput').focus(); return; }
    // new address needs re-verification
    emailStatus.classList.remove('is-verified');
    emailStatus.classList.add('is-unverified');
    $('#esIc').innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M10.3 4.3l-7 12A2 2 0 005 19.5h14a2 2 0 001.7-3.2l-7-12a2 2 0 00-3.4 0z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    $('#emailBadge').className = 'badge s-pending';
    $('#emailBadge').innerHTML = '<span class="d"></span>Unverified';
    $('.es-addr', emailStatus).childNodes[0].nodeValue = v + '\u00A0';
    $('#esSub').textContent = 'Verify this new address to keep receiving notifications and exports.';
    if (!$('#sendVerifyBtn')) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'btn btn-primary btn-sm'; b.id = 'sendVerifyBtn';
      b.textContent = 'Verify email'; b.addEventListener('click', openVerify);
      $('.es-action', emailStatus).appendChild(b);
    }
    flashSaved('emailSaved');
    toast('Email updated — please verify');
  });
  $('#emailInput').addEventListener('input', function () {
    $('#emailErr').classList.remove('show');
    $('#emailInput').classList.remove('invalid');
  });
  } /* end email verification (section removed) */

  /* ============================================================
     Country / Province / City — open data via countriesnow.space
     Cascade: country -> province/state -> city
     ============================================================ */
  var API = 'https://countriesnow.space/api/v0.1';
  var DEFAULT_COUNTRY = 'Indonesia';
  var DEFAULT_PROVINCE = 'West Java';
  var DEFAULT_CITY = 'Bandung';

  var FALLBACK_COUNTRIES = ['Indonesia', 'Philippines', 'Viet Nam', 'Kenya', 'Brazil',
    'India', 'Colombia', 'Mexico', 'Nigeria', 'Peru', 'United Kingdom', 'United States'];
  var FALLBACK_PROVINCES = {
    Indonesia: ['West Kalimantan', 'East Kalimantan', 'Central Kalimantan', 'West Java',
      'East Java', 'Bali', 'North Sumatra', 'Papua', 'South Sulawesi']
  };
  var FALLBACK_CITIES = {
    'West Kalimantan': ['Pontianak', 'Singkawang', 'Sambas', 'Ketapang', 'Sintang'],
    Indonesia: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Pontianak', 'Makassar', 'Semarang', 'Balikpapan']
  };

  var countrySel = $('#country');
  var provinceSel = $('#province');
  var citySel = $('#city');
  var countryBox = $('#countryBox');
  var provinceBox = $('#provinceBox');
  var cityBox = $('#cityBox');

  function fillSelect(sel, items, placeholder, selected) {
    sel.innerHTML = '';
    var ph = document.createElement('option');
    ph.value = ''; ph.textContent = placeholder; ph.disabled = true;
    if (!selected) ph.selected = true;
    sel.appendChild(ph);
    items.forEach(function (name) {
      var o = document.createElement('option');
      o.value = name; o.textContent = name;
      if (name === selected) o.selected = true;
      sel.appendChild(o);
    });
  }

  function resetCity(msg) {
    citySel.disabled = true;
    cityBox.classList.remove('loading');
    citySel.innerHTML = '<option value="">' + (msg || 'Select a province first') + '</option>';
    $('#cityHint').textContent = 'Cities update based on the selected province.';
  }

  /* ---- Countries ---- */
  function loadCountries() {
    fetch(API + '/countries/iso')
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (j) {
        var names = (j.data || []).map(function (d) { return d.name; })
          .filter(Boolean).sort(function (a, b) { return a.localeCompare(b); });
        if (!names.length) throw new Error('empty');
        countryBox.classList.remove('loading');
        countrySel.disabled = false;
        fillSelect(countrySel, names, 'Select country…', DEFAULT_COUNTRY);
        $('#countryHint').textContent = names.length + ' countries · live directory';
        loadProvinces(DEFAULT_COUNTRY, DEFAULT_PROVINCE, DEFAULT_CITY);
      })
      .catch(function () {
        countryBox.classList.remove('loading');
        countrySel.disabled = false;
        fillSelect(countrySel, FALLBACK_COUNTRIES, 'Select country…', DEFAULT_COUNTRY);
        $('#countryHint').textContent = 'Offline list — live directory unavailable';
        loadProvinces(DEFAULT_COUNTRY, DEFAULT_PROVINCE, DEFAULT_CITY);
      });
  }

  /* ---- Provinces / states ---- */
  function loadProvinces(country, preProv, preCity) {
    provinceSel.disabled = true;
    provinceBox.classList.add('loading');
    provinceSel.innerHTML = '<option>Loading provinces…</option>';
    $('#provinceHint').textContent = 'Loading provinces for ' + country + '…';
    resetCity('Select a province first');

    fetch(API + '/countries/states', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: country })
    })
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (j) {
        var states = ((j.data && j.data.states) || []).map(function (s) { return s.name; })
          .filter(Boolean).sort(function (a, b) { return a.localeCompare(b); });
        provinceBox.classList.remove('loading');
        if (!states.length) { provincesFallback(country, preProv, preCity); return; }
        provinceSel.disabled = false;
        var sel = preProv && states.indexOf(preProv) > -1 ? preProv : null;
        fillSelect(provinceSel, states, 'Select province / state…', sel);
        $('#provinceHint').textContent = states.length + ' provinces / states in ' + country;
        if (sel) loadCities(country, sel, preCity);
      })
      .catch(function () {
        provinceBox.classList.remove('loading');
        provincesFallback(country, preProv, preCity);
      });
  }

  function provincesFallback(country, preProv, preCity) {
    var fb = FALLBACK_PROVINCES[country] || [];
    if (fb.length) {
      provinceSel.disabled = false;
      var sel = preProv && fb.indexOf(preProv) > -1 ? preProv : null;
      fillSelect(provinceSel, fb, 'Select province / state…', sel);
      $('#provinceHint').textContent = 'Offline list for ' + country;
      if (sel) loadCities(country, sel, preCity);
    } else {
      // No subdivisions for this country — skip straight to cities by country
      provinceSel.disabled = true;
      provinceSel.innerHTML = '<option value="">No provinces — choose a city</option>';
      $('#provinceHint').textContent = country + ' has no province list — pick a city directly.';
      loadCities(country, null, preCity);
    }
  }

  /* ---- Cities ---- */
  function applyCities(cities, province, country, preCity, note) {
    cities = Array.from(new Set(cities)).sort(function (a, b) { return a.localeCompare(b); });
    cityBox.classList.remove('loading');
    citySel.disabled = false;
    fillSelect(citySel, cities, 'Select city…', preCity && cities.indexOf(preCity) > -1 ? preCity : null);
    $('#cityHint').textContent = note || (cities.length + ' cities' + (province ? ' in ' + province : ' in ' + country));
  }

  function cityStaticFallback(country, province, preCity) {
    cityBox.classList.remove('loading');
    citySel.disabled = false;
    var fb = FALLBACK_CITIES[province] || FALLBACK_CITIES[country] || [];
    if (fb.length) {
      fillSelect(citySel, fb, 'Select city…', preCity && fb.indexOf(preCity) > -1 ? preCity : null);
      $('#cityHint').textContent = 'Offline list' + (province ? ' for ' + province : '');
    } else {
      citySel.innerHTML = '<option value="">City list unavailable</option>';
      $('#cityHint').textContent = 'City list unavailable' + (province ? ' for ' + province : '');
    }
  }

  // fetch all cities in a country (used as fallback when a province has no data)
  function loadCountryCities(country, province, preCity) {
    fetch(API + '/countries/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: country })
    })
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (j) {
        var cities = (j.data || []).filter(Boolean);
        if (!cities.length) throw new Error('empty');
        applyCities(cities, null, country, preCity, cities.length + ' cities in ' + country);
      })
      .catch(function () { cityStaticFallback(country, province, preCity); });
  }

  function loadCities(country, province, preCity) {
    citySel.disabled = true;
    cityBox.classList.add('loading');
    citySel.innerHTML = '<option>Loading cities…</option>';
    $('#cityHint').textContent = 'Loading cities…';

    // no province (country has no subdivisions) -> straight to country cities
    if (!province) { loadCountryCities(country, null, preCity); return; }

    fetch(API + '/countries/state/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: country, state: province })
    })
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (j) {
        var cities = (j.data || []).filter(Boolean);
        // some provinces have no mapped cities in the dataset -> fall back to country list
        if (!cities.length) { loadCountryCities(country, province, preCity); return; }
        applyCities(cities, province, country, preCity);
      })
      .catch(function () { loadCountryCities(country, province, preCity); });
  }

  countrySel.addEventListener('change', function () {
    if (countrySel.value) loadProvinces(countrySel.value, null, null);
  });
  provinceSel.addEventListener('change', function () {
    if (provinceSel.value) loadCities(countrySel.value, provinceSel.value, null);
  });

  loadCountries();
})();

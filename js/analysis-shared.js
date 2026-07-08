/* ============================================================================
   analysis-shared.js — SINGLE SOURCE OF TRUTH for the Data Analyser content
   shared by:
     • interactive-map.html → Data Analyser step 2 (Site Characterisation),
       step 3 (Threat Profile) and step 5 (Potential Benefit)
     • project-detail.html  → Analysis tab (same three sections, driven by
       the page's own side navigation instead of the analyser tab bars)
   Edit the markup chunks or the behavior here and BOTH pages update.
   Styles live in css/analysis-shared.css (also loaded by both pages).

   Pages mark mount points with <div data-nbs="KEY"></div>; each placeholder
   is replaced by its chunk when this script loads, so include it AFTER the
   mount points and BEFORE the page's own inline script. Mount keys:
     site            → the 4 Site Characterisation context panes
     threat          → threat tab bar + sections            (interactive map)
     threat-sections → sections only, no tab bar            (project detail)
     benefit         → summary + tab bar + panels + foot    (interactive map)
     benefit-content → summary + panels + foot, no tab bar  (project detail)
   ============================================================================ */

const NBS_ANALYSIS = (() => {

/* ---- Step 2 — Site Characterisation context panes (exported Figma renders) ---- */
const site = `
        <div class="ctx-pane" data-ctx="general">
          <img src="assets/f01-step2/sc-general.webp" alt="Site Characterisation — General Context" />
        </div>
        <div class="ctx-pane" data-ctx="nature" hidden>
          <img src="assets/f01-step2/sc-nature.webp" alt="Site Characterisation — Nature Context" />
        </div>
        <div class="ctx-pane" data-ctx="people" hidden>
          <img src="assets/f01-step2/sc-people.webp" alt="Site Characterisation — People Context" />
        </div>
        <div class="ctx-pane" data-ctx="climate" hidden>
          <img src="assets/f01-step2/sc-climate.webp" alt="Site Characterisation — Climate Context" />
        </div>
`;

/* ---- Step 3 — Threats Profile & NbS Screening Overview ---- */
const threatTabs = `
          <div class="t3-tabs" id="t3Tabs" role="tablist" aria-label="Threat profile views">
            <button class="is-active" data-t3tab="overview"><svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg> Overview</button>
            <button data-t3tab="forest"><svg viewBox="0 0 24 24"><path d="M12 21V9"/><path d="M12 12c-3.6 0-6.3-2.7-6.3-6.3 3.6 0 6.3 2.7 6.3 6.3Z"/><path d="M12 10c0-3.4 2.5-6 6-6 0 3.4-2.6 6-6 6Z"/></svg> Forest</button>
            <button data-t3tab="mangrove"><svg viewBox="0 0 24 24"><path d="M12 20v-8"/><path d="M12 14c-2.8 0-4.8-2-4.8-4.8 2.8 0 4.8 2 4.8 4.8Z"/><path d="M12 12c0-2.8 2-4.8 4.8-4.8 0 2.8-2 4.8-4.8 4.8Z"/><path d="M8 20c1-2 2.5-2 4-2s3 0 4 2"/></svg> Mangrove</button>
            <button data-t3tab="peatland"><svg viewBox="0 0 24 24"><path d="M4 16h16M4 19.5h16"/><path d="M8 16v-5M12 16V6M16 16v-5"/><path d="M8 11c-1.2-.6-2-1.8-2-3.2M12 6c-1.4-.4-2.3-1.4-2.6-2.8M16 11c1.2-.6 2-1.8 2-3.2"/></svg> Peatland</button>
          </div>
`;

const threatSections = `
          <div class="t3-sections">

            <!-- ---------- OVERVIEW ---------- -->
            <div class="t3-sec" data-t3sec="overview">
              <div class="t3-metrics">
                <div class="t3-metric">
                  <span class="ic" style="background:#e8f5f1;color:#077f68"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg></span>
                  <div class="tx"><b>Total ecosystem area</b><span>100% of total area</span></div>
                  <div class="num">78,450 <small>ha</small></div>
                </div>
                <div class="t3-metric">
                  <span class="ic" style="background:#ffe8d9;color:#f3912a"><svg viewBox="0 0 24 24"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/></svg></span>
                  <div class="tx"><b>Total Disturbed area</b><span>24% of total area</span></div>
                  <div class="num">18,760 <small>ha</small></div>
                </div>
              </div>

              <div class="t3-ecos">
                <div class="t3-eco">
                  <div class="top"><span class="ic" style="background:#e6f0e0;color:#2c6639"><svg viewBox="0 0 24 24"><path d="M12 21V9"/><path d="M12 12c-3.6 0-6.3-2.7-6.3-6.3 3.6 0 6.3 2.7 6.3 6.3Z"/><path d="M12 10c0-3.4 2.5-6 6-6 0 3.4-2.6 6-6 6Z"/></svg></span><div><div class="nm">Dryland forest</div><div class="ha">36,220 <small>ha</small></div></div></div>
                  <div class="t3-bar"><span style="width:46%;background:#1b7a3b"></span></div>
                  <div class="cap">46% of total area</div>
                  <div class="kv"><span>Disturbed</span><b class="red">9,120 ha (25%)</b></div>
                  <div class="kv"><span>Main pressure</span><b>Agriculture expansion</b></div>
                </div>
                <div class="t3-eco">
                  <div class="top"><span class="ic" style="background:#ddf1ef;color:#1a9e96"><svg viewBox="0 0 24 24"><path d="M12 20v-8"/><path d="M12 14c-2.8 0-4.8-2-4.8-4.8 2.8 0 4.8 2 4.8 4.8Z"/><path d="M12 12c0-2.8 2-4.8 4.8-4.8 0 2.8-2 4.8-4.8 4.8Z"/><path d="M8 20c1-2 2.5-2 4-2s3 0 4 2"/></svg></span><div><div class="nm">Mangrove</div><div class="ha">22,580 <small>ha</small></div></div></div>
                  <div class="t3-bar"><span style="width:29%;background:#1a9e96"></span></div>
                  <div class="cap">29% of total area</div>
                  <div class="kv"><span>Disturbed</span><b class="red">5,430 ha (24%)</b></div>
                  <div class="kv"><span>Main pressure</span><b>Coastal conversion</b></div>
                </div>
                <div class="t3-eco">
                  <div class="top"><span class="ic" style="background:#f5efd2;color:#bea001"><svg viewBox="0 0 24 24"><path d="M4 16h16M4 19.5h16"/><path d="M8 16v-5M12 16V6M16 16v-5"/><path d="M8 11c-1.2-.6-2-1.8-2-3.2M12 6c-1.4-.4-2.3-1.4-2.6-2.8M16 11c1.2-.6 2-1.8 2-3.2"/></svg></span><div><div class="nm">Peatland</div><div class="ha">19,650 <small>ha</small></div></div></div>
                  <div class="t3-bar"><span style="width:13%;background:#594b00"></span><span style="width:12%;background:#bea001"></span></div>
                  <div class="cap">25% of total area</div>
                  <div class="t3-legend"><span><i style="background:#594b00"></i>Peat forest</span><span><i style="background:#bea001"></i>Peat non-forest</span></div>
                  <div class="kv"><span>Disturbed</span><b class="red">4,210 ha (21%)</b></div>
                  <div class="kv"><span>Main pressure</span><b>Drainage / fire risk</b></div>
                </div>
              </div>

              <div class="t3-card">
                <h4>Ecosystem disturbance map</h4>
                <div class="t3-map">
                  <img src="assets/f01-step3/disturbance-map.png" alt="Ecosystem disturbance map" />
                </div>
              </div>
            </div>

            <!-- ---------- DRYLAND FOREST ---------- -->
            <div class="t3-sec" data-t3sec="forest">
              <div class="t3-card">
                <div class="t3-echead" style="--ecobg:#e6f0e0;--ecoclr:#2c6639">
                  <span class="ic"><svg viewBox="0 0 24 24"><path d="M12 21V9"/><path d="M12 12c-3.6 0-6.3-2.7-6.3-6.3 3.6 0 6.3 2.7 6.3 6.3Z"/><path d="M12 10c0-3.4 2.5-6 6-6 0 3.4-2.6 6-6 6Z"/></svg></span>
                  <div><h4>Dryland Forest</h4><p>From 2015 to 2024, the selected dryland forest area lost [X] ha of forest cover.</p></div>
                </div>
                <div class="t3-stats cols5">
                  <div><span>Total area</span><b>36,220 ha</b></div>
                  <div><span>Remaining forest</span><b>24,260 ha</b></div>
                  <div><span>Disturbed</span><b class="org">9,120 ha (25%)</b></div>
                  <div><span>Forest loss</span><b class="red">2,840 ha (8%)</b></div>
                  <div><span>Forest gain</span><b class="grn">1,150 ha (3%)</b></div>
                </div>
                <div class="t3-alerts open">
                  <button class="t3-alerts__head">Disturbance alerts <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
                  <div class="t3-alerts__body">
                    <div class="t3-drivers">
                      <div>
                        <h5 class="c-non">Non-natural drivers (human caused)</h5>
                        <ul style="--dot:#077f68">
                          <li>Small-scale agriculture</li>
                          <li>Small-scale agriculture (fire)</li>
                          <li>Large-scale agriculture</li>
                          <li>Large-scale agriculture (fire)</li>
                          <li>Road development</li>
                          <li>Selective logging</li>
                          <li>Mining</li>
                        </ul>
                      </div>
                      <div>
                        <h5 class="c-nat">Natural drivers</h5>
                        <ul style="--dot:#1a9e96">
                          <li>Flooding</li>
                          <li>Forest fire</li>
                          <li>Drought</li>
                          <li>Typhoon</li>
                          <li>Landslide</li>
                          <li>Erosion</li>
                          <li>Extreme climate event</li>
                        </ul>
                      </div>
                      <div>
                        <h5 class="c-oth">Other drivers</h5>
                        <ul style="--dot:#bea001">
                          <li>Non-productive conversion</li>
                          <li>Unknown</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          <div class="t3-disc">
            <svg viewBox="0 0 26 26"><path d="M13 3.5 2.5 22h21L13 3.5Z"/><path d="M13 10v5" fill="none"/><circle cx="13" cy="18.2" r="1.1" fill="#efa22f" stroke="none"/></svg>
            <p><span style="font-weight:500">Disclaimer: </span><b>Field verification required</b><br>All the information in NbS Tool are purposed to support your pre-feasibility study. Always verify before use it!</p>
          </div>
            </div>

            <!-- ---------- MANGROVE ---------- -->
            <div class="t3-sec" data-t3sec="mangrove">
              <div class="t3-card">
                <div class="t3-echead" style="--ecobg:#ddf1ef;--ecoclr:#1a9e96">
                  <span class="ic"><svg viewBox="0 0 24 24"><path d="M12 20v-8"/><path d="M12 14c-2.8 0-4.8-2-4.8-4.8 2.8 0 4.8 2 4.8 4.8Z"/><path d="M12 12c0-2.8 2-4.8 4.8-4.8 0 2.8-2 4.8-4.8 4.8Z"/><path d="M8 20c1-2 2.5-2 4-2s3 0 4 2"/></svg></span>
                  <div><h4>Mangrove Disturbance</h4><p>From 2015 to 2024, the selected mangrove area experienced [X] ha of disturbance or cover change.</p></div>
                </div>
                <div class="t3-stats cols4">
                  <div><span>Total area</span><b>36,220 ha</b></div>
                  <div><span>Remaining mangrove Forest</span><b>24,260 ha</b></div>
                  <div><span>Disturbed</span><b class="org">9,120 ha (25%)</b></div>
                  <div><span>Main Pressure</span><b class="red">Commodities</b></div>
                </div>
                <div class="t3-alerts open">
                  <button class="t3-alerts__head">Disturbance alerts <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
                  <div class="t3-alerts__body">
                    <div class="t3-drivers">
                      <div>
                        <h5 class="c-non">Non-natural drivers (human caused)</h5>
                        <ul style="--dot:#077f68">
                          <li>Commodities</li>
                          <li>Settlement</li>
                        </ul>
                      </div>
                      <div>
                        <h5 class="c-nat">Natural drivers</h5>
                        <ul style="--dot:#1a9e96">
                          <li>Erosion</li>
                          <li>Extreme climate event</li>
                        </ul>
                      </div>
                      <div>
                        <h5 class="c-oth">Other drivers</h5>
                        <ul style="--dot:#bea001">
                          <li>Non-productive conversion</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          <div class="t3-disc">
            <svg viewBox="0 0 26 26"><path d="M13 3.5 2.5 22h21L13 3.5Z"/><path d="M13 10v5" fill="none"/><circle cx="13" cy="18.2" r="1.1" fill="#efa22f" stroke="none"/></svg>
            <p><span style="font-weight:500">Disclaimer: </span><b>Field verification required</b><br>All the information in NbS Tool are purposed to support your pre-feasibility study. Always verify before use it!</p>
          </div>
            </div>

            <!-- ---------- PEATLAND ---------- -->
            <div class="t3-sec" data-t3sec="peatland">
              <div class="t3-card">
                <div class="t3-echead" style="--ecobg:#f5efd2;--ecoclr:#bea001">
                  <span class="ic"><svg viewBox="0 0 24 24"><path d="M4 16h16M4 19.5h16"/><path d="M8 16v-5M12 16V6M16 16v-5"/><path d="M8 11c-1.2-.6-2-1.8-2-3.2M12 6c-1.4-.4-2.3-1.4-2.6-2.8M16 11c1.2-.6 2-1.8 2-3.2"/></svg></span>
                  <div><h4>Peatland disturbance</h4><p>This peatland area shows possible drainage pressure that may be caused by canal networks</p></div>
                </div>
                <div class="t3-stats cols4">
                  <div><span>Total area</span><b>36,220 ha</b></div>
                  <div><span>Remaining peatland forest</span><b>24,260 ha</b></div>
                  <div><span>Disturbed</span><b class="org">9,120 ha (25%)</b></div>
                  <div><span>Converted/Loss</span><b class="red">2,840 ha (8%)</b></div>
                </div>
                <div class="t3-alerts open">
                  <button class="t3-alerts__head">Disturbance alerts <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
                  <div class="t3-alerts__body">
                    <div class="t3-minis">
                      <div class="t3-mini">
                        <span class="ic" style="background:#f5efd2;color:#bea001"><svg viewBox="0 0 24 24"><path d="M3 17c1.5 0 2.2-1 3.5-1s2 1 3.5 1 2.2-1 3.5-1 2 1 3.5 1 2.2-1 3.5-1"/><path d="M6 13l6-7 6 7M12 6v7"/></svg></span>
                        <div class="tx"><span>Canal proximity</span><b>High</b><small>Within 1–2 km</small></div>
                      </div>
                      <div class="t3-mini">
                        <span class="ic" style="background:#ffe8d9;color:#f3912a"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg></span>
                        <div class="tx"><span>Drainage pressure</span><b>High</b><small>High risk</small></div>
                      </div>
                      <div class="t3-mini">
                        <span class="ic" style="background:#fdecec;color:#d94a3d"><svg viewBox="0 0 24 24"><path d="M12 22c4 0 7-2.6 7-6.5 0-3-2-5.4-3-7-.4 1.6-1.4 2.5-2.4 2.8C14 8 13 4.5 10.5 2 11 5 8 6.5 6.5 9.5 5.6 11.2 5 13 5 15.5 5 19.4 8 22 12 22Z"/></svg></span>
                        <div class="tx"><span>Fire risk</span><b>High</b><small>Peat fire prone</small></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          <div class="t3-disc">
            <svg viewBox="0 0 26 26"><path d="M13 3.5 2.5 22h21L13 3.5Z"/><path d="M13 10v5" fill="none"/><circle cx="13" cy="18.2" r="1.1" fill="#efa22f" stroke="none"/></svg>
            <p><span style="font-weight:500">Disclaimer: </span><b>Field verification required</b><br>All the information in NbS Tool are purposed to support your pre-feasibility study. Always verify before use it!</p>
          </div>
            </div>

          </div>
`;

/* ---- Step 5 — Potential Benefit (F02-P5) ---- */
const benefitSummary = `
  <header class="summary">
    <div class="sum-top">
      <span class="sum-eyebrow"><span class="fdot"></span>Estimated impact</span>
      <span class="wex">Illustrative worked example</span>
    </div>
    <h1 class="sum-title">Benefit Summary</h1>
    <p class="sum-sub">High-level overview of total estimated impact across all pathways and activities for this project area.</p>
    <div class="sum-grid">
      <div class="carbon-box">
        <div class="carbon-val">145,211 <small>tCO&#8322;e</small></div>
        <div class="carbon-lab">Total estimated carbon benefit over project duration</div>
        <span class="carbon-rate"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/></svg>&asymp; 4,840 tCO&#8322;e / year</span>
      </div>
      <div class="stat-grid">
        <div class="stat"><span class="stat-val">9</span><span class="stat-lab">NbS activities</span></div>
        <div class="stat"><span class="stat-val">30 yr</span><span class="stat-lab">Duration</span></div>
        <div class="stat"><span class="stat-val">1,200 ha</span><span class="stat-lab">Project area</span></div>
        <div class="stat"><span class="stat-val">6</span><span class="stat-lab">Communities</span></div>
        <div class="stat pathways">
          <span class="stat-lab">Selected pathways &middot; area allocated</span>
          <div class="pchips">
            <span class="pchip p"><b>Protect</b><span>620 ha</span></span>
            <span class="pchip m"><b>Manage</b><span>320 ha</span></span>
            <span class="pchip r"><b>Restore</b><span>260 ha</span></span>
          </div>
        </div>
      </div>
    </div>
  </header>
`;

const benefitTabs = `
  <nav class="tabs" role="tablist">
    <button class="tab" data-tab="nature" role="tab"><svg class="ic" width="17" height="17" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507"/></svg>Nature<span class="cnt">5</span></button>
    <button class="tab active" data-tab="people" role="tab"><svg class="ic" width="17" height="17" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/></svg>People<span class="cnt">5</span></button>
    <button class="tab" data-tab="climate" role="tab"><svg class="ic" width="17" height="17" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5"/>
  <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5"/></svg>Climate<span class="cnt">4</span></button>
  </nav>
`;

const benefitPanels = `
  <section class="tabpanel" id="nature" role="tabpanel">
    <div class="panel-intro">
      <span class="pi-ic"><svg class="ic" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507"/></svg></span>
      <span class="pi-txt">Ecological outcomes from conserving, restoring, and sustainably managing this ecosystem.</span>
      <span class="pi-anchor">
        <span class="pi-a"><span class="v">880 ha</span><span class="l">Connected</span></span>
        <span class="pi-a"><span class="v">620 ha</span><span class="l">Safeguarded</span></span>
      </span>
    </div>
    <article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h1A1.5 1.5 0 0 1 5 2.5h4.134a1 1 0 1 1 0 1h-2.01q.269.27.484.605C8.246 5.097 8.5 6.459 8.5 8c0 1.993.257 3.092.713 3.7.356.476.895.721 1.787.784A1.5 1.5 0 0 1 12.5 11h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5H6.866a1 1 0 1 1 0-1h1.711a3 3 0 0 1-.165-.2C7.743 11.407 7.5 10.007 7.5 8c0-1.46-.246-2.597-.733-3.355-.39-.605-.952-1-1.767-1.112A1.5 1.5 0 0 1 3.5 5h-1A1.5 1.5 0 0 1 1 3.5zM2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10 10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/></svg></span>
        <div class="card-tt"><h3>Maintenance of ecological connectivity</h3><div class="tagrow"><span class="pw pw-gen">General</span><span class="qbadge"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>Quantifiable</span></div></div>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">880</span><span class="munit">ha</span></div><div class="metric-lab">contiguous habitat kept connected</div></div><p class="def">The preservation, restoration, and safeguarding of continuous physical and structural pathways across a landscape, allowing the unhindered movement of species, genetic exchange, and ecological processes between fragmented habitats.</p><div class="narr"><span class="narr-lab"><svg class="nchev" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>Estimated statement</span><p>Conserving this <b>forest</b> ecosystem maintains ecological connectivity across an estimated <b>880 ha</b> of contiguous habitat, reducing fragmentation over the project&rsquo;s <b>30-year</b> duration.</p></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65"/></svg></span>
        <div class="card-tt"><h3>Protection of watershed function</h3><div class="tagrow"><span class="pw pw-gen">General</span><span class="qbadge"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>Quantifiable</span></div></div>
      </div>
      <div class="es-row"><div class="es"><span class="es-lab">Reducing</span><span class="es-val">0.1%</span><span class="es-sub">potential erosion</span></div><div class="es"><span class="es-lab">Improving</span><span class="es-val">1.2%</span><span class="es-sub">water yield</span></div></div><p class="def">The preservation and restoration of a landscape&rsquo;s natural capacity to capture, store, filter, and safely release water &mdash; regulating hydrological cycles, mitigating floods, and maintaining downstream water quality.</p>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826M8 1a1 1 0 0 0-.998 1.03l.01.091q.017.116.054.296c.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a5 5 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1M2 9l.03-.002.091-.01a5 5 0 0 0 .296-.054c.241-.049.542-.122.887-.213a61 61 0 0 0 2.314-.676L5.762 8l-.144-.045a61 61 0 0 0-2.314-.676 17 17 0 0 0-.887-.213 5 5 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2m7 5-.002-.03a5 5 0 0 0-.064-.386 16 16 0 0 0-.213-.888 61 61 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a5 5 0 0 0-.064.386L7 14a1 1 0 1 0 2 0m-5.696-2.134.025-.017a5 5 0 0 0 .303-.248c.184-.164.408-.377.661-.629A61 61 0 0 0 5.96 9.23l.103-.111-.147.033a61 61 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5 5 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027q.014-.03.036-.084a5 5 0 0 0 .102-.283c.078-.233.165-.53.258-.874a61 61 0 0 0 .572-2.343l.033-.147-.11.102a61 61 0 0 0-1.743 1.667 17 17 0 0 0-.629.66 5 5 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366m9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a5 5 0 0 0-.303.248 17 17 0 0 0-.661.629A61 61 0 0 0 10.04 6.77l-.102.111.147-.033a61 61 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a5 5 0 0 0 .367-.138zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027q-.014.03-.036.084a5 5 0 0 0-.102.283c-.078.233-.165.53-.258.875a61 61 0 0 0-.572 2.342l-.033.147.11-.102a61 61 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5 5 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366M14 9a1 1 0 0 0 0-2l-.03.002a5 5 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a5 5 0 0 0 .386.064zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035q.108.045.283.103c.233.078.53.165.874.258a61 61 0 0 0 2.343.572l.147.033-.103-.111a61 61 0 0 0-1.666-1.742 17 17 0 0 0-.66-.629 5 5 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366m2.196-1.196.017.025a5 5 0 0 0 .248.303c.164.184.377.408.629.661A61 61 0 0 0 6.77 5.96l.111.102-.033-.147a61 61 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5 5 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1m9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a61 61 0 0 0-2.342-.572l-.147-.033.102.111a61 61 0 0 0 1.667 1.742c.253.252.477.465.66.629a5 5 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366m-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5 5 0 0 0-.248-.303 17 17 0 0 0-.629-.661A61 61 0 0 0 9.23 10.04l-.111-.102.033.147a61 61 0 0 0 .572 2.342c.093.345.18.642.258.875a5 5 0 0 0 .138.367zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/></svg></span>
        <div class="card-tt"><h3>Enhanced biodiversity &amp; ecosystem function</h3><div class="tagrow"><span class="pw pw-gen">General</span><span class="qbadge"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>Quantifiable</span></div></div>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">620</span><span class="munit">ha</span></div><div class="metric-lab">suitable habitat safeguarded vs. BAU</div></div><p class="def">The systemic recovery of species richness, abundance, and complex ecological interactions &mdash; producing a resilient ecosystem capable of self-regulation and intense carbon sequestration.</p><div class="narr"><span class="narr-lab"><svg class="nchev" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>Estimated statement</span><p>Conserving this <b>forest</b> ecosystem safeguards an estimated <b>620 ha</b> of suitable habitat versus a business-as-usual scenario, avoiding roughly <b>174 ha</b> of habitat loss over the project&rsquo;s <b>30-year</b> duration.</p></div><div class="formula"><code>avoided_loss_ha = &Sigma; (habitat pixel area &times; deforestation risk) across the project area</code></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/></svg></span>
        <div class="card-tt"><h3>Reduced vulnerability to fire, pests &amp; disease</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="qbadge"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>Quantifiable</span></div></div>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">23</span><span class="munit">species</span></div><div class="metric-lab">reduced extinction risk (IUCN STAR)</div></div><p class="def">The systemic enhancement of ecosystem and community resilience against catastrophic environmental disturbances, biological infestations, and climate-driven pathogens.</p><div class="narr"><span class="narr-lab"><svg class="nchev" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>Estimated statement</span><p>Protecting this ecosystem can reduce extinction risk for an estimated <b>23</b> threatened species&rsquo; habitat over <b>30 years</b> of project duration.</p></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/></svg></span>
        <div class="card-tt"><h3>Improved forest productivity &amp; regeneration</h3><div class="tagrow"><span class="pw pw-restore">Restore</span><span class="pw pw-manage">Manage</span><span class="qbadge"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>Quantifiable</span></div></div>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">580</span><span class="munit">ha</span></div><div class="metric-lab">under active restoration &amp; management</div></div><p class="def">The measurable acceleration of natural or assisted ecological growth, biomass accumulation, and structural recovery within a forest ecosystem over time.</p><div class="narr"><span class="narr-lab"><svg class="nchev" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>Estimated statement</span><p>Restoring and sustainably managing this <b>forest</b> ecosystem can contribute to the recovery of an estimated <b>17</b> threatened species&rsquo; habitat over <b>30 years</b> of project duration.</p></div>
    </article>
  </section>

  <section class="tabpanel active" id="people" role="tabpanel">
    <div class="panel-intro">
      <span class="pi-ic"><svg class="ic" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/></svg></span>
      <span class="pi-txt">Social outcomes for communities. Each card shows a <b>general benefit</b> &mdash; tap it to run a short <b>assessment</b> and turn it into a project-specific statement.</span>
      <span class="pi-anchor">
        <span class="pi-a"><span class="v">3,400</span><span class="l">Beneficiaries</span></span>
        <span class="pi-a"><span class="v">850</span><span class="l">Households</span></span>
      </span>
    </div>
    <div class="fgrid"><article class="fcard" data-key="food_water" data-mode="single">
      <div class="fcard-inner">
        <div class="face front">
          <span class="corner"></span>
          <span class="flip-tab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Assess</span>
          <div class="card-head">
            <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
  <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/></svg></span>
            <div class="card-tt"><h3>Enhanced food &amp; water security</h3><div class="tagrow"><span class="pw pw-gen">General</span></div></div>
          </div>
          <div class="front-default">
            <span class="face-lab">General benefit</span>
            <p class="def">The guaranteed year-round, climate-resilient community access to critical nutritional and hydrological resources by stabilizing and restoring vital ecosystem functions.</p>
          </div>
          <div class="front-answered" hidden>
            <span class="face-lab answered"><svg class="ic" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>Your benefit statement</span>
            <p class="statement"></p>
            <p class="answer-echo"></p>
          </div>
          <div class="cta"><span class="cta-txt"><span class="c-def">Tap to assess this benefit</span><span class="c-ans" hidden>Re-assess</span></span><svg class="cta-chev" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></div>
        </div>
        <div class="face back">
          <span class="corner"></span>
          <div class="back-head">
            <button class="back-btn" type="button" aria-label="Back"><svg class="chev-back" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></button>
            <span class="face-lab back-lab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Benefit assessment</span>
          </div>
          <p class="prompt">Do households have year-round access to clean water and sufficient food?</p>
          <div class="opts"><button class="opt" type="button" data-statement="Maintain food and water security" data-answer="Yes"><span class="opt-radio"></span><span class="opt-lab">Yes</span></button><button class="opt" type="button" data-statement="Enhance food and water security" data-answer="No"><span class="opt-radio"></span><span class="opt-lab">No</span></button></div>
          
        </div>
      </div>
    </article><article class="fcard" data-key="livelihood" data-mode="multi">
      <div class="fcard-inner">
        <div class="face front">
          <span class="corner"></span>
          <span class="flip-tab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Assess</span>
          <div class="card-head">
            <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6z"/></svg></span>
            <div class="card-tt"><h3>Sustainable livelihood opportunities</h3><div class="tagrow"><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div>
          </div>
          <div class="front-default">
            <span class="face-lab">General benefit</span>
            <p class="def">The generation of climate-adaptive, nature-positive revenue streams that allow households to withstand economic shocks without degrading or depleting the local natural resource base.</p>
          </div>
          <div class="front-answered" hidden>
            <span class="face-lab answered"><svg class="ic" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>Your benefit statement</span>
            <p class="statement"></p>
            <p class="answer-echo"></p>
          </div>
          <div class="cta"><span class="cta-txt"><span class="c-def">Tap to assess this benefit</span><span class="c-ans" hidden>Re-assess</span></span><svg class="cta-chev" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></div>
        </div>
        <div class="face back">
          <span class="corner"></span>
          <div class="back-head">
            <button class="back-btn" type="button" aria-label="Back"><svg class="chev-back" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></button>
            <span class="face-lab back-lab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Benefit assessment</span>
          </div>
          <p class="prompt">Which of the following best describes most households&rsquo; primary source of livelihood?</p>
          <div class="opts"><label class="optm"><input type="checkbox" value="NTFP"><span class="optm-box"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg></span><span class="optm-body"><span class="optm-lab">NTFP</span><span class="optm-desc">Harvesting and selling Non-Timber Forest Products (fruits, nuts, medicinal plants, resin) integrated into the forest mix.</span></span></label><label class="optm"><input type="checkbox" value="Nursery work"><span class="optm-box"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg></span><span class="optm-body"><span class="optm-lab">Nursery work</span><span class="optm-desc">Seedling production &mdash; soil preparation, bagging, watering, and weeding.</span></span></label><label class="optm"><input type="checkbox" value="Planting work"><span class="optm-box"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg></span><span class="optm-body"><span class="optm-lab">Planting work</span><span class="optm-desc">Site preparation, transporting seedlings, digging, and planting.</span></span></label><label class="optm optm-none"><input type="checkbox" value="__none__"><span class="optm-box"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg></span><span class="optm-body"><span class="optm-lab">None of the above</span></span></label></div>
          <button class="apply" type="button">Apply assessment</button>
        </div>
      </div>
    </article><article class="fcard" data-key="social" data-mode="single">
      <div class="fcard-inner">
        <div class="face front">
          <span class="corner"></span>
          <span class="flip-tab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Assess</span>
          <div class="card-head">
            <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/></svg></span>
            <div class="card-tt"><h3>Strengthened social capital &amp; governance</h3><div class="tagrow"><span class="pw pw-gen">General</span></div></div>
          </div>
          <div class="front-default">
            <span class="face-lab">General benefit</span>
            <p class="def">The advancement of community cohesion, institutional trust, and localized legislative and operational capacity to independently manage resources, enforce laws, and resolve conflicts.</p>
          </div>
          <div class="front-answered" hidden>
            <span class="face-lab answered"><svg class="ic" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>Your benefit statement</span>
            <p class="statement"></p>
            <p class="answer-echo"></p>
          </div>
          <div class="cta"><span class="cta-txt"><span class="c-def">Tap to assess this benefit</span><span class="c-ans" hidden>Re-assess</span></span><svg class="cta-chev" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></div>
        </div>
        <div class="face back">
          <span class="corner"></span>
          <div class="back-head">
            <button class="back-btn" type="button" aria-label="Back"><svg class="chev-back" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></button>
            <span class="face-lab back-lab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Benefit assessment</span>
          </div>
          <p class="prompt">To what extent has the project strengthened local social capital and governance capacity (community trust, leadership, and collective decision-making)?</p>
          <div class="opts"><button class="opt" type="button" data-statement="Sustain social capital and governance capacity" data-answer="Local institutions and leaders now manage resources independentl"><span class="opt-radio"></span><span class="opt-lab">Local institutions and leaders now manage resources independently, trust within the community has grown, and collective decision-making is strong and inclusive.</span></button><button class="opt" type="button" data-statement="Optimise social capital and governance capacity" data-answer="Community groups or leadership exist, but they still heavily rel"><span class="opt-radio"></span><span class="opt-lab">Community groups or leadership exist, but they still heavily rely on outside support to resolve conflicts, make decisions, or manage resources effectively.</span></button><button class="opt" type="button" data-statement="Convene social capital and governance capacity" data-answer="There has been no meaningful improvement in community cooperatio"><span class="opt-radio"></span><span class="opt-lab">There has been no meaningful improvement in community cooperation, trust, or leadership capacity; decision-making remains weak or fragmented.</span></button></div>
          
        </div>
      </div>
    </article><article class="fcard" data-key="equity" data-mode="single">
      <div class="fcard-inner">
        <div class="face front">
          <span class="corner"></span>
          <span class="flip-tab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Assess</span>
          <div class="card-head">
            <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793zm1 0V7.5h6.482A7 7 0 0 0 8.5 1.018M14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"/></svg></span>
            <div class="card-tt"><h3>Equitable benefit-sharing mechanisms</h3><div class="tagrow"><span class="pw pw-gen">General</span></div></div>
          </div>
          <div class="front-default">
            <span class="face-lab">General benefit</span>
            <p class="def">The establishment of transparent, inclusive, and legally binding institutional frameworks that distribute project-generated rewards and resource rights fairly while actively preventing elite capture.</p>
          </div>
          <div class="front-answered" hidden>
            <span class="face-lab answered"><svg class="ic" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>Your benefit statement</span>
            <p class="statement"></p>
            <p class="answer-echo"></p>
          </div>
          <div class="cta"><span class="cta-txt"><span class="c-def">Tap to assess this benefit</span><span class="c-ans" hidden>Re-assess</span></span><svg class="cta-chev" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></div>
        </div>
        <div class="face back">
          <span class="corner"></span>
          <div class="back-head">
            <button class="back-btn" type="button" aria-label="Back"><svg class="chev-back" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></button>
            <span class="face-lab back-lab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Benefit assessment</span>
          </div>
          <p class="prompt">How transparent is the process for distributing financial and non-financial benefits to local stakeholders?</p>
          <div class="opts"><button class="opt" type="button" data-statement="Maintain equitable benefit-sharing mechanism" data-answer="Highly Transparent  distribution rules, financial records, and b"><span class="opt-radio"></span><span class="opt-lab">Highly Transparent &mdash; distribution rules, financial records, and beneficiary lists are fully public, clearly understood, and easy to access.</span></button><button class="opt" type="button" data-statement="Increase equitable benefit-sharing mechanism" data-answer="Partially Transparent  some information is shared, but the exact"><span class="opt-radio"></span><span class="opt-lab">Partially Transparent &mdash; some information is shared, but the exact criteria for who gets how much remains unclear to most people.</span></button><button class="opt" type="button" data-statement="Establish equitable benefit-sharing mechanism" data-answer="Not Transparent  the process is handled behind closed doors with"><span class="opt-radio"></span><span class="opt-lab">Not Transparent &mdash; the process is handled behind closed doors with no clear records or community oversight.</span></button></div>
          
        </div>
      </div>
    </article><article class="fcard" data-key="tenure" data-mode="single">
      <div class="fcard-inner">
        <div class="face front">
          <span class="corner"></span>
          <span class="flip-tab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Assess</span>
          <div class="card-head">
            <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg></span>
            <div class="card-tt"><h3>Land tenure &amp; cultural heritage</h3><div class="tagrow"><span class="pw pw-protect">Protect</span></div></div>
          </div>
          <div class="front-default">
            <span class="face-lab">General benefit</span>
            <p class="def">The formalization, legal protection, and enforcement of a community&rsquo;s rights to possess, use, and manage land and natural resources &mdash; safeguarding customary traditions, sacred sites, and knowledge tied to the landscape.</p>
          </div>
          <div class="front-answered" hidden>
            <span class="face-lab answered"><svg class="ic" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>Your benefit statement</span>
            <p class="statement"></p>
            <p class="answer-echo"></p>
          </div>
          <div class="cta"><span class="cta-txt"><span class="c-def">Tap to assess this benefit</span><span class="c-ans" hidden>Re-assess</span></span><svg class="cta-chev" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></div>
        </div>
        <div class="face back">
          <span class="corner"></span>
          <div class="back-head">
            <button class="back-btn" type="button" aria-label="Back"><svg class="chev-back" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></button>
            <span class="face-lab back-lab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Benefit assessment</span>
          </div>
          <p class="prompt">What is the status of land tenure formalization for Indigenous Peoples and Local Communities (IPLCs) within the project area?</p>
          <div class="opts"><button class="opt" type="button" data-statement="Preserve land security, resource tenure and cultural heritage preservation" data-answer="Explicit legal titles are fully recognized and enforced."><span class="opt-radio"></span><span class="opt-lab">Explicit legal titles are fully recognized and enforced.</span></button><button class="opt" type="button" data-statement="Increase enforcement of land security, resource tenure and cultural heritage preservation" data-answer="Legal recognition exists, but enforcement / boundary disputes ar"><span class="opt-radio"></span><span class="opt-lab">Legal recognition exists, but enforcement / boundary disputes are common.</span></button><button class="opt" type="button" data-statement="Establish legal recognition of land security, resource tenure and cultural heritage preservation" data-answer="Customary rights are recognized informally, but no legal titles "><span class="opt-radio"></span><span class="opt-lab">Customary rights are recognized informally, but no legal titles exist.</span></button><button class="opt" type="button" data-statement="Recognise land security, resource tenure and cultural heritage preservation" data-answer="Land tenure is insecure or unrecognized."><span class="opt-radio"></span><span class="opt-lab">Land tenure is insecure or unrecognized.</span></button></div>
          
        </div>
      </div>
    </article></div>
  </section>

  <section class="tabpanel" id="climate" role="tabpanel">
    <div class="panel-intro">
      <span class="pi-ic"><svg class="ic" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5"/>
  <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5"/></svg></span>
      <span class="pi-txt">Climate-mitigation and disaster-risk outcomes across the project area.</span>
      <span class="pi-anchor">
        <span class="pi-a"><span class="v">42,011</span><span class="l">tCO&#8322;e avoided</span></span>
        <span class="pi-a"><span class="v">103,200</span><span class="l">tCO&#8322;e stored</span></span>
      </span>
    </div>
    <article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M8 14.933a1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/></svg></span>
        <div class="card-tt"><h3>Enhanced resilience to climate hazards</h3><div class="tagrow"><span class="pw pw-gen">General</span><span class="qbadge"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>Quantifiable</span></div></div>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">3,400</span><span class="munit">people</span></div><div class="metric-lab">at reduced disaster exposure</div></div><p class="def">The reduction in people&rsquo;s and assets&rsquo; exposure to climate hazards achieved by using healthy ecosystems as natural buffers.</p><div class="narr"><span class="narr-lab"><svg class="nchev" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>Estimated statement</span><p>Implementing NbS here reduces disaster exposure across an estimated <b>1,200 ha</b>, helping lower risk for an estimated <b>3,400 people</b> (&asymp; <b>850 households</b>) across <b>6 communities</b> over the project&rsquo;s <b>30-year</b> duration.</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg><span>ADPC Climate Disaster Risk &middot; SIGnal Forest Cover &middot; Gridded World Pop</span></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
  <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/></svg></span>
        <div class="card-tt"><h3>Microclimate regulation</h3><div class="tagrow"><span class="pw pw-gen">General</span><span class="qbadge"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>Quantifiable</span></div></div>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">580</span><span class="munit">ha</span></div><div class="metric-lab">tree-cover increase (&asymp; 48% of AOI)</div></div><p class="def">The moderation of local temperatures by vegetation &mdash; through canopy shading and evapotranspiration &mdash; buffering the area within and around it against heat extremes.</p><div class="narr"><span class="narr-lab"><svg class="nchev" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>Estimated statement</span><p>Conserving this <b>forest</b> ecosystem, with an estimated <b>580 ha</b> of tree-cover increase (&asymp; <b>48%</b> of the AOI), helps regulate the local microclimate and buffers the surrounding area against heat extremes over the project&rsquo;s <b>30-year</b> duration.</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg><span>SIGnal forest-cover benchmark &middot; De&nbsp;Frenne et&nbsp;al. (2019), <i>Nature Ecology &amp; Evolution</i></span></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M3.112 5.112a3 3 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447q0-.113.018-.231zm2.55-1.45-.725-.725A5.5 5.5 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z"/>
  <path d="m13.646 14.354-12-12 .708-.708 12 12z"/></svg></span>
        <div class="card-tt"><h3>Reduced emissions from deforestation &amp; degradation</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="qbadge"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>Quantifiable</span></div></div>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">42,011</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">avoided over the project duration</div></div><p class="def">The greenhouse-gas emissions avoided by protecting this ecosystem from deforestation or degradation &mdash; keeping stored carbon locked in vegetation and soil rather than released to the atmosphere.</p><div class="narr"><span class="narr-lab"><svg class="nchev" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>Estimated statement</span><p>Protecting this <b>forest</b> ecosystem through the selected activities can avoid an estimated <b>42,011 t CO&#8322;e</b> of emissions over the <b>30 years</b> of project duration.</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg><span>Through: boundary demarcation &amp; legal recognition; community-based patrol; fire prevention &amp; early warning</span></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/></svg></span>
        <div class="card-tt"><h3>Increased carbon sequestration &amp; storage</h3><div class="tagrow"><span class="pw pw-restore">Restore</span><span class="pw pw-manage">Manage</span><span class="qbadge"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>Quantifiable</span></div></div>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">103,200</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">sequestered over the project duration</div></div><p class="def">The additional greenhouse gases removed from the atmosphere as this ecosystem is restored or sustainably managed &mdash; drawing carbon into growing vegetation and soil where it is stored over time.</p><div class="narr"><span class="narr-lab"><svg class="nchev" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>Estimated statement</span><p>Restoring and sustainably managing this <b>forest</b> ecosystem can sequester an estimated <b>103,200 t CO&#8322;e</b> over the project&rsquo;s <b>30-year</b> duration (68,640 restore + 34,560 manage).</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg><span>Cook-Patton et&nbsp;al. (2020) natural-regrowth rates &middot; assisted regeneration, enrichment planting, agroforestry</span></div>
    </article>
  </section>
`;

const benefitFoot = `
  <div class="foot">
    <div class="disc" id="disc">
      <button class="disc-btn" type="button">
        <span class="warn"><svg class="ic" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg></span>Assumptions, methodology &amp; disclaimer<svg class="tgl" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>
      </button>
      <div class="disc-body">
        <p>Figures are an <b>illustrative worked example</b> for a 1,200 ha / 30-year project (Protect 620 ha, Manage 320 ha, Restore 260 ha). Carbon uses a forest stock of ~154 tC/ha with <b>0.4%/yr</b> avoided deforestation (Protect) and natural-regrowth sequestration of <b>8.8</b> (Restore) / <b>3.6</b> (Manage) tCO&#8322;e/ha/yr &mdash; giving <code>42,011 avoided + 103,200 sequestered = 145,211 tCO&#8322;e</code>.</p>
        <p>Quantifiable benefits are limited by the availability of adequate project-level data; to firm up the numbers, collect data following the <b>Monitoring Plan</b> guidance. Scores are <b>qualitative indicators</b>, not certified outputs. Sources: Cook-Patton et&nbsp;al. (2020), SIGnal, ADPC, Gridded World Pop &middot; <b>ASEAN NbS / EbA toolkit</b>.</p>
      </div>
    </div>
  </div>
`;

return {
  'site': site,
  'threat': threatTabs + threatSections,
  'threat-sections': threatSections,
  'benefit': benefitSummary + benefitTabs + benefitPanels + benefitFoot,
  'benefit-content': benefitSummary + benefitPanels + benefitFoot,
};
})();

/* Inject the chunks — each <div data-nbs="KEY"> placeholder is replaced. */
document.querySelectorAll('[data-nbs]').forEach(function(el){
  var html = NBS_ANALYSIS[el.dataset.nbs];
  if (html) el.outerHTML = html;
});

/* ---- Site Characterisation: show one context pane (general|nature|people|climate) ---- */
function nbsShowSitePane(root, key){
  root.querySelectorAll('.ctx-pane').forEach(function(p){ p.hidden = p.dataset.ctx !== key; });
}

/* ---- Threat Profile behavior: section switching (Overview shows all sections)
   + collapsible disturbance alerts. root wraps .t3-sections (and, on the
   interactive map, the .t3-tabs bar — wired here when present). ---- */
function nbsInitThreat(root, onShow){
  if (!root) return null;
  function show(key){
    root.querySelectorAll('[data-t3sec]').forEach(function(s){ s.hidden = key !== 'overview' && s.dataset.t3sec !== key; });
    root.querySelectorAll('.t3-tabs [data-t3tab]').forEach(function(t){ t.classList.toggle('is-active', t.dataset.t3tab === key); });
    if (onShow) onShow(key);
  }
  root.querySelectorAll('.t3-tabs [data-t3tab]').forEach(function(tb){ tb.addEventListener('click', function(){ show(tb.dataset.t3tab); }); });
  root.querySelectorAll('.t3-alerts__head').forEach(function(h){ h.addEventListener('click', function(){ h.closest('.t3-alerts').classList.toggle('open'); }); });
  return { show: show };
}

/* ---- Potential Benefit behavior: category switching, flip-card assessments,
   card sizing and the methodology disclaimer. root wraps the mounted benefit
   chunk (the .p5 element). Category tabs are wired when present. ---- */
function nbsInitBenefit(root){
  if (!root) return null;
  var tabs = [].slice.call(root.querySelectorAll('.tabs .tab'));
  var panels = [].slice.call(root.querySelectorAll('.tabpanel'));
  var cards = [].slice.call(root.querySelectorAll('.fcard'));

  function faceHeight(face){ var s=face.style, pp=s.position, pv=s.visibility;
    s.position='relative'; s.visibility='hidden'; s.height='auto';
    var h=face.offsetHeight; s.position=pp; s.visibility=pv; s.height=''; return h; }
  function sizeCard(c){ var i=c.querySelector('.fcard-inner');
    i.style.height = Math.max(faceHeight(c.querySelector('.front')), faceHeight(c.querySelector('.back'))) + 'px'; }
  function sizeAll(){ cards.forEach(sizeCard); }

  function show(key){
    tabs.forEach(function(t){ t.classList.toggle('active', t.dataset.tab === key); });
    panels.forEach(function(p){ p.classList.toggle('active', p.id === key); });
    requestAnimationFrame(sizeAll);
  }
  tabs.forEach(function(t){ t.addEventListener('click', function(){ show(t.dataset.tab); }); });

  cards.forEach(function(card){
    var front=card.querySelector('.front'), backBtn=card.querySelector('.back-btn'), mode=card.dataset.mode;
    function flip(on){ card.classList.toggle('flipped', on); requestAnimationFrame(function(){ sizeCard(card); }); }
    front.addEventListener('click', function(){ flip(true); });
    backBtn.addEventListener('click', function(e){ e.stopPropagation(); flip(false); });
    function apply(text, echo){
      card.querySelector('.statement').innerHTML = text;
      card.querySelector('.answer-echo').innerHTML = echo ? '<b>Assessment:</b> ' + echo : '';
      card.querySelector('.front-default').hidden = true;
      card.querySelector('.front-answered').hidden = false;
      card.querySelector('.c-def').hidden = true; card.querySelector('.c-ans').hidden = false;
      card.classList.add('answered'); flip(false);
    }
    if (mode === 'single') {
      var opts = [].slice.call(card.querySelectorAll('.opt'));
      opts.forEach(function(o){ o.addEventListener('click', function(){
        opts.forEach(function(x){ x.classList.remove('sel'); }); o.classList.add('sel');
        apply(o.dataset.statement, o.dataset.answer);
      }); });
    } else {
      var apbtn = card.querySelector('.apply');
      var boxes = [].slice.call(card.querySelectorAll('.optm input'));
      var none = card.querySelector('.optm-none input');
      boxes.forEach(function(b){ b.addEventListener('change', function(){
        if (b === none && b.checked) { boxes.forEach(function(x){ if (x !== none) x.checked = false; }); }
        else if (b !== none && b.checked && none.checked) { none.checked = false; }
      }); });
      apbtn.addEventListener('click', function(){
        var sel = boxes.filter(function(b){ return b.checked && b.value !== '__none__'; }).map(function(b){ return b.value; });
        var all = ['NTFP','Nursery work','Planting work'];
        var missing = all.filter(function(a){ return sel.indexOf(a) < 0; });
        var text, echo;
        if (sel.length === 0) { text='Cultivate livelihood opportunities through NTFP, Nursery and Planting work'; echo='None of the above'; }
        else if (missing.length === 0) { text='Maintain livelihood opportunities through NTFP, Nursery and Planting work'; echo=sel.join(', '); }
        else { text='Expand livelihood opportunities through ' + joinNice(missing); echo=sel.join(', '); }
        apply(text, echo);
      });
    }
  });
  function joinNice(a){ if (a.length===1) return a[0];
    if (a.length===2) return a[0].replace(' work','') + ' and ' + a[1];
    return a.slice(0,-1).map(function(x){ return x.replace(' work',''); }).join(', ') + ' and ' + a[a.length-1]; }

  var disc = root.querySelector('#disc');
  if (disc) disc.querySelector('.disc-btn').addEventListener('click', function(){ disc.classList.toggle('open'); });

  window.addEventListener('resize', function(){ requestAnimationFrame(sizeAll); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ setTimeout(sizeAll, 60); });

  return { show: show, sizeAll: sizeAll };
}

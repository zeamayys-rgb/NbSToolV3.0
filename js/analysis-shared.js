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

/* Canonical Data-Analyser figures — single source of truth for Steps 1–5.
   Every hectare number the analyser shows derives from here; change these and
   the steps + the live Step-5 benefit summary stay consistent. */
const NBS_DATA = (function(){
  var aoi = 150000, nonEligible = 10000;
  var eco = {
    forest:   { key:'forest',   label:'Forest',   area:56000, disturbedPct:25, lossPct:8, gainPct:3, color:'#2c6639' },
    mangrove: { key:'mangrove', label:'Mangrove', area:49000, disturbedPct:24, lossPct:6, gainPct:2, color:'#1a9e96' },
    peat:     { key:'peat',     label:'Peatland', area:35000, disturbedPct:40, lossPct:8, gainPct:2, color:'#bea001' }
  };
  var totalEligible = 0, totalDisturbed = 0;
  Object.keys(eco).forEach(function(k){
    var e = eco[k];
    e.disturbed = Math.round(e.area * e.disturbedPct / 100);
    e.loss = Math.round(e.area * e.lossPct / 100);
    e.gain = Math.round(e.area * e.gainPct / 100);
    e.remaining = e.area - e.disturbed - e.loss;
    totalEligible += e.area; totalDisturbed += e.disturbed;
  });
  function grp(n){ return Math.round(n).toLocaleString('en-US'); }
  function grp1(n){ return Number(n).toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1}); }
  function pctOfEligible(n){ return Math.round(n / totalEligible * 100); }
  return { aoi:aoi, nonEligible:nonEligible, eco:eco, totalEligible:totalEligible,
           totalDisturbed:totalDisturbed, duration:30, grp:grp, grp1:grp1, pctOfEligible:pctOfEligible };
})();
if (typeof window !== 'undefined') window.NBS_DATA = NBS_DATA;

const NBS_ANALYSIS = (() => {

/* ---- Step 2 — Site Characterisation context panes ---- */
/* General Context — live HTML rebuilt from Figma (F02 P2, node 3892-33528).
   Styles: css/genctx.css (.gc*). Assets: assets/f01-step2/genctx/. */
const GC_ASSETS = 'assets/f01-step2/genctx';
const gcAlert = `
          <div class="gc-alert">
            <img src="${GC_ASSETS}/ic-alert.svg" alt="" />
            <p>Disclaimer: The information you see in NbS Tool is collected from diverse available sources across South-east Asia. Go to <a href="#">NbS Tool Form&rarr;</a> to edit and replace it with your own data.</p>
          </div>`;
const gcSource = (data, source, year) => `
          <p class="gc-src">Data source:&nbsp; <b>${data}</b>: ${source}, ${year} <a href="#">See more</a>.</p>`;
/* Card-head chip icons — Google Material Design Icons (Apache 2.0), 24px filled */
const GC_ICONS = {
  globe: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>',
  gov: '<path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6z"/>',
  landscape: '<path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>',
  tree: '<path d="M13 16.12c3.47-.41 6.17-3.36 6.17-6.95 0-3.87-3.13-7-7-7s-7 3.13-7 7c0 3.47 2.52 6.34 5.83 6.89V20H5v2h14v-2h-6v-3.88z"/>',
  layers: '<path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/>',
  warning: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
  paw: '<circle cx="4.5" cy="9.5" r="2.5"/><circle cx="9" cy="5.5" r="2.5"/><circle cx="15" cy="5.5" r="2.5"/><circle cx="19.5" cy="9.5" r="2.5"/><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"/>',
  eye: '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>',
  shield: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>',
  chart: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>',
  pin: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>',
  park: '<path d="M17 12h2L12 2 5.05 12H7l-3.9 6h6.92v4h3.96v-4H21l-4-6z"/>',
  cloud: '<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>',
  terrain: '<path d="M14 6l-4.22 5.63 1.25 1.67L14 9.33 19 16h-8.46l-4.01-5.37L1 18h22L14 6z"/>',
  thermo: '<path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1h-1v1h1v1h-1v1h1v1h-2V5z"/>',
  fire: '<path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>',
};
const gcHead = (t, ic) => `
          <div class="gc-card__head"><span class="gc-hchip"><svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${GC_ICONS[ic] || ''}</svg></span><h4>${t}</h4><svg class="gc-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>`;

const siteGeneral = `
        <div class="ctx-pane" data-ctx="general">
          <div class="gc">

            <!-- 1 · Ecosystem type identification -->
            <section class="gc-card">${gcHead('Ecosystem type identification', 'globe')}
              <div class="gc-eco">
                <figure class="gc-eco__map"><img src="${GC_ASSETS}/map-eco.png" alt="Ecosystem map of the selected area" /></figure>
                <div class="gc-eco__side">
                  <p class="gc-p">This area spans all three settings: non-flooded mineral soil inland, a tidal coastal zone with salt or brackish water, and ground built on wet peat soil. It combines <b>dryland</b>, <b>mangrove</b>, and <b>peatland</b> references across different parts of the site.</p>
                  <div class="gc-eco__chartrow">
                    <div class="gc-donut">
                      <img src="${GC_ASSETS}/eco-donut.svg" alt="Ecosystem share donut chart" />
                      <div class="gc-donut__c"><span>Total</span><b>150,000 ha</b></div>
                    </div>
                    <ul class="gc-legend">
                      <li><i style="background:#f1fc3e;box-shadow:inset 0 0 0 1px #a9a9a9"></i>Mangrove</li>
                      <li><i style="background:#abc963"></i>Peatland</li>
                      <li><i style="background:#2c6639"></i>Dryland Forest</li>
                      <li><i style="background:#dadada"></i>Other</li>
                    </ul>
                  </div>
                </div>
              </div>${gcAlert}${gcSource('Ecosystem extent', 'MoEF Indonesia (KLHK) land cover', '2024')}
            </section>

            <!-- 2 · Administration and zoning status -->
            <section class="gc-card">${gcHead('Administration and Zoning Status Information', 'gov')}
              <div class="gc-block">
                <h5 class="gc-sub">Administration</h5>
                <p class="gc-p">This project area is located in <b>Banjar, Buleleng, Bali, 150,000 ha</b><br />The project area intersects <b>3</b> sub-districts. The table below shows each sub-district and its overlapping area.</p>
                <table class="gc-table">
                  <thead><tr><th>Sub-district</th><th>District</th><th>Province</th><th>Area ha</th></tr></thead>
                  <tbody>
                    <tr><td>Banjar</td><td>Buleleng</td><td>Bali</td><td>66,100</td></tr>
                    <tr><td>Busungbiu</td><td>Buleleng</td><td>Bali</td><td>49,500</td></tr>
                    <tr><td>Seririt</td><td>Buleleng</td><td>Bali</td><td>34,400</td></tr>
                  </tbody>
                </table>
                <p class="gc-note-it">See all completed administrative boundaries of your project in the <a href="#">Feasibility study document</a></p>
              </div>
              <div class="gc-block">
                <h5 class="gc-sub">Protection/zoning status</h5>
                <p class="gc-p">This project area overlaps with 30,000 hectares of protected areas (20% of the AOI). The protected area within the polygon is designated for <b>Taman Wisata Alam (nature recreation park)</b></p>
              </div>${gcAlert}${gcSource('Administrative boundaries', 'Badan Informasi Geospasial (BIG)', '2024')}
            </section>

            <!-- 3 · Terrain -->
            <section class="gc-card">${gcHead('Terrain', 'landscape')}
              <figure class="gc-terrain"><img src="${GC_ASSETS}/terrain.jpg" alt="3D terrain render of the selected area" /></figure>
              <div class="gc-block">
                <p class="gc-p gc-p--lg">Elevation ranges from 45 to 1,860 m above sea level (asl), predominantly upland (500&ndash;1,000 m), and the slope of the area consists of:</p>
                <div class="gc-slopes">
                  <div class="gc-slope"><div class="l"><span>Flat (0-8%)</span><b>57,000 ha</b></div><div class="t"><i style="width:38%;background:#55b101"></i></div></div>
                  <div class="gc-slope"><div class="l"><span>Gently sloping (8-15%)</span><b>39,000 ha</b></div><div class="t"><i style="width:26%;background:#8cb21a"></i></div></div>
                  <div class="gc-slope"><div class="l"><span>Moderately steep (15-25%)</span><b>28,500 ha</b></div><div class="t"><i style="width:19%;background:#d9a600"></i></div></div>
                  <div class="gc-slope"><div class="l"><span>Steep (25-40%)</span><b>15,000 ha</b></div><div class="t"><i style="width:10%;background:#d97300"></i></div></div>
                  <div class="gc-slope"><div class="l"><span>Very steep (&gt;40%)</span><b>10,500 ha</b></div><div class="t"><i style="width:7%;background:#b2331a"></i></div></div>
                </div>
              </div>${gcAlert}${gcSource('Elevation &amp; slope', 'NASADEM 30 m (NASA/USGS)', '2023')}
            </section>

            <!-- 4 · Deforestation analysis -->
            <section class="gc-card">${gcHead('Deforestation analysis', 'tree')}
              <div class="gc-block">
                <div class="gc-def">
                  <figure class="gc-def__map"><img src="${GC_ASSETS}/map-defor.png" alt="Historical deforestation map" /></figure>
                  <div class="gc-def__side">
                    <div>
                      <h5 class="gc-sub">Historical Deforestation</h5>
                      <p class="gc-p">Between 2014 and 2024, the project area lost <b>6,720 ha</b> of forest, an average of</p>
                      <p class="gc-big">1.2<small>% / year</small></p>
                    </div>
                    <div class="gc-chip"><span><i style="background:#a5c47c"></i>Forest</span><span><i style="background:#e0418c"></i>Forest Loss</span></div>
                  </div>
                </div>
              </div>
              <div class="gc-block">
                <div class="gc-def">
                  <figure class="gc-def__map gc-def__map--plain"><img src="${GC_ASSETS}/map-risk.png" alt="National deforestation risk map" /></figure>
                  <div class="gc-def__side">
                    <div>
                      <h5 class="gc-sub">Deforestation Risk Index</h5>
                      <p class="gc-p">Deforestation risk is mapped as a continuous index from <b>0</b> (lowest) to <b>1</b> (highest). Forest in this area averages <b>0.85</b>, higher than the national average &mdash; the top <b>15%</b> of the country&rsquo;s forest by deforestation risk.</p>
                    </div>
                    <div class="gc-chip gc-chip--ramp"><span>Deforestation risk index</span><span>0<i></i>1</span></div>
                  </div>
                </div>
              </div>${gcAlert}${gcSource('Forest loss', 'Global Forest Watch (Hansen/UMD)', '2024')}
            </section>

            <!-- 5 · Landcover -->
            <section class="gc-card">${gcHead('Landcover', 'layers')}
              <div class="gc-block">
                <p class="gc-p">The major land cover categories in the selected area are:</p>
                <div class="gc-lcgrid">
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-aquaculture.svg" alt="" /><div><span>Aquaculture</span><b>12,000 ha</b><em>8%</em></div></div>
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-barren.svg" alt="" /><div><span>Barren</span><b>7,500 ha</b><em>5%</em></div></div>
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-rubber.svg" alt="" /><div><span>Rubber</span><b>18,000 ha</b><em>12%</em></div></div>
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-crop.svg" alt="" /><div><span>Crop Plantation</span><b>30,000 ha</b><em>20%</em></div></div>
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-evergreen.svg" alt="" /><div><span>Evergreen</span><b>52,500 ha</b><em>35%</em></div></div>
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-oilpalm.svg" alt="" /><div><span>Oilpalm</span><b>21,000 ha</b><em>14%</em></div></div>
                </div>
                <p class="gc-note-it gc-note-it--center">View the detailed landcover breakdown for your specific site within the <a href="#">feasibility study document</a></p>
              </div>${gcAlert}${gcSource('Land cover', 'ESA WorldCover 10 m', '2023')}
            </section>

            <!-- 6 · Natural disaster risk -->
            <section class="gc-card">${gcHead('Natural Disaster Risk', 'warning')}
              <div class="gc-block">
                <p class="gc-p">The selected area is susceptible to several natural disaster risks, including:</p>
                <div class="gc-ndgrid">
                  <div class="gc-nditem"><figure><img src="assets/asset/Disaster Risk/drought.png" alt="Drought" /></figure><span>Drought</span><b>Moderate risk</b></div>
                  <div class="gc-nditem"><figure><img src="assets/asset/Disaster Risk/flood.png" alt="Flood" /></figure><span>Flood</span><b>High risk</b></div>
                  <div class="gc-nditem"><figure><img src="assets/asset/Disaster Risk/fire risk.png" alt="Fire risk" /></figure><span>Fire Risk</span><b>High risk</b></div>
                  <div class="gc-nditem"><figure><img src="assets/asset/Disaster Risk/Landslide.png" alt="Landslide" /></figure><span>Landslide</span><b>Moderate risk</b></div>
                  <div class="gc-nditem"><figure><img src="assets/asset/Disaster Risk/tropicaltyphon.png" alt="Tropical typhoon" /></figure><span>Tropical Typhoon</span><b>Low risk</b></div>
                </div>
              </div>${gcAlert}${gcSource('Multi-hazard risk index', 'BNPB InaRISK', '2024')}
            </section>

          </div>
        </div>`;

/* Nature Context — live HTML rebuilt from Figma (F02 P2, node 3892-33553).
   Shares the .gc* card/alert/source styles; Nature-only pieces are .nc*. */
const NC_ASSETS = 'assets/f01-step2/natctx';
/* Every occurrence count is per species; the class row totals the species below
   it, so the two always agree. list = [common, latin, occurrence] */
const ncSpecies = (icon, name, dot, list) => `
                <div class="nc-splist">
                  <img class="nc-splist__ic" src="${NC_ASSETS}/${icon}.svg" alt="" />
                  <div class="nc-splist__id"><span>${name}</span><b>${list.reduce((n, s) => n + s[2], 0)} Occurrence</b></div>
                  <ul style="--dot:${dot}">${list.map(s => `<li><i>${s[0]}</i> <em>(${s[1]})</em><b>${s[2]} occurrence</b></li>`).join('')}</ul>
                </div>`;

const siteNature = `
        <div class="ctx-pane" data-ctx="nature" hidden>
          <div class="gc">

            <!-- 1 · Habitat area -->
            <section class="gc-card">${gcHead('Habitat Area', 'paw')}
              <div class="gc-block">
                <p class="gc-p">The project area is a suitable habitat for a wide range of wildlife, including</p>
                <div class="nc-habitat">
                  <div class="nc-habitat__grid">
                    <div class="nc-stat"><span>Amphibian</span><b>21 Species</b><img src="${NC_ASSETS}/sp-amphibian.svg" alt="" /></div>
                    <div class="nc-stat"><span>Bird</span><b>321 Species</b><img src="${NC_ASSETS}/sp-bird.svg" alt="" /></div>
                    <div class="nc-stat"><span>Mammal</span><b>21 Species</b><img src="${NC_ASSETS}/sp-mammal.svg" alt="" /></div>
                    <div class="nc-stat"><span>Reptile</span><b>41 Species</b><img src="${NC_ASSETS}/sp-reptile.svg" alt="" /></div>
                  </div>
                  <div class="nc-total"><span>Total Wildlife Species:</span><div><b>404</b><em>species</em></div></div>
                </div>
              </div>${gcAlert}${gcSource('Species occurrence', 'GBIF', '2024')}
            </section>

            <!-- 2 · Indicative key species presence -->
            <section class="gc-card">${gcHead('Indicative Key Species Presence', 'eye')}
              <div class="gc-block">
                <p class="gc-p">There are keystone species throughout the project area. The species featured are:</p>
                <div class="nc-splists">
${ncSpecies('sp-bird', 'Aves', '#1da3dc', [['Bali Myna','Leucopsar rothschildi',96],['Java Sparrow','Padda oryzivora',74],['Black-winged Starling','Acridotheres melanopterus',61],['Javan Kingfisher','Halcyon cyanoventris',48]])}
${ncSpecies('sp-mammal', 'Mammalia', '#f08a4b', [['Javan Rusa','Rusa timorensis',37],['Long-tailed Macaque','Macaca fascicularis',52]])}
${ncSpecies('sp-reptile', 'Reptilia', '#1d9e75', [['Reticulated Python','Malayopython reticulatus',23],['Asian Water Monitor','Varanus salvator',44]])}
                </div>
              </div>${gcAlert}${gcSource('Threatened species', 'IUCN Red List', '2024')}
            </section>

            <!-- 3 · Conservation significance -->
            <section class="gc-card">${gcHead('Conservation Significance', 'shield')}
              <div class="nc-cons">
                <figure class="nc-radar"><img src="${NC_ASSETS}/radar.png" alt="Conservation significance radar chart: biodiversity, water and carbon" /></figure>
                <div class="nc-cons__side">
                  <p class="gc-p">The project area reflects the area&rsquo;s significance for <b>biodiversity</b> conservation.</p>
                  <div class="gc-chip gc-chip--sq"><span><i style="background:#1d9e75"></i>Significance score (out of 10)</span></div>
                </div>
              </div>${gcAlert}${gcSource('Significance index', 'NbS Tool composite analysis', '2024')}
            </section>

            <!-- 4 · Forest Landscape Integrity Index -->
            <section class="gc-card">${gcHead('Forest Landscape Integrity Index', 'chart')}
              <div class="nc-flii">
                <p class="gc-p">Within the forest in this area, <b>68%</b> has high landscape integrity, <b>24%</b> medium, and <b>8%</b> low. The forest is predominantly high integrity, indicating largely intact and well-connected forest under low human pressure.</p>
                <div class="nc-score">
                  <span class="nc-score__t">FLII Score</span>
                  <div><b>9.7*</b><em class="nc-pill nc-pill--high">High Integrity</em></div>
                  <p>Largely intact and well-connected forest</p>
                </div>
                <div class="nc-gauge">
                  <div class="nc-gauge__bar"></div>
                  <div class="nc-gauge__tick" style="top:0"><span>10</span></div>
                  <div class="nc-gauge__tick" style="top:22px"><span>9.6</span></div>
                  <div class="nc-gauge__tick" style="top:81px"><span>6</span></div>
                  <div class="nc-gauge__tick" style="bottom:0"><span>0</span></div>
                  <em class="nc-pill nc-pill--high" style="top:0">High</em><span class="nc-gauge__rng" style="top:3px">9.6 &ndash; 10</span>
                  <em class="nc-pill nc-pill--med" style="top:48px">Med</em><span class="nc-gauge__rng" style="top:51px">6.0 &ndash; 9.5</span>
                  <em class="nc-pill nc-pill--low" style="top:136px">Low</em><span class="nc-gauge__rng" style="top:139px">0 &ndash; 5.9</span>
                </div>
              </div>${gcAlert}${gcSource('Forest Landscape Integrity Index', 'Grantham et al.', '2024')}
            </section>

            <!-- 5 · Key Biodiversity Area -->
            <section class="gc-card">${gcHead('Key Biodiversity Area', 'pin')}
              <div class="gc-block">
                <p class="gc-p">This project area overlaps with <b>19,500 ha (13.0% of total AOI area)</b> of Key Biodiversity Areas, across <b>2</b> sites. The largest is <b>West Bali National Park (4,512.3 ha)</b>, followed by <b>Batukaru Ridge Forest (1,776.7 ha)</b>. Key Biodiversity Areas are sites that contribute significantly to the global persistence of biodiversity.</p>
                <div class="nc-kba">
                  <img src="${NC_ASSETS}/kba-map.png" alt="Key Biodiversity Area overlap map" />
                  <div class="nc-kba__card"><span>Total overlapping area</span><b>19,500 ha</b></div>
                  <div class="nc-kba__lg"><i></i>West Bali National Park</div>
                </div>
              </div>${gcAlert}${gcSource('Key Biodiversity Areas', 'KBA Partnership / BirdLife International', '2024')}
            </section>

            <!-- 6 · Endangered tree species -->
            <section class="gc-card">${gcHead('Endangered Tree Species', 'park')}
              <div class="nc-tree">
                <img src="${NC_ASSETS}/tree.jpg" alt="Endangered tree species" />
                <div><span>The project area is home to Endangered Tree as</span><b>31 Species</b></div>
              </div>${gcAlert}${gcSource('Threatened tree species', 'BGCI GlobalTreeSearch &amp; IUCN Red List', '2024')}
            </section>

          </div>
        </div>`;

/* Climate Context — live HTML rebuilt from Figma (F02 P2, node 3892-33578).
   Shares the .gc* card/alert/source styles; Climate-only pieces are .cl*.
   Charts are plain CSS bars — heights are the Figma bar pixel heights over the
   plot height, so the shapes match the design without a chart library. */
const CL_ASSETS = 'assets/f01-step2/climctx';
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const clChart = (bars, plot, labels, yTicks, yTitle, cls) => `
                  <div class="cl-chart ${cls}">
                    <span class="cl-chart__ytitle">${yTitle}</span>
                    <ul class="cl-chart__y">${yTicks.map(t => `<li>${t}</li>`).join('')}</ul>
                    <div class="cl-chart__plot">
                      ${bars.map(h => `<i style="height:${(h / plot * 100).toFixed(1)}%"></i>`).join('')}
                    </div>
                    <ul class="cl-chart__x">${labels.map(l => `<li>${l}</li>`).join('')}</ul>
                  </div>`;

const siteClimate = `
        <div class="ctx-pane" data-ctx="climate" hidden>
          <div class="gc">

            <!-- 1 · Carbon information -->
            <section class="gc-card gc-card--blue">${gcHead('Carbon information', 'cloud')}
              <div class="gc-block">
                <h5 class="gc-sub">Current Carbon Storage Total</h5>
                <div class="cl-carbon">
                  <p class="gc-p">The area hosts extensive carbon sinks that currently store <b>27,193,712.20</b> tCO<sub>2</sub>e, adding to the vital fight against global warming.</p>
                  <div class="cl-total"><span>Total Carbon Storage:</span><b>27,193,712.20 <em>tCO<sub>2</sub>e</em></b></div>
                </div>
              </div>
              <div class="gc-block">
                <h5 class="gc-sub">Type of Carbon (Carbon Pool) within the area:</h5>
                <div class="cl-pool">
                  <figure class="cl-pool__scene">
                    <div class="cl-pool__top">
                      <div class="cl-donut" role="img" aria-label="Carbon pool: above ground biomass 20%, soil organic carbon 50%, below ground biomass 30%"><span>Carbon Pool</span></div>
                      <ul class="cl-pool__legend">
                        <li><i style="--c:#a9cce6"></i>Above Ground Biomass</li>
                        <li><i style="--c:#2f80c4"></i>Soil Organic Carbon</li>
                        <li><i style="--c:#103a63"></i>Below Ground Biomass</li>
                      </ul>
                    </div>
                    <img src="${CL_ASSETS}/carbon-scene.png" alt="Cross-section of trees above ground and roots in soil" />
                    <div class="cl-pool__tag cl-pool__tag--agb"><span>Above Ground Biomass</span><div><b>5,438,742.44 <em>tCO<sub>2</sub>e</em></b><i>20%</i></div></div>
                    <div class="cl-pool__tag cl-pool__tag--soc"><span>Soil Organic Carbon</span><div><b>13,596,856.10 <em>tCO<sub>2</sub>e</em></b><i>50%</i></div></div>
                    <div class="cl-pool__tag cl-pool__tag--bgb"><span>Below Ground Biomass</span><div><b>8,158,113.66 <em>tCO<sub>2</sub>e</em></b><i>30%</i></div></div>
                  </figure>
                </div>
              </div>${gcAlert}${gcSource('Carbon density', 'Spawn &amp; Gibbs global biomass; ISRIC SoilGrids', '2023')}
            </section>

            <!-- 2 · Soil classification -->
            <section class="gc-card gc-card--blue">${gcHead('Soil classification', 'terrain')}
              <div class="gc-block">
                <p class="gc-p">Based on the World Reference Base for Soil Resources (WRB) 2006, the soils in this area are predominantly <b>Andosols</b>. The distribution of all identified soil types is presented below.</p>
                <div class="cl-soil">
                  <div class="cl-soil__list">
                    <div class="cl-soilrow is-top" style="--c:#ed3a33"><span class="n">01</span><div><b>Andosols</b><i><s style="width:73%"></s></i></div><em>27%</em></div>
                    <div class="cl-soilrow" style="--c:#fecd67"><span class="n">02</span><div><b>Cambisols</b><i><s style="width:62%"></s></i></div><em>25%</em></div>
                    <div class="cl-soilrow" style="--c:#f6872d"><span class="n">03</span><div><b>Ferralsols</b><i><s style="width:48%"></s></i></div><em>17%</em></div>
                    <div class="cl-soilrow" style="--c:#f7991d"><span class="n">04</span><div><b>Acrisols</b><i><s style="width:23%"></s></i></div><em>9%</em></div>
                    <div class="cl-soilrow" style="--c:#f7a082"><span class="n">05</span><div><b>Nitisols</b><i><s style="width:10%"></s></i></div><em>7%</em></div>
                  </div>
                  <div class="cl-dominant">
                    <span class="cl-dominant__t">Dominant Soil Type:</span>
                    <div><b>Andosols</b></div>
                    <hr />
                    <p>Soils developed from volcanic ash, pumice, and other volcanic materials. They are usually dark-coloured, rich in organic matter, highly porous, and have excellent water-holding capacity. These soils are generally highly fertile, although phosphorus fertilization is often required because of their strong phosphorus fixation capacity.</p>
                  </div>
                </div>
              </div>${gcAlert}${gcSource('Soil classification (WRB 2006)', 'ISRIC SoilGrids 250 m', '2023')}
            </section>

            <!-- 3 · The annual climate ledger -->
            <section class="gc-card gc-card--blue">${gcHead('The Annual Climate Ledger', 'thermo')}
              <div class="cl-ledger">
                <div class="cl-metric">
                  <span class="cl-metric__ic" style="background:#125e92"><img src="${CL_ASSETS}/ic-rain.svg" alt="" /></span>
                  <h5 class="gc-sub">Annual precipitation</h5>
                  <p class="gc-p">Annual precipitation in the selected area ranges from 45 to 320 mm per month, with an annual total of 2,000 mm and 4 dry months.</p>
${clChart([127.2,115.3,99.4,59.6,39.8,27.8,21.9,17.9,27.8,51.7,87.5,119.3], 159, MONTHS, [400,300,200,100,0], 'Precipitation (mm)', 'cl-chart--prec')}
                </div>
                <div class="cl-metric">
                  <span class="cl-metric__ic" style="background:#4591c5"><img src="${CL_ASSETS}/ic-temp.svg" alt="" /></span>
                  <h5 class="gc-sub">Annual mean temperature</h5>
                  <p class="gc-p">Annual mean temperature in the selected area ranges from 26.4&deg;C to 27.4&deg;C with an average of 26.9&deg;C</p>
${clChart([104.9,105.7,106.9,108.5,108.9,107.3,105.3,104.9,106.9,108.9,108.5,106.5], 159, MONTHS, [40,30,20,10,0], 'Temperatures (c)', 'cl-chart--temp')}
                </div>
              </div>${gcAlert}${gcSource('Climate normals', 'WorldClim v2.1', '2023')}
            </section>

            <!-- 4 · Historical burned area -->
            <section class="gc-card gc-card--red">${gcHead('Historical Burned Area', 'fire')}
              <div class="cl-fire">
                <div class="cl-fire__graph">
                  <p class="gc-p">This shows how likely the land is to burn under baseline conditions, based on factors such as land cover, dryness, and climate. It is not a forecast of current fire danger.</p>
${clChart([103,165,109,152,133,133,109,109,88,109], 176, ['2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'], [600,500,400,300,200,100,0], 'Burned Area (in ha)', 'cl-chart--fire')}
                  <p class="cl-chart__xtitle">Years</p>
                </div>
                <div class="cl-burned">
                  <div>
                    <p>In the past <b>10 years</b>, the selected area has experienced <b>fires</b> covering as total:</p>
                    <b class="cl-burned__v">4,125.0 ha</b>
                  </div>
                </div>
              </div>${gcAlert}${gcSource('Burned area', 'MODIS MCD64A1 (NASA FIRMS)', '2024')}
            </section>

          </div>
        </div>`;

const site = siteGeneral + `
        ${siteNature}
        <div class="ctx-pane" data-ctx="people" hidden>
          <!-- live People Context (ASEAN) — rendered by js/people-context.js;
               country dropdown retained for the prototype -->
          <div data-people-context></div>
        </div>
        ${siteClimate}
`;

/* ---- Step 3 — Threats Profile & NbS Screening Overview ---- */
const threatTabs = `
          <div class="t3-tabs" id="t3Tabs" role="tablist" aria-label="Threat profile views">
            <button class="is-active" data-t3tab="overview"><svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg> All Ecosystem</button>
            <button data-t3tab="forest"><img class="ic" src="assets/asset/ECOSYSTEM%20ICON_Ecosystem%20Type=Forest,%20Filled=No.svg" alt="" /> Forest</button>
            <button data-t3tab="mangrove"><img class="ic" src="assets/asset/ECOSYSTEM%20ICON_Ecosystem%20Type=Mangrove,%20Filled=No.svg" alt="" /> Mangrove</button>
            <button data-t3tab="peatland"><img class="ic" src="assets/asset/ECOSYSTEM%20ICON_Ecosystem%20Type=Peatland,%20Filled=No.svg" alt="" /> Peatland</button>
          </div>
`;

const threatSections = `
          <div class="t3-sections">

            <!-- ---------- OVERVIEW ---------- -->
            <div class="t3-sec" data-t3sec="overview">
              <div class="t3-screen">
                <h4>Screening summary of forest, mangrove and peatland ecosystem conditions.</h4>
                <p>Explore disturbance charts and maps summarising the disturbances to the forest, peatland and mangrove ecosystems within the project area. The interactive maps show remaining forest, disturbed forest, forest loss, and tree cover gain.</p>
              </div>

              <div class="t3-metrics">
                <div class="t3-metric">
                  <span class="ic" style="background:#e8f5f1;color:#077f68"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg></span>
                  <div class="tx"><b>Total ecosystem area</b><span>100% of total area</span></div>
                  <div class="num">140,000 <small>ha</small></div>
                </div>
                <div class="t3-metric">
                  <span class="ic" style="background:#fdecec;color:#e33b32"><svg viewBox="0 0 24 24"><path d="M12 21V9M12 13l-3.5-3.5M12 13l3.5-3.5M12 9l-2.5-3M12 9l2.5-3M4 21h16"/><path d="M18.5 3.5l-3 3M15.5 3.5l3 3"/></svg></span>
                  <div class="tx"><b>Total Disturbed area</b><span>28% of total area</span></div>
                  <div class="num">39,760 <small>ha</small></div>
                </div>
              </div>

              <div class="t3-ecos">
                <div class="t3-eco">
                  <div class="top"><span class="t3-echip"><img src="assets/asset/ECOSYSTEM%20ICON_Ecosystem%20Type=Forest,%20Filled=No.svg" alt="" /></span><div><div class="nm">Dryland forest</div><div class="ha">56,000 <small>ha</small></div></div></div>
                  <div class="t3-bar"><span style="width:40%;background:#1b7a3b" data-lbl="Dryland forest" data-pct="40%" data-ha="56,000 ha"></span></div>
                  <div class="cap"><b>40%</b> of total area</div>
                  <div class="kv"><span>Disturbed</span><b class="red">14,000 ha (25%)</b></div>
                </div>
                <div class="t3-eco">
                  <div class="top"><span class="t3-echip"><img src="assets/asset/ECOSYSTEM%20ICON_Ecosystem%20Type=Mangrove,%20Filled=No.svg" alt="" /></span><div><div class="nm">Mangrove</div><div class="ha">49,000 <small>ha</small></div></div></div>
                  <div class="t3-bar"><span style="width:35%;background:#1a9e96" data-lbl="Mangrove" data-pct="35%" data-ha="49,000 ha"></span></div>
                  <div class="cap"><b>35%</b> of total area</div>
                  <div class="kv"><span>Disturbed</span><b class="red">11,760 ha (24%)</b></div>
                </div>
                <div class="t3-eco">
                  <div class="top"><span class="t3-echip"><img src="assets/asset/ECOSYSTEM%20ICON_Ecosystem%20Type=Peatland,%20Filled=No.svg" alt="" /></span><div><div class="nm">Peatland</div><div class="ha">35,000 <small>ha</small></div></div></div>
                  <div class="t3-bar"><span style="width:14%;background:#594b00" data-lbl="Peat forest" data-pct="14%" data-ha="20,000 ha"></span><span style="width:11%;background:#bea001" data-lbl="Peat non-forest" data-pct="11%" data-ha="15,000 ha"></span></div>
                  <div class="cap"><b>25%</b> of total area</div>
                  <div class="kv"><span>Disturbed</span><b class="red">14,000 ha (40%)</b></div>
                </div>
              </div>

              <div class="t3-card">
                <div class="t3-echead__top"><span class="t3-echip"><svg viewBox="0 0 24 24" fill="#055143" aria-hidden="true"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.38 4.9c-.23.07-.38.25-.38.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.62-1.9c.23-.08.38-.26.38-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg></span><h4 class="t3-map-h">Ecosystem Disturbance Map</h4></div>
                <p class="t3-mapdesc">Explore the distribution of disturbed forest within the project area. Disturbance drivers are summarised in statistics to show the main pressures affecting the ecosystem</p>
                <div class="t3-map">
                  <img src="assets/f01-step3/disturbance-map.png" alt="Ecosystem disturbance map" />
                  <div class="t3-map__legend">
                    <h5>Disturbance class</h5>
                    <div><i style="background:#3d8b40"></i>Remaining</div>
                    <div><i style="background:#f0ad2d"></i>Disturbed</div>
                    <div><i style="background:#e04638"></i>Forest loss</div>
                    <div><i style="background:#35e07a"></i>Forest Gain</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ---------- DRYLAND FOREST ---------- -->
            <div class="t3-sec" data-t3sec="forest">
              <div class="t3-card">
                <div class="t3-echead" style="--ecoclr:#2c6639">
                  <div class="t3-echead__top"><span class="t3-echip"><img src="assets/asset/ECOSYSTEM%20ICON_Ecosystem%20Type=Forest,%20Filled=No.svg" alt="" /></span><h4>Dryland Forest</h4></div>
                  <p>From 2015 to 2024, the selected dryland forest area experienced 14,000 ha of disturbance, driven mainly by smallholder clearing and fire.</p>
                </div>
                <div class="t3-stats cols5">
                  <div><span>Total area</span><b>56,000 ha</b></div>
                  <div><span>Remaining forest</span><b>37,520 ha</b></div>
                  <div><span>Disturbed</span><b class="org">14,000 ha (25%)</b></div>
                  <div><span>Forest loss</span><b class="red">4,480 ha (8%)</b></div>
                  <div><span>Forest gain</span><b class="grn">1,680 ha (3%)</b></div>
                </div>
                <div class="t3-alerts open">
                  <button class="t3-alerts__head">Dryland forest disturbance drivers <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
                  <div class="t3-alerts__body">
                    <p class="t3-drivers-intro">Dryland forest disturbance drivers are grouped into three categories: anthropogenic (human-caused), natural, and other drivers that cannot be identified yet. A &ldquo;disturbance&rdquo; refers to a significant change in tree canopy cover and canopy height which indicates degradation without a significant loss of standing trees.</p>
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
                <div class="t3-disc">
                  <svg viewBox="0 0 26 26"><path d="M13 3.5 2.5 22h21L13 3.5Z"/><path d="M13 10v5" fill="none"/><circle cx="13" cy="18.2" r="1.1" fill="#efa22f" stroke="none"/></svg>
                  <p><span style="font-weight:500">Disclaimer: </span><b>Field verification required</b><br>The information in NbS Tool is intended to support your pre-feasibility study. Always verify in the field before use.</p>
                </div>
              </div>
            </div>

            <!-- ---------- MANGROVE ---------- -->
            <div class="t3-sec" data-t3sec="mangrove">
              <div class="t3-card">
                <div class="t3-echead" style="--ecoclr:#1a9e96">
                  <div class="t3-echead__top"><span class="t3-echip"><img src="assets/asset/ECOSYSTEM%20ICON_Ecosystem%20Type=Mangrove,%20Filled=No.svg" alt="" /></span><h4>Mangrove Disturbance</h4></div>
                  <p>From 2015 to 2024, the selected mangrove area experienced 11,760 ha of disturbance, driven mainly by aquaculture conversion and coastal erosion.</p>
                </div>
                <div class="t3-stats cols4">
                  <div><span>Total area</span><b>49,000 ha</b></div>
                  <div><span>Remaining mangrove Forest</span><b>34,300 ha</b></div>
                  <div><span>Disturbed</span><b class="org">11,760 ha (24%)</b></div>
                  <div><span>Main Pressure</span><b class="red">Commodities</b></div>
                </div>
                <div class="t3-alerts open">
                  <button class="t3-alerts__head">Mangrove disturbance drivers <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
                  <div class="t3-alerts__body">
                    <p class="t3-drivers-intro">Mangrove disturbance drivers are grouped into three categories: anthropogenic (human-caused), natural, and other drivers that cannot be identified yet. A &ldquo;disturbance&rdquo; refers to a significant change in tree canopy cover and canopy height which indicates degradation without a significant loss of standing trees.</p>
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
                <div class="t3-disc">
                  <svg viewBox="0 0 26 26"><path d="M13 3.5 2.5 22h21L13 3.5Z"/><path d="M13 10v5" fill="none"/><circle cx="13" cy="18.2" r="1.1" fill="#efa22f" stroke="none"/></svg>
                  <p><span style="font-weight:500">Disclaimer: </span><b>Field verification required</b><br>The information in NbS Tool is intended to support your pre-feasibility study. Always verify in the field before use.</p>
                </div>
              </div>
            </div>

            <!-- ---------- PEATLAND ---------- -->
            <div class="t3-sec" data-t3sec="peatland">
              <div class="t3-card">
                <div class="t3-echead" style="--ecoclr:#bea001">
                  <div class="t3-echead__top"><span class="t3-echip"><img src="assets/asset/ECOSYSTEM%20ICON_Ecosystem%20Type=Peatland,%20Filled=No.svg" alt="" /></span><h4>Peatland disturbance</h4></div>
                  <p>This peatland area shows potential drainage-related disturbance, as the occurrence of drainage is the primary driver of peatland degradation.</p>
                </div>
                <div class="t3-stats cols4">
                  <div><span>Total area</span><b>35,000 ha</b></div>
                  <div><span>Remaining peatland forest</span><b>18,200 ha</b></div>
                  <div><span>Disturbed</span><b class="org">14,000 ha (40%)</b></div>
                  <div><span>Converted/Loss</span><b class="red">2,800 ha (8%)</b></div>
                </div>
                <div class="t3-alerts open">
                  <button class="t3-alerts__head">Peatland disturbance drivers <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
                  <div class="t3-alerts__body">
                    <p class="t3-drivers-intro">Peatland disturbance may be associated with drainage pressure, fire risk, hydrological alteration. Disturbance refers to possible changes in peatland condition caused by canals, reduced soil moisture, fire occurrence, or altered water table conditions, even when vegetation cover remains present.</p>
                    <div class="t3-minis">
                      <div class="t3-mini">
                        <span class="ic"><svg viewBox="0 0 24 24"><path d="M3 17c1.5 0 2.2-1 3.5-1s2 1 3.5 1 2.2-1 3.5-1 2 1 3.5 1 2.2-1 3.5-1"/><path d="M6 13l6-7 6 7M12 6v7"/></svg></span>
                        <div class="tx"><span>Canal proximity</span><b>High</b></div>
                      </div>
                      <div class="t3-mini">
                        <span class="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg></span>
                        <div class="tx"><span>Drainage pressure</span><b>High</b></div>
                      </div>
                      <div class="t3-mini">
                        <span class="ic"><svg viewBox="0 0 24 24"><path d="M12 22c4 0 7-2.6 7-6.5 0-3-2-5.4-3-7-.4 1.6-1.4 2.5-2.4 2.8C14 8 13 4.5 10.5 2 11 5 8 6.5 6.5 9.5 5.6 11.2 5 13 5 15.5 5 19.4 8 22 12 22Z"/></svg></span>
                        <div class="tx"><span>Fire risk</span><b>High</b></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="t3-disc">
                  <svg viewBox="0 0 26 26"><path d="M13 3.5 2.5 22h21L13 3.5Z"/><path d="M13 10v5" fill="none"/><circle cx="13" cy="18.2" r="1.1" fill="#efa22f" stroke="none"/></svg>
                  <p><span style="font-weight:500">Disclaimer: </span><b>Field verification required</b><br>The information in NbS Tool is intended to support your pre-feasibility study. Always verify in the field before use.</p>
                </div>
              </div>
            </div>

          </div>
`;

/* ---- Step 5 — Potential Benefit (F02-P5) ---- */
const benefitSummary = `
  <header class="summary">
    <h1 class="sum-title">Benefit Summary</h1>
    <p class="sum-sub">High-level overview of total estimated impact across all pathways and activities for this project area.</p>
    <div class="stat-grid">
      <div class="stat"><span class="stat-val" data-sum="acts">9</span><span class="stat-lab">NbS activities</span></div>
      <div class="stat"><span class="stat-val" data-sum="dur">30 yr</span><span class="stat-lab">Duration</span></div>
      <div class="stat"><span class="stat-val" data-sum="area">${NBS_DATA.grp(NBS_DATA.totalEligible)} ha</span><span class="stat-lab">Project area</span></div>
      <div class="stat pathways">
        <span class="stat-lab">Selected pathway</span>
        <div class="pchips" data-sum="pw">
          <span class="pchip p"><b>Protect</b></span>
          <span class="pchip m"><b>Manage</b></span>
          <span class="pchip r"><b>Restore</b></span>
        </div>
      </div>
    </div>
  </header>
`;

const benefitTabs = `
  <nav class="tabs" role="tablist">
    <button class="tab active" data-tab="nature" role="tab"><svg class="ic" width="20" height="20" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path opacity="0.25" d="M12.3008 5.7749L18.3008 20.1749H6.30078L12.3008 5.7749Z" fill="#0F6E56"/><path d="M12.3008 5.7749L18.3008 20.1749H6.30078L12.3008 5.7749Z" stroke="#0F6E56" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.3008 20.1748V24.9748" stroke="#0F6E56" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.15" d="M12.3006 0.375L19.5006 18.975H5.10059L12.3006 0.375Z" fill="#0F6E56"/><path d="M12.3006 0.375L19.5006 18.975H5.10059L12.3006 0.375Z" stroke="#0F6E56" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.3008 18.9749V25.5749" stroke="#0F6E56" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/></svg>Nature</button>
    <button class="tab" data-tab="people" role="tab"><svg class="ic" width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8.22852 10.3999C9.95441 10.3999 11.3535 9.05676 11.3535 7.3999C11.3535 5.74305 9.95441 4.3999 8.22852 4.3999C6.50263 4.3999 5.10352 5.74305 5.10352 7.3999C5.10352 9.05676 6.50263 10.3999 8.22852 10.3999Z" fill="#534AB7" fill-opacity="0.12" stroke="#534AB7" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.60449 21.7998C2.60449 15.7998 13.8545 15.7998 13.8545 21.7998" stroke="#534AB7" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9785 10.3999C18.7044 10.3999 20.1035 9.05676 20.1035 7.3999C20.1035 5.74305 18.7044 4.3999 16.9785 4.3999C15.2526 4.3999 13.8535 5.74305 13.8535 7.3999C13.8535 9.05676 15.2526 10.3999 16.9785 10.3999Z" fill="#534AB7" fill-opacity="0.12" stroke="#534AB7" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.3535 21.7998C11.3535 15.7998 22.6035 15.7998 22.6035 21.7998" stroke="#534AB7" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/></svg>People</button>
    <button class="tab" data-tab="climate" role="tab"><svg class="ic" width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12.7 17.6C15.0196 17.6 16.9 15.7195 16.9 13.4C16.9 11.0804 15.0196 9.19995 12.7 9.19995C10.3804 9.19995 8.5 11.0804 8.5 13.4C8.5 15.7195 10.3804 17.6 12.7 17.6Z" fill="#185FA5" fill-opacity="0.12" stroke="#185FA5" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.7002 6.1999V4.3999" stroke="#185FA5" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.1006 8.00005L19.3006 6.80005" stroke="#185FA5" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.9004 13.3999H21.7004" stroke="#185FA5" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.1006 18.8L19.3006 20" stroke="#185FA5" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.30059 8.00005L6.10059 6.80005" stroke="#185FA5" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5002 13.3999H3.7002" stroke="#185FA5" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 21.7999C5.5 19.7999 6.5 18.7999 8.5 18.7999C8.9 17.1999 10.1 16.3999 12.1 16.3999C14.5 16.3999 15.9 17.3999 16.3 19.3999C17.9 19.3999 18.7 20.1999 18.7 21.7999H5.5Z" fill="#185FA5" fill-opacity="0.1" stroke="#185FA5" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Climate</button>
  </nav>
`;

const benefitPanels = `
  <section class="tabpanel active" id="nature" role="tabpanel">
    <article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h1A1.5 1.5 0 0 1 5 2.5h4.134a1 1 0 1 1 0 1h-2.01q.269.27.484.605C8.246 5.097 8.5 6.459 8.5 8c0 1.993.257 3.092.713 3.7.356.476.895.721 1.787.784A1.5 1.5 0 0 1 12.5 11h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5H6.866a1 1 0 1 1 0-1h1.711a3 3 0 0 1-.165-.2C7.743 11.407 7.5 10.007 7.5 8c0-1.46-.246-2.597-.733-3.355-.39-.605-.952-1-1.767-1.112A1.5 1.5 0 0 1 3.5 5h-1A1.5 1.5 0 0 1 1 3.5zM2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10 10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/></svg></span>
        <div class="card-tt"><h3>Maintenance of ecological connectivity</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">880</span><span class="munit">ha</span></div><div class="metric-lab">contiguous habitat kept connected</div></div><div class="narr"><p>Conserving this <b>forest</b> ecosystem keeps an estimated <b>880 ha</b> block of natural habitat intact and safeguards its role as a connector in the surrounding landscape. Based on the site structure, <b>210 ha (&asymp; 24%)</b> of the area functions as a corridor linking separate habitat cores. Protecting it prevents the fragmentation that would likely occur under current deforestation pressure over the <b>30-year</b> project period.</p></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65"/></svg></span>
        <div class="card-tt"><h3>Protection of watershed function</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <p class="def">Safeguarding this <b>forest</b> ecosystem helps protect the natural capacity of the landscape to capture, store, filter, and slowly release water. Keeping the site under healthy natural cover supports more stable river flow, lower erosion and sediment loads, and better water quality downstream.</p>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826M8 1a1 1 0 0 0-.998 1.03l.01.091q.017.116.054.296c.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a5 5 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1M2 9l.03-.002.091-.01a5 5 0 0 0 .296-.054c.241-.049.542-.122.887-.213a61 61 0 0 0 2.314-.676L5.762 8l-.144-.045a61 61 0 0 0-2.314-.676 17 17 0 0 0-.887-.213 5 5 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2m7 5-.002-.03a5 5 0 0 0-.064-.386 16 16 0 0 0-.213-.888 61 61 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a5 5 0 0 0-.064.386L7 14a1 1 0 1 0 2 0m-5.696-2.134.025-.017a5 5 0 0 0 .303-.248c.184-.164.408-.377.661-.629A61 61 0 0 0 5.96 9.23l.103-.111-.147.033a61 61 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5 5 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027q.014-.03.036-.084a5 5 0 0 0 .102-.283c.078-.233.165-.53.258-.874a61 61 0 0 0 .572-2.343l.033-.147-.11.102a61 61 0 0 0-1.743 1.667 17 17 0 0 0-.629.66 5 5 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366m9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a5 5 0 0 0-.303.248 17 17 0 0 0-.661.629A61 61 0 0 0 10.04 6.77l-.102.111.147-.033a61 61 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a5 5 0 0 0 .367-.138zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027q-.014.03-.036.084a5 5 0 0 0-.102.283c-.078.233-.165.53-.258.875a61 61 0 0 0-.572 2.342l-.033.147.11-.102a61 61 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5 5 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366M14 9a1 1 0 0 0 0-2l-.03.002a5 5 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a5 5 0 0 0 .386.064zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035q.108.045.283.103c.233.078.53.165.874.258a61 61 0 0 0 2.343.572l.147.033-.103-.111a61 61 0 0 0-1.666-1.742 17 17 0 0 0-.66-.629 5 5 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366m2.196-1.196.017.025a5 5 0 0 0 .248.303c.164.184.377.408.629.661A61 61 0 0 0 6.77 5.96l.111.102-.033-.147a61 61 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5 5 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1m9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a61 61 0 0 0-2.342-.572l-.147-.033.102.111a61 61 0 0 0 1.667 1.742c.253.252.477.465.66.629a5 5 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366m-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5 5 0 0 0-.248-.303 17 17 0 0 0-.629-.661A61 61 0 0 0 9.23 10.04l-.111-.102.033.147a61 61 0 0 0 .572 2.342c.093.345.18.642.258.875a5 5 0 0 0 .138.367zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/></svg></span>
        <div class="card-tt"><h3>Enhanced biodiversity and ecosystem function</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">620</span><span class="munit">ha</span></div><div class="metric-lab">suitable habitat safeguarded vs. BAU</div></div><p class="def">The systemic recovery of species richness, abundance, and complex ecological interactions, resulting in a highly resilient ecosystem capable of self-regulation and intense carbon sequestration.</p><div class="narr"><p>Conserving this <b>forest</b> ecosystem maintains an estimated <b>620 hectares</b> of suitable habitat, safeguarding habitat extent for species over the <b>30 year</b> of project&rsquo;s duration.</p></div><div class="formula"><code>avoided_loss_ha = &Sigma; (habitat pixel area &times; deforestation risk) across the project area</code></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/></svg></span>
        <div class="card-tt"><h3>Reduced vulnerability to fire, pests, and disease</h3><div class="tagrow"><span class="pw pw-protect">Protect</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">23</span><span class="munit">species</span></div><div class="metric-lab">reduced extinction risk (IUCN STAR)</div></div><p class="def">The systemic enhancement of ecosystem and community resilience against catastrophic environmental disturbances, biological infestations, and climate-driven pathogens.</p><div class="narr"><p>By protecting at-risk habitat, this project supports habitat for <b>23</b> species, including <b>35%</b> threatened species: <b>1</b> CR, <b>3</b> EN, and <b>4</b> VU. Over the project&rsquo;s <b>30</b> year duration, the intervention may reduce threat levels by protecting at least <b>80%</b> of habitat for <b>23</b> species through: boundary demarcation &amp; legal recognition, community-based patrol &amp; monitoring, and fire prevention &amp; early warning.</p></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/></svg></span>
        <div class="card-tt"><h3>Improved forest productivity and regeneration</h3><div class="tagrow"><span class="pw pw-restore">Restore</span><span class="pw pw-manage">Manage</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">17</span><span class="munit">species</span></div><div class="metric-lab">expanded suitable habitat (IUCN STAR)</div></div><p class="def">The measurable acceleration of natural or assisted ecological growth, biomass accumulation, and structural recovery within a forest ecosystem over time.</p><div class="narr"><p>By restoring degraded areas, this project may expand habitat for <b>17</b> species, including <b>29%</b> threatened species: <b>1</b> CR, <b>2</b> EN, and <b>2</b> VU. Over the project&rsquo;s <b>30</b> year duration, the intervention may increase suitable habitat by <b>15%</b> for <b>17</b> species through: assisted natural regeneration, enrichment planting, and agroforestry transition.</p></div>
    </article>
  </section>

  <section class="tabpanel" id="people" role="tabpanel">
    <div class="fgrid"><article class="fcard" data-key="food_water" data-mode="single">
      <div class="fcard-inner">
        <div class="face front">
          <span class="corner"></span>
          <div class="card-head">
            <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
  <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/></svg></span>
            <div class="card-tt"><h3>Enhanced food and water security</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def">The guaranteed year-round, climate-resilient community access to critical nutritional and hydrological resources by stabilizing and restoring vital ecosystem functions.</p>
          </div>
          <div class="front-answered" hidden>
            <span class="face-lab answered"><svg class="ic" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>Your benefit statement</span>
            <p class="statement"></p>
            <p class="answer-echo"></p>
          </div>
          <div class="cta"><span class="cta-txt"><span class="c-def">Tap to specify this benefit</span><span class="c-ans" hidden>Re-specify</span></span><svg class="cta-chev" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></div>
        </div>
        <div class="face back">
          <span class="corner"></span>
          <div class="back-head">
            <button class="back-btn" type="button" aria-label="Back"><svg class="chev-back" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></button>
            <span class="face-lab back-lab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Benefit specification</span>
            <button class="reset-btn" type="button" aria-label="Reset specification"><svg class="ic" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/></svg>Reset</button>
          </div>
          <p class="prompt">Do households have year-round access to clean water and sufficient food?</p>
          <div class="opts"><button class="opt" type="button" data-statement="Maintain food and water security" data-answer="Yes"><span class="opt-radio"></span><span class="opt-lab">Yes</span></button><button class="opt" type="button" data-statement="Enhance food and water security" data-answer="No"><span class="opt-radio"></span><span class="opt-lab">No</span></button></div>
          
        </div>
      </div>
    </article><article class="fcard" data-key="livelihood" data-mode="multi">
      <div class="fcard-inner">
        <div class="face front">
          <span class="corner"></span>
          <div class="card-head">
            <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6z"/></svg></span>
            <div class="card-tt"><h3>Sustainable livelihood opportunities</h3><div class="tagrow"><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def">The generation of climate-adaptive, nature-positive revenue streams that allow households to withstand economic shocks without degrading or depleting the local natural resource base.</p>
          </div>
          <div class="front-answered" hidden>
            <span class="face-lab answered"><svg class="ic" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>Your benefit statement</span>
            <p class="statement"></p>
            <p class="answer-echo"></p>
          </div>
          <div class="cta"><span class="cta-txt"><span class="c-def">Tap to specify this benefit</span><span class="c-ans" hidden>Re-specify</span></span><svg class="cta-chev" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></div>
        </div>
        <div class="face back">
          <span class="corner"></span>
          <div class="back-head">
            <button class="back-btn" type="button" aria-label="Back"><svg class="chev-back" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></button>
            <span class="face-lab back-lab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Benefit specification</span>
            <button class="reset-btn" type="button" aria-label="Reset specification"><svg class="ic" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/></svg>Reset</button>
          </div>
          <p class="prompt">Which of the following best describes most households&rsquo; primary source of livelihood?</p>
          <div class="opts"><label class="optm"><input type="checkbox" value="NTFP"><span class="optm-box"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg></span><span class="optm-body"><span class="optm-lab">NTFP</span><span class="optm-desc">Harvesting and selling Non-Timber Forest Products (e.g., fruits, nuts, medicinal plants, resin) integrated into the forest mix.</span></span></label><label class="optm"><input type="checkbox" value="Nursery work"><span class="optm-box"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg></span><span class="optm-body"><span class="optm-lab">Nursery work</span><span class="optm-desc">Seedling production &mdash; soil preparation, bagging, watering, and weeding.</span></span></label><label class="optm"><input type="checkbox" value="Planting work"><span class="optm-box"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg></span><span class="optm-body"><span class="optm-lab">Planting work</span><span class="optm-desc">Site preparation, transporting seedlings, digging, and planting.</span></span></label><label class="optm optm-none"><input type="checkbox" value="__none__"><span class="optm-box"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg></span><span class="optm-body"><span class="optm-lab">None of them</span></span></label></div>
          <button class="apply" type="button">Apply specification</button>
        </div>
      </div>
    </article><article class="fcard" data-key="social" data-mode="single">
      <div class="fcard-inner">
        <div class="face front">
          <span class="corner"></span>
          <div class="card-head">
            <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/></svg></span>
            <div class="card-tt"><h3>Strengthened social capital and governance capacity</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def">The advancement of community cohesion, institutional trust, and localized legislative and operational capacity to independently manage resources, enforce laws, and resolve conflicts.</p>
          </div>
          <div class="front-answered" hidden>
            <span class="face-lab answered"><svg class="ic" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>Your benefit statement</span>
            <p class="statement"></p>
            <p class="answer-echo"></p>
          </div>
          <div class="cta"><span class="cta-txt"><span class="c-def">Tap to specify this benefit</span><span class="c-ans" hidden>Re-specify</span></span><svg class="cta-chev" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></div>
        </div>
        <div class="face back">
          <span class="corner"></span>
          <div class="back-head">
            <button class="back-btn" type="button" aria-label="Back"><svg class="chev-back" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></button>
            <span class="face-lab back-lab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Benefit specification</span>
            <button class="reset-btn" type="button" aria-label="Reset specification"><svg class="ic" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/></svg>Reset</button>
          </div>
          <p class="prompt">To what extent has the project strengthened local social capital and governance capacity (e.g., community trust, leadership, and collective decision-making)?</p>
          <div class="opts"><button class="opt" type="button" data-statement="Sustain social capital and governance capacity" data-answer="Local institutions and leaders now manage resources independently, trust within the community has grown, and collective decision-making is strong and inclusive."><span class="opt-radio"></span><span class="opt-lab">Local institutions and leaders now manage resources independently, trust within the community has grown, and collective decision-making is strong and inclusive.</span></button><button class="opt" type="button" data-statement="Optimise social capital and governance capacity" data-answer="Community groups or leadership exist, but they still heavily rely on outside support to resolve conflicts, make decisions, or manage resources effectively."><span class="opt-radio"></span><span class="opt-lab">Community groups or leadership exist, but they still heavily rely on outside support to resolve conflicts, make decisions, or manage resources effectively.</span></button><button class="opt" type="button" data-statement="Convene social capital and governance capacity" data-answer="There has been no meaningful improvement in community cooperation, trust, or leadership capacity; decision-making remains weak or fragmented."><span class="opt-radio"></span><span class="opt-lab">There has been no meaningful improvement in community cooperation, trust, or leadership capacity; decision-making remains weak or fragmented.</span></button></div>
          
        </div>
      </div>
    </article><article class="fcard" data-key="equity" data-mode="single">
      <div class="fcard-inner">
        <div class="face front">
          <span class="corner"></span>
          <div class="card-head">
            <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793zm1 0V7.5h6.482A7 7 0 0 0 8.5 1.018M14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"/></svg></span>
            <div class="card-tt"><h3>Equitable benefit-sharing mechanisms</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def">The establishment of transparent, inclusive, and legally binding institutional frameworks that distribute project-generated rewards and resource rights fairly while actively preventing elite capture.</p>
          </div>
          <div class="front-answered" hidden>
            <span class="face-lab answered"><svg class="ic" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>Your benefit statement</span>
            <p class="statement"></p>
            <p class="answer-echo"></p>
          </div>
          <div class="cta"><span class="cta-txt"><span class="c-def">Tap to specify this benefit</span><span class="c-ans" hidden>Re-specify</span></span><svg class="cta-chev" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></div>
        </div>
        <div class="face back">
          <span class="corner"></span>
          <div class="back-head">
            <button class="back-btn" type="button" aria-label="Back"><svg class="chev-back" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></button>
            <span class="face-lab back-lab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Benefit specification</span>
            <button class="reset-btn" type="button" aria-label="Reset specification"><svg class="ic" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/></svg>Reset</button>
          </div>
          <p class="prompt">How transparent is the process for distributing financial and non-financial benefits to local stakeholders?</p>
          <div class="opts"><button class="opt" type="button" data-statement="Maintain equitable benefit-sharing mechanism" data-answer="Highly Transparent"><span class="opt-radio"></span><span class="opt-lab">Highly Transparent &mdash; the distribution rules, financial records, and beneficiary lists are fully public, clearly understood, and easy for anyone to access.</span></button><button class="opt" type="button" data-statement="Increase equitable benefit-sharing mechanism" data-answer="Partially Transparent"><span class="opt-radio"></span><span class="opt-lab">Partially Transparent &mdash; some information is shared or benefits are received, but the exact criteria for who gets how much remains unclear to most people.</span></button><button class="opt" type="button" data-statement="Establish equitable benefit-sharing mechanism" data-answer="Not Transparent"><span class="opt-radio"></span><span class="opt-lab">Not Transparent &mdash; the entire process is handled behind closed doors with no clear information, public records, or community oversight.</span></button></div>
          
        </div>
      </div>
    </article><article class="fcard" data-key="tenure" data-mode="single">
      <div class="fcard-inner">
        <div class="face front">
          <span class="corner"></span>
          <div class="card-head">
            <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg></span>
            <div class="card-tt"><h3>Secure land and resource tenure</h3><div class="tagrow"><span class="pw pw-protect">Protect</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def">The formalization, legal protection, and institutional enforcement of a community&rsquo;s bundle of rights to possess, use, manage, and inherit land and natural resources, safeguarding them against displacement and unauthorized exploitation.</p>
          </div>
          <div class="front-answered" hidden>
            <span class="face-lab answered"><svg class="ic" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>Your benefit statement</span>
            <p class="statement"></p>
            <p class="answer-echo"></p>
          </div>
          <div class="cta"><span class="cta-txt"><span class="c-def">Tap to specify this benefit</span><span class="c-ans" hidden>Re-specify</span></span><svg class="cta-chev" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></div>
        </div>
        <div class="face back">
          <span class="corner"></span>
          <div class="back-head">
            <button class="back-btn" type="button" aria-label="Back"><svg class="chev-back" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></button>
            <span class="face-lab back-lab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Benefit specification</span>
            <button class="reset-btn" type="button" aria-label="Reset specification"><svg class="ic" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/></svg>Reset</button>
          </div>
          <p class="prompt">What is the status of land tenure formalization for Indigenous Peoples and Local Communities (IPLCs) within the project area?</p>
          <div class="opts"><button class="opt" type="button" data-statement="Preserve land security, resource tenure and cultural heritage preservation" data-answer="Explicit legal titles are fully recognized and enforced."><span class="opt-radio"></span><span class="opt-lab">Explicit legal titles are fully recognized and enforced.</span></button><button class="opt" type="button" data-statement="Increase enforcement of land security, resource tenure and cultural heritage preservation" data-answer="Legal recognition exists, but enforcement / boundary disputes are common."><span class="opt-radio"></span><span class="opt-lab">Legal recognition exists, but enforcement / boundary disputes are common.</span></button><button class="opt" type="button" data-statement="Establish legal recognition of land security, resource tenure and cultural heritage preservation" data-answer="Customary rights are recognized informally, but no legal titles exist."><span class="opt-radio"></span><span class="opt-lab">Customary rights are recognized informally, but no legal titles exist.</span></button><button class="opt" type="button" data-statement="Recognise land security, resource tenure and cultural heritage preservation" data-answer="Land tenure is insecure or unrecognized."><span class="opt-radio"></span><span class="opt-lab">Land tenure is insecure or unrecognized.</span></button></div>
          
        </div>
      </div>
    </article><article class="fcard" data-key="cultural" data-mode="single">
      <div class="fcard-inner">
        <div class="face front">
          <span class="corner"></span>
          <div class="card-head">
            <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg></span>
            <div class="card-tt"><h3>Cultural heritage preservation</h3><div class="tagrow"><span class="pw pw-protect">Protect</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def">The safeguarding, transmission, and active protection of a community&rsquo;s intangible traditions, localized ecological knowledge, sacred sites, and customary ways of life that are deeply intertwined with the surrounding landscape.</p>
          </div>
          <div class="front-answered" hidden>
            <span class="face-lab answered"><svg class="ic" width="13" height="13" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>Your benefit statement</span>
            <p class="statement"></p>
            <p class="answer-echo"></p>
          </div>
          <div class="cta"><span class="cta-txt"><span class="c-def">Tap to specify this benefit</span><span class="c-ans" hidden>Re-specify</span></span><svg class="cta-chev" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></div>
        </div>
        <div class="face back">
          <span class="corner"></span>
          <div class="back-head">
            <button class="back-btn" type="button" aria-label="Back"><svg class="chev-back" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg></button>
            <span class="face-lab back-lab"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Benefit specification</span>
            <button class="reset-btn" type="button" aria-label="Reset specification"><svg class="ic" width="11" height="11" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/></svg>Reset</button>
          </div>
          <p class="prompt">What is the status of land tenure formalization for Indigenous Peoples and Local Communities (IPLCs) within the project area?</p>
          <div class="opts"><button class="opt" type="button" data-statement="Preserve land security, resource tenure and cultural heritage preservation" data-answer="Explicit legal titles are fully recognized and enforced."><span class="opt-radio"></span><span class="opt-lab">Explicit legal titles are fully recognized and enforced.</span></button><button class="opt" type="button" data-statement="Increase enforcement of land security, resource tenure and cultural heritage preservation" data-answer="Legal recognition exists, but enforcement / boundary disputes are common."><span class="opt-radio"></span><span class="opt-lab">Legal recognition exists, but enforcement / boundary disputes are common.</span></button><button class="opt" type="button" data-statement="Establish legal recognition of land security, resource tenure and cultural heritage preservation" data-answer="Customary rights are recognized informally, but no legal titles exist."><span class="opt-radio"></span><span class="opt-lab">Customary rights are recognized informally, but no legal titles exist.</span></button><button class="opt" type="button" data-statement="Recognise land security, resource tenure and cultural heritage preservation" data-answer="Land tenure is insecure or unrecognized."><span class="opt-radio"></span><span class="opt-lab">Land tenure is insecure or unrecognized.</span></button></div>
          
        </div>
      </div>
    </article></div>
  </section>

  <section class="tabpanel" id="climate" role="tabpanel">
    <article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M3.112 5.112a3 3 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447q0-.113.018-.231zm2.55-1.45-.725-.725A5.5 5.5 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z"/>
  <path d="m13.646 14.354-12-12 .708-.708 12 12z"/></svg></span>
        <div class="card-tt"><h3>Reduced emissions from deforestation and degradation</h3><div class="tagrow"><span class="pw pw-protect">Protect</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*35)}</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">avoided over the project duration</div></div><p class="def">The greenhouse gas emissions are avoided by protecting this ecosystem from deforestation or degradation, keeping stored carbon locked in vegetation and soil rather than released to the atmosphere.</p><div class="narr"><p>Protecting this <b>forest</b> ecosystem can avoid an estimated <b>${NBS_DATA.grp(NBS_DATA.totalEligible*35)} tonnes</b> of CO&#8322;eq emissions over the project&rsquo;s <b>30 year</b> duration.</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg><span>Through: boundary demarcation &amp; legal recognition; community-based patrol; fire prevention &amp; early warning</span></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/></svg></span>
        <div class="card-tt"><h3>Increased carbon sequestration and storage</h3><div class="tagrow"><span class="pw pw-restore">Restore</span><span class="pw pw-manage">Manage</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*86)}</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">sequestered over the project duration</div></div><p class="def">The additional greenhouse gases are removed from the atmosphere as this ecosystem is restored or sustainably managed, drawing carbon into growing vegetation and soil where it is stored over time.</p><div class="narr"><p>Restoring and sustainably managing this <b>forest</b> ecosystem can sequester an estimated <b>${NBS_DATA.grp(NBS_DATA.totalEligible*86)} tonnes</b> of CO&#8322;eq over the project&rsquo;s <b>30 years</b> duration.</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg><span>Cook-Patton et&nbsp;al. (2020) natural-regrowth rates &middot; assisted regeneration, enrichment planting, agroforestry</span></div>
    </article><article class="scard"><span class="corner"></span><div class="card-head"><span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M3.112 5.112a3 3 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447q0-.113.018-.231zm2.55-1.45-.725-.725A5.5 5.5 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z"/>
  <path d="m13.646 14.354-12-12 .708-.708 12 12z"/></svg></span><div class="card-tt"><h3>Net carbon emissions reduction</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*35*0.65)}</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">net emissions reduction after deductions</div></div><p class="def">If this project is developed for an NbS Carbon Project, the net carbon emissions reduction is estimated at <b>${NBS_DATA.grp(NBS_DATA.totalEligible*35*0.65)} tCO&#8322;e</b> after applying deductions to the total estimated carbon reduction of <b>${NBS_DATA.grp(NBS_DATA.totalEligible*35)} tCO&#8322;e</b>.</p><div class="formula"><code>Net = Gross ${NBS_DATA.grp(NBS_DATA.totalEligible*35)} &minus; Leakage ${NBS_DATA.grp(NBS_DATA.totalEligible*3.5)} &minus; Uncertainty ${NBS_DATA.grp(NBS_DATA.totalEligible*3.5)} &minus; Buffer ${NBS_DATA.grp(NBS_DATA.totalEligible*5.25)} = ${NBS_DATA.grp(NBS_DATA.totalEligible*35*0.65)} tCO&#8322;e</code></div></article><article class="scard"><span class="corner"></span><div class="card-head"><span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M3.112 5.112a3 3 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447q0-.113.018-.231zm2.55-1.45-.725-.725A5.5 5.5 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z"/>
  <path d="m13.646 14.354-12-12 .708-.708 12 12z"/></svg></span><div class="card-tt"><h3>Net carbon sequestration</h3><div class="tagrow"><span class="pw pw-restore">Restore</span><span class="pw pw-manage">Manage</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*86*0.65)}</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">net sequestration after deductions</div></div><p class="def">The net carbon sequestration is estimated at <b>${NBS_DATA.grp(NBS_DATA.totalEligible*86*0.65)} tCO&#8322;e</b> after applying deductions to the total estimated carbon sequestration of <b>${NBS_DATA.grp(NBS_DATA.totalEligible*86)} tCO&#8322;e</b>.</p><div class="formula"><code>Net = Gross ${NBS_DATA.grp(NBS_DATA.totalEligible*86)} &minus; Leakage ${NBS_DATA.grp(NBS_DATA.totalEligible*8.6)} &minus; Uncertainty ${NBS_DATA.grp(NBS_DATA.totalEligible*8.6)} &minus; Buffer ${NBS_DATA.grp(NBS_DATA.totalEligible*12.9)} = ${NBS_DATA.grp(NBS_DATA.totalEligible*86*0.65)} tCO&#8322;e</code></div></article><article class="scard"><span class="corner"></span><div class="card-head"><span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M3.112 5.112a3 3 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447q0-.113.018-.231zm2.55-1.45-.725-.725A5.5 5.5 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z"/>
  <path d="m13.646 14.354-12-12 .708-.708 12 12z"/></svg></span><div class="card-tt"><h3>Estimated net emission reduction and removals (Net ERRs)</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*121*0.8)}</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">net ERRs over the 30-yr crediting period</div></div><p class="def">Over a <b>30-year</b> crediting period, the project area could generate an estimated <b>${NBS_DATA.grp(NBS_DATA.totalEligible*121*0.8)} tCO&#8322;e</b> of net emission reductions and removals, an average of <b>${NBS_DATA.grp(NBS_DATA.totalEligible*121*0.8/30)} tCO&#8322;e</b> per year. This figure already subtracts leakage and uncertainty deductions from the gross potential of <b>${NBS_DATA.grp(NBS_DATA.totalEligible*121)} tCO&#8322;e</b>. It does not yet subtract the buffer contribution, which is held to cover permanence risk.</p></article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M8 14.933a1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/></svg></span>
        <div class="card-tt"><h3>Enhance resilience to climate hazards</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">3,400</span><span class="munit">people</span></div><div class="metric-lab">at reduced disaster exposure</div></div><p class="def">The reduction in people&rsquo;s and assets&rsquo; exposure to climate hazards achieved by using healthy ecosystems as natural buffers.</p><div class="narr"><p>Implementing NbS in this ecosystem can reduce disaster exposure across an estimated <b>${NBS_DATA.grp(NBS_DATA.totalEligible)} hectares</b>, helping to lower risk for an estimated <b>3,400 people</b> / <b>850 households</b> / <b>6 communities</b> over the project&rsquo;s <b>30-year</b> duration.</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg><span>ADPC Climate Disaster Risk &middot; SIGnal Forest Cover &middot; Gridded World Pop</span></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
  <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/></svg></span>
        <div class="card-tt"><h3>Microclimate regulation</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*0.48)}</span><span class="munit">ha</span></div><div class="metric-lab">tree-cover increase (&asymp; 48% of AOI)</div></div><p class="def">The moderation of local temperatures by vegetation, through canopy shading and evapotranspiration, which buffers the area within and around it against heat extremes. Estimates the area of tree cover delivering this cooling function.</p><div class="narr"><p>Conserving this <b>forest</b> ecosystem, with an estimated <b>${NBS_DATA.grp(NBS_DATA.totalEligible*0.48)} hectares (&asymp; 48%)</b> of tree cover increase, helps regulate the local microclimate, moderating temperatures through shading and evapotranspiration, and buffering the surrounding area against heat extremes over the project&rsquo;s <b>30 year</b> duration.</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg><span>SIGnal forest-cover benchmark &middot; De&nbsp;Frenne et&nbsp;al. (2019), <i>Nature Ecology &amp; Evolution</i></span></div>
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
        <p>Figures are an <b>illustrative worked example</b> for the ${NBS_DATA.grp(NBS_DATA.totalEligible)} ha analysed area over 30 years (Forest ${NBS_DATA.grp(NBS_DATA.eco.forest.area)} ha, Mangrove ${NBS_DATA.grp(NBS_DATA.eco.mangrove.area)} ha, Peatland ${NBS_DATA.grp(NBS_DATA.eco.peat.area)} ha). Carbon uses a forest stock of ~154 tC/ha with <b>0.4%/yr</b> avoided deforestation (Protect) and natural-regrowth sequestration of <b>8.8</b> (Restore) / <b>3.6</b> (Manage) tCO&#8322;e/ha/yr &mdash; giving <code>${NBS_DATA.grp(NBS_DATA.totalEligible * 35)} avoided + ${NBS_DATA.grp(NBS_DATA.totalEligible * 86)} sequestered = ${NBS_DATA.grp(NBS_DATA.totalEligible * 121)} tCO&#8322;e</code>.</p>
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

/* Placeholder links (href="#") in the injected content would otherwise
   navigate to an empty fragment and scroll the panel back to the top. */
document.addEventListener('click', function(e){
  var a = e.target.closest ? e.target.closest('a[href="#"]') : null;
  if (a) e.preventDefault();
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
    i.style.height = faceHeight(c.querySelector(c.classList.contains('flipped') ? '.back' : '.front')) + 'px'; }
  function sizeAll(){ cards.forEach(sizeCard); }

  /* Per-tab scroll memory: switching tabs keeps each tab's own scroll
     position instead of resetting/clamping to the top. */
  function scrollerOf(el){
    for (var n = el.parentElement; n; n = n.parentElement){
      var s = getComputedStyle(n);
      if (/(auto|scroll)/.test(s.overflowY) && n.scrollHeight > n.clientHeight) return n;
    }
    return document.scrollingElement;
  }
  var scrollMem = {}, activeKey = null;
  function show(key){
    var sc = scrollerOf(root);
    if (activeKey && activeKey !== key) scrollMem[activeKey] = sc.scrollTop;
    tabs.forEach(function(t){ t.classList.toggle('active', t.dataset.tab === key); });
    panels.forEach(function(p){ p.classList.toggle('active', p.id === key); });
    var restore = activeKey !== key ? scrollMem[key] : null;
    activeKey = key;
    requestAnimationFrame(function(){ sizeAll(); if (restore != null) sc.scrollTop = restore; });
  }
  var initActive = tabs.filter(function(t){ return t.classList.contains('active'); })[0];
  if (initActive) activeKey = initActive.dataset.tab;
  tabs.forEach(function(t){ t.addEventListener('click', function(){ show(t.dataset.tab); }); });

  cards.forEach(function(card){
    var front=card.querySelector('.front'), backBtn=card.querySelector('.back-btn'), mode=card.dataset.mode;
    function flip(on){ card.classList.toggle('flipped', on); requestAnimationFrame(function(){ sizeCard(card); }); }
    front.addEventListener('click', function(){ flip(true); });
    backBtn.addEventListener('click', function(e){ e.stopPropagation(); flip(false); });
    function apply(text, echo){
      card.querySelector('.statement').innerHTML = text;
      card.querySelector('.answer-echo').innerHTML = echo ? '<b>Specification:</b> ' + echo : '';
      card.querySelector('.front-default').hidden = true;
      card.querySelector('.front-answered').hidden = false;
      card.querySelector('.c-def').hidden = true; card.querySelector('.c-ans').hidden = false;
      var ft = card.querySelector('.ft-txt'); if (ft) ft.textContent = 'Specified';
      card.classList.add('answered'); flip(false);
    }
    /* Clear the specification and return the card to its un-specified state. */
    function reset(){
      card.querySelectorAll('.opt').forEach(function(o){ o.classList.remove('sel'); });
      card.querySelectorAll('.optm input').forEach(function(b){ b.checked = false; });
      card.querySelector('.statement').innerHTML = '';
      card.querySelector('.answer-echo').innerHTML = '';
      card.querySelector('.front-default').hidden = false;
      card.querySelector('.front-answered').hidden = true;
      card.querySelector('.c-def').hidden = false; card.querySelector('.c-ans').hidden = true;
      var ft = card.querySelector('.ft-txt'); if (ft) ft.textContent = '';
      card.classList.remove('answered');
      requestAnimationFrame(function(){ sizeCard(card); });
    }
    var resetBtn = card.querySelector('.reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', function(e){ e.stopPropagation(); reset(); });
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
        if (sel.length === 0) { text='Cultivate livelihood opportunities through NTFP, Nursery and Planting work'; echo='None of them'; }
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

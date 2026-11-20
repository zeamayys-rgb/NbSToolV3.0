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
     threat          → the three Threat profile accordion groups (both pages)
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

/* Dataset catalogue behind every "i" button in Site Characterisation — the
   rows come from the shared NbS dataset sheet (F02 Site Characterisation).
   Mark an icon with a key here via gcHead(title, icon, key) / gcSub(title, key);
   interactive-map.html renders the matching row in its layer-info modal. */
const NBS_LAYER_INFO = {
  "administration": {
    name: "Administration",
    category: "Site information",
    dateOfContent: "2022",
    description: "Administrative boundaries from GADM, the Database of Global Administrative Areas. The tool uses them to name the province, district and sub-district that the selected area overlaps, with the overlapping area of each.",
    disclaimer: "Reference boundaries only, not a legal source for jurisdiction or tenure. The level of administrative detail varies by country.",
    resolution: "N/A",
    source: "GADM"
  },
  "ecosystem-type": {
    name: "Reference ecosystem",
    category: "Site information",
    dateOfContent: "Historical",
    description: "A composite classification layer for Southeast Asia that merges the mangrove, peatland, and dryland layers into a single ecosystem-type map, including the areas where two or all three overlap.",
    disclaimer: "Ecosystem types and area figures shown here are derived from regional remote-sensing and land-cover datasets across Southeast Asia. They are indicative estimates, not ground-verified measurements, and may differ from actual conditions. Boundaries between mangrove, peatland, and dryland forest can be misclassified depending on imagery date and resolution. Verify with field data before using these figures for planning or reporting",
    resolution: "30 meters",
    source: "SCeNe Coalition"
  },
  "protected-area": {
    name: "Protection / zoning status (Protected Areas)",
    category: "Site information",
    dateOfContent: "Dynamic",
    description: "Protected Areas are areas designated and managed, through law or other effective means, to conserve nature over the long term. This layer is drawn from the World Database on Protected Areas (WDPA), the most comprehensive global dataset on terrestrial and marine protected areas, jointly produced by the UN Environment Programme World Conservation Monitoring Centre (UNEP-WCMC) and the International Union for Conservation of Nature (IUCN). It compiles the boundaries and attributes of protected areas submitted by governments, NGOs, landowners, and communities, is updated monthly, and is distributed openly through the Protected Planet website (protectedplanet.net). The WDPA underpins reporting on global biodiversity targets and the Sustainable Development Goals and is widely used across research, government, and industry to identify conservation priorities and assess biodiversity risk.",
    disclaimer: "Protected area data are compiled from the WDPA and provided \"as is.\" They may differ from official national records and should not be treated as a legal reference; the boundaries and designations shown imply no opinion on the legal status of any territory or its frontiers. For authoritative information, refer to the relevant national authority",
    resolution: "30 meters",
    source: "World Database on Protected Areas (WDPA) \u2014 UNEP-WCMC & IUCN, Protected Planet (WDPA)"
  },
  "terrain": {
    name: "Terrain (elevation & slope)",
    category: "Site information",
    dateOfContent: "Historical",
    description: "Elevation shows the height of the land above sea level across Southeast Asia, derived from SRTM 30 m data and grouped into four classes: lowland (0 to 500 m), submontane or hill (500 to 1000 m), montane (1000 to 2000 m), and upper montane (above 2000 m). In the tool it reports the elevation range of an area, from its lowest to highest point in metres above sea level, and the class that covers most of it.\n\nSlope shows the steepness of the terrain across Southeast Asia, expressed as percent rise, the vertical gain over horizontal distance. Values are grouped into five classes: flat (0 to 8%), gently sloping (8 to 15%), moderately steep (15 to 25%), steep (25 to 40%), and very steep (above 40%). The layer is derived from SRTM 30 m elevation data, with slope calculated as percent rise and reclassified into these classes. The classification follows and modifies the SOTER (Soil and Terrain) slope scheme adapted into five terrain-steepness classes.",
    disclaimer: "This layer is derived from SRTM 30 m elevation data and has not been field-verified at every location. Provided as is for landscape-scale analysis, the elevation and slope values and their classes are approximate and should not be used as a legal or authoritative determination of ground height, steepness, or boundaries.",
    resolution: "30 meters",
    source: "SRTM"
  },
  "deforestation-2014-2024": {
    name: "Historical deforestation (2014\u20132024)",
    category: "Threat profile",
    dateOfContent: "2014 - 2024",
    description: "Deforestation 2014 to 2024 shows where natural forest standing in 2014 had been lost by 2024 across Southeast Asia, marking the areas that changed from forest to non-forest over the decade. The layer is derived directly from Forest Cover 2014 and Forest Cover 2024 using simple Boolean logic, flagging pixels that were natural forest in 2014 but no longer natural forest in 2024. These inputs draw on the SERVIR RLCMS land cover maps, with the 2014 baseline also using University of Maryland tree canopy cover and height data. It records the location and extent of loss but does not attribute its cause, which may range from clearing and conversion to other forms of disturbance.",
    disclaimer: "This layer is derived from modeled forest classifications and has not been field-verified at every location. Provided as is for landscape-scale analysis, it identifies forest loss without attributing its cause and should not be used as a legal or authoritative determination of deforestation, forest status, or boundaries.",
    resolution: "30 meters",
    source: "SIGnal"
  },
  "deforestation-risk": {
    name: "Deforestation risk",
    category: "Threat profile",
    dateOfContent: "Deforestation was observed over 2014-2024",
    description: "This layer shows the modelled probability of future unplanned deforestation across Southeast Asia, serving as a baseline to project where and how much forest is likely to be lost without intervention \u2014 high-risk locations can be used to define an NbS project footprint or, under jurisdictional carbon frameworks (e.g. Verra JNR), to allocate baseline deforestation. The 30 m probability surface (0\u2013100%) follows the \"forestatrisk\" approach (Vieilledent et al. 2021, 2023; https://forestatrisk.cirad.fr) for selecting explanatory variables, but the probability itself is estimated with a Random Forest classifier trained on observed forest-cover change over 2014\u20132024",
    disclaimer: "1) The output is relative deforestation risk, not a calibrated rate. It should be read as a ranking of risk, not an absolute figure.\n2) Accuracy is reported in-sample (AUC). Independent or out-of-time validation has not yet been done.\n3) Only two dates (2014 and 2024) are available, so distance to past deforestation cannot be used as a leak-free predictor.",
    resolution: "30 meters",
    source: "SCeNe Coalition"
  },
  "land-cover-2024": {
    name: "Land cover (2024)",
    category: "Site information",
    dateOfContent: "2024",
    description: "Land Cover 2024 shows the physical cover of the land surface across Southeast Asia in 2024, including natural and planted vegetation, bare ground, built surfaces, and water. It classifies the landscape into 19 cover classes spanning forest, cropland and plantation, grassland and shrub, settlement, water, and wetland, and serves as the base layer from which the forest, mangrove, and other thematic products are derived. The map was produced with the SERVIR Regional Land Cover Monitoring System (RLCMS) in Google Earth Engine, using AlphaEarth Foundations satellite embeddings, specifically the 2024 annual, 64-band embedding layer. Each class was first modeled as a probability layer, then combined through a hierarchical decision tree applying tree canopy cover, tree canopy height, and a minimum mapping unit to assign a single class to every pixel.",
    disclaimer: "This layer is a modeled classification from satellite data and has not been field-verified at every location. Provided as is for landscape-scale analysis, it should not be used as a legal or authoritative determination of land cover, tenure, or boundaries.",
    resolution: "30 meters",
    source: "SIGnal land cover \u2014 Saah, D., Tenneson, K., Poortinga, A., Nguyen, Q., Chishtie, F., Aung, K. S., Markert, K. N., Clinton, N., Anderson, E. R., Cutter, P., Goldstein, J., Housman, I. W., Bhandari, B., Potapov, P. V., Matin, M., Uddin, K., Pham, H. N., Khanal, N., Maharjan, S., ... Ganz, D. (2020). Primitives as building blocks for constructing land cover maps. International Journal of Applied Earth Observation and Geoinformation, 85, 101979. https://doi.org/10.1016/j.jag.2019.101979"
  },
  "disaster-risk": {
    name: "Natural disaster risk",
    category: "Threat profile",
    dateOfContent: "Dynamic",
    description: "Flood: The GAR Atlas global flood hazard assessment uses a probabilistic approach for modelling riverine flood major river basins around the globe. This has been possible after compiling a global database of stream-flow data, merging different sources and gathering more than 8000 stations over the globe in order to calculate the range of possible discharges from very low to the maximum possible scales at different locations along the rivers. The calculated discharges were introduced in the river sections to model water levels downstream. This procedure allowed for the determination of stochastic event-sets of riverine floods from which hazard maps for 100 return periods were obtained. The hazard maps are developed at 1kmx1km resolution and have been validated against satellite flood footprints from different sources (DFO archive, UNOSAT flood portal) performing well especially for big events For smaller events (lower return periods), the GAR Atlas flood hazard maps tend to overestimate with respect to similar maps produced locally (hazard maps where available for some countries and were used as benchmark). The main issue being that, due to the resolution, the GAR Atlas flood hazard maps do not take into account flood defenses that are normally present to preserve the value exposed to floods. More information about the flood hazard assessment can be found in the background paper (Rudari et al., 2015).\n\nLandslide: The Global Landslide Hazard Distribution is a 2.5 minute grid of global landslide and snow avalanche hazards based upon work of the Norwegian Geotechnical Institute (NGI). The hazards mapping of NGI incorporates a range of data including slope, soil, soil moisture conditions, precipitation, seismicity, and temperature. Shuttle Radar Topography Mission (SRTM) elevation data at 30 seconds resolution are also incorporated. Hazards values less than or equal to 4 are considered negligible and only values 5 through 9 are utilized in further analyses. To ensure compatibility with other data sets, value 1 is added to each of the values to provide a hazard ranking ranging 6 through 10 in increasing hazard. This data set is the result of collaboration among the Columbia University Center for Hazards and Risk Research (CHRR), Norwegian Geotechnical Institute (NGI), and Columbia University Center for International Earth Science and Information Network (CIESIN).\n\nDrought: The Global Drought Hazard Frequency and Distribution is a 2.5 minute grid based upon the International Research Institute for Climate Prediction's (IRI) Weighted Anomaly of Standardized Precipitation (WASP). Utilizing average monthly precipitation data from 1980 through 2000 at a resolution of 2.5 degrees, WASP assesses the precipitation deficit or surplus over a three month temporal window that is weighted by the magnitude of the seasonal cyclic variation in precipitation. The three months' averages are derived from the precipitation data and the median rainfall for the 21 year period is calculated for each grid cell. Grid cells where the three month running average of precipitation is less than 1 mm per day ae excluded. Drought events are identified when the magnitude of a monthly precipitation deficit is less than or equal to 50 percent of its longterm median value for three or more consecutive months. Grid cells are then divided into 10 classes having an approximately equal number of grid cells. Higher grid cell values denote higher frequencies of drought occurrences. This data set is the result of collaboration among the Columbia University Center for Hazards and Risk Research (CHRR), Columbia University International Research Institute for Climate Prediction (IRI), and Columbia University Center for International Earth Science Information Network (CIESIN).\n\nTropical typhoon: The Global Cyclone Hazard Frequency and Distribution is a 2.5 minute grid based on more than 1,600 storm tracks for the period 1 January 1980 through 31 December 2000 for the Atlantic, Pacific, and Indian Oceans that were assembled and modeled at UNEP/GRID-Geneva PreView. Windspeeds around storm tracks were modeled using Holland's model (1997) to assess the grid cells likely to have been exposed to high wind levels. Post-modeling, the cells were divided into deciles, 10 classes consisting of approximately equal number of grid cells. The higher the value of the grid cell, the higher the decile ranking and the greater the frequency of the hazard relative to other cells. This data set is the result of collaboration among the Columbia University Center for Hazards and Risk Research (CHRR), International Bank for Reconstruction and Development/The World Bank, United Nations Environment Programme Global Resource Information Database Geneva (UNEP/GRID-Geneva), and Columbia University Center for International Earth Science Information Network (CIESIN).",
    disclaimer: "This disaster risk analysis is a screening-level assessment and should not be interpreted as a definitive measure of risk.",
    resolution: "N/A",
    source: "ADPC"
  },
  "biodiversity-aoh": {
    name: "Habitat area (Area of Habitat)",
    category: "Nature",
    dateOfContent: "2024",
    description: "The Area of Habitat (AOH) refers to the accessible habitat within a species' range. Unlike mere range maps, AOH maps showcase where a species might likely dwell within its range, which minimizes inaccuracies. These maps are crafted by removing unsuitable habitats from a species' range, based on its known habitat preferences and elevation tolerances. Comprehensive AOH maps have been previously developed for mammals, amphibians, and certain birds. The portion of a species\u2019 range depicted in the AOH can differ due to various factors, including the techniques used to link species with their habitats, the detail of the range map, the species' geographical distribution, and specifics about its habitat preference and elevation boundaries.",
    disclaimer: "Area of Habitat is not equivalent to Extent of Occurrence or Area of Occupancy (Brooks et al. 2019). Values represent mapped habitat overlap within the project area, not species abundance or confirmed presence.",
    resolution: "30 meters",
    source: "Brooks, T. M., Pimm, S. L., Ak\u00e7akaya, H. R., Buchanan, G. M., Butchart, S. H. M., Foden, W., Hilton-Taylor, C., Hoffmann, M., Jenkins, C. N., Joppa, L., Li, B. V., Menon, V., Ocampo-Pe\u00f1uela, N., & Rondinini, C. (2019). Measuring terrestrial area of habitat (AOH) and its utility for the IUCN Red List. Trends in Ecology & Evolution, 34(11), 977\u2013986. https://doi.org/10.1016/j.tree.2019.06.009"
  },
  "species-occurrence": {
    name: "Species occurrences",
    category: "Nature",
    dateOfContent: "2000 - 2025",
    description: "GBIF occurrence records for 2000 to 2025, compiled from natural history museums, citizen science networks, academic and research institutions, and government and conservation agencies. Records before 2000 are excluded.",
    disclaimer: "GBIF aggregates heterogeneous sources; records may lack identification, location precision or date. Absence of a record is not evidence of absence of the species.",
    resolution: "N/A",
    source: "GBIF"
  },
  "flii": {
    name: "Forest Landscape Integrity Index",
    category: "Nature",
    dateOfContent: "2020",
    description: "The Forest Landscape Integrity Index integrates data on observed and inferred forest pressures and lost forest connectivity to generate the first globally-consistent, continuous index of forest integrity as determined by degree of anthropogenic modification.",
    disclaimer: "The FLII estimates forest integrity based on a number of factors known to influence forest condition, but does not represent directly observed measurements of forest integrity and thus mayu contain innaccuracies. In particular, it treats all observed fires as \"natural\" and thus does not consider them evidence of observed human pressure, despite many fires being deliberately caused by humans. Similarly, activities that occured pre-2000 - such as historical logging - are not considered in the FLII.",
    resolution: "30 m",
    source: "Forest Landscape Integrity Index \u2014 Grantham, H. S., A. Duncan, T. D. Evans, K. R. Jones, H. L. Beyer, R. Schuster, J. Walston, et al. \u2018Anthropogenic Modification of Forests Means Only 40% of Remaining Forests Have High Ecosystem Integrity\u2019. Nature Communications 11, no. 1 (8 December 2020): 5978. https://doi.org/10.1038/s41467-020-19493-3."
  },
  "carbon-pools": {
    name: "Carbon pools (biomass & soil organic carbon)",
    category: "Climate",
    dateOfContent: "2024 (biomass); dynamic (soil organic carbon)",
    description: "Above ground biomass: Above Ground Biomass (AGB) represents the mass of living vegetation above the soil surface. This spatially complete layer, suitable for baseline carbon assessments, is created by combining sparse spaceborne LiDAR measurements from GEDI with high-resolution Google satellite embeddings. These embeddings guide the spatial interpolation of GEDI's footprint data, allowing biomass to be consistently predicted across the entire landscape, even in unsampled areas. Because this process relies on modeling and interpolation, pixel values should be treated as estimates with calibrated uncertainty rather than direct measurements.\n\nSoil organic carbon: Soil organic carbon content in \u00d7 5 g / kg (to convert to % divide by 2) at 6 standard depths (0, 10, 30, 60, 100 and 200 cm) at 250 m resolution",
    disclaimer: "This layer provides modeled biomass estimates from satellite data and has not been field-verified at every location.",
    resolution: "100 meters (biomass); 250 meters (soil organic carbon)",
    source: "GEDI L4A biomass with Google satellite embeddings; SoilGrids / Maxwell et al. (2023) mangrove SOC 30 m \u2014 Maxwell, T.L. et al. (2023) Global mangrove soil organic carbon 30 m."
  },
  "soil-groups": {
    name: "Soil classification (WRB 2006)",
    category: "Site information",
    dateOfContent: "Dynamic",
    description: "The soil classification is based on the World Reference Base for Soil Resources (WRB) 2006, an international soil classification system developed by the International Union of Soil Sciences (IUSS). WRB provides a standardized framework for describing and classifying soils worldwide, enabling consistent soil mapping and comparison across countries and regions. The data layer is sourced from SoilGrids and is publicly accessible at https://soilgrids.org/.",
    disclaimer: "The classification provides a standardized international soil nomenclature and should not be interpreted as a substitute for site-specific soil surveys or field verification",
    resolution: "250 meters",
    source: "ISRIC \u2014 World Reference Base (2006) Soil Groups \u2014 IUSS Working Group WRB. 2007. World Reference Base for Soil Resources 2006, first update 2007. World Soil Resources Reports No. 103. FAO, Rome."
  },
  "annual-precipitation": {
    name: "Annual precipitation",
    category: "Climate",
    dateOfContent: "2000",
    description: "Annual precipitation data is important in the context of Natural-based Solution project prepration. It can shows variability in water availability, plant selection, soil conservation, habitat suitability and economic viability as well. This data shows annual preciptation, taken from WorldClim data. WorldClim is a set of global climate layers (gridded climate data) with a spatial resolution of about 1 square kilometer.",
    disclaimer: "Interpolated long-term normals, not observations. Accuracy depends on weather station density, which is uneven across the region.",
    resolution: "927 meters",
    source: "WorldClim"
  },
  "annual-temperature": {
    name: "Annual mean temperature",
    category: "Climate",
    dateOfContent: "2000",
    description: "Temperature information is pivotal in nature-based solution projects, particularly for avoided deforestation and ecosystem restoration, as it guides species selection, aiding in the resilience of local ecosystems to climate change. It facilitates the monitoring of project success, carbon sequestration estimation, and risk assessment related to climate change impacts, ensuring project effectiveness. This data shows average annual temperature, taken from WorldClim data. WorldClim is a set of global climate layers (gridded climate data) with a spatial resolution of about 1 square kilometer.",
    disclaimer: "A long-term climate normal interpolated from weather stations, not current or observed conditions at the site.",
    resolution: "927 meters",
    source: "WorldClim"
  },
  "burned-area": {
    name: "Historical burned area",
    category: "Threat profile",
    dateOfContent: "Dynamic",
    description: "Burned area becomes important to visualise due to when peatlands burn, huge amount of stored carbon is released and it is difficult to control and extinguish. This type of information can provide early detection and rapid response systems to rehabilitate degraded peatland ecosystems",
    disclaimer: "Burn scars detected from satellite. Cropland burning is under-detected and small or short fires can be missed entirely.",
    resolution: "30 meters",
    source: "GABAM"
  },
  /* GUI 3.1 names no dataset for Fire risk yet (DEC-50): only what the card already
     states is filled in; the modal shows a dash for the rest. */
  "fire-risk": {
    name: "Fire risk",
    category: "Threat profile",
    description: "The share of the project area that overlaps mapped fire-risk areas. Fire can threaten ongoing projects and can also cause leakage of carbon stocks, both within and beyond project areas. The level (low, medium or high) follows that share.",
    source: "To be confirmed. GUI 3.1 does not name the dataset yet."
  },
  "kba": {
    name: "Key Biodiversity Area",
    category: "Nature",
    dateOfContent: "2022",
    description: "Key Biodiversity Areas, which are among the most incredible and diverse places on Earth for nature, from deserts to the middle of the ocean, are sites of global importance to the planet\u2019s overall health and the persistence of biodiversity. The Key Biodiversity Area Partnership \u2014 an ambitious partnership of 13 global conservation organizations \u2014 is helping prevent the rapid loss of biodiversity by supporting nationally led efforts to identify these places on the planet that are critical for the survival of unique plants and animals, and the ecological communities they comprise.",
    disclaimer: "Key Biodiversity Area data are taken from the World Database of Key Biodiversity Areas. While it represents the most comprehensive global database of these sites, in some cases there may be inaccuracies and differences from national datasets.",
    resolution: "N/A",
    source: "BirdLife International (2023) World Database of Key Biodiversity Areas. Developed by the KBA Partnership: BirdLife International, International Union for the Conservation of Nature, American Bird Conservancy, Amphibian Survival Alliance, Conservation International, Critical Ecosystem Partnership Fund, Global Environment Facility, Re:wild, NatureServe, Rainforest Trust, Royal Society for the Protection of Birds, Wildlife Conservation Society and World Wildlife Fund. March 2023 version. Available at http://keybiodiversityareas.org/kba-data/request"
  },
  "conservation-significance": {
    name: "Conservation significance",
    category: "Nature",
    dateOfContent: "2021",
    description: "Places the site in a global context: the share of the project area that falls within the global top-ranked cells for biodiversity, carbon and water conservation priority. One axis per priority: biodiversity, carbon, water.",
    disclaimer: "The ranked priority map is intended to provide broad spatial guidance for decision-makers. It is not intended to replace detailed national or sub-national planning.",
    resolution: "10 km",
    source: "Jung, M., Arnell, A., de Lamo, X., et al. (2021). Areas of global importance for conserving terrestrial biodiversity, carbon and water. Nature Ecology & Evolution, 5, 1499\u20131509."
  },
  "plant-occurrence": {
    name: "Plant species occurrence",
    category: "Nature",
    dateOfContent: "2000 - 2026",
    description: "Plant species recorded in the project area in GBIF occurrence records between 2000 and 2026, with the number of those species listed under CITES Appendix I, II and III.",
    disclaimer: "GBIF aggregates heterogeneous sources; records may lack identification, location precision or date.",
    resolution: "N/A",
    source: "GBIF"
  }
};
if (typeof window !== 'undefined') window.NBS_LAYER_INFO = NBS_LAYER_INFO;

const NBS_ANALYSIS = (() => {

/* ---- Step 2 — Site Characterisation context panes ---- */
/* General Context — the five sections of GUI Design Document v3.1 "Site
   Char-General" (docs/reference/GUI3.1), in its order: Reference ecosystem,
   Administration and zoning, Terrain, Landcover, Soil classification.
   Deforestation analysis and Natural disaster risk moved to the Threat profile.
   Styles: css/genctx.css (.gc*). Assets: assets/f01-step2/genctx/.
   A card with data-gc="<key>" can show a GUI 3.1 result state — see nbsCardState. */
const GC_ASSETS = 'assets/f01-step2/genctx';
const gcAlert = `
          <div class="gc-alert">
            <img src="${GC_ASSETS}/ic-alert.svg" alt="" />
            <p>The information you see in NbS Tool is collected from diverse available sources across South-east Asia. Go to <a href="#">NbS Tool Form</a> to edit and replace it with your own data.</p>
          </div>`;
const gcSource = (data, source, year) => `
          <p class="gc-src">Data source:&nbsp; <b>${data}</b>: ${source}, ${year} <a href="#">See more</a>.</p>`;
/* GUI 3.1 — the disclaimer under a card is the one written for that card's
   dataset (the "Disclaimer" column of the GUI 3.1 tables). gcAlert, the general
   alert, stays on the cards GUI 3.1 has not reached yet. */
const gcDisc = (text) => `
          <div class="gc-alert">
            <img src="${GC_ASSETS}/ic-alert.svg" alt="" />
            <p>${text}</p>
          </div>`;
/* Class bars (elevation, slope): rows = [label, hectares, colour]. The share is
   worked out from the hectares, so a class with 0 ha draws an empty track — a
   valid zero, which is not the same thing as a missing result. */
const gcBars = (rows) => {
  const total = rows.reduce((sum, r) => sum + r[1], 0);
  return `<div class="gc-slopes">${rows.map(r => {
    const pct = Math.round(r[1] / total * 100);
    return `
                  <div class="gc-slope"><div class="l"><span>${r[0]}</span><b>${NBS_DATA.grp(r[1])} ha <em>${pct}%</em></b></div><div class="t"><i ${gcTip(r[0], r[1], pct)} style="width:${pct}%;background:${r[2]}"></i></div></div>`;
  }).join('')}
                </div>`;
};
/* Soil classification accordion (Figma NbS Tool V3, node 5076:22358): rows =
   [WRB group, share %, colour, description]. Descriptions are the soil-groups
   and colours are the soil-groups layer legend ("Soil Classification" sheet,
   WRB 2006), so the card matches the map; shares follow the Figma frame. Each
   row is a <details> in one name group, so opening one closes the others; the
   dominant group starts open. Only closed rows carry the "Learn more" tooltip. */
const GC_SOIL = [
  ['Andosols', 27.21, '#ed3a33', 'Soils developed from volcanic ash, pumice, and other volcanic materials. They are usually dark-coloured, rich in organic matter, highly porous, and have excellent water-holding capacity. These soils are generally highly fertile, although phosphorus fertilisation is often required because of their strong phosphorus fixation capacity.'],
  ['Cambisols', 25.24, '#fecd67', 'Young to moderately developed soils showing evidence of soil formation, such as changes in colour, structure, or texture, but lacking strongly developed diagnostic horizons. They are among the most widespread soil groups globally. Their moderate natural fertility allows a wide range of agricultural uses with appropriate nutrient management and erosion control.'],
  ['Ferralsols', 17.22, '#f6872d', 'Highly weathered tropical soils dominated by stable iron and aluminium oxides and low-activity clays. They are generally deep, well-drained, and structurally stable but often have low natural fertility due to extensive nutrient leaching. Maintaining productivity typically requires regular nutrient replenishment, liming where appropriate, and organic matter management.'],
  ['Acrisols', 9.21, '#f7991d', 'Strongly weathered soils characterised by a clay-enriched subsoil and low base saturation. They are typically acidic, nutrient-poor, and occur in humid tropical and subtropical regions where intense weathering and leaching have removed many plant nutrients. Acrisols generally exhibit low natural fertility and often require liming, organic matter amendments, and balanced fertilisation to improve soil productivity and restore degraded sites.'],
  ['Nitisols', 7.22, '#f7a082', 'Deep, red, well-drained tropical soils with a strong, stable structure and high clay content. They are often associated with volcanic or basaltic parent materials and are valued for agriculture due to their favourable physical properties. These soils generally possess high natural fertility and are well suited for intensive agriculture with balanced nutrient management.'],
];
const gcSoil = () => `<div class="cl-soil">${GC_SOIL.map(([name, pct, c, desc], i) => `
                  <details class="cl-soilrow" name="cl-soil" style="--c:${c}"${i === 0 ? ' open' : ''}>
                    <summary${i === 0 ? '' : ` data-tip="Learn more about ${name}"`}><span class="n">${String(i + 1).padStart(2, '0')}</span><div><b>${name}</b><i><s style="width:${pct}%"></s></i></div><em>${pct.toFixed(2)}%</em><svg class="cl-soilchev" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg></summary>
                    <p>${desc}</p>
                  </details>`).join('')}
                </div>`;
/* toggle does not bubble, so listen in the capture phase. */
document.addEventListener('toggle', (e) => {
  const row = e.target;
  if (!row.classList || !row.classList.contains('cl-soilrow')) return;
  const sum = row.querySelector('summary');
  if (row.open) sum.removeAttribute('data-tip');
  else sum.dataset.tip = `Learn more about ${sum.querySelector('b').textContent}`;
}, true);
/* Reference ecosystem donut + legend, drawn from NBS_DATA so the shares always
   match the Threat profile and Pathway steps. [label, hectares, colour] */
const GC_ECO = [
  ['Dryland forest', NBS_DATA.eco.forest.area, '#1f6b47'],
  ['Mangrove', NBS_DATA.eco.mangrove.area, '#1a9e96'],
  ['Peatland', NBS_DATA.eco.peat.area, '#bea001'],
  ['Other', NBS_DATA.nonEligible, 'var(--neutral-700)'],
];
/* ---- Doughnut segments with soft corners ----
   Every ring chart (gcDonut, gcGauge, the Carbon Pool ring, the People Context
   donut) draws its segments with nbsRingSeg: a filled ring slice whose four
   corners are rounded to --radius-sm, with a --space-4 gap between slices. Both
   sizes are read from tokens.css in screen pixels; k converts them to the
   chart's viewBox units (viewBox width / rendered width). */
const nbsCssPx = (name) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;
const NBS_RING = { corner: nbsCssPx('--radius-sm'), gap: nbsCssPx('--space-4') };
/* Path for the slice of the ring centred on (cx, cy), outer radius R, inner r,
   from angle a0 to a1 (radians, clockwise, 0 = 3 o'clock).
   o.k: viewBox units per pixel (default 1). o.gapStart / o.gapEnd = false keep an
   end flush, for the outer ends of a half doughnut. Returns '' when the gap
   leaves no room for the slice. */
function nbsRingSeg(cx, cy, R, r, a0, a1, o) {
  o = o || {};
  const k = o.k || 1, TAU = 2 * Math.PI;
  const P = (p) => `${(cx + p[0]).toFixed(2)} ${(cy + p[1]).toFixed(2)}`;
  if (a1 - a0 >= TAU - 1e-6) {
    return `M${P([R, 0])}A${R} ${R} 0 1 1 ${P([-R, 0])}A${R} ${R} 0 1 1 ${P([R, 0])}M${P([r, 0])}A${r} ${r} 0 1 0 ${P([-r, 0])}A${r} ${r} 0 1 0 ${P([r, 0])}Z`;
  }
  const d0 = o.gapStart === false ? 0 : NBS_RING.gap * k / 2;
  const d1 = o.gapEnd === false ? 0 : NBS_RING.gap * k / 2;
  /* One straight end of the slice: the side line sits d off the radius at angle a,
     on the slice's side (dir +1 for the start, -1 for the end); c is the corner. */
  const end = (a, d, c, dir) => {
    const ux = Math.cos(a), uy = Math.sin(a), nx = -uy * dir, ny = ux * dir, off = d + c;
    const to = Math.sqrt(Math.max((R - c) ** 2 - off ** 2, 0));
    const ti = Math.sqrt(Math.max((r + c) ** 2 - off ** 2, 0));
    const at = (n, t) => [n * nx + t * ux, n * ny + t * uy];
    const oc = at(off, to), ic = at(off, ti);
    return { oArc: [oc[0] * R / (R - c), oc[1] * R / (R - c)], oSide: at(d, to),
             iArc: [ic[0] * r / (r + c), ic[1] * r / (r + c)], iSide: at(d, ti) };
  };
  const rel = (p) => ((Math.atan2(p[1], p[0]) - a0) % TAU + TAU) % TAU;
  let c = Math.min(NBS_RING.corner * k, (R - r) / 2), s, e;
  /* a thin slice cannot hold full corners: shrink them until both arcs fit */
  for (let i = 0; i < 10; i++, c *= 0.6) {
    s = end(a0, d0, c, 1); e = end(a1, d1, c, -1);
    if (rel(e.oArc) > rel(s.oArc) && rel(e.iArc) > rel(s.iArc)) break;
    if (i === 9) return '';
  }
  const bigO = rel(e.oArc) - rel(s.oArc) > Math.PI ? 1 : 0;
  const bigI = rel(e.iArc) - rel(s.iArc) > Math.PI ? 1 : 0;
  const cc = c.toFixed(2);
  return `M${P(s.oArc)}A${R} ${R} 0 ${bigO} 1 ${P(e.oArc)}A${cc} ${cc} 0 0 1 ${P(e.oSide)}L${P(e.iSide)}A${cc} ${cc} 0 0 1 ${P(e.iArc)}A${r} ${r} 0 ${bigI} 0 ${P(s.iArc)}A${cc} ${cc} 0 0 1 ${P(s.iSide)}L${P(s.oSide)}A${cc} ${cc} 0 0 1 ${P(s.oArc)}Z`;
}
/* js/people-context.js (loaded after this file) draws its donut with it too */
window.nbsRingSeg = nbsRingSeg;
/* The half doughnuts (gcGauge, half gcDonut): centre (100, 100) in a 200-wide
   viewBox, the band 69 to 91 (the old 22-unit stroke on radius 80), drawn
   from 9 o'clock (PI) to 3 o'clock (2 PI). Rendered at most --space-100 x 2.6 wide. */
const GC_HALF = { R: 91, r: 69, k: 200 / (nbsCssPx('--space-100') * 2.6 || 200) };
const gcHalfSeg = (from, to, first, last, R = GC_HALF.R, r = GC_HALF.r, k = GC_HALF.k) => nbsRingSeg(100, 100, R, r,
  Math.PI * (1 + from / 100), Math.PI * (1 + to / 100), { k, gapStart: !first, gapEnd: !last });
/* Hover text for one chart segment, shown by the People Context tooltip
   (js/people-context.js wires every [data-tip] inside .gc to .pcx-tip). */
const gcTip = (label, ha, pct) => `data-tip="${label}: ${NBS_DATA.grp(ha)} ha (${pct}%)"`;
/* Total + donut + legend for a set of [label, hectares, colour]. The shares
   are worked out from the hectares; the legend repeats them as text. Each
   segment is its own SVG path, so pointing at one names only that segment.
   half = true draws the segments on the Fire risk half doughnut (gcGauge's look)
   with the total in its centre, in place of the total line and the full ring. */
const gcDonut = (items, totalLabel, ariaLead, half) => {
  const total = items.reduce((sum, e) => sum + e[1], 0);
  const pct = (ha) => ha / total * 100;
  const shown = items.filter(e => e[1] > 0);
  if (half) {
    let at = 0;
    const arcs = shown.map((e, i) => {
      const p = pct(e[1]);
      const s = `<path ${gcTip(e[0], e[1], Math.round(p))} d="${gcHalfSeg(at, at + p, i === 0, i === shown.length - 1)}" style="fill:${e[2]}"/>`;
      at += p;
      return s;
    });
    return `
                  <div class="gc-eco__total"><span>${totalLabel}</span></div>
                  <div class="gc-eco__chartrow">
                    <div class="gc-gauge" role="img" aria-label="${ariaLead}, ${NBS_DATA.grp(total)} ha: ${items.map(e => `${e[0].toLowerCase()} ${Math.round(pct(e[1]))}%`).join(', ')}">
                      <svg viewBox="0 0 200 110" aria-hidden="true">${arcs.join('')}</svg>
                      <div class="gc-gauge__c" aria-hidden="true"><b>${NBS_DATA.grp(total)} ha</b></div>
                    </div>
                    <ul class="gc-legend">${items.map(e => `
                      <li><i style="background:${e[2]}"></i><span>${e[0]}</span><b>${NBS_DATA.grp(e[1])} ha</b><em>${Math.round(pct(e[1]))}%</em></li>`).join('')}
                    </ul>
                  </div>`;
  }
  /* 96-unit viewBox drawn at --space-100 x 2 (.gc-donut), so the gaps scale by k.
     The total sits in the hole; the legend is a 2 x 2 grid under the ring. */
  const k = 96 / (nbsCssPx('--space-100') * 2 || 96);
  let a = -Math.PI / 2;
  const segs = shown.map(e => {
    const b = a + pct(e[1]) / 100 * 2 * Math.PI, d = nbsRingSeg(48, 48, 48, 34, a, b, { k });
    a = b;
    return `<path ${gcTip(e[0], e[1], Math.round(pct(e[1])))} d="${d}" style="fill:${e[2]}"/>`;
  });
  const label = items.map(e => `${e[0].toLowerCase()} ${Math.round(pct(e[1]))}%`).join(', ');
  return `
                  <div class="gc-ecochart">
                    <div class="gc-donutwrap">
                      <svg class="gc-donut" viewBox="0 0 96 96" role="img" aria-label="${ariaLead}, ${NBS_DATA.grp(total)} ha: ${label}">${segs.join('')}</svg>
                      <div class="gc-donut__c" aria-hidden="true"><span>${totalLabel}</span><b>${NBS_DATA.grp(total)} ha</b></div>
                    </div>
                    <ul class="gc-legend gc-legend--grid">${items.map(e => `
                      <li><i style="background:${e[2]}"></i><span>${e[0]}</span><b>${NBS_DATA.grp(e[1])} ha &middot; ${Math.round(pct(e[1]))}%</b></li>`).join('')}
                    </ul>
                  </div>`;
};
/* drawn up to --space-100 x 4 wide (.gc-gauge--sun), so its gaps use their own scale */
const GC_SUN_K = 200 / (nbsCssPx('--space-100') * 4 || 200);
/* Two-ring half doughnut (a half sunburst): the inner ring is each group's share,
   the outer ring splits every group into the same categories, each slice sitting
   over its parent. groups: [[label, colour, [[category, hectares, colour], ...]], ...].
   The outer ring uses a quarter of the usual gap so sub-1% slices still show. */
const gcSunHalf = (groups, totalLabel, ariaLead, mirror) => {
  const sum = (rows) => rows.reduce((t, e) => t + e[1], 0);
  const total = groups.reduce((t, g) => t + sum(g[2]), 0);
  const pct = (ha) => ha / total * 100;
  /* GAP: extra space between groups, in % of the half circle, on both rings so each
     outer slice still sits over its parent. pos() maps a running share to the arc. */
  const GAP = 1.2, scale = (100 - GAP * (groups.length - 1)) / 100;
  const pos = (share, gi) => share * scale + gi * GAP;
  const inner = [], outer = [];
  let at = 0, ato = 0;
  groups.forEach(([label, colour, rows], gi) => {
    const p = pct(sum(rows));
    inner.push(`<path ${gcTip(label, sum(rows), Math.round(p))} d="${gcHalfSeg(pos(at, gi), pos(at + p, gi), gi === 0, gi === groups.length - 1, 70, 54, GC_SUN_K)}" style="fill:${colour}"/>`);
    at += p;
    /* mirror: the first group draws its categories in reverse, so the two groups
       read outward from the centre gap (the legend keeps one order for both) */
    const shown = rows.filter(e => e[1] > 0);
    if (mirror && gi === 0) shown.reverse();
    shown.forEach((e, i) => {
      const q = pct(e[1]);
      outer.push(`<path ${gcTip(`${label}, ${e[0]}`, e[1], Math.round(q))} d="${gcHalfSeg(pos(ato, gi), pos(ato + q, gi), gi === 0 && i === 0, gi === groups.length - 1 && i === shown.length - 1, 91, 74, GC_SUN_K / 4)}" style="fill:${e[2]}"/>`);
      ato += q;
    });
  });
  const row = (cls, label, ha, colour) => `
                      <li class="${cls}"><i style="background:${colour}"></i><span>${label}</span><b>${NBS_DATA.grp(ha)} ha</b><em>${Math.round(pct(ha))}%</em></li>`;
  const aria = groups.map(([label, , rows]) => `${label.toLowerCase()} ${Math.round(pct(sum(rows)))}% (${rows.map(e => `${e[0].toLowerCase()} ${NBS_DATA.grp(e[1])} ha`).join(', ')})`).join('; ');
  return `
                  <div class="gc-sun">
                    <div class="gc-gauge gc-gauge--sun" role="img" aria-label="${ariaLead}, ${NBS_DATA.grp(total)} ha: ${aria}">
                      <svg viewBox="0 0 200 110" aria-hidden="true">${inner.join('')}${outer.join('')}</svg>
                      <div class="gc-gauge__c" aria-hidden="true"><b>${NBS_DATA.grp(total)} ha</b><span>${totalLabel}</span></div>
                    </div>
                    <div class="gc-legend-cols">${groups.map(([label, colour, rows]) => `
                    <ul class="gc-legend gc-legend--tree">${row('gc-legend__grp', label, sum(rows), colour)}${rows.map(e => row('gc-legend__sub', e[0], e[1], e[2])).join('')}
                    </ul>`).join('')}
                    </div>
                  </div>`;
};
/* Land degradation, 2014 to 2024: illustrative sample data (DEC-11, DEC-86). The
   category totals keep the earlier copy's figures (24,000 ha degradation-related,
   15,000 ha of it in forest; 108,000 ha stable; 18,000 ha improved); the
   forest / non-forest split of each category is new sample data. */
/* The three degradation-related classes sit together so the reds read as one block. */
const LD_CAT = [['Degraded', 'var(--danger-600)'], ['Degraded – potential false positive', 'var(--danger-300)'],
  ['Degraded – potential false negative', 'var(--danger-800)'], ['Stable', 'var(--neutral-800)'], ['Improved', 'var(--success-500)']];
const LD_DATA = [['Forest', 'var(--primary-750)', [11400, 2000, 1600, 63000, 12000]],
  ['Non-forest', 'var(--warning-700)', [7200, 1000, 800, 45000, 6000]]];
const LD = { deg: 0, fp: 1, fn: 2, stable: 3, improved: 4 };
/* The chart shows three classes only: the two flagged classes are folded into Degraded
   (the narrative still reports them on their own). */
const ldGroups = () => LD_DATA.map(([label, colour, ha]) => [label, colour, [
  ['Degraded', ha[LD.deg] + ha[LD.fp] + ha[LD.fn], LD_CAT[LD.deg][1]],
  ['Stable', ha[LD.stable], LD_CAT[LD.stable][1]],
  ['Improved', ha[LD.improved], LD_CAT[LD.improved][1]],
]]);
/* category i summed over forest and non-forest; deg = Degraded + both flagged classes */
const ldSum = (i, g) => (g ? [g] : LD_DATA).reduce((t, d) => t + d[2][i], 0);
const ldNarrative = () => {
  const ha = (v) => `<b>${NBS_DATA.grp(v)} ha</b>`;
  const deg = (g) => ldSum(LD.deg, g) + ldSum(LD.fp, g) + ldSum(LD.fn, g);
  const [forest, other] = LD_DATA;
  const fp = ldSum(LD.fp), fn = ldSum(LD.fn);
  return [
    `A total of ${ha(deg())} within the project area showed signs of land degradation between 2014 and 2024. Of the total degradation-related area, ${ha(deg(forest))} occurred within forest areas, while ${ha(deg(other))} occurred outside forest areas.`,
    ldSum(LD.improved) > 0 && `In contrast, ${ha(ldSum(LD.improved))} within the project area showed positive changes in land condition.`,
    ldSum(LD.stable) > 0 && `The remaining ${ha(ldSum(LD.stable))} was classified as stable, indicating no significant improvement or deterioration in the assessed land condition.`,
    fp + fn > 0 && `Of the total area classified under degradation-related land-condition categories, ${ha(fp)} was flagged as <b>Degraded &ndash; Potential False Positive</b>, while ${ha(fn)} was flagged as <b>Degraded &ndash; Potential False Negative</b>.`,
  ].filter(Boolean).map(t => `
                      <p class="gc-p">${t}</p>`).join('');
};
/* Drainage canal pressure (GUI 3.1). Sample values (DEC-11): canalM is the distance
   to the nearest mapped canal in metres; density is 'high' | 'moderate' | 'low', or
   null when the peatland does not overlap the drainage-density layer. */
const DR_DATA = { canalM: 320, density: 'high' };
/* Classes in axis order (left to right on the threshold bar).
   [class name, range, badge tone, bar colour, sentence; canal also the "located …" phrase] */
const DR_CANAL = [
  ['Close', '0 to 500 m', 'bad', 'var(--danger-600)', 'The peatland area is located within <b>0 to 500 meters</b> of mapped drainage canals, indicating potential hydrological disturbance.', 'close to'],
  ['Intermediate', '500 to 1,000 m', 'warn', 'var(--warning-500)', 'The peatland area is located approximately <b>500 to 1,000 meters</b> from mapped drainage canals, indicating moderate potential drainage-related pressure, and hydrological influence may be lower.', 'at an intermediate distance from'],
  ['Distant', 'over 1,000 m', 'ok', 'var(--success-500)', 'The peatland area is located more than <b>1,000 m</b> from the nearest mapped drainage canal, indicating relatively low drainage-related pressure based on canal proximity.', 'far from'],
];
const DR_DENSITY = [
  ['Low', 'under 2.5 km/km&sup2;', 'ok', 'var(--success-500)', 'Low drainage density (<b>under 2.5 km/km&sup2;</b>) indicates low drainage disturbance.'],
  ['Moderate', '2.5 to 5 km/km&sup2;', 'warn', 'var(--warning-500)', 'Moderate drainage density (<b>2.5 to 5 km/km&sup2;</b>) indicates substantial drainage-related hydrological disturbance and is associated with higher subsidence and carbon-loss potential than lower drainage classes.'],
  ['High', 'over 5 km/km&sup2;', 'bad', 'var(--danger-600)', 'High drainage density (<b>over 5 km/km&sup2;</b>) indicates substantial hydrological disturbance and is associated with accelerated peat subsidence, increased carbon emissions, and significant peat-fire risk.'],
];
/* Horizontal threshold bar: equal discrete segments, one per class, a marker over the
   site's position and each class named under its segment. at: 0-100 along the bar;
   null = no marker. suffix: a word set on its own line under each class name.
   Decorative: the badge and sentence beside it carry the meaning. */
const gcScale = (classes, at, mark, suffix) => `
                      <div class="gc-scale" aria-hidden="true">
                        <div class="gc-scale__track">${at == null ? '' : `<span class="gc-scale__mark" style="left:${at.toFixed(1)}%">${mark}</span>`}${classes.map(c => `<i style="background:${c[3]}"></i>`).join('')}</div>
                        <div class="gc-scale__lbls">${classes.map(c => `<span><b>${c[0]}</b>${suffix ? `<b>${suffix}</b>` : ''}${c[1]}</span>`).join('')}</div>
                      </div>`;
/* A section row: heading with its level badge, then the sentence, on the left; its
   threshold bar on the right. badge: [text, tone]; the class name only, the bar
   carries the ranges. */
const drRow = (icon, title, badge, text, scale) => `
                  <div class="gc-thr">
                    <div class="gc-block">
                      <h5 class="gc-sub gc-sub--ic"><span class="gc-sub__ic"><svg viewBox="0 0 24 24">${icon}</svg></span><span class="gc-sub__t">${title}</span><em class="nc-pill nc-pill--${badge[1]}">${badge[0]}</em></h5>${text ? `
                      <p class="gc-p">${text}</p>` : ''}
                    </div>${scale}
                  </div>`;
/* Material Symbols "water" (assets/icons/material/water.svg), filled, scaled into 24 units */
const DR_WATER_ICON = '<path class="gc-ms" transform="translate(0 24) scale(0.025)" d="M80-240v-80q38 0 56.5-20t77.5-20q59 0 77.5 20t54.5 20q38 0 56.5-20t77.5-20q57 0 77.5 20t56.5 20q38 0 55.5-20t76.5-20q59 0 77.5 20t56.5 20v80q-57 0-77.5-20T746-280q-36 0-54.5 20T614-240q-57 0-77.5-20T480-280q-38 0-56.5 20T346-240q-59 0-76.5-20T214-280q-38 0-56.5 20T80-240Zm0-160v-80q38 0 56.5-20t77.5-20q57 0 76.5 20t55.5 20q38 0 56.5-20t77.5-20q57 0 77 20t55 20q38 0 56.5-20t77.5-20q57 0 77.5 20t56.5 20v80q-59 0-78.5-20T746-440q-36 0-54.5 20T614-400q-57 0-77.5-20T480-440q-38 0-55.5 20T348-400q-59 0-78.5-20T214-440q-36 0-56.5 20T80-400Zm0-160v-80q38 0 56.5-20t77.5-20q57 0 76.5 20t55.5 20q38 0 56.5-20t77.5-20q57 0 77 20t55 20q38 0 56.5-20t77.5-20q57 0 77.5 20t56.5 20v80q-59 0-78.5-20T746-600q-36 0-54.5 20T614-560q-57 0-77.5-20T480-600q-38 0-55.5 20T348-560q-59 0-78.5-20T214-600q-36 0-56.5 20T80-560Z"/>';
/* No peatland: the card is not shown at all. */
const drCard = () => {
  if (!(NBS_DATA.eco.peat.area > 0)) return '';
  const m = DR_DATA.canalM;
  const ci = m <= 500 ? 0 : m <= 1000 ? 1 : 2;
  const c = DR_CANAL[ci];
  /* each class is a third of the bar; past 1,000 m the marker runs to 2,000 m and stops */
  const cAt = (ci + Math.min((ci === 2 ? (m - 1000) / 1000 : (m - ci * 500) / 500), 0.94)) * 100 / 3;
  const di = DR_DENSITY.findIndex(d => d[0].toLowerCase() === DR_DATA.density);
  const d = DR_DENSITY[di];
  return `<section class="gc-card" data-gc="drainage">${gcHead('Drainage canal pressure', 'terrain', false)}
                  <p class="gc-p">The peatland area is located ${c[5]} mapped drainage canals, with the nearest canal approximately <b>${NBS_DATA.grp(m)} m</b> away.</p>
                  <div class="gc-stack">${drRow('<path d="M3 17c1.5 0 2.2-1 3.5-1s2 1 3.5 1 2.2-1 3.5-1 2 1 3.5 1 2.2-1 3.5-1"/><path d="M6 13l6-7 6 7M12 6v7"/>', 'Canal proximity',
    [c[0], c[2]], c[4], gcScale(DR_CANAL, cAt, `${NBS_DATA.grp(m)} m`))}${drRow(DR_WATER_ICON, 'Drainage pressure',
    d ? [d[0], d[2]] : ['No drainage', 'ok'], d && d[4],
    gcScale(DR_DENSITY, d ? (di + 0.5) * 100 / 3 : null, d && d[0], 'density'))}
                  </div>${gcDisc('Peatland disturbance may be associated with hydrological alteration. Disturbance refers to possible changes in peatland condition caused by canals, reduced soil moisture, fire occurrence, or altered water table conditions, even when vegetation cover remains present.')}${gcSource('Canal proximity', 'Dadap et al., 5 m', '2021')}${gcSource('Drainage density', 'Dadap et al., 1,000 m', '2021')}
                </section>`;
};
const gcEcoChart = () => gcDonut(GC_ECO, 'Total area', 'Share of the selected area');
/* A labelled level badge. tone: bad | warn | ok — the word carries the meaning,
   the colour only repeats it. */
const gcLevel = (label, value, tone) => `<p class="gc-lvl"><span>${label}</span><em class="nc-pill nc-pill--${tone}">${value}</em></p>`;
/* Half-doughnut of a part against a whole: the whole is a grey ring, the part is orange.
   It shows a share only; it carries no level or threshold (DEC-61). Pointing at either
   arc names it, with its hectares, in the People Context tooltip (gcTip): the orange
   part as partLabel, the grey rest as restLabel.
   The arc reuses one path with pathLength="100", so the dash length is simply the percentage. */
const gcGauge = (part, total, caption, partLabel, restLabel) => {
  const pct = Math.round(part / total * 100);
  /* the orange part runs from the left end; the grey rest of the whole follows it */
  const v = pct > 0 ? `
                          <path class="gc-gauge__v" ${gcTip(partLabel, part, pct)} d="${gcHalfSeg(0, pct, true, pct >= 100)}"/>` : '';
  const t = pct < 100 ? `
                          <path class="gc-gauge__t" ${gcTip(restLabel, total - part, 100 - pct)} d="${gcHalfSeg(pct, 100, pct <= 0, true)}"/>` : '';
  return `
                      <div class="gc-gauge" role="img" aria-label="Total area ${NBS_DATA.grp(total)} ha. ${pct}%, ${NBS_DATA.grp(part)} ha, ${partLabel.toLowerCase()}.">
                        <svg viewBox="0 0 200 110" aria-hidden="true">${v}${t}
                        </svg>
                        <div class="gc-gauge__c" aria-hidden="true"><b>${pct}%</b><span>${caption}</span></div>
                      </div>`;
};
/* Fire risk: the level follows the share of the project area inside mapped fire-risk
   areas. Thresholds set by the product owner (DEC-50): high above 80%, medium from
   30% to 80%, low below 30%. The high narrative is the GUI 3.1 text; the medium and
   low ones are pieced together from a cut-off page of that document. */
const GC_FIRE_HA = 96000;
const GC_FIRE_LEVELS = [
  { key: 'low', label: 'Low', range: 'under 30%', tone: 'ok', from: 0, to: 30,
    text: 'Most of the project area has <b>low</b> fire risk. Although fire occurrence is relatively low, continued monitoring and sustainable land management are important to prevent fire ignition and fire-related disturbances.' },
  { key: 'medium', label: 'Medium', range: '30% to 80%', tone: 'warn', from: 30, to: 80,
    text: 'Most of the project area is classified as having <b>medium</b> fire risk. Dry weather conditions may increase the likelihood of fire ignition and spread. Regular monitoring and preventive action are recommended to reduce the fire risk.' },
  { key: 'high', label: 'High', range: 'over 80%', tone: 'bad', from: 80, to: 100,
    text: 'Most of the project area has <b>high</b> fire risk. Fires detected frequently between 2000 and 2024 indicate areas with significant fire ignition. Regular monitoring and preventive fire management are recommended to reduce the likelihood of fire ignition.' },
];
const gcFireLevel = (pct) => GC_FIRE_LEVELS[pct > 80 ? 2 : pct >= 30 ? 1 : 0];
/* Card-head chip icons — Google Material Design Icons (Apache 2.0), 24px filled */
const GC_ICONS = {
  /* Material Symbols "bolt", filled (assets/icons/material/bolt-fill.svg), drawn on
     0 -960 960 960 and scaled into this map's 24-unit box */
  bolt: '<path transform="translate(0 24) scale(0.025)" d="m320-80 40-280H160l360-520h80l-40 320h240L400-80h-80Z"/>',
  globe: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>',
  gov: '<path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6z"/>',
  landscape: '<path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>',
  tree: '<path d="M13 16.12c3.47-.41 6.17-3.36 6.17-6.95 0-3.87-3.13-7-7-7s-7 3.13-7 7c0 3.47 2.52 6.34 5.83 6.89V20H5v2h14v-2h-6v-3.88z"/>',
  layers: '<path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/>',
  warning: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
  paw: '<circle cx="4.5" cy="9.5" r="2.5"/><circle cx="9" cy="5.5" r="2.5"/><circle cx="15" cy="5.5" r="2.5"/><circle cx="19.5" cy="9.5" r="2.5"/><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"/>',
  /* Observation: an eye in front of a magnifying glass. Drawn for the NbS Tool, 24px grid.
     The mask cuts the glass back around the eye, so the two read apart on any chip colour. */
  observe: '<defs><mask id="gc-observe-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="white"/><path d="M1.6 15.7C3.5 12.3 5.4 11.5 7.3 11.5s3.8.8 5.7 4.2c-1.9 3.4-3.8 4.2-5.7 4.2S3.5 19.1 1.6 15.7Z" fill="black" stroke="black" stroke-width="4" stroke-linejoin="round"/></mask></defs><g mask="url(#gc-observe-cut)" fill="none" stroke="currentColor" stroke-linecap="round"><circle cx="12.6" cy="8.6" r="6" stroke-width="2.2"/><path d="M17.6 13.6l3.6 3.6" stroke-width="3.2"/><path d="M9.3 7.3a3.8 3.8 0 0 1 3.1-2.5" stroke-width="1.1"/></g><path d="M1.6 15.7C3.5 12.3 5.4 11.5 7.3 11.5s3.8.8 5.7 4.2c-1.9 3.4-3.8 4.2-5.7 4.2S3.5 19.1 1.6 15.7Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="7.3" cy="15.7" r="2.3" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="7.3" cy="15.7" r=".7"/>',
  key: '<path d="M21 10h-8.35C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H15v4h4v-4h2v-4zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>',
  shield: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>',
  chart: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>',
  pin: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>',
  park: '<path d="M17 12h2L12 2 5.05 12H7l-3.9 6h6.92v4h3.96v-4H21l-4-6z"/>',
  cloud: '<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>',
  terrain: '<path d="M14 6l-4.22 5.63 1.25 1.67L14 9.33 19 16h-8.46l-4.01-5.37L1 18h22L14 6z"/>',
  thermo: '<path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1h-1v1h1v1h-1v1h1v1h-2V5z"/>',
  fire: '<path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>',
};
const gcInfo = (key) => `<svg class="gc-info"${key ? ` data-layer-info="${key}"` : ''} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" tabindex="0" aria-label="More information"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
/* The "i" belongs to whatever a reader would look it up by. A card with a single
   subject carries it in the head; a card holding several (Administration +
   Protection/zoning status, …) carries one per sub-title instead — pass
   key=false to gcHead and build those sub-titles with gcSub(title, key).
   The key names a row in NBS_LAYER_INFO below (the dataset catalogue). */
// The five natural risk level classes, lowest to highest, and the pill tone each takes (DEC-57).
const GC_HAZARD_LEVELS = { 'Very Low': 'ok', 'Low': 'ok', 'Moderate': 'warn', 'High': 'bad', 'Very High': 'bad' };
// One Natural Disaster Risk tile. The drawing comes from js/hazard-scenes.js (DEC-54); the
// photo is what a page shows when it mounts this file without that one. Under it, one line:
// the hazard name on the left and its level on the right, as the pill the other threat cards
// use (DEC-58).
const gcHazard = (key, photo, name, level) => `<div class="gc-nditem"><figure>${typeof hazardScene === 'function' ? hazardScene(key) : `<img src="assets/asset/Disaster Risk/${photo}" alt="" />`}</figure>${gcLevel(`${name}:`, `${level} risk`, GC_HAZARD_LEVELS[level])}</div>`;
const gcHead = (t, ic, key) => `
          <div class="gc-card__head"><span class="gc-hchip"><svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${GC_ICONS[ic] || ''}</svg></span><h4>${t}</h4>${key === false ? '' : gcInfo(key)}</div>`;
/* Climate sub-title in the Drainage canal pressure look (gc-sub--ic): a blue icon tile,
   the title, then its info button. icon: a Material Symbols path (filled, 0 -960 960 960). */
const clSub = (t, key, icon) => `<h5 class="gc-sub gc-sub--ic"><span class="gc-sub__ic gc-sub__ic--blue"><svg viewBox="0 -960 960 960">${icon}</svg></span><span class="gc-sub__t">${t}</span>${gcInfo(key)}</h5>`;
const gcSub = (t, key) => `<h5 class="gc-sub gc-sub--info">${t}${gcInfo(key)}</h5>`;

const siteGeneral = `
        <div class="ctx-pane" data-ctx="general">
          <div class="gc">

            <!-- 1 · Reference ecosystem (GUI 3.1; was "Ecosystem type identification") -->
            <section class="gc-card" data-gc="ecosystem">${gcHead('Reference ecosystem', 'globe', 'ecosystem-type')}
              <div class="gc-eco">
                <figure class="gc-eco__map"><img src="${GC_ASSETS}/map-eco.png" alt="Ecosystem map of the selected area" /></figure>
                <div class="gc-eco__side">
                  ${gcEcoChart()}
                </div>
              </div>
              <!-- narrative under the map and chart, full width -->
              <p class="gc-p">This area spans all three settings: non-flooded mineral soil inland, a tidal coastal zone with salt or brackish water, and ground built on wet peat soil. It combines <b>dryland</b>, <b>mangrove</b>, and <b>peatland</b> references across different parts of the site.</p>${gcDisc('A composite of several datasets with different scales and methods, so ecosystem boundaries are indicative. Peat and mangrove edges are the least certain.')}${gcSource('Reference ecosystem', 'SCeNe Coalition, 30 m', '2025')}
            </section>

            <!-- 2 · Administration and zoning status -->
            <section class="gc-card" data-gc="administration">${gcHead('Administration and Zoning Status Information', 'gov', false)}
              <div class="gc-block">
                ${gcSub('Administration', 'administration')}
                <p class="gc-p">This project area is mostly located in <b>Buleleng, Bali</b>, with an approximate total area of <b>150,000 hectares</b>. Within this province, it also overlaps the following sub-districts:</p>
                <table class="gc-table">
                  <thead><tr><th>Sub-district</th><th>District</th><th>Province</th><th>Area ha</th></tr></thead>
                  <tbody>
                    <tr><td>Banjar</td><td>Buleleng</td><td>Bali</td><td>66,100</td></tr>
                    <tr><td>Busungbiu</td><td>Buleleng</td><td>Bali</td><td>49,500</td></tr>
                    <tr><td>Seririt</td><td>Buleleng</td><td>Bali</td><td>34,400</td></tr>
                  </tbody>
                </table>
                <p class="gc-note-it">See all completed administrative boundaries of your project in the <a href="help.html#documents/doc-types">Feasibility study document</a></p>
              </div>
              <!-- GUI 3.1: this block is hidden when the area overlaps no protected area -->
              <div class="gc-block">
                ${gcSub('Protection/zoning status', 'protected-area')}
                <p class="gc-p">This project area also overlaps with <b>30,000 hectares</b> of protected areas. The protected area within the polygon is designated for <b>Taman Wisata Alam (nature recreation park)</b>.</p>
                <p class="gc-note-it">Consider this when you select your NbS activities, as it may affect which activities are eligible.</p>
              </div>${gcDisc('Reference boundaries only, not a legal source for jurisdiction or tenure. The level of administrative detail varies by country. Protected-area overlap is a screening result: it does not establish land tenure, permitted activities or complete local zoning restrictions. Verify with the relevant authority.')}${gcSource('Administrative boundaries', 'GADM', '2022')}${gcSource('Protected areas', 'World Database on Protected Areas (WDPA), 30 m', '2025')}
            </section>

            <!-- 3 · Terrain — elevation classes are new in GUI 3.1; slope gains its share -->
            <section class="gc-card" data-gc="terrain">${gcHead('Terrain', 'landscape', 'terrain')}
              <figure class="gc-terrain"><img src="${GC_ASSETS}/terrain.jpg" alt="3D terrain render of the selected area" /></figure>
              <div class="gc-terr">
                <div class="gc-block">
                  <h5 class="gc-sub">Elevation class</h5>
                  <p class="gc-p">Elevation ranges from 45 to 1,860 m above sea level (asl), predominantly submontane / hill (500&ndash;1,000 m).</p>
                  ${gcBars([
                    ['Lowland (0-500 m)', 52500, 'var(--primary-300)'],
                    ['Submontane / hill (500-1,000 m)', 67500, 'var(--primary-500)'],
                    ['Montane (1,000-2,000 m)', 30000, 'var(--primary-700)'],
                    ['Upper montane (&gt;2,000 m)', 0, 'var(--primary-900)'],
                  ])}
                </div>
                <div class="gc-block">
                  <h5 class="gc-sub">Slope</h5>
                  <p class="gc-p">The slope of the area, in percent, consists of:</p>
                  ${gcBars([
                    ['Flat (0-8%)', 57000, '#55b101'],
                    ['Gently sloping (8-15%)', 39000, '#8cb21a'],
                    ['Moderately steep (15-25%)', 28500, '#d9a600'],
                    ['Steep (25-40%)', 15000, '#d97300'],
                    ['Very steep (&gt;40%)', 10500, '#b2331a'],
                  ])}
                </div>
              </div>${gcDisc('SRTM is a surface model (DSM), not a bare-earth model (DTM). Slope is derived from it, so it inherits that limit plus smoothing from the 30 m resolution. Local steep areas may not be resolved. Use field checks for site-level planning.')}${gcSource('Elevation and slope', 'SRTM, 30 m', '2000')}
            </section>

            <!-- 4 · Landcover -->
            <section class="gc-card" data-gc="landcover">${gcHead('Landcover', 'layers', 'land-cover-2024')}
              <div class="gc-block">
                <p class="gc-p">The major land cover categories in the selected area are:</p>
                <div class="gc-lcgrid">
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-aquaculture.svg" alt="" /><div><span>Aquaculture</span><b>12,000 ha</b><em>8%</em></div></div>
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-barren.svg" alt="" /><div><span>Barren</span><b>7,500 ha</b><em>5%</em></div></div>
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-rubber.svg" alt="" /><div><span>Rubber</span><b>18,000 ha</b><em>12%</em></div></div>
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-crop.svg" alt="" /><div><span>Crop Plantation</span><b>30,000 ha</b><em>20%</em></div></div>
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-evergreen.svg" alt="" /><div><span>Evergreen</span><b>52,500 ha</b><em>35%</em></div></div>
                  <div class="gc-lcitem"><img src="${GC_ASSETS}/lc-oilpalm.svg" alt="" /><div><span>Oil Palm</span><b>21,000 ha</b><em>14%</em></div></div>
                </div>
                <p class="gc-note-it">View the detailed landcover breakdown for your specific site within the <a href="help.html#documents/doc-types">feasibility study document</a></p>
              </div>${gcDisc('A machine-learning classification from satellite imagery that has not been field-verified. Provided as is, for landscape-scale analysis.')}${gcSource('Land cover', 'SIGnal, 30 m', '2024')}
            </section>

            <!-- 5 · Soil classification — moved here from Climate (GUI 3.1) -->
            <section class="gc-card" data-gc="soil">${gcHead('Soil classification', 'terrain', 'soil-groups')}
              <div class="gc-block">
                <p class="gc-p">Based on the World Reference Base for Soil Resources (WRB) 2006, the soils in this area are predominantly <b>Andosols</b>. The distribution of all identified soil types is presented below.</p>
                ${gcSoil()}
              </div>${gcDisc('The classification provides a standardised international soil nomenclature and should not be interpreted as a substitute for site-specific soil surveys or field verification.')}${gcSource('Soil classification (WRB 2006)', 'ISRIC World Reference Base (2006) Soil Groups, 250 m', '2020')}
            </section>

          </div>
        </div>`;

/* Nature Context — the six sections of GUI Design Document v3.1 "Site
   char-Nature" (docs/reference/GUI3.1), in its order: Habitat area, Charismatic
   species, Conservation significance, Forest Landscape Integrity Index, Key
   Biodiversity Area, Plant species occurrence.
   Shares the .gc* card/alert/source styles; Nature-only pieces are .nc*. */
const NC_ASSETS = 'assets/f01-step2/natctx';
/* Conservation significance spider chart, inline so it takes the theme tokens.
   Reach is a relative priority rank traced from the old Jung et al. render, not a
   score, so no values or rings are labelled (DEC-83). [axis, reach 0–1, angle°] */
const NC_RADAR = [['Biodiversity', 0.72, -90], ['Water', 0.62, 30], ['Carbon', 0.53, 150]];
const ncRadar = () => {
  const cx = 150, cy = 141, R = 78;
  const at = (f, deg) => [cx + R * f * Math.cos(deg * Math.PI / 180), cy + R * f * Math.sin(deg * Math.PI / 180)];
  const pts = (f) => NC_RADAR.map(([, v, a]) => at(f === undefined ? v : f, a).map(n => n.toFixed(1)).join(',')).join(' ');
  const rings = [1 / 3, 2 / 3, 1].map(f => `<polygon class="nc-radar__ring" points="${pts(f)}"/>`).join('');
  const spokes = NC_RADAR.map(([, , a]) => { const [x, y] = at(1, a); return `<line class="nc-radar__ring" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join('');
  const dots = NC_RADAR.map(([, v, a]) => { const [x, y] = at(v, a); return `<circle class="nc-radar__dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"/>`; }).join('');
  /* labels sit just past each spoke tip: above the top one, below the two lower ones */
  const labels = NC_RADAR.map(([name, , a]) => { const [x, y] = at(1, a); return `<text class="nc-radar__lbl" x="${x.toFixed(1)}" y="${(a < 0 ? y - 14 : y + 28).toFixed(1)}">${name}</text>`; }).join('');
  return `<svg viewBox="0 0 299 247" role="img" aria-label="Spider chart of conservation significance across biodiversity, water and carbon. Biodiversity has the highest priority, then water, then carbon.">${rings}${spokes}<polygon class="nc-radar__area" points="${pts()}"/>${dots}${labels}</svg>`;
};
/* One row per species: list = [common, latin, records, year of latest record].
   GBIF records can lack a date, so a missing year reads "Date not recorded". */
/* Labels are plain English; the tooltip gives the taxonomic class GBIF records them under. */
const NC_CLASS = { Amphibian: 'Amphibia', Bird: 'Aves', Mammal: 'Mammalia', Reptile: 'Reptilia' };
const ncSpecies = (icon, name, dot, list) => `
                <div class="nc-splist${list.length > 5 ? ' nc-splist--scroll' : ''}">
                  <img class="nc-splist__ic" src="${NC_ASSETS}/${icon}.svg" alt="" />
                  <div class="nc-splist__id" data-tip="${name}s (class ${NC_CLASS[name]})"><span>${name}</span></div>
                  <ul style="--dot:${dot}">${list.map(s => `<li><span class="nc-nm"><i>${s[0]}</i> <em>(${s[1]})</em></span><span class="nc-rec">${s[3] ? 'Latest record ' + s[3] : 'Date not recorded'}</span><b>${s[2]} ${s[2] === 1 ? 'record' : 'records'}</b></li>`).join('')}</ul>
                </div>`;
/* Area of habitat threshold: species counted by how much habitat overlaps the
   project area. [band, species]. The bands add up to the 404 species above. */
const NC_AOH = [['&lt; 20%', 180], ['20 &ndash; 40%', 112], ['40 &ndash; 60%', 63], ['60 &ndash; 80%', 49], ['&gt; 80%', 0]];
/* Key Biodiversity Areas the project area overlaps: [site, overlap ha]. */
const NC_KBA = [['West Bali National Park', 13200], ['Batukaru Ridge Forest', 6300]];
const ncKbaTotal = NC_KBA.reduce((sum, k) => sum + k[1], 0);
const ncPct1 = (ha) => (ha / NBS_DATA.aoi * 100).toFixed(1) + '%';

const siteNature = `
        <div class="ctx-pane" data-ctx="nature" hidden>
          <div class="gc">

            <!-- 1 · Habitat area — the threshold block is new in GUI 3.1 -->
            <section class="gc-card" data-gc="habitat">${gcHead('Habitat Area', 'paw', 'biodiversity-aoh')}
              <div class="gc-block">
                <h5 class="gc-sub">Total area of habitat</h5>
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
                <p class="gc-note-it">Suitable habitat is mapped by refining each species&rsquo; IUCN range with regional land cover. The same land can be habitat for several species, so habitat areas are not added together.</p>
              </div>
              <!-- flexible text column beside a 300px table -->
              <div class="gc-block gc-terr gc-terr--mid gc-terr--text-end gc-terr--narrow-end gc-terr--fill">
                <div class="gc-block">
                  <h5 class="gc-sub">Area of habitat threshold</h5>
                  <p class="gc-p">The project area supports the area of habitat for <b>${NC_AOH.reduce((sum, r) => sum + r[1], 0)} species</b>. Most of these species have less than 90% habitat overlap with the project area.</p>
                  <p class="gc-note-it">See the details of habitat area and IUCN status in the <a href="help.html#documents/doc-types">feasibility study document</a></p>
                </div>
                <table class="gc-table gc-table--auto">
                  <thead><tr><th>Habitat overlap</th><th>n Present at the site</th></tr></thead>
                  <tbody>${NC_AOH.map(r => `
                    <tr><td>${r[0]}</td><td>${r[1]} Species</td></tr>`).join('')}
                  </tbody>
                </table>
              </div>${gcDisc('Area of Habitat is not equivalent to Extent of Occurrence or Area of Occupancy (Brooks et al. 2019). Values represent mapped habitat overlap within the project area, not species abundance or confirmed presence.')}${gcSource('Area of habitat', 'IUCN refined by NTU, 30 m', '2024')}
            </section>

            <!-- 2 · Charismatic species (GUI 3.1; was "Indicative key species presence").
                 No photo is licensed yet, so each record shows its name only. -->
            <section class="gc-card" data-gc="species">${gcHead('Charismatic Species Occurrences', 'key', 'species-occurrence')}
              <div class="gc-block">
                <p class="gc-p">A total of <b>8</b> candidate charismatic species have recorded occurrences within the project area based on GBIF data.</p>
                <div class="nc-splists">
${ncSpecies('sp-bird', 'Bird', 'var(--primary-500)', [['Bali Myna','Leucopsar rothschildi',96,2024],['Java Sparrow','Padda oryzivora',74,2023],['Black-winged Starling','Acridotheres melanopterus',61,2022],['Javan Kingfisher','Halcyon cyanoventris',48,2024]])}
${ncSpecies('sp-mammal', 'Mammal', 'var(--primary-500)', [['Javan Rusa','Rusa timorensis',37,2021],['Long-tailed Macaque','Macaca fascicularis',52,2025]])}
${ncSpecies('sp-reptile', 'Reptile', 'var(--primary-500)', [['Reticulated Python','Malayopython reticulatus',23,null],['Asian Water Monitor','Varanus salvator',44,2023]])}
                </div>
              </div>${gcDisc('GBIF aggregates heterogeneous sources; records may lack identification, location precision or date.')}${gcSource('Species occurrence', 'GBIF', '2025')}
            </section>

            <!-- 3 · Conservation significance — qualitative only: the source is a priority
                 ranking, not a measurable score, so no numbers are shown (DEC-83) -->
            <section class="gc-card" data-gc="significance">${gcHead('Conservation Significance', 'shield', 'conservation-significance')}
              <div class="nc-cons">
                <figure class="nc-radar">${ncRadar()}</figure>
                <div class="nc-cons__side">
                  <div class="gc-block">
                    <p class="gc-p">The project area reflects the area&rsquo;s significance for <b>biodiversity</b> conservation.</p>
                    <p class="gc-note-it">The chart compares biodiversity, water and carbon. A point further from the centre means a higher conservation priority. It shows a ranking, not a measured score.</p>
                  </div>
                  <div class="gc-chip gc-chip--sq"><span><i style="background:var(--warning-400)"></i>Relative conservation priority</span></div>
                </div>
              </div>${gcDisc('The ranked priority map is intended to provide broad spatial guidance for decision-makers. It is not intended to replace detailed national or sub-national planning.')}${gcSource('Conservation significance', 'Jung et al., 10 km', '2021')}
            </section>

            <!-- 4 · Forest Landscape Integrity Index -->
            <section class="gc-card" data-gc="flii">${gcHead('Forest Landscape Integrity Index', 'chart', 'flii')}
              <div class="nc-flii">
                <div class="nc-flii__tx">
                  <p class="gc-p">Within the forest in this area, <b>68%</b> has high landscape integrity, <b>24%</b> medium, and <b>8%</b> low. The forest is predominantly high integrity, indicating largely intact and well-connected forest under low human pressure.</p>
                  <p class="gc-note-it">Percentages refer to the forest assessed, not the whole selected area.</p>
                </div>
                <div class="nc-score">
                  <span class="nc-score__t">Forest landscape integrity</span>
                  <div><b>9.7<small> / 10</small></b><em class="nc-pill nc-pill--high">High Integrity</em></div>
                </div>
                <div class="nc-gauge">
                  <div class="nc-gauge__bar"></div>
                  <div class="nc-gauge__tick" style="top:0"><span>10</span></div>
                  <div class="nc-gauge__tick" style="top:33px"><span>9.6</span></div>
                  <div class="nc-gauge__tick" style="top:92px"><span>6</span></div>
                  <div class="nc-gauge__tick" style="top:100%"><span>0</span></div>
                  <em class="nc-pill nc-pill--high" style="top:0">High</em><span class="nc-gauge__rng" style="top:3px">9.6 &ndash; 10</span>
                  <em class="nc-pill nc-pill--med" style="top:48px">Med</em><span class="nc-gauge__rng" style="top:51px">6.0 &ndash; 9.5</span>
                  <em class="nc-pill nc-pill--low" style="top:136px">Low</em><span class="nc-gauge__rng" style="top:139px">0 &ndash; 5.9</span>
                </div>
              </div>${gcDisc('A modelled index, not an observation. It treats all fire as natural, so forest under fire pressure can score higher than it should.')}${gcSource('Forest Landscape Integrity Index', 'Forest Landscape Integrity Index, 30 m', '2020')}
            </section>

            <!-- 5 · Key Biodiversity Area — the table shows when more than one site overlaps -->
            <section class="gc-card" data-gc="kba">${gcHead('Key Biodiversity Area', 'pin', 'kba')}
              <div class="gc-block">
                <p class="gc-p">This project area overlaps with <b>${NBS_DATA.grp(ncKbaTotal)} ha (${ncPct1(ncKbaTotal)} of total AOI area)</b> of Key Biodiversity Areas, across <b>${NC_KBA.length}</b> sites. The largest is <b>${NC_KBA[0][0]} (${NBS_DATA.grp(NC_KBA[0][1])} ha)</b>, followed by <b>${NC_KBA[1][0]} (${NBS_DATA.grp(NC_KBA[1][1])} ha)</b>. Key Biodiversity Areas are sites that contribute significantly to the global persistence of biodiversity.</p>
                <table class="gc-table gc-table--auto">
                  <thead><tr><th>Key Biodiversity Area</th><th>Overlap (ha)</th><th>Share of the selected area</th></tr></thead>
                  <tbody>${NC_KBA.map(k => `
                    <tr><td>${k[0]}</td><td>${NBS_DATA.grp(k[1])}</td><td>${ncPct1(k[1])}</td></tr>`).join('')}
                    <tr class="gc-table__total"><td>Total</td><td>${NBS_DATA.grp(ncKbaTotal)}</td><td>${ncPct1(ncKbaTotal)}</td></tr>
                  </tbody>
                </table>
                <p class="gc-note-it">Where sites overlap each other, the shared land is counted once in the total.</p>
                <div class="nc-kba">
                  <img src="${NC_ASSETS}/kba-map.png" alt="Key Biodiversity Area overlap map" />
                  <div class="nc-kba__card"><span>Total overlapping area</span><b>${NBS_DATA.grp(ncKbaTotal)} ha</b></div>
                  <div class="nc-kba__lg"><i></i>${NC_KBA[0][0]}</div>
                </div>
              </div>${gcDisc('Data do not imply the expression of, or represent, any opinion by the KBA Partners concerning the legal status of any country, territory or area, or concerning the delimitation of its frontiers or boundaries.')}${gcSource('Key Biodiversity Areas', 'World Database of Key Biodiversity Areas (WDKBA)', '2022')}
            </section>

            <!-- 6 · Plant species occurrence (GUI 3.1; replaces "Endangered tree species") -->
            <section class="gc-card" data-gc="plants">${gcHead('Plant Species Occurrence', 'park', 'plant-occurrence')}
              <div class="gc-block">
                <p class="gc-p">Based on GBIF occurrence records, the project area recorded occurrences of <b>31</b> plant species between 2000 and 2026. Among these, <b>1</b> species is listed under CITES Appendix I, <b>6</b> under Appendix II, and <b>2</b> under Appendix III.</p>
                <div class="nc-tree">
                  <img src="${NC_ASSETS}/tree.jpg" alt="" />
                  <div><span>Plant species recorded in the project area, 2000 to 2026</span><b>31 Species</b></div>
                </div>
              </div>${gcDisc('GBIF aggregates heterogeneous sources; records may lack identification, location precision or date.')}${gcSource('Plant species occurrence', 'GBIF', '2026')}
            </section>

          </div>
        </div>`;

/* Climate Context — the three sections of GUI Design Document v3.1 "Site
   char-Climate" (docs/reference/GUI3.1), in its order: Carbon information,
   Annual climate ledger, Peat depth. Historical burned area moved to the
   Threat profile.
   Shares the .gc* card/alert/source styles; Climate-only pieces are .cl*.
   Charts are plain CSS bars — heights are the Figma bar pixel heights over the
   plot height, so the shapes match the design without a chart library. */
const CL_ASSETS = 'assets/f01-step2/climctx';
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
/* Hover text reads the value off the y axis: bar height / plot height x the top
   tick. `fmt` turns that value into text with its unit. */
const clChart = (bars, plot, labels, yTicks, yTitle, cls, fmt) => `
                  <div class="cl-chart ${cls}">
                    <span class="cl-chart__ytitle">${yTitle}</span>
                    <ul class="cl-chart__y">${yTicks.map(t => `<li>${t}</li>`).join('')}</ul>
                    <div class="cl-chart__plot">
                      ${bars.map((h, i) => `<i data-tip="${labels[i]}: ${fmt(h / plot * yTicks[0])}" style="height:${(h / plot * 100).toFixed(1)}%"></i>`).join('')}
                    </div>
                    <ul class="cl-chart__x">${labels.map(l => `<li>${l}</li>`).join('')}</ul>
                  </div>`;

/* Carbon pools in the donut's drawing order (clockwise from 12 o'clock).
   [label, tCO2e, share %, colour]. Sample figures, see DEC-11. */
const CL_POOLS = [
  ['Soil Organic Carbon', '13,596,856.10', 50, '#2f80c4'],
  ['Below Ground Biomass', '8,158,113.66', 30, '#103a63'],
  ['Above Ground Biomass', '5,438,742.44', 20, '#a9cce6'],
];
/* The Carbon Pool ring: one SVG path per pool, so pointing at a segment names
   it in the shared People Context tooltip (data-tip, wired on every .gc). */
const clPoolDonut = () => {
  /* 148-unit viewBox drawn at 148px (.cl-donut), so k = 1; band 52 to 74 */
  let a = -Math.PI / 2;
  const segs = CL_POOLS.map(([label, t, pct, colour]) => {
    const b = a + pct / 100 * 2 * Math.PI, d = nbsRingSeg(74, 74, 74, 52, a, b);
    a = b;
    return `<path data-tip="${label}: ${t} tCO&#8322;e (${pct}%)" d="${d}" style="fill:${colour}"/>`;
  });
  return `<div class="cl-donut" role="img" aria-label="Carbon pool: ${CL_POOLS.map(e => `${e[0].toLowerCase()} ${e[2]}%`).join(', ')}"><svg viewBox="0 0 148 148" aria-hidden="true">${segs.join('')}</svg><span>Carbon Pool</span></div>`;
};
const clPoolSwatch = (name) => CL_POOLS.find(e => e[0] === name)[3];

const siteClimate = `
        <div class="ctx-pane" data-ctx="climate" hidden>
          <div class="gc">

            <!-- 1 · Carbon information -->
            <section class="gc-card gc-card--blue" data-gc="carbon">${gcHead('Carbon information', 'cloud', 'carbon-pools')}
              <div class="gc-block">
                <div class="cl-carbon">
                  <div class="gc-block cl-carbon__tx">
                    <p class="gc-p">The area hosts extensive carbon sinks that currently store <b>27,193,712.20</b> tCO<sub>2</sub>e, adding to the vital fight against global warming.</p>
                    <p class="gc-note-it">The total is the sum of the three pools below. Soil organic carbon is counted to a depth of 30 cm.</p>
                  </div>
                  <div class="cl-total"><span>Total Carbon Storage:</span><b>27,193,712.20 <em>tCO<sub>2</sub>e</em></b></div>
                </div>
              </div>
              <div class="gc-block">
                <div class="cl-pool">
                  <figure class="cl-pool__scene">
                    <div class="cl-pool__top">
                      ${clPoolDonut()}
                      <ul class="cl-pool__legend">
                        <li><i style="--c:${clPoolSwatch('Above Ground Biomass')}"></i>Above Ground Biomass</li>
                        <li><i style="--c:${clPoolSwatch('Soil Organic Carbon')}"></i>Soil Organic Carbon</li>
                        <li><i style="--c:${clPoolSwatch('Below Ground Biomass')}"></i>Below Ground Biomass</li>
                      </ul>
                    </div>
                    <img src="${CL_ASSETS}/carbon-scene.png" alt="Cross-section of trees above ground and roots in soil" />
                    <div class="cl-pool__tag cl-pool__tag--agb"><span>Above Ground Biomass</span><div><b>5,438,742.44 <em>tCO<sub>2</sub>e</em></b><i>20%</i></div></div>
                    <div class="cl-pool__tag cl-pool__tag--soc"><span>Soil Organic Carbon (0&ndash;30 cm)</span><div><b>13,596,856.10 <em>tCO<sub>2</sub>e</em></b><i>50%</i></div></div>
                    <div class="cl-pool__tag cl-pool__tag--bgb"><span>Below Ground Biomass</span><div><b>8,158,113.66 <em>tCO<sub>2</sub>e</em></b><i>30%</i></div></div>
                  </figure>
                </div>
              </div>${gcDisc('Above-ground biomass and soil organic carbon values are modelled estimates, not direct measurements. Depth to bedrock has been ignored, so total soil carbon stocks might be about 10 to 15% lower than reported.')}${gcSource('Carbon storage', 'SCeNe Coalition, 250 m', '2024')}${gcSource('Soil organic carbon', 'OpenLandMap, 30 m', '2018')}
            </section>

            <!-- 2 · The annual climate ledger -->
            <section class="gc-card gc-card--blue" data-gc="ledger">${gcHead('The Annual Climate Ledger', 'thermo', false)}
              <div class="cl-ledger">
                <div class="cl-metric">
                  ${clSub('Annual precipitation', 'annual-precipitation', '<path d="M491-200q12-1 20.5-9.5T520-230q0-14-9-22.5t-23-7.5q-41 3-87-22.5T343-375q-2-11-10.5-18t-19.5-7q-14 0-23 10.5t-6 24.5q17 91 80 130t127 35Zm-239.5 26Q160-268 160-408q0-100 79.5-217.5T480-880q161 137 240.5 254.5T800-408q0 140-91.5 234T480-80q-137 0-228.5-94ZM652-230.5Q720-301 720-408q0-73-60.5-165T480-774Q361-665 300.5-573T240-408q0 107 68 177.5T480-160q104 0 172-70.5ZM480-480Z"/>')}
                  <p class="gc-p">Monthly precipitation in the selected area ranges from 45 to 320 mm, with an average of 167 mm per month and an annual total of 2,000 mm.</p>
                  <p class="gc-note-it">Long-term average (WorldClim, 2000), not this year&rsquo;s rainfall.</p>
${clChart([127.2,115.3,99.4,59.6,39.8,27.8,21.9,17.9,27.8,51.7,87.5,119.3], 159, MONTHS, [400,300,200,100,0], 'Monthly precipitation (mm)', 'cl-chart--prec', v => `${Math.round(v)} mm`)}
                </div>
                <div class="cl-metric">
                  ${clSub('Annual mean temperature', 'annual-temperature', '<path d="M338.5-138.5Q280-197 280-280q0-48 21-89.5t59-70.5v-320q0-50 35-85t85-35q50 0 85 35t35 85v320q38 29 59 70.5t21 89.5q0 83-58.5 141.5T480-80q-83 0-141.5-58.5ZM440-520h80v-40h-40v-40h40v-80h-40v-40h40v-40q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240Z"/>')}
                  <p class="gc-p">Annual mean temperature in the selected area ranges from 26.4&deg;C to 27.4&deg;C, with an average of 26.9&deg;C.</p>
                  <p class="gc-note-it">Long-term average (WorldClim, 2000), not today&rsquo;s temperature.</p>
${clChart([104.9,105.7,106.9,108.5,108.9,107.3,105.3,104.9,106.9,108.9,108.5,106.5], 159, MONTHS, [40,30,20,10,0], 'Monthly mean temperature (&deg;C)', 'cl-chart--temp', v => `${v.toFixed(1)} &deg;C`)}
                </div>
              </div>${gcDisc('Long-term climate normals interpolated from weather stations, not current or observed conditions at the site. Accuracy depends on weather station density, which is uneven across the region.')}${gcSource('Climate normals', 'WorldClim, 927 m', '2000')}
            </section>

            <!-- 3 · Peat depth — new in GUI 3.1. The document gives no source and no
                 disclaimer yet, so the card says so and keeps the general alert.
                 The bars are shares of the peatland, not of the whole selected area. -->
            <section class="gc-card gc-card--blue" data-gc="peat">${gcHead('Peat depth', 'terrain', false)}
              <div class="gc-terr">
                <div class="gc-block">
                  <div class="gc-eco__total"><span>Peatland area</span><b>${NBS_DATA.grp(NBS_DATA.eco.peat.area)} ha</b></div>
                  <p class="gc-p">This area contains <b>${NBS_DATA.grp(NBS_DATA.eco.peat.area)} ha</b> of peatland, with peat depth ranging from <b>0.4 to 4.6 metres</b>. Most of the peatland in the project area has medium-depth peat, 100 to 300 cm thick. These areas may be cultivated with sustainable water management and soil conservation to enhance peat ecosystem services.</p>
                </div>
                <div class="gc-block">
                  <h5 class="gc-sub">Peat depth distribution</h5>
                  <p class="gc-p">Share of the peatland in each depth class:</p>
                  ${gcBars([
                    ['Shallow (under 1 m)', 7000, 'var(--info-200)'],
                    ['Medium (1 to 3 m)', 19250, 'var(--info-400)'],
                    ['Deep (over 3 m)', 8750, 'var(--info-700)'],
                  ])}
                </div>
              </div>${gcAlert}
          <p class="gc-src">Data source:&nbsp; <b>Peat depth</b>: to be confirmed. GUI 3.1 does not name the dataset yet.</p>
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

/* ---- Step 3 — Threat profile ----
   GUI Design Document v3.1 "Threat Profile", "Final Data Analyzer Structure"
   (docs/reference/GUI3.1): three groups, seven result cards, and nothing else.
   There is no grouping by ecosystem any more: the All Ecosystem / Forest /
   Mangrove / Peatland views, the screening overview and the disturbance map are
   gone (DEC-49).
   Each group is a native <details> accordion — keyboard and screen-reader
   behaviour come from the browser, no script. The first group starts open.
   Cards are .gc-card, so they take gcDisc, gcSource and the result states. */
const threat = `
          <div class="t3-accs">

            <details class="t3-acc t3-acc--observed" data-t3grp="observed" open>
              <summary class="t3-acc__head">
                <span class="t3-acc__ic"><svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${GC_ICONS.observe}</svg></span>
                <span class="t3-acc__tx"><h3>Observed Ecosystem Disturbance</h3><span>What has already happened in the selected area: forest loss, fire and land degradation.</span></span>
                <svg class="t3-acc__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
              </summary>
              <div class="gc">

                <!-- moved from General › Deforestation analysis -->
                <section class="gc-card" data-gc="deforestation">${gcHead('Historical deforestation', 'tree', 'deforestation-2014-2024')}
                  <div class="gc-block">
                    <div class="gc-def">
                      <figure class="gc-def__map"><img src="${GC_ASSETS}/map-defor.png" alt="Historical deforestation map of the project area: forest cover with forest loss, 2014 to 2024, concentrated along the north-west edge" /></figure>
                      <div class="gc-def__side">
                        <div>
                          <p class="gc-p">Between 2014 and 2024, the project area lost <b>6,720 ha</b> of forest, an average of</p>
                          <p class="gc-big">1.2<small>% / year</small></p>
                        </div>
                        <div class="gc-chip"><span><i style="background:#2c6639"></i>Forest</span><span><i style="background:var(--danger-600)"></i>Forest Loss</span></div>
                      </div>
                    </div>
                  </div>${gcDisc('Derived by differencing two independently produced layers. The loss is not attributed to a cause.')}${gcSource('Forest loss', 'SIGnal, 30 m', '2014 to 2024')}
                </section>

                <!-- moved from Climate. GUI 3.1: past fires and fire susceptibility are two
                     separate results, and burned-area history is never read as a forecast. -->
                <section class="gc-card gc-card--red" data-gc="burned">${gcHead('Historical Burned Area', 'fire', 'burned-area')}
                  <!-- intro, then the yearly chart with its summary beside it. Figures are the sample burned-area series
                       (DEC-11): 2011 to 2020, 4,125 ha in total, peak 563 ha in 2012. -->
                  <div class="gc-block">
                    <p class="gc-p">This shows how likely the land is to burn under baseline conditions, based on factors such as land cover, dryness, and climate.</p>
                  </div>
                  <!-- chart 70%, the narrative that summarises it 30% beside it -->
                  <div class="cl-burnrow">
                    <div class="gc-block">
${clChart([103,165,109,152,133,133,109,109,88,109], 176, ['2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'], [600,500,400,300,200,100,0], 'Burned Area (in ha)', 'cl-chart--fire', v => `${NBS_DATA.grp(Math.round(v))} ha`)}
                      <p class="cl-chart__xtitle">Years</p>
                    </div>
                    <p class="gc-p">The project area recorded a cumulative burned area of <b>4,125 ha</b> between 2011 and 2020, with an average annual burned area of <b>413 ha</b>. The highest annual burned area was recorded in <b>2012</b>, when <b>563 ha</b> was affected by fire.</p>
                  </div>${gcDisc('Burn scars detected from satellite. Cropland burning is under-detected and small or short fires can be missed entirely.')}${gcSource('Burned area', 'GABAM, 30 m', '2024')}
                </section>

                <!-- new in GUI 3.1 -->
                <section class="gc-card" data-gc="degradation">${gcHead('Land degradation', 'layers', false)}
                  <div class="gc-stack">
                    <div class="gc-block">
                      ${ldNarrative()}
                    </div>
                    <div class="gc-block">${gcSunHalf(ldGroups(), 'Area assessed, 2014 to 2024', 'Land condition by forest and non-forest area', true)}
                    </div>
                  </div>${gcDisc('Potential false-positive or false-negative outcomes should be interpreted and validated using ground-truth data, field observations and other locally available evidence.')}${gcSource('Land degradation', 'UNCCD refined by SCeNe Coalition, 30 m', '2024')}
                </section>
              </div>
            </details>

            <details class="t3-acc t3-acc--pressure" data-t3grp="pressure">
              <summary class="t3-acc__head">
                <span class="t3-acc__ic"><svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${GC_ICONS.warning}</svg></span>
                <span class="t3-acc__tx"><h3>Ecosystem Pressure and Hazard</h3><span>Pressures and hazards acting on the selected area now: peatland drainage and natural hazards.</span></span>
                <svg class="t3-acc__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
              </summary>
              <div class="gc">

                ${drCard()}

                <!-- moved from General -->
                <section class="gc-card" data-gc="hazard">${gcHead('Natural Disaster Risk', 'bolt', 'disaster-risk')}
                  <div class="gc-block">
                    <p class="gc-p">The selected area is susceptible to several natural disaster risks, including:</p>
                    <!-- four hazards, 2 x 2. Fire is not listed here: the Fire risk card under
                         Business as Usual Projection owns it (DEC-53). Each picture is a drawn
                         scene that plays its hazard on hover (DEC-54). -->
                    <div class="gc-ndgrid">
                      ${gcHazard('drought', 'drought.png', 'Drought', 'Moderate')}
                      ${gcHazard('flood', 'flood.png', 'Flood', 'High')}
                      ${gcHazard('landslide', 'Landslide.png', 'Landslide', 'Moderate')}
                      ${gcHazard('typhoon', 'tropicaltyphon.png', 'Tropical Typhoon', 'Low')}
                    </div>
                  </div>${gcDisc('This disaster risk analysis is a screening-level assessment and should not be interpreted as a definitive measure of risk.')}${gcSource('Natural hazards', 'ADPC', '2024')}
                </section>
              </div>
            </details>

            <details class="t3-acc t3-acc--bau" data-t3grp="bau">
              <summary class="t3-acc__head">
                <span class="t3-acc__ic"><svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${GC_ICONS.chart}</svg></span>
                <span class="t3-acc__tx"><h3>Business as Usual Projection</h3><span>Where the selected area is heading if nothing changes: relative deforestation risk and fire risk.</span></span>
                <svg class="t3-acc__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
              </summary>
              <div class="gc">

                <!-- moved from General › Deforestation analysis. GUI 3.1: a class and a
                     short narrative replace the 0 to 1 index figure. -->
                <section class="gc-card" data-gc="defrisk">${gcHead('Deforestation risk', 'tree', 'deforestation-risk')}
                  <div class="gc-block">
                    <div class="gc-def">
                      <figure class="gc-def__map gc-def__map--plain"><img src="${GC_ASSETS}/map-defor-risk.png" alt="Deforestation risk map of the project area, mostly low risk with higher-risk patches along the north-west edge" /></figure>
                      <div class="gc-def__side">
                        <div>
                          <p class="gc-p">Forest in this area has a higher deforestation risk than the national average, ranking in the top <b>15%</b> of the country&rsquo;s forest with deforestation risk.</p>
                          ${gcLevel('Compared with the national average', 'Higher risk', 'bad')}
                        </div>
                        <div class="gc-chip gc-chip--ramp"><span>Deforestation risk</span><span>Lower<i></i>Higher</span></div>
                      </div>
                    </div>
                  </div>${gcDisc('This is a relative national ranking, not a probability of forest loss or a predicted annual deforestation rate. It does not establish what will happen at the site.')}${gcSource('Deforestation risk', 'SCeNe Coalition, 30 m', '2024')}
                </section>

                <!-- new in GUI 3.1. The document gives no visual and no source for this row; the
                     thresholds were set by the product owner (DEC-50); the gauge shows the share only (DEC-61). -->
                <section class="gc-card gc-card--red" data-gc="firerisk">${gcHead('Fire risk', 'fire', 'fire-risk')}${(() => {
                  const pct = Math.round(GC_FIRE_HA / NBS_DATA.aoi * 100), lvl = gcFireLevel(pct);
                  return `
                  <div class="gc-terr gc-terr--text-end">
                    <div class="gc-block">${gcGauge(GC_FIRE_HA, NBS_DATA.aoi, 'of the project area', 'Overlaps mapped fire-risk areas', 'Outside mapped fire-risk areas')}
                      <p class="gc-p gc-gauge__n"><b>${NBS_DATA.grp(GC_FIRE_HA)} ha</b> of ${NBS_DATA.grp(NBS_DATA.aoi)} ha overlaps mapped fire-risk areas</p>
                    </div>
                    <div class="gc-block">
                      <p class="gc-p">A total of <b>${NBS_DATA.grp(GC_FIRE_HA)} ha (${pct}%)</b> of the project area overlaps with mapped fire-risk areas. Fire can threaten ongoing projects and can also cause leakage of carbon stocks, both within and beyond project areas.</p>
                      <p class="gc-p">${lvl.text}</p>
                    </div>
                  </div>`; })()}${gcAlert}
          <p class="gc-src">Data source:&nbsp; <b>Fire risk</b>: to be confirmed. GUI 3.1 does not name the dataset yet.</p>
                </section>
              </div>
            </details>

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
    <article class="scard split" data-method="Assessed structurally with Morphological Spatial Pattern Analysis (MSPA) in GuidosToolbox, run on a binary habitat mask derived from the 2024 land cover map plus a surrounding landscape buffer. MSPA classifies each habitat pixel into structural types (core, edge, perforation, bridge, loop, branch and islet).">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h1A1.5 1.5 0 0 1 5 2.5h4.134a1 1 0 1 1 0 1h-2.01q.269.27.484.605C8.246 5.097 8.5 6.459 8.5 8c0 1.993.257 3.092.713 3.7.356.476.895.721 1.787.784A1.5 1.5 0 0 1 12.5 11h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5H6.866a1 1 0 1 1 0-1h1.711a3 3 0 0 1-.165-.2C7.743 11.407 7.5 10.007 7.5 8c0-1.46-.246-2.597-.733-3.355-.39-.605-.952-1-1.767-1.112A1.5 1.5 0 0 1 3.5 5h-1A1.5 1.5 0 0 1 1 3.5zM2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10 10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/></svg></span>
        <div class="card-tt"><h3>Maintenance of ecological connectivity</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">880</span><span class="munit">ha</span></div><div class="metric-lab">contiguous habitat kept connected</div></div><div class="narr"><p>Conserving this <b>forest</b> ecosystem keeps an estimated <b>880 ha</b> block of natural habitat intact and safeguards its role as a connector in the surrounding landscape. Based on the site structure, <b>210 ha (&asymp; 24%)</b> of the area functions as a corridor linking separate habitat cores. Protecting it prevents the fragmentation that would likely occur under current deforestation pressure over the <b>30-year</b> project period.</p></div>
    </article><article class="scard">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65m0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65"/></svg></span>
        <div class="card-tt"><h3>Protection of watershed function</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <p class="def" data-def>Safeguarding this <b>forest</b> ecosystem helps protect the natural capacity of the landscape to capture, store, filter, and slowly release water. Keeping the site under healthy natural cover supports more stable river flow, lower erosion and sediment loads, and better water quality downstream.</p>
    </article><article class="scard split">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826M8 1a1 1 0 0 0-.998 1.03l.01.091q.017.116.054.296c.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a5 5 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1M2 9l.03-.002.091-.01a5 5 0 0 0 .296-.054c.241-.049.542-.122.887-.213a61 61 0 0 0 2.314-.676L5.762 8l-.144-.045a61 61 0 0 0-2.314-.676 17 17 0 0 0-.887-.213 5 5 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2m7 5-.002-.03a5 5 0 0 0-.064-.386 16 16 0 0 0-.213-.888 61 61 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a5 5 0 0 0-.064.386L7 14a1 1 0 1 0 2 0m-5.696-2.134.025-.017a5 5 0 0 0 .303-.248c.184-.164.408-.377.661-.629A61 61 0 0 0 5.96 9.23l.103-.111-.147.033a61 61 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5 5 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027q.014-.03.036-.084a5 5 0 0 0 .102-.283c.078-.233.165-.53.258-.874a61 61 0 0 0 .572-2.343l.033-.147-.11.102a61 61 0 0 0-1.743 1.667 17 17 0 0 0-.629.66 5 5 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366m9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a5 5 0 0 0-.303.248 17 17 0 0 0-.661.629A61 61 0 0 0 10.04 6.77l-.102.111.147-.033a61 61 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a5 5 0 0 0 .367-.138zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027q-.014.03-.036.084a5 5 0 0 0-.102.283c-.078.233-.165.53-.258.875a61 61 0 0 0-.572 2.342l-.033.147.11-.102a61 61 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5 5 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366M14 9a1 1 0 0 0 0-2l-.03.002a5 5 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a5 5 0 0 0 .386.064zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035q.108.045.283.103c.233.078.53.165.874.258a61 61 0 0 0 2.343.572l.147.033-.103-.111a61 61 0 0 0-1.666-1.742 17 17 0 0 0-.66-.629 5 5 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366m2.196-1.196.017.025a5 5 0 0 0 .248.303c.164.184.377.408.629.661A61 61 0 0 0 6.77 5.96l.111.102-.033-.147a61 61 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5 5 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1m9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a61 61 0 0 0-2.342-.572l-.147-.033.102.111a61 61 0 0 0 1.667 1.742c.253.252.477.465.66.629a5 5 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366m-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5 5 0 0 0-.248-.303 17 17 0 0 0-.629-.661A61 61 0 0 0 9.23 10.04l-.111-.102.033.147a61 61 0 0 0 .572 2.342c.093.345.18.642.258.875a5 5 0 0 0 .138.367zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/></svg></span>
        <div class="card-tt"><h3>Enhanced biodiversity and ecosystem function</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">620</span><span class="munit">ha</span></div><div class="metric-lab">suitable habitat safeguarded vs. BAU</div></div><p class="def" data-def="modal">The systemic recovery of species richness, abundance, and complex ecological interactions, resulting in a highly resilient ecosystem capable of self-regulation and intense carbon sequestration.</p><div class="narr"><p>Conserving this <b>forest</b> ecosystem maintains an estimated <b>620 hectares</b> of suitable habitat, safeguarding habitat extent for species over the <b>30 year</b> of project&rsquo;s duration.</p></div><div class="formula"><code>avoided_loss_ha = &Sigma; (habitat pixel area &times; deforestation risk) across the project area</code></div>
    </article><article class="scard split">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/></svg></span>
        <div class="card-tt"><h3>Reduced vulnerability to fire, pests, and disease</h3><div class="tagrow"><span class="pw pw-protect">Protect</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">23</span><span class="munit">species</span></div><div class="metric-lab">reduced extinction risk (IUCN STAR)</div></div><p class="def" data-def="modal">The systemic enhancement of ecosystem and community resilience against catastrophic environmental disturbances, biological infestations, and climate-driven pathogens.</p><div class="narr"><p>By protecting at-risk habitat, this project supports habitat for <b>23</b> species, including <b>35%</b> threatened species: <b>1</b> CR, <b>3</b> EN, and <b>4</b> VU. Over the project&rsquo;s <b>30</b> year duration, the intervention may reduce threat levels by protecting at least <b>80%</b> of habitat for <b>23</b> species through: boundary demarcation &amp; legal recognition, community-based patrol &amp; monitoring, and fire prevention &amp; early warning.</p></div>
    </article><article class="scard split">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/></svg></span>
        <div class="card-tt"><h3>Improved forest productivity and regeneration</h3><div class="tagrow"><span class="pw pw-restore">Restore</span><span class="pw pw-manage">Manage</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">17</span><span class="munit">species</span></div><div class="metric-lab">expanded suitable habitat (IUCN STAR)</div></div><p class="def" data-def="modal">The measurable acceleration of natural or assisted ecological growth, biomass accumulation, and structural recovery within a forest ecosystem over time.</p><div class="narr"><p>By restoring degraded areas, this project may expand habitat for <b>17</b> species, including <b>29%</b> threatened species: <b>1</b> CR, <b>2</b> EN, and <b>2</b> VU. Over the project&rsquo;s <b>30</b> year duration, the intervention may increase suitable habitat by <b>15%</b> for <b>17</b> species through: assisted natural regeneration, enrichment planting, and agroforestry transition.</p></div>
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
            <div class="card-tt"><h3>Enhanced food and water security</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def" data-def>The guaranteed year-round, climate-resilient community access to critical nutritional and hydrological resources by stabilizing and restoring vital ecosystem functions.</p>
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
            <div class="card-tt"><h3>Sustainable livelihood opportunities</h3><div class="tagrow"><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def" data-def>The generation of climate-adaptive, nature-positive revenue streams that allow households to withstand economic shocks without degrading or depleting the local natural resource base.</p>
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
            <div class="card-tt"><h3>Strengthened social capital and governance capacity</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def" data-def>The advancement of community cohesion, institutional trust, and localized legislative and operational capacity to independently manage resources, enforce laws, and resolve conflicts.</p>
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
            <div class="card-tt"><h3>Equitable benefit-sharing mechanisms</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def" data-def>The establishment of transparent, inclusive, and legally binding institutional frameworks that distribute project-generated rewards and resource rights fairly while actively preventing elite capture.</p>
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
            <div class="card-tt"><h3>Secure land and resource tenure</h3><div class="tagrow"><span class="pw pw-protect">Protect</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def" data-def>The formalization, legal protection, and institutional enforcement of a community&rsquo;s bundle of rights to possess, use, manage, and inherit land and natural resources, safeguarding them against displacement and unauthorized exploitation.</p>
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
            <div class="card-tt"><h3>Cultural heritage preservation</h3><div class="tagrow"><span class="pw pw-protect">Protect</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
          <div class="front-default">
            <p class="def" data-def>The safeguarding, transmission, and active protection of a community&rsquo;s intangible traditions, localized ecological knowledge, sacred sites, and customary ways of life that are deeply intertwined with the surrounding landscape.</p>
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
    <article class="scard split">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M3.112 5.112a3 3 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447q0-.113.018-.231zm2.55-1.45-.725-.725A5.5 5.5 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z"/>
  <path d="m13.646 14.354-12-12 .708-.708 12 12z"/></svg></span>
        <div class="card-tt"><h3>Reduced emissions from deforestation and degradation</h3><div class="tagrow"><span class="pw pw-protect">Protect</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*35)}</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">avoided over the project duration</div></div><p class="def" data-def="modal">The greenhouse gas emissions are avoided by protecting this ecosystem from deforestation or degradation, keeping stored carbon locked in vegetation and soil rather than released to the atmosphere.</p><div class="narr"><p>Protecting this <b>forest</b> ecosystem can avoid an estimated <b>${NBS_DATA.grp(NBS_DATA.totalEligible*35)} tonnes</b> of CO&#8322;eq emissions over the project&rsquo;s <b>30 year</b> duration.</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg><span>Through: boundary demarcation &amp; legal recognition; community-based patrol; fire prevention &amp; early warning</span></div>
    </article><article class="scard split">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/></svg></span>
        <div class="card-tt"><h3>Increased carbon sequestration and storage</h3><div class="tagrow"><span class="pw pw-restore">Restore</span><span class="pw pw-manage">Manage</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*86)}</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">sequestered over the project duration</div></div><p class="def" data-def="modal">The additional greenhouse gases are removed from the atmosphere as this ecosystem is restored or sustainably managed, drawing carbon into growing vegetation and soil where it is stored over time.</p><div class="narr"><p>Restoring and sustainably managing this <b>forest</b> ecosystem can sequester an estimated <b>${NBS_DATA.grp(NBS_DATA.totalEligible*86)} tonnes</b> of CO&#8322;eq over the project&rsquo;s <b>30 years</b> duration.</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg><span>Cook-Patton et&nbsp;al. (2020) natural-regrowth rates &middot; assisted regeneration, enrichment planting, agroforestry</span></div>
    </article><article class="scard split"><span class="corner"></span><div class="card-head"><span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M3.112 5.112a3 3 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447q0-.113.018-.231zm2.55-1.45-.725-.725A5.5 5.5 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z"/>
  <path d="m13.646 14.354-12-12 .708-.708 12 12z"/></svg></span><div class="card-tt"><h3>Net carbon emissions reduction</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*35*0.65)}</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">net emissions reduction after deductions</div></div><p class="def">If this project is developed for an NbS Carbon Project, the net carbon emissions reduction is estimated at <b>${NBS_DATA.grp(NBS_DATA.totalEligible*35*0.65)} tCO&#8322;e</b> after applying deductions to the total estimated carbon reduction of <b>${NBS_DATA.grp(NBS_DATA.totalEligible*35)} tCO&#8322;e</b>.</p><div class="formula"><code>Net = Gross ${NBS_DATA.grp(NBS_DATA.totalEligible*35)} &minus; Leakage ${NBS_DATA.grp(NBS_DATA.totalEligible*3.5)} &minus; Uncertainty ${NBS_DATA.grp(NBS_DATA.totalEligible*3.5)} &minus; Buffer ${NBS_DATA.grp(NBS_DATA.totalEligible*5.25)} = ${NBS_DATA.grp(NBS_DATA.totalEligible*35*0.65)} tCO&#8322;e</code></div></article><article class="scard split"><span class="corner"></span><div class="card-head"><span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M3.112 5.112a3 3 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447q0-.113.018-.231zm2.55-1.45-.725-.725A5.5 5.5 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z"/>
  <path d="m13.646 14.354-12-12 .708-.708 12 12z"/></svg></span><div class="card-tt"><h3>Net carbon sequestration</h3><div class="tagrow"><span class="pw pw-restore">Restore</span><span class="pw pw-manage">Manage</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*86*0.65)}</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">net sequestration after deductions</div></div><p class="def">The net carbon sequestration is estimated at <b>${NBS_DATA.grp(NBS_DATA.totalEligible*86*0.65)} tCO&#8322;e</b> after applying deductions to the total estimated carbon sequestration of <b>${NBS_DATA.grp(NBS_DATA.totalEligible*86)} tCO&#8322;e</b>.</p><div class="formula"><code>Net = Gross ${NBS_DATA.grp(NBS_DATA.totalEligible*86)} &minus; Leakage ${NBS_DATA.grp(NBS_DATA.totalEligible*8.6)} &minus; Uncertainty ${NBS_DATA.grp(NBS_DATA.totalEligible*8.6)} &minus; Buffer ${NBS_DATA.grp(NBS_DATA.totalEligible*12.9)} = ${NBS_DATA.grp(NBS_DATA.totalEligible*86*0.65)} tCO&#8322;e</code></div></article><article class="scard split" data-method="Net ERRs = Gross ERR &minus; leakage &minus; uncertainty deduction, using a default leakage of 10% and an uncertainty deduction factor of 10%. The buffer contribution is not subtracted."><span class="corner"></span><div class="card-head"><span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M3.112 5.112a3 3 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447q0-.113.018-.231zm2.55-1.45-.725-.725A5.5 5.5 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z"/>
  <path d="m13.646 14.354-12-12 .708-.708 12 12z"/></svg></span><div class="card-tt"><h3>Estimated net emission reduction and removals (Net ERRs)</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*121*0.8)}</span><span class="munit">tCO&#8322;e</span></div><div class="metric-lab">net ERRs over the 30-yr crediting period</div></div><p class="def">Over a <b>30-year</b> crediting period, the project area could generate an estimated <b>${NBS_DATA.grp(NBS_DATA.totalEligible*121*0.8)} tCO&#8322;e</b> of net emission reductions and removals, an average of <b>${NBS_DATA.grp(NBS_DATA.totalEligible*121*0.8/30)} tCO&#8322;e</b> per year. This figure already subtracts leakage and uncertainty deductions from the gross potential of <b>${NBS_DATA.grp(NBS_DATA.totalEligible*121)} tCO&#8322;e</b>. It does not yet subtract the buffer contribution, which is held to cover permanence risk.</p></article><article class="scard split">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M8 14.933a1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/></svg></span>
        <div class="card-tt"><h3>Enhance resilience to climate hazards</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">3,400</span><span class="munit">people</span></div><div class="metric-lab">at reduced disaster exposure</div></div><p class="def" data-def="modal">The reduction in people&rsquo;s and assets&rsquo; exposure to climate hazards achieved by using healthy ecosystems as natural buffers.</p><div class="narr"><p>Implementing NbS in this ecosystem can reduce disaster exposure across an estimated <b>${NBS_DATA.grp(NBS_DATA.totalEligible)} hectares</b>, helping to lower risk for an estimated <b>3,400 people</b> / <b>850 households</b> / <b>6 communities</b> over the project&rsquo;s <b>30-year</b> duration.</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg><span>ADPC Climate Disaster Risk &middot; SIGnal Forest Cover &middot; Gridded World Pop</span></div>
    </article><article class="scard split">
      <span class="corner"></span>
      <div class="card-head">
        <span class="card-ic"><svg class="ic" width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
  <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/></svg></span>
        <div class="card-tt"><h3>Microclimate regulation</h3><div class="tagrow"><span class="pw pw-protect">Protect</span><span class="pw pw-manage">Manage</span><span class="pw pw-restore">Restore</span></div></div><svg class="card-info" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="More information" tabindex="0"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"></path><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
      <div class="metric"><div class="metric-main"><span class="mnum">${NBS_DATA.grp(NBS_DATA.totalEligible*0.48)}</span><span class="munit">ha</span></div><div class="metric-lab">tree-cover increase (&asymp; 48% of AOI)</div></div><p class="def" data-def="modal">The moderation of local temperatures by vegetation, through canopy shading and evapotranspiration, which buffers the area within and around it against heat extremes. Estimates the area of tree cover delivering this cooling function.</p><div class="narr"><p>Conserving this <b>forest</b> ecosystem, with an estimated <b>${NBS_DATA.grp(NBS_DATA.totalEligible*0.48)} hectares (&asymp; 48%)</b> of tree cover increase, helps regulate the local microclimate, moderating temperatures through shading and evapotranspiration, and buffering the surrounding area against heat extremes over the project&rsquo;s <b>30 year</b> duration.</p></div><div class="srcline"><svg class="ic" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
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
  'threat': threat,
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

/* ---- Site Characterisation: GUI 3.1 result states, one card at a time ----
   nbsCardState(card, state) swaps a card's result for one of the three GUI 3.1
   messages; any other value restores the result. The head (with its "i") and the
   data-source line stay, so the reader can still check the dataset's coverage.
   The other cards are not touched: a missing result never hides the rest.
   Preview without a data pipeline: add ?gcstate=terrain:failed,soil:nodata to
   the page address (keys are the data-gc values; states are the keys below).
   Built on the General, Nature, Climate and Threat profile cards (not People). */
var NBS_CARD_STATES = {
  unavailable: { tone: 'empty', title: 'Information is not available for this area.' },
  nodata: { tone: 'empty', title: 'No data available for this location.',
    text: 'The selected project area does not contain valid observations for this dataset. This does not necessarily mean the feature is absent. Review the dataset coverage or select another location.' },
  failed: { tone: 'fail', title: 'We couldn’t load this result. Please try again.', retry: true },
  /* valid results that happen to be nothing: plain sentences, not a "missing" box */
  noforest: { tone: 'zero', title: 'No forest present to assess for landscape integrity.' },
  nokba: { tone: 'zero', title: 'This project area does not overlap any Key Biodiversity Areas.' }
};
function nbsCardState(card, state){
  var old = card.querySelector('.gc-state'); if (old) old.remove();
  var s = NBS_CARD_STATES[state];
  if (!s) { card.removeAttribute('data-state'); return; }
  card.setAttribute('data-state', state);
  if (s.tone === 'zero') { card.querySelector('.gc-card__head').insertAdjacentHTML('afterend', '<p class="gc-state gc-p" role="status">' + s.title + '</p>'); return; }
  card.querySelector('.gc-card__head').insertAdjacentHTML('afterend',
    '<div class="gc-state nc-err nc-err--' + s.tone + '" role="' + (s.retry ? 'alert' : 'status') + '">' +
      '<div><b>' + s.title + '</b>' + (s.text ? '<p>' + s.text + '</p>' : '') + '</div>' +
      (s.retry ? '<button type="button" class="nc-err__retry">Try again</button>' : '') +
    '</div>');
}
/* ponytail: there is no pipeline to retry against, so "Try again" restores the
   sample result. Wire it to the real request when the analysis API exists. */
document.addEventListener('click', function(e){
  var btn = e.target.closest ? e.target.closest('.gc-state .nc-err__retry') : null;
  if (btn) nbsCardState(btn.closest('.gc-card'), null);
});
(new URLSearchParams(location.search).get('gcstate') || '').split(',').forEach(function(pair){
  var kv = pair.split(':');
  document.querySelectorAll('.gc-card[data-gc="' + kv[0].replace(/[^a-z]/g, '') + '"]').forEach(function(card){
    nbsCardState(card, kv[1]);
    var acc = card.closest('details'); if (acc && card.dataset.state) acc.open = true;
  });
});

/* ---- Benefit card "i" modal: the two things the GUI doc stores per benefit —
   the definition of the data and how it is calculated. Both are read off the
   card itself, so the card markup stays the single source of truth:
     definition → the [data-def] paragraph (data-def="modal" ones are hidden
                  on the card and only ever read here)
     method     → the .formula block, or data-method on cards without one.
   Lives on <body> so it is never clipped by the analyser's scroll panes. ---- */
var nbsBenefitInfoOpen = null;
function nbsBenefitInfo(){
  if (nbsBenefitInfoOpen) return nbsBenefitInfoOpen;
  document.body.insertAdjacentHTML('beforeend',
    '<div class="bi-overlay" id="biOverlay" aria-hidden="true">' +
      '<div class="bi-modal" role="dialog" aria-modal="true" aria-labelledby="biTitle">' +
        '<header class="bi-head"><div>' +
          '<span class="bi-eyebrow" id="biCategory"></span>' +
          '<h3 class="bi-title" id="biTitle"></h3></div>' +
          '<button class="bi-x" type="button" id="biClose" aria-label="Close">' +
          '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
        '</header>' +
        '<div class="bi-body">' +
          '<section class="bi-section" id="biDefSec"><h4 class="bi-label">Definition</h4>' +
            '<p class="bi-value" id="biDef"></p></section>' +
          '<section class="bi-section" id="biMethodSec"><h4 class="bi-label">Calculation method</h4>' +
            '<p class="bi-value bi-mono" id="biMethod"></p></section>' +
        '</div>' +
      '</div>' +
    '</div>');

  var ov = document.getElementById('biOverlay'), opener = null;
  function close(){
    ov.classList.remove('show'); ov.setAttribute('aria-hidden','true');
    if (opener && opener.focus) opener.focus();
    opener = null;
  }
  document.getElementById('biClose').addEventListener('click', close);
  ov.addEventListener('click', function(e){ if (e.target === ov) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });

  nbsBenefitInfoOpen = function open(card, from){
    if (!card) return;
    opener = from || null;
    var title = card.querySelector('h3');
    var pane = card.closest('.tabpanel');
    var def = card.querySelector('[data-def]');
    var formula = card.querySelector('.formula code');
    var method = formula ? formula.innerHTML : (card.getAttribute('data-method') || '');

    document.getElementById('biCategory').textContent = pane ? pane.id : '';
    document.getElementById('biTitle').textContent = title ? title.textContent : '';
    document.getElementById('biDef').innerHTML = def ? def.innerHTML : '';
    document.getElementById('biMethod').innerHTML = method;
    document.getElementById('biDefSec').hidden = !def;
    document.getElementById('biMethodSec').hidden = !method;
    document.getElementById('biMethod').classList.toggle('bi-mono', !!formula);
    ov.classList.add('show');
    ov.setAttribute('aria-hidden','false');
    document.getElementById('biClose').focus();
  };
  return nbsBenefitInfoOpen;
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

  /* "i" in each card head → definition + calculation modal. Capture phase so the
     People flip-cards (which flip on any front click) don't also flip. */
  var openInfo = nbsBenefitInfo();
  function infoHit(e){
    var btn = e.target.closest && e.target.closest('.card-info');
    if (!btn) return;
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault(); e.stopPropagation();
    openInfo(btn.closest('article'), btn);
  }
  root.addEventListener('click', infoHit, true);
  root.addEventListener('keydown', infoHit, true);

  var disc = root.querySelector('#disc');
  if (disc) disc.querySelector('.disc-btn').addEventListener('click', function(){ disc.classList.toggle('open'); });

  window.addEventListener('resize', function(){ requestAnimationFrame(sizeAll); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ setTimeout(sizeAll, 60); });

  return { show: show, sizeAll: sizeAll };
}

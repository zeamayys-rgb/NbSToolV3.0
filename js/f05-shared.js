/* ============================================================================
   f05-shared.js — SINGLE SOURCE OF TRUTH for NbS activity content + the
   activity-selection UI shared by:
     • F05  "Create Monitoring Plan"        → Step 1 (Define NbS Activities)
     • F05.0 "Create New Project ..."        → Step 3 (Select planned activities)
   Edit the `ecosystems` data or `buildActivitySectionsHTML()` here and BOTH
   pages update. Loaded via <script src="js/f05-shared.js"> before each page's
   own inline script. (Do not redeclare ecosystems/ecoIcons in the pages.)
   ============================================================================ */

/* Ecosystem logos — uploaded SVG assets (design-system/assets/pathway/eco-*.svg).
   Referenced relative to the screen HTML in design-system/screens/.
   Sized/positioned via the .eco-logo class (see f05.css). */
const ecoIcons = {
  forest:   `<img class="eco-logo" src="assets/pathway/eco-forest.svg" alt="Forest" />`,
  mangrove: `<img class="eco-logo" src="assets/pathway/eco-mangrove.svg" alt="Mangrove" />`,
  peatland: `<img class="eco-logo" src="assets/pathway/eco-peatland.svg" alt="Peatland" />`
};

/* Activities, benefits and indicators mirror NbS_Activities_Flow_v3.html —
   the matrix flow diagram is the canonical mapping of
   Ecosystem → Pathway → Activity → Benefit Category → Benefit → Indicator.
   Forest = DRYLAND there; ineligible trajectories are excluded.
   `traj` records the land-cover trajectory an activity belongs to (C1–C6
   ecological states). It is provenance for whoever edits this data — the
   product UI does not show it. */

/* Indicator metadata — methodology and sampling frequency, one row per
   indicator (each indicator has exactly one of each across the whole matrix).
   Activities reference indicators by name; indMeta is derived below. */
const indicatorMeta = {
  'Species Richness-Flora': { source:'Standardized point-centered quarter method or fixed quadrat field surveys counting distinct species stems within coastal zones.', freq:'Semester (6 month)' },
  'Number of Individual/Occurence per Species-Flora': { source:'Quadrat or transect surveys', freq:'Semester (6 month)' },
  'Species Richness-Fauna': { source:'Standardized fauna surveys (e.g., camera traps, line transects, point counts, or visual encounter surveys) to identify and count the total number of animal species within the monitoring area', freq:'Semester (6 month)' },
  'Number of Individual/Occurence per Species-Fauna': { source:'Camera trap / Transect / Point count', freq:'Semester (6 month)' },
  'Forest Connectivity Index': { source:'Spatial network analysis software (e.g., Conefor, GuidosToolbox) mapping patch sizes, edge effects, and corridor resistance.', freq:'Annually' },
  'Soil Erosion Control Rate': { source:'Field measurement using erosion pins or sediment traps compared against open, un-vegetated control catchments.', freq:'Annually' },
  'Tree Canopy Cover': { source:'Remote sensing analysis using high-resolution satellite imagery (Sentinel-2, Landsat, PlanetScope) combined with ground-truthing via spherical densiometers, hemispherical photography, or drone/LiDAR canopy modeling.', freq:'Annually' },
  'Water discharge flow': { source:'Direct measurement using velocity-area methods (flow/current meters, ADCP), hydraulic structures (weirs or flumes with pressure transducers/ultrasonic level sensors), or indirect estimation using slope-area methods (Manning\'s equation)', freq:'Daily' },
  'Indigenous Land Tenure': { source:'Reviewing official land registry titles, land-tenure maps, and legal gazettes against traditional territory claims.', freq:'Annually' },
  'Safeguard Information System': { source:'Documentation of social and encironmental safeguard policy or legal documents, system updates, public accessibility, and compliance metrics logs.', freq:'Annually' },
  'Crop/Non-Timber Forest Product Value': { source:'Household survey databases, community forest cooperative registries, agricultural extension records, and regional remote sensing yield analysis reports', freq:'Annually' },
  'Social Forestry Beneficiaries': { source:'Administrative registries from community forestry groups and formal land-allocation project tracking systems.', freq:'Annually' },
  'Forestry Legal Framework': { source:'Legal audit and policy review tracking milestones (e.g., 1: No Policy, 2: Drafted, 3: Enacted, 4: Enforced).', freq:'Annually' },
  'MRV Institutional Capacity': { source:'Standardized institutional capacity assessments evaluation across staffing, GIS hardware availability, and data audit trails.', freq:'Annually' },
  'Grievance Redress Mechanism': { source:'Project grievance logbooks tracking total inputs, days to resolution, and formal stakeholder satisfaction sign-offs.', freq:'Annually' },
  'Adaptive Management Response Time': { source:'Auditing project management logs tracking the time delta between an adverse monitoring report and implemented field adjustments.', freq:'Annually' },
  'Benefit Sharing Mechanism': { source:'Financial compliance audits of trust funds, project bank statements, and community-approved allocation registries.', freq:'Annually' },
  'Gender-Disaggregated Resource Access': { source:'Reviewing formal resource collection permits, attendance at decision assemblies, and micro-grant disbursement lists.', freq:'Annually' },
  'Deforestation Rate': { source:'Multi-temporal automated classification of satellite imagery (Sentinel-2, Landsat) cross-verified with global forest loss alerts.', freq:'Annually' },
  'Forest Degradation Rate': { source:'Canopy density tracking via continuous fractional vegetation cover (FVC) analysis or delta-NDVI baseline comparisons.', freq:'Annually' },
  'Forest Extent': { source:'GIS mapping utilizing land-cover baseline maps, high-resolution satellite arrays, and targeted ground-truthing plots.', freq:'Annually' },
  'Forest Carbon Stock': { source:'Physical forest inventories using allometric equations (DBH) combined with remote-sensing LiDAR/Radar models.', freq:'Annually' },
  'Soil Organic Carbon Accumulation': { source:'Standardized laboratory testing (Walkley-Black or dry combustion) of soil cores collected from permanent field monitoring grids.', freq:'Annually' },
  'Protected Ecosystem Area': { source:'National environmental ministry gazette documents and digital boundaries overlayed with total baseline mangrove maps.', freq:'Annually' },
  'Sediment Accretion Rate': { source:'Field installation and monitoring of Surface Elevation Tables (SET) paired with horizontal feldspar marker horizons.', freq:'Annually' },
  'Relative Sea-Level': { source:'Measured using tide gauges, satellite altimetry, GPS/SET data, or other long-term sea-level monitoring datasets.', freq:'Daily' },
  'Tidal Inundation Regime': { source:'Deployment of automated pressure-transducer water level loggers within the forest interior calibrated to local tide datums.', freq:'Daily' },
  'Mangrove Carbon Stock': { source:'Allometric measurement of tree dimensions paired with deep-core sediment soil carbon sampling in coastal transects.', freq:'Annually' },
  'Aquaculture Conversion Pressure': { source:'GIS buffer analysis calculating the distance and conversion rates of aquaculture boundaries relative to intact forest margins.', freq:'Annually' },
  'Forest Fire Incidents': { source:'MODIS and VIIRS satellite active fire thermal anomaly data combined with localized post-fire perimeter mapping.', freq:'Annually' },
  'Invasive Species Spread Rate': { source:'Systematic grid sampling across permanent forest line-transects combined with high-resolution drone multi-spectral mapping.', freq:'Semester (6 month)' },
  'Peat Burn Depth': { source:'Measured through post-fire field surveys by comparing pre- and post-fire peat surface elevations, burn scar assessments, and direct peat depth measurements at representative locations.', freq:'Annually' },
  'Peat Soil Moisture': { source:'Measured using in-situ soil moisture sensors installed at representative depths, supplemented by gravimetric analysis of peat samples collected in the field.', freq:'Daily' },
  'Peat Fire Hotspots': { source:'Daily processing of MODIS/VIIRS thermal data combined with localized ground patrol fire verification grids.', freq:'Daily' },
  'Burned Area': { source:'Measured using satellite imagery, burned scar mapping, fire hotspot detection, and field verification where applicable.', freq:'Annually' },
  'Water Table Depth': { source:'Automated telemetry-enabled dipwells and piezometers logging water table fluctuations at hourly intervals across a grid.', freq:'Daily' },
  'Peat Water Quality': { source:'Regular collection of subsurface pore-water using suction lysimeters followed by standardized laboratory chemical tracking.', freq:'Monthly' },
  'Peatland Extent': { source:'Systematic soil auger field profiling, electrical resistivity imaging (ERI), and specialized digital soil mapping models.', freq:'Annually' },
  'Rainwater Use Efficiency': { source:'Combining satellite-derived net primary productivity (NPP) models with localized gridded rain-gauge data arrays.', freq:'Annually' },
  'Fire Prevention Brigades': { source:'Civil defense or project administrative records verifying active rosters, training certificates, and equipment maintenance logs.', freq:'Annually' },
  'Burning Ban Compliance': { source:'Compliance assessment using field inspections, fire hotspot data, and administrative records.', freq:'Annually' },
  'Peatland Carbon Emissions': { source:'Closed flux chamber field measurements calibrated with water table depth proxy emission factors (IPCC Tier 2/3 models).', freq:'Annually' },
  'Nitrous Oxide (N₂O) Flux': { source:'Field deployment of automated or manual static greenhouse gas flux chambers and gas chromatography analysis.', freq:'Annually' },
  'Methane (CH4) Flux': { source:'Field deployment of automated or manual static greenhouse gas flux chambers and gas chromatography analysis.', freq:'Annually' },
  'Peatland Carbon Emissions due to fires': { source:'Closed flux chamber field measurements calibrated with water table depth proxy emission factors (IPCC Tier 2/3 models).', freq:'Annually' },
  'Drained Peatland Area': { source:'Manual and automated remote-sensing digitizing of canal networks and associated dry-land vegetative signatures.', freq:'Annually' },
  'Peat Subsidence Rate': { source:'Physical field measurements using deep-anchored subsidence poles anchored to bedrock, supplemented by InSAR satellite radar.', freq:'Annually' },
  'Trees Planted': { source:'Nursery inventory and seedling dispatch logs combined with field planting registries, geotagged mobile app data, and verified through random plot-based survival audits and drone-based high-resolution aerial counts.', freq:'Quarterly (3 month)' },
  'Ecosystem Restoration Area': { source:'Geotagged project boundaries verified via high-resolution satellite arrays and localized seedling survival count grids.', freq:'Annually' },
  'Number of Seedlings per Species': { source:'Standardized vegetation surveys using quadrats or transects to identify and count the total number of plant species within the monitoring area', freq:'Quarterly (3 month)' },
  'Groundwater Recharge Flux': { source:'Water-table fluctuation methods in local monitoring wells paired with localized water balance modeling software.', freq:'Annually' },
  'Number of Seedling Species': { source:'Field inventory of restoration plots using standardized species identification protocols and restoration monitoring records.', freq:'Quarterly (3 month)' },
  'Sustainable Grazing Capacity': { source:'Seasonal forage biomass clipping and weighing trials combined with community livestock tracking audits.', freq:'Annually' },
  'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities': { source:'Quantification of net carbon stock changes in above- and below-ground biomass using permanent field sample plots (allometric equations based on DBH and height), calibrated with remote sensing models, subtracting baseline changes, project emissions, and leakage as per certified standards.', freq:'Annually' },
  'Peat Soil Wetness Index': { source:'Derived from water table monitoring, soil moisture measurements, and/or satellite-based hydrological assessments using a standardized calculation approach.', freq:'Weekly' },
  'Rewetted Peatland Area': { source:'As-built engineering mapping verified by satellite hydrological tracking and localized water table depth stabilization data.', freq:'Annually' },
  'Paludiculture Area': { source:'Project agricultural distribution records and land-use mapping cross-verified with seasonal satellite vegetative indices.', freq:'Annually' },
  'Peat Restoration Progress': { source:'Project management milestone auditing against the formal landscape-scale master restoration plan.', freq:'Annually' },
  'Pioneer Vegetation Cover': { source:'Quadrat surveys combined with drone or satellite imagery to estimate vegetation cover.', freq:'Semester (6 month)' },
  'Drought-Resilient Canopy Cover': { source:'Line-intercept field transects combined with ultra-high-resolution airborne or drone orthomosaic imagery classification.', freq:'Annually' },
};

const ecosystems = [
  { id:'forest', name:'Forest', pwLabel:'Protect / Manage / Restore', pwClass:'', colorCls:'forest', activities:[
    { id:'fo-pro-1', name:'Establish protected areas, corridors, and enforce customary land rights.', traj:'Forest to C1/C2 (Persistent Forest)', pw:'PROTECT', type:'Recommended', checked:true, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Soil Erosion Control Rate', 'Tree Canopy Cover', 'Water discharge flow'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'People', benefit:'Cultural heritage preservation', inds:['Safeguard Information System'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Forest Extent', 'Forest Carbon Stock'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Soil Organic Carbon Accumulation'] },
    ]},
    { id:'fo-res-1', name:'Execute Assisted Natural Regeneration (ANR) and enrichment planting.', traj:'Forest to C4 (Degraded; Other Ref.)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Forest Extent', 'Tree Canopy Cover', 'Trees Planted', 'Ecosystem Restoration Area', 'Number of Seedlings per Species'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Soil Erosion Control Rate', 'Groundwater Recharge Flux', 'Water discharge flow'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency', 'Sustainable Grazing Capacity'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Soil Organic Carbon Accumulation', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Tree Canopy Cover'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate'] },
    ]},
    { id:'fo-res-2', name:'Conduct Forest Landscape Restoration (FLR) to transition back to native forest.', traj:'Forest to C5 (Converted; Other Ref.)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Soil Erosion Control Rate', 'Groundwater Recharge Flux', 'Water discharge flow'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Soil Organic Carbon Accumulation', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate'] },
    ]},
    { id:'fo-res-3', name:'Soil terracing/gully plugs for erosion control and active reforestation.', traj:'Forest to C6 (Converted to Barren)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Forest Extent', 'Tree Canopy Cover', 'Trees Planted', 'Ecosystem Restoration Area', 'Number of Seedlings per Species'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Soil Erosion Control Rate', 'Groundwater Recharge Flux', 'Water discharge flow'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Soil Organic Carbon Accumulation', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Tree Canopy Cover'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate'] },
    ]},
    { id:'fo-man-1', name:'Protect regenerating stands from fire/grazing and apply CBFM.', traj:'Non-Forest to C1/C2 (Regenerated Naturally)', pw:'MANAGE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Forest Extent', 'Tree Canopy Cover', 'Fire Prevention Brigades'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Soil Erosion Control Rate', 'Groundwater Recharge Flux', 'Water discharge flow'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Soil Organic Carbon Accumulation', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Tree Canopy Cover'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate'] },
    ]},
    { id:'fo-man-2', name:'Optimize forage management, rotational grazing, and controlled patch burning.', traj:'Non-Forest to C4 (Stable C4; Cultivated)', pw:'MANAGE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Soil Erosion Control Rate', 'Groundwater Recharge Flux', 'Water discharge flow'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index', 'Forest Extent'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency', 'Sustainable Grazing Capacity'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Soil Organic Carbon Accumulation', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate'] },
    ]},
    { id:'fo-res-4', name:'Remove invasive flora, plant native non-forest trees, and restore riparian buffers.', traj:'Non-Forest to C4 (Stable C4; Other Ref.)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Soil Erosion Control Rate', 'Groundwater Recharge Flux', 'Water discharge flow'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency', 'Sustainable Grazing Capacity'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Tree Canopy Cover'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Soil Organic Carbon Accumulation', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate'] },
    ]},
    { id:'fo-man-3', name:'Agroforestry (alley cropping, windbreaks) with zero-tillage, cover crops, and biochar.', traj:'Non-Forest to C5 (Stable Cropland/Rice)', pw:'MANAGE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Soil Erosion Control Rate', 'Groundwater Recharge Flux', 'Water discharge flow'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency', 'Sustainable Grazing Capacity'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Soil Organic Carbon Accumulation', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate'] },
    ]},
    { id:'fo-man-4', name:'Establish vegetated riparian buffers around inland fish ponds.', traj:'Non-Forest to C5 (Aqua Elsewhere)', pw:'MANAGE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Soil Erosion Control Rate', 'Groundwater Recharge Flux', 'Water discharge flow'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Soil Organic Carbon Accumulation', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Drought-Resilient Canopy Cover'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Forest Extent', 'Tree Canopy Cover'] },
    ]},
    { id:'fo-res-5', name:'Bio-engineering, soil reclamation, and drought-tolerant native afforestation.', traj:'Non-Forest to C6 (Stable Barren)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Forest Extent', 'Tree Canopy Cover', 'Trees Planted', 'Ecosystem Restoration Area', 'Number of Seedlings per Species'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Soil Erosion Control Rate', 'Groundwater Recharge Flux', 'Water discharge flow'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency', 'Sustainable Grazing Capacity'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Soil Organic Carbon Accumulation', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Tree Canopy Cover'] },
    ]},
  ]},
  { id:'mangrove', name:'Mangrove', pwLabel:'Protect / Manage / Restore', pwClass:'teal', colorCls:'mangrove', activities:[
    { id:'ma-pro-1', name:'Establish MPAs and enforce strict prohibitions on coastal development.', traj:'Forest to C1/C2 (Persistent Forest)', pw:'PROTECT', type:'Recommended', checked:true, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Tree Canopy Cover'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna', 'Protected Ecosystem Area'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate', 'Relative Sea-Level', 'Tidal Inundation Regime'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Mangrove Carbon Stock'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Aquaculture Conversion Pressure'] },
    ]},
    { id:'ma-res-1', name:'Breach coastal barriers for tidal flushing and actively plant native mangroves.', traj:'Forest to C4 (Degraded; Other Ref.)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna', 'Protected Ecosystem Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Tidal Inundation Regime'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Water discharge flow'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate', 'Relative Sea-Level'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities', 'Mangrove Carbon Stock'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Aquaculture Conversion Pressure'] },
    ]},
    { id:'ma-res-2', name:'Reclaim active aquaculture ponds, hydrological restoration, and re-establish intertidal elevation.', traj:'Forest to C5 (Converted; Other Ref.)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Tidal Inundation Regime'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna', 'Protected Ecosystem Area'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Cultural heritage preservation', inds:['Indigenous Land Tenure'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate', 'Relative Sea-Level'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities', 'Mangrove Carbon Stock'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Aquaculture Conversion Pressure'] },
    ]},
    { id:'ma-res-3', name:'Build permeable breakwaters to trap sediment and re-vegetate mudflats.', traj:'Forest to C6 (Converted to Barren)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna', 'Protected Ecosystem Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Tidal Inundation Regime'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate', 'Relative Sea-Level'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities', 'Mangrove Carbon Stock'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Aquaculture Conversion Pressure'] },
    ]},
    { id:'ma-man-1', name:'Protect colonizing seedlings on mudflats and regulate non-timber harvesting.', traj:'Non-Forest to C1/C2 (Regenerated Naturally)', pw:'MANAGE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna', 'Protected Ecosystem Area'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Tidal Inundation Regime'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate', 'Relative Sea-Level'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities', 'Mangrove Carbon Stock'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Aquaculture Conversion Pressure'] },
    ]},
    { id:'ma-man-2', name:'Implement sustainable coastal wetland utilization and community-based NTFP.', traj:'Non-Forest to C4 (Stable C4; Cultivated)', pw:'MANAGE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna', 'Protected Ecosystem Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Tidal Inundation Regime'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate', 'Relative Sea-Level'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Aquaculture Conversion Pressure'] },
    ]},
    { id:'ma-res-4', name:'Restore degraded tidal marshlands and rehabilitate abandoned salt pans.', traj:'Non-Forest to C4 (Stable C4; Other Ref.)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna', 'Protected Ecosystem Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Tidal Inundation Regime'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate', 'Relative Sea-Level'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities', 'Mangrove Carbon Stock'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Aquaculture Conversion Pressure'] },
    ]},
    { id:'ma-man-3', name:'Manage saline-tolerant crop and establish protective mangrove greenbelts.', traj:'Non-Forest to C5 (Stable Cropland/Rice)', pw:'MANAGE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Tidal Inundation Regime'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna', 'Protected Ecosystem Area'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate', 'Relative Sea-Level'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Tree Canopy Cover'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Aquaculture Conversion Pressure'] },
    ]},
    { id:'ma-res-5', name:'Breach aquaculture pond dykes for full tidal flushing and replant endemic mangroves.', traj:'Non-Forest to C5 (Aqua on Mangrove/Peat)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna', 'Protected Ecosystem Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Tidal Inundation Regime'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate', 'Relative Sea-Level'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities', 'Mangrove Carbon Stock'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Aquaculture Conversion Pressure'] },
    ]},
    { id:'ma-man-4', name:'Transition to silvofisheries (mangroves on pond dikes/buffers) & bio-filtration.', traj:'Non-Forest to C5 (Aqua Elsewhere)', pw:'MANAGE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Tidal Inundation Regime'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna', 'Protected Ecosystem Area'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate', 'Relative Sea-Level'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Tree Canopy Cover'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Aquaculture Conversion Pressure'] },
    ]},
    { id:'ma-res-6', name:'Build artificial breakwaters to restore mud substrate and reintroduce pioneer flora.', traj:'Non-Forest to C6 (Stable Barren)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna', 'Protected Ecosystem Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Tidal Inundation Regime'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate', 'Relative Sea-Level'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock', 'Carbon sequestration / removal rate from Afforestation, Reforestation, and Revegetation (ARR) activities', 'Mangrove Carbon Stock'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Aquaculture Conversion Pressure'] },
    ]},
  ]},
  { id:'peatland', name:'Peatland', pwLabel:'Protect / Manage / Restore', pwClass:'olive', colorCls:'peatland', activities:[
    { id:'pe-pro-1', name:'Protect peat domes within Peat Hydrological Units (PHUs), enforce moratoria, & ban canal construction.', traj:'Forest to C1/C2 (Persistent Forest)', pw:'PROTECT', type:'Recommended', checked:true, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents', 'Invasive Species Spread Rate', 'Peat Burn Depth', 'Peat Soil Moisture', 'Peat Fire Hotspots', 'Burned Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Water Table Depth', 'Tree Canopy Cover', 'Peat Water Quality'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Peatland Extent', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades', 'Burning Ban Compliance', 'Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Peatland Carbon Emissions', 'Nitrous Oxide (N₂O) Flux', 'Methane (CH4) Flux', 'Peatland Carbon Emissions due to fires', 'Drained Peatland Area', 'Peat Subsidence Rate'] },
    ]},
    { id:'pe-res-1', name:'Construct rewetting infrastructures to raise water tables and re-vegetate with native species.', traj:'Forest to C4 (Degraded; Other Ref.)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents', 'Invasive Species Spread Rate', 'Peat Burn Depth', 'Peat Soil Moisture', 'Peat Fire Hotspots', 'Burned Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Water Table Depth', 'Peat Soil Wetness Index', 'Rewetted Peatland Area', 'Peat Water Quality'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Peatland Extent', 'Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value', 'Paludiculture Area'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades', 'Burning Ban Compliance', 'Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Peatland Carbon Emissions', 'Nitrous Oxide (N₂O) Flux', 'Methane (CH4) Flux', 'Peatland Carbon Emissions due to fires', 'Drained Peatland Area', 'Peat Subsidence Rate'] },
    ]},
    { id:'pe-res-2', name:'Rewet drained croplands & implement paludiculture (the sustainable cultivation using peatland-adapted crops).', traj:'Forest to C5 (Converted; Other Ref.)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents', 'Invasive Species Spread Rate', 'Peat Burn Depth', 'Peat Soil Moisture', 'Peat Fire Hotspots', 'Burned Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Water Table Depth', 'Peat Soil Wetness Index', 'Rewetted Peatland Area', 'Peat Water Quality'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Peatland Extent', 'Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value', 'Paludiculture Area'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades', 'Burning Ban Compliance', 'Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Peatland Carbon Emissions', 'Nitrous Oxide (N₂O) Flux', 'Methane (CH4) Flux', 'Peatland Carbon Emissions due to fires', 'Drained Peatland Area', 'Peat Subsidence Rate'] },
    ]},
    { id:'pe-res-3', name:'Rewet degraded bare peat, control compaction, & reintroduce peatland native species.', traj:'Forest to C6 (Converted to Barren)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents', 'Invasive Species Spread Rate', 'Peat Burn Depth', 'Peat Soil Moisture', 'Peat Fire Hotspots', 'Burned Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Water Table Depth', 'Peat Soil Wetness Index', 'Rewetted Peatland Area', 'Peat Water Quality'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Peatland Extent', 'Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value', 'Paludiculture Area'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades', 'Burning Ban Compliance', 'Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Peatland Carbon Emissions', 'Nitrous Oxide (N₂O) Flux', 'Methane (CH4) Flux', 'Peatland Carbon Emissions due to fires', 'Drained Peatland Area', 'Peat Subsidence Rate'] },
    ]},
    { id:'pe-man-1', name:'Maintain high peat water tables and establish community fire-monitoring teams.', traj:'Non-Forest to C1/C2 (Regenerated Naturally)', pw:'MANAGE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents', 'Invasive Species Spread Rate', 'Peat Burn Depth', 'Peat Soil Moisture', 'Peat Fire Hotspots', 'Burned Area'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Forest Extent', 'Tree Canopy Cover', 'Peatland Extent', 'Peat Restoration Progress', 'Pioneer Vegetation Cover', 'Ecosystem Restoration Area', 'Peat Soil Wetness Index'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Water Table Depth', 'Peat Soil Wetness Index', 'Rewetted Peatland Area', 'Peat Water Quality'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Peatland Extent', 'Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades', 'Burning Ban Compliance', 'Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Peatland Carbon Emissions', 'Nitrous Oxide (N₂O) Flux', 'Methane (CH4) Flux', 'Peatland Carbon Emissions due to fires', 'Drained Peatland Area', 'Peat Subsidence Rate'] },
    ]},
    { id:'pe-man-2', name:'Implement paludiculture (the sustainable cultivation using peatland-adapted crops).', traj:'Non-Forest to C4 (Stable C4; Cultivated)', pw:'MANAGE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents', 'Invasive Species Spread Rate', 'Peat Burn Depth', 'Peat Soil Moisture', 'Peat Fire Hotspots', 'Burned Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Water Table Depth', 'Peat Soil Wetness Index', 'Rewetted Peatland Area', 'Peat Water Quality'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Peatland Extent', 'Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value', 'Paludiculture Area'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades', 'Burning Ban Compliance', 'Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Peatland Carbon Emissions', 'Nitrous Oxide (N₂O) Flux', 'Methane (CH4) Flux', 'Peatland Carbon Emissions due to fires', 'Drained Peatland Area', 'Peat Subsidence Rate'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Tree Canopy Cover'] },
    ]},
    { id:'pe-res-4', name:'Construct peat rewetting infrastructures to maintain water tables and revegetate with native species.', traj:'Non-Forest to C4 (Stable C4; Other Ref.)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents', 'Invasive Species Spread Rate', 'Peat Burn Depth', 'Peat Soil Moisture', 'Peat Fire Hotspots', 'Burned Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Water Table Depth', 'Peat Soil Wetness Index', 'Rewetted Peatland Area', 'Peat Water Quality'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Peatland Extent', 'Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value', 'Paludiculture Area'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades', 'Burning Ban Compliance', 'Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Peatland Carbon Emissions', 'Nitrous Oxide (N₂O) Flux', 'Methane (CH4) Flux', 'Peatland Carbon Emissions due to fires', 'Drained Peatland Area', 'Peat Subsidence Rate'] },
    ]},
    { id:'pe-man-3', name:'Transition drained croplands to paludiculture and maintain water table management.', traj:'Non-Forest to C5 (Stable Cropland/Rice)', pw:'MANAGE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents', 'Invasive Species Spread Rate', 'Peat Burn Depth', 'Peat Soil Moisture', 'Peat Fire Hotspots', 'Burned Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Water Table Depth', 'Peat Soil Wetness Index', 'Rewetted Peatland Area', 'Peat Water Quality'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Peatland Extent', 'Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value', 'Paludiculture Area'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades', 'Burning Ban Compliance', 'Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Deforestation Rate', 'Forest Degradation Rate', 'Peatland Carbon Emissions', 'Nitrous Oxide (N₂O) Flux', 'Methane (CH4) Flux', 'Peatland Carbon Emissions due to fires', 'Drained Peatland Area', 'Peat Subsidence Rate'] },
    ]},
    { id:'pe-res-5', name:'Decommission drained peat farming/ponds and build peat rewetting infrastructures to rewet peat.', traj:'Non-Forest to C5 (Aqua on Mangrove/Peat)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents', 'Invasive Species Spread Rate', 'Peat Burn Depth', 'Peat Soil Moisture', 'Peat Fire Hotspots', 'Burned Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Water Table Depth', 'Peat Soil Wetness Index', 'Rewetted Peatland Area', 'Peat Water Quality'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Peatland Extent', 'Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value', 'Paludiculture Area'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades', 'Burning Ban Compliance', 'Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Peat Restoration Progress', 'Rewetted Peatland Area', 'Peatland Carbon Emissions', 'Nitrous Oxide (N₂O) Flux', 'Methane (CH4) Flux', 'Peatland Carbon Emissions due to fires', 'Drained Peatland Area', 'Peat Subsidence Rate'] },
    ]},
    { id:'pe-res-6', name:'Rewet bare degraded peat and reintroduce native peatland species.', traj:'Non-Forest to C6 (Stable Barren)', pw:'RESTORE', type:'Recommended', checked:false, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents', 'Invasive Species Spread Rate', 'Peat Burn Depth', 'Peat Soil Moisture', 'Peat Fire Hotspots', 'Burned Area'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water discharge flow', 'Water Table Depth', 'Peat Soil Wetness Index', 'Rewetted Peatland Area', 'Peat Water Quality'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Peatland Extent', 'Number of Seedling Species', 'Species Richness-Flora', 'Number of Individual/Occurence per Species-Flora', 'Species Richness-Fauna', 'Number of Individual/Occurence per Species-Fauna'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Rainwater Use Efficiency'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries', 'Crop/Non-Timber Forest Product Value', 'Paludiculture Area'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades', 'Burning Ban Compliance', 'Forestry Legal Framework', 'MRV Institutional Capacity', 'Safeguard Information System', 'Grievance Redress Mechanism', 'Adaptive Management Response Time'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism', 'Gender-Disaggregated Resource Access'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Peatland Carbon Emissions', 'Nitrous Oxide (N₂O) Flux', 'Methane (CH4) Flux', 'Peatland Carbon Emissions due to fires', 'Drained Peatland Area', 'Peat Subsidence Rate'] },
    ]},
  ]},
];

// Derive flat indicator lists (Step 3 accordions & the indicator editor) plus
// each activity's per-indicator source/frequency, taken from indicatorMeta.
// a.method / a.freq are the activity-level fallbacks shown in the Method editor.
ecosystems.forEach(e => e.activities.forEach(a => {
  a.indicators = a.benefits.flatMap(b => b.inds);
  a.optional = a.optional || [];
  a.indMeta = {};
  a.indicators.forEach(i => { if (indicatorMeta[i]) a.indMeta[i] = { ...indicatorMeta[i] }; });
  const first = indicatorMeta[a.indicators[0]] || {};
  a.method = first.source || '';
  a.freq = first.freq || 'Annually';
}));

const INTV_LABEL = { PROTECT:'Protect', MANAGE:'Manage', RESTORE:'Restore' };
const EMPTY_IC = `<svg viewBox="0 0 24 24" fill="none"><path d="M3 5h18M6 5l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M4 4l16 16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function findAct(id) { for (const e of ecosystems) { const a = e.activities.find(x => x.id === id); if (a) return a; } return null; }

/* ──────────────────────────────────────────────────────────────────────────
   Shared activity-selection markup — grouped by pathway
   (Protect / Manage / Restore / Custom), driven by two filter Sets.
   Used by F05 "Create Monitoring Plan" Step 1 AND F05.0 Step 3.
   Edit this builder (or the data above) and BOTH pages update together.
   ────────────────────────────────────────────────────────────────────────── */
function buildActivitySectionsHTML(activeEco, activeIntv) {
  const PW_LABEL = { PROTECT:'PROTECT ACTIVITIES', MANAGE:'MANAGE ACTIVITIES', RESTORE:'RESTORE ACTIVITIES', CUSTOM:'CUSTOM ACTIVITIES' };
  const listIntv = () => [...activeIntv].map(p => INTV_LABEL[p]).join(' / ');
  return ecosystems.map(e => {
    const head = `<div class="eco-head">
        <div class="eco-title">${ecoIcons[e.id]}<span>${e.name}</span></div>
        <div class="eco-badges">${e.pwLabel.split('/').map(t=>`<span class="eco-badge ${e.pwClass}">${t.trim()}</span>`).join('')}</div>
      </div>`;

    // Ecosystem switched off in the filter → disabled empty state.
    if (!activeEco.has(e.id)) {
      return `<div class="eco-card is-off">${head}
        <div class="eco-empty">
          <div class="eco-empty-ic">${EMPTY_IC}</div>
          <div class="eco-empty-title">${e.name} not selected</div>
          <div class="eco-empty-msg"><strong>${e.name}</strong> activities aren't applicable — this ecosystem isn't selected in the Ecosystem filter above.</div>
        </div></div>`;
    }

    // Visible activities = matching the active intervention (custom activities have no pathway → always shown).
    const visAct = e.activities.filter(a => !a.pw || activeIntv.has(a.pw));
    if (visAct.length === 0) {
      // `noPicks` is set by the page when this ecosystem was filtered down to
      // nothing by the Data Analyser (F02-P4) selection — not by the filters here.
      return `<div class="eco-card">${head}
        <div class="eco-empty">
          <div class="eco-empty-ic">${EMPTY_IC}</div>
          <div class="eco-empty-title">${e.noPicks ? 'No activities selected' : 'No matching activities'}</div>
          <div class="eco-empty-msg">${e.noPicks
            ? `You didn't select any <strong>${e.name}</strong> activities in the Data Analyser (Step 4 — Pathway selection).`
            : `<strong>${e.name}</strong> has no ${listIntv()} activities. Adjust the Intervention filter above.`}</div>
        </div>
        <button class="btn-add-act" onclick="openAddModal('${e.id}')">+ Add custom activity</button></div>`;
    }

    // Group visible activities by pathway with a small section title.
    const groups = { PROTECT:[], MANAGE:[], RESTORE:[], CUSTOM:[] };
    visAct.forEach(a => groups[a.pw || 'CUSTOM'].push(a));
    const groupsHtml = ['PROTECT','MANAGE','RESTORE','CUSTOM']
      .filter(k => groups[k].length)
      .map(k => `
        <div class="pw-group">
          <div class="pw-section-hd pw-${k.toLowerCase()}"><span class="pw-dot"></span>${PW_LABEL[k]}</div>
          <div class="act-list">
            ${groups[k].map(a => `
              <label class="act-item">
                <input type="checkbox" data-activity="${a.id}" ${a.checked?'checked':''}/>
                <span>${a.name}</span>
                ${a.pw ? `<span class="act-tag pw-${a.pw.toLowerCase()}">${a.pw}</span>` : `<span class="act-tag opt">CUSTOM</span>`}
              </label>`).join('')}
          </div>
        </div>`).join('');
    return `<div class="eco-card">${head}${groupsHtml}
      <button class="btn-add-act" onclick="openAddModal('${e.id}')">+ Add custom activity</button></div>`;
  }).join('');
}

/* Attach change handlers to the rendered activity checkboxes; onChange runs after each toggle. */
function wireActivityCheckboxes(onChange) {
  document.querySelectorAll('[data-activity]').forEach(cb => cb.addEventListener('change', () => {
    const a = findAct(cb.dataset.activity);
    if (a) a.checked = cb.checked;
    if (typeof onChange === 'function') onChange();
  }));
}

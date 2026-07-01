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

/* Activities, benefits and indicators are mapped directly from the
   NbS indicators-longform matrix (Pathway → Ecosystem → Activity →
   Benefit Category → Benefit → Indicator). Forest = DRYLAND in source.
   Max 7 activities per ecosystem, spread across Protect / Manage / Restore. */

const ecosystems = [
  { id:'forest', name:'Forest', pwLabel:'Protect / Manage / Restore', pwClass:'', colorCls:'forest', activities:[
    { id:'fo-pro-1', name:'Boundary demarcation & legal recognition', pw:'PROTECT', type:'Recommended', checked:true, method:'Remote Sensing', freq:'Annually', indMeta:{ 'Fragmentation index (1-10)':{source:'Remote Sensing'}, 'Forest Carbon Stock (tCO₂e)':{source:'Remote Sensing/Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Fragmentation index (1-10)'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Area under recognised indigenous or customary tenure (ha)'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Forest Carbon Stock (tCO₂e)'] }
    ]},
    { id:'fo-pro-2', name:'Community-based patrol & monitoring', pw:'PROTECT', type:'Recommended', checked:true, method:'Remote sensing', freq:'Annually', indMeta:{ 'Forest Fire Incidents (number)':{source:'Remote sensing'}, 'Primary Forest Loss (ha)':{source:'Remote sensing'} }, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents (number)', 'Primary Forest Loss (ha)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water yield (GIS Analysis)'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Grievance Redress Mechanism', 'MRV Institutional Capacity'] }
    ]},
    { id:'fo-pro-3', name:'Customary/indigenous rights recognition & FPIC process', pw:'PROTECT', type:'Recommended', checked:false, method:'Field Survey/Secondary Data (Government Data)', freq:'Annually', indMeta:{ 'Sites of community importance and special protection areas (Ha)':{source:'Field Survey/Secondary Data (Government Data)'} }, benefits:[
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Forest Carbon Stock'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Sites of community importance and special protection areas (Ha)'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism'] }
    ]},
    { id:'fo-pro-4', name:'Fire prevention infrastructure & early warning', pw:'PROTECT', type:'Recommended', checked:false, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Degradation Rate'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Social Forestry Beneficiaries'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Forest Carbon Stock'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['MRV Institutional Capacity'] }
    ]},
    { id:'fo-pro-5', name:'Buffer zone establishment & compatible land use', pw:'PROTECT', type:'Recommended', checked:false, method:'Household survey', freq:'Annually', indMeta:{ 'Household income (USD/year)':{source:'Household survey'}, 'Land surface temerature (°C)':{source:'remote sensing/field sensor'} }, benefits:[
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Household income (USD/year)'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Degradation Rate'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Land surface temerature (°C)'] }
    ]},
    { id:'fo-pro-6', name:'Biodiversity baseline & adaptive monitoring system', pw:'PROTECT', type:'Recommended', checked:false, method:'Field Measurement', freq:'Annually', indMeta:{ 'Species richness index (index)':{source:'Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species richness index (index)'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['community institutions (count)'] }
    ]},
    { id:'fo-man-1', name:'Soil rehabilitation & erosion control', pw:'MANAGE', type:'Recommended', checked:true, method:'Remote sensing', freq:'Annually', indMeta:{ 'Tree canopy cover (%)':{source:'Remote sensing'}, 'Crop/NTFP Yield (kg/year)':{source:'Field Measurement'}, 'Total carbon removed or stored in vegetation and soil per unit area per unit time (metric tonnes/ha/year)':{source:'Remote Sensing/Field Measurement'}, 'Number of active community institutions (KUPS/LPHD) (count)':{source:'Field Survey/Secondary Data (Government Data)'}, 'Disaster vulnability index (index)':{source:'GIS/Remote Sensing'} }, benefits:[
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Tree canopy cover (%)'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/NTFP Yield (kg/year)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Total carbon removed or stored in vegetation and soil per unit area per unit time (metric tonnes/ha/year)'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Sediment Accretion Rate'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Number of active community institutions (KUPS/LPHD) (count)'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Disaster vulnability index (index)'] }
    ]},
    { id:'fo-man-2', name:'Community-based fire management (degraded areas)', pw:'MANAGE', type:'Recommended', checked:false, method:'GIS/Remote Sensing', freq:'Annually', indMeta:{ 'Forest Fire Incidents (count)':{source:'GIS/Remote Sensing'}, 'Crop/NTFP Yield (kg/year)':{source:'household survey'}, 'Disaster vulnability index (index)':{source:'GIS/Remote Sensing'} }, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Forest Fire Incidents (count)'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Fire Prevention Brigades'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Crop/NTFP Yield (kg/year)'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades (count)'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Disaster vulnability index (index)'] }
    ]},
    { id:'fo-man-3', name:'Assisted Natural Regeneration (ANR)', pw:'MANAGE', type:'Recommended', checked:false, method:'Remote sensing', freq:'Annually', indMeta:{ 'Tree canopy cover (%)':{source:'Remote sensing'}, 'Forest Carbon Stock (MtCO₂e/yr or tCO₂e/yr)':{source:'Remote sensing/field measurement'}, 'Forest Landscape Integrity Index (FLII) (1-10)':{source:'Remote Sensing'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Tree canopy cover (%)'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Forest Carbon Stock (MtCO₂e/yr or tCO₂e/yr)'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Landscape Integrity Index (FLII) (1-10)'] }
    ]},
    { id:'fo-man-4', name:'Invasive species control & native restoration', pw:'MANAGE', type:'Recommended', checked:false, method:'Spatial Modelling', freq:'Annually', indMeta:{ 'Threat Abatement STAR (START) (Score)':{source:'Spatial Modelling'}, 'Forest Carbon Stock (MtCO₂e/yr or tCO₂e/yr)':{source:'Remote sensing/field measurement'}, 'Tree canopy cover (%)':{source:'Remote sensing'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Threat Abatement STAR (START) (Score)'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Forest Carbon Stock (MtCO₂e/yr or tCO₂e/yr)'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Tree canopy cover (%)'] }
    ]},
    { id:'fo-man-5', name:'Agricultural burning regulation & no-burn alternatives', pw:'MANAGE', type:'Recommended', checked:false, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Burning Ban Compliance'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades (count)'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Forest Carbon Stock'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Disaster vulnerability index'] }
    ]},
    { id:'fo-man-6', name:'Agroforestry / silvopasture / paludiculture transition', pw:'MANAGE', type:'Recommended', checked:false, method:'Field Survey/Project Report', freq:'Annually', indMeta:{ 'Direct economic activity: Number of new jobs created (Number)':{source:'Field Survey/Project Report'}, 'Land surface temperature (°C)':{source:'Remote Sensing'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness Index', 'Forest Connectivity Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (planting employment)', inds:['Direct economic activity: Number of new jobs created (Number)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Crop/NTFP yield', 'Tree canopy cover (%)', 'Tree canopy cover'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Social Forestry Beneficiaries'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Disaster vulnerability index', 'Area exposed to flood/drought/landslide hazard (Ha)'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Land surface temperature (°C)', 'Land surface temperature'] }
    ]},
    { id:'fo-man-7', name:'Riparian buffer & watershed protection within productive landscape', pw:'MANAGE', type:'Recommended', checked:false, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water yield/Sediment retention'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/NTFP yield'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage (riparian)', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Disaster vulnerability index'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Land surface temperature'] }
    ]},
    { id:'fo-man-8', name:'Climate-smart agriculture (CSA) practices', pw:'MANAGE', type:'Recommended', checked:false, method:'Field Survey/Project Report', freq:'Annually', indMeta:{ 'Direct economic activity: Number of new jobs created (Number)':{source:'Field Survey/Project Report'}, 'Soil organic carbon (tC/ha)':{source:'Field Measurement'} }, benefits:[
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Direct economic activity: Number of new jobs created (Number)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage (soil); Enhanced resilience to climate hazards', inds:['Soil organic carbon (tC/ha)'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/NTFP Yield'] }
    ]},
    { id:'fo-man-9', name:'Sustainable intensification with soil carbon enhancement', pw:'MANAGE', type:'Recommended', checked:false, method:'Field Measurement', freq:'Annually', indMeta:{ 'Soil carbon content (ton/ha)':{source:'Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Improved forest productivity and regeneration (soil health)', inds:['Soil carbon content (ton/ha)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Household income'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage (soil carbon)', inds:['Soil carbon content'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Forest Connectivity Index'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop yield'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Disaster vulnerability index'] }
    ]},
    { id:'fo-man-10', name:'Payment for Ecosystem Services (PES)', pw:'MANAGE', type:'Recommended', checked:false, method:'Remote Sensing/Field Measurement', freq:'Annually', indMeta:{ 'Net surface water availability; Quantitative status of groundwater; Water Exploitation Index (m3/year; Good or Poor; %)':{source:'Remote Sensing/Field Measurement'}, 'Avoided greenhouse gas emissions from deforestation and degradation; Forest habitat fragmentation - effective mesh density (t CO₂e/y; 1/ha)':{source:'Remote Sensing/Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Net surface water availability; Quantitative status of groundwater; Water Exploitation Index (m3/year; Good or Poor; %)'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation (incentive prevents conversion)', inds:['Avoided greenhouse gas emissions from deforestation and degradation; Forest habitat fragmentation - effective mesh density (t CO₂e/y; 1/ha)'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['MRV Institutional Capacity'] }
    ]},
    { id:'fo-man-11', name:'Pre-restoration ecological assessment for stable non-forest/barren sites', pw:'MANAGE', type:'Recommended', checked:false, method:'Project Report', freq:'Annually', indMeta:{ 'Ecosystem services provision e.g., Soil water holding capacity; Plant-available water; Soil Available Water (SAW) for plant uptake (Descriptive)':{source:'Project Report'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions (informed planning)', inds:['Ecosystem services provision e.g., Soil water holding capacity; Plant-available water; Soil Available Water (SAW) for plant uptake (Descriptive)'] }
    ]},
    { id:'fo-res-1', name:'Enrichment planting with native species (low-medium density)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field Survey/Project Report', freq:'Annually', indMeta:{ 'Direct economic activity: Number of new jobs created (Number)':{source:'Field Survey/Project Report'}, 'Forest Carbon Stock (MtCO₂e/yr or tCO₂e/yr)':{source:'Remote sensing/field measurement'}, 'Tree canopy cover (%)':{source:'Remote sensing'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness Index (index)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (nursery employment)', inds:['Direct economic activity: Number of new jobs created (Number)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock (MtCO₂e/yr or tCO₂e/yr)'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Tree canopy cover (%)'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Landscape Integrity Index (Index)'] }
    ]},
    { id:'fo-res-2', name:'Full reforestation (high-density native species planting)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field Survey/Project Report', freq:'Annually', indMeta:{ 'Direct economic activity: Number of new jobs created (Number)':{source:'Field Survey/Project Report'}, 'Carbon removed/stored in vegetation and soil (tCO₂e/ha/year)':{source:'Field Survey/Project Report'}, 'Crop/NTFP Yield (kg/year)':{source:'Household survey'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness Index (index)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (planting employment)', inds:['Direct economic activity: Number of new jobs created (Number)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Carbon removed/stored in vegetation and soil (tCO₂e/ha/year)'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Tree canopy cover (%)'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Crop/NTFP Yield (kg/year)'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Landscape integrity index (index)'] }
    ]},
    { id:'fo-res-3', name:'Full reforestation of reclaimable/abandoned converted sites', pw:'RESTORE', type:'Recommended', checked:false, method:'Field Survey/Project Report', freq:'Annually', indMeta:{ 'Direct economic activity: Number of new jobs created (Number)':{source:'Field Survey/Project Report'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (planting employment)', inds:['Direct economic activity: Number of new jobs created (Number)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Tree canopy cover'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Water yield'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Land surface temperature'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] }
    ]},
    { id:'fo-res-5', name:'Pioneer species establishment (first-stage canopy)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field measurement', freq:'Annually', indMeta:{ 'Seedling survival rate (%)':{source:'Field measurement'} }, benefits:[
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Tree planted/survivability rate (count/%)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (nursery + planting employment)', inds:['Benefit Sharing Mechanism'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Seedling survival rate (%)'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Land surface temperature'] }
    ]},
    { id:'fo-res-6', name:'Native species succession planting (mid-late stage)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field measurement', freq:'Annually', indMeta:{ 'Species richness & diversity indices; Abundance of indicator species (Count)':{source:'Field measurement'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species richness & diversity indices; Abundance of indicator species (Count)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (NTFP species inclusion)', inds:['Crop/NTFP Yield'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Tree canopy cover'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Forest Connectivity Index'] }
    ]},
    { id:'fo-res-7', name:'Hydrology / water management for barren restoration', pw:'RESTORE', type:'Recommended', checked:false, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Sediment Accretion Rate'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Water yield'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage (peat carbon especially)', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Tree canopy cover'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Disaster vulnerability index'] }
    ]},
  ]},
  { id:'mangrove', name:'Mangrove', pwLabel:'Protect / Manage / Restore', pwClass:'teal', colorCls:'mangrove', activities:[
    { id:'ma-pro-1', name:'Boundary demarcation & legal recognition', pw:'PROTECT', type:'Recommended', checked:true, method:'Remote Sensing/Field Measurement', freq:'Annually', indMeta:{ 'MAN-02 Mangrove Carbon Stock (tCO₂e)':{source:'Remote Sensing/Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['MAN-01 Mangrove Extent', 'MAN-02 Mangrove Carbon Stock', 'MAN-04 Mangrove Species Diversity'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['GOV-03 Indigenous Land Tenure', 'GOV-07 Safeguard Information System'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['MAN-02 Mangrove Carbon Stock (tCO₂e)'] }
    ]},
    { id:'ma-pro-2', name:'Community-based patrol & monitoring', pw:'PROTECT', type:'Recommended', checked:true, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['MAN-01 Mangrove Extent', 'MAN-10 Protected Mangrove Area'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['MAN-06 Mangrove Community Beneficiaries'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['MAN-02 Mangrove Carbon Stock'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['GOV-04 MRV Institutional Capacity'] }
    ]},
    { id:'ma-pro-3', name:'Customary/indigenous rights recognition & FPIC process', pw:'PROTECT', type:'Recommended', checked:false, method:'Field Survey/Secondary Data (Government Data)', freq:'Annually', indMeta:{ 'Sites of community importance and special protection areas (Ha)':{source:'Field Survey/Secondary Data (Government Data)'} }, benefits:[
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Mangrove Extent', 'Mangrove Carbon Stock', 'Mangrove Restoration Area', 'Mangrove Species Diversity'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure', 'Safeguard Information System'] },
        { cat:'People', benefit:'Cultural heritage preservation', inds:['Sites of community importance and special protection areas (Ha)'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['MRV Institutional Capacity'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism'] }
    ]},
    { id:'ma-pro-4', name:'Buffer zone establishment & compatible land use', pw:'PROTECT', type:'Recommended', checked:false, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['MAN-01 Mangrove Extent', 'MAN-02 Mangrove Carbon Stock', 'MAN-04 Mangrove Species Diversity'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['MAN-06 Mangrove Community Beneficiaries', 'MAN-07 Fisheries Dependency Value'] },
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['MAN-03 Mangrove Loss Rate'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['GOV-02 Benefit Sharing Mechanism', 'GOV-07 Safeguard Information System', 'GOV-11 Grievance Redress Mechanism'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Mangrove Extent'] }
    ]},
    { id:'ma-pro-5', name:'Biodiversity baseline & adaptive monitoring system', pw:'PROTECT', type:'Recommended', checked:false, method:'Field Measurement', freq:'Annually', indMeta:{ 'Mangrove Species Diversity (count)':{source:'Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Mangrove Species Diversity (count)'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['MRV Institutional Capacity'] }
    ]},
    { id:'ma-man-1', name:'Assisted Natural Regeneration (ANR)', pw:'MANAGE', type:'Recommended', checked:true, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Mangrove Species Diversity'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Mangrove Community Beneficiaries', 'Fisheries Dependency Value'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Mangrove Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Mangrove Restoration Area'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Mangrove Extent', 'Protected Mangrove Area'] }
    ]},
    { id:'ma-man-2', name:'Riparian buffer & watershed protection within productive landscape', pw:'MANAGE', type:'Recommended', checked:false, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'People', benefit:'Enhanced food and water security', inds:['Mangrove Community Beneficiaries'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage (riparian)', inds:['Mangrove Carbon Stock'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Mangrove Extent'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Sediment Accretion Rate'] }
    ]},
    { id:'ma-man-3', name:'Sustainable intensification with soil carbon enhancement', pw:'MANAGE', type:'Recommended', checked:false, method:'Field Measurement', freq:'Annually', indMeta:{ 'Soil carbon content (ton/ha)':{source:'Field Measurement'}, 'Mangrove Species Diversity (ton/ha)':{source:'Field Measurement'}, 'Total carbon removed or stored in vegetation and soil per unit area per unit time (metric tonnes/ha/year)':{source:'Remote Sensing/Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Improved forest productivity and regeneration (soil health)', inds:['Soil carbon content (ton/ha)', 'Mangrove Species Diversity (ton/ha)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Fisheries Dependency Value', 'Mangrove Community Beneficiaries'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage (soil carbon)', inds:['Total carbon removed or stored in vegetation and soil per unit area per unit time (metric tonnes/ha/year)'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Mangrove Species Diversity'] }
    ]},
    { id:'ma-man-4', name:'Payment for Ecosystem Services (PES)', pw:'MANAGE', type:'Recommended', checked:false, method:'Remote Sensing/Field Measurement', freq:'Annually', indMeta:{ 'Net surface water availability; Quantitative status of groundwater; Water Exploitation Index (m3/year; Good or Poor; %)':{source:'Remote Sensing/Field Measurement'}, 'Avoided greenhouse gas emissions from deforestation and degradation; Forest habitat fragmentation - effective mesh density (t CO₂e/y; 1/ha)':{source:'Remote Sensing/Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Net surface water availability; Quantitative status of groundwater; Water Exploitation Index (m3/year; Good or Poor; %)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Mangrove Community Beneficiaries', 'Fisheries Dependency Value'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation (incentive prevents conversion)', inds:['Avoided greenhouse gas emissions from deforestation and degradation; Forest habitat fragmentation - effective mesh density (t CO₂e/y; 1/ha)', 'MAN-02 Mangrove Carbon Stock'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['GOV-02 Benefit Sharing Mechanism', 'GOV-07 Safeguard Information System'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['GOV-11 Grievance Redress Mechanism'] }
    ]},
    { id:'ma-man-5', name:'Pre-restoration ecological assessment for stable non-forest/barren sites', pw:'MANAGE', type:'Recommended', checked:false, method:'Project Report', freq:'Annually', indMeta:{ 'Ecosystem services provision e.g., Soil water holding capacity; Plant-available water; Soil Available Water (SAW) for plant uptake (Descriptive)':{source:'Project Report'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions (informed planning)', inds:['Ecosystem services provision e.g., Soil water holding capacity; Plant-available water; Soil Available Water (SAW) for plant uptake (Descriptive)'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity (stakeholder consultation as part of assessment)', inds:['MRV Institutional Capacity', 'Multi-Stakeholder Platform'] }
    ]},
    { id:'ma-res-1', name:'Enrichment planting with native species (low-medium density)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field Survey/Project Report', freq:'Annually', indMeta:{ 'Direct economic activity: Number of new jobs created (Number)':{source:'Field Survey/Project Report'} }, benefits:[
        { cat:'People', benefit:'Sustainable livelihood opportunities (nursery employment)', inds:['Direct economic activity: Number of new jobs created (Number)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Mangrove Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Mangrove Species Diversity'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Mangrove Extent'] }
    ]},
    { id:'ma-res-2', name:'Full reforestation (high-density native species planting)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field Survey/Project Report', freq:'Annually', indMeta:{ 'Direct economic activity: Number of new jobs created (Number)':{source:'Field Survey/Project Report'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Mangrove Species Diversity', 'Mangrove Restoration Area'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (planting employment)', inds:['Direct economic activity: Number of new jobs created (Number)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Mangrove Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Mangrove Extent'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Mangrove Community Beneficiaries'] }
    ]},
    { id:'ma-res-3', name:'Full reforestation of reclaimable/abandoned converted sites', pw:'RESTORE', type:'Recommended', checked:false, method:'Field Survey/Project Report', freq:'Annually', indMeta:{ 'Direct economic activity: Number of new jobs created (Number)':{source:'Field Survey/Project Report'} }, benefits:[
        { cat:'People', benefit:'Sustainable livelihood opportunities (planting employment)', inds:['Direct economic activity: Number of new jobs created (Number)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Mangrove Extent', 'Mangrove Species Diversity'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Mangrove Community Beneficiaries'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Mangrove Restoration Area', 'Aquaculture Conversion pressure'] }
    ]},
    { id:'ma-res-4', name:'Riparian zone restoration planting (active)', pw:'RESTORE', type:'Recommended', checked:false, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Mangrove Restoration Area'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Mangrove Community Beneficiaries'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Mangrove Carbon Stock'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Peatland Extent'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Mangrove Species Diversity'] }
    ]},
    { id:'ma-res-5', name:'Pioneer species establishment (first-stage canopy)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field measurement', freq:'Annually', indMeta:{ 'Seedling survival rate (%)':{source:'Field measurement'} }, benefits:[
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Mangrove Species Diversity', 'Mangrove Restoration Area'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (nursery + planting employment)', inds:['Mangrove Community Beneficiaries'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Mangrove Carbon Stock'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Seedling survival rate (%)'] }
    ]},
    { id:'ma-res-6', name:'Native species succession planting (mid-late stage)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field measurement', freq:'Annually', indMeta:{ 'Species richness & diversity indices; Abundance of indicator species (Count)':{source:'Field measurement'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species richness & diversity indices; Abundance of indicator species (Count)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (NTFP species inclusion)', inds:['Mangrove Community Beneficiaries', 'Fisheries Dependency Value'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Mangrove Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Mangrove Species Diversity', 'Mangrove Restoration Area'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Mangrove Extent'] }
    ]},
    { id:'ma-res-7', name:'Forest landscape restoration on stable non-forest sites (full reforestation)', pw:'RESTORE', type:'Recommended', checked:false, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Mangrove Species Diversity', 'Mangrove Restoration Area'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (planting employment)', inds:['Mangrove Community Beneficiaries'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Mangrove Carbon Stock'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Mangrove Extent'] }
    ]},
  ]},
  { id:'peatland', name:'Peatland', pwLabel:'Protect / Manage / Restore', pwClass:'olive', colorCls:'peatland', activities:[
    { id:'pe-pro-1', name:'Boundary demarcation & legal recognition', pw:'PROTECT', type:'Recommended', checked:true, method:'Field Measurement', freq:'Annually', indMeta:{ 'Water Table Depth (cm)':{source:'Field Measurement'}, 'Peatland Carbon Emission (MtCO₂e/yr or tCO₂e/yr)':{source:'Remote Sensing/Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Water Table Depth (cm)'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Area with recognized tenure / social-forestry permit (ha)'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Peatland Carbon Emission (MtCO₂e/yr or tCO₂e/yr)'] }
    ]},
    { id:'pe-pro-2', name:'Community-based patrol & monitoring', pw:'PROTECT', type:'Recommended', checked:true, method:'Remote Sensing/Field Measurement', freq:'Annually', indMeta:{ 'Peat fire hotspots (count/year)':{source:'Remote Sensing/Field Measurement'}, 'Water Table Depth (cm)':{source:'Field Measurement'}, 'Peatland Carbon Emission (MtCO₂e/yr or tCO₂e/yr)':{source:'Field Measurement'}, 'Peat subsidence (cm/year)':{source:'Field Measurement'}, 'Fire Prevention Brigades (MPA or brigades)':{source:'Field Survey/Secondary Data (Government Data)'} }, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Peat fire hotspots (count/year)', 'Water Table Depth (cm)'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Peatland Carbon Emission (MtCO₂e/yr or tCO₂e/yr)'] },
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Peat subsidence (cm/year)'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Fire Prevention Brigades (MPA or brigades)'] }
    ]},
    { id:'pe-pro-3', name:'Customary/indigenous rights recognition & FPIC process', pw:'PROTECT', type:'Recommended', checked:false, method:'Field Measurement', freq:'Annually', indMeta:{ 'Peatland Carbon Emission (MtCO₂e/yr or tCO₂e/yr)':{source:'Field Measurement'}, 'GHG Flux Measurement Sites (Sites)':{source:'Field Measurement/Secondary/Government Data'}, 'Sites of community importance and special protection areas (Ha)':{source:'Field Survey/Secondary Data (Government Data)'} }, benefits:[
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Water Table Depth (cm)'] },
        { cat:'People', benefit:'Secure land and resource tenure', inds:['Indigenous Land Tenure'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Peatland Carbon Emission (MtCO₂e/yr or tCO₂e/yr)', 'GHG Flux Measurement Sites (Sites)'] },
        { cat:'People', benefit:'Cultural heritage preservation', inds:['Sites of community importance and special protection areas (Ha)'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['MRV Institutional Capacity'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism'] }
    ]},
    { id:'pe-pro-4', name:'Fire prevention infrastructure & early warning', pw:'PROTECT', type:'Recommended', checked:false, method:'Remote Sensing/Field Measurement', freq:'Annually', indMeta:{ 'Peat fire hotspots (count/year or count)':{source:'Remote Sensing/Field Measurement'}, 'Peatland Carbon Emission (MtCO₂e/yr or tCO₂e/yr)':{source:'Field Measurement'}, 'GHG Flux Measurement Sites (Sites)':{source:'Field Measurement/Secondary/Government Data'} }, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Peat fire hotspots (count/year or count)'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Peatland Carbon Emission (MtCO₂e/yr or tCO₂e/yr)', 'GHG Flux Measurement Sites (Sites)'] }
    ]},
    { id:'pe-pro-5', name:'Buffer zone establishment & compatible land use', pw:'PROTECT', type:'Recommended', checked:false, method:'Field measurement', freq:'Annually', indMeta:{ 'Water table depth (cm)':{source:'Field measurement'}, 'Peatland Carbon Emission (MtCO₂e/yr or tCO₂e/yr)':{source:'Field Measurement'}, 'GHG Flux Measurement Sites (Sites)':{source:'Field Measurement/Secondary/Government Data'}, 'Peat fire hotspots (count/year or count)':{source:'Remote Sensing/Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Water table depth (cm)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Peatland Carbon Emission (MtCO₂e/yr or tCO₂e/yr)', 'GHG Flux Measurement Sites (Sites)'] },
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Peat fire hotspots (count/year or count)'] }
    ]},
    { id:'pe-pro-6', name:'Biodiversity baseline & adaptive monitoring system', pw:'PROTECT', type:'Recommended', checked:false, method:'Field Measurement', freq:'Annually', indMeta:{ 'Species richness index (count)':{source:'Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species richness index (count)'] }
    ]},
    { id:'pe-man-1', name:'Community-based fire management (degraded areas)', pw:'MANAGE', type:'Recommended', checked:true, method:'Remote Sensing/Field Measurement', freq:'Annually', indMeta:{ 'Peat Fire Hotspots (count/year)':{source:'Remote Sensing/Field Measurement'}, 'Fire Prevention Brigades (MPA units; brigades; units)':{source:'Field Survey/Secondary Data (Government Data)'}, 'Burning Ban Compliance (Violations/year; State level; haze policy; compliance (%))':{source:'Field Survey/Secondary Data (Government Data)'}, 'Water Table Depth Monitoring (cm)':{source:'Field measurement'}, 'Peatland Carbon Emissions (MtCO₂e/yr or tCO₂e/yr)':{source:'Field Measurement'}, 'Peat Subsidence Rate (cm/year)':{source:'Field measurement'} }, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Peat Fire Hotspots (count/year)', 'Fire Prevention Brigades (MPA units; brigades; units)', 'Burning Ban Compliance (Violations/year; State level; haze policy; compliance (%))'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Water Table Depth Monitoring (cm)'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Peatland Carbon Emissions (MtCO₂e/yr or tCO₂e/yr)'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Multi-Stakeholder Platform', 'Grievance Redress Mechanism'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Peat Subsidence Rate (cm/year)'] }
    ]},
    { id:'pe-man-2', name:'Assisted Natural Regeneration (ANR)', pw:'MANAGE', type:'Recommended', checked:false, method:'Field measurement', freq:'Annually', indMeta:{ 'Species Richness Index (count)':{source:'Field measurement'}, 'Peatland Carbon Emissions (MtCO₂e/yr or tCO₂e/yr)':{source:'Field Measurement'}, 'Water Table Depth Monitoring (cm)':{source:'Field measurement'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness Index (count)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Social Forestry Beneficiaries'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Peatland Carbon Emissions (MtCO₂e/yr or tCO₂e/yr)'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Water Table Depth Monitoring (cm)'] }
    ]},
    { id:'pe-man-3', name:'Agricultural burning regulation & no-burn alternatives', pw:'MANAGE', type:'Recommended', checked:false, method:'Remote Sensing/Field Measurement', freq:'Annually', indMeta:{ 'Peat Fire Hotspots (count/year or count)':{source:'Remote Sensing/Field Measurement'}, 'Peatland Carbon Emissions (MtCO₂e/yr or tCO₂e/yr)':{source:'Field Measurement'}, 'Peat Subsidence Rate (cm/year)':{source:'Field measurement'} }, benefits:[
        { cat:'Nature', benefit:'Reduced vulnerability to fire, pests, and diseases', inds:['Peat Fire Hotspots (count/year or count)'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['Burning Ban Compliance'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation', inds:['Peatland Carbon Emissions (MtCO₂e/yr or tCO₂e/yr)'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Peat Subsidence Rate (cm/year)'] }
    ]},
    { id:'pe-man-4', name:'Riparian buffer & watershed protection within productive landscape', pw:'MANAGE', type:'Recommended', checked:false, method:'Field survey/Government data', freq:'Annually', indMeta:{ 'Peatland Extent (Mha)':{source:'Field survey/Government data'}, 'Drained peatland Area (Mha)':{source:'Field survey/Government data'} }, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Peatland Extent (Mha)', 'Drained peatland Area (Mha)'] }
    ]},
    { id:'pe-man-5', name:'Sustainable intensification with soil carbon enhancement', pw:'MANAGE', type:'Recommended', checked:false, method:'Field Measurement', freq:'Annually', indMeta:{ 'Soil carbon content (ton/ha)':{source:'Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Improved forest productivity and regeneration (soil health)', inds:['Soil carbon content (ton/ha)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Paludiculture Area'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage (soil carbon)', inds:['Peatland Carbon Emissions'] }
    ]},
    { id:'pe-man-6', name:'Payment for Ecosystem Services (PES)', pw:'MANAGE', type:'Recommended', checked:false, method:'Remote Sensing/Field Measurement', freq:'Annually', indMeta:{ 'Net surface water availability; Quantitative status of groundwater; Water Exploitation Index (m3/year; Good or Poor; %)':{source:'Remote Sensing/Field Measurement'}, 'Avoided greenhouse gas emissions from deforestation and degradation; Forest habitat fragmentation - effective mesh density (t CO₂e/y; 1/ha)':{source:'Remote Sensing/Field Measurement'} }, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Net surface water availability; Quantitative status of groundwater; Water Exploitation Index (m3/year; Good or Poor; %)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities', inds:['Paludiculture Area'] },
        { cat:'Climate', benefit:'Reduced emissions from deforestation and degradation (incentive prevents conversion)', inds:['Avoided greenhouse gas emissions from deforestation and degradation; Forest habitat fragmentation - effective mesh density (t CO₂e/y; 1/ha)'] },
        { cat:'People', benefit:'Equitable benefit-sharing mechanisms', inds:['Benefit Sharing Mechanism'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity', inds:['MRV Institutional Capacity'] }
    ]},
    { id:'pe-man-7', name:'Pre-restoration ecological assessment for stable non-forest/barren sites', pw:'MANAGE', type:'Recommended', checked:false, method:'Project Report', freq:'Annually', indMeta:{ 'Ecosystem services provision e.g., Soil water holding capacity; Plant-available water; Soil Available Water (SAW) for plant uptake (Descriptive)':{source:'Project Report'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions (informed planning)', inds:['Ecosystem services provision e.g., Soil water holding capacity; Plant-available water; Soil Available Water (SAW) for plant uptake (Descriptive)'] },
        { cat:'People', benefit:'Strengthened social capital and governance capacity (stakeholder consultation as part of assessment)', inds:['MRV Institutional Capacity'] }
    ]},
    { id:'pe-res-1', name:'Enrichment planting with native species (low-medium density)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field Survey/Project Report', freq:'Annually', indMeta:{ 'Direct economic activity: Number of new jobs created (Number)':{source:'Field Survey/Project Report'}, 'Peatland Extent (Mha)':{source:'Field Survey/Government Data'}, 'Water Table Depth Monitoring (cm)':{source:'Field measurement'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness Index (Index)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (nursery employment)', inds:['Direct economic activity: Number of new jobs created (Number)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Peatland Extent (Mha)', 'Water Table Depth Monitoring (cm)'] }
    ]},
    { id:'pe-res-2', name:'Full reforestation (high-density native species planting)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field Survey/Project Report', freq:'Annually', indMeta:{ 'Direct economic activity: Number of new jobs created (Number)':{source:'Field Survey/Project Report'}, 'Water Table Depth Monitoring (cm)':{source:'Field measurement'}, 'Peatland Extent (Mha)':{source:'Field survey/Government data'} }, benefits:[
        { cat:'People', benefit:'Sustainable livelihood opportunities (planting employment)', inds:['Direct economic activity: Number of new jobs created (Number)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Water Table Depth Monitoring (cm)'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Peatland Extent (Mha)'] }
    ]},
    { id:'pe-res-3', name:'Full reforestation of reclaimable/abandoned converted sites', pw:'RESTORE', type:'Recommended', checked:false, method:'Field Survey/Project Report', freq:'Annually', indMeta:{ 'Direct economic activity: Number of new jobs created (Number)':{source:'Field Survey/Project Report'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (planting employment)', inds:['Direct economic activity: Number of new jobs created (Number)'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock'] }
    ]},
    { id:'pe-res-5', name:'Pioneer species establishment (first-stage canopy)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field measurement', freq:'Annually', indMeta:{ 'Seedling survival rate (%)':{source:'Field measurement'} }, benefits:[
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Peatland Carbon Emissions'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Seedling survival rate (%)'] }
    ]},
    { id:'pe-res-6', name:'Native species succession planting (mid-late stage)', pw:'RESTORE', type:'Recommended', checked:false, method:'Field measurement', freq:'Annually', indMeta:{ 'Species richness & diversity indices; Abundance of indicator species (Count)':{source:'Field measurement'} }, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species richness & diversity indices; Abundance of indicator species (Count)'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (NTFP species inclusion)', inds:['Paludiculture Area'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Peatland Carbon Emissions'] }
    ]},
    { id:'pe-res-7', name:'Hydrology / water management for barren restoration', pw:'RESTORE', type:'Recommended', checked:false, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water Table Depth Monitoring'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Paludiculture Area'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage (peat carbon especially)', inds:['Peatland Carbon Emissions'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Rewetting Infrastructure'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Peat Subsidence Rate'] }
    ]},
    { id:'pe-res-8', name:'Forest landscape restoration on stable non-forest sites (full reforestation)', pw:'RESTORE', type:'Recommended', checked:false, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness Index'] },
        { cat:'People', benefit:'Sustainable livelihood opportunities (planting employment)', inds:['Paludiculture Area'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Peatland Carbon Emissions'] },
        { cat:'Nature', benefit:'Improved forest productivity and regeneration', inds:['Peat Restoration Progress'] },
        { cat:'Nature', benefit:'Maintenance of ecological connectivity', inds:['Water Table Depth Monitoring', 'Peat Subsidence Rate'] },
        { cat:'Climate', benefit:'Microclimate regulation', inds:['Rewetted Peatland Area'] }
    ]},
    { id:'pe-res-9', name:'Wetland forest restoration (peat swamp / mangrove / riparian)', pw:'RESTORE', type:'Recommended', checked:false, method:'Remote Sensing', freq:'Annually', indMeta:{}, benefits:[
        { cat:'Nature', benefit:'Protection of watershed functions', inds:['Water Table Depth Monitoring', 'Peat Restoration Progress'] },
        { cat:'People', benefit:'Enhanced food and water security', inds:['Paludiculture Area'] },
        { cat:'Climate', benefit:'Increased carbon sequestration and storage', inds:['Forest Carbon Stock'] },
        { cat:'Nature', benefit:'Enhanced biodiversity and ecosystem functions', inds:['Species Richness Index'] },
        { cat:'Climate', benefit:'Enhanced resilience to climate hazards', inds:['Peatland Carbon Emissions', 'Peat Subsidence Rate'] }
    ]},
  ]},
];
// Derive flat indicator lists used by Step 3 accordions & the indicator editor.
ecosystems.forEach(e => e.activities.forEach(a => {
  a.indicators = a.benefits.flatMap(b => b.inds);
  a.optional = a.optional || [];
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
      return `<div class="eco-card">${head}
        <div class="eco-empty">
          <div class="eco-empty-ic">${EMPTY_IC}</div>
          <div class="eco-empty-title">No matching activities</div>
          <div class="eco-empty-msg"><strong>${e.name}</strong> has no ${listIntv()} activities. Adjust the Intervention filter above.</div>
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

/* ============================================================================
   docs-index.js — the one list of every documentation article (DEC-30, DEC-31)

   Loaded by help.html and technical-docs.html, before js/docs-shell.js. Both
   pages read their sidebar, their previous/next order and their search index
   from here, and each page's search also searches the other page — which is
   only possible because both lists live in one file.

   To add an article: add a row here AND the article itself (a
   <div data-doc="id"> in help.html, or a docs* function wired into
   docsArticleHtml() in js/technical-docs.js). Ids are stable once published:
   other pages, the home page and old walkthrough links deep-link to them.

   A page may also list `moved: { oldId: 'page.html#newId' }` so old links to
   a retired article forward to its new home.

   Fields: id (the URL hash), group (sidebar heading), label (sidebar and pager
   text — plain words, no internal codes), keywords (extra search terms the
   label does not contain).
   ============================================================================ */

window.DOCS_INDEX = {
  help: {
    title: 'Help',
    url: 'help.html',
    hashPrefix: '',
    defaultId: 'what-is',
    articles: [
      { id: 'what-is',          group: 'Start here', label: 'What the NbS Tool is',             keywords: 'about overview purpose free platform project developer investor frontline organisation pre-feasibility initial assessment triple benefit nature climate people' },
      { id: 'who',              group: 'Start here', label: 'Who is behind the NbS Tool',       keywords: 'scene coalition members partners birdlife conservation international mandai recoftc nature conservancy wcs wwf wri zsl adpc ntu sig funder asean uk green transition fund gtf incubator portfolio criteria iucn standard aims' },
      { id: 'workflow',         group: 'Start here', label: 'How the NbS Tool works',           keywords: 'workflow eight phases steps chain feedback loop calculated reported qualitative derived project stage feasibility' },
      { id: 'getting-around',   group: 'Start here', label: 'Finding your way around',          keywords: 'navigation menu top bar footer profile mobile phone tablet' },
      { id: 'accounts',         group: 'Start here', label: 'Accounts, area limits & privacy',  keywords: 'login sign up register account settings password hectares 200000 500000 limit privacy private coalition public level' },
      { id: 'first-analysis',   group: 'Start here', label: 'Your first analysis',              keywords: 'quickstart getting started tutorial begin first time' },
      { id: 'boundary-file',    group: 'Start here', label: 'Preparing a boundary file',        keywords: 'shapefile shp shx dbf prj zip kml kmz gis upload format coordinate system' },

      { id: 'phase-0',          group: 'Run an analysis', label: 'Phase 0 · Explore the map',       keywords: 'interactive map layers legend search district province zoom location export geopdf tabular gis shapefile download' },
      { id: 'phase-1',          group: 'Run an analysis', label: 'Phase 1 · Select location',       keywords: 'draw polygon upload boundary shapefile confirm area hectares limit too big' },
      { id: 'phase-2',          group: 'Run an analysis', label: 'Phase 2 · Site characterisation', keywords: 'baseline general nature people climate ecosystem land cover deforestation population carbon information button data source provenance resolution' },
      { id: 'phase-3',          group: 'Run an analysis', label: 'Phase 3 · Threat profile',        keywords: 'threat disturbance disturbed drivers pressure dryland forest mangrove peatland map' },
      { id: 'phase-4',          group: 'Run an analysis', label: 'Phase 4 · Pathway selection',     keywords: 'pathway protect manage restore eligible activities duration carbon project leakage uncertainty buffer activity matrix' },
      { id: 'phase-5',          group: 'Run an analysis', label: 'Phase 5 · Potential benefit',     keywords: 'benefit nature climate people emissions sequestration net carbon connectivity watershed livelihood tenure' },
      { id: 'phase-6',          group: 'Run an analysis', label: 'Phase 6 · Monitoring planning',   keywords: 'monitoring plan indicators methods frequency schedule activities' },
      { id: 'phase-7',          group: 'Run an analysis', label: 'Phase 7 · Generate documents',    keywords: 'document generator template general project documentation carbon project verra gold standard plan vivo pdf word download' },

      { id: 'projects',         group: 'After the analysis', label: 'Manage your projects',     keywords: 'my project dashboard save collaborators invite privacy history import existing project upload' },
      { id: 'record',           group: 'After the analysis', label: 'Record and verify',        keywords: 'field monitoring form mrv dashboard verification evidence photo progress target supplementary data upload community map' },

      { id: 'results-contexts', group: 'Reading your results', label: 'What each analysis shows',       keywords: 'outputs general nature climate people threat benefit list' },
      { id: 'results-sources',  group: 'Reading your results', label: 'Where the numbers come from',    keywords: 'data source dataset publisher provenance information button' },
      { id: 'results-limits',   group: 'Reading your results', label: 'What the tool does not do',      keywords: 'limitations limits field data community engagement consent fpic carbon accounting resolution verification' },
      { id: 'results-carbon',   group: 'Reading your results', label: 'Carbon finance & standards',     keywords: 'carbon credits verra vcs ccb gold standard plan vivo equitable earth project design document pdd validation consent' },
      { id: 'results-cite',     group: 'Reading your results', label: 'How to cite',                    keywords: 'citation reference attribution' },

      { id: 'whats-new',        group: 'News & support', label: "What's new in v3.0",          keywords: 'release version update launch december 2026 new features' },
      { id: 'faq',              group: 'News & support', label: 'Frequently asked questions',  keywords: 'faq questions free account countries language phone tablet previous version data migration' },
      { id: 'support',          group: 'News & support', label: 'Contact & feedback',          keywords: 'contact support email bug report feedback help team privacy terms' }
    ]
  },

  methodology: {
    title: 'Methodology',
    url: 'technical-docs.html',
    hashPrefix: 'docs/',
    defaultId: 'scope',
    /* Articles that moved to Help (DEC-31). Old links forward instead of breaking. */
    moved: { introduction: 'help.html#who', 'how-it-works': 'help.html#workflow' },
    articles: [
      { id: 'scope',           group: 'Scope',                  label: 'Region, ecosystems & pathways',   keywords: 'scope region countries southeast asia eleven ecosystem dryland forest mangrove peatland savanna guardrail time frame 2014 2024 pathway protect manage restore cook-patton asean mrv framework' },
      { id: 'landcover',       group: 'Scope',                  label: 'Land cover classes',              keywords: 'land cover classes rlcms servir alphaearth twenty classes aquaculture barren cropland plantation deciduous evergreen flooded forest grass mangrove mixed oil palm rice rubber shrub settlement water wetlands snow other land' },
      { id: 'conventions',     group: 'Scope',                  label: 'Analysis conventions',            keywords: 'conventions projection equal area esri 54034 54043 reprojection mixed site area weighted distribution screening instrument uncertainty' },
      { id: 'phase1',          group: 'Analysis phases 1 to 5', label: 'Phase 1 · Select location',       keywords: 'phase 1 select location aoi area of interest boundary polygon upload identifier minimum area cell resolution duration' },
      { id: 'phase2',          group: 'Analysis phases 1 to 5', label: 'Phase 2 · Site characterisation', keywords: 'phase 2 site characterisation general context nature climate people groups layers puyravaud deforestation rate reference layer area of habitat root to shoot soil organic carbon' },
      { id: 'phase3',          group: 'Analysis phases 1 to 5', label: 'Phase 3 · Threat profile',        keywords: 'phase 3 threat profile disturbance drivers canopy height deficit peatland drainage canal astiani wedeux natural hazard risk flood landslide typhoon drought fire' },
      { id: 'phase4-state',    group: 'Analysis phases 1 to 5', label: 'Phase 4 · Ecological state & trajectory', keywords: 'phase 4 ecological state c1 c2 c3 c4 c5 c6 trajectory ten categories reference ecosystem potential natural vegetation forest savanna peat mangrove transition matrix' },
      { id: 'phase4-matrix',   group: 'Analysis phases 1 to 5', label: 'Phase 4 · Decision matrix',       keywords: 'decision matrix seventeen rows cat 1 cat 10 3a 3b 4a 4b 8a 8b 8c 9a 9b 9c 9d pathway assignment protect manage restore carbon ineligible' },
      { id: 'phase4-pathways', group: 'Analysis phases 1 to 5', label: 'Phase 4 · Protect, Manage, Restore, Ineligible', keywords: 'protect manage restore ineligible eligibility avoided deforestation silvofishery paludiculture arr additionality plantation settlement savanna guardrail' },
      { id: 'phase5',          group: 'Analysis phases 1 to 5', label: 'Phase 5 · Potential benefit',     keywords: 'phase 5 potential benefit summary shared projection puyravaud exponential ranked allocation risk pillar general unique quantified qualitative' },
      { id: 'benefit-nature',  group: 'Benefit detail',         label: 'Nature benefits',                 keywords: 'nature connectivity mspa guidostoolbox watershed biodiversity habitat loss avoided iucn star threatened species condition uplift sd vista' },
      { id: 'benefit-people',  group: 'Benefit detail',         label: 'People benefits',                 keywords: 'people qualitative tenure food water security livelihood social capital governance benefit sharing cultural heritage watershed erosion' },
      { id: 'benefit-climate', group: 'Benefit detail',         label: 'Climate benefits & carbon',       keywords: 'climate carbon constants carbon fraction 0.47 root shoot 0.28 co2 44 12 avoided emissions redd sequestration arr stocking factor leakage uncertainty buffer net err microclimate hazard resilience' },
      { id: 'annex-general',   group: 'Data layers',            label: 'General context layers',          keywords: 'annex general context gadm administrative protected area wdpa land cover 2024 forest cover deforestation risk forestatrisk elevation srtm slope ecosystem type natural disaster risk adpc' },
      { id: 'annex-nature',    group: 'Data layers',            label: 'Nature layers',                   keywords: 'annex nature flii forest landscape integrity area of habitat aoh gbif key species key biodiversity area kba conservation significance naturemap ecological connectivity mspa endangered tree species' },
      { id: 'annex-climate',   group: 'Data layers',            label: 'Climate layers',                  keywords: 'annex climate above ground biomass gedi below ground biomass soil organic carbon soilgrids worldclim temperature precipitation burned area gabam fire susceptibility soil groups wrb' },
      { id: 'annex-people',    group: 'Data layers',            label: 'People layers',                   keywords: 'annex people worldpop gridded population age sex structure dependency ratio climate vulnerability adpc national socio-economic indicators bps dosm psa nso gso' },
      { id: 'annex-threat',    group: 'Data layers',            label: 'Threat profile layers',           keywords: 'annex threat ecosystem disturbance screening canopy height deficit drivers slagter fire viirs peatland drainage canal dadap astiani wedeux water table' },
      { id: 'annex-pathway',   group: 'Data layers',            label: 'Pathway layers',                  keywords: 'annex pathway forest cover trajectory transition category nbs pathway raster three bands band 1 band 2 band 3 reference ecosystem decision row cook-patton asean mrv' },
      { id: 'limits',          group: 'Checks & limits',        label: 'Limitations & how to read a figure', keywords: 'limitations uncertainty caveats disclaimer validation field verification screening not certified sample data error propagation resolution vintage' },
      { id: 'reference',       group: 'Reference',              label: 'Parameters, formulas & glossary', keywords: 'reference parameters constants formulas worked example arithmetic lookup table glossary aoi mrv tco2e net err about this documentation source document status' }
    ]
  }
};

// Components.d.ts — the complete catalog of the 2 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.IconLandCover) and usable directly in JSX.
import * as React from 'react';

// figma layer: "Icon: Land Cover " (node 2:4928)
export interface IconLandCoverProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "aquaculture" | "barren" | "crop plantation" | "cropland" | "deciduous" | "evergreen" | "flooded forests" | "forest plantation" | "grass" | "mangrove" | "mixed forest" | "oil palm" | "other land" | "rice" | "rubber" | "settlement" | "shrub" | "snow and ice" | "water" | "wetlands";
}

// figma layer: "Icon: Natural Disaster" (node 2:5242)
export interface IconNaturalDisasterProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "drought" | "flood" | "landslide" | "tropical typhoon";
  opsi2?: boolean;
  image?: boolean;
}

declare const IconLandCover: React.FC<IconLandCoverProps>;
declare const IconNaturalDisaster: React.FC<IconNaturalDisasterProps>;
declare global {
  interface Window {
    IconLandCover: React.FC<IconLandCoverProps>;
    IconNaturalDisaster: React.FC<IconNaturalDisasterProps>;
  }
}

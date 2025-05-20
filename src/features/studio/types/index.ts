import { Hint } from "htmlhint/types";

export type LayoutMode = "split" | "editor" | "preview"


export const skeletonColors = [
    "slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber",
    "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue",
    "indigo", "violet", "purple", "fuchsia", "pink", "rose",
] as const;

export const skeletonIntensities = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

export const skeletonBorderRadiusSizes = [
    "rounded-none", "rounded-sm", "rounded-md", "rounded-lg", "rounded-full"
] as const;

export type SkeletonColor = typeof skeletonColors[number];
export type SkeletonIntensity = typeof skeletonIntensities[number];
export type SkeletonBorderRadiusSize = typeof skeletonBorderRadiusSizes[number];

export type SkeletonConfig = {
  color: SkeletonColor;
  intensity: SkeletonIntensity;
  defaultBorderRadius: SkeletonBorderRadiusSize;
};






export const uiCodeConfigFormats = ["html"] as const;
export const uiCodeConfigStylings = ["tailwind"] as const;
export const skeletonCodeConfigFormats = ["html", "jsx"] as const;
export const skeletonCodeConfigStylings = ["tailwind"] as const;


export type UiCodeConfigFormats = typeof uiCodeConfigFormats[number]; 
export type UiCodeConfigStylings = typeof uiCodeConfigStylings[number];
export type SkeletonCodeConfigFormats = typeof skeletonCodeConfigFormats[number]; 
export type SkeletonCodeConfigStylings = typeof skeletonCodeConfigStylings[number];


export type CodeFileTabConfig = {
    format: SkeletonCodeConfigFormats;
    styling: SkeletonCodeConfigStylings; 
    errors: EditorError[];
};

export interface EditorError extends Hint {
}

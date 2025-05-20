import { Hint } from "htmlhint/types";

export type LayoutMode = "split" | "editor" | "preview"

export type SkeletonConfig = {
  color: string;
  intensity: number;
  defaultBorderRadius: string;
};



export type CodeFileTabConfig = {
    format : string;
    styling: string; 
    errors: Hint[];
};
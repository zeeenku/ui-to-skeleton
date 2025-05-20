import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CodeFileTabConfig, SkeletonConfig } from "../types";
import { DEFAULT_HTML_CODE, DEFAULT_SKELETON_CONFIG, DEFAULT_SKELETON_STYLE, DEFAULT_UI_CONFIG } from "../constants";


type SkeletonStore = {
  skeletonConfig: SkeletonConfig;
  uiCodeConfig: CodeFileTabConfig;
  skeletonCodeConfig: CodeFileTabConfig;

  uiCode: string;
  skeletonCode: string;

  skeletonGenerated: boolean;
  skeletonModified: boolean;
  copied: boolean;
  isValid: boolean;

  setUiCode: (code: string) => void;
  setSkeletonCode: (code: string) => void;

  setUiCodeConfig: (config: Partial<CodeFileTabConfig>) => void;
  setSkeletonCodeConfig: (config: Partial<CodeFileTabConfig>) => void;
  setSkeletonConfig: (config: Partial<SkeletonConfig>) => void;

  generateSkeleton: () => void;
  copySkeletonCode: () => void;

  setSkeletonGenerated: (v: boolean) => void;
  setSkeletonModified: (v: boolean) => void;
  setCopied: (v: boolean) => void;
  setIsValid: (v: boolean) => void;
};

export const useSkeletonStore = create<SkeletonStore>()(
  persist(
    (set, get) => ({
      skeletonConfig: DEFAULT_SKELETON_STYLE,
      uiCodeConfig: DEFAULT_UI_CONFIG,
      skeletonCodeConfig: DEFAULT_SKELETON_CONFIG,

      uiCode: DEFAULT_HTML_CODE,
      skeletonCode: "",

      skeletonGenerated: false,
      skeletonModified: false,
      copied: false,
      isValid: true,

      setUiCode: (code) => {
        const { skeletonGenerated, skeletonModified } = get();
        set({ uiCode: code });

        if (skeletonGenerated && !skeletonModified) {
          get().generateSkeleton();
        }
      },

      setSkeletonCode: (code) => {
        set({ skeletonCode: code, skeletonModified: true });
      },

      setUiCodeConfig: (config) =>
        set((state) => ({
          uiCodeConfig: {
            ...state.uiCodeConfig,
            ...config,
          },
        })),

      setSkeletonCodeConfig: (config) =>
        set((state) => ({
          skeletonCodeConfig: {
            ...state.skeletonCodeConfig,
            ...config,
          },
        })),

      setSkeletonConfig: (config) =>
        set((state) => ({
          skeletonConfig: {
            ...state.skeletonConfig,
            ...config,
          },
        })),

      generateSkeleton: () => {
        const { skeletonConfig, uiCodeConfig } = get();
        const { color, intensity, defaultBorderRadius: border } = skeletonConfig;
        const base = uiCodeConfig.format === "html" ? "class" : "className";

        const skeleton = `
<div ${base}="p-4 ${border} border border-gray-200 shadow-sm bg-white">
  <div ${base}="flex items-center gap-4">
    <div ${base}="h-12 w-12 rounded-full bg-${color}-${intensity} animate-pulse"></div>
    <div ${base}="space-y-2">
      <div ${base}="h-5 w-32 bg-${color}-${intensity} ${border} animate-pulse"></div>
      <div ${base}="h-4 w-40 bg-${color}-${intensity} ${border} animate-pulse"></div>
    </div>
  </div>
  <div ${base}="mt-4 space-y-2">
    <div ${base}="h-3 w-full bg-${color}-${intensity} ${border} animate-pulse"></div>
    <div ${base}="h-3 w-full bg-${color}-${intensity} ${border} animate-pulse"></div>
    <div ${base}="h-3 w-3/4 bg-${color}-${intensity} ${border} animate-pulse"></div>
  </div>
  <div ${base}="mt-4 flex justify-end">
    <div ${base}="h-10 w-28 bg-${color}-${intensity} ${border} animate-pulse"></div>
  </div>
</div>`.trim();

        set({
          skeletonCode: skeleton,
          skeletonGenerated: true,
          skeletonModified: false,
        });
      },

      copySkeletonCode: () => {
        const { skeletonCode } = get();
        if (typeof navigator !== "undefined") {
          navigator.clipboard.writeText(skeletonCode);
          set({ copied: true });
          setTimeout(() => set({ copied: false }), 2000);
        }
      },

      setSkeletonGenerated: (v) => set({ skeletonGenerated: v }),
      setSkeletonModified: (v) => set({ skeletonModified: v }),
      setCopied: (v) => set({ copied: v }),
      setIsValid: (v) => set({ isValid: v }),
    }),
    {
      name: "skeleton-store",
      partialize: (state) => ({
        uiCodeConfig: state.uiCodeConfig,
        skeletonCodeConfig: state.skeletonCodeConfig,
        skeletonConfig: state.skeletonConfig,
        uiCode: state.uiCode,
        skeletonCode: state.skeletonCode,
        skeletonGenerated: state.skeletonGenerated,
        skeletonModified: state.skeletonModified,
      }),
    }
  )
);

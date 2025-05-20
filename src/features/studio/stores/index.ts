import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CodeFileTabConfig } from "../types";
import {
  DEFAULT_HTML_CODE,
  DEFAULT_SKELETON_CONFIG,
  DEFAULT_UI_CONFIG,
} from "../constants";
import { convertionController } from "../func/convertion";
import { validationController } from "../func/validation";
import { editor } from "monaco-editor";

const generateSkeleton = (htmlCode: string) => {
  // Add your skeleton generation logic here
  return `<div class="skeleton">${htmlCode}</div>`; // Placeholder logic
};

type SkeletonStore = {
  uiCodeConfig: CodeFileTabConfig;
  setUiCodeConfig: (config: Partial<CodeFileTabConfig>) => void;

  skeletonCodeConfig: CodeFileTabConfig;
  setSkeletonCodeConfig: (config: Partial<CodeFileTabConfig>) => void;

  uiCode: string;
  setUiCodeFromEditor: (code: string) => Promise<void>;

  skeletonCode: string;
  setSkeletonCodeFromEditor: (code: string) => Promise<void>;

  uiEditorRef: editor.IStandaloneCodeEditor | null;
  skeletonEditorRef: editor.IStandaloneCodeEditor | null;
  setUIEditorRef: (editor: editor.IStandaloneCodeEditor) => void;
  setSkeletonEditorRef: (editor: editor.IStandaloneCodeEditor) => void;
  mountEditorRef: (
    editor: editor.IStandaloneCodeEditor,
    type: "ui" | "skeleton"
  ) => void;

  skeletonCodeUpdatedManually: boolean;
  hangingUICodeUpdates: string;
  uiSkeletonContraduction: boolean;

  solveContraduction: (decision: "continue" | "cancel") => Promise<void>;
};

export const useSkeletonStore = create<SkeletonStore>()(
  persist(
    (set, get) => ({
      uiCodeConfig: DEFAULT_UI_CONFIG,
      skeletonCodeConfig: DEFAULT_SKELETON_CONFIG,

      uiCode: DEFAULT_HTML_CODE,
      skeletonCode: generateSkeleton(DEFAULT_HTML_CODE),

      uiEditorRef: null,
      skeletonEditorRef: null,

      skeletonCodeUpdatedManually: false,
      hangingUICodeUpdates: "",
      uiSkeletonContraduction: false,

      setUIEditorRef: (editor) => set({ uiEditorRef: editor }),
      setSkeletonEditorRef: (editor) => set({ skeletonEditorRef: editor }),
      mountEditorRef: (editor, type) => {
        if (type === "ui") {
          set({ uiEditorRef: editor });
        } else {
          set({ skeletonEditorRef: editor });
        }
      },

      setUiCodeConfig: (config) => {
        set((state) => {
          const updatedConfig = { ...state.uiCodeConfig, ...config };
          return {
            uiCodeConfig: updatedConfig,
            uiCode: convertionController(
              state.uiCode,
              state.uiCodeConfig.format,
              config.format ?? state.uiCodeConfig.format,
              state.uiCodeConfig.styling,
              config.styling ?? state.uiCodeConfig.styling
            ),
          };
        });
      },

      setSkeletonCodeConfig: (config) => {
        set((state) => {
          const updatedConfig = { ...state.skeletonCodeConfig, ...config };
          return {
            skeletonCodeConfig: updatedConfig,
            skeletonCode: convertionController(
              state.skeletonCode,
              state.skeletonCodeConfig.format,
              config.format ?? state.skeletonCodeConfig.format,
              state.skeletonCodeConfig.styling,
              config.styling ?? state.skeletonCodeConfig.styling
            ),
          };
        });
      },

      setUiCodeFromEditor: async (code) => {
        const { uiCodeConfig, skeletonCodeUpdatedManually } = get();
        const errors = await validationController(code, uiCodeConfig.format);

        set((state) => ({
          uiCodeConfig: {
            ...state.uiCodeConfig,
            errors,
          },
        }));

        if (errors.length > 0) return;

        if (skeletonCodeUpdatedManually) {
          set({
            uiSkeletonContraduction: true,
            hangingUICodeUpdates: code,
          });
          return;
        }

        set({
          uiCode: code,
          skeletonCode: generateSkeleton(code),
        });
      },

      setSkeletonCodeFromEditor: async (code) => {
        const { skeletonCodeConfig } = get();
        const errors = await validationController(code, skeletonCodeConfig.format);

        set((state) => ({
          skeletonCodeConfig: {
            ...state.skeletonCodeConfig,
            errors,
          },
        }));

        if (errors.length > 0) return;

        set({
          skeletonCode: code,
          skeletonCodeUpdatedManually: true,
        });
      },

      solveContraduction: async (decision) => {
        const { hangingUICodeUpdates, uiCode, uiEditorRef } = get();

        const newUICode =
          decision === "continue" ? hangingUICodeUpdates : uiCode;

        set({
          uiCode: newUICode,
          uiSkeletonContraduction: false,
          hangingUICodeUpdates: "",
        });

        if (uiEditorRef) {
          uiEditorRef.setValue(newUICode);
        }
      },
    }),
    {
      name: "skeleton-store",
      partialize: (state) => ({
        uiCodeConfig: state.uiCodeConfig,
        skeletonCodeConfig: state.skeletonCodeConfig,
      }),
    }
  )
);

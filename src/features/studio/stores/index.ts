import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CodeFileTabConfig, SkeletonConfig } from "../types";
import {
  DEFAULT_HTML_CODE,
  DEFAULT_SKELETON_CONFIG,
  DEFAULT_SKELETON_STYLE,
  DEFAULT_UI_CONFIG,
} from "../constants";
import { convertionController } from "../func/convertion";
import { validationController } from "../func/validation";
import { editor } from "monaco-editor";
import { toast } from "sonner";
import { RefObject } from "react";



type SkeletonStore = {

  iframeRef: RefObject<HTMLIFrameElement | null> | null;
  setIframeRef: (ref: RefObject<HTMLIFrameElement | null>) => void;
  isSkeletonCodeGenerating: boolean;
  iframeLoaded: boolean;
  setIframeLoaded: (value: boolean) => void;

  codeCopied: "ui" | "skeleton" | null;
  copyCode: (type: "ui" | "skeleton") => void;


  activeCodeTab: "ui" | "skeleton";
  setActiveCodeTab: (tab: "ui" | "skeleton") => void;


  skeletonConfig: SkeletonConfig;
  setSkeletonConfig: (config: Partial<SkeletonConfig>) => void;

  uiCodeConfig: CodeFileTabConfig;
  setUiCodeConfig: (config: Partial<CodeFileTabConfig>) => void;

  skeletonCodeConfig: CodeFileTabConfig;
  setSkeletonCodeConfig: (config: Partial<CodeFileTabConfig>) => void;

  uiCode: string;
  setUiCodeFromEditor: (code: string) => Promise<void>;

  skeletonCode: string;
  setSkeletonCodeFromEditor: (code: string) => Promise<void>;
  setGeneratedSkeletonCode: (code: string) => Promise<void>;
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

      iframeRef: null,
      isSkeletonCodeGenerating: false,
      setIframeRef: (ref) => set({ iframeRef: ref }),

      iframeLoaded: false,
      setIframeLoaded: (value) => set({ iframeLoaded: value }),

      codeCopied: null,

    copyCode: (type) => {
      const { uiCode, skeletonCode } = get();
      const codeToCopy = type === "ui" ? uiCode : skeletonCode;

      navigator.clipboard.writeText(codeToCopy).then(() => {
        set({ codeCopied: type });
        toast.success(`${type} code copied successfully!`)
        setTimeout(() => {
          set({ codeCopied: null });
        }, 2000);
      }).catch((err) => {
        console.error("Failed to copy code:", err);
      });
    },

    activeCodeTab: "ui",
    setActiveCodeTab: (tab) => set({ activeCodeTab: tab }),


      skeletonConfig: DEFAULT_SKELETON_STYLE,
      setSkeletonConfig: (config) =>
        set((state) => ({
          skeletonConfig: {
            ...state.skeletonConfig,
            ...config,
          },
        })),
      uiCodeConfig: DEFAULT_UI_CONFIG,
      skeletonCodeConfig: DEFAULT_SKELETON_CONFIG,

      uiCode: DEFAULT_HTML_CODE,
      skeletonCode: DEFAULT_HTML_CODE,//todo: add default skeleton code
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
        const state = get(); 

        const newUiCode = convertionController(
          state.uiCode, 
          state.uiCodeConfig.format,
          config.format ?? state.uiCodeConfig.format,
          state.uiCodeConfig.styling,
          config.styling ?? state.uiCodeConfig.styling
        );

        set((prevState) => {
          const updatedConfig = { ...prevState.uiCodeConfig, ...config };
          return {
            uiCodeConfig: updatedConfig,
          };
        });

        const { uiEditorRef } = get();
        if (uiEditorRef) {
          uiEditorRef.setValue(newUiCode);
        }
      },

        setSkeletonCodeConfig: (config) => {
        const state = get(); 

        const newSkeletonCode = convertionController(
          state.skeletonCode, 
          state.skeletonCodeConfig.format,
          config.format ?? state.skeletonCodeConfig.format,
          state.skeletonCodeConfig.styling,
          config.styling ?? state.skeletonCodeConfig.styling
        );

        set((prevState) => {
          const updatedConfig = { ...prevState.skeletonCodeConfig, ...config };
          return {
            skeletonCodeConfig: updatedConfig,
          };
        });

        const { skeletonEditorRef } = get();
        if (skeletonEditorRef) {
          skeletonEditorRef.setValue(newSkeletonCode);
        }
      },

      setUiCodeFromEditor: async (code) => {
        const { uiCodeConfig, skeletonCodeUpdatedManually, skeletonCodeConfig } = get();
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
        // skeletonCode: generateSkeleton(
        //   code, 
        //   uiCodeConfig.format,     
        //   skeletonCodeConfig.format,  
        //   uiCodeConfig.styling,     
        //   skeletonCodeConfig.styling  
        // ),
      });

      },


      setGeneratedSkeletonCode: async (code) => {
         set({
          isSkeletonCodeGenerating: true
        });

          const { skeletonEditorRef } = get();
          console.log("skeleton ref: "+skeletonEditorRef)
          if (skeletonEditorRef) {
          skeletonEditorRef.setValue(code);
        }
      },
      setSkeletonCodeFromEditor: async (code) => {
        const { skeletonCodeConfig, isSkeletonCodeGenerating } = get();
        const errors = await validationController(code, skeletonCodeConfig.format);

        set((state) => ({
          skeletonCodeConfig: {
            ...state.skeletonCodeConfig,
            errors,
          },
        }));

        if (errors.length > 0) return;

        if(isSkeletonCodeGenerating){
        set({
          skeletonCode: code,
          isSkeletonCodeGenerating: false,
        });
        }
        else{
        set({
          skeletonCode: code,
          skeletonCodeUpdatedManually: true,
        });
        }
        console.log("skeleton code: "+get().skeletonCode)
      },

      solveContraduction: async (decision) => {
        const { hangingUICodeUpdates, uiCode, uiEditorRef } = get();

        const newUICode =
          decision === "continue" ? hangingUICodeUpdates : uiCode;

        set({
          uiCode: newUICode,
          uiSkeletonContraduction: false,
          skeletonCodeUpdatedManually: false,
          hangingUICodeUpdates: "",
        });

        if (uiEditorRef) {
          uiEditorRef.setValue(newUICode);
          // back if he wanted to add update again...
          if( decision === "cancel"){
             set({
          skeletonCodeUpdatedManually: true,
        });
          }
        }
      },
    }),
    {
      name: "skeleton-store",
    partialize: (state) => ({
  uiCodeConfig: state.uiCodeConfig,
  skeletonCodeConfig: state.skeletonCodeConfig,
  activeCodeTab: state.activeCodeTab,
  skeletonConfig: state.skeletonConfig,
  uiCode: state.uiCode,
  skeletonCode: state.skeletonCode,
  skeletonCodeUpdatedManually: state.skeletonCodeUpdatedManually,
  hangingUICodeUpdates: state.hangingUICodeUpdates,
  uiSkeletonContraduction: state.uiSkeletonContraduction,
}),

    }
  )
);

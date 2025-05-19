import { create } from "zustand"
import { persist } from "zustand/middleware"

// Add these to your existing store types
type LayoutMode = "split" | "editor" | "preview"

type SkeletonStore = {
  // UI Format and Styling Options
  uiFormat: string
  stylingFormat: string
  exportFormat: string
  setUiFormat: (format: string) => void
  setStylingFormat: (format: string) => void
  setExportFormat: (format: string) => void

  // Code state
  uiCode: string
  skeletonCode: string
  skeletonGenerated: boolean
  skeletonModified: boolean
  copied: boolean
  isValid: boolean
  setUiCode: (code: string) => void
  setSkeletonCode: (code: string) => void
  setSkeletonGenerated: (generated: boolean) => void
  setSkeletonModified: (modified: boolean) => void
  setCopied: (copied: boolean) => void
  setIsValid: (isValid: boolean) => void

  // Skeleton Configuration
  skeletonColor: string
  skeletonBorder: string
  skeletonBorderColor: string
  maxColorDegree: number
  defaultBgClass: string
  setSkeletonColor: (color: string) => void
  setSkeletonBorder: (border: string) => void
  setSkeletonBorderColor: (color: string) => void
  setMaxColorDegree: (degree: number) => void
  setDefaultBgClass: (bgClass: string) => void

  // UI State
  activeTab: string
  activeCodeTab: string
  fullPreview: boolean
  showEditors: boolean
  generatedCount: number
  previewDevice: string
  shareDialogOpen: boolean
  showToast: boolean
  toastMessage: string
  unsavedChangesAlert: boolean
  setActiveTab: (tab: string) => void
  setActiveCodeTab: (tab: string) => void
  setFullPreview: (preview: boolean) => void
  setShowEditors: (show: boolean) => void
  incrementGeneratedCount: () => void
  setPreviewDevice: (device: string) => void
  setShareDialogOpen: (open: boolean) => void
  setShowToast: (show: boolean, message?: string) => void
  setUnsavedChangesAlert: (show: boolean) => void

  // Add these to your SkeletonStore interface
  layoutMode: LayoutMode
  setLayoutMode: (mode: LayoutMode) => void

  // Actions
  generateSkeleton: () => void
  copySkeletonCode: () => void
}

const DEFAULT_HTML_CODE = `<div class="bg-white p-4 rounded-lg shadow-md">
  <div class="flex items-center gap-4">
    <div class="h-12 w-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">
      JD
    </div>
    <div>
      <h3 class="text-lg font-bold text-slate-800">John Doe</h3>
      <p class="text-slate-500">Frontend Developer</p>
    </div>
  </div>
  <div class="mt-4">
    <p class="text-sm text-slate-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </div>
  <div class="mt-4 flex justify-end">
    <button class="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
      View Profile
    </button>
  </div>
</div>`

const DEFAULT_JSX_CODE = `<div className="bg-white p-4 rounded-lg shadow-md">
  <div className="flex items-center gap-4">
    <div className="h-12 w-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">
      JD
    </div>
    <div>
      <h3 className="text-lg font-bold text-slate-800">John Doe</h3>
      <p className="text-slate-500">Frontend Developer</p>
    </div>
  </div>
  <div className="mt-4">
    <p className="text-sm text-slate-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </div>
  <div className="mt-4 flex justify-end">
    <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
      View Profile
    </button>
  </div>
</div>`

export const useSkeletonStore = create<SkeletonStore>()(
  persist(
    (set, get) => ({
      // UI Format and Styling Options
      uiFormat: "jsx",
      stylingFormat: "tailwind",
      exportFormat: "jsx",
      setUiFormat: (format) => {
        set({ uiFormat: format })
        // Update code when UI format changes
        if (format === "html") {
          set({ uiCode: DEFAULT_HTML_CODE })
        } else {
          set({ uiCode: DEFAULT_JSX_CODE })
        }
      },
      setStylingFormat: (format) => set({ stylingFormat: format }),
      setExportFormat: (format) => set({ exportFormat: format }),

      // Code state
      uiCode: DEFAULT_JSX_CODE,
      skeletonCode: "",
      skeletonGenerated: false,
      skeletonModified: false,
      copied: false,
      isValid: true,
      setUiCode: (code) => {
        const { skeletonGenerated, skeletonModified } = get()
        set({ uiCode: code })

        // If skeleton has been generated but not modified, auto-generate new skeleton
        if (skeletonGenerated && !skeletonModified) {
          get().generateSkeleton()
        } else if (skeletonGenerated && skeletonModified) {
          // If skeleton has been modified, show alert
          set({ unsavedChangesAlert: true })
        }
      },
      setSkeletonCode: (code) => set({ skeletonCode: code, skeletonModified: true }),
      setSkeletonGenerated: (generated) => set({ skeletonGenerated: generated }),
      setSkeletonModified: (modified) => set({ skeletonModified: modified }),
      setCopied: (copied) => set({ copied }),
      setIsValid: (isValid) => set({ isValid }),

      // Skeleton Configuration
      skeletonColor: "gray",
      skeletonBorder: "rounded-md",
      skeletonBorderColor: "border-gray-200",
      maxColorDegree: 200,
      defaultBgClass: "bg-white",
      setSkeletonColor: (color) => set({ skeletonColor: color }),
      setSkeletonBorder: (border) => set({ skeletonBorder: border }),
      setSkeletonBorderColor: (color) => set({ skeletonBorderColor: color }),
      setMaxColorDegree: (degree) => set({ maxColorDegree: degree }),
      setDefaultBgClass: (bgClass) => set({ defaultBgClass: bgClass }),

      // UI State
      activeTab: "ui",
      activeCodeTab: "ui",
      fullPreview: false,
      showEditors: true,
      generatedCount: 0,
      previewDevice: "desktop",
      shareDialogOpen: false,
      showToast: false,
      toastMessage: "",
      unsavedChangesAlert: false,
      setActiveTab: (tab) => set({ activeTab: tab }),
      setActiveCodeTab: (tab) => set({ activeCodeTab: tab }),
      setFullPreview: (preview) => set({ fullPreview: preview }),
      setShowEditors: (show) => set({ showEditors: show }),
      incrementGeneratedCount: () => set((state) => ({ generatedCount: state.generatedCount + 1 })),
      setPreviewDevice: (device) => set({ previewDevice: device }),
      setShareDialogOpen: (open) => set({ shareDialogOpen: open }),
      setShowToast: (show, message = "") => set({ showToast: show, toastMessage: message }),
      setUnsavedChangesAlert: (show) => set({ unsavedChangesAlert: show }),

      // Add these to your store implementation
      layoutMode: "split",
      setLayoutMode: (mode) => set({ layoutMode: mode }),

      // Actions
      generateSkeleton: () => {
        const { skeletonColor, skeletonBorder, skeletonBorderColor, maxColorDegree, defaultBgClass, exportFormat } =
          get()

        set((state) => ({
          generatedCount: state.generatedCount + 1,
          skeletonGenerated: true,
          skeletonModified: false,
          unsavedChangesAlert: false,
        }))

        // Generate skeleton code based on export format
        if (exportFormat === "html") {
          set({
            skeletonCode: `<div class="p-4 ${skeletonBorder} border ${skeletonBorderColor} shadow-sm ${defaultBgClass}">
  <div class="flex items-center gap-4">
    <div class="h-12 w-12 rounded-full bg-${skeletonColor}-${maxColorDegree} animate-pulse"></div>
    <div class="space-y-2">
      <div class="h-5 w-32 bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
      <div class="h-4 w-40 bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
    </div>
  </div>
  <div class="mt-4 space-y-2">
    <div class="h-3 w-full bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
    <div class="h-3 w-full bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
    <div class="h-3 w-3/4 bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
  </div>
  <div class="mt-4 flex justify-end">
    <div class="h-10 w-28 bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
  </div>
</div>`,
          })
        } else {
          set({
            skeletonCode: `<div className="p-4 ${skeletonBorder} border ${skeletonBorderColor} shadow-sm ${defaultBgClass}">
  <div className="flex items-center gap-4">
    <div className="h-12 w-12 rounded-full bg-${skeletonColor}-${maxColorDegree} animate-pulse"></div>
    <div className="space-y-2">
      <div className="h-5 w-32 bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
      <div className="h-4 w-40 bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
    </div>
  </div>
  <div className="mt-4 space-y-2">
    <div className="h-3 w-full bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
    <div className="h-3 w-full bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
    <div className="h-3 w-3/4 bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
  </div>
  <div className="mt-4 flex justify-end">
    <div className="h-10 w-28 bg-${skeletonColor}-${maxColorDegree} ${skeletonBorder} animate-pulse"></div>
  </div>
</div>`,
          })
        }
      },

      copySkeletonCode: () => {
        const { skeletonCode } = get()
        if (typeof navigator !== "undefined") {
          navigator.clipboard.writeText(skeletonCode)
          set({
            copied: true,
            showToast: true,
            toastMessage: "Skeleton code copied to clipboard!",
          })
          setTimeout(() => set({ copied: false, showToast: false }), 2000)
        }
      },
    }),
    {
      name: "skeleton-store",
      partialize: (state) => ({
        generatedCount: state.generatedCount,
        skeletonColor: state.skeletonColor,
        skeletonBorder: state.skeletonBorder,
        skeletonBorderColor: state.skeletonBorderColor,
        maxColorDegree: state.maxColorDegree,
        defaultBgClass: state.defaultBgClass,
        uiFormat: state.uiFormat,
        stylingFormat: state.stylingFormat,
        exportFormat: state.exportFormat,
      }),
    },
  ),
)

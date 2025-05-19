import { create } from "zustand"

type SkeletonStore = {
  // UI Format and Styling Options
  uiFormat: string
  stylingFormat: string
  exportFormat: string
  setUiFormat: (format: string) => void
  setStylingFormat: (format: string) => void
  setExportFormat: (format: string) => void

  // Code state
  code: string
  skeletonCode: string
  skeletonGenerated: boolean
  copied: boolean
  isValid: boolean
  setCode: (code: string) => void
  setSkeletonCode: (code: string) => void
  setSkeletonGenerated: (generated: boolean) => void
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
  fullPreview: boolean
  generatedCount: number
  previewDevice: string
  setActiveTab: (tab: string) => void
  setFullPreview: (preview: boolean) => void
  incrementGeneratedCount: () => void
  setPreviewDevice: (device: string) => void

  // Actions
  generateSkeleton: () => void
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

export const useSkeletonStore = create<SkeletonStore>((set, get) => ({
  // UI Format and Styling Options
  uiFormat: "jsx",
  stylingFormat: "tailwind",
  exportFormat: "jsx",
  setUiFormat: (format) => {
    set({ uiFormat: format })
    // Update code when UI format changes
    if (format === "html") {
      set({ code: DEFAULT_HTML_CODE })
    } else {
      set({ code: DEFAULT_JSX_CODE })
    }
  },
  setStylingFormat: (format) => set({ stylingFormat: format }),
  setExportFormat: (format) => set({ exportFormat: format }),

  // Code state
  code: DEFAULT_JSX_CODE,
  skeletonCode: "",
  skeletonGenerated: false,
  copied: false,
  isValid: true,
  setCode: (code) => set({ code }),
  setSkeletonCode: (code) => set({ skeletonCode: code }),
  setSkeletonGenerated: (generated) => set({ skeletonGenerated: generated }),
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
  fullPreview: false,
  generatedCount: 0,
  previewDevice: "desktop",
  setActiveTab: (tab) => set({ activeTab: tab }),
  setFullPreview: (preview) => set({ fullPreview: preview }),
  incrementGeneratedCount: () => set((state) => ({ generatedCount: state.generatedCount + 1 })),
  setPreviewDevice: (device) => set({ previewDevice: device }),

  // Actions
  generateSkeleton: () => {
    const { skeletonColor, skeletonBorder, skeletonBorderColor, maxColorDegree, defaultBgClass, exportFormat } = get()

    set((state) => ({
      generatedCount: state.generatedCount + 1,
      skeletonGenerated: true,
      activeTab: "skeleton",
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
}))

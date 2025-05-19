"use client"

import { Zap } from "lucide-react"
import { AutocompleteInput } from "@/components/ui/autocomplete"
import { useSkeletonStore } from "@/lib/store"

export default function SkeletonConfiguration() {
  const colors = [
    "slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber",
    "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue",
    "indigo", "violet", "purple", "fuchsia", "pink", "rose",
  ]
  const intensities = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
  const borderSizes = ["rounded-none", "rounded-sm", "rounded-md", "rounded-lg", "rounded-full"]

  const { skeletonConfig, setSkeletonConfig } = useSkeletonStore()

  return (
    <div className="w-full relative mb-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 overflow-visible transition-all duration-300 hover:shadow-xl">
      <div className="px-4 py-3 border-b border-slate-200/50">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mr-3 shadow-sm">
            <Zap className="h-4 w-4" />
          </div>
          <span className="font-medium text-slate-700">Skeleton Configuration</span>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:max-w-5xl">
          <AutocompleteInput
            label="Color"
            value={skeletonConfig.color}
            onChange={(val) => {
              setSkeletonConfig({ color: val })
            }}
            suggestions={colors}
            onSelect={(val) => {
              setSkeletonConfig({ color: val })
            }}
            placeholder="Enter color"
            showColorDot
          />

          <AutocompleteInput
            label="Intensity"
            value={skeletonConfig.intensity.toString()}
            onChange={(val) => {
              if (/^\d*$/.test(val)) {
                setSkeletonConfig({ intensity: Number(val) })
              }
            }}
            suggestions={intensities}
            onSelect={(val) => {
              setSkeletonConfig({ intensity: Number(val) })
            }}
            placeholder="Enter intensity"
          />

          <AutocompleteInput
            label="Default Border Radius"
            value={skeletonConfig.defaultBorderRadius}
            onChange={(val) => {
              setSkeletonConfig({ defaultBorderRadius: val })
            }}
            suggestions={borderSizes}
            onSelect={(val) => {
              setSkeletonConfig({ defaultBorderRadius: val })
            }}
            placeholder="Enter border radius"
          />
        </div>
      </div>
    </div>
  )
}

'use client'

import { Zap } from "lucide-react"
import { AutocompleteInput } from "@/components/ui/autocomplete"
import { useSkeletonStore } from "@/lib/store"
import { skeletonBorderRadiusSizes, skeletonColors, skeletonIntensities } from "../constants"

type SkeletonConfig = {
  color: string
  intensity: number
  defaultBorderRadius: string
}

type ConfigInputType<K extends keyof SkeletonConfig = keyof SkeletonConfig> = {
  label: string
  key: K
  suggestions: string[]
  placeholder: string
  showColorDot?: boolean
  transform: (val: string) => SkeletonConfig[K] | undefined
}

const configInputs: ConfigInputType[] = [
  {
    label: "Color",
    key: "color",
    suggestions: skeletonColors,
    placeholder: "Enter color",
    showColorDot: true,
    transform: (val) => val,
  },
  {
    label: "Intensity",
    key: "intensity",
    suggestions: skeletonIntensities,
    placeholder: "Enter intensity",
    transform: (val) => (/^\d*$/.test(val) ? Number(val) : undefined),
  },
  {
    label: "Default Border Radius",
    key: "defaultBorderRadius",
    suggestions: skeletonBorderRadiusSizes,
    placeholder: "Enter border radius",
    transform: (val) => val,
  },
]

export default function SkeletonConfiguration() {
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
          {configInputs.map(({ label, key, suggestions, placeholder, showColorDot, transform }) => (
            <AutocompleteInput
              key={key}
              label={label}
              value={skeletonConfig[key]?.toString() ?? ""}
              onChange={(val) => {
                const transformed = transform(val)
                if (transformed !== undefined) {
                  setSkeletonConfig({ [key]: transformed })
                }
              }}
              onSelect={(val) => {
                const transformed = transform(val)
                if (transformed !== undefined) {
                  setSkeletonConfig({ [key]: transformed })
                }
              }}
              suggestions={suggestions}
              placeholder={placeholder}
              showColorDot={showColorDot}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

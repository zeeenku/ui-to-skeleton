"use client"

import React, { useState } from "react"
import { Zap } from "lucide-react"
import { AutocompleteInput } from "@/components/ui/autocomplete"

export default function SkeletonConfiguration() {
  const colors = [
    "slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber",
    "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue",
    "indigo", "violet", "purple", "fuchsia", "pink", "rose",
  ]
  const intensities = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
  const borderSizes = ["rounded-none", "rounded-sm", "rounded-md", "rounded-lg", "rounded-full"]

  const [skeletonColor, setSkeletonColor] = useState("cyan")
  const [colorInput, setColorInput] = useState("cyan")

  const [maxColorDegree, setMaxColorDegree] = useState(200)
  const [intensityInput, setIntensityInput] = useState("200")

  const [skeletonBorder, setSkeletonBorder] = useState("rounded-md")
  const [borderInput, setBorderInput] = useState("rounded-md")

  const [skeletonBorderColor, setSkeletonBorderColor] = useState("slate")
  const [borderColorInput, setBorderColorInput] = useState("slate")

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
            value={colorInput}
            onChange={setColorInput}
            suggestions={colors}
            onSelect={(val) => {
              setColorInput(val)
              setSkeletonColor(val)
            }}
            placeholder="Enter color"
            showColorDot
          />

          <AutocompleteInput
            label="Intensity"
            value={intensityInput}
            onChange={(val) => {
              if (/^\d*$/.test(val)) {
                setIntensityInput(val)
                setMaxColorDegree(Number(val))
              }
            }}
            suggestions={intensities}
            onSelect={(val) => {
              setIntensityInput(val)
              setMaxColorDegree(Number(val))
            }}
            placeholder="Enter intensity"
          />

          <AutocompleteInput
          
            label="Default Border Radius"
            value={borderInput}
            onChange={setBorderInput}
            suggestions={borderSizes}
            onSelect={(val) => {
              setBorderInput(val)
              setSkeletonBorder(val)
            }}
            placeholder="Enter border radius"
          />
        </div>
      </div>
    </div>
  )
}

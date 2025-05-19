"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Zap, X } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SkeletonConfiguration() {
  const [skeletonColor, setSkeletonColor] = useState("cyan")
  const [colorInput, setColorInput] = useState("cyan")
  const [colorSuggestions, setColorSuggestions] = useState<string[]>([])
  const [showColorSuggestions, setShowColorSuggestions] = useState(false)

  const [maxColorDegree, setMaxColorDegree] = useState(200)
  const [intensityInput, setIntensityInput] = useState("200")
  const [intensitySuggestions, setIntensitySuggestions] = useState<string[]>([])
  const [showIntensitySuggestions, setShowIntensitySuggestions] = useState(false)

  const [skeletonBorder, setSkeletonBorder] = useState("rounded-md")
  const [borderInput, setBorderInput] = useState("rounded-md")
  const [borderSuggestions, setBorderSuggestions] = useState<string[]>([])
  const [showBorderSuggestions, setShowBorderSuggestions] = useState(false)

  const [skeletonBorderColor, setSkeletonBorderColor] = useState("slate")
  const [borderColorInput, setBorderColorInput] = useState("slate")
  const [borderColorSuggestions, setBorderColorSuggestions] = useState<string[]>([])
  const [showBorderColorSuggestions, setShowBorderColorSuggestions] = useState(false)

  const colorRef = useRef<HTMLDivElement>(null)
  const intensityRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const borderColorRef = useRef<HTMLDivElement>(null)

  const colors = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ]

  const intensities = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]

  const borderSizes = ["rounded-none", "rounded-sm", "rounded-md", "rounded-lg", "rounded-full"]

  // Handle outside clicks to close suggestion dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorRef.current && !colorRef.current.contains(event.target as Node)) {
        setShowColorSuggestions(false)
      }
      if (intensityRef.current && !intensityRef.current.contains(event.target as Node)) {
        setShowIntensitySuggestions(false)
      }
      if (borderRef.current && !borderRef.current.contains(event.target as Node)) {
        setShowBorderSuggestions(false)
      }
      if (borderColorRef.current && !borderColorRef.current.contains(event.target as Node)) {
        setShowBorderColorSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter color suggestions
  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setColorInput(value)
    setSkeletonColor(value)

    if (value.trim() === "") {
      setColorSuggestions([])
      return
    }

    const filtered = colors.filter((color) => color.toLowerCase().includes(value.toLowerCase()))
    setColorSuggestions(filtered)
    setShowColorSuggestions(true)
  }

  // Filter intensity suggestions
  const handleIntensityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setIntensityInput(value)

    if (value.trim() === "") {
      setIntensitySuggestions([])
      return
    }

    // Only allow numeric input
    if (!/^\d*$/.test(value)) {
      return
    }

    setMaxColorDegree(Number(value) || 0)

    const filtered = intensities.filter((intensity) => intensity.includes(value))
    setIntensitySuggestions(filtered)
    setShowIntensitySuggestions(true)
  }

  // Filter border suggestions
  const handleBorderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBorderInput(value)
    setSkeletonBorder(value)

    if (value.trim() === "") {
      setBorderSuggestions([])
      return
    }

    const filtered = borderSizes.filter((border) => border.toLowerCase().includes(value.toLowerCase()))
    setBorderSuggestions(filtered)
    setShowBorderSuggestions(true)
  }

  // Filter border color suggestions
  const handleBorderColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBorderColorInput(value)
    setSkeletonBorderColor(value)

    if (value.trim() === "") {
      setBorderColorSuggestions([])
      return
    }

    const filtered = colors.filter((color) => color.toLowerCase().includes(value.toLowerCase()))
    setBorderColorSuggestions(filtered)
    setShowBorderColorSuggestions(true)
  }

  return (
    <div className="w-full mb-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 overflow-visible transition-all duration-300 hover:shadow-xl">
      <div className="px-4 py-3 border-b border-slate-200/50">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mr-3 shadow-sm">
            <Zap className="h-4 w-4" />
          </div>
          <span className="font-medium text-slate-700">Skeleton Configuration</span>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Color Input with Autocomplete */}
          <div className="relative" ref={colorRef}>
            <label className="block font-medium text-slate-700 mb-1.5">Color</label>
            <div className="relative">
              <Input
                type="text"
                value={colorInput}
                onChange={handleColorInputChange}
                onFocus={() => setShowColorSuggestions(true)}
                className="h-9 bg-white border-slate-200 focus:ring-cyan-500 pr-8"
                placeholder="Enter color"
              />
              {colorInput && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => {
                    setColorInput("")
                    setSkeletonColor("")
                    setColorSuggestions([])
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {showColorSuggestions && colorSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-slate-200 max-h-60 overflow-y-auto">
                <ul className="py-1">
                  {colorSuggestions.map((color, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-slate-100 cursor-pointer capitalize flex items-center"
                      onClick={() => {
                        setColorInput(color)
                        setSkeletonColor(color)
                        setShowColorSuggestions(false)
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: `var(--${color}-500, #cbd5e1)` }}
                      />
                      {color}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Intensity Input with Autocomplete */}
          <div className="relative" ref={intensityRef}>
            <label className="block font-medium text-slate-700 mb-1.5">Intensity</label>
            <div className="relative">
              <Input
                type="text"
                value={intensityInput}
                onChange={handleIntensityInputChange}
                onFocus={() => setShowIntensitySuggestions(true)}
                className="h-9 bg-white border-slate-200 focus:ring-cyan-500 pr-8"
                placeholder="Enter intensity"
              />
              {intensityInput && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => {
                    setIntensityInput("")
                    setMaxColorDegree(0)
                    setIntensitySuggestions([])
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {showIntensitySuggestions && intensitySuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-slate-200 max-h-60 overflow-y-auto">
                <ul className="py-1">
                  {intensitySuggestions.map((intensity, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
                      onClick={() => {
                        setIntensityInput(intensity)
                        setMaxColorDegree(Number(intensity))
                        setShowIntensitySuggestions(false)
                      }}
                    >
                      {intensity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Border Size Input with Autocomplete */}
          <div className="relative" ref={borderRef}>
            <label className="block font-medium text-slate-700 mb-1.5">Border Size</label>
            <div className="relative">
              <Input
                type="text"
                value={borderInput}
                onChange={handleBorderInputChange}
                onFocus={() => setShowBorderSuggestions(true)}
                className="h-9 bg-white border-slate-200 focus:ring-cyan-500 pr-8"
                placeholder="Enter border size"
              />
              {borderInput && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => {
                    setBorderInput("")
                    setSkeletonBorder("")
                    setBorderSuggestions([])
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {showBorderSuggestions && borderSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-slate-200 max-h-60 overflow-y-auto">
                <ul className="py-1">
                  {borderSuggestions.map((border, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
                      onClick={() => {
                        setBorderInput(border)
                        setSkeletonBorder(border)
                        setShowBorderSuggestions(false)
                      }}
                    >
                      {border}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Border Color Input with Autocomplete */}
          <div className="relative" ref={borderColorRef}>
            <label className="block font-medium text-slate-700 mb-1.5">Border Color</label>
            <div className="relative">
              <Input
                type="text"
                value={borderColorInput}
                onChange={handleBorderColorInputChange}
                onFocus={() => setShowBorderColorSuggestions(true)}
                className="h-9 bg-white border-slate-200 focus:ring-cyan-500 pr-8"
                placeholder="Enter border color"
              />
              {borderColorInput && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => {
                    setBorderColorInput("")
                    setSkeletonBorderColor("")
                    setBorderColorSuggestions([])
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {showBorderColorSuggestions && borderColorSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-slate-200 max-h-60 overflow-y-auto">
                <ul className="py-1">
                  {borderColorSuggestions.map((color, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-slate-100 cursor-pointer capitalize flex items-center"
                      onClick={() => {
                        setBorderColorInput(color)
                        setSkeletonBorderColor(color)
                        setShowBorderColorSuggestions(false)
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: `var(--${color}-500, #cbd5e1)` }}
                      />
                      {color}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

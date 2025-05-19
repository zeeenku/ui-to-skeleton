"use client"

import { useState, useEffect } from "react"
import { Share2, AlertTriangle, ExternalLink, Code, Copy, Check, Zap, Monitor, Smartphone, Tablet } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

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

export default function CodeEditor() {
  // UI Format and Styling Options
  const [uiFormat, setUiFormat] = useState("jsx")
  const [stylingFormat, setStylingFormat] = useState("tailwind")
  const [exportFormat, setExportFormat] = useState("jsx")

  // Code state
  const [code, setCode] = useState(DEFAULT_JSX_CODE)
  const [skeletonCode, setSkeletonCode] = useState("")
  const [skeletonGenerated, setSkeletonGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isValid, setIsValid] = useState(true)

  // Skeleton Configuration
  const [skeletonColor, setSkeletonColor] = useState("gray")
  const [skeletonBorder, setSkeletonBorder] = useState("rounded-md")
  const [skeletonBorderColor, setSkeletonBorderColor] = useState("border-gray-200")
  const [maxColorDegree, setMaxColorDegree] = useState(200)
  const [defaultBgClass, setDefaultBgClass] = useState("bg-white")

  // UI State
  const [activeTab, setActiveTab] = useState("ui")
  const [fullPreview, setFullPreview] = useState(false)
  const [generatedCount, setGeneratedCount] = useLocalStorage("generatedCount", 0)
  const [previewDevice, setPreviewDevice] = useState("desktop")

  // Validate HTML
  const validateHtml = (htmlString: string) => {
    try {
      if (typeof window !== "undefined") {
        const doc = new DOMParser().parseFromString(htmlString, "text/html")
        const errors = doc.querySelectorAll("parsererror")
        return errors.length === 0
      }
      return true
    } catch {
      return false
    }
  }

  // Update code when UI format changes
  useEffect(() => {
    if (uiFormat === "html") {
      setCode(DEFAULT_HTML_CODE)
    } else {
      setCode(DEFAULT_JSX_CODE)
    }
  }, [uiFormat])

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || ""
    setCode(newCode)
    setIsValid(validateHtml(newCode))
  }

  const generateSkeleton = () => {
    setGeneratedCount((prev) => prev + 1)
    setSkeletonGenerated(true)
    setActiveTab("skeleton")

    // Generate skeleton code based on export format
    if (exportFormat === "html") {
      setSkeletonCode(`<div class="p-4 ${skeletonBorder} border ${skeletonBorderColor} shadow-sm ${defaultBgClass}">
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
</div>`)
    } else {
      setSkeletonCode(`<div className="p-4 ${skeletonBorder} border ${skeletonBorderColor} shadow-sm ${defaultBgClass}">
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
</div>`)
    }
  }

  const shareOnTwitter = () => {
    const text = "Check out this awesome skeleton loader generator tool! #UItoSkeleton #WebDev"
    const url = window.location.href
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
    )
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(skeletonCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Ad Banner */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm p-3 text-center text-sm text-slate-700 border-b border-cyan-200/30 sticky top-0 z-50">
        <span className="font-medium">Sponsored:</span> Try our new premium templates for advanced skeleton loaders
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Configuration Accordions */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl">
          <Accordion type="single" collapsible defaultValue="format-options">
            <AccordionItem value="format-options" className="border-b border-slate-200/70">
              <AccordionTrigger className="px-6 py-4 text-slate-700 hover:no-underline hover:bg-cyan-50/50 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mr-3 shadow-sm">
                    <Code className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Format Options</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h3 className="font-medium text-slate-700 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center mr-2 text-xs">
                        1
                      </span>
                      UI Format
                    </h3>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="ui-format-html"
                          checked={uiFormat === "html"}
                          onCheckedChange={() => setUiFormat("html")}
                        />
                        <Label htmlFor="ui-format-html" className="cursor-pointer">
                          HTML
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="ui-format-jsx"
                          checked={uiFormat === "jsx"}
                          onCheckedChange={() => setUiFormat("jsx")}
                        />
                        <Label htmlFor="ui-format-jsx" className="cursor-pointer">
                          JSX
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h3 className="font-medium text-slate-700 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center mr-2 text-xs">
                        2
                      </span>
                      Styling
                    </h3>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="styling-css"
                          checked={stylingFormat === "css"}
                          onCheckedChange={() => setStylingFormat("css")}
                          disabled
                        />
                        <Label htmlFor="styling-css" className="text-slate-400 cursor-pointer">
                          CSS{" "}
                          <span className="text-xs bg-slate-200 px-1.5 py-0.5 rounded text-slate-500 ml-1">Soon</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="styling-tailwind"
                          checked={stylingFormat === "tailwind"}
                          onCheckedChange={() => setStylingFormat("tailwind")}
                        />
                        <Label htmlFor="styling-tailwind" className="cursor-pointer">
                          Tailwind
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h3 className="font-medium text-slate-700 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center mr-2 text-xs">
                        3
                      </span>
                      Export Format
                    </h3>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="export-html"
                          checked={exportFormat === "html"}
                          onCheckedChange={() => setExportFormat("html")}
                        />
                        <Label htmlFor="export-html" className="cursor-pointer">
                          HTML
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="export-jsx"
                          checked={exportFormat === "jsx"}
                          onCheckedChange={() => setExportFormat("jsx")}
                        />
                        <Label htmlFor="export-jsx" className="cursor-pointer">
                          JSX
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="skeleton-config" className="border-b-0">
              <AccordionTrigger className="px-6 py-4 text-slate-700 hover:no-underline hover:bg-cyan-50/50 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mr-3 shadow-sm">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Skeleton Configuration</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="skeleton-color" className="text-slate-700">
                      Skeleton Color
                    </Label>
                    <Select value={skeletonColor} onValueChange={setSkeletonColor}>
                      <SelectTrigger id="skeleton-color" className="bg-white border-slate-200 focus:ring-cyan-500">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gray">Gray</SelectItem>
                        <SelectItem value="slate">Slate</SelectItem>
                        <SelectItem value="zinc">Zinc</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="stone">Stone</SelectItem>
                        <SelectItem value="cyan">Cyan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skeleton-border" className="text-slate-700">
                      Skeleton Border
                    </Label>
                    <Select value={skeletonBorder} onValueChange={setSkeletonBorder}>
                      <SelectTrigger id="skeleton-border" className="bg-white border-slate-200 focus:ring-cyan-500">
                        <SelectValue placeholder="Select border" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rounded-none">None</SelectItem>
                        <SelectItem value="rounded-sm">Small</SelectItem>
                        <SelectItem value="rounded-md">Medium</SelectItem>
                        <SelectItem value="rounded-lg">Large</SelectItem>
                        <SelectItem value="rounded-full">Full</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skeleton-border-color" className="text-slate-700">
                      Border Color
                    </Label>
                    <Select value={skeletonBorderColor} onValueChange={setSkeletonBorderColor}>
                      <SelectTrigger
                        id="skeleton-border-color"
                        className="bg-white border-slate-200 focus:ring-cyan-500"
                      >
                        <SelectValue placeholder="Select border color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="border-gray-200">Gray</SelectItem>
                        <SelectItem value="border-slate-200">Slate</SelectItem>
                        <SelectItem value="border-zinc-200">Zinc</SelectItem>
                        <SelectItem value="border-neutral-200">Neutral</SelectItem>
                        <SelectItem value="border-stone-200">Stone</SelectItem>
                        <SelectItem value="border-cyan-200">Cyan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-bg" className="text-slate-700">
                      Default Background
                    </Label>
                    <Select value={defaultBgClass} onValueChange={setDefaultBgClass}>
                      <SelectTrigger id="default-bg" className="bg-white border-slate-200 focus:ring-cyan-500">
                        <SelectValue placeholder="Select background" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bg-white">White</SelectItem>
                        <SelectItem value="bg-gray-50">Gray 50</SelectItem>
                        <SelectItem value="bg-slate-50">Slate 50</SelectItem>
                        <SelectItem value="bg-transparent">Transparent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="color-degree" className="text-slate-700">
                      Color Intensity: <span className="font-medium text-cyan-600">{maxColorDegree}</span>
                    </Label>
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <span>Lighter</span>
                      <span className="mx-1">—</span>
                      <span>Darker</span>
                    </div>
                  </div>
                  <Slider
                    id="color-degree"
                    min={50}
                    max={950}
                    step={50}
                    value={[maxColorDegree]}
                    onValueChange={(value) => setMaxColorDegree(value[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>50</span>
                    <span>950</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side Controls */}
            <div className="flex flex-col">
              <Alert className="bg-gradient-to-r from-amber-50 to-amber-100/70 border-amber-200/50 text-amber-800 mb-4 shadow-sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <AlertDescription>
                  This tool is currently in beta and serves as a base for future updates. It is not a full product yet.
                </AlertDescription>
              </Alert>
            </div>

            {/* Right Side Controls */}
            <div className="flex flex-wrap gap-2 items-center justify-end mb-4">
              <div className="text-sm text-slate-500 mr-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-200/50">
                <span className="font-medium text-cyan-600">{generatedCount}</span> skeletons generated
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={shareOnTwitter}
                      className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:bg-cyan-50/50 hover:border-cyan-200/50 transition-all duration-200"
                    >
                      <Share2 className="h-4 w-4 mr-1 text-cyan-600" /> Share
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("https://github.com/username/ui-to-skeleton/issues/new", "_blank")}
                      className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:bg-cyan-50/50 hover:border-cyan-200/50 transition-all duration-200"
                    >
                      <AlertTriangle className="h-4 w-4 mr-1 text-cyan-600" /> Report Issue
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Report an issue on GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFullPreview(!fullPreview)}
                      className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:bg-cyan-50/50 hover:border-cyan-200/50 transition-all duration-200"
                    >
                      <ExternalLink className="h-4 w-4 mr-1 text-cyan-600" /> Full Preview
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View in full screen</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                size="sm"
                onClick={generateSkeleton}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Code className="h-4 w-4 mr-1" /> Generate Skeleton
              </Button>
            </div>
          </div>

          {/* Large Rectangle Ad Banner */}
          {/* <div className="bg-white/80 backdrop-blur-sm p-4 text-center border border-slate-200/50 rounded-xl mb-8 shadow-md">
            <div className="text-sm text-slate-500 mb-2 font-medium">Advertisement</div>
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200/50 h-60 flex items-center justify-center rounded-lg">
              <div className="text-slate-400">Large Rectangle Ad (336x280)</div>
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="flex flex-col">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/50 shadow-lg transition-all duration-300 hover:shadow-xl h-[calc(100vh-520px)]">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-3 border-b font-mono text-sm text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex space-x-2 mr-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="opacity-80">Component Code</span>
                  </div>
                  <div className="text-xs bg-slate-700/50 px-2 py-1 rounded">{uiFormat.toUpperCase()}</div>
                </div>
                <div className="h-[calc(100%-43px)]">
                  <MonacoEditor
                    height="100%"
                    language={uiFormat === "jsx" ? "javascript" : "html"}
                    theme="vs-dark"
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                      wordWrap: "on",
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="flex flex-col">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/50 shadow-lg transition-all duration-300 hover:shadow-xl h-[calc(100vh-520px)]">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <div className="bg-slate-100/80 backdrop-blur-sm p-3 border-b border-slate-200/50 flex justify-between items-center">
                    <TabsList className="grid w-48 grid-cols-2 bg-slate-200/70">
                      <TabsTrigger
                        value="ui"
                        className="data-[state=active]:bg-white data-[state=active]:text-cyan-700 data-[state=active]:shadow-sm"
                      >
                        UI
                      </TabsTrigger>
                      <TabsTrigger
                        value="skeleton"
                        className="data-[state=active]:bg-white data-[state=active]:text-cyan-700 data-[state=active]:shadow-sm"
                      >
                        Skeleton
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center space-x-1 bg-slate-200/70 p-1 rounded-md">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-8 w-8 p-0",
                                previewDevice === "desktop" && "bg-white text-cyan-700 shadow-sm",
                              )}
                              onClick={() => setPreviewDevice("desktop")}
                            >
                              <Monitor className="h-4 w-4" />
                              <span className="sr-only">Desktop</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Desktop view</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-8 w-8 p-0",
                                previewDevice === "tablet" && "bg-white text-cyan-700 shadow-sm",
                              )}
                              onClick={() => setPreviewDevice("tablet")}
                            >
                              <Tablet className="h-4 w-4" />
                              <span className="sr-only">Tablet</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Tablet view</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-8 w-8 p-0",
                                previewDevice === "mobile" && "bg-white text-cyan-700 shadow-sm",
                              )}
                              onClick={() => setPreviewDevice("mobile")}
                            >
                              <Smartphone className="h-4 w-4" />
                              <span className="sr-only">Mobile</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mobile view</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="h-[calc(100%-57px)] overflow-auto bg-white">
                    <TabsContent value="ui" className="mt-0 h-full">
                      <div className="flex items-center justify-center h-full">
                        <div
                          className={cn(
                            "transform transition-all duration-300",
                            previewDevice === "desktop" && "w-full max-w-md",
                            previewDevice === "tablet" && "w-full max-w-sm",
                            previewDevice === "mobile" && "w-full max-w-xs",
                          )}
                        >
                          {isValid ? (
                            <iframe
                              title="preview"
                              srcDoc={`
                                <html>
                                  <head>
                                    <script src="https://cdn.tailwindcss.com"></script>
                                    <style>
                                      body {
                                        margin: 0;
                                        padding: 0;
                                      }
                                    </style>
                                  </head>
                                  <body>
                                    ${code}
                                  </body>
                                </html>
                              `}
                              className="w-full h-full border-0 min-h-[300px]"
                            />
                          ) : (
                            <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                              <p className="font-medium">Invalid HTML/JSX</p>
                              <p className="text-sm mt-1">Please check your code for syntax errors.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="skeleton" className="mt-0 h-full">
                      {skeletonGenerated ? (
                        <div className="flex flex-col h-full p-6">
                          <div className="flex items-center justify-center flex-1">
                            <div
                              className={cn(
                                "transform transition-all duration-300",
                                previewDevice === "desktop" && "w-full max-w-md",
                                previewDevice === "tablet" && "w-full max-w-sm",
                                previewDevice === "mobile" && "w-full max-w-xs",
                              )}
                            >
                              <iframe
                                title="skeleton-preview"
                                srcDoc={`
                                  <html>
                                    <head>
                                      <script src="https://cdn.tailwindcss.com"></script>
                                      <style>
                                        body {
                                          margin: 0;
                                          padding: 0;
                                        }
                                        @keyframes pulse {
                                          0%, 100% {
                                            opacity: 1;
                                          }
                                          50% {
                                            opacity: 0.5;
                                          }
                                        }
                                        .animate-pulse {
                                          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                                        }
                                      </style>
                                    </head>
                                    <body>
                                      ${skeletonCode}
                                    </body>
                                  </html>
                                `}
                                className="w-full h-full border-0 min-h-[200px]"
                              />
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 relative">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium text-slate-700">Generated Skeleton Code:</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={copyToClipboard}
                                className="text-slate-500 hover:text-cyan-600"
                              >
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                <span className="ml-1">{copied ? "Copied!" : "Copy"}</span>
                              </Button>
                            </div>
                            <pre className="bg-gradient-to-r from-slate-800 to-slate-900 p-3 rounded-md text-slate-100 text-xs overflow-auto max-h-40 shadow-inner">
                              <code>{skeletonCode}</code>
                            </pre>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center bg-slate-50 p-8 rounded-xl border border-slate-200 shadow-sm max-w-md">
                            <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 rounded-full flex items-center justify-center">
                              <Code className="h-8 w-8 text-cyan-600" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-800 mb-2">Ready to Generate</h3>
                            <p className="text-slate-500 mb-6">
                              Click "Generate Skeleton" to create your skeleton loader based on your configuration
                            </p>
                            <Button
                              onClick={generateSkeleton}
                              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                            >
                              Generate Now
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      {fullPreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto border border-slate-200/50 animate-in fade-in zoom-in-95 duration-300">
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-slate-50 to-slate-100">
              <h3 className="font-medium text-slate-700 flex items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mr-3 shadow-sm">
                  <ExternalLink className="h-4 w-4" />
                </div>
                Full Preview
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFullPreview(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>
            <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100">
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-1 bg-white p-1 rounded-md shadow-sm border border-slate-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 px-3",
                      previewDevice === "desktop" && "bg-cyan-50 text-cyan-700 shadow-sm border border-cyan-100",
                    )}
                    onClick={() => setPreviewDevice("desktop")}
                  >
                    <Monitor className="h-4 w-4 mr-1" /> Desktop
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 px-3",
                      previewDevice === "tablet" && "bg-cyan-50 text-cyan-700 shadow-sm border border-cyan-100",
                    )}
                    onClick={() => setPreviewDevice("tablet")}
                  >
                    <Tablet className="h-4 w-4 mr-1" /> Tablet
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 px-3",
                      previewDevice === "mobile" && "bg-cyan-50 text-cyan-700 shadow-sm border border-cyan-100",
                    )}
                    onClick={() => setPreviewDevice("mobile")}
                  >
                    <Smartphone className="h-4 w-4 mr-1" /> Mobile
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div
                  className={cn(
                    "bg-white p-8 rounded-xl shadow-lg border border-slate-200 transition-all duration-300",
                    previewDevice === "desktop" && "w-full max-w-2xl",
                    previewDevice === "tablet" && "w-full max-w-md",
                    previewDevice === "mobile" && "w-full max-w-xs",
                  )}
                >
                  {activeTab === "ui" ? (
                    <iframe
                      title="full-preview"
                      srcDoc={`
                        <html>
                          <head>
                            <script src="https://cdn.tailwindcss.com"></script>
                            <style>
                              body {
                                margin: 0;
                                padding: 0;
                              }
                            </style>
                          </head>
                          <body>
                            ${code}
                          </body>
                        </html>
                      `}
                      className="w-full h-[400px] border-0"
                    />
                  ) : (
                    <iframe
                      title="skeleton-full-preview"
                      srcDoc={`
                        <html>
                          <head>
                            <script src="https://cdn.tailwindcss.com"></script>
                            <style>
                              body {
                                margin: 0;
                                padding: 0;
                              }
                              @keyframes pulse {
                                0%, 100% {
                                  opacity: 1;
                                }
                                50% {
                                  opacity: 0.5;
                                }
                              }
                              .animate-pulse {
                                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                              }
                            </style>
                          </head>
                          <body>
                            ${skeletonCode}
                          </body>
                        </html>
                      `}
                      className="w-full h-[400px] border-0"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-white flex justify-between items-center">
              <div className="text-sm text-slate-500">
                <span className="font-medium text-cyan-600">{generatedCount}</span> skeletons generated
              </div>
              <div className="flex gap-2">
                {activeTab === "skeleton" && skeletonGenerated && (
                  <Button
                    variant="outline"
                    onClick={copyToClipboard}
                    className="border-cyan-200 text-cyan-700 hover:bg-cyan-50"
                  >
                    {copied ? <Check className="h-4 w-4 mr-1 text-green-500" /> : <Copy className="h-4 w-4 mr-1" />}
                    {copied ? "Copied!" : "Copy Code"}
                  </Button>
                )}
                <Button
                  onClick={() => setFullPreview(false)}
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

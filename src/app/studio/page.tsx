"use client"
import { Share2, AlertTriangle, ExternalLink, Code, Copy, Check, Zap, Monitor, Smartphone, Tablet } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSkeletonStore } from "@/lib/store"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

export default function CodeEditor() {
  // Get state and actions from Zustand store
  const {
    // UI Format and Styling Options
    uiFormat,
    stylingFormat,
    exportFormat,
    setUiFormat,
    setStylingFormat,
    setExportFormat,

    // Code state
    code,
    skeletonCode,
    skeletonGenerated,
    copied,
    isValid,
    setCode,
    setCopied,
    setIsValid,

    // Skeleton Configuration
    skeletonColor,
    skeletonBorder,
    skeletonBorderColor,
    maxColorDegree,
    defaultBgClass,
    setSkeletonColor,
    setSkeletonBorder,
    setSkeletonBorderColor,
    setMaxColorDegree,
    setDefaultBgClass,

    // UI State
    activeTab,
    fullPreview,
    generatedCount,
    previewDevice,
    setActiveTab,
    setFullPreview,
    setPreviewDevice,

    // Actions
    generateSkeleton,
  } = useSkeletonStore()

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

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || ""
    setCode(newCode)
    setIsValid(validateHtml(newCode))
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
      <Header/>
     

      <div className="container mx-auto px-4 py-6">
        {/* Beta Alert - Full Width */}
        <Alert className="bg-gradient-to-r from-amber-50 to-amber-100/70 border-amber-200/50 text-amber-800 mb-6 shadow-sm">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>
            This tool is currently in beta and serves as a base for future updates. It is not a full product yet.
          </AlertDescription>
        </Alert>

        {/* Configuration Accordions */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl">
          <Accordion type="single" collapsible defaultValue="skeleton-config">
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
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

                  <div className="space-y-2">
                    <Label htmlFor="color-degree" className="text-slate-700">
                      Color Intensity
                    </Label>
                    <Select
                      value={maxColorDegree.toString()}
                      onValueChange={(value) => setMaxColorDegree(Number.parseInt(value))}
                    >
                      <SelectTrigger id="color-degree" className="bg-white border-slate-200 focus:ring-cyan-500">
                        <SelectValue placeholder="Select intensity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 (Lightest)</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="200">200</SelectItem>
                        <SelectItem value="300">300</SelectItem>
                        <SelectItem value="400">400</SelectItem>
                        <SelectItem value="500">500 (Medium)</SelectItem>
                        <SelectItem value="600">600</SelectItem>
                        <SelectItem value="700">700</SelectItem>
                        <SelectItem value="800">800</SelectItem>
                        <SelectItem value="900">900</SelectItem>
                        <SelectItem value="950">950 (Darkest)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="export-format" className="text-slate-700">
                      Export Format
                    </Label>
                    <Select value={exportFormat} onValueChange={setExportFormat}>
                      <SelectTrigger id="export-format" className="bg-white border-slate-200 focus:ring-cyan-500">
                        <SelectValue placeholder="Select export format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="jsx">JSX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Main Content */}
        <div className="mb-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="flex flex-col">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/50 shadow-lg transition-all duration-300 hover:shadow-xl h-[calc(100vh-420px)]">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-3 border-b font-mono text-sm text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex space-x-2 mr-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="opacity-80">Component Code</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select value={uiFormat} onValueChange={setUiFormat}>
                      <SelectTrigger className="h-7 min-w-[100px] bg-slate-700/50 border-slate-600 text-white text-xs">
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="jsx">JSX</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={stylingFormat} onValueChange={setStylingFormat}>
                      <SelectTrigger className="h-7 min-w-[100px] bg-slate-700/50 border-slate-600 text-white text-xs">
                        <SelectValue placeholder="Styling" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tailwind">Tailwind</SelectItem>
                        <SelectItem value="css" disabled>
                          CSS (Soon)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
              <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/50 shadow-lg transition-all duration-300 hover:shadow-xl h-[calc(100vh-420px)]">
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

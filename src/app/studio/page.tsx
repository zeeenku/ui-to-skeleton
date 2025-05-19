"use client"

import {
  Share2,
  AlertTriangle,
  ExternalLink,
  Copy,
  Zap,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  EyeOff,
  Check,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSkeletonStore } from "@/lib/store"
import dynamic from "next/dynamic"
import ShareDialog from "@/components/share-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useEffect } from "react"

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
    uiCode,
    skeletonCode,
    skeletonGenerated,
    skeletonModified,
    copied,
    isValid,
    setUiCode,
    setSkeletonCode,
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
    activeCodeTab,
    fullPreview,
    showEditors,
    generatedCount,
    previewDevice,
    shareDialogOpen,
    showToast,
    toastMessage,
    unsavedChangesAlert,
    setActiveTab,
    setActiveCodeTab,
    setFullPreview,
    setShowEditors,
    setPreviewDevice,
    setShareDialogOpen,
    setShowToast,
    setUnsavedChangesAlert,

    // Actions
    generateSkeleton,
    copySkeletonCode,
  } = useSkeletonStore()


   useEffect(() => {
    if (showToast) {
      toast.success(toastMessage || 'Success!');
      setShowToast(false); // Reset the flag after showing
    }
  }, [showToast, toastMessage, setShowToast]);
  
  // Validate HTML
  const validateHtml = (htmlString:string) => {
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

  const handleEditorChange = (value: string | undefined, type: string) => {
    const newCode = value || ""
    if (type === "ui") {
      setUiCode(newCode)
      setIsValid(validateHtml(newCode))
    } else {
      setSkeletonCode(newCode)
    }
  }

  const toggleFullPreview = () => {
    setFullPreview(!fullPreview)
    if (!fullPreview) {
      setShowEditors(false)
    }
  }

  const toggleEditors = () => {
    setShowEditors(!showEditors)
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Ad Banner */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm p-3 text-center text-sm text-slate-700 border-b border-cyan-200/30 sticky top-0 z-40">
        <span className="font-medium">Sponsored:</span> Try our new premium templates for advanced skeleton loaders
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Beta Alert - Full Width */}
        <Alert className="bg-gradient-to-r from-amber-50 to-amber-100/70 border-amber-200/50 text-amber-800 mb-6 shadow-sm">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>
            This tool is currently in beta and serves as a base for future updates. It is not a full product yet.
          </AlertDescription>
        </Alert>

        {/* Skeleton Configuration - All in one line for desktop */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white mr-3 shadow-sm">
                <Zap className="h-4 w-4" />
              </div>
              <span className="font-medium text-slate-700">Skeleton Configuration</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 flex-1">
              <div>
                <Select value={skeletonColor} onValueChange={setSkeletonColor}>
                  <SelectTrigger className="h-9 bg-white border-slate-200 focus:ring-cyan-500">
                    <SelectValue placeholder="Color" />
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

              <div>
                <Select value={skeletonBorder} onValueChange={setSkeletonBorder}>
                  <SelectTrigger className="h-9 bg-white border-slate-200 focus:ring-cyan-500">
                    <SelectValue placeholder="Border" />
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

              <div>
                <Select value={skeletonBorderColor} onValueChange={setSkeletonBorderColor}>
                  <SelectTrigger className="h-9 bg-white border-slate-200 focus:ring-cyan-500">
                    <SelectValue placeholder="Border Color" />
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

              <div>
                <Select value={defaultBgClass} onValueChange={setDefaultBgClass}>
                  <SelectTrigger className="h-9 bg-white border-slate-200 focus:ring-cyan-500">
                    <SelectValue placeholder="Background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-white">White</SelectItem>
                    <SelectItem value="bg-gray-50">Gray 50</SelectItem>
                    <SelectItem value="bg-slate-50">Slate 50</SelectItem>
                    <SelectItem value="bg-transparent">Transparent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select
                  value={maxColorDegree.toString()}
                  onValueChange={(value) => setMaxColorDegree(Number.parseInt(value))}
                >
                  <SelectTrigger className="h-9 bg-white border-slate-200 focus:ring-cyan-500">
                    <SelectValue placeholder="Intensity" />
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

              <div>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger className="h-9 bg-white border-slate-200 focus:ring-cyan-500">
                    <SelectValue placeholder="Export Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="jsx">JSX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
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
                    onClick={() => setShareDialogOpen(true)}
                    className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:bg-cyan-50/50 hover:border-cyan-200/50 transition-all duration-200"
                  >
                    <Share2 className="h-4 w-4 mr-1 text-cyan-600" /> Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share with others</p>
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
                    onClick={toggleFullPreview}
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
              onClick={copySkeletonCode}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Copy className="h-4 w-4 mr-1" /> Copy Skeleton Code
            </Button>
          </div>

          {fullPreview ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/50 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="bg-slate-100/80 backdrop-blur-sm p-3 border-b border-slate-200/50 flex justify-between items-center">
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" onClick={toggleEditors} className="mr-4">
                    {showEditors ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-1" /> Hide Editors
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-1" /> Show Editors
                      </>
                    )}
                  </Button>
                  <TabsList className="grid w-48 grid-cols-2 bg-slate-200/70">
                    <TabsTrigger
                      value="ui"
                      onClick={() => setActiveTab("ui")}
                      className={cn(
                        "data-[state=active]:bg-white data-[state=active]:text-cyan-700 data-[state=active]:shadow-sm",
                        activeTab === "ui" && "bg-white text-cyan-700 shadow-sm",
                      )}
                    >
                      UI
                    </TabsTrigger>
                    <TabsTrigger
                      value="skeleton"
                      onClick={() => setActiveTab("skeleton")}
                      className={cn(
                        "data-[state=active]:bg-white data-[state=active]:text-cyan-700 data-[state=active]:shadow-sm",
                        activeTab === "skeleton" && "bg-white text-cyan-700 shadow-sm",
                      )}
                    >
                      Skeleton
                    </TabsTrigger>
                  </TabsList>
                </div>

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

              <div className="flex flex-col md:flex-row h-[calc(100vh-300px)]">
                {showEditors && (
                  <div className="w-full md:w-1/2 border-r border-slate-200/50">
                    <Tabs value={activeCodeTab} onValueChange={setActiveCodeTab} className="h-full">
                      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-3 border-b font-mono text-sm text-white flex items-center justify-between">
                        <TabsList className="grid w-48 grid-cols-2 bg-slate-700/50">
                          <TabsTrigger
                            value="ui"
                            className="data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                          >
                            UI Code
                          </TabsTrigger>
                          <TabsTrigger
                            value="skeleton"
                            className="data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                          >
                            Skeleton Code
                          </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center space-x-2">
                          {activeCodeTab === "ui" ? (
                            <>
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
                            </>
                          ) : (
                            <Select value={exportFormat} onValueChange={setExportFormat}>
                              <SelectTrigger className="h-7 min-w-[100px] bg-slate-700/50 border-slate-600 text-white text-xs">
                                <SelectValue placeholder="Format" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="html">HTML</SelectItem>
                                <SelectItem value="jsx">JSX</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>

                      <TabsContent value="ui" className="h-[calc(100%-43px)] m-0">
                        <MonacoEditor
                          height="100%"
                          language={uiFormat === "jsx" ? "javascript" : "html"}
                          theme="vs-dark"
                          value={uiCode}
                          onChange={(value) => handleEditorChange(value, "ui")}
                          options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            fontSize: 14,
                            wordWrap: "on",
                            automaticLayout: true,
                          }}
                        />
                      </TabsContent>

                      <TabsContent value="skeleton" className="h-[calc(100%-43px)] m-0">
                        <MonacoEditor
                          height="100%"
                          language={exportFormat === "jsx" ? "javascript" : "html"}
                          theme="vs-dark"
                          value={skeletonCode}
                          onChange={(value) => handleEditorChange(value, "skeleton")}
                          options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            fontSize: 14,
                            wordWrap: "on",
                            automaticLayout: true,
                          }}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                <div className={cn("h-full", showEditors ? "w-full md:w-1/2" : "w-full")}>
                  <div className="h-full p-6 flex items-center justify-center bg-white">
                    <div
                      className={cn(
                        "transform transition-all duration-300",
                        previewDevice === "desktop" && "w-full max-w-md",
                        previewDevice === "tablet" && "w-full max-w-sm",
                        previewDevice === "mobile" && "w-full max-w-xs",
                      )}
                    >
                      {activeTab === "ui" ? (
                        isValid ? (
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
                                  ${uiCode}
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
                        )
                      ) : (
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
                          className="w-full h-full border-0 min-h-[300px]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Editor */}
              <div className="flex flex-col">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/50 shadow-lg transition-all duration-300 hover:shadow-xl h-[calc(100vh-420px)]">
                  <Tabs value={activeCodeTab} onValueChange={setActiveCodeTab} className="h-full">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-3 border-b font-mono text-sm text-white flex items-center justify-between">
                      <TabsList className="grid w-48 grid-cols-2 bg-slate-700/50">
                        <TabsTrigger
                          value="ui"
                          className="data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                        >
                          UI Code
                        </TabsTrigger>
                        <TabsTrigger
                          value="skeleton"
                          className="data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                        >
                          Skeleton Code
                        </TabsTrigger>
                      </TabsList>

                      <div className="flex items-center space-x-2">
                        {activeCodeTab === "ui" ? (
                          <>
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
                          </>
                        ) : (
                          <Select value={exportFormat} onValueChange={setExportFormat}>
                            <SelectTrigger className="h-7 min-w-[100px] bg-slate-700/50 border-slate-600 text-white text-xs">
                              <SelectValue placeholder="Format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="html">HTML</SelectItem>
                              <SelectItem value="jsx">JSX</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>

                    <TabsContent value="ui" className="h-[calc(100%-43px)] m-0">
                      <MonacoEditor
                        height="100%"
                        language={uiFormat === "jsx" ? "javascript" : "html"}
                        theme="vs-dark"
                        value={uiCode}
                        onChange={(value) => handleEditorChange(value, "ui")}
                        options={{
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          fontSize: 14,
                          wordWrap: "on",
                          automaticLayout: true,
                        }}
                      />
                    </TabsContent>

                    <TabsContent value="skeleton" className="h-[calc(100%-43px)] m-0">
                      <MonacoEditor
                        height="100%"
                        language={exportFormat === "jsx" ? "javascript" : "html"}
                        theme="vs-dark"
                        value={skeletonCode}
                        onChange={(value) => handleEditorChange(value, "skeleton")}
                        options={{
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          fontSize: 14,
                          wordWrap: "on",
                          automaticLayout: true,
                        }}
                      />
                    </TabsContent>
                  </Tabs>
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
                                      ${uiCode}
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
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center bg-slate-50 p-8 rounded-xl border border-slate-200 shadow-sm max-w-md">
                              <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 rounded-full flex items-center justify-center">
                                <Copy className="h-8 w-8 text-cyan-600" />
                              </div>
                              <h3 className="text-lg font-medium text-slate-800 mb-2">Ready to Generate</h3>
                              <p className="text-slate-500 mb-6">
                                Click "Copy Skeleton Code" to generate and copy your skeleton loader based on your
                                configuration
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
          )}
        </div>
      </div>

      {/* Share Dialog */}
      <ShareDialog />

      {/* Unsaved Changes Alert */}
      <AlertDialog open={unsavedChangesAlert} onOpenChange={setUnsavedChangesAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Skeleton Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have made changes to the skeleton code. Generating a new skeleton will overwrite your changes. Do you
              want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={generateSkeleton}>Generate New Skeleton</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

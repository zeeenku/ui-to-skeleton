"use client"

import { Share2, AlertTriangle, ExternalLink, Copy, Zap, Monitor, Smartphone, Tablet, Eye, EyeOff } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSkeletonStore } from "@/lib/store"
import dynamic from "next/dynamic"
import ShareDialog from "@/components/share-dialog"
import LayoutToggle from "@/components/layout-toggle"
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
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import SkeletonConfiguration from "@/features/studio/components/skeleton-config"
import Head from "next/head"
import { Editors } from "@/features/studio/editors"

//todo: use react query for generated count
// Dynamically import Monaco Editor to avoid SSR issues
const getOpenIssueLInk = () => {
  return "https://github.com/zeeenku/ui-to-skeleton/issues/new";
}
export default function CodeEditor() {
  // Get state and actions from Zustand store
  const [uiCode, setUiCode] = useState(localStorage.getItem("ui_code")?? "");
    const [skeletonCode, setSkeletonCode] = useState(localStorage.getItem("skeleton_code")?? "");
    const [isSkeletonUpdated, setIsSKeletonUpdated] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [uiFormat, setUiFormat] = useState("html");
    const [exportFormat, setExportFormat] = useState("jsx");
    const [activeCodeTab, setActiveCodeTab] = useState("ui");
    const [stylingFormat, setStylingFormat] = useState("tailwind");
    let skeletonGenerated = "hh";
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const {


    // UI State
    activeTab,
    fullPreview,
    showEditors,
    generatedCount,
    previewDevice,
    showToast,
    toastMessage,
    unsavedChangesAlert,
    layoutMode, // New state
    setActiveTab,
    setFullPreview,
    setShowEditors,
    setPreviewDevice,
    setShowToast,
    setUnsavedChangesAlert,
    setLayoutMode, // New action

    // Actions
    generateSkeleton,
    copySkeletonCode,
  } = useSkeletonStore()

  useEffect(() => {
    if (showToast) {
      toast.success(toastMessage || "Success!")
      setShowToast(false) // Reset the flag after showing
    }
  }, [showToast, toastMessage, setShowToast])

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


  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <Head>
          <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Header/>

      <div className="container mx-auto px-4 py-6">
        {/* Beta Alert - Full Width */}
        <Alert className="bg-gradient-to-r from-cyan-50 to-cyan-100/70 border-cyan-200/50 text-cyan-800 mb-6 shadow-sm">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>
            This tool is currently in alpha. It is best for a good base to add updates to. It is not a full product yet.
          </AlertDescription>
        </Alert>

        
        <SkeletonConfiguration />

        {/* Main Content */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
            <div className="flex items-center gap-2">

              {/* Layout Toggle */}
              <LayoutToggle
                currentMode={layoutMode}
                onChange={setLayoutMode}
                className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm"
              />

              <div className="text-sm text-slate-500 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-200/50">
                <span className="font-medium text-cyan-600">{generatedCount}</span> skeletons generated
              </div>
            </div>


            <div className="flex flex-wrap gap-2 items-center">
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

              {/* Share Dialog */}
              <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(getOpenIssueLInk(), "_blank")}
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


              <Button
                size="sm"
                onClick={copySkeletonCode}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Copy className="h-4 w-4 mr-1" /> Copy Skeleton Code
              </Button>
            </div>
          </div>

          
            <div
              className={cn(
                "grid gap-6",
                layoutMode === "split" && "grid-cols-1 md:grid-cols-2",
                layoutMode === "editor" && "grid-cols-1",
                layoutMode === "preview" && "grid-cols-1",
              )}
            >
              {/* Editor */}
              {(layoutMode === "split" || layoutMode === "editor") && (
               <Editors/>
              )}

              {/* Preview */}
              {(layoutMode === "split" || layoutMode === "preview") && (
                <div className="flex flex-col">
                  <div
                    className={cn(
                      "bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/50 shadow-lg transition-all duration-300 hover:shadow-xl",
                      layoutMode === "preview" ? "h-[calc(100vh-300px)]" : "h-[calc(100vh-420px)]",
                    )}
                  >
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
              )}
            </div>
          
        </div>
      </div>



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

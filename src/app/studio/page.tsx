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
import { Previews } from "@/features/studio/components/previews"

//todo: use react query for generated count
// Dynamically import Monaco Editor to avoid SSR issues
const getOpenIssueLInk = () => {
  return "https://github.com/zeeenku/ui-to-skeleton/issues/new";
}
export default function CodeEditor() {
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
                <Previews/>
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

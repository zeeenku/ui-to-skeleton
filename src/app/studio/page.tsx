"use client"

import { Share2, AlertTriangle, ExternalLink, Copy, Zap, Monitor, Smartphone, Tablet, Eye, EyeOff } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSkeletonStore } from "@/features/studio/stores"
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
import { SetStateAction, useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import SkeletonConfiguration from "@/features/studio/components/skeleton-config"
import Head from "next/head"
import { Editors } from "@/features/studio/components/editors"
import { Previews } from "@/features/studio/components/previews"
import { LayoutMode } from "@/features/studio/types"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { ActionsSection } from "@/features/studio/components/actions-section"

//todo: use react query for generated count
// Dynamically import Monaco Editor to avoid SSR issues

export default function CodeEditor() {

  const [layoutMode, setLayoutMode] = useLocalStorage<LayoutMode>("studio_split_mode","split");

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

        {/* Beta Alert */}
        <Alert className="bg-gradient-to-r from-cyan-50 to-cyan-100/70 border-cyan-200/50 text-cyan-800 mb-6 shadow-sm">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>
            This tool is currently in alpha. It is best for a good base to add updates to. It is not a full product yet.
          </AlertDescription>
        </Alert>

        
        <SkeletonConfiguration />

        <div className="mb-8">

            <ActionsSection layoutMode={layoutMode} setLayoutMode={setLayoutMode} />
          
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

    </div>
  )
}

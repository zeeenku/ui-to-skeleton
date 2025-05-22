"use client"

import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import SkeletonConfiguration from "@/features/studio/components/skeleton-config"
import { Editors } from "@/features/studio/components/editors"
import { Previews } from "@/features/studio/components/previews"
import { LayoutMode } from "@/features/studio/types"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { ActionsSection } from "@/features/studio/components/actions-section"
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { SkeletonGeneratorHandler } from "@/features/studio/components/skeleton-generator-handler"

export default function CodeEditor() {

   const queryClient = new QueryClient();
  const [layoutMode, setLayoutMode] = useLocalStorage<LayoutMode>("studio_split_mode","split");

  return (
    <QueryClientProvider client={queryClient}>
    <div className="flex w-screen flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <Header/>
      <SkeletonGeneratorHandler/>
      <div className="container mx-auto px-4 py-6">

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

    </QueryClientProvider>
  )
}

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

export function Previews(){

        const [activeTab, setActiveTab] = useState("ui");
        const [previewDevice, setPreviewDevice] = useState("desktop");
        const [skeletonCode, setSkeletonCode] = useState("");
        const [uiCode, setUiCode] = useState("");

    const [isValid, setIsValid] = useState(true);
    function generateSkeleton() {
        throw new Error("Function not implemented.")
    }

    return(
        <div className="flex flex-col">
                  <div
                    className={cn(
                      "bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/50 shadow-lg transition-all duration-300 hover:shadow-xl",
                      "h-[calc(100vh-300px)]",
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
                          {skeletonCode ? (
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
    );
}
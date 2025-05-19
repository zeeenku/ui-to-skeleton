"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSkeletonStore } from "@/lib/store"
import dynamic from "next/dynamic"

import { toast } from "sonner"
import { useEffect } from "react"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })
export function Editors(){
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
    isValid,
    setUiCode,
    setSkeletonCode,
    setIsValid,


    // UI State
    activeTab,
    activeCodeTab,
    fullPreview,
    showEditors,
    generatedCount,
    previewDevice,
    showToast,
    toastMessage,
    unsavedChangesAlert,
    layoutMode, // New state
    setActiveTab,
    setActiveCodeTab,
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
         <div className="flex flex-col">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/50 shadow-lg transition-all duration-300 hover:shadow-xl h-[calc(100vh-420px)]">
                    <Tabs value={activeCodeTab} onValueChange={setActiveCodeTab} className="h-full">
                      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-3 border-b font-mono text-sm text-white flex items-center justify-between">
                        <TabsList className="grid w-48 grid-cols-2 bg-slate-700/50">
                          <TabsTrigger
                            value="ui"
                            className="data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                          >
                            UI
                          </TabsTrigger>
                          <TabsTrigger
                            value="skeleton"
                            className="data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                          >
                            Skeleton
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

                      <TabsContent value="ui" className="h-screen m-0">
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

                      <TabsContent value="skeleton" className="h-screen m-0">
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
    );
}
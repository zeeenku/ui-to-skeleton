"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSkeletonStore } from "@/lib/store"
import dynamic from "next/dynamic"

import { toast } from "sonner"
import { useEffect, useState } from "react"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })


type CodeFileTabConfig = {
    format : string;
    styling: string;
};

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

export function Editors() {
  const uiConfigFormats = ["html"];
  const uiConfigStylings = ["tailwind"];
  const skeletonConfigFormats = ["html", "jsx"];
  const skeletonConfigStylings = ["tailwind"];

  const [uiCode, setUiCode] = useState(DEFAULT_HTML_CODE);
  const [skeletonCode, setSkeletonCode] = useState(DEFAULT_HTML_CODE);
  const [isSkeletonUpdated, setIsSkeletonUpdated] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [activeCodeTab, setActiveCodeTab] = useState("ui");

  const [uiConfig, setUiConfig] = useState<CodeFileTabConfig>({
    format: uiConfigFormats[0],
    styling: uiConfigStylings[0],
  });

  const [skeletonConfig, setSkeletonConfig] = useState<CodeFileTabConfig>({
    format: skeletonConfigFormats[0],
    styling: skeletonConfigStylings[0],
  });

  // Load from localStorage after mount
  useEffect(() => {
    const uiCodeLocal = localStorage.getItem("ui_code");
    const skeletonCodeLocal = localStorage.getItem("skeleton_code");

    if (uiCodeLocal) setUiCode(uiCodeLocal);
    if (skeletonCodeLocal) setSkeletonCode(skeletonCodeLocal);
  }, []);

  useEffect(() => {
    if (!isSkeletonUpdated) {
      setSkeletonCode(uiCode);
    } else {
      toast.warning("Skeleton has been modified. Review before overriding.");
    }
  }, [uiCode]);

  const validateHtml = (htmlString: string) => {
    try {
      if (typeof window !== "undefined") {
        const doc = new DOMParser().parseFromString(htmlString, "text/html");
        const errors = doc.querySelectorAll("parsererror");
        return errors.length === 0;
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleEditorChange = (value: string | undefined, type: string) => {
    const newCode = value || "";
    if (type === "ui") {
      if (isSkeletonUpdated) {
        toast.warning("Skeleton already modified. Please confirm overwrite.");
        return;
      }
      setUiCode(newCode);
      setIsValid(validateHtml(newCode));
    } else {
      setIsSkeletonUpdated(true);
      setSkeletonCode(newCode);
    }
  };

  // UI Config handlers
  const setUiConfigFormat = (value: string) => {
    setUiConfig((prev) => ({ ...prev, format: value }));
  };

  const setUiConfigStyling = (value: string) => {
    setUiConfig((prev) => ({ ...prev, styling: value }));
  };

  // Skeleton Config handlers
  const setSkeletonConfigFormat = (value: string) => {
    setSkeletonConfig((prev) => ({ ...prev, format: value }));
  };

  const setSkeletonConfigStyling = (value: string) => {
    setSkeletonConfig((prev) => ({ ...prev, styling: value }));
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-[#1e1e1e] shadow-lg transition-all duration-300 hover:shadow-xl h-[calc(100vh-420px)]">
        <Tabs value={activeCodeTab} onValueChange={setActiveCodeTab} className="h-full bg-[#1e1e1e] border border-[#1e1e1e]">
          <div className="border-none p-3 border-b bg-[#2d2d30] text-sm text-white flex items-center justify-between">
            <TabsList className="grid w-48 grid-cols-2 bg-[#3e3e42]">
              <TabsTrigger value="ui" className="text-white data-[state=active]:bg-[#1e1e1e]">
                UI
              </TabsTrigger>
              <TabsTrigger value="skeleton" className="text-white data-[state=active]:bg-[#1e1e1e]">
                Skeleton
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              {activeCodeTab === "ui" ? (
                <>
                  <Select value={uiConfig.format} onValueChange={setUiConfigFormat}>
                    <SelectTrigger className="h-7 min-w-[100px] bg-[#3e3e42] border-slate-600 text-white text-xs">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3e3e42]">
                      {uiConfigFormats.map((el) => (
                        <SelectItem className="bg-[#252526] hover:bg-[#252526] data-[state=active]:bg-[#252526] text-white" key={el} value={el}>
                          {el}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={uiConfig.styling} onValueChange={setUiConfigStyling}>
                    <SelectTrigger className="h-7 min-w-[100px] bg-[#3e3e42] border-slate-600 text-white text-xs">
                      <SelectValue placeholder="Styling" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3e3e42]">
                      {uiConfigStylings.map((el) => (
                        <SelectItem className="bg-[#252526] hover:bg-[#252526] data-[state=active]:bg-[#252526] text-white" key={el} value={el}>
                          {el}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              ) : (
                <>
                  <Select value={skeletonConfig.format} onValueChange={setSkeletonConfigFormat}>
                    <SelectTrigger className="h-7 min-w-[100px] bg-[#3e3e42] border-slate-600 text-white text-xs">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      {skeletonConfigFormats.map((el) => (
                        <SelectItem className="bg-[#252526] hover:bg-[#252526] data-[state=active]:bg-[#252526] text-white" key={el} value={el}>
                          {el}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={skeletonConfig.styling} onValueChange={setSkeletonConfigStyling}>
                    <SelectTrigger className="h-7 min-w-[100px] bg-[#3e3e42] border-slate-600 text-white text-xs">
                      <SelectValue placeholder="Styling" />
                    </SelectTrigger>
                    <SelectContent>
                      {skeletonConfigStylings.map((el) => (
                        <SelectItem className="bg-[#252526] hover:bg-[#252526] data-[state=active]:bg-[#252526] text-white" key={el} value={el}>
                          {el}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </div>

          <TabsContent value="ui" className="h-screen m-0 py-2">
            <MonacoEditor
              height="100%"
              language="html"
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

          <TabsContent value="skeleton" className="h-screen m-0 py-2">
            <MonacoEditor
              height="100%"
              language="html"
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

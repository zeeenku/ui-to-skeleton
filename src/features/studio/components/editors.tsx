"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import dynamic from "next/dynamic"
import * as monaco from 'monaco-editor';

import { useRef, useState } from "react"
import { UpdateUITabAlert } from "./code-tab-update-alert"
import { Copy } from "lucide-react";

import { useSkeletonStore } from "../stores";
import { skeletonCodeConfigFormats, skeletonCodeConfigStylings, uiCodeConfigFormats, uiCodeConfigStylings } from "../constants";
import { validateFormat } from "../func/validation";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })


export function Editors() {
  const {
    uiCode,
    setUiCode,
    skeletonCode,
    setSkeletonCode,
    uiCodeConfig,
    skeletonCodeConfig,
    setUiCodeConfig,
    setSkeletonCodeConfig,
    generateSkeleton,
  } = useSkeletonStore();

  // Internal UI state
  const uiCodeTabEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isSkeletonUpdated, setIsSkeletonUpdated] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState("ui");
  const [leftUICode, setLeftUICode] = useState("");
  const [codeCopied, setCodeCopied] = useState<"ui" | "skeleton" | null>(null);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    uiCodeTabEditorRef.current = editor;
  };

  const setuiCodeConfigFormat = (value: string) => {
    setUiCodeConfig({ format: value });
  };

  const setuiCodeConfigStyling = (value: string) => {
    setUiCodeConfig({ styling: value });
  };

  const setSkeletonCodeConfigFormat = (value: string) => {
    setSkeletonCodeConfig({ format: value });
  };

  const setSkeletonCodeConfigStyling = (value: string) => {
    setSkeletonCodeConfig({ styling: value });
  };

  const handleEditorChange = async (
    value: string | undefined,
    type: "ui" | "skeleton",
    forceUpdate = false
  ) => {
    const newCode = value || "";

    if (leftUICode && !forceUpdate) {
      setLeftUICode("");
      setUiCode(newCode);
      return;
    }

    const errors = await validateFormat(newCode, type);

    if (type === "ui") {
          setUiCodeConfig({ errors });
      if (errors.length > 0) return;

      if (isSkeletonUpdated && !forceUpdate) {
        setIsAlertShown(true);
        setLeftUICode(newCode);
        return;
      }

      setIsSkeletonUpdated(false);
      setIsAlertShown(false);
      setUiCode(newCode);
      generateSkeleton(); // uses current uiCode
      setSkeletonCodeConfig({ errors: [] });
    } else {
      setSkeletonCodeConfig({ errors });
      if (errors.length > 0) return;

      setIsSkeletonUpdated(true);
      setSkeletonCode(newCode);
    }
  };

  // Alert response handler
  const handleUserUpdateDecision = (choice: "continue" | "cancel") => {
    if (choice === "continue") {
      handleEditorChange(leftUICode, "ui", true);
      setLeftUICode("");
    } else {
      if (uiCodeTabEditorRef.current) {
        uiCodeTabEditorRef.current.setValue(uiCode);
        setLeftUICode("");
      }
    }
    setIsAlertShown(false);
  };

  // Copy logic
  const handleCopy = (str: string, type: "ui" | "skeleton") => {
    navigator.clipboard.writeText(str).then(() => {
      setCodeCopied(type);
      setTimeout(() => setCodeCopied(null), 2000);
    });
  };



  return (
    <div className="flex flex-col">

          <UpdateUITabAlert
        open={isAlertShown}
        onOpenChange={(open)=>setIsAlertShown(open)}
        onDecision={handleUserUpdateDecision}
      />
      <div className="bg-[#1e1e1e] overflow-hidden rounded-xl border border-[#1e1e1e] shadow-lg transition-all duration-300 hover:shadow-xl h-[calc(100dvh-4rem)]">
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
                  <Select value={uiCodeConfig.format} onValueChange={setuiCodeConfigFormat}>
                    <SelectTrigger className="h-7 min-w-[100px] bg-[#3e3e42] border-slate-600 text-white text-xs">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3e3e42]">
                      {uiCodeConfigFormats.map((el) => (
                        <SelectItem className="bg-[#252526] hover:bg-[#252526] data-[state=active]:bg-[#252526] text-white" key={el} value={el}>
                          {el}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={uiCodeConfig.styling} onValueChange={setuiCodeConfigStyling}>
                    <SelectTrigger className="h-7 min-w-[100px] bg-[#3e3e42] border-slate-600 text-white text-xs">
                      <SelectValue placeholder="Styling" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3e3e42]">
                      {uiCodeConfigStylings.map((el) => (
                        <SelectItem className="bg-[#252526] hover:bg-[#252526] data-[state=active]:bg-[#252526] text-white" key={el} value={el}>
                          {el}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              ) : (
                <>
                  <Select value={skeletonCodeConfig.format} onValueChange={setSkeletonCodeConfigFormat}>
                    <SelectTrigger className="h-7 min-w-[100px] bg-[#3e3e42] border-slate-600 text-white text-xs">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      {skeletonCodeConfigFormats.map((el) => (
                        <SelectItem className="bg-[#252526] hover:bg-[#252526] data-[state=active]:bg-[#252526] text-white" key={el} value={el}>
                          {el}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={skeletonCodeConfig.styling} onValueChange={setSkeletonCodeConfigStyling}>
                    <SelectTrigger className="h-7 min-w-[100px] bg-[#3e3e42] border-slate-600 text-white text-xs">
                      <SelectValue placeholder="Styling" />
                    </SelectTrigger>
                    <SelectContent>
                      {skeletonCodeConfigStylings.map((el) => (
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

          <TabsContent value="ui" className="m-0">
            <div className="flex items-center px-2 pb-3 justify-between">
                <div className="text-red-500  text-xs rounded-md py-1 px-2 font-semibold">
                    { uiCodeConfig.errors?.[0]?.message }
                </div>

                <button
                    onClick={() => handleCopy(uiCode,"ui")}
                    className="ml-4 flex justify-center items-center space-x-1 bg-[#3e3e42] rounded-md py-1 px-2 text-white text-xs"
                >
                    <Copy className="w-3 h-3"/>
                    <span>{codeCopied == "ui" ? 'copied!' : 'copy'}</span>
                </button>
            </div>
            <div className="h-[calc(100dvh-10rem)]">
            <MonacoEditor
              height="97%"
              language="html"
              theme="vs-dark"
              onMount={handleEditorDidMount}
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
            </div>
          </TabsContent>

          <TabsContent value="skeleton" className="m-0">
              <div className="flex items-center px-2 pb-3 justify-between">
                <div className="text-red-500  text-xs rounded-md py-1 px-2 font-semibold">
                    { skeletonCodeConfig.errors?.[0]?.message }
                </div>

                <button
                    onClick={() => handleCopy(skeletonCode,"ui")}
                    className="ml-4 flex justify-center items-center space-x-1 bg-[#3e3e42] rounded-md py-1 px-2 text-white text-xs"
                >
                    <Copy className="w-3 h-3"/>
                    <span>{codeCopied == "ui" ? 'copied!' : 'copy'}</span>
                </button>
            </div>
            <div className="h-[calc(100dvh-10rem)]">
                <MonacoEditor
                height="97%"
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

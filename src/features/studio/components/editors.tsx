"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as monaco from 'monaco-editor';

import { useRef, useState } from "react"
import { UpdateUITabAlert } from "./code-tab-update-alert"

import { useSkeletonStore } from "../stores";
import { validateFormat } from "../func/validation";
import { Editor } from "./editor";
import { CodeConfigSelector } from "./code-config-selector";


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

          <CodeConfigSelector type={"ui"}/>

          </div>
        <TabsContent value="ui" className="m-0">
          <Editor
            value={uiCode}
            onChange={(val) => handleEditorChange(val, "ui")}
            errors={uiCodeConfig.errors}
            onCopy={() => handleCopy(uiCode, "ui")}
            copied={codeCopied === "ui"}
            onMount={handleEditorDidMount}
          />
        </TabsContent>

        <TabsContent value="skeleton" className="m-0">
          <Editor
            value={skeletonCode}
            onChange={(val) => handleEditorChange(val, "skeleton")}
            errors={skeletonCodeConfig.errors}
            onCopy={() => handleCopy(skeletonCode, "skeleton")}
            copied={codeCopied === "skeleton"}
          />
        </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}

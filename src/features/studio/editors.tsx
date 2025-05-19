"use client";
import { HTMLHint } from "htmlhint";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSkeletonStore } from "@/lib/store"
import dynamic from "next/dynamic"
import * as monaco from 'monaco-editor';
import htmlValidator from 'html-validator';

import { toast } from "sonner"
import { useEffect, useRef, useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { UpdateUITabAlert } from "./components/code-tab-update-alert"
import { Copy } from "lucide-react";
import { Hint } from "htmlhint/types";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })


type CodeFileTabConfig = {
    format : string;
    styling: string; 
    errors: Hint[];
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


const uiConfigFormats = ["html"];
const uiConfigStylings = ["tailwind"];
const skeletonConfigFormats = ["html", "jsx"];
const skeletonConfigStylings = ["tailwind"];


const validateFormat = async (html: string, type: string) => {
  const rules = {
    "tagname-lowercase": true,
    "attr-value-double-quotes": true,
    "doctype-first": false,
    "tag-pair": true,
    "spec-char-escape": false,
    "id-unique": true,
    "src-not-empty": true,
    "attr-no-duplication": true,
  };

  const results = await HTMLHint.verify(html, rules);
  console.log(results)
  return results;
//   return {
//     isValid: results.length === 0,
//     errors: results,
//   };

};

  const generateSkeleton = (str: string) => {
    return str;
  }
export function Editors() {
  const [uiCode, setUiCode] = useLocalStorage<string>("ui_code", DEFAULT_HTML_CODE);
   const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const [skeletonCode, setSkeletonCode] = useLocalStorage<string>("skeleton_code", generateSkeleton(uiCode));
  const [isSkeletonUpdated, setIsSkeletonUpdated] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState("ui");
  

    const defaultUiConfig = {
        format: uiConfigFormats[0],
        styling: uiConfigStylings[0],
        errors: [],
    };


    const defaultSkeletonConfig = {
    format: skeletonConfigFormats[0],
    styling: skeletonConfigStylings[0],
    errors: [],
    };

    //todo: will be related more to zustand
  const [uiConfig, setUiConfig] = useLocalStorage<CodeFileTabConfig>("uiConfig", defaultUiConfig);

  const [skeletonConfig, setSkeletonConfig] = useLocalStorage<CodeFileTabConfig>("skeletonConfig", defaultSkeletonConfig);



  // Config setters
  const setUiConfigFormat = (value: string) =>
    setUiConfig((prev) => ({ ...prev, format: value }));

  const setUiConfigStyling = (value: string) =>
    setUiConfig((prev) => ({ ...prev, styling: value }));

  const setSkeletonConfigFormat = (value: string) =>
    setSkeletonConfig((prev) => ({ ...prev, format: value }));

  const setSkeletonConfigStyling = (value: string) =>
    setSkeletonConfig((prev) => ({ ...prev, styling: value }));



  const [leftUICode,setLeftUICode] = useState("");
  const handleEditorChange = async (value: string | undefined, type: string, forceUpdate= false) => {
        const newCode = value || "";
    if(leftUICode && !forceUpdate){
        setLeftUICode("")
        setUiCode(newCode);
        return;
    }
    if (type === "ui") {
      const errors = await validateFormat(newCode, type);
      if (errors.length > 0) {
        setUiConfig((prev) => ({ ...prev, errors: errors }));
        return;
      }
      setUiConfig((prev) => ({ ...prev, errors: [] }));

      if (isSkeletonUpdated && !forceUpdate) {
        setIsAlertShown(true);
        setLeftUICode(newCode);
        return;
      }

      setIsSkeletonUpdated(false);
      setIsAlertShown(false);
      setUiCode(newCode);
      setSkeletonCode(generateSkeleton(newCode)); // todo: add generation logic 
      setSkeletonConfig((prev) => ({ ...prev, errors: [] }));
    } else {
      const errors = await validateFormat(newCode, type);
      if (errors.length > 0) {
        setSkeletonConfig((prev) => ({ ...prev, errors: errors }));
        return;
      }

      setSkeletonConfig((prev) => ({ ...prev, errors: errors }));
      setIsSkeletonUpdated(true);
      setSkeletonCode(newCode);
    }
  };


    const handleUserUpdateDecision = (choice: "continue" | "cancel") => {
        if(choice === "continue"){
            handleEditorChange(leftUICode, "ui", true);
            setLeftUICode("");
        }
        else{
            if (editorRef.current) {
                editorRef.current?.setValue(uiCode);
                setLeftUICode("")

                //trigger update on handle func
            }
        }
        setIsAlertShown(false)

    }

const [codeCopied, setCodeCopied] = useState<"ui"|"skeleton"|null>(null);

  const handleCopy = (str: string, type: "ui" |"skeleton") => {
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

          <TabsContent value="ui" className="m-0">
            <div className="flex items-center px-2 pb-3 justify-between">
                <div className="text-red-500  text-xs rounded-md py-1 px-2 font-semibold">
                    { uiConfig.errors?.[0]?.message }
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
                    { skeletonConfig.errors?.[0]?.message }
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

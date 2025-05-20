"use client";
import dynamic from "next/dynamic"
import * as monaco from 'monaco-editor';
import { Copy } from "lucide-react";
import { useSkeletonStore } from "../stores";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface EditorProps {
 type: "ui" | "skeleton";
}

export const Editor: React.FC<EditorProps> = ({
    type,
}) => {

    const {
        uiCodeConfig,
        mountEditorRef,
        uiCode,
        skeletonCode,
        setSkeletonCodeFromEditor,
        setUiCodeFromEditor,
        skeletonCodeConfig,
        codeCopied,
        copyCode
      } = useSkeletonStore();

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    mountEditorRef(editor, type);
  };

const errors = type == "ui" ? uiCodeConfig.errors : skeletonCodeConfig.errors ;
const value = type == "ui" ? uiCode : skeletonCode ;
const onChange =  (str: string | undefined) => 
    { type == "ui" ? setUiCodeFromEditor(str ?? "") : setSkeletonCodeFromEditor(str ?? "") };

return (
    <div>
      <div className="flex items-center px-2 pb-3 justify-between">
        <div className="text-red-500 text-xs font-semibold">
          {errors[0]?.message}
        </div>

        <button
          onClick={()=>copyCode(type)}
          className="ml-4 flex justify-center items-center space-x-1 bg-[#3e3e42] rounded-md py-1 px-2 text-white text-xs"
        >
          <Copy className="w-3 h-3" />
          <span>{codeCopied == type ? 'copied!' : 'copy'}</span>
        </button>
      </div>

      <div className="h-[calc(100dvh-10rem)]">
        <MonacoEditor
          height="97%"
          language="html"
          theme="vs-dark"
          value={value}
          onChange={onChange}
          onMount={onMount}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

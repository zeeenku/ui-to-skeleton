"use client";
import dynamic from "next/dynamic"
import * as monaco from 'monaco-editor';
import { EditorError } from "../types";
import { Copy } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })


interface EditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  errors: EditorError[];
  onCopy: () => void;
  copied: boolean;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

export const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  errors,
  onCopy,
  copied,
  onMount,
}) => {
  return (
    <div>
      <div className="flex items-center px-2 pb-3 justify-between">
        <div className="text-red-500 text-xs font-semibold">
          {errors[0].message}
        </div>

        <button
          onClick={onCopy}
          className="ml-4 flex justify-center items-center space-x-1 bg-[#3e3e42] rounded-md py-1 px-2 text-white text-xs"
        >
          <Copy className="w-3 h-3" />
          <span>{copied ? 'copied!' : 'copy'}</span>
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

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useState } from "react"
import { UpdateUITabAlert } from "./code-tab-update-alert"

import { Editor } from "./editor";
import { CodeConfigSelector } from "./code-config-selector";
import { useSkeletonStore } from "../stores/index";


export function Editors() {

    const {
        activeCodeTab,
        setActiveCodeTab,
      } = useSkeletonStore();

  return (
    <div className="flex flex-col">

          <UpdateUITabAlert/>

      <div className="bg-[#1e1e1e] overflow-hidden rounded-xl border border-[#1e1e1e] shadow-lg transition-all duration-300 hover:shadow-xl h-[calc(100dvh-4rem)]">
        <Tabs value={activeCodeTab} onValueChange={(val)=>setActiveCodeTab(val as "ui" |"skeleton")} className="h-full bg-[#1e1e1e] border border-[#1e1e1e]">
          <div className="border-none p-3 border-b bg-[#2d2d30] text-sm text-white flex items-center justify-between">
            
            <TabsList className="grid w-48 grid-cols-2 bg-[#3e3e42]">
              <TabsTrigger value="ui" className="text-white data-[state=active]:bg-[#1e1e1e]">
                UI
              </TabsTrigger>
              <TabsTrigger value="skeleton" className="text-white data-[state=active]:bg-[#1e1e1e]">
                Skeleton
              </TabsTrigger>
            </TabsList>

          <CodeConfigSelector type={activeCodeTab}/>

          </div>
        <TabsContent value="ui" className="m-0">
          <Editor type="ui"/>
        </TabsContent>

        <TabsContent value="skeleton" className="m-0">
          <Editor type="skeleton"/>
        </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}

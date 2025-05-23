"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSkeletonStore } from "../stores/index";
import { UpdateUITabAlert } from "./code-tab-update-alert";
import { Editor } from "./editor";
import { CodeConfigSelector } from "./code-config-selector";

export function Editors() {
  const { activeCodeTab, setActiveCodeTab } = useSkeletonStore();

  return (
    <div className="flex flex-col">
      <UpdateUITabAlert />

      <div className="bg-[#1e1e1e] overflow-hidden rounded-xl border border-[#1e1e1e] shadow-lg transition-all duration-300 hover:shadow-xl h-[calc(100dvh-4rem)]">
        {/* Keep Tabs wrapper for TabsList and TabsTrigger */}
        <Tabs value={activeCodeTab} onValueChange={(val) => setActiveCodeTab(val as "ui" | "skeleton")} className="h-full bg-[#1e1e1e] border border-[#1e1e1e]">
          <div className="border-none p-3 border-b bg-[#2d2d30] text-sm text-white flex items-center justify-between z-10 relative">
            <TabsList className="grid w-48 grid-cols-2 bg-[#3e3e42]">
              <TabsTrigger value="ui" className="text-white data-[state=active]:bg-[#1e1e1e]">
                UI
              </TabsTrigger>
              <TabsTrigger value="skeleton" className="text-white data-[state=active]:bg-[#1e1e1e]">
                Skeleton
              </TabsTrigger>
            </TabsList>

            <CodeConfigSelector type={activeCodeTab} />
          </div>


                  {/* Render editors independently, stacked and controlled by z-index */}
        <div className="relative h-[calc(100dvh-4rem-3rem)]">
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              activeCodeTab === "ui" ? "z-20 opacity-100" : "z-10 opacity-0 pointer-events-none"
            }`}
          >
            <Editor type="ui" />
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              activeCodeTab === "skeleton" ? "z-20 opacity-100" : "z-10 opacity-0 pointer-events-none"
            }`}
          >
            <Editor type="skeleton" />
          </div>
        </div>
        </Tabs>


      </div>
    </div>
  );
}

"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useState } from "react"

import { AllDevicesType, devices } from "../constants"
import DeviceSwitcherBtn from "./device-switcher-btn"
import { PreviewScreen } from "./preview-screen"
import { useLocalStorage } from "@/hooks/use-local-storage"

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





export function Previews(){
  const [activeTab, setActiveTab] =  useLocalStorage<string>("preview_ui_tab", "ui");
  const [previewDevice, setPreviewDevice] = useLocalStorage<AllDevicesType>("preview_device", devices[0].value);

  const [skeletonCode, setSkeletonCode] = useState<string>('');
  const [uiCode, setUiCode] = useState<string>(DEFAULT_HTML_CODE);


    return(
        <div className="flex flex-col">
                  <div
                    className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border
                     border-slate-200/50 shadow-lg transition-all duration-300 hover:shadow-xl h-[calc(100dvh-4rem)]"
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
                        {devices.map(el=>(
                            <DeviceSwitcherBtn
                                previewDevice={el}
                                setPreviewDevice={() => setPreviewDevice(el.value)} 
                                activePreviewDeviceValue={previewDevice}                            
                            />
                        ))}
                          

                        </div>
                      </div>
                      <div className="h-[calc(100dvh-9rem)] overflow-auto bg-white">
                        <TabsContent value="ui" className="mt-0 h-full">
                            <PreviewScreen title="UI Preview" previewDevice={previewDevice} code={uiCode}/>
                        </TabsContent>
                        <TabsContent value="skeleton" className="mt-0 h-full">
                            <PreviewScreen title="SKeleton Preview" previewDevice={previewDevice} code={uiCode}/>                        </TabsContent>
                      </div>
                    </Tabs>
                  </div>
                </div>
    );
}



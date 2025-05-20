"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AllDevicesType, devices } from "../constants"
import DeviceSwitcherBtn from "./device-switcher-btn"
import { PreviewScreen } from "./preview-screen"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useSkeletonStore } from "../stores"



export function Previews(){
  const [activeTab, setActiveTab] =  useLocalStorage<string>("preview_ui_tab", "ui");
  const [previewDevice, setPreviewDevice] = useLocalStorage<AllDevicesType>("preview_device", devices[0].value);

  //todo: make sure there is 2 skeleton code: 1 for export and 1 for preview....
  const {
    uiCode,
    skeletonCode,
  } = useSkeletonStore();

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
                                key={el.value}
                                previewDevice={el}
                                setPreviewDevice={() => setPreviewDevice(el.value)} 
                                activePreviewDeviceValue={previewDevice}                            
                            />
                        ))}
                          

                        </div>
                      </div>
                      <div className="h-[calc(100dvh-9rem)] overflow-auto bg-white">
                        <TabsContent value="ui" className="mt-0 h-full">
                            <PreviewScreen type="ui" title="UI Preview" previewDevice={previewDevice} code={uiCode}/>
                        </TabsContent>
                        <TabsContent value="skeleton" className="mt-0 h-full">
                            <PreviewScreen type="skeleton" title="SKeleton Preview" previewDevice={previewDevice} code={skeletonCode}/>                        
                        </TabsContent>
                      </div>
                    </Tabs>
                  </div>
                </div>
    );
}



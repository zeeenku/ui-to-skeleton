"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { useMemo, useState } from "react"

import { devices, DeviceType } from "../constants"

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

//todo: use react query for generated count
// Dynamically import Monaco Editor to avoid SSR issues
const getOpenIssueLInk = () => {
  return "https://github.com/zeeenku/ui-to-skeleton/issues/new";
}


const stylingFormat: 'tailwind' = 'tailwind';

const headAdditions: Record<typeof stylingFormat, string> = {
  tailwind: `<script src="https://cdn.tailwindcss.com"></script>`,
};


interface PreviewScreenProps {
  title: string;
  previewDevice: DeviceType;
  code: string;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({
  title,
  previewDevice,
  code,
}) => {
  const currentDevice = devices.find(d => d.value === previewDevice)!;

  function getHeight(): number {
    const dvh = window.innerHeight;
    const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const remValue = 9 * remInPx;
    return dvh - remValue;
  }

  const srcDoc = useMemo(() => {
    return `
      <html>
        <head>
          <meta name="viewport" content="width=${currentDevice.size}, initial-scale=1.0">
          ${headAdditions[stylingFormat]}
          <style>
            body {
              margin: 0;
              padding: 0;
              height: ${getHeight()}px;
              max-height: ${getHeight()}px;
              overflow-y: auto;
              width: 100%;
              border-radius: 16px;
              background-color: gray;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          </style>
        </head>
        <body>
          ${code}
        </body>
      </html>
    `;
  }, [code, previewDevice]);

  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={cn(
          'transform transition-all h-full duration-300 px-2',
          `max-w-[${currentDevice.size}px] w-full`
        )}
      >
        <iframe
          title={title}
          srcDoc={srcDoc}
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
};


export function Previews(){
  const [activeTab, setActiveTab] = useState('ui');
  const [previewDevice, setPreviewDevice] = useState<DeviceType>('desktop');
  const [skeletonCode, setSkeletonCode] = useState<string>('');
  const [uiCode, setUiCode] = useState<string>(DEFAULT_HTML_CODE);



    const [isValid, setIsValid] = useState(true);
    function generateSkeleton() {
        throw new Error("Function not implemented.")
    }

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
                            <DeviceSwitcher
                            previewDevice={el}
                            setPreviewDevice={()=>setPreviewDevice(el.value)}
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


interface DeviceSwitcherProps {
  previewDevice: DeviceType;
  setPreviewDevice: CallableFunction;
}


const DeviceSwitcher: React.FC<DeviceSwitcherProps> = ({
  previewDevice,
  setPreviewDevice,
}) => {
  return (
    <div className="flex items-center space-x-1 bg-slate-200/70 p-1 rounded-md">
      {devices.map(({ name, value, Icon }) => (
        <TooltipProvider key={value}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 p-0",
                  previewDevice === value && "bg-white text-cyan-700 shadow-sm"
                )}
                onClick={() => setPreviewDevice}
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only">{name}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name} view</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
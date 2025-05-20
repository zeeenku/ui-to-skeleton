import React from "react";
import { Button } from "@/components/ui/button"; 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { DeviceType } from "../constants"; 

interface DeviceSwitcherProps {
  previewDevice: DeviceType;
  activePreviewDeviceValue: string;
  setPreviewDevice: (device: DeviceType) => void;
}

const DeviceSwitcherBtn: React.FC<DeviceSwitcherProps> = ({
  previewDevice,
  setPreviewDevice,
  activePreviewDeviceValue,
}) => {
  return (
    <TooltipProvider key={previewDevice.value}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 p-0",
              previewDevice.value === activePreviewDeviceValue && "bg-white text-cyan-700 shadow-sm"
            )}
            onClick={() => setPreviewDevice(previewDevice)}
          >
            <previewDevice.Icon className="h-4 w-4" />
            <span className="sr-only">{previewDevice.name}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{previewDevice.name} view</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeviceSwitcherBtn;

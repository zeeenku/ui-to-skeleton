import React from "react";
import { Button } from "@/components/ui/button"; // Adjust path as needed
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Adjust path
import { cn } from "@/lib/utils"; // Utility for class names
import type { DeviceType } from "../constants"; // Adjust path if needed

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

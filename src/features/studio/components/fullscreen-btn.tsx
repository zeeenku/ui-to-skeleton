"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Maximize, Minimize } from "lucide-react";

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Failed to enter fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:bg-cyan-50/50 hover:border-cyan-200/50 transition-all duration-200"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4 mr-1 text-cyan-600" />
            ) : (
              <Maximize className="h-4 w-4 mr-1 text-cyan-600" />
            )}
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFullscreen ? "Exit fullscreen mode" : "Enter fullscreen mode"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

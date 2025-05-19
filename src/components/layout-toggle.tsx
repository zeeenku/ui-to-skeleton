"use client"

import { Columns, Monitor, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type LayoutMode = "split" | "editor" | "preview"

interface LayoutToggleProps {
  currentMode: LayoutMode
  onChange: (mode: LayoutMode) => void
  className?: string
}

export default function LayoutToggle({ currentMode, onChange, className }: LayoutToggleProps) {
  return (
    <div className={cn("flex items-center space-x-1 bg-slate-200/70 p-1 rounded-md", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 p-0", currentMode === "split" && "bg-white text-cyan-700 shadow-sm")}
              onClick={() => onChange("split")}
            >
              <Columns className="h-4 w-4" />
              <span className="sr-only">Split view</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Split view (editor and preview)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 p-0", currentMode === "editor" && "bg-white text-cyan-700 shadow-sm")}
              onClick={() => onChange("editor")}
            >
              <Code className="h-4 w-4" />
              <span className="sr-only">Editor only</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editor only</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 p-0", currentMode === "preview" && "bg-white text-cyan-700 shadow-sm")}
              onClick={() => onChange("preview")}
            >
              <Monitor className="h-4 w-4" />
              <span className="sr-only">Preview only</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Preview only</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

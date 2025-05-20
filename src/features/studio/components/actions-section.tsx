import { Share2, AlertTriangle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ShareDialog from "@/components/share-dialog";
import LayoutToggle from "@/components/layout-toggle";
import { useState } from "react";
import { getOpenIssueLInk } from "../constants";
import { LayoutMode } from "../types";

interface ActionsSectionProps {
  layoutMode: LayoutMode;
  setLayoutMode: React.Dispatch<React.SetStateAction<LayoutMode>>;
}

export function ActionsSection({
  layoutMode,
  setLayoutMode,
}: ActionsSectionProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  //todo: needs to use react query....
  const generatedSkeletonsCount = 0;

  //todo: need more updates later
  function copySkeletonCode() {
    const code = "// Your skeleton code goes here\nconst example = true;";
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Skeleton code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  }

  return (
    <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <LayoutToggle
          currentMode={layoutMode}
          onChange={setLayoutMode}
          className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm"
        />

        <div className="text-sm text-slate-500 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-200/50">
          <span className="font-medium text-cyan-600">{generatedSkeletonsCount}</span>{" "}
          skeletons generated
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShareDialogOpen(true)}
                className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:bg-cyan-50/50 hover:border-cyan-200/50 transition-all duration-200"
              >
                <Share2 className="h-4 w-4 mr-1 text-cyan-600" /> Share
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share with others</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(getOpenIssueLInk(), "_blank")}
                className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:bg-cyan-50/50 hover:border-cyan-200/50 transition-all duration-200"
              >
                <AlertTriangle className="h-4 w-4 mr-1 text-cyan-600" /> Report Issue
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Report an issue on GitHub</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          size="sm"
          onClick={copySkeletonCode}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Copy className="h-4 w-4 mr-1" /> Copy Skeleton Code
        </Button>
      </div>
    </div>
  );
}

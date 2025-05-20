import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSkeletonStore } from "../stores/index";
import { skeletonCodeConfigFormats, SkeletonCodeConfigFormats, skeletonCodeConfigStylings, SkeletonCodeConfigStylings, uiCodeConfigFormats, UiCodeConfigFormats, uiCodeConfigStylings, UiCodeConfigStylings } from "../types";

interface CodeConfigSelectorProps {
  type: "ui" | "skeleton";
}

export const CodeConfigSelector: React.FC<CodeConfigSelectorProps> = ({
  type,
}) => {
  const {
    uiCodeConfig,
    setUiCodeConfig,
    skeletonCodeConfig,
    setSkeletonCodeConfig,
  } = useSkeletonStore();

  const config = type === "ui" ? uiCodeConfig : skeletonCodeConfig;
  const setConfig = type === "ui" ? setUiCodeConfig : setSkeletonCodeConfig;

  const handleFormatChange = (newFormat: UiCodeConfigFormats | SkeletonCodeConfigFormats) => {
    setConfig({ ...config, format: newFormat });
  };

  const handleStylingChange = (newStyling: UiCodeConfigStylings | SkeletonCodeConfigStylings) => {
    setConfig({ ...config, styling: newStyling });
  };

  const format = type === "ui" ? uiCodeConfig.format : skeletonCodeConfig.format;
  const styling = type === "ui" ? uiCodeConfig.styling : skeletonCodeConfig.styling;
  const formatOptions = type === "ui" ? uiCodeConfigFormats : skeletonCodeConfigFormats;
  const stylingOptions = type === "ui" ? uiCodeConfigStylings : skeletonCodeConfigStylings;

  return (
    <div className="flex items-center space-x-2">
      <Select value={format} onValueChange={handleFormatChange}>
        <SelectTrigger className="h-7 min-w-[100px] bg-[#3e3e42] border-slate-600 text-white text-xs">
          <SelectValue placeholder="Format" />
        </SelectTrigger>
        <SelectContent className="bg-[#3e3e42]">
          {formatOptions.map((el) => (
            <SelectItem
              key={el}
              value={el}
              className="bg-[#252526] hover:bg-[#252526] data-[state=active]:bg-[#252526] text-white"
            >
              {el}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={styling} onValueChange={handleStylingChange}>
        <SelectTrigger className="h-7 min-w-[100px] bg-[#3e3e42] border-slate-600 text-white text-xs">
          <SelectValue placeholder="Styling" />
        </SelectTrigger>
        <SelectContent className="bg-[#3e3e42]">
          {stylingOptions.map((el) => (
            <SelectItem
              key={el}
              value={el}
              className="bg-[#252526] hover:bg-[#252526] data-[state=active]:bg-[#252526] text-white"
            >
              {el}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

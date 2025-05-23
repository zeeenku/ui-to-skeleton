"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { AllDevicesType, devices, stylesPreviewDependencies } from "../constants";
import { useSkeletonStore } from "../stores";
import { convertionController } from "../func/convertion";

interface PreviewScreenProps {
  title: string;
  previewDevice: AllDevicesType;
  code: string;
  type: "ui" | "skeleton";
}
export const PreviewScreen: React.FC<PreviewScreenProps> = ({
  title,
  previewDevice,
  code,
  type
}) => {
  const currentDevice = devices.find(d => d.value === previewDevice)!;

  const [height, setHeight] = useState<number | null>(null);
  const {
    uiCodeConfig,
    skeletonCodeConfig,
  } = useSkeletonStore();
  
  const config = type == "ui" ? uiCodeConfig : skeletonCodeConfig;

  useEffect(() => {
    const calculateHeight = () => {
      const dvh = window.innerHeight;
      const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const remValue = 9 * remInPx;
      setHeight(dvh - remValue);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  const srcDoc = useMemo(() => {
    if (height === null) return '';

    return `
      <html>
        <head>
          <meta name="viewport" content="width=${currentDevice.size}, initial-scale=1.0">
          ${stylesPreviewDependencies[config.styling]}
          <style>
            body {
              margin: 0;
              padding: 0;
              height: ${height}px;
              max-height: ${height}px;
              overflow-y: auto;
              width: 100%;
              border-radius: 16px;
              background-color: oklch(96.8% 0.007 247.896);
              display: flex;
              justify-content: center;
              align-items: center;
            }
          </style>
        </head>
        <body>
          ${convertionController(code, config.format, "html", config.styling, "tailwind")}
        </body>
      </html>
    `;
  }, [code, height, config.format, config.styling, currentDevice.size]);


  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={cn(
          'transform transition-all h-full duration-300 px-2',
          `w-full`
        )}
          style={{ maxWidth: `${currentDevice.size}px` }}

      >
        {height !== null && (
          <iframe
            title={title}
            srcDoc={srcDoc}
            className="w-full h-full border-0"
          />
        )}
      </div>
    </div>
  );
};
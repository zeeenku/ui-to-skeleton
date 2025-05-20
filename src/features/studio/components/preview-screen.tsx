"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { AllDevicesType, devices, headAdditions, stylingFormat } from "../constants";

interface PreviewScreenProps {
  title: string;
  previewDevice: AllDevicesType;
  code: string;
}
export const PreviewScreen: React.FC<PreviewScreenProps> = ({
  title,
  previewDevice,
  code,
}) => {
  const currentDevice = devices.find(d => d.value === previewDevice)!;

  const [height, setHeight] = useState<number | null>(null);

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
          ${headAdditions[stylingFormat]}
          <style>
            body {
              margin: 0;
              padding: 0;
              height: ${height}px;
              max-height: ${height}px;
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
  }, [code, previewDevice, height]);

  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={cn(
          'transform transition-all h-full duration-300 px-2',
          `max-w-[${currentDevice.size}px] w-full`
        )}
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
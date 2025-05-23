"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import { useSkeletonStore } from "../stores/index";
import { stylesPreviewDependencies } from "../constants";
import { convertionController } from "../func/convertion";
import { createSkeletonHTMLTagFromDOM } from "../func/generate";

interface SkeletonGeneratorHandlerProps {
  className?: string;
  title?: string;
}

export const SkeletonGeneratorHandler: React.FC<SkeletonGeneratorHandlerProps> = ({
  className = "",
  title = "iframe-skeleton-generator",
}) => {
  const localRef = useRef<HTMLIFrameElement | null>(null);

  // Separate selectors for setters
  const setIframeRef = useSkeletonStore((state) => state.setIframeRef);
  const setIframeLoaded = useSkeletonStore((state) => state.setIframeLoaded);
  const setGeneratedSkeletonCode = useSkeletonStore((state) => state.setGeneratedSkeletonCode);

  // State selectors
  const uiCode = useSkeletonStore((state) => state.uiCode);
  const uiCodeConfig = useSkeletonStore((state) => state.uiCodeConfig);
  const skeletonConfig = useSkeletonStore((state) => state.skeletonConfig);

  // Trigger when skeletonConfig updates
  useEffect(() => {
    console.log("skeletonConfig updated:", skeletonConfig);
  }, [skeletonConfig]);

  // Generate the iframe srcDoc including preview styling and user UI code
  const srcDoc = useMemo(() => {
    return `
      <html>
        <head>
          ${stylesPreviewDependencies[uiCodeConfig.styling] || ""}
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          ${convertionController(
            uiCode,
            uiCodeConfig.format,
            "html",
            uiCodeConfig.styling,
            "tailwind"
          )}
        </body>
      </html>
    `;
  }, [uiCode, uiCodeConfig.format, uiCodeConfig.styling]);

  // Register iframe ref once
  useEffect(() => {
    setIframeRef(localRef);
  }, [setIframeRef]);


  const iframeKey = useMemo(
  () =>
    `${skeletonConfig.color}-${skeletonConfig.intensity}-${skeletonConfig.defaultBorderRadius}`,
  [skeletonConfig]
);

  // Handle iframe load
  const handleIframeLoad = useCallback(() => {
    const iframe = localRef.current;
    if (!iframe) return;

    const app = iframe.contentDocument?.body;
    if (!app) return;

    console.log("Iframe content loaded");

    const skeleton = createSkeletonHTMLTagFromDOM(app);
    const skeletonHTML = skeleton.render(
      `bg-${skeletonConfig.color}-${skeletonConfig.intensity}`,
      skeletonConfig.defaultBorderRadius
    ).outerHTML;

    console.log("Generated skeleton HTML:", skeletonHTML);

    setGeneratedSkeletonCode(skeletonHTML);
    setIframeLoaded(true);
  }, [skeletonConfig, setGeneratedSkeletonCode, setIframeLoaded]);

  // Attach iframe load listener
  useEffect(() => {
    const iframe = localRef.current;
    if (!iframe) return;

    iframe.addEventListener("load", handleIframeLoad);
    return () => {
      iframe.removeEventListener("load", handleIframeLoad);
    };
  }, [handleIframeLoad]);

  // Force iframe to reload when srcDoc OR skeletonConfig changes
  useEffect(() => {
    setIframeLoaded(false);
    console.log("Triggered reload due to srcDoc or skeletonConfig change");
  }, [srcDoc, skeletonConfig, setIframeLoaded]);

  return (
    <iframe
      ref={localRef}
      key={iframeKey}
      srcDoc={srcDoc}
      title={title}
      className={`fixed left-full h-screen w-screen border-0 ${className}`}
    />
  );
};

"use client";

import { useEffect, useMemo, useRef } from "react";
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

  const setIframeRef = useSkeletonStore((s) => s.setIframeRef);
  const setIframeLoaded = useSkeletonStore((s) => s.setIframeLoaded);
  const setGeneratedSkeletonCode = useSkeletonStore((s) => s.setGeneratedSkeletonCode); // Assuming you have a state setter for skeleton code

  const { uiCode, uiCodeConfig } = useSkeletonStore();

  // Generate srcDoc
  const srcDoc = useMemo(() => {
    return `
      <html>
        <head>
          ${stylesPreviewDependencies[uiCodeConfig.styling]}
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
  }, [uiCode, uiCodeConfig]);

  // Register iframe ref with Zustand
  useEffect(() => {
    setIframeRef(localRef);
  }, [setIframeRef]);

  // Listen for iframe load
  useEffect(() => {
    const iframe = localRef.current;
    if (!iframe) return;

    const onLoad = () => {
      setIframeLoaded(true);

      const app = iframe.contentDocument?.body;
      if (!app) return;

      setTimeout(() => {
        const skeleton = createSkeletonHTMLTagFromDOM(app);
        const skeletonHTML = skeleton.render().outerHTML;
        console.log(skeletonHTML)
        setGeneratedSkeletonCode(skeletonHTML);
      }, 500);
    };

    iframe.addEventListener("load", onLoad);
    return () => {
      iframe.removeEventListener("load", onLoad);
    };
  }, [srcDoc, setIframeLoaded, setGeneratedSkeletonCode]);

  useEffect(() => {
    setIframeLoaded(false);
  }, [srcDoc]);

  return (
    <iframe
      ref={localRef}
      srcDoc={srcDoc}
      title={title}
      className={`fixed h-screen w-screen border-0 ${className}`}
    />
  );
};

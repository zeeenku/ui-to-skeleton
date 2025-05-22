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
  const setGeneratedSkeletonCode = useSkeletonStore((s) => s.setGeneratedSkeletonCode);

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

  // Handle iframe load event and generate skeleton
  const handleIframeLoad = () => {
    const iframe = localRef.current;
    if (!iframe) return;

    const app = iframe.contentDocument?.body;
    if (!app) return;

    console.log("Iframe content loaded");

    // Generate skeleton HTML from the iframe content
    const skeleton = createSkeletonHTMLTagFromDOM(app);
    const skeletonHTML = skeleton.render().outerHTML;

    console.log("Generated skeleton HTML:", skeletonHTML);

    // Set generated skeleton code in Zustand
    setGeneratedSkeletonCode(skeletonHTML);
    setIframeLoaded(true); // Mark iframe as loaded
  };

  useEffect(() => {
    // Listen for iframe load event
    const iframe = localRef.current;
    if (iframe) {
      iframe.addEventListener("load", handleIframeLoad);
    }

    // Cleanup on component unmount or ref change
    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleIframeLoad);
      }
    };
  }, [srcDoc, setGeneratedSkeletonCode]);

  useEffect(() => {
    setIframeLoaded(false);
  }, [srcDoc]);

  return (
    <iframe
      ref={localRef}
      srcDoc={srcDoc}
      title={title}
      className={`fixed left-full h-screen w-screen border-0 ${className}`}
    />
  );
};

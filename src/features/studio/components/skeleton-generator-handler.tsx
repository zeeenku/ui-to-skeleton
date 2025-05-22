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
    console.log("ui code updated");
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

  // Manually monitor when iframe content is ready
  useEffect(() => {
    const iframe = localRef.current;
    if (!iframe) return;

    const checkIframeReady = () => {
      const app = iframe.contentDocument?.body;
      if (!app) return;

      console.log("Iframe content ready");

      // Generate skeleton after a small delay
      setTimeout(() => {
        const skeleton = createSkeletonHTMLTagFromDOM(app);
        const skeletonHTML = skeleton.render().outerHTML;
        console.log("Generated skeleton HTML:", skeletonHTML);
        setGeneratedSkeletonCode(skeletonHTML);
      }, 500); // Small delay to ensure the iframe is fully rendered
    };

    // Initially check for iframe content
    checkIframeReady();

    // Monitor when content in the iframe changes (if needed)
    const intervalId = setInterval(checkIframeReady, 1000); // Check every second
    return () => clearInterval(intervalId); // Clean up interval when component unmounts or `srcDoc` changes
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

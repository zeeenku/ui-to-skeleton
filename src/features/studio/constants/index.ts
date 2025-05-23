import { Monitor, Smartphone, Tablet } from "lucide-react";
import { CodeFileTabConfig, SkeletonCodeConfigStylings, SkeletonConfig, UiCodeConfigStylings } from "../types";

export const getOpenIssueLInk = (
    // { uiCode, skeletonCode, expectedOutput, explanation }
  ) => {
  const uiCode = `<div><h1>Hello</h1></div>`;
  const skeletonCode = `<h1>Hello</h1>;`;
  const expectedOutput = `<div><h1>Hello</h1></div>;`;
  const explanation = "The outer <div> was stripped in the generated skeleton.";
  const isSkeletonUpdated = false;

  const baseUrl = "https://github.com/zeeenku/ui-to-skeleton/issues/new";
  const title = encodeURIComponent("[Skeleton Bug] - Generated skeleton is wrong");

  const bodyMarkdown = `### What’s wrong with the output?

${explanation || "Explain what doesn't match or behave as expected."}

### Input UI Code

\`${uiCode || "<paste UI code here>"}\`

### Output Skeleton Code

\`${skeletonCode || "<paste generated skeleton here>"}\`

### Expected Output (optional)

${expectedOutput ? `\`${expectedOutput}\`` : "N/A"}
${isSkeletonUpdated ? "\n\n_Note: the skeleton code provided is updated after generation._" : ""}

`;



  const body = encodeURIComponent(bodyMarkdown);

  return `${baseUrl}?template=simullate-skeleton-bad-gen.yml&title=${title}&body=${body}`;


// return "https://github.com/zeeenku/ui-to-skeleton/issues/new?template=01-bad_generation.yml&title=[Skeleton%20Bug]%20-%20Skeleton%20does%20not%20match%20UI";
  // return "https://github.com/zeeenku/ui-to-skeleton/issues/new";
}
export type DeviceType = {
  name: string;
  value: string;
  Icon: React.ElementType;
  size: number;
};


export const devices : DeviceType[] = [
  {
    name: "Desktop",
    value: "desktop",
    Icon: Monitor,
    size: 1280,
  },
  {
    name: "Tablet",
    value: "tablet",
    Icon: Tablet,
    size: 640,
  },
  {
    name: "Mobile",
    value: "mobile",
    Icon: Smartphone,
    size: 500,
  },
] as const;


export type AllDevicesType = (typeof devices)[number]["value"];


export const stylesPreviewDependencies: Record<UiCodeConfigStylings | SkeletonCodeConfigStylings, string> = {
  tailwind: `<script src="https://cdn.tailwindcss.com"></script>`,
};


export const DEFAULT_UI_CONFIG: CodeFileTabConfig = {
  format: "html",
  styling: "tailwind",
  errors: [],
};

export const DEFAULT_SKELETON_CONFIG: CodeFileTabConfig = {
  format: "html",
  styling: "tailwind",
  errors: [],
};

export const DEFAULT_SKELETON_STYLE: SkeletonConfig = {
  color: "cyan",
  intensity: "300",
  defaultBorderRadius: "rounded-md",
};


export const DEFAULT_HTML_CODE = `<div class="bg-white p-4 rounded-lg shadow-md">
  <div class="flex items-center gap-4">
    <div class="h-12 w-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">
      JD
    </div>
    <div>
      <h3 class="text-lg font-bold text-slate-800">John Doe</h3>
      <p class="text-slate-500">Frontend Developer</p>
    </div>
  </div>
  <div class="mt-4">
    <p class="text-sm text-slate-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </div>
  <div class="mt-4 flex justify-end">
    <button class="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
      View Profile
    </button>
  </div>
</div>`

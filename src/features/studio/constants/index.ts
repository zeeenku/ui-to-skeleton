import { Monitor, Smartphone, Tablet } from "lucide-react";


export const skeletonColors = [
    "slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber",
    "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue",
    "indigo", "violet", "purple", "fuchsia", "pink", "rose",
];

export const skeletonIntensities = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
export const skeletonBorderRadiusSizes = ["rounded-none", "rounded-sm", "rounded-md", "rounded-lg", "rounded-full"];


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

export const stylingFormat: 'tailwind' = 'tailwind';

export const headAdditions: Record<typeof stylingFormat, string> = {
  tailwind: `<script src="https://cdn.tailwindcss.com"></script>`,
};


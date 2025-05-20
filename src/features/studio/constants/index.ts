import { Monitor, Smartphone, Tablet } from "lucide-react";

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


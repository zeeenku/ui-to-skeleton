import { Monitor, Smartphone, Tablet } from "lucide-react";

export const devices = [
  {
    name: "Desktop",
    value: "desktop",
    Icon: Monitor,
    size: 1280,
  },
  {
    name: "Laptop",
    value: "laptop",
    Icon: Monitor,
    size: 1024,
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

export type DeviceType = {
  name: string;
  value: string;
  Icon: React.ElementType;
  size: number;
};

export type AllDevicesType = (typeof devices)[number]["value"];

import {
  Camera,
  Gamepad2,
  Headphones,
  Laptop,
  Monitor,
  Package,
  Smartphone,
  Tablet,
  Tv,
  WashingMachine,
  Watch,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  laptops: Laptop,
  smartphones: Smartphone,
  audio: Headphones,
  cameras: Camera,
  tablets: Tablet,
  wearables: Watch,
  televisions: Tv,
  appliances: WashingMachine,
  monitors: Monitor,
  gaming: Gamepad2,
};

export function categoryIcon(slug: string): LucideIcon {
  return ICONS[slug] ?? Package;
}

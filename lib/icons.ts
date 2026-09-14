import {
  Briefcase,
  CarParking01FreeIcons,
  Dumbbell,
  EngineFreeIcons,
  Laundry,
  Leaf,
  MilkBottleFreeIcons,
  Snowflake,
  Tv,
  UtensilsCrossed,
  Waves,
  Wifi01FreeIcons,
} from "@hugeicons/core-free-icons";
import { IconSvgElement } from "@hugeicons/react";

export const amenityIcons: Record<string, IconSvgElement> = {
  wifi: Wifi01FreeIcons,
  pool: Waves,
  gym: Dumbbell,
  restaurant: UtensilsCrossed,
  dining: UtensilsCrossed,
  spa: Leaf,
  business: Briefcase,
  bar: MilkBottleFreeIcons,
  parking: CarParking01FreeIcons,
  laundry: Laundry,
  ac: Snowflake,
  generator: EngineFreeIcons,
  tv: Tv,
};

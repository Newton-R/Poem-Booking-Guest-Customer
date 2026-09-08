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
import { IconSvgObject } from "@hugeicons/core-free-icons/types";

export const amenityIcons: Record<string, IconSvgObject> = {
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

import {
  Car01FreeIcons,
  Gym,
  MilkBottleFreeIcons,
  Snowflake,
  SwimmingCapFreeIcons,
  Wifi,
  Zap,
} from "@hugeicons/core-free-icons";

export const AmenityIcon = (
  icon:
    | "snakes"
    | "wifi"
    | "charge"
    | "ac"
    | "legroom"
    | "gym"
    | "swim"
    | "spa"
    | "rightangledruler"
    | "bed"
    | "guests"
    | "coffee"
    | "expresso"
    | "butler"
    | "bar"
    | "parking",
) => {
  switch (icon) {
    case "ac":
      return Snowflake;
    case "wifi":
      return Wifi;
    case "gym":
      return Gym;
    case "charge":
      return Zap;
    case "swim":
      return SwimmingCapFreeIcons;
    case "bar":
      return MilkBottleFreeIcons;
    case "parking":
      return Car01FreeIcons;
  }
};

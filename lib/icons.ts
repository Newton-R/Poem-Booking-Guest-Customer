import {
  Gym,
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
    | "butler",
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
  }
};

import { brightness } from "./brightness";
import { contrast } from "./contrast";
import { energyMap } from "./energyMap";
import { grayscale } from "./grayscale";
import { invert } from "./invert";
import { saturate } from "./saturate";
import { sepia } from "./sepia";
import { threshold } from "./threshold";

const manipulationsIds = [
  "brightness",
  "contrast",
  "energyMap",
  "grayscale",
  "invert",
  "saturate",
  "sepia",
  "threshold",
] as const;
const manipulations = {
  brightness,
  contrast,
  energyMap,
  grayscale,
  invert,
  saturate,
  sepia,
  threshold,
} as const;

export { manipulations, manipulationsIds };

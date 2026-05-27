import { brightness } from "./brightness";
import { grayscale } from "./grayscale";
import { energyMap } from "./energyMap";

const manipulationsIds = ["brightness", "grayscale", "energyMap"] as const;
const manipulations = { brightness, grayscale, energyMap } as const;

export { manipulationsIds, manipulations };

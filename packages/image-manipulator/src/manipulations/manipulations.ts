import { brightness } from "./brightness";
import { energyMap } from "./energyMap";
import { grayscale } from "./grayscale";

const manipulationsIds = ["brightness", "grayscale", "energyMap"] as const;
const manipulations = { brightness, grayscale, energyMap } as const;

export { manipulations, manipulationsIds };

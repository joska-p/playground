import { brightness } from "./brightness";
import { grayscale } from "./grayscale";
import { energyMap } from "./energyMap";

const manipulationsIds = [brightness.id, grayscale.id, energyMap.id] as const;
const manipulations = [brightness, grayscale, energyMap] as const;

export { manipulationsIds, manipulations };

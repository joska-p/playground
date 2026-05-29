import type { TileSet } from "../../core/initialTileSet";
import type { TileInstance } from "../../store/types";
import { computeNumberOfTiles } from "./computeNumberOfTiles";
import { generateTileColors } from "./generateTileColors";
import { generateTileRotation } from "./generateTileRotation";
import { getRandom } from "../random/getRandom";

function computeInitialTiles(
  element: HTMLDivElement,
  tileSet: TileSet,
): TileInstance[] {
  const numberOfTiles = computeNumberOfTiles(element);
  return Array.from({ length: numberOfTiles }, (_, i) => ({
    id: `${i}-${Math.random().toString(36).substring(2, 12)}`,
    name: getRandom(tileSet),
    colors: generateTileColors(),
    rotation: generateTileRotation(),
  }));
}

export { computeInitialTiles };

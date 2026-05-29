import type { TileSet } from "../core/initialTileSet";
import type { TileInstance } from "../store/types";
import { computeNumberOfTiles } from "./computeNumberOfTiles";
import { generateTileColors } from "./generateTileColors";
import { generateTileRotation } from "./generateTileRotation";
import { getRandom } from "./getRandom";

function computeInitialTiles(
  mosaicRef: React.RefObject<HTMLDivElement | null>,
  tileSet: TileSet,
): TileInstance[] {
  if (!mosaicRef.current) return [];
  const numberOfTiles = computeNumberOfTiles(mosaicRef.current);
  return Array.from({ length: numberOfTiles }, (_, i) => ({
    id: `${i}-${Math.random().toString(36).substring(2, 12)}`,
    name: getRandom(tileSet),
    colors: generateTileColors(),
    rotation: generateTileRotation(),
  }));
}

export { computeInitialTiles };

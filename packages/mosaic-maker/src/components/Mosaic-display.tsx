import { useMosaicMakerContext } from "./Mosaic-context.js";
import {
  CSS_VARS,
  initialGapSize,
  initialPalette,
  initialRotations,
  initialTileSize,
} from "./config.js";
import { getRandom } from "./lib/utils.js";
import { Tile } from "./tiles/Tile.js";

const MOSAIC_STYLES = {
  ...initialPalette,
  ...initialTileSize,
  ...initialGapSize,
  ...initialRotations,
  gridTemplateColumns: `repeat(auto-fill,var(${CSS_VARS.width}))`,
  gridTemplateRows: `repeat(auto-fill,var(${CSS_VARS.height}))`,
  gap: `var(${CSS_VARS.gap})`,
} as React.CSSProperties;

function generateTileColors() {
  const paletteKeys = Object.keys(initialPalette);
  return Array.from({ length: 5 }, () => getRandom(paletteKeys)) as [
    string,
    string,
    string,
    string,
    string,
  ];
}

function generateTileRotations() {
  const rotationKeys = Object.keys(initialRotations);
  return getRandom(rotationKeys);
}

function MosaicDisplay() {
  const { mosaicRef, tiles } = useMosaicMakerContext();

  return (
    <div
      ref={mosaicRef}
      className="absolute inset-0 mt-2 grid content-start justify-center overflow-hidden"
      style={MOSAIC_STYLES}
    >
      {tiles.map((tile, index) => (
        <Tile
          key={`${tile}-${index}`}
          name={tile}
          colors={generateTileColors()}
          rotation={generateTileRotations()}
        />
      ))}
    </div>
  );
}

export { MosaicDisplay };

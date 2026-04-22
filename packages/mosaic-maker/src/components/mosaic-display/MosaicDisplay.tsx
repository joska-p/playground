import { useMosaicMakerContext } from "../../context/mosaicContext.js";
import {
  CSS_VARS,
  initialGapSize,
  initialPalette,
  initialRotations,
  initialTileSize,
} from "../../core/config.js";
import { Tile } from "../tiles/Tile.js";

const MOSAIC_STYLES = {
  ...initialPalette,
  ...initialTileSize,
  ...initialGapSize,
  ...initialRotations,
  gridTemplateColumns: `repeat(auto-fill,var(${CSS_VARS.width}))`,
  gridTemplateRows: `repeat(auto-fill,var(${CSS_VARS.height}))`,
  gap: `var(${CSS_VARS.gap})`,
} as React.CSSProperties;

function MosaicDisplay() {
  const { mosaicRef, tiles } = useMosaicMakerContext();

  return (
    <div
      ref={mosaicRef}
      className="absolute inset-0 mt-2 grid content-start justify-center overflow-hidden"
      style={MOSAIC_STYLES}
    >
      {tiles.map((tile) => (
        <Tile key={tile.id} name={tile.name} colors={tile.colors} rotation={tile.rotation} />
      ))}
    </div>
  );
}

export { MosaicDisplay };

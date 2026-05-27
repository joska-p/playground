import { useResizeObserver } from "@repo/ui";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import {
  CSS_VARS,
  initialGapSize,
  initialPalette,
  initialRotations,
  initialTileSize,
} from "../../core/config.js";
import { initPalettes, setMosaicRef, useMosaicStore } from "../../store/useMosaicStore.js";
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
  const { tiles } = useMosaicStore(useShallow((state) => ({ tiles: state.tiles })));
  const [mosaicRef, dimensions] = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setMosaicRef(mosaicRef);
    }
  }, [dimensions.width, dimensions.height, mosaicRef]);

  useEffect(() => {
    initPalettes().catch((error) => {
      throw new Error("Failed to initialize palettes: " + error);
    });
  }, []);

  return (
    <div
      ref={mosaicRef}
      className="absolute inset-0 grid content-start justify-center overflow-hidden"
      style={MOSAIC_STYLES}
    >
      {tiles.map((tile) => (
        <Tile key={tile.id} name={tile.name} colors={tile.colors} rotation={tile.rotation} />
      ))}
    </div>
  );
}

export { MosaicDisplay };

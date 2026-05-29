import { useResizeObserver } from "@repo/ui/useResizeObserver";
import { useEffect } from "react";
import { initialGapSize, initialRotations, initialTileSize } from "../core/constants";
import { CSS_VARS } from "../core/cssVars";
import { initialPalette } from "../core/initialPalette";
import { initMosaicPalettes, regenerateMosaicTiles, setMosaicRef } from "../store/actions";
import { useMosaicTiles } from "../store/selectors";
import { Tile } from "./Tile";

const MOSAIC_STYLES = {
  ...initialPalette,
  ...initialTileSize,
  ...initialGapSize,
  ...initialRotations,
  gridTemplateColumns: `repeat(auto-fill,var(${CSS_VARS.size}))`,
  gridTemplateRows: `repeat(auto-fill,var(${CSS_VARS.size}))`,
  gap: `var(${CSS_VARS.gap})`,
} as React.CSSProperties;

function MosaicDisplay() {
  const tiles = useMosaicTiles();
  const [mosaicRef, dimensions] = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    if (dimensions.width <= 0 || dimensions.height <= 0) return;
    const id = setTimeout(() => {
      setMosaicRef(mosaicRef);
      regenerateMosaicTiles();
    }, 150);
    return () => clearTimeout(id);
  }, [dimensions.width, dimensions.height, mosaicRef]);

  useEffect(() => {
    initMosaicPalettes().catch((error) => {
      throw new Error("Failed to initialize palettes: " + error);
    });
  }, []);

  return (
    <div
      ref={mosaicRef}
      className="w-full h-full grid content-center justify-center overflow-hidden"
      style={MOSAIC_STYLES}
    >
      {tiles.map((tile) => (
        <Tile key={tile.id} name={tile.name} colors={tile.colors} rotation={tile.rotation} />
      ))}
    </div>
  );
}

export { MosaicDisplay };

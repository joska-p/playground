import { getRandom } from "@/lib/utils";
import { initialGapSize, initialPalette, initialRotations, initialTileSize } from "./config";
import { Tile } from "./tiles/tile";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  tiles: string[];
};

const MOSAIC_STYLES = {
  ...initialPalette,
  ...initialTileSize,
  ...initialGapSize,
  ...initialRotations,
} as React.CSSProperties;

const generateTileColors = () => {
  const paletteKeys = Object.keys(initialPalette);
  return Array.from({ length: 5 }, () => getRandom(paletteKeys)) as [string, string, string, string, string];
};

const Mosaic = ({ mosaicRef, tiles }: Props) => {
  return (
    <div
      ref={mosaicRef}
      className="absolute inset-0 grid grid-cols-[repeat(auto-fill,var(--tile-width))] grid-rows-[repeat(auto-fill,var(--tile-height),1fr)] content-start justify-center gap-[var(--mosaicGap)] overflow-hidden [--mosaicGap:0px] [--tile-height:64px] [--tile-width:64px]"
      style={MOSAIC_STYLES}
    >
      {tiles.map((tile, index) => (
        <Tile
          key={`${tile}-${index}`}
          name={tile}
          colors={generateTileColors()}
          rotation={getRandom(Object.keys(initialRotations))}
        />
      ))}
    </div>
  );
};

export { Mosaic };

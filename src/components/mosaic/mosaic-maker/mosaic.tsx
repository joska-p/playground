import { getRandom } from "@/lib/utils";
import type { Signal } from "@preact/signals-react";
import type { ComponentProps } from "react";
import { CSS_VARS, initialGapSize, initialPalette, initialRotations, initialTileSize } from "./config";
import { Tile } from "./tiles/tile";

interface Props extends ComponentProps<"div"> {
  mosaicRef: Signal<React.RefObject<HTMLDivElement | null>>;
  tiles: Signal<string[]>;
}

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
  return Array.from({ length: 5 }, () => getRandom(paletteKeys)) as [string, string, string, string, string];
}

function generateTileRotations() {
  const rotationKeys = Object.keys(initialRotations);
  return getRandom(rotationKeys);
}

function Mosaic({ mosaicRef, tiles }: Props) {
  return (
    <div
      ref={mosaicRef.value}
      className="absolute inset-0 grid content-start justify-center overflow-hidden"
      style={MOSAIC_STYLES}
    >
      {tiles.value.map((tile, index) => (
        <Tile key={`${tile}-${index}`} name={tile} colors={generateTileColors()} rotation={generateTileRotations()} />
      ))}
    </div>
  );
}

export { Mosaic };

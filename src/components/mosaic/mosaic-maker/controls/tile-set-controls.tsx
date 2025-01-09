import { cn } from "@/lib/utils";
import type { Signal } from "@preact/signals-react";
import { initialPalette, initialTileSet } from "../config";
import { Tile } from "../tiles/tile";

type Props = {
  tileSet: Signal<string[]>;
};

function TileSetControls({ tileSet }: Props) {
  const handleChangetileSet = (tileName: string) => {
    if (tileSet.value.length === 1 && tileName === tileSet.value[0]) return;

    const isTileInSet = tileSet.value.includes(tileName);
    const updatedTileSet = isTileInSet
      ? tileSet.value.filter((tile) => tile !== tileName)
      : [...tileSet.value, ...initialTileSet.filter((tile) => tile === tileName)];

    tileSet.value = updatedTileSet;
  };

  return (
    <fieldset
      className="flex flex-wrap items-center justify-center gap-4 [--rotation:0deg] [--tile-size:32px]"
      style={{ ...initialPalette } as React.CSSProperties}
    >
      {initialTileSet.map((tile) => {
        return (
          <label key={tile} aria-label={tile} className="flex flex-col gap-2">
            <input
              type="checkbox"
              checked={tileSet.value.includes(tile)}
              onChange={() => handleChangetileSet(tile)}
              className="peer sr-only"
            />
            <Tile
              name={tile}
              colors={Object.keys(initialPalette) as [string, string, string, string, string]}
              className={cn(
                "opacity-70 transition-opacity",
                "peer-checked:opacity-100 peer-checked:ring-4 peer-checked:ring-primary",
                "peer-focus-visible:ring-4 peer-focus-visible:ring-accent"
              )}
              rotation="--rotation-0"
            />
          </label>
        );
      })}
    </fieldset>
  );
}

export { TileSetControls };

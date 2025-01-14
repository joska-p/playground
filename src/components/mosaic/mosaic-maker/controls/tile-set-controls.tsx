import { initialPalette, initialTileSet } from "../config";
import { useMosaicMakerContext } from "../mosaic-context";
import { Tile } from "../tiles/tile";
import { cn } from "@/lib/utils";

function TileSetControls() {
  const { tileSet } = useMosaicMakerContext();

  const handleChangetileSet = (tileName: string) => {
    if (tileSet.value.length === 1 && tileName === tileSet.value[0]) return;

    const isTileInSet = tileSet.value.includes(tileName);
    const updatedTileSet = isTileInSet
      ? tileSet.value.filter((tile) => tile !== tileName)
      : [...tileSet.value, tileName];

    tileSet.value = updatedTileSet;
  };

  return (
    <fieldset
      className="flex flex-wrap items-center justify-center gap-4 [--rotation:0deg] [--tile-size:32px]"
      style={{ ...initialPalette } as React.CSSProperties}
    >
      {initialTileSet.map((tileName) => {
        return (
          <label key={tileName} aria-label={tileName} className="flex flex-col gap-2">
            <input
              type="checkbox"
              checked={tileSet.value.includes(tileName)}
              onChange={() => handleChangetileSet(tileName)}
              className="peer sr-only"
            />
            <Tile
              name={tileName}
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

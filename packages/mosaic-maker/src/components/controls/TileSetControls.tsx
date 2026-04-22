import { useMosaicStore, updateTileSet } from "../../store/useMosaicStore.js";
import { useShallow } from "zustand/shallow";
import { initialPalette, initialTileSet } from "../../core/config.js";
import { twMerge } from "tailwind-merge";
import { Tile } from "../tiles/Tile.js";

function TileSetControls() {
  const { tileSet } = useMosaicStore(useShallow((state) => ({ tileSet: state.tileSet })));

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
              checked={tileSet.includes(tileName)}
              onChange={() => updateTileSet(tileName)}
              className="peer sr-only"
            />
            <Tile
              name={tileName}
              colors={Object.keys(initialPalette) as [string, string, string, string, string]}
              className={twMerge(
                "opacity-70 transition-opacity",
                "peer-checked:ring-primary peer-checked:opacity-100 peer-checked:ring-4",
                "peer-focus-visible:ring-accent peer-focus-visible:ring-4"
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

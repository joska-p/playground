import { useMosaicMakerContext } from "../Mosaic-context";
import { initialPalette, initialTileSet } from "../config";
import { twMerge } from "tailwind-merge";
import { Tile } from "../tiles/Tile";

function TileSetControls() {
  const { tileSet, updateTileSet } = useMosaicMakerContext();

  return (
    <fieldset
      className="mm:flex mm:flex-wrap mm:items-center mm:justify-center mm:gap-4 mm:[--rotation:0deg] mm:[--tile-size:32px]"
      style={{ ...initialPalette } as React.CSSProperties}
    >
      {initialTileSet.map((tileName) => {
        return (
          <label
            key={tileName}
            aria-label={tileName}
            className="mm:flex mm:flex-col mm:gap-2"
          >
            <input
              type="checkbox"
              checked={tileSet.includes(tileName)}
              onChange={() => updateTileSet(tileName)}
              className="mm:peer mm:sr-only"
            />
            <Tile
              name={tileName}
              colors={
                Object.keys(initialPalette) as [
                  string,
                  string,
                  string,
                  string,
                  string,
                ]
              }
              className={twMerge(
                "mm:opacity-70 mm:transition-opacity",
                "mm:peer-checked:ring-primary mm:peer-checked:opacity-100 mm:peer-checked:ring-4",
                "mm:peer-focus-visible:ring-accent mm:peer-focus-visible:ring-4",
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

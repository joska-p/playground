import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { initialPalette, initialTileSet } from "../config";
import { Tile } from "../tiles/tile";

type Props = {
  tileSet: string[];
  setTileSet: React.Dispatch<React.SetStateAction<string[]>>;
  setNewTiles: (tileSet?: string[]) => void;
};

const TileSetControls = ({ tileSet, setTileSet, setNewTiles }: Props) => {
  const handleChangetileSet = useCallback(
    (tileName: string) => {
      if (tileSet.length === 1 && tileName === tileSet[0]) return;

      const isTileInSet = tileSet.includes(tileName);
      const updatedTileSet = isTileInSet
        ? tileSet.filter((tile) => tile !== tileName)
        : [...tileSet, ...initialTileSet.filter((tile) => tile === tileName)];

      setTileSet(updatedTileSet);
      setNewTiles(updatedTileSet);
    },
    [tileSet, setTileSet, setNewTiles]
  );

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
              checked={tileSet.includes(tile)}
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
};

export { TileSetControls };

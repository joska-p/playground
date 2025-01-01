import { cn } from "@/lib/utils";
import { Tile } from "../tiles/Tile";
import type { DefaultTileSet } from "../tiles/default-options";
import { defaulColors as colors } from "../tiles/default-options";

type Props = {
  initialTileSet: DefaultTileSet;
  mosaicTileSet: DefaultTileSet;
  setMosaicTileSet: React.Dispatch<React.SetStateAction<DefaultTileSet>>;
  handleSetNewTiles: (tileset?: DefaultTileSet) => void;
};

const TileSetControls = ({
  initialTileSet,
  mosaicTileSet,
  setMosaicTileSet,
  handleSetNewTiles,
}: Props) => {
  const handleChangeMosaicTileSet = (tileName: string) => {
    if (mosaicTileSet.length === 1 && tileName === mosaicTileSet[0]) return;

    if (mosaicTileSet.find((tile) => tile === tileName)) {
      const newTileSet = mosaicTileSet.filter((tile) => tile !== tileName);
      setMosaicTileSet(newTileSet);
      handleSetNewTiles(newTileSet);
    } else {
      const newTile = initialTileSet.filter((tile) => tile === tileName);
      const newTileSet = [...mosaicTileSet, ...newTile];
      setMosaicTileSet(newTileSet);
      handleSetNewTiles(newTileSet);
    }
  };

  const styleObject = {
    ...colors,
    "--tile-width": "32px",
    "--tile-height": "32px",
    "--rotation": "0deg",
  } as React.CSSProperties;

  return (
    <fieldset className="flex flex-wrap items-center justify-center gap-4" style={styleObject}>
      {initialTileSet.map((tile) => {
        return (
          <label key={tile} aria-label={tile} className="flex flex-col gap-2">
            <input
              type="checkbox"
              checked={mosaicTileSet.includes(tile)}
              onChange={() => handleChangeMosaicTileSet(tile)}
              className="peer sr-only"
            />
            <Tile
              name={tile}
              colors={Object.keys(colors)}
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

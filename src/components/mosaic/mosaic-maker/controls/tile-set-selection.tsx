import { cn } from "@/lib/utils";
import { Tile } from "../tiles/tile";
import { initialPalette, initialTileSet } from "../options";

type Props = {
  tileSet: typeof initialTileSet;
  setTileSet: React.Dispatch<React.SetStateAction<typeof initialTileSet>>;
};

const TileSetSelection = ({ tileSet, setTileSet }: Props) => {
  const handleChangetileSet = (tileName: string) => {
    if (tileSet.length === 1 && tileName === tileSet[0]) return;

    const isTileInSet = tileSet.includes(tileName);
    const updatedTileSet = isTileInSet
      ? tileSet.filter((tile) => tile !== tileName)
      : [...tileSet, ...initialTileSet.filter((tile) => tile === tileName)];

    setTileSet(updatedTileSet);
  };

  const styleObject = {
    ...initialPalette,
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
              checked={tileSet.includes(tile)}
              onChange={() => handleChangetileSet(tile)}
              className="peer sr-only"
            />
            <Tile
              name={tile}
              colors={Object.keys(initialPalette)}
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

export { TileSetSelection };

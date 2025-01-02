import { cn } from "@/lib/utils";
import { Tile } from "../tiles/tile";
import { defaultPalette, defaultTileSet } from "../tiles/default-options";

type Props = {
  mosaicTileSet: typeof defaultTileSet;
  setMosaicTileSet: React.Dispatch<React.SetStateAction<typeof defaultTileSet>>;
};

const TileSetControls = ({ mosaicTileSet, setMosaicTileSet }: Props) => {
  const handleChangeMosaicTileSet = (tileName: string) => {
    if (mosaicTileSet.length === 1 && tileName === mosaicTileSet[0]) return;

    const isTileInSet = mosaicTileSet.includes(tileName);
    const updatedTileSet = isTileInSet
      ? mosaicTileSet.filter((tile) => tile !== tileName)
      : [...mosaicTileSet, ...defaultTileSet.filter((tile) => tile === tileName)];

    setMosaicTileSet(updatedTileSet);
  };

  const styleObject = {
    ...defaultPalette,
    "--tile-width": "32px",
    "--tile-height": "32px",
    "--rotation": "0deg",
  } as React.CSSProperties;

  return (
    <fieldset className="flex flex-wrap items-center justify-center gap-4" style={styleObject}>
      {defaultTileSet.map((tile) => {
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
              colors={Object.keys(defaultPalette)}
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

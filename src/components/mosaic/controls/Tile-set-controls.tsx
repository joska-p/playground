import { Label } from "@ui/label";

import type { DefaultTileSet } from "../Mosaic";
import Tile from "../tiles/Tile";

import { initialColors } from "@/components/mosaic/lib/colors";

type Props = {
  initialTileSet: DefaultTileSet;
  handleSetNewTiles: (newMosaicTileSet: DefaultTileSet) => void;
  mosaicTileSet: DefaultTileSet;
  setMosaicTileSet: React.Dispatch<React.SetStateAction<string[]>>;
};

const TileSetControls = ({
  initialTileSet,
  handleSetNewTiles,
  mosaicTileSet,
  setMosaicTileSet,
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
    ...initialColors,
    "--tile-width": "32px",
    "--tile-height": "32px",
    "--rotation": "0deg",
  } as React.CSSProperties;

  return (
    <fieldset className="flex flex-wrap justify-center gap-4" style={styleObject}>
      {initialTileSet.map((tile) => {
        return (
          <Label key={tile} className="flex flex-col gap-2">
            <input
              type="checkbox"
              checked={mosaicTileSet.find((element) => element === tile) ? true : false}
              onChange={() => handleChangeMosaicTileSet(tile)}
              className="peer sr-only"
            />
            <Tile
              name={tile}
              colors={Object.keys(initialColors)}
              className="peer-checked:ring-4"
              rotation="--rotation-0"
            />
          </Label>
        );
      })}
    </fieldset>
  );
};

export default TileSetControls;

import { colorNames, initialColors } from "@/components/mosaic/lib/colors";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import type { DefaultTileSet } from "../Mosaic";
import Tile from "../tiles/Tile";

type Props = {
  initialTileSet: DefaultTileSet;
  setNewTiles: (newMosaicTileSet: DefaultTileSet) => void;
  mosaicTileSet: DefaultTileSet;
  setMosaicTileSet: React.Dispatch<React.SetStateAction<string[]>>;
};

const styleObject = {
  "--tile-width": "32px",
  "--tile-height": "32px",
  "--rotation": "0deg",
  ...initialColors,
} as React.CSSProperties;

const TileSetControls = ({
  initialTileSet,
  setNewTiles,
  mosaicTileSet,
  setMosaicTileSet,
}: Props) => {
  const handleChangeMosaicTileSet = (tileName: string) => {
    if (mosaicTileSet.length === 1 && tileName === mosaicTileSet[0]) return;

    if (mosaicTileSet.find((tile) => tile === tileName)) {
      const newTileSet = mosaicTileSet.filter((tile) => tile !== tileName);
      setMosaicTileSet(newTileSet);
      setNewTiles(newTileSet);
    } else {
      const newTile = initialTileSet.filter((tile) => tile === tileName);
      const newTileSet = [...mosaicTileSet, ...newTile];
      setMosaicTileSet(newTileSet);
      setNewTiles(newTileSet);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {initialTileSet.map((tile) => {
        return (
          <div key={tile} className="items-top flex items-center space-x-2" style={styleObject}>
            <Input
              type="checkbox"
              id={tile}
              checked={mosaicTileSet.find((element) => element === tile) ? true : false}
              onChange={() => handleChangeMosaicTileSet(tile)}
            />
            <Label
              htmlFor={tile}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Tile name={tile} colors={colorNames} rotation={0} />
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default TileSetControls;

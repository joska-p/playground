import { colorNames } from "@/components/mosaic/lib/colors";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import type { ColorName } from "../lib/colors";
import type { DefaultTileSet } from "../Mosaic";
import Tile from "../tiles/Tile";

type Props = {
  initialTileSet: DefaultTileSet;
  mosaicTileSet: DefaultTileSet;
  setMosaicTileSet: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        colorNames: ColorName[];
        rotation: number;
      }[]
    >
  >;
};

const styleObject = {
  "--tile-width": "32px",
  "--tile-height": "32px",
  "--rotation": "0deg",
  [colorNames[0]]: "#555555",
  [colorNames[1]]: "#777777",
  [colorNames[2]]: "#999999",
  [colorNames[3]]: "#bbbbbb",
  [colorNames[4]]: "#dddddd",
} as React.CSSProperties;

const TileSetControls = ({ initialTileSet, mosaicTileSet, setMosaicTileSet }: Props) => {
  const handleChangeMosaicTileSet = (tileName: string) => {
    if (mosaicTileSet.length === 1 && tileName === mosaicTileSet[0].name) return;

    if (mosaicTileSet.find((tile) => tile.name === tileName)) {
      setMosaicTileSet((prev) => prev.filter((tile) => tile.name !== tileName));
    } else {
      const newTile = initialTileSet.filter((tile) => tile.name === tileName);
      setMosaicTileSet((prev) => [...prev, ...newTile]);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {initialTileSet.map((tile) => {
        return (
          <div
            key={tile.name}
            className="items-top flex items-center space-x-2"
            style={styleObject}
          >
            <Input
              type="checkbox"
              id={tile.name}
              checked={mosaicTileSet.find((element) => element.name === tile.name) ? true : false}
              onChange={() => handleChangeMosaicTileSet(tile.name)}
            />
            <Label
              htmlFor={tile.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Tile name={tile.name} colorNames={colorNames} rotation={0} />
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default TileSetControls;

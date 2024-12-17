import { colorNames } from "@/components/mosaic/lib/colors";
import { Checkbox } from "@ui/checkbox";
import { Label } from "@ui/label";
import type { DefaultTileSet } from "../Mosaic";
import Tile from "../tiles/Tile";

type Props = {
  initialTileSet: DefaultTileSet;
  tileSet: DefaultTileSet;
  handleChangeTileSet: (tileName: string) => void;
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

const TileSetControls = ({ initialTileSet, tileSet, handleChangeTileSet }: Props) => {
  return (
    <div className="flex flex-wrap gap-4">
      {initialTileSet.map((tile) => {
        return (
          <div
            key={tile.name}
            className="items-top flex items-center space-x-2"
            style={styleObject}
          >
            <Checkbox
              id={tile.name}
              checked={tileSet.find((element) => element.name === tile.name) ? true : false}
              onCheckedChange={() => handleChangeTileSet(tile.name)}
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

import { colorNames } from "@/components/mosaic/lib/colors"
import { Checkbox } from "@ui/checkbox"
import { Label } from "@ui/label"
import type { Tiles } from "../Mosaic"

type Props = {
  initialTileSet: Tiles
  tileSet: Tiles
  handleChangeTileSet: (tileName: string) => void
}

const TileSetControls = ({ initialTileSet, tileSet, handleChangeTileSet }: Props) => {
  return (
    <div className="flex flex-wrap gap-4">
      {initialTileSet.map((Tile) => {
        const styleObject = {
          "--tile-width": "32px",
          "--tile-height": "32px",
          "--rotation": "0deg",
          [colorNames[0]]: "#555555",
          [colorNames[1]]: "#777777",
          [colorNames[2]]: "#999999",
          [colorNames[3]]: "#bbbbbb",
          [colorNames[4]]: "#dddddd",
        } as React.CSSProperties
        return (
          <div
            key={Tile.name}
            className="items-top flex items-center space-x-2"
            style={styleObject}
          >
            <Checkbox
              id={Tile.name}
              checked={tileSet.find((tile) => tile.name === Tile.name) ? true : false}
              onCheckedChange={() => handleChangeTileSet(Tile.name)}
            />
            <Label
              htmlFor={Tile.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Tile colors={colorNames} rotation={0} />
            </Label>
          </div>
        )
      })}
    </div>
  )
}

export default TileSetControls

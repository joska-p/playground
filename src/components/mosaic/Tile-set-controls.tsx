import { colorNames } from "@lib/colors"
import { Checkbox } from "@ui/checkbox"
import { initialTileSet } from "./Mosaic"

type Props = {
  initialTileSet: typeof initialTileSet
  tileSet: typeof initialTileSet
  handleChangeTileSet: (tileName: string) => void
}

const TileSetControls = ({ initialTileSet, tileSet, handleChangeTileSet }: Props) => {
  return (
    <div className="flex flex-wrap justify-around gap-2 lg:mx-auto lg:grid lg:grid-cols-2 lg:place-content-center lg:items-start lg:gap-8">
      {initialTileSet.map((Tile, index) => {
        const styleObject = {
          "--tile-width": "32px",
          "--tile-height": "32px",
          [colorNames[0]]: "#555555",
          [colorNames[1]]: "#777777",
          [colorNames[2]]: "#999999",
          [colorNames[3]]: "#bbbbbb",
          [colorNames[4]]: "#dddddd",
          "--rotation": "0deg",
        } as React.CSSProperties
        return (
          <div key={Tile.name} className="items-top flex space-x-2" style={styleObject}>
            <Checkbox
              id="terms1"
              name={Tile.name}
              value={Tile.name}
              checked={tileSet.find((tile) => tile.name === Tile.name) ? true : false}
              onCheckedChange={() => handleChangeTileSet(Tile.name)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <Tile colors={colorNames} rotation={0} />
              </label>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TileSetControls

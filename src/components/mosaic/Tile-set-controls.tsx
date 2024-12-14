import { colorNames } from "#lib/colors.ts"
import { initialTileSet } from "./Mosaic"

type Props = {
  initialTileSet: typeof initialTileSet
  tileSet: typeof initialTileSet
  handleChangeTileSet: (event: React.ChangeEvent<HTMLInputElement>) => void
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
          <label
            key={index}
            style={styleObject}
            className="rounded-sm bg-gray-900 p-1 opacity-50 transition-all hover:opacity-100 has-[:checked]:bg-gray-900 has-[:checked]:opacity-100 has-[:checked]:ring-2 has-[:checked]:ring-inset has-[:checked]:ring-blue-400"
          >
            <input
              type="checkbox"
              name={Tile.name}
              value={Tile.name}
              checked={tileSet.find((tile) => tile.name === Tile.name) ? true : false}
              onChange={handleChangeTileSet}
              className="sr-only"
            />
            <Tile colors={colorNames} rotation={0} />
          </label>
        )
      })}
    </div>
  )
}

export default TileSetControls

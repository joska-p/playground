import Square from "#components/tiles/Square.tsx"
import Triangle from "#components/tiles/Triangle.tsx"
import type { Palette } from "#lib/colors.ts"
import { getRandomColor } from "#lib/colors.ts"

const RandomTile = ({
  width,
  height,
  palette,
}: {
  width: number
  height: number
  palette: Palette
}) => {
  const Tile = [Square, Triangle][Math.floor(Math.random() * 2)]
  return (
    <Tile
      width={width}
      height={height}
      color1={getRandomColor(palette)}
      color2={getRandomColor(palette)}
      color3={getRandomColor(palette)}
      color4={getRandomColor(palette)}
    />
  )
}

export default RandomTile

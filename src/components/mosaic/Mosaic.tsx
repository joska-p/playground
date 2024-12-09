import Square from "#components/tiles/Square.tsx"
import Triangle from "#components/tiles/Triangle.tsx"
import { useEffect, useState } from "react"

type Palette = [string, string, string, string, string]

const getRandomPalette = async () => {
  const palettes = (await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then(
    (response) => response.json()
  )) as Palette[]
  const palette = palettes[Math.floor(Math.random() * palettes.length)]
  return palette
}

const getRandomColor = (palette: string[]) => {
  return palette[Math.floor(Math.random() * palette.length)]
}

const getRandomTiles = async ({
  numberOfColumns,
  numberOfRows,
}: {
  numberOfColumns: number
  numberOfRows: number
}) => {
  const tilesType = [Square, Triangle]
  const palette = await getRandomPalette()

  const numberOfTiles = numberOfColumns * numberOfRows

  const createTile = () => {
    const color1 = getRandomColor(palette)
    const color2 = getRandomColor(palette)
    const color3 = getRandomColor(palette)
    const color4 = getRandomColor(palette)
    const randomTile = tilesType[Math.floor(Math.random() * tilesType.length)]
    return { color1, color2, color3, color4, randomTile }
  }

  const tiles = Array.from({ length: numberOfTiles }, createTile)

  return tiles
}

type Props = {
  numberOfColumns: number
  numberOfRows: number
  tileWidth: number
  tileHeight: number
}

type Tiles = Awaited<ReturnType<typeof getRandomTiles>>

const Mosaic = ({ numberOfColumns, numberOfRows, tileWidth, tileHeight }: Props) => {
  const [tiles, setTiles] = useState<Tiles | null>(null)

  const stylesObj = {
    gridTemplateColumns: `repeat(${numberOfColumns}, ${tileWidth}px)`,
    gridTemplateRows: `repeat(${numberOfRows}, ${tileHeight}px)`,
  }

  useEffect(() => {
    const getTiles = async () => {
      const tiles = await getRandomTiles({
        numberOfColumns,
        numberOfRows,
      })
      setTiles(tiles)
    }
    getTiles()
    return () => setTiles(null)
  }, [])

  return (
    <div className="tiles grid place-content-center" style={stylesObj}>
      {tiles &&
        tiles.map((Tile) => (
          <Tile.randomTile
            width={tileWidth}
            height={tileHeight}
            color1={Tile.color1}
            color2={Tile.color2}
            color3={Tile.color3}
            color4={Tile.color4}
          />
        ))}
    </div>
  )
}

export default Mosaic

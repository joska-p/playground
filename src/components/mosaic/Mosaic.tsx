import Square from "#components/tiles/Square.tsx"
import Triangle from "#components/tiles/Triangle.tsx"
import { useEffect, useRef, useState } from "react"

type Palette = [string, string, string, string, string] | []

const tilesComponents = [Square, Triangle]

const getRandomPalette = async () => {
  const palettes = (await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then(
    (response) => response.json()
  )) as Palette[]
  return palettes[Math.floor(Math.random() * palettes.length)]
}

const getRandomColor = (palette: string[]) => {
  return palette[Math.floor(Math.random() * palette.length)]
}

const createTile = ({ id, palette }: { id: number; palette: string[] }) => {
  return {
    id,
    color1: getRandomColor(palette),
    color2: getRandomColor(palette),
    color3: getRandomColor(palette),
    color4: getRandomColor(palette),
    randomTile: tilesComponents[Math.floor(Math.random() * tilesComponents.length)],
  }
}

const getRandomTiles = async ({
  numberOfTiles = 100,
  palette,
}: {
  numberOfTiles: number
  palette: Palette
}) => {
  return Array.from({ length: numberOfTiles }, (_, index) => createTile({ id: index, palette }))
}

type Props = {
  tileWidth: number
  tileHeight: number
}

const Mosaic = ({ tileWidth, tileHeight }: Props) => {
  const [tiles, setTiles] = useState<Awaited<ReturnType<typeof getRandomTiles>> | []>([])
  const [palette, setPalette] = useState<Palette>([])
  const mosaicRef = useRef<HTMLDivElement>(null)

  const generatePalette = async () => {
    const palette = await getRandomPalette()
    setPalette(palette)
  }

  const getNumberOfTiles = () => {
    if (mosaicRef.current) {
      const mosaicWidth = mosaicRef.current.offsetWidth
      const mosaicHeight = mosaicRef.current.offsetHeight
      const numberOfTiles =
        Math.floor(mosaicWidth / tileWidth) * Math.floor(mosaicHeight / tileHeight)
      return numberOfTiles
    }
    return 0
  }

  const generateTiles = async () => {
    const numberOfTiles = getNumberOfTiles()
    const tiles = await getRandomTiles({ numberOfTiles, palette })
    setTiles(tiles)
  }

  useEffect(() => {
    generatePalette()
  }, [])

  useEffect(() => {
    generateTiles()
    window.addEventListener("resize", generateTiles)
    return () => {
      window.removeEventListener("resize", generateTiles)
    }
  }, [palette])

  return (
    <div
      className="tiles w-full h-full justify-center content-center flex flex-wrap mx-auto"
      ref={mosaicRef}
    >
      {tiles.map((Tile) => (
        <Tile.randomTile
          key={Tile.id}
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

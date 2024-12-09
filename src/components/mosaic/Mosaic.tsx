import Square from "#components/tiles/Square.tsx"
import Triangle from "#components/tiles/Triangle.tsx"
import type { Palette } from "#lib/colors.ts"
import { getRandomPalette } from "#lib/colors.ts"
import { getNumberOfTiles } from "#lib/tiles.tsx"
import { useEffect, useRef, useState } from "react"

type Props = {
  tileWidth: number
  tileHeight: number
}

const getRandomTile = () => [Square, Triangle][Math.floor(Math.random() * 2)]

const Mosaic = ({ tileWidth = 32, tileHeight = 32 }: Props) => {
  const [tileSize, setTileSize] = useState({ width: tileWidth, height: tileHeight })
  const [tiles, setTiles] = useState<JSX.Element[]>([])
  const [palette, setPalette] = useState<Palette>([])
  const mosaicRef = useRef<HTMLDivElement>(null)

  const styleObject = {
    "--bg-color": palette[0],
    "--color-1": palette[1],
    "--color-2": palette[2],
    "--color-3": palette[3],
    "--color-4": palette[4],
    "--tile-width": `${tileSize.width}px`,
    "--tile-height": `${tileSize.height}px`,
    backgroundColor: "var(--bg-color)",
  }

  const generatePalette = async () => {
    const palette = await getRandomPalette()
    setPalette(palette)
  }

  const generateTiles = async () => {
    if (mosaicRef.current) {
      const numberOfTiles = getNumberOfTiles({
        tileWidth: tileSize.width,
        tileHeight: tileSize.height,
        mosaicWidth: mosaicRef.current.offsetWidth,
        mosaicHeight: mosaicRef.current.offsetHeight,
      })

      const tiles = Array.from({ length: numberOfTiles }, (_, index) => {
        const Tile = getRandomTile()
        return <Tile key={index} />
      })
      setTiles(tiles)
    }
  }

  const handleResizeTiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileSize({ width: e.target.valueAsNumber, height: e.target.valueAsNumber })
    generateTiles()
  }

  useEffect(() => {
    generatePalette()
    generateTiles()
  }, [])

  return (
    <div
      style={styleObject}
      className="tiles w-full h-full justify-center content-center flex flex-wrap mx-auto"
      ref={mosaicRef}
    >
      {tiles}
      <div className="absolute gap-2 top-4 right-4 flex flex-col items-center justify-center text-gray-50 bg-gray-800/50 py-4 px-8 rounded-lg">
        <button
          type="button"
          onClick={generatePalette}
          className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Regenerate palette
        </button>
        <button
          type="button"
          onClick={generateTiles}
          className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Regenerate tiles
        </button>
        <label htmlFor="tile-size" className="block mb-2 text-sm font-medium text-gray-50">
          Tile size: {tileSize.width}px x {tileSize.height}px
        </label>
        <input
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          id="tile-size"
          type="range"
          name="Tile size"
          min="64"
          step={1}
          max="256"
          value={tileSize.width}
          onChange={handleResizeTiles}
        />
      </div>
    </div>
  )
}

export default Mosaic

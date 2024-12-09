import Square from "#components/tiles/Square.tsx"
import Triangle from "#components/tiles/Triangle.tsx"
import type { Palette } from "#lib/colors.ts"
import { colors, getRandomPalette } from "#lib/colors.ts"
import { getNumberOfTiles } from "#lib/tiles.tsx"
import { useEffect, useRef, useState } from "react"

const getRandomTile = () => [Square, Triangle][Math.floor(Math.random() * 2)]

const useMosaic = ({ tileWidth = 32, tileHeight = 32 }) => {
  const [tileSize, setTileSize] = useState({ width: tileWidth, height: tileHeight })
  const [tiles, setTiles] = useState<{ Tile: () => JSX.Element; key: number }[]>([])
  const [palette, setPalette] = useState<Palette>([])
  const mosaicRef = useRef<HTMLDivElement>(null)

  const colorVariables = colors.reduce((acc: Record<string, string>, color, index) => {
    acc[color] = palette[index + 1]
    return acc
  }, {})

  const styleObject = {
    ...colorVariables,
    "--bg-color": palette[0],
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
        return {
          Tile: Tile,
          key: index,
        }
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

  return {
    mosaicRef,
    styleObject,
    handleResizeTiles,
    tiles,
    tileSize,
    generateTiles,
    generatePalette,
  }
}

export { useMosaic }

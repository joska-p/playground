import Square from "#components/tiles/Square.tsx"
import Triangle from "#components/tiles/Triangle.tsx"
import type { Palette } from "#lib/colors.ts"
import { colors, getRandomPalette } from "#lib/colors.ts"
import { getNumberOfTiles } from "#lib/tiles.tsx"
import { shuffleObject } from "#lib/utils.ts"
import { useEffect, useRef, useState } from "react"

const getRandomTileComponent = () => [Square, Triangle][Math.floor(Math.random() * 2)]
const getColorVariables = (palette: Palette) => {
  return colors.reduce((acc: Record<string, string>, color, index) => {
    acc[color] = palette[index]
    return acc
  }, {})
}

const useMosaic = ({ tileWidthPx = 32, tileHeightPx = 32 }) => {
  const [tileSize, setTileSize] = useState({ widthPx: tileWidthPx, heightPx: tileHeightPx })
  const [tiles, setTiles] = useState<{ Tile: () => JSX.Element; key: number }[]>([])
  const [palette, setPalette] = useState<Palette>([])
  const [colorVariables, setColorVariables] = useState<Record<string, string>>({})
  const mosaicRef = useRef<HTMLDivElement>(null)

  const styleObject = {
    ...colorVariables,
    "--tile-width": `${tileSize.widthPx}px`,
    "--tile-height": `${tileSize.heightPx}px`,
    backgroundColor: "var(--color-0)",
  }

  const getPalette = async () => {
    const newPalette = await getRandomPalette()
    setPalette(newPalette)
  }

  const getTiles = () => {
    if (!mosaicRef.current) return

    const numberOfTiles = getNumberOfTiles({
      tileWidth: tileSize.widthPx,
      tileHeight: tileSize.heightPx,
      mosaicWidth: mosaicRef.current.offsetWidth,
      mosaicHeight: mosaicRef.current.offsetHeight,
    })

    const newTiles = Array.from({ length: numberOfTiles }, (_, index) => {
      const Tile = getRandomTileComponent()
      return { Tile, key: index }
    })

    setTiles(newTiles)
  }

  const shuffleColorVariables = () => {
    setColorVariables((prev) => shuffleObject(prev))
  }

  const handleResizeTiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = event.target.valueAsNumber
    setTileSize({ widthPx: newSize, heightPx: newSize })
    getTiles()
  }

  useEffect(() => {
    setColorVariables(getColorVariables(palette))
  }, [palette])

  useEffect(() => {
    getPalette()
    getTiles()
  }, [])

  return {
    mosaicRef,
    styleObject,
    handleResizeTiles,
    tiles,
    tileSize,
    getTiles,
    getPalette,
    shuffleColorVariables,
  }
}

export { useMosaic }

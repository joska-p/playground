import CornerCircles from "#components/tiles/Corner-circles.tsx"
import OppositeCircles from "#components/tiles/Opposite-circles.tsx"
import Square from "#components/tiles/Square.tsx"
import Triangle from "#components/tiles/Triangle.tsx"
import { colorNames, getCssColors, getRandomPalette } from "#lib/colors.ts"
import { getRandom, shuffleObject } from "#lib/utils.ts"
import { useEffect, useRef, useState } from "react"
import Controls from "./Controls"

const TILE_SET = [CornerCircles, OppositeCircles, Square, Triangle]

type MosaicProps = {
  tileWidth?: number
  tileHeight?: number
}

const Mosaic = ({ tileWidth = 100, tileHeight = 100 }: MosaicProps) => {
  const [tileSize, setTileSize] = useState({ width: tileWidth, height: tileHeight })
  const [palette, setPalette] = useState<string[]>([])
  const [cssColors, setCssColors] = useState<Record<string, string>>({})
  const [tiles, setTiles] = useState<JSX.Element[]>([])
  const mosaicRef = useRef<HTMLDivElement>(null)

  const styleObject = {
    ...cssColors,
    "--tile-width": `${tileSize.width}px`,
    "--tile-height": `${tileSize.height}px`,
    backgroundColor: "var(--color-0)",
    transition: "background-color 0.5s ease-in-out",
  }

  const getNewPalette = async () => {
    const newPalette = await getRandomPalette()
    setPalette(newPalette)
  }

  const getNewTiles = () => {
    if (mosaicRef.current) {
      const numberOfTiles =
        Math.floor(mosaicRef.current.offsetWidth / tileSize.width) *
        Math.floor(mosaicRef.current.offsetHeight / tileSize.height)

      const newTiles = Array.from({ length: numberOfTiles }, (_, index) => {
        const Tile = getRandom(TILE_SET)

        return <Tile key={index} random />
      })

      setTiles(newTiles)
    }
  }

  const shuffleCssColors = () => {
    setCssColors((prev) => shuffleObject(prev))
  }

  const handleResizeTiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = event.target.valueAsNumber
    setTileSize({ width: newSize, height: newSize })
  }

  useEffect(() => {
    setCssColors(getCssColors({ palette, colorNames }))
  }, [palette])

  useEffect(() => {
    getNewPalette()
    getNewTiles()
  }, [])

  return (
    <div
      style={styleObject}
      className="tiles mx-auto flex h-full w-full flex-wrap content-center justify-center"
      ref={mosaicRef}
    >
      {tiles}

      <Controls
        getNewPalette={getNewPalette}
        shuffleColors={shuffleCssColors}
        getNewTiles={getNewTiles}
        handleResizeTiles={handleResizeTiles}
        tileSize={tileSize}
      />
    </div>
  )
}

export default Mosaic

import Square from "#components/tiles/Square.tsx"
import Triangle from "#components/tiles/Triangle.tsx"
import { cssColorVariablesNames } from "#constants/css-variables-names.ts"
import type { Palette } from "#lib/colors.ts"
import { getRandomPalette } from "#lib/colors.ts"
import { getRandom, shuffleObject } from "#lib/utils.ts"
import { useEffect, useRef, useState } from "react"
import Controls from "./Controls"

const getCssColorVariables = (palette: Palette) => {
  return cssColorVariablesNames.reduce((acc: Record<string, string>, color, index) => {
    acc[color] = palette[index]
    return acc
  }, {})
}

type MosaicProps = {
  tileWidth?: number
  tileHeight?: number
}

const Mosaic = ({ tileWidth = 100, tileHeight = 100 }: MosaicProps) => {
  const [tileSize, setTileSize] = useState({ width: tileWidth, height: tileHeight })
  const [palette, setPalette] = useState<Palette>([])
  const [cssColorVariables, setCssColorVariables] = useState<Record<string, string>>({})
  const [tiles, setTiles] = useState<JSX.Element[]>([])
  const mosaicRef = useRef<HTMLDivElement>(null)

  const styleObject = {
    ...cssColorVariables,
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
    if (!mosaicRef.current) return

    const numberOfTiles =
      Math.floor(mosaicRef.current.offsetWidth / tileSize.width) *
      Math.floor(mosaicRef.current.offsetHeight / tileSize.height)

    const newTiles = Array.from({ length: numberOfTiles }, (_, index) => {
      const Tile = getRandom([Square, Triangle])
      const randomColors = cssColorVariablesNames.toSorted(() => Math.random() - 0.5)

      return <Tile key={index} colors={randomColors} />
    })

    setTiles(newTiles)
  }

  const shuffleCssColorVariables = () => {
    setCssColorVariables((prev) => shuffleObject(prev))
  }

  const handleResizeTiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = event.target.valueAsNumber
    setTileSize({ width: newSize, height: newSize })
    getNewTiles()
  }

  useEffect(() => {
    setCssColorVariables(getCssColorVariables(palette))
  }, [palette])

  useEffect(() => {
    getNewPalette()
    getNewTiles()
  }, [])

  return (
    <div
      style={styleObject}
      className="tiles w-full h-full justify-center content-center flex flex-wrap mx-auto"
      ref={mosaicRef}
    >
      {tiles}

      <Controls
        getNewPalette={getNewPalette}
        shuffleCssColorVariables={shuffleCssColorVariables}
        getNewTiles={getNewTiles}
        handleResizeTiles={handleResizeTiles}
        tileSize={tileSize}
      />
    </div>
  )
}

export default Mosaic

import { colorNames, getCssColors, getRandomPalette } from "#lib/colors.ts"
import { getRandom, shuffleObject } from "#lib/utils.ts"
import { useEffect, useRef, useState } from "react"
import Controls from "./Controls"

type MosaicProps = {
  tileWidth?: number
  tileHeight?: number
  initialTileSet: (({ colors }: { colors?: string[] }) => JSX.Element)[]
}

const Mosaic = ({ tileWidth = 100, tileHeight = 100, initialTileSet }: MosaicProps) => {
  const [tileSize, setTileSize] = useState({ width: tileWidth, height: tileHeight })
  const [tileSet, setTileSet] = useState(initialTileSet)
  const [palette, setPalette] = useState<string[]>([])
  const [cssColors, setCssColors] = useState<Record<string, string>>({})
  const [tiles, setTiles] = useState<JSX.Element[]>([])
  const mosaicRef = useRef<HTMLDivElement>(null)

  const styleObject = {
    ...cssColors,
    "--tile-width": `${tileSize.width}px`,
    "--tile-height": `${tileSize.height}px`,
    backgroundColor: "black",
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
        const Tile = getRandom(tileSet)

        return <Tile key={index} />
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
        tileSet={tileSet}
      />
    </div>
  )
}

export default Mosaic

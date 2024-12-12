import { colorNames, getCssColors, getRandomPalette } from "#lib/colors.ts"
import { getRandom, shuffleObject } from "#lib/utils.ts"
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import Controls from "./Controls"

type MosaicProps = {
  tileWidth?: number
  tileHeight?: number
  initialTileSet: (({
    colors,
    rotation,
  }: {
    colors?: string[]
    rotation?: number
  }) => JSX.Element)[]
}

const Mosaic = ({ tileWidth = 100, tileHeight = 100, initialTileSet }: MosaicProps) => {
  const [tileSize, setTileSize] = useState({ width: tileWidth, height: tileHeight })
  const [tileSet, setTileSet] = useState(initialTileSet)
  const [palette, setPalette] = useState<string[]>([])
  const [colors, setColors] = useState<Record<string, string>>({})
  const [tiles, setTiles] = useState<JSX.Element[]>([])
  const [gap, setGap] = useState(0)
  const mosaicRef = useRef<HTMLDivElement>(null)

  const styleObject = {
    ...colors,
    "--tile-width": `${tileSize.width}px`,
    "--tile-height": `${tileSize.height}px`,
    "--gap": `${gap}px`,
  } as CSSProperties

  const getNewPalette = async () => {
    const newPalette = await getRandomPalette()
    setPalette(newPalette)
  }

  const getNumberOfTiles = useCallback(() => {
    if (mosaicRef.current) {
      return (
        Math.floor(mosaicRef.current.offsetWidth / (tileSize.width + gap)) *
        Math.floor(mosaicRef.current.offsetHeight / (tileSize.height + gap))
      )
    }
  }, [mosaicRef, tileSize, gap])

  const getNewTiles = () => {
    const newTiles = Array.from({ length: getNumberOfTiles() || 0 }, (_, index) => {
      const Tile = getRandom(tileSet)

      return <Tile key={index} />
    })

    setTiles(newTiles)
  }

  const swapColors = () => {
    setColors((prev) => shuffleObject(prev))
  }

  const handleChangeGap = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = event.target.valueAsNumber
    setGap(newSize)
  }

  const handleResizeTiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = event.target.valueAsNumber
    setTileSize({ width: newSize, height: newSize })
  }

  const handleChangeTileSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = event.target
    const TileName = checkbox.value
    if (tileSet.length === 1 && tileSet[0].name === TileName) return
    if (tileSet.find((tile) => tile.name === TileName)) {
      setTileSet((prev) => prev.filter((tile) => tile.name !== TileName))
    } else {
      setTileSet((prev) => [...prev, ...initialTileSet.filter((tile) => tile.name === TileName)])
    }
  }

  useEffect(() => {
    setColors(getCssColors({ palette, colorNames }))
  }, [palette])

  useEffect(() => {
    const debounce = setTimeout(() => {
      getNewTiles()
    }, 500)
    return () => {
      clearTimeout(debounce)
    }
  }, [tileSet, tileSize, gap])

  useEffect(() => {
    getNewPalette()
    getNewTiles()

    window.addEventListener("resize", getNewTiles)
    return () => window.removeEventListener("resize", getNewTiles)
  }, [])

  return (
    <div className="grid h-dvh grid-rows-[1fr_auto] content-center overflow-hidden bg-gray-900 lg:grid-cols-[1fr_auto]">
      <div
        style={styleObject}
        className="tiles flex h-full w-full flex-wrap content-center justify-center gap-[var(--gap)] overflow-hidden pb-[var(--gap)] pr-[var(--gap)]"
        ref={mosaicRef}
      >
        {tiles}
      </div>
      <Controls
        getNewPalette={getNewPalette}
        swapColors={swapColors}
        getNewTiles={getNewTiles}
        handleResizeTiles={handleResizeTiles}
        tileSize={tileSize}
        initialTileSet={initialTileSet}
        tileSet={tileSet}
        handleChangeTileSet={handleChangeTileSet}
        gap={gap}
        handleChangeGap={handleChangeGap}
      />
    </div>
  )
}

export default Mosaic

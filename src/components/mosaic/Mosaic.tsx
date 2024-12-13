import CornerCircles from "#components/tiles/css/Corner-circles-css.tsx"
import MiddleCircles from "#components/tiles/css/Middle-circe-css.tsx"
import OppositeCircles from "#components/tiles/css/Opposite-circles-css.tsx"
import Square from "#components/tiles/css/Square-css.tsx"
import Triangle from "#components/tiles/css/Triangle-css.tsx"
import { getColors, getRandomPalette } from "#lib/colors.ts"
import { getRandom, shuffleObject } from "#lib/utils.ts"
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import Controls from "./Controls"

export const fallbackTileSet = [Square, Triangle, CornerCircles, MiddleCircles, OppositeCircles]

const Mosaic = ({ tileWidth = 100, tileHeight = 100, initialTileSet = fallbackTileSet }) => {
  const [tileSize, setTileSize] = useState({ width: tileWidth, height: tileHeight })
  const [tileSet, setTileSet] = useState(initialTileSet)
  const [colors, setColors] = useState(getColors())
  const [tiles, setTiles] = useState<JSX.Element[]>([])
  const [gap, setGap] = useState(0)
  const [mosaicSize, setMosaicSize] = useState({ width: 0, height: 0 })
  const mosaicRef = useRef<HTMLDivElement>(null)

  const styleObject = useMemo(
    () =>
      ({
        ...colors,
        "--tile-width": `${tileSize.width}px`,
        "--tile-height": `${tileSize.height}px`,
        "--gap": `${gap}px`,
      }) as CSSProperties,
    [colors, tileSize, gap]
  )

  const setNewColors = async () => {
    const newPalette = await getRandomPalette()
    setColors(getColors(newPalette))
  }

  const swapColors = () => {
    setColors((prev) => shuffleObject(prev))
  }

  const setNewTiles = () => {
    const numberOfTiles =
      Math.floor((mosaicRef.current?.offsetWidth || 0) / (tileSize.width + gap)) *
      Math.floor((mosaicRef.current?.offsetHeight || 0) / (tileSize.height + gap))

    const newTiles = Array.from({ length: numberOfTiles }, (_, index) => {
      const Tile = getRandom(tileSet)

      return <Tile key={index} />
    })

    setTiles(newTiles)
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
    const tileName = checkbox.value

    if (tileSet.find((tile) => tile.name === tileName)) {
      if (tileSet.length > 1) {
        checkbox.checked = false
        setTileSet((prev) => prev.filter((tile) => tile.name !== tileName))
      }
    } else {
      checkbox.checked = true
      const newTile = initialTileSet.filter((tile) => tile.name === tileName)
      setTileSet((prev) => [...prev, ...newTile])
    }
  }

  const handleWindowResize = () => {
    if (mosaicRef.current) {
      const mosaicWidth = mosaicRef.current?.offsetWidth || 0
      const mosaicHeight = mosaicRef.current?.offsetHeight || 0
      setMosaicSize({ width: mosaicWidth, height: mosaicHeight })
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      setNewTiles()
    }, 300)
    return () => {
      clearTimeout(debounce)
    }
  }, [tileSet, tileSize, gap, mosaicSize])

  useEffect(() => {
    setNewColors()
    setNewTiles()
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  return (
    <div className="grid h-dvh grid-rows-[1fr_auto] content-center overflow-hidden bg-gray-900 lg:grid-cols-[1fr_auto]">
      <div
        style={styleObject}
        className="tiles flex h-full w-full flex-wrap content-center justify-center gap-[var(--gap)] overflow-hidden p-[calc(var(--gap)/2)]"
        ref={mosaicRef}
      >
        {tiles}
      </div>
      <Controls
        setNewColors={setNewColors}
        swapColors={swapColors}
        setNewTiles={setNewTiles}
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

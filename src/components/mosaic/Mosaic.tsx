import CornerCircles from "@components/tiles/css/Corner-circles-css"
import MiddleCircles from "@components/tiles/css/Middle-circe-css"
import OppositeCircles from "@components/tiles/css/Opposite-circles-css"
import Square from "@components/tiles/css/Square-css"
import Triangle from "@components/tiles/css/Triangle-css"
import { getColors, getRandomPalette } from "@lib/colors"
import { getRandom, shuffleObject } from "@lib/utils"
import { SidebarProvider, SidebarTrigger } from "@ui/sidebar"
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import Controls from "./Controls"

export const initialTileSet = [Square, Triangle, CornerCircles, MiddleCircles, OppositeCircles]

const Mosaic = ({ tileWidth = 64, tileHeight = 64 }) => {
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

  const handleChangeGap = (value: number) => {
    setGap(value)
  }

  const handleResizeTiles = (value: number) => {
    setTileSize({ width: value, height: value })
  }

  const handleChangeTileSet = (tileName: string) => {
    if (tileSet.find((tile) => tile.name === tileName)) {
      if (tileSet.length > 1) {
        setTileSet((prev) => prev.filter((tile) => tile.name !== tileName))
      }
    } else {
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
    <SidebarProvider>
      <div
        style={styleObject}
        className="relative flex h-dvh w-full flex-wrap content-center justify-center gap-[var(--gap)] p-[calc(var(--gap)/2)]"
        ref={mosaicRef}
      >
        {tiles}
        <SidebarTrigger variant="ghost" className="bg-sidebar absolute right-2 top-2" />
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
    </SidebarProvider>
  )
}

export default Mosaic

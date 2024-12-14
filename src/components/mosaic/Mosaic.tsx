import Rainbow from "@/components/tiles/css/Rainbow-css"
import CornerCircles from "@components/tiles/css/Corner-circles-css"
import Diamond from "@components/tiles/css/Diamond-css"
import MiddleCircles from "@components/tiles/css/Middle-circe-css"
import OppositeCircles from "@components/tiles/css/Opposite-circles-css"
import Square from "@components/tiles/css/Square-css"
import Triangle from "@components/tiles/css/Triangle-css"
import { getColors, getColorsToUse, getRandomPalette } from "@lib/colors"
import { getRandom, shuffleObject } from "@lib/utils"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@ui/sidebar"
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import Controls from "./Controls"

export const initialTileSet = [
  Square,
  Triangle,
  CornerCircles,
  MiddleCircles,
  OppositeCircles,
  Rainbow,
  Diamond,
]

const Mosaic = ({ tileWidth = 64, tileHeight = 64 }) => {
  const [tileSize, setTileSize] = useState({ width: tileWidth, height: tileHeight })
  const [tileSet, setTileSet] = useState(initialTileSet)
  const [colors, setColors] = useState(getColors())
  const [tiles, setTiles] = useState<typeof initialTileSet>([])
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
    if (!mosaicRef.current) return

    const newNumberOfTiles =
      Math.floor(mosaicRef.current?.offsetWidth / (tileSize.width + gap)) *
      Math.floor(mosaicRef.current?.offsetHeight / (tileSize.height + gap))

    const newTiles = Array.from({ length: newNumberOfTiles }, () => {
      return getRandom(tileSet)
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

  const handleMosaicResize = () => {
    if (!mosaicRef.current) return
    const mosaicWidth = mosaicRef.current.offsetWidth
    const mosaicHeight = mosaicRef.current.offsetHeight
    setMosaicSize({ width: mosaicWidth, height: mosaicHeight })
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

    const observer = new ResizeObserver(() => {
      handleMosaicResize()
    })
    if (mosaicRef.current) observer.observe(mosaicRef.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <SidebarProvider>
      <SidebarInset>
        <div
          style={styleObject}
          className="relative flex h-dvh w-full flex-wrap content-center justify-center gap-[var(--gap)] overflow-hidden p-[calc(var(--gap)/2)]"
          ref={mosaicRef}
        >
          {tiles.map((Tile, index) => (
            <Tile
              key={index}
              colors={getColorsToUse()}
              rotation={[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}
            />
          ))}

          <SidebarTrigger variant="ghost" className="absolute right-2 top-2 bg-sidebar" />
        </div>
      </SidebarInset>

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

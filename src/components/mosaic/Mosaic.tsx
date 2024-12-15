import { getColors, getRandomPalette } from "@/components/mosaic/lib/colors"
import { getRandom, shuffleObject } from "@lib/utils"
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@ui/sidebar"
import { useEffect, useMemo, useRef, useState } from "react"
import Controls from "./controls/Controls"
import Grid from "./Grid"
import CornerCircles from "./tiles/Corner-circles-css"
import Diamond from "./tiles/Diamond-css"
import MiddleCircles from "./tiles/Middle-circe-css"
import OppositeCircles from "./tiles/Opposite-circles-css"
import Rainbow from "./tiles/Rainbow-css"
import Square from "./tiles/Square-css"
import Triangle from "./tiles/Triangle-css"

const defaultTileSet = [
  CornerCircles,
  Diamond,
  MiddleCircles,
  OppositeCircles,
  Rainbow,
  Square,
  Triangle,
]

export type Tiles = typeof defaultTileSet

const Mosaic = ({ tileWidth = 64, tileHeight = 64, initialTileSet = defaultTileSet }) => {
  const [tileSize, setTileSize] = useState({ width: tileWidth, height: tileHeight })
  const [tileSet, setTileSet] = useState<Tiles>(initialTileSet)
  const [colors, setColors] = useState(getColors())
  const [tiles, setTiles] = useState<Tiles>([])
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
      }) as React.CSSProperties,
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
    const newNumberOfTiles =
      Math.floor(mosaicSize.width / (tileSize.width + gap)) *
      Math.floor(mosaicSize.height / (tileSize.height + gap))

    const newTiles = Array.from({ length: newNumberOfTiles }, () => {
      return getRandom(tileSet)
    })
    setTiles(newTiles)
  }

  const handleResizeTiles = (value: number) => {
    setTileSize({ width: value, height: value })
  }

  const handleChangeGap = (value: number) => {
    setGap(value)
  }

  const handleMosaicResize = () => {
    if (!mosaicRef.current) return
    const mosaicWidth = mosaicRef.current.offsetWidth
    const mosaicHeight = mosaicRef.current.offsetHeight
    setMosaicSize({ width: mosaicWidth, height: mosaicHeight })
  }

  const handleChangeTileSet = (tileName: string) => {
    if (tileSet.find((tile) => tile.name === tileName) && tileSet.length > 1) {
      setTileSet((prev) => prev.filter((tile) => tile.name !== tileName))
    } else {
      const newTile = initialTileSet.filter((tile) => tile.name === tileName)
      setTileSet((prev) => [...prev, ...newTile])
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
    if (mosaicRef.current) {
      const observer = new ResizeObserver(() => {
        handleMosaicResize()
      })
      observer.observe(mosaicRef.current)
      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <SidebarProvider>
      <SidebarInset>
        <Grid tiles={tiles} ref={mosaicRef} styleObject={styleObject} />
        <SidebarTrigger variant="ghost" className="absolute right-2 top-2 bg-sidebar" />
      </SidebarInset>

      <Sidebar side="right" variant="inset">
        <Controls
          gap={gap}
          handleChangeGap={handleChangeGap}
          handleChangeTileSet={handleChangeTileSet}
          handleResizeTiles={handleResizeTiles}
          initialTileSet={initialTileSet}
          setNewColors={setNewColors}
          setNewTiles={setNewTiles}
          swapColors={swapColors}
          tileSet={tileSet}
          tileSize={tileSize}
        />
      </Sidebar>
    </SidebarProvider>
  )
}

export default Mosaic

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
    const numberOfTiles = tiles.length
    const newNumberOfTiles =
      Math.floor(mosaicSize.width / (tileSize.width + gap)) *
      Math.floor(mosaicSize.height / (tileSize.height + gap))

    if (newNumberOfTiles < numberOfTiles) {
      setTiles((prev) => prev.slice(0, newNumberOfTiles))
    }

    if (newNumberOfTiles === numberOfTiles) {
      const newTiles = Array.from({ length: newNumberOfTiles }, () => {
        return getRandom(tileSet)
      })
      setTiles(newTiles)
    }

    if (newNumberOfTiles > numberOfTiles) {
      const newTiles = Array.from({ length: newNumberOfTiles - numberOfTiles }, () => {
        return getRandom(tileSet)
      })
      setTiles((prev) => [...prev, ...newTiles])
    }
  }

  const handleChangeTileSet = (tileName: string) => {
    if (tileSet.length === 1 && tileName == tileSet[0].name) return

    if (tileSet.find((tile) => tile.name === tileName)) {
      setTileSet((prev) => prev.filter((tile) => tile.name !== tileName))
    } else {
      const newTile = initialTileSet.filter((tile) => tile.name === tileName)
      setTileSet((prev) => [...prev, ...newTile])
    }
  }

  useEffect(() => {
    setNewTiles()
  }, [gap, tileSize, mosaicSize])

  return (
    <SidebarProvider>
      <SidebarInset>
        <Grid
          tiles={tiles}
          ref={mosaicRef}
          styleObject={styleObject}
          setMosaicSize={setMosaicSize}
        />
        <SidebarTrigger variant="ghost" className="absolute right-2 top-2 bg-sidebar" />
      </SidebarInset>

      <Sidebar side="right" variant="inset">
        <Controls
          mosaicGap={gap}
          handleChangeGap={setGap}
          handleChangeTileSet={handleChangeTileSet}
          handleResizeTiles={setTileSize}
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

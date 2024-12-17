import {
  getColorProperties,
  getRandomColorsToUse,
  getRandomPalette,
} from "@/components/mosaic/lib/colors"
import { getRandom, shuffleObject } from "@lib/utils"
import { Sidebar, SidebarProvider, SidebarTrigger } from "@ui/sidebar"
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
  {
    name: CornerCircles.name,
    colorNames: getRandomColorsToUse(),
    rotation: getRandom([0, 90, 180, 270]),
  },
  {
    name: Diamond.name,
    colorNames: getRandomColorsToUse(),
    rotation: getRandom([0, 90, 180, 270]),
  },
  {
    name: MiddleCircles.name,
    colorNames: getRandomColorsToUse(),
    rotation: getRandom([0, 90, 180, 270]),
  },
  {
    name: OppositeCircles.name,
    colorNames: getRandomColorsToUse(),
    rotation: getRandom([0, 90, 180, 270]),
  },
  {
    name: Rainbow.name,
    colorNames: getRandomColorsToUse(),
    rotation: getRandom([0, 90, 180, 270]),
  },
  {
    name: Square.name,
    colorNames: getRandomColorsToUse(),
    rotation: getRandom([0, 90, 180, 270]),
  },
  {
    name: Triangle.name,
    colorNames: getRandomColorsToUse(),
    rotation: getRandom([0, 90, 180, 270]),
  },
]

export type DefaultTileSet = typeof defaultTileSet

const Mosaic = ({ tileWidth = 64, tileHeight = 64, initialTileSet = defaultTileSet }) => {
  const [mosaicTileSize, setMosaicTileSize] = useState({ width: tileWidth, height: tileHeight })
  const [mosaicTileSet, setMosaicTileSet] = useState(initialTileSet)
  const [colorProperties, setColorProperties] = useState(getColorProperties())
  const [mosaicTiles, setMosaicTiles] = useState<DefaultTileSet>([])
  const [mosaicGap, setMosaicGap] = useState(0)
  const mosaicRef = useRef<HTMLDivElement>(null)

  const styleObject = useMemo(
    () =>
      ({
        ...colorProperties,
        "--tile-width": `${mosaicTileSize.width}px`,
        "--tile-height": `${mosaicTileSize.height}px`,
        "--gap": `${mosaicGap}px`,
      }) as React.CSSProperties,
    [colorProperties, mosaicGap, mosaicTileSize]
  )

  const setNewColors = async () => {
    const newPalette = await getRandomPalette()
    setColorProperties(getColorProperties(newPalette))
  }

  const swapColors = () => {
    setColorProperties((prev) => shuffleObject(prev))
  }

  const createNewRandomTiles = (numbreOfTiles: number) => {
    const newTiles = Array.from({ length: numbreOfTiles }, () => {
      const newTileName = getRandom(mosaicTileSet).name
      return {
        name: newTileName,
        colorNames: getRandomColorsToUse(),
        rotation: getRandom([0, 90, 180, 270]),
      }
    })
    return newTiles
  }

  const setNewTiles = () => {
    if (!mosaicRef.current) return

    const numberOfTiles = mosaicTiles.length
    const newNumberOfTiles =
      Math.floor(mosaicRef.current.offsetWidth / (mosaicTileSize.width + mosaicGap)) *
      Math.floor(mosaicRef.current.offsetHeight / (mosaicTileSize.height + mosaicGap))

    if (newNumberOfTiles < numberOfTiles) {
      setMosaicTiles((prev) => prev.slice(0, newNumberOfTiles))
    }

    if (newNumberOfTiles === numberOfTiles) {
      const newTiles = createNewRandomTiles(newNumberOfTiles)
      setMosaicTiles(newTiles)
    }

    if (newNumberOfTiles > numberOfTiles) {
      const newTiles = createNewRandomTiles(newNumberOfTiles)
      setMosaicTiles((prev) => [...prev, ...newTiles])
    }
  }

  const handleChangeMosaicTileSet = (tileName: string) => {
    if (mosaicTileSet.length === 1 && tileName == mosaicTileSet[0].name) return

    if (mosaicTileSet.find((tile) => tile.name === tileName)) {
      setMosaicTileSet((prev) => prev.filter((tile) => tile.name !== tileName))
    } else {
      const newTile = initialTileSet.filter((tile) => tile.name === tileName)
      setMosaicTileSet((prev) => [...prev, ...newTile])
    }
  }

  useEffect(() => {
    setNewTiles()
  }, [])

  return (
    <SidebarProvider>
      <div className="relative h-svh w-full overflow-hidden">
        <Grid
          tiles={mosaicTiles}
          ref={mosaicRef}
          setNewTiles={setNewTiles}
          styleObject={styleObject}
        />
        <SidebarTrigger variant="ghost" className="absolute right-2 top-2 bg-sidebar" />
      </div>

      <Sidebar side="right" variant="floating">
        <Controls
          mosaicTileSet={mosaicTileSet}
          handleChangeMosaicTileSet={handleChangeMosaicTileSet}
          mosaicGap={mosaicGap}
          handleChangeMosaicGap={setMosaicGap}
          mosaicTileSize={mosaicTileSize}
          handleResizeMosaicTiles={setMosaicTileSize}
          initialTileSet={initialTileSet}
          setNewColors={setNewColors}
          swapColors={swapColors}
          setNewTiles={setNewTiles}
        />
      </Sidebar>
    </SidebarProvider>
  )
}

export default Mosaic

import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@ui/button"
import { Label } from "@ui/label"
import { SidebarContent, SidebarGroup } from "@ui/sidebar"
import { Slider } from "@ui/slider"
import { useState } from "react"
import type { Tiles } from "../Mosaic"
import TileSetControls from "./Tile-set-controls"

type ControlsProps = {
  mosaicGap: number
  handleChangeGap: (value: number) => void
  handleChangeTileSet: (tileName: string) => void
  handleResizeTiles: ({ width, height }: { width: number; height: number }) => void
  initialTileSet: Tiles
  setNewColors: () => void
  setNewTiles: () => void
  swapColors: () => void
  tileSet: Tiles
  tileSize: { width: number; height: number }
}

const Controls = ({
  mosaicGap,
  handleChangeGap,
  handleChangeTileSet,
  handleResizeTiles,
  initialTileSet,
  setNewColors,
  setNewTiles,
  swapColors,
  tileSet,
  tileSize,
}: ControlsProps) => {
  const [size, setSize] = useState(tileSize)
  const [gap, setGap] = useState(mosaicGap)

  useDebounce(
    () => {
      handleChangeGap(gap)
    },
    100,
    [gap]
  )

  useDebounce(
    () => {
      handleResizeTiles(size)
    },
    100,
    [size]
  )

  return (
    <SidebarContent className="space-y-6">
      <SidebarGroup className="space-y-6">
        <Button type="button" onClick={swapColors}>
          Swap colors
        </Button>
        <Button type="button" onClick={setNewColors}>
          New colors
        </Button>
        <Button type="button" onClick={setNewTiles}>
          New tiles
        </Button>
      </SidebarGroup>

      <SidebarGroup className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="tile-size" className="text-sm">
            Tile size: {size.width}px
          </Label>
          <Slider
            id="tile-size"
            min={32}
            max={256}
            step={1}
            defaultValue={[size.width]}
            onValueChange={(value) => {
              setSize({ width: value[0], height: value[0] })
            }}
          />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="gap" className="text-sm">
            Gap size: {gap}px
          </Label>
          <Slider
            id="gap"
            min={0}
            step={1}
            max={256}
            defaultValue={[gap]}
            onValueChange={(value) => {
              setGap(value[0])
            }}
          />
        </div>
      </SidebarGroup>

      <SidebarGroup>
        <TileSetControls
          initialTileSet={initialTileSet}
          tileSet={tileSet}
          handleChangeTileSet={handleChangeTileSet}
        />
      </SidebarGroup>
    </SidebarContent>
  )
}

export default Controls

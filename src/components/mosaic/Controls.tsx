import { Button } from "@ui/button"
import { Label } from "@ui/label"
import { Sidebar, SidebarContent, SidebarGroup } from "@ui/sidebar"
import { Slider } from "../ui/slider"
import { initialTileSet } from "./Mosaic"
import TileSetControls from "./Tile-set-controls"

type ControlsProps = {
  setNewColors: () => void
  swapColors: () => void
  setNewTiles: () => void
  handleResizeTiles: (value: number) => void
  tileSize: { width: number; height: number }
  initialTileSet: typeof initialTileSet
  tileSet: typeof initialTileSet
  handleChangeTileSet: (tileName: string) => void
  gap: number
  handleChangeGap: (value: number) => void
}

const Controls = ({
  setNewColors,
  swapColors,
  setNewTiles,
  handleResizeTiles,
  tileSize,
  initialTileSet,
  tileSet,
  handleChangeTileSet,
  gap,
  handleChangeGap,
}: ControlsProps) => {
  return (
    <Sidebar side="right" variant="inset">
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
              Tile size: {tileSize.width}px
            </Label>
            <Slider
              id="tile-size"
              min={32}
              max={256}
              step={2}
              defaultValue={[tileSize.width]}
              onValueChange={(value) => {
                handleResizeTiles(value[0])
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
              max={tileSize.width}
              defaultValue={[gap]}
              onValueChange={(value) => {
                handleChangeGap(value[0])
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
    </Sidebar>
  )
}

export default Controls

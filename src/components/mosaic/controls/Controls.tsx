import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { SidebarContent, SidebarGroup } from "@ui/sidebar";
import { Slider } from "@ui/slider";
import { useState } from "react";
import type { DefaultTileSet } from "../Mosaic";
import TileSetControls from "./Tile-set-controls";

type ControlsProps = {
  mosaicTileSet: DefaultTileSet;
  handleChangeMosaicTileSet: (tileName: string) => void;
  mosaicGap: number;
  handleChangeMosaicGap: (value: number) => void;
  mosaicTileSize: { width: number; height: number };
  handleResizeMosaicTiles: ({ width, height }: { width: number; height: number }) => void;
  initialTileSet: DefaultTileSet;
  setNewColors: () => void;
  setNewTiles: () => void;
  swapColors: () => void;
};

const Controls = ({
  mosaicTileSet,
  handleResizeMosaicTiles,
  mosaicGap,
  handleChangeMosaicGap,
  mosaicTileSize,
  handleChangeMosaicTileSet,
  initialTileSet,
  setNewColors,
  setNewTiles,
  swapColors,
}: ControlsProps) => {
  const [gapSize, setGapSize] = useState(mosaicGap);
  const [tileSize, setTileSize] = useState(mosaicTileSize);

  useDebounce(
    () => {
      handleChangeMosaicGap(gapSize);
    },
    500,
    [gapSize]
  );

  useDebounce(
    () => {
      handleResizeMosaicTiles({ width: tileSize.width, height: tileSize.height });
    },
    500,
    [tileSize]
  );

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
            Tile size: {tileSize.width}px
          </Label>
          <Slider
            id="tile-size"
            min={32}
            max={256}
            step={2}
            defaultValue={[tileSize.width]}
            onValueChange={(value) => {
              setTileSize({ width: value[0], height: value[0] });
            }}
          />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="gap" className="text-sm">
            Gap size: {gapSize}px
          </Label>
          <Slider
            id="gap"
            min={0}
            step={1}
            max={256}
            defaultValue={[gapSize]}
            onValueChange={(value) => {
              setGapSize(value[0]);
            }}
          />
        </div>
      </SidebarGroup>

      <SidebarGroup>
        <TileSetControls
          initialTileSet={initialTileSet}
          tileSet={mosaicTileSet}
          handleChangeTileSet={handleChangeMosaicTileSet}
        />
      </SidebarGroup>
    </SidebarContent>
  );
};

export default Controls;

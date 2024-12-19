import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
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

  const handleChangeTileSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTileSize({ width: parseInt(event.target.value), height: parseInt(event.target.value) });
  };
  const handleChangeGapSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGapSize(parseInt(event.target.value));
  };

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
    <div className="space-y-6">
      <div className="space-y-6">
        <Button type="button" onClick={swapColors}>
          Swap colors
        </Button>
        <Button type="button" onClick={setNewColors}>
          New colors
        </Button>
        <Button type="button" onClick={setNewTiles}>
          New tiles
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="tile-size" className="text-sm">
            Tile size: {tileSize.width}px
          </Label>
          <Input
            type="range"
            id="tile-size"
            min={32}
            max={256}
            step={2}
            defaultValue={tileSize.width}
            onChange={handleChangeTileSize}
          />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="gap" className="text-sm">
            Gap size: {gapSize}px
          </Label>
          <Input
            type="range"
            id="gap"
            min={0}
            step={1}
            max={256}
            defaultValue={gapSize}
            onChange={handleChangeGapSize}
          />
        </div>
      </div>

      <div>
        <TileSetControls
          initialTileSet={initialTileSet}
          tileSet={mosaicTileSet}
          handleChangeTileSet={handleChangeMosaicTileSet}
        />
      </div>
    </div>
  );
};

export default Controls;

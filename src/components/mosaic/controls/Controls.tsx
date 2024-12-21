import { Input } from "@/components/ui/input";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { useState } from "react";
import type { DefaultTileSet } from "../Mosaic";
import TileSetControls from "./Tile-set-controls";

type ControlsProps = {
  mosaicRef: React.RefObject<HTMLDivElement>;
  mosaicTileSet: DefaultTileSet;
  setMosaicTileSet: React.Dispatch<React.SetStateAction<string[]>>;
  initialTileSet: DefaultTileSet;
  setNewColors: () => void;
  setNewTiles: (tileset?: DefaultTileSet) => void;
  swapColors: () => void;
};

const Controls = ({
  mosaicRef,
  mosaicTileSet,
  setMosaicTileSet,
  initialTileSet,
  setNewColors,
  setNewTiles,
  swapColors,
}: ControlsProps) => {
  const [size, setSize] = useState(64);
  const [gap, setGap] = useState(0);

  const handleChangeTileSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(event.target.value));
    if (!mosaicRef.current) return;
    mosaicRef.current.style.setProperty("--tile-width", `${event.target.value}px`);
    mosaicRef.current.style.setProperty("--tile-height", `${event.target.value}px`);
  };

  const handleChangeGapSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGap(parseInt(event.target.value));
    if (!mosaicRef.current) return;
    mosaicRef.current.style.setProperty("--mosaicGap", `${event.target.value}px`);
  };

  return (
    <div className="max-w-sm space-y-6">
      <div className="flex flex-col space-y-6">
        <Button type="button" onClick={swapColors}>
          Swap colors
        </Button>
        <Button type="button" onClick={setNewColors}>
          New colors
        </Button>
        <Button type="button" onClick={() => setNewTiles(mosaicTileSet)}>
          New tiles
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="tile-size" className="text-sm">
            Tile size: {size}px
          </Label>
          <Input
            type="range"
            id="tile-size"
            min={32}
            max={256}
            step={2}
            defaultValue={size}
            onChange={handleChangeTileSize}
          />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="gap" className="text-sm">
            Gap size: {gap}px
          </Label>
          <Input
            type="range"
            id="gap"
            min={0}
            step={1}
            max={256}
            defaultValue={gap}
            onChange={handleChangeGapSize}
          />
        </div>
      </div>

      <div>
        <TileSetControls
          initialTileSet={initialTileSet}
          setNewTiles={setNewTiles}
          mosaicTileSet={mosaicTileSet}
          setMosaicTileSet={setMosaicTileSet}
        />
      </div>
    </div>
  );
};

export default Controls;

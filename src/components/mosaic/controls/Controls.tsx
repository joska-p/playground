import { getPalettes, initialColors } from "@/components/mosaic/lib/colors";
import { Input } from "@/components/ui/input";
import { getRandom, shuffleArray } from "@/lib/utils";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { useEffect, useState } from "react";
import type { DefaultTileSet } from "../Mosaic";
import { initialRotations } from "../Mosaic";
import TileSetControls from "./Tile-set-controls";

type ControlsProps = {
  mosaicRef: React.RefObject<HTMLDivElement>;
  mosaicTileSet: DefaultTileSet;
  setMosaicTileSet: React.Dispatch<React.SetStateAction<string[]>>;
  initialTileSet: DefaultTileSet;
  setNewTiles: (tileset?: DefaultTileSet) => void;
};

const Controls = ({
  mosaicRef,
  mosaicTileSet,
  setMosaicTileSet,
  initialTileSet,
  setNewTiles,
}: ControlsProps) => {
  const [palettes, setPalettes] = useState([[""]]);
  const [size, setSize] = useState(64);
  const [gap, setGap] = useState(0);

  const computedColors = () => {
    if (!mosaicRef.current) return [];
    return Object.keys(initialColors).map((color) =>
      getComputedStyle(mosaicRef.current as HTMLDivElement).getPropertyValue(color)
    );
  };

  const computedRotation = () => {
    if (!mosaicRef.current) return [];
    return Object.keys(initialRotations).map((rotation) =>
      getComputedStyle(mosaicRef.current as HTMLDivElement).getPropertyValue(rotation)
    );
  };

  const setNewColors = () => {
    const randomPalette = getRandom(palettes);
    Object.keys(initialColors).forEach((colorName, index) => {
      if (!mosaicRef.current) return;
      mosaicRef.current.style.setProperty(colorName, randomPalette[index]);
    });
  };

  const swapColors = () => {
    const newColors = shuffleArray(computedColors());
    Object.keys(initialColors).forEach((colorName, index) => {
      if (!mosaicRef.current) return;
      mosaicRef.current.style.setProperty(colorName, newColors[index]);
    });
  };

  const rotateTiles = () => {
    const newRotations = shuffleArray(computedRotation());
    Object.keys(initialRotations).forEach((rotationName, index) => {
      if (!mosaicRef.current) return;
      mosaicRef.current.style.setProperty(rotationName, newRotations[index]);
    });
  };

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

  const setNewPalettes = async () => {
    const palettes = await getPalettes();
    setPalettes(palettes);
  };

  useEffect(() => {
    setNewPalettes();
  }, []);

  return (
    <div className="max-w-sm space-y-6">
      <div className="flex flex-col space-y-6">
        <Button type="button" onClick={swapColors}>
          Swap colors
        </Button>
        <Button type="button" onClick={rotateTiles}>
          Rotate tiles
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
            step={1}
            value={size}
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
            max={128}
            value={gap}
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

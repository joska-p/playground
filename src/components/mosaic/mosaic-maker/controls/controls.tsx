import { Slider } from "@components/ui/slider/slider";
import { Button } from "@components/ui/button";
import { shuffleObject } from "@lib/utils.ts";
import { PaletteControls } from "./palette-controls.tsx";
import { TileSetControls } from "./tile-set-controls.tsx";
import { usePalettes } from "./use-palettes.ts";
import { useTiles } from "./use-tiles.ts";
import { useState } from "react";
import { updateElementStyles } from "../libs/style-utils.ts";
import { initialRotations, initialTileSet } from "../config.ts";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  setNewTiles: (tileSet?: string[]) => void;
};

const Controls = ({ mosaicRef, setNewTiles }: Props) => {
  const [tileSet, setTileSet] = useState(initialTileSet);
  const { tileSize, setTileSize, gapSize, setGapSize } = useTiles({
    mosaicRef,
  });
  const { currentPalettes, isLoading, error, shufflePalettes, currentPalette, setCurrentPalette } = usePalettes({
    mosaicRef,
  });

  const shuffleColors = () => {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(currentPalette));
  };

  const shuffleRotations = () => {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(initialRotations));
  };

  if (isLoading) return <div>Loading palettes...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <form className="flex flex-wrap justify-center gap-4 lg:w-[42ch] lg:flex-col lg:gap-8">
      <fieldset className="mt-2 grid grid-cols-2 gap-4 px-2 sm:grid-cols-4 lg:grid-cols-2">
        <Button type="button" onClick={shuffleColors} size="sm">
          Shuffle colors
        </Button>
        <Button type="button" onClick={shuffleRotations} size="sm">
          Shuffle rotations
        </Button>
        <Button type="button" onClick={shufflePalettes} size="sm">
          New palettes
        </Button>
        <Button type="button" onClick={() => setNewTiles(tileSet)} size="sm">
          New tiles
        </Button>
      </fieldset>

      <fieldset className="grid grid-cols-2 gap-4 px-2">
        <label className="flex flex-col items-center text-sm">
          Tile size: {tileSize}px
          <Slider
            min={32}
            max={256}
            step={2}
            value={tileSize}
            onChange={(event) => setTileSize(Number(event.target.value))}
          />
        </label>

        <label className="flex flex-col items-center text-sm">
          Gap size: {gapSize}px
          <Slider
            min={0}
            step={2}
            max={128}
            value={gapSize}
            onChange={(event) => setGapSize(Number(event.target.value))}
          />
        </label>
      </fieldset>

      <TileSetControls tileSet={tileSet} setTileSet={setTileSet} setNewTiles={setNewTiles} />

      <PaletteControls
        palettes={currentPalettes}
        currentPalette={currentPalette}
        setCurrentPalette={setCurrentPalette}
      />
    </form>
  );
};

export { Controls };

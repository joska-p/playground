import { useEffect, useState } from "react";
import { Slider } from "@components/ui/slider/slider";
import { Button } from "@components/ui/button";
import { shuffleObject } from "@lib/utils.ts";
import { PaletteControls } from "./palette-controls.tsx";
import { TileSetControls } from "./tile-set-controls.tsx";
import { updateElementStyles } from "../lib/utils.ts";
import {
  CSS_VARS,
  DEFAULT_GAP_SIZE,
  DEFAULT_TILE_SIZE,
  initialPalette,
  initialRotations,
  initialTileSet,
} from "../config.ts";
import { usePalettes } from "./use-palettes.ts";
import { useTiles } from "./use-tiles.ts";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement> | null;
  setTiles: (tileSet: string[]) => void;
};

const Controls = ({ mosaicRef, setTiles }: Props) => {
  const [tileSet, setTileSet] = useState(initialTileSet);
  const [currentPalette, setCurrentPalette] = useState(initialPalette);
  const [currentRotations, setCurrentRotations] = useState(initialRotations);
  const [tileSize, setTileSize] = useState(DEFAULT_TILE_SIZE);
  const [gapSize, setGapSize] = useState(DEFAULT_GAP_SIZE);

  const { currentPalettes, isLoading, error, loadPalettes, shufflePalettes } = usePalettes();

  const generateTiles = useTiles(mosaicRef, tileSet, setTiles);

  useEffect(() => {
    loadPalettes();
  }, [loadPalettes]);

  useEffect(() => {
    shufflePalettes();
  }, [shufflePalettes]);

  useEffect(() => {
    generateTiles();
  }, [tileSet, generateTiles]);

  useEffect(() => {
    if (!mosaicRef || !mosaicRef.current) return;

    updateElementStyles(mosaicRef.current, currentPalette);
    updateElementStyles(mosaicRef.current, currentRotations);
    updateElementStyles(mosaicRef.current, {
      [CSS_VARS.height]: `${tileSize}px`,
      [CSS_VARS.width]: `${tileSize}px`,
      [CSS_VARS.gap]: `${gapSize}px`,
    });
  }, [mosaicRef, currentPalette, currentRotations, tileSize, gapSize]);

  if (isLoading) return <div>Loading palettes...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <form className="flex flex-wrap justify-center gap-4 lg:w-[42ch] lg:flex-col lg:gap-8">
      <fieldset className="mt-2 grid grid-cols-2 gap-4 px-2 sm:grid-cols-4 lg:grid-cols-2">
        <Button type="button" onClick={() => setCurrentPalette(shuffleObject(currentPalette))} size="sm">
          Shuffle colors
        </Button>
        <Button type="button" onClick={() => setCurrentRotations(shuffleObject(currentRotations))} size="sm">
          Shuffle rotations
        </Button>
        <Button type="button" onClick={shufflePalettes} size="sm">
          New palettes
        </Button>
        <Button type="button" onClick={generateTiles} size="sm">
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

      <TileSetControls tileSet={tileSet} setTileSet={setTileSet} />

      <PaletteControls
        palettes={currentPalettes}
        currentPalette={currentPalette}
        setCurrentPalette={setCurrentPalette}
      />
    </form>
  );
};

export { Controls };

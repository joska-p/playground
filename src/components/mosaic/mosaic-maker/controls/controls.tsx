import { useCallback, useEffect, useState } from "react";
import { Slider } from "@components/ui/slider/slider";
import { Button } from "@components/ui/button";
import { getRandom, shuffleArray, shuffleObject } from "@lib/utils.ts";
import { PaletteControls } from "./palette-controls.tsx";
import { TileSetControls } from "./tile-set-controls.tsx";
import { computeNumberOfTiles, updateElementStyles } from "../lib/utils.ts";
import { CSS_VARS, initialPalette, initialRotations, initialTileSet } from "../config.ts";
import { getPalettes } from "../lib/colors.ts";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
  setTiles: (tileSet: string[]) => void;
};

const Controls = ({ mosaicRef, setTiles }: Props) => {
  const [tileSet, setTileSet] = useState(initialTileSet);
  const [allThePalettes, setAllThePalettes] = useState([initialPalette]);
  const [palettes, setPalettes] = useState([initialPalette]);
  const [currentPalette, setCurrentPalette] = useState(initialPalette);
  const [currentRotations, setCurrentRotations] = useState(initialRotations);
  const [tileSize, setTileSize] = useState(64);
  const [gapSize, setGapSize] = useState(0);

  const setNewTiles = useCallback(() => {
    if (!mosaicRef.current) return;
    const computedNumberOfTiles = computeNumberOfTiles(mosaicRef.current);
    const newTiles = Array.from({ length: computedNumberOfTiles }, () => getRandom(tileSet));
    setTiles(newTiles);
  }, [mosaicRef, setTiles, tileSet]);

  useEffect(setNewTiles, [tileSet, setNewTiles]);

  const setNewPalettes = useCallback(() => {
    if (!allThePalettes.length) return;
    const randomPalettes = shuffleArray(allThePalettes).slice(0, 39);
    setPalettes(randomPalettes);
  }, [allThePalettes]);

  useEffect(() => {
    const loadPalettes = async () => {
      const palettes = await getPalettes();
      setAllThePalettes(palettes);
    };
    loadPalettes();
  }, []);

  useEffect(setNewPalettes, [allThePalettes, setNewPalettes]);

  useEffect(() => {
    if (!mosaicRef.current) return;

    updateElementStyles(mosaicRef.current, currentPalette);
    updateElementStyles(mosaicRef.current, currentRotations);
    updateElementStyles(mosaicRef.current, {
      [CSS_VARS.height]: `${tileSize}px`,
      [CSS_VARS.width]: `${tileSize}px`,
      [CSS_VARS.gap]: `${gapSize}px`,
    });
  }, [mosaicRef, currentPalette, currentRotations, tileSize, gapSize]);

  return (
    <form className="flex flex-wrap justify-center gap-4 lg:w-[42ch] lg:flex-col lg:gap-8">
      <fieldset className="mt-2 grid grid-cols-2 gap-4 px-2 sm:grid-cols-4 lg:grid-cols-2">
        <Button type="button" onClick={() => setCurrentPalette(shuffleObject(currentPalette))} size="sm">
          Shuffle colors
        </Button>
        <Button type="button" onClick={() => setCurrentRotations(shuffleObject(currentRotations))} size="sm">
          Shuffle rotations
        </Button>
        <Button type="button" onClick={setNewPalettes} size="sm">
          New palettes
        </Button>
        <Button type="button" onClick={setNewTiles} size="sm">
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

      <PaletteControls palettes={palettes} currentPalette={currentPalette} setCurrentPalette={setCurrentPalette} />
    </form>
  );
};

export { Controls };

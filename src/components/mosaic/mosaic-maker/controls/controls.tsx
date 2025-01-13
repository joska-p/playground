import { Button } from "@/components/ui/button";
import { shuffleArray, shuffleObject } from "@/lib/utils.ts";
import type { Signal } from "@preact/signals-react";
import { useEffect } from "react";
import {
  CSS_VARS,
  DEFAULT_GAP_SIZE,
  DEFAULT_TILE_SIZE,
  initialPalette,
  initialRotations,
  MAX_RANDOM_PALETTES,
} from "../config.ts";
import { updateElementStyles } from "../libs/style-utils.ts";
import { PaletteControls } from "./palette-controls.tsx";
import { SliderControls } from "./slider-controls.tsx";
import { TileSetControls } from "./tile-set-controls.tsx";

type Props = {
  mosaicRef: Signal<React.RefObject<HTMLDivElement | null>>;
  tileSet: Signal<string[]>;
  allThePalettes: Signal<(typeof initialPalette)[]>;
  currentPalettes: Signal<(typeof initialPalette)[]>;
  currentPalette: Signal<typeof initialPalette>;
};

function Controls({ mosaicRef, tileSet, allThePalettes, currentPalettes, currentPalette }: Props) {
  const shufflePalettes = () => {
    if (!allThePalettes.value.length) return;
    const randomPalettes = shuffleArray(allThePalettes.value).slice(0, MAX_RANDOM_PALETTES);
    currentPalettes.value = randomPalettes;
  };

  const shuffleColors = () => {
    if (!mosaicRef.value.current) return;
    updateElementStyles(mosaicRef.value.current, shuffleObject(currentPalette.value));
  };

  const shuffleRotations = () => {
    if (!mosaicRef.value.current) return;
    updateElementStyles(mosaicRef.value.current, shuffleObject(initialRotations));
  };

  useEffect(() => {
    tileSet.value = [...tileSet.value];
  }, [tileSet]);

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
        <Button
          type="button"
          onClick={() => {
            tileSet.value = [...tileSet.value];
          }}
          size="sm"
        >
          New tiles
        </Button>
      </fieldset>

      <fieldset className="grid grid-cols-2 gap-4 px-2">
        <SliderControls
          mosaicRef={mosaicRef}
          label="Tile size"
          defaultValue={DEFAULT_TILE_SIZE}
          cssVar={CSS_VARS.width}
          min={32}
          max={256}
          step={2}
        />
        <SliderControls
          mosaicRef={mosaicRef}
          label="Gap size"
          defaultValue={DEFAULT_GAP_SIZE}
          cssVar={CSS_VARS.gap}
          min={0}
          max={32}
          step={2}
        />
      </fieldset>

      <TileSetControls tileSet={tileSet} />

      <PaletteControls
        mosaicRef={mosaicRef}
        currentPalette={currentPalette}
        currentPalettes={currentPalettes}
      />
    </form>
  );
}

export { Controls };

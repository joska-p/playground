import { Button } from "@repo/ui";
import { useMosaicMakerContext } from "../Mosaic-context.js";
import {
  CSS_VARS,
  DEFAULT_GAP_SIZE,
  DEFAULT_TILE_SIZE,
  initialRotations,
} from "../config.js";
import { updateElementStyles } from "../lib/style-utils.js";
import { shuffleObject } from "../lib/utils.js";
import { PaletteControls } from "./Palette-controls.js";
import { SliderControls } from "./Slider-controls.js";
import { TileSetControls } from "./Tile-set-controls.js";

function Controls() {
  const { mosaicRef, currentPalette, updateCurrentPalettes, updateTiles } =
    useMosaicMakerContext();

  function shuffleColors() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(currentPalette));
  }

  function shuffleRotations() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(initialRotations));
  }

  return (
    <form className="mm:flex mm:flex-wrap mm:justify-center mm:gap-4 mm:lg:w-[42ch] mm:lg:flex-col mm:lg:gap-8">
      <fieldset className="mm:mt-2 mm:grid mm:grid-cols-2 mm:gap-4 mm:px-2 mm:sm:grid-cols-4 mm:lg:grid-cols-2">
        <Button
          variant="default"
          type="button"
          onClick={() => shuffleColors()}
          size="sm"
        >
          Shuffle colors
        </Button>
        <Button type="button" onClick={() => shuffleRotations()} size="sm">
          Shuffle rotations
        </Button>
        <Button type="button" onClick={() => updateCurrentPalettes()} size="sm">
          New palettes
        </Button>
        <Button type="button" onClick={() => updateTiles()} size="sm">
          New tiles
        </Button>
      </fieldset>

      <fieldset className="mm:grid mm:grid-cols-2 mm:gap-4 mm:px-2">
        <SliderControls
          label="Tile size"
          defaultValue={DEFAULT_TILE_SIZE}
          cssVar={CSS_VARS.width}
          min={32}
          max={256}
          step={2}
        />
        <SliderControls
          label="Gap size"
          defaultValue={DEFAULT_GAP_SIZE}
          cssVar={CSS_VARS.gap}
          min={0}
          max={64}
          step={2}
        />
      </fieldset>

      <TileSetControls />

      <PaletteControls />
    </form>
  );
}

export { Controls };

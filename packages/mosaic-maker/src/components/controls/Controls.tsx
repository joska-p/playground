import { Button } from "@repo/ui";
import { useShallow } from "zustand/shallow";
import { CSS_VARS } from "../../core/cssVars";
import { DEFAULT_GAP_SIZE, DEFAULT_TILE_SIZE, initialRotations } from "../../core/constants";
import { updateCurrentPalettes, updateTiles, useMosaicStore } from "../../store/useMosaicStore";
import { updateElementStyles } from "../../utils/updateElementStyles";
import { shuffleObject } from "../../utils/shuffleObject";
import { PaletteControls } from "./PaletteControls";
import { SliderControls } from "./SliderControls";
import { TileSetControls } from "./TileSetControls";

function Controls() {
  const { mosaicRef, currentPalette } = useMosaicStore(
    useShallow((state) => ({
      mosaicRef: state.mosaicRef,
      currentPalette: state.currentPalette,
    }))
  );

  function shuffleColors() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(currentPalette));
  }

  function shuffleRotations() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(initialRotations));
  }

  return (
    <form className="flex flex-wrap justify-center gap-4 lg:w-[42ch] lg:flex-col lg:gap-8">
      <fieldset className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
        <Button variant="primary" type="button" onClick={() => shuffleColors()} size="small">
          Shuffle colors
        </Button>
        <Button type="button" onClick={() => shuffleRotations()} size="small">
          Shuffle rotations
        </Button>
        <Button type="button" onClick={() => updateCurrentPalettes()} size="small">
          New palettes
        </Button>
        <Button type="button" onClick={() => updateTiles()} size="small">
          New tiles
        </Button>
      </fieldset>

      <fieldset className="grid grid-cols-2 gap-4 px-2">
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

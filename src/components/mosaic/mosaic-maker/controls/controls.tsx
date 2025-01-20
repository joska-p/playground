import { CSS_VARS, DEFAULT_GAP_SIZE, DEFAULT_TILE_SIZE } from "../config.ts";
import { useMosaicMakerContext } from "../mosaic-context.tsx";
import { PaletteControls } from "./palette-controls.tsx";
import { SliderControls } from "./slider-controls.tsx";
import { TileSetControls } from "./tile-set-controls.tsx";
import { Button } from "@/components/ui/button/button.tsx";

function Controls() {
  const { shufflePalettes, shuffleColors, shuffleRotations, setNewTiles } = useMosaicMakerContext();

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
        <Button type="button" onClick={setNewTiles} size="sm">
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
          max={32}
          step={2}
        />
      </fieldset>

      <TileSetControls />

      <PaletteControls />
    </form>
  );
}

export { Controls };

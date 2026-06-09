import { Button } from '@repo/ui/Button';
import {
  DEFAULT_GAP_SIZE,
  DEFAULT_TILE_SIZE,
  initialRotations,
} from '../../core/constants';
import { CSS_VARS } from '../../core/cssVars';
import { cyclePalettes, regenerateTiles } from '../../stores/mosaic/actions';
import { useCurrentPalette, useMosaicRef } from '../../stores/mosaic/selectors';
import { shuffleObject } from '../../utils/random/shuffleObject';
import { updateElementStyles } from '../../utils/updateElementStyles';
import { PaletteControls } from './PaletteControls';
import { SliderControls } from './SliderControls';
import { TileSetControls } from './TileSetControls';

function Controls() {
  const mosaicRef = useMosaicRef();
  const currentPalette = useCurrentPalette();

  function shuffleColors() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(currentPalette));
  }

  function shuffleRotations() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(initialRotations));
  }

  return (
    <form className="flex flex-wrap justify-center lg:max-w-[45ch] p-4 gap-4 lg:flex-col lg:gap-8">
      <fieldset className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
        <Button
          variant="primary"
          type="button"
          onClick={() => shuffleColors()}
          size="sm"
        >
          Shuffle colors
        </Button>
        <Button
          type="button"
          onClick={() => shuffleRotations()}
          size="sm"
        >
          Shuffle rotations
        </Button>
        <Button
          type="button"
          onClick={() => cyclePalettes()}
          size="sm"
        >
          New palettes
        </Button>
        <Button
          type="button"
          onClick={() => regenerateTiles()}
          size="sm"
        >
          New tiles
        </Button>
      </fieldset>

      <fieldset className="grid grid-cols-2 gap-4 px-2">
        <SliderControls
          label="Tile size"
          defaultValue={DEFAULT_TILE_SIZE}
          cssVar={CSS_VARS.size}
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

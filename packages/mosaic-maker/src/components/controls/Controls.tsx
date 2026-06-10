import { Button } from '@repo/ui/Button';
import { Icon } from '@repo/ui/Icon';
import {
  CSS_VARS,
  DEFAULT_GAP_SIZE,
  DEFAULT_TILE_SIZE,
  initialRotations,
} from '../../core/constants';
import { cyclePalettes, regenerateTiles } from '../../stores/mosaic/actions';
import {
  useCurrentPalette,
  useIsPalettesLoading,
  useMosaicRef,
} from '../../stores/mosaic/selectors';
import { shuffleObject } from '../../utils/random/shuffleObject';
import { updateElementStyles } from '../../utils/updateElementStyles';
import { PaletteControls } from './PaletteControls';
import { SliderControls } from './SliderControls';
import { TileSetControls } from './TileSetControls';

function Controls() {
  const mosaicRef = useMosaicRef();
  const currentPalette = useCurrentPalette();
  const isPalettesLoading = useIsPalettesLoading();

  function shuffleColors() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(currentPalette));
  }

  function shuffleRotations() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(initialRotations));
  }

  return (
    <>
      <h2 className="sr-only">Mosaic controls</h2>

      <div className="grid grid-cols-4 gap-4 md:grid-cols-2">
        <Button
          variant="primary"
          type="button"
          onClick={() => shuffleColors()}
          size="sm"
        >
          <Icon name="sparkles" />
          <span className="hidden sm:inline">Shuffle colors</span>
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => shuffleRotations()}
          size="sm"
        >
          <Icon name="wrench" />
          <span className="hidden sm:inline">Shuffle rotations</span>
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => cyclePalettes()}
          size="sm"
          disabled={isPalettesLoading}
        >
          <Icon name="palette" />
          <span className="hidden sm:inline">New palettes</span>
        </Button>
        <Button
          type="button"
          onClick={() => regenerateTiles()}
          size="sm"
        >
          <Icon name="grid-3x3" />
          <span className="hidden sm:inline">New tiles</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <TileSetControls />

      {isPalettesLoading ? (
        <div className="border-border/30 text-foreground/60 grid grid-flow-col place-content-center gap-2 border-t pt-4 text-sm">
          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading palettes...
        </div>
      ) : (
        <PaletteControls />
      )}
    </>
  );
}

export { Controls };

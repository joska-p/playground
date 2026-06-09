import { Button } from '@repo/ui/Button';
import {
  DEFAULT_GAP_SIZE,
  DEFAULT_TILE_SIZE,
  initialRotations,
} from '../../core/constants';
import { CSS_VARS } from '../../core/cssVars';
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
    <div className="flex flex-1 min-h-0 flex-col gap-[clamp(1rem,3vw,2rem)] overflow-y-auto p-4 lg:overflow-hidden">
      <h2 className="sr-only">Mosaic controls</h2>
      <div className="shrink-0 space-y-[clamp(1rem,3vw,2rem)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
          <Button
            variant="primary"
            type="button"
            onClick={() => shuffleColors()}
            size="sm"
          >
            Shuffle colors
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => shuffleRotations()}
            size="sm"
          >
            Shuffle rotations
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => cyclePalettes()}
            size="sm"
            disabled={isPalettesLoading}
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
        </div>
        <div className="grid grid-cols-2 gap-4 px-2">
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
      </div>
      <div className="min-h-0 lg:flex-1 lg:overflow-y-auto">
        {isPalettesLoading ? (
          <div className="flex items-center justify-center gap-2 border-t border-border/30 pt-4 text-sm text-foreground/60">
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading palettes...
          </div>
        ) : (
          <PaletteControls />
        )}
      </div>
    </div>
  );
}

export { Controls };

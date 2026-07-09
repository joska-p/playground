import { ControlGrid, ControlPanel, ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider } from '@repo/ui/data-entry';
import { ColorPalette } from '@repo/ui/widgets';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CSS_VARS,
  DEFAULT_GAP_SIZE,
  DEFAULT_TILE_SIZE,
  initialRotations
} from '../../core/constants';
import { applyPalette, cyclePalettes, regenerateTiles } from '../../stores/mosaic/actions';
import {
  useCurrentPalette,
  useCurrentPalettes,
  useIsPalettesLoading,
  useMosaicRef
} from '../../stores/mosaic/selectors';
import { shuffleObject } from '../../utils/random/shuffleObject';
import { updateElementStyles } from '../../utils/updateElementStyles';
import { TileSetControls } from './TileSetControls';

function useSliderState(
  cssVar: string,
  defaultValue: number,
  debounceMs = 150
): { value: number; onChange: (value: number) => void } {
  const mosaicRef = useMosaicRef();
  const [value, setValue] = useState(defaultValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const onChange = useCallback(
    (newValue: number) => {
      setValue(newValue);
      mosaicRef.current?.style.setProperty(cssVar, `${String(newValue)}px`);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(regenerateTiles, debounceMs);
    },
    [mosaicRef, cssVar, debounceMs]
  );

  return { value, onChange };
}

function MosaicControlsPanel() {
  const isPalettesLoading = useIsPalettesLoading();
  const mosaicRef = useMosaicRef();
  const currentPalette = useCurrentPalette();
  const currentPalettes = useCurrentPalettes();

  const tileSize = useSliderState(CSS_VARS.size, DEFAULT_TILE_SIZE);
  const gapSize = useSliderState(CSS_VARS.gap, DEFAULT_GAP_SIZE);

  function shuffleColors() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(currentPalette));
  }

  function shuffleRotations() {
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, shuffleObject(initialRotations));
  }

  return (
    <ControlPanel title="Mosaic Controls">
      <TileSetControls />

      <ControlSection
        title="Actions"
        defaultOpen={true}
      >
        <ControlGrid columns={2}>
          <Button
            variant="primary"
            onClick={shuffleColors}
            size="sm"
          >
            Shuffle Colors
          </Button>
          <Button
            onClick={shuffleRotations}
            size="sm"
          >
            Shuffle Rotations
          </Button>
          <Button
            disabled={isPalettesLoading}
            onClick={cyclePalettes}
            size="sm"
          >
            Cycle Palettes
          </Button>
          <Button
            onClick={regenerateTiles}
            size="sm"
          >
            Regenerate Tiles
          </Button>
        </ControlGrid>
      </ControlSection>

      <ControlSection
        title="Layout"
        defaultOpen={true}
      >
        <ControlRow
          label="Tile Size"
          value={tileSize.value.toString() + 'px'}
        >
          <Slider
            value={tileSize.value}
            min={32}
            max={256}
            step={2}
            onChange={tileSize.onChange}
            showTicks={false}
          />
        </ControlRow>
        <ControlRow
          label="Gap Size"
          value={gapSize.value.toString() + 'px'}
        >
          <Slider
            value={gapSize.value}
            min={0}
            max={64}
            step={2}
            onChange={gapSize.onChange}
            showTicks={false}
          />
        </ControlRow>
      </ControlSection>

      <ControlSection
        title="Palettes"
        defaultOpen={true}
      >
        <div className="flex flex-wrap gap-2">
          {currentPalettes.map((palette) => {
            const colors = [
              palette['--color-0'],
              palette['--color-1'],
              palette['--color-2'],
              palette['--color-3'],
              palette['--color-4']
            ];
            return (
              <ColorPalette
                key={palette.id}
                name="mosaic-palette"
                value={palette.id}
                colors={colors}
                checked={palette.id === currentPalette.id}
                orientation="vertical"
                size="sm"
                onChange={(id) => {
                  const selected = currentPalettes.find((p) => p.id === id);
                  if (selected) applyPalette(selected);
                }}
                title={palette.id}
              />
            );
          })}
        </div>
      </ControlSection>

      {isPalettesLoading && (
        <div className="border-border/30 text-foreground/60 grid grid-flow-col place-content-center gap-2 border-t pt-3 text-sm">
          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading palettes...
        </div>
      )}
    </ControlPanel>
  );
}

export { MosaicControlsPanel };

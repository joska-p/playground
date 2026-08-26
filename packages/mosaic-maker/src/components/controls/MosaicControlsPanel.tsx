import { Button, ColorPalette, Field, Slider } from '@repo/tlc/controls';
import { Panel, PanelSection } from '@repo/tlc/layout';
import { useEffect, useRef, useState } from 'react';

import { TileSetControls } from './TileSetControls';
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

function useSliderState(
    cssVar: string,
    defaultValue: number,
    debounceMs = 150
): { value: number; onChange: (value: number) => void } {
    const mosaicRef = useMosaicRef();
    const [value, setValue] = useState(defaultValue);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const onChange = (newValue: number) => {
        setValue(newValue);
        mosaicRef.current?.style.setProperty(cssVar, `${String(newValue)}px`);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(regenerateTiles, debounceMs);
    };

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
        <Panel title="Mosaic Controls">
            <PanelSection label="Tile set">
                <TileSetControls />
            </PanelSection>

            <PanelSection
                label="Actions"
                defaultOpen={true}
            >
                <div className="grid grid-cols-2 gap-2">
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
                </div>
            </PanelSection>

            <PanelSection
                label="Layout"
                defaultOpen={true}
            >
                <Field
                    label="Tile:"
                    value={tileSize.value.toString() + 'px'}
                >
                    <Slider
                        value={tileSize.value}
                        min={32}
                        max={256}
                        step={2}
                        onChange={tileSize.onChange}
                        showValue={false}
                    />
                </Field>
                <Field
                    label="Gap:"
                    value={gapSize.value.toString() + 'px'}
                >
                    <Slider
                        value={gapSize.value}
                        min={0}
                        max={64}
                        step={2}
                        onChange={gapSize.onChange}
                        showValue={false}
                    />
                </Field>
            </PanelSection>

            <PanelSection
                label="Palettes"
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
            </PanelSection>

            {isPalettesLoading && (
                <div className="border-border/30 text-foreground/60 grid grid-flow-col place-content-center gap-2 border-t pt-3 text-sm">
                    <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Loading palettes...
                </div>
            )}
        </Panel>
    );
}

export { MosaicControlsPanel };

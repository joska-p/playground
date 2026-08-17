import { useSyncExternalStore } from 'react';
import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider } from '@repo/ui/data-entry';
import { setGap, useGap, useClockStore } from './store';

const noop = () => {
    /* unsubscribe no-op */
};

function SpiraleControls() {
    const gap = useGap();
    const clockStore = useClockStore();

    const isPlaying = useSyncExternalStore(
        (onStoreChange) => clockStore?.subscribe(onStoreChange) ?? noop,
        () => clockStore?.getIsPlaying() ?? true
    );

    return (
        <ControlSection title="spirale">
            <ControlGrid columns={2}>
                <Button
                    onClick={() => clockStore?.togglePlay()}
                    disabled={!clockStore}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Slider
                    label="gap"
                    onChange={setGap}
                    value={gap}
                    min={0.01}
                    max={0.5}
                    step={0.01}
                />
            </ControlGrid>
        </ControlSection>
    );
}

export { SpiraleControls };

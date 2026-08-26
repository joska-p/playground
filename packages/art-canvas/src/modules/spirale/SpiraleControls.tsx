import { ControlGrid, Button, Slider } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';
import { useSyncExternalStore } from 'react';

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
        <PanelSection label="spirale">
            <ControlGrid columns={2}>
                <Button
                    onClick={() => clockStore?.togglePlay()}
                    disabled={!clockStore}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Slider
                    value={gap}
                    onChange={setGap}
                    min={0.01}
                    max={0.5}
                    step={0.01}
                />
            </ControlGrid>
        </PanelSection>
    );
}

export { SpiraleControls };

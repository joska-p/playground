import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider } from '@repo/ui/data-entry';
import { useClock, setGap, useGap } from './store';

function SpiraleControls() {
    const clock = useClock();
    const gap = useGap();

    console.log(clock)

    return (
        <ControlSection title="manual">
            <ControlGrid columns={2}>
                <Button onClick={() => clock.togglePlay()}>{clock.isPlaying ? 'Stop' : 'Play'}</Button>
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

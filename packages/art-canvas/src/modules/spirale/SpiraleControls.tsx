import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider } from '@repo/ui/data-entry';
import { setIsPlaying, useIsPlaying, setGap, useGap } from './store';

function SpiraleControls() {
    const isPlaying = useIsPlaying();
    const gap = useGap();

    function handlePlay() {
        setIsPlaying(!isPlaying);
    }

    return (
        <ControlSection title="manual">
            <ControlGrid columns={2}>
                <Button onClick={handlePlay}>{isPlaying ? 'Stop' : 'Play'}</Button>
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

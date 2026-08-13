import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';
import { setIsPlaying, useIsPlaying } from './store';

function ManualControls() {
    const isPlaying = useIsPlaying();

    function handlePlay() {
        setIsPlaying(!isPlaying);
    }

    return (
        <ControlSection title="manual">
            <ControlGrid columns={2}>
                <Button onClick={handlePlay}>{isPlaying ? 'Stop' : 'Play'}</Button>
            </ControlGrid>
        </ControlSection>
    );
}

export { ManualControls };

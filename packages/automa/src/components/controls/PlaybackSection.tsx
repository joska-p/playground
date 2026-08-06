import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider } from '@repo/ui/data-entry';
import { SPEED_MAX_MS, SPEED_MIN_MS, SPEED_STEP_MS } from '../../lib/constants';
import { setSpeed, step, toggleRunning, useRunning, useSpeedMs } from '../../stores/automa';

function PlaybackSection() {
    const running = useRunning();
    const speedMs = useSpeedMs();

    return (
        <ControlSection
            title="Playback"
            defaultOpen
        >
            <ControlGrid columns={2}>
                <Button
                    variant="primary"
                    onClick={toggleRunning}
                >
                    {running ? 'Pause' : 'Play'}
                </Button>
                <Button
                    onClick={() => {
                        step();
                    }}
                    disabled={running}
                >
                    Step
                </Button>
                <Slider
                    className="col-span-full"
                    value={speedMs}
                    onChange={setSpeed}
                    min={SPEED_MIN_MS}
                    max={SPEED_MAX_MS}
                    step={SPEED_STEP_MS}
                />
            </ControlGrid>
        </ControlSection>
    );
}

export { PlaybackSection };

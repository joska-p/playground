import { ControlGrid } from '@repo/tlc/components/forms';
import { Button, Slider, FieldRow } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { SPEED_MAX_MS, SPEED_MIN_MS, SPEED_STEP_MS } from '../../lib/constants';
import { setSpeed, stepOnce, toggleRunning } from '../../stores/automa/actions';
import { useRunning, useSpeedMs } from '../../stores/automa/selectors';

function PlaybackSection() {
    const running = useRunning();
    const speedMs = useSpeedMs();

    return (
        <PanelSection
            label="Playback"
            collapsible={false}
        >
            <ControlGrid columns={2}>
                <Button
                    variant="primary"
                    onClick={() => {
                        toggleRunning();
                    }}
                >
                    {running ? 'Pause' : 'Play'}
                </Button>
                <Button
                    onClick={() => {
                        stepOnce();
                    }}
                    disabled={running}
                >
                    Step
                </Button>
            </ControlGrid>
            <FieldRow label="Speed">
                <Slider
                    value={speedMs}
                    onChange={(speed) => {
                        setSpeed(speed);
                    }}
                    min={SPEED_MIN_MS}
                    max={SPEED_MAX_MS}
                    step={SPEED_STEP_MS}
                />
            </FieldRow>
        </PanelSection>
    );
}

export { PlaybackSection };

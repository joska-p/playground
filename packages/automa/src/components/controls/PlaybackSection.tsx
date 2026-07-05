import { SPEED_MAX_MS, SPEED_MIN_MS, SPEED_STEP_MS } from '@repo/automa-engine/config';
import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider } from '@repo/ui/data-entry';
import { setSpeed, step, toggleRunning } from '../../stores/simulation/actions';
import { useRunning, useSpeedMs } from '../../stores/ui/selectors';

function PlaybackSection() {
  const running = useRunning();
  const speedMs = useSpeedMs();

  return (
    <ControlSection
      title="Playback"
      defaultOpen
    >
      <ControlRow label="">
        <Button
          variant="primary"
          onClick={toggleRunning}
        >
          {running ? 'Pause' : 'Play'}
        </Button>
        <Button
          onClick={() => void step()}
          disabled={running}
        >
          Step
        </Button>
      </ControlRow>
      <ControlRow label="Speed">
        <Slider
          value={speedMs}
          onChange={(e) => {
            setSpeed(Number(e.target.value));
          }}
          min={SPEED_MIN_MS}
          max={SPEED_MAX_MS}
          step={SPEED_STEP_MS}
        />
      </ControlRow>
    </ControlSection>
  );
}

export { PlaybackSection };

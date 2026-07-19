import { ControlGrid } from '@repo/ui/control-panel';
import { Button, Slider } from '@repo/ui/data-entry';
import { setAnimationSpeed } from '../../stores/randomart/actions/config';
import { toggleRunning } from '../../stores/randomart/actions/playback';
import { useAnimationSpeed, useRunning } from '../../stores/randomart/selectors';

function PlaybackControls() {
  const running = useRunning();
  const animationSpeed = useAnimationSpeed();

  return (
    <ControlGrid columns={3}>
      <Button
        size="sm"
        variant="primary"
        onClick={toggleRunning}
      >
        {running ? 'Pause' : 'Play'}
      </Button>

      <Slider
        className="col-span-2"
        aria-label="animation speed"
        showTicks={false}
        value={animationSpeed}
        min={0}
        max={2}
        step={0.1}
        onChange={setAnimationSpeed}
      />
    </ControlGrid>
  );
}

export { PlaybackControls };

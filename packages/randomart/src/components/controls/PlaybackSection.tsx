import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider } from '@repo/ui/data-entry';
import { setAnimationSpeed } from '../../stores/randomart/actions/config';
import { toggleRunning } from '../../stores/randomart/actions/playback';
import { useAnimationSpeed, useRunning } from '../../stores/randomart/selectors';

function PlaybackSection() {
  const running = useRunning();
  const animationSpeed = useAnimationSpeed();

  return (
    <ControlSection
      title="Playback"
      defaultOpen={true}
    >
      <ControlGrid columns={2}>
        <Button
          variant="primary"
          onClick={toggleRunning}
        >
          {running ? 'Pause' : 'Play'}
        </Button>

        <Slider
          className="col-span-full"
          aria-label="animation speed"
          value={animationSpeed}
          min={0}
          max={2}
          step={0.1}
          onChange={setAnimationSpeed}
        />
      </ControlGrid>
    </ControlSection>
  );
}

export { PlaybackSection };

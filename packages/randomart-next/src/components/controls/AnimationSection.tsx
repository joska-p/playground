import { animationRegistry } from '@repo/randomart-engine-next';
import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider } from '@repo/ui/data-entry';
import { toggleAnimationBehavior } from '../../stores/randomart/actions/animation';
import { setAnimationSpeed } from '../../stores/randomart/actions/config';
import { toggleRunning } from '../../stores/randomart/actions/playback';
import {
  useActiveAnimationBehaviorIds,
  useAnimationSpeed,
  useRunning
} from '../../stores/randomart/selectors';

function AnimationSection() {
  const activeIds = useActiveAnimationBehaviorIds();
  const running = useRunning();
  const animationSpeed = useAnimationSpeed();

  return (
    <ControlSection
      title="animation"
      defaultOpen={false}
    >
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
          value={animationSpeed}
          min={0}
          max={2}
          step={0.1}
          onChange={setAnimationSpeed}
        />
        {animationRegistry.map((behavior) => (
          <Button
            size="sm"
            key={`animation-${behavior.id}`}
            variant={activeIds.includes(behavior.id) ? 'accent' : 'default'}
            onClick={() => {
              toggleAnimationBehavior(behavior.id);
            }}
          >
            {behavior.name}
          </Button>
        ))}
      </ControlGrid>
    </ControlSection>
  );
}

export { AnimationSection };

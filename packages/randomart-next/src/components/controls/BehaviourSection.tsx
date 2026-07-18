import { listBehaviours } from '@repo/randomart-engine-next';
import type { BehaviorId } from '@repo/randomart-engine-next/types';
import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button, Slider } from '@repo/ui/data-entry';
import { toggleBehavior } from '../../stores/randomart/actions/behaviour';
import { setAnimationSpeed } from '../../stores/randomart/actions/config';
import { toggleRunning } from '../../stores/randomart/actions/playback';
import {
  useActiveBehaviorIds,
  useAnimationSpeed,
  useRunning
} from '../../stores/randomart/selectors';

function BehaviourSection() {
  const activeIds = useActiveBehaviorIds();
  const running = useRunning();
  const animationSpeed = useAnimationSpeed();

  return (
    <ControlSection
      title="behaviours"
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
        {listBehaviours().map((behavior) => (
          <Button
            size="sm"
            key={`animation-${behavior.id}`}
            variant={activeIds.includes(behavior.id as BehaviorId) ? 'accent' : 'default'}
            onClick={() => {
              toggleBehavior(behavior.id as BehaviorId);
            }}
          >
            {behavior.label}
          </Button>
        ))}
      </ControlGrid>
    </ControlSection>
  );
}

export { BehaviourSection };

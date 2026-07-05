import { animationRegistry } from '@repo/randomart-engine/animation/behaviors';
import { Button, ControlGrid, ControlSection } from '@repo/ui';
import { toggleAnimationBehavior } from '../../stores/randomart/actions/animation';
import { useActiveAnimationBehaviorIds } from '../../stores/randomart/selectors';

function AnimationSection() {
  const activeIds = useActiveAnimationBehaviorIds();

  return (
    <ControlSection
      title="animation"
      defaultOpen={false}
    >
      <ControlGrid columns={2}>
        {animationRegistry.map((behavior) => (
          <Button
            key={`animation-${behavior.id}`}
            variant={activeIds.includes(behavior.id) ? 'primary' : 'default'}
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

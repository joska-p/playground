import { Button } from '@repo/ui/Button';
import { animationRegistry } from '../../core/animation/behaviors';
import { toggleAnimationBehavior } from '../../stores/randomart/actions/animation';
import { useActiveAnimationBehaviorIds } from '../../stores/randomart/selectors';

export function AnimationToggle() {
  const activeIds = useActiveAnimationBehaviorIds();

  return (
    <div className="flex gap-2">
      {animationRegistry.map((behavior) => {
        const isActive = activeIds.includes(behavior.id);
        return (
          <Button
            key={behavior.id}
            type="button"
            variant={isActive ? 'outline' : 'ghost'}
            onClick={() => toggleAnimationBehavior(behavior.id)}
            size="sm"
            title={`Toggle ${behavior.name}`}
          >
            {behavior.name}
          </Button>
        );
      })}
    </div>
  );
}

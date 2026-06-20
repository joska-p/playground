import { Button } from '@repo/ui/Button';
import { animationRegistry } from '../../core/animation/behaviors';
import { toggleAnimationBehavior } from '../../stores/randomart/actions/animation';
import { useActiveAnimationBehaviorIds } from '../../stores/randomart/selectors';

export function AnimationToggle() {
  const activeIds = useActiveAnimationBehaviorIds();

  return (
    <>
      <h3 className="text-muted-foreground col-span-full mb-2 text-xs font-semibold tracking-wider uppercase">
        Compose shaders
      </h3>
      <div className="col-span-full flex flex-wrap gap-2">
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
    </>
  );
}

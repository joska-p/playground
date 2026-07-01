import { animationRegistry } from '@repo/randomart-engine/animation/behaviors';
import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { toggleAnimationBehavior } from '../../stores/randomart/actions/animation';
import { useActiveAnimationBehaviorIds } from '../../stores/randomart/selectors';

function useAnimationSection() {
  const activeIds = useActiveAnimationBehaviorIds();

  const behaviorControls: Control[] = animationRegistry.map((behavior) => ({
    id: `anim-${behavior.id}`,
    type: 'button',
    label: behavior.name,
    variant: activeIds.includes(behavior.id) ? 'primary' : 'default',
    onClick: () => {
      toggleAnimationBehavior(behavior.id);
    }
  }));

  const section: ControlSection = {
    id: 'animation',
    label: 'Shader Effects',
    defaultOpen: false,
    controls: behaviorControls
  };

  return section;
}

export { useAnimationSection };

import { animationRegistry } from '@repo/randomart-engine/animation/behaviors';
import { ControlGrid, Button } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { toggleAnimationBehavior } from '../../stores/randomart/actions/animation';
import { useActiveAnimationBehaviorIds } from '../../stores/randomart/selectors';

function AnimationSection() {
    const activeIds = useActiveAnimationBehaviorIds();

    return (
        <PanelSection
            label="animation"
            defaultOpen={false}
        >
            <ControlGrid columns={2}>
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
        </PanelSection>
    );
}

export { AnimationSection };

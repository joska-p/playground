import { ControlGrid, Button } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { getBehaviorKinds } from '../../../../randomart-engine-next/src/behaviors/registry';
import { toggleBehavior } from '../../stores/randomart/actions/behavior';
import { useActiveBehaviorIds } from '../../stores/randomart/selectors';

const BEHAVIOR_KINDS = getBehaviorKinds();

function BehaviorControls() {
    const activeIds = useActiveBehaviorIds();

    return (
        <PanelSection label="Behaviors">
            {BEHAVIOR_KINDS.map((kind) => (
                <div
                    key={kind.label}
                    className="space-y-2"
                >
                    <ControlGrid columns={3}>
                        {kind.behaviors.map((behavior) => (
                            <Button
                                size="sm"
                                key={`animation-${behavior.id}`}
                                variant={activeIds.includes(behavior.id) ? 'primary' : 'default'}
                                onClick={() => {
                                    toggleBehavior(behavior.id);
                                }}
                            >
                                {behavior.label}
                            </Button>
                        ))}
                    </ControlGrid>
                </div>
            ))}
        </PanelSection>
    );
}

export { BehaviorControls };

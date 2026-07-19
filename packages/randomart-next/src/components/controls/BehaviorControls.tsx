import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';
import { getBehaviorKinds } from '../../../../randomart-engine-next/src/behaviors/registry';
import { toggleBehavior } from '../../stores/randomart/actions/behavior';
import { useActiveBehaviorIds } from '../../stores/randomart/selectors';

const BEHAVIOR_KINDS = getBehaviorKinds();

function BehaviorControls() {
  const activeIds = useActiveBehaviorIds();

  return (
    <ControlSection title="Behaviors">
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
                variant={activeIds.includes(behavior.id) ? 'accent' : 'default'}
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
    </ControlSection>
  );
}

export { BehaviorControls };

import { getOperatorKinds } from '@repo/randomart-engine-next/operators';
import { getRule } from '@repo/randomart-engine-next/rules';
import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';
import { toggleOperator } from '../../stores/randomart/actions/config';
import { useCustomOperators, useSelectedRuleId } from '../../stores/randomart/selectors';

const OPERATOR_KINDS = getOperatorKinds();

function OperatorControls() {
  const selectedRuleId = useSelectedRuleId();
  const customOperators = useCustomOperators();
  const preset = getRule(selectedRuleId);
  const baseOperatorIds = customOperators ?? preset.operatorIds;
  const activeOperatorIds = [...baseOperatorIds, 'x', 'y', 'const'];

  return (
    <ControlSection title="Operators">
      {OPERATOR_KINDS.map((kind) => (
        <div
          key={kind.label}
          className="space-y-2"
        >
          <ControlGrid columns={3}>
            {kind.operators.map((operator) => {
              const isActive = activeOperatorIds.includes(operator.id);
              return (
                <Button
                  key={operator.id}
                  variant={isActive ? 'secondary' : 'default'}
                  size="sm"
                  onClick={() => {
                    toggleOperator(operator.id);
                  }}
                >
                  {operator.label}
                </Button>
              );
            })}
          </ControlGrid>
        </div>
      ))}
    </ControlSection>
  );
}

export { OperatorControls };

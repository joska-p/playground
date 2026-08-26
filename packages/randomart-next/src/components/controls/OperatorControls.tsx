import { getOperatorKinds, type OperatorId } from '@repo/randomart-engine-next/operators';
import { getRule } from '@repo/randomart-engine-next/rules';
import { DEFAULT_TERMINALS } from '@repo/randomart-engine-next/tree';
import { ControlGrid, Button } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';

import { toggleOperator } from '../../stores/randomart/actions/config';
import { useCustomOperators, useSelectedRuleId } from '../../stores/randomart/selectors';

const OPERATOR_KINDS = getOperatorKinds();

const terminals = DEFAULT_TERMINALS.map((terminal) => terminal.type) as OperatorId[];

function OperatorControls() {
    const selectedRuleId = useSelectedRuleId();
    const customOperators = useCustomOperators();
    const preset = getRule(selectedRuleId);
    const activeOperatorIds = customOperators ?? preset.operatorIds;

    return (
        <PanelSection label="Operators">
            {OPERATOR_KINDS.map((kind) => (
                <div
                    key={kind.label}
                    className="space-y-2"
                >
                    <ControlGrid columns={3}>
                        {kind.operators.map((operator) => {
                            const isActive = activeOperatorIds.includes(operator.id);
                            const isLastTerminal =
                                terminals.includes(operator.id) &&
                                activeOperatorIds.filter((id) => terminals.includes(id)).length ===
                                    1;

                            return (
                                <Button
                                    key={operator.id}
                                    variant={isActive ? 'primary' : 'default'}
                                    size="sm"
                                    onClick={() => {
                                        toggleOperator(operator.id);
                                    }}
                                    disabled={isActive && isLastTerminal}
                                >
                                    {operator.label}
                                </Button>
                            );
                        })}
                    </ControlGrid>
                </div>
            ))}
        </PanelSection>
    );
}

export { OperatorControls };

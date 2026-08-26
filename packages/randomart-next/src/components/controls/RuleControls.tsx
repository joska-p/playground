import { listRuleGroups } from '@repo/randomart-engine-next/rules';
import { ControlGrid, Checkbox, Select } from '@repo/tlc/components/forms';
import { cn } from '@repo/tlc/lib/cn';

import { selectRule, setCorrelatedRGB } from '../../stores/randomart/actions/config';
import { useCorrelatedRGB, useSelectedRuleId } from '../../stores/randomart/selectors';

import type { RuleId } from '@repo/randomart-engine-next/types';

const RULE_GROUPS = listRuleGroups();

function RuleControls() {
    const selectedRuleId = useSelectedRuleId();
    const correlatedRGB = useCorrelatedRGB();

    return (
        <ControlGrid columns={3}>
            <Checkbox
                label="linked"
                labelClassName={cn({ 'line-through': !correlatedRGB })}
                checked={correlatedRGB}
                variant="primary"
                onChange={() => {
                    setCorrelatedRGB(!correlatedRGB);
                }}
            />

            <Select
                className="col-span-2"
                value={selectedRuleId}
                onChange={(val) => {
                    selectRule(val as RuleId);
                }}
                options={RULE_GROUPS.flatMap((group) =>
                    group.rules.map((rule) => ({
                        label: `${group.label}: ${rule.label}`,
                        value: rule.id
                    }))
                )}
            />
        </ControlGrid>
    );
}

export { RuleControls };

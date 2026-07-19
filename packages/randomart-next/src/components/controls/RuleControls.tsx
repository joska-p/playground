import { listRuleGroups } from '@repo/randomart-engine-next/rules';
import type { RuleId } from '@repo/randomart-engine-next/types';
import { ControlGrid } from '@repo/ui/control-panel';
import { Checkbox, Select } from '@repo/ui/data-entry';
import { cn } from '@repo/ui/lib/cn';
import { selectRule, setCorrelatedRGB } from '../../stores/randomart/actions/config';
import { useCorrelatedRGB, useSelectedRuleId } from '../../stores/randomart/selectors';

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
        wrapperClassName="col-span-2"
        value={selectedRuleId}
        onChange={(e) => {
          selectRule(e.target.value as RuleId);
        }}
      >
        {RULE_GROUPS.map((group) => (
          <optgroup
            key={group.label}
            label={group.label}
          >
            {group.rules.map((rule) => (
              <option
                key={rule.id}
                value={rule.id}
              >
                {rule.label}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>
    </ControlGrid>
  );
}

export { RuleControls };

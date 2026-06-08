import { Select } from '@repo/ui/Select';
import { getAllRules } from '../../core/rules/registry.ts';
import { setRule } from '../../stores/simulation/actions.ts';
import { useRuleId } from '../../stores/simulation/selectors.ts';

function RuleSelector() {
  const ruleId = useRuleId();
  const rules = getAllRules();

  return (
    <Select
      label="Rule"
      value={ruleId}
      onChange={(e) => setRule(e.target.value)}
    >
      {rules.map((rule) => (
        <option
          key={rule.id}
          value={rule.id}
        >
          {rule.name}
        </option>
      ))}
    </Select>
  );
}

export { RuleSelector };

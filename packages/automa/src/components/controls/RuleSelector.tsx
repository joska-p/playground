import { Select } from '@repo/ui/Select';
import { getAllRules } from '../../core/rules/registry';
import { setRule } from '../../stores/simulation/actions';
import { useRuleId } from '../../stores/simulation/selectors';
import { StateColorPicker } from './StateColorPicker.tsx';

function RuleSelector() {
  const ruleId = useRuleId();
  const rules = getAllRules();

  return (
    <div className="flex flex-col gap-2">
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
      <StateColorPicker />
    </div>
  );
}

export { RuleSelector };

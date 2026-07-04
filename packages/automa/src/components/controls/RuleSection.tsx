import { getAllRules, getRule } from '@repo/automa-engine/rules/registry';
import { ControlRow, ControlSection, Select } from '@repo/ui';
import { setRule } from '../../stores/simulation/actions';
import { useRuleId } from '../../stores/simulation/selectors';
import { setStateColor } from '../../stores/ui/actions';
import { useStateColors } from '../../stores/ui/selectors';

function RuleSection() {
  const ruleId = useRuleId();
  const stateColors = useStateColors();
  const rules = getAllRules();
  const rule = getRule(ruleId);

  return (
    <ControlSection
      title="Rule"
      defaultOpen
    >
      <ControlRow label="Rule">
        <Select
          value={ruleId}
          onChange={(e) => {
            setRule(e.target.value);
          }}
        >
          {rules.map((r) => (
            <option
              key={r.id}
              value={r.id}
            >
              {r.name}
            </option>
          ))}
        </Select>
      </ControlRow>
      {rule &&
        stateColors.slice(0, rule.stateCount).map((color, i) => (
          <ControlRow
            key={`stateColor-${String(i)}`}
            label={i === 0 ? 'Dead' : i === 1 ? 'Alive' : `State ${String(i)}`}
          >
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setStateColor(i, e.target.value);
              }}
              className="h-8 w-full cursor-pointer rounded border"
            />
          </ControlRow>
        ))}
    </ControlSection>
  );
}

export { RuleSection };

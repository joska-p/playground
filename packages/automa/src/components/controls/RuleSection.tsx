import { getAllRules, getRule } from '@repo/automa-engine/rules/registry';
import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Select } from '@repo/ui/data-entry';
import { setRule, setStateColor, useRuleId, useStateColors } from '../../stores/automa';

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
      {stateColors.slice(0, rule.stateCount).map((color, i) => (
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

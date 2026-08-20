import { allRules, rules, type RuleId } from '../../engine/rules/registry';
import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Select } from '@repo/ui/data-entry';
import { useRuleId } from '../../engine/gpu/SimulationEngine';
import { setRule, setStateColor, useStateColors } from '../../stores/automa';

function RuleSection() {
    const ruleId = useRuleId();
    const stateColors = useStateColors();
    const rule = rules[ruleId];

    return (
        <ControlSection
            title="Rule"
            defaultOpen
        >
            <ControlRow label="Rule">
                <Select
                    value={ruleId}
                    onChange={(e) => {
                        setRule(e.target.value as RuleId);
                    }}
                >
                    {allRules.map((r) => (
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
                    label={`Age ${String(i)}`}
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

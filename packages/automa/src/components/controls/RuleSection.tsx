import { createCssColor } from '@repo/glaze/core/types';
import { FieldRow } from '@repo/tlc/components/forms';
import { Select } from '@repo/tlc/components/forms';
import { PanelSection } from '@repo/tlc/layout';
import { allRules, rules, type RuleId } from '../../engine/rules/registry';
import { setRule, setStateColor } from '../../stores/automa/actions';
import { useRuleId, useStateColors } from '../../stores/automa/selectors';

function RuleSection() {
    const ruleId = useRuleId();
    const stateColors = useStateColors();
    const rule = rules[ruleId];

    return (
        <PanelSection
            label="Rule"
            collapsible={false}
        >
            <FieldRow label="Rule">
                <Select
                    value={ruleId}
                    onChange={(value) => {
                        setRule(value as RuleId);
                    }}
                    options={allRules.map((r) => ({
                        label: r.name,
                        value: r.id
                    }))}
                />
            </FieldRow>
            {stateColors.slice(0, rule.stateCount).map((color, i) => (
                <FieldRow
                    key={`stateColor-${String(i)}`}
                    label={`Age ${String(i)}`}
                >
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => {
                            setStateColor(i, createCssColor(e.target.value));
                        }}
                        className="h-8 w-full cursor-pointer rounded border"
                    />
                </FieldRow>
            ))}
        </PanelSection>
    );
}

export { RuleSection };

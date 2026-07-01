import { getAllRules, getRule } from '@repo/automa-engine/rules/registry';
import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { setRule } from '../../stores/simulation/actions';
import { useRuleId } from '../../stores/simulation/selectors';
import { setStateColor } from '../../stores/ui/actions';
import { useStateColors } from '../../stores/ui/selectors';

function useRuleSection() {
  const ruleId = useRuleId();
  const stateColors = useStateColors();
  const rules = getAllRules();
  const rule = getRule(ruleId);

  const ruleControl: Control = {
    id: 'rule',
    type: 'select',
    label: 'Rule',
    value: ruleId,
    options: rules.map((r) => ({ label: r.name, value: r.id })),
    onChange: setRule
  };

  const stateColorControls = rule
    ? stateColors.slice(0, rule.stateCount).map((color, i) => ({
        id: `stateColor-${String(i)}`,
        type: 'color' as const,
        label: i === 0 ? 'Dead' : i === 1 ? 'Alive' : `State ${String(i)}`,
        value: color,
        onChange: (c: string) => {
          setStateColor(i, c);
        }
      }))
    : [];

  const ruleSection: ControlSection = {
    id: 'rule',
    label: 'Rule',
    defaultOpen: true,
    controls: [ruleControl, ...stateColorControls]
  };

  return ruleSection;
}

export { useRuleSection };

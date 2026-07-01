import { getAllRules } from '@repo/randomart-engine/grammar/registry';
import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { toggleRule } from '../../stores/randomart/actions/config';
import { useEnabledRuleIds } from '../../stores/randomart/selectors';

function useGrammarSection() {
  const enabledRuleIds = useEnabledRuleIds();
  const rules = getAllRules();

  const ruleControls: Control[] = rules.map((rule) => ({
    id: `rule-${rule.id}`,
    type: 'button',
    label: rule.name,
    variant: enabledRuleIds.includes(rule.id) ? 'primary' : 'default',
    onClick: () => {
      toggleRule(rule.id);
    }
  }));

  const section: ControlSection = {
    id: 'grammar',
    label: 'Grammar Rules',
    defaultOpen: false,
    controls: ruleControls
  };

  return section;
}

export { useGrammarSection };

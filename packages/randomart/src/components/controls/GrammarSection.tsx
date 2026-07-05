import { getAllRules } from '@repo/randomart-engine/grammar/registry';
import { Button, ControlSection } from '@repo/ui';
import { toggleRule } from '../../stores/randomart/actions/config';
import { useEnabledRuleIds } from '../../stores/randomart/selectors';

function GrammarSection() {
  const enabledRuleIds = useEnabledRuleIds();
  const rules = getAllRules();

  return (
    <ControlSection
      title="Grammar"
      defaultOpen={false}
    >
      {rules.map((rule) => (
        <Button
          key={`rule-${rule.id}`}
          variant={enabledRuleIds.includes(rule.id) ? 'primary' : 'default'}
          onClick={() => {
            toggleRule(rule.id);
          }}
        >
          {rule.name}
        </Button>
      ))}
    </ControlSection>
  );
}

export { GrammarSection };

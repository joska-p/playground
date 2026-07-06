import { getAllRules } from '@repo/randomart-engine/grammar/registry';
import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';
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
      <ControlGrid columns={2}>
        {rules.map((rule) => (
          <Button
            key={`rule-${rule.id}`}
            variant={enabledRuleIds.includes(rule.id) ? 'secondary' : 'default'}
            size="sm"
            onClick={() => {
              toggleRule(rule.id);
            }}
          >
            {rule.name}
          </Button>
        ))}
      </ControlGrid>
    </ControlSection>
  );
}

export { GrammarSection };

import { listRules } from '@repo/randomart-engine-next';
import { ControlGrid, ControlSection } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';
import { toggleRule } from '../../stores/randomart/actions/config';
import { useEnabledRuleIds } from '../../stores/randomart/selectors';

function GrammarSection() {
  const enabledRuleIds = useEnabledRuleIds();
  const rules = listRules();

  return (
    <ControlSection
      title="Grammar"
      defaultOpen={false}
    >
      <ControlGrid columns={3}>
        {rules.map((rule) => (
          <Button
            key={`rule-${rule.id}`}
            variant={enabledRuleIds.includes(rule.id) ? 'secondary' : 'default'}
            size="sm"
            onClick={() => {
              toggleRule(rule.id);
            }}
          >
            {rule.displayName}
          </Button>
        ))}
      </ControlGrid>
    </ControlSection>
  );
}

export { GrammarSection };

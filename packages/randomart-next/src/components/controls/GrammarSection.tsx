import { getAllRules, type RuleId } from '@repo/randomart-engine/grammar/registry';
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
      <ControlGrid columns={3}>
        {rules.map((rule) => {
          const ruleId = rule.id as RuleId;
          return (
            <Button
              key={`rule-${ruleId}`}
              variant={enabledRuleIds.includes(ruleId) ? 'secondary' : 'default'}
              size="sm"
              onClick={() => {
                toggleRule(ruleId);
              }}
            >
              {rule.name}
            </Button>
          );
        })}
      </ControlGrid>
    </ControlSection>
  );
}

export { GrammarSection };

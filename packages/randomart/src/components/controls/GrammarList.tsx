import { Badge } from '@repo/ui/Badge';
import { cn } from '@repo/ui/cn';
import { getAllRules } from '../../core/grammar/registry';
import { toggleRule } from '../../stores/randomart/actions/config';
import { useEnabledRuleIds } from '../../stores/randomart/selectors';

export function GrammarList() {
  const rules = getAllRules();
  const enabledRuleIds = useEnabledRuleIds();

  return (
    <>
      <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
        Enabled Engine Grammar Rules
      </h3>
      <div className="flex flex-wrap gap-2">
        {rules.map((rule) => {
          const enabled = enabledRuleIds.includes(rule.id);
          return (
            <Badge
              key={rule.id}
              className={cn('cursor-pointer text-xs select-none', {
                'line-through opacity-50': !enabled
              })}
              variant={enabled ? 'secondary' : 'outline'}
              onClick={() => toggleRule(rule.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleRule(rule.id);
                }
              }}
            >
              {rule.name}
            </Badge>
          );
        })}
      </div>
    </>
  );
}

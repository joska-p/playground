import { Badge } from '@repo/ui/Badge';
import { getAllRules } from '../../core/grammar/registry';

export function GrammarList() {
  const rules = getAllRules();

  return (
    <>
      <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
        Enabled Engine Grammar Rules
      </h3>
      <div className="flex flex-wrap gap-2">
        {rules.map((rule) => (
          <Badge
            key={rule.id}
            className="text-xs"
            variant="secondary"
          >
            {rule.name}
          </Badge>
        ))}
      </div>
    </>
  );
}

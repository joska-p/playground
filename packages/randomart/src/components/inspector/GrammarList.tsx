import { getAllRules } from '../../core/grammar/registry';

export function GrammarList() {
  const rules = getAllRules();

  return (
    <div>
      <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
        Enabled Engine Grammar Rules
      </h3>
      <div className="flex flex-wrap gap-2">
        {rules.map((rule) => (
          <span
            key={rule.id}
            className="text-muted-foreground font-mono text-xs"
          >
            {rule.name}
          </span>
        ))}
      </div>
    </div>
  );
}

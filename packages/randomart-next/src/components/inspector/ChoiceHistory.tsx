import { useEnabledRuleIds } from '../../stores/randomart/selectors';

export function ChoiceHistory() {
  const enabledRuleIds = useEnabledRuleIds();

  return (
    <div>
      <h4 className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
        Enabled Rules ({enabledRuleIds.length})
      </h4>
      {enabledRuleIds.length === 0 ? (
        <div className="text-muted-foreground/60 py-2 text-xs italic">No rules enabled.</div>
      ) : (
        <div className="flex max-h-48 flex-wrap gap-1.5 overflow-y-auto text-sm">
          {enabledRuleIds.map((ruleId) => (
            <span
              key={ruleId}
              className="bg-background text-utility-2 rounded-sm px-1.5 py-0.5"
            >
              {ruleId}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

import { listRules } from '@repo/randomart-engine-next';

export function WeightSliders() {
  const rules = listRules();

  return (
    <div className="flex flex-col gap-3">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="flex flex-col gap-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-foreground text-xs font-medium">{rule.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

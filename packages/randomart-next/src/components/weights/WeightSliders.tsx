import { getAllRules, type RuleId } from '@repo/randomart-engine/grammar/registry';
import { Slider } from '@repo/ui/data-entry';
import { setRuleWeight } from '../../stores/randomart/actions/config';
import { useRuleWeights } from '../../stores/randomart/selectors';

export function WeightSliders() {
  const ruleWeights = useRuleWeights();
  const rules = getAllRules();

  return (
    <div className="flex flex-col gap-3">
      {rules.map((rule) => {
        const currentWeight = ruleWeights[rule.id as RuleId];
        return (
          <div
            key={rule.id}
            className="flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-foreground text-xs font-medium">{rule.name}</span>
              <span className="text-muted-foreground text-xs tabular-nums">
                {currentWeight?.toFixed(1)}
              </span>
            </div>
            <Slider
              min={0}
              max={3}
              step={0.1}
              value={currentWeight}
              showTicks={false}
              onChange={(val) => {
                setRuleWeight(rule.id, val);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

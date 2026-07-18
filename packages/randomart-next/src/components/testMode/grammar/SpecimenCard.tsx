import { buildChannelTrees, toMathString } from '@repo/randomart-engine-next';
import type { Rule } from '@repo/randomart-engine-next/types';
import { Button } from '@repo/ui/data-entry';
import {
  rerollRule,
  selectRule,
  useRenderMode,
  useResolution,
  useSeedForRule,
  useSelectedRuleId,
  useT
} from '../store';
import { RuleCanvas } from './canvas/RuleCanvas';
import { Badge } from './ui/Badge';

const CARD_CANVAS_SIZE = 132;
const CARD_CANVAS_SIZE_COMPARE = 96;

export function SpecimenCard({ rule, index }: { rule: Rule; index: number }) {
  const selectedRuleId = useSelectedRuleId();
  const seed = useSeedForRule(rule.id);
  const resolution = useResolution();
  const t = useT();
  const renderMode = useRenderMode();
  const isSelected = selectedRuleId === rule.id;
  const sizePx = renderMode === 'compare' ? CARD_CANVAS_SIZE_COMPARE : CARD_CANVAS_SIZE;
  const { treeR } = buildChannelTrees(String(seed), rule, true);

  return (
    <div
      className={`border-border bg-surface cursor-pointer rounded-md border p-3 transition-colors ${
        isSelected ? 'border-primary/60 bg-primary/10' : 'hover:border-foreground-dim'
      }`}
      onClick={() => {
        selectRule(isSelected ? null : rule.id);
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-foreground-muted font-mono text-xs">#{index}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            rerollRule(rule.id);
          }}
          className="px-1.5 py-0.5 text-[10px]"
        >
          reroll
        </Button>
      </div>

      <div className="mb-2 flex justify-center">
        <RuleCanvas
          rule={rule}
          seed={seed}
          resolution={resolution}
          t={t}
          sizePx={sizePx}
          renderMode={renderMode}
        />
      </div>

      <h3 className="text-foreground mb-1 text-sm font-semibold">
        {rule.displayName} <span className="text-foreground-muted">({rule.id})</span>
      </h3>

      <div className="mb-2 flex flex-wrap gap-1">
        <Badge>{rule.id}</Badge>
      </div>

      <pre className="bg-background text-warning overflow-x-auto rounded-md p-1.5 font-mono text-[10px]">
        f(x, y) = {toMathString(treeR)}
      </pre>
    </div>
  );
}

import type { GrammarRule } from '@repo/randomart-engine/types';
import { STRING_ARGS } from '../lib/evalHelpers';
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

export function SpecimenCard({ rule, index }: { rule: GrammarRule; index: number }) {
  const selectedRuleId = useSelectedRuleId();
  const seed = useSeedForRule(rule.id);
  const resolution = useResolution();
  const t = useT();
  const renderMode = useRenderMode();
  const isSelected = selectedRuleId === rule.id;
  const sizePx = renderMode === 'compare' ? CARD_CANVAS_SIZE_COMPARE : CARD_CANVAS_SIZE;

  return (
    <div
      className={`cursor-pointer rounded border p-3 transition-colors ${
        isSelected
          ? 'border-amber-500/60 bg-amber-500/10'
          : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
      }`}
      onClick={() => {
        selectRule(isSelected ? null : rule.id);
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-xs text-neutral-400">#{index}</span>
        <button
          className="rounded border border-neutral-600 px-1.5 py-0.5 text-[10px] text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
          onClick={(e) => {
            e.stopPropagation();
            rerollRule(rule.id);
          }}
        >
          reroll
        </button>
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

      <h3 className="mb-1 text-sm font-semibold">
        {rule.name} <span className="text-neutral-400">({rule.id})</span>
      </h3>

      <div className="mb-2 flex flex-wrap gap-1">
        <Badge>{rule.category}</Badge>
        <Badge>arity {rule.arity}</Badge>
      </div>

      <pre className="overflow-x-auto rounded bg-neutral-950 p-1.5 font-mono text-[10px] text-amber-400">
        f({STRING_ARGS.join(', ')}) = {rule.toMathString(STRING_ARGS)}
      </pre>
    </div>
  );
}

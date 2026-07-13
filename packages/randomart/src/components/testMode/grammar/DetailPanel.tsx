import type { GrammarRule } from '@repo/randomart-engine/types';
import { useEffect } from 'react';
import { STRING_ARGS, buildPreviewNode } from '../lib/evalHelpers';
import { rerollRule, selectRule, useRenderMode, useResolution, useSeedForRule, useSelectedRuleId, useT } from '../store';
import { RuleCanvas } from './canvas/RuleCanvas';
import { Badge } from './ui/Badge';

const DETAIL_CANVAS_SIZE = 260;
const DETAIL_CANVAS_SIZE_COMPARE = 200;

export function DetailPanel({ rules }: { rules: GrammarRule[] }) {
  const selectedRuleId = useSelectedRuleId();
  const resolution = useResolution();
  const t = useT();
  const renderMode = useRenderMode();
  const seed = useSeedForRule(selectedRuleId ?? '');

  const rule = rules.find((r) => r.id === selectedRuleId);

  useEffect(() => {
    if (!selectedRuleId) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') selectRule(null);
    }
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [selectedRuleId]);

  if (!rule) return null;

  const node = buildPreviewNode(rule, seed);
  const sizePx = renderMode === 'compare' ? DETAIL_CANVAS_SIZE_COMPARE : DETAIL_CANVAS_SIZE;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => {
        selectRule(null);
      }}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-neutral-700 bg-neutral-900 p-6 shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="absolute top-3 right-3 rounded border border-neutral-600 px-2 py-1 text-xs text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
          onClick={() => {
            selectRule(null);
          }}
        >
          ✕
        </button>

        <h2 className="mb-1 text-lg font-bold">
          {rule.name} <span className="text-neutral-400">({rule.id})</span>
        </h2>

        <div className="mb-4 flex flex-wrap gap-1">
          <Badge>{rule.category}</Badge>
          <Badge>arity {rule.arity}</Badge>
          <Badge>seed {seed}</Badge>
        </div>

        <div className="mb-4 flex justify-center">
          <RuleCanvas
            rule={rule}
            seed={seed}
            resolution={resolution}
            t={t}
            sizePx={sizePx}
            renderMode={renderMode}
          />
        </div>

        <div className="mb-4 flex justify-center">
          <button
            className="rounded border border-neutral-600 px-3 py-1.5 text-xs text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
            onClick={() => {
              rerollRule(rule.id);
            }}
          >
            ↻ reroll
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-wider text-neutral-400 uppercase">Math</h3>
            <pre className="overflow-x-auto rounded bg-neutral-950 p-2 font-mono text-xs text-amber-400">
              {rule.toMathString(STRING_ARGS, node)}
            </pre>
          </div>

          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-wider text-neutral-400 uppercase">GLSL</h3>
            <pre className="overflow-x-auto rounded bg-neutral-950 p-2 font-mono text-xs text-green-400">
              {rule.toGLSL(STRING_ARGS, node)}
            </pre>
          </div>

          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-wider text-neutral-400 uppercase">Tree</h3>
            <pre className="overflow-x-auto rounded bg-neutral-950 p-2 font-mono text-xs text-blue-400">
              {rule.toTreeView(STRING_ARGS, 0, node)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

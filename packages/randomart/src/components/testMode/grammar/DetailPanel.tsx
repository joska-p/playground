import type { GrammarRule } from '@repo/randomart-engine/types';
import { Button } from '@repo/ui/data-entry';
import { useEffect } from 'react';
import { STRING_ARGS, buildPreviewNode } from '../lib/evalHelpers';
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
      className="bg-background/60 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={() => {
        selectRule(null);
      }}
    >
      <div
        className="border-border bg-surface relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border p-6 shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          variant="outline"
          size="icon"
          className="absolute top-3 right-3"
          onClick={() => {
            selectRule(null);
          }}
        >
          x
        </Button>

        <h2 className="text-foreground mb-1 text-lg font-bold">
          {rule.name} <span className="text-foreground-muted">({rule.id})</span>
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              rerollRule(rule.id);
            }}
          >
            reroll
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-foreground-muted mb-1 text-xs font-semibold tracking-wider uppercase">
              Math
            </h3>
            <pre className="bg-background text-warning overflow-x-auto rounded-md p-2 font-mono text-xs">
              {rule.toMathString(STRING_ARGS, node)}
            </pre>
          </div>

          <div>
            <h3 className="text-foreground-muted mb-1 text-xs font-semibold tracking-wider uppercase">
              GLSL
            </h3>
            <pre className="bg-background text-green overflow-x-auto rounded-md p-2 font-mono text-xs">
              {rule.toGLSL(STRING_ARGS, node)}
            </pre>
          </div>

          <div>
            <h3 className="text-foreground-muted mb-1 text-xs font-semibold tracking-wider uppercase">
              Tree
            </h3>
            <pre className="bg-background text-blue overflow-x-auto rounded-md p-2 font-mono text-xs">
              {rule.toTreeView(STRING_ARGS, 0, node)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getOperator, getOperatorKinds, OPERATORS } from '@repo/randomart-engine-next';
import type { ExprNode, OperatorId } from '@repo/randomart-engine-next/types';
import { useMemo } from 'react';
import { Canvas } from './Canvas';

const CARD_SIZE = 180;
const RESOLUTION = 96;

function makeOperatorNode(id: OperatorId): ExprNode {
  const op = getOperator(id);
  if (op.arity === 0) {
    if (id === 'x') return { type: 'x' };
    if (id === 'y') return { type: 'y' };
    return { type: id };
  }
  if (op.arity === 1) return { type: id, children: [{ type: 'x' }] };
  if (op.arity === 2) return { type: id, children: [{ type: 'x' }, { type: 'y' }] };
  const terminals: ExprNode[] = [
    { type: 'x' },
    { type: 'y' },
    { type: 'const', value: 0.5 },
    { type: 'const', value: -0.5 }
  ];
  return {
    type: id,
    children: Array.from(
      { length: op.arity },
      (_, i) => terminals[i % terminals.length] ?? { type: 'x' }
    )
  };
}

export function TestMode() {
  const categories = getOperatorKinds();

  const operatorNodes = useMemo(() => {
    const entries: { id: OperatorId; label: string; node: ExprNode }[] = [];
    for (const [id] of Object.entries(OPERATORS)) {
      const oid = id as OperatorId;
      entries.push({ id: oid, label: getOperator(oid).label, node: makeOperatorNode(oid) });
    }
    return entries;
  }, []);

  return (
    <div className="h-screen overflow-auto p-6">
      <div className="mb-4 flex items-center gap-4">
        <h1 className="text-lg font-bold">Operator CPU/GPU Compare</h1>
      </div>

      {categories.map((cat) => (
        <div
          key={cat.label}
          className="mb-6"
        >
          <h2 className="text-foreground-muted mb-3 text-sm font-semibold tracking-wider uppercase">
            {cat.label}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {cat.operators.map((op) => {
              const entry = operatorNodes.find((e) => e.id === op.id);
              if (!entry) return null;
              return (
                <div
                  key={op.id}
                  className="border-border bg-surface rounded-md border p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-foreground text-sm font-semibold">{entry.label}</span>
                    <span className="text-foreground-muted font-mono text-xs">{op.id}</span>
                  </div>
                  <div className="flex justify-center">
                    <Canvas
                      node={entry.node}
                      resolution={RESOLUTION}
                      sizePx={CARD_SIZE}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

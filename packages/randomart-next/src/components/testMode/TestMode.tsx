import { getOperator, getOperatorKinds, OPERATORS } from '@repo/randomart-engine-next/operators';
import type { Node, OperatorId } from '@repo/randomart-engine-next/types';
import { useMemo } from 'react';
import { Canvas } from './Canvas';

const CARD_SIZE = 180;
const RESOLUTION = 96;

function makeOperatorNode(id: OperatorId): Node {
  const op = getOperator(id);
  const args: Record<string, Node | number> = {};

  // Mock inputs to feed into the argument slots of multi-arity combinators
  const mockTerminals: Node[] = [
    { type: 'x', args: {} },
    { type: 'y', args: {} },
    { type: 'radial', args: {} },
    { type: 'sweep', args: {} }
  ];

  for (let i = 0; i < op.argNames.length; i++) {
    const argName = op.argNames[i];
    if (!argName) continue;

    if (id === 'const' && argName === 'value') {
      // Primitive numerical config values map directly in 'args' now!
      args[argName] = 0.5;
    } else {
      // Cycle through our mock sub-trees for standard arguments
      args[argName] = mockTerminals[i % mockTerminals.length] ?? { type: 'x', args: {} };
    }
  }

  return {
    type: id,
    args
  };
}

export function TestMode() {
  const categories = getOperatorKinds();

  const operatorNodes = useMemo(() => {
    const entries: { id: OperatorId; label: string; node: Node }[] = [];
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

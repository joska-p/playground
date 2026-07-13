import { getRule, type RuleId } from '@repo/randomart-engine/grammar/registry';
import type { GrammarRule } from '@repo/randomart-engine/types';
import { useEffect, useRef } from 'react';
import type { ArgPreset } from '../store';
import { useArgPreset, useGlobalT } from '../store';

const CANVAS_SIZE = 128;

type RuleGroup = {
  label: string;
  ids: RuleId[];
};

const GROUPS: RuleGroup[] = [
  {
    label: 'Terminals',
    ids: [
      'x',
      'y',
      'constant',
      'random',
      'radial',
      'sweep',
      'fbm',
      'voronoi',
      'recaman-pattern',
      'nested-oscillation'
    ]
  },
  {
    label: 'Unary Transforms',
    ids: ['abs', 'sqrt', 'exp', 'log', 'fract', 'sin', 'cos']
  },
  {
    label: 'Binary Combinators',
    ids: ['add', 'multiply', 'modulo', 'pow', 'less-than', 'greater-than', 'step']
  },
  {
    label: 'Ternary Flow',
    ids: ['if', 'smoothstep', 'clamp']
  }
];

function resolvePreset(preset: ArgPreset, globalT: number) {
  switch (preset) {
    case 'symmetric':
      return {
        stringArgs: ['x', 'x * y', globalT.toFixed(2)],
        makeEvalArgs: (x: number, y: number): (() => number)[] => [
          () => x,
          () => x * y,
          () => globalT
        ]
      };
    case 'interactive':
      return {
        stringArgs: ['x', globalT.toFixed(2), '0.0'],
        makeEvalArgs: (x: number): (() => number)[] => [() => x, () => globalT, () => 0]
      };
    case 'gradient':
    default:
      return {
        stringArgs: ['x', 'y', globalT.toFixed(2)],
        makeEvalArgs: (x: number, y: number): (() => number)[] => [() => x, () => y, () => globalT]
      };
  }
}

function evaluateRuleToBuffer(
  rule: GrammarRule,
  size: number,
  makeEvalArgs: (x: number, y: number) => (() => number)[]
): Uint8ClampedArray {
  const buffer = new Uint8ClampedArray(size * size * 4);

  for (let py = 0; py < size; py++) {
    const y = (py / size) * 2 - 1;

    for (let px = 0; px < size; px++) {
      const x = (px / size) * 2 - 1;
      const index = (py * size + px) * 4;

      let value: number;
      try {
        value = rule.evaluate(makeEvalArgs(x, y), x, y, 0);
      } catch {
        value = 0;
      }

      if (!Number.isFinite(value)) value = 0;

      const channel = Math.max(0, Math.min(255, Math.floor(((value + 1) / 2) * 255)));

      buffer[index] = channel;
      buffer[index + 1] = channel;
      buffer[index + 2] = channel;
      buffer[index + 3] = 255;
    }
  }

  return buffer;
}

function RuleCard({
  ruleId,
  makeEvalArgs,
  stringArgs
}: {
  ruleId: RuleId;
  makeEvalArgs: (x: number, y: number) => (() => number)[];
  stringArgs: string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rule = getRule(ruleId);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !rule) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const buffer = evaluateRuleToBuffer(rule, CANVAS_SIZE, makeEvalArgs);
    const imageData = new ImageData(new Uint8ClampedArray(buffer), CANVAS_SIZE, CANVAS_SIZE);
    ctx.putImageData(imageData, 0, 0);
  }, [rule, makeEvalArgs]);

  if (!rule) return null;

  return (
    <div className="rounded border border-neutral-700 bg-neutral-900 p-4">
      <h3 className="mb-2 text-sm font-semibold">
        {rule.name}{' '}
        <span className="text-neutral-400">
          ({rule.id}, arity {rule.arity})
        </span>
      </h3>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{ width: '100%', imageRendering: 'pixelated' }}
        className="mb-3 aspect-square rounded"
      />
      <div className="space-y-2 font-mono text-xs">
        <div>
          <span className="text-[10px] tracking-wider text-neutral-400 uppercase">GLSL</span>
          <pre className="mt-1 overflow-x-auto rounded bg-neutral-950 p-2 text-green-400">
            {rule.toGLSL(stringArgs)}
          </pre>
        </div>
        <div>
          <span className="text-[10px] tracking-wider text-neutral-400 uppercase">Math</span>
          <pre className="mt-1 overflow-x-auto rounded bg-neutral-950 p-2 text-amber-400">
            f({stringArgs.join(', ')}) = {rule.toMathString(stringArgs)}
          </pre>
        </div>
      </div>
    </div>
  );
}

function GrammarTestBench() {
  const globalT = useGlobalT();
  const argPreset = useArgPreset();
  const presetData = resolvePreset(argPreset, globalT);

  return (
    <div className="min-h-screen bg-neutral-950 p-6 text-neutral-100">
      <h1 className="mb-6 text-lg font-bold">Grammar Rule Test Bench</h1>
      <div className="space-y-8">
        {GROUPS.map((group) => (
          <section key={group.label}>
            <h2 className="mb-3 text-sm font-semibold tracking-wider text-neutral-400 uppercase">
              {group.label}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {group.ids.map((id) => (
                <RuleCard
                  key={`${id}-${argPreset}-${String(globalT)}`}
                  ruleId={id}
                  makeEvalArgs={presetData.makeEvalArgs}
                  stringArgs={presetData.stringArgs}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export { GrammarTestBench };

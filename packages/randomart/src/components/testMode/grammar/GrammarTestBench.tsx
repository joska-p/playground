import { SeededRandom } from '@repo/randomart-engine/random/SeededRandom';
import type { GrammarRule } from '@repo/randomart-engine/types';
import { useEffect, useRef, useState } from 'react';
import {
  rerollRule,
  selectRule,
  setT,
  testModeStore,
  useAnimate,
  useCategory,
  useQuery,
  useResolution,
  useSeedForRule,
  useSelectedRuleId,
  useT
} from '../store';

const CANVAS_SIZE = 132;

// ── Colormap helpers ──────────────────────────────────────────────
const NEGATIVE: [number, number, number] = [55, 48, 163];
const ZERO: [number, number, number] = [11, 13, 16];
const POSITIVE: [number, number, number] = [240, 169, 58];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function valueToRGB(value: number): [number, number, number] {
  const t = Math.max(-1, Math.min(1, value));
  if (t < 0) {
    const p = t + 1;
    return [
      lerp(NEGATIVE[0], ZERO[0], p),
      lerp(NEGATIVE[1], ZERO[1], p),
      lerp(NEGATIVE[2], ZERO[2], p)
    ];
  }
  const p = t;
  return [
    lerp(ZERO[0], POSITIVE[0], p),
    lerp(ZERO[1], POSITIVE[1], p),
    lerp(ZERO[2], POSITIVE[2], p)
  ];
}

// ── Presentational components ─────────────────────────────────────
function Corners({ children, sizePx }: { children: React.ReactNode; sizePx: number }) {
  const size = 10;
  const style: React.CSSProperties = {
    borderColor: 'rgba(251,191,36,0.7)',
    borderStyle: 'solid',
    position: 'absolute' as const,
    width: size,
    height: size
  };
  return (
    <div style={{ position: 'relative', width: sizePx, height: sizePx }}>
      <span style={{ ...style, top: 0, left: 0, borderWidth: '2px 0 0 2px' }} />
      <span style={{ ...style, top: 0, right: 0, borderWidth: '2px 2px 0 0' }} />
      <span style={{ ...style, bottom: 0, left: 0, borderWidth: '0 0 2px 2px' }} />
      <span style={{ ...style, bottom: 0, right: 0, borderWidth: '0 2px 2px 0' }} />
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-white/10 bg-white/[0.03] font-mono text-[10px] tracking-wider uppercase">
      {children}
    </span>
  );
}

// ── Helpers ───────────────────────────────────────────────────────
function buildPreviewNode(rule: GrammarRule, seed: number) {
  const rng = new SeededRandom(String(seed));
  return rule.buildNode(rng, () => ({ ruleId: 'x', args: [] }));
}

const STRING_ARGS = ['x', 'y', '0.50'];

function makeDefaultEvalArgs(x: number, y: number): (() => number)[] {
  return [() => x, () => y, () => 0.5];
}

// ── ValueCanvas ──────────────────────────────────────────────────
function ValueCanvas({
  rule,
  seed,
  resolution,
  t,
  sizePx
}: {
  rule: GrammarRule;
  seed: number;
  resolution: number;
  t: number;
  sizePx: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setError(null);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const node = buildPreviewNode(rule, seed);
    const buffer = new Uint8ClampedArray(resolution * resolution * 4);

    try {
      for (let py = 0; py < resolution; py++) {
        for (let px = 0; px < resolution; px++) {
          const x = (px / resolution) * 2 - 1;
          const y = (py / resolution) * 2 - 1;
          const idx = (py * resolution + px) * 4;

          const value = rule.evaluate(makeDefaultEvalArgs(x, y), x, y, t, node);

          if (!Number.isFinite(value)) {
            buffer[idx] = 0;
            buffer[idx + 1] = 0;
            buffer[idx + 2] = 0;
          } else {
            const [r, g, b] = valueToRGB(value);
            buffer[idx] = r;
            buffer[idx + 1] = g;
            buffer[idx + 2] = b;
          }
          buffer[idx + 3] = 255;
        }
      }

      const imageData = new ImageData(buffer, resolution, resolution);
      ctx.putImageData(imageData, 0, 0);
    } catch (e) {
      console.log(e instanceof Error ? e.message : 'Render error');
    }
  }, [rule, seed, resolution, t]);

  return (
    <Corners sizePx={sizePx}>
      <canvas
        ref={canvasRef}
        width={resolution}
        height={resolution}
        style={{ width: sizePx, height: sizePx, imageRendering: 'pixelated' }}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-xs text-red-400">
          {error}
        </div>
      )}
    </Corners>
  );
}

// ── SpecimenCard ─────────────────────────────────────────────────
function SpecimenCard({ rule, index }: { rule: GrammarRule; index: number }) {
  const selectedRuleId = useSelectedRuleId();
  const seed = useSeedForRule(rule.id);
  const resolution = useResolution();
  const t = useT();
  const isSelected = selectedRuleId === rule.id;

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
        <ValueCanvas
          rule={rule}
          seed={seed}
          resolution={resolution}
          t={t}
          sizePx={CANVAS_SIZE}
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

// ── DetailPanel ──────────────────────────────────────────────────
function DetailPanel({ rules }: { rules: GrammarRule[] }) {
  const selectedRuleId = useSelectedRuleId();
  const resolution = useResolution();
  const t = useT();
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
          <ValueCanvas
            rule={rule}
            seed={seed}
            resolution={resolution}
            t={t}
            sizePx={260}
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
            <h3 className="mb-1 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Math
            </h3>
            <pre className="overflow-x-auto rounded bg-neutral-950 p-2 font-mono text-xs text-amber-400">
              {rule.toMathString(STRING_ARGS, node)}
            </pre>
          </div>

          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              GLSL
            </h3>
            <pre className="overflow-x-auto rounded bg-neutral-950 p-2 font-mono text-xs text-green-400">
              {rule.toGLSL(STRING_ARGS, node)}
            </pre>
          </div>

          <div>
            <h3 className="mb-1 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Tree
            </h3>
            <pre className="overflow-x-auto rounded bg-neutral-950 p-2 font-mono text-xs text-blue-400">
              {rule.toTreeView(STRING_ARGS, 0, node)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── GrammarTestBench ─────────────────────────────────────────────
function GrammarTestBench({ rules }: { rules: GrammarRule[] }) {
  const query = useQuery();
  const category = useCategory();
  const animate = useAnimate();

  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!animate) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    lastTimeRef.current = performance.now();

    function tick(now: number) {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      const currentT = testModeStore.getState().t;
      setT(currentT + delta);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const filtered = rules.filter((rule) => {
    if (category !== 'all' && rule.category !== category) return false;
    if (query) {
      const q = query.toLowerCase();
      return rule.name.toLowerCase().includes(q) || rule.id.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-950 p-6 text-neutral-100">
      <h1 className="mb-4 text-lg font-bold">Grammar Rule Test Bench</h1>

      {/* ── Grid ────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((rule, i) => (
          <SpecimenCard
            key={rule.id}
            rule={rule}
            index={i}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-neutral-500">No rules match your filters.</p>
      )}

      {/* ── Detail Panel ────────────────────────────────────── */}
      <DetailPanel rules={rules} />
    </div>
  );
}

export { GrammarTestBench };

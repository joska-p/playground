# Plan: Operator Registry Refactor for `randomart-engine-next`

## Problem

Operator behavior (`evaluate`, `toGLSL`, `toMathString`, opcode) is scattered across
4 switch statements in `expression.ts` and `format.ts`. Adding a new `ExprNodeType`
requires touching 4 files, 4 switch statements, 1 type union — and forgetting one
silently returns `0` / `0.0` / `'0'` via `default` catch-alls.

## Two Layers of Abstraction

| Concept          | What it is                                                                                             | Current home                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| **Operator**     | A single grammar primitive: `sum`, `sin`, `if`, etc.                                                   | `ExprNodeType` union + switch cases                  |
| **Grammar Rule** | A _composition_ of operators with growth parameters. E.g. `classic` = `{sum, product, sin, cos, abs}`. | `GrammarRule` in `types.ts`, instances in `rules.ts` |

This plan refactors **operators** into self-contained registry objects. Grammar rules
(compositions) reference operators by `ExprNodeType` key, which resolves to the registry.

## Step 1: Remove Composite Operators

These operators are composites of existing primitives and don't belong in a
context-free grammar. They move to the animation system or are decomposed:

| Operator     | Why it's composite                                     | Replacement                                                      |
| ------------ | ------------------------------------------------------ | ---------------------------------------------------------------- |
| `well`       | `1 - 2/(1+v²)⁸` — built from `pow`, `sum`, `product`   | Remove from grammar. If a rule needs this pattern, decompose it. |
| `tent`       | `1 - 2*                                                | v                                                                | `— built from`abs`, `product`, `sum` | Remove. `abs` already exists and produces similar visual texture. |
| `mix`        | `a*(1-t) + b*t` — built from `sum`, `product`          | Remove. GLSL `mix()` is available in animations.                 |
| `smoothstep` | Hermite interpolation — built from `clamp`, arithmetic | Remove. GLSL `smoothstep()` is available in animations.          |
| `clamp`      | `min(hi, max(lo, v))` — built from `if`, comparisons   | Remove. Can be expressed with `if` + `less-than`/`greater-than`. |

After removal, `ExprNodeType` shrinks from 29 to **24 members**:

```
// Terminals (9)
x | y | const | random | radial | sweep | fbm | recaman-pattern | nested-oscillation

// Transforms — unary (7)
sin | cos | abs | sqrt | exp | log | fract

// Combinators — binary (7)
sum | product | mod | pow | less-than | greater-than | step

// Combinators — ternary (1)
if
```

## Step 2: Grammar Rule Updates

Rules that referenced removed operators must be reworked:

| Rule                | Before                                               | After                                             | Notes                                                             |
| ------------------- | ---------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| `classic`           | `sum, product, sin, cos, well, mix`                  | `sum, product, sin, cos, abs, if`                 | `abs` replaces `well` (similar peak texture), `if` replaces `mix` |
| `smooth`            | `well, mix, sin, sum`                                | **Remove**                                        | Cannot be expressed without composites. Replace with a new rule.  |
| `flow-art`          | `if, smoothstep, sum, sin`                           | `if, sum, sin, product`                           | `if` is the only surviving ternary                                |
| `compare-and-clamp` | `clamp, less-than, greater-than, step, sum, product` | `if, less-than, greater-than, step, sum, product` | `if` replaces `clamp`                                             |
| `arithmetic-mix`    | `sum, product, pow, mod, sin, abs`                   | **No change**                                     | Already uses only primitives                                      |

## Step 3: Directory Structure

```
src/
  grammar/
    operators/
      inputs/
        coordinate.ts         — xOp, yOp
        values.ts             — constOp, randomOp
        derived.ts            — radialOp, sweepOp, fbmOp, recamanPatternOp, nestedOscillationOp
      transforms/
        trigonometric.ts      — sinOp, cosOp
        math.ts               — absOp, sqrtOp, expOp, logOp, fractOp
      combinators/
        arithmetic.ts         — sumOp, productOp, modOp, powOp
        comparison.ts         — lessThanOp, greaterThanOp, stepOp
        flow.ts               — ifOp
      registry.ts             — OPERATORS record + type inference + exhaustiveness check
    rules/
      classic.ts
      trig.ts
      blocky.ts
      terminals.ts
      transforms.ts
      combinators.ts
      composites.ts
      index.ts                — re-exports all rules
    types.ts                  — GrammarSpec, GrammarRule
    createRule.ts             — createRule() factory
  expression.ts               — walkers (evaluate, toGLSL, toBytes, toStructuredView)
  format.ts                   — toMathString, toTreeView
```

## Step 4: Operator Type (inferred, not declared)

Each operator file exports a plain object. The registry infers the union type:

```ts
// grammar/operators/transforms/trigonometric.ts
export const sinOp = {
  arity: 1,
  opcode: 7,
  argNames: ['value'] as const,
  evaluate: ({ value }) => clamp(Math.sin(Math.PI * value)),
  toGLSL: ({ value }) => `sin(${GL_PI} * (${value}))`,
  toMathString: ({ value }) => `sin(π·${value})`
};
```

No `satisfies OperatorDef` needed — the registry validates completeness.

## Step 5: Registry (single source of truth)

```ts
// grammar/operators/registry.ts
import { xOp, yOp } from './inputs/coordinate.js';
import { sinOp, cosOp } from './transforms/trigonometric.js';
// ... all imports

export const OPERATORS = {
  x: xOp,
  y: yOp,
  sin: sinOp,
  cos: cosOp,
  sum: sumOp,
  if: ifOp
  // ... every ExprNodeType exactly once
} as const;

// ── Type inference ──────────────────────────────────────────────
// OperatorDef is INFERRED from OPERATORS, not declared separately.
// This means adding a field to one operator but not others is a
// compile error — TypeScript flags the structural mismatch.

type InferredOps = typeof OPERATORS;

/** Every value in OPERATORS must satisfy this shape. */
type OperatorDef = InferredOps[keyof InferredOps];

/** The union of all operator keys — replaces ExprNodeType. */
export type OperatorId = keyof InferredOps;

// ── Exhaustiveness check ───────────────────────────────────────
// If OPERATORS is missing an ExprNodeType, this errors:
type _AssertComplete = InferredOps extends Record<ExprNodeType, unknown> ? true : never;
```

**Key insight:** `OperatorDef` is derived from the actual operator objects, not
declared independently. If you add `arity` to `sinOp` but forget it on `sumOp`,
TypeScript catches it at the `OPERATORS` definition — not at some distant call site.

## Step 6: GrammarSpec & GrammarRule Types

```ts
// grammar/types.ts
import type { OperatorId } from './operators/registry.js';

/** Configuration for a grammar composition. */
export type GrammarSpec = {
  id: string;
  displayName: string;
  /** Which operators this grammar uses. */
  operators: OperatorId[];
  /** Maximum tree depth. */
  maxDepth: number;
  /** Minimum depth before terminals are allowed. */
  minDepth: number;
};

/** A grammar rule with all rendering methods attached. */
export type GrammarRule = GrammarSpec & {
  /** Build the expression tree for a seed. */
  buildNode(textSeed: string): ExprNode;
  /** CPU byte-array representation. */
  toCPU(textSeed: string): Uint8Array;
  /** GLSL fragment-shader snippet. */
  toGPU(textSeed: string): string;
  /** Mathematical expression string. */
  toMathString(textSeed: string): string;
  /** Nested tree view. */
  toTreeView(textSeed: string): TreeView;
};
```

## Step 7: createRule() Factory

```ts
// grammar/createRule.ts
import { OPERATORS } from './operators/registry.js';
import { SeededRandom } from '../prng.js';
import { grow, toBytes, toStructuredView } from '../expression.js';
import { toMathString } from '../format.js';
import { compileToGLSL } from '../compileToGLSL.js';
import type { GrammarRule, GrammarSpec } from './types.js';

export function createRule(spec: GrammarSpec): GrammarRule {
  const cache = new Map<string, ExprNode>();

  const build = (textSeed: string): ExprNode => {
    const cached = cache.get(textSeed);
    if (cached) return cached;
    const rng = new SeededRandom(`${spec.id}:${textSeed}`);
    const node = grow(rng, spec, spec.maxDepth);
    cache.set(textSeed, node);
    return node;
  };

  return {
    ...spec,
    buildNode: build,
    toCPU: (seed) => toBytes(build(seed)),
    toGPU: (seed) => {
      const node = build(seed);
      return compileToGLSL(node, node, node, []);
    },
    toMathString: (seed) => toMathString(build(seed)),
    toTreeView: (seed) => toStructuredView(build(seed))
  };
}
```

## Step 8: Refactored Walkers

Each walker is ~15 lines. The `switch` is replaced by a registry lookup.

### evaluate()

```ts
export function evaluate(node: ExprNode, x: number, y: number): number {
  const op = OPERATORS[node.type];

  // Terminals — special-case x/y (need coordinates)
  if (node.type === 'x') return x;
  if (node.type === 'y') return y;
  if (node.type === 'const') return node.value ?? 0;
  if (op.arity === 0) return op.evaluate({}, x, y);

  const args = Object.fromEntries(
    op.argNames.map((name, i) => [name, evaluate(node.children![i]!, x, y)])
  );
  return op.evaluate(args, x, y);
}
```

### toGLSL()

```ts
export function toGLSL(node: ExprNode): string {
  const op = OPERATORS[node.type];

  if (node.type === 'x') return 'p.x';
  if (node.type === 'y') return 'p.y';
  if (node.type === 'const') return (node.value ?? 0).toFixed(4);
  if (op.arity === 0) return op.toGLSL({});

  const args = Object.fromEntries(op.argNames.map((name, i) => [name, toGLSL(node.children![i]!)]));
  return op.toGLSL(args);
}
```

### toMathString()

```ts
export function toMathString(node: ExprNode): string {
  const op = OPERATORS[node.type];

  if (node.type === 'const') return String(node.value ?? 0);
  if (op.arity === 0) return op.toMathString({});

  const args = Object.fromEntries(
    op.argNames.map((name, i) => [name, toMathString(node.children![i]!)])
  );
  return op.toMathString(args);
}
```

### toBytes()

```ts
export function toBytes(node: ExprNode): Uint8Array {
  const out: number[] = [];
  const walk = (n: ExprNode): void => {
    out.push(OPERATORS[n.type].opcode);
    if (n.type === 'const') {
      const q = Math.round((Math.max(-1, Math.min(1, n.value ?? 0)) + 1) * 127.5);
      out.push(Math.max(0, Math.min(255, q)));
    }
    if (n.children) n.children.forEach(walk);
  };
  walk(node);
  return Uint8Array.from(out);
}
```

### toStructuredView() — unchanged

```ts
export function toStructuredView(node: ExprNode): TreeView {
  const label = node.type === 'const' ? `const(${node.value ?? 0})` : node.type;
  const view: TreeView = { label, type: node.type };
  if (node.type === 'const') view.value = node.value ?? 0;
  if (node.children && node.children.length > 0) {
    view.children = node.children.map(toStructuredView);
  }
  return view;
}
```

## Files to Create

| File                                            | Contents                                                                  |
| ----------------------------------------------- | ------------------------------------------------------------------------- |
| `grammar/operators/inputs/coordinate.ts`        | `xOp`, `yOp`                                                              |
| `grammar/operators/inputs/values.ts`            | `constOp`, `randomOp`                                                     |
| `grammar/operators/inputs/derived.ts`           | `radialOp`, `sweepOp`, `fbmOp`, `recamanPatternOp`, `nestedOscillationOp` |
| `grammar/operators/transforms/trigonometric.ts` | `sinOp`, `cosOp`                                                          |
| `grammar/operators/transforms/math.ts`          | `absOp`, `sqrtOp`, `expOp`, `logOp`, `fractOp`                            |
| `grammar/operators/combinators/arithmetic.ts`   | `sumOp`, `productOp`, `modOp`, `powOp`                                    |
| `grammar/operators/combinators/comparison.ts`   | `lessThanOp`, `greaterThanOp`, `stepOp`                                   |
| `grammar/operators/combinators/flow.ts`         | `ifOp`                                                                    |
| `grammar/operators/registry.ts`                 | `OPERATORS` record, inferred types, exhaustiveness check                  |
| `grammar/types.ts`                              | `GrammarSpec`, `GrammarRule`                                              |
| `grammar/createRule.ts`                         | `createRule()` factory                                                    |
| `grammar/rules/*.ts`                            | Rule definitions (one per rule or grouped by category)                    |
| `grammar/rules/index.ts`                        | Re-exports all rules                                                      |

## Files to Modify

| File                | Change                                                                                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `types.ts`          | Remove `well`, `tent`, `mix`, `smoothstep`, `clamp` from `ExprNodeType`. Remove `GrammarRule` (moves to `grammar/types.ts`). Keep `ExprNode`, `TreeView`, `GenerateOptions`, `GenerateResult`, etc.                                              |
| `expression.ts`     | Replace `evaluate()` switch, `toGLSL()` switch, `toBytes()` opcode table with registry-based walkers. Remove `OpSpec`, `GrammarSpec`, `grow`'s `OpSpec` usage. Keep `grow()`, `buildTree()` (updated to use `OperatorId`), `toStructuredView()`. |
| `format.ts`         | Replace `toMathString()` switch with registry walker. Keep `toTreeView()` unchanged.                                                                                                                                                             |
| `rules.ts`          | Rewrite. Now imports `createRule` from `grammar/createRule.ts` and rule specs from `grammar/rules/`.                                                                                                                                             |
| `compileToGLSL.ts`  | Update `collectNoiseDeps` to read `OPERATORS[node.type].noiseDependencies`.                                                                                                                                                                      |
| `weight-presets.ts` | Remove entries for `well`, `tent`, `mix`, `smoothstep`, `clamp`.                                                                                                                                                                                 |
| `index.ts`          | Update exports: `GrammarRule` now from `grammar/types.ts`. Add `OPERATORS` export if desired.                                                                                                                                                    |

## Files Unchanged

| File              | Reason                                                          |
| ----------------- | --------------------------------------------------------------- |
| `generate.ts`     | Uses `rule.buildNode()` and `evaluate()` — public API unchanged |
| `glsl-library.ts` | GLSL helper functions — independent of operator registry        |
| `prng.ts`         | PRNG — independent                                              |
| `png.ts`          | PNG encoding — independent                                      |
| `color.ts`        | Color mapping — independent                                     |

## Migration Order

1. Create `grammar/operators/` directory and all operator definition files
2. Create `grammar/operators/registry.ts` with `OPERATORS` record
3. Remove composite operators from `ExprNodeType` in `types.ts`
4. Update `rules.ts` — rework rules that used removed operators
5. Refactor `expression.ts` — replace switch bodies with registry walkers
6. Refactor `format.ts` — replace `toMathString` switch with registry walker
7. Update `compileToGLSL.ts` — use `OPERATORS[node.type].noiseDependencies`
8. Update `weight-presets.ts` — remove entries for removed operators
9. Run typecheck + tests

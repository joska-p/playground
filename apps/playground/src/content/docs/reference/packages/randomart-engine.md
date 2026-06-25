---
title: "Randomart Engine"
description: "Pure TypeScript expression-tree engine — grammar-driven AST generation, evaluation, and GLSL compilation. No framework, no DOM, no React."
category: "reference"
tags:
  - reference
  - randomart-engine
order: 20
---

# @repo/randomart-engine

Used by [`@repo/randomart`](../../randomart/) which adds the React UI, WebGL rendering, and animation controls.

## Exports

```typescript
import type {
  ExpressionNode,
  GrammarRule,
  TreeConfig,
  TreeOutput
} from '@repo/randomart-engine/types';
import type { AnimationBehavior } from '@repo/randomart-engine/animation/behaviors';
import { buildTree } from '@repo/randomart-engine/tree/build';
import { evaluateNode } from '@repo/randomart-engine/tree/evaluate';
import { generateTrees } from '@repo/randomart-engine/tree/generate';
import { getRule, getAllRules } from '@repo/randomart-engine/grammar/registry';
import { SeededRandom } from '@repo/randomart-engine/random/SeededRandom';
import { compileToGLSL } from '@repo/randomart-engine/compile/compileToGLSL';
import { animationRegistry } from '@repo/randomart-engine/animation/behaviors';
import {
  nodeToMathString,
  nodeToTreeView
} from '@repo/randomart-engine/format/treePrinter';
import { renderTreesToBuffer } from '@repo/randomart-engine/render/cpu-renderer';

// PNG export (requires fast-png)
import {
  renderTreesToPngBuffer,
  renderTreesToPngBlob
} from '@repo/randomart-engine/png';
```

## Architecture

```
Grammar rules (19 built-in)
       │
       ▼
  Registry — Map<string, GrammarRule>
       │
       ▼
  buildTree() — weighted stochastic AST generation
       │
       ├── evaluateNode()  → CPU pixel-by-pixel evaluation
       └── compileToGLSL() → WebGL fragment shader
```

## Key concepts

### ExpressionNode

Recursive AST node representing a mathematical expression:

```ts
type ExpressionNode = {
  ruleId: string; // e.g. "sin", "add", "constant"
  args: ExpressionNode[]; // child nodes
  constantValue?: number; // set when ruleId === "constant"
};
```

### generateTrees

The main entry point for creating trees. Uses separate `SeededRandom` instances per channel (or one shared for correlated mode):

```ts
const { treeR, treeG, treeB } = generateTrees({
  seedText: 'hello world',
  maxDepth: 8,
  enabledRuleIds: ['x', 'y', 'sin', 'cos', 'add', 'multiply', 'constant'],
  correlated: false
});
```

### GrammarRule

Each operator is a pluggable rule implementing this interface:

```ts
type GrammarRule = {
  id: string;
  name: string;
  arity: number;
  weight: number;
  category: 'structural' | 'terminal';
  evaluate: (args: (() => number)[], x: number, y: number, t: number) => number;
  toGLSL: (args: string[]) => string;
  toMathString: (args: string[]) => string;
  toTreeView: (args: string[], depth: number) => string;
  buildNode: (
    rng: SeededRandom,
    buildChild: () => ExpressionNode
  ) => ExpressionNode;
};
```

### Built-in grammar rules

| Rule ID        | Arity | Description             | GLSL output              |
| -------------- | ----- | ----------------------- | ------------------------ |
| `x`            | 0     | Pixel X coordinate      | `v_texCoord.x`           |
| `y`            | 0     | Pixel Y coordinate      | `v_texCoord.y`           |
| `constant`     | 0     | Random float in [-1, 1] | literal float            |
| `random`       | 0     | Per-pixel hash random   | `random2d(v_texCoord)`   |
| `sin`          | 1     | Sine (scaled by π)      | `sin(π · arg)`           |
| `cos`          | 1     | Cosine (scaled by π)    | `cos(π · arg)`           |
| `sqrt`         | 1     | Square root             | `sqrt(abs(arg) + 1e-10)` |
| `abs`          | 1     | Absolute value          | `abs(arg)`               |
| `exp`          | 1     | Exponential             | `exp(arg)`               |
| `log`          | 1     | Natural log             | `log(abs(arg) + 1e-10)`  |
| `add`          | 2     | Normalized addition     | `((a + b) / 2.0)`        |
| `multiply`     | 2     | Multiplication          | `(a * b)`                |
| `modulo`       | 2     | Modulo                  | `mod(a, b)`              |
| `pow`          | 2     | Power                   | `pow(abs(a), b)`         |
| `less-than`    | 2     | Comparison              | `(a < b ? 1.0 : 0.0)`    |
| `greater-than` | 2     | Comparison              | `(a > b ? 1.0 : 0.0)`    |
| `if`           | 3     | Ternary conditional     | `(a > 0.0 ? b : c)`      |
| `nested-osc`   | 1     | Nested oscillation      | `nestedOscillation(arg)` |
| `radial-sym`   | 1     | Radial symmetry         | `radialSymmetry(arg)`    |

### Adding a new rule

```ts
import type { GrammarRule } from '@repo/randomart-engine';
import { getRule, getAllRules } from '@repo/randomart-engine';

export const myRule = {
  id: 'double',
  name: 'Double',
  arity: 1,
  weight: 1,
  category: 'structural',
  evaluate: (args) => 2 * args[0](),
  toMathString: (args) => `2 · ${args[0]}`,
  toGLSL: (args) => `(2.0 * ${args[0]})`,
  toTreeView: (args, depth) => `${'  '.repeat(depth)}├── double\n${args[0]}`,
  buildNode: (_rng, buildChild) => ({ ruleId: 'double', args: [buildChild()] })
} satisfies GrammarRule;
```

Then register it in `registry.ts` — or if using from the UI package, it auto-discovers via `getAllRules()`.

### CPU rendering

```ts
import { renderTreesToBuffer } from '@repo/randomart-engine';
import { encode } from 'fast-png';

const buffer = renderTreesToBuffer(treeR, treeG, treeB, 512, 0);
const png = encode({
  width: 512,
  height: 512,
  data: buffer,
  channels: 4,
  depth: 8
});
```

### GLSL compilation

```ts
import { compileToGLSL, animationRegistry } from '@repo/randomart-engine';

const activeBehaviors = animationRegistry.filter((b) =>
  ['hue-shift', 'zoom'].includes(b.id)
);

const shaderSource = compileToGLSL(treeR, treeG, treeB, activeBehaviors);
```

## File layout

```
src/
  types.ts                   Core types (ExpressionNode, GrammarRule)
  tree/
    build.ts                 Weighted stochastic AST builder
    evaluate.ts              CPU pixel evaluator
    generate.ts              generateTrees() entry point
  grammar/
    registry.ts              Rule registry (register/get/getAll)
    rules/                   19 pluggable grammar rules
  random/
    SeededRandom.ts          Deterministic seeded PRNG
  animation/
    behaviors.ts             Animation behaviors (15 built-in)
  compile/
    compileToGLSL.ts         AST → GLSL fragment shader
  format/
    treePrinter.ts           AST → math string / tree view
  render/
    cpu-renderer.ts          Sync pixel buffer renderer
  index.ts                   Barrel exports
  png-export.ts              Sync PNG encoding (./png subpath)
```

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_


---
title: "Randomart Engine"
description: "A grammar-driven expression tree that compiles to both CPU pixel buffers and GLSL fragment shaders — the mathematical heart of generative art, built to be consumed by any renderer."
category: "reference"
tags:
  - reference
  - randomart-engine
order: 20
---

---
title: 'Randomart Engine'
coordinates: '/algorithms/generative'
status: 'Active'
date_discovered: 2024-04-01
---

# @repo/randomart-engine

---

## Essence

Randomart Engine exists because generative art needs a shared vocabulary between
math and pixels. It defines a grammar of mathematical operations — sine, cosine,
modulo, nested oscillation, radial symmetry — and assembles them into expression
trees via weighted stochastic generation. Each tree is a compact representation
of a visual function: given an (x, y) coordinate and a time value, it produces
a color.

The engine offers two evaluation paths from the same AST. The CPU path walks the
tree node-by-node, evaluating each expression in sequence — useful for export,
debugging, and non-WebGL contexts. The GLSL path compiles the same tree into a
fragment shader string, pushing the entire evaluation to the GPU where each pixel
runs in parallel. The grammar rules are the bridge: every rule implements both
`evaluate` and `toGLSL`, so the AST is agnostic to where it runs.

This separation of _what_ from _where_ is the engine's central idea. The
expression tree doesn't know if it's being evaluated on a CPU core or a GPU
shader unit. It just describes math.

## Quick Launch

The engine is a library — no dev server needed. Install and import:

```bash
pnpm add @repo/randomart-engine
```

```ts
import { generateTrees } from '@repo/randomart-engine/tree/generate';
import { compileToGLSL } from '@repo/randomart-engine/compile/compileToGLSL';

const { treeR, treeG, treeB } = generateTrees({
  seedText: 'De deux choses lune l'autre c est le soleil',
  maxDepth: 8,
  enabledRuleIds: ['x', 'y', 'sin', 'cos', 'add', 'multiply', 'constant'],
  correlated: false
});

const shaderSource = compileToGLSL(treeR, treeG, treeB, []);
```

Or run the playground UI that consumes it:

```bash
pnpm dev --filter @repo/playground
```

## Field Notes

- **The Catalyst:** The question of whether a single mathematical expression
  could serve as both a CPU evaluation function and a GPU shader — a compact
  AST that compiles to GLSL without losing the ability to walk it by hand. The
  answer is the grammar rule interface: every operator knows how to `evaluate`,
  `toGLSL`, `toMathString`, and `toTreeView` itself.

- **Quirks & Anomalies:** The `SeededRandom` instances are per-channel by
  default — R, G, and B each get their own PRNG, so correlated mode (one shared
  PRNG) produces visibly different art from split mode with the same seed. The
  GLSL path wraps `sin` and `cos` inputs in π scaling, which creates
  characteristic wave patterns at low tree depths. The `random` rule uses a
  per-pixel hash rather than the seeded PRNG, so it's deterministic across frames
  but position-dependent — a deliberate choice for texture richness.

- **Future Horizons:** A visual grammar editor where rules are drag-and-droppable
  nodes, custom rule bundles that can be published as packages, and a
  WebGPU evaluation path that keeps the same AST but targets compute shaders
  instead of fragment shaders.

---

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
import { nodeToMathString, nodeToTreeView } from '@repo/randomart-engine/format/treePrinter';
import { renderTreesToBuffer } from '@repo/randomart-engine/render/cpu-renderer';

// PNG export (requires fast-png)
import { renderTreesToPngBuffer, renderTreesToPngBlob } from '@repo/randomart-engine/png';
```

## Key Concepts

### ExpressionNode

The atomic unit — a recursive AST node representing a mathematical expression:

```ts
type ExpressionNode = {
  ruleId: string; // e.g. "sin", "add", "constant"
  args: ExpressionNode[]; // child nodes
  constantValue?: number; // set when ruleId === "constant"
};
```

### generateTrees

The main entry point for creating trees. Uses separate `SeededRandom` instances
per channel (or one shared for correlated mode):

```ts
const { treeR, treeG, treeB } = generateTrees({
  seedText: 'hello world',
  maxDepth: 8,
  enabledRuleIds: ['x', 'y', 'sin', 'cos', 'add', 'multiply', 'constant'],
  correlated: false
});
```

### GrammarRule

Each operator is a pluggable rule implementing this interface — the plugin
system that makes the grammar extensible:

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
  buildNode: (rng: SeededRandom, buildChild: () => ExpressionNode) => ExpressionNode;
};
```

The interface is the contract: implement all five methods and the rule works
with every consumer — CPU evaluator, GLSL compiler, math printer, tree viewer,
and tree builder.

### Built-in Grammar Rules

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

### Adding a New Rule

The grammar is open — any object satisfying `GrammarRule` can be registered:

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

Register it in `registry.ts` — or if using from the UI package, it auto-discovers
via `getAllRules()`.

## CPU Rendering

For non-WebGL contexts — export, debugging, server-side generation:

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

## GLSL Compilation

The same AST becomes a fragment shader — every expression node compiles to its
GLSL equivalent, and the full tree is assembled into a shader string ready for
`gl.compileShader()`:

```ts
import { compileToGLSL, animationRegistry } from '@repo/randomart-engine';

const activeBehaviors = animationRegistry.filter((b) => ['hue-shift', 'zoom'].includes(b.id));

const shaderSource = compileToGLSL(treeR, treeG, treeB, activeBehaviors);
```

## File Layout

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

_Part of the [Creative Playground](https://joska-p.github.io/playground)_


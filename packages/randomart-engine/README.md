---
title: 'RandomArt Engine'
description: 'Grammar-driven expression tree engine compiling mathematical functions into CPU buffers and WebGL fragment shaders.'
hasApp: false
---

# @repo/randomart-engine

> A grammar-driven expression tree that compiles to both CPU pixel buffers and
> GLSL fragment shaders — the mathematical heart of generative art, built to be
> consumed by any renderer.

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

## Usage Examples

### CPU Rendering

For non-WebGL contexts — export, debugging, server-side generation — render
the trees into a pixel buffer, optionally encoded as a PNG:

```ts
import { renderTreesToBuffer } from '@repo/randomart-engine/render/cpu-renderer';
import { renderTreesToPngBlob } from '@repo/randomart-engine/png';

// Raw RGBA buffer (size × size × 4) for your own encoder or a canvas:
const buffer = renderTreesToBuffer(treeR, treeG, treeB, 512, 0);

// Or get a ready-made image:
const blob = renderTreesToPngBlob(treeR, treeG, treeB, 512, 0);
```

### GLSL Compilation

The same AST becomes a fragment shader — every expression node compiles to its
GLSL equivalent, and the full tree is assembled into a shader string ready for
`gl.compileShader()`:

```ts
import { compileToGLSL } from '@repo/randomart-engine/compile/compileToGLSL';
import { animationRegistry } from '@repo/randomart-engine/animation/behaviors';

const activeBehaviors = animationRegistry.filter((b) => ['hue-shift', 'zoom'].includes(b.id));

const shaderSource = compileToGLSL(treeR, treeG, treeB, activeBehaviors);
```

### Extending the Grammar

The grammar is open — any object satisfying `GrammarRule` can join it:

```ts
import type { GrammarRule } from '@repo/randomart-engine/types';

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

Add it to the `allRules` list in `src/grammar/registry.ts` — its id immediately
becomes selectable via `enabledRuleIds` and it appears in `getAllRules()`.

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
Grammar rules (built-in registry)
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

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

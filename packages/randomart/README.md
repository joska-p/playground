# @repo/randomart

> Random expression-tree art generator. Uses a grammar-driven engine to build stochastic expression trees, then renders them via CPU (Canvas 2D with Web Workers) or GPU (WebGL fragment shaders).

## Quick Start

```bash
pnpm --filter @repo/randomart dev
```

## Architecture

Three-layer unidirectional flow:

```
Grammar Definitions (core/grammar/rules/*.ts)
    │
    ▼
Registry (core/grammar/registry.ts) — Map<string, GrammarRule>
    │
    ▼
Tree Builder (core/tree/build.ts) — stochastic weighted AST generation
    │
    ▼
Zustand Store (stores/randomart/) — unexported createStore, selector hooks, action functions
    │
    ├── GPU path (renderMode === 'glsl')
    │   └── useWebGLRenderer → compileToGLSL → WebGL fragment shader
    │
    └── CPU path (renderMode === 'canvas')
        └── useCanvasRenderer → WorkerPool → evaluateNode() → putImageData
```

## Core Domain (`src/core/`)

### `types.ts`
Core types:
- `ExpressionNode` — recursive AST node: `{ ruleId, args: ExpressionNode[], constantValue?: number }`
- `GrammarRule` — interface every rule implements: `{ id, name, arity, weight, evaluate, toGLSL, toMathString, buildNode, ... }`

### `tree/build.ts`
Stochastic tree builder:
- `buildTree(rng, currentDepth, maxDepth, rules)` — recursively builds an AST using weighted random selection from enabled rules
- Terminal-only selection when `currentDepth >= maxDepth`
- `weightedPick(rng, rules)` — selects a rule proportional to its weight

### `tree/evaluate.ts`
AST evaluator for CPU rendering:
- `evaluateNode(node, x, y, t)` — recursively evaluates the expression tree for a given pixel coordinate and time
- Uses lazy thunks for arguments, enabling short-circuit evaluation in `if` rules

### `compile/compileToGLSL.ts`
AST → GLSL fragment shader compiler for GPU rendering:
- Recursively compiles each `ExpressionNode` into GLSL code via `rule.toGLSL()`
- Generates the full shader with preamble (`random2d` hash), uniforms (`u_time`, `u_resolution`), and varying (`v_texCoord`)
- Supports correlated RGB mode (`vec3` root node) and independent RGB mode (three separate trees)
- Maps output from `[-1, 1]` to `[0, 1]` via `(color + 1.0) / 2.0`

### `format/treePrinter.ts`
AST → human-readable output:
- `nodeToMathString(node)` — recursive math formula string (e.g., `((sin(π · x) + cos(π · y)) / 2)`)
- `nodeToTreeView(node, depth)` — indented tree view for debugging

### `random/SeededRandom.ts`
Deterministic seeded PRNG:
- Simple mulberry32-based generator seeded from a hash of the seed string
- Choice history tracking for replay/debugging
- Separate RNG instances per channel (R/G/B) for independent mode

### `render/cpu-renderer.ts`
Canvas 2D CPU renderer:
- `renderTreesToImageDataAsync()` — splits the canvas into strips of `STRIP_HEIGHT=64`
- Dispatches strips to a `WorkerPool` from `@repo/worker-pool`
- Workers run `render-worker.ts` which evaluates the tree per-pixel
- Assembles results into `ImageData` and draws via `putImageData()`

### `render/png-export.ts`
Server-safe PNG export utilities.

## Grammar System (`src/core/grammar/`)

Each operator/terminal is a pluggable `GrammarRule` registered in a `Map<string, GrammarRule>`.

### Available Rules

| Rule ID | Arity | Description | GLSL output |
|---------|-------|-------------|-------------|
| `x` | 0 | Pixel X coordinate | `v_texCoord.x` |
| `y` | 0 | Pixel Y coordinate | `v_texCoord.y` |
| `t` | 0 | Time uniform | `u_time` |
| `constant` | 0 | Random float in [-1, 1] | literal float |
| `random` | 0 | Per-pixel hash random | `random2d(v_texCoord)` |
| `sin` | 1 | Sine (scaled by π) | `sin(π · arg)` |
| `cos` | 1 | Cosine (scaled by π) | `cos(π · arg)` |
| `sqrt` | 1 | Square root | `sqrt(abs(arg) + 1e-10)` |
| `abs` | 1 | Absolute value | `abs(arg)` |
| `exp` | 1 | Exponential | `exp(arg)` |
| `log` | 1 | Natural log | `log(abs(arg) + 1e-10)` |
| `add` | 2 | Normalized addition | `((a + b) / 2.0)` |
| `multiply` | 2 | Multiplication | `(a * b)` |
| `modulo` | 2 | Modulo | `mod(a, b)` |
| `pow` | 2 | Power | `pow(abs(a), b)` |
| `less-than` | 2 | Comparison | `(a < b ? 1.0 : 0.0)` |
| `greater-than` | 2 | Comparison | `(a > b ? 1.0 : 0.0)` |
| `if` | 3 | Ternary conditional | `(a > 0.0 ? b : c)` |

Adding a new operator:
1. Create a rule file in `rules/` implementing `GrammarRule`
2. Register it in `registry.ts`
3. The UI auto-discovers it via `getAllRules()`

## Store (`src/stores/randomart/`)

Vanilla Zustand store with selector hooks and action functions.

### State shape

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `seedText` | `string` | `"De deux choses l'une l'autre c'est le soleil"` | PRNG seed |
| `maxDepth` | `number` | `6` | Max tree depth |
| `enabledRuleIds` | `string[]` | all rules | Enabled grammar rules |
| `treeR`, `treeG`, `treeB` | `ExpressionNode` | generated | Per-channel ASTs |
| `rngR`, `rngG`, `rngB` | `SeededRandom` | generated | Per-channel PRNGs |
| `running` | `boolean` | `false` | Animation state |
| `time` | `number` | `0` | Current animation time |
| `timeRef` | `{ current: number }` | `{ current: 0 }` | Mutable time ref |
| `renderMode` | `'glsl' \| 'canvas'` | `'glsl'` | GPU or CPU render |
| `correlatedRGB` | `boolean` | `false` | Linked/split RGB |
| `activeChannel` | `'red' \| 'green' \| 'blue'` | `'red'` | Inspector channel |

### Action files

| File | Exports |
|------|---------|
| `actions/rules.ts` | `toggleRule(ruleId)` |
| `actions/trees.ts` | `regenerateTrees(seed, depth, correlated)` |
| `actions/seed.ts` | `setSeedText(text)`, `setMaxDepth(n)` |
| `actions/playback.ts` | `toggleRunning()`, `setTime(n)` |
| `actions/render.ts` | `setRenderMode(mode)`, `setCorrelatedRGB(bool)` |
| `actions/channel.ts` | `setActiveChannel(channel)` |

### Selector hooks

| Hook | Returns |
|------|---------|
| `useTreeR`, `useTreeG`, `useTreeB` | `ExpressionNode` |
| `useRunning` | `boolean` |
| `useRenderMode` | `'glsl' \| 'canvas'` |
| `useCorrelatedRGB` | `boolean` |
| `useEnabledRuleIds` | `string[]` |
| `useSeedText` | `string` |
| `useMaxDepth` | `number` |
| `useTime` | `number` |
| `useActiveChannel` | `'red' \| 'green' \| 'blue'` |
| `useRngR`, `useRngG`, `useRngB` | `SeededRandom` |

## Rendering Pipeline

### GPU Path (`renderMode === 'glsl'`)

1. `useWebGLRenderer` sets up WebGL context, vertex buffer, and fullscreen quad
2. Each frame (when `running`) or on tree change: calls `renderFrame()`
3. `renderFrame()` compiles the AST to a GLSL fragment shader via `compileToGLSL()`, compiles and links the program, sets uniforms (`u_time`, `u_resolution`), and draws
4. Fragment shader evaluates the expression per-pixel in parallel on the GPU

### CPU Path (`renderMode === 'canvas'`)

1. `useCanvasRenderer` triggers rendering when trees or dimensions change
2. `renderTreesToImageDataAsync()` splits work into horizontal strips
3. Strips are dispatched to a Web Worker pool
4. Workers evaluate the expression tree per-pixel via `evaluateNode()`
5. Results are assembled into `ImageData` and drawn to the canvas via `putImageData()`

## Common Pitfalls

### GLSL type correctness

When authoring `toGLSL()` on a new grammar rule, always use **float literals** (`1.0`, `0.0`) not integer literals (`1`, `0`). WebGL 1.0 (GLSL ES 1.0) does not perform implicit int→float conversion in binary operations like `+`, `mod()`, `*`, etc. Integer-typed expressions flowing into float-only functions will produce shader compilation errors.

### Shader recompilation

The current `renderFrame()` recompiles the fragment shader on every invocation (every frame when running). This is wasteful for static expression trees. The shader should ideally be cached and only recompiled when the tree changes.

## Conventions

- **Named exports only** — no `export default`
- **No barrel files** — import directly from source paths
- **Zustand store** — unexported `createStore()`, getter hooks (`use*`), plain setter functions
- **`@repo/ui` components** for all UI
- **CSS tokens** — no hardcoded colors, spacing, or radius values

---

_Part of the [Creative Playground](https://joska-p.github.io/playground)_

# Extract `@repo/randomart-engine`

## 1. New engine package

**Location:** `packages/engines/randomart-engine/`
**Name:** `@repo/randomart-engine`
**Exports:**
- `"."` → `./src/index.ts` — pure logic, zero runtime deps
- `"./png"` → `./src/png-export.ts` — `fast-png` encoding on top of buffer output

**Dependencies:**
- `fast-png` (workspace catalog) — only for `./png` subpath

**DevDependencies:**
- `@repo/config-eslint`, `@tsconfig/strictest`, `typescript`, `eslint`

**Scripts:** `check-types`, `clean` (same pattern as pixel-engine)

---

## 2. Source tree — engine

```
packages/engines/randomart-engine/src/
├── index.ts              # barrel: re-exports everything public
├── types.ts              # ExpressionNode, GrammarRule, RenderTask, RenderResult
├── tree/
│   ├── build.ts          # buildTree()  ← from randomart/core/tree/build.ts
│   ├── evaluate.ts       # evaluateNode()  ← from randomart/core/tree/evaluate.ts
│   └── generate.ts       # generateTrees(), TreeConfig, TreeOutput  ← from app's stores/actions/trees.ts
├── grammar/
│   ├── registry.ts       # getRule(), getAllRules()  ← from randomart/core/grammar/registry.ts
│   └── rules/            # abs, add, constant, cos, exp, greater-than, if, less-than,
│                         # log, modulo, multiply, nested-oscillation, pixel-random,
│                         # pow, radial-symmetry, sin, sqrt, terminal-x, terminal-y
├── random/
│   └── SeededRandom.ts   # SeededRandom class
├── animation/
│   └── behaviors.ts      # AnimationBehavior type + all 15 behaviors + animationRegistry
├── format/
│   └── treePrinter.ts    # nodeToMathString(), nodeToTreeView()
├── compile/
│   └── compileToGLSL.ts  # compileToGLSL() — pure string generation
└── render/
    └── cpu-renderer.ts   # renderTreesToBuffer()  ← sync ONLY. No async, no workers.
```

## 3. PNG subpath

```
packages/engines/randomart-engine/src/
└── png-export.ts         # renderTreesToPngBlobAsync()
                          # imports renderTreesToBuffer from ./render/cpu-renderer
                          # imports encode from fast-png
                          # returns Blob — Node-compatible (Node 20+)
```

---

## 4. App side — cleanup

### Files to DELETE

| File | Reason |
|---|---|
| `packages/randomart/src/core/render/render-worker.ts` | Web Worker — no CPU render in app |
| `packages/randomart/src/core/render/cpu-renderer.ts` | Moved to engine, app doesn't use sync render |
| `packages/randomart/src/core/render/png-export.ts` | Moved to engine |
| `packages/randomart/src/components/CPUCanvas.tsx` | CPU render UI — removed |
| `packages/randomart/src/hooks/useCanvasRenderer.ts` | Hook for CPU canvas — removed |
| `packages/randomart/src/stores/randomart/actions/trees.ts` | Moved to engine as `tree/generate.ts` |

### Files to UPDATE (import paths)

| File | Current import | New import |
|---|---|---|
| `src/hooks/useShaderProgram.ts` | `../core/animation/behaviors` | `@repo/randomart-engine` |
| `src/hooks/useShaderProgram.ts` | `../core/compile/compileToGLSL` | `@repo/randomart-engine` |
| `src/hooks/useShaderProgram.ts` | `../core/types` | `@repo/randomart-engine` |
| `src/hooks/useWebGLRenderer.ts` | `../core/types` | `@repo/randomart-engine` |
| `src/stores/randomart/types.ts` | `../../core/random/SeededRandom` | `@repo/randomart-engine` |
| `src/stores/randomart/types.ts` | `../../core/types` | `@repo/randomart-engine` |
| `src/stores/randomart/store.ts` | `../../core/grammar/registry` | `@repo/randomart-engine` |
| `src/stores/randomart/store.ts` | `./actions/trees` | `@repo/randomart-engine` |
| `src/stores/randomart/selectors.ts` | `../../core/random/SeededRandom` | `@repo/randomart-engine` |
| `src/stores/randomart/selectors.ts` | `../../core/types` | `@repo/randomart-engine` |
| `src/stores/randomart/actions/config.ts` | `../../../core/grammar/registry` | `@repo/randomart-engine` |
| `src/components/WebGLCanvas.tsx` | `../core/types` | `@repo/randomart-engine` |
| `src/components/inspector/MathFormula.tsx` | `../../core/format/treePrinter` | `@repo/randomart-engine` |
| `src/components/inspector/AstTreeView.tsx` | `../../core/format/treePrinter` | `@repo/randomart-engine` |
| `src/components/controls/GrammarList.tsx` | `../../core/grammar/registry` | `@repo/randomart-engine` |
| `src/components/controls/AnimationToggle.tsx` | `../../core/animation/behaviors` | `@repo/randomart-engine` |
| `src/components/controls/DownloadButton.tsx` | `../../core/render/png-export` | `@repo/randomart-engine/png` |

### Package.json changes (app)

- Remove dep: `@repo/worker-pool`
- Remove dep: `fast-png`
- Add dep: `@repo/randomart-engine: "workspace:*"`

---

## 5. Implementation order

1. Create `packages/engines/randomart-engine/` with `package.json`, `tsconfig.json`
2. Copy all source files from `randomart/core/` into the engine, stripping async/worker stuff from `cpu-renderer.ts`
3. Move `stores/randomart/actions/trees.ts` → engine's `tree/generate.ts`, strip any store dependencies
4. Write the barrel `index.ts` and the `png-export.ts` wrapper
5. Update `packages/randomart/src/` — delete render files, CPUCanvas, useCanvasRenderer, update all import paths
6. Update `packages/randomart/package.json` — remove `@repo/worker-pool`, `fast-png`; add `@repo/randomart-engine` dependency
7. Run `pnpm install`
8. Run `check-types` on both packages
9. Delete leftover `core/` directory from the app (everything moved)

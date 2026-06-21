# Final Plan — Extract `@repo/randomart-engine`

## Decisions Made

| Decision        | Answer                                        |
| --------------- | --------------------------------------------- |
| CPU canvas mode | **Remove entirely** — GPU-only rendering      |
| Worker pool     | **Remove from randomart** — no workers needed |

| PNG download no fallback
| Ghost export `./renderPixelMapAsBase64` | **Remove** from package.json |
| `renderMode` store field | **Remove** — always GLSL |

---

## Phase 1 — Create `@repo/randomart-engine`

### Step 1: Scaffold the package

Create `packages/engines/randomart-engine/` with:

- **`package.json`** — follows pixel-engine conventions:
  - `"exports": { ".": "./src/index.ts", "./png": "./src/png-export.ts" }`
  - devDependencies: `@repo/config-eslint`, `@tsconfig/strictest`, `typescript`, `eslint`
  - runtime dep: `fast-png` (for `./png` subpath only)
  - scripts: `check-types`, `clean`
- **`tsconfig.json`** — extends `@tsconfig/strictest`, single flat config
- **`eslint.config.js`** — one-liner shared config

### Step 2: Copy core source files

From `randomart/src/core/` into `randomart-engine/src/`:

```
src/
├── types.ts                    ← core/types.ts (remove RenderTask, RenderResult — worker types)
├── tree/
│   ├── build.ts                ← core/tree/build.ts
│   ├── evaluate.ts             ← core/tree/evaluate.ts
│   └── generate.ts             ← stores/randomart/actions/trees.ts (already pure ✅)
├── grammar/
│   ├── registry.ts             ← core/grammar/registry.ts
│   └── rules/                  ← core/grammar/rules/* (all 19 files)
├── random/
│   └── SeededRandom.ts         ← core/random/SeededRandom.ts
├── animation/
│   └── behaviors.ts            ← core/animation/behaviors.ts
├── format/
│   └── treePrinter.ts          ← core/format/treePrinter.ts
├── compile/
│   └── compileToGLSL.ts        ← core/compile/compileToGLSL.ts
└── render/
    └── cpu-renderer.ts         ← core/render/cpu-renderer.ts (ONLY renderTreesToBuffer — strip async, workers, WorkerPool import)
```

### Step 3: Write barrel + PNG export

- **`src/index.ts`** — explicit named re-exports of all public symbols (following pixel-engine pattern)
- **`src/png-export.ts`** — rewrite to use sync `renderTreesToBuffer()` + `fast-png` encode

---

## Phase 2 — Update `@repo/randomart` app

### Step 4: Delete files

| File                             | Reason                                            |
| -------------------------------- | ------------------------------------------------- |
| `src/core/`                      | **Entire directory** — everything moved to engine |
| `src/components/CPUCanvas.tsx`   | CPU canvas removed                                |
| `src/hooks/useCanvasRenderer.ts` | CPU canvas hook removed                           |

### Step 5: Update imports (14 files)

| File                                          | Change                                                        |
| --------------------------------------------- | ------------------------------------------------------------- |
| `src/hooks/useShaderProgram.ts`               | `../core/animation/behaviors` → `@repo/randomart-engine`      |
| `src/hooks/useShaderProgram.ts`               | `../core/compile/compileToGLSL` → `@repo/randomart-engine`    |
| `src/hooks/useShaderProgram.ts`               | `../core/types` → `@repo/randomart-engine`                    |
| `src/hooks/useWebGLRenderer.ts`               | `../core/types` → `@repo/randomart-engine`                    |
| `src/stores/randomart/types.ts`               | `../../core/random/SeededRandom` → `@repo/randomart-engine`   |
| `src/stores/randomart/types.ts`               | `../../core/types` → `@repo/randomart-engine`                 |
| `src/stores/randomart/store.ts`               | `../../core/grammar/registry` → `@repo/randomart-engine`      |
| `src/stores/randomart/store.ts`               | `./actions/trees` → `@repo/randomart-engine`                  |
| `src/stores/randomart/selectors.ts`           | `../../core/random/SeededRandom` → `@repo/randomart-engine`   |
| `src/stores/randomart/selectors.ts`           | `../../core/types` → `@repo/randomart-engine`                 |
| `src/stores/randomart/actions/config.ts`      | `../../../core/grammar/registry` → `@repo/randomart-engine`   |
| `src/components/WebGLCanvas.tsx`              | `../core/types` → `@repo/randomart-engine`                    |
| `src/components/inspector/MathFormula.tsx`    | `../../core/format/treePrinter` → `@repo/randomart-engine`    |
| `src/components/inspector/AstTreeView.tsx`    | `../../core/format/treePrinter` → `@repo/randomart-engine`    |
| `src/components/controls/GrammarList.tsx`     | `../../core/grammar/registry` → `@repo/randomart-engine`      |
| `src/components/controls/AnimationToggle.tsx` | `../../core/animation/behaviors` → `@repo/randomart-engine`   |
| `src/components/controls/DownloadButton.tsx`  | `../../core/render/png-export` → `@repo/randomart-engine/png` |

### Step 6: Remove CPU rendering from app

- **`RandomArtCanvas.tsx`** — remove `CPUCanvas` import and the `renderMode === 'canvas'` branch; always render `WebGLCanvas`
- **`store types`** — remove `renderMode: 'canvas' | 'glsl'` field
- **`selectors.ts`** — remove `useRenderMode()` selector
- **`actions/display.ts`** — remove `setRenderMode()` action
- **`DownloadButton.tsx`** — remove `useRenderMode()` usage, simplify download logic (GPU snapshot first, engine sync fallback)
- **UI controls** — remove any render mode toggle if one exists

### Step 7: Update `package.json`

```diff
- "@repo/worker-pool": "workspace:*",
- "fast-png": "catalog:",
+ "@repo/randomart-engine": "workspace:*",
```

Also remove the dead export:

```diff
- "./renderPixelMapAsBase64": "./src/core/renderer.ts",
```

---

## Phase 3 — Verify

### Step 8: Install + type check

```bash
pnpm install
pnpm --filter @repo/randomart-engine check-types
pnpm --filter @repo/randomart check-types
```

### Step 9: Smoke test

```bash
pnpm --filter @repo/randomart dev
```

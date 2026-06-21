# Fallow Codebase Analysis

Generated: 2026-06-21 with fallow 2.96.0

> **This is a documentation-only snapshot.** No fixes or actions were applied. Use `fallow trace` or `fallow dead-code --format json` for deeper investigation on any item below before taking action.

---

## Summary

| Category | Count |
|---|---|
| Unused files | 7 |
| Unused exports | 4 |
| Unused dependencies | 5 |
| Unresolved imports | 6 |
| Stale suppressions | 1 |
| Complex functions | 13 |
| Code duplication groups | 14 |
| Refactoring targets | 5 |

Entry points discovered: 200 (101 from `package.json`, 99 from framework plugins)

---

## 1. Dead Code

### Unused Files (7)

These files are unreachable from any entry point:

| File | Notes |
|---|---|
| `packages/automa/src/utils/rng.ts` | |
| `packages/fracture/src/components/FractureCPU.tsx` | GPU variant exists; may be intentional fallback |
| `packages/fracture/src/components/draw/drawAxis.ts` | Contains exported `drawAxis` |
| `packages/fracture/src/components/draw/drawExpressions.ts` | Contains exported `drawExpressions` (also complex) |
| `packages/fracture/src/components/draw/drawTicks.ts` | Contains exported `drawTicks` |
| `packages/fracture/src/core/StageContext.ts` | Contains exported `StageContext` |
| `packages/fracture/src/stores/store.ts` | |

All 4 unused exports come from the unused files above (all in `packages/fracture/*`).

### Unused Dependencies (5)

| Package | Declared In | Also used by |
|---|---|---|
| `@react-three/drei` | `packages/fracture/package.json` | `automa`, `graph-viz`, `three-stage` |
| `@react-three/fiber` | `packages/fracture/package.json` | `automa`, `graph-viz`, `three-stage` |
| `react-error-boundary` | `packages/fracture/package.json` | `packages/ui` |
| `three` | `packages/fracture/package.json` | `automa`, `graph-viz`, `three-stage` |
| `@repo/pixel` | `packages/image-manipulator/package.json` | `apps/playground` |

Most are declared in the wrong workspace package rather than truly unused; they should be moved to the importing workspace's `package.json`.

### Unresolved Imports (6)

All 6 are `@repo/pixel` imports from `packages/image-manipulator/`:

- `ManipulationSelector.tsx:1`
- `WorkflowList.tsx:1`
- `WorkflowNode.tsx:1`
- `WorkflowStepArgSlider.tsx:1`
- `core/workflows/workflows.ts:1`
- `stores/manipulator/actions.ts:1`

Likely a path resolution issue between these two packages rather than missing code.

### Stale Suppressions (1)

- `packages/engines/pixel-engine/src/registry.ts:38` — `// fallow-ignore-next-line unused-class-member` no longer matches any issue.

---

## 2. Complexity

### Complex Functions (threshold exceeded)

| File | Function | Cyclomatic | Cognitive |
|---|---|---|---|
| `packages/fracture/src/components/draw/drawExpressions.ts` | `drawExpressions` | 35 | 4 |
| `packages/engines/randomart-engine/src/compile/compileToGLSL.ts` | `compileToGLSL` | 16 | 20 |
| `packages/fracture/src/components/draw/drawAxis.ts` | `drawAxis` | 11 | 1 |
| `packages/fracture/src/components/draw/debugDrawTicks.ts` | `debugDrawTicks` | 10 | 1 |
| `packages/fracture/src/components/draw/debugCrosshairs.ts` | `debugCrosshairs` | 6 | 1 |
| `packages/engines/randomart-engine/src/format/nodeToTreeView.ts` | `nodeToTreeView` | 6 | 6 |
| `packages/fracture/src/components/draw/debugDrawTarget.ts` | `debugDrawTarget` | 5 | 1 |
| `packages/fracture/src/components/draw/debugTicks.ts` | `debugTicks` | 5 | 1 |
| `packages/randomart/src/stores/randomart/selectors.ts` | `useSelectedTree` | 5 | 1 |
| `packages/fracture/src/components/draw/debugTicks.ts` | `debugDrawTicks` | 5 | 1 |
| `packages/fracture/src/components/draw/debugTicks.ts` | `debugTicks` | 5 | 1 |
| `packages/engines/randomart-engine/src/format/treePrinter.ts` | `nodeToMathString` | 4 | 4 |
| `packages/engines/randomart-engine/src/format/treePrinter.ts` | `nodeToTreeView` | 4 | 4 |

### Largest Functions (>100 lines)

| File | Function | Lines |
|---|---|---|
| `packages/pixel/src/components/views/InternalsView.tsx` | `InternalsView` | 271 |
| `packages/sequence-renderer/src/components/layers/LayerRow.tsx` | `LayerRow` | 144 |
| `packages/image-to-particles/src/components/ImageToParticles.tsx` | `ImageToParticles` | 143 |
| `packages/pixel/src/components/views/PipelineView.tsx` | `PipelineView` | 139 |
| `packages/image-manipulator/src/components/output/CompareSlider/useCompareSlider.ts` | `useCompareSlider` | 123 |
| `packages/randomart/src/components/inspector/ChannelTabs.tsx` | `ChannelTabs` | 122 |
| `packages/sequence-renderer/src/components/layers/LayerStackEditor.tsx` | `LayerStackEditor` | 118 |
| `packages/pixel/src/components/views/OverviewView.tsx` | `OverviewView` | 117 |
| `scripts/sync-package-readmes.mjs` | `main` | 115 |
| `packages/pixel/src/components/SwaggerSidebar.tsx` | `SwaggerSidebar` | 111 |
| `packages/graph-viz/src/components/controls/FilterControls.tsx` | `FilterControls` | 108 |
| `packages/mosaic-maker/src/components/controls/Controls.tsx` | `Controls` | 102 |
| `packages/graph-viz/src/core/pipeline/stages/build-output.ts` | `buildOutput` | 101 |

---

## 3. Refactoring Targets (ranked)

| Priority | File | Recommendation |
|---|---|---|
| 40.7 | `packages/randomart/src/stores/randomart/selectors.ts` | Split — 67 LOC, 14 dependents amplify every change |
| 38.8 | `packages/graph-viz/src/stores/content/selectors.ts` | Split — 8 LOC, 8 dependents |
| 38.2 | `packages/graph-viz/src/stores/view/selectors.ts` | Split — 11 LOC, 6 dependents |
| 17.4 | `packages/engines/randomart-engine/src/format/treePrinter.ts` | Add tests — 2 complex functions lack coverage |
| 8.9 | `scripts/sync-package-readmes.mjs` | Extract `main` (cognitive 34) into smaller functions |

---

## 4. Hotspots (complex + frequently changed)

Top files by hotspot score:

| Score | File | Commits | Trend |
|---|---|---|---|
| 3.2 | `packages/image-manipulator/src/stores/manipulator/store.ts` | 7 | stable |
| 1.5 | `packages/randomart/src/components/inspector/SeedInfo.tsx` | 4 | stable |
| 1.2 | `packages/image-manipulator/src/components/workflow/WorkflowStepArgSlider.tsx` | 6 | cooling |
| 1.1 | `packages/randomart/src/components/controls/AnimationSpeed.tsx` | 3 | accelerating |
| 1.0 | `packages/image-manipulator/src/components/layout/Controls.tsx` | 5 | cooling |
| 1.0 | `packages/mosaic-maker/src/utils/tiles/generateTileColors.ts` | 3 | cooling |
| 1.0 | `packages/config-eslint/index.js` | 7 | accelerating |
| 0.9 | `packages/randomart/src/components/controls/PlaybackButton.tsx` | 4 | cooling |
| 0.9 | `packages/sequence-renderer/src/components/canvas/SequenceCanvas.tsx` | 3 | cooling |
| 0.9 | `packages/randomart/src/components/WebGLCanvas.tsx` | 4 | accelerating |

188 files analyzed for hotspots (209 excluded: test/doc/config).

---

## 5. Code Duplication

### Registry pattern (shared `new Map<K,V>([...])` + getter/listing)

| Clone Group | Instances | Lines | Fingerprint |
|---|---|---|---|
| Shader/creature/rule registries | 4 | 9 | `dup:49c33244` |
| Registry getter/listing functions | 3 | 14 | `dup:67b593dd` |
| Extended registry + more entries | 3 | 10 | `dup:7eb15077` |

Files: `automa/src/shaders/registry.ts`, `automa-engine/src/creature/registry.ts`, `automa-engine/src/rules/registry.ts`, `randomart-engine/src/grammar/registry.ts`, `sequence-engine/src/rules/registry.ts`

### Randomart grammar rules (shared `GrammarRule` object shape)

| Clone Group | Instances | Lines | Suggestion |
|---|---|---|---|
| Unary rules (abs/cos/sin/sqrt) | 4 | 9 | Extract shared |
| Binary operator rules (add/gt/lt/mul) | 4 | 10 | Extract shared (`buildChild`) |

### Pixel engine manipulations

| Clone Group | Instances | Lines | Notes |
|---|---|---|---|
| Box blur / gaussian blur / sharpen | 3 | 17 | Shared `defineManip<{radius}>` wrapper |
| Hue rotate / saturation / threshold | 3 | 6 | Shared `defineManip<{value}>` wrapper |

### Sequence visualization layers (defaults + params + draw boilerplate)

| Clone Group | Instances | Lines | Notes |
|---|---|---|---|
| drawBarChart, drawConnectionLines, drawFactorWaves, drawMountain, drawRadialSpokes, drawStemPlot | 6 | 28 | Duplicated param config blocks (`dup:ff7b9c15`) |
| Same files, deeper draw function capture | 6 | 29 | (`dup:3b34b858`) |
| Same files, expanded fragment | 5 | 36 | (`dup:a650c543`) |
| Same files, full draw entry | 5 | 31 | (`dup:ada996b4`) |
| drawBaseline, drawPlottedNumbers, drawRecamanArcs | 3 | 24 | Shared `VisualLayer` shape |

### Three-stage lighting components

| Clone Group | Instances | Lines | Notes |
|---|---|---|---|
| DirectionalLight, PointLight, SpotLight | 3 | 27 | Position controls boilerplate (`Position`) |

### Other

| Clone Group | Instances | Lines | Files |
|---|---|---|---|
| Pixel view HTML table rows | 3 | 19 | OverviewView, PipelineView |
| Path constants (`path.join` chains) | 3 | 7 | `radu-machine-learning/constants.ts`, `sync-package-readmes.mjs` |
| Zustand selector functions | 3 | 12 | `randomart/stores/randomart/selectors.ts` |

---

## 6. Notes

- **`packages/fracture/`** is the most significant candidate for cleanup: 6 unused files, 4 unused exports, and 4 mis-placed dependencies.
- **`packages/image-manipulator/`** has 6 unresolved `@repo/pixel` imports and 1 mis-placed dependency — check the tsconfig paths between these two packages.
- **Sequence visualization layers** have the largest duplication (5–6 files, up to 36 lines each) — a shared base `VisualLayer` factory could eliminate most boilerplate.
- **Randomart engine grammar rules** (`abs`, `cos`, `sin`, `sqrt`, `add`, `gt`, `lt`, `mul`) share nearly identical `GrammarRule` structures and could use a helper.
- **`packages/randomart/src/stores/randomart/selectors.ts`** is the top refactoring priority: 14 dependents on a 67-line file with near-identical Zustand selector exports.

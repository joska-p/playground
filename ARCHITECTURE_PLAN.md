# Architecture Plan: Deepening sequence-engine + sequence-renderer

## Goal

Turn `@repo/sequence-engine` into a pure, UI-independent module. Move all DOM-browser code (canvas rendering, Web Worker, localStorage) into `@repo/sequence-renderer` and let caller-owned modules register their extensions via a simple `register()` pattern.

## Before / After

### Before (current)

```
engine (25 files, browser-coupled)         renderer (22 files)
┌─────────────────────────────────┐        ┌──────────────────────┐
│ engine.ts  rules/*  ← pure     │        │ React UI             │
│ visualizations/*  ← canvas/DOM │◄───────│ Zustand store        │
│ modules/fourier/* ← workers    │import   │ hooks                │
│ registry.ts  ← localStorage   │        │                      │
└─────────────────────────────────┘        └──────────────────────┘
```

### After

```
engine (pure TS, no DOM)                   renderer (app-level, owns all UI)
┌──────────────────────┐                   ┌──────────────────────────────┐
│ engine.ts            │                   │ React components             │
│ rules/ (9 built-in)  │                   │ Zustand store                │
│ registerRule()  NEW  │                   │ engine/ (canvas rendering)   │
│ store/               │                   │   render.ts, types.ts        │
│   PresetStore     IF │                   │   layers/* (9 draw files)    │
│   InMemoryPresetStore│                   │   presets.ts                 │
│ types.ts (pure data) │                   │   layers/registry.ts         │
└──────────────────────┘                   │ modules/fourier/             │
        │                                  │   drawFourierEpicycles.ts    │
        │ import PresetStore,              │   fourier.worker.ts          │
        │ SequenceRule, registerRule       │   store.ts                   │
        ▼                                  │   harmonicPath.ts (rule)     │
                                           │   index.ts — register()      │
                                           │ adapters/                    │
                                           │   LocalStoragePresetStore    │
                                           └──────────────────────────────┘
```

## Implementation steps

### Step 1 — Engine: `registerRule()`

Modify `rules/registry.ts`:

- Add `registerRule(rule: SequenceRule): void` so external callers can add rules without touching the engine's source
- Export it publicly

### Step 2 — Engine: `PresetStore` interface + pure types

Create:

- `src/store/PresetStore.ts` — interface with `getAll`, `save`, `delete`
- `src/store/InMemoryPresetStore.ts` — default impl using `Map`
- `src/types.ts` — pure data types: `PresetRecord`, `LayerConfigEntry`, `ParamDescriptor`

### Step 3 — Engine: strip DOM code

Delete directories:

- `src/visualizations/` (moves to renderer)
- `src/modules/fourier/` (moves to renderer)
- `src/rules/harmonicPath.ts` (moves into fourier module)

Update `package.json`:

- Exports: only `"."`, `"./rules"`, `"./rules/types"`, `"./rules/recaman"`, `"./store"`, `"./types"`
- Remove dependency: `@repo/worker-pool`

### Step 4 — Renderer: receive engine's moved code

Create in `renderer/src/`:

- `engine/types.ts` — `VisualLayer`, `CanvasLayout`, `CanvasViewport` (from engine's `visualizations/types.ts`)
- `engine/render.ts` — `render()` function
- `engine/presets.ts` — built-in preset configurations
- `engine/layers/` — 9 draw files + registry
- `modules/fourier/` — types, store, worker, drawFourierEpicycles, harmonicPath, index.ts
- `adapters/LocalStoragePresetStore.ts` — implements `PresetStore` using `localStorage`

### Step 5 — Renderer: update imports

Update all files that previously imported from `@repo/sequence-engine/visualizations/*` to import locally.

### Step 6 — Renderer: startup registration

In `main.tsx` or `App.tsx`, call `register()` from `modules/fourier/index.ts` to register the Fourier rule with the engine and its layer with the layer registry.

### Step 7 — Verify

```bash
pnpm --filter @repo/sequence-engine lint && pnpm --filter @repo/sequence-engine check-types
pnpm --filter @repo/sequence-renderer lint && pnpm --filter @repo/sequence-renderer check-types
```

## File manifest

### Created (4 files)

| Package  | Path                                      |
| -------- | ----------------------------------------- |
| engine   | `src/store/PresetStore.ts`                |
| engine   | `src/store/InMemoryPresetStore.ts`        |
| engine   | `src/types.ts`                            |
| renderer | `src/adapters/LocalStoragePresetStore.ts` |
| renderer | `src/modules/fourier/index.ts`            |

### Moved (18 files, engine → renderer)

| Source (engine)                                    | Destination (renderer)                           |
| -------------------------------------------------- | ------------------------------------------------ |
| `src/visualizations/types.ts`                      | `src/engine/types.ts`                            |
| `src/visualizations/render.ts`                     | `src/engine/render.ts`                           |
| `src/visualizations/presets.ts`                    | `src/engine/presets.ts`                          |
| `src/visualizations/registry.ts`                   | _deleted_ (logic → adapter + registry recreated) |
| `src/visualizations/layers/registry.ts`            | `src/engine/layers/registry.ts`                  |
| `src/visualizations/layers/drawRecamanArcs.ts`     | `src/engine/layers/drawRecamanArcs.ts`           |
| `src/visualizations/layers/drawPlottedNumbers.ts`  | `src/engine/layers/drawPlottedNumbers.ts`        |
| `src/visualizations/layers/drawFactorWaves.ts`     | `src/engine/layers/drawFactorWaves.ts`           |
| `src/visualizations/layers/drawBaseline.ts`        | `src/engine/layers/drawBaseline.ts`              |
| `src/visualizations/layers/drawStemPlot.ts`        | `src/engine/layers/drawStemPlot.ts`              |
| `src/visualizations/layers/drawRadialSpokes.ts`    | `src/engine/layers/drawRadialSpokes.ts`          |
| `src/visualizations/layers/drawBarChart.ts`        | `src/engine/layers/drawBarChart.ts`              |
| `src/visualizations/layers/drawConnectionLines.ts` | `src/engine/layers/drawConnectionLines.ts`       |
| `src/visualizations/layers/drawMountain.ts`        | `src/engine/layers/drawMountain.ts`              |
| `src/modules/fourier/types.ts`                     | `src/modules/fourier/types.ts`                   |
| `src/modules/fourier/store.ts`                     | `src/modules/fourier/store.ts`                   |
| `src/modules/fourier/fourier.worker.ts`            | `src/modules/fourier/fourier.worker.ts`          |
| `src/modules/fourier/drawFourierEpicycles.ts`      | `src/modules/fourier/drawFourierEpicycles.ts`    |
| `src/rules/harmonicPath.ts`                        | `src/modules/fourier/harmonicPath.ts`            |

### Modified (engine: 2 files, renderer: 10+ files)

**Engine:**

- `rules/registry.ts` — add `registerRule()`, remove harmonicPath import
- `package.json` — compact exports, remove `@repo/worker-pool`

**Renderer:**

- `stores/sequence/store.ts` — use `LocalStoragePresetStore` + local imports
- `stores/sequence/actions.ts` — use adapter
- `stores/sequence/types.ts` — update type imports
- `stores/sequence/selectors/use*.ts` — update type imports
- `components/layers/*.tsx` — local type imports
- `components/presets/PresetSelector.tsx` — use adapter
- `components/sidebar/SequenceSelector.tsx` — stays on `@repo/sequence-engine/rules`
- `hooks/useCanvasRenderer.ts` — local render import
- `main.tsx` — call `register()`
- `package.json` — add `@repo/worker-pool`

## Module pattern (for future modules)

To add a new module like Fourier:

```
modules/new-module/
├── types.ts           # Module-specific types
├── myRule.ts          # SequenceRule (calls registerRule on import)
├── myLayer.ts         # VisualLayer
├── worker.ts          # Optional Web Worker
└── index.ts           # register() entry point
```

The module directory lives entirely in the renderer (or whichever consumer needs it). It registers its rule with the engine via `registerRule()` at startup.

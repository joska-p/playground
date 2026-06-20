# Package Splits: Intent & Plan

## Why Split?

Following the pattern established with `automa`/`automa-engine` and `sequence-renderer`/`sequence-engine`, the goal is to separate **pure computation** from **UI rendering** in packages where those concerns coexist.

**Benefits:**

- **Reusability** — Engine packages can be consumed by non-React consumers (CLI tools, Node.js scripts, web workers, other frameworks)
- **Tree-shaking** — Consumers don't pull React/UI deps when they only need the logic
- **Separation of concerns** — Clear ownership: engine = algorithmic correctness, UI = interaction/rendering
- **Testing** — Core logic can be tested without DOM/React infrastructure
- **Compilation target flexibility** — Engines could compile to WASM or run in workers without UI overhead

---

## 1. `@repo/palette-generator` → `@repo/palette-engine` + `@repo/palette-generator`

### What

The app lets you pick a color in a 2D canvas color space, choose a harmony rule (analogous, complementary, monochromatic, triadic), and get back a palette. Currently both the color science and the UI live in one package.

### Split Boundary

**Move to `packages/engines/palette-engine/`** (`@repo/palette-engine`):

```
src/
  colorSpaces.ts          # OKLab, OKLCh, HSL, sRGB space definitions + getColor factories
  generatePalette.ts      # Orchestrator: Rule → Palette
  rules/
    types.ts              # Palette, Rule types
    analogous.ts          # ±30° hue shift
    complementary.ts      # 180° hue flip + lightness variations
    monochromatic.ts      # 6 lightness steps with chroma adjustment
    triadic.ts            # 120° spacing + lightness variations
```

This is the **entire core logic** of the app. Every file is pure functions/types, zero React imports. Only dependency: `colorjs.io`.

**Stay in `packages/palette-generator/`** (`@repo/palette-generator`):

```
src/
  main.tsx, App.tsx
  styles/
  stores/palette/         # Zustand store bound to the engine
  components/             # PaletteGenerator, Controls, ColorSpaceCanvas, Display
  utils/                  # maths.ts, color.ts (helpers for the UI layer)
```

Depends on `@repo/palette-engine` + `@repo/ui` + React.

### Plan

1. Create `packages/engines/palette-engine/` with:
   - `package.json` (name: `@repo/palette-engine`, dep: `colorjs.io`, no React)
   - `tsconfig.json` following `automa-engine`'s config
   - Move core files into `src/`
   - Add a barrel `src/index.ts` exporting the public API
2. Update `packages/palette-generator/`:
   - Add `@repo/palette-engine` to dependencies, remove copied files
   - Update imports in `stores/` and `components/` to import from `@repo/palette-engine`
   - Update exports in `package.json`
3. Update any consumers (apps/playground references)
4. `pnpm install && pnpm check-types` to verify

---

## 2. `@repo/image-pipeline` → `@repo/pixel-engine` + `@repo/pixel` (keeps docs & hooks)

### What

The image pipeline is a composable processing engine with 18+ manipulations (brightness, blur, edge detect, resize, etc.) and a fusion scheduler that batches pixel-level ops into a single pass. Currently the core logic and the interactive docs app live in one package. The docs UI is polished and worth keeping — the split is purely about extracting the engine.

### Renaming

```
 image-pipeline       →  pixel         (SDK + docs, stays in packages/)
 image-pipeline-core  →  pixel-engine  (pure engine, moves to packages/engines/)
```

### What Stays vs Moves

**Move to `packages/engines/pixel-engine/`** (`@repo/pixel-engine` — pure engine):

```
src/
  core/
    types.ts                    # All type definitions (ManipulationDefinition, etc.)
    registry.ts                 # Runtime manipulation registry
    buffer-manager.ts           # Double-buffered pixel storage
    fusion-scheduler.ts         # Pixel-level op batching
    step-dispatcher.ts          # Routes steps to pixel/neighborhood/global executors
    pipeline-runner.ts          # Orchestrates the pipeline
    manipulation-factories.ts   # defineManip() helper
    neighborhood-tiling.ts      # Tiled large-image processing
    manipulations/
      manifest.ts               # Single source of truth: ALL_MANIPULATIONS
      pixel/ (8 files)          # brightness, contrast, grayscale, hue-rotate, invert, etc.
      neighborhood/ (5 files)   # box-blur, edge-detect, gaussian-blur, sharpen + helpers
      whole/ (5 files)          # flip, resize, histogram-equalize, rotate-90cw
  api/
    pipeline-worker.ts           # Web Worker entry (imports from core)
```

All pure logic. No React, no WorkerPool orchestration. The `ManipulationUIMetadata` (name, description, arg definitions) travels with each definition as inert data — it stays in the engine.

**Stay in `packages/pixel/`** (`@repo/pixel` — SDK + docs):

```
src/
  api/
    pixel.ts                     # WorkerPool setup + public pixel singleton
  hooks/
    usePixel.ts                  # React hook wrapping the API
  main.tsx + App.tsx             # docs app shell
  components/pixel-docs/         # docs UI (PipelineDocs, views, demos, data, helpers)
  assets/                        # demo image
  styles/
```

Only changes: imports from `core/` become imports from `@repo/pixel-engine`, and `src/core/` + `src/api/pipeline-worker.ts` are removed since they now live in the engine. The "API" object and hook are renamed to match (`imagePipeline` → `pixel`, `usePipeline` → `usePixel`).

### Plan

1. Create `packages/engines/pixel-engine/` with:
   - `package.json` (name: `@repo/pixel-engine`, dep: `typescript` only)
   - `tsconfig.json` matching `automa-engine`'s config
   - Move `core/` and `api/pipeline-worker.ts` into `src/`
   - Add barrel `src/index.ts` exporting types + `runPipeline` + `ALL_MANIPULATIONS`
2. Rename and update `packages/image-pipeline/` → `packages/pixel/`:
   - Rename the directory
   - `package.json` name: `@repo/pixel`
   - Add `@repo/pixel-engine` to dependencies
   - Update imports to use `@repo/pixel-engine` instead of `../core/`
   - Rename `imagePipeline` → `pixel` and `usePipeline` → `usePixel`
   - Remove `src/core/` and `src/api/pipeline-worker.ts`
   - Update `turbo.json` to add engine as a dependency
3. Update consumers:
   - `image-manipulator` imports from `@repo/pixel` instead of `@repo/image-pipeline`
   - `apps/playground` updates its reference
4. `pnpm install && pnpm check-types && pnpm build && pnpm test` to verify

---

## 3. `@repo/mosaic-maker` — Open Question

### What's There That Could Be an Engine

```
src/core/
  TILE_REGISTRY.ts        # SVG shape definitions for each tile pattern
  types.ts, constants.ts  # Palette type, CSS defaults
  initialPalette.ts, initialTileSet.ts   # Default data
src/utils/
  random/                 # getRandom, shuffleArray, shuffleObject
  tiles/                  # computeInitialTiles, computeNumberOfTiles, generateTileColors, generateTileRotation
  palettes/               # fetchPalettes, fetchWithValidation, Zod schema
```

All React-free. A `@repo/mosaic-engine` could contain tile generation, palette management, shape definitions, and grid computation.

### Why It's Less Clear

- The tile generation is tightly coupled to DOM measurement (`computeNumberOfTiles` reads an `HTMLDivElement`), limiting server-side value
- The palette fetching uses `localStorage` and `fetch` — browser-specific but not React-specific
- There's currently no consumer that needs the logic without the UI

**Keep it in mind.** If you ever need to:

- Generate mosaic configs in a CLI
- Share tile shapes with another project
- Pre-render mosaics on a server

...then split. For now, the boundary is already clean within the package (`core/` + `utils/` are React-free) but not worth the extraction overhead.

---

## File Structure After Splits

```
packages/
  palette-generator/        # React UI → imports @repo/palette-engine
  pixel/                    # SDK + docs (hooks, API bridge, docs UI) → imports @repo/pixel-engine
  image-manipulator/        # React UI → imports @repo/pixel (was @repo/image-pipeline)
  mosaic-maker/             # Unchanged, internal core/utils boundary clean
  ...

packages/engines/
  automa-engine/            # Existing
  sequence-engine/          # Existing
  palette-engine/           # NEW
  pixel-engine/             # NEW (was image-pipeline-core)
```

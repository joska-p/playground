# Refactoring Plan — `@repo/image-pipeline`

Based on the architecture review in `index.md`.

---

## Phase 1: Global Mutable State → Injected Dependencies (Candidate 1) ✅

### Step 1.1 — `registry.ts` ✅
- Export `Registry` class directly (no default singleton).
- Remove `registerManipulation()` convenience function.

### Step 1.2 — `config.ts` ✅
- Replace mutable singleton with `defaultConfig()` factory + `MAX_PIXELS` constant.

### Step 1.3 — `runner.ts` ✅
- `runPipeline(source, steps, deps)` — accepts `{ registry: Registry; maxPixels: number }`.
- Remove global imports of `registry` and `config`.

### Step 1.4 — `pipeline.ts` ✅
- `Pipeline.from(source, deps)` — accepts `RunPipelineDeps`, threads to `runPipeline`.
- Builder API unchanged.

### Step 1.5 — `pipeline.worker.ts`, `pipeline-gateway.ts` ✅
- Worker creates its own `Registry` instance (can't be serialized via postMessage).
- Accept `maxPixels` in worker message, pass as dep.
- Gateway sends `maxPixels` through to worker.

---

## Phase 2: Registration by Side Effect → Explicit Composition (Candidate 4) ✅

### Step 2.1 — `pixel.ts` ✅
- Export `PIXEL_MANIPULATIONS: ManipulationDefinition[]` array.
- Remove side-effect `registerManipulation()` calls.

### Step 2.2 — `neighborhood.ts` ✅
- Export `NEIGHBOR_MANIPULATIONS: ManipulationDefinition[]` array.
- Remove side-effect `registerManipulation()` calls.

### Step 2.3 — `whole.ts` ✅
- Export `WHOLE_MANIPULATIONS: ManipulationDefinition[]` array.
- Remove side-effect `registerManipulation()` calls.

### Step 2.4 — `manipData.ts` ✅
- Export `DEMO_MANIPULATIONS: ManipulationDefinition[]` for `demo-warm`.
- Remove side-effect `registerManipulation()` call.
- Import from direct source instead of barrel.

### Step 2.5 — `index.ts` ✅
- Provide `registerAll(registry)` convenience function.
- Worker registers all manipulations explicitly at startup.

---

## Phase 3: Runner Decomposition (Candidate 2) ✅

### Step 3.1 — New `buffer-manager.ts` ✅
- Extract `BufferManager` class.
- Owns ping-pong `Uint8ClampedArray` buffers.
- API: `current`, `other`, `width`, `height`, `swap()`, `snapshot()`, `asImageData()`, `replaceWith(img)`.

### Step 3.2 — New `fusion-scheduler.ts` ✅
- Extract `FusionScheduler` class.
- Accumulates pixel ops (`add(def, opts)`).
- Flushes on barrier (`flush(manager)`).
- Contains `runFusedPixelBatch` as private implementation detail.

### Step 3.3 — New `step-dispatcher.ts` ✅
- Extract `dispatchStep()` function.
- Routes a single step: pixel → scheduler, neighborhood → tiling/direct, whole → `WholeImageFn`.

### Step 3.4 — `runner.ts` ✅
- Shrunk to ~30-line orchestrator.
- Creates manager + scheduler, iterates steps, calls dispatcher, returns result.
- `RunPipelineDeps` moved to `types.ts` to avoid circular import.

---

## Phase 4: Two API Surfaces → Unified Step[] (Candidate 3) ✅

### Step 4.1 — `api/pipeline.ts` ✅
- `resize()` pushes `{ kind: "manip", id: "resize", opts }` to steps array instead of separate field.
- `run()` handles auto-scale guard by prepending a resize step, then delegates to `runPipeline`.

### Step 4.2 — `api/pipeline.worker.ts` ✅
- Removed re-parsing loop.
- Worker registers all manipulations on a fresh Registry, then calls `runPipeline(steps, deps)` directly.
- `dispatchStep()` handles `id: "resize"` as a whole-image transform.

### Step 4.3 — `api/pipeline-gateway.ts` ✅
- Already uses `Step[]` — no change needed.

---

## Phase 5: Cleanup

### Step 5.1 — Test file
- Rename `pipeline.test.ts.txt` → `pipeline.test.ts`.
- Use fresh `Registry` per test.
- Remove module-level registration side effects.
- Remove `setConfig` test (config no longer global mutable).

### Step 5.2 — Barrel file
- Remove `src/components/image-pipeline/index.ts` (violates CONVENTIONS.md).
- Update `package.json` `exports` to point to individual modules.

### Step 5.3 — Update consumers
- `usePipeline.ts` — import directly from source files.
- `PipelineDocs.tsx` and related — update import paths.

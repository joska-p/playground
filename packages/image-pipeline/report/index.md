# Architecture Review — `@repo/image-pipeline`

**Generated** 2026-05-30 · applying the glossary of LANGUAGE.md

## Executive Summary

The `@repo/image-pipeline` package is a browser-based image manipulation engine with a fluent builder API, a global registry of manipulations, and an optional Web Worker pool. The code works but has four structural issues that reduce **locality** and **testability**: global mutable singletons, a runner module that mixes too many concerns, two API surfaces for the same abstraction, and registration-by-side-effect. Each candidate below describes how to **deepen** the architecture — replace shallow pass-throughs with a small, stable **interface** that hides a richer **implementation** behind a real **seam**.

---

## Candidate 1 — Global Mutable State → Injected Dependencies

**Strength: Strong**

**Files:**
- `src/components/image-pipeline/registry.ts`
- `src/components/image-pipeline/config.ts`
- `src/components/image-pipeline/pipeline.ts` (line 1-2: imports both as globals)
- `src/components/image-pipeline/runner.ts` (line 1-2: imports both as globals)
- `src/components/image-pipeline/pixel.ts`, `neighborhood.ts`, `whole.ts` (side-effect registration into global)

### Problem

The `Registry` and `config` are module-level singletons allocated at import time. `Registry` has a shallow **interface** — `register`, `get`, `has`, `clear` — that's nearly as complex as its **implementation** (wrapping a `Map` with validation). The **deletion test**: deleting the Registry class moves validation logic into ~4 callers but eliminates no real depth — callers still need a key-value mapping. Likewise, `config.ts` exports a mutable object; any module can reassign `config.maxPixels` at any time.

This creates **coupling without a seam**. Tests that register manipulations pollute the global registry for other tests (the exposed `clear()` mitigant is itself a code smell). Two pipelines running concurrently (e.g. SSR + client) cannot have different configs. Changing the storage backend (e.g. to a `Map<string, ManipulationDefinition>` with LRU eviction) requires modifying the global singleton — there is no **seam** for an **adapter**.

### Solution

Make `Registry` and `PipelineConfig` first-class objects that accept an optional `Registry` instance and a `PipelineConfig` in their constructors. Provide a default singleton for convenience, but let callers inject custom instances. The `Runner` receives both through its call signature instead of importing them as globals.

```
// Before: globals imported by runner.ts and pipeline.ts
import { config } from "./config";
import { registry } from "./registry";

// After: dependencies passed
type RunPipelineArgs = {
  registry: Registry;
  maxPixels: number;
};
export function runPipeline(
  source: ImageData, steps: Step[], deps: RunPipelineArgs
): Promise<PipelineResult>;
```

### Benefits

- **Locality:** all dependencies visible in the call site. No surprises from distant module-level mutations.
- **Testability:** tests create a fresh Registry per test, eliminating pollution and order-dependence.
- **Leverage:** the same seam enables custom backends (e.g. lazy-loading manipulation definitions from a URL) and per-pipeline config without touching `Pipeline` or `Runner`.

### Before / After

```
← Before — Global Singletons

  Global Scope:   Registry (singleton Map), Config (singleton object)
  Pipeline:       Pipeline.from, runPipeline
  Manip Files:    pixel.ts, neighborhood.ts, whole.ts
                    └─register() side-effect→ Registry
  runPipeline ──imports directly──→ Registry
  runPipeline ──imports directly──→ Config

→ After — Injected Dependencies

  Caller:         new Registry, PipelineConfig
                    └─injected──→ Pipeline.from, runPipeline
  Manip Files:    pixel.ts, neighborhood.ts, whole.ts
                    └─exports data──→ Caller ──explicit register──→ Registry
```

---

## Candidate 2 — Runner Contains Too Many Concerns

**Strength: Strong**

**Files:**
- `src/components/image-pipeline/runner.ts` (entirety — 141 lines, one function)

### Problem

The `runPipeline` function in `runner.ts` manages **four distinct responsibilities** interleaved as closures and local state:

- **Buffer management** — ping-pong `Uint8ClampedArray` allocation and swapping (`bufA`, `bufB`, `current`, `other`)
- **Pixel fusion scheduling** — accumulating `pixelBatch` and flushing it on barriers (neighborhood/whole/snapshot steps)
- **Step dispatch** — routing each step to pixel, neighborhood (tiled or direct), or whole-image handling
- **Snapshot capture** — freezing current buffer state into the result

These concerns share mutable local state (`current`, `other`, `currentWidth`, `currentHeight`, `pixelBatch`) through ~8 local variables and ~5 closure helpers. A bug in fusion flush timing (`runner.ts:73-78`) can corrupt snapshot ordering or skip pixel ops. A bug in buffer swap can corrupt the entire output. These are independent failure modes that cannot be tested in isolation.

The **deletion test**: deleting runner.ts removes all execution logic — this is truly deep. But the depth is *accidental* (everything mashed together) rather than *essential* (a small interface hiding complex behaviour). The function signature `(source, steps) → Promise<PipelineResult>` is already a reasonable **interface**; the **implementation** just needs internal seams.

### Solution

Extract three submodules behind internal **seams** (not exported from the package, just for locality within the pipeline):

- **`BufferManager`** — owns the ping-pong buffers, exposes `current()`, `swap()`, `snapshot(): ImageData`, `resize(w, h)`. Hides the raw `Uint8ClampedArray` lifecycle.
- **`FusionScheduler`** — accumulates pixel ops (`add(def, opts)`), flushes them on demand (`flush(manager)`). Hides the fused loop in `runFusedPixelBatch`.
- **`StepDispatcher`** — routes a single step to the correct strategy: pixel → scheduler, neighborhood → `runNeighborhoodTiled` (or direct), whole-image → `WholeImageFn`.

The outer `runPipeline` becomes a ~30-line orchestrator: create manager + scheduler, iterate steps, call dispatcher, return result. Each submodule can be unit-tested with a 2-line setup.

### Benefits

- **Locality:** each concern has its own file. Fixing a buffer-copy bug means reading 50 lines in `buffer-manager.ts`, not 141 lines with interleaved logic.
- **Testability:** test `FusionScheduler` without touching buffers. Test `BufferManager.swap()` produces correct ping-pong. Test `StepDispatcher` routes correctly with mock scheduler/manager.
- **Leverage:** the `BufferManager` **seam** would allow a future **adapter** backed by WebGL or WASM without changing any dispatch logic.

### Before / After

```
← Before — Monolithic runner.ts

  runPipeline (141 lines, 1 function)
    ├── Buffer mgmt (bufA, bufB, current, other)
    ├── Fusion accum (pixelBatch, flush)
    ├── Step dispatch (pixel/neighbor/whole)
    └── Snapshot capture

→ After — Decomposed Runner

  runPipeline (~30 lines, orchestrator)
    ├── BufferManager — swap(), snapshot(), resize() → Ping-pong buffers
    ├── FusionScheduler — add(), flush() → runFusedPixelBatch
    └── StepDispatcher
          ├── neighborhood ≥ threshold? → tiling.ts
          ├── neighborhood < threshold? → NeighborhoodFn
          └── whole → WholeImageFn
```

---

## Candidate 3 — Two API Surfaces for the Same Concept

**Strength: Worth exploring**

**Files:**
- `src/components/image-pipeline/pipeline.ts` (Fluid builder)
- `src/components/image-pipeline/pipeline-gateway.ts` (Step[] array)
- `src/components/image-pipeline/pipeline.worker.ts` (Re-parses Step[] into builder calls)
- `src/components/image-pipeline/types.ts` (Step types shared)

### Problem

The `Pipeline` builder (.add(), .resize(), .snapshot()) and the `pipelineGateway` function (`Step[]` array) are two descriptions of the same sequence with different shapes. The worker handler (`pipeline.worker.ts:26-36`) re-parses `Step[]` back into `Pipeline` builder calls by looping and conditionally calling `.resize()` vs `.add()`.

This creates a subtle maintenance burden: adding a new step kind (e.g. "comment" or "branch") requires updating:
- The `Step` discriminated union in `types.ts`
- The `Pipeline` builder method
- The `pipeline.worker.ts` re-parser loop
- Any test that constructs steps programmatically

Furthermore, snapshot steps in the gateway path are documented as *"intentionally a no-op here"* because the worker's parser skips them but the Pipeline `.run()` collects snapshots internally. This is confusing — the step format should be the canonical representation, not something the worker re-interprets with partial semantics.

### Solution

Make `Step[]` the canonical step representation. Build `Pipeline` on top of it internally (`Pipeline.fromStepArray()` or accept steps in the constructor). Have the `Pipeline` builder methods just push to the internal step array. The worker receives steps and passes them to the exact same `runPipeline` — no re-parsing.

```
// Pipeline builder delegates to canonical Step[]:
class Pipeline {
  private steps: Step[] = [];

  add(id: string, opts = {}): Pipeline {
    this.steps.push({ kind: "manip", id, opts });
    return this;
  }

  async run(): Promise<PipelineResult> {
    return runPipeline(this.source, this.steps, deps);
  }
}

// Worker just passes through:
const result = await runPipeline(sourceData, steps, deps);
self.postMessage(result, { transfer: transferables });
```

### Benefits

- **Locality:** one data format for all execution paths. Worker no longer re-parses.
- **Leverage:** adding "comment" or "frame" step types requires changing only `types.ts` and `runner.ts` — not the worker handler.
- **Testability:** `Step[]` arrays are trivially constructable in tests without importing `Pipeline`.

### Before / After

```
← Before — Two representations

  Caller → Pipeline: .add("blur").add("sharpen").run()
            Pipeline → runPipeline: Step[] (canonical)

  Caller → pipelineGateway: Step[] array
            pipelineGateway → Worker: postMessage(steps)
            Worker → loop: if(id==="resize") .resize() else .add()
            Worker → Pipeline.from(src).add(...).resize(...).run()

  Builder + re-parser = two code paths

→ After — Unified

  Caller → Pipeline: .add("blur").add("sharpen").run()
            Pipeline → push to this.steps
            Pipeline → runPipeline: this.steps

  Caller → pipelineGateway: Step[] array
            pipelineGateway → Worker: postMessage(steps)
            Worker → runPipeline: steps (passthrough, no re-parse)

  One canonical Step[] → one execution path
```

---

## Candidate 4 — Registration by Side Effect → Explicit Composition

**Strength: Worth exploring**

**Files:**
- `src/components/image-pipeline/pixel.ts` (module-level `registerManipulation(...)`)
- `src/components/image-pipeline/neighborhood.ts` (same pattern)
- `src/components/image-pipeline/whole.ts` (same pattern)
- `src/components/image-pipeline/index.ts` (imports them for side effects)
- `src/components/pipeline-docs/manipData.ts` (also registers `demo-warm` as side effect)

### Problem

`pixel.ts`, `neighborhood.ts`, `whole.ts`, and `manipData.ts` all call `registerManipulation(...)` at module scope. This means:
- **Import order matters** — `index.ts` must import these files before a pipeline can reference their IDs.
- **No tree-shaking** — bundlers cannot eliminate unused manipulations because the side effect is at module scope.
- **Surprise registration** — `manipData.ts` both exports meta-data *and* registers `demo-warm` as a side effect. Importing the data for a UI component also registers a manipulation.
- **Untestable in isolation** — importing `pixel.ts` in a test registers all 9 pixel manipulations, even if the test only needs 1.

The **deletion test**: if we deleted the `registerManipulation(...)` calls and kept only the function definitions, nothing would break — callers would just need to explicitly register what they use. The side-effect registration is a **shallow** convenience that conceals coupling.

### Solution

Export `ManipulationDefinition[]` arrays from `pixel.ts`, `neighborhood.ts`, `whole.ts` instead of calling `registerManipulation`. Provide a convenience `registerAll(registry)` function for callers who want the full set. Let selective callers register only what they need.

```
// pixel.ts exports data, no side effect:
export const PIXEL_MANIPULATIONS: ManipulationDefinition[] = [
  { id: "brightness", type: "pixel", fn: ... },
  { id: "grayscale", type: "pixel", fn: ... },
  // ...
];

// Caller explicitly composes:
import { PIXEL_MANIPULATIONS } from "./pixel";
import { NEIGHBOR_MANIPULATIONS } from "./neighborhood";
PIXEL_MANIPULATIONS.forEach(d => registry.register(d));
```

### Benefits

- **Tree-shaking:** unused manipulation files are dead code eliminated.
- **Locality:** a file's imports tell you exactly which manipulations are available. No magic registration.
- **Testability:** tests register exactly the manipulations they need, in a fresh Registry.

### Before / After

```
← Before — Side-effect imports

  index.ts (barrel): import './pixel', import './neighborhood', import './whole'
                      └─call register()→ Registry (singleton)
  manipData.ts: side-effect register('demo-warm')
                      └─call register()→ Registry (singleton)

→ After — Explicit composition

  pixel.ts:       exports PIXEL_MANIPULATIONS
  neighborhood.ts: exports NEIGHBOR_MANIPULATIONS
  whole.ts:       exports WHOLE_MANIPULATIONS

  Caller: imports + registers what it needs
           └─forEach(reg.register)→ Registry (explicit instance)
```

---

## 🎯 Top Recommendation

**Tackle Candidate 1 first** (Global Mutable State → Injected Dependencies).

It has the highest leverage for the lowest disruption. Converting the Registry and Config from global singletons to injectable dependencies:

- **→** **Unlocks Candidate 4** — the Registry seam is the same one needed for explicit registration. Doing Candidate 1 first means Candidate 4 becomes a trivial follow-up.
- **→** **Fixes test pollution now** — the test file (`pipeline.test.ts.txt`) currently registers manipulations at module scope; any test that imports that file gets all registrations. With injectable dependencies, each test creates its own Registry.
- **→** **No public API breakage** — the default singleton constructor preserves backward compatibility. Callers who don't pass a Registry get the global; callers who want isolation inject one.
- **→** **Enables SSR** — the polyfill (`polyfill.ts`) currently patches `globalThis.ImageData` at module scope. With an injected Registry, the polyfill can be loaded lazily in Node/worker contexts.

> **Estimated effort:** 2–3 hours · Changes to ~6 files · No new exports needed.
> The change touches only the internal plumbing (Registry, Config, Pipeline, Runner) and the test file. The public exports (`Pipeline`, `registerManipulation`, etc.) keep the same names — only the internals become injectable.

---

### ⚠ ADR Note

No existing ADRs were found for this package. The `CONVENTIONS.md` prohibits barrel files (`index.ts`), which `src/components/image-pipeline/index.ts` violates. This review does not flag that as a candidate — it's a style violation, not an architectural deepening opportunity — but the barrel export should be removed per convention regardless of these recommendations.

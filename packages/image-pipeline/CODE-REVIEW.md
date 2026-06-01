# Code Review: `@repo/image-pipeline`

> Reviewed: `src/api/`, `src/core/`, config files. Excluded: `src/components/pipeline-docs`.

---

## 1. API UX

**The `Pipeline` builder class is dead code.** It wraps `runPipeline()` with a thin chainable API but requires callers to construct a `PipelineContext` (with `Registry` instance) — an internal detail that should never be public. The actual useful API is `pipelineGateway()`, yet it shares module-level mutable state (`let pool`) making it untestable without `teardownWorkerPool()`.

Surface-level friction:

- `pipelineGateway` is a bare function while `createManipulationStep` + `SNAPSHOT_STEP` exports add ceremony for zero value — just let callers write `{ id: "snapshot" }`.
- `Registry.from()` accepts a loose `{fn: (...args: any[]) => any}` and casts internally — forcing consumers to squint at types.
- Two APIs doing the same thing (`Pipeline` class vs `pipelineGateway` function) with different ergonomics.

**Recommendation:** Kill `src/api/image-pipeline.ts`. Make `pipelineGateway` the single entry point. Inline the trivial helpers.

---

## 2. General Design

The **core engine is well-structured**: `runPipeline` is a pure function, double-buffering in `BufferManager` is solid, pixel fusion scheduling is a real optimization, and tiled neighborhood processing prevents OOM on large images. The three-way manipulation split (pixel/neighborhood/whole) is the right abstraction.

### Problems

| Issue | File(s) | Severity |
|-------|---------|----------|
| **Zero tests.** `vitest` is in devDeps — no test files anywhere. | — | **Critical** |
| `image-data-polyfill.ts` runs a module-level side effect. Fails in strict bundlers. Dead code for all modern browsers. | `src/core/image-data-polyfill.ts` | High |
| Worker pool is a singleton module (`let pool`, `const jobQueue`). Can't test, can't have multiple pools, can't tree-shake. | `src/api/pipeline-gateway.ts` | High |
| Worker re-creates `Registry` on every message — wasteful, prevents WASM/binary blob caching. | `src/api/pipeline-worker.ts` | Medium |
| `BufferManager.asImageData()` and `.snapshot()` are identical — dead copy-paste. | `src/core/buffer-manager.ts` | Low |
| `edge-detect.ts` has 6 manual accumulators (gxR/gyR/gxG/gyG/gxB/gyB) with copy-pasted inner loop — should loop over channels. | `src/core/manipulations/neighborhood/edge-detect.ts` | Low |
| `histogram-equalize.ts` recomputes luminance 3× per pixel (once in histogram, once in LUT scale factor, plus per-channel math). | `src/core/manipulations/whole/histogram-equalize.ts` | Low |

---

## 3. TypeScript Implementation

The **typing ambition is high** and partially pays off: `definePixel`/`defineNeighbor`/`defineWhole` factories with generics that capture the options shape, `satisfies` on the manifest, and a derived `Step` discriminated union. Solid foundation.

But it's **undermined by `as` casts everywhere**:

| File | Line | Cast | Problem |
|------|------|------|---------|
| `registry.ts` | 660 | `as ManipulationDefinition` | Static `from()` accepts loose type, immediately casts — parameter type should match |
| `fusion-scheduler.ts` | 778 | `as PixelFn` | Scheduler stores `ManipulationDefinition` — no runtime check fn is actually pixel |
| `step-dispatcher.ts` | 1058, 1079 | `as NeighborhoodFn` / `as WholeImageFn` | Blind casts based on `definition.type` — if registry returns wrong type, silent failure |
| `neighborhood-tiling.ts` | 981 | `as NeighborhoodFn` | Same pattern again |
| `pipeline-gateway.ts` | 399 | `as Step` | `createManipulationStep` constructs a partial object and casts |
| `step-dispatcher.ts` | 1025 | `as ResizeOptions` | Type erased through `getStepOptions` returning `Record<string, unknown>` |

### Type erasure

The entire options flow from the typed factory → `Step` discriminated union → `getStepOptions(step)` returns `Record<string, unknown>` → everything casts back at the call site. The generics captured by `definePixel`/`defineNeighbor`/`defineWhole` are ornamental — they survive into `ALL_MANIPULATIONS` and the `Step` type, but the runtime dispatch path erases them all.

### `NoInfer<string>` abuse

`manifest.ts:1310`: `{ id: NoInfer<string>; options?: Record<string, unknown> }`. `NoInfer` prevents inference from that position, but the catch-all is supposed to **accept** any `string` id. This will cause weird inference failures for custom steps outside the manifest. If anything the annotation should be on the built-in variants, not the catch-all.

### `ManipulationEntry` defeats the purpose

`image-pipeline.types.ts:643-648`: `fn: (...args: any[]) => any` — total type erasure, solely for the `satisfies` check on the manifest array. This nullifies the work the factories do to capture precise types.

### `PipelineConfig` — unnecessary type

A `type` with one field used by exactly one file. Two-line file (`pipeline-config.ts`) that adds abstraction without value — `MAX_PIXELS` could live next to the default.

### Other concerns

- `ManipulationDefinition.fn` is typed as `PixelFn | NeighborhoodFn | WholeImageFn` but there's no discriminated union discriminant on the function — you can't narrow it without the sibling `type` field. The `stepExecutors` map dispatches by `definition.type` but the casts are all blind.
- `skipLibCheck: true` in three tsconfigs hides issues from `@tsconfig/strictest`.
- No test tsconfig for vitest — CI may fail.

---

## Prioritized Action Items

1. **Write tests** — the absence is critical; `vitest` is already a dependency
2. **Remove dead casts** — make types flow without `as` (use type guards, discriminated unions on `ManipulationDefinition`)
3. **Remove dead code** — `image-data-polyfill.ts`, `image-pipeline.ts`, `.asImageData()`/`.snapshot()` duplication, `ManipulationEntry` type, `PipelineConfig` type
4. **Fix `NoInfer<string>`** in the `Step` type's catch-all variant
5. **Refactor worker pool** from singleton module state to instance-based (class or factory function)
6. **De-duplicate `edge-detect`** channels via a channel loop; **cache luminance** in histogram-equalize

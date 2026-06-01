Refactor the `@repo/image-pipeline` package at `/workspaces/playground/packages/image-pipeline`.

**Context:** This is an image processing engine with a core pipeline (BufferManager → FusionScheduler → step dispatcher), Web Worker offloading, and ~17 built-in manipulations. It has no tests, several `as` casts that undermine the type system, and two parallel API surfaces.

**Method:** Do ONE item from the list below, then stop and wait. Do not batch work. Do not refactor outside scope.

**Priority order (do in this sequence):**

DONE !!!1. Write tests for `src/core/buffer-manager.ts`, `src/core/fusion-scheduler.ts`, and `src/core/pipeline-runner.ts` using `vitest`. Test the core pure functions — no mocks needed.

DONE !!!2. Remove `src/core/image-data-polyfill.ts` entirely (dead code, module-level side effect, all modern browsers support ImageData).

DONE !!!3. Remove `src/api/image-pipeline.ts` (the `Pipeline` class — it's a thin wrapper duplicating `pipelineGateway` functionality). Keep only `pipelineGateway` + `teardownWorkerPool` from `pipeline-gateway.ts`.

DONE !!!4. Remove the duplicate method `BufferManager.snapshot()` or `BufferManager.asImageData()` — they are identical. Keep one.

DONE !!!5. Fix the `NoInfer<string>` on the catch-all variant of `Step` in `src/core/manipulations/manifest.ts` — the catch-all should just use `string`, not `NoInfer<string>`.

DONE !!!6. Remove the `ManipulationEntry` type from `src/core/image-pipeline.types.ts` — use the proper `ManipulationDefinition` type for the `satisfies` check instead.

DONE !!!7. Remove the `PipelineConfig` type and `defaultConfig()` from `src/core/pipeline-config.ts` — inline `MAX_PIXELS` where used.

DONE !!!8. Fix the `as` casts in `src/core/registry.ts` (line 660) — make `Registry.from()` accept `readonly ManipulationDefinition[]` instead of the loose overload.

DONE !!!9. Fix the `as ResizeOptions` cast in `src/core/step-dispatcher.ts` — pipe the generic options type through instead of erasing to `Record<string, unknown>`.

DONE !!!10. Fix the blind `as PixelFn` / `as NeighborhoodFn` / `as WholeImageFn` casts in `fusion-scheduler.ts`, `step-dispatcher.ts`, and `neighborhood-tiling.ts` — use type guards or a discriminated `ManipulationDefinition` union so casts are eliminated.

DONE !!!11. Refactor `src/api/pipeline-gateway.ts` worker pool from singleton module state to an instance-based class or factory function so it can be tested and multiple pools can coexist.

DONE !!!12. Remove duplicated channel-loop in `src/core/manipulations/neighborhood/edge-detect.ts` — iterate over 3 channels instead of 6 accumulators.

DONE !!!13. Fix luminance recomputation in `src/core/manipulations/whole/histogram-equalize.ts` — compute luminance once per pixel and reuse.

For each step: read the current file, make the change, run `pnpm --filter @repo/image-pipeline check-types` to verify, then report what you did and stop.

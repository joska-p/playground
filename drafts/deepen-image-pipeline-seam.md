# Deepen the `image-manipulator`→`image-pipeline` seam

## Problem

`image-manipulator` reaches into `image-pipeline` through **two sub-path imports**:

| Import path                            | File                                    | What it accesses                                                  |
| -------------------------------------- | --------------------------------------- | ----------------------------------------------------------------- |
| `@repo/image-pipeline/PipelineGateway` | `stores/manipulator/actions.ts:1`       | `pipelineGateway` singleton — calls `.run()`                      |
| `@repo/image-pipeline/manipulations`   | `core/manipulations/manipulations.ts:1` | `ALL_MANIPULATIONS` — filters to pixel-only, reshapes UI metadata |

This creates three concrete problems:

1. **Two paths to break.** If the internal shape of `ManipulationDefinition` or `PipelineGateway` changes, both consumer files must be updated.
2. **2/3 of pipeline capabilities invisible.** `manipulations.ts` filters to `access === 'pixel'` only. Neighborhood ops (blur, sharpen, edge-detect) and global ops (resize, flip, rotate) never reach the UI — they work in the pipeline but can't be selected.
3. **A whole consumer file exists just to reshape data.** `manipulations.ts` (40 lines) imports the full manifest, filters, maps, and rebuilds a `Record<string, {name, description, defaultArgs, argDefinitions}>`. This is a pass-through with lossy filtering.

## Design: Single facade entry point

The `image-pipeline` package's `exports` map collapses from 7 paths to 1:

```jsonc
// Before
"exports": {
  ".": "./src/App.tsx",
  "./Registry": "./src/core/registry.ts",
  "./PipelineGateway": "./src/api/pipeline-gateway.ts",
  "./usePipeline": "./src/hooks/usePipeline.ts",
  "./styles": "./src/styles/styles.css",
  "./manipulations": "./src/core/manipulations/manifest.ts",
  "./runPipeline": "./src/core/pipeline-runner.ts"
}

// After
"exports": {
  ".": "./src/api/image-pipeline.ts",
  "./styles": "./src/styles/styles.css"
}
```

### Public types

```typescript
export type ManipulationInfo = {
  readonly id: string;
  readonly access: 'pixel' | 'neighborhood' | 'global';
  readonly name: string;
  readonly description: string;
  readonly longDescription: string;
  readonly defaultArgs: Readonly<Record<string, number>>;
  readonly argDefinitions: ReadonlyArray<ArgDefinition>;
};

export type RunConfig = {
  sourceImageData: ImageData;
  steps: readonly Step[];
  maximumPixels?: number;
};
```

### Public object

```typescript
export declare const imagePipeline: {
  /** Full catalog of all manipulations, keyed by id. */
  readonly manipulations: Readonly<Record<string, ManipulationInfo>>;

  /** Filter catalog by access type for UI pickers. */
  getManipulationsByAccess(
    access: 'pixel' | 'neighborhood' | 'global'
  ): Readonly<Record<string, ManipulationInfo>>;

  /** Run steps against a source. Returns one snapshot per step. */
  run(config: RunConfig): Promise<ImageData[]>;

  /** Terminate workers. Call on app teardown. Idempotent. */
  teardown(): void;
};
```

### What the facade hides

| Hidden module                  | Responsibility                                              |
| ------------------------------ | ----------------------------------------------------------- |
| `ALL_MANIPULATIONS` (manifest) | Raw `ManipulationDefinition[]` with execute closures        |
| `Registry`                     | Lookup + validation by step id                              |
| `PipelineGateway`              | Worker pool, job queue, postMessage serialization           |
| `PipelineWorker`               | Worker self-script, inside-worker pipeline execution        |
| `PipelineRunner`               | Auto-downscale, step loop orchestration                     |
| `BufferManager`                | Double-buffering for raster processing                      |
| `FusionScheduler`              | Batch consecutive pixel ops into single pass                |
| `StepDispatcher`               | Route steps by access type (pixel/neighborhood/global)      |
| `NeighborhoodTiling`           | Tile large neighborhood ops to avoid OOM                    |
| `usePipeline` React hook       | Replaced by `imagePipeline.run()` — callers wrap themselves |

### Internal escape hatch

For tests and Node.js scenarios that need synchronous execution without workers:

```typescript
// Export from an `/internal` path — not the main entry
export { runPipeline as runPipelineSync } from '../core/pipeline-runner';
```

## Impact on `image-manipulator`

### Deleted file

`packages/image-manipulator/src/core/manipulations/manipulations.ts` — the 40-line filter-and-reshape file vanishes. Its consumers import `imagePipeline.manipulations` directly.

### Changed file

`packages/image-manipulator/src/stores/manipulator/actions.ts`:

```diff
- import { pipelineGateway } from '@repo/image-pipeline/PipelineGateway';
- import { manipulations } from '../../core/manipulations/manipulations';
+ import { imagePipeline } from '@repo/image-pipeline';

  function addWorkflowStep(id: string) {
    const { workflow } = manipulatorStore.getState();
-   const manipData = manipulations[id];
+   const entry = imagePipeline.manipulations[id];
    manipulatorStore.setState({
      workflow: [...workflow, {
        uid: crypto.randomUUID(),
        id,
-       options: { ...(manipData?.defaultArgs ?? {}) },
+       options: { ...(entry?.defaultArgs ?? {}) },
      }],
    });
  }

  async function executeWorkflow() {
    // ...
-   const results = await pipelineGateway.run({
+   const results = await imagePipeline.run({
      sourceImageData: imageSource.imageData,
      steps: workflow.map((step) => ({ id: step.id, options: step.options })),
    });
    // ...
  }
```

### Type-safe workflows

`packages/image-manipulator/src/core/workflows/workflows.ts`:

```diff
- type WorkflowPresetStep = { id: string; options: Record<string, number> };
+ import type { Step } from '@repo/image-pipeline';
+ type WorkflowPresetStep = Step;
```

Now `{ id: 'sepia', options: {} }` and `{ id: 'brightness', options: { value: 1.2 } }` are compile-time validated against the actual manifest.

## Invariants

- `manipulations` record is built once at module-load time, never mutated
- `run()` returns snapshots in step order (auto-downscale is step 0 if triggered)
- `teardown()` is idempotent; calling `run()` after teardown reinitialises the pool
- Unknown step IDs cause `run()` to reject with a typed error
- Worker serialisation copies the source `ImageData` before transferring (consumer retains their copy)

## Deletion test

If the facade were deleted, `image-manipulator` would need to re-import `PipelineGateway` and `ALL_MANIPULATIONS` separately, plus reimplement the filter-and-reshape. Complexity would reappear in two files instead of concentrating in one. This confirms the facade earns its keep.

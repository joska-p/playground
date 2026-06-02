# Image Pipeline — API Reference

## Overview

The image-pipeline package chains pixel manipulations (brightness, blur, flip, etc.) together into a pipeline and runs them, optionally off the main thread via a Web Worker pool.

### Architecture (3 operation types)

| Type | Signature | Examples |
|---|---|---|
| **pixel** | `(r, g, b, a, options) → [r, g, b, a]` | brightness, contrast, grayscale |
| **neighborhood** | `(src, dest, width, height, options) → void` | gaussian-blur, edge-detect |
| **whole** | `(imageData, options) → ImageData` | flip-horizontal, rotate-90cw |

### Two API surfaces

1. **`Pipeline`** — synchronous builder (runs on whatever thread you call it from)
2. **`pipelineGateway`** — async worker pool (offloads to a dedicated Web Worker)

---

## Types (`image-pipeline.types.ts`)

Manipulation functions now use a single **parameters object** instead of multiple positional arguments:

```typescript
type PixelParameters<Options> = {
  options: Options;
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

type NeighborhoodParameters<Options> = {
  options: Options;
  source: Uint8ClampedArray;
  destination: Uint8ClampedArray;
  width: number;
  height: number;
};

type WholeImageParameters<Options> = {
  options: Options;
  imageData: ImageData;
};

type PixelFunction<Options = any> = (parameters: PixelParameters<Options>) => [number, number, number, number];
type NeighborhoodFunction<Options = any> = (parameters: NeighborhoodParameters<Options>) => void;
type WholeImageFunction<Options = any> = (parameters: WholeImageParameters<Options>) => ImageData;
```

### Step type

The `Step` type is **derived** from the manifest (`manifest.ts`) — a typed const array of all built-in manipulations. Each known ID maps to its specific options type:

```typescript
type Step =
  | { id: "brightness"; options?: { value?: number } }
  | { id: "contrast"; options?: { value?: number } }
  | { id: "grayscale" }                              // no options field
  | { id: "resize"; options: ResizeOptions }
  | { id: "snapshot" };
```

Autocompletion works automatically when passed directly to `usePipeline` or `pipelineGateway.run` due to `const` generic parameters.

---

## `Pipeline` class (builder API)

Import: `@repo/image-pipeline/core/pipeline`

Synchronous, chainable builder. Runs inline (same thread).

```typescript
class Pipeline {
  static from(sourceImageData: ImageData, configuration?: PipelineConfiguration): Pipeline;

  resize(options: ResizeOptions): Pipeline;
  add(id: string, options?: Record<string, unknown>): Pipeline;
  snapshot(): Pipeline;
  run(): Promise<PipelineResult>;
}
```

### Usage

```typescript
import { Pipeline } from "@repo/image-pipeline/core/pipeline";

const result = await Pipeline.from(sourceImageData, { maximumPixels: 16_000_000 })
  .resize({ width: 800 })
  .add("grayscale")
  .snapshot()
  .add("gaussian-blur", { radius: 3 })
  .run();
// result.source       → original
// result.snapshots[0] → grayscale (mid-pipeline)
// result.final        → blurred grayscale
```

### Auto-downscale

If no `resize()` step is called and the source exceeds `maximumPixels`, the pipeline auto-prepends a downscale to fit within the pixel budget.

### `.snapshot()`

Captures the current buffer mid-pipeline. Useful for before/after comparisons.

---

## `pipelineGateway` (worker pool API)

Import: `@repo/image-pipeline/api/pipeline-gateway`

Async, offloads to a Web Worker. Workers are pooled (up to `min(hardwareConcurrency, 4)`).

```typescript
// Part of PipelineGateway class
run({
  sourceImageData: ImageData,
  steps: Step[],
  maximumPixels?: number
}): Promise<PipelineResult>;

teardown(): void;
```

### Usage

```typescript
import { pipelineGateway } from "@repo/image-pipeline/api/pipeline-gateway";

const result = await pipelineGateway.run({
  sourceImageData,
  steps: [
    { id: "resize", options: { width: 800 } },
    { id: "brightness", options: { value: 1.5 } },
    { id: "snapshot" },
    { id: "sharpen", options: { strength: 2 } },
  ]
});
```

### Worker pool behavior

- Workers are lazily created on first call.
- If all workers are busy, jobs are queued and dispatched as workers free up.
- Pixel buffers are **transferred** (zero-copy) via `postMessage` Transferables.
- Call `pipelineGateway.teardown()` on app unmount to terminate workers.

---

## `Registry`

Import: `@repo/image-pipeline/core/registry`

Stores and validates manipulation definitions.

```typescript
class Registry {
  static from(definitions: readonly ManipulationDefinition[]): Registry;

  register(definition: ManipulationDefinition): void;
  get(identifier: string): ManipulationDefinition;
  has(identifier: string): boolean;
  clear(): void;
}
```

### `ManipulationDefinition`

```typescript
type ManipulationDefinition<Options = any> = {
  id: string;
  options?: Options;
} & (
  | { type: "pixel"; function: PixelFunction<Options> }
  | { type: "neighborhood"; radius: number; function: NeighborhoodFunction<Options> }
  | { type: "whole"; function: WholeImageFunction<Options> }
);
```

### Factory functions

Built-in manipulations are declared via type-safe factories that capture the ID as a literal and the options shape:

```typescript
import { definePixel, defineNeighbor, defineWhole } from "@repo/image-pipeline/core/manipulation-factories";

// Pixel manipulation with typed options
definePixel({
  id: "brightness",
  execute: ({ red, green, blue, alpha, options }: PixelParameters<{ value?: number }>) => {
    const value = options.value ?? 1;
    return [red * value, green * value, blue * value, alpha];
  },
});

// Neighborhood manipulation with radius
defineNeighbor({
  id: "sharpen",
  radius: 1,
  execute: ({ source, destination, width, height, options }: NeighborhoodParameters<{ strength?: number }>) => {
    // ...
  },
});

// Whole-image transform (no options)
defineWhole({
  id: "flip-horizontal",
  execute: ({ imageData }: WholeImageParameters<Record<string, never>>) => {
    // ...
  },
});
```

These returns are collected in `ALL_MANIPULATIONS` — the single source of truth for both types and runtime registration.

---

## Steps — how to build a pipeline

```typescript
// Resize (always processed first if present)
{ id: "resize", options: { width: 400 } }

// Any registered manipulation
{ id: "brightness", options: { value: 1.5 } }

// Take a snapshot (captures current state)
{ id: "snapshot" }
```

Steps execute in order. Consecutive pixel-type operations are **fused** into a single pass (see internals).

For autocompletion and type narrowing, wrap your steps with `defineSteps`:

```typescript
import { defineSteps } from "@repo/image-pipeline/usePipeline";

const steps = defineSteps([
  { id: "brightness", options: { value: 1.5 } },
  //      ↑ autocompletes to known IDs
  //             options ↑ narrows to { value?: number }
  { id: "sharpen", options: { strength: 2 } },
  { id: "snapshot" },
]);
```

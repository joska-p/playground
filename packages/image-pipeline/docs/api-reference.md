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

Fn types are generic — the options shape is captured at definition time and used to derive the `Step` discriminated union:

```typescript
type PixelFn<O extends Record<string, unknown> = Record<string, unknown>> = (
  r: number, g: number, b: number, a: number,
  options: O
) => [number, number, number, number];

type NeighborhoodFn<O extends Record<string, unknown> = Record<string, unknown>> = (
  src: Uint8ClampedArray, dest: Uint8ClampedArray,
  width: number, height: number,
  options: O
) => void;

type WholeImageFn<O extends Record<string, unknown> = Record<string, unknown>> = (
  imageData: ImageData, options: O
) => ImageData;
```

### Step type

The `Step` type is **derived** from the manifest (`manifest.ts`) — a typed const array of all built-in manipulations. Each known ID maps to its specific options type. A `NoInfer<string>` catch-all allows custom manipulations without breaking autocompletion:

```typescript
type Step =
  | { id: "brightness"; options?: { value?: number } }
  | { id: "contrast"; options?: { value?: number } }
  | { id: "grayscale" }                              // no options field
  | { id: "resize"; options: ResizeOptions }
  | { id: "snapshot" }
  | { id: NoInfer<string>; options?: Record<string, unknown> };  // custom
```

---

## `Pipeline` class (builder API)

Import: `@repo/image-pipeline/Pipeline`

Synchronous, chainable builder. Runs inline (same thread).

```typescript
class Pipeline {
  static from(source: ImageData, context: PipelineContext): Pipeline;

  resize(options: ResizeOptions): Pipeline;
  add(id: string, options?: Record<string, unknown>): Pipeline;
  snapshot(): Pipeline;
  run(): Promise<PipelineResult>;
}
```

### Usage

```typescript
import { ALL_MANIPULATIONS } from "@repo/image-pipeline/manifest";
import { Pipeline } from "@repo/image-pipeline/Pipeline";
import { Registry } from "@repo/image-pipeline/Registry";

const registry = Registry.from(ALL_MANIPULATIONS);

const result = await Pipeline.from(imageData, { registry, maxPixels: 16_000_000 })
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

If no `resize()` step is called and the source exceeds `maxPixels`, the pipeline auto-prepends a downscale to fit within the pixel budget.

### `.snapshot()`

Captures the current buffer mid-pipeline. Useful for before/after comparisons.

---

## `pipelineGateway` (worker pool API)

Import: `@repo/image-pipeline/PipelineGateway`

Async, offloads to a Web Worker. Workers are pooled (up to `min(hardwareConcurrency, 4)`).

```typescript
function pipelineGateway(
  sourceImageData: ImageData,
  steps: Step[],
  maxPixels?: number
): Promise<PipelineResult>;

function teardownWorkerPool(): void;
```

### Usage

```typescript
import { pipelineGateway } from "@repo/image-pipeline/PipelineGateway";

const result = await pipelineGateway(imageData, [
  { id: "resize", options: { width: 800 } },
  { id: "brightness", options: { value: 1.5 } },
  { id: "snapshot" },
  { id: "sharpen", options: { strength: 2 } },
]);
```

### Worker pool behavior

- Workers are lazily created on first call.
- If all workers are busy, jobs are queued and dispatched as workers free up.
- Pixel buffers are **transferred** (zero-copy) via `postMessage` Transferables.
- Call `teardownWorkerPool()` on app unmount to terminate workers.

---

## `Registry`

Import: `@repo/image-pipeline/Registry`

Stores and validates manipulation definitions.

```typescript
class Registry {
  static from(defs: readonly ManipulationEntry[]): Registry;

  register(def: ManipulationDefinition): void;
  get(id: string): ManipulationDefinition;
  has(id: string): boolean;
  clear(): void;
}
```

### `ManipulationDefinition` / `ManipulationEntry`

```typescript
type ManipulationDefinition = {
  id: string;
  type: "pixel" | "neighborhood" | "whole";
  radius?: number;  // required for neighborhood
  fn: PixelFn | NeighborhoodFn | WholeImageFn;
};
```

- `Registry.from()` accepts the `ALL_MANIPULATIONS` manifest array or any subset.
- `get()` throws if id is not registered — guards against typos.
- Registering with an existing id logs a warning and overwrites.

### Factory functions

Built-in manipulations are declared via type-safe factories that capture the ID as a literal and the options shape:

```typescript
import { definePixel, defineNeighbor, defineWhole } from "@repo/image-pipeline/defineStep";

// Pixel manipulation with typed options
definePixel("brightness", (r, g, b, a, options: { value?: number }) => {
  const v = options.value ?? 1;
  return [r * v, g * v, b * v, a];
});

// Neighborhood manipulation with radius
defineNeighbor("sharpen", 1, (src, dest, w, h, options: { strength?: number }) => {
  // ...
});

// Whole-image transform (no options)
defineWhole("flip-horizontal", (img) => {
  // ...
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

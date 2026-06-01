# Image Pipeline — API Reference

## Overview

The image-pipeline package chains pixel manipulations (brightness, blur, flip, etc.) together into a pipeline and runs them, optionally off the main thread via a Web Worker pool.

### Architecture (3 operation types)

| Type | Signature | Examples |
|---|---|---|
| **pixel** | `(r, g, b, a, opts) → [r, g, b, a]` | brightness, contrast, grayscale |
| **neighborhood** | `(src, dest, width, height, opts) → void` | gaussian-blur, edge-detect |
| **whole** | `(imageData, opts) → ImageData` | flip-horizontal, rotate-90cw |

### Two API surfaces

1. **`Pipeline`** — synchronous builder (runs on whatever thread you call it from)
2. **`pipelineGateway`** — async worker pool (offloads to a dedicated Web Worker)

---

## Types (`types.ts`)

```typescript
type PixelFn = (
  r: number, g: number, b: number, a: number,
  opts: Record<string, unknown>
) => [number, number, number, number];

type NeighborhoodFn = (
  src: Uint8ClampedArray, dest: Uint8ClampedArray,
  width: number, height: number,
  opts: Record<string, unknown>
) => void;

type WholeImageFn = (
  imageData: ImageData, opts: Record<string, unknown>
) => ImageData;
```

### Pipeline types

```typescript
type ResizeOptions =
  | { width: number }
  | { height: number }
  | { width: number; height: number; fit?: "fill" | "cover" | "contain" }
  | { maxPixels: number };

type Step =
  | { kind: "manip"; id: string; opts: Record<string, unknown> }
  | { kind: "snapshot" };

type PipelineResult = {
  source: ImageData;   // unmodified original
  final: ImageData;    // result after all steps
  snapshots: ImageData[]; // captured at each snapshot() call
};
```

---

## `Pipeline` class (builder API)

Import: `@repo/image-pipeline/Pipeline`

Synchronous, chainable builder. Runs inline (same thread).

```typescript
class Pipeline {
  static from(source: ImageData, deps: RunPipelineDeps): Pipeline;

  resize(opts: ResizeOptions): Pipeline;
  add(id: string, opts?: Record<string, unknown>): Pipeline;
  snapshot(): Pipeline;
  run(): Promise<PipelineResult>;
}
```

### Usage

```typescript
import { Pipeline } from "@repo/image-pipeline/Pipeline";
import { Registry } from "@repo/image-pipeline/Registry";

const registry = new Registry();
// register built-in manipulations (see manipulations.md)
for (const def of PIXEL_MANIPULATIONS) registry.register(def);
for (const def of NEIGHBOR_MANIPULATIONS) registry.register(def);
for (const def of WHOLE_MANIPULATIONS) registry.register(def);

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
  { kind: "manip", id: "resize", opts: { width: 800 } },
  { kind: "manip", id: "brightness", opts: { value: 1.5 } },
  { kind: "snapshot" },
  { kind: "manip", id: "sharpen", opts: { strength: 2 } },
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
  register(def: ManipulationDefinition): void;
  get(id: string): ManipulationDefinition;
  has(id: string): boolean;
  clear(): void;
}
```

### `ManipulationDefinition`

```typescript
type ManipulationDefinition = {
  id: string;
  type: "pixel" | "neighborhood" | "whole";
  radius?: number;  // required for neighborhood
  fn: PixelFn | NeighborhoodFn | WholeImageFn;
};
```

- `get()` throws if id is not registered — guards against typos.
- Registering with an existing id logs a warning and overwrites.

---

## Steps — how to build a pipeline

```typescript
// Resize (always processed first if present)
{ kind: "manip", id: "resize", opts: { width: 400 } }

// Any registered manipulation
{ kind: "manip", id: "brightness", opts: { value: 1.5 } }

// Take a snapshot (captures current state)
{ kind: "snapshot" }
```

Steps execute in order. Consecutive pixel-type operations are **fused** into a single pass (see internals).

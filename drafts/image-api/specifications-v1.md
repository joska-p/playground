# Image Pipeline — API Specification

A TypeScript-first, browser-based image manipulation library. You register manipulations, build a pipeline from them, and get back a result your app can use however it needs.

---

## Vocabulary

| Term             | Meaning                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| **Manipulation** | A single image operation. Lives in its own file. Registered once at app startup.                        |
| **Pipeline**     | The fluent builder. Holds an ordered list of manipulation IDs and executes them.                        |
| **Workflow**     | An app-level concept — an array of manipulation IDs stored in your app state. Not part of this library. |
| **Result**       | What `.run()` returns: `{ final, snapshots }`. Your app decides what to do with it.                     |

---

## Design principles

- **Declarative and linear.** You describe a sequence of manipulations, then execute. No branches, no conditionals.
- **Explicit snapshots.** Intermediate `ImageData` captures happen only where you ask for them. Memory cost is visible and intentional.
- **Fusion-aware runtime.** Consecutive pixel-local manipulations are merged into a single pixel loop automatically. Neighborhood and whole-image manipulations act as flush barriers.
- **Ping-pong buffers.** Two internal `Uint8ClampedArray` buffers are swapped between stages to avoid redundant allocations.
- **Safe by default.** Images above a configurable pixel threshold are tiled to avoid crashing the browser.
- **No built-ins.** The library ships with zero manipulations. You register everything.

---

## Quick start

```ts
import { Pipeline } from "./pipeline";
import "./manipulations/brightness"; // registers on import
import "./manipulations/sepia";

const result = await Pipeline.from(imageData)
  .resize({ maxPixels: 4_000_000 })
  .add("brightness", { value: 1.2 })
  .snapshot()
  .add("sepia")
  .run();

result.final; // ImageData — the finished image
result.snapshots; // ImageData[] — one entry per .snapshot() call, in order
```

Feeding a workflow from your app state:

```ts
const workflowIds = ["brightness", "sepia", "grayscale"]; // stored in your app

const pipeline = Pipeline.from(imageData);
workflowIds.forEach((id) => pipeline.add(id));
const result = await pipeline.run();
```

---

## API

### `Pipeline.from(source)`

Creates a new pipeline from a browser `ImageData` object. The source is never mutated.

```ts
Pipeline.from(source: ImageData): Pipeline
```

---

### `.resize(opts)`

Constrains the image dimensions before any manipulation runs. Always executes first regardless of where it appears in the chain. Its main purpose is to prevent large uploads from crashing the browser tab.

```ts
pipeline.resize(opts: ResizeOptions): Pipeline

type ResizeOptions =
  | { width: number }                                                   // proportional to width
  | { height: number }                                                  // proportional to height
  | { width: number; height: number; fit?: 'fill' | 'cover' | 'contain' }
  | { maxPixels: number }                                               // shrink until w × h ≤ threshold
```

Uses bilinear interpolation. If the image already fits, this is a no-op.

---

### `.add(id, opts?)`

Appends a registered manipulation to the pipeline by ID.

```ts
pipeline.add(id: string, opts?: Record<string, unknown>): Pipeline
```

The runtime resolves fusion automatically based on the manipulation's declared type. You never need to think about it — just add manipulations in the order you want them applied.

---

### `.snapshot()`

Inserts an explicit capture point. After this stage completes, the current pixel state is copied into `result.snapshots` (in order of insertion).

```ts
pipeline.snapshot(): Pipeline
```

Each snapshot is a memory allocation. Use them deliberately.

A snapshot between two pixel-local manipulations does not break fusion — the runtime captures after the fused pass completes, without splitting it.

---

### `.run()`

Executes the pipeline and resolves with the result.

```ts
pipeline.run(): Promise<PipelineResult>

interface PipelineResult {
  final: ImageData
  snapshots: ImageData[]   // one per .snapshot() call, in insertion order; empty if none
}
```

---

## Manipulation registration

Each manipulation lives in its own file and registers itself on import. The registry is a global singleton.

```ts
// manipulations/brightness.ts
import { registerManipulation } from "../pipeline";

registerManipulation({
  id: "brightness",
  type: "pixel",
  fn: (r, g, b, a, opts) => {
    const v = opts.value ?? 1;
    return [r * v, g * v, b * v, a];
  },
});
```

```ts
// manipulations/gaussian-blur.ts
import { registerManipulation } from "../pipeline";

registerManipulation({
  id: "gaussian-blur",
  type: "neighborhood",
  radius: 1,
  fn: (src, dest, width, height, opts) => {
    // convolution implementation
  },
});
```

### Manipulation types

| Type             | When to use                                                  | Fusion behaviour                                      |
| ---------------- | ------------------------------------------------------------ | ----------------------------------------------------- |
| `'pixel'`        | Output depends only on the current pixel                     | Fused with adjacent pixel manipulations into one loop |
| `'neighborhood'` | Output depends on surrounding pixels (blur, sharpen, edge)   | Flushes the fused batch; runs as its own stage        |
| `'whole'`        | Needs the entire image at once (histogram, global transform) | Flushes the fused batch; runs as its own stage        |

### Callback signatures

```ts
// pixel — return new [r, g, b, a] for this pixel
type PixelFn = (
  r: number,
  g: number,
  b: number,
  a: number,
  opts: Record<string, unknown>
) => [number, number, number, number];

// neighborhood — write into dest, read from src
type NeighborhoodFn = (
  src: Uint8ClampedArray,
  dest: Uint8ClampedArray,
  width: number,
  height: number,
  opts: Record<string, unknown>
) => void;

// whole-image — receive and return full ImageData
type WholeImageFn = (imageData: ImageData, opts: Record<string, unknown>) => ImageData;
```

---

## TypeScript types (summary)

```ts
interface Pipeline {
  resize(opts: ResizeOptions): Pipeline;
  add(id: string, opts?: Record<string, unknown>): Pipeline;
  snapshot(): Pipeline;
  run(): Promise<PipelineResult>;
}

interface PipelineResult {
  final: ImageData;
  snapshots: ImageData[];
}

interface ManipulationDefinition {
  id: string;
  type: "pixel" | "neighborhood" | "whole";
  radius?: number; // required when type is 'neighborhood'
  fn: PixelFn | NeighborhoodFn | WholeImageFn;
}

function registerManipulation(def: ManipulationDefinition): void;
function setConfig(config: Partial<PipelineConfig>): void;

interface PipelineConfig {
  maxPixels: number; // default: 16_000_000
}
```

---

## Memory and tiling

The runtime keeps two internal `Uint8ClampedArray` buffers that are swapped between stages (ping-pong). New `ImageData` objects are only allocated for snapshots and the final result.

If the source image exceeds `maxPixels` (default `16_000_000`, roughly 4000×4000), the runtime tiles the image automatically, processes tiles independently, then reassembles. Neighborhood manipulations receive tiles padded with a halo equal to their `radius` to avoid seam artifacts.

```ts
import { setConfig } from "./pipeline";
setConfig({ maxPixels: 8_000_000 });
```

---

## Fusion — internal behaviour

At `.run()` time the runtime scans the step list and groups it into stages:

1. Accumulate pixel manipulations into a **fused batch**.
2. On hitting a neighborhood or whole-image manipulation, flush the batch (one pixel loop for all accumulated manipulations), then run the barrier manipulation as its own stage.
3. Resume accumulating.

Snapshots are captured at stage boundaries and do not break fusion.

Example — chain `brightness → contrast → snapshot() → gaussian-blur → sepia → invert`:

```
Stage 1 (fused): brightness + contrast  →  snapshot captured here
Stage 2:         gaussian-blur           (neighborhood barrier)
Stage 3 (fused): sepia + invert
```

---

## What this library is not

- No built-in manipulations — register everything yourself.
- No worker-based parallelism (single-threaded; tile architecture is ready for it later).
- No conditional branching in pipelines.
- No app state — workflows, outputs arrays, and source image management are your concern.
- No network I/O or file system access; operates on `ImageData` only.

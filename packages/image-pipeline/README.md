# @repo/image-pipeline

> TypeScript-first, browser-based image manipulation pipeline. Zero external image-processing dependencies.

## Quick Start

```bash
pnpm add @repo/image-pipeline
```

```typescript
import { runPipeline, Registry } from '@repo/image-pipeline';
import { ALL_MANIPULATIONS } from '@repo/image-pipeline/manipulations';

const registry = Registry.from(ALL_MANIPULATIONS);
const snapshots = await runPipeline(
  imageData,
  [{ id: 'grayscale' }, { id: 'brightness', options: { factor: 1.3 } }],
  { registry }
);
// snapshots[0] = grayscale result, snapshots[1] = brightness result
```

## Architecture

```
runPipeline(source, steps, context)
  │
  ├─ Auto-downscale (if source exceeds maximumPixels)
  ├─ BufferManager (double-buffered Uint8ClampedArray)
  ├─ FusionScheduler (batches consecutive pixel ops)
  │
  └─ For each step:
       ├─ pixel       → queue in FusionScheduler (deferred)
       ├─ neighborhood → flush scheduler → run convolution
       │                   └─ Tiling for large images (512×512 tiles + halo)
       └─ global      → flush scheduler → run transform function
            └─ Return: step snapshots (source excluded — caller manages it)
```

## Step Types

| Type           | Description                 | Examples                                | Execution                               |
| -------------- | --------------------------- | --------------------------------------- | --------------------------------------- |
| `pixel`        | Per-pixel transformation    | brightness, contrast, grayscale         | Fused — single pass over all pixels     |
| `neighborhood` | Convolution or buffer remap | gaussian-blur, sharpen, flip-h, flip-v  | Immediate, uses tiling for large images |
| `global`       | Geometry-changing transform | resize, rotate-90cw, histogram-equalize | Immediate                               |

## Built-in Manipulations

### Pixel operations (9)

| ID           | Factory         | Options                     |
| ------------ | --------------- | --------------------------- |
| `brightness` | `defineManip()` | `value: number` (0–3)       |
| `contrast`   | `defineManip()` | `value: number` (0–3)       |
| `grayscale`  | `defineManip()` | —                           |
| `sepia`      | `defineManip()` | —                           |
| `invert`     | `defineManip()` | —                           |
| `saturation` | `defineManip()` | `value: number` (0–3)       |
| `hue-rotate` | `defineManip()` | `degrees: number` (0–360)   |
| `opacity`    | `defineManip()` | `value: number` (0–1)       |
| `threshold`  | `defineManip()` | `threshold: number` (0–255) |

### Neighborhood operations (6)

| ID                | Factory         | Radius | Options                  |
| ----------------- | --------------- | ------ | ------------------------ |
| `gaussian-blur`   | `defineManip()` | 3      | `radius: number` (1–10)  |
| `box-blur`        | `defineManip()` | 2      | `radius: number` (1–10)  |
| `sharpen`         | `defineManip()` | 1      | `strength: number` (0–5) |
| `edge-detect`     | `defineManip()` | 1      | —                        |
| `flip-horizontal` | `defineManip()` | 0      | —                        |
| `flip-vertical`   | `defineManip()` | 0      | —                        |

### Global operations (3)

| ID                   | Factory         | Options                                                              |
| -------------------- | --------------- | -------------------------------------------------------------------- |
| `resize`             | `defineManip()` | `width: number`, `height: number`, `fit: "fill"\|"cover"\|"contain"` |
| `rotate-90cw`        | `defineManip()` | —                                                                    |
| `histogram-equalize` | `defineManip()` | —                                                                    |

## Fusion Optimization

Consecutive pixel-type operations are automatically fused into a single pass:

```typescript
// These 3 operations run in ONE pixel loop:
const result = await runPipeline(
  source,
  [
    { id: 'grayscale' },
    { id: 'brightness', options: { factor: 1.2 } },
    { id: 'contrast', options: { factor: 1.1 } },
  ],
  { registry }
); // still produces 3 intermediate snapshots
```

The `FusionScheduler` queues pixel ops and applies them per-pixel when flushed. Neighborhood and global ops flush the scheduler before executing.

## Tiling for Large Images

Neighborhood (convolution) operations on large images are split into 512×512 tiles with a halo border matching the kernel radius. Each tile is processed independently, then non-halo regions are blitted back. This keeps peak memory proportional to tile size rather than full image size:

```
W×H image → split into (512+2r)² tiles → convolve per tile → blit non-halo regions
```

## Web Worker Support

The `PipelineGateway` manages a pool of Web Workers for off-thread execution:

```typescript
import { pipelineGateway } from '@repo/image-pipeline/PipelineGateway';

// Automatically uses up to navigator.hardwareConcurrency workers
const result = await pipelineGateway.run({ sourceImageData: imageData, steps });
```

- Lazy-creates up to `min(hardwareConcurrency, 4)` workers
- FIFO queue when all workers are busy
- Uses `Transferable` buffers for zero-copy memory transfer
- Workers are stateless (registry rebuilt per invocation)

## Exports

| Export              | Path                                   | Description                                       |
| ------------------- | -------------------------------------- | ------------------------------------------------- |
| `Registry`          | `@repo/image-pipeline/Registry`        | Manipulation registry (register, get, has, clear) |
| `PipelineGateway`   | `@repo/image-pipeline/PipelineGateway` | Web Worker pool manager (singleton)               |
| `usePipeline`       | `@repo/image-pipeline/usePipeline`     | React hook wrapping pipeline gateway              |
| `PipelineDocs`      | `@repo/image-pipeline/PipelineDocs`    | Interactive docs UI component                     |
| `runPipeline`       | `@repo/image-pipeline/runPipeline`     | Core pipeline orchestrator                        |
| `ALL_MANIPULATIONS` | `@repo/image-pipeline/manipulations`   | All built-in manipulation definitions             |
| `./styles`          | `@repo/image-pipeline/styles`          | Component CSS                                     |

## React Hook

```typescript
import { usePipeline } from "@repo/image-pipeline";

function Editor({ source }: { source: ImageData | null }) {
  const steps = [{ id: "grayscale" }, { id: "sharpen" }];
  const result = usePipeline(source, steps); // ImageData[] | null

  return <img src={imageDataToUrl(result?.[0])} />;
}
```

Returns `null` while processing. Cancellation-safe — aborts on unmount or dependency change.

---

_Part of [Creative Playground](https://playground-beryl-omega.vercel.app)_

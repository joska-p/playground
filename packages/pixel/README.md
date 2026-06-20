# @repo/pixel

> TypeScript-first, browser-based image manipulation pipeline. Zero external image-processing dependencies.

## Quick Start

```bash
pnpm add @repo/pixel
```

```typescript
import { pixel } from '@repo/pixel';

const results = await pixel.run({
  sourceImageData: imageData,
  steps: [{ id: 'grayscale' }, { id: 'brightness', options: { value: 1.3 } }]
});
// results[0] = grayscale, results[1] = brightness
```

## Usage

### Run a pipeline

```typescript
import { pixel } from '@repo/pixel';

const snapshots = await pixel.run({
  sourceImageData: imageData,
  steps: [{ id: 'sepia' }, { id: 'brightness', options: { value: 1.2 } }]
});
```

Returns one `ImageData` snapshot per step. Work is dispatched to a Web Worker pool (up to `hardwareConcurrency` workers). If all workers are busy the job is queued.

### Browse available manipulations

```typescript
import { pixel } from '@repo/pixel';

// All manipulations (pixel, neighborhood, global)
pixel.manipulations;

// Filter by access type
pixel.getManipulationsByAccess('pixel');
pixel.getManipulationsByAccess('neighborhood');
pixel.getManipulationsByAccess('global');
```

### Compile-time-safe steps

The `Step` type is derived from the manifest — invalid step IDs and option shapes are caught at compile time:

```typescript
import type { Step } from '@repo/pixel';

const preset: Step = { id: 'brightness', options: { value: 1.2 } }; // OK
const bad: Step = { id: 'brightness', options: { wrong: 1.2 } }; // type error
```

### Teardown

```typescript
import { pixel } from '@repo/pixel';

// On app teardown — terminates workers and clears queue
pixel.teardown();
```

## Architecture

```
pixel.run(config)
  │
  ├─ Web Worker pool (lazy, up to hardwareConcurrency)
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

Everything below `pixel.run()` is an implementation detail — the `WorkerPool`, registry, buffer manager, and fusion scheduler are hidden behind the facade.

## Step Types

| Type           | Description                 | Examples                                | Execution                               |
| -------------- | --------------------------- | --------------------------------------- | --------------------------------------- |
| `pixel`        | Per-pixel transformation    | brightness, contrast, grayscale         | Fused — single pass over all pixels     |
| `neighborhood` | Convolution or buffer remap | gaussian-blur, sharpen, flip-h, flip-v  | Immediate, uses tiling for large images |
| `global`       | Geometry-changing transform | resize, rotate-90cw, histogram-equalize | Immediate                               |

## Built-in Manipulations

### Pixel operations (9)

| ID           | Options                     |
| ------------ | --------------------------- |
| `brightness` | `value: number` (0–3)       |
| `contrast`   | `value: number` (0–3)       |
| `grayscale`  | —                           |
| `sepia`      | —                           |
| `invert`     | —                           |
| `saturation` | `value: number` (0–3)       |
| `hue-rotate` | `degrees: number` (0–360)   |
| `opacity`    | `value: number` (0–1)       |
| `threshold`  | `threshold: number` (0–255) |

### Neighborhood operations (6)

| ID                | Radius | Options                  |
| ----------------- | ------ | ------------------------ |
| `gaussian-blur`   | 3      | `radius: number` (1–10)  |
| `box-blur`        | 2      | `radius: number` (1–10)  |
| `sharpen`         | 1      | `strength: number` (0–5) |
| `edge-detect`     | 1      | —                        |
| `flip-horizontal` | 0      | —                        |
| `flip-vertical`   | 0      | —                        |

### Global operations (3)

| ID                   | Options                                                              |
| -------------------- | -------------------------------------------------------------------- |
| `resize`             | `width: number`, `height: number`, `fit: "fill"\|"cover"\|"contain"` |
| `rotate-90cw`        | —                                                                    |
| `histogram-equalize` | —                                                                    |

## Fusion Optimization

Consecutive pixel-type operations are automatically fused into a single pass:

```typescript
import { pixel } from '@repo/pixel';

// These 3 operations run in ONE pixel loop:
const result = await pixel.run({
  sourceImageData: source,
  steps: [
    { id: 'grayscale' },
    { id: 'brightness', options: { value: 1.2 } },
    { id: 'contrast', options: { value: 1.1 } }
  ]
}); // still produces 3 intermediate snapshots
```

The `FusionScheduler` queues pixel ops and applies them per-pixel when flushed. Neighborhood and global ops flush the scheduler before executing.

## Tiling for Large Images

Neighborhood (convolution) operations on large images are split into 512×512 tiles with a halo border matching the kernel radius. Each tile is processed independently, then non-halo regions are blitted back. This keeps peak memory proportional to tile size rather than full image size:

```
W×H image → split into (512+2r)² tiles → convolve per tile → blit non-halo regions
```

## Web Worker Support

The `pixel.run()` method automatically uses a pool of Web Workers (via `@repo/worker-pool`) for off-thread execution:

- Lazy-creates up to `hardwareConcurrency` workers
- FIFO queue when all workers are busy
- Uses `Transferable` buffers for zero-copy memory transfer
- Workers are stateless (registry rebuilt per invocation)
- Call `pixel.teardown()` on app shutdown

## Single Entry Point

The package exports a single entry — no sub-path imports:

```
@repo/pixel   →   pixel facade + types
```

Previously exposed sub-paths (`/Registry`, `/PipelineGateway`, `/manipulations`, `/runPipeline`, `/usePipeline`) have been replaced by the `pixel` facade. The hand-rolled `PipelineGateway` has been replaced with `@repo/worker-pool`'s `WorkerPool`.

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_

# Image Pipeline — Internals

## Execution Engine (`run/`)

### Pipeline execution flow

```
runPipeline({ source, steps, context })
  │
  ├── BufferManager(source)     ← double-buffered pixel arrays
  ├── FusionScheduler()         ← fuses consecutive pixel ops
  │
  └── for each step:
        ├── "snapshot"  → flush scheduler, clone buffer, store
        └── "manip"     → dispatchStep({ step, context, bufferManager, scheduler })
                            │
                            ├── resize    → computeTargetDimensions() + resizeImageData()
                            ├── pixel     → FusionScheduler.add() (deferred)
                            ├── neighbor  → flush scheduler, run convolution
                            │               (tiled if image > maximumPixels)
                            └── whole     → flush scheduler, run transform
  │
  └── final flush
  └── return { source, final, snapshots }
```

---

### BufferManager (`buffer-manager.ts`)

Double-buffering avoids allocating a new array for every pixel operation.

```
buffers: [Uint8ClampedArray, Uint8ClampedArray]
pointer: 0 │ 1

  "current" = buffers[pointer]
  "other"   = buffers[1 - pointer]
```

- On construction: `buffers[0]` = copy of source data, `buffers[1]` = empty (same length).
- **`swap()`** flips `pointer` (O(1)). Used after each pixel/neighborhood pass.
- **`snapshot()`** clones `current` into a new `ImageData`.
- **`replaceWith(imageData)`** resets both buffers to new dimensions. Used when resize or whole-image ops change the image geometry.

---

### FusionScheduler (`fusion-scheduler.ts`)

Consecutive **pixel-type** steps are fused into a single pixel loop to avoid N full-image passes.

```typescript
class FusionScheduler {
  private batch: Array<{ definition, options }> = [];

  add(definition, options): void        // queue a pixel op
  flush(bufferManager): void           // run all queued ops in one pass
}
```

How it works:

```
For each pixel (i = 0 .. pixelCount-1):
  red,green,blue,alpha = current[i]
  for each (definition, options) in batch:
    [red,green,blue,alpha] = definition.function({ red, green, blue, alpha, options })
  other[i] = clamp(red,green,blue,alpha)
swap()
```

Non-pixel operations (neighborhood, whole, resize, snapshot) force a `flush()` before executing, ensuring pending pixel ops are applied first.

---

### Step Dispatcher (`step-dispatcher.ts`)

Routes each step to the correct handler:

1. **`id === "resize"`** — not in registry; handled inline.
2. **`definition.type === "pixel"`** — enqueue in scheduler.
3. **`definition.type === "neighborhood"`** — flush scheduler, then run convolution. If image pixel count > `maximumPixels`, use tiled path.
4. **`definition.type === "whole"`** — flush scheduler, then run the whole-image function.

---

### Tiling (`neighborhood-tiling.ts`)

Large neighborhood operations are **tiled** to avoid allocating full-size temporary buffers.

```
TILE_SIZE = 512 pixels per edge

For each tile (tileX, tileY, tileWidth, tileHeight):
  ┌────────────────────────┐
  │  extractTile({ imageData, tileX, tileY, tileWidth, tileHeight, halo })    ← includes halo border
  │  run convolution on tile (with halo)                                      ← process independently
  │  blitTile({ destination, tile, tileX, tileY, tileWidth, tileHeight, halo }) ← write center region only
  └────────────────────────┘
```

- **Halo** = `definition.radius` (extra pixels around each tile so edge pixels have neighbors).
- **`extractTile`** — copies a padded region from source, clamped to image bounds.
- **`blitTile`** — copies only the non-halo (center) region back to the destination.

This means the convolution result is identical to running it on the full image, but peak memory is `(TILE_SIZE + 2*halo)^2` instead of `(width * height)`.

---

### Resize (`image-resize.ts`)

**Bilinear interpolation** — for each output pixel, samples the 4 nearest source pixels and interpolates.

```
sourceX = x * (sourceWidth / targetWidth)
sourceY = y * (sourceHeight / targetHeight)

x0 = floor(sourceX), x1 = min(x0+1, sourceWidth-1)
y0 = floor(sourceY), y1 = min(y0+1, sourceHeight-1)

top    = source[x0,y0] * (1 - xFraction) + source[x1,y0] * xFraction
bottom = source[x0,y1] * (1 - xFraction) + source[x1,y1] * xFraction
destination = top * (1 - yFraction) + bottom * yFraction
```

**`computeTargetDimensions`** resolves a `ResizeOptions` to pixel dimensions:

| Case | Result |
|---|---|
| `maximumPixels` | Scale to fit pixel budget, maintain aspect ratio |
| `width + height + "fill"` | Exact dimensions (stretch) |
| `width + height + "contain"` | Fit within bounds, aspect-ratio-preserved |
| `width + height + "cover"` | Fill bounds, aspect-ratio-preserved (crops) |
| `width` only | Scale proportionally by width |
| `height` only | Scale proportionally by height |

Returns `null` (no resize needed) if target dimensions match source.

---

## Worker Architecture (`api/`)

### pipeline-worker.ts

Entry point for the Web Worker. Each message receives `{sourceImageData, steps, maximumPixels}`.

```
message handler:
  Registry.from(ALL_MANIPULATIONS)   ← populates from manifest
  runPipeline({ sourceImageData, steps, context: { registry, maximumPixels } })
  postMessage(pipelineResult, { transfer: [all pixel buffers] })
```

The worker is **stateless** — it rebuilds the registry per message. This is safe and avoids stale state.

### pipeline-gateway.ts

Main-thread worker pool manager.

```
Pool: up to min(hardwareConcurrency, 4) workers.
Queue: FIFO queue for overflow when all workers busy.

pipelineGateway.run({ sourceImageData, steps, maximumPixels }):
  find idle worker
    ├── found → dispatch(poolEntry, ...)
    └── none  → push to jobQueue

dispatch(poolEntry, ...):
  poolEntry.worker.postMessage(transferables)     ← zero-copy via Transferable
  on message → resolve(result), mark worker idle, drainQueue()
  on error   → reject(error), mark worker idle, drainQueue()

teardown():
  terminate all workers
  clear queue
```

**Transferable optimization**: The source `ImageData`'s `ArrayBuffer` is transferred to the worker via `postMessage`'s second argument `[imageDataCopy.data.buffer]`. After transfer, the main thread's buffer is neutered (zero-length). The worker creates a copy internally before posting if needed, and the result buffers are transferred back.

---

## Configuration

```typescript
export const DEFAULT_MAXIMUM_PIXELS = 16_000_000;  // ~16 megapixel default cap
```

This limit is enforced in:
- `runPipeline()` — auto-prepends a downscale if source exceeds maximumPixels
- `runNeighborhoodTiled()` — triggers tiled path if image > maximumPixels

---

## Data flow summary

```
              Pipeline (builder)
                   │
          .run()  calls
                   ▼
         runPipeline()  ── OR ──►  pipelineGateway()
      (synchronous)              (offloads to worker)
                   │                     │
                   ▼                     ▼
      BufferManager + FusionScheduler   Worker: same logic
                   │
                   ▼
         dispatchStep()
              │
              ├─ resize → compute + bilinear interpolation
              ├─ pixel  → FusionScheduler (fused batch)
              ├─ neighborhood → convolution (tiled if > maximumPixels)
              └─ whole  → single-pass transform
              │
              ▼
         PipelineResult { source, final, snapshots }
```

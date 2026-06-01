# Image Pipeline — Internals

## Execution Engine (`run/`)

### Pipeline execution flow

```
runPipeline(source, steps, deps)
  │
  ├── BufferManager(source)     ← double-buffered pixel arrays
  ├── FusionScheduler()         ← fuses consecutive pixel ops
  │
  └── for each step:
        ├── "snapshot"  → flush scheduler, clone buffer, store
        └── "manip"     → dispatchStep(step)
                            │
                            ├── resize    → computeTargetDimensions() + resizeImageData()
                            ├── pixel     → FusionScheduler.add() (deferred)
                            ├── neighbor  → flush scheduler, run convolution
                            │               (tiled if image > maxPixels)
                            └── whole     → flush scheduler, run transform
  │
  └── final flush
  └── return { source, final, snapshots }
```

---

### BufferManager (`buffer-manager.ts`)

Double-buffering avoids allocating a new array for every pixel operation.

```
bufs: [Uint8ClampedArray, Uint8ClampedArray]
ptr: 0 │ 1

  "current" = bufs[ptr]
  "other"   = bufs[1 - ptr]
```

- On construction: `bufs[0]` = copy of source data, `bufs[1]` = empty (same length).
- **`swap()`** flips `ptr` (O(1)). Used after each pixel/neighborhood pass.
- **`snapshot()`** clones `current` into a new `ImageData`.
- **`replaceWith(img)`** resets both buffers to new dimensions. Used when resize or whole-image ops change the image geometry.

---

### FusionScheduler (`fusion-scheduler.ts`)

Consecutive **pixel-type** steps are fused into a single pixel loop to avoid N full-image passes.

```typescript
class FusionScheduler {
  private batch: Array<{ def, opts }> = [];

  add(def, opts): void        // queue a pixel op
  flush(manager): void         // run all queued ops in one pass
}
```

How it works:

```
For each pixel (i = 0 .. pixelCount-1):
  r,g,b,a = src[i]
  for each (def, opts) in batch:
    [r,g,b,a] = def.fn(r, g, b, a, opts)
  dest[i] = clamp(r,g,b,a)
swap()
```

Non-pixel operations (neighborhood, whole, resize, snapshot) force a `flush()` before executing, ensuring pending pixel ops are applied first.

---

### Step Dispatcher (`step-dispatcher.ts`)

Routes each step to the correct handler:

1. **`id === "resize"`** — not in registry; handled inline.
2. **`def.type === "pixel"`** — enqueue in scheduler.
3. **`def.type === "neighborhood"`** — flush scheduler, then run convolution. If image pixel count > `maxPixels`, use tiled path.
4. **`def.type === "whole"`** — flush scheduler, then run the whole-image function.

---

### Tiling (`tiling.ts`)

Large neighborhood operations are **tiled** to avoid allocating full-size temporary buffers.

```
TILE_SIZE = 512 pixels per edge

For each tile (tx, ty, tw, th):
  ┌────────────────────────┐
  │  extractTile(src, tx,ty,tw,th, halo)    ← includes halo border
  │  run convolution on tile (with halo)     ← process independently
  │  blitTile(dest, tileOut, tx,ty,tw,th, halo)  ← write center region only
  └────────────────────────┘
```

- **Halo** = `def.radius` (extra pixels around each tile so edge pixels have neighbors).
- **`extractTile`** — copies a padded region from source, clamped to image bounds.
- **`blitTile`** — copies only the non-halo (center) region back to the destination.

This means the convolution result is identical to running it on the full image, but peak memory is `(TILE_SIZE + 2*halo)^2` instead of `(width * height)`.

---

### Resize (`resize.ts`)

**Bilinear interpolation** — for each output pixel, samples the 4 nearest source pixels and interpolates.

```
srcX = x * (srcW / targetW)
srcY = y * (srcH / targetH)

x0 = floor(srcX), x1 = min(x0+1, srcW-1)
y0 = floor(srcY), y1 = min(y0+1, srcH-1)

top    = src[x0,y0] * (1 - xFrac) + src[x1,y0] * xFrac
bottom = src[x0,y1] * (1 - xFrac) + src[x1,y1] * xFrac
dest   = top * (1 - yFrac) + bottom * yFrac
```

**`computeTargetDimensions`** resolves a `ResizeOptions` to pixel dimensions:

| Case | Result |
|---|---|
| `maxPixels` | Scale to fit pixel budget, maintain aspect ratio |
| `width + height + "fill"` | Exact dimensions (stretch) |
| `width + height + "contain"` | Fit within bounds, aspect-ratio-preserved |
| `width + height + "cover"` | Fill bounds, aspect-ratio-preserved (crops) |
| `width` only | Scale proportionally by width |
| `height` only | Scale proportionally by height |

Returns `null` (no resize needed) if target dimensions match source.

---

## Worker Architecture (`api/`)

### pipeline.worker.ts

Entry point for the Web Worker. Each message receives `{sourceData, steps, maxPixels}`.

```
message handler:
  create fresh Registry
  register all built-in manipulations (pixel + neighborhood + whole)
  runPipeline(sourceData, steps, { registry, maxPixels })
  postMessage(result, { transfer: [all pixel buffers] })
```

The worker is **stateless** — it rebuilds the registry per message. This is safe and avoids stale state.

### pipeline-gateway.ts

Main-thread worker pool manager.

```
Pool: up to min(hardwareConcurrency, 4) workers.
Queue: FIFO queue for overflow when all workers busy.

pipelineGateway(imageData, steps, maxPixels):
  find idle worker
    ├── found → dispatch(worker, ...)
    └── none  → push to jobQueue

dispatch(worker, ...):
  worker.postMessage(transferables)     ← zero-copy via Transferable
  on message → resolve(result), mark worker idle, drainQueue()
  on error   → reject(error), mark worker idle, drainQueue()

teardownWorkerPool():
  terminate all workers
  clear queue
```

**Transferable optimization**: The source `ImageData`'s `ArrayBuffer` is transferred to the worker via `postMessage`'s second argument `[imageDataCopy.data.buffer]`. After transfer, the main thread's buffer is neutered (zero-length). The worker creates a copy internally before posting if needed, and the result buffers are transferred back.

---

## Polyfill (`polyfill.ts`)

If `ImageData` is not defined globally (e.g. Node.js or some worker environments), a minimal polyfill is installed:

```typescript
class ImageDataPolyfill {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}
```

Constructor accepts either `(width, height)` or `(Uint8ClampedArray, width, height)` — matching the native `ImageData` API.

---

## Configuration (`config.ts`)

```typescript
export const MAX_PIXELS = 16_000_000;  // ~16 megapixel default cap

export function defaultConfig(): PipelineConfig {
  return { maxPixels: MAX_PIXELS };
}
```

This limit is enforced in:
- `Pipeline.run()` — auto-prepends a downscale if source exceeds maxPixels
- `runNeighborhoodTiled()` — triggers tiled path if image > maxPixels

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
              ├─ neighborhood → convolution (tiled if > maxPixels)
              └─ whole  → single-pass transform
              │
              ▼
         PipelineResult { source, final, snapshots }
```

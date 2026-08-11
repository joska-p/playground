---
title: 'Pixel'
coordinates: '/algorithms/visuals'
status: 'Active'
date_discovered: 2024-01-15
---

# @repo/pixel

> A pipeline that translates raw pixel data through chains of transforms, each
> step breathing a new visual texture into the image.

---

## Essence

Pixel is a TypeScript-native image manipulation engine that runs entirely in the
browser. It gives you a declarative pipeline: declare the steps, hand over an
`ImageData`, and watch it pass through a choreography of per-pixel fusions,
neighborhood convolutions, and geometry-bending global transforms — all
orchestrated across a Web Worker pool without touching a single line of
off-thread code.

The goal is simple: zero external image-processing dependencies, full
compile-time safety on every step and option shape, and a single facade that
hides the machinery of worker pools, buffer management, and fusion scheduling.

## Quick Launch

```bash
pnpm dev --filter @repo/playground
```

Or install it into your own project:

```bash
pnpm add @repo/pixel
```

```typescript
import { pixel } from '@repo/pixel/api/pixel';

const results = await pixel.run({
    sourceImageData: imageData,
    steps: [{ id: 'grayscale' }, { id: 'brightness', options: { value: 1.3 } }]
});
// results[0] = grayscale, results[1] = brightness
```

## Usage Examples

### Run a pipeline

```typescript
import { pixel } from '@repo/pixel/api/pixel';

const snapshots = await pixel.run({
    sourceImageData: imageData,
    steps: [{ id: 'sepia' }, { id: 'brightness', options: { value: 1.2 } }]
});
```

Returns one `ImageData` snapshot per step. Work is dispatched to a Web Worker
pool (up to `hardwareConcurrency` workers). If all workers are busy the job is
queued.

### Browse available manipulations

```typescript
import { pixel } from '@repo/pixel/api/pixel';

// All manipulations (pixel, neighborhood, global)
pixel.manipulations;

// Filter by access type
pixel.getManipulationsByAccess('pixel');
pixel.getManipulationsByAccess('neighborhood');
pixel.getManipulationsByAccess('global');
```

### Compile-time-safe steps

The `Step` type is derived from the manipulation manifest — invalid step IDs and
option shapes are caught at compile time:

```typescript
import type { Step } from '@repo/pixel/api/pixel';

const preset: Step = { id: 'brightness', options: { value: 1.2 } }; // OK
const bad: Step = { id: 'brightness', options: { wrong: 1.2 } }; // type error
```

### Teardown

```typescript
import { pixel } from '@repo/pixel/api/pixel';

// On app teardown — terminates workers and clears queue
pixel.teardown();
```

## Field Notes

- **The Catalyst:** The realization that every browser-based image editor
  reaches for the same off-the-shelf canvas filters or C++ WASM modules. What
  if the entire pipeline — from per-pixel math to convolution tiling — lived in
  pure TypeScript, fully typed, fully observable?

- **Quirks & Anomalies:** Consecutive pixel operations are silently fused into a
  single pass by the fusion scheduler. You write three steps; the engine
  executes one loop. The intermediate snapshots still appear in the results, but
  the pixels only touch memory once. Neighborhood and global ops act as fences,
  flushing the scheduler before they run — a detail that matters when you're
  composing aggressive contrast stretches with sharpening kernels. Execution
  runs off-thread through a worker pool with `Transferable` buffers, so large
  images never stall the UI thread.

- **Future Horizons:** A plugin manifest that lets you register custom
  manipulations at runtime, tiling strategies that adapt to available memory
  pressure, and a streaming mode for processing video frames without the
  overhead of full `ImageData` copies between steps.

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_

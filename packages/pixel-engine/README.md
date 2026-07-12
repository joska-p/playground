---
title: 'Pixel Engine'
coordinates: '/algorithms/visuals'
status: 'Active'
date_discovered: 2024-01-15
---

# @repo/pixel-engine

> The bare-metal core — a pure TypeScript image pipeline that translates raw
> pixel arrays through fused transforms, tiled convolutions, and geometry-bending
> global operations without touching a single line of framework code.

---

## Essence

Pixel Engine is the stripped-down heart of the pixel ecosystem. It exposes the
entire manipulation pipeline — buffer management, fusion scheduling, step
dispatch, and tiling — as pure functions and classes with zero dependencies on
DOM, React, or Web Workers.

`@repo/pixel` wraps this engine with a React-friendly facade: hooks for
declarative pipeline configuration, a Web Worker pool for off-thread execution,
and the full docs UI. If you need the machinery without the harness, this is the
place to look.

## Quick Launch

```bash
pnpm dev --filter @repo/playground
```

## Field Notes

- **The Catalyst:** The moment it became clear that the pixel pipeline's core
  logic — double-buffered transforms, per-pixel fusion, tiled convolutions — had
  no reason to live inside a React component tree. Extracting it into a
  framework-agnostic core made the whole system testable, embeddable, and far
  easier to reason about.

- **Quirks & Anomalies:** The `FusionScheduler` silently collapses consecutive
  pixel operations into a single pass over the pixel buffer. You declare three
  steps; the engine executes one loop. Neighborhood and global operations act as
  fences, flushing the scheduler before they run — a detail that shapes how you
  compose aggressive contrast stretches with sharpening kernels. The tiling
  strategy for large images (512×512 tiles with a halo matching the kernel
  radius) keeps peak memory proportional to tile size, not full image size.

- **Future Horizons:** A plugin manifest for registering custom manipulations
  at runtime, tiling strategies that adapt to available memory pressure, and a
  streaming mode for processing video frames without the overhead of full
  `ImageData` copies between steps.

---

## Exports

```typescript
import { BufferManager } from '@repo/pixel-engine/buffer-manager';
import { FusionScheduler } from '@repo/pixel-engine/fusion-scheduler';
import { defineManip } from '@repo/pixel-engine/manipulation-factories';
import { ALL_MANIPULATIONS } from '@repo/pixel-engine/manipulations/manifest';
import { runNeighborhoodTiled } from '@repo/pixel-engine/neighborhood-tiling';
import { runPipeline } from '@repo/pixel-engine/pipeline-runner';
import { Registry } from '@repo/pixel-engine/registry';
import { dispatchStep } from '@repo/pixel-engine/step-dispatcher';
import type { Step, ManipulationDefinition, ArgDefinition, Access } from '@repo/pixel-engine/types';
```

## Architecture

```
pipelineRunner.run(config)
  │
  ├─ BufferManager (double-buffered Uint8ClampedArray)
  ├─ FusionScheduler (batches consecutive pixel ops)
  │
  └─ For each step:
       ├─ pixel       → queue in FusionScheduler (deferred)
       ├─ neighborhood → flush scheduler → run convolution
       │                   └─ Tiling for large images (512×512 tiles + halo)
       └─ global      → flush scheduler → run transform function
```

See the [pixel README](../../pixel/) for full usage docs.

---

_Part of [Creative Playground](https://joska-p.github.io/playground)_

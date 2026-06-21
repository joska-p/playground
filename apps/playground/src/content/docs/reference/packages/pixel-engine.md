---
title: 'Pixel Engine'
description: 'Pure TypeScript image-manipulation core — no framework, no DOM, no React.'
category: 'reference'
tags:
  - reference
  - pixel-engine
order: 20
---

# @repo/pixel-engine

Used by [`@repo/pixel`](../../pixel/) which adds React hooks, a Web Worker pool, and the docs UI.

## Exports

```typescript
import {
  type Step,
  type ManipulationDefinition,
  type ArgDefinition,
  type Access,
  registry,
  bufferManager,
  fusionScheduler,
  stepDispatcher,
  pipelineRunner,
  manipulationFactories,
  neighborhoodTiling,
  getManifest,
  getManipulation,
  getManipulationsByAccess,
  pipelineWorker
} from '@repo/pixel-engine';
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

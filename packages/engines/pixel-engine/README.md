# @repo/pixel-engine

> Pure TypeScript image-manipulation core — no framework, no DOM, no React.

Used by [`@repo/pixel`](../../pixel/) which adds React hooks, a Web Worker pool, and the docs UI.

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

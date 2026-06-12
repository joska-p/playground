# @repo/image-pipeline — Migration to @repo/worker-pool

## What

Replace the hand-rolled `PipelineGateway` worker pool with `@repo/worker-pool`'s `WorkerPool<RunConfig, ImageData[]>`.

## Why

| Current (PipelineGateway)                        | Target (WorkerPool)             | Benefit                              |
| ------------------------------------------------ | ------------------------------- | ------------------------------------ |
| ~150 lines of pool/queue logic                   | ~10 lines config + factory      | Less code to maintain                |
| Custom `PoolEntry`, `QueuedJob` types            | Uses generic `WorkerPoolConfig` | Shared, tested implementation        |
| Hardcoded pool size (min 4, hardwareConcurrency) | Configurable `maxPoolSize`      | Consistent with worker-pool defaults |
| Manual transferable handling                     | Built into `serialize` return   | Declarative, less error-prone        |
| Singleton `pipelineGateway` export               | Consumer creates pool instance  | Better testability, no global state  |

## Migration Steps

1. **Add dependency**: `pnpm add @repo/worker-pool` in image-pipeline
2. **Create WorkerPool instance** in `image-pipeline.ts` (or new `pipeline-pool.ts`):

   ```ts
   import { WorkerPool } from '@repo/worker-pool';
   import type { RunConfig } from './image-pipeline';

   const pool = new WorkerPool<RunConfig, ImageData[]>({
     maxPoolSize: navigator.hardwareConcurrency ?? 4,
     workerFactory: () =>
       new Worker(new URL('./pipeline-worker', import.meta.url), {
         type: 'module'
       }),
     serialize: (task) => ({
       message: {
         sourceImageData: task.sourceImageData,
         steps: task.steps,
         maximumPixels: task.maximumPixels
       },
       transfer: [task.sourceImageData.data.buffer]
     }),
     deserialize: (event) => {
       if ('error' in event.data)
         return { ok: false, error: new Error(event.data.error) };
       return { ok: true, value: event.data as ImageData[] };
     }
   });
   ```

3. **Update `imagePipeline.run()`** to call `pool.run(config)` directly
4. **Update `imagePipeline.teardown()`** to call `pool.teardown()`
5. **Remove** from `pipeline-gateway.ts`:
   - `PipelineGateway` class
   - `pipelineGateway` singleton export
   - `PoolEntry`, `QueuedJob` types
6. **Keep** `pipeline-worker.ts` — must remain importable by `workerFactory`
7. **Verify** existing integration tests pass unchanged

## Task Type

Use `RunConfig` (already exported from `image-pipeline.ts:18-22`):

```ts
type RunConfig = {
  sourceImageData: ImageData;
  steps: readonly Step[];
  maximumPixels?: number;
};
```

Single object matches WorkerPool's generic `TTask` and keeps the public API clean.

## Risk: Low

- API shape nearly identical (both accept config, return `Promise<ImageData[]>`)
- Worker message protocol unchanged
- Only internal implementation changes

# @repo/worker-pool — migration TODO

Consume `@repo/worker-pool` in the three packages that currently have ad-hoc worker patterns.

## Before starting

Read the existing worker pattern for each target package:

- [automa worker report](https://github.com/user-attachments/internal/automa-worker-report) — single module worker, transferable buffers
- [graph-viz worker report](https://github.com/user-attachments/internal/graph-viz-worker-report) — blob URL worker, one-shot simulation
- [image-pipeline worker report](https://github.com/user-attachments/internal/image-pipeline-worker-report) — static-size pool, FIFO queue, transferables

## Migration plan

| #   | Package          | Current pattern                                          | Adapter                                                            | Risk                                                              |
| --- | ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| 1   | `image-pipeline` | `PipelineGateway` (hand-rolled pool, size 4, FIFO queue) | `WorkerPool<RunConfig, ImageData[]>`                               | Low — API shape is nearly identical                               |
| 2   | `automa`         | Single module worker, transferable buffer round-trip     | `WorkerPool<StepRequest, StepResponse>` with maxPoolSize: 1        | Low — single worker, simple protocol                              |
| 3   | `graph-viz`      | Blob URL worker, one-shot fire-and-forget                | `MockWorkerPool<GraphData, Float32Array>` (simulation runs inline) | Medium — blob pattern is unusual; may need a custom workerFactory |

## Steps per package

### 1. image-pipeline

- [ ] Add `@repo/worker-pool` dependency
- [ ] Replace `PipelineGateway` internals with `WorkerPool<RunConfig, ImageData[]>`
- [ ] Wire `serialize` — extract sourceImageData, steps, maximumPixels
- [ ] Wire `deserialize` — handle `ImageData[]` success and `{ error }` error
- [ ] Wire `workerFactory` — preserve `?worker&inline` import
- [ ] Remove `PipelineGateway` class, `pipelineGateway` singleton, `PoolEntry`, `QueuedJob` types
- [ ] Remove `pipeline-worker.ts` or keep as standalone (must be importable by workerFactory)
- [ ] Tests: existing integration tests should pass unchanged

### 2. automa

- [ ] Add `@repo/worker-pool` dependency
- [ ] Replace module-level `Worker` variable with `WorkerPool<StepRequest, StepResponse>({ maxPoolSize: 1, ... })`
- [ ] Wire `serialize` — pack grid, cols, rows, ruleId; attach transferable buffer
- [ ] Wire `deserialize` — unwrap grid from response
- [ ] Wire `workerFactory` — `new Worker(new URL('../../core/worker', import.meta.url), { type: 'module' })`
- [ ] Update `init()` to create pool instead of single worker
- [ ] Update `destroy()` to call `pool.teardown()` instead of `worker.terminate()`
- [ ] Tests: existing automa tests should pass unchanged

### 3. graph-viz

- [ ] Add `@repo/worker-pool` dependency
- [ ] Replace blob Worker with `MockWorkerPool<GraphData, Float32Array>` + force-simulation function
- [ ] The simulation currently runs in the worker; with MockWorkerPool it runs synchronously on the main thread
- [ ] If main-thread blocking is acceptable (simulation is ~120 iterations of simple math), use MockWorkerPool
- [ ] If offloading must be preserved, use `WorkerPool` with a blob-URL `workerFactory`
- [ ] Tests: visual regression / snapshot tests should pass

## After all migrations

- [ ] Verify no package still imports `pipelineGateway` or `new Worker(...)` directly
- [ ] Remove unused worker-related types from `image-pipeline` (`PoolEntry`, `QueuedJob`)
- [ ] Remove `pipelineGateway` singleton export from `image-pipeline`
- [ ] Archive `graph-viz` blob worker pattern if moved to MockWorkerPool
- [ ] Run full workspace test suite: `pnpm -r test`
- [ ] Run full workspace type-check: `pnpm -r check-types`

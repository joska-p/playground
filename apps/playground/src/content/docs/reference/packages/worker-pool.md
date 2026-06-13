---
title: "A pool of worker"
description: "You write the worker. This package runs it — pooling, queuing, lifecycle, and teardown."
category: "reference"
tags:
  - reference
  - worker-pool
order: 20
---

# @repo/worker-pool

## Purpose

You already know how to write a Web Worker: you create it with `new Worker(...)`, send messages with `postMessage`, and listen for responses. What you don't want to write is the boilerplate around it — deciding when to create a worker, when to reuse one, what to do when all workers are busy, and how to clean up on unmount.

This package does that. You provide three hooks (`workerFactory`, `serialize`, `deserialize`) that describe _your_ worker. It handles dispatch, concurrency, queuing, and teardown.

Three packages (`automa`, `graph-viz`, `image-pipeline`) each invented their own version of this same boilerplate. This module extracts the common shape into a single, testable interface.

## Spec

### Public API

```typescript
// @repo/worker-pool
export class WorkerPool<TTask, TResult> {
  constructor(config: WorkerPoolConfig<TTask, TResult>);
  run(task: TTask): Promise<TResult>;
  teardown(): void;
}

export type WorkerResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error };

export type WorkerPoolConfig<TTask, TResult> = {
  /** Creates a fresh Worker. Consumer chooses URL, blob, inline import, etc. */
  workerFactory: () => Worker;
  /** Max pool size. Default: min(hardwareConcurrency, 4). */
  maxPoolSize?: number;
  /** Serialise the typed task into a postMessage payload + optional transferables. */
  serialize: (task: TTask) => { message: unknown; transfer?: Transferable[] };
  /** Extract a typed result from the worker's response message. */
  deserialize: (event: MessageEvent) => WorkerResult<TResult>;
};

// @repo/worker-pool/mock
export class MockWorkerPool<TTask, TResult> {
  constructor(handler: (task: TTask) => TResult);
  run(task: TTask): Promise<TResult>;
  teardown(): void;
}
```

### Behaviour contract

| Behaviour            | Detail                                                                 |
| -------------------- | ---------------------------------------------------------------------- |
| **Lazy init**        | Workers are created on first `run()`, not at construction              |
| **Pool size**        | Up to `maxPoolSize` workers; defaults to `min(hardwareConcurrency, 4)` |
| **Dispatch**         | Idle worker receives the task immediately                              |
| **Queue**            | When all workers busy, tasks queue in FIFO order                       |
| **Drain**            | When a worker completes, the next queued task is dispatched            |
| **Transferables**    | `serialize` can attach transferables for zero-copy                     |
| **Error — event**    | Worker `error` event rejects the promise                               |
| **Error — response** | `deserialize` returning `{ ok: false }` rejects the promise            |
| **Teardown**         | `teardown()` terminates all workers and clears the queue               |
| **Post-teardown**    | A new `run()` after `teardown()` creates fresh workers                 |

### Non-goals

- Streaming / observable workers (graph-viz's blob pattern). The mock adapter handles test-time substitution.
- Worker warm-up / min pool size. Start lazy.
- Bundler-specific `?worker&inline` support. Consumer handles that in `workerFactory`.

### Design rationale

- **Concrete class, not interface**: One class with config hooks (workerFactory, serialize/deserialize) is the PipelineGateway generalisation. Adding an abstract interface before a second implementation is premature.
- **Vite-agnostic**: `workerFactory` is a plain `() => Worker`. The consumer owns bundler integration.
- **Consumer-defined deserialize**: Each worker's error protocol is different. Let the adapter decide.

## Usage examples

### Minimal — pool of compute workers

```typescript
import { WorkerPool } from '@repo/worker-pool';

// Worker that doubles numbers
const pool = new WorkerPool<number, number>({
  workerFactory: () => new Worker(new URL('./doubler', import.meta.url)),
  serialize: (n) => ({ message: n }),
  deserialize: (event) => ({ ok: true, value: event.data })
});

const result = await pool.run(21); // 42
pool.teardown();
```

### Image pipeline — transferables + custom error protocol

The `image-pipeline` pattern: workers receive image data via zero-copy transfer, the worker may return either results or an error object.

```typescript
import { WorkerPool } from '@repo/worker-pool';
import type { Step } from '@repo/image-pipeline';

type Task = { image: ImageData; steps: Step[]; maxPixels?: number };
type Result = ImageData[];

const pool = new WorkerPool<Task, Result>({
  workerFactory: () => new PipelineWorker(), // Vite ?worker&inline
  maxPoolSize: Math.min(navigator.hardwareConcurrency ?? 2, 4),

  serialize: (task) => {
    // Clone the pixel buffer so the transfer doesn't neuter the caller's copy
    const copy = new ImageData(
      new Uint8ClampedArray(task.image.data),
      task.image.width,
      task.image.height
    );
    return {
      message: {
        sourceImageData: copy,
        steps: task.steps,
        maximumPixels: task.maxPixels
      },
      transfer: [copy.data.buffer]
    };
  },

  deserialize: (event) => {
    const data = event.data;
    if ('error' in data) {
      return { ok: false, error: new Error(data.error) };
    }
    return { ok: true, value: data as ImageData[] };
  }
});
```

### Cellular automaton — single worker, buffer round-trip

The `automa` pattern: a single dedicated worker evolves a grid, sending the buffer back and forth with zero copy.

```typescript
import { WorkerPool } from '@repo/worker-pool';
import { WORKER_MESSAGE_STEP } from '@repo/automa/core/config';

type StepRequest = {
  type: typeof WORKER_MESSAGE_STEP;
  grid: Uint8Array;
  cols: number;
  rows: number;
  ruleId: string;
};

type StepResponse = {
  type: typeof WORKER_MESSAGE_STEP;
  grid: Uint8Array;
};

const pool = new WorkerPool<StepRequest, StepResponse>({
  workerFactory: () =>
    new Worker(new URL('../../core/worker', import.meta.url), {
      type: 'module'
    }),
  maxPoolSize: 1, // single dedicated worker

  serialize: (task) => ({
    message: task satisfies StepRequest,
    transfer: [task.grid.buffer] // transfer ownership to worker
  }),

  deserialize: (event) => ({
    ok: true,
    value: event.data as StepResponse // worker returns transferred-back buffer
  })
});
```

### Testing with MockWorkerPool

Use `MockWorkerPool` to test code that depends on a worker pool without spawning real workers.

```typescript
import { MockWorkerPool } from '@repo/worker-pool/mock';

// Handler runs synchronously — no worker overhead
const mock = new MockWorkerPool<number, string>((n) => `result-${n}`);

await expect(mock.run(42)).resolves.toBe('result-42');

mock.teardown(); // no-op, included for interface compatibility
```

### Graph layout — testing a fire-and-forget simulation

The `graph-viz` pattern runs a one-shot force simulation. In tests, use `MockWorkerPool` to run the simulation inline.

```typescript
import { MockWorkerPool } from '@repo/worker-pool/mock';

type GraphData = { nodes: number };
type Positions = Float32Array;

function runSimulation(data: GraphData): Positions {
  const positions = new Float32Array(data.nodes * 3);
  // ... force-directed layout logic ...
  return positions;
}

const mock = new MockWorkerPool<GraphData, Positions>(runSimulation);

const positions = await mock.run({ nodes: 100 });
// positions is computed synchronously — no async overhead
```

## TDD plan (vertical slices)

Each cycle: RED (write one test) → GREEN (minimal code) → REFACTOR if needed.

| #   | Test                                                                                  | Impl                                 |
| --- | ------------------------------------------------------------------------------------- | ------------------------------------ |
| 1   | `MockWorkerPool.run(task)` resolves with handler's value                              | `MockWorkerPool` class               |
| 2   | `WorkerPool` creates worker on first `run()`, sends serialized msg, resolves response | `WorkerPool` with pool size 1        |
| 3   | Pool creates up to `maxPoolSize` workers, reuses idle workers                         | Pool array, acquireWorker, busy flag |
| 4   | FIFO queue: queues when busy, drains in order                                         | jobQueue, drainQueue                 |
| 5   | Transferables forwarded to `postMessage`                                              | Pass transfer arg                    |
| 6   | Worker error event rejects; deserialize `{ ok: false }` rejects                       | Error listeners                      |
| 7   | `teardown()` terminates workers, clears queue, allows fresh workers                   | Iterate + terminate, reset           |

## Local development

```bash
pnpm --filter @repo/worker-pool test        # run tests once
pnpm --filter @repo/worker-pool test-watch  # watch mode
pnpm --filter @repo/worker-pool check-types
```

---

_Part of the [Creative Playground](https://jpotin.gitlab.io/playground)_


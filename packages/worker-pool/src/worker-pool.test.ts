import { describe, expect, it, vi } from 'vitest';
import { MockWorkerPool } from './mock-worker-pool';
import { WorkerPool } from './worker-pool';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createFakeWorker() {
  let messageCb: ((e: MessageEvent) => void) | null = null;
  let errorCb: ((e: ErrorEvent) => void) | null = null;

  const worker = {
    postMessage: vi.fn(),
    addEventListener: vi.fn(
      (type: string, handler: (...args: unknown[]) => void) => {
        if (type === 'message') messageCb = handler;
        if (type === 'error') errorCb = handler;
      }
    ),
    removeEventListener: vi.fn(),
    terminate: vi.fn()
  } as unknown as Worker;

  return {
    worker,
    respond(data: unknown) {
      messageCb?.({ data } as MessageEvent);
    },
    fail(msg: string) {
      errorCb?.({
        message: msg,
        error: new Error(msg)
      } as ErrorEvent);
    }
  };
}

// ---------------------------------------------------------------------------
// Cycle 1 — MockWorkerPool (tracer bullet)
// ---------------------------------------------------------------------------

describe('MockWorkerPool', () => {
  it('resolves with the handler return value', async () => {
    const pool = new MockWorkerPool<number, string>((n) => `got ${n}`);
    await expect(pool.run(42)).resolves.toBe('got 42');
  });

  it('teardown does not throw', () => {
    const pool = new MockWorkerPool((n: number) => n);
    expect(() => pool.teardown()).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// Cycle 2 — WorkerPool basic dispatch
// ---------------------------------------------------------------------------

describe('WorkerPool', () => {
  it('does not create workers at construction time', () => {
    const factory = vi.fn(() => createFakeWorker().worker);
    new WorkerPool<number, string>({
      workerFactory: factory,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });
    expect(factory).not.toHaveBeenCalled();
  });

  it('creates a worker on first run() via workerFactory', async () => {
    const fake = createFakeWorker();
    const factory = vi.fn(() => fake.worker);
    const pool = new WorkerPool<number, string>({
      workerFactory: factory,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const promise = pool.run(42);
    fake.respond('result');

    await expect(promise).resolves.toBe('result');
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('sends the serialized message via worker.postMessage', async () => {
    const fake = createFakeWorker();
    const pool = new WorkerPool<number, string>({
      workerFactory: () => fake.worker,
      serialize: (n) => ({ message: `task-${n}` }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const promise = pool.run(7);
    fake.respond('done');

    await promise;
    expect(fake.worker.postMessage).toHaveBeenCalledWith('task-7');
  });

  it('resolves with the deserialized response', async () => {
    const fake = createFakeWorker();
    const pool = new WorkerPool<number, string>({
      workerFactory: () => fake.worker,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({
        ok: true,
        value: `deserialized-${event.data}`
      })
    });

    const promise = pool.run(5);
    fake.respond('raw');

    await expect(promise).resolves.toBe('deserialized-raw');
  });
});

// ---------------------------------------------------------------------------
// Cycle 3 — Pool sizing & reuse
// ---------------------------------------------------------------------------

describe('WorkerPool — pool sizing & reuse', () => {
  it('reuses an idle worker across sequential run() calls', async () => {
    const fake = createFakeWorker();
    const factory = vi.fn(() => fake.worker);

    const pool = new WorkerPool<number, string>({
      workerFactory: factory,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const promise1 = pool.run(1);
    fake.respond('first');
    await expect(promise1).resolves.toBe('first');
    expect(factory).toHaveBeenCalledTimes(1);

    const promise2 = pool.run(2);
    fake.respond('second');
    await expect(promise2).resolves.toBe('second');
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('creates workers up to maxPoolSize with concurrent jobs', async () => {
    const fakes = [createFakeWorker(), createFakeWorker()];
    let idx = 0;
    const factory = vi.fn(() => fakes[idx++].worker);

    const pool = new WorkerPool<number, string>({
      workerFactory: factory,
      maxPoolSize: 2,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const promise1 = pool.run(10);
    const promise2 = pool.run(20);

    expect(factory).toHaveBeenCalledTimes(2);

    fakes[0].respond('a');
    fakes[1].respond('b');

    await expect(promise1).resolves.toBe('a');
    await expect(promise2).resolves.toBe('b');
  });

  it('respects maxPoolSize — does not create extra workers', async () => {
    const fake = createFakeWorker();
    const factory = vi.fn(() => fake.worker);

    const pool = new WorkerPool<number, string>({
      workerFactory: factory,
      maxPoolSize: 1,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const promise1 = pool.run(1);
    const promise2 = pool.run(2);

    // Only 1 worker created — second call queues
    expect(factory).toHaveBeenCalledTimes(1);

    // Resolve first — second should auto-drain
    fake.respond('done-1');
    await expect(promise1).resolves.toBe('done-1');

    fake.respond('done-2');
    await expect(promise2).resolves.toBe('done-2');

    // Still only 1 worker
    expect(factory).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// Cycle 4 — FIFO queue & drain
// ---------------------------------------------------------------------------

describe('WorkerPool — queue & drain', () => {
  it('processes queued tasks in FIFO order', async () => {
    const fake = createFakeWorker();
    const order: number[] = [];

    const pool = new WorkerPool<number, number>({
      workerFactory: () => fake.worker,
      maxPoolSize: 1,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const p1 = pool.run(1).then((r) => order.push(r));
    const p2 = pool.run(2).then((r) => order.push(r));
    const p3 = pool.run(3).then((r) => order.push(r));

    fake.respond(10);
    await p1;
    expect(order).toEqual([10]);

    fake.respond(20);
    await p2;
    expect(order).toEqual([10, 20]);

    fake.respond(30);
    await p3;
    expect(order).toEqual([10, 20, 30]);
  });

  it('drains the full queue across multiple completions', async () => {
    const fake = createFakeWorker();
    const factory = vi.fn(() => fake.worker);

    const pool = new WorkerPool<number, string>({
      workerFactory: factory,
      maxPoolSize: 1,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const p1 = pool.run(1);
    const p2 = pool.run(2);
    const p3 = pool.run(3);

    // Only 1 worker, others queued
    expect(factory).toHaveBeenCalledTimes(1);

    fake.respond('a');
    await expect(p1).resolves.toBe('a');

    fake.respond('b');
    await expect(p2).resolves.toBe('b');

    fake.respond('c');
    await expect(p3).resolves.toBe('c');

    // Still 1 worker after all drain
    expect(factory).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// Cycle 5 — Transferables
// ---------------------------------------------------------------------------

describe('WorkerPool — transferables', () => {
  it('passes transferables to worker.postMessage when provided', async () => {
    const fake = createFakeWorker();
    const buf = new ArrayBuffer(8);

    const pool = new WorkerPool<number, string>({
      workerFactory: () => fake.worker,
      serialize: () => ({ message: 42, transfer: [buf] }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const promise = pool.run(1);
    fake.respond('ok');
    await promise;

    expect(fake.worker.postMessage).toHaveBeenCalledWith(42, [buf]);
  });

  it('calls postMessage without transfer list when none provided', async () => {
    const fake = createFakeWorker();

    const pool = new WorkerPool<number, string>({
      workerFactory: () => fake.worker,
      serialize: () => ({ message: 'hello' }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const promise = pool.run(1);
    fake.respond('ok');
    await promise;

    expect(fake.worker.postMessage).toHaveBeenCalledWith('hello');
  });
});

// ---------------------------------------------------------------------------
// Cycle 6 — Error handling
// ---------------------------------------------------------------------------

describe('WorkerPool — error handling', () => {
  it('rejects when deserialize returns an error result', async () => {
    const fake = createFakeWorker();
    const err = new Error('processing failed');

    const pool = new WorkerPool<number, string>({
      workerFactory: () => fake.worker,
      serialize: (n) => ({ message: n }),
      deserialize: () => ({ ok: false, error: err })
    });

    const promise = pool.run(1);
    fake.respond('ignored');
    await expect(promise).rejects.toThrow('processing failed');
  });

  it('rejects when the worker fires an error event', async () => {
    const fake = createFakeWorker();

    const pool = new WorkerPool<number, string>({
      workerFactory: () => fake.worker,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const promise = pool.run(1);
    fake.fail('worker crashed');
    await expect(promise).rejects.toThrow('worker crashed');
  });
});

// ---------------------------------------------------------------------------
// Cycle 7 — teardown
// ---------------------------------------------------------------------------

describe('WorkerPool — teardown', () => {
  it('terminates all workers', () => {
    const fakes = [createFakeWorker(), createFakeWorker()];
    let idx = 0;
    const factory = vi.fn(() => fakes[idx++].worker);

    const pool = new WorkerPool<number, string>({
      workerFactory: factory,
      maxPoolSize: 2,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    // Create both workers via concurrent run calls
    pool.run(1);
    pool.run(2);

    pool.teardown();

    expect(fakes[0].worker.terminate).toHaveBeenCalledTimes(1);
    expect(fakes[1].worker.terminate).toHaveBeenCalledTimes(1);
  });

  it('clears the queue', async () => {
    const fake = createFakeWorker();

    const pool = new WorkerPool<number, string>({
      workerFactory: () => fake.worker,
      maxPoolSize: 1,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const p1 = pool.run(1);
    const p2 = pool.run(2); // queues
    const p3 = pool.run(3); // queues

    // Suppress unhandled rejections for queued promises
    p2.catch(() => {});
    p3.catch(() => {});

    pool.teardown();

    // Queue is cleared — no more drain should happen
    expect(fake.worker.postMessage).toHaveBeenCalledTimes(1);

    // The dispatched task should still be pending (no response)
    // We need to properly settle teardown — respond to p1 to clean up
    fake.respond('done');
    await p1;
  });

  it('rejects pending queued promises', async () => {
    const fake = createFakeWorker();

    const pool = new WorkerPool<number, string>({
      workerFactory: () => fake.worker,
      maxPoolSize: 1,
      serialize: (n) => ({ message: n }),
      deserialize: (event) => ({ ok: true, value: event.data })
    });

    const promise1 = pool.run(1);
    const promise2 = pool.run(2);
    const promise3 = pool.run(3);

    pool.teardown();

    // promise1 was dispatched but worker is terminated — suppress unused
    void promise1;

    await expect(promise2).rejects.toThrow('pool torn down');
    await expect(promise3).rejects.toThrow('pool torn down');
  });
});

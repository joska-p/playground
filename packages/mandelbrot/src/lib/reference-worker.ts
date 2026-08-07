/**
 * Runs the high-precision reference-orbit computation off the main thread.
 *
 * The BigInt loop executes inside a Vite module worker (bundled from
 * `reference.worker.ts`); `@repo/worker-pool` dispatches the request and hands
 * back the transferable `Float32Array` orbit. When `Worker` is unavailable a
 * chunked main-thread compute (`computeReferenceOrbitAsync`) steps in so the
 * UI never freezes.
 */

import { WorkerPool } from '@repo/worker-pool/worker-pool';
import type { BigFloat } from './big-float';
import { type ReferenceParams, computeReferenceOrbitAsync } from './reference-orbit';

export type OrbitRequest = {
    centerXStr: string; // BigInt mantissa serialized as string
    centerYStr: string;
    prec: number;
    maxIter: number;
};

export type OrbitResult = {
    data: Float32Array;
    length: number;
};

/** The subset of a worker pool `computeReferenceAsync` depends on (also
 * satisfied by `MockWorkerPool` in tests). */
export type OrbitPool = {
    run: (task: OrbitRequest) => Promise<OrbitResult>;
};

type OrbitWorkerMessage =
    { ok: true; data: Float32Array; length: number } | { ok: false; error?: string };

/** Convert a serialized request back into BigFloat params for the fallback. */
function requestToParams({ centerXStr, centerYStr, prec, maxIter }: OrbitRequest): ReferenceParams {
    return {
        centerX: { m: BigInt(centerXStr), prec },
        centerY: { m: BigInt(centerYStr), prec },
        maxIter
    };
}

const supportsWorkers = typeof Worker !== 'undefined';

const defaultPool: WorkerPool<OrbitRequest, OrbitResult> | { run: OrbitPool['run'] } =
    supportsWorkers
        ? new WorkerPool<OrbitRequest, OrbitResult>({
              maxPoolSize: 1,
              workerFactory: () =>
                  new Worker(new URL('./reference.worker.ts', import.meta.url), {
                      type: 'module'
                  }),
              serialize: (task) => ({ message: task }),
              deserialize: (event: MessageEvent<OrbitWorkerMessage>) => {
                  const msg = event.data;
                  if (!msg.ok) {
                      return { ok: false, error: new Error(msg.error ?? 'Unknown worker error') };
                  }
                  return { ok: true, value: { data: msg.data, length: msg.length } };
              }
          })
        : {
              run: (task) => computeReferenceOrbitAsync(requestToParams(task))
          };

// Release the pooled worker on Vite hot-module reload instead of leaking it.
import.meta.hot?.dispose(() => {
    if ('teardown' in defaultPool) defaultPool.teardown();
});

/**
 * Compute a reference orbit. Uses a Web Worker when available; otherwise falls
 * back to a chunked main-thread compute. `pool` is injectable so tests can
 * substitute a `MockWorkerPool`.
 */
export function computeReferenceAsync(
    req: OrbitRequest,
    pool: OrbitPool = defaultPool
): Promise<OrbitResult> {
    return pool.run(req);
}

// Re-export so consumers can serialize a BigFloat center to a request.
export function toRequest(centerX: BigFloat, centerY: BigFloat, maxIter: number): OrbitRequest {
    return {
        centerXStr: centerX.m.toString(),
        centerYStr: centerY.m.toString(),
        prec: centerX.prec,
        maxIter
    };
}

import { WorkerPool } from '@repo/worker-pool';
import type { Epicycle } from './types';

const fourierPool = new WorkerPool<Float32Array, Epicycle[]>({
  workerFactory: () =>
    new Worker(new URL('./fourier.worker.ts', import.meta.url), { type: 'module' }),
  maxPoolSize: 1, // Dedicate a single compute thread to keep calculations completely linear
  serialize: (task) => ({
    message: task,
    transfer: [task.buffer] // Zero-copy memory buffer transfers
  }),
  deserialize: (event) => event.data // Extracts the WorkerResult object
});

const epicycleCache = new Map<string, Epicycle[]>();
const activeQueries = new Set<string>();

export function fetchFourierEpicycles(
  pairs: Float32Array,
  triggerRedraw: () => void
): Epicycle[] | null {
  // Generate a distinct cache fingerprint using buffer markers
  const head = Array.from(pairs.slice(0, 20));
  const cacheKey = `${pairs.length}:${head.join(',')}`;

  if (epicycleCache.has(cacheKey)) {
    return epicycleCache.get(cacheKey) ?? null;
  }

  if (!activeQueries.has(cacheKey)) {
    activeQueries.add(cacheKey);

    fourierPool
      .run(pairs)
      .then((result) => {
        epicycleCache.set(cacheKey, result);
        activeQueries.delete(cacheKey);
        triggerRedraw();
      })
      .catch(console.error);
  }

  return null;
}

import { WorkerPool } from '@repo/worker-pool';
import type { Epicycle } from './types';

const fourierPool = new WorkerPool<Float32Array, Epicycle[]>({
  workerFactory: () =>
    new Worker(new URL('./fourier.worker.ts', import.meta.url), { type: 'module' }),
  maxPoolSize: 1,
  serialize: (task) => ({
    message: task,
    transfer: [task.buffer]
  }),
  deserialize: (event) => event.data
});

const MAX_CACHE_SIZE = 20;
const epicycleCache = new Map<string, Epicycle[]>();
const activeQueries = new Set<string>();

function hashPairs(pairs: Float32Array): string {
  let hash = 0;
  for (let i = 0; i < pairs.length; i++) {
    hash = ((hash << 5) - hash + pairs[i]!) | 0;
  }
  return `${pairs.length}:${hash}`;
}

function cacheGet(key: string): Epicycle[] | undefined {
  const entry = epicycleCache.get(key);
  if (entry) {
    epicycleCache.delete(key);
    epicycleCache.set(key, entry);
  }
  return entry;
}

function cacheSet(key: string, value: Epicycle[]): void {
  if (epicycleCache.size >= MAX_CACHE_SIZE) {
    const oldest = epicycleCache.keys().next();
    if (!oldest.done && oldest.value) {
      epicycleCache.delete(oldest.value);
    }
  }
  epicycleCache.set(key, value);
}

export function fetchFourierEpicycles(
  pairs: Float32Array,
  triggerRedraw: () => void
): Epicycle[] | null {
  const cacheKey = hashPairs(pairs);

  const cached = cacheGet(cacheKey);
  if (cached) return cached;

  if (!activeQueries.has(cacheKey)) {
    activeQueries.add(cacheKey);

    fourierPool
      .run(pairs)
      .then((result) => {
        cacheSet(cacheKey, result);
        activeQueries.delete(cacheKey);
        triggerRedraw();
      })
      .catch(console.error);
  }

  return null;
}

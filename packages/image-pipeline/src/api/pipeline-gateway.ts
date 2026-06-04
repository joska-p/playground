import type { Step } from '../core/manipulations/manifest';
import PipelineWorker from './pipeline-worker?worker&inline';

type PoolEntry = {
  worker: Worker;
  busy: boolean;
};

type QueuedJob = {
  sourceImageData: ImageData;
  steps: Step[];
  maximumPixels?: number;
  resolve: (result: ImageData[]) => void;
  reject: (error: Error) => void;
};

export class PipelineGateway {
  private pool: PoolEntry[] = [];
  private jobQueue: QueuedJob[] = [];

  private getPool(): PoolEntry[] {
    if (this.pool.length === 0) {
      const size = Math.min(navigator.hardwareConcurrency ?? 2, 4);
      this.pool = Array.from({ length: size }, () => ({
        worker: new PipelineWorker(),
        busy: false,
      }));
    }
    return this.pool;
  }

  private acquireWorker(): PoolEntry | null {
    return this.getPool().find((poolEntry) => !poolEntry.busy) ?? null;
  }

  private dispatch({
    poolEntry,
    sourceImageData,
    steps,
    resolve,
    reject,
    maximumPixels,
  }: {
    poolEntry: PoolEntry;
    sourceImageData: ImageData;
    steps: Step[];
    resolve: (result: ImageData[]) => void;
    reject: (error: Error) => void;
    maximumPixels?: number;
  }): void {
    poolEntry.busy = true;

    const onMessage = (
      event: MessageEvent<ImageData[] | { error: string }>
    ) => {
      cleanup();
      if ('error' in event.data) {
        reject(new Error(event.data.error));
      } else {
        resolve(event.data);
      }
    };

    const onError = (error: ErrorEvent) => {
      cleanup();
      reject(new Error(error.message ?? 'Unknown worker error'));
    };

    const cleanup = () => {
      poolEntry.worker.removeEventListener('message', onMessage);
      poolEntry.worker.removeEventListener('error', onError);
      poolEntry.busy = false;
      this.drainQueue();
    };

    poolEntry.worker.addEventListener('message', onMessage);
    poolEntry.worker.addEventListener('error', onError);

    const clampedCopy = new Uint8ClampedArray(sourceImageData.data);
    const imageDataCopy = new ImageData(
      clampedCopy,
      sourceImageData.width,
      sourceImageData.height
    );
    poolEntry.worker.postMessage(
      { sourceImageData: imageDataCopy, steps, maximumPixels },
      [imageDataCopy.data.buffer]
    );
  }

  private drainQueue(): void {
    if (!this.jobQueue.length) return;
    const poolEntry = this.acquireWorker();
    if (!poolEntry) return;
    const queuedJob = this.jobQueue.shift()!;
    this.dispatch({ poolEntry, ...queuedJob });
  }

  run({
    sourceImageData,
    steps,
    maximumPixels,
  }: {
    sourceImageData: ImageData;
    steps: Step[];
    maximumPixels?: number;
  }): Promise<ImageData[]> {
    const poolEntry = this.acquireWorker();

    if (poolEntry) {
      return new Promise((resolve, reject) => {
        this.dispatch({
          poolEntry,
          sourceImageData,
          steps,
          resolve,
          reject,
          maximumPixels,
        });
      });
    }

    return new Promise((resolve, reject) => {
      this.jobQueue.push({
        sourceImageData,
        steps,
        maximumPixels,
        resolve,
        reject,
      });
    });
  }

  /** Terminate all workers and clear the queue. Call this on app teardown. */
  teardown(): void {
    this.jobQueue.length = 0;
    this.pool.forEach(({ worker }) => worker.terminate());
    this.pool = [];
  }
}

// ---------------------------------------------------------------------------
// Default singleton instance
// ---------------------------------------------------------------------------

export const pipelineGateway = new PipelineGateway();

import type { Step } from "../core/manipulations/manifest";
import type { PipelineResult } from "./pipeline-worker";
import PipelineWorker from "./pipeline-worker?worker&inline";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function createManipulationStep(id: string, options?: Record<string, unknown>): Step {
  return { id, ...(options ? { options } : {}) } as Step;
}

export const SNAPSHOT_STEP = { id: "snapshot" as const };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PoolEntry = {
  worker: Worker;
  busy: boolean;
};

type QueuedJob = {
  imageData: ImageData;
  steps: Step[];
  maxPixels?: number;
  resolve: (result: PipelineResult) => void;
  reject: (error: Error) => void;
};

// ---------------------------------------------------------------------------
// PipelineGateway — instance-based worker pool
// ---------------------------------------------------------------------------

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
    return this.getPool().find((entry) => !entry.busy) ?? null;
  }

  private dispatch({
    entry,
    imageData,
    steps,
    resolve,
    reject,
    maxPixels,
  }: {
    entry: PoolEntry;
    imageData: ImageData;
    steps: Step[];
    resolve: (result: PipelineResult) => void;
    reject: (error: Error) => void;
    maxPixels?: number;
  }): void {
    entry.busy = true;

    const onMessage = (event: MessageEvent<PipelineResult | { error: string }>) => {
      cleanup();
      if ("error" in event.data) {
        reject(new Error(event.data.error));
      } else {
        resolve(event.data);
      }
    };

    const onError = (error: ErrorEvent) => {
      cleanup();
      reject(new Error(error.message ?? "Unknown worker error"));
    };

    const cleanup = () => {
      entry.worker.removeEventListener("message", onMessage);
      entry.worker.removeEventListener("error", onError);
      entry.busy = false;
      this.drainQueue();
    };

    entry.worker.addEventListener("message", onMessage);
    entry.worker.addEventListener("error", onError);

    const clampedCopy = new Uint8ClampedArray(imageData.data);
    const imageDataCopy = new ImageData(clampedCopy, imageData.width, imageData.height);
    entry.worker.postMessage({ sourceData: imageDataCopy, steps, maxPixels }, [
      imageDataCopy.data.buffer,
    ]);
  }

  private drainQueue(): void {
    if (!this.jobQueue.length) return;
    const entry = this.acquireWorker();
    if (!entry) return;
    const job = this.jobQueue.shift()!;
    this.dispatch({ entry, ...job });
  }

  run({
    sourceImageData,
    steps,
    maxPixels,
  }: {
    sourceImageData: ImageData;
    steps: Step[];
    maxPixels?: number;
  }): Promise<PipelineResult> {
    const entry = this.acquireWorker();

    if (entry) {
      return new Promise((resolve, reject) => {
        this.dispatch({
          entry,
          imageData: sourceImageData,
          steps,
          resolve,
          reject,
          maxPixels,
        });
      });
    }

    return new Promise((resolve, reject) => {
      this.jobQueue.push({ imageData: sourceImageData, steps, maxPixels, resolve, reject });
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
